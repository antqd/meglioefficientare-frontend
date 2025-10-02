// src/pages/InstallatoriTuttiPage.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PROVINCE, INSTALLATORI } from "../data/installatori";
import { slugify } from "../utils/string";

export default function InstallatoriTuttiPage() {
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

  const onVerificaCopertura = (e) => {
    e.preventDefault();
    const valido = /^\d{5}$/.test(cap);
    alert(valido ? `Copertura in verifica per CAP ${cap}…` : "Inserisci un CAP valido (5 cifre).");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tutti gli installatori</h1>
              <p className="mt-2 text-gray-600">
                Filtra per provincia, CAP o cerca per nome/categoria.
              </p>
            </div>
            <Link
              to="/installatori"
              className="inline-flex items-center rounded-full border-2 border-gray-300 text-gray-700 px-5 py-2.5 font-semibold hover:bg-gray-100 self-start"
            >
              {"<- Torna alla pagina rete"}
            </Link>
          </div>

          {/* FILTRI */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <select
              className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option value="">Tutte le province</option>
              {PROVINCE.map((p) => (
                <option key={p} value={p}>{p}</option>
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
                onChange={(e) => setCap(e.target.value.replace(/\D/g, "").slice(0, 5))}
              />
              <button className="rounded-xl bg-orange-600 text-white px-4 font-semibold hover:bg-orange-700">
                Verifica
              </button>
            </form>

            <input
              type="text"
              placeholder="Cerca per nome o categoria (es. Fotovoltaico)"
              className="rounded-xl border-gray-300 focus:ring-0 focus:border-orange-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* LISTA COMPLETA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtrati.map((r) => (
              <CardInstallatore key={r.id} {...r} />
            ))}
            {filtrati.length === 0 && (
              <div className="col-span-full text-sm text-gray-500">
                Nessun installatore trovato con i filtri correnti.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* === Card riusabile (identica all’altra per coerenza) === */
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
            ★ {Number(rating).toFixed(1)}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categorie.map((c) => (
            <span key={c} className="rounded-full bg-orange-100 text-orange-800 text-xs px-2 py-1">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Disponibilità: {tempi}</span>
          <Link to={`/installatori/${slugify(nome)}`} className="text-sm font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center">
            Scheda completa
            <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
