import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useApp } from "../context/useApp";

interface DropdownOption {
  value: string | number;
  label: string;
  icon?: string | React.ReactNode;
  iconSrc?: string | React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  ariaLabel?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  ariaLabel = "Select option",
}: DropdownProps) {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500/70 ${
          state.theme === "dark"
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        } ${buttonClassName}`}
        aria-label={ariaLabel}
      >
        <div className="flex items-center space-x-2">
          {(selectedOption?.iconSrc || selectedOption?.icon) && (
            <div className="w-5 h-5 flex items-center justify-center">
              {selectedOption?.iconSrc ? (
                <img
                  src={selectedOption.iconSrc as string}
                  alt={selectedOption.label}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                selectedOption?.icon
              )}
            </div>
          )}
          <span className="text-sm font-medium">
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 w-full rounded-lg border shadow-lg z-50 ${
            state.theme === "dark"
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-gray-200"
          } ${menuClassName}`}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left transition-colors ${
                  option.value === value
                    ? state.theme === "dark"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-purple-100 text-purple-700"
                    : state.theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {(option.iconSrc || option.icon) && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    {option.iconSrc ? (
                      <img
                        src={option.iconSrc as string}
                        alt={option.label}
                        className="w-5 h-5 rounded-full"
                      />
                    ) : (
                      option.icon
                    )}
                  </div>
                )}
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
