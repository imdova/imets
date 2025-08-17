import React from "react";
import Link from "next/link";

interface DynamicButtonProps {
  href?: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  href,
  label,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "inline-block px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-center";
  const variants = {
    primary: "bg-main text-white hover:bg-main/90",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    white: "bg-white text-black shadow-sm hover:bg-gray-100",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:none";
  const styles = `${baseStyles} ${variants[variant]} ${className || ""} ${
    disabled ? disabledStyles : ""
  }`;

  if (href && !disabled) {
    return (
      <Link href={href} className="w-fit">
        <span className={styles}>{label}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={styles}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default DynamicButton;
