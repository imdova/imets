/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfig } from "@/types/forms";
import { Path } from "react-hook-form";
export const getDefaultValues = (
  fields: FieldConfig[],
  initialValues: Record<string, any>,
): Record<string, any> => ({
  ...fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.type === "checkbox" ? false : "",
    }),
    {},
  ),
  ...initialValues,
});

export function getNestedValue<T>(formValues: T, path: Path<T>): any {
  const keys = path.split(".") as (keyof T)[];
  const value = keys.reduce((current: any, key: keyof T) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, formValues);
  return value;
}

export function toStringArray(data: any): string[] {
  if (data == null) {
    return [];
  }

  if (typeof data === "string") {
    // Split by comma if present
    return data.includes(",")
      ? data
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      : [data];
  }

  if (
    typeof data === "number" ||
    typeof data === "boolean" ||
    typeof data === "bigint" ||
    typeof data === "symbol"
  ) {
    return [String(data)];
  }

  if (Array.isArray(data)) {
    return data.map((item) => String(item));
  }

  if (typeof data === "object") {
    return Object.entries(data).map(
      ([key, value]) => `${key}: ${String(value)}`,
    );
  }

  return [];
}
