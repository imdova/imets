"use client";

import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { DollarSign } from "lucide-react";

// ✅ Fixed full form values type
export type AddBankFormValues = {
  // Bank Details
  bankDetails: string;
  bankAccountNo: string;
  ifscCode: string;
  branchAddress: string;

  // Salary Information
  salaryDuration: "Weekly" | "Monthly" | "Annualy";
  salaryBasis: string;
  paymentType: "Cash" | "Debit Card" | "Mobile Payment";

  // PF Information
  PF_contribution: "Weekly" | "Monthly" | "Annualy";
  PF_No: string;
  employee_PF_rate: string;
  additionalRate_PF: "Cash" | "Debit Card" | "Mobile Payment";
  totalRate_PF: string;

  // ESI Information
  ESI_contribution: "Weekly" | "Monthly" | "Annualy";
  ESI_number: string;
  employee_ESI_rate: string;
  additionalRate_ESI: "Cash" | "Debit Card" | "Mobile Payment";
  totalRate_ESI: string;
};

// ✅ Dummy initial values
const initialValues: AddBankFormValues = {
  bankDetails: "ABC Bank",
  bankAccountNo: "1234567890",
  ifscCode: "ABC0001234",
  branchAddress: "Downtown Branch, City",

  salaryDuration: "Monthly",
  salaryBasis: "Fixed",
  paymentType: "Cash",

  PF_contribution: "Monthly",
  PF_No: "PF123456",
  employee_PF_rate: "12%",
  additionalRate_PF: "Cash",
  totalRate_PF: "15%",

  ESI_contribution: "Monthly",
  ESI_number: "ESI987654",
  employee_ESI_rate: "1.75%",
  additionalRate_ESI: "Cash",
  totalRate_ESI: "4.75%",
};

export default function AddBank({
  title,
  isOpen,
  setIsOpen,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const AddBankFormGroups: FormGroup<AddBankFormValues>[] = [
    {
      icon: DollarSign,
      title: "Basic Salary Information",
      collapsible: false,
      fields: [
        {
          name: "salaryDuration",
          label: "Salary duration",
          type: "select",
          options: [
            { value: "Weekly", label: "Weekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "Annualy", label: "Annualy" },
          ],
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "salaryBasis",
          label: "Salary basis",
          icon: DollarSign,
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "paymentType",
          label: "Payment type",
          type: "select",
          options: [
            { value: "Cash", label: "Cash" },
            { value: "Debit Card", label: "Debit Card" },
            { value: "Mobile Payment", label: "Mobile Payment" },
          ],
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
      ],
    },
    {
      icon: DollarSign,
      title: "PF Information",
      collapsible: false,
      fields: [
        {
          name: "PF_contribution",
          label: "PF contribution",
          type: "select",
          options: [
            { value: "Weekly", label: "Weekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "Annualy", label: "Annualy" },
          ],
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "PF_No",
          label: "PF No",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "employee_PF_rate",
          label: "Employee PF rate",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "additionalRate_PF",
          label: "Additional rate",
          type: "select",
          options: [
            { value: "Cash", label: "Cash" },
            { value: "Debit Card", label: "Debit Card" },
            { value: "Mobile Payment", label: "Mobile Payment" },
          ],
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "totalRate_PF",
          label: "Total rate",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
      ],
    },
    {
      icon: DollarSign,
      title: "ESI Information",
      collapsible: false,
      fields: [
        {
          name: "ESI_contribution",
          label: "ESI contribution",
          type: "select",
          options: [
            { value: "Weekly", label: "Weekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "Annualy", label: "Annualy" },
          ],
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "ESI_number",
          label: "ESI Number",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "employee_ESI_rate",
          label: "Employee ESI rate",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "additionalRate_ESI",
          label: "Additional rate",
          type: "select",
          options: [
            { value: "Cash", label: "Cash" },
            { value: "Debit Card", label: "Debit Card" },
            { value: "Mobile Payment", label: "Mobile Payment" },
          ],
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "totalRate_ESI",
          label: "Total rate",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
      ],
    },
  ];

  const handleSubmit = (data: AddBankFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<AddBankFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={AddBankFormGroups}
      initialValues={initialValues}
      title={title ?? "Add Bank Details"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
