// 🧮 glyph-selector.js — Font Weight Mapper
// 📜 Each font weight channels a phase of glyph energy.
// init → Regular → Glyph Base
// charge → Medium → Charge Pulse
// surge → Bold → Overdrive Glyph

export function getFontWeightByPhase(phase) {
  switch (phase) {
    case 'init':   return 400; // 🪐 Glyph Base
    case 'charge': return 500; // ⚡ Charge Pulse
    case 'surge':  return 700; // 🔥 Overdrive Glyph
    default:       return 400; // 🧩 Fallback to stability
  }
}
