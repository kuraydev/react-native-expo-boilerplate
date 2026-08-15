# React Native Expo Boilerplate

Expo SDK 57 / React Native 0.86 / TypeScript strict. Read the versioned docs at
https://docs.expo.dev/versions/v57.0.0/ before writing native-adjacent code.

## Stack (locked — do not swap without a decision)

- **Navigation**: `expo-router`, file-based routes in `src/app/`.
- **Server state**: TanStack Query. All API data flows through `useQuery`/`useMutation`. Never store API responses in zustand.
- **Client state**: zustand, client-only concerns (session, prefs, UI state). Stores stay small. Example: `src/store/settings.ts`.
- **Transport**: `fetch` via `src/services/api/client.ts` (base URL, auth headers, normalized `ApiError`). No axios.
- **Styling**: `StyleSheet.create` + tokens from `src/theme/`. No styled-components / NativeWind / Unistyles.
- **Storage**: `expo-secure-store` for tokens/secrets; AsyncStorage only for non-sensitive cache.
- **i18n**: i18next. Every user-facing string via `t("group.key")`; keys live in `src/locales/en.json` (source of truth).

## Layout

```
src/app/              # expo-router routes only — no business logic
src/components/       # shared UI, one component per file
src/features/<name>/  # feature code: components, hooks, queries co-located
src/services/api/     # fetch wrapper + endpoint functions
src/store/            # zustand stores
src/theme/            # token packs; change activePack in src/theme/index.ts to restyle
src/locales/          # i18n resources
```

- Route files stay thin: compose feature components, no data logic inline.
- Server-state hooks (`useXxxQuery`) live in the feature and are the only place endpoint functions are called from UI.

## Theming

- Tokens only — no hex literals, raw font names, or magic spacing in components.
- Colors via `useTheme()`; `Spacing`, `Radius`, `Fonts` are static imports from `@/theme`.
- Every theme pack defines light + dark; dark mode is required.

## Workflow

- Install native deps with `npx expo install`, never bare `npm i` for Expo-managed packages.
- Verify before finishing: `npm run typecheck && npm run lint && npm test`.
- Builds: EAS (`eas.json`; first-time: `npm run setup:eas`). OTA via `npm run update:<channel>` — native-module changes need a new build, not OTA.
- New Architecture is on; don't add libraries incompatible with it.

## Testing bar

- jest-expo + React Native Testing Library, co-located `__tests__/`, `*.test.ts(x)`.
- E2E: Maestro (`.maestro/smoke.yaml`) — keep the smoke flow green.
- New feature = at least one test for its core logic. No brittle snapshots.

## Guardrails

- Secrets never in the repo or bundle — EAS secrets / `EXPO_PUBLIC_*` env for public config only.
- No new global state library, styling system, or HTTP client.
- Conventional commits (commitlint enforced).
