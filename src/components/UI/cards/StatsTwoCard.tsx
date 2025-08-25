"use client";

import { cn } from "@/util";
import { Calendar, type LucideIcon } from "lucide-react";

interface StatsTwoCardProps {
  value: number | string;
  title: string;
  icon?: LucideIcon;
  iconBgColor?: string; // hex (e.g. "#FF4081")
  textColor?: string; // hex (e.g. "#555555")
  className?: string;
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

export default function StatsTwoCard({
  value,
  title,
  icon: Icon = Calendar,
  iconBgColor = "#FF4081",
  textColor = "#555555",
  className = "",
}: StatsTwoCardProps) {
  const transparentColor = hexToRgba(iconBgColor, 0.15);

  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className,
      )}
    >
      <div
        style={{
          borderRadius: "58% 42% 67% 33% / 30% 61% 39% 70%",
          backgroundColor: iconBgColor,
        }}
        className="absolute -left-24 -top-4 h-[200px] w-[200px]"
      ></div>
      <div
        style={{
          borderRadius: "58% 42% 67% 33% / 30% 61% 39% 70%",
          backgroundColor: transparentColor,
        }}
        className="absolute -left-20 -top-4 h-[200px] w-[200px]"
      ></div>
      {/* Left colored icon section with auto transparent gradient */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white">
        <Icon style={{ color: iconBgColor }} className="h-4 w-4" />
      </div>

      {/* Right text section */}
      <div className="relative flex flex-1 flex-col items-end px-4">
        <span className="text-sm font-medium" style={{ color: textColor }}>
          {title}
        </span>
        <span className="mt-1 text-xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
}
