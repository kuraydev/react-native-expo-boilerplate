import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../../src/components/ui/ThemedText";
import { useThemeColor } from "../../src/hooks/useThemeColor";
import { CardItem } from "../../src/screens/home/components/CardItem";
import {
  FeatureCards,
  UtilityItems,
  StackItems,
} from "../../src/screens/home/mock/MockData";
import type { IUtilityItem, IStackItem } from "../../src/types";

const TAG_COLORS: Record<string, string> = {
  hook: "#8b5cf6",
  service: "#0ea5e9",
  component: "#10b981",
  config: "#f59e0b",
};

export default function HomeScreen() {
  const colors = useThemeColor();

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTitleBlock}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: colors.tint + "15" }]}>
            <ThemedText
              variant="caption"
              style={[styles.badgeText, { color: colors.tint }]}
            >
              Expo SDK 55 · TypeScript
            </ThemedText>
          </View>
        </View>
        <ThemedText variant="title">Boilerplate</ThemedText>
        <ThemedText variant="heading" style={{ color: colors.tint }}>
          Explorer
        </ThemedText>
        <ThemedText variant="caption" secondary style={styles.subtitleText}>
          {"Everything that's wired up and ready to go"}
        </ThemedText>
      </View>
      <View style={styles.headerIcon}>
        <View
          style={[
            styles.headerIconRing,
            { backgroundColor: colors.tint + "12" },
          ]}
        >
          <Ionicons name="rocket" size={32} color={colors.tint} />
        </View>
      </View>
    </View>
  );

  const renderSectionLabel = (title: string, subtitle?: string) => (
    <View style={styles.sectionLabelBlock}>
      <ThemedText variant="subheading">{title}</ThemedText>
      {subtitle ? (
        <ThemedText variant="caption" secondary style={styles.sectionSubtitle}>
          {subtitle}
        </ThemedText>
      ) : null}
    </View>
  );

  const renderFeatureCards = () => (
    <View style={styles.featureSection}>
      {renderSectionLabel("Features")}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FeatureCards}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.featureList}
        renderItem={({ item }) => <CardItem data={item} />}
      />
    </View>
  );

  const renderUtilityCard = (item: IUtilityItem) => {
    const tagColor = TAG_COLORS[item.tag] ?? colors.tint;
    return (
      <View
        key={item.title}
        style={[
          styles.utilityCard,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        <View
          style={[styles.utilityIconWrap, { backgroundColor: tagColor + "15" }]}
        >
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={tagColor}
          />
        </View>
        <View style={styles.utilityCardContent}>
          <View style={styles.utilityTitleRow}>
            <ThemedText variant="caption" style={styles.utilityTitle}>
              {item.title}
            </ThemedText>
            <View
              style={[styles.utilityTag, { backgroundColor: tagColor + "15" }]}
            >
              <ThemedText
                variant="caption"
                style={[styles.utilityTagText, { color: tagColor }]}
              >
                {item.tag}
              </ThemedText>
            </View>
          </View>
          <ThemedText
            variant="caption"
            secondary
            style={styles.utilityDescription}
          >
            {item.description}
          </ThemedText>
        </View>
      </View>
    );
  };

  const renderUtilities = () => (
    <View style={styles.utilitiesSection}>
      {renderSectionLabel("Utilities", "Built-in helpers ready to use")}
      <View style={styles.utilitiesGrid}>
        {UtilityItems.map(renderUtilityCard)}
      </View>
    </View>
  );

  const renderStackRow = (item: IStackItem, index: number) => {
    const isLast = index === StackItems.length - 1;
    return (
      <View
        key={item.name}
        style={[
          isLast ? styles.stackRowLast : styles.stackRow,
          !isLast && { borderBottomColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.stackIconWrap,
            { backgroundColor: colors.tint + "13" },
          ]}
        >
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={16}
            color={colors.tint}
          />
        </View>
        <ThemedText variant="caption" style={styles.stackName}>
          {item.name}
        </ThemedText>
        <View
          style={[styles.versionBadge, { backgroundColor: colors.tint + "12" }]}
        >
          <ThemedText
            variant="caption"
            style={[styles.versionText, { color: colors.tint }]}
          >
            {item.version}
          </ThemedText>
        </View>
      </View>
    );
  };

  const renderTechStack = () => (
    <View style={styles.stackSection}>
      {renderSectionLabel("Tech Stack")}
      <View
        style={[
          styles.stackList,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        {StackItems.map((item, index) => renderStackRow(item, index))}
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderFeatureCards()}
        {renderUtilities()}
        {renderTechStack()}
      </ScrollView>
    </SafeAreaView>
  );
}

const HP = 24;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 24 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HP,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerTitleBlock: { flex: 1 },
  badgeRow: { flexDirection: "row", marginBottom: 14 },
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 100 },
  badgeText: { fontSize: 11, fontWeight: "700", letterSpacing: 0.3 },
  subtitleText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0.1,
  },
  headerIcon: { marginLeft: 20 },
  headerIconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionLabelBlock: { paddingHorizontal: HP, marginBottom: 16, gap: 3 },
  sectionSubtitle: { fontSize: 12, letterSpacing: 0.1 },

  featureSection: { marginBottom: 36 },
  featureList: { paddingLeft: HP, paddingRight: HP - 8 },

  utilitiesSection: { marginBottom: 36 },
  utilitiesGrid: { paddingHorizontal: HP, gap: 12 },
  utilityCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  utilityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 1,
    flexShrink: 0,
  },
  utilityCardContent: { flex: 1 },
  utilityTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
    flexWrap: "wrap",
  },
  utilityTitle: { fontSize: 14, letterSpacing: 0.1, fontWeight: "600" },
  utilityTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 100 },
  utilityTagText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  utilityDescription: { fontSize: 12, lineHeight: 18, letterSpacing: 0.05 },

  stackSection: { marginBottom: 8 },
  stackList: {
    marginHorizontal: HP,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
    overflow: "hidden",
  },
  stackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stackRowLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  stackIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  stackName: { flex: 1, fontSize: 13, fontWeight: "500", letterSpacing: 0.1 },
  versionBadge: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 100 },
  versionText: { fontSize: 11, fontWeight: "600" },
});
