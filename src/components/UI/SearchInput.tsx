"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Search as SearchIcon, X as ClearIcon } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SearchInputProps {
  placeholder?: string;
  debounceTime?: number;
  className?: string;
  paramName?: string;
  clearButton?: boolean;
  iconSize?: number;
  searchPagePath?: string;
  mobileBreakpoint?: number;
}

export function SearchInput({
  placeholder = "Search...",
  debounceTime = 500,
  className = "",
  paramName = "q",
  clearButton = true,
  iconSize = 16,
  searchPagePath = "/search",
  mobileBreakpoint = 768,
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, debounceTime);
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsMobileSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize search value from URL
  useEffect(() => {
    const search = searchParams.get(paramName);
    setSearchValue(search || "");
  }, [searchParams, paramName]);

  // Update URL when debounced search value changes
  useEffect(() => {
    if (debouncedSearchValue === "") return;

    const params = new URLSearchParams();
    params.set(paramName, debouncedSearchValue);

    if (!pathname.startsWith(searchPagePath)) {
      router.push(`${searchPagePath}?${params.toString()}`);
    } else {
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearchValue, router, paramName, pathname, searchPagePath]);

  const handleClear = useCallback(() => {
    setSearchValue("");
    if (pathname.startsWith(searchPagePath)) {
      router.replace(searchPagePath);
    }
  }, [pathname, router, searchPagePath]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchValue.trim()) {
      const params = new URLSearchParams();
      params.set(paramName, searchValue.trim());
      router.push(`${searchPagePath}?${params.toString()}`);
      if (isMobile) {
        setIsMobileSearchOpen(false);
      }
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) {
      setTimeout(() => {
        const input = document.getElementById("search-input");
        input?.focus();
      }, 100);
    }
  };

  return (
    <div
      className={`flex h-full items-center gap-2 ${isMobile ? "" : "w-full"} ${className}`}
    >
      {/* Always visible search button in mobile */}
      {isMobile && (
        <button
          onClick={toggleMobileSearch}
          className={`relative h-full rounded-md border border-gray-200 px-3 hover:bg-gray-100 ${isMobileSearchOpen ? "text-[#041060]" : "text-gray-600"}`}
          aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
        >
          <SearchIcon size={iconSize} />
        </button>
      )}

      {/* Search input - visible always on desktop, conditionally on mobile */}
      {(isMobileSearchOpen || !isMobile) && (
        <div
          ref={searchRef}
          className={`absolute left-0 top-full z-50 w-full p-3 shadow-sm md:relative md:p-0`}
        >
          <div className="relative">
            {!isMobile && (
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={iconSize}
              />
            )}
            <input
              id="search-input"
              type="text"
              placeholder={placeholder}
              className={`w-full rounded-md border border-gray-300 py-2 ${isMobile ? "pl-3" : "pl-10"} text-sm outline-none pr-${clearButton ? "10" : "3"}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {clearButton && searchValue && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={handleClear}
                aria-label="Clear search"
              >
                <ClearIcon size={iconSize} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
