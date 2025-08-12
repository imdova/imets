"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import { DealCard } from "@/components/UI/cards/DealCard";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import { DropdownAction, FilterOption } from "@/types/genral";
import { Edit, Eye, FileBox, FileText, Sheet, Trash2 } from "lucide-react";
import { Suspense, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import AddDeal from "@/components/forms/AddDeal";
import { Deal } from "@/types/data";
import { initialDeals, stageGroups } from "@/constants/deals";

const labels = {
  "/deals": "Deals",
};

const projectFilters: FilterOption[] = [
  {
    id: "stage",
    name: "stage",
    options: [
      { value: "qualify", label: "Qualify to Buy" },
      { value: "contact", label: "Contact Made" },
      { value: "presentation", label: "Presentation" },
      { value: "proposal", label: "Proposal Made" },
    ],
  },
  {
    id: "amount",
    name: "Amount",
    options: [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ],
  },
  {
    id: "location",
    name: "Location",
    options: [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
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

export default function DealPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
    },
    {
      key: "stage",
      header: "Stage",
      render: (item: Deal) => (
        <span className="text-sm text-gray-700">{item.stage}</span>
      ),
      sortable: true,
    },
    {
      key: "amount",
      header: "Deal Value",
      sortable: true,
    },
    {
      key: "tags",
      header: "Tags",
      sortable: true,
      render: (item: Deal) => {
        const tags = item.tags ?? [];

        return (
          <div className="flex flex-wrap gap-1">
            {tags.length > 0 ? (
              tags.map((tag, index) => {
                const colors: Record<string, string> = {
                  Collab: "bg-blue-100 text-blue-800",
                  Promotion: "bg-yellow-100 text-yellow-800",
                  VIP: "bg-purple-100 text-purple-800",
                };
                return (
                  <span
                    key={index}
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      colors[tag] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })
            ) : (
              <span className="text-xs text-gray-400">-</span>
            )}
          </div>
        );
      },
    },
    {
      key: "expecteDate",
      header: "Expected Close Date",
      sortable: true,
    },
    {
      key: "property",
      header: "Property",
      sortable: true,
      render: (item: Deal) => (
        <span className="text-sm text-gray-600">{item.property}%</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item: Deal) => {
        const statusColors: Record<Deal["status"], string> = {
          open: "bg-purple-600 text-white",
          last: "bg-yellow-600 text-white",
          won: "bg-green-600 text-white",
        };

        return (
          <span
            className={`rounded-lg px-2 py-1 text-xs font-semibold ${
              statusColors[item.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {item.status}
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
            onClick: (item: Deal) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Deal) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Deal) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // No movement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the deal being dragged
    const deal = deals.find((d) => d.id === draggableId);
    if (!deal) return;

    // Update the stage if moved to a different column
    if (destination.droppableId !== source.droppableId) {
      const updatedDeal = {
        ...deal,
        stage: destination.droppableId as Deal["stage"],
      };

      // Update the deals array
      setDeals((prev) =>
        prev.filter((d) => d.id !== draggableId).concat(updatedDeal),
      );
    } else {
      // For same-column reordering (if needed)
      // This would require maintaining order state which we're not doing here
    }
  };

  // Group deals by stage for the drag and drop interface
  const getDealsBystage = (stage: string) => {
    return deals
      .filter((deal) => deal.stage === stage)
      .sort((a, b) =>
        a.expecteDate && b.expecteDate
          ? a.expecteDate.localeCompare(b.expecteDate)
          : 0,
      );
  };

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Deals</h2>
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
          placeholder="Search deals..."
          BtnAdd={{ label: "Add Deal", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "amount-asc", label: "Amount (Low-High)" },
            { value: "amount-desc", label: "Amount (High-Low)" },
          ]}
          defaultSort="name-asc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stageGroups.map((group) => (
              <Droppable key={group.id} droppableId={group.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-w-[300px] flex-1 rounded-lg border border-gray-200 bg-gray-50 p-2"
                  >
                    <div className="relative mb-4 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                      <div className="flex justify-between">
                        {" "}
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                group.id === "qualify"
                                  ? "bg-blue-500"
                                  : group.id === "contact"
                                    ? "bg-purple-500"
                                    : group.id === "presentation"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                              }`}
                            ></span>
                            <h3 className="text-base font-bold">
                              {group.title}
                            </h3>
                          </div>
                          <span className="text-sm font-normal text-gray-500">
                            {group.count} - {group.total}
                          </span>
                        </div>
                        <OptionsDropdown actions={actions} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {getDealsBystage(group.id).map((deal, index) => (
                        <Draggable
                          key={deal.id}
                          draggableId={deal.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <DealCard deal={deal} />
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
            data={deals}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            showRowNumbers
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddDeal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
