import { sseEvents } from '../sse';
import { AIError, type AIProvider, type AIResponse } from '../types';

interface ProxyOptions {
  /** Your backend endpoint implementing the proxy contract below. */
  baseUrl: string;
  /** Called per request to supply the user's auth token (e.g. from secure-store). */
  getAuthToken?: () => Promise<string | null>;
}

/**
 * PRODUCTION transport: the app talks to YOUR backend; the backend holds the
 * provider API keys and forwards to Anthropic/OpenAI/Gemini. API keys must
 * never ship in the app bundle — anything in JS is public.
 *
 * Backend contract (implement server-side):
 *   POST {baseUrl}/ai/chat    body: AIRequest       -> AIResponse JSON
 *   POST {baseUrl}/ai/stream  body: AIRequest       -> SSE stream of
 *     data: {"delta": "..."}         (repeated)
 *     data: {"done": true, "stopReason": "end", "usage": {...}}
 */
export function proxyProvider(options: ProxyOptions): AIProvider {
  async function headers(): Promise<Record<string, string>> {
    const token = await options.getAuthToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  return {
    name: 'proxy',

    async chat(request) {
      const response = await fetch(`${options.baseUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await headers()) },
        body: JSON.stringify(request),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new AIError('proxy', response.status, json?.error ?? 'Request failed');
      }
      return json as AIResponse;
    },

    async stream(request, onDelta) {
      let text = '';
      let stopReason: AIResponse['stopReason'] = 'other';
      let usage: AIResponse['usage'];

      for await (const { data } of sseEvents(
        `${options.baseUrl}/ai/stream`,
        await headers(),
        request,
      )) {
        const event = JSON.parse(data) as {
          delta?: string;
          done?: boolean;
          stopReason?: AIResponse['stopReason'];
          usage?: AIResponse['usage'];
        };
        if (event.delta) {
          text += event.delta;
          onDelta(event.delta);
        }
        if (event.done) {
          stopReason = event.stopReason ?? 'end';
          usage = event.usage;
        }
      }
      return { text, stopReason, usage };
    },
  };
}
