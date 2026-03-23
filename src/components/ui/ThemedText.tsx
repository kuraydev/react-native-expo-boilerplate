import { Text, TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "../../hooks/useThemeColor";
import { Layout } from "../../constants/Layout";

type ThemedTextVariant =
  | "title"
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "link";

interface ThemedTextProps extends TextProps {
  variant?: ThemedTextVariant;
  secondary?: boolean;
}

export function ThemedText({
  style,
  variant = "body",
  secondary = false,
  ...rest
}: ThemedTextProps) {
  const colors = useThemeColor();
  const color = secondary ? colors.textSecondary : colors.text;

  return <Text style={[{ color }, styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: Layout.fontSize.title,
    fontWeight: "700",
    letterSpacing: 0.35,
  },
  heading: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
  },
  subheading: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "600",
  },
  body: {
    fontSize: Layout.fontSize.md,
    lineHeight: 24,
  },
  caption: {
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  link: {
    fontSize: Layout.fontSize.md,
    lineHeight: 24,
    textDecorationLine: "underline",
  },
});
