"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import Pagination from "@/components/UI/Pagination";
import { FilterOption } from "@/types/genral";
import {
  Edit,
  FileBox,
  FileText,
  PlusCircle,
  Sheet,
  Trash2,
  UserPlus,
  UserRoundCog,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/util/dateUtils";
import StatsCard from "@/components/UI/cards/StatsCard";
import ViewToggle from "@/components/UI/Buttons/ViewToggle";
import { useSearchParams } from "next/navigation";
import EmployeeCard from "@/components/UI/cards/EmployeeCard";
import AddEmployee from "@/components/forms/AddEmployee";
import { Employee } from "@/types/data";
import { employees } from "@/constants/employees";

const labels = {
  "/employees": "Employees",
};

const employeeFilters: FilterOption[] = [
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
      { value: "product", label: "Product" },
      { value: "design", label: "Design" },
      { value: "marketing", label: "Marketing" },
      { value: "sales", label: "Sales" },
      { value: "hr", label: "Human Resources" },
      { value: "data-science", label: "Data Science" },
    ],
  },
  {
    id: "users",
    name: "Managers",
    options: [
      {
        value: "john-doe",
        label: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      },
      {
        value: "jane-smith",
        label: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      },
    ],
  },
  {
    id: "location",
    name: "Location",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "gb", label: "United Kingdom" },
      { value: "es", label: "Spain" },
      { value: "kr", label: "South Korea" },
      { value: "au", label: "Australia" },
      { value: "cn", label: "China" },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    options: [
      { value: "5", label: "5 stars" },
      { value: "4", label: "4 stars" },
      { value: "3", label: "3 stars" },
      { value: "2", label: "2 stars" },
      { value: "1", label: "1 star" },
    ],
  },
];

function EmployeeContent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const viewMode = (searchParams.get("view") as "list" | "grid") || "list";

  const columns = [
    {
      key: "id",
      header: "EMP ID",
    },
    {
      key: "name",
      header: "Name",
      render: (item: Employee) => (
        <Link
          href={`/admin/employees/${item.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.avatar}
            width={200}
            height={100}
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            alt={item.name}
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      render: (item: Employee) => (
        <span className="text-sm text-gray-600">{item.phone}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (item: Employee) => (
        <span className="text-sm text-gray-600">{item.email}</span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      render: (item: Employee) => (
        <span className="text-sm text-gray-600">{item.designation}</span>
      ),
    },
    {
      key: "joiningDate",
      header: "Joining Date",
      render: (item: Employee) => (
        <span className="text-sm text-gray-600">
          {formatDate(item.joiningDate)}
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Employee) => (
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold text-white ${
            item.status === "active" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {item.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      actions: {
        primaryActions: [
          {
            label: "Edit",
            icon: <Edit size={16} />,
            onClick: (item: Employee) => alert(`Edit ${item.name}`),
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Employee) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Employees</h2>
      <div className="mb-4 flex flex-col justify-between lg:flex-row">
        <Breadcrumbs labels={labels} homeLabel="Home" />
        <div className="flex flex-wrap items-center gap-3">
          <Suspense>
            <ViewToggle viewModeParam="view" />
          </Suspense>
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
            <PlusCircle size={14} /> Add Employee
          </button>
        </div>
      </div>
      <div className="my-4">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            totalEmployees={1007}
            growthPercentage={19.01}
            icon={Users}
            title="Total Employee"
            iconBgColor="#212529"
          />
          <StatsCard
            totalEmployees={1007}
            growthPercentage={-19.01}
            icon={UserPlus}
            title="Active"
            iconBgColor="#03c95a"
          />
          <StatsCard
            totalEmployees={1007}
            growthPercentage={19.01}
            icon={UserRoundCog}
            title="InActive"
            iconBgColor="#e70d0d"
          />
          <StatsCard
            totalEmployees={1007}
            growthPercentage={67}
            icon={Users}
            title="New Joiners"
            iconBgColor="#1b84ff"
          />
        </div>
      </div>
      <Suspense>
        <FilterBar
          title={viewMode === "list" ? "Plan List" : "Employees Grid"}
          filters={employeeFilters}
          showFilters
          showSearch
          showViewToggle={false}
          placeholder="Search employees..."
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "date-asc", label: "Joining Date (Oldest first)" },
            { value: "date-desc", label: "Joining Date (Newest first)" },
          ]}
          defaultSort="name-asc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                projects={20}
                done={13}
                progress={7}
                productivity={65}
              />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={2} />
        </>
      )}
      {viewMode === "list" && (
        <Suspense>
          <DynamicTable
            data={employees}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddEmployee isOpen={isOpen} setIsOpen={setIsOpen} variant="modal" />
    </div>
  );
}

export default function EmployeePage() {
  return (
    <Suspense>
      <EmployeeContent />
    </Suspense>
  );
}
