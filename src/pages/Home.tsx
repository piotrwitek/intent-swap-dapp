import SwapForm from "../components/SwapForm";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { state } = useApp();

  return (
    <div className="min-h-screen pb-20 md:pb-8 relative overflow-hidden">
      {/* Cyber Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/30 to-cyan-900/20 backdrop-blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Swap{" "}
              </span>
              in the
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Cyber
              </span>{" "}
              Realm
            </h1>

            <p
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              In the cyber realm, honor and code converge.
            </p>
          </div>
        </div>
      </div>

      {/* Main Swap Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Center Column - Swap Form */}
          <div className="lg:col-span-1">
            <SwapForm />
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            <h3
              className={`text-2xl font-bold mb-6 ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Summer Stats 📊
            </h3>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border transition-colors ${
                  state.theme === "dark"
                    ? "bg-gray-800/30 border-yellow-500/20"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    24h Volume
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      state.theme === "dark"
                        ? "text-yellow-400"
                        : "text-yellow-600"
                    }`}
                  >
                    $2.4M
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-colors ${
                  state.theme === "dark"
                    ? "bg-gray-800/30 border-green-500/20"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Total Swaps
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      state.theme === "dark"
                        ? "text-green-400"
                        : "text-green-600"
                    }`}
                  >
                    15,847
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-colors ${
                  state.theme === "dark"
                    ? "bg-gray-800/30 border-pink-500/20"
                    : "bg-pink-50 border-pink-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${
                      state.theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Active Traders
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      state.theme === "dark" ? "text-pink-400" : "text-pink-600"
                    }`}
                  >
                    3,421
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
