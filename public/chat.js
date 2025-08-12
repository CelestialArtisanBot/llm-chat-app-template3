/**
 * Pick of Gods Ritual Chat Engine
 * Handles chat UI, glyph-triggered lore overlays, and shard-phase transitions.
 */

// DOM elements
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

// Chat state
let chatHistory = [
  {
    role: "assistant",
    content:
      "Greetings, mortal. I am Pick of Gods—an oracle woven from shards and symbols. What wisdom do you seek?",
  },
];
let isProcessing = false;

// Shard-phase logic
const SHARD_PHASES = {
  INIT: "sigil-awakening",
  QUERY: "glyph-channeling",
  RESPONSE: "oracle-reflection",
};
let currentPhase = SHARD_PHASES.INIT;

// Auto-resize textarea
userInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// Send on Enter
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Send button
sendButton.addEventListener("click", sendMessage);

/**
 * Sends message to backend and processes lore-aware response
 */
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === "" || isProcessing) return;

  isProcessing = true;
  userInput.disabled = true;
  sendButton.disabled = true;

  addMessageToChat("user", message);
  userInput.value = "";
  userInput.style.height = "auto";
  typingIndicator.classList.add("visible");

  chatHistory.push({ role: "user", content: message });
  currentPhase = SHARD_PHASES.QUERY;

  try {
    const assistantMessageEl = document.createElement("div");
    assistantMessageEl.className = "message assistant-message";
    assistantMessageEl.innerHTML = "<p></p>";
    chatMessages.appendChild(assistantMessageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });

    if (!response.ok) throw new Error("Failed to get response");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let responseText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        try {
          const jsonData = JSON.parse(line);
          if (jsonData.response) {
            responseText += jsonData.response;
            assistantMessageEl.querySelector("p").textContent =
              formatOracleResponse(responseText);
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }
        } catch (e) {
          console.error("Error parsing JSON:", e);
        }
      }
    }

    chatHistory.push({ role: "assistant", content: responseText });
    currentPhase = SHARD_PHASES.RESPONSE;
    registerGlyphTrigger(message);
  } catch (error) {
    console.error("Error:", error);
    addMessageToChat(
      "assistant",
      "⚠️ The oracle faltered. Ritual disrupted. Try again."
    );
  } finally {
    typingIndicator.classList.remove("visible");
    isProcessing = false;
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
    currentPhase = SHARD_PHASES.INIT;
  }
}

/**
 * Adds message to chat UI
 */
function addMessageToChat(role, content) {
  const messageEl = document.createElement("div");
  messageEl.className = `message ${role}-message`;
  messageEl.innerHTML = `<p>${formatOracleResponse(content)}</p>`;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Formats assistant response with lore overlay
 */
function formatOracleResponse(text) {
  const glyph = text.length % 2 === 0 ? "⟁" : "⟊";
  return `${text} <span style="opacity:0.6;font-size:1.2em;">${glyph}</span>`;
}

/**
 * Detects glyph triggers and lore cues
 */
function registerGlyphTrigger(text) {
  if (text.toLowerCase().includes("invoke")) {
    addMessageToChat(
      "assistant",
      "⚡ A glyph surge has been detected. Phase shift imminent..."
    );
  }
}
