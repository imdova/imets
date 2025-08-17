import { Deal } from "@/types/data";
import {
  Calendar,
  Mail,
  MapPin,
  MessageSquareMore,
  Phone,
  Receipt,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DealCardProps {
  deal: Deal;
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

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const initials = deal.name
    ? deal.name.charAt(0).toUpperCase()
    : deal.name
      ? deal.name.charAt(0).toUpperCase()
      : "?";

  const avatarColor = getColorFromText(initials);

  return (
    <div
      key={deal.id}
      className="rounded-xl border border-gray-200 bg-white p-4"
    >
      {/* Header with Avatar + Amount + Date */}
      <Link
        href={`/admin/deals/${deal.id}`}
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
            <p className="text-sm">{deal.name}</p>
          </div>
        </div>
      </Link>

      {/* Contact Info */}
      <div className="my-2 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Receipt size={13} />
          {deal.amount && <p>{deal.amount}</p>}
        </div>
        <div className="flex items-center gap-1">
          <Mail size={13} />
          {deal.email && <p>{deal.email}</p>}
        </div>
        <div className="flex items-center gap-1">
          <Phone size={13} />
          {deal.phone && <p>{deal.phone}</p>}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={13} />
          {deal.location && <p>{deal.location.country}</p>}
        </div>
      </div>

      {/* Name */}
      {deal.name && (
        <div className="mt-3 flex items-center justify-between border-b border-gray-200 py-3">
          <div className="flex items-center gap-2">
            <Image
              className="h-7 w-7 rounded-full object-cover"
              src={deal.contact.avatar}
              width={100}
              height={100}
              alt={deal.contact.name}
            />
            <p className="text-sm font-medium text-gray-800">
              {deal.contact.name}
            </p>
          </div>
          <span
            className={`rounded-lg px-2 py-1 text-xs font-bold text-white ${
              deal.property >= 75
                ? "bg-green-600"
                : deal.property >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          >
            {deal.property}%
          </span>
        </div>
      )}
      <div className="flex items-center justify-between gap-3 p-2">
        {deal.expecteDate && (
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <Calendar size={13} />
            {deal.expecteDate}
          </div>
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
