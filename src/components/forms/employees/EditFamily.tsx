import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define your form values type
export type EditFamilyFormValues = {
  name: string;
  relationship: string;
  phone: string;
  passportExpiryDate: string;
};

export default function EditFamily({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EditFamilyFormValues>; // safer
  variant?: "drawer" | "modal";
}) {
  const EditFamilyFormGroups: FormGroup<EditFamilyFormValues>[] = [
    {
      icon: UserPlus,
      collapsible: false,
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "relationship",
          label: "Relationship",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "phone",
          label: "Phone",
          type: "phone",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "passportExpiryDate",
          label: "Passport Expiry Date",
          type: "date",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: EditFamilyFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EditFamilyFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EditFamilyFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Edit Family Details"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
