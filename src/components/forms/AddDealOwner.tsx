"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { contacts } from "@/constants/contacts";

// Define your form values type
type DealOwnerFormValues = {
  DealOwner: string;
};

export default function AddDealOwner({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const DealOwnerFormGroups: FormGroup<DealOwnerFormValues>[] = [
    {
      collapsible: false,
      fields: [
        {
          name: "DealOwner",
          label: "Deal Owner",
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

  const handleSubmit = (data: DealOwnerFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<DealOwnerFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      minHight={500}
      groups={DealOwnerFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Deal Owner"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
