"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { LeadCard } from "@/components/UI/cards/LeadCard";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import { DropdownAction, FilterOption } from "@/types/genral";
import {
  Edit,
  Eye,
  FileBox,
  FileText,
  Plus,
  Sheet,
  Trash2,
} from "lucide-react";
import { Suspense, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import AddLead from "@/components/forms/AddLead";
import { Lead } from "@/types/data";
import { initialLeads, stageGroupsLeads } from "@/constants/leads";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/util/dateUtils";
import AddCompany from "@/components/forms/AddCompany";
import AddDeal from "@/components/forms/AddDeal";

const labels = {
  "/leads": "Leads",
};

const leadFilters: FilterOption[] = [
  {
    id: "stage",
    name: "Stage",
    options: [
      { value: "new", label: "New Lead" },
      { value: "contacted", label: "Contacted" },
      { value: "qualified", label: "Qualified" },
      { value: "proposal", label: "Proposal Sent" },
    ],
  },
  {
    id: "source",
    name: "Source",
    options: [
      { value: "website", label: "Website" },
      { value: "referral", label: "Referral" },
      { value: "social", label: "Social Media" },
      { value: "event", label: "Event" },
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
];

const actions: DropdownAction[] = [
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
];

export default function LeadPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCompanyopen, setIsCompanyopen] = useState<boolean>(false);
  const [isDealOpen, setIsDealOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const columns = [
    {
      key: "name",
      header: "Lead Name",
      sortable: true,
      render: (item: Lead) => (
        <Link
          className="flex items-center gap-2 hover:underline"
          href={`/admin/leads/${item.id}`}
        >
          <Image
            width={150}
            height={150}
            src={item.avatar}
            alt={item.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span>{item.name}</span>
        </Link>
      ),
    },
    {
      key: "company",
      header: "Company Name",
      sortable: true,
      render: (item: Lead) => (
        <Link
          className="flex items-center gap-2"
          href={`/admin/companies/${item.company.id}`}
        >
          <Image
            width={150}
            height={150}
            src={item.company.avatar}
            alt={item.company.name}
            className="h-6 w-6 rounded-full object-cover"
          />
          <div>
            <p className="text-xs">{item.company.name}</p>
            <p className="text-xs text-gray-600">
              {item.company.location.country}
            </p>
          </div>
        </Link>
      ),
    },
    {
      key: "phone",
      header: "phone",
      sortable: true,
    },
    {
      key: "stage",
      header: "Lead Status",
      render: (item: Lead) => {
        const stageColors: Record<string, string> = {
          contacted: "bg-green-100 text-green-800",
          notcontacted: "bg-gray-100 text-gray-800",
          closed: "bg-blue-100 text-blue-800",
          lost: "bg-red-100 text-red-800",
        };

        const stageLabels: Record<string, string> = {
          contacted: "Contacted",
          notcontacted: "Not Connected",
          closed: "Closed",
          lost: "Lost Leads",
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              stageColors[item.stage] || "bg-gray-100 text-gray-800"
            }`}
          >
            {stageLabels[item.stage] || item.stage}
          </span>
        );
      },

      sortable: true,
    },
    {
      key: "owner",
      header: "Lead Owner",
      sortable: true,
      render: (item: Lead) => (
        <Link
          className="flex items-center gap-2"
          href={`/admin/contacts/${item.company.id}`}
        >
          <Image
            width={150}
            height={150}
            src={item?.owner?.avatar ?? "/images/avatar.png"}
            alt={item?.owner?.name ?? "avatar owner"}
            className="h-6 w-6 rounded-full object-cover"
          />
          <p className="text-xs">{item.owner?.name}</p>
        </Link>
      ),
    },
    {
      key: "ceatedAt",
      header: "Ceated Date",
      render: (item: Lead) => (
        <span>{formatDate(item?.ceatedAt, "MMM dd, yyyy HH:mm")}</span>
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
            onClick: (item: Lead) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Lead) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Lead) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const lead = leads.find((l) => l.id === draggableId);
    if (!lead) return;

    if (destination.droppableId !== source.droppableId) {
      const updatedLead = {
        ...lead,
        stage: destination.droppableId as Lead["stage"],
      };

      setLeads((prev) =>
        prev.filter((l) => l.id !== draggableId).concat(updatedLead),
      );
    }
  };

  const getLeadsByStage = (stage: string) => {
    return leads
      .filter((lead) => lead.stage === stage)
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Leads</h2>
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
          filters={leadFilters}
          showFilters
          showSearch
          showBtnAdd
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          placeholder="Search leads..."
          BtnAdd={{ label: "Add Lead", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "value-asc", label: "Value (Low-High)" },
            { value: "value-desc", label: "Value (High-Low)" },
          ]}
          defaultSort="name-asc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stageGroupsLeads.map((group) => (
              <Droppable key={group.id} droppableId={group.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-w-[300px] flex-1 rounded-lg border border-gray-200 bg-gray-50 p-2"
                  >
                    <div className="relative mb-4 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: group.color }}
                            ></span>
                            <h3 className="text-base font-bold">
                              {group.title}
                            </h3>
                          </div>
                          <span className="text-sm font-normal text-gray-500">
                            {group.count} leads
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-100">
                            <Plus size={14} />
                          </button>
                          <OptionsDropdown actions={actions} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {getLeadsByStage(group.id).map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <LeadCard color={group.color} lead={lead} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
      {viewMode === "list" && (
        <Suspense>
          <DynamicTable
            data={leads}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            showRowNumbers
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddLead
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsCompanyopen={setIsCompanyopen}
      />
      <AddCompany
        title="Add Company"
        isOpen={isCompanyopen}
        setIsOpen={setIsCompanyopen}
        dealIsOpen={isDealOpen}
        setDealIsOpen={setIsDealOpen}
      />
      <AddDeal isOpen={isDealOpen} setIsOpen={setIsDealOpen} />
    </div>
  );
}
