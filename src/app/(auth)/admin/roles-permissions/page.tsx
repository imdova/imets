"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import { FilterOption } from "@/types/genral";
import {
  Edit,
  Eye,
  FileBox,
  FileText,
  Sheet,
  Trash2,
  Calendar,
} from "lucide-react";
import { Suspense, useState } from "react";
import { formatDate } from "@/util/dateUtils";
import { FormGroup } from "@/components/DrawerForm/types";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";

type RolesPermissionsFormValues = {
  roleName: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  created: Date;
  usersCount: number;
};

const RoleForm: FormGroup<RolesPermissionsFormValues>[] = [
  {
    collapsible: false,
    fields: [
      {
        name: "roleName",
        label: "Role Name",
        required: true,
        type: "text",
        grid: { xs: 12 },
      },
    ],
  },
];

// Mock data for roles
const roles = [
  {
    id: "1",
    name: "Administrator",
    description: "Full system access with all permissions",
    created: new Date("2023-01-15"),
    usersCount: 3,
  },
  {
    id: "2",
    name: "Manager",
    description: "Can manage users and content",
    created: new Date("2023-02-20"),
    usersCount: 12,
  },
  {
    id: "3",
    name: "Editor",
    description: "Can create and edit content",
    created: new Date("2023-03-10"),
    usersCount: 25,
  },
  {
    id: "4",
    name: "Viewer",
    description: "Can only view content",
    created: new Date("2023-04-05"),
    usersCount: 45,
  },
  {
    id: "5",
    name: "Support",
    description: "Can access support tools and user management",
    created: new Date("2023-05-12"),
    usersCount: 8,
  },
];

const labels = {
  "/roles": "Roles & Permissions",
};

export default function RolesPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const roleFilters: FilterOption[] = [
    {
      id: "permissions",
      name: "Permissions",
      options: [
        { value: "users:read", label: "View Users" },
        { value: "users:write", label: "Manage Users" },
        { value: "content:read", label: "View Content" },
        { value: "content:write", label: "Manage Content" },
        { value: "support:read", label: "View Support" },
        { value: "support:write", label: "Manage Support" },
      ],
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Role Name",
      render: (item: Role) => (
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">{item.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "created",
      header: "Created",
      render: (item: Role) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {formatDate(item.created, "MMM dd, yyyy h:mm A")}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      actions: {
        dropdownActions: [
          {
            label: "Edit",
            icon: <Edit size={16} />,
            onClick: (item: Role) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View Details",
            icon: <Eye size={16} />,
            onClick: (item: Role) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Role) => {
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
        <h2 className="text-2xl font-bold text-gray-800">
          Roles & Permissions
        </h2>
      </div>
      <div className="mb-6 flex flex-col justify-between md:flex-row">
        <Breadcrumbs labels={labels} homeLabel="Home" />
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
      </div>
      <Suspense>
        <FilterBar
          filters={roleFilters}
          showFilters
          showSearch
          showBtnAdd
          showViewToggle={false}
          placeholder="Search roles..."
          BtnAdd={{ label: "Add Role", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "created-asc", label: "Created (Oldest)" },
            { value: "created-desc", label: "Created (Newest)" },
            { value: "usersCount-asc", label: "Users (Fewest)" },
            { value: "usersCount-desc", label: "Users (Most)" },
          ]}
          defaultSort="name-asc"
          showSort
        />
      </Suspense>
      <Suspense>
        <DynamicTable
          data={roles}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <FormDrawer<RolesPermissionsFormValues>
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => console.log("Role submitted:", data)}
        groups={RoleForm}
        initialValues={{} as RolesPermissionsFormValues}
        variant="modal"
        title="Add Role"
        minHight={200}
        submitText="Save"
        cancelText="Cancel"
      />
    </div>
  );
}
