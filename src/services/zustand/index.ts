import { create } from "zustand";
import { createAppSlice } from "./slices/appSlice";
import { createUserSlice } from "./slices/userSlice";
import { AppState, UserState } from "./types";

type StoreState = AppState & UserState;

export const useStore = create<StoreState>()((...args) => ({
  ...createAppSlice(...args),
  ...createUserSlice(...args),
}));

// Convenience hooks for specific slices
export const useApp = () => {
  const {
    isOnline,
    isInitialized,
    isDarkMode,
    language,
    setOnlineStatus,
    setInitialized,
    toggleTheme,
    setLanguage,
  } = useStore();

  return {
    isOnline,
    isInitialized,
    isDarkMode,
    language,
    setOnlineStatus,
    setInitialized,
    toggleTheme,
    setLanguage,
  };
};

export const useUser = () => {
  const { user, isLoading, updateUser, setUser } = useStore();

  return {
    user,
    isLoading,
    updateUser,
    setUser,
  };
};
