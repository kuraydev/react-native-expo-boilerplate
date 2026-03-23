# React Native Expo Zustand Boilerplate

## Build & Run

- Install: `npm install`
- Dev server: `npm start`
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`
- Lint: `npm run lint`
- Format: `npm run format`

## Code Style

- TypeScript strict mode
- Functional components only
- Expo Router for navigation (file-based in `app/`)
- Zustand for state management (slice pattern)
- Use themed components (`ThemedText`, `ThemedView`, `Button`, `Card`)
- Colors from `src/constants/Colors.ts` — primary is `#4A6CF7`, no hardcoded colors
- Layout spacing from `src/constants/Layout.ts`
- Translations via i18next — keys in `src/i18n/locales/*.json`

## Architecture

- `app/` — Expo Router screens and layouts (4 tabs: Home, Search, Notifications, Settings)
- `src/components/ui/` — Reusable themed UI components
- `src/constants/` — Design tokens (Colors with light/dark, Layout)
- `src/hooks/` — Custom hooks (`useThemeColor`)
- `src/i18n/` — Internationalization setup and locale files
- `src/screens/home/` — Home screen components and mock data
- `src/services/api.ts` — Axios HTTP client
- `src/services/zustand/` — State management (store, slices, types)
- `src/types/` — Shared TypeScript types

## Patterns

- Zustand store uses combined slices: `appSlice` (theme, language) + `userSlice` (user data)
- Access state via hooks: `useApp()`, `useUser()` from `src/services/zustand`
- Theme colors via `useThemeColor()` returns full palette
- Shadow cards: `backgroundColor: colors.card`, `shadowColor: colors.shadow`
- `react-native-reanimated/plugin` must be last in babel.config.js plugins
- AsyncStorage keys prefixed with `@`
- All showcase screens are demo — safe to replace

## PR Guidelines

- Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, etc.
- Run lint and format before committing
