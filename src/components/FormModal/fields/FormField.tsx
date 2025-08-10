/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { CheckboxField } from "./CheckboxField";
import { ComponentField } from "./ComponentField";
import { TextFieldComponent } from "./TextFieldComponent";
import DatePickerField from "./DatePickerField";
import { RadioFieldComponent } from "./RadioField";
import { TextEditorField } from "./TextEditorField";
import { getNestedValue } from "@/util/forms";
import SelectField from "./SelectField";
import SearchableSelectField from "./SearchableSelectField";
import { CodeEditorField } from "./CodeEditorField";
import { ErrorField, FieldConfig } from "@/types/forms";
import MultiTextInput from "./MultiTextInput";
import OTPInput from "./OTP";
import { Trash } from "lucide-react";
import TimeField from "./TimeField";
import IconButton from "@/components/UI/Buttons/IconButton";

interface FormFieldProps {
  field: FieldConfig;
  control?: Control<FieldValues>; // Simplified Control type
  fieldController?: Partial<ControllerRenderProps<FieldValues, string>>;
  dependsOnField?: FieldConfig;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetValues?: (fieldNames: string[]) => void;
  removeField?: (fieldName: string) => void;
  data?: any;
  formValues?: Record<string, any>;
  setData?: React.Dispatch<React.SetStateAction<any>>;
  onChange?: (fieldName: string, value: string) => void;
  errors?: ErrorField[];
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  control,
  onCheckboxChange,
  formValues: initialFormValue,
  resetValues,
  dependsOnField,
  fieldController,
  removeField,
  data,
  setData,
  onChange,
  errors,
}) => {
  const formValues = initialFormValue || data;

  const renderField = ({
    field: controllerField,
    fieldState,
  }: {
    field: Partial<ControllerRenderProps<FieldValues, string>>;
    fieldState?: ControllerFieldState;
  }): React.ReactElement => {
    const dataError =
      errors && errors.length > 0
        ? (errors.find((x) => x.field === field.name) as unknown as FieldError)
        : null;
    const error = fieldState?.error || dataError || null;
    const handleChange = (e: any) => {
      if (field.onChange) {
        field.onChange(e);
      }
      if (controllerField.onChange) {
        controllerField.onChange(e);
      }
      if (onChange) {
        const value = e && e.target ? e.target.value : e;
        onChange(field.name as string, value);
      }
    };
    const newControllerField = { ...controllerField, onChange: handleChange };
    switch (field.type) {
      case "checkbox":
        return (
          <CheckboxField
            field={field}
            controllerField={newControllerField}
            resetValues={resetValues}
            onCheckboxChange={onCheckboxChange}
          />
        );
      case "select":
        return (
          <SelectField
            field={field}
            controllerField={newControllerField}
            error={error}
            formValues={formValues}
            resetValues={resetValues}
            dependsOnField={dependsOnField}
          />
        );
      case "time":
        return (
          <TimeField
            field={field}
            controllerField={newControllerField}
            error={error}
          />
        );
      case "search-select":
        return (
          <SearchableSelectField
            field={field}
            controllerField={newControllerField}
            error={error}
            resetValues={resetValues}
            formValues={formValues}
            dependsOnField={dependsOnField}
          />
        );
      case "component":
        if (field.component) {
          return (
            <ComponentField
              field={field}
              controllerField={newControllerField}
              error={error}
            />
          );
        }
        break;

      case "textEditor":
        return (
          <TextEditorField
            field={field}
            controllerField={newControllerField}
            error={error}
          />
        );

      case "date":
        return (
          <DatePickerField
            field={field}
            controllerField={newControllerField}
            error={error}
          />
        );
      case "radio":
        return (
          <RadioFieldComponent
            field={field}
            controllerField={newControllerField}
            error={error}
          />
        );
      case "otp":
        return (
          <OTPInput
            field={field}
            length={6}
            onChange={controllerField.onChange}
            error={error}
          />
        );
      case "multi-text":
        return (
          <MultiTextInput field={field} error={error} {...newControllerField} />
        );

      case "code":
        return (
          <CodeEditorField
            field={field}
            controllerField={newControllerField}
            error={error}
          />
        );
      default:
        return (
          <TextFieldComponent
            field={field}
            controllerField={newControllerField}
            error={error}
          />
        );
    }
    // Fallback case to ensure we always return an element
    return (
      <TextFieldComponent
        field={field}
        controllerField={newControllerField}
        error={error}
      />
    );
  };

  return (
    <div className="flex items-end gap-2">
      {control ? (
        <div className="max-w-full flex-1">
          <Controller
            name={String(field.name)}
            control={control}
            rules={{
              required: field.required
                ? `${
                    field.label?.replace("*", "") || String(field.name)
                  } is required`
                : false,
              ...field.rules,
            }}
            render={renderField}
          />
        </div>
      ) : fieldController ? (
        <div className="max-w-full flex-1">
          {renderField({ field: fieldController })}
        </div>
      ) : (
        data &&
        setData && (
          <div className="max-w-full flex-1">
            {renderField({
              field: {
                value: getNestedValue(data, field.name as string),
                name: field.name as string,
              },
            })}
          </div>
        )
      )}
      {removeField && (
        <IconButton
          onClick={() => {
            resetValues?.([field.name]);
            removeField(field.name);
          }}
          Icon={Trash}
        />
      )}
    </div>
  );
};
