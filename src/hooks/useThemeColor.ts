import { Colors, ThemeColors } from "../constants/Colors";
import { useApp } from "../services/zustand";

export function useThemeColor(): ThemeColors {
  const { isDarkMode } = useApp();
  return isDarkMode ? Colors.dark : Colors.light;
}
