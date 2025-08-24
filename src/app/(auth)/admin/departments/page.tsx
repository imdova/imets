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
  Users,
  PlusCircle,
} from "lucide-react";
import { Suspense, useState } from "react";
import { formatDate } from "@/util/dateUtils";
import { FormGroup } from "@/components/DrawerForm/types";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";

type DepartmentFormValues = {
  departmentName: string;
  status: string;
};

export type Department = {
  id: string;
  name: string;
  employeeCount: number;
  status: "Active" | "Inactive";
  created: Date;
};

const DepartmentForm: FormGroup<DepartmentFormValues>[] = [
  {
    collapsible: false,
    fields: [
      {
        name: "departmentName",
        label: "Department Name",
        required: true,
        type: "text",
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

// Mock data for departments
const departments = [
  {
    id: "1",
    name: "Human Resources",
    employeeCount: 15,
    status: "Active" as const,
    created: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Engineering",
    employeeCount: 42,
    status: "Active" as const,
    created: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Marketing",
    employeeCount: 22,
    status: "Active" as const,
    created: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Finance",
    employeeCount: 18,
    status: "Active" as const,
    created: new Date("2023-04-05"),
  },
  {
    id: "5",
    name: "Operations",
    employeeCount: 35,
    status: "Inactive" as const,
    created: new Date("2023-05-12"),
  },
  {
    id: "6",
    name: "Customer Support",
    employeeCount: 28,
    status: "Active" as const,
    created: new Date("2023-06-18"),
  },
  {
    id: "7",
    name: "Research & Development",
    employeeCount: 19,
    status: "Active" as const,
    created: new Date("2023-07-22"),
  },
  {
    id: "8",
    name: "Sales",
    employeeCount: 31,
    status: "Inactive" as const,
    created: new Date("2023-08-30"),
  },
];

const labels = {
  "/departments": "Departments",
};

export default function DepartmentsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const departmentFilters: FilterOption[] = [
    {
      id: "status",
      name: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "size",
      name: "Department Size",
      options: [
        { value: "small", label: "Small (1-15)" },
        { value: "medium", label: "Medium (16-30)" },
        { value: "large", label: "Large (31+)" },
      ],
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Department",
      render: (item: Department) => (
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500">
            Created {formatDate(item.created, "MMM dd, yyyy")}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "employeeCount",
      header: "No of Employees",
      render: (item: Department) => (
        <div className="flex items-center gap-1">
          <Users size={14} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-900">
            {item.employeeCount}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Department) => (
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
            onClick: (item: Department) => alert(`Edit ${item.name}`),
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Department) => {
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
        <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
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
            <PlusCircle size={14} /> Add Departmen
          </button>
        </div>
      </div>
      <Suspense>
        <FilterBar
          filters={departmentFilters}
          showFilters
          showSearch
          showViewToggle={false}
          placeholder="Search departments..."
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
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
          data={departments}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <FormDrawer<DepartmentFormValues>
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => console.log("Department submitted:", data)}
        groups={DepartmentForm}
        initialValues={{} as DepartmentFormValues}
        variant="modal"
        title="Add Department"
        minHight={200}
        submitText="Save"
        cancelText="Cancel"
      />
    </div>
  );
}
