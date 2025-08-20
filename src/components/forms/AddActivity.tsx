"use client";

import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { companies } from "@/constants/companies";
import { contacts } from "@/constants/contacts";
import {
  Bell,
  FileCheck2,
  Mail,
  Phone,
  UserPlus,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

// ✅ Define Activity form values to match your form fields
type ActivityFormValues = {
  title: string;
  activity_type: "calls" | "email" | "task" | "meeting";
  dueDate: string;
  time: string;
  reminder: string;
  before_due: "Home" | "Work";
  owner: string;
  Guests: string[];
  Description: string;
  deals: string;
  contacts: string;
  companies: string;
};

// ✅ Supporting types for other drawers
type DealFormValues = {
  deals: string[];
};

type ContactFormValues = {
  contacts: string[];
};

type CompanyFormValues = {
  companies: string[];
};

export default function AddActivity({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const [dealIsOpen, setDealIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [companyIsOpen, setCompanyIsOpen] = useState(false);

  const ActivityFormGroups: FormGroup<ActivityFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus as LucideIcon,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "activity_type",
          label: "Activity Type",
          type: "radio",
          required: true,
          grid: { xs: 12 },
          options: [
            { value: "calls", label: "Calls", icon: Phone },
            { value: "email", label: "Email", icon: Mail },
            { value: "task", label: "Task", icon: FileCheck2 },
            { value: "meeting", label: "Meeting", icon: UserPlus },
          ],
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "time",
          label: "Time",
          type: "time",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "reminder",
          label: "Reminder ",
          type: "text",
          icon: Bell,
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "before_due",
          label: "Before Due",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "Home", label: "Home" },
            { value: "Work", label: "Work" },
          ],
        },
        {
          name: "owner",
          label: "Owner",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
        {
          name: "Guests",
          label: "Guests",
          required: true,
          type: "user-multi-select",
          isDropDown: true,
          isMulti: true,
          grid: { xs: 12, sm: 6 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
        {
          name: "Description",
          label: "Description",
          type: "text-editor",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "deals",
          label: "Deals",
          addButn: {
            label: "Add New",
            onclick: () => setDealIsOpen(true),
          },
          required: true,
          type: "select",
          grid: { xs: 12 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
        {
          name: "contacts",
          label: "Contacts",
          addButn: {
            label: "Add New",
            onclick: () => setContactIsOpen(true),
          },
          required: true,
          type: "select",
          grid: { xs: 12 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
        {
          name: "companies",
          label: "Companies",
          addButn: {
            label: "Add New",
            onclick: () => setCompanyIsOpen(true),
          },
          required: true,
          type: "select",
          grid: { xs: 12 },
          options: companies.map((company) => ({
            value: company.id,
            label: company.name,
            image: company.avatar,
          })),
        },
      ],
    },
  ];

  const DealForm: FormGroup<DealFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "deals",
          label: "Deals",
          required: true,
          type: "user-multi-select",
          isMulti: true,
          grid: { xs: 12 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
      ],
    },
  ];

  const ContactForm: FormGroup<ContactFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "contacts",
          label: "Contacts",
          required: true,
          type: "user-multi-select",
          isMulti: true,
          grid: { xs: 12 },
          options: contacts.map((contact) => ({
            value: contact.id,
            label: contact.name,
            image: contact.avatar,
          })),
        },
      ],
    },
  ];

  const CompanyForm: FormGroup<CompanyFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "companies",
          label: "Companies",
          required: true,
          type: "user-multi-select",
          isMulti: true,
          grid: { xs: 12 },
          options: companies.map((company) => ({
            value: company.id,
            label: company.name,
            image: company.avatar,
          })),
        },
      ],
    },
  ];

  const handleSubmit = (data: ActivityFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
      <FormDrawer<ActivityFormValues>
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        groups={ActivityFormGroups}
        initialValues={{} as ActivityFormValues}
        variant={variant}
        title="Add New Activity"
        submitText="Save"
        cancelText="Cancel"
      />
      <FormDrawer<DealFormValues>
        isOpen={dealIsOpen}
        onClose={() => setDealIsOpen(false)}
        onSubmit={(data) => console.log("Deal submitted:", data)}
        groups={DealForm}
        initialValues={{} as DealFormValues}
        variant="modal"
        title="Add Deal"
        submitText="Confirm"
        cancelText="Cancel"
      />
      <FormDrawer<ContactFormValues>
        isOpen={contactIsOpen}
        onClose={() => setContactIsOpen(false)}
        onSubmit={(data) => console.log("Contact submitted:", data)}
        groups={ContactForm}
        initialValues={{} as ContactFormValues}
        variant="modal"
        title="Add Contact"
        submitText="Confirm"
        cancelText="Cancel"
      />
      <FormDrawer<CompanyFormValues>
        isOpen={companyIsOpen}
        onClose={() => setCompanyIsOpen(false)}
        onSubmit={(data) => console.log("Company submitted:", data)}
        groups={CompanyForm}
        initialValues={{} as CompanyFormValues}
        variant="modal"
        title="Add Company"
        submitText="Confirm"
        cancelText="Cancel"
      />
    </>
  );
}
