const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-button');
const messages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

sendBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  input.value = '';
  simulateResponse(text);
});

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}-message`;
  msg.innerHTML = `<p>${text}</p>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function simulateResponse(userText) {
  typingIndicator.classList.add('visible');
  setTimeout(() => {
    typingIndicator.classList.remove('visible');
    appendMessage(`🔮 Echo received: "${userText}"`, 'assistant');
  }, 1000);
}

// Ritual Functions
window.clearChat = () => {
  messages.innerHTML = '';
};

window.shiftPhase = () => {
  const phases = ['sigil-awakening', 'glyph-channeling', 'oracle-reflection'];
  const html =
