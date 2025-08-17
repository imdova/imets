"use client";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";
import { FormGroup } from "@/components/DrawerForm/types";
import { contacts } from "@/constants/contacts";
import { UserPlus } from "lucide-react";

// Define your form values type
export type PipelineFormValues = {
  PipelineName: string;
  pipeline_stages: {
    id: string;
    name: string;
  }[];
  access:
    | {
        type: "all" | "select_person";
        items?: {
          value: string;
          label: string;
          image?: string;
        }[]; // for select person
      }
    | { type: "all" }
    | { type: "select_person" };
  person?: string[]; // multi-select users
};

export default function AddPipeline({
  isOpen,
  setIsOpen,
  variant,
}: {
  isOpen: boolean;
  setIsOpen: (X: boolean) => void;
  variant?: "drawer" | "modal";
}) {
  const PipelineFormGroups: FormGroup<PipelineFormValues>[] = [
    {
      collapsible: false,
      icon: UserPlus,
      fields: [
        {
          name: "PipelineName",
          label: "Pipeline Name",
          type: "text",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "pipeline_stages",
          label: "Pipeline Stages",
          type: "list",
          required: true,
          grid: { xs: 12 },
        },
        {
          name: "access",
          type: "conditional-group",
          label: "Access",
          options: [
            { value: "all", label: "All" },
            { value: "select_person", label: "Select Person" },
          ],
          dynamic: true,
          dynamicFields: [
            {
              name: "person",
              type: "user-multi-select",
              label: "Select Person",
              isMulti: true,
              options: [
                ...contacts.map((contact) => ({
                  value: contact.id,
                  label: contact.name,
                  image: contact.avatar,
                })),
              ],
              required: true,
              grid: { xs: 12 },
            },
          ],
          conditionalFields: {
            all: [],
            select_person: [
              {
                name: "person",
                type: "user-multi-select",
                label: "Select Person",
                isMulti: true,
                options: [
                  ...contacts.map((contact) => ({
                    value: contact.id,
                    label: contact.name,
                    image: contact.avatar,
                  })),
                ],
                required: true,
                grid: { xs: 12 },
              },
            ],
          },
        },
      ],
    },
  ];

  const handleSubmit = (data: PipelineFormValues) => {
    console.log("Form submitted:", data);
  };
  return (
    <FormDrawer<PipelineFormValues>
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
      groups={PipelineFormGroups}
      initialValues={{
        pipeline_stages: [
          {
            id: "1755439111179",
            name: "gfdgdf",
          },
        ],
        access: { type: "all" },
      }}
      variant={variant}
      title="Add New Pipeline"
      submitText="Save"
      cancelText="Cancel"
    />
  );
}
