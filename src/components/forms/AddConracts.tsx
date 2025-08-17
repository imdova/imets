"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { contacts } from "@/constants/contacts";

// Define your form values type
type ConractsFormValues = {
  conracts: string;
};

export default function AddConracts({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const ConractsFormGroups: FormGroup<ConractsFormValues>[] = [
    {
      collapsible: false,
      fields: [
        {
          name: "conracts",
          label: "Conracts",
          type: "user-multi-select",
          isMulti: true,
          options: [
            ...contacts.map((contact) => ({
              value: contact.id,
              label: contact.name,
              image: contact.avatar,
            })),
          ],
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: ConractsFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<ConractsFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      minHight={500}
      groups={ConractsFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Conracts"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
