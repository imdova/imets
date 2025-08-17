"use client";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import LineTabs from "@/components/UI/LineTab";
import { contacts } from "@/constants/contacts";
import {
  AlarmClock,
  Building2,
  File,
  FileBox,
  FileText,
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
  MapPin,
  MoveLeft,
  Notebook,
  Phone,
  PlusCircle,
  Sheet,
  Star,
  ThumbsUp,
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
import CustomSelect from "@/components/UI/CustomSelect";
import LeadsPipelineStatus from "@/components/UI/PipelineStatus";
import AddConracts from "@/components/forms/AddConracts";
import { initialLeads } from "@/constants/leads";
import { formatDate } from "@/util/dateUtils";

const labels = {
  "/Leads": "Leads",
};

const tabs = [
  { label: "Activities", icon: AlarmClock },
  { label: "Notes", icon: Notebook },
  { label: "Calls", icon: Phone },
  { label: "Files", icon: File },
  { label: "Email", icon: Mail },
];

interface SingleLeadProps {
  params: Promise<{ slug: string }>;
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

export default function SingleLead({ params }: SingleLeadProps) {
  const { slug } = use(params);
  const [isConractsOpen, setIsConractsOpen] = useState<boolean>(false);

  //  Keep active tab in state
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const Lead = initialLeads.find((Lead) => Lead.id === slug);
  if (!Lead) {
    return notFound;
  }

  function getColorFromText(text: string) {
    const charCode = text.charCodeAt(0);
    return colors[charCode % colors.length];
  }

  const initials = Lead.name
    ? Lead.name.charAt(0).toUpperCase()
    : Lead.name
      ? Lead.name.charAt(0).toUpperCase()
      : "?";

  const avatarColor = getColorFromText(initials);

  //  Callback when a tab is clicked
  const handleTabChange = (label: string) => {
    setActiveTab(label);
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
                label: "Export As PDF",
                icon: <Sheet size={16} />,
                onClick: () => console.log("Excel"),
              },
            ]}
          />
        </div>
      </div>
      <Link
        className="flex w-fit items-center gap-2 pb-4 text-sm text-gray-700 transition-colors hover:text-gray-900"
        href={"/admin/Leads"}
      >
        <MoveLeft size={14} />
        Back To Leads
      </Link>
      {/* Profile Contact  */}
      <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Header with Avatar + Amount + Date */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className={`flex h-20 w-20 flex-shrink items-center justify-center rounded-full font-bold text-white ${avatarColor}`}
              >
                {initials}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="flex items-center gap-1 text-lg font-bold">
              {Lead.name} <Star className="h-4 w-4 text-secondary" />{" "}
            </h2>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <Building2 size={15} />
              Google Inc
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={15} />
              {Lead.location.country}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {Lead.isPrivate ? (
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
          <CustomSelect
            icon={ThumbsUp}
            value={"Won"}
            onChange={(value) => console.log("Choose:", value)}
            placeholder="Choose"
            options={[
              { label: "Won", value: "Won" },
              { label: "Lost", value: "Lost" },
            ]}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-10">
        <div className="h-fit rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-3">
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Lead Information</h2>
            <ul className="space-y-2">
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Date Created</p>
                <p> {formatDate(Lead.ceatedAt, "MMM dd, yyyy HH:mm")}</p>
              </li>

              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Deal Value</p>
                <p>{Lead.value}</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Due Date</p>
                <p>{formatDate(Lead.ceatedAt, "MMM dd, yyyy HH:mm")}</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Follow Up</p>
                <p>27 Sep 2025</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Source</p>
                <p>Google</p>
              </li>
            </ul>
          </div>
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="mb-2 font-bold">Owner</h2>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <div className={`flex items-center gap-2`}>
                  <Image
                    className="h-7 w-7 rounded-full object-cover"
                    src={contacts[0].avatar}
                    width={150}
                    height={150}
                    alt={contacts[0].name}
                  />
                  <h2 className="text-xs text-gray-700">{contacts[0].name}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Tags</h2>
            <div className="flex gap-2">
              <div className="flex flex-wrap gap-1">
                {Array.isArray(Lead?.tags) && Lead.tags.length > 0 ? (
                  Lead.tags?.map((tag, index) => {
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
            <h2 className="mb-2 font-bold">Priority</h2>

            <CustomSelect
              value={"High"}
              onChange={(value) => console.log("selected", value)}
              placeholder="Choose"
              options={[
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
            />
          </div>
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Projects</h2>
            <div className="flex space-x-2">
              {Lead.projects?.map((project, index) => {
                return (
                  <span
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600"
                  >
                    {project}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="mb-2 font-bold">Conracts</h2>
              <button
                onClick={() => setIsConractsOpen(true)}
                className="flex items-center gap-1 text-sm text-main"
              >
                <PlusCircle size={13} /> Add New
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                {contacts.length > 0 ? (
                  contacts.slice(0, 3).map((contact, index) => {
                    return (
                      <Link
                        href={`/admin/contacts/${contact.id}`}
                        key={index}
                        className={`flex items-center gap-2`}
                      >
                        <Image
                          className="h-8 w-8 rounded-full object-cover"
                          src={contact.avatar}
                          width={150}
                          height={150}
                          alt={contact.name}
                        />
                        <h2 className="text-sm text-gray-700">
                          {contact.name}
                        </h2>
                      </Link>
                    );
                  })
                ) : (
                  <span className="text-xs text-gray-400">No Lead Owners</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Last Modified</p>
                <p>{formatDate(Lead.ceatedAt, "MMM dd, yyyy HH:mm")}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Modified By</p>
                <div className={`flex items-center gap-2`}>
                  <Image
                    className="h-6 w-6 rounded-full object-cover"
                    src={contacts[0].avatar}
                    width={150}
                    height={150}
                    alt={contacts[0].name}
                  />
                  <h2 className="text-xs text-gray-700">{contacts[0].name}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <LeadsPipelineStatus
            stages={[
              { name: "Not Contacted", color: "#3B82F6" },
              { name: "Contacted", color: "#10B985" },
              { name: "Closed", color: "#F97316" },
              { name: "Lost", color: "#EF4444" },
            ]}
            title="Leads Pipeline Status"
          />
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

      <AddConracts
        isOpen={isConractsOpen}
        setIsOpen={setIsConractsOpen}
        variant="modal"
      />
    </div>
  );
}
