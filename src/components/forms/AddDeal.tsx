"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define your form values type
type DealFormValues = {
  dealName: string;
  pipeine: string;
  status: string;
  amount: string;
  Currency: string;
  period: string;
  periodValue: string;
  contact: string[]; // multi-select
  project: string[]; // multi-select
  followUpDate: string; // date
  source: string;
  tags: string[]; // multi-select
  priority: string;
  Description: string;
};

export default function AddDeal({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const dealFormGroups: FormGroup<DealFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "dealName",
          label: "Deal Name",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "pipeine",
          label: "Pipeine",
          type: "select",
          required: true,
          grid: { xs: 12, sm: 6 },
          addButn: {
            label: "Add New",
            onclick: () => console.log("clicked"),
          },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
            { value: "ColabY", label: "Colab Y" },
            { value: "ColabZ", label: "Colab Z" },
          ],
        },
        {
          name: "status",
          label: "Status",
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
          name: "amount",
          label: "Deal Value",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Currency",
          label: "Currency",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "period",
          label: "Period",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "periodValue",
          label: "Period Value",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "contact",
          label: "Contact",
          required: true,
          type: "multi-select",
          grid: { xs: 12 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "project",
          label: "Project",
          required: true,
          type: "multi-select",
          grid: { xs: 12 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "followUpDate",
          label: "Follow Up Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "source",
          label: "Source",
          type: "text",
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
          name: "priority",
          label: "Priority",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
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

  const handleSubmit = (data: DealFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<DealFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={dealFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Deal"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
