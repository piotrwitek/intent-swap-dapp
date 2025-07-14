import React, { createContext } from "react";
import type { AppState, AppAction } from "./AppProvider";

// Context

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);
