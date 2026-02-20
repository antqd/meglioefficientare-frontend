import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
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
    <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-orange-500 py-32 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-32 -mb-32"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Meglio Efficientare
        </h1>
        <p className="text-xl md:text-2xl text-blue-50 mb-10 max-w-4xl mx-auto font-light leading-relaxed">
          La piattaforma completa per l'efficienza energetica: agenti,
          installatori e clienti connessi per un futuro sostenibile.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#servizi"
            className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Scopri i Servizi
          </a>
          <a
            href="/conto-termico"
            className="border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
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
    <section id="servizi" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            I Nostri Servizi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Soluzioni complete per ogni esigenza energetica, dalla consulenza
            all'installazione.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid ottimizzato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVIZI.map((s) => {
            const CardInner = (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
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
                <div className="p-8 flex flex-col grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {s.titolo}
                  </h3>
                  <p className="text-gray-600 mb-8 font-light leading-relaxed">{s.descrizione}</p>

                  {/* CTA in basso */}
                  <span className="mt-auto inline-flex items-center text-blue-600 font-bold hover:text-blue-700 group">
                    Scopri di più
                    <svg
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
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
    <section id="prodotti" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            I Nostri Prodotti
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODOTTI.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col"
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
              <div className="p-8 flex flex-col grow">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">
                    {p.categoria}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {p.nome}
                </h3>
                <p className="text-gray-600 mb-8 font-light leading-relaxed">{p.descrizione}</p>

                {/* CTA in basso */}
                <a
                  href={p.ecommerceUrl || "/ecommerce"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold hover:shadow-lg transition-all transform hover:scale-105 text-center"
                >
                  Scopri altro
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/ecommerce"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 group"
          >
            Vai all'Ecommerce Completo
            <svg
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
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
  const icons = [
    "🔧", // supporto-tecnico
    "💡", // consulenza-energetica
    "📱", // controllo-remoto
    "👤", // agente-dedicato
  ];

  return (
    <section id="assistenza" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Assistenza
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Supporto completo per tutti i nostri clienti, prima, durante e dopo
            l'installazione.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ASSISTENZA.map((s, idx) => (
            <div
              key={s.id}
              className="text-center bg-white rounded-2xl shadow-md border border-gray-200 p-10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {s.titolo}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">{s.descrizione}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-16">
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
            <p className="text-gray-300 mb-4 font-light">
              Meglio Efficientare connette agenti, installatori e clienti per
              soluzioni energetiche sostenibili.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Link Rapidi</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#chi-siamo"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-light"
                >
                  Chi Siamo
                </a>
              </li>
              <li>
                <a
                  href="#servizi"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-light"
                >
                  Servizi
                </a>
              </li>
              <li>
                <a
                  href="#prodotti"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-light"
                >
                  Prodotti
                </a>
              </li>
              <li>
                <a
                  href="#assistenza"
                  className="text-gray-300 hover:text-orange-400 transition-colors font-light"
                >
                  Assistenza
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contatti</h3>
            <ul className="space-y-3 text-gray-300 font-light">
              <li className="hover:text-orange-400 transition-colors">📧 info@energyplanner.it</li>
              <li className="hover:text-orange-400 transition-colors">☎️ +39 123 456 7890</li>
              <li className="hover:text-orange-400 transition-colors">📍 Via Esempio 123, Milano</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 font-light">
            © {new Date().getFullYear()} Meglio Efficientare. Tutti i diritti
            riservati.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a
              href="#"
              className="text-gray-300 hover:text-orange-400 transition-colors font-light"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-orange-400 transition-colors font-light"
            >
              Termini di Servizio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
