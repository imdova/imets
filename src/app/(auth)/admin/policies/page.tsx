"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import { FilterOption } from "@/types/genral";
import {
  Edit,
  FileBox,
  FileText,
  Sheet,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { Suspense, useState } from "react";
import { formatDate } from "@/util/dateUtils";
import { FormGroup } from "@/components/DrawerForm/types";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";

type PolicyFormValues = {
  policyName: string;
  department: string;
  description: string;
  appraisalDate: string;
  UploadPolicy: File;
};

export type Policy = {
  id: string;
  name: string;
  department: string;
  description: string;
  created: Date;
};

const PolicyForm: FormGroup<PolicyFormValues>[] = [
  {
    collapsible: false,
    fields: [
      {
        name: "policyName",
        label: "Policy Name",
        required: true,
        type: "text",
        grid: { xs: 12 },
      },
      {
        name: "department",
        label: "Department",
        required: true,
        type: "select",
        options: [
          { value: "All Departments", label: "All Departments" },
          { value: "Engineering", label: "Engineering" },
          { value: "Human Resources", label: "Human Resources" },
          { value: "Marketing", label: "Marketing" },
          { value: "Finance", label: "Finance" },
          { value: "Operations", label: "Operations" },
          { value: "Customer Support", label: "Customer Support" },
          { value: "Research & Development", label: "Research & Development" },
          { value: "Sales", label: "Sales" },
        ],
        grid: { xs: 12, sm: 6 },
      },
      {
        name: "appraisalDate",
        label: "Appraisal Date",
        required: true,
        type: "date",
        grid: { xs: 12, sm: 6 },
      },
      {
        name: "description",
        label: "Description",
        required: true,
        type: "textarea",
        grid: { xs: 12 },
      },
      {
        name: "UploadPolicy",
        label: "Upload Policy",
        required: true,
        type: "file",
        grid: { xs: 12 },
      },
    ],
  },
];

// Mock data for policies
const policies = [
  {
    id: "1",
    name: "Remote Work Policy",
    department: "All Departments",
    description: "Guidelines and expectations for employees working remotely",
    created: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Code of Conduct",
    department: "All Departments",
    description:
      "Expected behavior and professional standards for all employees",
    created: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Data Security Protocol",
    department: "Engineering",
    description:
      "Procedures for handling sensitive data and security best practices",
    created: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Expense Reimbursement",
    department: "Finance",
    description:
      "Policy for submitting and approving business expense reimbursements",
    created: new Date("2023-04-05"),
  },
  {
    id: "5",
    name: "Social Media Guidelines",
    department: "Marketing",
    description: "Rules for representing the company on social media platforms",
    created: new Date("2023-05-12"),
  },
  {
    id: "6",
    name: "Vacation and Time Off",
    department: "Human Resources",
    description:
      "Policy for requesting and approving vacation time and other leave",
    created: new Date("2023-06-18"),
  },
  {
    id: "7",
    name: "Quality Assurance Standards",
    department: "Engineering",
    description:
      "Quality standards and testing procedures for software development",
    created: new Date("2023-07-22"),
  },
  {
    id: "8",
    name: "Sales Commission Structure",
    department: "Sales",
    description: "Commission calculation and payment schedule for sales team",
    created: new Date("2023-08-30"),
  },
  {
    id: "9",
    name: "Health and Safety Procedures",
    department: "Operations",
    description: "Workplace safety protocols and emergency procedures",
    created: new Date("2023-09-05"),
  },
  {
    id: "10",
    name: "Customer Data Privacy",
    department: "Customer Support",
    description: "Guidelines for handling and protecting customer information",
    created: new Date("2023-10-15"),
  },
];

const labels = {
  "/policies": "Policies",
};

export default function PoliciesPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const policyFilters: FilterOption[] = [
    {
      id: "department",
      name: "Department",
      options: [
        { value: "all", label: "All Departments" },
        { value: "engineering", label: "Engineering" },
        { value: "hr", label: "Human Resources" },
        { value: "marketing", label: "Marketing" },
        { value: "finance", label: "Finance" },
        { value: "operations", label: "Operations" },
        { value: "support", label: "Customer Support" },
        { value: "rnd", label: "Research & Development" },
        { value: "sales", label: "Sales" },
      ],
    },
    {
      id: "date",
      name: "Date Created",
      options: [
        { value: "last-week", label: "Last Week" },
        { value: "last-month", label: "Last Month" },
        { value: "last-quarter", label: "Last Quarter" },
        { value: "last-year", label: "Last Year" },
      ],
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: Policy) => (
        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-gray-900">{item.name}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "department",
      header: "Department",
      render: (item: Policy) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-700">{item.department}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "description",
      header: "Description",
      render: (item: Policy) => (
        <p className="line-clamp-4 text-xs text-gray-600">{item.description}</p>
      ),
      sortable: false,
    },
    {
      key: "created",
      header: "Created Date",
      render: (item: Policy) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">
            {formatDate(item.created, "MMM dd, yyyy")}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      actions: {
        primaryActions: [
          {
            label: "Edit",
            icon: <Edit size={16} />,
            onClick: (item: Policy) => alert(`Edit ${item.name}`),
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Policy) => {
              if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                alert(`Delete ${item.name}`);
              }
            },
          },
        ],
      },
    },
  ];

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Policies</h2>
      </div>
      <div className="mb-6 flex flex-col justify-between md:flex-row">
        <Breadcrumbs labels={labels} homeLabel="Home" />
        <div className="flex items-center gap-2">
          <div className="md:max-w-xs">
            <Dropdown
              icon={<FileBox size={15} />}
              placholder="Export"
              options={[
                {
                  label: "Export As PDF",
                  icon: <FileText size={16} />,
                  onClick: () => console.log("PDF"),
                },
                {
                  label: "Export As Excel",
                  icon: <Sheet size={16} />,
                  onClick: () => console.log("Excel"),
                },
              ]}
            />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="hover:bg-main/90 flex items-center gap-1 rounded-lg bg-main px-3 py-2.5 text-xs text-white"
          >
            <PlusCircle size={14} /> Add Policy
          </button>
        </div>
      </div>
      <Suspense>
        <FilterBar
          filters={policyFilters}
          showFilters
          showSearch
          showBtnAdd
          showViewToggle={false}
          showDateRange
          placeholder="Search policies..."
          BtnAdd={{ label: "Add Policy", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "department-asc", label: "Department (A-Z)" },
            { value: "department-desc", label: "Department (Z-A)" },
            { value: "created-asc", label: "Created (Oldest)" },
            { value: "created-desc", label: "Created (Newest)" },
          ]}
          defaultSort="name-asc"
          showSort
        />
      </Suspense>
      <Suspense>
        <DynamicTable
          data={policies}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <FormDrawer<PolicyFormValues>
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => console.log("Policy submitted:", data)}
        groups={PolicyForm}
        initialValues={{} as PolicyFormValues}
        variant="modal"
        title="Add Policy"
        minHight={300}
        submitText="Save"
        cancelText="Cancel"
      />
    </div>
  );
}
