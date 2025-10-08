import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App.tsx';
import TimerOverlay from './components/timerOverlay/TimerOverlay.tsx';
import ThemeProvider from './components/theme/ThemeComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const openDate = new Date(2025, 11, 1, 8, 0, 0);
createRoot(document.getElementById('timer-overlay-root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TimerOverlay timeTo={openDate} />
    </ThemeProvider>
  </StrictMode>,
);
