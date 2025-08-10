import { LucideIcon } from "lucide-react";

// Define the type for a main item (which may have sub-items)
export interface SidebarItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  subItems?: SidebarItem[]; // Optional
}

export interface SidebarGroup {
  title?: string;
  description?: string; // Optional
  items: SidebarItem[];
}
