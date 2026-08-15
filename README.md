# ⚡ React Native Expo Boilerplate

[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2057-000020?style=for-the-badge&logo=expo)](https://docs.expo.dev/versions/v57.0.0/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61dafb?style=for-the-badge&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![AI Ready](https://img.shields.io/badge/AI--Ready-Claude%20%7C%20Cursor%20%7C%20Copilot-8b5cf6?style=for-the-badge)](./CLAUDE.md)

Production-grade Expo starter with the decisions already made — routing, data,
state, theming, i18n, testing, EAS, and CI — so a new app is **minutes away,
not days**.

## 🌟 Features

- 🧭 **expo-router** — file-based navigation, typed routes
- 🔄 **TanStack Query** — server state: caching, retries, offline out of the box
- 🐻 **zustand** — client state, MMKV-persisted example store included
- ⚡ **react-native-mmkv** — synchronous storage, ~30x faster than AsyncStorage
- 🌐 **fetch wrapper** — auth-header injection + normalized errors, no axios
- 🎨 **Theme packs** — swappable light/dark token sets, zero hex in components
- 🌍 **i18next** — every string through `t()`, device-locale aware
- 🔐 **expo-secure-store** — secrets in the Keychain, never in JS storage
- 🧪 **jest-expo + RNTL + Maestro** — unit, component, and E2E smoke tests
- 🚀 **EAS** — build profiles, OTA channels, one-command setup script
- 🤖 **AI-assistant ready** — `CLAUDE.md` / `AGENTS.md` convention files
- 🛡️ **Quality gates** — TS strict, ESLint, Prettier, husky, commitlint, Renovate, CI

## 🧱 Stack

| Concern | Choice |
|---|---|
| 🧭 Navigation | [expo-router](https://docs.expo.dev/router/introduction/) (file-based, `src/app/`) |
| 🔄 Server state | [TanStack Query](https://tanstack.com/query) |
| 🐻 Client state | [zustand](https://zustand.docs.pmnd.rs) (persisted example included) |
| 🌐 HTTP | `fetch` wrapper with auth-header injection + normalized errors |
| 🎨 Styling | `StyleSheet` + swappable **theme packs** (light/dark built in) |
| 🌍 i18n | i18next + expo-localization |
| ⚡ Storage | [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) (cache/prefs) / expo-secure-store (secrets) |
| 🧪 Testing | jest-expo + React Native Testing Library + [Maestro](https://maestro.mobile.dev) smoke E2E |
| 🚀 Builds | EAS (dev / preview / production profiles) + OTA updates |
| 🛡️ Quality | TypeScript strict, ESLint, Prettier, husky + commitlint, Renovate, GitHub Actions CI |

## 🚀 Quick start

```bash
git clone https://github.com/kuraydev/react-native-expo-boilerplate.git my-app
cd my-app && rm -rf .git && git init
npm install

# Make it yours (renames app/slug/scheme, optional add-on libs):
node scripts/bootstrap.mjs --name "My App" --slug my-app --extras

# Wire EAS (project link, credentials, push checklist):
npm run setup:eas

npm run ios   # or android / web
```

> [!NOTE]
> MMKV is a native module — run with a **dev build** (`npm run ios` /
> `npm run android`), not Expo Go.

## 🎨 Theming

All colors live in **theme packs** (`src/theme/packs/`). A pack defines light +
dark palettes over one typed shape. Restyle the entire app by adding a pack and
switching one line in `src/theme/index.ts`:

```ts
export const activePack: ThemePack = myBrandPack;
```

Components consume `useTheme()` for colors and static `Spacing` / `Radius` /
`Fonts` tokens — no hex literals in components, ever.

## 📁 Project layout

```
src/app/              🧭 expo-router routes (thin — no business logic)
src/components/       🧩 shared UI (incl. Bounceable, themed primitives)
src/features/<name>/  📦 feature code: components, hooks, queries co-located
src/services/api/     🌐 fetch wrapper + endpoint functions
src/store/            🐻 zustand stores (client state only)
src/lib/              ⚡ MMKV storage + TanStack Query client
src/theme/            🎨 token packs + useTheme
src/locales/          🌍 i18n resources (en.json is source of truth)
```

## 🔧 Scripts

| Command | What |
|---|---|
| `npm run typecheck` / `lint` / `test` | ✅ the CI trio |
| `npm run e2e` | 🧪 Maestro smoke flow |
| `npm run build:ios` / `build:android` | 🚀 EAS production builds |
| `npm run update:dev` / `preview` / `prod` | 📡 OTA updates per channel |
| `node scripts/bootstrap.mjs` | 🏷️ rename app + optional extras |
| `npm run setup:eas` | 🔑 one-time EAS link + credentials |

## 🤖 AI-assistant ready

Ships with guidance files so coding agents follow the project conventions out
of the box: [`CLAUDE.md`](./CLAUDE.md) (Claude Code) and [`AGENTS.md`](./AGENTS.md)
(Codex CLI, Windsurf, Gemini CLI, …).

## 🧩 Optional add-ons

Curated, actively maintained companion libraries (installable via
`bootstrap.mjs --extras`):

- ☑️ [react-native-bouncy-checkbox](https://github.com/WrathChaos/react-native-bouncy-checkbox)
- 🎚️ [react-native-segmented-control-2](https://github.com/WrathChaos/react-native-segmented-control-2)
- 🪟 [react-native-modalkit](https://github.com/WrathChaos/react-native-modalkit)
- 🌈 [react-native-gradient-background-skia](https://github.com/WrathChaos/react-native-gradient-background-skia)

## 📄 License

MIT © [Kuray Ogun](https://github.com/kuraydev)
