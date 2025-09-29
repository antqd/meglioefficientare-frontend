// src/pages/InstallatoriPage.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar.jsx";

const PROVINCE = [
  "Milano (MI)",
  "Roma (RM)",
  "Torino (TO)",
  "Bologna (BO)",
  "Firenze (FI)",
  "Genova (GE)",
  "Venezia (VE)",
  "Verona (VR)",
  "Bari (BA)",
  "Napoli (NA)",
];

const CATEGORIE = [
  {
    id: "elettrico",
    titolo: "Elettrico",
    descr: "Quadri, linee, colonnine EV, domotica",
    img: "/images/categorie/elettrico.jpg",
  },
  {
    id: "idraulico",
    titolo: "Idraulico",
    descr: "Impianti idrico-sanitari, perdite, sostituzioni",
    img: "/images/categorie/idraulico.jpg",
  },
  {
    id: "clima",
    titolo: "Clima / PDC",
    descr: "Climatizzazione, pompe di calore, split",
    img: "/images/categorie/clima.jpg",
  },
  {
    id: "accumulo",
    titolo: "Accumulo",
    descr: "Sistemi di accumulo, batterie, gestione energia",
    img: "/images/accumulo.png",
  },
  {
    id: "fotovoltaico",
    titolo: "Fotovoltaico",
    descr: "Progettazione, installazione, storage",
    img: "/images/pannelli.png",
  },
];

const FAQLIST = [
  {
    q: "Come selezionate gli installatori?",
    a: "Collaboriamo con professionisti verificati (documentazione, referenze e sopralluoghi campione). Aggiorniamo la rete in modo continuo e valutiamo i feedback post-intervento.",
  },
  {
    q: "Quanto tempo serve per avere un preventivo?",
    a: "Di solito entro 24–48 ore lavorative dopo la richiesta, in base alla complessità del lavoro e alla disponibilità nella tua zona.",
  },
  {
    q: "È prevista una garanzia sui lavori?",
    a: "Ogni intervento prevede standard di qualità e tracciabilità; la garanzia varia per tipologia di lavoro e fornitore. Viene indicata nel preventivo e in conferma d’ordine.",
  },
  {
    q: "Coprite tutto il territorio nazionale?",
    a: "Siamo operativi in molte province e la rete è in espansione. Inserisci CAP o seleziona la provincia per verificare la copertura attuale.",
  },
];

// SOLO i 3 installatori principali
const INSTALLATORI = [
  {
    id: 1,
    nome: "Mario Rossi Impianti",
    provincia: "Milano (MI)",
    rating: 4.8,
    categorie: ["Elettrico", "Fotovoltaico"],
    tempi: "48h",
    img: "/images/installatori/1.jpg",
  },
  {
    id: 2,
    nome: "Luca Bianchi Termoidraulica",
    provincia: "Bologna (BO)",
    rating: 4.6,
    categorie: ["Idraulico", "Caldaie"],
    tempi: "24h",
    img: "/images/installatori/2.jpg",
  },
  {
    id: 3,
    nome: "Giulia Verdi Clima",
    provincia: "Roma (RM)",
    rating: 4.7,
    categorie: ["Clima / PDC"],
    tempi: "72h",
    img: "/images/installatori/3.jpg",
  },  
];

export default function InstallatoriPage() {
  const [cap, setCap] = useState("");
  const [provincia, setProvincia] = useState("");
  const [query, setQuery] = useState("");

  const filtrati = useMemo(() => {
    return INSTALLATORI.filter((x) => {
      const okProv = provincia ? x.provincia === provincia : true;
      const okQuery = query
        ? x.nome.toLowerCase().includes(query.toLowerCase()) ||
          x.categorie.join(" ").toLowerCase().includes(query.toLowerCase())
        : true;
      return okProv && okQuery;
    });
  }, [provincia, query]);

  const topTre = filtrati.slice(0, 3);

  const onVerificaCopertura = (e) => {
    e.preventDefault();
    const valido = /^\d{5}$/.test(cap);
    alert(
      valido
        ? `Copertura in verifica per CAP ${cap}…`
        : "Inserisci un CAP valido (5 cifre)."
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                La nostra rete di installatori è il tuo vantaggio.
              </h1>
              <p className="mt-5 text-lg text-gray-600">
                Collaboriamo con professionisti selezionati per garantire
                preventivi chiari, lavori tracciabili e interventi eseguiti a
                regola d’arte.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#trova"
                  className="inline-flex justify-center items-center rounded-full bg-orange-600 text-white px-6 py-3 font-semibold hover:bg-orange-700"
                >
                  Trova un installatore
                </a>
                <Link
                  to="/lavora-con-noi"
                  className="inline-flex justify-center items-center rounded-full border-2 border-orange-600 text-orange-600 px-6 py-3 font-semibold hover:bg-orange-50"
                >
                  Entra nella rete
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Rete in espansione e copertura crescente nelle principali
                province italiane.
              </p>
            </div>

            <div className="h-72 md:h-96 rounded-3xl bg-gray-200 overflow-hidden">
              <img
                src="/images/tecnici.png"
                alt="Tecnici al lavoro"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFIT */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Benefit
              title="Preventivi chiari"
              text="Ricevi proposte trasparenti e coerenti con la tua richiesta, prima dell’intervento."
            />
            <Benefit
              title="Professionisti verificati"
              text="Documenti, referenze e qualità verificate: lavoriamo solo con installatori qualificati."
            />
            <Benefit
              title="Garanzia sul lavoro"
              text="Ogni lavoro è tracciato; la garanzia viene indicata nell’offerta e nel contratto."
            />
          </div>
        </div>
      </section>

      {/* SEZIONE RETE / COPERTURA + 3 INSTALLATORI */}
      <section id="trova" className="py-16 bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,420px] gap-10 items-start">
            {/* Ricerca */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Verifica copertura e trova il tuo tecnico
              </h2>
              <p className="mt-2 text-gray-600">
                Seleziona la provincia o inserisci il CAP per controllare la
                disponibilità. Poi filtra per categoria o nome.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <select
                  className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                >
                  <option value="">Tutte le province</option>
                  {PROVINCE.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <form onSubmit={onVerificaCopertura} className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="Inserisci CAP"
                    className="flex-1 rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
                    value={cap}
                    onChange={(e) =>
                      setCap(e.target.value.replace(/\D/g, "").slice(0, 5))
                    }
                  />
                  <button className="rounded-xl bg-orange-600 text-white px-4 font-semibold hover:bg-orange-700">
                    Verifica
                  </button>
                </form>

                <input
                  type="text"
                  placeholder="Cerca per nome o categoria (es. Fotovoltaico)"
                  className="sm:col-span-2 rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {/* Top 3 risultati */}
              <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {topTre.map((r) => (
                  <CardInstallatore key={r.id} {...r} />
                ))}
                {topTre.length === 0 && (
                  <div className="col-span-full text-sm text-gray-500">
                    Nessun risultato con i filtri selezionati.
                  </div>
                )}
              </div>

              {/* Vedi tutti (se vuoi puoi rimuovere questo blocco, ora mostra comunque solo i 3) */}
              {filtrati.length > 2 && (
                <div className="mt-6">
                  <a
                    href="/installatori-tutti"
                    className="inline-flex items-center rounded-full border-2 border-orange-600 text-orange-600 px-6 py-3 font-semibold hover:bg-orange-50"
                  >
                    Vedi tutti gli installatori
                    <svg
                      className="ml-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Categorie */}
          <div className="mt-14">
            <h3 className="text-xl font-bold text-gray-900">
              Interventi e competenze
            </h3>
            <div className="mt-6 grid md:grid-cols-3 xl:grid-cols-5 gap-6">
              {CATEGORIE.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.titolo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">{c.titolo}</h4>
                    <p className="text-sm text-gray-600">{c.descr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Come funziona
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Step
              n="1"
              title="Raccontaci l’esigenza"
              text="Compila il form o seleziona il servizio. Più dettagli = preventivo più preciso."
            />
            <Step
              n="2"
              title="Matching con la rete"
              text="Ti mettiamo in contatto con i partner più adatti nella tua zona."
            />
            <Step
              n="3"
              title="Sopralluogo & preventivo"
              text="Conferma l’intervento con quotazione trasparente e tempi chiari."
            />
          </div>
        </div>
      </section>

      {/* CTA PARTNER */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">
            Sei un installatore? Unisciti alla rete
          </h2>
          <p className="mt-2 opacity-90">
            Inviaci le tue referenze: formazione, documenti e specializzazioni.
            Cresciamo insieme.
          </p>
          <Link
            to="/diventa-partner"
            className="mt-6 inline-flex items-center rounded-full bg-white text-orange-600 px-8 py-3 font-semibold hover:bg-gray-100"
          >
            Candidati ora
            <svg
              className="ml-2 h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Domande frequenti
          </h2>
          <div className="mt-8 divide-y rounded-2xl border bg-white">
            {FAQLIST.map((f, idx) => (
              <details
                key={idx}
                className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-semibold text-gray-900">{f.q}</span>
                  <span className="ml-4 text-gray-400 group-open:hidden">
                    ＋
                  </span>
                  <span className="ml-4 text-gray-400 hidden group-open:block">
                    －
                  </span>
                </summary>
                <p className="mt-3 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTO RAPIDO */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
            Richiedi un contatto
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Lascia i tuoi dati: ti richiamiamo velocemente.
          </p>
          <form className="mt-8 grid sm:grid-cols-2 gap-4">
            <input
              className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
              placeholder="Nome e Cognome"
            />
            <input
              className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
              placeholder="Email"
              type="email"
            />
            <input
              className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500 sm:col-span-2"
              placeholder="Telefono"
              type="tel"
            />
            <textarea
              className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500 sm:col-span-2"
              rows="4"
              placeholder="Descrivi in breve la richiesta"
            />
            <button className="sm:col-span-2 rounded-full bg-orange-600 text-white px-6 py-3 font-semibold hover:bg-orange-700">
              Invia richiesta
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500 text-center">
            Inviando, accetti la nostra informativa privacy e il trattamento dei
            dati per ricontattarti.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ============= Sub-components ============= */

function Benefit({ title, text }) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  );
}

function CardInstallatore({ nome, provincia, rating, categorie, tempi, img }) {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img src={img} alt={nome} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold text-gray-900">{nome}</h4>
            <p className="text-sm text-gray-600">{provincia}</p>
          </div>
          <div className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            ★ {rating.toFixed(1)}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categorie.map((c) => (
            <span
              key={c}
              className="rounded-full bg-orange-100 text-orange-800 text-xs px-2 py-1"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Disponibilità: {tempi}</span>
          <Link
            to="/ecommerce"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center"
          >
            Richiedi preventivo
            <svg
              className="ml-1 h-4 w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
        {n}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  );
}
