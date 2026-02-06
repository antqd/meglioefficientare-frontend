// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Pagine
import App from "./App.jsx";
import MeglioCompilare from "./pages/MeglioCompilare.jsx";
import ContoTermico from "./pages/ContoTermico.jsx";
import Ecommerce from "./pages/Ecommerce.jsx";
import Installatori from "./pages/Installatori.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import InstallatoriTuttiPage from "./pages/InstallatoriTutti.jsx";
import InstallatoreDettaglioPage from "./pages/InstallatoreDettaglio.jsx";
import CarrelloPage from "./pages/Carrello.jsx";
import AccountPage from "./pages/Account.jsx";
import ProfiloPage from "./pages/Profilo.jsx";
import ThankYouPage from "./pages/ThankYou.jsx";
import MetaPixel from "./components/MetaPixel.jsx";
import CompilerElencoInterventiCT3 from "./pages/CompilerElenco.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MetaPixel />
      <Routes>
        <Route path="/" element={<ContoTermico />} />
        <Route path="/home" element={<App />} />
        <Route path="/conto-termico" element={<ContoTermico />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/installatori" element={<Installatori />} />
        <Route
          path="/installatori/:id"
          element={<InstallatoreDettaglioPage />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compilazione" element={<MeglioCompilare />} />
        <Route path="/installatori-tutti" element={<InstallatoriTuttiPage />} />
        <Route path="/carrello" element={<CarrelloPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/profilo" element={<ProfiloPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/compiler-elenco" element={<CompilerElencoInterventiCT3 />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<div style={{ padding: 24 }}>Pagina non trovata</div>}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
