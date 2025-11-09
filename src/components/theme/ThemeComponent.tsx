import React, { useEffect, useRef, useState } from 'react';
import {
  localStorageThemeKey,
  ThemeContext,
  ThemeValues,
  useTheme,
} from '../../context/themeContext';
import { AboutPlaceContext, type AboutPlaceData } from '../../context/aboutContext';
import { apiService } from '../../services/api.service';

interface Props {
  children: React.ReactNode;
}

function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<ThemeValues>(useTheme().theme);
  const [aboutPlace, setAboutPlace] = useState<AboutPlaceData>({
    id: 1,
    facebook: null,
    instagram: null,
    email: null,
    phone: null,
    placeDescription: null,
    placeAddress: null,
    opennigHours: [],
  });
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;
    firstRender.current = false;
    apiService
      .getAboutInfo()
      .then(data => {
        setAboutPlace(data);
      })
      .catch();
  }, []);

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

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <AboutPlaceContext value={aboutPlace}>{props.children}</AboutPlaceContext>
    </ThemeContext>
  );
}

export default ThemeProvider;
