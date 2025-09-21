import { StateCreator } from "zustand";
import { UserState, User } from "../types";

const USER_STORAGE_KEY = "@user_data";

export const createUserSlice: StateCreator<UserState> = (set) => ({
  user: null,
  isLoading: false,

  updateUser: async (userData: Partial<User>) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = {
        ...state.user,
        ...userData,
      };

      // Store updated user in AsyncStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

      return {
        ...state,
        user: updatedUser,
      };
    });
  },

  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    set({ user });
  },
});
