import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define your form values type
export type EditEducationFormValues = {
  institutionName: string;
  course: string;
  startDate: string;
  endDate: string;
};

export default function EditEducation({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EditEducationFormValues>; // safer
  variant?: "drawer" | "modal";
}) {
  const EditEducationFormGroups: FormGroup<EditEducationFormValues>[] = [
    {
      icon: UserPlus,
      collapsible: false,
      fields: [
        {
          name: "institutionName",
          label: "Institution Name",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "course",
          label: "Course",
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
      ],
    },
  ];

  const handleSubmit = (data: EditEducationFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EditEducationFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EditEducationFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Edit Education Details"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
