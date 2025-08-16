import { Lead } from "@/types/data";
import { Mail, MapPin, MessageSquareMore, Phone, Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LeadCardProps {
  lead: Lead;
  color?: string;
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

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  color = "#eeee",
}) => {
  const initials = lead.name
    ? lead.name.charAt(0).toUpperCase()
    : lead.name
      ? lead.name.charAt(0).toUpperCase()
      : "?";

  const avatarColor = getColorFromText(initials);

  return (
    <div
      key={lead.id}
      className="rounded-xl border border-gray-200 bg-white p-3"
    >
      <div className="mb-3 h-1 w-full" style={{ backgroundColor: color }}></div>
      {/* Header with Avatar + Amount + Date */}
      <Link
        href={`/admin/leads/${lead.id}`}
        className="mb-3 flex items-start justify-between"
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`flex h-10 w-10 flex-shrink items-center justify-center rounded-full font-bold text-white ${avatarColor}`}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm">{lead.name}</p>
          </div>
        </div>
      </Link>

      {/* Contact Info */}
      <div className="my-2 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Receipt size={13} />
          {lead.value && <p>{lead.value}</p>}
        </div>
        <div className="flex items-center gap-1">
          <Mail size={13} />
          {lead.email && <p>{lead.email}</p>}
        </div>
        <div className="flex items-center gap-1">
          <Phone size={13} />
          {lead.phone && <p>{lead.phone}</p>}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={13} />
          {lead.location && <p>{lead.location.country}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-2 py-3">
        {/* company */}
        {lead.company && (
          <Link
            href={`/admin/companies/${lead.company.id}`}
            className="flex items-center justify-between"
          >
            <Image
              className="h-6 w-6 rounded-full object-cover"
              src={lead.company.avatar}
              width={100}
              height={100}
              alt={lead.company.name}
            />
          </Link>
        )}
        {/* Social/Contact Links */}
        <div className="flex space-x-3">
          <Link href="#" className="text-gray-400 hover:text-secondary">
            <Mail className="h-3.5 w-3.5" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-secondary">
            <Phone className="h-3.5 w-3.5" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-secondary">
            <MessageSquareMore className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
