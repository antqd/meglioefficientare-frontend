// src/pages/Profilo.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { USER_ACCOUNT, USER_PROFILE } from "../data/user";

export default function ProfiloPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/account" className="text-sm text-gray-300 hover:text-white">
            {"<- Torna all'account"}
          </Link>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold">
            Profilo: {USER_ACCOUNT.nome}
          </h1>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl">
            Visione, valori e progetti in corso legati al network Meglio Efficientare.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section className="grid gap-6 lg:grid-cols-3">
          <article className="lg:col-span-2 rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Chi siamo</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{USER_PROFILE.bio}</p>
          </article>

          <article className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Dati principali</h2>
            <dl className="mt-4 space-y-3 text-sm text-gray-600">
              <div>
                <dt className="text-gray-500">Ruolo</dt>
                <dd className="text-gray-900 font-semibold">{USER_ACCOUNT.ruolo}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="text-gray-900">{USER_ACCOUNT.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Telefono</dt>
                <dd className="text-gray-900">{USER_ACCOUNT.telefono}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Sede</dt>
                <dd className="text-gray-900">{USER_ACCOUNT.sede}</dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Focus</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              {USER_PROFILE.focus.map((item) => (
                <li key={item} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Valori</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              {USER_PROFILE.valori.map((item) => (
                <li key={item} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Progetti in evidenza</h2>
            <div className="mt-4 space-y-4">
              {USER_PROFILE.progettiRilevanti.map((project) => (
                <div key={project.titolo} className="rounded-2xl border border-gray-200 px-4 py-4">
                  <p className="text-sm text-gray-500">{project.titolo}</p>
                  <p className="mt-2 text-gray-700">{project.descrizione}</p>
                </div>
              ))}
            </div>
          </article>

          <article
            id="contatti"
            className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900">Contatti diretti</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {USER_PROFILE.referenti.map((ref) => (
                <li key={ref.email} className="rounded-2xl border border-gray-200 px-4 py-3 bg-gray-50">
                  <p className="text-sm text-gray-500">{ref.nome}</p>
                  <p className="text-gray-900">{ref.email}</p>
                  <p>{ref.telefono}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
