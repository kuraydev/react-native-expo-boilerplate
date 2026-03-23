import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../../src/services/zustand";
import { Colors } from "../../src/constants/Colors";

type TabIconName = keyof typeof Ionicons.glyphMap;

const TAB_CONFIG: Record<
  string,
  { focused: TabIconName; unfocused: TabIconName; label: string }
> = {
  index: { focused: "home", unfocused: "home-outline", label: "Home" },
  search: { focused: "search", unfocused: "search-outline", label: "Search" },
  notifications: {
    focused: "notifications",
    unfocused: "notifications-outline",
    label: "Notifications",
  },
  settings: {
    focused: "settings",
    unfocused: "settings-outline",
    label: "Settings",
  },
};

export default function TabLayout() {
  const { isDarkMode } = useApp();
  const colors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={({ route }) => {
        const config = TAB_CONFIG[route.name] ?? TAB_CONFIG.index;

        return {
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? config.focused : config.unfocused;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabel: config.label,
          tabBarStyle: {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.tabBarBorder,
          },
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.icon,
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="notifications" options={{ title: "Notifications" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
