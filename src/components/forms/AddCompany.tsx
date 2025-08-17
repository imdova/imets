"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { CircleUserRound, MapPin, Share2, Star, UserPlus } from "lucide-react";

// Define your form values type
type CompanyFormValues = {
  profileImage: File[];
  copmpanyName: string;
  email: string;
  EmailOptOut: boolean;
  phone1: string;
  phone2: string;
  Fax: string;
  Deals: string;
  DateofBirth: string;
  Reviews: string;
  Owner: string;
  tags: string[];
  Source: string;
  Industry: string;
  Currency: string;
  Language: string;
  Description: string;
  address: string;
  Country: string;
  "State-Province": string;
  City: string;
  Zipcode: string;
  Facebook: string;
  Skype: string;
  Linkedin: string;
  Twitter: string;
  Whatsapp: string;
  Instagram: string;
  Visibility: string;
};

export default function AddCompany({
  title,
  isOpen,
  setDealIsOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  dealIsOpen: boolean;
  setDealIsOpen: (X: boolean) => void;
  initialValues?: CompanyFormValues;
  variant?: "drawer" | "modal";
}) {
  const CompanyFormGroups: FormGroup<CompanyFormValues>[] = [
    {
      title: "Basic Info",
      defaultOpen: true, // First group open by default
      icon: UserPlus,
      fields: [
        {
          name: "profileImage",
          label: "Upload file",
          type: "file",
          accept: "image/*",
          maxSize: 800,
          placeholder: "JPG, GIF or PNG. Max size of 800K",
          grid: { xs: 12 },
        },
        {
          name: "copmpanyName",
          label: "Copmpany Name",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          grid: { xs: 12 },
        },
        {
          name: "EmailOptOut",
          label: "Email Opt Out",
          type: "toggle",
          grid: { xs: 12 },
        },
        {
          name: "phone1",
          label: "Phone 1",
          type: "phone",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "phone2",
          label: "Phone 2",
          type: "phone",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Fax",
          label: "Fax",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Deals",
          label: "Deals",
          type: "select",
          addButn: {
            label: "Add New",
            onclick: () => setDealIsOpen(true),
          },
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "DateofBirth",
          label: "Date of Birth",
          type: "date",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Reviews",
          label: "Reviews",
          type: "text",
          icon: Star,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Owner",
          label: "Owner",
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
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
          name: "Source",
          label: "Source",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "Industry",
          label: "Industry",
          required: true,
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
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
          name: "Language",
          label: "Language",
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
    {
      title: "Address Info",
      icon: MapPin,
      fields: [
        {
          name: "address",
          label: "Address",
          type: "text",
          grid: { xs: 12 },
        },
        {
          name: "Country",
          label: "Country",
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "State-Province",
          label: "State / Province",
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "City",
          label: "City",
          type: "select",
          grid: { xs: 12, sm: 6 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "Zipcode",
          label: "Zipcode",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
      ],
    },
    {
      title: "Social Profile",
      icon: Share2,
      fields: [
        {
          name: "Facebook",
          label: "Facebook",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Skype",
          label: "Skype",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Linkedin",
          label: "Linkedin",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Twitter",
          label: "Twitter",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Whatsapp",
          label: "Whatsapp",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "Instagram",
          label: "Instagram",
          type: "text",
          grid: { xs: 12, sm: 6 },
        },
      ],
    },
    {
      title: "Access",
      icon: CircleUserRound,
      fields: [
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

  const handleSubmit = (data: CompanyFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<CompanyFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={CompanyFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Add New Company"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
