// CompilerContoTermico.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";

// ✅ endpoint invio (il tuo)
const API_INVIO =
  "https://api.davveroo.it/api/email/meglioefficientare-conto-termico-3";

// ✅ UN SOLO TEMPLATE PDF (mettilo in /public)
// Esempio: /modelloconto.pdf  (cambia nome se diverso)
const TEMPLATE_PDF_URL = "/esecutivo.pdf";

// ✅ marker coordinate
const DEBUG_COORDS = false;

/**
 * ===== COORDINATE =====
 * pdf-lib: (0,0) è BOTTOM-LEFT
 * Metti DEBUG_COORDS=true e regola a precisione.
 */
const POS = {
  // ===== CONTRATTO - PAGINA 1 =====
  c_nome_ragione: { x: 210, y: 493, size: 12 },
  c_cf_piva: { x: 210, y: 475, size: 12 },
  c_residenza_sede: { x: 185, y: 458, size: 12 },
  c_pec_email: { x: 120, y: 438, size: 12 },

  descrizione_tecnica: {
    x: 32,
    y: 50,
    size: 14,
    maxCharsPerLine: 85,
    lineHeight: 14,
    maxLines: 4,
  },

  // ===== CONTRATTO - PAGINA 2 =====
  importo_lavori: { x: 330, y: 775, size: 12 },
  importo_incentivo: { x: 320, y: 595, size: 12 },

  pagamento_diretto: { x: 28, y: 435, size: 1 },
  pagamento_sconto: { x: 28, y: 415, size: 1 },
  pagamento_cessione: { x: 28, y: 398, size: 1 },

  pagamento_cessione_dettaglio: {
    x: 55,
    y: 422,
    size: 11,
    maxCharsPerLine: 90,
    lineHeight: 14,
    maxLines: 2,
  },

  // ===== PAGINA FIRME (ultima del contratto, prima dell’elenco) =====
  luogoedata: { x: 110, y: 215, size: 12 },
  firma_cliente: { x: 120, y: 520, w: 220, h: 65 },
  firma_societa: { x: 420, y: 520, w: 220, h: 65 },

  // ===== ELENCO INTERVENTI (ultima pagina del PDF) =====
  fv_marca_modello: { x: 200, y: 690, size: 13 },
  fv_potenza: { x: 150, y: 672, size: 13 },
  fv_caratteristiche: {
    x: 190,
    y: 650,
    size: 13,
    maxCharsPerLine: 58,
    lineHeight: 16,
    maxLines: 3,
  },

  pdc_marca_modello: { x: 210, y: 540, size: 13 },
  pdc_potenza: { x: 150, y: 518, size: 13 },
  pdc_caratteristiche: {
    x: 190,
    y: 498,
    size: 13,
    maxCharsPerLine: 48,
    lineHeight: 16,
    maxLines: 3,
  },

  clima_quantita: { x: 350, y: 404, size: 13 },
  clima_marca_modello: { x: 210, y: 372, size: 13 },
  clima_potenza: { x: 150, y: 352, size: 13 },
  clima_caratteristiche: {
    x: 190,
    y: 330,
    size: 13,
    maxCharsPerLine: 48,
    lineHeight: 16,
    maxLines: 3,
  },

  sc_marca_modello: { x: 210, y: 205, size: 13 },
  sc_potenza: { x: 150, y: 185, size: 13 },
  sc_caratteristiche: {
    x: 190,
    y: 165,
    size: 13,
    maxCharsPerLine: 48,
    lineHeight: 16,
    maxLines: 2,
  },

  firma_cliente_elenco: { x: 400, y: 115, w: 200, h: 55 },
};

export default function CompilerContoTermico() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    // ===== Cliente (contratto pagina 1) =====
    c_nome_ragione: "",
    c_cf_piva: "",
    c_residenza_sede: "",
    c_pec_email: "",

    descrizione_tecnica: "",

    importo_lavori: "",
    importo_incentivo: "",

    pagamento: "diretto", // "diretto" | "sconto" | "cessione"
    pagamento_cessione_dettaglio: "",

    luogoedata: "",

    // ===== Elenco interventi =====
    fv_marca_modello: "",
    fv_potenza: "",
    fv_caratteristiche: "",

    pdc_marca_modello: "",
    pdc_potenza: "",
    pdc_caratteristiche: "",

    clima_quantita: "",
    clima_marca_modello: "",
    clima_potenza: "",
    clima_caratteristiche: "",

    sc_marca_modello: "",
    sc_potenza: "",
    sc_caratteristiche: "",

    // ===== invio backend =====
    email_invio: "",
    telefono_invio: "",
    nome_invio: "",
    relazioneTesto: "",
  });

  // ---- allegati stile Dojo ----
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [allegati, setAllegati] = useState({
    codice_fiscale: [],
    documento_identita: [],
    catastale: [],
    foto_generatore: [],
    visura: [],
  });

  const [pdfUrl, setPdfUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // firme: contratto (cliente + società)
  const [sigClienteOn, setSigClienteOn] = useState(false);
  const [sigSocietaOn, setSigSocietaOn] = useState(false);
  const sigClienteRef = useRef(null);
  const sigSocietaRef = useRef(null);

  // firma elenco
  const [sigElencoOn, setSigElencoOn] = useState(false);
  const sigElencoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const setPagamento = (v) => setForm((s) => ({ ...s, pagamento: v }));

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

  // --- upload stile Dojo ---
  const handleFileChange = (event, sectionKey) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

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

  // wrap a caratteri
  const wrapTextByChars = (text, maxCharsPerLine = 90) => {
    const raw = String(text || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n");

    const paragraphs = raw.split("\n");
    const lines = [];

    for (const para of paragraphs) {
      const words = para.split(/\s+/).filter(Boolean);
      if (!words.length) {
        lines.push("");
        continue;
      }

      let current = "";
      for (const w of words) {
        const candidate = current ? `${current} ${w}` : w;
        if (candidate.length <= maxCharsPerLine) {
          current = candidate;
        } else {
          if (current) lines.push(current);

          if (w.length > maxCharsPerLine) {
            let chunk = w;
            while (chunk.length > maxCharsPerLine) {
              lines.push(chunk.slice(0, maxCharsPerLine));
              chunk = chunk.slice(maxCharsPerLine);
            }
            current = chunk;
          } else {
            current = w;
          }
        }
      }
      if (current) lines.push(current);
    }

    while (lines.length && lines[lines.length - 1] === "") lines.pop();
    return lines;
  };

  // helper: disegna una X in una checkbox
  const drawX = (page, x, y) => {
    page.drawLine({
      start: { x: x, y: y },
      end: { x: x + 10, y: y + 10 },
      thickness: 1.6,
      color: rgb(0, 0, 0),
    });
    page.drawLine({
      start: { x: x, y: y + 10 },
      end: { x: x + 10, y: y },
      thickness: 1.6,
      color: rgb(0, 0, 0),
    });
  };

  // ----------- GENERA PDF (UN SOLO TEMPLATE) ----------
  const generatePdf = async () => {
    const bytes = await fetch(TEMPLATE_PDF_URL).then((r) => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(bytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const total = pages.length;

    // ✅ TUTTO AVANTI DI UNA PAGINA:
    // - Pagina 1 campi contratto -> pages[1]
    // - Pagina 2 campi contratto -> pages[2]
    // - Pagina firme -> penultima (total - 2)
    // - Elenco interventi -> ultima (total - 1)
    const pageContratto1 = pages[1] || pages[0];
    const pageContratto2 = pages[2] || pages[1] || pages[0];
    const pageFirme = pages[total - 2] || pages[total - 1] || pages[0];
    const pageElenco = pages[total - 1] || pages[0];

    if (!pageContratto1 || !pageContratto2 || !pageFirme || !pageElenco) {
      alert(
        `Errore: PDF non valido o pagine insufficienti. Trovate: ${pages.length}.`,
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

    const drawWrapped = (page, text, opt) => {
      const {
        x,
        y,
        size = 10,
        maxCharsPerLine = 90,
        lineHeight = 12,
        maxLines = 6,
      } = opt || {};

      const lines = wrapTextByChars(text, maxCharsPerLine).slice(0, maxLines);

      lines.forEach((line, idx) => {
        page.drawText(String(line || ""), {
          x,
          y: y - idx * lineHeight,
          size,
          font,
          color: rgb(0, 0, 0),
        });
      });
    };

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

    // ====== CONTRATTO PAGINA 1 ======
    draw(pageContratto1, form.c_nome_ragione, POS.c_nome_ragione);
    draw(pageContratto1, form.c_cf_piva, POS.c_cf_piva);
    draw(pageContratto1, form.c_residenza_sede, POS.c_residenza_sede);
    draw(pageContratto1, form.c_pec_email, POS.c_pec_email);
    drawWrapped(
      pageContratto1,
      form.descrizione_tecnica,
      POS.descrizione_tecnica,
    );

    // ====== CONTRATTO PAGINA 2 ======
    draw(pageContratto2, form.importo_lavori, POS.importo_lavori);
    draw(pageContratto2, form.importo_incentivo, POS.importo_incentivo);

    if (form.pagamento === "diretto") {
      drawX(
        pageContratto2,
        POS.pagamento_diretto.x + 1,
        POS.pagamento_diretto.y,
      );
    }
    if (form.pagamento === "sconto") {
      drawX(pageContratto2, POS.pagamento_sconto.x + 1, POS.pagamento_sconto.y);
    }
    if (form.pagamento === "cessione") {
      drawX(
        pageContratto2,
        POS.pagamento_cessione.x + 1,
        POS.pagamento_cessione.y,
      );
      drawWrapped(
        pageContratto2,
        form.pagamento_cessione_dettaglio,
        POS.pagamento_cessione_dettaglio,
      );
    }

    // ====== PAGINA FIRME ======
    draw(pageFirme, form.luogoedata, POS.luogoedata);

    const sCliente = getSigDataUrl(sigClienteRef);
    const sSocieta = getSigDataUrl(sigSocietaRef);

    if (sCliente) {
      const b = await fetch(sCliente).then((r) => r.arrayBuffer());
      const png = await pdfDoc.embedPng(b);
      pageFirme.drawImage(png, {
        x: POS.firma_cliente.x,
        y: POS.firma_cliente.y,
        width: POS.firma_cliente.w,
        height: POS.firma_cliente.h,
      });
    }

    if (sSocieta) {
      const b = await fetch(sSocieta).then((r) => r.arrayBuffer());
      const png = await pdfDoc.embedPng(b);
      pageFirme.drawImage(png, {
        x: POS.firma_societa.x,
        y: POS.firma_societa.y,
        width: POS.firma_societa.w,
        height: POS.firma_societa.h,
      });
    }

    // ====== ELENCO INTERVENTI (ULTIMA PAGINA) ======
    draw(pageElenco, form.fv_marca_modello, POS.fv_marca_modello);
    draw(pageElenco, form.fv_potenza, POS.fv_potenza);
    drawWrapped(pageElenco, form.fv_caratteristiche, POS.fv_caratteristiche);

    draw(pageElenco, form.pdc_marca_modello, POS.pdc_marca_modello);
    draw(pageElenco, form.pdc_potenza, POS.pdc_potenza);
    drawWrapped(pageElenco, form.pdc_caratteristiche, POS.pdc_caratteristiche);

    draw(pageElenco, form.clima_quantita, POS.clima_quantita);
    draw(pageElenco, form.clima_marca_modello, POS.clima_marca_modello);
    draw(pageElenco, form.clima_potenza, POS.clima_potenza);
    drawWrapped(
      pageElenco,
      form.clima_caratteristiche,
      POS.clima_caratteristiche,
    );

    draw(pageElenco, form.sc_marca_modello, POS.sc_marca_modello);
    draw(pageElenco, form.sc_potenza, POS.sc_potenza);
    drawWrapped(pageElenco, form.sc_caratteristiche, POS.sc_caratteristiche);

    const sElenco = getSigDataUrl(sigElencoRef);
    if (sElenco) {
      const b = await fetch(sElenco).then((r) => r.arrayBuffer());
      const png = await pdfDoc.embedPng(b);
      pageElenco.drawImage(png, {
        x: POS.firma_cliente_elenco.x,
        y: POS.firma_cliente_elenco.y,
        width: POS.firma_cliente_elenco.w,
        height: POS.firma_cliente_elenco.h,
      });
    }

    // ===== DEBUG MARKERS =====
    if (DEBUG_COORDS) {
      [
        ["c_nome_ragione", pageContratto1],
        ["c_cf_piva", pageContratto1],
        ["c_residenza_sede", pageContratto1],
        ["c_pec_email", pageContratto1],
        ["descrizione_tecnica", pageContratto1],

        ["importo_lavori", pageContratto2],
        ["importo_incentivo", pageContratto2],
        ["pagamento_diretto", pageContratto2],
        ["pagamento_sconto", pageContratto2],
        ["pagamento_cessione", pageContratto2],
        ["pagamento_cessione_dettaglio", pageContratto2],

        ["luogoedata", pageFirme],
        ["firma_cliente", pageFirme],
        ["firma_societa", pageFirme],

        ["fv_marca_modello", pageElenco],
        ["fv_potenza", pageElenco],
        ["fv_caratteristiche", pageElenco],
        ["pdc_marca_modello", pageElenco],
        ["pdc_potenza", pageElenco],
        ["pdc_caratteristiche", pageElenco],
        ["clima_quantita", pageElenco],
        ["clima_marca_modello", pageElenco],
        ["clima_potenza", pageElenco],
        ["clima_caratteristiche", pageElenco],
        ["sc_marca_modello", pageElenco],
        ["sc_potenza", pageElenco],
        ["sc_caratteristiche", pageElenco],
        ["firma_cliente_elenco", pageElenco],
      ].forEach(([k, pg]) => debugMark(pg, k, POS[k]));
    }

    const out = await pdfDoc.save();
    const blob = new Blob([out], { type: "application/pdf" });

    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  // ----------- INVIO (allega PDF finale) ----------
  const submit = async () => {
    if (!pdfUrl) return alert("Genera prima il PDF.");

    if (!String(form.email_invio || "").trim()) {
      return alert("Inserisci la mail del cliente per l’invio (obbligatoria).");
    }

    setIsSubmitting(true);
    try {
      const pdfBlob = await fetch(pdfUrl).then((r) => r.blob());
      const pdfBase64 = await fileToBase64(
        new File([pdfBlob], "conto_termico_ct3_completo.pdf", {
          type: "application/pdf",
        }),
      );

      const packMany = async (filesArr) =>
        Promise.all(
          (filesArr || []).map(async (f) => ({
            filename: f.name,
            base64: await fileToBase64(f),
            contentType: f.type || "application/octet-stream",
          })),
        );

      const grouped = {
        codice_fiscale: await packMany(allegati.codice_fiscale),
        documento_identita: await packMany(allegati.documento_identita),
        catastale: await packMany(allegati.catastale),
        foto_generatore: await packMany(allegati.foto_generatore),
        visura: await packMany(allegati.visura),

        pdf_modulo: [
          {
            filename: "conto_termico_ct3_completo.pdf",
            base64: pdfBase64,
            contentType: "application/pdf",
          },
        ],
      };

      const attachments = Object.values(grouped).flat();

      const payload = {
        nome: form.nome_invio || form.c_nome_ragione || "",
        cognome: "",
        email: form.email_invio,
        telefono: form.telefono_invio || "",
        messaggio: "",
        attachments,

        contratto: {
          c_nome_ragione: form.c_nome_ragione,
          c_cf_piva: form.c_cf_piva,
          c_residenza_sede: form.c_residenza_sede,
          c_pec_email: form.c_pec_email,
          descrizione_tecnica: form.descrizione_tecnica,
          importo_lavori: form.importo_lavori,
          importo_incentivo: form.importo_incentivo,
          pagamento: form.pagamento,
          pagamento_cessione_dettaglio: form.pagamento_cessione_dettaglio,
          luogoedata: form.luogoedata,
        },
        elenco_interventi: {
          fv_marca_modello: form.fv_marca_modello,
          fv_potenza: form.fv_potenza,
          fv_caratteristiche: form.fv_caratteristiche,
          pdc_marca_modello: form.pdc_marca_modello,
          pdc_potenza: form.pdc_potenza,
          pdc_caratteristiche: form.pdc_caratteristiche,
          clima_quantita: form.clima_quantita,
          clima_marca_modello: form.clima_marca_modello,
          clima_potenza: form.clima_potenza,
          clima_caratteristiche: form.clima_caratteristiche,
          sc_marca_modello: form.sc_marca_modello,
          sc_potenza: form.sc_potenza,
          sc_caratteristiche: form.sc_caratteristiche,
        },

        allegati: grouped,
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

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
            Conto Termico 3.0 — PDF Unico (Contratto + Elenco)
          </h2>
          <button
            onClick={() => nav("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-50"
          >
            ⬅️ Home
          </button>
        </div>

        {/* ========= DATI CLIENTE (contratto) ========= */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Dati Cliente (Contratto)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-2"
              name="c_nome_ragione"
              placeholder="Nome / Ragione sociale"
              value={form.c_nome_ragione}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="c_cf_piva"
              placeholder="Codice Fiscale / P.IVA"
              value={form.c_cf_piva}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="c_pec_email"
              placeholder="PEC / E-mail (contratto)"
              value={form.c_pec_email}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-2"
              name="c_residenza_sede"
              placeholder="Residenza / Sede"
              value={form.c_residenza_sede}
              onChange={onChange}
            />
          </div>
        </section>

        {/* ========= DESCRIZIONE TECNICA ========= */}
        <section className="space-y-2">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Descrizione tecnica dell’intervento (Art. 2)
          </h3>
          <textarea
            className="w-full h-24 px-3 py-2 border rounded-lg"
            name="descrizione_tecnica"
            placeholder="Descrizione tecnica dell’intervento..."
            value={form.descrizione_tecnica}
            onChange={onChange}
          />
        </section>

        {/* ========= IMPORTI ========= */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Importi (Art. 3 / Art. 4)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              className="px-3 py-2 border rounded-lg"
              name="importo_lavori"
              placeholder="Importo complessivo lavori (€)"
              value={form.importo_lavori}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="importo_incentivo"
              placeholder="Importo stimato incentivo (€)"
              value={form.importo_incentivo}
              onChange={onChange}
            />
          </div>
        </section>

        {/* ========= MODALITÀ PAGAMENTO ========= */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Modalità di pagamento (Art. 5)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer">
              <input
                type="radio"
                name="pagamento"
                checked={form.pagamento === "diretto"}
                onChange={() => setPagamento("diretto")}
              />
              <span>Pagamento diretto</span>
            </label>

            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer">
              <input
                type="radio"
                name="pagamento"
                checked={form.pagamento === "sconto"}
                onChange={() => setPagamento("sconto")}
              />
              <span>Sconto in fattura</span>
            </label>

            <label className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer">
              <input
                type="radio"
                name="pagamento"
                checked={form.pagamento === "cessione"}
                onChange={() => setPagamento("cessione")}
              />
              <span>Cessione incentivo</span>
            </label>
          </div>

          {form.pagamento === "cessione" && (
            <textarea
              className="w-full h-20 px-3 py-2 border rounded-lg"
              name="pagamento_cessione_dettaglio"
              placeholder="Modalità dettagliata (cessione incentivo)..."
              value={form.pagamento_cessione_dettaglio}
              onChange={onChange}
            />
          )}
        </section>

        {/* ========= LUOGO E DATA ========= */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Luogo e data (pagina firme)
          </h3>
          <input
            className="px-3 py-2 border rounded-lg w-full"
            name="luogoedata"
            placeholder="Es: Rende, 19/09/2025"
            value={form.luogoedata}
            onChange={onChange}
          />
        </section>

        {/* ========= ELENCO INTERVENTI ========= */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-blue-900">
            Elenco interventi (ultima pagina)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Block title="1) Fotovoltaico">
              <input
                className="px-3 py-2 border rounded-lg w-full"
                name="fv_marca_modello"
                placeholder="Marca e Modello"
                value={form.fv_marca_modello}
                onChange={onChange}
              />
              <input
                className="px-3 py-2 border rounded-lg w-full mt-2"
                name="fv_potenza"
                placeholder="Potenza"
                value={form.fv_potenza}
                onChange={onChange}
              />
              <textarea
                className="px-3 py-2 border rounded-lg w-full mt-2 h-20"
                name="fv_caratteristiche"
                placeholder="Caratteristiche"
                value={form.fv_caratteristiche}
                onChange={onChange}
              />
            </Block>

            <Block title="2) Pompa di calore">
              <input
                className="px-3 py-2 border rounded-lg w-full"
                name="pdc_marca_modello"
                placeholder="Marca e Modello"
                value={form.pdc_marca_modello}
                onChange={onChange}
              />
              <input
                className="px-3 py-2 border rounded-lg w-full mt-2"
                name="pdc_potenza"
                placeholder="Potenza"
                value={form.pdc_potenza}
                onChange={onChange}
              />
              <textarea
                className="px-3 py-2 border rounded-lg w-full mt-2 h-20"
                name="pdc_caratteristiche"
                placeholder="Caratteristiche"
                value={form.pdc_caratteristiche}
                onChange={onChange}
              />
            </Block>

            <Block title="3) Climatizzatori +++ A">
              <input
                className="px-3 py-2 border rounded-lg w-full"
                name="clima_quantita"
                placeholder="Quantità"
                value={form.clima_quantita}
                onChange={onChange}
              />
              <input
                className="px-3 py-2 border rounded-lg w-full mt-2"
                name="clima_marca_modello"
                placeholder="Marca e Modello"
                value={form.clima_marca_modello}
                onChange={onChange}
              />
              <input
                className="px-3 py-2 border rounded-lg w-full mt-2"
                name="clima_potenza"
                placeholder="Potenza"
                value={form.clima_potenza}
                onChange={onChange}
              />
              <textarea
                className="px-3 py-2 border rounded-lg w-full mt-2 h-20"
                name="clima_caratteristiche"
                placeholder="Caratteristiche"
                value={form.clima_caratteristiche}
                onChange={onChange}
              />
            </Block>

            <Block title="4) Scaldacqua +++ A / Solare termico">
              <input
                className="px-3 py-2 border rounded-lg w-full"
                name="sc_marca_modello"
                placeholder="Marca e Modello"
                value={form.sc_marca_modello}
                onChange={onChange}
              />
              <input
                className="px-3 py-2 border rounded-lg w-full mt-2"
                name="sc_potenza"
                placeholder="Potenza"
                value={form.sc_potenza}
                onChange={onChange}
              />
              <textarea
                className="px-3 py-2 border rounded-lg w-full mt-2 h-20"
                name="sc_caratteristiche"
                placeholder="Caratteristiche"
                value={form.sc_caratteristiche}
                onChange={onChange}
              />
            </Block>
          </div>
        </section>

        {/* ========= FIRME ========= */}
        <section className="bg-gray-50 p-4 rounded-lg space-y-6">
          <h3 className="text-lg font-semibold text-blue-900">Firme</h3>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-blue-900">
                Firma Cliente (Contratto)
              </p>
              <button
                onClick={() => setSigClienteOn((v) => !v)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  sigClienteOn
                    ? "bg-red-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {sigClienteOn ? "🔓 Disattiva" : "🔒 Attiva"}
              </button>
            </div>

            {sigClienteOn ? (
              <>
                <div className="border rounded bg-white overflow-hidden">
                  <SignatureCanvas
                    ref={sigClienteRef}
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
                  onClick={() => clearSig(sigClienteRef)}
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-blue-900">
                Firma Società (Contratto)
              </p>
              <button
                onClick={() => setSigSocietaOn((v) => !v)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  sigSocietaOn
                    ? "bg-red-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {sigSocietaOn ? "🔓 Disattiva" : "🔒 Attiva"}
              </button>
            </div>

            {sigSocietaOn ? (
              <>
                <div className="border rounded bg-white overflow-hidden">
                  <SignatureCanvas
                    ref={sigSocietaRef}
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
                  onClick={() => clearSig(sigSocietaRef)}
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-blue-900">
                Firma Cliente (Elenco interventi)
              </p>
              <button
                onClick={() => setSigElencoOn((v) => !v)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  sigElencoOn
                    ? "bg-red-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {sigElencoOn ? "🔓 Disattiva" : "🔒 Attiva"}
              </button>
            </div>

            {sigElencoOn ? (
              <>
                <div className="border rounded bg-white overflow-hidden">
                  <SignatureCanvas
                    ref={sigElencoRef}
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
                  onClick={() => clearSig(sigElencoRef)}
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

        {/* ========= UPLOAD DOCUMENTI ========= */}
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

        {/* ========= INVIO / PREVIEW ========= */}
        <section className="space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
            Dati invio (backend)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-2"
              name="email_invio"
              placeholder="Mail cliente (obbligatoria per invio)"
              value={form.email_invio}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg"
              name="telefono_invio"
              placeholder="Telefono"
              value={form.telefono_invio}
              onChange={onChange}
            />
            <input
              className="px-3 py-2 border rounded-lg sm:col-span-3"
              name="nome_invio"
              placeholder="Nome (opzionale, root payload)"
              value={form.nome_invio}
              onChange={onChange}
            />
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <button
            onClick={generatePdf}
            className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full"
          >
            Genera Anteprima PDF
          </button>

          <button
            onClick={() =>
              pdfUrl && saveAs(pdfUrl, "conto_termico_ct3_completo.pdf")
            }
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

        {pdfUrl && (
          <div className="pt-4">
            <h3 className="text-lg sm:text-xl font-semibold text-center text-blue-900 mb-4">
              Anteprima
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-[620px]"
                title="Anteprima PDF Completo"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="font-semibold text-blue-900 mb-2">{title}</div>
      {children}
    </div>
  );
}

/** UploadSection (stile Dojo) */
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
