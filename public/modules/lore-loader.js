export default {
  load(fragmentId, targetSelector) {
    const target = document.querySelector(targetSelector);
    target.textContent = `📖 Injected lore fragment: ${fragmentId}`;
  },
  autoInject(content) {
    if (content.includes("ritual")) {
      this.load("ritual-response", "#lore-text");
    }
  }
};
