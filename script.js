const LEVELS = [
  "Polvere", "Sabbia", "Legno", "Pietra", "Bronzo",
  "Ferro", "Acciaio", "Cristallo", "Oro", "Diamante"
];

let state = {
  xp: 0,
  level: 1,
  energy: 100,
  lastDate: new Date().toDateString()
};

const actionsPerRoom = {
  studio: [
    { name: "Leggere un libro", xp: 10, energy: 5 },
    { name: "Fare un riassunto", xp: 12, energy: 7 },
    { name: "Scrivere appunti", xp: 8, energy: 4 },
    { name: "Ascoltare podcast", xp: 6, energy: 3 },
    { name: "Studiare una lingua", xp: 14, energy: 10 },
    { name: "Guardare documentario", xp: 9, energy: 6 },
    { name: "Ripetere a voce alta", xp: 10, energy: 5 },
    { name: "Creare mappe mentali", xp: 11, energy: 6 },
    { name: "Fai quiz", xp: 13, energy: 7 },
    { name: "Riscrivi concetti", xp: 9, energy: 5 },
    { name: "Ascolta audiolibro", xp: 7, energy: 4 },
    { name: "Parla con un tutor", xp: 12, energy: 8 },
    { name: "Prendi appunti digitali", xp: 8, energy: 4 },
    { name: "Rivedi gli errori", xp: 10, energy: 5 },
    { name: "Medita per concentrazione", xp: 5, energy: -10 }
  ],
  lavoro: [
    { name: "Completa una task", xp: 15, energy: 8 },
    { name: "Organizza il lavoro", xp: 10, energy: 5 },
    { name: "Scrivi email", xp: 6, energy: 3 },
    { name: "Chiamata con collega", xp: 8, energy: 5 },
    { name: "Analisi dati", xp: 12, energy: 7 },
    { name: "Pianifica settimana", xp: 11, energy: 5 },
    { name: "Controlla risultati", xp: 9, energy: 6 },
    { name: "Meeting virtuale", xp: 10, energy: 7 },
    { name: "Progetta qualcosa", xp: 14, energy: 9 },
    { name: "Aggiorna documenti", xp: 7, energy: 4 },
    { name: "Automatizza un compito", xp: 13, energy: 8 },
    { name: "Pausa caffè", xp: 0, energy: +15 },
    { name: "Formazione online", xp: 10, energy: 6 },
    { name: "Feedback al team", xp: 6, energy: 4 },
    { name: "Rivedi le priorità", xp: 5, energy: 2 }
  ],
  casa: [
    { name: "Passa l'aspirapolvere", xp: 8, energy: 6 },
    { name: "Spolvera i mobili", xp: 6, energy: 4 },
    { name: "Lava i piatti", xp: 10, energy: 5 },
    { name: "Rifai il letto", xp: 4, energy: 2 },
    { name: "Organizza la stanza", xp: 12, energy: 7 },
    { name: "Butta la spazzatura", xp: 5, energy: 3 },
    { name: "Pulisci il bagno", xp: 14, energy: 9 },
    { name: "Sistema armadio", xp: 9, energy: 6 },
    { name: "Fai lavatrice", xp: 6, energy: 3 },
    { name: "Stendi i panni", xp: 5, energy: 3 },
    { name: "Riordina scrivania", xp: 7, energy: 4 },
    { name: "Lava pavimenti", xp: 11, energy: 8 },
    { name: "Cucina un piatto", xp: 13, energy: 9 },
    { name: "Riposa sul divano", xp: 0, energy: +20 },
    { name: "Profuma l’ambiente", xp: 3, energy: 1 }
  ],
  creativita: [
    { name: "Disegna un paesaggio", xp: 12, energy: 7 },
    { name: "Colora un disegno", xp: 8, energy: 4 },
    { name: "Fai arte digitale", xp: 14, energy: 8 },
    { name: "Disegna fumetto", xp: 10, energy: 6 },
    { name: "Sperimenta colori", xp: 11, energy: 6 },
    { name: "Disegna con musica", xp: 9, energy: 5 },
    { name: "Disegna a memoria", xp: 13, energy: 7 },
    { name: "Progetta logo", xp: 15, energy: 9 },
    { name: "Disegna emozione", xp: 10, energy: 6 },
    { name: "Sketch veloce", xp: 6, energy: 3 },
    { name: "Guarda arte altrui", xp: 4, energy: 1 },
    { name: "Disegna ogni giorno", xp: 8, energy: 5 },
    { name: "Condividi disegno", xp: 7, energy: 4 },
    { name: "Disegna in relax", xp: 0, energy: +15 },
    { name: "Disegna con occhi chiusi", xp: 5, energy: 2 }
  ],
  apprendimento: [
    { name: "Leggi articolo tecnico", xp: 12, energy: 6 },
    { name: "Segui tutorial", xp: 13, energy: 7 },
    { name: "Impara da YouTube", xp: 10, energy: 5 },
    { name: "Esercizio pratico", xp: 14, energy: 8 },
    { name: "Fai un test", xp: 11, energy: 6 },
    { name: "Studia teoria", xp: 9, energy: 5 },
    { name: "Pratica nuova skill", xp: 15, energy: 9 },
    { name: "Condividi conoscenze", xp: 7, energy: 4 },
    { name: "Aggiorna CV", xp: 6, energy: 3 },
    { name: "Pausa di riflessione", xp: 0, energy: +20 },
    { name: "Leggi blog", xp: 4, energy: 2 },
    { name: "Ascolta intervista", xp: 5, energy: 3 },
    { name: "Leggi biografia", xp: 8, energy: 4 },
    { name: "Crea progetto", xp: 12, energy: 8 },
    { name: "Condividi idea", xp: 6, energy: 4 }
  ],
  finanze: [
    { name: "Segna una spesa", xp: 6, energy: 2 },
    { name: "Controlla estratto conto", xp: 5, energy: 2 },
    { name: "Aggiorna budget", xp: 8, energy: 3 },
    { name: "Segna un'entrata", xp: 7, energy: 2 },
    { name: "Risparmia oggi", xp: 10, energy: 4 },
    { name: "Leggi su investimenti", xp: 9, energy: 5 },
    { name: "Fai piani futuri", xp: 11, energy: 6 },
    { name: "Controlla abbonamenti", xp: 6, energy: 2 },
    { name: "Valuta spese mensili", xp: 7, energy: 3 },
    { name: "Organizza ricevute", xp: 5, energy: 2 },
    { name: "Obiettivo risparmio", xp: 12, energy: 6 },
    { name: "Piccolo investimento", xp: 15, energy: 9 },
    { name: "Studia economia", xp: 10, energy: 6 },
    { name: "Crea grafico entrate/uscite", xp: 8, energy: 4 },
    { name: "Caffè e relax", xp: 0, energy: +15 }
  ]
};

function openActions(room) {
  const list = document.getElementById("actions-list");
  list.innerHTML = "";
  document.getElementById("room-title").textContent = room.charAt(0).toUpperCase() + room.slice(1);

  actionsPerRoom[room].forEach(action => {
    const item = document.createElement("li");
    item.innerHTML = `${action.name} <span>${action.xp}xp / ${action.energy >= 0 ? '-' : '+'}${Math.abs(action.energy)}⚡</span>`;
    item.onclick = () => performAction(action);
    list.appendChild(item);
  });

  document.getElementById("actions-panel").classList.remove("hidden");
}

function performAction(action) {
  state.xp += action.xp;
  state.energy += action.energy;
  if (state.energy > 100) state.energy = 100;
  if (state.energy < 0) state.energy = 0;
  updateLevel();
  saveState();
  updateDisplay();
}

function updateLevel() {
  const nextLevelXP = state.level * 100;
  while (state.xp >= nextLevelXP) {
    state.xp -= nextLevelXP;
    state.level += 1;
  }
}

function updateDisplay() {
  const material = LEVELS[Math.min(Math.floor(state.level / 10), LEVELS.length - 1)];
  document.getElementById("level-name").textContent = `Livello ${state.level} - ${material}`;
  document.getElementById("xp-progress").textContent = `XP: ${state.xp} / ${state.level * 100}`;
  document.getElementById("energy").textContent = `Energia: ${state.energy}%`;
}

function closeActions() {
  document.getElementById("actions-panel").classList.add("hidden");
}

function closePopup() {
  document.getElementById("info-popup").classList.add("hidden");
}

function openPopup() {
  document.getElementById("info-popup").classList.remove("hidden");
}

function saveState() {
  localStorage.setItem("vitaGame", JSON.stringify(state));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem("vitaGame"));
  if (saved) state = saved;
}

function checkDayReset() {
  const today = new Date().toDateString();
  if (state.lastDate !== today) {
    state.lastDate = today;
    state.energy = 100;
    saveState();
  }
}

document.querySelectorAll(".room").forEach(room => {
  room.addEventListener("click", () => openActions(room.dataset.room));
});

document.getElementById("info-button").addEventListener("click", openPopup);

loadState();
checkDayReset();
updateDisplay();
