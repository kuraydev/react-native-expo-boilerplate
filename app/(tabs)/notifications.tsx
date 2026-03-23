import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../../src/components/ui/ThemedText";
import { useThemeColor } from "../../src/hooks/useThemeColor";
import type { INotification } from "../../src/types";

const TODAY_NOTIFICATIONS: INotification[] = [
  {
    id: "1",
    icon: "rocket",
    iconColor: "#4A6CF7",
    title: "Expo SDK 55 Ready",
    description:
      "This boilerplate runs on the latest Expo SDK 55 with React Native 0.83 and New Architecture.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    icon: "shield-checkmark",
    iconColor: "#10b981",
    title: "AI-Ready Setup",
    description:
      "CLAUDE.md, AGENTS.md, and .cursor/rules are configured — every AI assistant understands this codebase.",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: "3",
    icon: "alert-circle",
    iconColor: "#f59e0b",
    title: "Demo Content Notice",
    description:
      "All screens and mock data are for demonstration only. Replace them with your own content.",
    time: "3 hr ago",
    unread: false,
  },
];

const EARLIER_NOTIFICATIONS: INotification[] = [
  {
    id: "4",
    icon: "star",
    iconColor: "#f59e0b",
    title: "Zustand Configured",
    description:
      "State management with the slice pattern is wired up and ready to extend.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "5",
    icon: "git-merge",
    iconColor: "#8b5cf6",
    title: "Expo Router Active",
    description:
      "File-based routing with tab navigation is set up. Add screens by creating files in app/.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "6",
    icon: "chatbubble-ellipses",
    iconColor: "#0ea5e9",
    title: "i18n Ready",
    description:
      "Internationalization is configured with English and Spanish. Add more locales in src/i18n/locales/.",
    time: "3 days ago",
    unread: false,
  },
];

export default function NotificationsScreen() {
  const colors = useThemeColor();

  const renderNotification = (item: INotification) => (
    <View
      key={item.id}
      style={[
        styles.notifCard,
        item.unread && { backgroundColor: colors.tint + "07" },
      ]}
    >
      <View style={styles.notifAvatarWrap}>
        <View
          style={[
            styles.notifIconBadge,
            { backgroundColor: item.iconColor + "18" },
          ]}
        >
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={item.iconColor}
          />
        </View>
        {item.unread && (
          <View
            style={[
              styles.notifDot,
              { backgroundColor: colors.tint, borderColor: colors.background },
            ]}
          />
        )}
      </View>
      <View style={styles.notifBody}>
        <ThemedText variant="caption" style={styles.notifTitle}>
          {item.title}
        </ThemedText>
        <ThemedText variant="caption" secondary style={styles.notifDescription}>
          {item.description}
        </ThemedText>
        <ThemedText variant="caption" secondary style={styles.notifTime}>
          {item.time}
        </ThemedText>
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
          <View style={styles.headerRow}>
            <ThemedText variant="heading">Notifications</ThemedText>
            <TouchableOpacity
              style={[styles.clearBtn, { backgroundColor: colors.tint + "15" }]}
              activeOpacity={0.7}
            >
              <ThemedText
                variant="caption"
                style={[styles.clearBtnText, { color: colors.tint }]}
              >
                Mark all read
              </ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText variant="caption" secondary>
            You have 2 unread notifications
          </ThemedText>
        </View>

        <View style={styles.sectionBlock}>
          <ThemedText variant="caption" secondary style={styles.sectionTitle}>
            TODAY
          </ThemedText>
        </View>
        {TODAY_NOTIFICATIONS.map(renderNotification)}

        <View style={styles.sectionBlockSpaced}>
          <ThemedText variant="caption" secondary style={styles.sectionTitle}>
            EARLIER
          </ThemedText>
        </View>
        {EARLIER_NOTIFICATIONS.map(renderNotification)}
      </ScrollView>
    </SafeAreaView>
  );
}

const HP = 24;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 48 },

  header: { paddingHorizontal: HP, paddingTop: 20, paddingBottom: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    marginBottom: 2,
  },
  clearBtnText: { fontSize: 12, fontWeight: "600", letterSpacing: 0.2 },

  sectionBlock: { paddingHorizontal: HP, marginBottom: 12, marginTop: 4 },
  sectionBlockSpaced: {
    paddingHorizontal: HP,
    marginBottom: 12,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },

  notifCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: HP,
    paddingVertical: 14,
  },
  notifAvatarWrap: { position: "relative", marginRight: 14, marginTop: 2 },
  notifDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  notifBody: { flex: 1 },
  notifTitle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.1,
    marginBottom: 3,
  },
  notifDescription: { fontSize: 13, lineHeight: 19, letterSpacing: 0.05 },
  notifTime: { fontSize: 11, marginTop: 6, letterSpacing: 0.1 },
  notifIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});
