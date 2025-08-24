import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type DropdownAction = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
};

// filters type
export type FilterOption = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    count?: number;
    avatar?: string;
  }[];
};

export type IconFilter = {
  id: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
  show: boolean;
};

export interface SortOption {
  value: string;
  label: string;
}

export type FilterBarProps = {
  title?: string;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  filters?: FilterOption[];
  showSearch?: boolean;
  showViewToggle?: boolean;
  showFilters?: boolean;
  showBtnAdd?: boolean;
  showSort?: boolean;
  BtnAdd?: {
    label: string;
    url?: string;
    onClick?: () => void;
  };
  placeholder?: string;
  sortOptions?: SortOption[];
  defaultSort?: string;
  onSortChange?: (sortValue: string) => void;
  showDateRange?: boolean;
  showIconFilters?: boolean;
  iconFilters?: IconFilter[];
};
