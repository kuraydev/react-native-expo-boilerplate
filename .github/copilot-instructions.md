# Copilot Instructions

This is a React Native project using Expo SDK 55, TypeScript (strict), Zustand for state, and Expo Router for navigation.

## Key Patterns
- Use `ThemedText` and `ThemedView` components instead of raw `Text`/`View`
- Get colors from `useThemeColor()` hook, never hardcode hex values
- Zustand state uses slice pattern in `src/services/zustand/slices/`
- Screens are files in `app/` directory (Expo Router file-based routing)
- Translations via `useTranslation()` with keys in `src/i18n/locales/`
- Layout spacing via `Layout.spacing.*` from `src/constants/Layout.ts`

## Conventions
- Functional components only
- StyleSheet.create() for all styles
- Conventional Commits for git messages
- ESLint + Prettier enforced via Husky pre-commit hooks
