# React Native Expo Zustand Boilerplate

## Overview

A modern React Native boilerplate using Expo SDK 55, TypeScript, Zustand state management, and Expo Router for file-based navigation. Targets iOS, Android, and Web.

All screens, components, and mock data included are **for demonstration purposes only**. They showcase the architecture — delete and replace with your own.

## Tech Stack

- **Runtime**: Expo SDK 55, React Native 0.83, React 19.2
- **Language**: TypeScript (strict mode)
- **Routing**: Expo Router (file-based, `app/` directory)
- **State**: Zustand 5 with slice pattern
- **i18n**: i18next + react-i18next (EN/ES)
- **HTTP**: Axios with interceptors
- **Storage**: @react-native-async-storage/async-storage
- **Animations**: react-native-reanimated

## Commands

- `npm start` — Start Expo dev server
- `npm run ios` — Start on iOS simulator
- `npm run android` — Start on Android emulator
- `npm run web` — Start web version
- `npm run lint` — Run ESLint with auto-fix
- `npm run format` — Run Prettier

## Architecture

```
app/                        # Expo Router screens (file-based routing)
  _layout.tsx               # Root layout (splash, fonts, theme hydration)
  (tabs)/
    _layout.tsx             # Tab bar configuration (4 tabs)
    index.tsx               # Home — Boilerplate Explorer showcase
    search.tsx              # Search — categories, trending, recent
    notifications.tsx       # Notifications — today/earlier with unread dots
    settings.tsx            # Settings — grouped sections with app info

src/                        # Shared application code
  components/ui/            # Reusable themed UI components
  constants/                # Colors (light+dark palette), Layout tokens
  hooks/                    # Custom React hooks (useThemeColor)
  i18n/                     # i18next setup + locale JSON files
  screens/home/             # Home screen components and mock data
  services/
    api.ts                  # Axios HTTP client
    zustand/                # State management (store, slices, types)
  types/                    # Shared TypeScript types and interfaces
```

## Conventions

- Functional components only, no class components
- Use `ThemedText` and `ThemedView` for theme-aware rendering
- Colors come from `src/constants/Colors.ts` — never hardcode hex values
- Zustand state organized into slices (`appSlice`, `userSlice`)
- Access store via selector hooks: `useApp()`, `useUser()`
- `useThemeColor()` returns the full palette for the current theme
- Translations in `src/i18n/locales/*.json`, accessed via `useTranslation()`
- Expo Router file-based routing — add screens as files in `app/`

## Color Palette

The palette uses `#4A6CF7` as primary. Theme tokens include:
- `text`, `textSecondary`, `background`, `backgroundSecondary`
- `card`, `shadow`, `border`, `tint`, `icon`
- `danger`, `success`, `tabBarBackground`, `headerBackground`

Shadow cards use `colors.card` for background and `colors.shadow` for shadow color.

## Gotchas

- `react-native-reanimated/plugin` must be the LAST plugin in `babel.config.js`
- Expo Router requires `"main": "expo-router/entry"` in package.json
- `app.json` has `"scheme"` for deep linking — update for your app
- AsyncStorage keys are prefixed with `@` (e.g., `@theme_mode`, `@language`)
- New Architecture is mandatory in SDK 55 (no toggle)
- All 4 showcase screens are demo content — safe to delete

## Adding New Features

### New Screen
1. Create a file in `app/` (or `app/(tabs)/` for tab screens)
2. Export a default React component
3. Add translations to `src/i18n/locales/en.json` and `es.json`

### New Zustand Slice
1. Create `src/services/zustand/slices/mySlice.ts` following existing slice pattern
2. Add types to `src/services/zustand/types.ts`
3. Merge into store in `src/services/zustand/index.ts`
4. Create a selector hook (e.g., `useMySlice()`)

### New Reusable Component
1. Create in `src/components/ui/`
2. Use `useThemeColor()` hook for theme-aware colors
3. Use `Layout` constants for spacing and sizing
