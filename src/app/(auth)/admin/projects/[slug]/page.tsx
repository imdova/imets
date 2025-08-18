"use client";
import Breadcrumbs from "@/components/UI/Breadcrumbs";
import Dropdown from "@/components/UI/Dropdown";
import LineTabs from "@/components/UI/LineTab";
import { contacts } from "@/constants/contacts";
import {
  Airplay,
  AlarmClock,
  File,
  FileBox,
  FileText,
  LockKeyhole,
  LockKeyholeOpen,
  Mail,
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
import ProjectsPipelineStatus from "@/components/UI/PipelineStatus";
import AddConracts from "@/components/forms/AddConracts";
import { formatDate } from "@/util/dateUtils";
import { projects } from "@/constants/projects";

const labels = {
  "/projects": "Projects",
};

const tabs = [
  { label: "Activities", icon: AlarmClock },
  { label: "Notes", icon: Notebook },
  { label: "Calls", icon: Phone },
  { label: "Files", icon: File },
  { label: "Email", icon: Mail },
];

interface SingleprojectProps {
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

export default function Singleproject({ params }: SingleprojectProps) {
  const { slug } = use(params);
  const [isConractsOpen, setIsConractsOpen] = useState<boolean>(false);

  //  Keep active tab in state
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const project = projects.find((project) => project.id === slug);
  if (!project) {
    return notFound;
  }

  function getColorFromText(text: string) {
    const charCode = text.charCodeAt(0);
    return colors[charCode % colors.length];
  }

  const initials = project.name
    ? project.name.charAt(0).toUpperCase()
    : project.name
      ? project.name.charAt(0).toUpperCase()
      : "?";

  const avatarColor = getColorFromText(initials);

  //  Callback when a tab is clicked
  const handleTabChange = (label: string) => {
    setActiveTab(label);
  };

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
  const statusColors: Record<string, string> = {
    inactive: "bg-red-500",
    active: "bg-green-500",
  };
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
        href={"/admin/projects"}
      >
        <MoveLeft size={14} />
        Back To Projects
      </Link>
      {/* Profile Contact  */}
      <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Header with Avatar + Amount + Date */}
          <div className="mb-3 flex items-start justify-between">
            {project?.avatar ? (
              <Image
                className="h-20 w-20 rounded-full object-cover"
                src={project?.avatar}
                width={150}
                height={150}
                alt={project.name}
              />
            ) : (
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`flex h-20 w-20 flex-shrink items-center justify-center rounded-full font-bold text-white ${avatarColor}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm">{project?.name}</p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h2 className="flex items-center gap-1 text-lg font-bold">
              {project.name} <Star className="h-4 w-4 text-secondary" />{" "}
            </h2>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              Project Id: {project.id}
            </p>
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-2 ${priorityColors[project.priority] ?? "bg-gray-50 text-gray-700"} rounded-md px-2 py-1 text-xs font-semibold capitalize`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-sm ${priorityDotColors[project.priority] ?? "bg-gray-400"}`}
                />
                {project.priority}
              </span>
              <span
                className={`flex items-center gap-2 text-white ${
                  statusColors[project.status] ?? "bg-gray-50 text-gray-700"
                } rounded-md px-2 py-1 text-xs capitalize`}
              >
                {project.status}
              </span>{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {project.isPrivate ? (
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
            value={"Complete"}
            onChange={(value) => console.log("Choose:", value)}
            placeholder="Choose"
            options={[
              { label: "Complete", value: "Complete" },
              { label: "Design", value: "Design" },
              { label: "Development", value: "Development" },
              { label: "Plan", value: "Plan" },
            ]}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-10">
        <div className="h-fit rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-3">
          <div className="border-b border-gray-200 p-4">
            <h2 className="mb-2 font-bold">Project Information</h2>
            <ul className="space-y-2">
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Start Date</p>
                <p> {formatDate(project.startDate, "MMM dd, yyyy HH:mm")}</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Due Date</p>
                <p> {formatDate(project.endDate, "MMM dd, yyyy HH:mm")}</p>
              </li>

              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Deal Value</p>
                <p>{project.value}</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Project Type</p>
                <p>{project.category}</p>
              </li>
              <li className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Project Timing</p>
                <p>Hourly</p>
              </li>
            </ul>
          </div>
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="mb-2 font-bold">Client</h2>
              <button className="flex items-center gap-1 text-sm text-main">
                <PlusCircle size={13} /> Add New
              </button>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <div className={`flex items-center gap-2`}>
                  <Image
                    className="h-7 w-7 rounded-full object-cover"
                    src={project.client.avatar}
                    width={150}
                    height={150}
                    alt={project.client.name}
                  />
                  <h2 className="text-xs text-gray-700">
                    {project.client.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="mb-2 font-bold">Responsible Persons</h2>
              <button className="flex items-center gap-1 text-sm text-main">
                <PlusCircle size={13} /> Add New
              </button>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center -space-x-1.5 shadow-sm">
                {project.users.slice(0, 3).map((user) => (
                  <Link
                    key={user.id}
                    className="hover:relative"
                    href={`/admin/contacts/${user.id}`}
                  >
                    <Image
                      className="h-5 w-5 rounded-full object-cover ring-2 ring-white"
                      src={user.avatar}
                      width={150}
                      height={150}
                      alt={user.name}
                    />
                  </Link>
                ))}

                {project.users.length > 3 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[11px] font-medium shadow-sm">
                    +{project.users.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="mb-2 flex-wrap font-bold">Team Leader</h2>
              <button className="flex items-center gap-1 text-sm text-main">
                Change
              </button>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <div className={`flex items-center gap-2`}>
                  <Image
                    className="h-7 w-7 rounded-full object-cover"
                    src={project.teamLeader.avatar}
                    width={150}
                    height={150}
                    alt={project.teamLeader.name}
                  />
                  <h2 className="text-xs text-gray-700">
                    {project.teamLeader.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="mb-2 font-bold">Pipeline</h2>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
                <Airplay size={14} /> Marketing Pipeline
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-500">Last Modified</p>
                <p>{formatDate(project.startDate, "MMM dd, yyyy HH:mm")}</p>
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
          <ProjectsPipelineStatus
            stages={[
              { name: "Plan", color: "#3B82F6" },
              { name: "Design", color: "#10B985" },
              { name: "Development", color: "#EF4444" },
              { name: "Completed", color: "#F97316" },
            ]}
            title="Projects Pipeline Status"
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
