import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Layout } from "../../constants/Layout";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends Omit<TouchableOpacityProps, "children"> {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  compact?: boolean;
}

export function Button({
  title,
  variant = "primary",
  loading = false,
  compact = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const colors = useThemeColor();

  const variantStyles = {
    primary: {
      backgroundColor: colors.tint,
      textColor: "#FFFFFF",
    },
    secondary: {
      backgroundColor: colors.backgroundSecondary,
      textColor: colors.text,
    },
    ghost: {
      backgroundColor: "transparent",
      textColor: colors.tint,
    },
    danger: {
      backgroundColor: colors.danger,
      textColor: "#FFFFFF",
    },
  };

  const { backgroundColor, textColor } = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        compact && styles.compact,
        { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <ThemedText variant="body" style={[styles.text, { color: textColor }]}>
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Layout.spacing.sm + 4,
    paddingHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  compact: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    minHeight: 36,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
});
