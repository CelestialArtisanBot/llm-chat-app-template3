/**
 * Midnight Glyph Machine — Ritual Interpreter
 *
 * A modular glyph interpreter using Cloudflare Workers AI.
 * Supports lore-aware prompts, phase logic, and streaming responses via SSE.
 *
 * @license MIT
 */
import { Env, ChatMessage } from "./types";

const MODEL_ID = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

// 🧠 Base system prompt (can be layered with phase/lore)
const BASE_PROMPT = `You are a glyph interpreter inside the Midnight Glyph Machine.
Respond with symbolic clarity, modular logic, and shard-aware insight.
Use concise, ritualistic phrasing.`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Serve frontend assets
    if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // Chat API route
    if (url.pathname === "/api/chat") {
      if (request.method === "POST") {
        return handleGlyphRequest(request, env);
      }
      return new Response("Method not allowed", { status: 405 });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

/**
 * Handles glyph chat requests
 */
async function handleGlyphRequest(request: Request, env: Env): Promise<Response> {
  try {
    const { messages = [], phase = "init", lore = "" } = (await request.json()) as {
      messages: ChatMessage[];
      phase?: string;
      lore?: string;
    };

    // 🧩 Construct layered system prompt
    const layeredPrompt = [
      BASE_PROMPT,
      `Current Phase: ${phase}`,
      lore ? `Lore Fragment: ${lore}` : "",
    ].join("\n\n");

    // Inject system prompt if missing
    if (!messages.some((msg) => msg.role === "system")) {
      messages.unshift({ role: "system", content: layeredPrompt });
    }

    const response = await env.AI.run(
      MODEL_ID,
      {
        messages,
        max_tokens: 1024,
      },
      {
        returnRawResponse: true,
      },
    );

    return response;
  } catch (error) {
    console.error("Glyph Interpreter Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to invoke glyph" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
