"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { contacts } from "@/constants/contacts";
import { UserPlus } from "lucide-react";

// Define your form values type
type ProjectFormValues = {
  name: string; // text
  id: string; // text
  project_type: "VIP" | "ColabX" | "ColabY" | "ColabZ"; // select
  client: string[]; // multi-select
  category: "VIP" | "ColabX" | "ColabY" | "ColabZ"; // select
  project_timing: "VIP" | "ColabX" | "ColabY" | "ColabZ"; // select
  price: string; // text
  responsible_persons: string[]; // user-multi-select
  team_leader: string[]; // user-multi-select
  startDate: string; // date
  dueDate: string; // date
  priority: "Home" | "Work"; // select
  Status: "VIP" | "Work"; // select
  Description: string; // text-editor
};

export default function AddProject({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const ProjectFormGroups: FormGroup<ProjectFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "id",
          label: "Project ID",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "project_type",
          label: "Project Type",
          type: "select",
          required: true,
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
            { value: "ColabY", label: "Colab Y" },
            { value: "ColabZ", label: "Colab Z" },
          ],
        },
        {
          name: "client",
          label: "Client",
          type: "multi-select",
          required: true,
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
            { value: "ColabY", label: "Colab Y" },
            { value: "ColabZ", label: "Colab Z" },
          ],
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          required: true,
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
            { value: "ColabY", label: "Colab Y" },
            { value: "ColabZ", label: "Colab Z" },
          ],
        },
        {
          name: "project_timing",
          label: "Project Timing",
          type: "select",
          required: true,
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
            { value: "ColabY", label: "Colab Y" },
            { value: "ColabZ", label: "Colab Z" },
          ],
        },
        {
          name: "price",
          label: "Price",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "responsible_persons",
          label: "Responsible Persons",
          type: "user-multi-select",
          isDropDown: true,
          isMulti: true,
          options: [
            ...contacts.map((contact) => ({
              value: contact.id,
              label: contact.name,
              image: contact.avatar,
            })),
          ],
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "team_leader",
          label: "Team Leader",
          type: "user-multi-select",
          isMulti: true,
          isDropDown: true,
          options: [
            ...contacts.map((contact) => ({
              value: contact.id,
              label: contact.name,
              image: contact.avatar,
            })),
          ],
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
          name: "dueDate",
          label: "Due Date",
          type: "date",
          required: true,
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

  const handleSubmit = (data: ProjectFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<ProjectFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={ProjectFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Project"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
