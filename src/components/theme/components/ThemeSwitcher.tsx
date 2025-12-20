import { MdWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';
import { ThemeValues, useTheme } from '../../../context/themeContext';

interface Props {
  stylePosition?: {
    position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky';
    top?: string;
    right?: string;
    left?: string;
    bottom?: string;
  };
  iconSize?: number;
}
function ThemeSwitcher({ stylePosition = {}, iconSize = 32 }: Props) {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === ThemeValues.LIGHT;
  return (
    <>
      <button
        type="button"
        style={{
          backgroundColor: 'inherit',
          borderWidth: 0,
          borderRadius: '50%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          ...stylePosition,
        }}
        onClick={toggleTheme}
        aria-label="Перемикач між світлою та темною темами"
      >
        {isLight ? (
          <FaMoon color="black" size={iconSize} />
        ) : (
          <MdWbSunny color="white" size={iconSize} />
        )}
      </button>
    </>
  );
}

export default ThemeSwitcher;
