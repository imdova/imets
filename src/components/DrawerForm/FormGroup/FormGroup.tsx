import { UseFormReturn, FieldValues } from "react-hook-form";
import { FormFieldRenderer } from "../fields/FormField";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { GridWrapper } from "./GridWrapper";
import { FormGroup } from "../types";

interface FormGroupProps<T extends FieldValues> {
  group: FormGroup<T>;
  form: UseFormReturn<T>;
  isOpen: boolean;
  onToggle: () => void;
}

export const FormGroupRenderer = <T extends FieldValues>({
  group,
  form,
  isOpen,
  onToggle,
}: FormGroupProps<T>) => {
  return (
    <CollapsibleGroup
      title={group.title}
      isOpen={isOpen}
      icon={group.icon}
      onToggle={onToggle}
    >
      <div className="grid grid-cols-12 gap-4">
        {group.fields.map((field) => (
          <GridWrapper key={field.name} grid={field.grid}>
            <FormFieldRenderer<T> field={field} form={form} />
          </GridWrapper>
        ))}
      </div>
    </CollapsibleGroup>
  );
};
