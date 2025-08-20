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
  Phone,
  Mail,
} from "lucide-react";
import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddUser from "@/components/forms/AddUser";
import { User } from "@/types/data";
import { users } from "@/constants/users";

const labels = {
  "/users": "Users",
};

export default function UsersPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userFilters: FilterOption[] = [
    {
      id: "status",
      name: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "role",
      name: "Role",
      options: [
        { value: "senior-manager", label: "Senior Manager" },
        { value: "project-manager", label: "Project Manager" },
        { value: "hr-specialist", label: "HR Specialist" },
        { value: "team-lead", label: "Team Lead" },
        { value: "product-owner", label: "Product Owner" },
        { value: "finance-manager", label: "Finance Manager" },
        { value: "software-engineer", label: "Software Engineer" },
        { value: "marketing-specialist", label: "Marketing Specialist" },
      ],
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: User) => (
        <Link
          href={`/admin/users/${item.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.avatar}
            width={150}
            height={150}
            className="h-8 w-8 rounded-full object-cover"
            alt={item.name}
          />
          <div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-600">{item.role}</p>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      render: (item: User) => (
        <div className="flex items-center gap-1">
          <Phone size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">{item.phone}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      render: (item: User) => (
        <div className="flex items-center gap-1">
          <Mail size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">{item.email}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "created",
      header: "Created",
      render: (item: User) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {item.created.toLocaleDateString()}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "lastActivity",
      header: "Last Activity",
      render: (item: User) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-600">{item.lastActivity}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: User) => {
        const statusColors: Record<User["status"], string> = {
          active: "bg-green-500",
          inactive: "bg-red-500 ",
        };
        return (
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium capitalize text-white ${statusColors[item.status]}`}
          >
            {item.status}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      actions: {
        dropdownActions: [
          {
            label: "Edit",
            icon: <Edit size={16} />,
            onClick: (item: User) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: User) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: User) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
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
          filters={userFilters}
          showFilters
          showSearch
          showBtnAdd
          showViewToggle={false}
          placeholder="Search users..."
          BtnAdd={{ label: "Add User", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "created-asc", label: "Created (Oldest)" },
            { value: "created-desc", label: "Created (Newest)" },
            { value: "lastActivity-asc", label: "Last Activity (Oldest)" },
            { value: "lastActivity-desc", label: "Last Activity (Recent)" },
          ]}
          defaultSort="name-asc"
          showSort
        />
      </Suspense>

      <Suspense>
        <DynamicTable
          data={users}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>

      <AddUser isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
