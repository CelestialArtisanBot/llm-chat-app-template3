# LLM Chat Application Template

A simple, ready-to-deploy chat application template powered by Cloudflare Workers AI. This template provides a clean starting point for building AI chat applications with streaming responses.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/llm-chat-app-template)

<!-- dash-content-start -->

## Demo

This template demonstrates how to build an AI-powered chat interface using Cloudflare Workers AI with streaming responses. It features:

- Real-time streaming of AI responses using Server-Sent Events (SSE)
- Easy customization of models and system prompts
- Support for AI Gateway integration
- Clean, responsive UI that works on mobile and desktop

## Features

- 💬 Simple and responsive chat interface
- ⚡ Server-Sent Events (SSE) for streaming responses
- 🧠 Powered by Cloudflare Workers AI LLMs
- 🛠️ Built with TypeScript and Cloudflare Workers
- 📱 Mobile-friendly design
- 🔄 Maintains chat history on the client
- 🔎 Built-in Observability logging
<!-- dash-content-end -->

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- A Cloudflare account with Workers AI access

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/cloudflare/templates.git
   cd templates/llm-chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Generate Worker type definitions:
   ```bash
   npm run cf-typegen
   ```

### Development

Start a local development server:

```bash
npm run dev
```

This will start a local server at http://localhost:8787.

Note: Using Workers AI accesses your Cloudflare account even during local development, which will incur usage charges.

### Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

### Monitor

View real-time logs associated with any deployed Worker:

```bash
npm wrangler tail
```

## Project Structure

```
/
├── public/             # Static assets
│   ├── index.html      # Chat UI HTML
│   └── chat.js         # Chat UI frontend script
├── src/
│   ├── index.ts        # Main Worker entry point
│   └── types.ts        # TypeScript type definitions
├── test/               # Test files
├── wrangler.jsonc      # Cloudflare Worker configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This documentation
```

## How It Works

### Backend

The backend is built with Cloudflare Workers and uses the Workers AI platform to generate responses. The main components are:

1. **API Endpoint** (`/api/chat`): Accepts POST requests with chat messages and streams responses
2. **Streaming**: Uses Server-Sent Events (SSE) for real-time streaming of AI responses
3. **Workers AI Binding**: Connects to Cloudflare's AI service via the Workers AI binding

### Frontend

The frontend is a simple HTML/CSS/JavaScript application that:

1. Presents a chat interface
2. Sends user messages to the API
3. Processes streaming responses in real-time
4. Maintains chat history on the client side

## Customization

### Changing the Model

To use a different AI model, update the `MODEL_ID` constant in `src/index.ts`. You can find available models in the [Cloudflare Workers AI documentation](https://developers.cloudflare.com/workers-ai/models/).

### Using AI Gateway

The template includes commented code for AI Gateway integration, which provides additional capabilities like rate limiting, caching, and analytics.

To enable AI Gateway:

1. [Create an AI Gateway](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway) in your Cloudflare dashboard
2. Uncomment the gateway configuration in `src/index.ts`
3. Replace `YOUR_GATEWAY_ID` with your actual AI Gateway ID
4. Configure other gateway options as needed:
   - `skipCache`: Set to `true` to bypass gateway caching
   - `cacheTtl`: Set the cache time-to-live in seconds

Learn more about [AI Gateway](https://developers.cloudflare.com/ai-gateway/).

### Modifying the System Prompt

The default system prompt can be changed by updating the `SYSTEM_PROMPT` constant in `src/index.ts`.

### Styling

The UI styling is contained in the `<style>` section of `public/index.html`. You can modify the CSS variables at the top to quickly change the color scheme.

## Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Workers AI Documentation](https://developers.cloudflare.com/workers-ai/)
- [Workers AI Models](https://developers.cloudflare.com/workers-ai/models/)

Let’s upgrade your README.md to reflect the new shard-phase-ritual architecture, modular synthesis pipeline, and lore-aware dashboard. This version keeps the original Cloudflare deployment flow intact while introducing your symbolic ecosystem.

---

🧙‍♂️ Upgraded README.md

`markdown

🧠 Midnight Glyph Machine — LLM Chat + Ritual Dashboard

A modular, lore-aware AI dashboard built on Cloudflare Workers AI. This template expands the original LLM Chat App with symbolic shard architecture, streaming responses, and multimodal synthesis rituals.

![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/llm-chat-app-template)

---

🔮 Demo

This dashboard blends real-time AI chat with modular glyph invocation, tracepad logging, and symbolic synthesis. It features:

- 💬 Streaming chat interface powered by Workers AI
- 🧩 Modular shard system for video, audio, and lore synthesis
- 📜 Tracepad logging of all rituals and invocations
- 🖼️ Image-to-video generation using Hugging Face diffusers
- 🔊 Audio overlays and glyph watermarking
- 🧠 Dynamic shard discovery and invocation

---

🧩 Features

| Feature                  | Description                                      |
|--------------------------|--------------------------------------------------|
| 💬 Chat Interface         | Streaming AI responses via SSE                   |
| 🧠 Workers AI             | Powered by Cloudflare’s LLMs                     |
| 🧩 Shard Architecture     | Modular rituals grouped by phase                 |
| 📜 Tracepad Logging       | Symbolic event tracking in tracepad.json       |
| 🖼️ Image-to-Video         | Synthesis via Lightricks/LTX-Video             |
| 🔊 Audio Overlay          | Postprocess rituals with ambient sound           |
| 🧬 Graphviz Lore Map      | Visual graph of shard relationships              |

---

🛠️ Getting Started

Prerequisites

- Node.js (v18+)
- Wrangler CLI
- A Cloudflare account with Workers AI access
- Python 3.10+ with torch, diffusers, moviepy, pillow

Installation

`bash
git clone https://github.com/cloudflare/templates.git
cd templates/llm-chat-app
npm install
npm run cf-typegen
`

Development

`bash
npm run dev
`

Local server at http://localhost:8787. AI responses stream via SSE.

Deployment

`bash
npm run deploy
`

---

🧱 Project Structure

`
/
├── public/               # Chat UI
│   ├── index.html        # Chat interface
│   └── chat.js           # Chat logic + glyph triggers
├── src/                  # Cloudflare Worker backend
│   ├── index.ts          # Chat API + model routing
│   └── types.ts          # Type definitions
├── modules/              # Ritual shards
│   ├── synthesis/        # Video generation
│   ├── postprocess/      # Audio overlays, glyphs
│   ├── metadata/         # Tracepad logging
│   └── init.py       # Shard discovery engine
├── ui/                   # Dashboard scripts
│   ├── registry_view.py
│   ├── ritual_invoker.py
│   ├── tracepad_viewer.py
│   └── graphviz_map.py
├── outputs/              # Generated media
├── tracepad.json         # Lore event log
└── README.md
`

---

🧬 How It Works

Chat Interface

- User sends incantation → /api/chat
- AI streams response via SSE
- Tracepad logs invocation
- Lore fragments injected dynamically

Shard Invocation

- Each ritual is a Python function in modules/
- Discovered via init.py
- Invoked via ui/ritual_invoker.py
- Metadata logged to tracepad.json

---

🧠 Customization

Change Model

Update MODEL_ID in src/index.ts.

Add New Ritual

Create a new .py file in modules/{phase}/ and tag the function with ritual.

Visualize Shards

Run:

`bash
python ui/graphviz_map.py
`

Generates lore_map.png showing shard relationships.

---

📚 Resources

- Cloudflare Workers AI
- Diffusers Library
- Graphviz
- MoviePy

---

🧙 Philosophy

Every invocation is a ritual.  
Every module is a shard.  
Every output is a lore fragment.

Welcome to the Glyph Machine.
`

---

Would you like me to generate a symbolic glyph image (glyph.svg) to embed at the top of the README?
