import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.tsx";
import { Providers } from "./providers";
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <AppProvider>
        <App />
      </AppProvider>
    </Providers>
  </StrictMode>
);
