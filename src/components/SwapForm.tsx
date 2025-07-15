import { useState } from "react";
import { ArrowDownUp, Settings } from "lucide-react";
import { useApp } from "../context/useApp";
import type { SwapOrder } from "../context/AppProvider";
import { AppActionType } from "../context/AppProvider";
import { formatNumberDisplay } from "../utils/formatting";

export default function SwapForm() {
  const { state, dispatch } = useApp();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Decimal precision for inputs
  const [fromDecimals] = useState(18);

  // Use global slippage from context
  const slippage = state.slippage;
  const setSlippageGlobal = (value: string) =>
    dispatch({ type: AppActionType.SET_SLIPPAGE, payload: value });

  // Get supported tokens from global state
  const supportedTokens =
    state.supportedTokens.length > 0 ? state.supportedTokens : [];

  // Mock exchange rate calculation
  const calculateToAmount = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return "";
    const rate = fromToken === "ETH" ? 2400 : fromToken === "BTC" ? 42000 : 1;
    const toRate = toToken === "ETH" ? 2400 : toToken === "BTC" ? 42000 : 1;
    // Use toFixed for precision, then remove trailing zeros and dot if needed
    return ((Number(amount) * rate) / toRate).toString();
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const swapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!fromAmount || !toAmount) return;

    const newOrder: SwapOrder = {
      id: `order_${Date.now()}`,
      fromToken,
      toToken,
      fromAmount,
      toAmount,
      price: (Number(toAmount) / Number(fromAmount)).toFixed(6),
      status: "pending",
      timestamp: new Date(),
      slippage,
      fee: (Number(fromAmount) * 0.003).toString(), // 0.3% fee
    };

    dispatch({ type: AppActionType.ADD_ORDER, payload: newOrder });

    // Reset form
    setFromAmount("");
    setToAmount("");
  };

  // Show loading state while tokens are being fetched
  if (state.globalLoading) {
    return (
      <div className="max-w-md mx-auto">
        <div
          className={`rounded-2xl p-6 shadow-xl backdrop-blur-md border transition-colors ${
            state.theme === "dark"
              ? "bg-gray-800/50 border-purple-500/20"
              : "bg-white/70 border-purple-200"
          }`}
        >
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p
              className={`text-sm ${
                state.theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading trading tokens...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div
        className={`rounded-2xl p-6 shadow-xl backdrop-blur-md border transition-colors ${
          state.theme === "dark"
            ? "bg-gray-800/50 border-purple-500/20"
            : "bg-white/70 border-purple-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2
              className={`text-xl font-bold ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {/* Order Type Dropdown */}
              <div className="flex items-center space-x-3">
                <select
                  value={state.orderType}
                  onChange={(e) =>
                    dispatch({
                      type: AppActionType.SET_ORDER_TYPE,
                      payload: e.target.value as "swap" | "limit",
                    })
                  }
                  className={`bg-transparent border-none text-xl font-bold focus:outline-none cursor-pointer transition-colors rounded-lg px-2 py-1
                  ${
                    state.theme === "dark"
                      ? "text-pink-400 hover:bg-purple-900/40"
                      : "text-purple-700 hover:bg-purple-100"
                  }`}
                  aria-label="Order type"
                >
                  <option value="swap">Swap</option>
                  <option value="limit">Limit</option>
                </select>
              </div>
            </h2>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${
              state.theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              state.theme === "dark"
                ? "bg-gray-700/50 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="space-y-3">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Slippage Tolerance %
                </label>
                <div className="flex space-x-2 items-center">
                  {["Auto", "0.1", "0.5", "1.0"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippageGlobal(value)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        slippage === value
                          ? "bg-[var(--color-primary-pink)] text-white"
                          : state.theme === "dark"
                          ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {value === "Auto" ? value : `${value}`}
                    </button>
                  ))}
                  {/* Custom Slippage Input */}
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Custom"
                    value={
                      !["Auto", "0.1", "0.5", "1.0"].includes(slippage) &&
                      slippage !== ""
                        ? slippage
                        : ""
                    }
                    onChange={(e) => {
                      let val = e.target.value;
                      // Only allow numbers and at most one dot
                      if (!/^\d*\.?\d*$/.test(val)) return;
                      // Prevent more than 2 decimals
                      if (val.includes(".")) {
                        const [intPart, decPart] = val.split(".");
                        if (decPart && decPart.length > 2) {
                          val = intPart + "." + decPart.slice(0, 2);
                        }
                      }
                      // Only allow 0-100
                      if (
                        val === "" ||
                        (!isNaN(Number(val)) &&
                          Number(val) >= 0 &&
                          Number(val) <= 100)
                      ) {
                        setSlippageGlobal(val);
                      }
                    }}
                    className={`w-20 px-3 py-1 rounded-lg text-sm border-none focus:outline-none transition-colors text-right
                      ${
                        state.theme === "dark"
                          ? "bg-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-500"
                          : "bg-gray-200 text-gray-700 placeholder-gray-400 focus:bg-gray-300"
                      }
                    `}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* From Token */}
        <div
          className={`rounded-xl p-4 border transition-colors ${
            state.theme === "dark"
              ? "bg-gray-700/30 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-sm font-medium ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              From
            </span>
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm ${
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Balance: 10.5
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className={`flex-shrink-0 bg-transparent border-none text-lg font-semibold focus:outline-none ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {supportedTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {typeof token.icon === "string" ? token.icon : ""}{" "}
                  {token.symbol}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="fromAmount"
              value={fromAmount}
              onChange={(e) => {
                let val = e.target.value;
                // Prevent more than fromDecimals decimals
                if (val.includes(".")) {
                  const [intPart, decPart] = val.split(".");
                  if (decPart && decPart.length > fromDecimals) {
                    val = intPart + "." + decPart.slice(0, fromDecimals);
                  }
                }
                // Allow input to start with '.' by prepending '0'
                if (val.startsWith(".")) {
                  val = "0" + val;
                }
                // Prevent less than zero
                if (val === "" || (!isNaN(Number(val)) && Number(val) >= 0)) {
                  handleFromAmountChange(val);
                }
              }}
              placeholder="0.0"
              className={`flex-1 bg-transparent text-xl font-semibold text-right focus:outline-none appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                ${
                  state.theme === "dark"
                    ? "text-white placeholder-gray-500"
                    : "text-gray-900 placeholder-gray-400"
                }
              `}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-3 z-10 relative">
          <button
            onClick={swapTokens}
            className={`p-2 rounded-xl border-1 transition-all hover:scale-110 ${
              state.theme === "dark"
                ? "bg-gray-700/50 border-gray-600 text-[var(--color-primary-pink)] hover:border-[var(--color-primary-pink)]"
                : "bg-white border-gray-200 text-[var(--color-primary-pink)] hover:border-[var(--color-primary-pink)]"
            }`}
          >
            <ArrowDownUp className="w-5 h-5" />
          </button>
        </div>

        {/* To Token */}
        <div
          className={`rounded-xl p-4 border transition-colors ${
            state.theme === "dark"
              ? "bg-gray-700/30 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-sm font-medium ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              To
            </span>
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm ${
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Balance: 245.2
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className={`flex-shrink-0 bg-transparent border-none text-lg font-semibold focus:outline-none ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {supportedTokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {typeof token.icon === "string" ? token.icon : ""}{" "}
                  {token.symbol}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="toAmount"
              value={formatNumberDisplay(toAmount, 6)}
              readOnly
              placeholder="0.0"
              className={`flex-1 bg-transparent text-xl font-semibold text-right focus:outline-none ${
                state.theme === "dark"
                  ? "text-white placeholder-gray-500"
                  : "text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Price Info */}
        {fromAmount && toAmount && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              state.theme === "dark" ? "bg-gray-700/20" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between text-sm">
              <span
                className={
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }
              >
                Rate
              </span>
              <span
                className={
                  state.theme === "dark" ? "text-white" : "text-gray-900"
                }
              >
                1 {fromToken} ={" "}
                {formatNumberDisplay(Number(toAmount) / Number(fromAmount))}{" "}
                {toToken}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span
                className={
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }
              >
                Fee
              </span>
              <span
                className={
                  state.theme === "dark" ? "text-white" : "text-gray-900"
                }
              >
                FREE
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span
                className={
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }
              >
                Network costs (est.)
              </span>
              <span
                className={
                  state.theme === "dark" ? "text-white" : "text-gray-900"
                }
              >
                {formatNumberDisplay(Number(fromAmount) * 0.001)} {fromToken}
              </span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!fromAmount || !toAmount}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            fromAmount && toAmount
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500 shadow-lg"
              : "bg-gray-400"
          }`}
        >
          {fromAmount && toAmount ? "⚡ Execute Swap" : "Enter Amount"}
        </button>
      </div>
    </div>
  );
}
