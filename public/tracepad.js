const TRACEPAD_KEY = 'midnight-tracepad';
const traceLog = loadTracepad();

/**
 * Logs a ritual event to the tracepad
 * @param {Object} event - Ritual event object
 * @param {string} event.phase
 * @param {string} event.glyph
 * @param {string} event.message
 * @param {string} event.overlay
 * @param {Object} [event.meta]
 */
function logRitualEvent({ phase, glyph, message, overlay, meta = {} }) {
  const entry = {
    timestamp: new Date().toISOString(),
    phase,
    glyph,
    message,
    overlay,
    ...meta,
  };

  traceLog.push(entry);
  saveTracepad();
  console.log('📜 Tracepad entry:', entry);
}

/**
 * Returns all logged ritual events
 * @returns {Array}
 */
function getTraceLog() {
  return [...traceLog];
}

/**
 * Clears the tracepad log
 */
function clearTraceLog() {
  traceLog.length = 0;
  saveTracepad();
  console.log('🧹 Tracepad cleared.');
}

/**
 * Finds all events by glyph
 * @param {string} glyph
 * @returns {Array}
 */
function findEventsByGlyph(glyph) {
  return traceLog.filter((entry) => entry.glyph === glyph);
}

/**
 * Finds all events by shard-phase
 * @param {string} phase
 * @returns {Array}
 */
function findEventsByPhase(phase) {
  return traceLog.filter((entry) => entry.phase === phase);
}

/**
 * Saves tracepad to localStorage
 */
function saveTracepad() {
  localStorage.setItem(TRACEPAD_KEY, JSON.stringify(traceLog));
}

/**
 * Loads tracepad from localStorage
 * @returns {Array}
 */
function loadTracepad() {
  const stored = localStorage.getItem(TRACEPAD_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Exports tracepad as downloadable JSON
 */
function exportTracepad() {
  const blob = new Blob([JSON.stringify(traceLog, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tracepad.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Optional: enrich entries with symbolic meaning
export const glyphRegistry = {
  '🜁': { name: 'Air', phase: 'streaming', meaning: 'Breath of invocation' },
  '🜂': { name: 'Fire', phase: 'activation', meaning: 'Spark of response' },
  '🜃': { name: 'Earth', phase: 'logging', meaning: 'Foundation of memory' },
  '🜄': { name: 'Water', phase: 'flow', meaning: 'Emotion and UI flow' },
};

export {
  logRitualEvent,
  getTraceLog,
  clearTraceLog,
  findEventsByGlyph,
  findEventsByPhase,
  exportTracepad,
};
