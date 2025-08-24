import {
  Controller,
  UseFormReturn,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import { FormField } from "../types";
import React from "react";
import { cn } from "@/util";
import { Check } from "lucide-react";

interface CheckedLabelFieldProps<T extends FieldValues> {
  field: FormField<Path<T>>;
  form: UseFormReturn<T>;
  value?: boolean;
  desc?: string;
  onChange?: (value: boolean) => void;
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className={cn(
            "peer h-5 w-5 shrink-0 appearance-none rounded-md border border-gray-300 bg-white transition-all duration-200",
            "checked:border-main checked:bg-main",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          checked={!!checked} // ensure always boolean
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <Check className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" />
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export const CheckedLabelField = <T extends FieldValues>({
  field,
  form,
  desc,
  onChange,
}: CheckedLabelFieldProps<T>) => {
  const error = form.formState.errors[field.name] as FieldError | undefined;

  const getValidationRules = () => {
    const rules: {
      required?: string | { value: boolean; message: string };
      validate?: (value: unknown) => boolean | string;
    } = {};

    if (field.required) {
      rules.required = field.errorMessage || `${field.label} is required`;
    }

    if (field.validate) {
      rules.validate = field.validate;
    }

    return rules;
  };

  const validationRules = getValidationRules();

  return (
    <div className="space-y-1">
      <Controller
        name={field.name as Path<T>}
        control={form.control}
        rules={validationRules}
        render={({ field: controllerField }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.name}
              checked={!!controllerField.value} // coerce to boolean
              onCheckedChange={(checked) => {
                const value = checked === true;
                controllerField.onChange(value);
                onChange?.(value);
              }}
              className="data-[state=checked]:bg-secondary"
            />
            {desc && <p className="text-sm text-gray-700">{desc}</p>}
          </div>
        )}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};
