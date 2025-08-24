import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define emergency contact structure
export type ContactDetails = {
  name: string;
  relationship: string;
  phone1: string;
  phone2: string;
};

// Define form values type
export type EditEmergencyContactFormValues = {
  firstContact: ContactDetails;
  secondaryContact: ContactDetails;
};

export default function EditEmergencyContact({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EditEmergencyContactFormValues>;
  variant?: "drawer" | "modal";
}) {
  const EditEmergencyContactFormGroups: FormGroup<EditEmergencyContactFormValues>[] =
    [
      {
        icon: UserPlus,
        title: "First Contact Details",
        collapsible: false,
        fields: [
          {
            name: "firstContact.name",
            label: "Name",
            type: "text",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
          {
            name: "firstContact.relationship",
            label: "Relationship",
            type: "text",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
          {
            name: "firstContact.phone1",
            label: "Phone No 1",
            type: "phone",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
          {
            name: "firstContact.phone2",
            label: "Phone No 2",
            type: "phone",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
        ],
      },
      {
        icon: UserPlus,
        title: "Secondary Contact Details",
        collapsible: false,
        fields: [
          {
            name: "secondaryContact.name",
            label: "Name",
            type: "text",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
          {
            name: "secondaryContact.relationship",
            label: "Relationship",
            type: "text",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
          {
            name: "secondaryContact.phone1",
            label: "Phone No 1",
            type: "phone",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
          {
            name: "secondaryContact.phone2",
            label: "Phone No 2",
            type: "phone",
            required: true,
            grid: { xs: 12, sm: 6 },
          },
        ],
      },
    ];

  const handleSubmit = (data: EditEmergencyContactFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EditEmergencyContactFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EditEmergencyContactFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Edit Emergency Contact"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
