/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfig } from "@/types/forms";
import { getDefaultValues } from "@/util/forms";
import { useEffect, useRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

function deepEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export const useFormState = (
  open: boolean,
  fields: FieldConfig[],
  initialValues: Record<string, any>,
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined,
): UseFormReturn<any> => {
  const defaultValues = getDefaultValues(fields, initialValues);

  const formMethods = useForm({
    mode,
    defaultValues,
  });

  const { reset } = formMethods;

  const prevDefaultsRef = useRef(defaultValues);

  useEffect(() => {
    if (open) {
      const newDefaults = getDefaultValues(fields, initialValues);

      const hasChanged = !deepEqual(prevDefaultsRef.current, newDefaults);

      if (hasChanged) {
        reset(newDefaults);
        prevDefaultsRef.current = newDefaults;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fields, initialValues]);

  return formMethods;
};
