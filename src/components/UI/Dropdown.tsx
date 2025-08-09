"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState, FC, useRef, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownOption {
  value: string;
  label: string;
}

interface ArabicDropdownProps {
  options: DropdownOption[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  icon?: JSX.Element;
  insideLabel?: string;
}

const ArabicDropdown: FC<ArabicDropdownProps> = ({
  options,
  label,
  value,
  onChange,
  id,
  className = "",
  insideLabel,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
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

  return (
    <div dir="rtl" className="w-full text-right" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:outline-none ${className}`}
        >
          <div className="flex items-center gap-1 text-xs">
            {icon}
            {insideLabel || selected?.label || "اختر"}
          </div>
          <span className="text-gray-400">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {/* Dropdown list */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 20 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isMobile ? 20 : -10 }}
              transition={{ duration: 0.2 }}
              className={` ${
                isMobile
                  ? "fixed inset-x-0 bottom-0 z-50 max-h-[60vh] rounded-t-xl border-t-4 border-main bg-white shadow-2xl"
                  : "absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              } `}
            >
              {/* Mobile header */}
              {isMobile && (
                <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                  <h3 className="font-semibold text-gray-800">
                    {label || "اختر خيار"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              <ul
                className={`${isMobile ? "max-h-[calc(60vh-56px)] overflow-y-auto p-2" : "max-h-60 overflow-auto py-1"}`}
              >
                {options.map((option) => (
                  <motion.li
                    key={option.value}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                      value === option.value
                        ? "bg-main-transparent font-semibold text-main"
                        : ""
                    }`}
                  >
                    {option.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArabicDropdown;
