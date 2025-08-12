/// <reference types="@cloudflare/workers-types" />

// 🧠 AI Model Configuration
export interface ModelConfig {
  modelId: string;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
}

// 📜 Ritual Event Structure
export interface RitualEvent {
  timestamp: string;
  phase: string;
  glyph: string;
  message: string;
  overlay: string;
  ritual?: string;
  tags?: string[];
  meaning?: string;
}

// 🧩 Shard Invocation Request
export interface ShardRequest {
  shardId: string;
  phase: string;
  input: string;
  glyph?: string;
  metadata?: Record<string, any>;
}

// 🧬 Shard Invocation Response
export interface ShardResponse {
  success: boolean;
  output: string;
  glyph?: string;
  trace?: RitualEvent;
}

// ⚡ SSE Streaming Response
export interface StreamChunk {
  content: string;
  done: boolean;
}

// 🛠️ Worker Environment Bindings
export interface Env {
  WORKERS_AI: any;
  AI_GATEWAY?: string;
  TRACEPAD_KV?: KVNamespace;
  GLYPH_REGISTRY?: KVNamespace;
}

// 🔮 Extended Request Context
export interface RequestContext {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<any>) => void;
  params?: Record<string, string>;
}
