const imageGen = {
  async generate(prompt) {
    const chatLog = document.getElementById("chat-log");
    const msg = document.createElement("div");
    msg.className = "chat-msg ai";
    msg.textContent = `🖼️ Generating image for: "${prompt}"...`;
    chatLog.appendChild(msg);

    const res = await fetch("/api/image", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const { url } = await res.json();

    const img = document.createElement("img");
    img.src = url;
    img.alt = prompt;
    img.style.maxWidth = "100%";
    img.style.marginTop = "0.5em";
    msg.appendChild(img);
  },
};

export default imageGen;
