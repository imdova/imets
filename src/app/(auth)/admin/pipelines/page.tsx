"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import { FilterOption } from "@/types/genral";
import { Edit, Eye, FileBox, FileText, Sheet, Trash2 } from "lucide-react";
import { Suspense, useState } from "react";
import { Pipeline } from "@/types/data";
import { pipelines } from "@/constants/pipelines";
import AddPipeline from "@/components/forms/AddPipeline";

const labels = {
  "/pipelines": "Pipelines",
};

const pipelineFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
      { value: "draft", label: "Draft" },
    ],
  },
];

export default function PipelinePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const columns = [
    {
      key: "name",
      header: "Pipeline Name",
    },
    {
      key: "totalValue",
      header: "Total Deal Value",
      render: (item: Pipeline) => (
        <span className="font-medium">
          ${item.totalValue?.toLocaleString()}
        </span>
      ),
      sortable: true,
    },
    {
      key: "dealCount",
      header: "No of Deals",
      sortable: true,
    },
    {
      key: "stages",
      header: "Stages",
      render: (item: Pipeline) => {
        return (
          <div className="flex items-center gap-2">
            <span
              className={`h-1 w-24 rounded-full ${
                item.stages === "win"
                  ? "bg-green-500"
                  : item.stages === "inPipeline"
                    ? "bg-purple-500"
                    : item.stages === "conversation"
                      ? "bg-yellow-500"
                      : item.stages === "lost"
                        ? "bg-red-500"
                        : "bg-gray-300"
              }`}
            />
            <span className="text-sm font-semibold capitalize">
              {item.stages}
            </span>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created Date",
      render: (item: Pipeline) => (
        <span className="text-sm text-gray-600">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Pipeline) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : item.status === "inactive"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
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
            onClick: (item: Pipeline) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Pipeline) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Pipeline) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Pipelines</h2>
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
          filters={pipelineFilters}
          showFilters
          showSearch
          showBtnAdd
          showViewToggle={false}
          placeholder="Search pipelines..."
          BtnAdd={{ label: "Add Pipeline", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "totalValue-asc", label: "Value (Low-High)" },
            { value: "totalValue-desc", label: "Value (High-Low)" },
          ]}
          defaultSort="name-asc"
          showSort
          showDateRange
        />
      </Suspense>
      <Suspense>
        <DynamicTable
          data={pipelines}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          showRowNumbers
          onSelectionChange={(selected) => console.log("Selected:", selected)}
        />
      </Suspense>
      <AddPipeline isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
