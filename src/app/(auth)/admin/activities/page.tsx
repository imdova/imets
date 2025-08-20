"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
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
  FileCheck2,
  UserCheck,
} from "lucide-react";
import { Suspense, useState } from "react";
import { Activity } from "@/types/data";
import Image from "next/image";
import Link from "next/link";
import AddActivity from "@/components/forms/AddActivity";
import { activities } from "@/constants/activities";

const labels = {
  "/activities": "Activities",
};

export default function ActivityPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const columns = [
    {
      key: "title",
      header: "Activity Title",
    },
    {
      key: "type",
      header: "Type",
      render: (item: Activity) => {
        const typeColors: Record<Activity["type"], string> = {
          meeting: "bg-blue-100 text-blue-600",
          task: "bg-green-100 text-green-600",
          email: "bg-purple-100 text-purple-600",
          call: "bg-yellow-100 text-yellow-600",
          event: "bg-red-100 text-red-600",
        };
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${typeColors[item.type]}`}
          >
            {item.type}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (item: Activity) => (
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            {new Date(item.dueDate).toLocaleDateString()}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "owner",
      header: "Owner",
      render: (item: Activity) => (
        <Link
          href={`/admin/contacts/${item.owner.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.owner.avatar}
            width={150}
            height={150}
            className="h-8 w-8 rounded-full object-cover"
            alt={item.owner.name}
          />
          <span className="text-sm">{item.owner.name}</span>
        </Link>
      ),
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
            onClick: (item: Activity) => alert(`Edit ${item.title}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Activity) => alert(`View ${item.title}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Activity) => alert(`Delete ${item.title}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
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
          showFilters={false}
          showSearch
          showBtnAdd
          showViewToggle={false}
          placeholder="Search activities..."
          BtnAdd={{ label: "Add Activity", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "title-asc", label: "Title (A-Z)" },
            { value: "title-desc", label: "Title (Z-A)" },
            { value: "dueDate-asc", label: "Due Date (Earliest)" },
            { value: "dueDate-desc", label: "Due Date (Latest)" },
            { value: "priority-asc", label: "Priority (High-Low)" },
            { value: "priority-desc", label: "Priority (Low-High)" },
          ]}
          defaultSort="dueDate-asc"
          showSort
          showIconFilters
          iconFilters={[
            {
              id: "calls",
              icon: Phone,
              label: "Calls",
              active: false,
              show: true,
            },
            {
              id: "email",
              icon: Mail,
              label: "Email",
              active: false,
              show: true,
            },
            {
              id: "task",
              icon: FileCheck2,
              label: "Task",
              active: false,
              show: true,
            },
            {
              id: "meeting",
              icon: UserCheck,
              label: "Meeting",
              active: false,
              show: true,
            },
          ]}
        />
      </Suspense>

      <Suspense>
        <DynamicTable
          data={activities}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>

      <AddActivity isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
