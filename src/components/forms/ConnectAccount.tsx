"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";

type AccountFormValues = {
  account_type: string;
  sync_emails_from: string;
};

export default function ConnectAccount({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const AccountFormGroups: FormGroup<AccountFormValues>[] = [
    {
      collapsible: false,
      fields: [
        {
          name: "account_type",
          label: "Account type",
          required: true,
          type: "select",
          grid: { xs: 12 },
          options: [
            { value: "VIP", label: "VIP" },
            { value: "ColabX", label: "Colab X" },
          ],
        },
        {
          name: "sync_emails_from",
          label: "Sync emails from",
          type: "radio",
          options: [
            { value: "Now", label: "Now" },
            { value: "1 Month Ago", label: "1 Month Ago" },
            { value: "3 Month Ago", label: "3 Month Ago" },
            { value: "6 Month Ago", label: "6 Month Ago" },
          ],
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: AccountFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<AccountFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={AccountFormGroups}
      initialValues={{}}
      variant={variant}
      title="Connect Account"
      submitText="Connect Account"
      cancelText="Cancel"
    />
  );
}
