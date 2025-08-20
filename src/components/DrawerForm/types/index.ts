import { LucideIcon } from "lucide-react";
import { DefaultValues, FieldValues, Path } from "react-hook-form";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
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
  | "toggle"
  | "field-group"
  | "conditional-group"
  | "list"
  | "user-multi-select"
  | "pricing-table";

export interface FormFieldOption {
  value: string;
  label: string;
  image?: string;
  icon?: LucideIcon;
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
  addButn?: {
    label: string;
    herf?: string;
    onclick?: () => void;
  };
}

export interface PricingItem {
  item: string;
  quantity: number;
  price: number;
  discount: number;
  amount: number;
  description?: string;
  sku?: string;
  unit?: string;
}

export interface TextFormField<T extends string> extends BaseFormField<T> {
  type: "text" | "email" | "textarea" | "list" | "password" | "number";
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  icon?: LucideIcon;
}

export interface PricingTableFormField<T extends string>
  extends BaseFormField<T> {
  type: "pricing-table";
  showDiscount?: boolean;
  showExtraDiscount?: boolean;
  showTax?: boolean;
  defaultDiscount?: number;
  defaultExtraDiscount?: number;
  defaultTax?: number;
}

export interface SelectFormField<T extends string> extends BaseFormField<T> {
  type:
    | "select"
    | "multi-select"
    | "radio"
    | "conditional-group"
    | "user-multi-select"
    | "user-multi-select";
  options: FormFieldOption[];
  isMulti?: boolean;
  isDropDown?: boolean;
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

interface ConditionalFieldGroup {
  name: string;
  type: Exclude<FieldType, "conditional-group">;
  label: string;
  required?: boolean;
  errorMessage?: string;
  options?: FormFieldOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  accept?: string;
  isMulti?: boolean; // For multi-select fields
  grid?: { xs?: number; sm?: number; md?: number; lg?: number };
}

interface DynamicField {
  name: string;
  type: Exclude<FieldType, "conditional-group">;
  label: string;
  required?: boolean;
  errorMessage?: string;
  options?: FormFieldOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  accept?: string; // For file inputs
  isMulti?: boolean; // For multi-select fields
  grid?: { xs?: number; sm?: number; md?: number; lg?: number };
}

export interface ConditionalGroupFormField<T extends string>
  extends BaseFormField<T> {
  type: "conditional-group";
  options: FormFieldOption[];
  dynamic?: boolean;
  addLabel?: string;
  dynamicFields?: DynamicField[];
  conditionalFields: Record<string, ConditionalFieldGroup[]>;
}
export interface GroupFormField<T extends string> extends BaseFormField<T> {
  type: "field-group";
  dynamic?: boolean;
  addLabel?: string;
  fields: Array<FormField<string>>;
}

export type FormField<T extends string> =
  | TextFormField<T>
  | SelectFormField<T>
  | FileFormField<T>
  | ToggleFormField<T>
  | DateFormField<T>
  | PhoneFormField<T>
  | RichTextFormField<T>
  | ConditionalGroupFormField<T>
  | GroupFormField<T>
  | PricingTableFormField<T>;

export interface FormGroup<T extends FieldValues> {
  title?: string;
  fields: Array<FormField<Path<T>>>;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  collapsible?: boolean;
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
  minHight?: number;
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
