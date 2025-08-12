// 📖 lore-loader.js — Dynamic Lore Fragment Display
// 🧙 Fetches and renders lore scrolls based on phase or module

const loreLoader = {
  async load(fragmentName, targetSelector = '#lore-display') {
    const path = `./lore/${fragmentName}.txt`;

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${fragmentName}`);
      const text = await res.text();

      const target = document.querySelector(targetSelector);
      if (target) {
        target.textContent = text;
      } else {
        console.warn(`Target selector ${targetSelector} not found.`);
      }
    } catch (err) {
      console.error(`🛑 Lore Loader Error:`, err);
    }
  }
};

export default loreLoader;
