export interface Env {
  AI: Ai;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GlyphRequest {
  messages: ChatMessage[];
  phase?: Phase;
  lore?: string;
  shard?: string;
}

export type Phase = "init" | "charge" | "surge" | "echo" | "collapse";
