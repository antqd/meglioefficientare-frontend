// CompilerContoTermico.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";

// ✅ NUOVO ENDPOINT (quello che hai incollato tu)
const API_INVIO =
  "https://api.davveroo.it/api/email/meglioefficientare-conto-termico-3";

// ✅ Metti true quando vuoi vedere sul PDF i marker delle coordinate (pallino + nome campo)
const DEBUG_COORDS = false;

// ====== Coordinate di stampa (NON MODIFICATE) ======
const POS = {
  // FIRME pagina 4 (più piccole)
  firma_benef_p4: { x: 120, y: 110, w: 140, h: 45 },
  firma_resp_p4: { x: 420, y: 110, w: 140, h: 45 },

  // Pagina 4 (nel PDF) - PRIVATO
  p_nome: { x: 145, y: 680, size: 12 },
  p_iban: { x: 340, y: 640, size: 12 },
  p_zona: { x: 390, y: 618, size: 12 },
  p_indirizzo: { x: 110, y: 660, size: 12 },
  p_comune: { x: 110, y: 640, size: 12 },
  p_telefono: { x: 115, y: 623, size: 12 },
  p_mail: { x: 90, y: 595, size: 12 },
  p_categoria: { x: 420, y: 595, size: 12 },

  // Pagina 4 (nel PDF) - AZIENDA
  a_denominazione: { x: 145, y: 525, size: 12 },
  a_iban: { x: 340, y: 478, size: 12 },
  a_zona: { x: 390, y: 460, size: 12 },
  a_indirizzo: { x: 110, y: 502, size: 12 },
  a_comune: { x: 120, y: 478, size: 12 },
  a_telefono: { x: 120, y: 460, size: 12 },
  a_mail: { x: 90, y: 440, size: 12 },
  a_categoria: { x: 415, y: 439, size: 12 },

  // Pagina 5 (nel PDF)
  luogoedata: { x: 116, y: 195, size: 12 },
  firma_benef: { x: 120, y: 145, w: 180, h: 60 },
  firma_resp: { x: 420, y: 145, w: 180, h: 60 },
};

export default function CompilerContoTermico() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    // PRIVATO
    p_nome: "",
    p_iban: "",
    p_indirizzo: "",
    p_comune: "",
    p_zona: "",
    p_telefono: "",
    p_mail: "",
    p_categoria: "",

    // AZIENDA
    a_denominazione: "",
    a_iban: "",
    a_indirizzo: "",
    a_comune: "",
    a_zona: "",
    a_telefono: "",
    a_mail: "",
    a_categoria: "",

    // Pagina 5
    luogoedata: "",

    // Relazione tecnica commerciale (verrà allegata come .txt dal backend)
    relazioneTesto: "",
  });

  // ---- Stato allegati in stile Dojo (con preview) ----
  const [files, setFiles] = useState([]); // tutti i file caricati (riepilogo)
  const [filePreviews, setFilePreviews] = useState([]); // preview con id

  // Per la POST strutturata a gruppi:
  const [allegati, setAllegati] = useState({
    codice_fiscale: [],
    documento_identita: [],
    catastale: [],
    foto_generatore: [],
    visura: [],
  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const pdfUrlRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sig1On, setSig1On] = useState(false);
  const [sig2On, setSig2On] = useState(false);
  const sigBenefRef = useRef(null);
  const sigRespRef = useRef(null);

  // cleanup corretto: revoca SEMPRE la vecchia url quando cambia / unmount
  useEffect(() => {
    const prev = pdfUrlRef.current;
    if (prev && prev !== pdfUrl) {
      try {
        URL.revokeObjectURL(prev);
      } catch {}
    }
    pdfUrlRef.current = pdfUrl;

    return () => {
      if (pdfUrlRef.current) {
        try {
          URL.revokeObjectURL(pdfUrlRef.current);
        } catch {}
      }
    };
  }, [pdfUrl]);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

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

  // --- Helpers upload stile Dojo (remove preciso con id) ---
  const handleFileChange = (event, sectionKey) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    // reset input così puoi ricaricare lo stesso file se vuoi
    event.target.value = "";

    selectedFiles.forEach((file) => {
      Object.defineProperty(file, "section", {
        value: sectionKey,
        enumerable: true,
      });

      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setFiles((prev) => [...prev, file]);

      if (file.type?.startsWith("image/")) {
        const r = new FileReader();
        r.onload = (ev) =>
          setFilePreviews((p) => [
            ...p,
            {
              id,
              src: ev.target.result,
              section: sectionKey,
              name: file.name,
              type: file.type,
              size: file.size,
            },
          ]);
        r.readAsDataURL(file);
      } else {
        setFilePreviews((p) => [
          ...p,
          {
            id,
            src: null,
            section: sectionKey,
            name: file.name,
            type: file.type,
            size: file.size,
          },
        ]);
      }

      setAllegati((s) => ({
        ...s,
        [sectionKey]: [...(s[sectionKey] || []), file],
      }));
    });
  };

  const removeFileById = (previewId) => {
    const prev = filePreviews.find((p) => p.id === previewId);
    if (!prev) return;

    const sectionKey = prev.section;
    const name = prev.name;

    setFilePreviews((p) => p.filter((x) => x.id !== previewId));

    setFiles((prevFiles) =>
      prevFiles.filter((f) => !(f.name === name && f.section === sectionKey)),
    );

    setAllegati((s) => ({
      ...s,
      [sectionKey]: (s[sectionKey] || []).filter((f) => f.name !== name),
    }));
  };

  const getFilesBySection = (sectionKey) =>
    filePreviews.filter((p) => p.section === sectionKey);

  // ----------- GENERA PDF ----------
  const generatePdf = async () => {
    const bytes = await fetch("/modelloconto.pdf").then((r) => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(bytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const page4 = pages[3];
    const page5 = pages[4];

    if (!page4 || !page5) {
      alert(
        `Errore: il PDF non ha abbastanza pagine. Trovate: ${pages.length}. Servono almeno 5 pagine.`,
      );
      return;
    }

    const draw = (page, text, { x, y, size = 12 }) =>
      page.drawText(String(text || ""), {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });

    const debugMark = (page, label, { x, y }) => {
      page.drawCircle({ x, y, size: 2.2, color: rgb(1, 0, 0) });
      page.drawText(label, {
        x: x + 6,
        y: y - 2,
        size: 7,
        font,
        color: rgb(1, 0, 0),
      });
    };

    // ====== TEXT P4 ======
    draw(page4, form.p_nome, POS.p_nome);
    draw(page4, form.p_iban, POS.p_iban);
    draw(page4, form.p_zona, POS.p_zona);
    draw(page4, form.p_indirizzo, POS.p_indirizzo);
    draw(page4, form.p_comune, POS.p_comune);
    draw(page4, form.p_telefono, POS.p_telefono);
    draw(page4, form.p_mail, POS.p_mail);
    draw(page4, form.p_categoria, POS.p_categoria);

    draw(page4, form.a_denominazione, POS.a_denominazione);
    draw(page4, form.a_iban, POS.a_iban);
    draw(page4, form.a_zona, POS.a_zona);
    draw(page4, form.a_indirizzo, POS.a_indirizzo);
    draw(page4, form.a_comune, POS.a_comune);
    draw(page4, form.a_telefono, POS.a_telefono);
    draw(page4, form.a_mail, POS.a_mail);
    draw(page4, form.a_categoria, POS.a_categoria);

    // ====== TEXT P5 ======
    draw(page5, form.luogoedata, POS.luogoedata);

    // ====== FIRME su P4 + P5 (NON SOLO UNA) ======
    const s1 = getSigDataUrl(sigBenefRef);
    const s2 = getSigDataUrl(sigRespRef);

    const drawSig = async (sigDataUrl, page, pos) => {
      if (!sigDataUrl) return;
      const bytes = await fetch(sigDataUrl).then((r) => r.arrayBuffer());
      const png = await pdfDoc.embedPng(bytes);
      page.drawImage(png, {
        x: pos.x,
        y: pos.y,
        width: pos.w,
        height: pos.h,
      });
    };

    // Beneficiario
    await drawSig(s1, page4, POS.firma_benef_p4);
    await drawSig(s1, page5, POS.firma_benef);

    // Responsabile
    await drawSig(s2, page4, POS.firma_resp_p4);
    await drawSig(s2, page5, POS.firma_resp);

    // ====== DEBUG ======
    if (DEBUG_COORDS) {
      const keysP4 = [
        "p_nome",
        "p_iban",
        "p_zona",
        "p_indirizzo",
        "p_comune",
        "p_telefono",
        "p_mail",
        "p_categoria",
        "a_denominazione",
        "a_iban",
        "a_zona",
        "a_indirizzo",
        "a_comune",
        "a_telefono",
        "a_mail",
        "a_categoria",
        "firma_benef_p4",
        "firma_resp_p4",
      ];
      keysP4.forEach((k) => POS[k] && debugMark(page4, k, POS[k]));

      const keysP5 = ["luogoedata"];
      keysP5.forEach((k) => POS[k] && debugMark(page5, k, POS[k]));
      debugMark(page5, "firma_benef", POS.firma_benef);
      debugMark(page5, "firma_resp", POS.firma_resp);
    }

    const out = await pdfDoc.save();
    const blob = new Blob([out], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const downloadPdf = () =>
    pdfUrl && saveAs(pdfUrl, "contratto_conto_termico.pdf");

  // ----------- INVIO (payload “pulito” per buildContoTermico3Payload) ----------
  const submit = async () => {
    if (!pdfUrl) return alert("Genera prima il PDF.");

    const clientEmail = (form.p_mail || form.a_mail || "").trim();
    if (!clientEmail) return alert("Inserisci una mail (Privato o Azienda).");

    setIsSubmitting(true);
    try {
      // PDF generato -> base64
      const pdfBlob = await fetch(pdfUrl).then((r) => r.blob());
      const pdfBase64 = await fileToBase64(
        new File([pdfBlob], "contratto_conto_termico.pdf", {
          type: "application/pdf",
        }),
      );

      // firme -> base64 (solo contenuto, senza prefix)
      const s1 = getSigDataUrl(sigBenefRef);
      const s2 = getSigDataUrl(sigRespRef);
      const firmaBenefBase64 = s1 ? String(s1).split(",")[1] : null;
      const firmaRespBase64 = s2 ? String(s2).split(",")[1] : null;

      // packMany: File[] -> { filename, base64, mime }[]
      const packMany = async (filesArr) =>
        Promise.all(
          (filesArr || []).map(async (f) => ({
            filename: f.name,
            base64: await fileToBase64(f),
            mime: f.type || "application/octet-stream",
          })),
        );

      // ✅ BODY per buildContoTermico3Payload(req.body)
      // - clientEmail OBBLIGATORIA (lato backend te la controlla)
      // - subject opzionale: se non lo metti, buildContoTermico3Payload può generarlo
      // - data + allegati già normalizzati
      const body = {
        clientEmail,
        subject: `Conto Termico 3.0 — pratica ricevuta (${clientEmail})`,
        dati: {
          privato: {
            nome: form.p_nome,
            iban: form.p_iban,
            indirizzo: form.p_indirizzo,
            comune: form.p_comune,
            zona: form.p_zona,
            telefono: form.p_telefono,
            email: form.p_mail,
            categoria_catastale: form.p_categoria,
          },
          azienda: {
            denominazione: form.a_denominazione,
            iban: form.a_iban,
            indirizzo: form.a_indirizzo,
            comune: form.a_comune,
            zona: form.a_zona,
            telefono: form.a_telefono,
            email: form.a_mail,
            categoria_catastale: form.a_categoria,
          },
          luogoedata: form.luogoedata,
          relazioneTesto: form.relazioneTesto,
        },
        allegati: {
          // documenti utente
          codice_fiscale: await packMany(allegati.codice_fiscale),
          documento_identita: await packMany(allegati.documento_identita),
          catastale: await packMany(allegati.catastale),
          foto_generatore: await packMany(allegati.foto_generatore),
          visura: await packMany(allegati.visura),

          // modulo pdf generato
          pdf_modulo: [
            {
              filename: "contratto_conto_termico.pdf",
              base64: pdfBase64,
              mime: "application/pdf",
            },
          ],

          // firme (opzionali)
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
        body: JSON.stringify(body),
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
      alert("Errore invio: " + (e?.message || e));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top bar */}
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
              name="p_iban"
              placeholder="IBAN"
              value={form.p_iban}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_zona"
              placeholder="Zona Climatica"
              value={form.p_zona}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="p_categoria"
              placeholder="Categoria catastale"
              value={form.p_categoria}
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
              placeholder="Mail (cliente)"
              value={form.p_mail}
              onChange={onChange}
            />
          </div>
          <p className="text-xs text-gray-500">
            La mail del cliente viene presa da <b>Privato</b> se presente,
            altrimenti da <b>Azienda</b>.
          </p>
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
              name="a_zona"
              placeholder="Zona Climatica"
              value={form.a_zona}
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
              placeholder="Mail azienda"
              value={form.a_mail}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="a_categoria"
              placeholder="Categoria catastale"
              value={form.a_categoria}
              onChange={onChange}
            />
          </div>
        </section>

        {/* Pagina 5 */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Luogo e data (pagina 5)
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
            (lato backend) nella mail.
          </p>
        </section>

        {/* Allegati */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 text-center">
            Caricamento Documenti
          </h2>

          <UploadSection
            title="🧾 Codice Fiscale"
            sectionKey="codice_fiscale"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFileById={removeFileById}
            accent="blue"
          />

          <UploadSection
            title="🆔 Documenti di identità"
            sectionKey="documento_identita"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFileById={removeFileById}
            accent="green"
          />

          <UploadSection
            title="🏠 Catastale immobile"
            sectionKey="catastale"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFileById={removeFileById}
            accent="amber"
          />

          <UploadSection
            title="📸 Foto vecchio generatore"
            sectionKey="foto_generatore"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFileById={removeFileById}
            accent="purple"
          />

          <UploadSection
            title="📋 Visura camerale"
            sectionKey="visura"
            onChange={handleFileChange}
            getFilesBySection={getFilesBySection}
            removeFileById={removeFileById}
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

/** Sezioni upload (stile Dojo) */
function UploadSection({
  title,
  sectionKey,
  onChange,
  getFilesBySection,
  removeFileById,
  accent = "blue",
}) {
  const styles = useMemo(() => {
    const map = {
      blue: {
        wrap: "bg-white border border-blue-200 rounded-lg p-6 shadow-sm",
        title:
          "text-lg sm:text-xl font-semibold text-blue-900 flex items-center gap-2",
        file: "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
      },
      green: {
        wrap: "bg-white border border-green-200 rounded-lg p-6 shadow-sm",
        title:
          "text-lg sm:text-xl font-semibold text-green-900 flex items-center gap-2",
        file: "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100",
      },
      amber: {
        wrap: "bg-white border border-amber-200 rounded-lg p-6 shadow-sm",
        title:
          "text-lg sm:text-xl font-semibold text-amber-900 flex items-center gap-2",
        file: "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100",
      },
      purple: {
        wrap: "bg-white border border-purple-200 rounded-lg p-6 shadow-sm",
        title:
          "text-lg sm:text-xl font-semibold text-purple-900 flex items-center gap-2",
        file: "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100",
      },
      indigo: {
        wrap: "bg-white border border-indigo-200 rounded-lg p-6 shadow-sm",
        title:
          "text-lg sm:text-xl font-semibold text-indigo-900 flex items-center gap-2",
        file: "block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100",
      },
    };

    return map[accent] || map.blue;
  }, [accent]);

  const previews = getFilesBySection(sectionKey);

  return (
    <div className={styles.wrap}>
      <div className="space-y-4">
        <h3 className={styles.title}>{title}</h3>

        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => onChange(e, sectionKey)}
          className={styles.file}
        />

        <div className="flex flex-wrap gap-4">
          {previews.map((preview) => (
            <div
              key={preview.id}
              className="border border-gray-300 p-2 rounded-lg w-40 relative"
            >
              <button
                onClick={() => removeFileById(preview.id)}
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
