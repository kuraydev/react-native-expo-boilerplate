/**
 * Provider-agnostic AI layer. One request shape, N transports:
 * Anthropic / OpenAI / Gemini adapters for development, and a backend proxy
 * for production (API keys must never ship in the app bundle).
 */

export type AIRole = 'user' | 'assistant';

export interface AIMessage {
  role: AIRole;
  content: string;
}

export interface AIRequest {
  messages: AIMessage[];
  system?: string;
  /** Provider-specific model id; each adapter has a sensible default. */
  model?: string;
  maxTokens?: number;
  /**
   * JSON Schema for structured output. When set, the response text is
   * guaranteed (by the provider) to be valid JSON matching the schema.
   * Objects must set additionalProperties: false and list required fields.
   */
  schema?: Record<string, unknown>;
}

export interface AIResponse {
  text: string;
  /** Normalized reason the generation ended. */
  stopReason: 'end' | 'max_tokens' | 'refusal' | 'other';
  usage?: { inputTokens: number; outputTokens: number };
}

export interface AIProvider {
  readonly name: string;
  chat(request: AIRequest): Promise<AIResponse>;
  /** Streams text deltas via onDelta, resolves with the final response. */
  stream(request: AIRequest, onDelta: (text: string) => void): Promise<AIResponse>;
}

export class AIError extends Error {
  constructor(
    readonly provider: string,
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'AIError';
  }
}
