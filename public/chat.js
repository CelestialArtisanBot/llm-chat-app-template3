// 🧠 chat.js — Ritual Console Controller
import tracepad from './modules/tracepad.js';
import loreLoader from './modules/lore-loader.js';

const phaseLabel = document.getElementById('phase-label');
const tracepadLog = document.getElementById('tracepad-log');
const loreText = document.getElementById('lore-text');
const chatLog = document.getElementById('chat-log');

window.toggleTab = function (tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(`${tabId}-tab`).classList.add('active');
};

window.invokeGlyph = function (phase) {
  tracepad.setPhase(phase);
  phaseLabel.textContent = phase;

  const entry = document.createElement('div');
  entry.className = 'trace-entry';
  entry.textContent = `🔮 Phase invoked: ${phase} @ ${new Date().toLocaleTimeString()}`;
  tracepadLog.appendChild(entry);
};

window.submitIncantation = function () {
  const input = document.getElementById('chat-input');
  const spell = input.value.trim();
  if (!spell) return;

  const msg = document.createElement('div');
  msg.className = 'chat-msg';
  msg.textContent = `🗣️ "${spell}"`;
  chatLog.appendChild(msg);

  const trace = document.createElement('div');
  trace.className = 'trace-entry';
  trace.textContent = `🗣️ Incantation: "${spell}" @ ${new Date().toLocaleTimeString()}`;
  tracepadLog.appendChild(trace);

  loreText.textContent = `🔍 Searching lore for: "${spell}"...`;
  loreLoader.load(spell, '#lore-text');

  input.value = '';
};

window.clearTracepad = function () {
  tracepadLog.innerHTML = '';
  loreText.textContent = '';
  phaseLabel.textContent = 'init';
  tracepad.setPhase('init');
};
