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
  Facebook,
  FileBox,
  FileText,
  Mail,
  MessageSquareMore,
  Phone,
  Sheet,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import Link from "next/link";
import AddDeal from "@/components/forms/AddDeal";
import AddCompany from "@/components/forms/AddCompany";
import { Company } from "@/types/data";
import { companies } from "@/constants/companies";
import DynamicCard from "@/components/UI/cards/DynamicCard";

const labels = {
  "/companies": "Companies",
};

const companyFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "prospect", label: "Prospect" },
    ],
  },
  {
    id: "industry",
    name: "Industry",
    options: [
      { value: "technology", label: "Technology" },
      { value: "finance", label: "Finance" },
      { value: "healthcare", label: "Healthcare" },
      { value: "manufacturing", label: "Manufacturing" },
      { value: "retail", label: "Retail" },
    ],
  },
  {
    id: "size",
    name: "Company Size",
    options: [
      { value: "small", label: "Small (1-50)" },
      { value: "medium", label: "Medium (51-500)" },
      { value: "large", label: "Large (501+)" },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    options: [
      { value: "5", label: "5 stars" },
      { value: "4", label: "4 stars" },
      { value: "3", label: "3 stars" },
      { value: "2", label: "2 stars" },
      { value: "1", label: "1 star" },
    ],
  },
];

export default function CompanyPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dealIsOpen, setDealIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const columns = [
    {
      key: "name",
      header: "Company",
      render: (item: Company) => (
        <Link
          href={`/admin/companies/${item.id}`}
          className="flex items-center gap-3"
        >
          <Image
            src={item.avatar || "/placeholder.png"}
            width={200}
            height={100}
            className="h-8 w-8 rounded-full object-contain"
            alt={item.name}
          />
          <div>
            <span className="block text-sm font-medium text-gray-800">
              {item.name}
            </span>
            <span className="block text-xs text-gray-500">{item.industry}</span>
          </div>
        </Link>
      ),
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      render: (item: Company) => (
        <span className="text-sm text-gray-600">{item.email || "-"}</span>
      ),
    },
    {
      key: "tags",
      header: "Tags",
      render: (item: Company) => (
        <div className="flex flex-wrap gap-1">
          {item.tags.length > 0 ? (
            item.tags.map((tag, index) => {
              const colors: Record<string, string> = {
                Collab: "bg-blue-100 text-blue-800",
                Promotion: "bg-yellow-100 text-yellow-800",
                VIP: "bg-purple-100 text-purple-800",
              };
              return (
                <span
                  key={index}
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${colors[tag] || "bg-gray-100 text-gray-800"}`}
                >
                  {tag}
                </span>
              );
            })
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      key: "owner",
      header: "Owner",
      render: (item: Company) => (
        <Link
          href={`/admin/contacts/${item.owner.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={item.owner?.avatar || "/placeholder.png"}
            width={100}
            height={100}
            className="h-8 w-8 rounded-full object-cover"
            alt={`${item.owner?.name}'s avatar`}
          />
          <span className="text-xs text-gray-600">{item.owner?.name}</span>
        </Link>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (item: Company) => (
        <div className="flex space-x-2 px-4">
          <Link href="#" className="text-gray-400 hover:text-secondary">
            <Mail className="h-3.5 w-3.5" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-secondary">
            <Phone className="h-3.5 w-3.5" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-secondary">
            <MessageSquareMore className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`mailto:${item.email}`}
            className="text-gray-400 hover:text-secondary"
          >
            <Facebook className="h-3.5 w-3.5" />
          </Link>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Company) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : item.status === "inactive"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.status === "active" ? "Active" : "Inactive"}
        </span>
      ),
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
            onClick: (item: Company) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Company) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Company) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Companies</h2>
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
          filters={companyFilters}
          showFilters
          showSearch
          showBtnAdd
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          placeholder="Search companies..."
          BtnAdd={{ label: "Add Company", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "employees-asc", label: "Employees (Fewest first)" },
            { value: "employees-desc", label: "Employees (Most first)" },
          ]}
          defaultSort="name-asc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {companies.map((company, index) => (
              <DynamicCard
                key={index}
                name={company.name}
                country={company.location.country}
                avatar={company.avatar || "/placeholder.png"}
                id={company.id}
                owner={company.owner}
                email={company.email}
                phone={company.phone}
                isCompany
              />
            ))}
          </div>
          <Pagination currentPage={3} totalPages={10} />
        </>
      )}
      {viewMode === "list" && (
        <Suspense>
          <DynamicTable
            data={companies}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            showRowNumbers
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddCompany
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dealIsOpen={dealIsOpen}
        setDealIsOpen={setDealIsOpen}
      />
      <AddDeal isOpen={dealIsOpen} setIsOpen={setDealIsOpen} />
    </div>
  );
}
