"use client";

import { FilterBarProps, FilterOption } from "@/types/genral";
import {
  Search,
  List,
  Star,
  X,
  ChevronDown,
  Filter as FilterIcon,
  PlusCircle,
  Check,
  LayoutGrid,
  ArrowUpDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const dummyFilters: FilterOption[] = [
  {
    id: "name",
    name: "Name",
    options: [
      { value: "elizabeth-morgan", label: "Elizabeth Morgan" },
      { value: "katherine-brooks", label: "Katherine Brooks" },
      { value: "sophia-lopez", label: "Sophia Lopez" },
      { value: "john-michael", label: "John Michael" },
    ],
  },
  {
    id: "tags",
    name: "Tags",
    options: [
      { value: "important", label: "Important" },
      { value: "follow-up", label: "Follow Up" },
      { value: "new", label: "New" },
    ],
  },
  {
    id: "owner",
    name: "Owner",
    options: [
      { value: "hendry-milner", label: "Hendry Milner" },
      { value: "guitory-berggren", label: "Guitory Berggren" },
      { value: "jami-cartlie", label: "Jami Cartlie" },
    ],
  },
  {
    id: "location",
    name: "Location",
    options: [
      { value: "new-york", label: "New York" },
      { value: "london", label: "London" },
      { value: "tokyo", label: "Tokyo" },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    options: [
      { value: "5", label: "5 Stars" },
      { value: "4", label: "4 Stars" },
      { value: "3", label: "3 Stars" },
      { value: "2", label: "2 Stars" },
      { value: "1", label: "1 Star" },
    ],
  },
  {
    id: "status",
    name: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
  },
];

export const FilterBar = ({
  viewMode = "list",
  onViewModeChange,
  filters = dummyFilters,
  showSearch = true,
  showViewToggle = true,
  showFilters = true,
  showSort = false,
  placeholder = "Search...",
  showBtnAdd,
  BtnAdd,
  sortOptions = [],
  defaultSort = "",
  onSortChange,
}: FilterBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );
  const [filterSearch, setFilterSearch] = useState<Record<string, string>>({});
  const [isFilterOpen, setIsFilterOpen] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(defaultSort);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(null);
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize active filters and sort from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filters: Record<string, string[]> = {};

    // Get all unique keys from URL
    const uniqueKeys = Array.from(new Set(Array.from(params.keys())));

    uniqueKeys.forEach((key) => {
      if (
        key !== "search" &&
        key !== "view" &&
        key !== "page" &&
        key !== "sort"
      ) {
        filters[key] = params.getAll(key);
      }
    });

    setActiveFilters(filters);
    setSelectedSort(params.get("sort") || defaultSort);
  }, [defaultSort]);

  // Update URL when filters, search or sort change
  const updateUrl = () => {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    if (selectedSort) {
      params.set("sort", selectedSort);
    }

    Object.entries(activeFilters).forEach(([key, values]) => {
      values.forEach((value) => {
        params.append(key, value);
      });
    });

    if (viewMode) {
      params.set("view", viewMode);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl();
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    if (onSortChange) {
      onSortChange(value);
    }
    updateUrl();
    setIsSortOpen(false);
  };

  // Toggle filter value
  const toggleFilter = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      const currentValues = newFilters[filterId] || [];

      if (currentValues.includes(value)) {
        // If the value is already in the array, remove it
        const updatedValues = currentValues.filter((v) => v !== value);
        if (updatedValues.length === 0) {
          // If the array is empty, remove the filter key entirely
          delete newFilters[filterId];
        } else {
          newFilters[filterId] = updatedValues;
        }
      } else {
        // If the value is not in the array, add it
        newFilters[filterId] = [...currentValues, value];
      }

      return newFilters;
    });
  };

  // Apply filters
  const applyFilters = () => {
    updateUrl();
    setIsFilterOpen(null);
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({});
    setSearchQuery("");
    setSelectedSort(defaultSort);
    const params = new URLSearchParams();
    if (viewMode) {
      params.set("view", viewMode);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    const newMode = viewMode === "list" ? "grid" : "list";
    if (onViewModeChange) {
      onViewModeChange(newMode);
    }
    const params = new URLSearchParams(window.location.search);
    params.set("view", newMode);
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Filter options based on search
  const getFilteredOptions = (filterId: string) => {
    const searchTerm = filterSearch[filterId]?.toLowerCase() || "";
    const filter = filters.find((f) => f.id === filterId);
    if (!filter) return [];

    return filter.options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm),
    );
  };

  // Custom Checkbox Component
  const CustomCheckbox = ({
    id,
    checked,
    onChange,
  }: {
    id: string;
    checked: boolean;
    onChange: () => void;
  }) => {
    return (
      <div className="relative flex h-4 w-4 items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="absolute h-full w-full cursor-pointer opacity-0"
        />
        <div
          className={`flex h-4 w-4 items-center justify-center rounded border ${checked ? "border-secondary bg-secondary" : "border-gray-300 bg-white"}`}
        >
          {checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
    );
  };

  return (
    <div className="mb-6 flex flex-col gap-3" ref={filterRef}>
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-fit">
          {showFilters && (
            <div className="relative w-full sm:w-fit">
              <button
                onClick={() =>
                  setIsFilterOpen(isFilterOpen ? null : "main-filter")
                }
                className={`flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm`}
              >
                <div className="flex items-center gap-2">
                  <FilterIcon className="h-3 w-3" />
                  <span className="text-sm">Filter</span>
                </div>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isFilterOpen === "main-filter" && (
                <div className="absolute left-0 z-10 mt-2 w-72 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="p-3">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Filters</h3>
                      <button
                        onClick={() => setIsFilterOpen(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <div key={filter.id}>
                          <button
                            onClick={() => setIsFilterOpen(filter.id)}
                            className="flex w-full items-center justify-between rounded p-2 hover:bg-gray-100"
                          >
                            <span>{filter.name}</span>
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
                      <button
                        onClick={applyFilters}
                        className="hover:bg-main/90 rounded-lg bg-main px-4 py-2 text-sm text-white"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Individual filter dropdowns */}
              {isFilterOpen && isFilterOpen !== "main-filter" && (
                <div className="absolute left-0 z-20 mt-1 w-72 rounded-lg border border-gray-200 bg-white shadow-lg">
                  {filters
                    .filter((filter) => filter.id === isFilterOpen)
                    .map((filter) => (
                      <div key={filter.id} className="p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="font-medium">{filter.name}</h4>
                          <button
                            onClick={() => setIsFilterOpen("main-filter")}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mb-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder={`Search ${filter.name.toLowerCase()}`}
                              value={filterSearch[filter.id] || ""}
                              onChange={(e) =>
                                setFilterSearch((prev) => ({
                                  ...prev,
                                  [filter.id]: e.target.value,
                                }))
                              }
                              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto">
                          {getFilteredOptions(filter.id).map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center py-2"
                            >
                              <CustomCheckbox
                                id={`${filter.id}-${option.value}`}
                                checked={
                                  activeFilters[filter.id]?.includes(
                                    option.value,
                                  ) || false
                                }
                                onChange={() =>
                                  toggleFilter(filter.id, option.value)
                                }
                              />
                              <label
                                htmlFor={`${filter.id}-${option.value}`}
                                className="ml-2 flex flex-1 cursor-pointer items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  {option.avatar && (
                                    <Image
                                      className="h-8 w-8 rounded-full object-cover"
                                      src={
                                        option?.avatar ??
                                        "/images/placholder-avatar.svg"
                                      }
                                      width={100}
                                      height={100}
                                      alt={option.label}
                                    />
                                  )}
                                  <span className="text-sm">
                                    {option.label}
                                  </span>
                                </div>
                                {filter.id === "rating" && (
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < parseInt(option.value) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                )}
                                {option.count !== undefined && (
                                  <span className="text-xs text-gray-500">
                                    {option.count}
                                  </span>
                                )}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                          <button
                            onClick={() => {
                              setActiveFilters((prev) => {
                                const newFilters = { ...prev };
                                delete newFilters[filter.id];
                                return newFilters;
                              });
                            }}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => setIsFilterOpen("main-filter")}
                            className="hover:bg-main/90 rounded-lg bg-main px-4 py-2 text-sm text-white"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
          {/* Sort Dropdown */}
          {showSort && sortOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm sm:w-fit"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3 w-3" />
                  <span className="text-sm">Sort</span>
                  {selectedSort && (
                    <span className="text-xs text-gray-500">
                      {
                        sortOptions.find((opt) => opt.value === selectedSort)
                          ?.label
                      }
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSortOpen && (
                <div className="absolute left-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <ul className="py-1">
                    {sortOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedSort === option.value ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleSortChange(option.value)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative md:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={placeholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="focus:ring-maitext-main shadow- w-full rounded-lg border border-gray-200 py-1.5 pl-10 pr-4 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      updateUrl();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="flex w-full items-center justify-between gap-2 md:w-fit md:justify-start">
          {showViewToggle && (
            <div className="flex gap-2 rounded-lg bg-gray-100 p-2 px-3">
              <button
                onClick={toggleViewMode}
                className={`rounded-md p-1 ${viewMode === "list" && "bg-secondary text-white"}`}
                aria-label={viewMode === "list" ? "Grid view" : "List view"}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={toggleViewMode}
                className={`rounded-md p-1 ${viewMode === "grid" && "bg-secondary text-white"}`}
                aria-label={viewMode === "grid" ? "Grid view" : "List view"}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          )}

          {showBtnAdd &&
            (BtnAdd?.url ? (
              <Link
                className="hover:bg-main/90 flex items-center gap-2 rounded-lg bg-main px-3 py-2 text-sm text-white"
                href={BtnAdd.url}
              >
                <PlusCircle size={15} /> {BtnAdd.label}
              </Link>
            ) : (
              <button
                className="hover:bg-main/90 flex items-center gap-2 rounded-lg bg-main px-3 py-2 text-sm text-white"
                onClick={BtnAdd?.onClick}
              >
                <PlusCircle size={15} /> {BtnAdd?.label}
              </button>
            ))}
        </div>
      </div>

      {/* Active filters display */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {Object.entries(activeFilters).map(([filterId, values]) =>
            values.map((value) => {
              const filter = filters.find((f) => f.id === filterId);
              const option = filter?.options.find((opt) => opt.value === value);
              return (
                <div
                  key={`${filterId}-${value}`}
                  className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  <span className="mr-1 text-xs">
                    {filter?.name}: {option?.label || value}
                  </span>
                  <button
                    onClick={() => toggleFilter(filterId, value)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            }),
          )}
          <button
            onClick={resetFilters}
            className="text-sm text-main hover:text-main"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
