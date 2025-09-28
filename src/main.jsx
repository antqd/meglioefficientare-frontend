import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import MeglioCompilare from './pages/MeglioCompilare.jsx'
import ContoTermico from './pages/ContoTermico.jsx'
import Ecommerce from './pages/Ecommerce.jsx'
import Installatori from './pages/Installatori.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conto-termico" element={<ContoTermico />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/installatori" element={<Installatori />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Compilazione" element={<MeglioCompilare />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
