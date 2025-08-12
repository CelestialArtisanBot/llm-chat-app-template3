/**
 * Type definitions for the Midnight Glyph Machine.
 * Modular, lore-aware, and shard-reactive.
 */

export interface Env {
  /**
   * Binding for the Workers AI API.
   */
  AI: Ai;

  /**
   * Binding for static assets.
   */
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

/**
 * Represents a chat message.
 */
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Represents a glyph invocation request.
 */
export interface GlyphRequest {
  messages: ChatMessage[];
  phase?: Phase;
  lore?: string;
  shard?: string;
}

/**
 * Represents a lore fragment injected into the prompt.
 */
export interface LoreFragment {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  source?: string;
}

/**
 * Represents a tracepad event.
 */
export interface TraceEvent {
  timestamp: string;
  phase: Phase;
  action: string;
  shard?: string;
  incantation?: string;
}

/**
 * Ritual phases of the glyph machine.
 */
export type Phase = "init" | "charge" | "surge" | "echo" | "collapse";
