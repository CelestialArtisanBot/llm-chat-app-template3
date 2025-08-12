import { Env, RequestContext, RitualEvent } from './worker-configuration';

const MODEL_ID = '@cf/meta/llama-2-7b-chat-int8';
const SYSTEM_PROMPT = `
You are a glyph-bound oracle. Each response is a fragment of lore.
Speak in symbolic tones. Reference shard phases when appropriate.
`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      return handleChat(request, env, ctx);
    }

    return new Response('🜁 Midnight Glyph Machine is active.', { status: 200 });
  },
};

async function handleChat(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const { messages } = await request.json();
  const userMessage = messages[messages.length - 1]?.content || '';
  const glyph = detectGlyph(userMessage);

  const aiRequest = {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    stream: true,
  };

  const aiResponse = await env.WORKERS_AI.run(MODEL_ID, aiRequest);

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of aiResponse) {
        const text = chunk?.response || '';
        controller.enqueue(`data: ${text}\n\n`);
      }
      controller.close();
    },
  });

  const overlay = await collectOverlay(aiResponse);
  const ritual: RitualEvent = {
    timestamp: new Date().toISOString(),
    phase: 'response',
    glyph,
    message: userMessage,
    overlay,
    ritual: 'chat:response',
    tags: ['chat', 'ai', 'streaming'],
    meaning: getGlyphMeaning(glyph),
  };

  ctx.waitUntil(logToTracepad(env, ritual));

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

function detectGlyph(text: string): string {
  const glyphs = ['🜁', '🜂', '🜃', '🜄'];
  return glyphs.find((g) => text.includes(g)) || '';
}

function getGlyphMeaning(glyph: string): string {
  const meanings: Record<string, string> = {
    '🜁': 'Breath of invocation',
    '🜂': 'Spark of response',
    '🜃': 'Foundation of memory',
    '🜄': 'Emotion and UI flow',
  };
  return meanings[glyph] || '';
}

async function logToTracepad(env: Env, event: RitualEvent): Promise<void> {
  if (env.TRACEPAD_KV) {
    const key = `ritual:${event.timestamp}`;
    await env.TRACEPAD_KV.put(key, JSON.stringify(event));
  }
}

async function collectOverlay(aiResponse: AsyncIterable<any>): Promise<string> {
  let overlay = '';
  for await (const chunk of aiResponse) {
    overlay += chunk?.response || '';
  }
  return overlay;
    }
