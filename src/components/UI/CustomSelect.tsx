import { ChevronDown, LucideIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
};

const CustomSelect: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownDirection, setDropdownDirection] = useState<"down" | "up">(
    "down",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const Icon = icon;

  // Calculate dropdown position
  const calculateDropdownPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const dropdownHeight = options.length * 32 + 16; // Approximate height (32px per option + padding)

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  };

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1,
          );
          break;
        case "Enter":
          if (highlightedIndex >= 0) {
            onChange(options[highlightedIndex].value);
            setIsOpen(false);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options, onChange]);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      calculateDropdownPosition();
    }
    setIsOpen(!isOpen);
    setHighlightedIndex(-1); // Reset highlight when toggling
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="flex w-full min-w-[120px] items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 text-gray-700">
          {Icon && <Icon size={15} />}
          <span className={value ? "text-gray-700" : "text-gray-400"}>
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
        />
      </button>
      {isOpen && (
        <ul
          className={`absolute z-10 w-full min-w-[150px] rounded-md border border-gray-200 bg-white shadow-lg ${
            dropdownDirection === "down" ? "mt-1" : "bottom-full mb-1"
          }`}
          role="listbox"
        >
          {options.map((option, index) => {
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={`block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${
                  highlightedIndex === index ? "bg-gray-100" : ""
                } ${option.value === value ? "font-medium text-main" : ""}`}
                onClick={() => handleOptionClick(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
