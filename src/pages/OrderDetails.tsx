import { useParams, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useApp } from "../context/useApp";

export default function OrderDetails() {
  // TanStack Router: useParams must be called with the route object
  const router = useRouter();
  const params = useParams({ from: router });
  const orderId = params.orderId;
  const { state } = useApp();
  const navigate = useNavigate();

  // Find the order (in a real app, this would be an API call)
  const order = state.orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
        <div className="text-center">
          <h2
            className={`text-2xl font-bold mb-2 ${
              state.theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Order Not Found
          </h2>
          <p
            className={`mb-6 ${
              state.theme === "dark" ? "text-gray-200" : "text-gray-600"
            }`}
          >
            This order has vanished into the blockchain ether — no bytes, no
            blocks, just pure digital mystery.
          </p>
          <button
            onClick={() => navigate({ to: "/orders" })}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-orange-500 transition-all"
          >
            Return to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: typeof order.status) => {
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

  const getStatusIcon = (status: typeof order.status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
  };

  const orderDetails = [
    { label: "Order ID", value: order.id, copyable: true },
    { label: "From Token", value: order.fromToken },
    { label: "To Token", value: order.toToken },
    { label: "From Amount", value: `${order.fromAmount} ${order.fromToken}` },
    { label: "To Amount", value: `${order.toAmount} ${order.toToken}` },
    {
      label: "Exchange Rate",
      value: `1 ${order.fromToken} = ${order.price} ${order.toToken}`,
    },
    {
      label: "Slippage Tolerance",
      value: order.slippage === "Auto" ? "Auto" : `${order.slippage}%`,
    },
    { label: "Trading Fee", value: `${order.fee} ${order.fromToken}` },
    {
      label: "Total Cost",
      value: `${(parseFloat(order.fromAmount) + parseFloat(order.fee)).toFixed(
        6
      )} ${order.fromToken}`,
    },
    { label: "Order Date", value: order.timestamp.toLocaleString() },
    { label: "Status", value: order.status, isStatus: true },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate({ to: "/orders" })}
            className={`p-2 rounded-lg transition-colors ${
              state.theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div>
              <h1
                className={`text-3xl font-bold ${
                  state.theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Order Details ⚔️
              </h1>
              <p
                className={`${
                  state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {order.fromToken} → {order.toToken} Swap
              </p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div
          className={`mb-8 p-6 rounded-xl border ${
            order.status === "completed"
              ? state.theme === "dark"
                ? "bg-green-500/10 border-green-500/20"
                : "bg-green-50 border-green-200"
              : order.status === "pending"
              ? state.theme === "dark"
                ? "bg-yellow-500/10 border-yellow-500/20"
                : "bg-yellow-50 border-yellow-200"
              : state.theme === "dark"
              ? "bg-red-500/10 border-red-500/20"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </span>

              <div>
                <h3
                  className={`font-semibold ${
                    state.theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {order.status === "completed"
                    ? "Swap Completed Successfully!"
                    : order.status === "pending"
                    ? "Swap In Progress"
                    : "Swap Cancelled"}
                </h3>
                <p
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {order.status === "completed"
                    ? "Your tokens have been exchanged successfully"
                    : order.status === "pending"
                    ? "Your swap is being processed by solvers"
                    : "This swap order has been cancelled"}
                </p>
              </div>
            </div>

            {order.status === "completed" && (
              <button
                className={`p-2 rounded-lg transition-colors ${
                  state.theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Order Details Table */}
        <div
          className={`rounded-xl overflow-hidden border ${
            state.theme === "dark"
              ? "bg-gray-800/30 border-pink-500/20"
              : "bg-white/70 border-pink-200"
          }`}
        >
          <div
            className={`px-6 py-4 border-b ${
              state.theme === "dark"
                ? "bg-gray-800/50 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-semibold ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Transaction Information
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {orderDetails.map((detail, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <dt
                    className={`text-sm font-medium ${
                      state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {detail.label}
                  </dt>
                  <dd className="flex items-center space-x-2">
                    {detail.isStatus ? (
                      <span
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{detail.value}</span>
                      </span>
                    ) : (
                      <>
                        <span
                          className={`text-sm font-mono ${
                            state.theme === "dark"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {detail.value}
                        </span>
                        {detail.copyable && (
                          <button
                            onClick={() => copyToClipboard(detail.value)}
                            className={`p-1 rounded transition-colors ${
                              state.theme === "dark"
                                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                            title="Copy to clipboard"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate({ to: "/orders" })}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              state.theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            Back to Orders
          </button>

          <button
            onClick={() => navigate({ to: "/" })}
            className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 transition-all"
          >
            Create New Swap
          </button>
        </div>

        {/* Intent Wisdom */}
        <div
          className={`mt-12 p-6 rounded-xl text-center ${
            state.theme === "dark" ? "bg-gray-800/20" : "bg-white/30"
          }`}
        >
          <p
            className={`text-lg font-medium italic ${
              state.theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            "Every successful trade is a step towards financial mastery."
          </p>
          <p
            className={`text-sm mt-2 ${
              state.theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          >
            - Wise Intent Trader 🏖️⚔️
          </p>
        </div>
      </div>
    </div>
  );
}
