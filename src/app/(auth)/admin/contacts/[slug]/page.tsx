"use client";
import AddContact from "@/components/forms/AddContact";
import AddDeal from "@/components/forms/AddDeal";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import LineTabs from "@/components/UI/LineTab";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { contacts } from "@/constants/contacts";
import { DropdownAction } from "@/types/genral";
import {
  AlarmClock,
  Calendar,
  Edit,
  Facebook,
  File,
  FileBox,
  FileText,
  Heart,
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareMore,
  MoveLeft,
  Notebook,
  Phone,
  Plus,
  Share,
  Sheet,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import Activities from "./panels/Activities";
import Notes from "./panels/Notes";
import Calls from "./panels/Calls";
import Files from "./panels/Files";
import Emails from "./panels/Emails";

const labels = {
  "/contacts": "Contacts",
};

const actions: DropdownAction[] = [
  {
    label: "Delete",
    icon: <Trash2 size={16} />,
    danger: true,
    onClick: () => confirm("Are you sure you want to delete?"),
  },
];
const tabs = [
  { label: "Activities", icon: AlarmClock },
  { label: "Notes", icon: Notebook },
  { label: "Calls", icon: Phone },
  { label: "Files", icon: File },
  { label: "Email", icon: Mail },
];

interface SingleContactProps {
  params: Promise<{ slug: string }>;
}

export default function SingleContact({ params }: SingleContactProps) {
  const { slug } = use(params);
  const [isDealOpen, setIsDealOpen] = useState<boolean>(false);
  const [isContantOpen, setIsContantOpen] = useState<boolean>(false);
  //  Keep active tab in state
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const contact = contacts.find((contact) => contact.id === slug);
  if (!contact) {
    return notFound;
  }

  //  Callback when a tab is clicked
  const handleTabChange = (label: string) => {
    setActiveTab(label);
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
      <Link
        className="flex items-center gap-2 pb-4 text-sm text-gray-700 transition-colors hover:text-gray-900"
        href={"/admin/contacts"}
      >
        <MoveLeft size={14} />
        Back To Contacts
      </Link>
      {/* Profile Contact  */}
      <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            className="h-24 w-24 flex-shrink rounded-full object-cover"
            src={contact.avatar}
            width={150}
            height={150}
            alt={contact.name}
          />
          <div>
            <h2 className="text-lg font-bold">{contact.name}</h2>
            {contact.role && (
              <p className="text-sm font-semibold text-gray-500">
                {contact.role}
              </p>
            )}
            <div className="mt-2 flex gap-4">
              {contact.isPrivate ? (
                <span className="flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-xs text-red-600">
                  <LockKeyhole size={12} />
                  Private
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs text-green-600">
                  <LockKeyholeOpen size={12} />
                  Public
                </span>
              )}
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {contact.rating} <Star className="text-secondary" size={13} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-lg border border-gray-200 p-3 shadow-sm">
              <Star className="text-secondary" size={15} />
            </button>
            <button
              onClick={() => setIsDealOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white shadow-sm transition-colors hover:bg-black/65"
            >
              <Plus size={15} /> Add Deal
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-white shadow-sm transition-colors">
              <Mail size={15} /> Send Email
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-gray-200 p-2 shadow-sm hover:bg-main-transparent">
              <MessageCircle size={13} />
            </button>
            <button
              onClick={() => setIsContantOpen(true)}
              className="rounded-lg border border-gray-200 p-2 shadow-sm hover:bg-main-transparent"
            >
              <Edit size={13} />
            </button>
            <OptionsDropdown actions={actions} />
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-10">
        <div className="h-fit rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-3">
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Basic Information</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Mail size={15} />
                <p className="text-gray-500">{contact.email}</p>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={15} />
                <p className="text-gray-500">{contact.phone}</p>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={15} />
                <p className="text-gray-500">{contact.location.country}</p>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Calendar size={15} />
                <p className="text-gray-500">
                  Created on 27 Sep 2025, 11:45 PM
                </p>
              </li>
            </ul>
          </div>
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Other Information</h2>
            <ul className="space-y-2">
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Language</p>
                <p>English</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Currency</p>
                <p>United States dollar</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Last Modified</p>
                <p>27 Sep 2023, 11:45 pm</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Source</p>
                <p>Paid Campaign</p>
              </li>
            </ul>
          </div>
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Tags</h2>
            <div className="flex gap-2">
              <div className="flex flex-wrap gap-1">
                {contact.tags.length > 0 ? (
                  contact.tags.map((tag, index) => {
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
            </div>
          </div>
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Social Profile</h2>
            <div className="flex space-x-2">
              <Link href="#" className="p-2 text-gray-400 hover:text-secondary">
                <Mail className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="p-2 text-gray-400 hover:text-secondary">
                <Phone className="h-3.5 w-3.5" />
              </Link>
              <Link href="#" className="p-2 text-gray-400 hover:text-secondary">
                <MessageSquareMore className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`mailto:${contact.email}`}
                className="p-2 text-gray-400 hover:text-secondary"
              >
                <Facebook className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="p-4">
            <h2 className="mb-2 font-bold">Settings</h2>
            <div className="space-y-2">
              <button className="group flex items-center gap-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <Share size={10} />
                </span>
                <p className="text-gray-500 transition-colors group-hover:text-main">
                  Share Contant
                </p>
              </button>
              <button className="group flex items-center gap-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <Heart size={10} />
                </span>
                <p className="text-gray-500 transition-colors group-hover:text-main">
                  Add to Favourite
                </p>
              </button>
              <button className="group flex items-center gap-2 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                  <Trash2 size={10} />
                </span>
                <p className="text-gray-500 transition-colors group-hover:text-main">
                  Delete Contant
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {/* Tabs navigation */}
            <LineTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
          {/* Tab content */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {activeTab === "Activities" && <Activities />}
            {activeTab === "Notes" && <Notes />}
            {activeTab === "Calls" && <Calls />}
            {activeTab === "Files" && <Files />}
            {activeTab === "Email" && <Emails />}
          </div>
        </div>
      </div>
      <AddDeal isOpen={isDealOpen} setIsOpen={setIsDealOpen} />
      <AddContact
        title="Edit Contact"
        isOpen={isContantOpen}
        setIsOpen={setIsContantOpen}
        dealIsOpen={isDealOpen}
        setDealIsOpen={setIsDealOpen}
        initialValues={{
          profileImage: [],
          firstName: "Carol",
          lastName: "Thomas",
          JobTitle: "UI/UX Designer",
          CompantName: "Example Corp",
          email: "caroltho3@example.com",
          EmailOptOut: false,
          phone1: "+1 124547845",
          phone2: "",
          Fax: "",
          Deals: "",
          DateofBirth: "1990-05-15",
          Reviews: "",
          Owner: "Admin",
          tags: ["Collab", "VIP"],
          Source: "Website",
          Industry: "Design",
          Currency: "USD",
          Language: "English",
          Description: "Experienced UI/UX designer.",
          address: "123 Main Street",
          Country: "China",
          "State-Province": "",
          City: "Beijing",
          Zipcode: "100000",
          Facebook: "",
          Skype: "",
          Linkedin: "",
          Twitter: "",
          Whatsapp: "",
          Instagram: "",
          Visibility: "Private",
        }}
      />
    </div>
  );
}
