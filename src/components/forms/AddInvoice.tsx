"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { companies } from "@/constants/companies";
import { projects } from "@/constants/projects";
import { UserPlus } from "lucide-react";

type PricingItem = {
  description: string;
  quantity: number;
  price: number;
  discount: number;
  amount: number;
};

type InvoiceFormValues = {
  clint: string; // select
  billTo: string; // text
  shipTo: string; // text
  project: string; // select
  amount: string; // text
  currency: "Home" | "Work"; // select
  date: string; // date
  openTill: string; // date
  paymentMethod: "Home" | "Work"; // select
  Status: "VIP" | "Work"; // select
  Description: string; // text-editor
  pricing: PricingItem[]; // pricing-table
  notes: string; // textarea
  termsConditions: string; // textarea
};

export default function AddInvoice({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const InvoiceFormGroups: FormGroup<InvoiceFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "clint",
          label: "Clint",
          type: "select",
          required: true,
          grid: { xs: 12 },
          options: companies.map((company) => ({
            value: company.id,
            label: company.name,
          })),
        },
        {
          name: "billTo",
          label: "Bill To",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "shipTo",
          label: "Ship To",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "project",
          label: "Project",
          type: "select",
          required: true,
          grid: { xs: 12 },
          options: projects.map((project) => ({
            value: project.id,
            label: project.name,
          })),
        },
        {
          name: "amount",
          label: "Amount",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "currency",
          label: "Currency ",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "Home", label: "Home" },
            { value: "Work", label: "Work" },
          ],
        },
        {
          name: "date",
          label: "Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "openTill",
          label: "Open Till",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "paymentMethod",
          label: "Payment Method",
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
        {
          name: "pricing",
          label: "Pricing Details",
          type: "pricing-table",
          required: false,
          showDiscount: true,
          showExtraDiscount: true,
          showTax: true,
          defaultDiscount: 2, // 2%
          defaultExtraDiscount: 0, // 0%
          defaultTax: 0, // 0%
        },
        {
          name: "notes",
          label: "Notes",
          type: "textarea",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "termsConditions",
          label: "Terms & Conditions",
          type: "textarea",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: InvoiceFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<InvoiceFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={InvoiceFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Invoice"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
