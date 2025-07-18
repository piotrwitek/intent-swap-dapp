import React from "react";
import type { ReactNode } from "react";
import { AppContext } from "./AppContext";
import { getChainInfoByChainId } from "@summer_fi/sdk-common";
import { sdkClient } from "../sdkClient";
import { supportedTokenSymbols } from "./supportedTokenSymbols";

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

export interface SupportedToken {
  symbol: string;
  iconSrc: string;
}

export interface AppState {
  orders: SwapOrder[];
  theme: "light" | "dark";
  orderType: "swap" | "limit";
  slippage: string;
  user: null | {
    address?: string;
  };
  supportedTokens: SupportedToken[];
  globalLoading: boolean;
  globalError: string | null;
  chainId: number;
}

export const AppActionType = {
  ADD_ORDER: "ADD_ORDER",
  CANCEL_ORDER: "CANCEL_ORDER",
  TOGGLE_THEME: "TOGGLE_THEME",
  SET_ORDER_TYPE: "SET_ORDER_TYPE",
  LOAD_MORE_ORDERS: "LOAD_MORE_ORDERS",
  SET_SLIPPAGE: "SET_SLIPPAGE",
  SET_USER: "SET_USER",
  SET_SUPPORTED_TOKENS: "SET_SUPPORTED_TOKENS",
  SET_GLOBAL_LOADING: "SET_GLOBAL_LOADING",
  SET_GLOBAL_ERROR: "SET_GLOBAL_ERROR",
  SET_CHAIN_ID: "SET_CHAIN_ID",
} as const;

export type AppAction =
  | { type: typeof AppActionType.ADD_ORDER; payload: SwapOrder }
  | { type: typeof AppActionType.CANCEL_ORDER; payload: string }
  | { type: typeof AppActionType.TOGGLE_THEME }
  | { type: typeof AppActionType.SET_ORDER_TYPE; payload: "swap" | "limit" }
  | { type: typeof AppActionType.LOAD_MORE_ORDERS; payload: SwapOrder[] }
  | { type: typeof AppActionType.SET_SLIPPAGE; payload: string }
  | { type: typeof AppActionType.SET_USER; payload: AppState["user"] }
  | {
      type: typeof AppActionType.SET_SUPPORTED_TOKENS;
      payload: SupportedToken[];
    }
  | { type: typeof AppActionType.SET_GLOBAL_LOADING; payload: boolean }
  | { type: typeof AppActionType.SET_GLOBAL_ERROR; payload: string | null }
  | { type: typeof AppActionType.SET_CHAIN_ID; payload: number };

// Initial state
const initialState: AppState = {
  orders: [],
  theme: "dark",
  orderType: "swap",
  slippage: "Auto",
  user: null,
  supportedTokens: [],
  globalLoading: false,
  globalError: null,
  chainId: 8453, // Default to Base
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AppActionType.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case AppActionType.CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload
            ? { ...order, status: "cancelled" as const }
            : order
        ),
      };
    case AppActionType.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case AppActionType.SET_ORDER_TYPE:
      return {
        ...state,
        orderType: action.payload,
      };
    case AppActionType.LOAD_MORE_ORDERS:
      return {
        ...state,
        orders: [...state.orders, ...action.payload],
      };
    case AppActionType.SET_SLIPPAGE:
      return {
        ...state,
        slippage: action.payload,
      };
    case AppActionType.SET_GLOBAL_LOADING:
      return {
        ...state,
        globalLoading: action.payload,
        globalError: null,
      };
    case AppActionType.SET_SUPPORTED_TOKENS:
      return {
        ...state,
        supportedTokens: action.payload,
        globalLoading: false,
        globalError: null,
      };
    case AppActionType.SET_GLOBAL_ERROR:
      return {
        ...state,
        globalLoading: false,
        globalError: action.payload,
      };
    case AppActionType.SET_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload,
      };
    default:
      return state;
  }
}

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
            parsed.orders = parsed.orders.map((order: SwapOrder) => ({
              ...order,
              timestamp: order.timestamp
                ? new Date(order.timestamp)
                : new Date(),
            }));
          }
          return { ...init, ...parsed };
        }
      } catch {
        console.error("Failed to load state from localStorage");
      }
      return init;
    }
  );

  // Persist state to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("intentswap-app-state", JSON.stringify(state));
  }, [state]);

  // Fetch supported tokens on mount
  React.useEffect(() => {
    const fetchTokens = async () => {
      dispatch({ type: AppActionType.SET_GLOBAL_LOADING, payload: true });

      try {
        const chainInfo = getChainInfoByChainId(state.chainId);

        const supportedTokensResults = await Promise.allSettled(
          supportedTokenSymbols.map(async (symbol) => {
            const chain = await sdkClient.chains.getChain({ chainInfo });
            const token = await chain.tokens.getTokenBySymbol({ symbol });
            return {
              symbol,
              iconSrc: token.icon,
            };
          })
        );
        const supportedTokens = supportedTokensResults
          .filter(
            (result): result is PromiseFulfilledResult<SupportedToken> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);

        dispatch({
          type: AppActionType.SET_SUPPORTED_TOKENS,
          payload: supportedTokens,
        });
      } catch (error) {
        console.error("Failed to fetch supported tokens:", error);
        dispatch({
          type: AppActionType.SET_GLOBAL_ERROR,
          payload:
            error instanceof Error
              ? error.message
              : "Failed to fetch supported tokens",
        });
      }
    };

    fetchTokens();
  }, [state.chainId]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
