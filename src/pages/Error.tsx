import { AlertTriangle, RefreshCw } from "lucide-react";
import { useApp } from "../context/useApp";
import { AppActionType } from "../context/AppProvider";

export default function Error() {
  const { state, dispatch } = useApp();

  const handleRetry = () => {
    // Clear the global error
    dispatch({ type: AppActionType.SET_GLOBAL_ERROR, payload: null });
    // Retry fetching tokens
    window.location.reload();
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div
            className={`p-4 rounded-full ${
              state.theme === "dark"
                ? "bg-red-500/20 text-red-400"
                : "bg-red-100 text-red-600"
            }`}
          >
            <AlertTriangle className="w-12 h-12" />
          </div>
        </div>

        <h1
          className={`text-3xl font-bold mb-4 ${
            state.theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Connection Error ⚠️
        </h1>

        <p
          className={`text-lg mb-6 ${
            state.theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Unable to connect to the trading network. The digital realm seems to
          be experiencing some turbulence.
        </p>

        {state.globalError && (
          <div
            className={`mb-6 p-4 rounded-lg border text-sm ${
              state.theme === "dark"
                ? "bg-red-500/10 border-red-500/20 text-red-300"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <strong>Error Details:</strong> {state.globalError}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-orange-500 transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Retry Connection</span>
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              state.theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            Go to Home
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
            "Even in digital storms, resilient traders find their way."
          </p>
          <p
            className={`text-sm mt-2 ${
              state.theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          >
            - Sage of the Intent Realm 🌪️⚔️
          </p>
        </div>
      </div>
    </div>
  );
}
