# React Native Expo Zustand Boilerplate

A modern, AI-ready boilerplate for React Native applications using Expo SDK 55, TypeScript, Zustand, and Expo Router. Start building production-quality mobile apps with best practices baked in.

> **AI-Ready.** This repo ships with purpose-built guidance files so Cursor, Claude Code, GitHub Copilot, Windsurf, and Gemini CLI all understand the project conventions out of the box.

| File | Used by |
|------|---------|
| `CLAUDE.md` | Claude Code |
| `AGENTS.md` | Windsurf, Codex CLI, Gemini CLI |
| `.cursor/rules/` | Cursor |
| `.github/copilot-instructions.md` | GitHub Copilot |

> **Note:** All screens, components, and mock data included in this boilerplate are **for demonstration purposes only**. They showcase the architecture, theming, navigation, and state management — not to be kept as-is. Feel free to delete any screen or mock data and replace with your own.

## Features

- **Expo SDK 55** — React Native 0.83 with New Architecture
- **TypeScript** — Strict mode for type safety
- **Expo Router** — File-based routing with typed navigation
- **Zustand** — Lightweight state management with slice pattern
- **i18n** — Internationalization with i18next (English and Spanish)
- **Dark Mode** — Full theme support with persistence via AsyncStorage
- **Reanimated** — Smooth animations with react-native-reanimated v4
- **Axios** — Configured HTTP client with interceptors
- **AI-Ready** — CLAUDE.md, AGENTS.md, and .cursor/rules included
- **Code Quality** — ESLint 9, Prettier, Husky, and commitlint

## Showcase

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

### Development

```bash
npm start          # Start Expo dev server
npm run ios        # Start on iOS simulator
npm run android    # Start on Android emulator
npm run web        # Start web version
```

## Project Structure

```
app/                            # Expo Router — screens and layouts
  _layout.tsx                   # Root layout (splash, fonts, theme)
  (tabs)/
    _layout.tsx                 # Tab bar configuration (4 tabs)
    index.tsx                   # Home — Boilerplate Explorer
    search.tsx                  # Search — categories & trending
    notifications.tsx           # Notifications — with unread dots
    settings.tsx                # Settings — grouped sections

src/                            # Shared application code
  components/ui/                # Reusable themed components
    Button.tsx                  # Themed button with variants
    Card.tsx                    # Themed card container
    ThemedText.tsx              # Theme-aware Text (title/heading/body/caption)
    ThemedView.tsx              # Theme-aware View
  constants/
    Colors.ts                   # Centralized palette (light + dark)
    Layout.ts                   # Spacing, border radius, font sizes
  hooks/
    useThemeColor.ts            # Hook for current theme colors
  i18n/
    index.ts                    # i18next initialization
    locales/
      en.json                   # English translations
      es.json                   # Spanish translations
  screens/home/
    components/CardItem.tsx     # Horizontal feature card component
    mock/MockData.ts            # Feature cards, utilities, tech stack data
  services/
    api.ts                      # Axios HTTP client
    zustand/
      index.ts                  # Combined store + selector hooks
      types.ts                  # State type definitions
      slices/
        appSlice.ts             # App-wide state (theme, language)
        userSlice.ts            # User state management
  types/
    index.ts                    # Shared TypeScript types
```

## State Management

Zustand store is organized into slices:

```typescript
import { useApp, useUser } from "../src/services/zustand";

const { isDarkMode, toggleTheme, language, setLanguage } = useApp();
const { user, setUser, updateUser } = useUser();
```

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

## Navigation

Uses Expo Router with file-based routing. Add a new tab screen:

```typescript
// app/(tabs)/myscreen.tsx
export default function MyScreen() {
  return <ThemedView>...</ThemedView>;
}
```

Then register in `app/(tabs)/_layout.tsx`.

## Internationalization

Translations in `src/i18n/locales/*.json`:

```typescript
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
t("home.welcome");
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo dev server |
| `npm run ios` | Start on iOS simulator |
| `npm run android` | Start on Android emulator |
| `npm run web` | Start web version |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run lint:check` | Run ESLint check only |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run push` | Git push helper |

## Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/). Validated by commitlint via Husky.

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

## License

MIT — see [LICENSE](LICENSE) for details.
