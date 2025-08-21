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
  User,
} from "lucide-react";
import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddTicket from "@/components/forms/AddTickets";
import { Ticket } from "@/types/data";
import { tickets } from "@/constants/tickets";

const labels = {
  "/tickets": "Tickets",
};

export default function TicketsPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ticketFilters: FilterOption[] = [
    {
      id: "status",
      name: "Status",
      options: [
        { value: "open", label: "Open" },
        { value: "in-progress", label: "In Progress" },
        { value: "resolved", label: "Resolved" },
        { value: "closed", label: "Closed" },
      ],
    },
    {
      id: "priority",
      name: "Priority",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "urgent", label: "Urgent" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "technical", label: "Technical" },
        { value: "billing", label: "Billing" },
        { value: "enhancement", label: "Enhancement" },
        { value: "reports", label: "Reports" },
        { value: "mobile", label: "Mobile" },
      ],
    },
  ];

  const columns = [
    {
      key: "ticketId",
      header: "Ticket ID",
      render: (item: Ticket) => (
        <Link
          href={`/admin/tickets/${item.id}`}
          className="font-medium text-main hover:underline"
        >
          {item.ticketId}
        </Link>
      ),
      sortable: true,
    },
    {
      key: "subject",
      header: "Subject",
      render: (item: Ticket) => (
        <div className="max-w-[160px]">
          <p
            className="truncate text-xs font-medium text-gray-900"
            title={item.subject}
          >
            {item.subject}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "assigned",
      header: "Assigned",
      render: (item: Ticket) => (
        <Link
          href={`/admin/contacts/${item.assigned.id}`}
          className="group flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            {item.assigned.avatar ? (
              <Image
                src={item.assigned.avatar}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
                alt={item.assigned.name}
              />
            ) : (
              <User size={16} className="text-gray-500" />
            )}
          </div>
          <span className="text-sm text-gray-700 transition-colors group-hover:text-secondary">
            {item.assigned.name}
          </span>{" "}
        </Link>
      ),
      sortable: true,
    },
    {
      key: "createdOn",
      header: "Created On",
      render: (item: Ticket) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {item.createdOn.toLocaleDateString()}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "assignee",
      header: "Assignee",
      render: (item: Ticket) => (
        <Link
          href={`/admin/contacts/${item.assigned.id}`}
          className="group flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
            {item.assignee.avatar ? (
              <Image
                src={item.assignee.avatar}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
                alt={item.assignee.name}
              />
            ) : (
              <User size={16} className="text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-700 transition-colors group-hover:text-secondary">
              {item.assignee.name}
            </p>
            <p className="text-xs text-gray-500">{item.assignee.role}</p>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "priority",
      header: "Priority",
      render: (item: Ticket) => {
        const priorityColors: Record<Ticket["priority"], string> = {
          low: "bg-green-100 text-green-800",
          medium: "bg-yellow-100 text-yellow-800",
          high: "bg-orange-100 text-orange-800",
          urgent: "bg-red-100 text-red-800",
        };

        return (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium ${priorityColors[item.priority]}`}
          >
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Ticket) => {
        const statusColors: Record<Ticket["status"], string> = {
          open: "bg-blue-600 ",
          "in-progress": "bg-yellow-600 ",
          resolved: "bg-green-600 ",
          closed: "bg-gray-600",
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
            label: "Edit Ticket",
            icon: <Edit size={16} />,
            onClick: (item: Ticket) => alert(`Edit ${item.ticketId}`),
            divider: true,
          },
          {
            label: "View Details",
            icon: <Eye size={16} />,
            onClick: (item: Ticket) => alert(`View ${item.ticketId}`),
            divider: true,
          },
          {
            label: "Delete Ticket",
            icon: <Trash2 size={16} />,
            onClick: (item: Ticket) => {
              if (
                confirm(`Are you sure you want to delete ${item.ticketId}?`)
              ) {
                alert(`Delete ${item.ticketId}`);
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
        <h2 className="text-2xl font-bold text-gray-800">Tickets</h2>
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
          filters={ticketFilters}
          showFilters
          showSearch
          showBtnAdd
          showViewToggle={false}
          placeholder="Search tickets..."
          BtnAdd={{ label: "Add Ticket", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "ticketId-asc", label: "Ticket ID (A-Z)" },
            { value: "ticketId-desc", label: "Ticket ID (Z-A)" },
            { value: "createdOn-asc", label: "Created (Oldest)" },
            { value: "createdOn-desc", label: "Created (Newest)" },
            { value: "priority-asc", label: "Priority (Low to High)" },
            { value: "priority-desc", label: "Priority (High to Low)" },
          ]}
          defaultSort="createdOn-desc"
          showSort
        />
      </Suspense>

      <Suspense>
        <DynamicTable
          data={tickets}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          minWidth="1000px"
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>

      <AddTicket isOpen={isOpen} setIsOpen={setIsOpen} variant="modal" />
    </div>
  );
}
