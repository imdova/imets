import {
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
  Ellipsis,
  Check,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useMemo, useRef, useEffect } from "react";

type ActionItem<T> = {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
  disabled?: boolean | ((item: T) => boolean);
  divider?: boolean;
  showLabel?: boolean;
};

type ColumnDefinition<T> = {
  key: string | number | keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: string;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
  actions?: {
    primaryActions?: ActionItem<T>[];
    dropdownActions?: ActionItem<T>[];
  };
};

type SortDirection = "asc" | "desc" | null;

type DynamicTableProps<T> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  emptyMessage?: string;
  minWidth?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  rowIdKey?: keyof T;
  defaultSort?: {
    key: keyof T;
    direction: SortDirection;
  };
  showRowNumbers?: boolean;
};

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
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          checked ? "border-secondary bg-secondary" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  );
};

interface OptionsDropdownProps<T> {
  primaryActions?: ActionItem<T>[];
  dropdownActions?: ActionItem<T>[];
  item: T;
  isLastRow: boolean;
}

const OptionsDropdown = <T extends object>({
  primaryActions = [],
  dropdownActions = [],
  item,
  isLastRow,
}: OptionsDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (action: ActionItem<T>) => {
    action.onClick(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      {/* Primary actions (always visible) */}
      {primaryActions.map((action, index) => {
        const isDisabled =
          typeof action.disabled === "function"
            ? action.disabled(item)
            : action.disabled;

        return (
          <button
            key={`primary-${index}`}
            onClick={() => !isDisabled && handleActionClick(action)}
            disabled={isDisabled}
            className={`flex items-center gap-1 rounded-md p-1 text-sm hover:bg-gray-100 ${
              action.className || "text-gray-600 hover:text-gray-900"
            } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
            title={action.label}
          >
            {action.icon} {action.showLabel && action.label}
          </button>
        );
      })}

      {/* Dropdown toggle (only shown if there are dropdown actions) */}
      {dropdownActions.length > 0 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="rounded-md p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            aria-label="More options"
          >
            <Ellipsis size={16} />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              className={`absolute right-0 ${isLastRow ? "bottom-full" : "top-full"} z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg`}
            >
              <div className="py-1">
                {dropdownActions.map((action, index) => {
                  const isDisabled =
                    typeof action.disabled === "function"
                      ? action.disabled(item)
                      : action.disabled;

                  const handleClick = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (!isDisabled) {
                      handleActionClick(action);
                    }
                  };

                  return (
                    <React.Fragment key={`dropdown-${index}`}>
                      <button
                        onClick={handleClick}
                        disabled={isDisabled}
                        className={`flex w-full items-center px-2 py-1 text-left text-xs ${
                          isDisabled
                            ? "cursor-not-allowed text-gray-400"
                            : "text-gray-700 hover:bg-gray-100"
                        } ${action.className || ""}`}
                      >
                        {action.icon && (
                          <span className="mr-2">{action.icon}</span>
                        )}
                        {action.label}
                      </button>
                      {action.divider && (
                        <div className="my-1 border-t border-gray-200" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const DynamicTable = <T extends object>({
  data,
  columns,
  pagination = false,
  itemsPerPage = 10,
  className = "",
  headerClassName = "bg-gray-100 text-gray-700",
  rowClassName = "hover:bg-gray-50",
  cellClassName = "py-3 px-2 text-sm",
  emptyMessage = "No data available",
  minWidth = "950px",
  selectable = false,
  onSelectionChange,
  rowIdKey = "id" as keyof T,
  defaultSort,
  showRowNumbers = false,
}: DynamicTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Set<T[keyof T]>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: SortDirection;
  } | null>(defaultSort || null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // Sort data based on sortConfig
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const column = columns.find((col) => col.key === sortConfig.key);

      // Use custom sort function if provided
      if (column?.sortFn) {
        return sortConfig.direction === "asc"
          ? column.sortFn(a, b)
          : column.sortFn(b, a);
      }

      // Default sorting for primitive values
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, columns]);

  // Handle sorting
  const handleSort = (key: keyof T) => {
    let direction: SortDirection = "asc";

    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig(direction ? { key, direction } : null);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Handle row selection
  const toggleRowSelection = (rowId: T[keyof T]) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    if (onSelectionChange) {
      const selectedItems = sortedData.filter((item) =>
        newSelectedRows.has(item[rowIdKey]),
      );
      onSelectionChange(selectedItems);
    }
  };

  // Calculate pagination

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = sortedData.slice(startIndex, endIndex);

  const updatePageInUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updatePageInUrl(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  // Keep state in sync if URL changes externally
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams]);

  // Handle select all/none
  const toggleSelectAll = () => {
    if (selectedRows.size === displayedData.length) {
      // Deselect all
      setSelectedRows(new Set());
      if (onSelectionChange) onSelectionChange([]);
    } else {
      // Select all on current page
      const newSelectedRows = new Set(selectedRows);
      displayedData.forEach((item) => newSelectedRows.add(item[rowIdKey]));
      setSelectedRows(newSelectedRows);

      if (onSelectionChange) {
        const selectedItems = sortedData.filter((item) =>
          newSelectedRows.has(item[rowIdKey]),
        );
        onSelectionChange(selectedItems);
      }
    }
  };

  // Check if all rows on current page are selected
  const allSelectedOnPage =
    displayedData.length > 0 &&
    displayedData.every((item) => selectedRows.has(item[rowIdKey]));

  // Get sort direction for a column
  const getSortDirection = (key: keyof T): SortDirection => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction;
  };

  // Render sort indicator
  const renderSortIndicator = (key: keyof T) => {
    const direction = getSortDirection(key);
    if (!direction) return null;

    return (
      <span className="ml-1">
        {direction === "asc" ? (
          <ArrowDownNarrowWide className="mr-3" size={12} />
        ) : (
          <ArrowUpWideNarrow className="mr-3" size={12} />
        )}
      </span>
    );
  };

  return (
    <div className={`flex flex-col rounded-md ${className}`}>
      <div className="grid grid-cols-1 overflow-x-auto">
        <table style={{ minWidth: minWidth }}>
          <thead className={`bg-gray-100 ${headerClassName}`}>
            <tr>
              {selectable && (
                <th scope="col" className={`${cellClassName} w-10 text-center`}>
                  <CustomCheckbox
                    id="select-all"
                    checked={allSelectedOnPage}
                    onChange={toggleSelectAll}
                  />
                </th>
              )}
              {showRowNumbers && (
                <th className={`${cellClassName} w-12 text-center`}>#</th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  scope="col"
                  className={`${cellClassName} text-${column.align || "left"} ${
                    column.width ? column.width : ""
                  } select-none font-medium ${
                    column.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                  }`}
                  onClick={() =>
                    column.sortable && handleSort(column.key as keyof T)
                  }
                >
                  <div
                    className={`flex items-center text-sm ${
                      column.align === "center"
                        ? "justify-center"
                        : column.align === "right"
                          ? "justify-end"
                          : "justify-start"
                    }`}
                  >
                    {column.header}
                    {column.sortable &&
                      renderSortIndicator(column.key as keyof T)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedData.length > 0 ? (
              displayedData.map((item, rowIndex) => {
                const isLastRow =
                  rowIndex === displayedData.length - 1 ||
                  rowIndex === displayedData.length - 2;

                return (
                  <tr key={rowIndex} className={rowClassName}>
                    {selectable && (
                      <td className={`${cellClassName} text-center`}>
                        <CustomCheckbox
                          id={`row-${item[rowIdKey]}`}
                          checked={selectedRows.has(item[rowIdKey])}
                          onChange={() => toggleRowSelection(item[rowIdKey])}
                        />
                      </td>
                    )}

                    {showRowNumbers && (
                      <td
                        className={`${cellClassName} text-center text-sm text-gray-500`}
                      >
                        {startIndex + rowIndex + 1}
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={`${rowIndex}-${column.key.toString()}`}
                        className={`${cellClassName} text-${column.align || "left"}`}
                      >
                        {column.actions ? (
                          <OptionsDropdown<T>
                            primaryActions={column.actions.primaryActions}
                            dropdownActions={column.actions.dropdownActions}
                            item={item}
                            isLastRow={isLastRow} // ✅ pass here
                          />
                        ) : column.render ? (
                          column.render(item)
                        ) : (
                          String(item[column.key as keyof T])
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable ? 1 : 0) +
                    (showRowNumbers ? 1 : 0)
                  }
                  className={`${cellClassName} text-center text-sm text-gray-600`}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && sortedData.length > itemsPerPage && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, sortedData.length)}
                </span>{" "}
                of <span className="font-medium">{sortedData.length}</span>{" "}
                results
                {selectable && selectedRows.size > 0 && (
                  <span className="ml-2 font-medium text-main">
                    ({selectedRows.size} selected)
                  </span>
                )}
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                        currentPage === page
                          ? "bg-yellow-50-50 z-10 border-secondary text-secondary"
                          : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
