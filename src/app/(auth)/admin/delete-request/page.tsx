"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import { FilterOption } from "@/types/genral";
import {
  FileBox,
  FileText,
  Sheet,
  Calendar,
  User,
  Eye,
  MessageSquare,
  Edit,
  Trash2,
} from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/util/dateUtils";
import { Contact } from "@/types/data";
import { contacts } from "@/constants/contacts";

export type DeleteRequest = {
  id: string;
  user: Contact;
  requisitionDate: Date;
  deleteRequestDate: Date;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  notes?: string;
};

// Mock data for delete account requests
const deleteRequests: DeleteRequest[] = [
  {
    id: "1",
    user: contacts[0],
    requisitionDate: new Date("2023-10-15"),
    deleteRequestDate: new Date("2023-11-15"),
    reason: "No longer using the service",
    status: "pending",
  },
  {
    id: "2",
    user: contacts[1],
    requisitionDate: new Date("2023-10-10"),
    deleteRequestDate: new Date("2023-11-10"),
    reason: "Privacy concerns",
    status: "approved",
    notes: "User confirmed deletion via email",
  },
  {
    id: "3",
    user: contacts[2],
    requisitionDate: new Date("2023-10-05"),
    deleteRequestDate: new Date("2023-11-05"),
    reason: "Found alternative service",
    status: "rejected",
    notes: "User has active subscription",
  },
  {
    id: "4",
    user: contacts[3],
    requisitionDate: new Date("2023-09-28"),
    deleteRequestDate: new Date("2023-10-28"),
    reason: "Dissatisfied with product features",
    status: "pending",
  },
  {
    id: "5",
    user: contacts[3],
    requisitionDate: new Date("2023-09-20"),
    deleteRequestDate: new Date("2023-10-20"),
    reason: "Company policy change",
    status: "cancelled",
    notes: "User withdrew the request",
  },
  {
    id: "6",
    user: contacts[0],
    requisitionDate: new Date("2023-09-15"),
    deleteRequestDate: new Date("2023-10-15"),
    reason: "Data retention concerns",
    status: "approved",
  },
];

const labels = {
  "/delete-requests": "Delete Account Requests",
};

export default function DeleteRequestsPage() {
  const statusFilters: FilterOption[] = [
    {
      id: "status",
      name: "Status",
      options: [
        { value: "all", label: "All Statuses" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
  ];

  const columns = [
    {
      key: "userName",
      header: "User Name",
      render: (item: DeleteRequest) => (
        <Link
          href={`/admin/contacts/${item.id}`}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
            {item.user.avatar ? (
              <Image
                src={item.user.avatar}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                alt={item.user.name}
              />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {item.user.name}
            </p>
            <p className="text-xs text-gray-500">{item.user.email}</p>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "requisitionDate",
      header: "Requisition Date",
      render: (item: DeleteRequest) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {formatDate(item.requisitionDate, "MMM dd, yyyy h:mm A")}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "deleteRequestDate",
      header: "Delete Request Date",
      render: (item: DeleteRequest) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {formatDate(item.deleteRequestDate, "MMM dd, yyyy h:mm A")}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "reason",
      header: "Reason for Deletion",
      render: (item: DeleteRequest) => (
        <div className="max-w-[200px]">
          <p className="truncate text-sm text-gray-700" title={item.reason}>
            {item.reason}
          </p>
          {item.notes && (
            <div className="mt-1 flex items-start gap-1">
              <MessageSquare size={12} className="mt-0.5 text-gray-400" />
              <p className="truncate text-xs text-gray-500" title={item.notes}>
                {item.notes}
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: DeleteRequest) => {
        const statusColors: Record<DeleteRequest["status"], string> = {
          pending: "bg-yellow-600 ",
          approved: "bg-green-600 ",
          rejected: "bg-red-600",
          cancelled: "bg-gray-600 ",
        };

        return (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium text-white ${statusColors[item.status]}`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
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
            onClick: (item: DeleteRequest) => alert(`Edit ${item.reason}`),
            divider: true,
          },
          {
            label: "View Details",
            icon: <Eye size={16} />,
            onClick: (item: DeleteRequest) => alert(`View ${item.reason}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: DeleteRequest) => {
              if (confirm(`Are you sure you want to delete ${item.reason}?`)) {
                alert(`Delete ${item.reason}`);
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
          Delete Account Requests
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
          filters={statusFilters}
          showFilters
          showSearch
          showBtnAdd={false}
          showViewToggle={false}
          placeholder="Search requests..."
          sortOptions={[
            { value: "userName-asc", label: "User Name (A-Z)" },
            { value: "userName-desc", label: "User Name (Z-A)" },
            {
              value: "requisitionDate-asc",
              label: "Requisition Date (Oldest)",
            },
            {
              value: "requisitionDate-desc",
              label: "Requisition Date (Newest)",
            },
            { value: "deleteRequestDate-asc", label: "Delete Date (Oldest)" },
            { value: "deleteRequestDate-desc", label: "Delete Date (Newest)" },
          ]}
          defaultSort="requisitionDate-desc"
          showSort
        />
      </Suspense>

      <Suspense>
        <DynamicTable
          data={deleteRequests}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          minWidth="1100px"
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
    </div>
  );
}
