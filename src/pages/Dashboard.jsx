import React, { useState } from "react";
import { Link } from "react-router-dom";

// Dati mock per simulare il funzionamento
const UTENTE_MOCK = {
  tipo: "installatore", // "installatore" | "venditore" | "agente"
  nome: "Giuseppe Tieri",
  azienda: "Tieri Impianti",
  email: "giuseppe@tieriimpianti.it",
  citta: "Corigliano Calabro",
  provincia: "CS",
  dataRegistrazione: "2024-01-15",
  verificato: true
};

const RICHIESTE_MOCK = [
  {
    id: 1,
    cliente: "Mario Rossi",
    email: "mario.rossi@email.com",
    telefono: "+39 123 456 7890",
    citta: "Corigliano Calabro",
    prodotto: "Kit Fotovoltaico 6kW",
    messaggio: "Salve, sono interessato a un impianto fotovoltaico per la mia abitazione. Potreste farmi un preventivo?",
    data: "2024-12-15",
    stato: "nuova",
    valore: 15500
  },
  {
    id: 2,
    cliente: "Anna Bianchi",
    email: "anna.bianchi@email.com",
    telefono: "+39 987 654 3210",
    citta: "Rossano",
    prodotto: "Pompa di Calore",
    messaggio: "Vorrei sostituire la mia vecchia caldaia con una pompa di calore. Quando potreste venire per un sopralluogo?",
    data: "2024-12-14",
    stato: "in_corso",
    valore: 12000
  },
  {
    id: 3,
    cliente: "Luca Verdi",
    email: "luca.verdi@email.com",
    telefono: "+39 555 123 4567",
    citta: "Corigliano Calabro",
    prodotto: "Kit Completo Casa Sostenibile",
    messaggio: "Interessato al kit completo fotovoltaico + pompa di calore + accumulo. Potete inviarmi un preventivo dettagliato?",
    data: "2024-12-13",
    stato: "completata",
    valore: 25000
  }
];

const VENDITE_MOCK = [
  {
    id: 1,
    prodotto: "Kit Fotovoltaico 3kW",
    cliente: "Francesco Neri",
    installatore: "Giuseppe Tieri",
    valore: 8500,
    commissione: 850,
    data: "2024-12-10",
    stato: "installato"
  },
  {
    id: 2,
    prodotto: "Pompa di Calore",
    cliente: "Giulia Blu",
    installatore: "Giuseppe Tieri",
    valore: 12000,
    commissione: 1200,
    data: "2024-12-08",
    stato: "in_installazione"
  }
];

export default function Dashboard() {
  const [tipoUtente, setTipoUtente] = useState("installatore");
  const [sezioneAttiva, setSezioneAttiva] = useState("panoramica");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Selezione Tipo Utente (per demo) */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setTipoUtente("installatore")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tipoUtente === "installatore"
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vista Installatore
              </button>
              <button
                onClick={() => setTipoUtente("venditore")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tipoUtente === "venditore"
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vista Venditore/Agente
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SidebarNavigation 
              sezioneAttiva={sezioneAttiva}
              setSezioneAttiva={setSezioneAttiva}
              tipoUtente={tipoUtente}
            />
          </div>

          {/* Contenuto Principale */}
          <div className="lg:col-span-3">
            {sezioneAttiva === "panoramica" && (
              <PanoramicaSection tipoUtente={tipoUtente} />
            )}
            {sezioneAttiva === "richieste" && (
              <RichiesteSection />
            )}
            {sezioneAttiva === "vendite" && (
              <VenditeSection />
            )}
            {sezioneAttiva === "profilo" && (
              <ProfiloSection tipoUtente={tipoUtente} />
            )}
            {sezioneAttiva === "rete" && (
              <ReteSection />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
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
            <Link to="/ecommerce" className="text-gray-700 hover:text-orange-600 font-medium">
              Ecommerce
            </Link>
            <Link to="/installatori" className="text-gray-700 hover:text-orange-600 font-medium">
              Installatori
            </Link>
            
            {/* Profilo Utente */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                {UTENTE_MOCK.nome.charAt(0)}
              </div>
              <span className="text-gray-700 font-medium">{UTENTE_MOCK.nome}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function SidebarNavigation({ sezioneAttiva, setSezioneAttiva, tipoUtente }) {
  const menuInstallatore = [
    { id: "panoramica", nome: "Panoramica", icona: "📊" },
    { id: "richieste", nome: "Richieste Clienti", icona: "📋" },
    { id: "vendite", nome: "Le Mie Vendite", icona: "💰" },
    { id: "profilo", nome: "Il Mio Profilo", icona: "👤" }
  ];

  const menuVenditore = [
    { id: "panoramica", nome: "Panoramica", icona: "📊" },
    { id: "rete", nome: "Rete Installatori", icona: "🔧" },
    { id: "vendite", nome: "Le Mie Vendite", icona: "💰" },
    { id: "profilo", nome: "Il Mio Profilo", icona: "👤" }
  ];

  const menu = tipoUtente === "installatore" ? menuInstallatore : menuVenditore;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {UTENTE_MOCK.nome.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{UTENTE_MOCK.nome}</h3>
            <p className="text-sm text-gray-600">{UTENTE_MOCK.azienda}</p>
          </div>
        </div>
        {UTENTE_MOCK.verificato && (
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold inline-block">
            ✓ Verificato
          </div>
        )}
      </div>

      <nav className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setSezioneAttiva(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              sezioneAttiva === item.id
                ? 'bg-orange-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icona}</span>
            <span className="font-medium">{item.nome}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function PanoramicaSection({ tipoUtente }) {
  const euro = (prezzo) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(prezzo);

  const statsInstallatore = [
    { titolo: "Richieste Attive", valore: "2", icona: "📋", colore: "blue" },
    { titolo: "Vendite Questo Mese", valore: "3", icona: "💰", colore: "green" },
    { titolo: "Fatturato Mensile", valore: euro(35500), icona: "📈", colore: "orange" },
    { titolo: "Rating Medio", valore: "4.8", icona: "⭐", colore: "yellow" }
  ];

  const statsVenditore = [
    { titolo: "Installatori in Rete", valore: "12", icona: "🔧", colore: "blue" },
    { titolo: "Vendite Questo Mese", valore: "8", icona: "💰", colore: "green" },
    { titolo: "Commissioni Mensili", valore: euro(4200), icona: "📈", colore: "orange" },
    { titolo: "Clienti Acquisiti", valore: "24", icona: "👥", colore: "purple" }
  ];

  const stats = tipoUtente === "installatore" ? statsInstallatore : statsVenditore;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Panoramica {tipoUtente === "installatore" ? "Installatore" : "Venditore"}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  stat.colore === 'blue' ? 'bg-blue-100' :
                  stat.colore === 'green' ? 'bg-green-100' :
                  stat.colore === 'orange' ? 'bg-orange-100' :
                  stat.colore === 'yellow' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  {stat.icona}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.titolo}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.valore}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attività Recenti */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Attività Recenti</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Nuova richiesta da Mario Rossi</p>
              <p className="text-sm text-gray-600">Kit Fotovoltaico 6kW - Corigliano Calabro</p>
            </div>
            <span className="text-sm text-gray-500">2 ore fa</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">💰</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Vendita completata</p>
              <p className="text-sm text-gray-600">Pompa di Calore - Giulia Blu</p>
            </div>
            <span className="text-sm text-gray-500">1 giorno fa</span>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600">⭐</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Nuova recensione ricevuta</p>
              <p className="text-sm text-gray-600">5 stelle da Francesco Neri</p>
            </div>
            <span className="text-sm text-gray-500">3 giorni fa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RichiesteSection() {
  const [filtroStato, setFiltroStato] = useState("tutte");
  
  const richiestefiltrate = filtroStato === "tutte" 
    ? RICHIESTE_MOCK 
    : RICHIESTE_MOCK.filter(r => r.stato === filtroStato);

  const getStatoColor = (stato) => {
    switch(stato) {
      case "nuova": return "bg-blue-100 text-blue-800";
      case "in_corso": return "bg-yellow-100 text-yellow-800";
      case "completata": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatoText = (stato) => {
    switch(stato) {
      case "nuova": return "Nuova";
      case "in_corso": return "In Corso";
      case "completata": return "Completata";
      default: return stato;
    }
  };

  const euro = (prezzo) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(prezzo);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Richieste Clienti</h2>
        
        <div className="flex gap-2">
          {["tutte", "nuova", "in_corso", "completata"].map((stato) => (
            <button
              key={stato}
              onClick={() => setFiltroStato(stato)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroStato === stato
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {stato === "tutte" ? "Tutte" : getStatoText(stato)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {richiestefiltrate.map((richiesta) => (
          <div key={richiesta.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{richiesta.cliente}</h3>
                <p className="text-gray-600">{richiesta.prodotto}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatoColor(richiesta.stato)}`}>
                  {getStatoText(richiesta.stato)}
                </span>
                <p className="text-lg font-bold text-orange-600 mt-1">{euro(richiesta.valore)}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {richiesta.email}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {richiesta.telefono}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {richiesta.citta}
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2v-6a2 2 0 00-2-2h-4" />
                </svg>
                {richiesta.data}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Messaggio:</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{richiesta.messaggio}</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Rispondi
              </button>
              <button className="flex-1 border border-orange-600 text-orange-600 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Chiama Cliente
              </button>
              <button className="px-4 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Archivia
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VenditeSection() {
  const euro = (prezzo) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(prezzo);

  const getStatoColor = (stato) => {
    switch(stato) {
      case "installato": return "bg-green-100 text-green-800";
      case "in_installazione": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totaleVendite = VENDITE_MOCK.reduce((acc, vendita) => acc + vendita.valore, 0);
  const totaleCommissioni = VENDITE_MOCK.reduce((acc, vendita) => acc + vendita.commissione, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Le Mie Vendite</h2>
      </div>

      {/* Statistiche Vendite */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Vendite Totali</h3>
          <p className="text-2xl font-bold text-gray-900">{VENDITE_MOCK.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Fatturato Totale</h3>
          <p className="text-2xl font-bold text-green-600">{euro(totaleVendite)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Commissioni Totali</h3>
          <p className="text-2xl font-bold text-orange-600">{euro(totaleCommissioni)}</p>
        </div>
      </div>

      {/* Lista Vendite */}
      <div className="space-y-4">
        {VENDITE_MOCK.map((vendita) => (
          <div key={vendita.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{vendita.prodotto}</h3>
                <p className="text-gray-600">Cliente: {vendita.cliente}</p>
                <p className="text-gray-600">Installatore: {vendita.installatore}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatoColor(vendita.stato)}`}>
                  {vendita.stato === "installato" ? "Installato" : "In Installazione"}
                </span>
                <p className="text-lg font-bold text-gray-900 mt-1">{euro(vendita.valore)}</p>
                <p className="text-sm text-orange-600 font-semibold">Commissione: {euro(vendita.commissione)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data: {vendita.data}</span>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                  Dettagli
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Fattura
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfiloSection({ tipoUtente }) {
  const [editing, setEditing] = useState(false);
  const [profilo, setProfilo] = useState(UTENTE_MOCK);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Il Mio Profilo</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          {editing ? "Salva" : "Modifica"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {profilo.nome.charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{profilo.nome}</h3>
            <p className="text-lg text-gray-600">{profilo.azienda}</p>
            <div className="flex items-center space-x-2 mt-2">
              {profilo.verificato && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                  ✓ Verificato
                </span>
              )}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                {tipoUtente === "installatore" ? "Installatore" : "Venditore"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profilo.email}
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Città</label>
            <input
              type="text"
              value={profilo.citta}
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
            <input
              type="text"
              value={profilo.provincia}
              disabled={!editing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Registrazione</label>
            <input
              type="text"
              value={profilo.dataRegistrazione}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Statistiche Profilo */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Statistiche</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">4.8</p>
            <p className="text-sm text-gray-600">Rating Medio</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">24</p>
            <p className="text-sm text-gray-600">Recensioni</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600">Progetti Completati</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">2</p>
            <p className="text-sm text-gray-600">Anni di Attività</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReteSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Rete Installatori</h2>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
          Aggiungi Installatore
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RICHIESTE_MOCK.slice(0, 3).map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                {index === 0 ? "GT" : index === 1 ? "MR" : "LB"}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {index === 0 ? "Giuseppe Tieri" : index === 1 ? "Marco Rossi" : "Luca Bianchi"}
                </h3>
                <p className="text-sm text-gray-600">
                  {index === 0 ? "Corigliano Calabro" : index === 1 ? "Milano" : "Roma"}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Vendite Mese:</span>
                <span className="font-semibold">{index + 2}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold">4.{8 - index}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commissioni:</span>
                <span className="font-semibold text-green-600">€{(index + 1) * 850}</span>
              </div>
            </div>

            <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Gestisci
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}