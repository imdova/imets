import { DropdownAction } from "@/types/genral";
import {
  Edit,
  Eye,
  Facebook,
  Mail,
  MapPin,
  MessageSquareMore,
  Phone,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OptionsDropdown from "../OptionsDropdown";
import { Contact } from "@/types/data";

interface DynamicCardProps {
  id: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  country?: string;
  avatar?: string;
  owner?: Contact;
  isCompany?: boolean;
}

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

const DynamicCard: React.FC<DynamicCardProps> = ({
  id,
  name,
  role,
  email,
  phone,
  country,
  avatar,
  isCompany,
  owner,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div>
        <div className="flex items-start space-x-4 p-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/admin/${isCompany ? "companies" : "contacts"}/${id}`}
                className="flex gap-2"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full object-cover"
                    width={100}
                    height={100}
                    src={avatar ?? "/images/placeholder.png"}
                    alt={`${name}'s avatar`}
                  />
                </div>
                <div>
                  <h3 className="truncate text-sm font-semibold text-gray-800">
                    {name}
                  </h3>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </Link>
              <OptionsDropdown actions={actions} />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <Link
                  href={`mailto:${email}`}
                  className="text-sm text-gray-600 hover:text-main"
                >
                  {email}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <Link
                  href={`tel:${phone?.replace(/\D/g, "")}`}
                  className="text-sm text-gray-600 hover:text-main"
                >
                  {phone}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-sm text-gray-600">{country}</span>
              </div>
              <div className="flex space-x-2">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  Cotlab
                </span>
                <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800">
                  Rated
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-200 px-2 py-3">
          {/* Social/Contact Links */}
          <div className="flex space-x-2 transition">
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
              href={`mailto:${email}`}
              className="p-2 text-gray-400 hover:text-secondary"
            >
              <Facebook className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div>
            <Image
              className="h-6 w-6 rounded-full object-cover"
              width={100}
              height={100}
              src={owner?.avatar ?? "/images/placeholder.png"}
              alt={`${owner?.name}'s avatar`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;
