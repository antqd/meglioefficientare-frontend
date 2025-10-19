import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// Prodotti completi per l'ecommerce
const PRODOTTI_ECOMMERCE = [
  {
    id: "kit-fotovoltaico-3kw",
    nome: "Kit Fotovoltaico 3kW",
    descrizione:
      "Sistema fotovoltaico completo da 3kW con inverter e installazione",
    prezzo: 8500,
    prezzoOriginale: 10000,
    categoria: "Fotovoltaico",
    immagine: "/images/pannelli.png",
    caratteristiche: [
      "12 pannelli da 250W",
      "Inverter incluso",
      "Installazione compresa",
      "Garanzia 25 anni",
    ],
    disponibile: true,
    bestseller: true,
  },
  {
    id: "kit-fotovoltaico-6kw",
    nome: "Kit Fotovoltaico 6kW",
    descrizione:
      "Sistema fotovoltaico completo da 6kW ideale per famiglie numerose",
    prezzo: 15500,
    prezzoOriginale: 18000,
    categoria: "Fotovoltaico",
    immagine: "/images/pannelli.png",
    caratteristiche: [
      "24 pannelli da 250W",
      "Inverter trifase",
      "Installazione compresa",
      "Monitoraggio incluso",
    ],
    disponibile: true,
    bestseller: false,
  },
  {
    id: "pompa-calore-aria-acqua",
    nome: "Pompa di Calore Aria-Acqua",
    descrizione:
      "Sistema di riscaldamento ad alta efficienza per sostituire la caldaia",
    prezzo: 12000,
    prezzoOriginale: 14000,
    categoria: "Pompe di Calore",
    immagine: "/images/pompa.png",
    caratteristiche: [
      "COP 4.5",
      "Funziona fino a -20°C",
      "Installazione inclusa",
      "Controllo smart",
    ],
    disponibile: true,
    bestseller: true,
  },
  {
    id: "batteria-accumulo-10kwh",
    nome: "Batteria di Accumulo 10kWh",
    descrizione:
      "Sistema di accumulo per massimizzare l'autoconsumo fotovoltaico",
    prezzo: 7500,
    prezzoOriginale: 9000,
    categoria: "Accumulo",
    immagine: "/images/baccumulo.png",
    caratteristiche: [
      "Capacità 10kWh",
      "Cicli di vita 6000+",
      "Installazione inclusa",
      "App di monitoraggio",
    ],
    disponibile: true,
    bestseller: false,
  },
  {
    id: "colonnina-ricarica-22kw",
    nome: "Colonnina di Ricarica 22kW",
    descrizione: "Stazione di ricarica veloce per auto elettriche domestica",
    prezzo: 2500,
    prezzoOriginale: 3000,
    categoria: "Mobilità Elettrica",
    immagine: "/images/colonnina.png",
    caratteristiche: [
      "Ricarica fino a 22kW",
      "Cavo incluso",
      "Installazione compresa",
      "Controllo da app",
    ],
    disponibile: false,
    bestseller: false,
  },
  {
    id: "kit-completo-casa",
    nome: "Kit Completo Casa Sostenibile",
    descrizione:
      "Soluzione completa: Fotovoltaico + Pompa di Calore + Accumulo",
    prezzo: 25000,
    prezzoOriginale: 30000,
    categoria: "Kit Completi",
    immagine: "/images/kit-completo.png",
    caratteristiche: [
      "FV 6kW + PDC + Batteria 10kWh",
      "Installazione completa",
      "Progettazione inclusa",
      "Garanzia totale",
    ],
    disponibile: true,
    bestseller: true,
  },
];

const CATEGORIE = [
  "Tutti",
  "Fotovoltaico",
  "Pompe di Calore",
  "Accumulo",
  "Mobilità Elettrica",
  "Kit Completi",
];

export default function Ecommerce() {
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("Tutti");
  const [carrello, setCarrello] = useState([]);
  const [modaleProdotto, setModaleProdotto] = useState(null);

  const prodottiFiltrati =
    categoriaSelezionata === "Tutti"
      ? PRODOTTI_ECOMMERCE
      : PRODOTTI_ECOMMERCE.filter((p) => p.categoria === categoriaSelezionata);

  const euro = (prezzo) =>
    new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(prezzo);

  const aggiungiAlCarrello = (prodotto) => {
    setCarrello((prev) => [...prev, prodotto]);
    // placeholder UX rapido; in produzione usa toast
    alert(`${prodotto.nome} aggiunto al carrello!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR CON PROFILO + CARRELLO */}
      <Navbar cartCount={carrello.length} />

      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Ecommerce Energy Planner
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
            Acquista i migliori prodotti per l'efficienza energetica.
            Installazione garantita dai nostri partner certificati.
          </p>
        </div>
      </header>

      {/* FILTRI CATEGORIA */}
      <section className="bg-white/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIE.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSelezionata(categoria)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoriaSelezionata === categoria
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRIGLIA PRODOTTI */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prodottiFiltrati.map((prodotto) => (
            <article
              key={prodotto.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Badge + Immagine */}
              <div className="relative">
                {prodotto.bestseller && (
                  <span className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Bestseller
                  </span>
                )}
                {!prodotto.disponibile && (
                  <span className="absolute top-3 right-3 z-10 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Non Disponibile
                  </span>
                )}

                <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                  {prodotto.immagine ? (
                    <img
                      src={prodotto.immagine}
                      alt={prodotto.nome}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <p className="text-sm text-gray-600">Immagine Prodotto</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contenuto */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                    {prodotto.categoria}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {prodotto.nome}
                </h3>

                <p className="text-gray-600 mb-4">{prodotto.descrizione}</p>

                {/* Caratteristiche rapide */}
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {prodotto.caratteristiche.slice(0, 2).map((car, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-green-600 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {car}
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
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {prodotto.disponibile
                      ? "Aggiungi al Carrello"
                      : "Non Disponibile"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* SEZIONE INSTALLATORI */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Installazione Garantita</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Ogni prodotto viene installato da tecnici certificati della nostra
            rete. Trova l'installatore più vicino a te.
          </p>
          <Link
            to="/installatori"
            className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Trova Installatore
            <svg
              className="ml-2 h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* MODALE DETTAGLI */}
      {modaleProdotto && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div
              className="fixed inset-0 bg-black/50"
              aria-hidden="true"
              onClick={() => setModaleProdotto(null)}
            />
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-2xl sm:w-full focus:outline-none"
              onClick={(e) => e.stopPropagation()}
              role="document"
            >
              <div className="bg-white px-6 pt-6 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {modaleProdotto.nome}
                  </h3>
                  <button
                    onClick={() => setModaleProdotto(null)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Chiudi dettagli prodotto"
                  >
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <div className="w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {modaleProdotto.immagine ? (
                      <img
                        src={modaleProdotto.immagine}
                        alt={modaleProdotto.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <p className="text-gray-600">Immagine Prodotto</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full font-semibold">
                      {modaleProdotto.categoria}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {modaleProdotto.descrizione}
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-2">
                    Caratteristiche
                  </h4>
                  <ul className="space-y-2">
                    {modaleProdotto.caratteristiche.map((c, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg
                          className="h-4 w-4 text-green-600 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-3xl font-bold text-orange-600">
                      {euro(modaleProdotto.prezzo)}
                    </span>
                    {modaleProdotto.prezzoOriginale > modaleProdotto.prezzo && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {euro(modaleProdotto.prezzoOriginale)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setModaleProdotto(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Chiudi
                    </button>
                    <button
                      onClick={() => {
                        aggiungiAlCarrello(modaleProdotto);
                        setModaleProdotto(null);
                      }}
                      disabled={!modaleProdotto.disponibile}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        modaleProdotto.disponibile
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {modaleProdotto.disponibile
                        ? "Aggiungi al Carrello"
                        : "Non Disponibile"}
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
