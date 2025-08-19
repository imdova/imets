import { Project } from "@/types/data";
import {
  Calendar,
  CircleSlash,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Layers,
  MessageCircle,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OptionsDropdown from "../OptionsDropdown";

interface ProjectCardProps {
  project: Project;
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

function getColorFromText(text: string) {
  const charCode = text.charCodeAt(0);
  return colors[charCode % colors.length];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const initials = project?.name
    ? project?.name.charAt(0).toUpperCase()
    : project?.name
      ? project?.name.charAt(0).toUpperCase()
      : "?";

  const avatarColor = getColorFromText(initials);
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
    <div
      key={project?.id}
      className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
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
        <div>
          <Star size={17} className="text-secondary" />
        </div>
      </div>
      {/* Header with Avatar + Amount + Date */}
      <div className="flex w-full items-center justify-between gap-3 rounded-md bg-gray-50 p-2">
        <Link href={`/admin/projects/${project?.id}`} className="mb-3">
          <div className="flex items-center gap-3">
            {project?.avatar ? (
              <Image
                className="h-10 w-10 rounded-full object-cover"
                src={project?.avatar}
                width={150}
                height={150}
                alt={project.name}
              />
            ) : (
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`flex h-10 w-10 flex-shrink items-center justify-center rounded-full font-bold text-white ${avatarColor}`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm">{project?.name}</p>
                </div>
              </div>
            )}
            <div>
              <h2 className="text-xs font-semibold">{project?.name}</h2>
              <p className="text-xs text-gray-600">{project.category}</p>
            </div>
          </div>
        </Link>
        <OptionsDropdown
          actions={[
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
          ]}
        />
      </div>

      {/* Contact Info */}
      <div className="my-2 space-y-3 text-sm text-gray-600">
        <p className="py-1 text-sm font-medium">{project.description}</p>

        <div className="flex items-center gap-1 text-xs font-medium">
          <CircleSlash size={13} />
          <p>Project ID :</p>
          <p>{project.id}</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium">
          <DollarSign size={13} />
          <p>Value :</p>
          <p>300 $</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium">
          <Calendar size={13} />
          <p>Due Date :</p>
          <p>{project.endDate}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 py-2">
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
        <Link
          className="hover:relative"
          href={`/admin/companies/${project.client.id}`}
        >
          <Image
            className="h-6 w-6 rounded-full border border-gray-200 object-cover shadow-sm"
            src={project.client.avatar}
            width={150}
            height={150}
            alt={project.client.name}
          />
        </Link>
      </div>

      <div className="flex items-center justify-between gap-3 p-2">
        <span className="flex items-center gap-3 rounded-md bg-main-transparent px-2 py-1 text-xs text-main shadow-sm">
          <Clock size={13} />
          Total Hours : {project.hours}
        </span>
        {/* Social/Contact Links */}
        <div className="flex space-x-3">
          <Link
            href="#"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-secondary"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            02
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-secondary"
          >
            <Layers className="h-3.5 w-3.5" />
            04
          </Link>
        </div>
      </div>
    </div>
  );
};
