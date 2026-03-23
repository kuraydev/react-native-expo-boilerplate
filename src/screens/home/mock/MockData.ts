import type { IFeatureCard, IStackItem, IUtilityItem } from "../../../types";

export const FeatureCards: IFeatureCard[] = [
  {
    icon: "navigate",
    title: "Expo Router",
    description:
      "File-based routing with typed navigation, deep linking, and tab/stack layouts built in.",
  },
  {
    icon: "color-palette",
    title: "Dark / Light Theme",
    description:
      "Full dark mode with a centralized color palette and useThemeColor hook.",
  },
  {
    icon: "layers",
    title: "Zustand State",
    description:
      "Lightweight state management using the slice pattern with typed selector hooks.",
  },
  {
    icon: "language",
    title: "Localization",
    description:
      "i18next integrated with JSON locale files — English and Spanish included.",
  },
  {
    icon: "cloud-download",
    title: "Axios HTTP",
    description:
      "Pre-configured Axios instance with request/response interceptors ready to go.",
  },
  {
    icon: "sparkles",
    title: "Animations",
    description:
      "react-native-reanimated v4 ready to use for smooth, performant animations.",
  },
  {
    icon: "shield-checkmark",
    title: "TypeScript",
    description:
      "Strict TypeScript config with path aliases and fully typed components.",
  },
  {
    icon: "chatbubble-ellipses",
    title: "AI-Ready",
    description:
      "Ships with CLAUDE.md, AGENTS.md, .cursor/rules — every AI assistant understands this codebase.",
  },
  {
    icon: "code-slash",
    title: "Code Quality",
    description:
      "ESLint 9, Prettier, Husky pre-commit hooks, and commitlint for clean code from day one.",
  },
];

export const UtilityItems: IUtilityItem[] = [
  {
    icon: "swap-horizontal",
    title: "useThemeColor",
    tag: "hook",
    description:
      "Returns the full color palette for the current theme — light or dark.",
  },
  {
    icon: "text",
    title: "ThemedText",
    tag: "component",
    description:
      "Typed text with variant props (title, heading, body, caption) and auto dark mode.",
  },
  {
    icon: "square",
    title: "ThemedView",
    tag: "component",
    description:
      "View wrapper that automatically applies the correct background color for the theme.",
  },
  {
    icon: "finger-print",
    title: "Button",
    tag: "component",
    description:
      "Themed button with primary, secondary, ghost, and danger variants plus loading state.",
  },
  {
    icon: "card",
    title: "Card",
    tag: "component",
    description:
      "Container component with shadow and rounded corners that respects the current theme.",
  },
  {
    icon: "globe",
    title: "useTranslation",
    tag: "hook",
    description:
      "Access i18next translations anywhere — switch locale at runtime with setLanguage().",
  },
  {
    icon: "git-branch",
    title: "Zustand Slices",
    tag: "service",
    description:
      "Combine multiple state slices into one store — useApp() and useUser() built in.",
  },
  {
    icon: "save",
    title: "AsyncStorage",
    tag: "service",
    description:
      "Theme, language, and user data persist across launches via AsyncStorage.",
  },
];

export const StackItems: IStackItem[] = [
  { name: "Expo SDK", version: "55", icon: "logo-react" },
  { name: "React Native", version: "0.83.2", icon: "phone-portrait" },
  { name: "React", version: "19.2", icon: "logo-react" },
  { name: "TypeScript", version: "5.9", icon: "code-slash" },
  { name: "Expo Router", version: "55.x", icon: "navigate" },
  { name: "Zustand", version: "5.x", icon: "git-branch" },
  { name: "i18next", version: "25.x", icon: "earth" },
  { name: "Axios", version: "1.x", icon: "cloud" },
  { name: "Reanimated", version: "4.x", icon: "flash" },
  { name: "AsyncStorage", version: "2.x", icon: "save" },
];
