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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conto-termico" element={<ContoTermico />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/installatori" element={<Installatori />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compilazione" element={<MeglioCompilare />} />
        <Route path="/installatori-tutti" element={<InstallatoriTuttiPage />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<div style={{ padding: 24 }}>Pagina non trovata</div>}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
