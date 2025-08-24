import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define your form values type
export type EditPersonalInfoFormValues = {
  passportNo: string;
  passportExpiryDate: string;
  nationality: string;
  religion: string;
  maritalStatus: string;
  employmentSpouse: string;
  No_of_children: number;
};

export default function EditPersonalInfo({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EditPersonalInfoFormValues>; // safer
  variant?: "drawer" | "modal";
}) {
  const EditPersonalInfoFormGroups: FormGroup<EditPersonalInfoFormValues>[] = [
    {
      icon: UserPlus,
      collapsible: false,
      fields: [
        {
          name: "passportNo",
          label: "Passport No",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "passportExpiryDate",
          label: "Passport Expiry Date",
          type: "date",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "nationality",
          label: "Nationality",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "religion",
          label: "Religion",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "maritalStatus",
          label: "Marital Status",
          type: "select",
          grid: { xs: 12 },
          options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
        },
        {
          name: "employmentSpouse",
          label: "Employment Spouse",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "No_of_children",
          label: "No. of Children",
          type: "number",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
      ],
    },
  ];

  const handleSubmit = (data: EditPersonalInfoFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EditPersonalInfoFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EditPersonalInfoFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Edit Personal Info"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
