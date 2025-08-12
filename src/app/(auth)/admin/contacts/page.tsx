"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import ContactCard from "@/components/UI/cards/ContactCard";
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
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import AddContact from "../../../../components/forms/AddContact";
import { Flag } from "@/components/UI/Flag";
import Link from "next/link";
import AddDeal from "@/components/forms/AddDeal";
import { Contact } from "@/types/data";
import { contacts } from "@/constants/contacts";

const labels = {
  "/contacts": "Contacts",
};

const projectFilters: FilterOption[] = [
  {
    id: "status",
    name: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
      { value: "on-hold", label: "On Hold" },
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
    id: "users",
    name: "Users",
    options: [
      {
        value: "john-doe",
        label: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
      },
      {
        value: "jane-smith",
        label: "Jane Smith",
        avatar:
          "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
      },
      {
        value: "michael-lee",
        label: "Michael Lee",
        avatar:
          "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80",
      },
    ],
  },
  {
    id: "contacts",
    name: "Contacts",
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "whatsapp", label: "WhatsApp" },
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

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dealIsOpen, setDealIsOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const columns = [
    {
      key: "name",
      header: "Name",
      render: (item: Contact) => (
        <div className="flex items-center gap-2">
          <Image
            src="https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80"
            width={200}
            height={100}
            className="h-10 w-10 rounded-full object-cover"
            alt={item.name}
          />
          <span className="text-sm text-gray-600">{item.name}</span>
        </div>
      ),
      sortable: true,
    },
    { key: "phone", header: "Phone" },
    {
      key: "tags",
      header: "Tags",
      render: (item: Contact) => (
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
      key: "location",
      header: "Location",
      render: (item: Contact) => (
        <div className="flex items-center gap-2">
          <Flag countryCode={item.location.countryCode} />
          <p className="text-sm">{item.location.country}</p>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (item: Contact) => (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-secondary" />
          <p className="text-sm text-gray-700">{item.rating}</p>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (item: Contact) => (
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
      render: (item: Contact) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
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
            onClick: (item: Contact) => alert(`Edit ${item.name}`),
            divider: true,
          },
          {
            label: "View",
            icon: <Eye size={16} />,
            onClick: (item: Contact) => alert(`View ${item.name}`),
            divider: true,
          },
          {
            label: "Delete",
            icon: <Trash2 size={16} />,
            onClick: (item: Contact) => alert(`Delete ${item.name}`),
          },
        ],
      },
    },
  ];

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Contacts</h2>
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
                label: "Export As PDF",
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
          BtnAdd={{ label: "Add Contact", onClick: () => setIsOpen(true) }}
          sortOptions={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "date-asc", label: "Date (Oldest first)" },
            { value: "date-desc", label: "Date (Newest first)" },
          ]}
          defaultSort="name-asc"
          showSort={viewMode === "list"}
          showDateRange={viewMode === "list"}
        />
      </Suspense>

      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {contacts.map((contact, index) => (
              <ContactCard
                key={index}
                name={contact.name}
                role={contact.role}
                email={contact.email}
                phone={contact.phone}
                country={contact.location.country}
                avatar={
                  "https://img.freepik.com/free-photo/happy-smiling-man-with-blond-hair-beard-looking-camera-standing-grey-t-shirt-isolated-white-background_176420-48216.jpg?ga=GA1.1.1965666118.1751817128&semt=ais_hybrid&w=740&q=80"
                }
              />
            ))}
          </div>
          <Pagination currentPage={3} totalPages={10} />
        </>
      )}
      {viewMode === "list" && (
        <Suspense>
          <DynamicTable
            data={contacts}
            columns={columns}
            pagination
            itemsPerPage={5}
            selectable
            showRowNumbers
            onSelectionChange={(selected) => console.log("Selected:", selected)}
          />
        </Suspense>
      )}
      <AddContact
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dealIsOpen={dealIsOpen}
        setDealIsOpen={setDealIsOpen}
      />
      <AddDeal isOpen={dealIsOpen} setIsOpen={setDealIsOpen} />
    </div>
  );
}
