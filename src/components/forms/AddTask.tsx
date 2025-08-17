"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { contacts } from "@/constants/contacts";
import { UserPlus } from "lucide-react";

// Define your form values type
type TaskFormValues = {
  TaskTitle: string; // text
  category: "VIP" | "ColabX" | "ColabY" | "ColabZ"; // select
  responsible_persons: string[]; // user-multi-select
  startDate: string; // date
  dueDate: string; // date
  tags: string[]; // multi-select
  Phone: string; // phone
  priority: "Home" | "Work"; // select
  Status: "VIP" | "Work"; // select
  Description: string; // text-editor
};

export default function AddTask({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const TaskFormGroups: FormGroup<TaskFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "TaskTitle",
          label: "Task Title",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          required: true,
          grid: { xs: 12 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
            { value: "ColabY", label: "Colab Y" },
            { value: "ColabZ", label: "Colab Z" },
          ],
        },
        {
          name: "responsible_persons",
          label: "Responsible Persons",
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
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "tags",
          label: "Tags",
          type: "multi-select",
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Phone",
          label: "Phone",
          required: true,
          type: "phone",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "priority",
          label: "Priority",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "Home", label: "Home" },
            { value: "Work", label: "Work" },
          ],
        },
        {
          name: "Status",
          label: "Status",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "Work", label: "Colab X" },
          ],
        },
        {
          name: "Description",
          label: "Description",
          type: "text-editor",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: TaskFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<TaskFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={TaskFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Task"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
