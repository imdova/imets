import React from "react";
import Link from "next/link";

interface DynamicButtonProps {
  href: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  href,
  label,
  variant = "primary",
  className,
}) => {
  const baseStyles =
    "inline-block px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-center";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    white: "bg-white text-black shadow-sm hover:bg-gray-100",
  };

  return (
    <Link className="w-fit" href={href}>
      <div className={`${className} ${baseStyles} ${variants[variant]}`}>
        {label}
      </div>
    </Link>
  );
};

export default DynamicButton;
