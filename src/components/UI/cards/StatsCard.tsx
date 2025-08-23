import { TrendingUp, TrendingDown, Users, type LucideIcon } from "lucide-react";

interface EmployeeStatsCardProps {
  totalEmployees: number;
  growthPercentage: number;
  period?: string;
  className?: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  title?: string;
}

export default function StatsCard({
  totalEmployees,
  growthPercentage,
  className = "",
  icon = Users, // Default to Users icon
  iconBgColor,
  title = "Total Employee",
}: EmployeeStatsCardProps) {
  const formattedTotal = totalEmployees.toLocaleString();
  const isPositiveGrowth = growthPercentage >= 0;
  const growthColorClass = isPositiveGrowth
    ? "text-green-600 bg-green-50 "
    : "text-red-600 bg-red-50 ";
  const GrowthIcon = isPositiveGrowth ? TrendingUp : TrendingDown;
  const Icon = icon;
  return (
    <div
      className={`flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-4">
        <div
          style={{ backgroundColor: iconBgColor }}
          className={`block rounded-full p-3 text-white`}
        >
          {Icon ? <Icon className={`h-5 w-5`} /> : Icon}
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-700">{title}</h3>
          <h2 className="text-sm font-bold text-gray-900">{formattedTotal}</h2>
        </div>
      </div>

      <div
        className={`flex items-center ${growthColorClass} rounded-md px-2 py-1`}
      >
        <GrowthIcon className="mr-1 h-3 w-3" />
        <span className="text-xs font-medium">
          {isPositiveGrowth ? "+" : ""}
          {growthPercentage.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
