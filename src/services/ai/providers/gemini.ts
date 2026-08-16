import { sseEvents } from '../sse';
import { AIError, type AIProvider, type AIRequest, type AIResponse } from '../types';

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-3-flash';

interface GeminiOptions {
  apiKey: string;
  model?: string;
}

function buildBody(request: AIRequest) {
  return {
    ...(request.system ? { systemInstruction: { parts: [{ text: request.system }] } } : {}),
    contents: request.messages.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    })),
    generationConfig: {
      ...(request.maxTokens ? { maxOutputTokens: request.maxTokens } : {}),
      ...(request.schema
        ? { responseMimeType: 'application/json', responseJsonSchema: request.schema }
        : {}),
    },
  };
}

function extractText(candidate: Record<string, any> | undefined): string {
  const parts: { text?: string }[] = candidate?.content?.parts ?? [];
  return parts.map((part) => part.text ?? '').join('');
}

/** Google Gemini adapter (Generative Language API). */
export function geminiProvider(options: GeminiOptions): AIProvider {
  const model = () => options.model ?? DEFAULT_MODEL;
  const headers = { 'x-goog-api-key': options.apiKey };

  return {
    name: 'gemini',

    async chat(request) {
      const response = await fetch(`${BASE_URL}/${request.model ?? model()}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(buildBody(request)),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new AIError('gemini', response.status, json?.error?.message ?? 'Request failed');
      }
      const candidate = json.candidates?.[0];
      return {
        text: extractText(candidate),
        stopReason:
          candidate?.finishReason === 'STOP'
            ? 'end'
            : candidate?.finishReason === 'MAX_TOKENS'
              ? 'max_tokens'
              : candidate?.finishReason === 'SAFETY'
                ? 'refusal'
                : 'other',
        usage: {
          inputTokens: json.usageMetadata?.promptTokenCount ?? 0,
          outputTokens: json.usageMetadata?.candidatesTokenCount ?? 0,
        },
      };
    },

    async stream(request, onDelta) {
      let text = '';
      let stopReason: AIResponse['stopReason'] = 'other';

      const url = `${BASE_URL}/${request.model ?? model()}:streamGenerateContent?alt=sse`;
      for await (const { data } of sseEvents(url, headers, buildBody(request))) {
        const event = JSON.parse(data) as Record<string, any>;
        const candidate = event.candidates?.[0];
        const delta = extractText(candidate);
        if (delta) {
          text += delta;
          onDelta(delta);
        }
        if (candidate?.finishReason) {
          stopReason =
            candidate.finishReason === 'STOP'
              ? 'end'
              : candidate.finishReason === 'MAX_TOKENS'
                ? 'max_tokens'
                : candidate.finishReason === 'SAFETY'
                  ? 'refusal'
                  : 'other';
        }
      }
      return { text, stopReason };
    },
  };
}
