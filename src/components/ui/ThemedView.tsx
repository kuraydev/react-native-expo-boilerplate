import { View, ViewProps } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";

interface ThemedViewProps extends ViewProps {
  secondary?: boolean;
}

export function ThemedView({
  style,
  secondary = false,
  ...rest
}: ThemedViewProps) {
  const colors = useThemeColor();
  const backgroundColor = secondary
    ? colors.backgroundSecondary
    : colors.background;

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
