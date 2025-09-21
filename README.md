# React Native Expo Zustand Boilerplate

A modern, feature-rich boilerplate for React Native applications using Expo, TypeScript, and Zustand for state management. This boilerplate provides a solid foundation for building scalable mobile applications with best practices and commonly used features.

## 🌟 Features

- 📱 **Expo SDK** - Latest version for rapid development
- 🎨 **TypeScript** - For type safety and better developer experience
- 🔄 **Zustand** - Simple and scalable state management
- 🌍 **i18n** - Internationalization support (English & Spanish included)
- 🎯 **React Navigation** - Tab and Stack navigation preconfigured
- 🌓 **Dark Mode** - Full dark mode support with persistence
- 💫 **Reanimated** - For smooth animations
- 🔤 **Vector Icons** - Ready to use icon set
- 🔌 **Axios** - Configured HTTP client
- 💾 **AsyncStorage** - Persistent storage setup
- 🎨 **Clean Architecture** - Well-organized project structure
- 🔍 **Code Quality Tools**:
    - ESLint for code linting
    - Prettier for code formatting
    - Husky for Git hooks
    - commitlint for commit message linting

## 📱 Screenshots

[Add your screenshots here]

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-native-expo-zustand-boilerplate.git
```

2. Install dependencies:

```bash
cd react-native-expo-zustand-boilerplate
npm install
```

3. Start the development server:

```bash
npm start
```

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/
│   ├── api/       # API services
│   └── zustand/   # State management
├── hooks/         # Custom hooks
├── utils/         # Utility functions
├── i18n/          # Internationalization
└── assets/        # Images, fonts, etc.
```

## 🛠 State Management

This boilerplate uses Zustand for state management. The store is organized into slices:

- **App Slice**: Handles app-wide state (theme, language, online status)
- **User Slice**: Manages user-related state

Example usage:

```typescript
import { useApp, useUser } from "@/services/zustand";

// In your component
const { isDarkMode, toggleTheme } = useApp();
const { user, updateUser } = useUser();
```

## 🌍 Internationalization

Supports multiple languages using i18next. Easy to add new languages and translations.

```typescript
import { useTranslation } from "react-i18next";

// In your component
const { t } = useTranslation();
console.log(t("home.welcome"));
```

## 🎨 Theming

Includes a complete dark mode implementation that persists across app launches:

- Consistent theme across all screens
- Themed navigation elements
- Automatic persistence
- Easy to customize colors

## 📱 Navigation

Uses React Navigation with a pre-configured stack and tab navigation structure:

- Bottom tab navigation
- Stack navigation for additional screens
- Typed navigation using TypeScript

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the Android app
- `npm run ios` - Start the iOS app
- `npm run web` - Start the web app
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 💻 Development Tools

### Code Quality

- **ESLint**: JavaScript and TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality
- **commitlint**: Lint commit messages

### Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

## 📦 Dependencies

- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/native-stack
- zustand
- i18next
- react-i18next
- @react-native-async-storage/async-storage
- axios
- react-native-reanimated
- expo-splash-screen

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
