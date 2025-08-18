"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { File, PlusCircle } from "lucide-react";

// Define your form values type
type DocumentFormValues = {
  deal: string;
  Doc_Type: string;
  owner: string;
  title: string;
  Document: string;
  signature: {
    type: "no-signature" | "e-signature";
    items: {
      recipients_name: string;
      recipients_email: string;
    }[];
  };
  content: string;
  Rrecipients_send: {
    items: {
      recipients_name_add: string;
      recipients_email_add: string;
    }[];
  };
  message_subject: string;
  message_text: string;
};

export default function AddDocument({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  // Split the form into two stages
  const basicInfoGroup: FormGroup<DocumentFormValues> = {
    title: "Basic Info",
    icon: File,
    defaultOpen: true,
    collapsible: false, // Don't allow collapsing in stage mode
    fields: [
      {
        name: "deal",
        label: "Deal",
        required: true,
        type: "select",
        grid: { xs: 12 },
        options: [
          { value: "VIP", label: "VIP" },
          { value: "ColabX", label: "Colab X" },
        ],
      },
      {
        name: "Doc_Type",
        label: "Document Type",
        required: true,
        type: "select",
        grid: { xs: 12, sm: 6 },
        options: [
          { value: "VIP", label: "VIP" },
          { value: "ColabX", label: "Colab X" },
        ],
      },
      {
        name: "owner",
        label: "Owner",
        required: true,
        type: "select",
        grid: { xs: 12, sm: 6 },
        options: [
          { value: "VIP", label: "VIP" },
          { value: "ColabX", label: "Colab X" },
        ],
      },
      {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
        grid: { xs: 12 },
      },
      {
        name: "Document",
        label: "Document",
        type: "text-editor",
        required: true,
        grid: { xs: 12 },
      },
      {
        name: "signature",
        type: "conditional-group",
        label: "Signature",
        options: [
          { value: "no-signature", label: "No Signature" },
          { value: "e-signature", label: "Use e-signature" },
        ],
        dynamic: true,
        dynamicFields: [
          {
            name: "recipients_name",
            type: "text",
            label: "Recipients Name",
            required: true,
          },
          {
            name: "recipients_email",
            type: "email",
            label: "Recipients Email",
            required: true,
          },
        ],
        conditionalFields: {
          "e-signature": [
            {
              name: "recipients_name",
              type: "text",
              label: "Recipients Name",
              required: true,
            },
            {
              name: "recipients_email",
              type: "email",
              label: "Recipients Email",
              required: true,
            },
          ],
          "no-signature": [],
        },
      },
      {
        name: "content",
        label: "Content",
        type: "textarea",
        required: true,
        grid: { xs: 12 },
      },
    ],
  };

  const addRecipientGroup: FormGroup<DocumentFormValues> = {
    title: "Add Recipient",
    icon: PlusCircle,
    collapsible: false, // Don't allow collapsing in stage mode
    fields: [
      {
        name: "Rrecipients_send",
        type: "field-group",
        label: "Send the document to following signer",
        dynamic: true,
        fields: [
          {
            name: "recipients_name_add",
            type: "text",
            label: "Recipients Name",
            required: true,
          },
          {
            name: "recipients_email_add",
            type: "email",
            label: "Recipients Email",
            required: true,
          },
        ],
      },
      {
        name: "message_subject",
        label: "Message Subject",
        type: "text",
        required: true,
        grid: { xs: 12 },
      },
      {
        name: "message_text",
        label: "Message Text",
        type: "textarea",
        required: true,
        grid: { xs: 12 },
      },
    ],
  };

  const handleSubmit = (data: DocumentFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormDrawer<DocumentFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={[basicInfoGroup, addRecipientGroup]} // Pass both groups
      stages={["Basic Info", "Add Recipient"]} // Define the stages
      initialValues={{
        signature: { type: "no-signature" },
      }}
      variant={variant}
      title="Create New File"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
