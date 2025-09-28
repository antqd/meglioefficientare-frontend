import React, { useState } from "react";
import { Link } from "react-router-dom";

// Prodotti completi per l'ecommerce
const PRODOTTI_ECOMMERCE = [
  {
    id: "kit-fotovoltaico-3kw",
    nome: "Kit Fotovoltaico 3kW",
    descrizione: "Sistema fotovoltaico completo da 3kW con inverter e installazione",
    prezzo: 8500,
    prezzoOriginale: 10000,
    categoria: "Fotovoltaico",
    immagine: "/images/pannelli.png",
    caratteristiche: ["12 pannelli da 250W", "Inverter incluso", "Installazione compresa", "Garanzia 25 anni"],
    disponibile: true,
    bestseller: true
  },
  {
    id: "kit-fotovoltaico-6kw",
    nome: "Kit Fotovoltaico 6kW",
    descrizione: "Sistema fotovoltaico completo da 6kW ideale per famiglie numerose",
    prezzo: 15500,
    prezzoOriginale: 18000,
    categoria: "Fotovoltaico",
    immagine: "/images/pannelli.png",
    caratteristiche: ["24 pannelli da 250W", "Inverter trifase", "Installazione compresa", "Monitoraggio incluso"],
    disponibile: true,
    bestseller: false
  },
  {
    id: "pompa-calore-aria-acqua",
    nome: "Pompa di Calore Aria-Acqua",
    descrizione: "Sistema di riscaldamento ad alta efficienza per sostituire la caldaia",
    prezzo: 12000,
    prezzoOriginale: 14000,
    categoria: "Pompe di Calore",
    immagine: "/images/pompa.png",
    caratteristiche: ["COP 4.5", "Funziona fino a -20°C", "Installazione inclusa", "Controllo smart"],
    disponibile: true,
    bestseller: true
  },
  {
    id: "batteria-accumulo-10kwh",
    nome: "Batteria di Accumulo 10kWh",
    descrizione: "Sistema di accumulo per massimizzare l'autoconsumo fotovoltaico",
    prezzo: 7500,
    prezzoOriginale: 9000,
    categoria: "Accumulo",
    immagine: "/images/batteria.png",
    caratteristiche: ["Capacità 10kWh", "Cicli di vita 6000+", "Installazione inclusa", "App di monitoraggio"],
    disponibile: true,
    bestseller: false
  },
  {
    id: "colonnina-ricarica-22kw",
    nome: "Colonnina di Ricarica 22kW",
    descrizione: "Stazione di ricarica veloce per auto elettriche domestica",
    prezzo: 2500,
    prezzoOriginale: 3000,
    categoria: "Mobilità Elettrica",
    immagine: "/images/colonnina.png",
    caratteristiche: ["Ricarica fino a 22kW", "Cavo incluso", "Installazione compresa", "Controllo da app"],
    disponibile: false,
    bestseller: false
  },
  {
    id: "kit-completo-casa",
    nome: "Kit Completo Casa Sostenibile",
    descrizione: "Soluzione completa: Fotovoltaico + Pompa di Calore + Accumulo",
    prezzo: 25000,
    prezzoOriginale: 30000,
    categoria: "Kit Completi",
    immagine: "/images/kit-completo.png",
    caratteristiche: ["FV 6kW + PDC + Batteria 10kWh", "Installazione completa", "Progettazione inclusa", "Garanzia totale"],
    disponibile: true,
    bestseller: true
  }
];

const CATEGORIE = ["Tutti", "Fotovoltaico", "Pompe di Calore", "Accumulo", "Mobilità Elettrica", "Kit Completi"];

export default function Ecommerce() {
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("Tutti");
  const [carrello, setCarrello] = useState([]);
  const [modaleProdotto, setModaleProdotto] = useState(null);

  const prodottiFiltrati = categoriaSelezionata === "Tutti"
    ? PRODOTTI_ECOMMERCE
    : PRODOTTI_ECOMMERCE.filter(p => p.categoria === categoriaSelezionata);

  // Utility classes for a compact 4-column layout (use these in the JSX if desired)
  // Example: <div className={gridClass}> and <div className={cardClass}>
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3";
  const cardClass = "bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-3 text-sm";

  
  const aggiungiAlCarrello = (prodotto) => {
    setCarrello([...carrello, prodotto]);
    alert(`${prodotto.nome} aggiunto al carrello!`);
  };

  const euro = (prezzo) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(prezzo);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar carrello={carrello} />
      
      {/* Header Ecommerce */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Ecommerce Energy Planner
            </h1>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Acquista i migliori prodotti per l'efficienza energetica.
              Installazione garantita dai nostri partner certificati.
            </p>
          </div>
        </div>
      </div>

      {/* Filtri Categoria */}
      <div className="bg-white border-b text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIE.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSelezionata(categoria)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoriaSelezionata === categoria
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Griglia Prodotti */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prodottiFiltrati.map((prodotto) => (
            <div key={prodotto.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Badge */}
              <div className="relative">
                {prodotto.bestseller && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Bestseller
                    </span>
                  </div>
                )}
                {!prodotto.disponibile && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Non Disponibile
                    </span>
                  </div>
                )}
                
                {/* Immagine Prodotto */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Immagine Prodotto</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {prodotto.categoria}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {prodotto.nome}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {prodotto.descrizione}
                </p>

                {/* Caratteristiche principali */}
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {prodotto.caratteristiche.slice(0, 2).map((caratteristica, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-green-500 mr-2 cursor-pointer hover:text-green-600 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        role="button"
                        aria-label="Aggiungi al carrello"
                        title="Aggiungi al carrello"
                        onClick={() => {
                          // Se è disponibile la funzione aggiungiAlCarrello la usiamo,
                          // altrimenti fallback su setCarrello. Chiudiamo anche eventuale modale.
                          if (typeof aggiungiAlCarrello === 'function') {
                            aggiungiAlCarrello(prodotto);
                          } else if (typeof setCarrello === 'function' && Array.isArray(carrello)) {
                            setCarrello([...carrello, prodotto]);
                          }
                          if (typeof setModaleProdotto === 'function') {
                            setModaleProdotto(null);
                          }
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      
                      {caratteristica}
                    </li>
                  ))}
                </ul>

                {/* Prezzo */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">
                      {euro(prodotto.prezzo)}
                    </span>
                    {prodotto.prezzoOriginale > prodotto.prezzo && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {euro(prodotto.prezzoOriginale)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pulsanti */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setModaleProdotto(prodotto)}
                    className="flex-1 border border-orange-600 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-50 transition-colors"
                  >
                    Dettagli
                  </button>
                  <button
                    onClick={() => aggiungiAlCarrello(prodotto)}
                    disabled={!prodotto.disponibile}
                    className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      prodotto.disponibile
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {prodotto.disponibile ? 'Aggiungi al Carrello' : 'Non Disponibile'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sezione Installatori */}
      <div className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Installazione Garantita
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ogni prodotto viene installato da tecnici certificati della nostra rete.
            Trova l'installatore più vicino a te.
          </p>
          <Link
            to="/installatori"
            className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Trova Installatore
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal Dettagli Prodotto */}
      {modaleProdotto && (
        // Improved modal markup: overlay handles outside clicks, inner modal stops propagation.
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true" role="dialog">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            {/* Overlay: click here to close. Keeps the click handling isolated to overlay only. */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              aria-hidden="true"
              onClick={() => setModaleProdotto(null)}
            />
            {/* Centering helper */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

            {/* Modal content: stop propagation so clicks inside don't close the modal.
                Add tabIndex and focus styles to avoid unwanted focus ring (blue) on some browsers. */}
            <div
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full focus:outline-none ring-0"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              role="document"
            >
              <div className="bg-white px-6 pt-6 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {modaleProdotto.nome}
                  </h3>
                  <button
                    onClick={() => setModaleProdotto(null)}
                    className="text-gray-400 hover:text-gray-600 p-1 focus:outline-none"
                    aria-label="Chiudi dettagli prodotto"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-600">Immagine Prodotto</p>
                  </div>

                  <div className="mb-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-semibold">
                      {modaleProdotto.categoria}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{modaleProdotto.descrizione}</p>

                  <h4 className="font-semibold text-gray-900 mb-2">Caratteristiche:</h4>
                  <ul className="space-y-2">
                    {modaleProdotto.caratteristiche.map((caratteristica, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {caratteristica}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-3xl font-bold text-orange-600">
                      {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(modaleProdotto.prezzo)}
                    </span>
                    {modaleProdotto.prezzoOriginale > modaleProdotto.prezzo && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(modaleProdotto.prezzoOriginale)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setModaleProdotto(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                      Chiudi
                    </button>
                    <button
                      onClick={() => {
                        aggiungiAlCarrello(modaleProdotto);
                        setModaleProdotto(null);
                      }}
                      disabled={!modaleProdotto.disponibile}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none ${
                        modaleProdotto.disponibile
                          ? 'bg-orange-600 text-white hover:bg-orange-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {modaleProdotto.disponibile ? 'Aggiungi al Carrello' : 'Non Disponibile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar({ carrello }) {
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="Energy Planner"
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">
              Home
            </Link>
            <Link to="/installatori" className="text-gray-700 hover:text-orange-600 font-medium">
              Installatori
            </Link>
            
            {/* Carrello */}
            <button className="relative p-2 text-gray-700 hover:text-orange-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              {carrello.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {carrello.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ModalDettagliProdotto({ prodotto, onClose, onAggiungiCarrello }) {
  const euro = (prezzo) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(prezzo);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {prodotto.nome}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-600">Immagine Prodotto</p>
              </div>
              
              <p className="text-gray-600 mb-4">{prodotto.descrizione}</p>

              <h4 className="font-semibold text-gray-900 mb-2">Caratteristiche:</h4>
              <ul className="space-y-2">
                {prodotto.caratteristiche.map((caratteristica, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {caratteristica}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-orange-600">
                  {euro(prodotto.prezzo)}
                </span>
                {prodotto.prezzoOriginale > prodotto.prezzo && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {euro(prodotto.prezzoOriginale)}
                  </span>
                )}
              </div>
              
              <button
                onClick={() => {
                  onAggiungiCarrello(prodotto);
                  onClose();
                }}
                disabled={!prodotto.disponibile}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  prodotto.disponibile
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {prodotto.disponibile ? 'Aggiungi al Carrello' : 'Non Disponibile'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}