// CompilerContoTermico.jsx
import React, { useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";

const API_INVIO = "https://bc.davveroo.it/api/ct3-invio";

// ====== Coordinate di stampa (NON MODIFICATE) ======
const POS = {
  // Pagina 1 - PRIVATO
  p_nome: { x: 110, y: 690, size: 12 },
  p_cognome: { x: 300, y: 690, size: 12 },
  p_iban: { x: 100, y: 665, size: 12 },
  p_cap: { x: 340, y: 665, size: 12 },
  p_indirizzo: { x: 115, y: 645, size: 10 },
  p_comune: { x: 340, y: 645, size: 12 },
  p_telefono: { x: 115, y: 623, size: 12 },
  p_mail: { x: 300, y: 623, size: 12 },
  // Pagina 1 - AZIENDA
  a_denominazione: { x: 240, y: 565, size: 12 },
  a_iban: { x: 100, y: 543, size: 12 },
  a_cap: { x: 340, y: 541, size: 12 },
  a_indirizzo: { x: 120, y: 520, size: 10 },
  a_comune: { x: 340, y: 520, size: 10 },
  a_telefono: { x: 120, y: 499, size: 12 },
  a_mail: { x: 300, y: 499, size: 12 },
  // Pagina 2
  luogoedata: { x: 116, y: 195, size: 12 },
  firma_benef: { x: 120, y: 145, w: 180, h: 60 },
  firma_resp: { x: 420, y: 145, w: 180, h: 60 },
};

export default function CompilerContoTermico() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    // PRIVATO
    p_nome: "",
    p_cognome: "",
    p_iban: "",
    p_indirizzo: "",
    p_comune: "",
    p_cap: "",
    p_telefono: "",
    p_mail: "",
    // AZIENDA
    a_denominazione: "",
    a_iban: "",
    a_indirizzo: "",
    a_comune: "",
    a_cap: "",
    a_telefono: "",
    a_mail: "",
    // Pagina 2
    luogoedata: "",
    // Relazione tecnica commerciale (verrà allegata come .txt dal backend)
    relazioneTesto: "",
  });

  // ---- Stato allegati in stile Dojo (con preview) ----
  const [files, setFiles] = useState([]); // tutti i file caricati (per riepilogo)
  const [filePreviews, setFilePreviews] = useState([]); // preview per sezione
  // Per la POST strutturata a gruppi:
  const [allegati, setAllegati] = useState({
    codice_fiscale: [],
    documento_identita: [],
    catastale: [],
    foto_generatore: [],
    visura: [],
  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sig1On, setSig1On] = useState(false);
  const [sig2On, setSig2On] = useState(false);
  const sigBenefRef = useRef(null);
  const sigRespRef = useRef(null);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // --- Helpers upload stile Dojo ---
  const handleFileChange = (event, sectionKey) => {
    const selectedFiles = Array.from(event.target.files || []);
    // memorizza sezione sul file e genera preview
    selectedFiles.forEach((file) => {
      Object.defineProperty(file, "section", {
        value: sectionKey,
        enumerable: true,
      });
      setFiles((prev) => [...prev, file]);

      if (file.type?.startsWith("image/")) {
        const r = new FileReader();
        r.onload = (ev) =>
          setFilePreviews((p) => [
            ...p,
            {
              src: ev.target.result,
              section: sectionKey,
              name: file.name,
              type: file.type,
            },
          ]);
        r.readAsDataURL(file);
      } else {
        setFilePreviews((p) => [
          ...p,
          { src: null, section: sectionKey, name: file.name, type: file.type },
        ]);
      }
    });

    // aggiorna anche lo stato "allegati" a gruppi per la POST
    setAllegati((s) => ({
      ...s,
      [sectionKey]: [...(s[sectionKey] || []), ...selectedFiles],
    }));
  };

  const removeFile = (index) => {
    const preview = filePreviews[index];
    const sectionKey = preview?.section;
    const name = preview?.name;

    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));

    // rimuovi anche nel gruppo "allegati"
    if (sectionKey) {
      setAllegati((s) => ({
        ...s,
        [sectionKey]: (s[sectionKey] || []).filter((f) => f.name !== name),
      }));
    }
  };

  const getFilesBySection = (sectionKey) =>
    filePreviews.filter((p) => p.section === sectionKey);

  const getSigDataUrl = (ref) =>
    ref?.current && !ref.current.isEmpty()
      ? ref.current.getTrimmedCanvas().toDataURL("image/png")
      : null;

  const clearSig = (ref) => ref?.current?.clear();

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        try {
          resolve(String(r.result).split(",")[1]);
        } catch (e) {
          reject(e);
        }
      };
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  // ----------- GENERA PDF ----------
  const generatePdf = async () => {
    const bytes = await fetch("/modelloconto.pdf").then((r) => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(bytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const [page4, page5] = pdfDoc.getPages();

    const draw = (page, text, { x, y, size = 12 }) =>
      page.drawText(String(text || ""), {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });

    // p1 Privato
    draw(page4, form.p_nome, POS.p_nome);
    draw(page4, form.p_cognome, POS.p_cognome);
    draw(page4, form.p_iban, POS.p_iban);
    draw(page4, form.p_cap, POS.p_cap);
    draw(page4, form.p_indirizzo, POS.p_indirizzo);
    draw(page4, form.p_comune, POS.p_comune);
    draw(page4, form.p_telefono, POS.p_telefono);
    draw(page4, form.p_mail, POS.p_mail);
    // p1 Azienda
    draw(page4, form.a_denominazione, POS.a_denominazione);
    draw(page4, form.a_iban, POS.a_iban);
    draw(page4, form.a_cap, POS.a_cap);
    draw(page4, form.a_indirizzo, POS.a_indirizzo);
    draw(page4, form.a_comune, POS.a_comune);
    draw(page4, form.a_telefono, POS.a_telefono);
    draw(page4, form.a_mail, POS.a_mail);
    // p2
    draw(page5, form.luogoedata, POS.luogoedata);

    // Firme su p2
    const s1 = getSigDataUrl(sigBenefRef);
    if (s1) {
      const b1 = await fetch(s1).then((r) => r.arrayBuffer());
      const png1 = await pdfDoc.embedPng(b1);
      page2.drawImage(png1, {
        x: POS.firma_benef.x,
        y: POS.firma_benef.y,
        width: POS.firma_benef.w,
        height: POS.firma_benef.h,
      });
    }
    const s2 = getSigDataUrl(sigRespRef);
    if (s2) {
      const b2 = await fetch(s2).then((r) => r.arrayBuffer());
      const png2 = await pdfDoc.embedPng(b2);
      page2.drawImage(png2, {
        x: POS.firma_resp.x,
        y: POS.firma_resp.y,
        width: POS.firma_resp.w,
        height: POS.firma_resp.h,
      });
    }

    const out = await pdfDoc.save();
    const blob = new Blob([out], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const downloadPdf = () =>
    pdfUrl && saveAs(pdfUrl, "contratto_conto_termico.pdf");

  // ----------- INVIO ----------
  const submit = async () => {
    if (!pdfUrl) return alert("Genera prima il PDF.");

    setIsSubmitting(true);
    try {
      // PDF generato
      const pdfBlob = await fetch(pdfUrl).then((r) => r.blob());
      const pdfBase64 = await fileToBase64(
        new File([pdfBlob], "contratto_conto_termico.pdf", {
          type: "application/pdf",
        })
      );

      // Firme singole (opzionali)
      const s1 = getSigDataUrl(sigBenefRef);
      const s2 = getSigDataUrl(sigRespRef);
      const firmaBenefBase64 = s1 ? String(s1).split(",")[1] : null;
      const firmaRespBase64 = s2 ? String(s2).split(",")[1] : null;

      // packMany: File[] -> {filename, base64, mime}[]
      const packMany = async (filesArr) =>
        Promise.all(
          (filesArr || []).map(async (f) => ({
            filename: f.name,
            base64: await fileToBase64(f),
            mime: f.type || "application/octet-stream",
          }))
        );

      const payload = {
        privato: {
          nome: form.p_nome,
          cognome: form.p_cognome,
          iban: form.p_iban,
          indirizzo: form.p_indirizzo,
          comune: form.p_comune,
          cap: form.p_cap,
          telefono: form.p_telefono,
          email: form.p_mail,
        },
        azienda: {
          denominazione: form.a_denominazione,
          iban: form.a_iban,
          indirizzo: form.a_indirizzo,
          comune: form.a_comune,
          cap: form.a_cap,
          telefono: form.a_telefono,
          email: form.a_mail,
        },
        luogoedata: form.luogoedata,
        relazioneTesto: form.relazioneTesto, // backend lo trasforma in .txt

        allegati: {
          codice_fiscale: await packMany(allegati.codice_fiscale),
          documento_identita: await packMany(allegati.documento_identita),
          catastale: await packMany(allegati.catastale),
          foto_generatore: await packMany(allegati.foto_generatore),
          visura: await packMany(allegati.visura),

          pdf_modulo: [
            {
              filename: "contratto_conto_termico.pdf",
              base64: pdfBase64,
              mime: "application/pdf",
            },
          ],
          firma_beneficiario: firmaBenefBase64
            ? [
                {
                  filename: "firma_beneficiario.png",
                  base64: firmaBenefBase64,
                  mime: "image/png",
                },
              ]
            : [],
          firma_responsabile: firmaRespBase64
            ? [
                {
                  filename: "firma_responsabile.png",
                  base64: firmaRespBase64,
                  mime: "image/png",
                },
              ]
            : [],
        },
      };

      const res = await fetch(API_INVIO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const txt = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${txt || "no body"}`);

      nav("/thank-you", {
        state: {
          message:
            "Abbiamo ricevuto la documentazione. Ti contatteremo appena il dossier sarà preso in carico.",
        },
      });
    } catch (e) {
      console.error(e);
      alert("Errore invio: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top bar con "Torna alla Home" */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
            Conto Termico 3.0 — Compilazione PDF
          </h2>
          <button
            onClick={() => nav("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            ⬅️ Torna alla Home
          </button>
        </div>

        {/* PRIVATO */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Beneficiario — Privato
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_nome"
              placeholder="Nome"
              value={form.p_nome}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_cognome"
              placeholder="Cognome"
              value={form.p_cognome}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_iban"
              placeholder="IBAN"
              value={form.p_iban}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_cap"
              placeholder="CAP"
              value={form.p_cap}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-2"
              name="p_indirizzo"
              placeholder="Indirizzo"
              value={form.p_indirizzo}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_comune"
              placeholder="Comune"
              value={form.p_comune}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_telefono"
              placeholder="Telefono"
              value={form.p_telefono}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_mail"
              placeholder="Mail"
              value={form.p_mail}
              onChange={onChange}
            />
          </div>
        </section>

        {/* AZIENDA */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Beneficiario — Azienda
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-2"
              name="a_denominazione"
              placeholder="Denominazione azienda"
              value={form.a_denominazione}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="a_iban"
              placeholder="IBAN"
              value={form.a_iban}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="a_cap"
              placeholder="CAP"
              value={form.a_cap}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-2"
              name="a_indirizzo"
              placeholder="Indirizzo"
              value={form.a_indirizzo}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="a_comune"
              placeholder="Comune"
              value={form.a_comune}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="a_telefono"
              placeholder="Telefono"
              value={form.a_telefono}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="a_mail"
              placeholder="Mail"
              value={form.a_mail}
              onChange={onChange}
            />
          </div>
        </section>

        {/* Pagina 2 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Luogo e data (pagina 2)
          </h3>
          <input
            className="px-3 py-2 border rounded-lg w-full"
            name="luogoedata"
            placeholder="Es: Rende, 19/09/2025"
            value={form.luogoedata}
            onChange={onChange}
          />
        </section>

        {/* Relazione tecnica commerciale */}
        <section className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Modulo relazione tecnica commerciale
          </h3>
          <textarea
            className="w-full h-28 px-3 py-2 border rounded-lg"
            name="relazioneTesto"
            placeholder="Scrivi qui la relazione tecnica commerciale..."
            value={form.relazioneTesto}
            onChange={onChange}
          />
          <p className="text-xs text-gray-500">
            Questo testo sarà allegato come file <b>relazione_tecnica.txt</b>{" "}
            nella mail inviata dal backend.
          </p>
        </section>

        {/* Allegati (stile Dojo, 5 sezioni) */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 text-center">
            Caricamento Documenti
          </h2>

          {/* Codice Fiscale */}
          <UploadSection
            title="🧾 Codice Fiscale"
            sectionKey="codice_fiscale"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFile={removeFile}
            accent="blue"
          />

          {/* Documenti d’identità */}
          <UploadSection
            title="🆔 Documenti di identità"
            sectionKey="documento_identita"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFile={removeFile}
            accent="green"
          />

          {/* Catastale immobile */}
          <UploadSection
            title="🏠 Catastale immobile"
            sectionKey="catastale"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFile={removeFile}
            accent="amber"
          />

          {/* Foto vecchio generatore */}
          <UploadSection
            title="📸 Foto vecchio generatore"
            sectionKey="foto_generatore"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFile={removeFile}
            accent="purple"
          />

          {/* Visura camerale */}
          <UploadSection
            title="📋 Visura camerale"
            sectionKey="visura"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFile={removeFile}
            accent="indigo"
          />

          {/* Riepilogo */}
          {files.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Riepilogo Documenti Caricati ({files.length})
              </h3>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white p-3 rounded border"
                  >
                    <div>
                      <span className="font-medium">{file.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({file.section})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Firme */}
        <section className="bg-gray-50 p-4 rounded-lg space-y-6">
          {/* Beneficiario */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-blue-900">
                Firma — Beneficiario
              </p>
              <button
                onClick={() => setSig1On((v) => !v)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  sig1On ? "bg-red-500 text-white" : "bg-green-600 text-white"
                }`}
              >
                {sig1On ? "🔓 Disattiva Firma" : "🔒 Attiva Firma"}
              </button>
            </div>
            {sig1On ? (
              <>
                <div className="border rounded bg-white overflow-hidden">
                  <SignatureCanvas
                    ref={sigBenefRef}
                    penColor="black"
                    canvasProps={{
                      width: 1000,
                      height: 160,
                      className: "rounded",
                    }}
                  />
                </div>
                <button
                  className="mt-2 text-sm text-blue-700 underline"
                  onClick={() => clearSig(sigBenefRef)}
                >
                  Cancella firma
                </button>
              </>
            ) : (
              <div className="border rounded bg-gray-100 h-[160px] flex items-center justify-center text-gray-500">
                Attiva la firma per firmare
              </div>
            )}
          </div>

          {/* Soggetto Responsabile */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-blue-900">
                Firma — Soggetto Responsabile
              </p>
              <button
                onClick={() => setSig2On((v) => !v)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  sig2On ? "bg-red-500 text-white" : "bg-green-600 text-white"
                }`}
              >
                {sig2On ? "🔓 Disattiva Firma" : "🔒 Attiva Firma"}
              </button>
            </div>
            {sig2On ? (
              <>
                <div className="border rounded bg-white overflow-hidden">
                  <SignatureCanvas
                    ref={sigRespRef}
                    penColor="black"
                    canvasProps={{
                      width: 1000,
                      height: 160,
                      className: "rounded",
                    }}
                  />
                </div>
                <button
                  className="mt-2 text-sm text-blue-700 underline"
                  onClick={() => clearSig(sigRespRef)}
                >
                  Cancella firma
                </button>
              </>
            ) : (
              <div className="border rounded bg-gray-100 h-[160px] flex items-center justify-center text-gray-500">
                Attiva la firma per firmare
              </div>
            )}
          </div>
        </section>

        {/* Azioni */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <button
            onClick={generatePdf}
            className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full"
          >
            Genera Anteprima PDF
          </button>
          <button
            onClick={downloadPdf}
            disabled={!pdfUrl}
            className={`w-full sm:w-auto ${
              pdfUrl
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-gray-300 cursor-not-allowed"
            } text-black font-semibold px-6 py-3 rounded-full`}
          >
            Scarica PDF
          </button>
          <button
            onClick={submit}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full"
          >
            {isSubmitting ? "Invio in corso..." : "Invia a Backoffice"}
          </button>
        </div>

        {/* Anteprima */}
        {pdfUrl && (
          <div className="pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-center text-blue-900 mb-4">
              Anteprima
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-[520px]"
                title="Anteprima PDF"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Componente riutilizzabile per le sezioni upload (stile Dojo) */
function UploadSection({
  title,
  sectionKey,
  onChange,
  getFilesBySection,
  removeFile,
  accent = "blue",
}) {
  const colorMap = {
    blue: ["blue-200", "blue-900", "blue-50", "blue-700", "blue-100"],
    green: ["green-200", "green-900", "green-50", "green-700", "green-100"],
    amber: ["amber-200", "amber-900", "amber-50", "amber-700", "amber-100"],
    purple: [
      "purple-200",
      "purple-900",
      "purple-50",
      "purple-700",
      "purple-100",
    ],
    indigo: [
      "indigo-200",
      "indigo-900",
      "indigo-50",
      "indigo-700",
      "indigo-100",
    ],
  }[accent] || ["blue-200", "blue-900", "blue-50", "blue-700", "blue-100"];

  const [border, titleColor, fileBg, fileText, fileHover] = colorMap;

  return (
    <div
      className={`bg-white border border-${border} rounded-lg p-6 shadow-sm`}
    >
      <div className="space-y-4">
        <h3
          className={`text-lg sm:text-xl font-semibold text-${titleColor} flex items-center gap-2`}
        >
          {title}
        </h3>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => onChange(e, sectionKey)}
          className={`block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-${fileBg} file:text-${fileText}
            hover:file:bg-${fileHover}`}
        />
        <div className="flex flex-wrap gap-4">
          {getFilesBySection(sectionKey).map((preview, idx) => (
            <div
              key={`${sectionKey}-${idx}`}
              className="border border-gray-300 p-2 rounded-lg w-40 relative"
            >
              <button
                onClick={() =>
                  removeFile(
                    getFilesBySection(sectionKey)
                      .slice(0, idx)
                      .reduce((acc) => acc + 1, 0) +
                      fileIndexOffset(sectionKey, idx, getFilesBySection)
                  )
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                title="Rimuovi"
              >
                ×
              </button>
              <p className="text-xs font-medium break-words">{preview.name}</p>
              {preview.type?.startsWith("image/") ? (
                <img
                  src={preview.src}
                  alt="Anteprima"
                  className="mt-2 max-h-32 w-full object-contain"
                />
              ) : (
                <div className="mt-2 h-32 bg-gray-100 flex items-center justify-center rounded">
                  <p className="text-xs text-gray-600 text-center italic">
                    Anteprima non disponibile
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Calcola l’indice assoluto nel vettore filePreviews per il bottone “×”
// (serve perché stiamo mappando per sezione)
function fileIndexOffset(sectionKey, idxInSection, getFilesBySection) {
  const sections = [
    "utenze luce e gas",
    "documento_identita e codice_fiscale",
    "catastale",
    "foto_generatore",
    "visura",
  ];
  let offset = 0;
  for (const s of sections) {
    if (s === sectionKey) break;
    offset += getFilesBySection(s).length;
  }
  return offset + idxInSection;
}
