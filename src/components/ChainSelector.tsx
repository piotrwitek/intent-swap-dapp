import { ChevronDown } from "lucide-react";
import { useApp } from "../context/useApp";
import { AppActionType } from "../context/AppProvider";
import { useState, useRef, useEffect } from "react";

const CHAIN_OPTIONS = [
  { label: "Ethereum", value: 1 },
  { label: "Base", value: 8453 },
  { label: "Arbitrum", value: 42161 },
];

export default function ChainSelector() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedChain = CHAIN_OPTIONS.find(option => option.value === state.chainId) || CHAIN_OPTIONS[0];

  const handleChainSelect = (chainId: number) => {
    dispatch({ type: AppActionType.SET_CHAIN_ID, payload: chainId });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/70 ${
          state.theme === "dark"
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
        aria-label="Select blockchain"
      >
        <span className="text-sm font-medium">{selectedChain.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 min-w-full rounded-lg border shadow-lg z-50 ${
            state.theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {CHAIN_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleChainSelect(option.value)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                option.value === state.chainId
                  ? state.theme === "dark"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-purple-100 text-purple-700"
                  : state.theme === "dark"
                  ? "text-gray-300 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
