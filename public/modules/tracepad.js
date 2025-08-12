// 📜 tracepad.js — Ritual phase tracker and incantation logger

let currentPhase = "init";
const tracepadLog = document.getElementById("tracepad-log");

const tracepad = {
  /**
   * Set the current ritual phase
   * @param {string} phase
   */
  setPhase(phase) {
    currentPhase = phase;
    tracepad.logEvent(`🔮 Phase set to "${phase}"`);
  },

  /**
   * Get the current ritual phase
   * @returns {string}
   */
  getPhase() {
    return currentPhase;
  },

  /**
   * Log a user incantation with timestamp and phase
   * @param {string} spell
   */
  logIncantation(spell) {
    const entry = document.createElement("div");
    entry.className = "trace-entry";
    entry.textContent = `🗣️ Incantation: "${spell}" @ ${new Date().toLocaleTimeString()} [${currentPhase}]`;
    tracepadLog.appendChild(entry);
  },

  /**
   * Log a generic tracepad event
   * @param {string} message
   */
  logEvent(message) {
    const entry = document.createElement("div");
    entry.className = "trace-entry";
    entry.textContent = `${message} @ ${new Date().toLocaleTimeString()} [${currentPhase}]`;
    tracepadLog.appendChild(entry);
  },

  /**
   * Clear the tracepad log and reset phase
   */
  clear() {
    tracepadLog.innerHTML = "";
    currentPhase = "init";
    tracepad.logEvent("🧹 Tracepad cleared");
  },
};

export default tracepad;
