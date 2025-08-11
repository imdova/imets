import {
  Controller,
  UseFormReturn,
  FieldValues,
  Path,
  FieldError,
} from "react-hook-form";
import { FormField } from "../types";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { FileUploadField } from "./FileUpload";
import { ToggleField } from "./ToggleField";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { PhoneInput } from "./PhoneInput";
import TextEditor from "@/components/UI/editor/editor";
import { RadioGroup } from "./RadioGroup";

interface FormFieldProps<T extends FieldValues> {
  field: FormField<Path<T>>;
  form: UseFormReturn<T>;
}

export const FormFieldRenderer = <T extends FieldValues>({
  field,
  form,
}: FormFieldProps<T>) => {
  const error = form.formState.errors[field.name] as FieldError | undefined;

  // Define validation rules based on field configuration
  const getValidationRules = () => {
    const rules: {
      required?: string | { value: boolean; message: string };
      pattern?: { value: RegExp; message: string };
      minLength?: { value: number; message: string };
      maxLength?: { value: number; message: string };
      min?: { value: number; message: string };
      max?: { value: number; message: string };
      validate?: (value: unknown) => boolean | string;
    } = {};

    if (field.required) {
      rules.required = field.errorMessage || `${field.label} is required`;
    }

    if (field.type === "email") {
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: field.errorMessage || "Invalid email address",
      };
    }

    if (field.minLength) {
      rules.minLength = {
        value: field.minLength,
        message: field.errorMessage || `Minimum length is ${field.minLength}`,
      };
    }

    if (field.maxLength) {
      rules.maxLength = {
        value: field.maxLength,
        message: field.errorMessage || `Maximum length is ${field.maxLength}`,
      };
    }

    if (field.min) {
      rules.min = {
        value: field.min,
        message: field.errorMessage || `Minimum value is ${field.min}`,
      };
    }

    if (field.max) {
      rules.max = {
        value: field.max,
        message: field.errorMessage || `Maximum value is ${field.max}`,
      };
    }

    if (field.validate) {
      rules.validate = field.validate;
    }

    return rules;
  };

  const validationRules = getValidationRules();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>

      {field.type === "text" ||
      field.type === "email" ||
      field.type === "textarea" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: controllerField }) => (
            <TextField<T> field={field} form={form} {...controllerField} />
          )}
        />
      ) : field.type === "select" || field.type === "multi-select" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <SelectField field={field} value={value} onChange={onChange} />
          )}
        />
      ) : field.type === "toggle" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <ToggleField value={value} onChange={onChange} />
          )}
        />
      ) : field.type === "radio" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} onChange={onChange} field={field} />
          )}
        />
      ) : field.type === "date" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <DatePicker value={value} onChange={onChange} field={field} />
          )}
        />
      ) : field.type === "time" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <TimePicker value={value} onChange={onChange} field={field} />
          )}
        />
      ) : field.type === "phone" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <PhoneInput value={value} onChange={onChange} field={field} />
          )}
        />
      ) : field.type === "file" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <FileUploadField<T>
              field={field}
              form={form}
              value={value}
              onChange={onChange}
            />
          )}
        />
      ) : field.type === "text-editor" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <TextEditor value={value} onChange={onChange} />
          )}
        />
      ) : null}

      {error && (
        <p className="text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  );
};
