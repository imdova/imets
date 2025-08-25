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
  PlusCircle,
} from "lucide-react";
import { Suspense, useState } from "react";
import { formatDate } from "@/util/dateUtils";
import { FormGroup } from "@/components/DrawerForm/types";
import { FormDrawer } from "@/components/DrawerForm/FormDrawer";

type HolidayFormValues = {
  title: string;
  date: string;
  description: string;
  status: string;
};

export type Holiday = {
  id: string;
  title: string;
  date: Date;
  description: string;
  status: "Active" | "Inactive";
};

const HolidayForm: FormGroup<HolidayFormValues>[] = [
  {
    collapsible: false,
    fields: [
      {
        name: "title",
        label: "Holiday Title",
        required: true,
        type: "text",
        grid: { xs: 12 },
      },
      {
        name: "date",
        label: "Date",
        required: true,
        type: "date",
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
      {
        name: "description",
        label: "Description",
        required: false,
        type: "textarea",
        grid: { xs: 12 },
      },
    ],
  },
];

// Mock data for holidays
const holidays: Holiday[] = [
  {
    id: "1",
    title: "New Year's Day",
    date: new Date("2024-01-01"),
    description: "Celebration of the new year",
    status: "Active",
  },
  {
    id: "2",
    title: "Independence Day",
    date: new Date("2024-07-04"),
    description: "National independence celebration",
    status: "Active",
  },
  {
    id: "3",
    title: "Thanksgiving Day",
    date: new Date("2024-11-28"),
    description: "Day of giving thanks",
    status: "Active",
  },
  {
    id: "4",
    title: "Christmas Day",
    date: new Date("2024-12-25"),
    description: "Christmas celebration",
    status: "Active",
  },
  {
    id: "5",
    title: "Memorial Day",
    date: new Date("2024-05-27"),
    description: "Remembering fallen soldiers",
    status: "Active",
  },
  {
    id: "6",
    title: "Labor Day",
    date: new Date("2024-09-02"),
    description: "Celebrating workers' contributions",
    status: "Active",
  },
  {
    id: "7",
    title: "Veterans Day",
    date: new Date("2024-11-11"),
    description: "Honoring military veterans",
    status: "Active",
  },
  {
    id: "8",
    title: "Martin Luther King Jr. Day",
    date: new Date("2024-01-15"),
    description: "Honoring civil rights leader",
    status: "Active",
  },
  {
    id: "9",
    title: "Presidents' Day",
    date: new Date("2024-02-19"),
    description: "Honoring past presidents",
    status: "Active",
  },
  {
    id: "10",
    title: "Columbus Day",
    date: new Date("2024-10-14"),
    description: "Commemorating Christopher Columbus' arrival",
    status: "Inactive",
  },
];

const labels = {
  "/holidays": "Holidays",
};

export default function HolidaysPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const holidayFilters: FilterOption[] = [
    {
      id: "status",
      name: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "month",
      name: "Month",
      options: [
        { value: "all", label: "All Months" },
        { value: "january", label: "January" },
        { value: "february", label: "February" },
        { value: "march", label: "March" },
        { value: "april", label: "April" },
        { value: "may", label: "May" },
        { value: "june", label: "June" },
        { value: "july", label: "July" },
        { value: "august", label: "August" },
        { value: "september", label: "September" },
        { value: "october", label: "October" },
        { value: "november", label: "November" },
        { value: "december", label: "December" },
      ],
    },
  ];

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (item: Holiday) => (
        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-gray-900">{item.title}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "date",
      header: "Date",
      render: (item: Holiday) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-700">
            {formatDate(item.date, "MMM dd, yyyy")}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "description",
      header: "Description",
      render: (item: Holiday) => (
        <p className="line-clamp-4 text-xs text-gray-600">{item.description}</p>
      ),
      sortable: false,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Holiday) => (
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
            onClick: (item: Holiday) => alert(`Edit ${item.title}`),
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Holiday) => {
              if (confirm(`Are you sure you want to delete ${item.title}?`)) {
                alert(`Delete ${item.title}`);
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
        <h2 className="text-2xl font-bold text-gray-800">Holidays</h2>
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
            <PlusCircle size={14} /> Add Holiday
          </button>
        </div>
      </div>
      <Suspense>
        <FilterBar
          showFilters={false}
          filters={holidayFilters}
          showSearch
          showViewToggle={false}
          placeholder="Search holidays..."
          BtnAdd={{ label: "Add Holiday", onClick: () => setIsOpen(true) }}
        />
      </Suspense>
      <Suspense>
        <DynamicTable
          data={holidays}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <FormDrawer<HolidayFormValues>
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => console.log("Holiday submitted:", data)}
        groups={HolidayForm}
        initialValues={{} as HolidayFormValues}
        variant="modal"
        width="xl"
        title="Add Holiday"
        minHight={300}
        submitText="Save"
        cancelText="Cancel"
      />
    </div>
  );
}
