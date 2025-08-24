"use Client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OptionsDropdown from "../OptionsDropdown";
import { Edit, Eye, Trash2 } from "lucide-react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  joiningDate: string;
  status: "active" | "inactive";
  avatar: string;
  department: string;
  location: {
    country: string;
    countryCode: string;
  };
  rating: number;
}

interface EmployeeCardProps {
  employee: Employee;
  projects: number;
  done: number;
  progress: number;
  productivity: number;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  projects,
  done,
  progress,
  productivity,
}) => {
  const [cardColor, setCardColor] = useState<string>("bg-gray-500");

  useEffect(() => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setCardColor(colors[randomIndex]);
  }, []);

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="absolute right-2 top-2">
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
      {/* Colored Header Section */}
      <div className={`flex flex-col items-center gap-1 p-3`}>
        <div
          className={`relative h-14 w-14 rounded-full p-1 outline outline-1 outline-secondary`}
        >
          <Image
            width={150}
            height={150}
            src={employee.avatar}
            alt={employee.name}
            className="mr-4 h-12 w-12 rounded-full border-2 border-white object-cover"
          />
          <span className="absolute bottom-0 right-2 h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        <h2 className="text-lg font-semibold transition-colors hover:text-secondary">
          {employee.name}
        </h2>
        <p
          className={`rounded-md px-2 py-0.5 text-[10px] text-white ${cardColor}`}
        >
          {employee.designation}
        </p>
      </div>

      {/* Stats Section */}
      <div className="p-6">
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{projects}</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{done}</p>
            <p className="text-xs text-gray-500">Done</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{progress}</p>
            <p className="text-xs text-gray-500">Progress</p>
          </div>
        </div>

        {/* Productivity Progress Bar */}
        <div className="mb-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Productivity
            </span>
            <span className="text-sm font-medium text-gray-700">
              {productivity}%
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-gray-200">
            <div
              className={`h-1 rounded-full ${cardColor} `}
              style={{ width: `${productivity}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
