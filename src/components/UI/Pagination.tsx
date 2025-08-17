"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(
    searchParams ? Array.from(searchParams.entries()) : [],
  );

  const createPageUrl = (page: number) => {
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
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
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Previous Page */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`rounded-md p-2 transition-colors ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "text-main hover:bg-main-transparent"
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft size={17} />
      </Link>

      {/* First Page if hidden */}
      {totalPages > 5 && currentPage > 3 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="rounded-md px-3 py-1 text-main hover:bg-main-transparent"
          >
            1
          </Link>
          <span className="px-2 text-gray-500">...</span>
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((pageNum) => (
        <Link
          key={pageNum}
          href={createPageUrl(pageNum)}
          className={`rounded-md px-3 py-1 transition-colors ${
            currentPage === pageNum
              ? "bg-main text-white"
              : "text-main hover:bg-main-transparent"
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {/* Last Page if hidden */}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <span className="px-2 text-gray-500">...</span>
          <Link
            href={createPageUrl(totalPages)}
            className="rounded-md px-3 py-1 text-main hover:bg-main-transparent"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Page */}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`rounded-md p-2 transition-colors ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "text-main hover:bg-main-transparent"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight size={17} />
      </Link>
    </div>
  );
}
