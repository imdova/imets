import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { SelectFormField } from "../types";

interface SelectFieldProps {
  field: SelectFormField<string>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export const SelectField = ({ field, value, onChange }: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    if (field.type === "multi-select") {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const selectedLabels = field.options
    .filter((option) =>
      field.type === "multi-select"
        ? (value as string[])?.includes(option.value)
        : value === option.value,
    )
    .map((option) => option.label);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`mt-2 flex w-full items-center justify-between rounded-md border px-3 py-2 text-left ${
          isOpen ? "border-primary" : "border-gray-300"
        }`}
      >
        <span className="truncate">
          {selectedLabels.length > 0
            ? field.type === "multi-select"
              ? selectedLabels.join(", ")
              : selectedLabels[0]
            : field.placeholder || "Select..."}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg"
        >
          <div className="max-h-60 overflow-auto py-1">
            {field.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-100 ${
                  (
                    field.type === "multi-select"
                      ? (value as string[])?.includes(option.value)
                      : value === option.value
                  )
                    ? "bg-primary-50"
                    : ""
                }`}
              >
                <span>{option.label}</span>
                {(field.type === "multi-select"
                  ? (value as string[])?.includes(option.value)
                  : value === option.value) && (
                  <Check className="text-primary h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
