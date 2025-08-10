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

export type FilterBarProps = {
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  filters?: FilterOption[];
  showSearch?: boolean;
  showViewToggle?: boolean;
  showFilters?: boolean;
  showBtnAdd?: boolean;
  BtnAdd?: {
    label: string;
    url?: string;
    onClick?: () => void;
  };
  placeholder?: string;
};
