import { ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../../src/components/ui/ThemedText";
import { useThemeColor } from "../../src/hooks/useThemeColor";

const CATEGORIES = [
  { label: "Design", icon: "color-palette", color: "#f59e0b" },
  { label: "Dev Tools", icon: "terminal", color: "#4A6CF7" },
  { label: "Libraries", icon: "library", color: "#10b981" },
  { label: "Components", icon: "layers", color: "#8b5cf6" },
  { label: "Navigation", icon: "navigate", color: "#0ea5e9" },
  { label: "State", icon: "git-branch", color: "#f43f5e" },
];

const TRENDING = [
  "Expo Router File-Based Routing",
  "Zustand Slice Pattern",
  "TypeScript Best Practices",
  "Theme & Dark Mode",
  "Custom Hooks Guide",
];

const RECENT = [
  "AsyncStorage setup",
  "Axios interceptors",
  "Localization i18n",
  "SafeAreaView usage",
];

export default function SearchScreen() {
  const colors = useThemeColor();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ThemedText variant="heading">Search</ThemedText>
          <ThemedText variant="caption" secondary>
            Explore docs, components & guides
          </ThemedText>
        </View>

        <View style={styles.searchBar}>
          <View
            style={[
              styles.searchInput,
              { backgroundColor: colors.card, shadowColor: colors.shadow },
            ]}
          >
            <View
              style={[
                styles.searchIconWrap,
                { backgroundColor: colors.tint + "15" },
              ]}
            >
              <Ionicons name="search" size={16} color={colors.tint} />
            </View>
            <ThemedText
              variant="caption"
              secondary
              style={styles.searchInputText}
            >
              Search anything…
            </ThemedText>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <ThemedText variant="body" style={styles.sectionTitle}>
            Browse Categories
          </ThemedText>
        </View>
        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <View
              key={cat.label}
              style={[
                styles.categoryChip,
                { backgroundColor: cat.color + "14" },
              ]}
            >
              <View
                style={[
                  styles.categoryIconWrap,
                  { backgroundColor: cat.color + "20" },
                ]}
              >
                <Ionicons
                  name={cat.icon as keyof typeof Ionicons.glyphMap}
                  size={14}
                  color={cat.color}
                />
              </View>
              <ThemedText
                variant="caption"
                style={[styles.categoryLabel, { color: cat.color }]}
              >
                {cat.label}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <ThemedText variant="body" style={styles.sectionTitle}>
            Trending
          </ThemedText>
        </View>
        <View
          style={[
            styles.trendingList,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          {TRENDING.map((term, i) => (
            <View
              key={term}
              style={[
                i === TRENDING.length - 1
                  ? styles.trendingRowLast
                  : styles.trendingRow,
                i !== TRENDING.length - 1 && {
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <ThemedText
                variant="caption"
                style={[styles.trendingRank, { color: colors.tint }]}
              >
                {i + 1}
              </ThemedText>
              <ThemedText variant="caption" style={styles.trendingText}>
                {term}
              </ThemedText>
              <View
                style={[
                  styles.trendingArrow,
                  { backgroundColor: colors.tint + "10" },
                ]}
              >
                <Ionicons name="arrow-forward" size={14} color={colors.tint} />
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.sectionBlock, styles.recentSection]}>
          <ThemedText variant="body" style={styles.sectionTitle}>
            Recent Searches
          </ThemedText>
        </View>
        <View>
          {RECENT.map((term) => (
            <View
              key={term}
              style={[styles.recentRow, { borderBottomColor: colors.border }]}
            >
              <View
                style={[
                  styles.recentIconWrap,
                  { backgroundColor: colors.textSecondary + "18" },
                ]}
              >
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={colors.textSecondary}
                />
              </View>
              <ThemedText variant="caption" style={styles.recentText}>
                {term}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const HP = 24;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 48 },

  header: { paddingHorizontal: HP, paddingTop: 20, paddingBottom: 20 },

  searchBar: { paddingHorizontal: HP, marginBottom: 28 },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  searchIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 12,
    letterSpacing: 0.1,
  },

  sectionBlock: { paddingHorizontal: HP, marginBottom: 14, marginTop: 4 },
  recentSection: { marginTop: 28 },
  sectionTitle: { fontWeight: "700", letterSpacing: 0.2 },

  categoriesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: HP,
    gap: 12,
    marginBottom: 32,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 8,
  },
  categoryIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryLabel: { fontSize: 13, fontWeight: "600", letterSpacing: 0.1 },

  trendingList: {
    marginHorizontal: HP,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
    overflow: "hidden",
  },
  trendingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  trendingRowLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  trendingRank: { width: 24, fontSize: 13, fontWeight: "700", marginRight: 12 },
  trendingText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  trendingArrow: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: HP,
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  recentIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  recentText: { flex: 1, fontSize: 13, letterSpacing: 0.1 },
});
