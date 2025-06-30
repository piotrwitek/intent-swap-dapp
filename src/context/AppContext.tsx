import React, { createContext, useReducer, useEffect } from "react";
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
  orderType: "swap" | "limit";
  slippage: string;
}

type AppAction =
  | { type: "ADD_ORDER"; payload: SwapOrder }
  | { type: "CANCEL_ORDER"; payload: string }
  | { type: "TOGGLE_THEME" }
  | { type: "SET_ORDER_TYPE"; payload: "swap" | "limit" }
  | { type: "LOAD_MORE_ORDERS"; payload: SwapOrder[] }
  | { type: "SET_SLIPPAGE"; payload: string };

// Initial state
const initialState: AppState = {
  orders: [],
  theme: "dark",
  orderType: "swap",
  slippage: "Auto",
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
    case "SET_ORDER_TYPE":
      return {
        ...state,
        orderType: action.payload,
      };
    case "LOAD_MORE_ORDERS":
      return {
        ...state,
        orders: [...state.orders, ...action.payload],
      };
    case "SET_SLIPPAGE":
      return {
        ...state,
        slippage: action.payload,
      };
    default:
      return state;
  }
}

// Context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  // Load state from localStorage on mount
  const [state, dispatch] = React.useReducer(
    appReducer,
    initialState,
    (init) => {
      try {
        const stored = localStorage.getItem("intentswap-app-state");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects for orders
          if (parsed.orders) {
            parsed.orders = parsed.orders.map((order: any) => ({
              ...order,
              timestamp: order.timestamp
                ? new Date(order.timestamp)
                : new Date(),
            }));
          }
          return { ...init, ...parsed };
        }
      } catch {}
      return init;
    }
  );

  // Persist state to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("intentswap-app-state", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
