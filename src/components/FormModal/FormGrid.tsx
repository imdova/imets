/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormGridItem } from "./FormGridItem";
import { cn } from "@/util";
import { FieldConfig } from "@/types/forms";

export const FormGrid = ({
  fields,
  control,
  hiddenFields,
  onCheckboxChange,
  onChange,
  removeField,
  getValues,
  resetValues,
  dialog = false,
}: {
  fields: FieldConfig[];
  control?: any;
  onCheckboxChange?: (field: any) => (event: any) => void;
  resetValues?: (fieldNames: string[]) => void;
  removeField?: (fieldName: string) => void;
  onChange?: (fieldName: string, value: string) => void;
  hiddenFields?: string[];
  getValues?: () => any;
  dialog?: boolean;
}) => {
  // col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12
  // sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12
  // md:col-span-1 md:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12
  // row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6 row-span-7 row-span-8 row-span-9 row-span-10 row-span-11 row-span-12
  // sm:row-span-1 sm:row-span-2 sm:row-span-3 sm:row-span-4 sm:row-span-5 sm:row-span-6 sm:row-span-7 sm:row-span-8 sm:row-span-9 sm:row-span-10 sm:row-span-11 sm:row-span-12
  // md:row-span-1 md:row-span-2 md:row-span-3 md:row-span-4 md:row-span-5 md:row-span-6 md:row-span-7 md:row-span-8 md:row-span-9 md:row-span-10 md:row-span-11 md:row-span-12
  return (
    <div className={cn("mt-1 grid grid-cols-12 gap-4", dialog ? "p-0" : "p-4")}>
      {fields.map((field) => (
        <FormGridItem
          key={String(field.name)}
          field={field}
          fields={fields}
          hiddenFields={hiddenFields}
          control={control}
          onCheckboxChange={onCheckboxChange}
          onChange={onChange}
          removeField={removeField}
          getValues={getValues}
          resetValues={resetValues}
        />
      ))}
    </div>
  );
};
