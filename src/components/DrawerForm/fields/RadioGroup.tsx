import { SelectFormField } from "../types";

interface RadioGroupProps {
  field: SelectFormField<string>;
  value: string;
  onChange: (value: string) => void;
}

export const RadioGroup = ({ field, value, onChange }: RadioGroupProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {field.options.map((option) => {
        const isSelected = value === option.value;
        const Icon = option.icon;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center rounded-lg border p-3 transition ${isSelected ? "bg-secondary/5 border-secondary shadow-sm" : "hover:border-secondary/50 border-gray-300"} `}
          >
            <input
              type="radio"
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            {Icon ? (
              <Icon
                className={`mr-3 h-4 w-4 ${
                  isSelected ? "text-secondary" : "text-gray-400"
                }`}
              />
            ) : (
              <div
                className={`mr-3 flex h-5 w-5 items-center justify-center rounded-md border transition ${
                  isSelected
                    ? "border-secondary bg-secondary"
                    : "border-gray-400"
                }`}
              />
            )}
            <span className="text-sm text-gray-800">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};
