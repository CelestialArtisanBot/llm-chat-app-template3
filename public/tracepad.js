/**
 * Tracepad — Ritual Event Logger
 * Logs glyph triggers, shard-phase transitions, and lore overlays.
 */

// Internal ritual log
const traceLog = [];

/**
 * Logs a ritual event to the tracepad
 * @param {Object} event - Ritual event object
 * @param {string} event.phase - Current shard-phase (e.g. "glyph-channeling")
 * @param {string} event.glyph - Glyph symbol (e.g. "⟁")
 * @param {string} event.message - User message that triggered the glyph
 * @param {string} event.overlay - Lore overlay or oracle response
 */
function logRitualEvent({ phase, glyph, message, overlay }) {
  const entry = {
    timestamp: new Date().toISOString(),
    phase,
    glyph,
    message,
    overlay,
  };

  traceLog.push(entry);
  console.log("📜 Tracepad entry:", entry);
}

/**
 * Returns all logged ritual events
 * @returns {Array} Array of ritual event objects
 */
function getTraceLog() {
  return [...traceLog];
}

/**
 * Clears the tracepad log
 */
function clearTraceLog() {
  traceLog.length = 0;
  console.log("🧹 Tracepad cleared.");
}

/**
 * Finds all events by glyph
 * @param {string} glyph - Glyph symbol to filter by
 * @returns {Array} Array of matching ritual events
 */
function findEventsByGlyph(glyph) {
  return traceLog.filter((entry) => entry.glyph === glyph);
}

/**
 * Finds all events by shard-phase
 * @param {string} phase - Shard-phase to filter by
 * @returns {Array} Array of matching ritual events
 */
function findEventsByPhase(phase) {
  return traceLog.filter((entry) => entry.phase === phase);
}

// Export for use in other modules
export {
  logRitualEvent,
  getTraceLog,
  clearTraceLog,
  findEventsByGlyph,
  findEventsByPhase,
};
