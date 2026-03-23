import { StyleSheet, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Layout } from "../../constants/Layout";

interface CardProps extends ViewProps {
  padded?: boolean;
}

export function Card({ style, padded = true, children, ...rest }: CardProps) {
  const colors = useThemeColor();

  return (
    <ThemedView
      style={[
        styles.card,
        padded && styles.padded,
        { borderColor: colors.border },
        style,
      ]}
      {...rest}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.borderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  padded: {
    padding: Layout.spacing.md,
  },
});
