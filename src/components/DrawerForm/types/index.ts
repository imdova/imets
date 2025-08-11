import { LucideIcon } from "lucide-react";
import { DefaultValues, FieldValues, Path } from "react-hook-form";

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "multi-select"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "file"
  | "textarea"
  | "text-editor"
  | "toggle";

export interface FormFieldOption {
  value: string;
  label: string;
}

interface BaseFormField<T extends string> {
  name: T;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  className?: string;
  grid?: { xs?: number; sm?: number; md?: number; lg?: number };
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  errorMessage?: string;
  validate?: (value: unknown) => boolean | string;
}

export interface TextFormField<T extends string> extends BaseFormField<T> {
  type: "text" | "email" | "textarea";
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  icon?: LucideIcon;
}

export interface SelectFormField<T extends string> extends BaseFormField<T> {
  type: "select" | "multi-select" | "radio";
  options: FormFieldOption[];
  isMulti?: boolean;
}

export interface FileFormField<T extends string> extends BaseFormField<T> {
  type: "file";
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export interface ToggleFormField<T extends string> extends BaseFormField<T> {
  type: "toggle";
  defaultValue?: boolean;
}

export interface DateFormField<T extends string> extends BaseFormField<T> {
  type: "date" | "time";
  minDate?: Date;
  maxDate?: Date;
}

export interface PhoneFormField<T extends string> extends BaseFormField<T> {
  type: "phone";
  defaultCountry?: string;
}

export interface RichTextFormField<T extends string> extends BaseFormField<T> {
  type: "text-editor";
}

export type FormField<T extends string> =
  | TextFormField<T>
  | SelectFormField<T>
  | FileFormField<T>
  | ToggleFormField<T>
  | DateFormField<T>
  | PhoneFormField<T>
  | RichTextFormField<T>;

export interface FormGroup<T extends FieldValues> {
  title: string;
  fields: Array<FormField<Path<T>>>;
  icon?: LucideIcon;
  defaultOpen?: boolean;
}

export interface FormDrawerProps<T extends FieldValues> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  groups: FormGroup<T>[];
  initialValues: DefaultValues<T>;
  title?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
}

export type FieldValueType<T extends FieldType> = T extends "toggle"
  ? boolean
  : T extends "multi-select"
    ? string[]
    : T extends "file"
      ? File[] | null
      : T extends "text-editor"
        ? string
        : string | number;
