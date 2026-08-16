#!/usr/bin/env node
/**
 * Deterministic scaffolding that already follows the project rules — useful
 * for humans and essential for AI assistants (consistent skeletons in, less
 * convention-drift out).
 *
 *   node scripts/gen.mjs screen settings      -> src/app/settings.tsx
 *   node scripts/gen.mjs feature profile      -> src/features/profile/{index.ts,use-profile-query.ts}
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const [kind, rawName] = process.argv.slice(2);
if (!kind || !rawName || !['screen', 'feature'].includes(kind)) {
  console.error('Usage: node scripts/gen.mjs <screen|feature> <kebab-name>');
  process.exit(1);
}
const name = rawName.toLowerCase().replace(/[^a-z0-9-]/g, '');
const pascal = name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const camel = pascal[0].toLowerCase() + pascal.slice(1);

function write(path, content) {
  if (existsSync(path)) {
    console.error(`Refusing to overwrite ${path}`);
    process.exit(1);
  }
  writeFileSync(path, content);
  console.log(`Created ${path}`);
}

if (kind === 'screen') {
  write(
    `src/app/${name}.tsx`,
    `import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Spacing } from '@/theme';

export default function ${pascal}Screen() {
  const { t } = useTranslation();
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>{t('${camel}.title', '${pascal}')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.three },
});
`,
  );
  console.log(`Next: add "${camel}" keys to src/locales/en.json`);
}

if (kind === 'feature') {
  mkdirSync(`src/features/${name}`, { recursive: true });
  write(
    `src/features/${name}/use-${name}-query.ts`,
    `import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api/client';

interface ${pascal} {
  id: string;
}

export function use${pascal}Query() {
  return useQuery({
    queryKey: ['${name}'],
    queryFn: () => api.get<${pascal}[]>('/${name}'),
  });
}
`,
  );
  write(`src/features/${name}/index.ts`, `export * from './use-${name}-query';\n`);
}
