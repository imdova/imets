import { SidebarGroup } from "@/types";
import {
  Activity,
  Building2,
  FileSpreadsheet,
  Flag,
  LayoutDashboard,
  ListChecks,
  MessageSquareWarning,
  Shell,
  Sparkles,
  Target,
  UserCog,
  Users,
  UserSearch,
} from "lucide-react";

export const sidebarGroups: { [key: string]: SidebarGroup[] } = {
  // default: [
  //   {
  //     items: [
  //       { title: "Orders", href: "/user/orders", icon: SendToBack },
  //       { title: "Returns", href: "/user/returns", icon: Undo2 },
  //       { title: "Wishlist", href: "/wishlist", icon: Heart },
  //     ],
  //   },
  //   {
  //     title: "My Account",
  //     items: [
  //       { title: "Profile", href: "/user/profile", icon: UserRoundPen },
  //       { title: "Addresses", href: "/user/addresses", icon: MapPin },
  //       { title: "Payment Methods", href: "/user/payments", icon: WalletCards },
  //     ],
  //   },
  //   {
  //     title: "Other",
  //     items: [
  //       { title: "Notifications", href: "/user/notifications", icon: Bell },
  //       {
  //         title: "Security Settings",
  //         href: "/user/security",
  //         icon: ShieldUser,
  //       },
  //     ],
  //   },
  // ],
  admin: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Home",
          href: "/admin",
          pattern: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "CRM",
      items: [
        {
          title: "Contacts",
          href: "/admin/contacts",
          pattern: "/admin/contacts/*",
          icon: UserSearch,
        },
        {
          title: "Companies",
          href: "/admin/companies",
          pattern: "/admin/companies/*",
          icon: Building2,
        },
        {
          title: "Deals",
          href: "/admin/deals",
          pattern: "/admin/deals/*",
          icon: Sparkles,
        },
        {
          title: "Leads",
          href: "/admin/leads",
          pattern: "/admin/leads/*",
          icon: Shell,
        },
        {
          title: "Pipeline",
          href: "/admin/pipelines",
          pattern: "/admin/pipelines/*",
          icon: MessageSquareWarning,
        },
        {
          title: "Projects",
          href: "/admin/projects",
          pattern: "/admin/projects/*",
          icon: Target,
        },
        {
          title: "Tasks",
          href: "/admin/tasks",
          pattern: "/admin/tasks/*",
          icon: ListChecks,
        },
        {
          title: "Invoices",
          href: "/admin/invoices",
          pattern: "/admin/invoices/*",
          icon: FileSpreadsheet,
        },
        {
          title: "Activities",
          href: "/admin/activities",
          pattern: "/admin/activities/*",
          icon: Activity,
        },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          title: "Management Users",
          href: "/admin/management-users",
          pattern: "/admin/management-users",
          icon: Users,
        },
        {
          title: "Roles & Permissions",
          href: "/admin/roles-permissions",
          pattern: "/admin/roles-permissions",
          icon: UserCog,
        },
        {
          title: "Delete Request",
          href: "/admin/delete-request",
          pattern: "/admin/delete-request",
          icon: Flag,
        },
      ],
    },
  ],
};
