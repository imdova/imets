import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { UserPlus } from "lucide-react";

// Define your form values type
export type EditBankFormValues = {
  bankDetails: string;
  bankAccountNo: string;
  ifscCode: string;
  branchAddress: string;
};

export default function EditBank({
  title,
  isOpen,
  setIsOpen,
  initialValues,
  variant,
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  initialValues?: Partial<EditBankFormValues>; // safer
  variant?: "drawer" | "modal";
}) {
  const EditBankFormGroups: FormGroup<EditBankFormValues>[] = [
    {
      icon: UserPlus,
      collapsible: false,
      fields: [
        {
          name: "bankDetails",
          label: "Bank Details",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "bankAccountNo",
          label: "Bank Account No",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "ifscCode",
          label: "IFSC Code",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "branchAddress",
          label: "Branch Address",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
      ],
    },
  ];

  const handleSubmit = (data: EditBankFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<EditBankFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={EditBankFormGroups}
      initialValues={initialValues ?? {}}
      title={title ?? "Edit Bank Details"}
      variant={variant}
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
