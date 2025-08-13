"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { DropdownAction } from "@/types/genral";

interface OptionsDropdownProps {
  actions: DropdownAction[];
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div ref={dropdownRef} className="relative">
      <button
        className="flex items-center justify-center rounded-lg border border-gray-200 p-2 hover:bg-main-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <EllipsisVertical size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 min-w-36 rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            {actions.map((action, index) => (
              <li
                key={index}
                className={`flex cursor-pointer items-center px-4 py-2 ${
                  action.danger
                    ? "text-red-600 hover:bg-red-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setIsOpen(false);
                  action.onClick?.();
                }}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
