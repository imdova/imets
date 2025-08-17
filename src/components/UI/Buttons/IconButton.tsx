"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState, MouseEvent } from "react";

interface IconButtonProps {
  href?: string;
  Icon: LucideIcon;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  tooltip?: string;
  size?: number;
  ariaLabel?: string; // New prop for size
}

const IconButton: React.FC<IconButtonProps> = ({
  href,
  Icon,
  onClick,
  onMouseDown,
  className,
  tooltip,
  size = 32,
  ariaLabel,
}) => {
  const [hovered, setHovered] = useState(false);

  const ButtonContent = (
    <div
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-gray-200 active:scale-90 ${
        className || ""
      }`}
      style={{ width: size, height: size }}
    >
      <Icon size={size * 0.6} />
      {tooltip && hovered && (
        <div className="absolute top-9 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[8px] text-white shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  );

  return href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent;
};

export default IconButton;
