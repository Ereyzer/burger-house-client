import React, { useEffect, useState } from 'react';
import {
  localStorageThemeKey,
  ThemeContext,
  ThemeValues,
  useTheme,
} from '../../context/themeContext';

interface Props {
  children: React.ReactNode;
}

function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<ThemeValues>(useTheme().theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === ThemeValues.LIGHT) {
        localStorage.setItem(localStorageThemeKey, ThemeValues.DARK);
        return ThemeValues.DARK;
      } else {
        localStorage.setItem(localStorageThemeKey, ThemeValues.LIGHT);
        return ThemeValues.LIGHT;
      }
    });
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{props.children}</ThemeContext>;
}

export default ThemeProvider;
