import { FieldConfig } from "@/types/forms";
import React, { useState } from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import TextField from "./TextField";
import { Eye, EyeOff } from "lucide-react";
import IconButton from "@/components/UI/Buttons/IconButton";

interface TextFieldProps {
  field: FieldConfig;
  controllerField?: Partial<ControllerRenderProps<FieldValues, string>>;
  error?: FieldError | null;
}

const TEXTAREA = {
  placeholder:
    "Briefly describe what the course covered, e.g., emergency procedures, patient care, healthcare technology.",
  sx: {
    "& .MuiOutlinedInput-root": {
      p: 0,
      borderRadius: "10px",
      height: "auto",
    },
  },
  multiline: true,
  minRows: 4,
  maxRows: 14,
};

export const TextFieldComponent: React.FC<TextFieldProps> = ({
  field,
  controllerField,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const placeholder =
    "Enter " +
    (field.textFieldProps?.label
      ? String(field.textFieldProps?.label).replace("*", "")
      : field.label
        ? field.label?.replace("*", "")
        : field.name);

  const { className, ...labelProps } =
    field.textFieldProps?.InputLabelProps || {};
  return (
    <div className={field.textFieldProps?.label ? "mt-2" : ""}>
      {field.label && (
        <div className="mb-1">
          <label
            htmlFor={String(field.name)}
            className={`font-semibold ${className}`}
            {...labelProps}
          >
            {field.label?.replace("*", "")}
            {field.required ? <span className="text-red-500">*</span> : null}
          </label>
        </div>
      )}
      <TextField
        {...controllerField}
        {...(field.type === "textArea" ? TEXTAREA : {})}
        {...field.textFieldProps}
        placeholder={field.textFieldProps?.placeholder || placeholder || ""}
        type={
          field.type === "password"
            ? !showPassword
              ? "password"
              : "text"
            : field.type
        } // Conditional type
        error={!!error}
        helperText={error?.message}
        endIcon={
          field.type === "password" ? (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              Icon={showPassword ? EyeOff : Eye}
            />
          ) : (
            ""
          )
        }
      />
    </div>
  );
};
