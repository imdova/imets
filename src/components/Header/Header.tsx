import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User, Settings, LogOut, Minimize, Maximize } from "lucide-react";
import { DynamicDropdown } from "../UI/DynamicDropdown";
import { SearchInput } from "../UI/SearchInput";
import { Suspense, useState } from "react";

// Constants for dropdown configurations
// Constants with as const for better type inference
const USER_MENU_ITEMS = [
  {
    id: "user-info",
    title: "User Information",
    description: "",
  },
  {
    id: "profile",
    title: "Profile",
    icon: "User" as const,
    url: "/profile",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "Settings" as const,
    url: "/settings",
  },
  {
    id: "logout",
    title: "Sign out",
    icon: "LogOut" as const,
    onClick: () => signOut(),
  },
] as const;

const NOTIFICATIONS = [
  {
    id: 1,
    title: "New message",
    description: "You have a new message from John",
    time: "2 hours ago",
    isUnread: true,
    icon: "MessageSquare" as const,
  },
  {
    id: 2,
    title: "System update",
    description: "System maintenance scheduled for tomorrow",
    time: "5 hours ago",
    isUnread: false, // Added this property
    icon: "AlertCircle" as const,
  },
  {
    id: 3,
    title: "Payment received",
    description: "Your subscription payment was processed",
    time: "1 day ago",
    isUnread: false, // Added this property
    icon: "CreditCard" as const,
  },
] as const;

const MESSAGES = [
  {
    id: 1,
    title: "John Doe",
    description: "Hey, about our meeting tomorrow...",
    time: "10:30 AM",
    isUnread: true,
    icon: "User" as const,
  },
  {
    id: 2,
    title: "Jane Smith",
    description: "The project files you requested...",
    time: "Yesterday",
    isUnread: false,
    icon: "User" as const,
  },
  {
    id: 3,
    title: "Team Updates",
    description: "Monthly team newsletter",
    time: "2 days ago",
    isUnread: false,
    icon: "Users" as const,
  },
] as const;

export default function Header() {
  const { data: session } = useSession();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const unreadNotifications = NOTIFICATIONS.filter((n) => n.isUnread).length;
  const unreadMessages = MESSAGES.filter((m) => m.isUnread).length;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <header className="relative flex items-center justify-end border-b border-gray-200 bg-white px-6 py-3 shadow-sm md:justify-between">
      <div className="hidden md:block">
        <Suspense>
          <SearchInput
            placeholder="Search Keywords..."
            debounceTime={500} // Faster response
            className="max-w-xs" // Different sizing
          />
        </Suspense>
      </div>

      <div className="flex space-x-4">
        <div className="block md:hidden">
          <Suspense>
            <SearchInput
              placeholder="Search Keywords..."
              debounceTime={500} // Faster response
              className="max-w-xs" // Different sizing
            />
          </Suspense>
        </div>

        <button
          onClick={toggleFullScreen}
          className="rounded-md border border-gray-200 px-3 text-gray-700 hover:bg-gray-100"
        >
          {isFullScreen ? (
            <>
              <Minimize className="h-4 w-4" />
            </>
          ) : (
            <>
              <Maximize className="h-4 w-4" />
            </>
          )}
        </button>

        {/* Messages Dropdown */}
        <DynamicDropdown
          triggerIcon="MessageSquare"
          items={MESSAGES}
          title="Messages"
          showBadge={true}
          badgeCount={unreadMessages}
          footerLink={{
            text: "View all messages",
            url: "/messages",
          }}
        />

        {/* Notifications Dropdown */}
        <DynamicDropdown
          triggerIcon="Bell"
          items={NOTIFICATIONS}
          title="Notifications"
          showBadge={true}
          badgeCount={unreadNotifications}
          footerLink={{
            text: "View all notifications",
            url: "/notifications",
          }}
        />

        {/* User Dropdown */}
        <DynamicDropdown
          triggerIcon="User"
          items={USER_MENU_ITEMS}
          title="User Menu"
          position="right"
          renderItem={(item) => {
            if (item.id === "user-info") {
              return (
                <div className="border-b border-gray-200 px-4 py-2">
                  <p className="text-sm font-medium text-gray-700">
                    {session?.user?.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>
              );
            }
            return (
              <button
                onClick={item.onClick}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.icon === "User" && <User className="mr-2" size={16} />}
                {item.icon === "Settings" && (
                  <Settings className="mr-2" size={16} />
                )}
                {item.icon === "LogOut" && (
                  <LogOut className="mr-2" size={16} />
                )}
                {item.title}
              </button>
            );
          }}
        >
          <button className="flex items-center space-x-2 focus:outline-none">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User profile"
                width={100}
                height={100}
                className="h-10 w-10 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#041060] object-cover text-white">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
            )}
          </button>
        </DynamicDropdown>
      </div>
    </header>
  );
}
