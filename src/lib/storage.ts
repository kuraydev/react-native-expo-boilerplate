/**
 * App-wide key-value storage backed by MMKV (synchronous, fast).
 * Use this for non-sensitive cache/prefs. Secrets go to expo-secure-store.
 * MMKV is a native module: requires a dev build, not Expo Go.
 */

import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const storage = createMMKV();

/** zustand `persist` adapter. */
export const mmkvStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: (name) => storage.getString(name) ?? null,
  removeItem: (name) => storage.remove(name),
};
