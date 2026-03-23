export const palette = {
  primary: "#4A6CF7",
  secondary: "#f97316",
  danger: "#f43f5e",
  success: "#10b981",
  warning: "#f59e0b",
  info: "#0ea5e9",
  purple: "#8b5cf6",
};

export const Colors = {
  light: {
    text: "#1e2533",
    textSecondary: "#95a0b4",
    background: "#f4f6fb",
    backgroundSecondary: "#ffffff",
    tint: palette.primary,
    icon: "#95a0b4",
    border: "#e6eaf2",
    card: "#ffffff",
    shadow: "#8b9ab0",
    tabBarBackground: "#ffffff",
    tabBarBorder: "#e6eaf2",
    headerBackground: "#f4f6fb",
    switchTrack: "#e6eaf2",
    danger: palette.danger,
    success: palette.success,
  },
  dark: {
    text: "#e8edf5",
    textSecondary: "#6b7894",
    background: "#0e1117",
    backgroundSecondary: "#181c27",
    tint: palette.primary,
    icon: "#6b7894",
    border: "#2c313d",
    card: "#181c27",
    shadow: "transparent",
    tabBarBackground: "#0e1117",
    tabBarBorder: "#2c313d",
    headerBackground: "#0e1117",
    switchTrack: "#2c313d",
    danger: palette.danger,
    success: palette.success,
  },
};

export type ThemeColors = typeof Colors.light;
