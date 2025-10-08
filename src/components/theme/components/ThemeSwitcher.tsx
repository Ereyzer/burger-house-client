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
}
function ThemeSwitcher(props: Props) {
  const { theme, toggleTheme } = useTheme();

  const iconSize = 32;
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
          ...(props.stylePosition ?? {}),
        }}
        onClick={toggleTheme}
        aria-label="Toggle dark and light theme"
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
