import { anthropicProvider } from './providers/anthropic';
import { geminiProvider } from './providers/gemini';
import { openAIProvider } from './providers/openai';
import { proxyProvider } from './providers/proxy';
import type { AIProvider } from './types';

export * from './types';
export { anthropicProvider, geminiProvider, openAIProvider, proxyProvider };

/**
 * Resolve the app's AI provider from env config.
 *
 * Development (direct-to-provider — key IS visible in the bundle, dev only):
 *   EXPO_PUBLIC_AI_PROVIDER=anthropic|openai|gemini
 *   EXPO_PUBLIC_AI_API_KEY=sk-...
 *
 * Production:
 *   EXPO_PUBLIC_AI_PROVIDER=proxy
 *   EXPO_PUBLIC_AI_PROXY_URL=https://api.yourapp.com
 *
 * Anything prefixed EXPO_PUBLIC_ ships in the JS bundle and is readable by
 * anyone with the app. Never ship a real provider key in a release build —
 * use the proxy transport and keep keys server-side.
 */
export function createAIProvider(): AIProvider {
  const provider = process.env.EXPO_PUBLIC_AI_PROVIDER ?? 'proxy';
  const apiKey = process.env.EXPO_PUBLIC_AI_API_KEY ?? '';

  switch (provider) {
    case 'anthropic':
      warnIfNotDev();
      return anthropicProvider({ apiKey });
    case 'openai':
      warnIfNotDev();
      return openAIProvider({ apiKey });
    case 'gemini':
      warnIfNotDev();
      return geminiProvider({ apiKey });
    case 'proxy':
    default:
      return proxyProvider({ baseUrl: process.env.EXPO_PUBLIC_AI_PROXY_URL ?? '' });
  }
}

function warnIfNotDev() {
  if (!__DEV__) {
    console.error(
      '[ai] Direct provider mode is running in a release build — the API key ' +
        'is exposed in the bundle. Switch EXPO_PUBLIC_AI_PROVIDER to "proxy".',
    );
  }
}
