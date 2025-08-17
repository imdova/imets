"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { companies } from "@/constants/companies";
import { contacts } from "@/constants/contacts";
import { UserPlus } from "lucide-react";

// Define your form values type
type LeadFormValues = {
  leadName: string; // Lead Name
  leadType: "Person" | "Organization"; // Lead Type (radio)
  companyName: string; // Company Name (select)
  value: string; // Value
  currency: string; // Currency (select)
  Phone: string; // Phone
  phonetype: "Home" | "Work"; // Phone Type (select)
  source: string; // Source (select)
  industry: string; // Industry (select)
  owner: string[]; // Owner (multi-select)
  tags: string[]; // Tags (multi-select)
  Description: string; // Description (text-editor)
  Visibility: "Public" | "Private" | "Select Pepole"; // radio
};

export default function AddLead({
  isOpen,
  setIsOpen,
  setIsCompanyopen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  setIsCompanyopen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const LeadFormGroups: FormGroup<LeadFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "leadName",
          label: "Lead Name",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "leadType",
          label: "Lead Type",
          type: "radio",
          options: [
            { value: "Person", label: "Person" },
            { value: "Organization", label: "Organization" },
          ],
          grid: { xs: 12 },
        },
        {
          name: "companyName",
          label: "Company Name",
          type: "select",
          required: true,
          grid: { xs: 12 },
          addButn: {
            label: "Add New",
            onclick: () => setIsCompanyopen(true),
          },
          options: companies.map((company) => ({
            label: company.name,
            value: company.id,
          })),
        },
        {
          name: "value",
          label: "Value ",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "currency",
          label: "Currency",
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
          name: "Phone",
          label: "Phone",
          required: true,
          type: "phone",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "phonetype",
          label: "Phone Type",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "Home", label: "Home" },
            { value: "Work", label: "Work" },
          ],
        },
        {
          name: "source",
          label: "Source",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "Work", label: "Colab X" },
          ],
        },
        {
          name: "industry",
          label: "Industry",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "Work", label: "Colab X" },
          ],
        },
        {
          name: "owner",
          label: "Owner",
          required: true,
          type: "multi-select",
          grid: { xs: 12 },
          options: contacts.map((contact) => ({
            label: contact.name,
            value: contact.id,
          })),
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
          name: "Description",
          label: "Description",
          type: "text-editor",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "Visibility",
          label: "Visibility",
          type: "radio",
          options: [
            { value: "Public", label: "Public" },
            { value: "Private", label: "Private" },
            { value: "Select Pepole", label: "Select Pepole" },
          ],
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: LeadFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<LeadFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={LeadFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Lead"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
