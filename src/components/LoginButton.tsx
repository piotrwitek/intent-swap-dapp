import {
  useAuthModal,
  useLogout,
  useUser,
  useSignerStatus,
} from "@account-kit/react";
import { useApp } from "../context/useApp";

export default function LoginButton() {
  const { state } = useApp();
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const { logout } = useLogout();
  const signerStatus = useSignerStatus();

  if (signerStatus.isInitializing) {
    return <span className="text-xs text-gray-400 px-2">Loading...</span>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs font-medium text-cyan-500">
          {user.email ??
            (user.address
              ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}`
              : "")}{" "}
        </span>
        <button
          onClick={() => logout()}
          className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500/70 flex items-center gap-1 text-xs font-semibold ${
            state.theme === "dark"
              ? "text-pink-300 hover:bg-gray-800"
              : "text-pink-600 hover:bg-gray-100"
          }`}
          aria-label="Log out"
        >
          <span className="hidden sm:inline">Log out</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={openAuthModal}
      className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500/70 flex items-center gap-1 text-xs font-semibold shadow-md border border-pink-400/40 ${
        state.theme === "dark"
          ? "bg-pink-600 text-white hover:bg-pink-500"
          : "bg-pink-500 text-white hover:bg-pink-400"
      }`}
      aria-label="Login"
    >
      <span className="hidden sm:inline">Login</span>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14m-7-7l7 7-7 7"
        />
      </svg>
    </button>
  );
}
