import tracepad from './modules/tracepad.js';
import loreLoader from './modules/lore-loader.js';
import imageGen from './modules/image-gen.js';

const chatLog = document.getElementById('chat-log');
const loreText = document.getElementById('lore-text');
const tracepadLog = document.getElementById('tracepad-log');

function logUserMessage(content) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg user';
  msg.textContent = `🗣️ ${content}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function updateAIMessage(content) {
  let aiMsg = document.querySelector('.chat-msg.ai:last-of-type');
  if (!aiMsg || aiMsg.dataset.locked === "true") {
    aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg ai';
    chatLog.appendChild(aiMsg);
  }
  aiMsg.textContent = `🤖 ${content}`;
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getLastUserMessage() {
  const msgs = document.querySelectorAll('.chat-msg.user');
  return msgs.length ? msgs[msgs.length - 1].textContent.replace("🗣️ ", "") : "";
}

window.submitIncantation = async function () {
  const input = document.getElementById('chat-input');
  const spell = input.value.trim();
  if (!spell) return;

  logUserMessage(spell);
  input.value = '';

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: spell }],
      phase: tracepad.getPhase(),
    }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let aiMessage = "";

  while (reader) {
    const { value, done } = await reader.read();
    if (done) break;
    aiMessage += decoder.decode(value);
    updateAIMessage(aiMessage);
  }

  tracepad.logIncantation(spell);
  loreLoader.autoInject(aiMessage);
};

window.invokeGlyph = function (phase) {
  tracepad.setPhase(phase);
  tracepad.logEvent(`🔮 Phase override: ${phase}`);
};

window.toggleTracepad = function () {
  tracepadLog.parentElement.classList.toggle('hidden');
};

window.injectLore = function () {
  loreLoader.load("manual-fragment", "#lore-text");
};

window.triggerImageGen = function () {
  const prompt = getLastUserMessage();
  if (!prompt) return;
  imageGen.generate(prompt);
};
