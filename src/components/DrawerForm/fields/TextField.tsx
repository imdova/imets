import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { TextFormField } from "../types";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps<T extends FieldValues> {
  field: TextFormField<Path<T>>;
  form: UseFormReturn<T>;
}

export const TextField = <T extends FieldValues>({
  field,
  form,
}: TextFieldProps<T>) => {
  const error = form.formState.errors[field.name];
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine input type based on field type and visibility state
  const getInputType = () => {
    if (field.type === "password") {
      return showPassword ? "text" : "password";
    }
    return field.type;
  };

  return (
    <>
      {field.type === "textarea" ? (
        <textarea
          {...form.register(field.name)}
          placeholder={field.placeholder}
          disabled={field.disabled}
          rows={4}
          className={`block w-full rounded-md border p-2 shadow-sm outline-none transition-all duration-200 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <div className="relative">
          <input
            type={getInputType()}
            {...form.register(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`mt-2 block w-full rounded-md border p-2 pr-10 shadow-sm outline-none transition-all duration-200 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />

          {/* Password visibility toggle */}
          {field.type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-secondary focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          )}

          {/* Field icon (if provided) */}
          {field.icon && field.type !== "password" && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              <field.icon size={14} />
            </span>
          )}
        </div>
      )}
    </>
  );
};
