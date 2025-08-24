"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { contacts } from "@/constants/contacts";
import { UserPlus } from "lucide-react";

type PricingItem = {
  description: string;
  quantity: number;
  price: number;
  discount: number;
  amount: number;
};

type TicketFormValues = {
  subject: string; // text
  created_date: string; // date
  due_date: string; // date
  assigned: string[]; // multi-select
  assignee: string[]; // multi-select
  priority: "Home" | "Work"; // select
  Status: "VIP" | "Work"; // select
  textarea: string; // textarea
  pricing?: PricingItem[]; // optional pricing-table (not in fields yet)
  notes?: string;
  termsConditions?: string;
};

export default function AddTicket({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const TicketFormGroups: FormGroup<TicketFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "subject",
          label: "Subject",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "created_date",
          label: "Created Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "due_date",
          label: "Due Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "assigned",
          label: "Assigned",
          type: "user-multi-select",
          isDropDown: true,
          required: true,
          grid: { xs: 12, sm: 6 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
        {
          name: "assignee",
          label: "Assignee",
          type: "user-multi-select",
          required: true,
          isDropDown: true,
          grid: { xs: 12, sm: 6 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
        {
          name: "priority",
          label: "Priority ",
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
          name: "textarea",
          label: "Textarea",
          type: "textarea",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: TicketFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<TicketFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={TicketFormGroups}
      initialValues={{
        subject: "",
        created_date: "",
        due_date: "",
        assigned: [],
        assignee: [],
        priority: "Home",
        Status: "VIP",
        textarea: "",
      }}
      variant={variant}
      title="Add New Ticket"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
