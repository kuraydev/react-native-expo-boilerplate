import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { ThemedText } from "../../src/components/ui/ThemedText";
import { useThemeColor } from "../../src/hooks/useThemeColor";
import type { ISettingsItem } from "../../src/types";

const GENERAL_SETTINGS: ISettingsItem[] = [
  {
    label: "Appearance",
    icon: "moon",
    iconColor: "#8b5cf6",
    value: "System",
    valueType: "text",
  },
  {
    label: "Language",
    icon: "language",
    iconColor: "#0ea5e9",
    value: "English",
    valueType: "text",
  },
  {
    label: "Notifications",
    icon: "notifications",
    iconColor: "#f59e0b",
    value: "On",
    valueType: "badge",
  },
];

const PRIVACY_SETTINGS: ISettingsItem[] = [
  { label: "Privacy & Security", icon: "lock-closed", iconColor: "#10b981" },
  { label: "Permissions", icon: "shield-checkmark", iconColor: "#4A6CF7" },
];

const DEVELOPER_SETTINGS: ISettingsItem[] = [
  { label: "Component Showcase", icon: "layers", iconColor: "#4A6CF7" },
  {
    label: "Debug Mode",
    icon: "bug",
    iconColor: "#f59e0b",
    value: "Off",
    valueType: "text",
  },
  {
    label: "Crash Reporting",
    icon: "alert-circle",
    iconColor: "#0ea5e9",
    value: "Enabled",
    valueType: "badge",
  },
];

const ABOUT_SETTINGS: ISettingsItem[] = [
  { label: "Rate the App", icon: "star", iconColor: "#f59e0b" },
  {
    label: "Open Source Licenses",
    icon: "document-text",
    iconColor: "#6b7894",
  },
  { label: "Terms & Privacy Policy", icon: "reader", iconColor: "#0ea5e9" },
];

export default function SettingsScreen() {
  const colors = useThemeColor();
  const appVersion = Constants.expoConfig?.version ?? "2.0.0";

  const renderSettingsRow = (item: ISettingsItem, isLast: boolean) => (
    <TouchableOpacity
      key={item.label}
      activeOpacity={0.6}
      style={[
        isLast ? styles.settingsRowLast : styles.settingsRow,
        !isLast && { borderBottomColor: colors.border },
      ]}
    >
      <View
        style={[
          styles.settingsIconWrap,
          { backgroundColor: item.iconColor + "15" },
        ]}
      >
        <Ionicons
          name={item.icon as keyof typeof Ionicons.glyphMap}
          size={18}
          color={item.iconColor}
        />
      </View>
      <ThemedText variant="caption" style={styles.settingsLabel}>
        {item.label}
      </ThemedText>
      {item.value && item.valueType === "badge" ? (
        <View
          style={[
            styles.settingsValueBadge,
            { backgroundColor: colors.tint + "14" },
          ]}
        >
          <ThemedText
            variant="caption"
            style={[styles.settingsValueBadgeText, { color: colors.tint }]}
          >
            {item.value}
          </ThemedText>
        </View>
      ) : null}
      {item.value && item.valueType === "text" ? (
        <ThemedText
          variant="caption"
          secondary
          style={styles.settingsValueText}
        >
          {item.value}
        </ThemedText>
      ) : null}
      <Ionicons
        name="chevron-forward"
        size={16}
        color={colors.icon}
        style={styles.settingsChevron}
      />
    </TouchableOpacity>
  );

  const renderSection = (title: string, items: ISettingsItem[]) => (
    <View key={title}>
      <View style={styles.sectionBlock}>
        <ThemedText variant="caption" secondary style={styles.sectionTitle}>
          {title}
        </ThemedText>
      </View>
      <View
        style={[
          styles.settingsList,
          { backgroundColor: colors.card, shadowColor: colors.shadow },
        ]}
      >
        {items.map((item, i) =>
          renderSettingsRow(item, i === items.length - 1),
        )}
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
        <View style={styles.header}>
          <ThemedText variant="heading">Settings</ThemedText>
          <ThemedText variant="caption" secondary>
            Manage your app preferences
          </ThemedText>
        </View>

        <View
          style={[
            styles.appCard,
            { backgroundColor: colors.card, shadowColor: colors.shadow },
          ]}
        >
          <View
            style={[
              styles.appIconWrap,
              { backgroundColor: colors.tint + "15" },
            ]}
          >
            <Ionicons name="rocket" size={28} color={colors.tint} />
          </View>
          <View style={styles.appCardContent}>
            <ThemedText variant="caption" style={styles.appName}>
              RN Expo Zustand Boilerplate
            </ThemedText>
            <ThemedText variant="caption" secondary style={styles.appVersion}>
              Version {appVersion} · Expo SDK 55
            </ThemedText>
          </View>
        </View>

        {renderSection("GENERAL", GENERAL_SETTINGS)}
        {renderSection("PRIVACY", PRIVACY_SETTINGS)}
        {renderSection("DEVELOPER", DEVELOPER_SETTINGS)}
        {renderSection("ABOUT", ABOUT_SETTINGS)}

        <View
          style={[
            styles.settingsList,
            styles.dangerSection,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.6} style={styles.dangerRow}>
            <View style={[styles.settingsIconWrap, styles.dangerIconWrap]}>
              <Ionicons name="trash" size={18} color="#f43f5e" />
            </View>
            <ThemedText variant="caption" style={styles.dangerLabel}>
              Clear Cache
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.dangerRowSeparated,
              { borderTopColor: colors.border },
            ]}
          >
            <View style={[styles.settingsIconWrap, styles.dangerIconWrap]}>
              <Ionicons name="log-out" size={18} color="#f43f5e" />
            </View>
            <ThemedText variant="caption" style={styles.dangerLabel}>
              Sign Out
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const HP = 24;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 48 },

  header: { paddingHorizontal: HP, paddingTop: 20, paddingBottom: 28 },

  appCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: HP,
    marginBottom: 32,
    padding: 16,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  appIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  appCardContent: { flex: 1 },
  appName: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.1,
    marginBottom: 3,
  },
  appVersion: { fontSize: 12, letterSpacing: 0.1 },

  sectionBlock: { paddingHorizontal: HP, marginBottom: 10 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  settingsList: {
    marginHorizontal: HP,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 28,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingsRowLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingsIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  settingsChevron: { opacity: 0.4 },
  settingsValueText: { fontSize: 13, marginRight: 8, letterSpacing: 0.1 },
  settingsValueBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 100,
    marginRight: 8,
  },
  settingsValueBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  dangerSection: { marginTop: 28 },
  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dangerRowSeparated: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  dangerIconWrap: { backgroundColor: "#f43f5e18" },
  dangerLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.1,
    color: "#f43f5e",
  },
});
