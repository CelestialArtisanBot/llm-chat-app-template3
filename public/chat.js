import {
  logRitualEvent,
  getTraceLog,
  findEventsByGlyph,
  findEventsByPhase,
} from './tracepad.js'; // Optional: if modularized

const chatLog = document.getElementById('chat-log');
const inputForm = document.getElementById('input-form');
const userInput = document.getElementById('user-input');

inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  renderMessage(message, 'user');
  userInput.value = '';

  const glyph = detectGlyph(message);
  logRitualEvent({
    phase: 'invocation',
    glyph,
    message,
    overlay: 'User incantation submitted',
    meta: {
      ritual: 'chat:invoke',
      tags: ['chat', 'user', 'invocation'],
    },
  });

  await streamAIResponse(message, glyph);
});

function renderMessage(text, sender, glyph = null) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.textContent = text;
  if (glyph) msg.dataset.glyph = glyph;
  if (sender === 'ai') msg.style.borderLeftColor = '#00ffff';
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function detectGlyph(text) {
  const glyphs = ['🜁', '🜂', '🜃', '🜄'];
  return glyphs.find((g) => text.includes(g)) || null;
}

async function streamAIResponse(userMessage, glyph) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let aiMessage = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    aiMessage += chunk;
    renderMessage(chunk, 'ai', glyph);
  }

  logRitualEvent({
    phase: 'response',
    glyph,
    message: userMessage,
    overlay: aiMessage,
    meta: {
      ritual: 'chat:response',
      tags: ['chat', 'ai', 'streaming'],
    },
  });
}
