"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void; // each option has its own action
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

  return (
    <div className="relative w-full">
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

      {/* Dropdown for desktop */}
      <AnimatePresence>
        {open && (
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
      </AnimatePresence>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t bg-white shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between border-b p-4">
              <span className="text-sm font-medium">Select option</span>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  opt.onClick();
                  setOpen(false);
                }}
                className="flex w-full items-center px-4 py-3 text-sm hover:bg-gray-100"
              >
                {opt.icon && <span className="mr-2">{opt.icon}</span>}
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
