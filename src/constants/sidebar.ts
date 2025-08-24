import { SidebarGroup } from "@/types";
import {
  Activity,
  Building2,
  Calendar1,
  ExternalLink,
  FileSpreadsheet,
  Flag,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  MessageSquareWarning,
  Shell,
  Sparkles,
  SquarePen,
  Target,
  UserCog,
  Users,
  UserSearch,
  XCircle,
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
          pattern: "/admin/management-users/*",
          icon: Users,
        },
        {
          title: "Roles & Permissions",
          href: "/admin/roles-permissions",
          pattern: "/admin/roles-permissions/*",
          icon: UserCog,
        },
        {
          title: "Delete Request",
          href: "/admin/delete-request",
          pattern: "/admin/delete-request/*",
          icon: Flag,
        },
      ],
    },
    {
      title: "HRM",
      items: [
        {
          title: "Employees",
          href: "/admin/employees",
          pattern: "/admin/employees/*",
          subItems: [
            {
              title: "Employees List",
              href: "/admin/employees?view=list",
              pattern: "/admin/employees?view=list",
            },
            {
              title: "Employees Grid",
              href: "/admin/employees?view=grid",
              pattern: "/admin/employees?view=grid",
            },
            {
              title: "Employees Details",
              href: "/admin/employees/emp-001",
              pattern: "/admin/employees/emp-001",
            },
            {
              title: "Departments",
              href: "/admin/departments",
              pattern: "/admin/departments/*",
            },
            {
              title: "Designations",
              href: "/admin/designations",
              pattern: "/admin/designations/*",
            },
            {
              title: "Policies",
              href: "/admin/policies",
              pattern: "/admin/policies/*",
            },
          ],
          icon: Users,
        },
        {
          title: "Tickets",
          href: "/admin/tickets",
          pattern: "/admin/tickets/*",
          icon: Users,
        },
        {
          title: "Holidays",
          href: "/admin/holidays",
          pattern: "/admin/holidays/*",
          icon: Calendar1,
        },
        {
          title: "Performance",
          href: "/admin/performance",
          pattern: "/admin/performance/*",
          subItems: [
            {
              title: "Performance Indicator",
              href: "/admin/performance-indicator",
              pattern: "/admin/performance-indicator/*",
            },
            {
              title: "Performance Review",
              href: "/admin/performance-review",
              pattern: "/admin/performance-review/*",
            },
            {
              title: "Performance Appraisal",
              href: "/admin/performance-appraisal/1",
              pattern: "/admin/performance-appraisal/*",
            },
            {
              title: "Goal List",
              href: "/admin/goal-list",
              pattern: "/admin/goal-list/*",
            },
            {
              title: "Goal Type",
              href: "/admin/goal-type",
              pattern: "/admin/goal-type/*",
            },
          ],
          icon: GraduationCap,
        },
        {
          title: "Training",
          href: "/admin/training",
          pattern: "/admin/training/*",
          subItems: [
            {
              title: "Training List",
              href: "/admin/training-list",
              pattern: "/admin/training-list/*",
            },
            {
              title: "Trainers",
              href: "/admin/trainers",
              pattern: "/admin/trainers/*",
            },
            {
              title: "Training Type",
              href: "/admin/training-type",
              pattern: "/admin/training-type/*",
            },
          ],
          icon: SquarePen,
        },
        {
          title: "Promotion",
          href: "/admin/promotion",
          pattern: "/admin/promotion/*",
          icon: Megaphone,
        },
        {
          title: "Resignation",
          href: "/admin/resignation",
          pattern: "/admin/resignation/*",
          icon: ExternalLink,
        },
        {
          title: "Termination",
          href: "/admin/termination",
          pattern: "/admin/termination/*",
          icon: XCircle,
        },
      ],
    },
  ],
};
