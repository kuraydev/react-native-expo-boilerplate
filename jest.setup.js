jest.mock('react-native-mmkv', () => {
  const map = new Map();
  return {
    createMMKV: () => ({
      set: (key, value) => map.set(key, value),
      getString: (key) => map.get(key),
      remove: (key) => map.delete(key),
    }),
  };
});
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
