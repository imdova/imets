/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path } from "react-hook-form";

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "time"
  | "phone"
  | "password"
  | "date"
  | "textEditor"
  | "select"
  | "search-select"
  | "checkbox"
  | "component"
  | "radio"
  | "file"
  | "textArea"
  | "otp"
  | "multi-text"
  | "color"
  | "code"
  | "upload-area";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "error"
  | "success"
  | "warning";

export interface GridProps {
  xs?: number;
  sm?: number;
  md?: number;
  rowXs?: number;
  rowSm?: number;
  rowMd?: number;
}

export interface Option<T = Record<string, unknown>> {
  value: keyof T;
  label: React.ReactNode | string;
  pattern?: string;
  icon?: React.ReactNode;
}
export type ErrorField = {
  field: string; // e.g., "photo" or "content.status"
  label?: string; // e.g., "Photo"
  message?: string;
  tab?: string | number;
};
export interface FieldConfig<T = any> {
  id?: string;
  name: Path<T>;
  label?: string;
  type?: FieldType;

  required?: boolean;
  dependsOn?: string;
  rules?: Record<string, any>;
  multiple?: boolean;
  returnOption?: boolean;

  resetFields?: string[];
  hideFieldNames?: string[];
  unHideFieldNames?: string[];

  onChange?: (value: any) => void;

  // Layout & UI
  gridProps?: GridProps;

  // Field-specific props
  fileProps?: Partial<FileProps>;
  textFieldProps?: Record<string, any>;
  dateFieldProps?: Record<string, any>;
  selectProps?: Record<string, any>;

  // Custom Component
  component?: React.ComponentType<any>;
  componentProps?: Record<string, any>;

  // Selectable Options (for dropdowns etc.)
  options?: Option[];
  icon?: React.ReactNode;
}

export type FileFieldType = "profile" | "image" | "images" | "files";

export interface FileProps {
  type?: FileFieldType;
  maxFiles?: number;
  multiple?: boolean;
  previewType?: "image" | "list" | "grid" | "pdf";
  maxSize?: number; // in KB/MB
  acceptedFileTypes?: string[];
  size?: number | "full"; // for layout
  className?: string;
  imageClass?: string;
  shape?: "circle" | "square";
  urlField?: boolean;
  autoUpload?: boolean;
}

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

export interface FormContentProps {
  fields: FieldConfig[];
  onSubmit?: (data: any) => any;
  formMethods: any;
  hiddenFields: string[];
  onDelete?: (data: any) => void;
  resetValues: (fieldNames: (string | number)[]) => void;
  onCheckboxChange: (field: any) => (event: any) => void;
  children?: React.ReactNode;
  loading?: boolean;
  error?: string;
  deleteLoading?: boolean;
  onCancel: () => void;
  submitButtonText?: React.ReactNode;
  deleteButtonText?: string;
  cancelButtonText?: string;
  onChange?: (fieldName: string, value: string) => void;
  removeField?: (fieldName: string) => void;
  dialog?: boolean;
  enableResetButton?: boolean;
  onReset?: () => void;
  resetAfterSubmit?: string;
}

export interface FormModalProps {
  open: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
  onChange?: (fieldName: string, value: string) => void;
  onSubmit?: (data: any) => Promise<{ error?: boolean } | void> | void;
  onDelete?: (data: any) => void;
  fields?: FieldConfig[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  loading?: boolean;
  deleteLoading?: boolean;
  error?: string;
  dialog?: React.ComponentType<any>;
  removeField?: (fieldName: string) => void;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
  ///
  submitButtonText?: React.ReactNode;
  deleteButtonText?: string;
  cancelButtonText?: string;
  enableResetButton?: boolean;
  resetAfterSubmit?: "default" | "new";
}
