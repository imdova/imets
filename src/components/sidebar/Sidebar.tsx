"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Power,
  ChevronDown,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { sidebarGroups } from "@/constants/sidebar";
import { User } from "next-auth";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "../UI/Avatar";
import { isCurrentPage } from "@/util";

interface AccountPageProps {
  user: User;
}

const Sidebar: React.FC<AccountPageProps> = ({ user }) => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const groups = sidebarGroups[user.role] || sidebarGroups["default"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleItem = (itemHref: string) => {
    if (isMobile && !expanded) {
      setActiveDropdown(activeDropdown === itemHref ? null : itemHref);
    } else {
      setOpenItems((prev) => ({
        ...prev,
        [itemHref]: !prev[itemHref],
      }));
    }
  };

  // Initialize open items based on current path
  useEffect(() => {
    const newOpenItems: Record<string, boolean> = {};

    groups?.forEach((group) => {
      group.items.forEach((item) => {
        if (item.subItems) {
          const shouldOpen = item.subItems.some((subItem) =>
            isCurrentPage(pathname, subItem.href),
          );
          if (shouldOpen) {
            newOpenItems[item.href] = true;
          }
        }
      });
    });

    setOpenItems((prev) => ({ ...prev, ...newOpenItems }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 },
  };

  const subItemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Mobile dropdown overlay */}
      <AnimatePresence>
        {isMobile && expanded && (
          <motion.div
            className="fixed inset-0 z-40 h-full w-full bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`no-scrollbar bottom-0 left-0 top-0 ${expanded ? "z-[1000]" : "z-20"} h-fit min-h-screen border-r border-gray-200 bg-white shadow-md md:sticky md:top-6 md:overflow-y-auto md:shadow-none ${expanded ? "fixed overflow-y-auto" : "sticky"}`}
      >
        <motion.div
          className={`h-full p-1 ${expanded ? "w-64" : "w-14 md:w-64"}`}
        >
          <div
            className={`flex p-1 ${!expanded ? "justify-center md:justify-between" : "justify-between"} `}
          >
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Avatar
                src={user.image}
                name={user.name}
                size={expanded ? "md" : "sm"}
              />
              {expanded && (
                <div>
                  <h1 className="text-lg font-bold text-gray-800">
                    {user.name || "Hala!"}
                  </h1>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              )}
            </div>
            {isMobile && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={`p-1 ${!expanded && "absolute left-12 top-2 rounded-full bg-secondary p-2 text-white"} md:hidden`}
              >
                {expanded ? (
                  <ArrowLeftToLine size={12} />
                ) : (
                  <ArrowRightToLine size={12} />
                )}
              </button>
            )}
          </div>

          <motion.nav
            className="mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {groups?.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                className="mb-4"
                variants={itemVariants}
              >
                {expanded && group.title && (
                  <motion.h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {group.title}
                  </motion.h3>
                )}
                <motion.div className="rounded-lg p-1">
                  {expanded && group.description && (
                    <p className="mb-3 px-2 text-xs text-gray-500">
                      {group.description}
                    </p>
                  )}
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const hasSubItems = item?.subItems?.length ?? 0 > 0;
                      const isOpen = openItems[item.href];
                      const isCurrent = isCurrentPage(pathname, item?.pattern);
                      const isAnySubItemCurrent =
                        hasSubItems &&
                        item.subItems?.some((subItem) =>
                          isCurrentPage(pathname, subItem.pattern),
                        );
                      const isActiveDropdown = activeDropdown === item.href;

                      return (
                        <motion.li
                          key={item.href}
                          variants={itemVariants}
                          onHoverStart={() => setHoveredItem(item.href)}
                          onHoverEnd={() => setHoveredItem(null)}
                        >
                          {hasSubItems ? (
                            <>
                              <motion.button
                                onClick={() => toggleItem(item.href)}
                                className={`relative flex w-full items-center justify-between gap-2 rounded-md ${!expanded ? "!justify-center py-2" : "px-3 py-2"} text-sm ${
                                  isOpen || isAnySubItemCurrent
                                    ? `${expanded ? "bg-main-transparent text-main" : "bg-main text-white"} font-medium`
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: expanded ? 1.02 : 1 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`rounded-md p-1 ${(isOpen || (isAnySubItemCurrent && expanded)) && "bg-main text-white"} `}
                                  >
                                    {Icon && (
                                      <Icon size={14} className="w-full" />
                                    )}
                                  </div>

                                  {expanded && item.title}
                                  {!expanded && hoveredItem === item.href && (
                                    <motion.span
                                      className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                    >
                                      {item.title}
                                    </motion.span>
                                  )}
                                </div>
                                {expanded && (
                                  <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronDown size={15} />
                                  </motion.div>
                                )}
                              </motion.button>

                              {/* Desktop subitems */}
                              {expanded && (
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.ul
                                      className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3"
                                      initial="hidden"
                                      animate="show"
                                      exit="hidden"
                                      variants={containerVariants}
                                    >
                                      {item.subItems?.map(
                                        (subItem, subIndex) => (
                                          <motion.li
                                            className="cursor-pointer"
                                            key={subIndex}
                                            variants={subItemVariants}
                                          >
                                            <Link
                                              href={subItem.href}
                                              legacyBehavior
                                            >
                                              <motion.a
                                                className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${
                                                  isCurrentPage(
                                                    pathname,
                                                    subItem.pattern,
                                                  )
                                                    ? "font-medium text-main"
                                                    : "text-gray-600 hover:text-gray-800"
                                                }`}
                                                whileHover={{ x: 3 }}
                                                whileTap={{ scale: 0.98 }}
                                              >
                                                {Icon && <Icon size={15} />}
                                                {subItem.title}
                                              </motion.a>
                                            </Link>
                                          </motion.li>
                                        ),
                                      )}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              )}
                              {/* 1## */}
                              {/* Mobile dropdown subitems */}
                              <AnimatePresence>
                                {isMobile && !expanded && isActiveDropdown && (
                                  <motion.div
                                    className="fixed left-16 z-50 ml-2 min-w-[200px] overflow-hidden rounded-md bg-white shadow-lg"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                  >
                                    <ul className="py-1">
                                      {item.subItems?.map(
                                        (subItem, subIndex) => (
                                          <motion.li key={subIndex}>
                                            <Link
                                              href={subItem.href}
                                              legacyBehavior
                                            >
                                              <motion.a
                                                className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm ${
                                                  isCurrentPage(
                                                    pathname,
                                                    subItem.pattern,
                                                  )
                                                    ? `bg-main-transparent font-medium text-main`
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                                whileHover={{ x: 3 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() =>
                                                  setActiveDropdown(null)
                                                }
                                              >
                                                <div
                                                  className={`rounded-md p-1 ${isCurrent && "bg-main text-white"} `}
                                                >
                                                  {Icon && <Icon size={14} />}
                                                </div>

                                                {subItem.title}
                                              </motion.a>
                                            </Link>
                                          </motion.li>
                                        ),
                                      )}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link href={item.href} legacyBehavior>
                              <motion.a
                                className={`flex cursor-pointer items-center gap-2 rounded-md ${!expanded ? "justify-center py-2" : "px-3 py-2"} text-sm ${
                                  isCurrent
                                    ? `${expanded ? "bg-main-transparent text-main" : "bg-main text-white"} font-medium`
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                                whileHover={{ x: expanded ? 3 : 0 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div
                                  className={`rounded-md p-1 ${expanded && isCurrent && "bg-main text-white"} `}
                                >
                                  {Icon && <Icon size={14} />}
                                </div>

                                {expanded && item.title}
                                {!expanded && hoveredItem === item.href && (
                                  <motion.span
                                    className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                  >
                                    {item.title}
                                  </motion.span>
                                )}
                              </motion.a>
                            </Link>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              </motion.div>
            ))}

            <motion.div className="rounded-lg p-1.5">
              <motion.button
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-red-50"
                whileHover={{
                  x: expanded ? 3 : 0,
                  backgroundColor: "rgba(254, 226, 226)",
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredItem("signout")}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Power size={15} />
                {expanded && "sign out"}
                {!expanded && hoveredItem === "signout" && (
                  <motion.span
                    className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    Sign out
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </motion.nav>
        </motion.div>
      </aside>
    </>
  );
};

export default Sidebar;
