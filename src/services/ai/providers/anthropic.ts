import { sseEvents } from '../sse';
import { AIError, type AIProvider, type AIRequest, type AIResponse } from '../types';

const API_URL = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';
const DEFAULT_MODEL = 'claude-opus-5';
const DEFAULT_MAX_TOKENS = 16000;

interface AnthropicOptions {
  apiKey: string;
  model?: string;
}

function buildBody(request: AIRequest, options: AnthropicOptions, stream: boolean) {
  return {
    model: request.model ?? options.model ?? DEFAULT_MODEL,
    max_tokens: request.maxTokens ?? DEFAULT_MAX_TOKENS,
    ...(request.system ? { system: request.system } : {}),
    ...(request.schema
      ? { output_config: { format: { type: 'json_schema', schema: request.schema } } }
      : {}),
    messages: request.messages,
    ...(stream ? { stream: true } : {}),
  };
}

function normalizeStopReason(stopReason: string | null): AIResponse['stopReason'] {
  if (stopReason === 'end_turn') return 'end';
  if (stopReason === 'max_tokens') return 'max_tokens';
  if (stopReason === 'refusal') return 'refusal';
  return 'other';
}

/**
 * Anthropic Messages API adapter (Claude). Thinking is left at the model's
 * default (adaptive on claude-opus-5). Always check stopReason === 'refusal'
 * before trusting text — safety classifiers can decline with an HTTP 200.
 */
export function anthropicProvider(options: AnthropicOptions): AIProvider {
  const headers = {
    'x-api-key': options.apiKey,
    'anthropic-version': API_VERSION,
  };

  return {
    name: 'anthropic',

    async chat(request) {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(buildBody(request, options, false)),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new AIError('anthropic', response.status, json?.error?.message ?? 'Request failed');
      }
      const text = (json.content as { type: string; text?: string }[])
        .filter((block) => block.type === 'text')
        .map((block) => block.text ?? '')
        .join('');
      return {
        text,
        stopReason: normalizeStopReason(json.stop_reason),
        usage: {
          inputTokens: json.usage?.input_tokens ?? 0,
          outputTokens: json.usage?.output_tokens ?? 0,
        },
      };
    },

    async stream(request, onDelta) {
      let text = '';
      let stopReason: AIResponse['stopReason'] = 'other';
      let inputTokens = 0;
      let outputTokens = 0;

      for await (const { data } of sseEvents(API_URL, headers, buildBody(request, options, true))) {
        const event = JSON.parse(data) as Record<string, any>;
        switch (event.type) {
          case 'message_start':
            inputTokens = event.message?.usage?.input_tokens ?? 0;
            break;
          case 'content_block_delta':
            if (event.delta?.type === 'text_delta') {
              text += event.delta.text;
              onDelta(event.delta.text);
            }
            break;
          case 'message_delta':
            stopReason = normalizeStopReason(event.delta?.stop_reason ?? null);
            outputTokens = event.usage?.output_tokens ?? outputTokens;
            break;
          case 'error':
            throw new AIError('anthropic', 0, event.error?.message ?? 'Stream error');
        }
      }
      return { text, stopReason, usage: { inputTokens, outputTokens } };
    },
  };
}
