import {
  Controller,
  UseFormReturn,
  FieldValues,
  Path,
  FieldError,
  useWatch,
  PathValue,
} from "react-hook-form";
import { ConditionalGroupFormField, FormField, GroupFormField } from "../types";
import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { FileUploadField } from "./FileUpload";
import { ToggleField } from "./ToggleField";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";
import { PhoneInput } from "./PhoneInput";
import TextEditor from "@/components/UI/editor/editor";
import { RadioGroup } from "./RadioGroup";
import Link from "next/link";
import { Plus, PlusCircle, Trash2 } from "lucide-react";
import { UserMultiSelect } from "./UserMultiSelect";
import { ListsField } from "./ListField";
import { PricingTableField } from "./PricingTableField";
import PermissionsField from "./PermissionsField";

interface FormFieldProps<T extends FieldValues> {
  field: FormField<Path<T>>;
  form: UseFormReturn<T>;
}

// Type guards
export function isConditionalGroupField<T extends string>(
  field: FormField<T>,
): field is ConditionalGroupFormField<T> {
  return field.type === "conditional-group";
}

export function isGroupField<T extends string>(
  field: FormField<T>,
): field is GroupFormField<T> | ConditionalGroupFormField<T> {
  return field.type === "field-group" || field.type === "conditional-group";
}

export const FormFieldRenderer = <T extends FieldValues>({
  field,
  form,
}: FormFieldProps<T>) => {
  const error = form.formState.errors[field.name] as FieldError | undefined;
  const watchedValue = useWatch({ control: form.control, name: field.name });

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

  const handleAddItem = () => {
    if (!isGroupField(field)) return;

    const currentItems = form.getValues(`${field.name}.items` as Path<T>) || [];
    const fieldsToUse =
      field.type === "field-group"
        ? field.fields
        : field.conditionalFields[watchedValue?.type] || [];

    const newItem = fieldsToUse.reduce((acc, df) => {
      return { ...acc, [df.name]: "" };
    }, {});

    form.setValue(
      `${field.name}.items` as Path<T>,
      [...currentItems, newItem] as PathValue<T, Path<T>>,
      { shouldValidate: true },
    );
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = form.getValues(`${field.name}.items` as Path<T>) || [];
    const updatedItems = currentItems.filter((_, i) => i !== index);

    form.setValue(
      `${field.name}.items` as Path<T>,
      updatedItems as PathValue<T, Path<T>>,
      { shouldValidate: true },
    );
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        {field.addButn &&
          (field.addButn.herf ? (
            <Link
              className="flex items-center gap-1 text-sm text-secondary hover:underline"
              href={field.addButn.herf}
            >
              <Plus size={13} />
              {field.addButn.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={field.addButn?.onclick || handleAddItem}
              className="flex items-center gap-1 text-sm text-secondary hover:underline"
            >
              <Plus size={13} />
              {field?.addButn?.label || "Add"}
            </button>
          ))}
      </div>

      {isGroupField(field) ? (
        <div className="space-y-4">
          {field.type === "conditional-group" && (
            <Controller
              name={`${field.name}.type` as Path<T>}
              control={form.control}
              rules={validationRules}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value}
                  onChange={onChange}
                  field={{
                    ...field,
                    options: field.options || [],
                  }}
                />
              )}
            />
          )}

          {field.dynamic ? (
            <>
              {(watchedValue?.items || [{}]).map(
                (_: unknown, index: number) => {
                  const currentFields =
                    field.type === "field-group"
                      ? field.fields
                      : field.conditionalFields[watchedValue?.type] || [];
                  if (
                    field.type === "conditional-group" &&
                    field.conditionalFields[watchedValue?.type]?.length === 0
                  ) {
                    return;
                  }

                  return (
                    <div key={index} className="flex items-end gap-4">
                      <div className="grid flex-1 grid-cols-2 gap-4">
                        {currentFields.map((subField) => (
                          <div
                            className={`${
                              !["text", "email", "textarea"].includes(
                                subField.type,
                              ) && "col-span-2"
                            }`}
                            key={subField.name}
                          >
                            <Controller
                              key={`${subField.name}-${index}`}
                              name={
                                `${field.name}.items.${index}.${subField.name}` as Path<T>
                              }
                              control={form.control}
                              rules={{
                                required: subField.required
                                  ? subField.errorMessage ||
                                    `${subField.label} is required`
                                  : false,
                              }}
                              render={({ field: controllerField }) => (
                                <div className="flex flex-col">
                                  {index === 0 && (
                                    <label className="block text-sm font-medium text-gray-700">
                                      {subField.label}
                                      {subField.required && (
                                        <span className="text-red-500">*</span>
                                      )}
                                    </label>
                                  )}
                                  {["text", "email", "textarea"].includes(
                                    subField.type,
                                  ) && (
                                    <TextField
                                      field={{
                                        ...subField,
                                        name: `${field.name}.items.${index}.${subField.name}` as Path<T>,
                                        label:
                                          index === 0 ? subField.label : ``,
                                        type: subField.type as
                                          | "text"
                                          | "email"
                                          | "textarea",
                                      }}
                                      form={form}
                                      {...controllerField}
                                    />
                                  )}

                                  {subField.type === "user-multi-select" && (
                                    <UserMultiSelect
                                      field={{
                                        ...subField,
                                        name: `${field.name}.items.${index}.${subField.name}` as Path<T>,
                                        label:
                                          index === 0 ? subField.label : ``,
                                        type: "multi-select",
                                        options:
                                          "options" in subField
                                            ? (subField.options ?? [])
                                            : [],
                                      }}
                                      {...controllerField}
                                    />
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="mb-1 pb-3 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                      {index === 0 &&
                        currentFields[0]?.type !== "user-multi-select" && (
                          <button
                            type="button"
                            onClick={handleAddItem}
                            className="pb-3 text-secondary"
                          >
                            <PlusCircle size={13} />
                          </button>
                        )}
                    </div>
                  );
                },
              )}
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {(field.type === "field-group"
                ? field.fields
                : field.conditionalFields[watchedValue?.type] || []
              ).map((subField) => (
                <FormFieldRenderer
                  key={subField.name}
                  field={{
                    ...subField,
                    name: `${field.name}.${subField.name}` as Path<T>,
                    label: subField.label,
                    type: subField.type as "text" | "email" | "textarea",
                  }}
                  form={form}
                />
              ))}
            </div>
          )}
        </div>
      ) : field.type === "text" ||
        field.type === "password" ||
        field.type === "number" ||
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
      ) : field.type === "list" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: {} }) => (
            <ListsField<T> form={form} fields={field} />
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
      ) : field.type === "user-multi-select" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: { value, onChange } }) => (
            <UserMultiSelect
              field={field}
              value={value}
              onChange={onChange}
              placeholder={field.placeholder}
              isDropdown={field.isDropDown}
            />
          )}
        />
      ) : field.type === "pricing-table" ? (
        <PricingTableField field={field} form={form} />
      ) : field.type === "permissions" ? (
        <Controller
          name={field.name as Path<T>}
          control={form.control}
          rules={validationRules}
          render={({ field: controllerField }) => (
            <PermissionsField<T>
              permissionCategories={field.permissionCategories}
              field={{
                ...field,
                name: field.name as Path<T>,
              }}
              form={form}
              {...controllerField}
            />
          )}
        />
      ) : null}

      {error && (
        <p className="text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  );
};
