import { sseEvents } from '../sse';
import { AIError, type AIProvider, type AIRequest, type AIResponse } from '../types';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-5.2';

interface OpenAIOptions {
  apiKey: string;
  model?: string;
  /** Override for OpenAI-compatible endpoints (Azure, local, etc.). */
  baseUrl?: string;
}

function buildBody(request: AIRequest, options: OpenAIOptions, stream: boolean) {
  return {
    model: request.model ?? options.model ?? DEFAULT_MODEL,
    ...(request.maxTokens ? { max_completion_tokens: request.maxTokens } : {}),
    ...(request.schema
      ? {
          response_format: {
            type: 'json_schema',
            json_schema: { name: 'response', strict: true, schema: request.schema },
          },
        }
      : {}),
    messages: [
      ...(request.system ? [{ role: 'system', content: request.system }] : []),
      ...request.messages,
    ],
    ...(stream ? { stream: true } : {}),
  };
}

/** OpenAI Chat Completions adapter (also fits OpenAI-compatible endpoints). */
export function openAIProvider(options: OpenAIOptions): AIProvider {
  const url = options.baseUrl ?? API_URL;
  const headers = { Authorization: `Bearer ${options.apiKey}` };

  return {
    name: 'openai',

    async chat(request) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(buildBody(request, options, false)),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new AIError('openai', response.status, json?.error?.message ?? 'Request failed');
      }
      const choice = json.choices?.[0];
      return {
        text: choice?.message?.content ?? '',
        stopReason:
          choice?.finish_reason === 'stop'
            ? 'end'
            : choice?.finish_reason === 'length'
              ? 'max_tokens'
              : choice?.finish_reason === 'content_filter'
                ? 'refusal'
                : 'other',
        usage: {
          inputTokens: json.usage?.prompt_tokens ?? 0,
          outputTokens: json.usage?.completion_tokens ?? 0,
        },
      };
    },

    async stream(request, onDelta) {
      let text = '';
      let stopReason: AIResponse['stopReason'] = 'other';

      for await (const { data } of sseEvents(url, headers, buildBody(request, options, true))) {
        if (data === '[DONE]') break;
        const event = JSON.parse(data) as Record<string, any>;
        const choice = event.choices?.[0];
        const delta = choice?.delta?.content;
        if (typeof delta === 'string' && delta.length > 0) {
          text += delta;
          onDelta(delta);
        }
        if (choice?.finish_reason) {
          stopReason =
            choice.finish_reason === 'stop'
              ? 'end'
              : choice.finish_reason === 'length'
                ? 'max_tokens'
                : choice.finish_reason === 'content_filter'
                  ? 'refusal'
                  : 'other';
        }
      }
      return { text, stopReason };
    },
  };
}
