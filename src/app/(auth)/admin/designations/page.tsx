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
import { FormGroup } from "@/components/DrawerForm/types";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";

type DesignationFormValues = {
  designationName: string;
  department: string;
  status: string;
};

export type Designation = {
  id: string;
  name: string;
  department: string;
  employeeCount: number;
  status: "Active" | "Inactive";
  created: Date;
};

const DesignationForm: FormGroup<DesignationFormValues>[] = [
  {
    collapsible: false,
    fields: [
      {
        name: "designationName",
        label: "Designation Name",
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
          { value: "Engineering", label: "Engineering" },
          { value: "Human Resources", label: "Human Resources" },
          { value: "Marketing", label: "Marketing" },
          { value: "Finance", label: "Finance" },
          { value: "Operations", label: "Operations" },
          { value: "Customer Support", label: "Customer Support" },
          { value: "Research & Development", label: "Research & Development" },
          { value: "Sales", label: "Sales" },
        ],
        grid: { xs: 12 },
      },
      {
        name: "status",
        label: "Status",
        required: true,
        type: "select",
        options: [
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ],
        grid: { xs: 12 },
      },
    ],
  },
];

// Mock data for designations
const designations = [
  {
    id: "1",
    name: "Senior Software Engineer",
    department: "Engineering",
    employeeCount: 12,
    status: "Active" as const,
    created: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "HR Manager",
    department: "Human Resources",
    employeeCount: 3,
    status: "Active" as const,
    created: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Marketing Specialist",
    department: "Marketing",
    employeeCount: 8,
    status: "Active" as const,
    created: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Financial Analyst",
    department: "Finance",
    employeeCount: 6,
    status: "Active" as const,
    created: new Date("2023-04-05"),
  },
  {
    id: "5",
    name: "Operations Manager",
    department: "Operations",
    employeeCount: 4,
    status: "Inactive" as const,
    created: new Date("2023-05-12"),
  },
  {
    id: "6",
    name: "Support Representative",
    department: "Customer Support",
    employeeCount: 15,
    status: "Active" as const,
    created: new Date("2023-06-18"),
  },
  {
    id: "7",
    name: "Research Scientist",
    department: "Research & Development",
    employeeCount: 7,
    status: "Active" as const,
    created: new Date("2023-07-22"),
  },
  {
    id: "8",
    name: "Sales Executive",
    department: "Sales",
    employeeCount: 10,
    status: "Inactive" as const,
    created: new Date("2023-08-30"),
  },
  {
    id: "9",
    name: "Junior Developer",
    department: "Engineering",
    employeeCount: 18,
    status: "Active" as const,
    created: new Date("2023-09-05"),
  },
  {
    id: "10",
    name: "Recruitment Specialist",
    department: "Human Resources",
    employeeCount: 5,
    status: "Active" as const,
    created: new Date("2023-10-15"),
  },
];

const labels = {
  "/designations": "Designations",
};

export default function DesignationsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const designationFilters: FilterOption[] = [
    {
      id: "status",
      name: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "department",
      name: "Department",
      options: [
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
      id: "size",
      name: "Designation Size",
      options: [
        { value: "small", label: "Small (1-5)" },
        { value: "medium", label: "Medium (6-10)" },
        { value: "large", label: "Large (11+)" },
      ],
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Designation",
      render: (item: Designation) => (
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">{item.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "department",
      header: "Department",
      render: (item: Designation) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-700">{item.department}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "employeeCount",
      header: "No of Employees",
      render: (item: Designation) => (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-700">
            {item.employeeCount}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Designation) => (
        <div
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium text-white ${
            item.status === "Active" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          • {item.status}
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
            onClick: (item: Designation) => alert(`Edit ${item.name}`),
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Designation) => {
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
        <h2 className="text-2xl font-bold text-gray-800">Designations</h2>
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
            <PlusCircle size={14} /> Add Designation
          </button>
        </div>
      </div>
      <Suspense>
        <FilterBar
          filters={designationFilters}
          showFilters
          showSearch
          showBtnAdd
          showViewToggle={false}
          placeholder="Search designations..."
          BtnAdd={{ label: "Add Designation", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Designation (A-Z)" },
            { value: "name-desc", label: "Designation (Z-A)" },
            { value: "department-asc", label: "Department (A-Z)" },
            { value: "department-desc", label: "Department (Z-A)" },
            { value: "employeeCount-asc", label: "Employees (Fewest)" },
            { value: "employeeCount-desc", label: "Employees (Most)" },
            { value: "created-asc", label: "Created (Oldest)" },
            { value: "created-desc", label: "Created (Newest)" },
          ]}
          defaultSort="name-asc"
          showSort
        />
      </Suspense>
      <Suspense>
        <DynamicTable
          data={designations}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <FormDrawer<DesignationFormValues>
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => console.log("Designation submitted:", data)}
        groups={DesignationForm}
        initialValues={{} as DesignationFormValues}
        variant="modal"
        title="Add Designation"
        minHight={200}
        submitText="Save"
        cancelText="Cancel"
      />
    </div>
  );
}
