/**
 * Design tokens. Colors come from the active theme pack via `useTheme()`;
 * dimensional tokens (Spacing, Radius, Fonts) are scheme-independent statics.
 *
 * To restyle the whole app, add a pack under `packs/` and change `activePack`.
 */

import { useColorScheme } from '@/hooks/use-color-scheme';

import { defaultPack } from './packs/default';
import type { ThemeColors, ThemePack } from './types';

export const activePack: ThemePack = defaultPack;

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? activePack.dark : activePack.light;
}

export { Fonts, Spacing, BottomTabInset, MaxContentWidth } from '@/constants/theme';

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
} as const;

export type { ThemeColors, ThemePack } from './types';
