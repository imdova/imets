import { SidebarGroup } from "@/types";
import {
  Bell,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageSquareWarning,
  SendToBack,
  Shell,
  ShieldUser,
  Sparkles,
  Undo2,
  UserRoundPen,
  UserSearch,
  WalletCards,
} from "lucide-react";

export const sidebarGroups: { [key: string]: SidebarGroup[] } = {
  default: [
    {
      items: [
        { title: "Orders", href: "/user/orders", icon: SendToBack },
        { title: "Returns", href: "/user/returns", icon: Undo2 },
        { title: "Wishlist", href: "/wishlist", icon: Heart },
      ],
    },
    {
      title: "My Account",
      items: [
        { title: "Profile", href: "/user/profile", icon: UserRoundPen },
        { title: "Addresses", href: "/user/addresses", icon: MapPin },
        { title: "Payment Methods", href: "/user/payments", icon: WalletCards },
      ],
    },
    {
      title: "Other",
      items: [
        { title: "Notifications", href: "/user/notifications", icon: Bell },
        {
          title: "Security Settings",
          href: "/user/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
  admin: [
    {
      title: "Dashboard",
      items: [
        { title: "Home", href: "/admin", icon: LayoutDashboard },
        {
          title: "Contacts",
          href: "/admin/contacts",
          icon: UserSearch,
        },
        {
          title: "Deals",
          href: "/admin/deals",
          icon: Sparkles,
        },
        {
          title: "Leads",
          href: "/admin/leads",
          icon: Shell,
        },
        {
          title: "Pipline",
          href: "/admin/pipline",
          icon: MessageSquareWarning,
        },
      ],
    },
    {
      title: "Other",
      items: [
        { title: "Notifications", href: "/admin/notifications", icon: Bell },
        {
          title: "Security Settings",
          href: "/admin/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
};
