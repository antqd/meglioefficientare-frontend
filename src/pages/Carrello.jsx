// src/pages/Carrello.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const INITIAL_ITEMS = [
  {
    id: "kit-fv",
    nome: "Kit Fotovoltaico Residenziale 6 kWp",
    prezzo: 5250,
    qty: 1,
    img: "/images/pannelli.png",
    categoria: "Energia rinnovabile",
    installatoreSuggerito: "Mario Rossi Impianti",
  },
  {
    id: "pdc-hybrid",
    nome: "Pompa di Calore aria-acqua 12 kW",
    prezzo: 3890,
    qty: 1,
    img: "/images/pompa.png",
    categoria: "Climatizzazione",
    installatoreSuggerito: "Giulia Verdi Clima",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    value
  );

export default function CarrelloPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [codicePromo, setCodicePromo] = useState("");

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.prezzo * item.qty, 0),
    [items]
  );
  const sconto = useMemo(() => (codicePromo === "WELCOME" ? subtotal * 0.05 : 0), [
    codicePromo,
    subtotal,
  ]);
  const totale = subtotal - sconto;

  const aggiornaQuantita = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const rimuoviItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={items.length} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Il tuo carrello</h1>
              <p className="mt-2 text-gray-600">
                Qui trovi i prodotti che hai selezionato da <strong>Meglio Efficientare</strong>.
                Completa l'ordine per prenotare installazione e sopralluogo.
              </p>
            </div>

            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-gray-900">Il carrello è vuoto</h2>
                <p className="mt-2 text-gray-600">
                  Visita lo shop o contatta un installatore per aggiungere prodotti.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/ecommerce"
                    className="rounded-full bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700"
                  >
                    Vai allo shop
                  </Link>
                  <Link
                    to="/installatori"
                    className="rounded-full border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:border-orange-400 hover:text-orange-600"
                  >
                    Trova installatore
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl bg-white border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row gap-6"
                  >
                    <div className="sm:w-40 h-40 rounded-2xl bg-gray-100 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{item.nome}</h2>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">
                          {item.categoria}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                          Installatore suggerito: {item.installatoreSuggerito}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="h-8 w-8 rounded-full border border-gray-300 text-gray-700 hover:border-orange-500"
                            onClick={() => aggiornaQuantita(item.id, -1)}
                            aria-label="Riduci quantità"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-900">
                            {item.qty}
                          </span>
                          <button
                            className="h-8 w-8 rounded-full border border-gray-300 text-gray-700 hover:border-orange-500"
                            onClick={() => aggiornaQuantita(item.id, 1)}
                            aria-label="Aumenta quantità"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(item.prezzo * item.qty)}
                          </p>
                          <button
                            className="text-sm text-red-500 hover:text-red-600"
                            onClick={() => rimuoviItem(item.id)}
                          >
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="w-full lg:w-80 space-y-6">
            <div className="rounded-3xl bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Riepilogo ordine</h2>
              <dl className="mt-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Subtotale</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Sconto promo</dt>
                  <dd>{sconto ? `- ${formatCurrency(sconto)}` : "€ 0,00"}</dd>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 text-base border-t border-gray-200 pt-3">
                  <dt>Totale</dt>
                  <dd>{formatCurrency(Math.max(0, totale))}</dd>
                </div>
              </dl>

              <form className="mt-5 flex gap-2">
                <input
                  type="text"
                  placeholder="Codice promo"
                  className="flex-1 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-0"
                  value={codicePromo}
                  onChange={(e) => setCodicePromo(e.target.value.trim().toUpperCase())}
                />
                <button
                  type="button"
                  className="rounded-xl bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-800"
                  onClick={() =>
                    alert(
                      codicePromo === "WELCOME"
                        ? "Codice applicato: sconto 5%"
                        : "Codice non valido"
                    )
                  }
                >
                  Applica
                </button>
              </form>

              <button
                disabled={items.length === 0}
                className="mt-6 w-full rounded-full bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700 disabled:bg-gray-300"
                onClick={() => alert("Checkout simulato. Integrerai il backend qui.")}
              >
                Procedi al checkout
              </button>
            </div>

            <div className="rounded-3xl bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Passi successivi</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>✓ Ricevi la chiamata dell'installatore in 24h</li>
                <li>✓ Carica documenti nell'area account</li>
                <li>✓ Pianifica sopralluogo con l'agenda condivisa</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
