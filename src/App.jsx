import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
/* ======== SERVIZI (con immagine) ======== */
const SERVIZI = [
  {
    id: "conto-termico",
    titolo: "Conto Termico 3.0",
    descrizione:
      "Incentivi fino al 65% per pompe di calore, fotovoltaico ed efficienza energetica.",
    link: "/conto-termico",
    img: "/images/conto.png",
    external: false,
  },
  {
    id: "energy-planning",
    titolo: "Energy Planning",
    descrizione:
      "Consulenza personalizzata per ottimizzare i consumi energetici della tua abitazione.",
    link: "https://energyplanner.it",
    img: "/images/casa-pannelli.png",
    external: true,
  },
  {
    id: "rete-installatori",
    titolo: "Rete Installatori",
    descrizione:
      "Connessione diretta con installatori qualificati nella tua zona.",
    link: "/installatori",
    img: "/images/rete.png",
    external: false,
  },
  {
    id: "consulenza-agenti",
    titolo: "Consulenza Agenti",
    descrizione:
      "Supporto completo per agenti che vendono soluzioni energetiche.",
    link: "/agenti",
    img: "/images/consulenza.png",
    external: false,
  },
  /* === NUOVA CARD CER === */
  {
    id: "cer",
    titolo: "CER – Comunità Energetiche",
    descrizione:
      "Partecipa o crea una Comunità Energetica Rinnovabile e valorizza la tua energia.",
    link: "https://expoenergia.cer-italia.energy/",
    img: "/images/cerimage.png",
    external: true,
  },
  {
    id: "assicurazioni-casa",
    titolo: "Casa Sicura",
    descrizione:
      "Proteggi la tua casa con le migliori soluzioni assicurative.",
    link: "/casa-sicura",
    img: "/images/casasicura.png",
    external: false,
  },
];

/* ======== PRODOTTI ======== */
const PRODOTTI = [
  {
    id: "kit-fotovoltaico",
    nome: "Kit Fotovoltaico",
    descrizione: "Sistemi fotovoltaici completi con installazione inclusa",
    immagine: "/images/pannelli.png",
    categoria: "Energia Rinnovabile",
  },
  {
    id: "pompe-calore",
    nome: "Pompe di Calore",
    descrizione: "Sistemi di riscaldamento e raffrescamento ad alta efficienza",
    immagine: "/images/pompa.png",
    categoria: "Riscaldamento",
  },
  {
    id: "batterie-accumulo",
    nome: "Batterie di Accumulo",
    descrizione: "Sistemi di storage per massimizzare l'autoconsumo",
    immagine: "/images/accumulo.png",
    categoria: "Storage",
  },
  {
    id: "pacchetti-efficienza",
    nome: "Pacchetti di Efficienza Energetica",
    descrizione:
      "Pacchetti completi per l'isolamento e l'efficienza energetica",
    immagine: "/images/pacchetto.png",
    categoria: "Mobilità Elettrica",
  },
];

/* ======== ASSISTENZA ======== */
const ASSISTENZA = [
  {
    id: "supporto-tecnico",
    titolo: "Supporto Tecnico",
    descrizione:
      "Assistenza per l'installazione e la manutenzione dei prodotti.",
  },
  {
    id: "consulenza-energetica",
    titolo: "Consulenza Energetica",
    descrizione:
      "Consigli per ottimizzare i consumi energetici e ridurre gli sprechi.",
  },
  {
    id: "controllo-remoto",
    titolo: "Controllo Remoto",
    descrizione:
      "Monitoraggio e gestione da remoto dei sistemi installati.",
  },
  {
    id: "agente-dedicato",
    titolo: "Agente Dedicato",
    descrizione:
      "Supporto personalizzato da un agente dedicato per le tue esigenze energetiche.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ServiziSection />
      <ProdottiSection />
      <AssistenzaSection />
      <Footer />
    </div>
  );
}



function Hero() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Meglio Efficientare
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          La piattaforma completa per l'efficienza energetica: agenti,
          installatori e clienti connessi per un futuro sostenibile.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#servizi"
            className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Scopri i Servizi
          </a>
          <a
            href="/conto-termico"
            className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
          >
            Scopri il Conto Termico 3.0
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiziSection() {
  return (
    <section id="servizi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            I Nostri Servizi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluzioni complete per ogni esigenza energetica, dalla consulenza
            all'installazione.
          </p>
        </div>

        {/* 5 card in riga su desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {SERVIZI.map((s) => {
            const CardInner = (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* immagine uniforme */}
                {s.img && (
                  <div className="w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.titolo}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* contenuto */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {s.titolo}
                  </h3>
                  <p className="text-gray-600 mb-6">{s.descrizione}</p>

                  {/* CTA in basso */}
                  <span className="mt-auto inline-flex items-center text-orange-600 font-semibold">
                    Scopri di più
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            );

            return s.external ? (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {CardInner}
              </a>
            ) : (
              <Link key={s.id} to={s.link} className="block">
                {CardInner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProdottiSection() {
  return (
    <section id="prodotti" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            I Nostri Prodotti
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODOTTI.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col"
            >
              {/* immagine uniforme */}
              {p.immagine && (
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={p.immagine}
                    alt={p.nome}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* contenuto */}
              <div className="p-6 flex flex-col grow">
                <div className="mb-2">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {p.categoria}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {p.nome}
                </h3>
                <p className="text-gray-600 mb-6">{p.descrizione}</p>

                {/* CTA in basso */}
                <a
                  href={p.ecommerceUrl || "/ecommerce"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full bg-orange-600 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors text-center"
                >
                  Scopri altro
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/ecommerce"
            className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Vai all'Ecommerce Completo
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function AssistenzaSection() {
  return (
    <section id="assistenza" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Assistenza
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Supporto completo per tutti i nostri clienti, prima, durante e dopo
            l'installazione.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ASSISTENZA.map((s) => (
            <div
              key={s.id}
              className="text-center bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {s.titolo}
              </h3>
              <p className="text-gray-600">{s.descrizione}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/logo.png"
                alt="Meglio Efficientare"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Meglio Efficientare connette agenti, installatori e clienti per
              soluzioni energetiche sostenibili.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#chi-siamo"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chi Siamo
                </a>
              </li>
              <li>
                <a
                  href="#servizi"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Servizi
                </a>
              </li>
              <li>
                <a
                  href="#prodotti"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Prodotti
                </a>
              </li>
              <li>
                <a
                  href="#assistenza"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Assistenza
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <ul className="space-y-2 text-gray-400">
              <li>info@energyplanner.it</li>
              <li>+39 123 456 7890</li>
              <li>Via Esempio 123, Milano</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Meglio Efficientare. Tutti i diritti
            riservati.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Termini di Servizio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
