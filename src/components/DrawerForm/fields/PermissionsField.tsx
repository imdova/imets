import React from "react";
import {
  UseFormReturn,
  FieldValues,
  Path,
  FieldError,
  useWatch,
  PathValue,
} from "react-hook-form";
import { LucideCheck, LucideMinus } from "lucide-react";
import { ModulePermission } from "../types";

// --- Types ---
type Permissions = Record<string, Record<string, boolean>>;

interface FormField<TFieldName> {
  name: Path<TFieldName>;
  label: string;
  required?: boolean;
}

interface PermissionsFieldProps<T extends FieldValues> {
  field: FormField<T>;
  form: UseFormReturn<T>;
  permissionCategories?: ModulePermission[];
}

// --- Custom Components ---
const Checkbox = React.forwardRef<
  HTMLButtonElement,
  {
    checked: boolean | "indeterminate";
    onCheckedChange: (checked: boolean | "indeterminate") => void;
    id?: string;
    className?: string;
    disabled?: boolean;
  }
>(({ checked, onCheckedChange, id, className = "", disabled = false }, ref) => {
  const handleClick = () => {
    if (disabled) return;
    if (checked === "indeterminate" || checked === false) {
      onCheckedChange(true);
    } else {
      onCheckedChange(false);
    }
  };

  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked === "indeterminate" ? "mixed" : checked}
      onClick={handleClick}
      ref={ref}
      disabled={disabled}
      className={`peer flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray-200 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary data-[state=indeterminate]:bg-secondary data-[state=checked]:text-white data-[state=indeterminate]:text-white ${className} `}
      data-state={
        checked === "indeterminate"
          ? "indeterminate"
          : checked
            ? "checked"
            : "unchecked"
      }
    >
      {checked === "indeterminate" && (
        <LucideMinus className="h-3 w-3 p-[1px]" />
      )}
      {checked === true && <LucideCheck className="h-3 w-3 p-[1px]" />}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className} `}
    {...props}
  />
));

Label.displayName = "Label";

// Toggle Switch Component
const Toggle = ({
  checked,
  onCheckedChange,
  id,
  disabled = false,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-secondary" : "bg-gray-300"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

// --- Core Data ---
const PERMISSION_CATEGORIES: ModulePermission[] = [
  {
    id: "holidays",
    label: "Holidays",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "leaves",
    label: "Leaves",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "clients",
    label: "Clients",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "projects",
    label: "Projects",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "tasks",
    label: "Tasks",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "chats",
    label: "Chats",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "assets",
    label: "Assets",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
  {
    id: "timing_sheets",
    label: "Timing Sheets",
    permissions: ["Read", "Write", "Create", "Delete", "Import", "Export"],
  },
];

// --- PermissionsField Component ---
const PermissionsField = <T extends FieldValues>({
  field,
  form,
  permissionCategories = PERMISSION_CATEGORIES,
}: PermissionsFieldProps<T>) => {
  const error = form.formState.errors[field.name] as FieldError | undefined;
  const watchedValue = useWatch({
    control: form.control,
    name: field.name,
  }) as Permissions;

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    const currentValue = (form.getValues(field.name) as Permissions) || {};

    if (enabled) {
      // Find the category and create an object with all permissions set to true
      const category = permissionCategories.find(
        (cat) => cat.id === categoryId,
      );
      if (!category) return;

      const categoryPermissions = category.permissions.reduce(
        (acc, permission) => ({
          ...acc,
          [permission.toLowerCase()]: true,
        }),
        {},
      );

      form.setValue(field.name, {
        ...currentValue,
        [categoryId]: categoryPermissions,
      } as PathValue<T, Path<T>>);
    } else {
      // Remove the entire category object from the form value
      const newValue = { ...currentValue };
      delete newValue[categoryId];
      form.setValue(field.name, newValue as PathValue<T, Path<T>>);
    }
  };

  const handlePermissionChange = (
    categoryId: string,
    permission: string,
    checked: boolean,
  ) => {
    const currentValue = (form.getValues(field.name) as Permissions) || {};
    const categoryPermissions = currentValue[categoryId] || {};

    form.setValue(field.name, {
      ...currentValue,
      [categoryId]: {
        ...categoryPermissions,
        [permission.toLowerCase()]: checked,
      },
    } as PathValue<T, Path<T>>);
  };

  const isCategoryEnabled = (categoryId: string) => {
    return !!watchedValue?.[categoryId];
  };

  const isPermissionChecked = (categoryId: string, permission: string) => {
    return !!watchedValue?.[categoryId]?.[permission.toLowerCase()];
  };

  return (
    <div className="space-y-4 rounded-md border border-gray-200 bg-white">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-3">
        <h3 className="text-base font-semibold text-gray-800">
          Enable Options
        </h3>
      </div>

      {/* The main grid container for the table, with a column for the module and a column for each permission */}
      <div className="overflow-x-auto p-4">
        <div className="inline-grid grid-cols-[150px_repeat(6,70px)] items-center whitespace-nowrap text-sm font-semibold text-gray-700">
          {/* Header Row */}
          <div className="px-3 py-2">Module</div>
          {PERMISSION_CATEGORIES[0].permissions.map((permission) => (
            <div key={permission} className="px-3 py-2 text-center"></div>
          ))}

          {/* Table Body - iterating through categories */}
          {permissionCategories.map((category) => {
            const isEnabled = isCategoryEnabled(category.id);
            return (
              <React.Fragment key={category.id}>
                {/* First column for the category name and toggle */}
                <div className="flex items-center space-x-2 border-t border-gray-200 px-3 py-2">
                  <Toggle
                    id={`${category.id}-toggle`}
                    checked={isEnabled}
                    onCheckedChange={(checked) =>
                      handleCategoryToggle(category.id, checked)
                    }
                  />
                  <Label
                    htmlFor={`${category.id}-toggle`}
                    className="cursor-pointer text-xs font-medium text-gray-900"
                  >
                    {category.label}
                  </Label>
                </div>

                {/* Remaining columns for each permission checkbox */}
                {category.permissions.map((permission) => {
                  const permissionKey = permission.toLowerCase();
                  const isPermissionCheckedState = isPermissionChecked(
                    category.id,
                    permissionKey,
                  );

                  return (
                    <div
                      key={`${category.id}-${permissionKey}`}
                      className="flex items-center gap-1 border-t border-gray-200 px-3 py-2 text-center"
                    >
                      <Checkbox
                        id={`${category.id}-${permissionKey}`}
                        checked={isPermissionCheckedState}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(
                            category.id,
                            permission,
                            checked === true,
                          )
                        }
                        disabled={!isEnabled}
                      />
                      <span className="text-xs">{permission}</span>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="p-4 text-sm text-red-500">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default PermissionsField;
