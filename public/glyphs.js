/**
 * Glyph Registry — Pick of Gods
 * Manages symbolic glyphs, lore triggers, and overlays.
 */

// Core glyph definitions
const GlyphRegistry = {
  "⟁": {
    name: "Sigil of Channeling",
    meaning: "Initiates a ritual of focused invocation.",
    overlay: "🔮 The Sigil of Channeling glows. A focused invocation begins...",
  },
  "⟊": {
    name: "Sigil of Reflection",
    meaning: "Marks the end of a ritual and the beginning of interpretation.",
    overlay: "🪞 The Sigil of Reflection pulses. Interpret the oracle’s wisdom...",
  },
  "⧉": {
    name: "Sigil of Duality",
    meaning: "Represents mirrored truths or paradoxical insight.",
    overlay: "⚖️ The Sigil of Duality emerges. Truth splits and reforms...",
  },
  "⟡": {
    name: "Sigil of Emergence",
    meaning: "Signals a new shard forming in the lore ecosystem.",
    overlay: "🌱 A new shard sprouts. The lore expands...",
  },
  "⟁⟊": {
    name: "Sigil of Convergence",
    meaning: "Combines invocation and reflection into a unified glyph.",
    overlay: "🌌 The Sigil of Convergence spirals. Invocation and reflection merge...",
  },
};

/**
 * Detects glyphs in a message and returns lore overlays
 * @param {string} message - User message
 * @returns {string[]} Array of lore overlays
 */
function detectGlyphs(message) {
  const overlays = [];

  for (const glyph in GlyphRegistry) {
    if (message.includes(glyph)) {
      overlays.push(GlyphRegistry[glyph].overlay);
    }
  }

  return overlays;
}

/**
 * Returns glyph metadata for UI or tracepad
 * @param {string} glyph - Glyph symbol
 * @returns {Object|null} Glyph metadata or null
 */
function getGlyphInfo(glyph) {
  return GlyphRegistry[glyph] || null;
}

/**
 * Returns all registered glyphs
 * @returns {string[]} Array of glyph symbols
 */
function getAllGlyphs() {
  return Object.keys(GlyphRegistry);
}

// Export for use in other modules
export { detectGlyphs, getGlyphInfo, getAllGlyphs };
