"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";

// Define your form values type
type CallFormValues = {
  status: string;
  FollowDate: string;
  note: string; // assuming multiple file uploads, change to File if only one
};

export default function AddCall({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const CallFormGroups: FormGroup<CallFormValues>[] = [
    {
      collapsible: false,
      fields: [
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { label: "Busy", value: "Busy" },
            { label: "No Answer", value: "No Answer" },
            { label: "Unavailable", value: "Unavailable" },
            { label: "Wrong number", value: "Wrong number" },
            { label: "Left Voice Messge", value: "Left Voice Messge" },
            { label: "Moving Forward", value: "Moving Forward" },
          ],
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "FollowDate",
          label: "Follow Up Date",
          type: "date",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "note",
          label: "Note",
          type: "text-editor",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: CallFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<CallFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={CallFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Call"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
