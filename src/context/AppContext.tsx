import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

// Types
export interface SwapOrder {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  price: string;
  status: "pending" | "completed" | "cancelled";
  timestamp: Date;
  slippage: string;
  fee: string;
}

interface AppState {
  orders: SwapOrder[];
  theme: "light" | "dark";
}

type AppAction =
  | { type: "ADD_ORDER"; payload: SwapOrder }
  | { type: "CANCEL_ORDER"; payload: string }
  | { type: "TOGGLE_THEME" }
  | { type: "LOAD_MORE_ORDERS"; payload: SwapOrder[] };

// Initial state
const initialState: AppState = {
  orders: [],
  theme: "dark",
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload
            ? { ...order, status: "cancelled" as const }
            : order
        ),
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "LOAD_MORE_ORDERS":
      return {
        ...state,
        orders: [...state.orders, ...action.payload],
      };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
