import React from "react";
import { Link } from "react-router-dom";

// Array dei servizi offerti
const SERVIZI = [
  {
    id: "conto-termico",
    titolo: "Conto Termico 3.0",
    descrizione: "Incentivi fino al 65% per pompe di calore, fotovoltaico e efficienza energetica",
    icona: "🔥",
    link: "/conto-termico",
    videoPlaceholder: true
  },
  {
    id: "energy-planning",
    titolo: "Energy Planning",
    descrizione: "Consulenza personalizzata per ottimizzare i consumi energetici della tua abitazione",
    icona: "⚡",
    link: "/energy-planning",
    videoPlaceholder: true
  },
  {
    id: "rete-installatori",
    titolo: "Rete Installatori",
    descrizione: "Connessione diretta con installatori qualificati nella tua zona",
    icona: "🔧",
    link: "/installatori",
    videoPlaceholder: true
  },
  {
    id: "consulenza-agenti",
    titolo: "Consulenza Agenti",
    descrizione: "Supporto completo per agenti che vendono soluzioni energetiche",
    icona: "👥",
    link: "/agenti",
    videoPlaceholder: true
  }
];

// Array dei prodotti
const PRODOTTI = [
  {
    id: "kit-fotovoltaico",
    nome: "Kit Fotovoltaico",
    descrizione: "Sistemi fotovoltaici completi con installazione inclusa",
    immagine: "/images/pannelli.png",
    categoria: "Energia Rinnovabile",
    videoPlaceholder: true
  },
  {
    id: "pompe-calore",
    nome: "Pompe di Calore",
    descrizione: "Sistemi di riscaldamento e raffrescamento ad alta efficienza",
    immagine: "/images/pompa.png",
    categoria: "Riscaldamento",
    videoPlaceholder: true
  },
  {
    id: "batterie-accumulo",
    nome: "Batterie di Accumulo",
    descrizione: "Sistemi di storage per massimizzare l'autoconsumo",
    immagine: "/images/batteria.png",
    categoria: "Storage",
    videoPlaceholder: true
  },
  {
    id: "colonnine-ricarica",
    nome: "Colonnine di Ricarica",
    descrizione: "Stazioni di ricarica per veicoli elettrici domestiche",
    immagine: "/images/colonnina.png",
    categoria: "Mobilità Elettrica",
    videoPlaceholder: true
  }
];

const ASSISTENZA = [
  {
    id: "supporto-tecnico",
    titolo: "Supporto Tecnico",
    descrizione: "Assistenza per l'installazione e la manutenzione dei prodotti",
    icona: "🛠️"
  },
  {
    id: "consulenza-energetica",
    titolo: "Consulenza Energetica",
    descrizione: "Consigli per ottimizzare i consumi energetici e ridurre gli sprechi,",
    icona: "💡"
  }
]
    

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

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="MeglioEfficientare" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Menu di navigazione */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#chi-siamo" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Chi Siamo
            </a>
            <a 
              href="#servizi" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              I Nostri Servizi
            </a>
            <a 
              href="#prodotti" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              I Nostri Prodotti
            </a>
            <a 
              href="#assistenza" 
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Assistenza
            </a>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-orange-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Meglio Efficientare
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La tua piattaforma completa per l'efficienza energetica. 
            Connettendo agenti, installatori e clienti per un futuro sostenibile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#servizi"
              className="bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Scopri i Nostri Servizi
            </a>
            <a 
              href="#prodotti"
              className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
            >
              Vedi i Prodotti
            </a>
          </div>
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
            Soluzioni complete per ogni esigenza energetica, dalla consulenza all'installazione
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVIZI.map((servizio) => (
            <div key={servizio.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Spazio per video illustrativo */}
              {servizio.videoPlaceholder && (
                <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{servizio.icona}</div>
                    <p className="text-sm text-gray-600">Spazio per video illustrativo</p>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {servizio.titolo}
                </h3>
                <p className="text-gray-600 mb-4">
                  {servizio.descrizione}
                </p>
                <Link
                  to={servizio.link}
                  className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700"
                >
                  Scopri di più
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kit completi per l'efficienza energetica con installazione garantita
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODOTTI.map((prodotto) => (
            <div key={prodotto.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Spazio per video illustrativo */}
              {prodotto.videoPlaceholder && (
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Spazio per video prodotto</p>
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {prodotto.categoria}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {prodotto.nome}
                </h3>
                <p className="text-gray-600 mb-6">
                  {prodotto.descrizione}
                </p>

                {/* Rimuoviamo i prezzi e aggiungiamo link all'ecommerce */}
                <a
                  href={prodotto.ecommerceUrl || "/ecommerce"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors text-center block"
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
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
            Supporto completo per tutti i nostri clienti, prima, durante e dopo l'installazione
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ASSISTENZA.map((servizio) => (
            <div key={servizio.id} className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{servizio.icona}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {servizio.titolo}
              </h3>
              <p className="text-gray-600">
                {servizio.descrizione}
              </p>
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
          {/* Logo e descrizione */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Meglio Efficientare" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Meglio Efficientare è la piattaforma che connette agenti, installatori e clienti 
              per creare un ecosistema completo di soluzioni energetiche sostenibili.
            </p>
          </div>

          {/* Link rapidi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li><a href="#chi-siamo" className="text-gray-400 hover:text-white transition-colors">Chi Siamo</a></li>
              <li><a href="#servizi" className="text-gray-400 hover:text-white transition-colors">Servizi</a></li>
              <li><a href="#prodotti" className="text-gray-400 hover:text-white transition-colors">Prodotti</a></li>
              <li><a href="#assistenza" className="text-gray-400 hover:text-white transition-colors">Assistenza</a></li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@energyplanner.it</li>
              <li>📞 +39 123 456 7890</li>
              <li>📍 Via Esempio 123, Milano</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Meglio Efficientare. Tutti i diritti riservati.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Termini di Servizio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}