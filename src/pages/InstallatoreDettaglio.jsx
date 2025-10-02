// src/pages/InstallatoreDettaglio.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { INSTALLATORI } from "../data/installatori";
import { slugify } from "../utils/string";

const findInstallatore = (param) => {
  if (!param) return undefined;
  const numeric = Number(param);
  return INSTALLATORI.find(
    (inst) => inst.id === numeric || slugify(inst.nome) === param
  );
};

export default function InstallatoreDettaglioPage() {
  const { id: param } = useParams();

  const installatore = useMemo(() => findInstallatore(param), [param]);

  const correlati = useMemo(() => {
    if (!installatore) return [];
    return INSTALLATORI.filter((inst) => inst.id !== installatore.id)
      .filter((inst) => inst.categorie.some((c) => installatore.categorie.includes(c)))
      .slice(0, 3);
  }, [installatore]);

  if (!installatore) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Installatore non trovato
          </h1>
          <p className="mt-4 text-gray-600">
            Controlla il link oppure torna all'elenco completo degli installatori.
          </p>
          <Link
            to="/installatori-tutti"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-600 text-white px-5 py-2.5 font-semibold hover:bg-orange-700"
          >
            {"<- Torna all'elenco"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-sm text-gray-300 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/installatori" className="hover:text-white">Installatori</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{installatore.nome}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
            <img
              src={installatore.img}
              alt={installatore.nome}
              className="w-full max-w-sm h-64 object-cover rounded-3xl border border-gray-700"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">{installatore.nome}</h1>
              <p className="mt-3 text-lg text-gray-300">
                Specializzato in interventi {installatore.categorie.join(", ")}
                , con copertura rapida su {installatore.provincia}.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Chip label={`★ ${installatore.rating.toFixed(1)} / 5`} />
                <Chip label={`Provincia: ${installatore.provincia}`} />
                <Chip label={`Disponibile in ${installatore.tempi}`} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/carrello"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
                >
                  Prenota sopralluogo
                  <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  to="/installatori-tutti"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white hover:text-gray-900"
                >
                  Esplora altri installatori
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <ArticleCard
              title="Servizi principali"
              description="Interventi gestiti dall'installatore e cosa comprende l'offerta base."
            >
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {installatore.categorie.map((categoria) => (
                  <li key={categoria}>
                    {categoria} con assistenza completa: sopralluogo, installazione e collaudo.
                  </li>
                ))}
                <li>
                  Gestione pratiche Conto Termico e detrazioni fiscali con il supporto del nostro team.
                </li>
                <li>
                  Monitoraggio post installazione e manutenzione programmata nei primi 12 mesi.
                </li>
              </ul>
            </ArticleCard>

            <ArticleCard
              title="Metodo di lavoro"
              description="Come viene gestita una commessa tipo dall'ingresso alla consegna."
            >
              <ol className="space-y-3 text-gray-700">
                <li>
                  <strong>Analisi preliminare:</strong> raccolta dati energetici, foto impianto e verifica documentale.
                </li>
                <li>
                  <strong>Proposta tecnica:</strong> scelta componenti certificati e simulazione risparmio energetico.
                </li>
                <li>
                  <strong>Installazione e collaudo:</strong> squadra certificata in loco, report fotografico e formazione utente.
                </li>
              </ol>
            </ArticleCard>

            <ArticleCard
              title="Recensioni recenti"
              description="Feedback raccolti dalla community Meglio Efficientare."
            >
              <div className="space-y-4">
                <Review
                  author="Condominio Via Foppa"
                  text="Installazione impeccabile della PDC centralizzata, con cantiere pulito e consegna nei tempi pianificati."
                />
                <Review
                  author="Sara, Milano"
                  text="Hanno seguito tutte le pratiche conto termico e spiegato l'app di monitoraggio con grande chiarezza."
                />
                <Review
                  author="Studio Tecnico Verdi"
                  text="Collaborazione precisa: preventivi dettagliati e disponibilità a lavorare con i nostri progettisti."
                />
              </div>
            </ArticleCard>
          </div>

          <aside className="space-y-6">
            <ArticleCard title="Dati rapidi">
              <dl className="space-y-3 text-gray-700">
                <div>
                  <dt className="font-semibold">Zona operativa</dt>
                  <dd>{installatore.provincia}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Tempi medi</dt>
                  <dd>{installatore.tempi} dal contatto</dd>
                </div>
                <div>
                  <dt className="font-semibold">Rating medio</dt>
                  <dd>★ {installatore.rating.toFixed(1)} / 5</dd>
                </div>
                <div>
                  <dt className="font-semibold">Team</dt>
                  <dd>3 squadre certificate e reperibilità weekend</dd>
                </div>
              </dl>
            </ArticleCard>

            <ArticleCard title="Documenti già disponibili">
              <ul className="space-y-2 text-gray-700">
                <li>✓ Visura camerale aggiornata</li>
                <li>✓ Copertura assicurativa RC fino a €1M</li>
                <li>✓ Certificazioni FER e F-Gas</li>
              </ul>
            </ArticleCard>

            <ArticleCard title="Referenti diretti">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Project Manager:</strong> Laura (laura@energyplanner.it)
                </li>
                <li>
                  <strong>Back office:</strong> Marco (backoffice@energyplanner.it)
                </li>
                <li>
                  <strong>Supporto tecnico:</strong> +39 345 678 9002
                </li>
              </ul>
            </ArticleCard>
          </aside>
        </section>

        {correlati.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Installatori simili
            </h2>
            <p className="text-gray-600 mt-1">
              Potrebbero interessarti altre squadre con competenze affini.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {correlati.map((inst) => (
                <Link
                  key={inst.id}
                  to={`/installatori/${slugify(inst.nome)}`}
                  className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={inst.img}
                    alt={inst.nome}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{inst.nome}</h3>
                    <p className="text-sm text-gray-500">{inst.provincia}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {inst.categorie.map((cat) => (
                        <span
                          key={cat}
                          className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Chip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 text-white px-4 py-1 text-sm font-semibold">
      {label}
    </span>
  );
}

function ArticleCard({ title, description, children }) {
  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      <div className="mt-4 space-y-3 text-gray-700">{children}</div>
    </article>
  );
}

function Review({ author, text }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <p className="text-gray-700">"{text}"</p>
      <p className="mt-3 text-sm font-semibold text-gray-900">{author}</p>
    </div>
  );
}
