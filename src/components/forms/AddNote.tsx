"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";

// Define your form values type
type NoteFormValues = {
  title: string;
  note: string;
  attachment: File[]; // assuming multiple file uploads, change to File if only one
};

export default function AddNote({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const NoteFormGroups: FormGroup<NoteFormValues>[] = [
    {
      collapsible: false,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
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

        {
          name: "attachment",
          label: "Attachment",
          type: "file",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: NoteFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<NoteFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={NoteFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Note"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
