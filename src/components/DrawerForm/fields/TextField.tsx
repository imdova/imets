import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { TextFormField } from "../types";

interface TextFieldProps<T extends FieldValues> {
  field: TextFormField<Path<T>>;
  form: UseFormReturn<T>;
}

export const TextField = <T extends FieldValues>({
  field,
  form,
}: TextFieldProps<T>) => {
  const error = form.formState.errors[field.name];

  return (
    <>
      {field.type === "textarea" ? (
        <textarea
          {...form.register(field.name)}
          placeholder={field.placeholder}
          disabled={field.disabled}
          rows={4}
          className={`block w-full rounded-md border p-2 shadow-sm outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <div className="relative">
          <input
            type={field.type}
            {...form.register(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`block w-full rounded-md border p-2 shadow-sm outline-none ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {field.icon && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
              <field.icon size={14} />
            </span>
          )}
        </div>
      )}
    </>
  );
};
