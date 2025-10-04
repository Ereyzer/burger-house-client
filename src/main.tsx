import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/colors.css";
import App from "./App.tsx";
import TimerOverlay from "./components/timerOverlay/TimerOverlay.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

createRoot(document.getElementById("timer-overlay-root")!).render(
  <StrictMode>
    <TimerOverlay />
  </StrictMode>
);
