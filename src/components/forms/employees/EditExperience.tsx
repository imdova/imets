import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define your form values type
export type EditExperienceFormValues = {
  previousCompanyName: string;
  designation: string;
  startDate: string;
  endDate: string;
  workingPresent: boolean;
};

export default function EditExperience({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EditExperienceFormValues>; // safer
  variant?: "drawer" | "modal";
}) {
  const EditExperienceFormGroups: FormGroup<EditExperienceFormValues>[] = [
    {
      icon: UserPlus,
      collapsible: false,
      fields: [
        {
          name: "previousCompanyName",
          label: "Previous Company Name",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "designation",
          label: "Designation",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "endDate",
          label: "End Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "workingPresent",
          desc: "Check if you working present",
          type: "checked-label",
          grid: { xs: 12, sm: 6 },
        },
      ],
    },
  ];

  const handleSubmit = (data: EditExperienceFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EditExperienceFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EditExperienceFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Edit Experience Details"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
