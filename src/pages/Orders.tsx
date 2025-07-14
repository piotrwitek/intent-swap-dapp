import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, X, Clock, Check, ArrowRight } from "lucide-react";
import { useApp } from "../context/useApp";
import type { SwapOrder } from "../context/AppProvider";

// Mock data generator for infinite scroll
const generateMockOrders = (startId: number, count: number): SwapOrder[] => {
  const tokens = ["ETH", "BTC", "USDC", "USDT", "SOL", "MATIC"];
  const statuses: SwapOrder["status"][] = ["pending", "completed", "cancelled"];

  return Array.from({ length: count }, (_, i) => {
    const fromToken = tokens[Math.floor(Math.random() * tokens.length)];
    let toToken = tokens[Math.floor(Math.random() * tokens.length)];
    while (toToken === fromToken) {
      toToken = tokens[Math.floor(Math.random() * tokens.length)];
    }

    const fromAmount = (Math.random() * 10 + 0.1).toFixed(6);
    const toAmount = (Math.random() * 1000 + 10).toFixed(6);

    return {
      id: `order_${startId + i}`,
      fromToken,
      toToken,
      fromAmount,
      toAmount,
      price: (Number(toAmount) / Number(fromAmount)).toFixed(6),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
      slippage: (Math.random() * 2).toFixed(1),
      fee: (Number(fromAmount) * 0.003).toFixed(6),
    };
  });
};

export default function Orders() {
  const { state, dispatch } = useApp();
  const [displayOrders, setDisplayOrders] = useState<SwapOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastOrderElementRef = useRef<HTMLDivElement | null>(null);

  // Initialize with user orders and some mock data
  useEffect(() => {
    const initialMockOrders = generateMockOrders(1000, 20);
    setDisplayOrders([...state.orders, ...initialMockOrders]);
  }, [state.orders]);

  // Infinite scroll logic
  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreOrders();
      }
    });

    if (lastOrderElementRef.current) {
      observerRef.current.observe(lastOrderElementRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore]);

  const loadMoreOrders = async () => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOrders = generateMockOrders(displayOrders.length + 1000, 15);
    setDisplayOrders((prev) => [...prev, ...newOrders]);

    // Stop loading more after 100 orders total
    if (displayOrders.length + newOrders.length >= 100) {
      setHasMore(false);
    }

    setLoading(false);
  };

  const handleCancelOrder = (orderId: string) => {
    dispatch({ type: "CANCEL_ORDER", payload: orderId });
    setDisplayOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "cancelled" as const }
          : order
      )
    );
  };

  const getStatusColor = (status: SwapOrder["status"]) => {
    switch (status) {
      case "pending":
        return state.theme === "dark"
          ? "text-yellow-400 bg-yellow-500/20"
          : "text-yellow-600 bg-yellow-100";
      case "completed":
        return state.theme === "dark"
          ? "text-green-400 bg-green-500/20"
          : "text-green-600 bg-green-100";
      case "cancelled":
        return state.theme === "dark"
          ? "text-red-400 bg-red-500/20"
          : "text-red-600 bg-red-100";
    }
  };

  const getStatusIcon = (status: SwapOrder["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <Check className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
    }
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{ height: "calc(100dvh - 64px - 74px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 pb-6 sm:px-6 lg:px-8 pt-8 flex flex-col h-full">
        {/* Header (content-dependent height) */}
        <div className="mb-8 flex-shrink-0">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent select-none tracking-tight drop-shadow-lg">
            Trading Orders
          </h1>
          <p
            className={`mt-1 ${
              state.theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Chart your intent-based trades across the digital frontier
          </p>
          <div className="mt-2 text-sm font-medium">
            <span
              className={
                state.theme === "dark" ? "text-gray-400" : "text-gray-600"
              }
            >
              {displayOrders.length} total orders
            </span>
          </div>
        </div>

        {/* Orders List (fills remaining space, min-h-[400px], scrollable) */}
        <div
          className={`flex-1 rounded-2xl border overflow-y-auto ${
            state.theme === "dark"
              ? "bg-gray-800/30 border-pink-500/20"
              : "bg-white/70 border-pink-200"
          }`}
        >
          {/* Table Header */}
          <div
            className={`px-6 py-4 border-b sticky top-0 z-10 ${
              state.theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1.3fr_1fr_1fr_0.8fr_0.7fr] gap-4 text-sm font-medium">
              <div
                className={
                  state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                }
              >
                Pair
              </div>
              <div
                className={`hidden md:block ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Amount
              </div>
              <div
                className={`hidden md:block ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Price
              </div>
              <div
                className={`hidden md:block ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Status
              </div>
              <div
                className={`hidden md:block ${
                  state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Time
              </div>
              <div
                className={
                  state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                }
              >
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div>
            {displayOrders.map((order, index) => (
              <div
                key={order.id}
                ref={
                  index === displayOrders.length - 1
                    ? lastOrderElementRef
                    : null
                }
                className={`px-6 py-4 border-b transition-colors hover:bg-opacity-50 ${
                  state.theme === "dark"
                    ? "border-gray-700 hover:bg-gray-700"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1.3fr_1fr_1fr_0.8fr_0.7fr] gap-4 items-center">
                  {/* Pair */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span
                        className={`font-medium ${
                          state.theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {order.fromToken}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 ${
                        state.theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        state.theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {order.toToken}
                    </span>
                  </div>

                  {/* Amount - Hidden on mobile */}
                  <div className="hidden md:block">
                    <div
                      className={`text-sm ${
                        state.theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      {parseFloat(order.fromAmount).toFixed(4)}{" "}
                      {order.fromToken}
                    </div>
                    <div
                      className={`text-xs ${
                        state.theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      → {parseFloat(order.toAmount).toFixed(4)} {order.toToken}
                    </div>
                  </div>

                  {/* Price - Hidden on mobile */}
                  <div
                    className={`hidden md:block text-sm ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {parseFloat(order.price).toFixed(4)}
                    <br /> {order.fromToken}/{order.toToken}
                  </div>

                  {/* Status - Hidden on mobile */}
                  <div className="hidden md:block">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>

                  {/* Time - Hidden on mobile */}
                  <div
                    className={`hidden md:block text-xs ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {order.timestamp.toLocaleDateString()}
                    <br />
                    {order.timestamp.toLocaleTimeString()}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    <Link
                      to={`/orders/${order.id}`}
                      className={`p-2 rounded-lg transition-colors ${
                        state.theme === "dark"
                          ? "text-blue-400 hover:bg-blue-500/20"
                          : "text-blue-600 hover:bg-blue-100"
                      }`}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          state.theme === "dark"
                            ? "text-red-400 hover:bg-red-500/20"
                            : "text-red-600 hover:bg-red-100"
                        }`}
                        title="Cancel Order"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile-only details */}
                <div className="md:hidden mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span
                        className={
                          state.theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      >
                        {parseFloat(order.fromAmount).toFixed(4)} →{" "}
                        {parseFloat(order.toAmount).toFixed(4)}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="px-6 py-8 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span
                    className={`text-sm ${
                      state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Loading more orders...
                  </span>
                </div>
              </div>
            )}

            {/* End of data indicator */}
            {!hasMore && !loading && (
              <div className="px-6 py-8 text-center">
                <span
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  🏖️ You've reached the end of your trading journey! Time for a
                  summer break.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
