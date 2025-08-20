import { Invoice } from "@/types/data";
import {
  DollarSign,
  Eye,
  Edit,
  Trash2,
  CalendarRange,
  CalendarCheck,
  Banknote,
} from "lucide-react";
import Link from "next/link";
import OptionsDropdown from "../OptionsDropdown";
import Image from "next/image";

interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  const statusColors: Record<string, string> = {
    "partially paid": "bg-orange-600",
    paid: "bg-green-600",
    overdue: "bg-blue-600",
    unpaid: "bg-red-600",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <span className="rounded-md bg-main-transparent px-2 py-1 text-xs text-main">
          {invoice.invoiceNumber}
        </span>
        <OptionsDropdown
          actions={[
            {
              label: "View Details",
              icon: <Eye size={16} />,
              onClick: () => alert("Viewing details..."),
            },
            {
              label: "Edit",
              icon: <Edit size={16} />,
              onClick: () => alert("Editing item..."),
            },
            {
              label: "Delete",
              icon: <Trash2 size={16} />,
              danger: true,
              onClick: () => confirm("Are you sure you want to delete?"),
            },
          ]}
        />
      </div>
      <div className="flex items-center justify-between pt-4">
        {invoice.project && (
          <div className="flex items-center gap-2">
            <Image
              src={invoice.project.avatar || "/placeholder.png"}
              width={50}
              height={150}
              alt={invoice.project.name}
              className="h-10 w-10 rounded-full border border-gray-200 object-cover p-1 shadow-sm"
            />
            <div>
              <Link href={`/admin/projects/${invoice.project.id}`}>
                <h3 className="text-xs font-medium text-main hover:underline">
                  {invoice.project.name}
                </h3>
              </Link>
            </div>
          </div>
        )}
        <span
          className={`rounded-md px-3 py-1 text-[10px] capitalize text-white ${statusColors[invoice.status]}`}
        >
          {invoice.status}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-xs">
          <DollarSign size={14} />
          <span className="text-xs text-gray-700"> Total Value :</span>
          <span className="font-medium text-gray-900">
            ${invoice.totalAmount}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <CalendarRange size={14} />
          <span className="text-xs text-gray-700">Due Date:</span>
          <span className="font-medium text-gray-900">{invoice.dueDate}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <CalendarCheck size={14} />
          <span className="text-xs text-gray-700">Paid Amount:</span>
          <span className="font-medium text-gray-900">
            ${invoice.paidAmount}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Banknote size={14} />
          <span className="text-xs text-gray-700">Balance Amount:</span>
          <span className="font-medium text-gray-900">
            ${invoice.balanceAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between pt-4">
        {invoice.client && (
          <div className="flex items-center gap-3">
            <Image
              src={invoice.client.avatar || "/placeholder.png"}
              width={50}
              height={150}
              alt={invoice.client.name}
              className="h-10 w-10 rounded-full border border-gray-200 object-cover p-1 shadow-sm"
            />
            <div className="flex flex-col gap-1">
              <Link href={`/admin/companies/${invoice.client.id}`}>
                <h3 className="text-xs font-medium text-main hover:underline">
                  {invoice.client.name}
                </h3>
              </Link>
              <span className="text-xs text-gray-700">Sent to</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
