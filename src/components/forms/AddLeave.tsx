"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { employees } from "@/constants/employees";
import { Employee } from "@/types/data";
import { UserPlus } from "lucide-react";

// Define your form values type
type LeaveFormValues = {
  employee: Employee; // select
  leaveType: "Medical Leave" | "Casual Leave" | "Annual Leave"; // select
  from: string; // date
  to: string; // date
  duration: "Full day" | "First half" | "Second half"; // select
  noOfDays: number; // number
  remainingDays: number; // number
  reason: string; // textarea
};

export default function AddLeave({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const LeaveFormGroups: FormGroup<LeaveFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "employee",
          label: "Employee Name",
          type: "select",
          required: true,
          grid: { xs: 12 },
          options: employees.map((employee) => ({
            value: employee.id,
            label: employee.name,
          })),
        },
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
          name: "from",
          label: "From",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "to",
          label: "To",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
        },
        {
          name: "duration",
          label: "Duration",
          type: "select",
          required: true,
          grid: { xs: 12, sm: 6, md: 4 },
          options: [
            { value: "Full day", label: "Full day" },
            { value: "First half", label: "First half" },
            { value: "Second half", label: "Second half" },
          ],
        },
        {
          name: "noOfDays",
          label: "No of Days",
          type: "number",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "remainingDays",
          label: "Remaining Days",
          type: "number",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "reason",
          label: "Reason",
          type: "textarea",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: LeaveFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<LeaveFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={LeaveFormGroups}
      initialValues={{}}
      variant={variant}
      title="Add New Leave"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
