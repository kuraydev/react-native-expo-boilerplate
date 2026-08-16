import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Bounceable } from '@/components/bounceable';
import { useAIChat, type ChatMessage } from '@/hooks/use-ai-chat';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/theme';

function Bubble({ message }: { message: ChatMessage }) {
  const colors = useTheme();
  const isUser = message.role === 'user';
  const { t } = useTranslation();
  return (
    <View
      style={[
        styles.bubble,
        isUser
          ? { backgroundColor: colors.primary, alignSelf: 'flex-end' }
          : { backgroundColor: colors.backgroundElement, alignSelf: 'flex-start' },
      ]}
    >
      <Text style={{ color: isUser ? colors.onPrimary : colors.text }}>
        {message.pending && message.content.length === 0 ? t('chat.thinking') : message.content}
      </Text>
    </View>
  );
}

export default function ChatScreen() {
  const { t } = useTranslation();
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const { messages, send, isStreaming, error } = useAIChat(t('chat.systemPrompt'));
  const [draft, setDraft] = useState('');

  const submit = () => {
    send(draft);
    setDraft('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => <Bubble message={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textSecondary }]}>{t('chat.empty')}</Text>
        }
      />
      {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}
      <View style={[styles.inputRow, { paddingBottom: insets.bottom + Spacing.two }]}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.backgroundElement, color: colors.text },
          ]}
          value={draft}
          onChangeText={setDraft}
          placeholder={t('chat.placeholder')}
          placeholderTextColor={colors.textSecondary}
          onSubmitEditing={submit}
          returnKeyType="send"
          editable={!isStreaming}
          accessibilityLabel={t('chat.placeholder')}
        />
        <Bounceable
          onPress={submit}
          disabled={isStreaming || draft.trim().length === 0}
          style={[styles.send, { backgroundColor: colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel={t('chat.send')}
        >
          <Text style={{ color: colors.onPrimary, fontWeight: '600' }}>{t('chat.send')}</Text>
        </Bounceable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.three, gap: Spacing.two },
  bubble: {
    maxWidth: '85%',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.lg,
  },
  empty: { textAlign: 'center', marginTop: Spacing.six },
  error: { textAlign: 'center', marginBottom: Spacing.two },
  inputRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
  },
  send: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
  },
});
