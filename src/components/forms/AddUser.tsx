"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Fixed type to match your fields
type UserFormValues = {
  user_image?: File; // upload file
  firstName: string;
  username: string;
  phone1?: string;
  phone2?: string;
  password: string;
  repeat_password: string;
  country: "VIP" | "ColabX"; // matches select options
};

export default function AddUser({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const UserFormGroups: FormGroup<UserFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "user_image",
          label: "Upload file",
          type: "file",
          accept: "image/*",
          maxSize: 800,
          placeholder: "JPG, GIF or PNG. Max size of 800K",
          grid: { xs: 12 },
        },
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "username",
          label: "Username",
          type: "text",
          required: true,
          grid: { xs: 12, sm: 6 },
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
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "repeat_password",
          label: "Repeat Password",
          type: "password",
          required: true,
          grid: { xs: 12, sm: 6 },
        },
        {
          name: "country",
          label: "Country",
          type: "select",
          grid: { xs: 12 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
      ],
    },
  ];

  const handleSubmit = (data: UserFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<UserFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={UserFormGroups}
      initialValues={{} as UserFormValues}
      variant={variant}
      title="Add New User"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
