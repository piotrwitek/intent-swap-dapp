import { useState, useEffect } from "react";
import { ArrowDownUp, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { useApp } from "../context/useApp";
import type { SwapOrder } from "../context/AppProvider";
import { AppActionType } from "../context/AppProvider";
import { formatNumberDisplay } from "../utils/formatting";
import Dropdown from "./Dropdown";
import CollapsiblePanel from "./CollapsiblePanel";
import { useUser } from "@account-kit/react";

type SwapFlowState = "creatingSwap" | "confirmingQuote" | "sendingOrder";

interface IntentQuoteData {
  fromAmount: string;
  toAmount: string;
  fromToken: string;
  toToken: string;
  rate: string;
  fee: string;
  networkCost: string;
  slippage: string;
  priceImpact?: string;
  minimumReceived: string;
  executionTime: string;
  rawQuote: unknown; // The actual SDK quote object
}

export default function SwapForm() {
  const { state, dispatch } = useApp();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const user = useUser();

  // State machine for swap flow
  const [swapFlowState, setSwapFlowState] =
    useState<SwapFlowState>("creatingSwap");
  const [quoteData, setQuoteData] = useState<IntentQuoteData | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [showQuotePanel, setShowQuotePanel] = useState(false);

  // Reset to creatingSwap state when inputs change during quote confirmation
  useEffect(() => {
    if (swapFlowState === "confirmingQuote") {
      setSwapFlowState("creatingSwap");
      setShowQuotePanel(false);
      setQuoteData(null);
      setQuoteError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromToken, toToken, fromAmount, state.orderType]);

  // Decimal precision for inputs
  const [fromDecimals] = useState(18);

  // Use global slippage from context
  const slippage = state.slippage;
  const setSlippageGlobal = (value: string) =>
    dispatch({ type: AppActionType.SET_SLIPPAGE, payload: value });

  // Get supported tokens from global state
  const supportedTokens =
    state.supportedTokens.length > 0 ? state.supportedTokens : [];

  // Convert supported tokens to dropdown options
  const tokenOptions = supportedTokens.map((token) => ({
    value: token.symbol,
    label: token.symbol,
    iconSrc: token.iconSrc,
  }));

  // Order type options
  const orderTypeOptions = [
    { value: "swap", label: "Swap", icon: "⚡" },
    { value: "limit", label: "Limit", icon: "🎯" },
  ];

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

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return;

    if (swapFlowState === "creatingSwap") {
      // First click: Get quote and show confirmation
      setSwapFlowState("confirmingQuote");
      setQuoteError(null);
      setShowQuotePanel(true);

      try {
        if (!user) {
          throw new Error(
            "User address not found. Please connect your wallet."
          );
        }

        // Mock quote for now - replace with actual SDK call
        const mockQuote = {
          fromAmount,
          toAmount,
          fromToken,
          toToken,
          rate: (Number(toAmount) / Number(fromAmount)).toFixed(6),
          fee: "FREE",
          networkCost: (Number(fromAmount) * 0.001).toString(),
          slippage: state.slippage,
          priceImpact: "0.12",
          minimumReceived: (Number(toAmount) * 0.995).toString(),
          executionTime: "~30 seconds",
          rawQuote: null, // Will contain actual SDK quote
        };

        setQuoteData(mockQuote);

        /* TODO: Uncomment when SDK is properly configured
        const sellQuote = await sdkClient.intentSwaps.getSellOrderQuote({
          from: user.address,
          fromAmount: TokenAmount.createFrom({
            amount: fromAmount,
            token: await getTokenBySymbol(state.chainId, fromToken),
          }),
          toToken: await getTokenBySymbol(state.chainId, toToken),
          limitPrice,
        });

        if (!sellQuote) {
          throw new Error("Failed to fetch swap quote. Please try again.");
        }

        setQuoteData({
          fromAmount,
          toAmount: sellQuote.toAmount.toString(),
          fromToken,
          toToken,
          rate: (Number(sellQuote.toAmount.toString()) / Number(fromAmount)).toFixed(6),
          fee: sellQuote.fee?.toString() || "FREE",
          networkCost: sellQuote.networkCost?.toString() || "0",
          slippage: state.slippage,
          priceImpact: sellQuote.priceImpact?.toString(),
          minimumReceived: sellQuote.minimumReceived?.toString() || "0",
          executionTime: "~30 seconds",
          rawQuote: sellQuote
        });
        */
      } catch (error) {
        setSwapFlowState("creatingSwap");
        setShowQuotePanel(true);
        setQuoteError(
          error instanceof Error ? error.message : "Failed to fetch quote"
        );
      }
    } else if (swapFlowState === "confirmingQuote" && quoteData) {
      // Second click: Execute the swap
      setSwapFlowState("sendingOrder");

      try {
        const newOrder: SwapOrder = {
          id: `order_${Date.now()}`,
          fromToken: quoteData.fromToken,
          toToken: quoteData.toToken,
          fromAmount: quoteData.fromAmount,
          toAmount: quoteData.toAmount,
          price: quoteData.rate,
          status: "pending",
          timestamp: new Date(),
          slippage: quoteData.slippage,
          fee: quoteData.fee === "FREE" ? "0" : quoteData.fee,
        };

        // TODO: Execute actual swap with SDK
        // await sdkClient.executeSwap(quoteData.rawQuote);

        dispatch({ type: AppActionType.ADD_ORDER, payload: newOrder });

        // Reset form
        setFromAmount("");
        setToAmount("");
        setSwapFlowState("creatingSwap");
        setShowQuotePanel(false);
        setQuoteData(null);
        setQuoteError(null);
      } catch (error) {
        setSwapFlowState("creatingSwap");
        setShowQuotePanel(true);
        setQuoteError(
          error instanceof Error ? error.message : "Failed to execute swap"
        );
      }
    }
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
                <Dropdown
                  options={orderTypeOptions}
                  value={state.orderType}
                  onChange={(value) =>
                    dispatch({
                      type: AppActionType.SET_ORDER_TYPE,
                      payload: value as "swap" | "limit",
                    })
                  }
                  buttonClassName={`bg-transparent border-none text-xl font-bold px-2 py-1 ${
                    state.theme === "dark"
                      ? "text-pink-400 hover:bg-purple-900/40"
                      : "text-purple-700 hover:bg-purple-100"
                  }`}
                  menuClassName="min-w-[100px]"
                  ariaLabel="Order type"
                />
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
            <Dropdown
              options={tokenOptions}
              value={fromToken}
              onChange={(value) => setFromToken(value as string)}
              buttonClassName="bg-transparent border-none text-lg font-semibold px-0 py-0 hover:bg-transparent"
              menuClassName="min-w-[120px]"
              ariaLabel="Select from token"
            />

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
            <Dropdown
              options={tokenOptions}
              value={toToken}
              onChange={(value) => setToToken(value as string)}
              buttonClassName="bg-transparent border-none text-lg font-semibold px-0 py-0 hover:bg-transparent"
              menuClassName="min-w-[120px]"
              ariaLabel="Select to token"
            />

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

        {/* Quote/Error Panel */}
        {(showQuotePanel || quoteError) && (
          <div className="mt-4">
            <CollapsiblePanel isOpen={showQuotePanel} theme={state.theme}>
              {quoteError ? (
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3
                      className={`font-medium mb-1 ${
                        state.theme === "dark" ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      Quote Error
                    </h3>
                    <p
                      className={`text-sm ${
                        state.theme === "dark" ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      {quoteError}
                    </p>
                    <button
                      onClick={() => {
                        setQuoteError(null);
                        setShowQuotePanel(false);
                      }}
                      className={`mt-2 px-3 py-1 rounded text-sm transition-colors ${
                        state.theme === "dark"
                          ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : quoteData ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span
                      className={`font-medium ${
                        state.theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Quote Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        Exchange Rate
                      </span>
                      <p
                        className={
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }
                      >
                        1 {quoteData.fromToken} ={" "}
                        {formatNumberDisplay(quoteData.rate)}{" "}
                        {quoteData.toToken}
                      </p>
                    </div>

                    <div>
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        Price Impact
                      </span>
                      <p
                        className={`${
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        } ${
                          quoteData.priceImpact &&
                          Number(quoteData.priceImpact) > 3
                            ? "text-yellow-500"
                            : ""
                        }`}
                      >
                        {quoteData.priceImpact
                          ? `${quoteData.priceImpact}%`
                          : "< 0.01%"}
                      </p>
                    </div>

                    <div>
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        Minimum Received
                      </span>
                      <p
                        className={
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }
                      >
                        {formatNumberDisplay(quoteData.minimumReceived)}{" "}
                        {quoteData.toToken}
                      </p>
                    </div>

                    <div>
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        Network Fee
                      </span>
                      <p
                        className={
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }
                      >
                        {formatNumberDisplay(quoteData.networkCost)}{" "}
                        {quoteData.fromToken}
                      </p>
                    </div>

                    <div>
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        Slippage
                      </span>
                      <p
                        className={
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }
                      >
                        {quoteData.slippage}%
                      </p>
                    </div>

                    <div>
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        Est. Time
                      </span>
                      <p
                        className={
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }
                      >
                        {quoteData.executionTime}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </CollapsiblePanel>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={
            !fromAmount || !toAmount || swapFlowState === "sendingOrder"
          }
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            fromAmount && toAmount && swapFlowState !== "sendingOrder"
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500 shadow-lg"
              : "bg-gray-400"
          }`}
        >
          {swapFlowState === "sendingOrder" ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending Order...</span>
            </div>
          ) : swapFlowState === "confirmingQuote" ? (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>⚡ Confirm Swap</span>
            </div>
          ) : fromAmount && toAmount ? (
            "⚡ Get Quote"
          ) : (
            "Enter Amount"
          )}
        </button>
      </div>
    </div>
  );
}
