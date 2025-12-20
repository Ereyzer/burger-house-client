import { createContext, use } from 'react';

export const ThemeValues = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
export const localStorageThemeKey = 'theme-mode';

export type ThemeValues = (typeof ThemeValues)[keyof typeof ThemeValues];

interface ThemeContextType {
  theme: ThemeValues;
  toggleTheme: () => void;
}
const getInitialTheme = () => {
  // if set theme before
  const localStorageTheme = localStorage.getItem(localStorageThemeKey) as ThemeValues | null;

  if (localStorageTheme) {
    return localStorageTheme;
  }

  // if theme dark on device
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return ThemeValues.DARK;
  }
  return ThemeValues.LIGHT;
};

const defaultThemeContext: ThemeContextType = {
  theme: getInitialTheme(),
  toggleTheme: () => {
    console.error('toggleTheme function must be used within ThemeProvider');
  },
};
export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useTheme = () => use(ThemeContext);
