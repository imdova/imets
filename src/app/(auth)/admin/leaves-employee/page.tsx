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
  PlusCircle,
  Sheet,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Syringe,
  Copyright,
  Box,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import { formatDate } from "@/util/dateUtils";

import AddLeave from "@/components/forms/AddLeave";
import StatsThreeCard from "@/components/UI/cards/StatsThreeCard";

// Define types
export type Leave = {
  id: string;
  approvedBy: {
    id: string;
    name: string;
    avatar: string;
    designation: string;
  };
  leaveType: string;
  fromDate: Date;
  toDate: Date;
  noOfDays: number;
  status: "Pending" | "Approved" | "Rejected";
  appliedDate: Date;
};

// Mock data for leaves with approvedBy field
const leaves: Leave[] = [
  {
    id: "1",
    approvedBy: {
      id: "emp1",
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      designation: "Software Engineer",
    },
    leaveType: "Annual Leave",
    fromDate: new Date("2024-03-15"),
    toDate: new Date("2024-03-18"),
    noOfDays: 4,
    status: "Approved",
    appliedDate: new Date("2024-02-20"),
  },
  {
    id: "2",
    approvedBy: {
      id: "emp2",
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      designation: "Product Manager",
    },
    leaveType: "Sick Leave",
    fromDate: new Date("2024-03-10"),
    toDate: new Date("2024-03-11"),
    noOfDays: 2,
    status: "Approved",
    appliedDate: new Date("2024-03-05"),
  },
  {
    id: "3",
    approvedBy: {
      id: "emp3",
      name: "Robert Johnson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      designation: "UX Designer",
    },
    leaveType: "Maternity Leave",
    fromDate: new Date("2024-04-01"),
    toDate: new Date("2024-06-30"),
    noOfDays: 91,
    status: "Pending",
    appliedDate: new Date("2024-02-15"),
  },
  {
    id: "4",
    approvedBy: {
      id: "emp4",
      name: "Sarah Williams",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      designation: "Marketing Specialist",
    },
    leaveType: "Personal Leave",
    fromDate: new Date("2024-03-22"),
    toDate: new Date("2024-03-23"),
    noOfDays: 2,
    status: "Rejected",
    appliedDate: new Date("2024-03-10"),
  },
  {
    id: "5",
    approvedBy: {
      id: "emp5",
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      designation: "Data Analyst",
    },
    leaveType: "Annual Leave",
    fromDate: new Date("2024-04-05"),
    toDate: new Date("2024-04-12"),
    noOfDays: 8,
    status: "Pending",
    appliedDate: new Date("2024-03-01"),
  },
  {
    id: "6",
    approvedBy: {
      id: "emp6",
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      designation: "HR Manager",
    },
    leaveType: "Sick Leave",
    fromDate: new Date("2024-03-08"),
    toDate: new Date("2024-03-08"),
    noOfDays: 1,
    status: "Approved",
    appliedDate: new Date("2024-03-07"),
  },
  {
    id: "7",
    leaveType: "Paternity Leave",
    fromDate: new Date("2024-05-01"),
    toDate: new Date("2024-05-15"),
    noOfDays: 15,
    status: "Pending",
    appliedDate: new Date("2024-04-20"),
    approvedBy: {
      id: "emp6",
      name: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      designation: "HR Manager",
    },
  },
  {
    id: "8",
    approvedBy: {
      id: "emp8",
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80",
      designation: "QA Engineer",
    },
    leaveType: "Emergency Leave",
    fromDate: new Date("2024-03-05"),
    toDate: new Date("2024-03-05"),
    noOfDays: 1,
    status: "Approved",
    appliedDate: new Date("2024-03-05"),
  },
];

const labels = {
  "/leaves": "Leaves",
};

const leaveFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "all", label: "All Status" },
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
    ],
  },
  {
    id: "leaveType",
    name: "Leave Type",
    options: [
      { value: "all", label: "All Types" },
      { value: "annual", label: "Annual Leave" },
      { value: "sick", label: "Sick Leave" },
      { value: "personal", label: "Personal Leave" },
      { value: "maternity", label: "Maternity Leave" },
      { value: "paternity", label: "Paternity Leave" },
      { value: "emergency", label: "Emergency Leave" },
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
];

function LeaveEmployeePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const columns = [
    {
      key: "leaveType",
      header: "Leave Type",
      render: (item: Leave) => (
        <span className="text-sm text-gray-600">{item.leaveType}</span>
      ),
      sortable: true,
    },
    {
      key: "fromDate",
      header: "From",
      render: (item: Leave) => (
        <span className="text-sm text-gray-600">
          {formatDate(item.fromDate, "MMM dd, yyyy")}
        </span>
      ),
      sortable: true,
    },
    {
      key: "approvedBy",
      header: "Approved By",
      render: (item: Leave) => (
        <div className="flex items-center gap-2">
          <Image
            src={item.approvedBy?.avatar ?? "/images/placholder.png"}
            width={40}
            height={40}
            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
            alt={item.approvedBy?.name ?? "Avatar"}
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {item.approvedBy.name}
            </p>
            <p className="text-xs text-gray-500">
              {item.approvedBy.designation}
            </p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "toDate",
      header: "To",
      render: (item: Leave) => (
        <span className="text-sm text-gray-600">
          {formatDate(item.toDate, "MMM dd, yyyy")}
        </span>
      ),
      sortable: true,
    },

    {
      key: "noOfDays",
      header: "No of Days",
      render: (item: Leave) => (
        <span className="text-sm font-medium text-gray-600">
          {item.noOfDays} Days
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Leave) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.status === "Approved"
              ? "bg-green-100 text-green-800"
              : item.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {item.status === "Approved" && (
            <CheckCircle className="mr-1 h-3 w-3" />
          )}
          {item.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
          {item.status === "Rejected" && <XCircle className="mr-1 h-3 w-3" />}
          {item.status}
        </span>
      ),
      sortable: true,
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
            onClick: (item: Leave) =>
              alert(`Edit ${item.approvedBy.name}'s leave`),
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Leave) => {
              if (
                confirm(
                  `Are you sure you want to delete ${item.approvedBy.name}'s leave?`,
                )
              ) {
                alert(`Delete ${item.approvedBy.name}'s leave`);
              }
            },
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Leaves</h2>
      <div className="mb-4 flex flex-col justify-between lg:flex-row">
        <Breadcrumbs labels={labels} homeLabel="Home" />
        <div className="flex flex-wrap items-center gap-3">
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
            <PlusCircle size={14} /> Add Leave
          </button>
        </div>
      </div>
      <div className="my-4">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsThreeCard
            title="Annual Leaves"
            value={"32"}
            iconBgColor="#212529"
            icon={Calendar}
            RemainingLeaves={7}
          />

          <StatsThreeCard
            title="Medical Leaves"
            value={18}
            iconBgColor="#0d6efd"
            icon={Syringe}
            RemainingLeaves={1}
          />

          <StatsThreeCard
            title="Casual Leaves"
            value={9}
            iconBgColor="#6610f2"
            icon={Copyright}
            RemainingLeaves={12}
          />
          <StatsThreeCard
            title="Other Leaves"
            value={5}
            iconBgColor="#d63384"
            icon={Box}
            RemainingLeaves={5}
          />
        </div>
      </div>
      <Suspense>
        <FilterBar
          title="Leave Employee List"
          filters={leaveFilters}
          showFilters
          showSearch
          showViewToggle={false}
          placeholder="Search leaves..."
          sortOptions={[
            { value: "employee-asc", label: "Employee (A-Z)" },
            { value: "employee-desc", label: "Employee (Z-A)" },
            { value: "fromDate-asc", label: "From Date (Oldest first)" },
            { value: "fromDate-desc", label: "From Date (Newest first)" },
            { value: "status-asc", label: "Status (A-Z)" },
            { value: "status-desc", label: "Status (Z-A)" },
          ]}
          defaultSort="fromDate-desc"
          showSort
          showDateRange
          pointView={[
            { label: "Total Leaves", value: "48" },
            { label: "Total Remaining Leaves", value: "23" },
          ]}
        />
      </Suspense>

      <Suspense>
        <DynamicTable
          data={leaves}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <AddLeave isOpen={isOpen} setIsOpen={setIsOpen} variant="modal" />
    </div>
  );
}

export default LeaveEmployeePage;
