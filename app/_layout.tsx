import { useEffect, useCallback, useRef } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "../src/services/zustand";
import { Colors } from "../src/constants/Colors";
import "../src/i18n";

SplashScreen.preventAutoHideAsync();

const THEME_STORAGE_KEY = "@theme_mode";
const LANGUAGE_STORAGE_KEY = "@language";

export default function RootLayout() {
  const { isDarkMode, setInitialized, setLanguage, toggleTheme } = useApp();
  const hydrated = useRef(false);

  const [fontsLoaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    async function hydrate() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          const isDark = JSON.parse(savedTheme);
          if (isDark !== isDarkMode) {
            toggleTheme();
          }
        }

        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Error loading initial state:", error);
      } finally {
        setInitialized(true);
      }
    }

    hydrate();
  }, [isDarkMode, setInitialized, setLanguage, toggleTheme]);

  const onReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!fontsLoaded) {
    return null;
  }

  const colors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </>
  );
}
