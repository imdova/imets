"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface CollapseProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ title, children, url }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-full cursor-pointer items-center justify-between p-3 focus:outline-none">
        <Link
          className="text-sm font-semibold text-gray-800"
          href={url ?? "gg"}
        >
          {title}
        </Link>
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition focus:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            size={15}
            className={`text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-3 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
