import { useCallback, useMemo, useRef, useState } from 'react';

import { createAIProvider } from '@/services/ai';
import type { AIMessage } from '@/services/ai';

export interface ChatMessage extends AIMessage {
  id: string;
  /** True while this assistant message is still streaming in. */
  pending?: boolean;
}

/**
 * Minimal streaming chat state over the provider-agnostic AI layer.
 * Server state convention aside: chat transcripts are ephemeral client
 * state, so this lives in a hook rather than TanStack Query.
 */
export function useAIChat(system?: string) {
  const provider = useMemo(() => createAIProvider(), []);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const counter = useRef(0);

  const send = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isStreaming) return;
      setError(null);

      const userMessage: ChatMessage = { id: `m${counter.current++}`, role: 'user', content: trimmed };
      const assistantId = `m${counter.current++}`;
      const history = [...messages, userMessage];

      setMessages([...history, { id: assistantId, role: 'assistant', content: '', pending: true }]);
      setIsStreaming(true);

      try {
        const result = await provider.stream(
          { system, messages: history.map(({ role, content: text }) => ({ role, content: text })) },
          (delta) => {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? { ...message, content: message.content + delta }
                  : message,
              ),
            );
          },
        );
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId
              ? { ...message, content: result.text, pending: false }
              : message,
          ),
        );
        if (result.stopReason === 'refusal') {
          setError('The model declined this request.');
        }
      } catch (caught) {
        setMessages((current) => current.filter((message) => message.id !== assistantId));
        setError(caught instanceof Error ? caught.message : 'Request failed');
      } finally {
        setIsStreaming(false);
      }
    },
    [provider, messages, isStreaming, system],
  );

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, send, reset, isStreaming, error };
}
