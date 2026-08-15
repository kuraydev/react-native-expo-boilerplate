/**
 * Example zustand store: client-only state, persisted via MMKV.
 * Server data does NOT belong here — use TanStack Query for that.
 * Sensitive values (tokens) belong in expo-secure-store, not MMKV.
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from '@/lib/storage';

interface SettingsState {
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      hapticsEnabled: true,
      setHapticsEnabled: (enabled) => set({ hapticsEnabled: enabled }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
