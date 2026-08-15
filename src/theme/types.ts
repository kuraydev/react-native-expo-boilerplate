/**
 * Theme pack contract. Every pack (default, or your own) implements this shape,
 * so swapping the app's look is a one-line change in `src/theme/index.ts`.
 */

export interface ThemeColors {
  text: string;
  textSecondary: string;
  background: string;
  backgroundElement: string;
  backgroundSelected: string;
  primary: string;
  onPrimary: string;
  danger: string;
  success: string;
  border: string;
}

export interface ThemePack {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}
