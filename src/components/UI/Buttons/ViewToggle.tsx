"use client";

import { List, LayoutGrid } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ViewToggleProps {
  className?: string;
  showViewToggle?: boolean;
  viewModeParam?: string;
  onViewChange?: (viewMode: "list" | "grid") => void;
}

export default function ViewToggle({
  className = "",
  showViewToggle = true,
  viewModeParam = "view",
  onViewChange,
}: ViewToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current view mode from URL params or default to 'list'
  const viewMode =
    (searchParams.get(viewModeParam) as "list" | "grid") || "list";

  // Toggle view mode and update URL
  const toggleViewMode = useCallback(
    (newViewMode: "list" | "grid") => {
      const params = new URLSearchParams(searchParams.toString());

      if (newViewMode === "list") {
        params.delete(viewModeParam);
      } else {
        params.set(viewModeParam, newViewMode);
      }

      // Update URL without page reload
      router.push(`?${params.toString()}`, { scroll: false });

      // Call the callback function if provided
      if (onViewChange) {
        onViewChange(newViewMode);
      }
    },
    [router, searchParams, viewModeParam, onViewChange],
  );

  if (!showViewToggle) return null;

  return (
    <div
      className={`flex gap-2 rounded-lg bg-gray-100 p-2 px-3 shadow-sm ${className}`}
    >
      <button
        onClick={() => toggleViewMode("list")}
        className={`rounded-md p-1 transition-colors ${
          viewMode === "list"
            ? "bg-secondary text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="List view"
        title="List view"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => toggleViewMode("grid")}
        className={`rounded-md p-1 transition-colors ${
          viewMode === "grid"
            ? "bg-secondary text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="Grid view"
        title="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
    </div>
  );
}
