import { UseFormReturn, FieldValues } from "react-hook-form";
import { FormFieldRenderer } from "../fields/FormField";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { GridWrapper } from "./GridWrapper";
import { FormGroup } from "../types";

interface FormGroupProps<T extends FieldValues> {
  group: FormGroup<T>;
  form: UseFormReturn<T>;
  isOpen?: boolean; // Make optional as it's not needed for non-collapsible
  onToggle?: () => void; // Make optional
  collapsible?: boolean; // New prop to control collapsibility
}

export const FormGroupRenderer = <T extends FieldValues>({
  group,
  form,
  isOpen = true, // Default to open
  onToggle = () => {}, // Default empty function
  collapsible = true, // Default to collapsible
}: FormGroupProps<T>) => {
  const Icon = group.icon;
  // Content to render - separated for reusability
  const content = (
    <div className="grid grid-cols-12 gap-4">
      {group.fields.map((field) => (
        <GridWrapper key={field.name} grid={field.grid}>
          <FormFieldRenderer<T> field={field} form={form} />
        </GridWrapper>
      ))}
    </div>
  );

  return collapsible ? (
    <CollapsibleGroup
      title={group?.title}
      isOpen={isOpen}
      icon={group.icon}
      onToggle={onToggle}
    >
      {content}
    </CollapsibleGroup>
  ) : (
    <div className="mb-6 p-2">
      {/* Non-collapsible header */}
      {group.title && (
        <div className="mb-4 flex items-center gap-1">
          {Icon && (
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-white">
              {Icon && <Icon className="h-4 w-4" />}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
        </div>
      )}
      {/* Same content as collapsible version */}
      {content}
    </div>
  );
};
