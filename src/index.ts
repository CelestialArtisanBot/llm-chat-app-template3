import { Env, ChatMessage, GlyphRequest } from "./types";

const MODEL_ID = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

const BASE_PROMPT = `You are a glyph interpreter inside the Midnight Glyph Machine.
Respond with symbolic clarity, modular logic, and shard-aware insight.
Use concise, ritualistic phrasing.`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    if (url.pathname === "/api/chat" && request.method === "POST") {
      return handleGlyphRequest(request, env);
    }

    if (url.pathname === "/api/image" && request.method === "POST") {
      return handleImageRequest(request);
    }

    return new Response("Not found", { status: 404 });
  },
};

async function handleGlyphRequest(request: Request, env: Env): Promise<Response> {
  try {
    const { messages = [], phase = "init", lore = "" } = (await request.json()) as GlyphRequest;

    const layeredPrompt = [
      BASE_PROMPT,
      `Current Phase: ${phase}`,
      lore ? `Lore Fragment: ${lore}` : "",
    ].join("\n\n");

    if (!messages.some((msg) => msg.role === "system")) {
      messages.unshift({ role: "system", content: layeredPrompt });
    }

    const response = await env.AI.run(
      MODEL_ID,
      { messages, max_tokens: 1024 },
      { returnRawResponse: true },
    );

    return response;
  } catch (error) {
    console.error("Glyph Interpreter Error:", error);
    return new Response(JSON.stringify({ error: "Failed to invoke glyph" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

async function handleImageRequest(request: Request): Promise<Response> {
  try {
    const { prompt } = await request.json();
    const imageUrl = `https://placehold.co/600x400?text=${encodeURIComponent(prompt)}`;
    return new Response(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  }
