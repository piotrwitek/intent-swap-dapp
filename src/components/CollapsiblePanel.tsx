import type { ReactNode } from "react";

interface CollapsiblePanelProps {
  isOpen: boolean;
  children: ReactNode;
  theme: "dark" | "light";
  className?: string;
}

export default function CollapsiblePanel({
  isOpen,
  children,
  theme,
  className = "",
}: CollapsiblePanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`transition-all duration-300 ease-in-out ${className}`}>
      <div
        className={`p-4 rounded-lg border ${
          theme === "dark"
            ? "bg-gray-700/30 border-gray-600"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
