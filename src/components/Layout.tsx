import { Link, useRouter } from "@tanstack/react-router";
import { Moon, Sun, Home, List, Zap } from "lucide-react";
import { useApp } from "../context/useApp";
import { AppActionType } from "../context/AppProvider";
import LoginButton from "./LoginButton";
import ChainSelector from "./ChainSelector";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useApp();
  const location = useRouter().state.location;

  const toggleTheme = () => {
    dispatch({ type: AppActionType.TOGGLE_THEME });
    document.documentElement.classList.toggle("dark");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        state.theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900"
          : "bg-gradient-to-br from-purple-50 via-white to-cyan-50"
      }`}
    >
      {/* Top Navigation */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
          state.theme === "dark"
            ? "bg-gray-900/80 border-purple-500/20"
            : "bg-white/80 border-purple-200"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span
                  className={`text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent`}
                >
                  IntentSwap
                </span>
              </div>

              <div className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive("/")
                      ? state.theme === "dark"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-purple-100 text-purple-700"
                      : state.theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Swap</span>
                </Link>

                <Link
                  to="/orders"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive("/orders")
                      ? state.theme === "dark"
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-purple-100 text-purple-700"
                      : state.theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
              </div>
            </div>

            {/* LoginButton */}
            <div className="flex items-center space-x-2">
              <LoginButton />
            </div>

            {/* Chain Selector */}
            <ChainSelector />
          </div>
        </nav>
      </header>

      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Bottom Footer */}
        <footer
          className={`border-t transition-colors mt-auto ${
            state.theme === "dark"
              ? "bg-gray-900/50 border-purple-500/20"
              : "bg-white/50 border-purple-200"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex w-full flex-row justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <b>© 2025 IntentSwap </b>
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <span
                  className={`text-sm ${
                    state.theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Trade with Magic Shield 🔮
                </span>
                {/* Theme Toggle Button (desktop only) */}
                <button
                  onClick={toggleTheme}
                  className={`hidden md:inline-flex p-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/70 ${
                    state.theme === "dark"
                      ? "text-yellow-300 hover:bg-gray-800"
                      : "text-orange-500 hover:bg-gray-100"
                  }`}
                  aria-label="Toggle theme"
                >
                  {state.theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 border-t transition-colors z-50 ${
            state.theme === "dark"
              ? "bg-gray-900/95 border-purple-500/20"
              : "bg-white/95 border-purple-200"
          }`}
        >
          <div className="flex justify-around py-2">
            <Link
              to="/"
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? state.theme === "dark"
                    ? "text-purple-300"
                    : "text-purple-700"
                  : state.theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Swap</span>
            </Link>

            <Link
              to="/orders"
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                isActive("/orders")
                  ? state.theme === "dark"
                    ? "text-purple-300"
                    : "text-purple-700"
                  : state.theme === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              <List className="w-5 h-5" />
              <span className="text-xs">Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
