// 🧾 tracepad.js — Phase Logger & Glyph Trigger
// 📜 Logs shard-phase transitions and updates font weight via glyph-selector

import { getFontWeightByPhase } from './glyph-selector.js';

const tracepad = {
  log: [],
  currentPhase: 'init',

  setPhase(newPhase) {
    this.currentPhase = newPhase;
    this.log.push({
      timestamp: Date.now(),
      phase: newPhase
    });

    // 🌀 Apply font weight ritual
    const weight = getFontWeightByPhase(newPhase);
    document.body.style.fontWeight = weight;

    // 🧙 Optional: emit custom event
    const event = new CustomEvent('phaseChange', { detail: newPhase });
    window.dispatchEvent(event);
  },

  getLog() {
    return this.log;
  },

  getCurrentPhase() {
    return this.currentPhase;
  }
};

export default tracepad;
