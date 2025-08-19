"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import Pagination from "@/components/UI/Pagination";
import { FilterOption } from "@/types/genral";
import { Edit, Eye, FileBox, FileText, Sheet, Trash2 } from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import Link from "next/link";
import AddProject from "@/components/forms/AddProject";
import { Project } from "@/types/data";
import { ProjectCard } from "@/components/UI/cards/ProjectCard";
import { projects } from "@/constants/projects";

const labels = {
  "/projects": "Projects",
};

const projectFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "InActive" },
    ],
  },
  {
    id: "priority",
    name: "Priority",
    options: [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ],
  },
  {
    id: "team",
    name: "Team",
    options: [
      {
        value: "design",
        label: "Design Team",
      },
      {
        value: "development",
        label: "Development Team",
      },
      {
        value: "marketing",
        label: "Marketing Team",
      },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "website", label: "Website" },
      { value: "mobile", label: "Mobile App" },
      { value: "branding", label: "Branding" },
    ],
  },
];

export default function ProjectPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: Project) => (
        <Link
          href={`/admin/projects/${item.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.avatar}
            width={200}
            height={100}
            className="h-6 w-6 rounded-md object-cover"
            alt={item.name}
          />
          <div>
            <span className="text-xs font-medium text-gray-800">
              {item.name}
            </span>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "client",
      header: "Client",
      render: (item: Project) => (
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
      key: "priority",
      header: "Priority",
      render: (item: Project) => {
        const priorityColors: Record<string, string> = {
          high: "bg-red-50 text-red-700",
          medium: "bg-orange-50 text-orange-700",
          low: "bg-yellow-50 text-yellow-700",
        };
        const priorityDotColors: Record<string, string> = {
          high: "bg-red-500",
          medium: "bg-orange-500",
          low: "bg-yellow-500",
        };
        return (
          <span
            className={`flex w-fit items-center gap-2 ${priorityColors[item.priority] ?? "bg-gray-50 text-gray-700"} rounded-md px-2 py-1 text-xs font-semibold capitalize`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${priorityDotColors[item.priority] ?? "bg-gray-400"}`}
            />
            {item.priority}
          </span>
        );
      },
    },
    {
      key: "startDate",
      header: "Start Date",
    },
    {
      key: "endDate",
      header: "Start Date",
    },
    {
      key: "stages",
      header: "Stages",
      render: (item: Project) => {
        return (
          <div className="flex items-center gap-2">
            <span
              className={`h-1 w-20 rounded-full ${
                item.pipelineStage === "win"
                  ? "bg-green-500"
                  : item.pipelineStage === "inPipeline"
                    ? "bg-purple-500"
                    : item.pipelineStage === "conversation"
                      ? "bg-yellow-500"
                      : item.pipelineStage === "lost"
                        ? "bg-red-500"
                        : "bg-gray-300"
              }`}
            />
            <span className="text-xs font-semibold capitalize">
              {item.pipelineStage}
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (item: Project) => {
        const statusStyles: Record<string, string> = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-red-100 text-red-800",
        };
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusStyles[item.status]}`}
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
            onClick: (item: Project) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Project) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Project) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Projects</h2>
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
          filters={projectFilters}
          showFilters
          showSearch
          showBtnAdd
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          placeholder="Search projects..."
          BtnAdd={{ label: "Add Project", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "date-asc", label: "Date (Oldest first)" },
            { value: "date-desc", label: "Date (Newest first)" },
            { value: "priority-high", label: "Priority (High to Low)" },
            { value: "priority-low", label: "Priority (Low to High)" },
          ]}
          defaultSort="name-asc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {projects.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={5} />
        </>
      )}
      {viewMode === "list" && (
        <Suspense>
          <DynamicTable
            data={projects}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            showRowNumbers
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
