import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../../../components/ui/ThemedText";
import { useThemeColor } from "../../../hooks/useThemeColor";
import type { IFeatureCard } from "../../../types";

interface CardItemProps {
  data: IFeatureCard;
}

export function CardItem({ data }: CardItemProps) {
  const colors = useThemeColor();
  const { icon, title, description } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.container,
        { backgroundColor: colors.card, shadowColor: colors.shadow },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: colors.tint + "14" }]}
      >
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color={colors.tint}
        />
      </View>
      <ThemedText variant="caption" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText variant="caption" secondary style={styles.description}>
        {description}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 190,
    padding: 18,
    marginRight: 14,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontWeight: "600",
    marginBottom: 7,
    letterSpacing: 0.1,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.05,
  },
});
