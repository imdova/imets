import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { FormFieldOption, SelectFormField } from "../types";
import Image from "next/image";

interface SelectFieldProps<T extends string> {
  field: SelectFormField<T>;
  value: FormFieldOption | undefined;
  onChange: (value: FormFieldOption | FormFieldOption[]) => void;
  placeholder?: string;
  className?: string;
}

export const UserMultiSelect = <T extends string>({
  field,
  value,
  onChange,
  placeholder,
  className = "",
}: SelectFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMultiSelect = field.type === "multi-select" || field.isMulti;

  const handleSelect = (option: FormFieldOption) => {
    if (isMultiSelect) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const isSelected = currentValues.some((v) => v.value === option.value);
      const newValue = isSelected
        ? currentValues.filter((v) => v.value !== option.value)
        : [...currentValues, option];
      onChange(newValue);
    } else {
      onChange(option);
    }
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMultiSelect) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const newValue = currentValues.filter((v) => v.value !== optionValue);
      onChange(newValue);
    } else {
      onChange([]);
    }
  };

  const filteredOptions = field.options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOptions = isMultiSelect
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : value
      ? [value]
      : [];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Options List */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            Available Options
          </h3>
          <div className="max-h-72 space-y-2 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors ${
                    selectedOptions.some((o) => o.value === option.value)
                      ? "text-main"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {option.image ? (
                    <Image
                      width={150}
                      height={150}
                      src={option.image}
                      alt={option.label}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-200 text-sm font-medium text-gray-600">
                      {option.label.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 truncate">
                    <div className="text-sm font-medium">{option.label}</div>
                  </div>
                  {selectedOptions.some((o) => o.value === option.value) && (
                    <Check className="h-4 w-4 text-main" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-sm text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
        {/* Selected Options */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Selected</h3>
          {selectedOptions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm transition-colors hover:bg-gray-100"
                >
                  {option.image ? (
                    <Image
                      width={150}
                      height={150}
                      src={option.image}
                      alt={option.label}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-200 text-xs font-medium text-gray-600">
                      {option.label.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[120px] truncate font-medium text-gray-700">
                    {option.label}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => removeOption(option.value, e)}
                    className="ml-1 rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              {placeholder || field.placeholder || "No options selected"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
