// 🕹️ chat.js — Glyph Console Controller
import tracepad from './modules/tracepad.js';
import loreLoader from './modules/lore-loader.js';

const phaseLabel = document.getElementById('phase-label');
const tracepadLog = document.getElementById('tracepad-log');
const loreText = document.getElementById('lore-text');

window.invokeGlyph = function (phase) {
  tracepad.setPhase(phase);
  phaseLabel.textContent = phase;

  const entry = document.createElement('div');
  entry.className = 'trace-entry';
  entry.textContent = `🔮 Phase invoked: ${phase} @ ${new Date().toLocaleTimeString()}`;
  tracepadLog.appendChild(entry);

  loreLoader.load('tracepad-echoes', '#lore-text');
};

window.clearTracepad = function () {
  tracepadLog.innerHTML = '';
  loreText.textContent = '';
  phaseLabel.textContent = 'init';
  tracepad.setPhase('init');
};
