# React Native Expo Zustand Boilerplate

A modern, AI-ready boilerplate for React Native applications using Expo SDK 55, TypeScript, Zustand, and Expo Router. Start building production-quality mobile apps with best practices baked in.

## AI-Ready

This repo ships with purpose-built guidance files so AI assistants understand the project conventions out of the box.

| File | Used by |
|------|---------|
| `CLAUDE.md` | Claude Code |
| `AGENTS.md` | Windsurf, Codex CLI, Gemini CLI |
| `.cursor/rules/` | Cursor |
| `.github/copilot-instructions.md` | GitHub Copilot |

Four Cursor rules are included:

| Rule | Scope |
|------|-------|
| `project-structure.mdc` | Directory layout and naming conventions |
| `react-native.mdc` | React Native & Expo patterns |
| `zustand.mdc` | Zustand slice architecture |
| `styling.mdc` | Theming and StyleSheet best practices |

## Features

- **Expo SDK 55** — React Native 0.83 with mandatory New Architecture
- **TypeScript** — Strict mode for type safety
- **Expo Router** — File-based routing with typed navigation
- **Zustand** — Lightweight state management with slice pattern
- **i18n** — Internationalization with i18next (English and Spanish)
- **Dark Mode** — Full theme support with persistence via AsyncStorage
- **Reanimated** — Smooth animations with react-native-reanimated v4
- **Axios** — Configured HTTP client with interceptors
- **AI-Ready** — CLAUDE.md, AGENTS.md, .cursor/rules, and copilot-instructions
- **Code Quality** — ESLint 9 (flat config), Prettier, Husky, and commitlint
- **Setup Wizard** — Interactive CLI to personalize the boilerplate for your project

## Showcase

> All screens, components, and mock data included in this boilerplate are **for demonstration purposes only**. They showcase the architecture, theming, navigation, and state management. Run `npm run setup` to optionally replace them with clean stubs.

The boilerplate includes 4 demo screens that showcase every built-in feature:

| Home | Search | Notifications | Settings |
|------|--------|---------------|----------|
| Boilerplate Explorer with feature cards, utilities grid, and tech stack list | Category chips, trending list, recent searches | Today/earlier sections with unread notification dots | Grouped settings with app info card and danger zone |

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) v20.19 or newer
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/set-up-your-environment/)

### Installation

```bash
git clone https://github.com/ArslanKathworStudios/react-native-typescript-zustand-expo-boilerplate.git
cd react-native-typescript-zustand-expo-boilerplate
npm install
```

### Setup Wizard

Run the interactive setup wizard to personalize the boilerplate for your project:

```bash
npm run setup
```

The wizard walks you through each step one by one:

| # | Prompt | What it updates |
|---|--------|-----------------|
| 1 | **App name** | `app.json`, Settings screen, CLAUDE.md, AGENTS.md, README |
| 2 | **Slug** | `package.json` name, `app.json` slug |
| 3 | **Deep link scheme** | `app.json` scheme |
| 4 | **Bundle ID** | iOS `bundleIdentifier` + Android `package` (optional) |
| 5 | **Author name** | `package.json` author (optional) |
| 6 | **App description** | `package.json` description (optional) |
| 7 | **API base URL** | `src/services/api.ts` baseURL |
| 8 | **Primary color** | `src/constants/Colors.ts`, CLAUDE.md, AGENTS.md |
| 9 | **Default language** | `src/i18n/index.ts` (en or es) |
| 10 | **Remove showcase** | Replace demo screens with clean stubs, delete mock data |
| 11 | **Reinitialize Git** | Wipe boilerplate history, fresh first commit |

After applying all changes, the wizard offers to **remove itself** from the project so it doesn't ship with your app.

### Development

```bash
npm start          # Start Expo dev server
npm run ios        # Start on iOS simulator
npm run android    # Start on Android emulator
npm run web        # Start web version
```

## Project Structure

```
app/                              # Expo Router — screens and layouts
  _layout.tsx                     # Root layout (splash, fonts, theme hydration)
  (tabs)/
    _layout.tsx                   # Tab bar configuration (4 tabs)
    index.tsx                     # Home — Boilerplate Explorer
    search.tsx                    # Search — categories & trending
    notifications.tsx             # Notifications — with unread dots
    settings.tsx                  # Settings — grouped sections

src/                              # Shared application code
  components/ui/
    Button.tsx                    # Themed button with variants & loading state
    Card.tsx                      # Themed card container with shadow
    ThemedText.tsx                # Theme-aware Text (title/heading/body/caption)
    ThemedView.tsx                # Theme-aware View
  constants/
    Colors.ts                     # Centralized palette (light + dark)
    Layout.ts                     # Spacing, border radius, font sizes
  hooks/
    useThemeColor.ts              # Hook for current theme colors
  i18n/
    index.ts                      # i18next initialization
    locales/
      en.json                     # English translations
      es.json                     # Spanish translations
  screens/home/
    components/CardItem.tsx       # Horizontal feature card component
    mock/MockData.ts              # Feature cards, utilities, tech stack data
  scripts/terminal/
    setup.mjs                     # Interactive project setup wizard
    lint.mjs                      # ESLint runner with chalk & ora
    prettier.mjs                  # Prettier runner with chalk & ora
    push.mjs                      # Git push helper with chalk & ora
  services/
    api.ts                        # Axios HTTP client with interceptors
    zustand/
      index.ts                    # Combined store + selector hooks
      types.ts                    # State type definitions
      slices/
        appSlice.ts               # App-wide state (theme, language)
        userSlice.ts              # User state management
  types/
    index.ts                      # Shared TypeScript interfaces
```

## State Management

Zustand store is organized into slices for scalability:

```typescript
import { useApp, useUser } from "../src/services/zustand";

const { isDarkMode, toggleTheme, language, setLanguage } = useApp();
const { user, setUser, updateUser } = useUser();
```

Add new slices in `src/services/zustand/slices/` and register them in `src/services/zustand/index.ts`.

## Theming

Colors are centralized in `src/constants/Colors.ts` with light and dark variants. Primary color is `#4A6CF7`.

```typescript
import { useThemeColor } from "../src/hooks/useThemeColor";

function MyScreen() {
  const colors = useThemeColor();
  return (
    <View style={{ backgroundColor: colors.card, shadowColor: colors.shadow }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
}
```

Themed UI components (`ThemedText`, `ThemedView`, `Button`, `Card`) are in `src/components/ui/` and automatically adapt to the current theme.

## Navigation

Uses Expo Router with file-based routing. Add a new tab screen:

```typescript
// app/(tabs)/myscreen.tsx
export default function MyScreen() {
  return <ThemedView>...</ThemedView>;
}
```

Then register the tab in `app/(tabs)/_layout.tsx`.

## Internationalization

Translations live in `src/i18n/locales/*.json` (English and Spanish included):

```typescript
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
t("home.welcome");
```

Add new languages by creating a new JSON file in `src/i18n/locales/` and registering it in `src/i18n/index.ts`.

## Scripts

All custom scripts use `chalk` and `ora` for styled terminal output with spinners.

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Start on iOS simulator |
| `npm run android` | Start on Android emulator |
| `npm run web` | Start web version |
| `npm run setup` | Interactive project setup wizard |
| `npm run lint` | Run ESLint with auto-fix (chalk + ora) |
| `npm run lint:check` | Run ESLint check only |
| `npm run format` | Format with Prettier (chalk + ora) |
| `npm run format:check` | Check formatting |
| `npm run push` | Git push helper (chalk + ora) |

## Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/). Enforced by commitlint + Husky git hooks.

```
feat: add user authentication
fix: resolve dark mode toggle persistence
docs: update README with new architecture
refactor: extract theme colors to constants
```

## Dependencies

| Package | Version |
|---------|---------|
| expo | 55.x |
| react | 19.2 |
| react-native | 0.83 |
| expo-router | 55.x |
| zustand | 5.x |
| i18next | 25.x |
| axios | 1.x |
| react-native-reanimated | 4.x |
| typescript | 5.9 |
| eslint | 9.x |

| Dev Tool | Version |
|----------|---------|
| chalk | 5.x |
| ora | 9.x |
| husky | 9.x |
| commitlint | 20.x |
| prettier | 3.x |

## License

MIT — see [LICENSE](LICENSE) for details.
