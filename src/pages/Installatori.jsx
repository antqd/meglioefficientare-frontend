import React, { useState } from "react";
import { Link } from "react-router-dom";

const INSTALLATORI_MOCK = [
  {
    id: 1,
    nome: "Giuseppe Tieri",
    azienda: "Tieri Impianti",
    citta: "Corigliano Calabro",
    provincia: "CS",
    regione: "Calabria",
    specializzazioni: ["Fotovoltaico", "Pompe di Calore"],
    rating: 4.8,
    recensioni: 24,
    telefono: "+39 123 456 7890",
    email: "giuseppe@tieriimpianti.it",
    verificato: true,
    dataRegistrazione: "2024-01-15"
  },
  {
    id: 2,
    nome: "Marco Bianchi",
    azienda: "Energia Verde Srl",
    citta: "Cosenza",
    provincia: "CS",
    regione: "Calabria",
    specializzazioni: ["Fotovoltaico", "Accumulo", "Mobilità Elettrica"],
    rating: 4.6,
    recensioni: 18,
    telefono: "+39 098 765 4321",
    email: "marco@energiaverde.it",
    verificato: true,
    dataRegistrazione: "2024-02-20"
  },
  {
    id: 3,
    nome: "Luca Rossi",
    azienda: "Impianti Sud",
    citta: "Catanzaro",
    provincia: "CZ",
    regione: "Calabria",
    specializzazioni: ["Pompe di Calore", "Accumulo"],
    rating: 4.9,
    recensioni: 31,
    telefono: "+39 345 678 9012",
    email: "luca@impiantisud.it",
    verificato: true,
    dataRegistrazione: "2023-11-10"
  }
];

export default function Installatori() {
  const [modalita, setModalita] = useState("ricerca");
  const [ricerca, setRicerca] = useState("");
  const [installatoreSelezionato, setInstallatoreSelezionato] = useState(null);

  const installatoriFiltrati = INSTALLATORI_MOCK.filter(installatore =>
    installatore.citta.toLowerCase().includes(ricerca.toLowerCase()) ||
    installatore.provincia.toLowerCase().includes(ricerca.toLowerCase()) ||
    installatore.regione.toLowerCase().includes(ricerca.toLowerCase()) ||
    installatore.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
    installatore.azienda.toLowerCase().includes(ricerca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Rete Installatori Energy Planner
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Trova installatori qualificati nella tua zona o entra a far parte della nostra rete professionale
          </p>
        </div>
      </div>

      {/* Selezione Modalità */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-md">
            <button
              onClick={() => setModalita("ricerca")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                modalita === "ricerca"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              🔍 Trova Installatore
            </button>
            <button
              onClick={() => setModalita("registrazione-installatore")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                modalita === "registrazione-installatore"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              🔧 Diventa Installatore
            </button>
            <button
              onClick={() => setModalita("registrazione-cliente")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                modalita === "registrazione-cliente"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              👤 Segnala Installatore
            </button>
          </div>
        </div>

        {/* Contenuto basato sulla modalità */}
        {modalita === "ricerca" && (
          <RicercaInstallatori
            ricerca={ricerca}
            setRicerca={setRicerca}
            installatori={installatoriFiltrati}
            onSeleziona={setInstallatoreSelezionato}
          />
        )}

        {modalita === "registrazione-installatore" && <RegistrazioneInstallatore />}
        {modalita === "registrazione-cliente" && <RegistrazioneCliente />}
      </div>

      {/* Modal Dettagli Installatore */}
      {installatoreSelezionato && (
        <ModalDettagliInstallatore
          installatore={installatoreSelezionato}
          onClose={() => setInstallatoreSelezionato(null)}
        />
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
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
            <Link to="/ecommerce" className="text-gray-700 hover:text-orange-600 font-medium">
              Ecommerce
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-orange-600 font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function RicercaInstallatori({ ricerca, setRicerca, installatori, onSeleziona }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Trova il tuo installatore di fiducia
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Cerca per città, provincia o nome installatore..."
            value={ricerca}
            onChange={(e) => setRicerca(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid gap-6">
        {installatori.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nessun installatore trovato per la tua ricerca.
            </p>
          </div>
        ) : (
          installatori.map((installatore) => (
            <div key={installatore.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 mr-3">
                      {installatore.nome}
                    </h3>
                    {installatore.verificato && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        ✓ Verificato
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-2">{installatore.azienda}</p>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {installatore.citta}, {installatore.provincia} ({installatore.regione})
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(installatore.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {installatore.rating} ({installatore.recensioni} recensioni)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {installatore.specializzazioni.map((spec, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <button
                    onClick={() => onSeleziona(installatore)}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Contatta
                  </button>
                  <a
                    href={`tel:${installatore.telefono}`}
                    className="border border-orange-600 text-orange-600 px-6 py-2 rounded-lg font-semibold text-center hover:bg-orange-50 transition-colors"
                  >
                    Chiama
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function RegistrazioneInstallatore() {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    azienda: "",
    email: "",
    telefono: "",
    citta: "",
    provincia: "",
    regione: "",
    specializzazioni: [],
    esperienza: "",
    descrizione: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrazione installatore:", form);
    alert("Registrazione inviata! Ti contatteremo presto per la verifica.");
  };

  const toggleSpecializzazione = (spec) => {
    setForm(prev => ({
      ...prev,
      specializzazioni: prev.specializzazioni.includes(spec)
        ? prev.specializzazioni.filter(s => s !== spec)
        : [...prev.specializzazioni, spec]
    }));
  };

  const specializzazioniDisponibili = [
    "Fotovoltaico",
    "Pompe di Calore",
    "Accumulo",
    "Mobilità Elettrica",
    "Efficientamento Energetico"
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Entra nella Rete Energy Planner
        </h2>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-orange-800 mb-2">Vantaggi per gli Installatori:</h3>
          <ul className="text-orange-700 text-sm space-y-1">
            <li>• Registrazione completamente gratuita</li>
            <li>• Ricevi richieste di lavoro qualificate</li>
            <li>• Aumenta la tua visibilità online</li>
            <li>• Accesso a prodotti scontati</li>
            <li>• Supporto tecnico dedicato</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <input
                type="text"
                required
                value={form.nome}
                onChange={(e) => setForm({...form, nome: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cognome *
              </label>
              <input
                type="text"
                required
                value={form.cognome}
                onChange={(e) => setForm({...form, cognome: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Azienda *
            </label>
            <input
              type="text"
              required
              value={form.azienda}
              onChange={(e) => setForm({...form, azienda: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefono *
              </label>
              <input
                type="tel"
                required
                value={form.telefono}
                onChange={(e) => setForm({...form, telefono: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Città *
              </label>
              <input
                type="text"
                required
                value={form.citta}
                onChange={(e) => setForm({...form, citta: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provincia *
              </label>
              <input
                type="text"
                required
                value={form.provincia}
                onChange={(e) => setForm({...form, provincia: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regione *
              </label>
              <input
                type="text"
                required
                value={form.regione}
                onChange={(e) => setForm({...form, regione: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specializzazioni *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specializzazioniDisponibili.map((spec) => (
                <label key={spec} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.specializzazioni.includes(spec)}
                    onChange={() => toggleSpecializzazione(spec)}
                    className="mr-2 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{spec}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anni di Esperienza *
            </label>
            <select
              required
              value={form.esperienza}
              onChange={(e) => setForm({...form, esperienza: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Seleziona...</option>
              <option value="1-2">1-2 anni</option>
              <option value="3-5">3-5 anni</option>
              <option value="6-10">6-10 anni</option>
              <option value="10+">Oltre 10 anni</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrizione della tua attività
            </label>
            <textarea
              rows={4}
              value={form.descrizione}
              onChange={(e) => setForm({...form, descrizione: e.target.value})}
              placeholder="Racconta brevemente la tua esperienza e i servizi che offri..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Invia Richiesta di Registrazione
          </button>
        </form>
      </div>
    </div>
  );
}

function RegistrazioneCliente() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    nomeInstallatore: "",
    aziendaInstallatore: "",
    cittaInstallatore: "",
    telefonoInstallatore: "",
    emailInstallatore: "",
    motivazione: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Segnalazione installatore:", form);
    alert("Segnalazione inviata! Verificheremo l'installatore e lo contatteremo.");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Segnala un Installatore di Fiducia
        </h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Aiutaci a crescere!</h3>
          <p className="text-blue-700 text-sm">
            Conosci un installatore bravo e affidabile? Segnalacelo e lo inviteremo 
            a entrare nella nostra rete. Riceverai uno sconto del 5% sul tuo prossimo acquisto!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">I tuoi dati</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Il tuo nome *
                </label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({...form, nome: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  La tua email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Il tuo telefono
              </label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm({...form, telefono: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dati dell'installatore</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome installatore *
                </label>
                <input
                  type="text"
                  required
                  value={form.nomeInstallatore}
                  onChange={(e) => setForm({...form, nomeInstallatore: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Azienda
                </label>
                <input
                  type="text"
                  value={form.aziendaInstallatore}
                  onChange={(e) => setForm({...form, aziendaInstallatore: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Città *
                </label>
                <input
                  type="text"
                  required
                  value={form.cittaInstallatore}
                  onChange={(e) => setForm({...form, cittaInstallatore: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono
                </label>
                <input
                  type="tel"
                  value={form.telefonoInstallatore}
                  onChange={(e) => setForm({...form, telefonoInstallatore: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.emailInstallatore}
                  onChange={(e) => setForm({...form, emailInstallatore: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Perché lo consigli? *
            </label>
            <textarea
              rows={4}
              required
              value={form.motivazione}
              onChange={(e) => setForm({...form, motivazione: e.target.value})}
              placeholder="Racconta la tua esperienza con questo installatore..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Invia Segnalazione
          </button>
        </form>
      </div>
    </div>
  );
}

function ModalDettagliInstallatore({ installatore, onClose }) {
  const [messaggioInviato, setMessaggioInviato] = useState(false);
  const [messaggio, setMessaggio] = useState("");

  const inviaMessaggio = () => {
    console.log("Messaggio inviato a", installatore.nome, ":", messaggio);
    setMessaggioInviato(true);
    setTimeout(() => {
      setMessaggioInviato(false);
      setMessaggio("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>

        {/* Modal */}
        <div 
          className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white px-6 pt-6 pb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {installatore.nome}
                </h3>
                <p className="text-lg text-gray-600">{installatore.azienda}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {installatore.citta}, {installatore.provincia} ({installatore.regione})
              </div>

              <div className="flex items-center text-gray-600">
                <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {installatore.telefono}
              </div>

              <div className="flex items-center text-gray-600">
                <svg className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {installatore.email}
              </div>

              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-5 w-5 ${i < Math.floor(installatore.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {installatore.rating} ({installatore.recensioni} recensioni)
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Specializzazioni:</h4>
                <div className="flex flex-wrap gap-2">
                  {installatore.specializzazioni.map((spec, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {!messaggioInviato ? (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Invia un messaggio:</h4>
                <textarea
                  value={messaggio}
                  onChange={(e) => setMessaggio(e.target.value)}
                  rows={4}
                  placeholder="Descrivi il tuo progetto e le tue esigenze..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Chiudi
                  </button>
                  <a
                    href={`tel:${installatore.telefono}`}
                    className="flex-1 border border-orange-600 text-orange-600 py-2 rounded-lg font-semibold text-center hover:bg-orange-50 transition-colors"
                  >
                    Chiama Ora
                  </a>
                  <button
                    onClick={inviaMessaggio}
                    disabled={!messaggio.trim()}
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Invia Messaggio
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 border-t">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Messaggio Inviato!
                </h4>
                <p className="text-gray-600">
                  {installatore.nome} riceverà il tuo messaggio e ti contatterà presto.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}