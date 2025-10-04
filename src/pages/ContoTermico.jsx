// ContoTermico.jsx
// Pagina completa: Hero, Novità, Interventi, Come richiedere, Combo FV+PDC, Calcolatore, FAQ, CTA, Footer
// Stack: React + TailwindCSS + GSAP (@gsap/react)
// Istruzioni: npm i gsap @gsap/react

import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// === Backend base URL: prendi da VITE_BACKEND_URL o fallback locale ===
const BASE = import.meta.env.VITE_BACKEND_URL || "https://bc.davveroo.it/api";

const euro = (v) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    Number(v) || 0
  );

// 🔧 Array prodotti — riempi/modifica liberamente (emoji, SVG o <img/>)
const PRODOTTI = [
  { id: "fv", nome: "Impianto Fotovoltaico", img: "/images/pannelli.png" },
  { id: "pdc", nome: "Pompa di Calore", img: "/images/pompa.png" },
  // { id: "st",  nome: "Solare Termico",        img: "/images/solare.png" },
  // { id: "acc", nome: "Batteria di Accumulo",  img: "/images/batteria.png" },
];

// Opzioni edificio per lo step successivo alla scelta prodotto
const EDIFICI = [
  { id: "schiera", label: "Casa a schiera", icon: "🏘️" },
  { id: "unifamiliare", label: "Casa unifamiliare", icon: "🏠" },
  { id: "palazzina", label: "Palazzina (fino a 6 famiglie)", icon: "🏢" },
  { id: "condominio", label: "Condominio (più di 6 famiglie)", icon: "🏙️" },
  { id: "commerciale", label: "Edificio commerciale", icon: "🏬" },
  { id: "pergolati", label: "Pergolati & Altro", icon: "🏗️" },
];

export default function ContoTermico() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".hero-stagger", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
      gsap.utils.toArray(".reveal").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () =>
            gsap.fromTo(
              el,
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
            ),
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="min-h-screen bg-white text-slate-900">
      <Header />
      <Hero />
      <GuideDownload />
      <Highlights />
      <Interventi />
      <HowTo />
      <Combo />
      <CalcolatoreSection />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-3">
        <a href="/">
          <img
            src="/images/logo.png"
            alt="Meglio Efficientare"
            className="h-14 w-66"
          />
        </a>

        <nav className="ml-auto hidden md:flex items-center gap-4 text-sm font-medium text-slate-700">
          <a href="#novita" className="hover:text-orange-600">
            Novità
          </a>
          <a href="#interventi" className="hover:text-orange-600">
            Interventi
          </a>
          <a href="#richiesta" className="hover:text-orange-600">
            Come richiederlo
          </a>
          <Link
            to="/compilazione"
            className="rounded-full bg-orange-600 text-white px-4 py-2 shadow-sm hover:bg-orange-700"
          >
            Attiva Ora!
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-[#FFF7F0] md:bg-gradient-to-br md:from-orange-50 md:to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="hero-stagger mt-4 text-3xl md:text-5xl font-black leading-tight">
            Conto Termico 3.0 – incentivi fino al 65%
          </h1>
          <p className="hero-stagger mt-4 text-lg text-slate-700">
            Guida pratica per privati, imprese e PA. Calcolo immediato e sezioni
            chiare per capire come ottenere gli incentivi.
          </p>
          <div className="hero-stagger mt-6 flex flex-wrap gap-3">
            <a
              href="#calcolatore"
              className="rounded-full bg-orange-600 text-white px-6 py-3 text-base font-semibold hover:bg-orange-700"
            >
              Calcola il tuo incentivo
            </a>
            <a
              href="#novita"
              className="rounded-full border px-6 py-3 text-base font-semibold hover:border-orange-300"
            >
              Scopri le novità
            </a>
          </div>
        </div>
        <div className="hero-stagger">
          <div className="rounded-3xl border bg-white p-4 sm:p-6 shadow-sm">
            <SimpleCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideDownload() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-white p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm">
          <div className="flex-1">
            <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold">
              Risorsa gratuita
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
              Scarica la guida completa al Conto Termico
            </h2>
            <p className="mt-3 text-base text-slate-700 leading-relaxed">
              Una panoramica operativa con requisiti, documentazione e
              tempistiche per ottenere gli incentivi GSE.
            </p>
          </div>
          <a
            href="/modelloconto.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-white font-semibold shadow hover:bg-orange-700"
          >
            Scarica il PDF
            <span aria-hidden="true">⬇️</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section id="novita" className="reveal py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Novità principali 2025
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            title="FV + Accumulo + Colonnine"
            text="Incentivabili se abbinati alla sostituzione dell'impianto con una pompa di calore."
          />
          <Card
            title="Nuovi beneficiari"
            text="CER, terzo settore e imprese (riduzione consumi ≥10%, stop ai fossili)."
          />
          <Card
            title="PA piccoli comuni"
            text="Per comuni < 15.000 abitanti, scuole e ospedali: fino al 100% della spesa."
          />
          <Card
            title="Budget 900M€"
            text="400M€ PA, 500M€ privati e imprese. Erogazioni GSE rapide."
          />
        </div>
      </div>
    </section>
  );
}

function Card({ title, text }) {
  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-700">{text}</p>
    </div>
  );
}

function Interventi() {
  return (
    <section id="interventi" className="reveal py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Interventi incentivati e percentuali
        </h2>
        <div className="overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Tipo Intervento</th>
                <th className="p-3">Descrizione</th>
                <th className="p-3">Chi</th>
                <th className="p-3">Incentivo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{r.tipo}</td>
                  <td className="p-3">{r.desc}</td>
                  <td className="p-3">{r.chi}</td>
                  <td className="p-3">{r.incentivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const rows = [
  {
    tipo: "Efficienza Energetica",
    desc: "Cappotto, infissi, illuminazione",
    chi: "PA + Privati/Terziario",
    incentivo: "Fino al 40%",
  },
  {
    tipo: "Pompe di calore",
    desc: "Sostituzione caldaie",
    chi: "Tutti i soggetti",
    incentivo: "Fino al 65%",
  },
  {
    tipo: "Solare termico",
    desc: "ACS da rinnovabile",
    chi: "Tutti i soggetti",
    incentivo: "Fino al 65%",
  },
  {
    tipo: "Biomasse",
    desc: "Stufe/caldaie a pellet/legna",
    chi: "Tutti i soggetti",
    incentivo: "Fino al 65%",
  },
  {
    tipo: "FV + Accumulo",
    desc: "Solo se abbinato a PDC",
    chi: "Tutti i soggetti",
    incentivo: "Fino al 65%",
  },
  {
    tipo: "Colonnine ricarica",
    desc: "Solo con PDC",
    chi: "Tutti i soggetti",
    incentivo: "Fino al 65%",
  },
];

function HowTo() {
  return (
    <section id="richiesta" className="reveal py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Come richiedere il Conto Termico 3.0
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold mb-2">Scadenze e modalità</h3>
            <ul className="space-y-2 text-slate-700">
              <li>
                📅 <b>Entro 90 giorni</b> dalla fine lavori (accesso diretto).
              </li>
              <li>
                🌐 Domanda tramite <b>portale GSE</b> oppure tramite{" "}
                <b>ESCo UNI 11352</b>.
              </li>
              <li>
                ⏱️ Importi ≤ 15.000€: pagamento in unica soluzione (~60 giorni).
              </li>
              <li>
                💳 Importi maggiori: 2–5 rate annuali a seconda dell'intervento.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold mb-2">Documenti</h3>
            <ul className="space-y-2 text-slate-700">
              <li>📄 Documentazione tecnica e relazioni</li>
              <li>🧾 Fatture e quietanze</li>
              <li>📐 Certificazioni/APE</li>
              <li>🛠️ Asseverazione tecnica</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Combo() {
  return (
    <section id="combo" className="reveal py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          L'abbinata vincente: Fotovoltaico + Pompa di calore
        </h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">Perché conviene</h3>
            <ul className="space-y-2 text-slate-700">
              <li>⚡ Produci energia con il fotovoltaico</li>
              <li>🔥 Riscaldi/raffreschi con la pompa di calore</li>
              <li>🚗 Puoi integrare colonnine per auto elettrica</li>
              <li>💶 Rimborso fino al 65% delle spese</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="text-lg font-semibold mb-2">
              Spazio immagine/schemi
            </h3>
            <div className="mt-2 aspect-[16/10] rounded-xl bg-slate-100 grid place-items-center text-slate-500">
              Inserisci una foto del tuo impianto
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcolatoreSection() {
  return (
    <section id="calcolatore" className="reveal py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 grid gap-6 items-start">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Preventivo Conto Termico
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Calcola il tuo incentivo e ricevi il tuo preventivo gratuito
          </h2>
        </div>
        <ProductChoiceBelow />
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Posso chiedere il Conto Termico solo per il fotovoltaico?",
      a: "No: è incentivabile solo se abbinato alla sostituzione dell'impianto con una pompa di calore.",
    },
    {
      q: "È cumulabile con altri bonus?",
      a: "No, salvo fondi di garanzia. Per le PA è cumulabile fino al 100% della spesa ammissibile.",
    },
    {
      q: "Cos'è la prenotazione?",
      a: "Procedura riservata alle PA per bloccare i fondi prima dei lavori.",
    },
    {
      q: "Ci sono scadenze?",
      a: "Non c'è una scadenza fissa, ma l'accesso dipende dal budget annuo disponibile.",
    },
  ];
  return (
    <section id="faq" className="reveal py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQ</h2>
        <div className="divide-y rounded-2xl border bg-white shadow-sm">
          {items.map((it, i) => (
            <details
              key={i}
              className="group p-5 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.currentTarget.open = !e.currentTarget.open;
              }}
            >
              <summary className="list-none flex items-center justify-between">
                <span className="font-medium">{it.q}</span>
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-3 text-slate-600">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="reveal py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-orange-600 p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                Configura il tuo impianto
              </h3>
              <p className="text-white/90 mb-6">
                Scopri quanto puoi risparmiare e ricevi una consulenza gratuita.
              </p>
              <a
                href="#calcolatore"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-semibold hover:bg-orange-100"
              >
                Apri il calcolatore
              </a>
            </div>
            <div className="rounded-2xl bg-white/5 p-6">
              <ul className="space-y-2">
                <li>• Rimborsi fino al 65% (100% PA piccoli comuni)</li>
                <li>• Erogazione rapida per importi ≤ 15.000€</li>
                <li>• Budget annuo 900M€</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 py-10 border-t">
      <div className="mx-auto max-w-6xl px-4 text-sm text-slate-600 flex flex-wrap items-center gap-3">
        <span className="font-semibold text-orange-600">Energy Planner</span>
        <a className="hover:text-orange-600" href="#">
          Chi siamo
        </a>
        <a className="hover:text-orange-600" href="#">
          Prodotti
        </a>
        <a className="hover:text-orange-600" href="#">
          Contatti
        </a>
        <span className="ml-auto">
          © {new Date().getFullYear()} Energy Planner. Tutti i diritti
          riservati.
        </span>
      </div>
    </footer>
  );
}

/** Calcolatore semplice: un solo input → un output
    Nessun PNRR, nessuna scelta prodotto. */
function SimpleCalculator({ large = false }) {
  const [costo, setCosto] = useState("");
  const perc = 65;
  const costoNum = Number(costo) || 0;
  const incentivoCT = useMemo(
    () => (costoNum > 0 ? (costoNum * perc) / 100 : 0),
    [costoNum]
  );

  const labelSize = large ? "text-base" : "text-sm";
  const inputSize = large ? "text-2xl py-3" : "text-lg py-2";

  return (
    <div>
      <h3 className="text-2xl font-bold">Calcola il tuo incentivo</h3>
      <p className="mt-1 text-slate-600">Inserisci il costo.</p>

      <div className="mt-5">
        <label className={`block font-medium ${labelSize}`}>
          Costo dell'intervento (IVA incl.)
        </label>
        <div className="mt-2 flex items-center gap-3">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              €
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={100}
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              className={`w-full rounded-2xl border pl-8 pr-3 ${inputSize} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              aria-label="Costo dell'intervento"
              placeholder="es. 10000"
            />
          </div>
        </div>
      </div>

      {costoNum > 0 && (
        <div className="mt-6 grid gap-3 sm:gap-4">
          <ResultCard
            title={`Incentivo stimato (${perc}%)`}
            value={euro(incentivoCT)}
            accent="orange"
            strong
          />
        </div>
      )}

      <p className="mt-3 text-xs text-slate-500">
        * Stima semplificata basata su percentuale massima. Le condizioni
        effettive dipendono dai requisiti e dai massimali del GSE.
      </p>
    </div>
  );
}

// Scelta prodotto separata, mostrata sotto al calcolo
function ProductChoiceBelow() {
  const [selected, setSelected] = useState(null); // fv | pdc
  const [step, setStep] = useState(0);
  const [edificio, setEdificio] = useState(null);
  const [spazio, setSpazio] = useState(null); // true | false
  const [riscaldamento, setRiscaldamento] = useState(null);
  const [statoDecisione, setStatoDecisione] = useState(null);
  const [quando, setQuando] = useState(null);
  const [answers, setAnswers] = useState({
    prodotto: null,
    edificio: null,
    spazio: null,
    riscaldamento: null,
    decisione: null,
    quando: null,
  });
  const [selectionTrace, setSelectionTrace] = useState([]);

  const trackSelection = (field, value, meta = {}) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setSelectionTrace((prev) => {
      const entry = {
        field,
        value,
        ...meta,
        timestamp: new Date().toISOString(),
      };
      const index = prev.findIndex((item) => item.field === field);
      if (index >= 0) {
        const next = [...prev];
        next[index] = entry;
        return next;
      }
      return [...prev, entry];
    });
  };

  const HEATING = [
    { id: "gas", label: "Caldaia a Gas/Metano" },
    { id: "gpl", label: "Caldaia a Gpl" },
    { id: "gasolio", label: "Caldaia a Gasolio/Kerosene" },
    { id: "pellet", label: "Caldaia a pellets/Legna" },
    { id: "altro", label: "Altro" },
  ];
  const DECISIONE = [
    { id: "config", label: "So già che configurazione voglio" },
    { id: "preventivi", label: "Sto valutando diversi preventivi" },
    { id: "info", label: "Sto raccogliendo informazioni" },
    { id: "curioso", label: "Sono solo curioso" },
  ];
  const QUANDO = [
    { id: "12", label: "Entro 1–2 mesi" },
    { id: "34", label: "In 3–4 mesi" },
    { id: "5+", label: "Fra 5+ mesi" },
    { id: "ns", label: "Non lo so" },
  ];

  const steps =
    selected === "pdc"
      ? [
          "prodotto",
          "edificio",
          "spazio",
          "riscaldamento",
          "decisione",
          "quando",
          "contatto",
        ]
      : ["prodotto", "edificio", "decisione", "quando", "contatto"];
  const current = steps[step] || "prodotto";

  const goBack = () => {
    if (step === 0) return; // already at product
    setStep(step - 1);
    if (steps[step - 1] === "prodotto") setSelected(null);
  };

  // STEP: scelta prodotto
  if (current === "prodotto") {
    return (
      <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Scegli il prodotto</h3>
        <p className="mt-1 text-slate-600">
          Seleziona cosa ti interessa approfondire.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {PRODOTTI.map((p) => (
            <ProductCard
              key={p.id}
              prodotto={p}
              selected={selected === p.id}
              onSelect={() => {
                setSelected(p.id);
                trackSelection("prodotto", p.id, {
                  label: p.nome,
                  step: "prodotto",
                });
                setStep(1);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // STEP: edificio
  if (current === "edificio") {
    return (
      <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
        <div className="text-sm text-slate-500">
          Ricevi un preventivo del tuo nuovo impianto
        </div>
        <h3 className="mt-1 text-2xl font-bold">
          In quale tipo di edificio deve essere installato l'impianto?
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EDIFICI.map((e) => (
            <BuildingCard
              key={e.id}
              item={e}
              selected={edificio === e.id}
              onClick={() => {
                setEdificio(e.id);
                trackSelection("edificio", e.id, {
                  label: e.label,
                  step: "edificio",
                });
                setStep(step + 1);
              }}
            />
          ))}
        </div>
        <div className="mt-6 text-sm">
          <button
            onClick={goBack}
            className="text-slate-700 hover:text-orange-700"
          >
            ← Indietro
          </button>
        </div>
      </div>
    );
  }

  // STEP: spazio esterno (solo PDC)
  if (current === "spazio") {
    return (
      <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
        <div className="text-sm text-slate-500">
          Ricevi un preventivo del tuo nuovo impianto
        </div>
        <h3 className="mt-1 text-2xl font-bold">
          Hai uno spazio esterno, di circa 6 mq, dove installare la macchina
          esterna della pompa di calore?
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <OptionCard
            label="Sì"
            icon="✔️"
            selected={spazio === true}
            onClick={() => {
              setSpazio(true);
              trackSelection("spazio", true, {
                label: "Sì",
                step: "spazio",
              });
              setStep(step + 1);
            }}
          />
          <OptionCard
            label="No"
            icon="❌"
            selected={spazio === false}
            onClick={() => {
              setSpazio(false);
              trackSelection("spazio", false, {
                label: "No",
                step: "spazio",
              });
              setStep(step + 1);
            }}
          />
        </div>
        <div className="mt-6 text-sm">
          <button
            onClick={goBack}
            className="text-slate-700 hover:text-orange-700"
          >
            ← Indietro
          </button>
        </div>
      </div>
    );
  }

  // STEP: sistema di riscaldamento (solo PDC)
  if (current === "riscaldamento") {
    return (
      <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
        <div className="text-sm text-slate-500">
          Ricevi un preventivo personalizzato
        </div>
        <h3 className="mt-1 text-2xl font-bold">
          Che sistema di riscaldamento usi attualmente?
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HEATING.map((h) => (
            <OptionCard
              key={h.id}
              label={h.label}
              selected={riscaldamento === h.id}
              onClick={() => {
                setRiscaldamento(h.id);
                trackSelection("riscaldamento", h.id, {
                  label: h.label,
                  step: "riscaldamento",
                });
                setStep(step + 1);
              }}
            />
          ))}
        </div>
        <div className="mt-6 text-sm">
          <button
            onClick={goBack}
            className="text-slate-700 hover:text-orange-700"
          >
            ← Indietro
          </button>
        </div>
      </div>
    );
  }

  // STEP: stato decisione (comune a FV/PDC)
  if (current === "decisione") {
    return (
      <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
        <div className="text-sm text-slate-500">Calcolo dell'offerta</div>
        <h3 className="mt-1 text-2xl font-bold">
          A che punto sei nella tua decisione di acquisto?
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DECISIONE.map((d) => (
            <OptionCard
              key={d.id}
              label={d.label}
              selected={statoDecisione === d.id}
              onClick={() => {
                setStatoDecisione(d.id);
                trackSelection("decisione", d.id, {
                  label: d.label,
                  step: "decisione",
                });
                setStep(step + 1);
              }}
            />
          ))}
        </div>
        <div className="mt-6 text-sm">
          <button
            onClick={goBack}
            className="text-slate-700 hover:text-orange-700"
          >
            ← Indietro
          </button>
        </div>
      </div>
    );
  }

  // STEP: quando installare (comune)
  if (current === "quando") {
    return (
      <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
        <div className="text-sm text-slate-500">Calcolo dell'offerta</div>
        <h3 className="mt-1 text-2xl font-bold">
          Quando vorresti procedere con l'installazione?
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUANDO.map((q) => (
            <OptionCard
              key={q.id}
              label={q.label}
              selected={quando === q.id}
              onClick={() => {
                setQuando(q.id);
                trackSelection("quando", q.id, {
                  label: q.label,
                  step: "quando",
                });
                setStep(step + 1);
              }}
            />
          ))}
        </div>
        <div className="mt-6 text-sm">
          <button
            onClick={goBack}
            className="text-slate-700 hover:text-orange-700"
          >
            ← Indietro
          </button>
        </div>
      </div>
    );
  }

  // STEP: modulo contatto finale
  return (
    <LeadForm
      onBack={goBack}
      payload={{
        selected,
        edificio,
        spazio,
        riscaldamento,
        statoDecisione,
        quando,
        answers,
        trace: selectionTrace,
      }}
    />
  );
}

function ResultCard({ title, value, accent = "slate", strong = false }) {
  const color =
    accent === "orange"
      ? "bg-orange-50 text-orange-800 border-orange-200"
      : "bg-slate-50 text-slate-800 border-slate-200";
  const numClass = strong
    ? "text-3xl md:text-4xl font-black"
    : "text-3xl font-extrabold";
  return (
    <div className={`rounded-2xl border ${color} p-5`}>
      <div className="text-xs uppercase tracking-wide opacity-80">{title}</div>
      <div className={`${numClass} mt-1 tabular-nums`}>{value}</div>
    </div>
  );
}

/* ——— Card prodotto come da screenshot ———
   - Stato normale: card chiara con icona e titolo centrati
   - Stato selezionato: fascia scura in basso con il nome del prodotto
*/
function ProductCard({ prodotto, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "relative overflow-hidden w-full h-56",
        "rounded-2xl border bg-white shadow-sm transition",
        selected ? "ring-2 ring-[#0E3A66]" : "hover:border-slate-300",
      ].join(" ")}
    >
      {/* Immagine del prodotto */}
      {prodotto.img && (
        <img
          src={prodotto.img}
          alt={prodotto.nome}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {/* Vignetta per contrasto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      {/* Titolo centrato leggero quando non selezionato */}
      {!selected && (
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <div
            className="text-white font-semibold text-center drop-shadow"
            aria-hidden
          >
            {prodotto.nome}
          </div>
        </div>
      )}

      {/* Fascia scura in basso quando selezionato */}
      <div
        className={[
          "absolute left-0 right-0 bottom-0",
          "h-16 flex items-center justify-center px-4",
          "bg-[#0E3A66] text-white font-semibold",
          "transition-transform",
          selected ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {prodotto.nome}
      </div>
    </button>
  );
}

function BuildingCard({ item, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "w-full h-32 rounded-2xl border bg-white shadow-sm",
        "flex flex-col items-center justify-center gap-2 px-4",
        selected ? "ring-2 ring-[#0E3A66]" : "hover:border-slate-300",
      ].join(" ")}
    >
      <div className="text-3xl" aria-hidden>
        {item.icon}
      </div>
      <div className="text-center font-semibold text-slate-800">
        {item.label}
      </div>
    </button>
  );
}

function OptionCard({ label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "w-full h-32 rounded-2xl border bg-white",
        "flex flex-col items-center justify-center gap-2 px-4 text-slate-800",
        "shadow-sm hover:shadow-lg transition hover:-translate-y-[1px]",
        selected ? "ring-2 ring-[#0E3A66]" : "hover:border-slate-300",
      ].join(" ")}
    >
      {icon && (
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
      )}
      <span className="font-semibold text-center">{label}</span>
    </button>
  );
}

function LeadForm({ onBack, payload }) {
  const navigate = useNavigate();
  const { answers = {}, trace = [], ...rawSelections } = payload || {};
  const labelMap = useMemo(() => {
    const map = {};
    for (let i = 0; i < trace.length; i++) {
      const item = trace[i];
      if (item && item.field) map[item.field] = item.label ?? item.value;
    }
    return map;
  }, [trace]);

  const summaryRows = useMemo(() => {
    const labels = {
      prodotto: "Prodotto scelto",
      edificio: "Tipologia edificio",
      spazio: "Spazio esterno",
      riscaldamento: "Impianto attuale",
      decisione: "Fase decisionale",
      quando: "Tempistica prevista",
    };
    const out = [];
    for (const field in labels) {
      const answerValue =
        answers && Object.prototype.hasOwnProperty.call(answers, field)
          ? answers[field]
          : undefined;
      if (answerValue === null || typeof answerValue === "undefined") continue;
      const displayValue =
        labelMap[field] != null
          ? labelMap[field]
          : typeof answerValue === "boolean"
          ? answerValue
            ? "Sì"
            : "No"
          : answerValue;
      out.push({ field, label: labels[field], value: displayValue });
    }
    return out;
  }, [answers, labelMap]);

  const [form, setForm] = useState({
    luogo: "",
    nome: "",
    cognome: "",
    email: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const canSend = form.luogo && form.nome && form.cognome && form.email;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const leadPayload = {
      contatto: form,
      selections: {
        ...answers,
        ...rawSelections,
      },
      trace,
    };

    try {
      const contactSnapshot = { ...form };
      const res = await fetch(`${BASE}/preventivo-gratuito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
      const data = await res
        .json()
        .catch(() => ({ ok: res.ok, message: res.statusText }));

      if (!res.ok) {
        throw new Error(
          (data && (data.message || data.error)) || "Errore invio"
        );
      }

      // Successo: reset e redirect con messaggio personalizzato
      setForm({ luogo: "", nome: "", cognome: "", email: "" });
      navigate("/thank-you", {
        state: {
          message:
            "Grazie! La tua richiesta è stata inviata. Ti ricontatteremo a breve con il preventivo dedicato.",
          lead: {
            contatto: contactSnapshot,
            selections: leadPayload.selections,
          },
        },
      });
    } catch (err) {
      setError(String((err && err.message) || err || "Errore imprevisto"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-5 sm:p-6 shadow-sm">
      <div className="text-sm text-slate-500">Dove verrà installato</div>
      <h3 className="mt-1 text-2xl font-bold">
        Inserisci i tuoi dati per la richiesta
      </h3>

      {summaryRows.length > 0 && (
        <div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 text-sm text-slate-700">
          <p className="font-semibold text-orange-700">Le tue scelte</p>
          <ul className="mt-2 space-y-1">
            {summaryRows.map(({ field, label, value }) => (
              <li
                key={field}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-slate-500">{label}</span>
                <span className="font-semibold text-slate-900">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Comune o CAP</label>
          <input
            name="luogo"
            value={form.luogo}
            onChange={onChange}
            placeholder="es. Milano o 20100"
            className="mt-1 w-full rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            name="nome"
            value={form.nome}
            onChange={onChange}
            className="mt-1 w-full rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Cognome</label>
          <input
            name="cognome"
            value={form.cognome}
            onChange={onChange}
            className="mt-1 w-full rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="es. nome@dominio.it"
            className="mt-1 w-full rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Messaggio errore */}
        {error && (
          <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="sm:col-span-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-slate-700 hover:text-orange-700 text-sm"
            disabled={sending}
          >
            ← Indietro
          </button>
          <button
            type="submit"
            disabled={!canSend || sending}
            className="ml-auto rounded-full bg-orange-600 text-white px-5 py-2 font-semibold disabled:opacity-50"
          >
            {sending ? "Invio in corso..." : "Invia richiesta"}
          </button>
        </div>
      </form>
    </div>
  );
}
