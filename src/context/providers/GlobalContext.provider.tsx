import ThemeProvider from '../../components/theme/ThemeComponent';
import AboutPlaceProvider from './AboutPlace.provider';

interface Props {
  children: React.ReactNode;
}

function GlobalContextProvider(props: Props) {
  return (
    <ThemeProvider>
      <AboutPlaceProvider>{props.children}</AboutPlaceProvider>
    </ThemeProvider>
  );
}
export default GlobalContextProvider;
