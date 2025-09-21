// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User | null) => void;
}

// App State Types
export interface AppState {
  isOnline: boolean;
  isInitialized: boolean;
  isDarkMode: boolean;
  language: string;
  setOnlineStatus: (status: boolean) => void;
  setInitialized: (status: boolean) => void;
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
}
