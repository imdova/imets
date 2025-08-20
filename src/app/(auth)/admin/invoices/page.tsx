"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import Pagination from "@/components/UI/Pagination";
import { FilterOption } from "@/types/genral";
import {
  Edit,
  Eye,
  FileBox,
  FileText,
  Sheet,
  Trash2,
  Download,
  Send,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import Link from "next/link";
import AddInvoice from "@/components/forms/AddInvoice";
import { Invoice, InvoiceStatus } from "@/types/data";
import { InvoiceCard } from "@/components/UI/cards/InvoiceCard";
import { invoices } from "@/constants/invoices";

const labels = {
  "/invoices": "Invoices",
};

const invoiceFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "draft", label: "Draft" },
      { value: "sent", label: "Sent" },
      { value: "viewed", label: "Viewed" },
      { value: "paid", label: "Paid" },
      { value: "overdue", label: "Overdue" },
    ],
  },
  {
    id: "paymentStatus",
    name: "Payment Status",
    options: [
      { value: "paid", label: "Paid" },
      { value: "unpaid", label: "Unpaid" },
      { value: "partial", label: "Partial" },
    ],
  },
  {
    id: "client",
    name: "Client",
    options: [
      { value: "client1", label: "Acme Inc." },
      { value: "client2", label: "XYZ Corp" },
      { value: "client3", label: "ABC Ltd" },
    ],
  },
];

export default function InvoicePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const columns = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      render: (item: Invoice) => (
        <Link
          href={`/admin/invoices/${item.id}`}
          className="flex items-center gap-2"
        >
          <div>
            <span className="text-xs font-medium text-gray-800">
              {item.invoiceNumber}
            </span>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "client",
      header: "Client",
      render: (item: Invoice) => (
        <Link
          href={`/admin/companies/${item.client.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.client.avatar}
            width={200}
            height={100}
            className="h-6 w-6 rounded-md object-cover"
            alt={item.client.name}
          />
          <div>
            <span className="text-xs font-medium text-gray-800">
              {item.client.name}
            </span>{" "}
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "project",
      header: "Project",
      render: (item: Invoice) => (
        <Link
          href={`/admin/projects/${item.project?.id}`}
          className="flex items-center gap-2"
        >
          {item.project?.avatar ? (
            <Image
              src={item.project.avatar}
              width={200}
              height={100}
              className="h-6 w-6 rounded-md object-cover"
              alt={item.project.name}
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-100">
              <FileBox size={14} className="text-purple-600" />
            </div>
          )}
          <div>
            <span className="text-xs font-medium text-gray-800">
              {item.project?.name || "N/A"}
            </span>{" "}
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (item: Invoice) => (
        <span className="text-xs text-gray-600">
          {new Date(item.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
      sortable: true,
    },
    {
      key: "totalAmount",
      header: "Amount",
      render: (item: Invoice) => (
        <span className="text-xs font-semibold text-gray-800">
          ${item.totalAmount.toLocaleString("en-IN")}
        </span>
      ),
      sortable: true,
    },
    {
      key: "paidAmount",
      header: "Paid Amount",
      render: (item: Invoice) => (
        <span className="text-xs font-medium text-gray-600">
          ${item.paidAmount.toLocaleString("en-IN")}
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Invoice) => {
        const statusStyles: Record<InvoiceStatus, string> = {
          "partially paid": "bg-orange-600",
          paid: "bg-green-600",
          overdue: "bg-blue-600",
          unpaid: "bg-red-600",
        };
        return (
          <span
            className={`rounded-md px-2 py-1 text-xs font-semibold capitalize text-white ${statusStyles[item.status]}`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        );
      },
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
            onClick: (item: Invoice) => alert(`Edit ${item.invoiceNumber}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Invoice) => alert(`View ${item.invoiceNumber}`),
            divider: true,
          },
          {
            label: "Download",
            icon: <Download size={16} />,
            onClick: (item: Invoice) => alert(`Download ${item.invoiceNumber}`),
            divider: true,
          },
          {
            label: "Send",
            icon: <Send size={16} />,
            onClick: (item: Invoice) => alert(`Send ${item.invoiceNumber}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Invoice) => alert(`Delete ${item.invoiceNumber}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Invoices</h2>
      <div className="mb-4 flex flex-col justify-between md:flex-row">
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
          filters={invoiceFilters}
          showFilters
          showSearch
          showBtnAdd
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          placeholder="Search invoices..."
          BtnAdd={{ label: "Create Invoice", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "number-asc", label: "Invoice # (A-Z)" },
            { value: "number-desc", label: "Invoice # (Z-A)" },
            { value: "date-asc", label: "Date (Oldest first)" },
            { value: "date-desc", label: "Date (Newest first)" },
            { value: "dueDate-asc", label: "Due Date (Oldest first)" },
            { value: "dueDate-desc", label: "Due Date (Newest first)" },
            { value: "amount-high", label: "Amount (High to Low)" },
            { value: "amount-low", label: "Amount (Low to High)" },
          ]}
          defaultSort="date-desc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {invoices.map((invoice, index) => (
              <InvoiceCard invoice={invoice} key={index} />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={5} />
        </>
      )}
      {viewMode === "list" && (
        <Suspense>
          <DynamicTable
            data={invoices}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            showRowNumbers
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddInvoice isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
