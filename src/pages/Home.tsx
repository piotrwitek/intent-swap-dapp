import SwapForm from "../components/SwapForm";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { state } = useApp();

  return (
    <div className="flex-1 flex flex-col min-h-[500px] relative overflow-hidden">
      {/* Cyber Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/30 to-cyan-900/20 backdrop-blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent"></div>

      {/* Main Content Scrollable Area */}
      <div className="relative z-10 flex-1 flex flex-col overflow-auto min-h-[500px]">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="text-center">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 ${
                state.theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Intent based Swaps
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                state.theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p className="text-2xl  mb-4">Your shield against MEV.</p>
              <i>In the intent realm, your slippage can't be exploited.</i>
            </p>
          </div>
        </div>

        {/* Main Swap Form - Centered */}
        <div className="flex justify-center items-center w-full mt-4 mb-8 flex-1">
          <SwapForm />
        </div>
      </div>
    </div>
  );
}
