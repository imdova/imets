"use client";

import { cn } from "@/util";
import { Calendar, type LucideIcon } from "lucide-react";

interface StatsThreeCardProps {
  value: number | string;
  title: string;
  icon?: LucideIcon;
  iconBgColor?: string; // hex (e.g. "#FF4081")
  textColor?: string; // hex (e.g. "#555555")
  className?: string;
  RemainingLeaves?: number;
}

function hexToRgba(hex: string, alpha: number): string {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let chars: string[] = hex.substring(1).split("");

    if (chars.length === 3) {
      // expand shorthand hex (#abc -> #aabbcc)
      chars = [chars[0], chars[0], chars[1], chars[1], chars[2], chars[2]];
    }

    const num = parseInt(chars.join(""), 16);

    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return `rgba(${r},${g},${b},${alpha})`;
  }

  // fallback: return original hex if invalid
  return hex;
}

export default function StatsThreeCard({
  value,
  title,
  icon: Icon = Calendar,
  iconBgColor = "#FF4081",
  textColor = "#555555",
  className = "",
  RemainingLeaves,
}: StatsThreeCardProps) {
  const transparentColor = hexToRgba(iconBgColor, 0.15);

  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div
        style={{ backgroundColor: iconBgColor }}
        className="absolute -right-7 -top-7 h-[100px] w-[100px] rounded-full"
      ></div>
      <div
        style={{
          backgroundColor: transparentColor,
        }}
        className="absolute -right-3 -top-5 h-[100px] w-[100px] rounded-full"
      ></div>

      {/* Left text section */}
      <div className="relative flex flex-1 flex-col px-2">
        <span className="text-sm font-medium" style={{ color: textColor }}>
          {title}
        </span>
        <span className="mt-1 text-xl font-bold text-gray-900">{value}</span>
        <span
          style={{ backgroundColor: transparentColor, color: iconBgColor }}
          className="mt-1 w-fit rounded-md px-2 py-1 text-[10px] font-medium"
        >
          Remaining Leaves: {RemainingLeaves}
        </span>
      </div>
      {/* Right colored icon section with auto transparent gradient */}
      <div className="relative flex items-start justify-center pb-8">
        <Icon className="h-7 w-7 text-white" />
      </div>
    </div>
  );
}
