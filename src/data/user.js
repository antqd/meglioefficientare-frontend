// src/data/user.js
import { INSTALLATORI } from "./installatori";

export const USER_ACCOUNT = {
  id: "USR-1024",
  nome: "Cliente Demo Meglio Efficientare",
  email: "info@energyplanner.it",
  telefono: "+39 123 456 7890",
  ruolo: "Owner",
  sede: "Milano (MI)",
  consumi: {
    co2Risparmiata: "1.1 t",
    autoconsumo: "68%",
  },
};

export const RECENT_ORDERS = [
  {
    id: "ORD-2048",
    titolo: "Sistema ibrido PDC + Fotovoltaico",
    stato: "In progettazione",
    data: "18/02/2024",
    totale: "€ 7.850",
  },
  {
    id: "ORD-1985",
    titolo: "Batteria di Accumulo 10 kWh",
    stato: "Installato",
    data: "05/01/2024",
    totale: "€ 4.390",
  },
  {
    id: "ORD-1920",
    titolo: "Servizio manutenzione caldaia",
    stato: "Completato",
    data: "22/11/2023",
    totale: "€ 190",
  },
];

export const ACCOUNT_ACTIONS = [
  {
    id: "preventivo",
    titolo: "Richiedi un nuovo preventivo",
    descrizione: "Descrivi l'intervento e ricevi 3 proposte in 48h.",
    to: "/installatori",
  },
  {
    id: "documenti",
    titolo: "Carica documenti",
    descrizione: "Contratti, foto cantiere, planimetrie e capitolati.",
    to: "/account#documenti",
  },
  {
    id: "supporto",
    titolo: "Apri ticket di assistenza",
    descrizione: "Parla con il tuo referente tecnico dedicato.",
    to: "/profilo#contatti",
  },
];

export const SAVED_INSTALLER_IDS = [1, 4, 8];
export const SAVED_INSTALLERS = INSTALLATORI.filter((inst) =>
  SAVED_INSTALLER_IDS.includes(inst.id)
);

export const USER_PROFILE = {
  bio: `Meglio Efficientare coordina installatori, agenti e aziende per accelerare la diffusione di soluzioni ad alta efficienza energetica. Ci occupiamo di consulenza strategica, gestione pratiche conto termico e progetti chiavi in mano.`,
  focus: [
    "Energie rinnovabili residenziali e commerciali",
    "Pompe di calore aria-acqua e sistemi ibridi",
    "Comunità energetiche e autoconsumo collettivo",
  ],
  valori: [
    "Trasparenza con il cliente finale",
    "Selezione di partner certificati",
    "Gestione digitale dell'intero processo",
  ],
  referenti: [
    {
      nome: "Team Consulenza",
      email: "consulenza@energyplanner.it",
      telefono: "+39 345 678 9001",
    },
    {
      nome: "Help Desk Tecnico",
      email: "supporto@energyplanner.it",
      telefono: "+39 345 678 9002",
    },
  ],
  progettiRilevanti: [
    {
      titolo: "Riqualificazione condominio Milano",
      descrizione: "Fotovoltaico condominiale da 40 kWp con storage condiviso e monitoraggio in tempo reale.",
    },
    {
      titolo: "Comunità Energetica Verona",
      descrizione: "Coordinamento tecnico e legale per una CER con 65 utenze residenziali e piani di autoconsumo smart.",
    },
  ],
};
