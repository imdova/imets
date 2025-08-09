"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isRTL?: boolean; // Add RTL support
}

export default function Pagination({
  currentPage,
  totalPages,
  isRTL = true, // Default to RTL for Arabic
}: PaginationProps) {
  const pathname = usePathname();
  const params = new URLSearchParams(useSearchParams().toString());

  const createPageUrl = (page: number) => {
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  // Determine which pages to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(
        1,
        Math.min(
          currentPage - Math.floor(maxVisible / 2),
          totalPages - maxVisible + 1,
        ),
      );
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={`mt-8 flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
    >
      {/* Next Page Button (on the left in RTL) */}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`hidden rounded-md p-2 md:block ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-main hover:bg-main-transparent"}`}
        aria-disabled={currentPage === totalPages}
      >
        {isRTL ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
      </Link>

      {/* Last Page (when not visible in main range) */}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <Link
            href={createPageUrl(totalPages)}
            className="rounded-md text-main hover:bg-main-transparent"
          >
            {totalPages}
          </Link>
          <span className="px-2">...</span>
        </>
      )}

      <div className="flex gap-2">
        {/* Page Numbers */}
        {pageNumbers.map((pageNum) => (
          <Link
            key={pageNum}
            href={createPageUrl(pageNum)}
            className={`rounded-md px-2 py-1 md:px-3 ${currentPage === pageNum ? "bg-main text-white" : "text-main hover:bg-main-transparent"}`}
          >
            {new Intl.NumberFormat("ar-EG").format(pageNum)}
          </Link>
        ))}
      </div>
      {/* First Page (when not visible in main range) */}
      {totalPages > 5 && currentPage > 3 && (
        <>
          <span className="px-2">...</span>
          <Link
            href={createPageUrl(1)}
            className="rounded-md px-3 py-1 text-main hover:bg-main-transparent"
          >
            {new Intl.NumberFormat("ar-EG").format(1)}
          </Link>
        </>
      )}

      {/* Previous Page Button (on the right in RTL) */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`hidden rounded-md p-2 md:block ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-main hover:bg-main-transparent"}`}
        aria-disabled={currentPage === 1}
      >
        {isRTL ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
      </Link>
    </div>
  );
}
