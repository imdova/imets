"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { employees } from "@/constants/employees";
import { UserPlus } from "lucide-react";

// Define your form values type
type CustomPolicyFormValues = {
  leaveType: "Medical Leave" | "Casual Leave" | "Annual Leave"; // select
  policyName: string; // text
  noOfDays: number; // number
  AddEmployee: string; // employee id (from select)
};

export default function AddCustomPolicy({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const CustomPolicyFormGroups: FormGroup<CustomPolicyFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "leaveType",
          label: "Leave Type",
          type: "select",
          required: true,
          grid: { xs: 12 },
          options: [
            { value: "Medical Leave", label: "Medical Leave" },
            { value: "Casual Leave", label: "Casual Leave" },
            { value: "Annual Leave", label: "Annual Leave" },
          ],
        },
        {
          name: "policyName",
          label: "Policy Name",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "noOfDays",
          label: "No of Days",
          type: "number",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "AddEmployee",
          label: "Add Employee",
          type: "user-multi-select",
          required: true,
          grid: { xs: 12 },
          isDropDown: true,
          isMulti: false,
          options: employees.map((employee) => ({
            value: employee.id,
            label: employee.name,
            image: employee.avatar,
          })),
        },
      ],
    },
  ];

  const handleSubmit = (data: CustomPolicyFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<CustomPolicyFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={CustomPolicyFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New CustomPolicy"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
