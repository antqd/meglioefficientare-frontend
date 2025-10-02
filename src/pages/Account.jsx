// src/pages/Account.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ACCOUNT_ACTIONS,
  RECENT_ORDERS,
  SAVED_INSTALLERS,
  USER_ACCOUNT,
} from "../data/user";
import { slugify } from "../utils/string";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-orange-500">
                Area personale
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Ciao {USER_ACCOUNT.nome.split(" ")[0]}, benvenuto nella tua dashboard
              </h1>
              <p className="mt-3 text-gray-600 max-w-3xl">
                Gestisci ordini, installazioni e documentazione collegata ai progetti Meglio Efficientare.
                Qui trovi anche lo storico degli installatori e le iniziative di efficienza energetica.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="CO2 risparmiata"
            value={USER_ACCOUNT.consumi.co2Risparmiata}
          />
          <MetricCard
            label="Autoconsumo"
            value={USER_ACCOUNT.consumi.autoconsumo}
          />
          <MetricCard label="Provincia" value={USER_ACCOUNT.sede} />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="lg:col-span-2 rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Ordini recenti
              </h2>
              <Link to="/profilo" className="text-sm text-orange-600 hover:text-orange-700">
                {"Vedi dettagli profilo ->"}
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {RECENT_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-200 px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <p className="text-sm text-gray-500">{order.id}</p>
                    <p className="text-base font-semibold text-gray-900">
                      {order.titolo}
                    </p>
                    <p className="text-sm text-gray-500">{order.data}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-semibold text-gray-900">{order.totale}</p>
                    <p className="text-orange-600 font-medium">{order.stato}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Azioni rapide</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              {ACCOUNT_ACTIONS.map((action) => (
                <li key={action.id} className="rounded-2xl border border-gray-200 px-4 py-3 hover:border-orange-400 hover:bg-orange-50">
                  <Link to={action.to} className="block">
                    <p className="font-semibold text-gray-900">{action.titolo}</p>
                    <p className="text-sm text-gray-600">{action.descrizione}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="lg:col-span-2 rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Installatori salvati
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Squadre che hai valutato positivamente o che segui per disponibilità futura.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {SAVED_INSTALLERS.map((inst) => (
                <Link
                  key={inst.id}
                  to={`/installatori/${slugify(inst.nome)}`}
                  className="rounded-2xl border border-gray-200 px-4 py-4 hover:border-orange-400 hover:bg-orange-50"
                >
                  <p className="text-sm text-gray-500">{inst.provincia}</p>
                  <p className="text-lg font-semibold text-gray-900">{inst.nome}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {inst.categorie.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-orange-100 text-orange-800 text-xs px-3 py-1"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Referente dedicato</h2>
            <p className="mt-2 text-sm text-gray-600">
              Il tuo consulente Meglio Efficientare ti supporta per pratiche, incentivi e selezione squadre.
            </p>
            <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-200 px-4 py-4">
              <p className="text-sm text-gray-500">Nome</p>
              <p className="text-base font-semibold text-gray-900">Francesca L.</p>
              <p className="mt-3 text-sm text-gray-500">Contatti</p>
              <p className="text-sm text-gray-700">francesca@energyplanner.it</p>
              <p className="text-sm text-gray-700">+39 345 678 9000</p>
            </div>
          </article>
        </section>

        <section
          id="documenti"
          className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Documenti condivisi e checklist
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Carica contratti, relazioni tecniche e fotografie: i file saranno
            visibili al team tecnico e agli installatori abilitati.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
              <p className="text-sm text-gray-500">Checklist consigliata</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li>- Documento identità intestatario</li>
                <li>- Ultime bollette energia / gas</li>
                <li>- Foto impianto o locale tecnico</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
              <p className="text-sm text-gray-500">In arrivo</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li>- Upload multiplo drag and drop</li>
                <li>- Firma digitale e tracciamento revisioni</li>
                <li>- Integrazione cloud con cartelle condivise</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Funzionalità simulate: collega qui il backend quando sarà pronto.
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
