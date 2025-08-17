"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  icon?: React.ReactNode;
  placholder?: string;
}

export default function Dropdown({
  label,
  options,
  icon,
  placholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typically the breakpoint for md in Tailwind
    };

    // Check on mount
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="dropdown-container relative w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="mr-2">{icon}</span>}
          {placholder ? placholder : "Select option"}
        </div>
        <ChevronDown className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-full min-w-56 rounded-lg border bg-white shadow-lg"
          >
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  opt.onClick();
                  setOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                {opt.icon && <span className="mr-2">{opt.icon}</span>}
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}

        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] shadow-lg md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl border-t bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="text-sm font-medium">
                  {placholder || "Select option"}
                </span>
                <button onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      opt.onClick();
                      setOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-3 text-left text-sm hover:bg-gray-100"
                  >
                    {opt.icon && <span className="mr-2">{opt.icon}</span>}
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
