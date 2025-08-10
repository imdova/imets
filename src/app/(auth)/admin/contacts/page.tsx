"use client";
import { FilterBar } from "@/components/filters/FilterBar";
import FormModal from "@/components/FormModal/FormModal";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import ContactCard from "@/components/UI/cards/ContactCard";
import Dropdown from "@/components/UI/Dropdown";
import DynamicTable from "@/components/UI/DTable";
import Pagination from "@/components/UI/Pagination";
import { FilterOption } from "@/types/genral";
import { Edit, Eye, FileBox, FileText, Sheet, Trash2 } from "lucide-react";
import Image from "next/image";
import { Suspense, useState } from "react";

interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  country: string;
}

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

const contacts: Contact[] = [
  {
    id: "1",
    name: "Carol Thomas",
    role: "UI/UX Designer",
    email: "caroltho3@example.com",
    phone: "+1 124547845",
    country: "China",
  },
  {
    id: "2",
    name: "Jonathan Smith",
    role: "Team Lead Dev",
    email: "jonathan@example.com",
    phone: "+1 321454789",
    country: "Egypt",
  },
  {
    id: "3",
    name: "Dawn Mercha",
    role: "Technician",
    email: "dawmmercha@example.com",
    phone: "+1 478845447",
    country: "Martin Lewis",
  },
  {
    id: "4",
    name: "Brook Carter",
    role: "Team Lead Dev",
    email: "brook@example.com",
    phone: "+1 278907145",
    country: "Colombia",
  },
  {
    id: "5",
    name: "Rachel Hampton",
    role: "Software Developer",
    email: "rachel@example.com",
    phone: "+1 215544845",
    country: "Indonesia",
  },
  {
    id: "6",
    name: "Eric Adams",
    role: "HR Manager",
    email: "ericadams@example.com",
    phone: "+1 19023-78104",
    country: "France",
  },
  {
    id: "7",
    name: "Jonelle Curtiss",
    role: "Supervisor",
    email: "jonelle@example.com",
    phone: "+1 121145471",
    country: "Cuba",
  },
  {
    id: "8",
    name: "Richard Cooper",
    role: "Devops Engineer",
    email: "richard@example.com",
    phone: "+1 18902-63904",
    country: "Belgium",
  },
];

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    { key: "role", header: "Role", sortable: true },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "country", header: "Country", sortable: true },
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

  const handleClose = () => {
    setIsOpen(false);
  };
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
                country={contact.country}
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
      <FormModal
        open={isOpen}
        onClose={handleClose}
        onSubmit={() => console.log("submited")}
        title="Contact Details"
        description="Add or edit contact information"
        fields={[
          {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: true,
          },
          {
            name: "lastName",
            label: "Last Name",
            type: "text",
            required: true,
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
          },
          {
            name: "phone",
            label: "Phone Number",
            type: "text",
          },
          {
            name: "company",
            label: "Company",
            type: "text",
          },
          {
            name: "position",
            label: "Position",
            type: "text",
          },
          {
            name: "notes",
            label: "Notes",
            type: "textEditor",
          },
          {
            name: "isFavorite",
            label: "Mark as Favorite",
            type: "checkbox",
          },
        ]}
        submitButtonText={"Create Contact"}
      />
    </div>
  );
}
