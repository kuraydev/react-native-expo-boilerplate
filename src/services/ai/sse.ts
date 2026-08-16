import { fetch as streamingFetch } from 'expo/fetch';

/**
 * POST a JSON body and iterate server-sent events. Uses expo/fetch, which
 * supports response streaming on native (RN's built-in fetch does not).
 */
export async function* sseEvents(
  url: string,
  headers: Record<string, string>,
  body: unknown,
): AsyncGenerator<{ event?: string; data: string }> {
  const response = await streamingFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });

  if (!response.ok || !response.body) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 400)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let separator: number;
    while ((separator = buffer.indexOf('\n\n')) !== -1) {
      const raw = buffer.slice(0, separator);
      buffer = buffer.slice(separator + 2);

      let event: string | undefined;
      const dataLines: string[] = [];
      for (const line of raw.split('\n')) {
        if (line.startsWith('event:')) event = line.slice(6).trim();
        else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
      }
      if (dataLines.length > 0) {
        yield { event, data: dataLines.join('\n') };
      }
    }
  }
}
