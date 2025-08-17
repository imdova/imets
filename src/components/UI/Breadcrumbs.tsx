"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LabelsMap = Record<string, string>;

export interface BreadcrumbsProps {
  /** map full path or single segments to friendly labels */
  labels?: LabelsMap;
  /** show Home as first crumb (default true) */
  showHome?: boolean;
  /** Home label (default "Home") */
  homeLabel?: string;
  /** separator element (default chevron) */
  separator?: React.ReactNode;
  /** whether to hide last crumb (current page) as link (default false) */
  hideCurrentAsLink?: boolean;
  className?: string;
}

function prettySegment(segment: string) {
  // common prettifier: replace dashes/underscores, decode URI, capitalize
  try {
    segment = decodeURIComponent(segment);
  } catch (e) {
    // ignore
    console.log(e);
  }
  return segment.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs({
  labels = {},
  showHome = true,
  homeLabel = "Home",
  separator,
  className = "",
}: BreadcrumbsProps) {
  const pathname = usePathname() || "/";

  const crumbs = useMemo(() => {
    if (!pathname || pathname === "/") {
      return showHome ? [{ href: "/", label: homeLabel }] : [];
    }

    const parts = pathname.split("/").filter(Boolean);
    const items: { href: string; label: string }[] = [];

    // optionally put Home first
    if (showHome) items.push({ href: "/", label: homeLabel });

    let acc = "";
    parts.forEach((part) => {
      acc += `/${part}`;
      // prefer a full-path label, fallback to a segment label, fallback pretty
      const fullPathKey = acc;
      const label =
        labels[fullPathKey] ?? labels[part] ?? prettySegment(part) ?? part;
      items.push({ href: acc, label });
    });

    return items;
  }, [pathname, labels, showHome, homeLabel]);

  if (!crumbs || crumbs.length === 0) return null;

  const sep = separator ?? (
    <svg
      className="mx-2 inline-block h-4 w-4 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-gray-600 ${className}`}
      role="navigation"
      itemScope
      itemType="http://schema.org/BreadcrumbList"
    >
      <ol className="my-2 flex items-center overflow-x-auto whitespace-nowrap">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          const name = crumb.label;

          return (
            <li
              key={crumb.href + i}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className="inline-block max-w-[18rem] truncate font-semibold text-gray-900"
                  aria-current="page"
                  itemProp="name"
                >
                  {name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="max-w-[18rem] truncate hover:underline"
                  itemProp="item"
                >
                  <span itemProp="name">{name}</span>
                </Link>
              )}

              <meta itemProp="position" content={(i + 1).toString()} />

              {!isLast && <span className="mx-1">{sep}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/*
Usage examples (drop into your app/layout.tsx or any client component):

1) Basic (auto labels from path):

import Breadcrumbs from "@/components/Breadcrumbs";

export default function Header() {
  return (
    <header className="p-4 border-b bg-white">
      <div className="container mx-auto">
        <Breadcrumbs />
      </div>
    </header>
  );
}

2) With custom labels for dynamic routes:

const labels = {
  "/contacts": "Contacts",
  "/contacts/important": "Important",
  // or map a single segment
  "profile": "My Profile",
};

<Breadcrumbs labels={labels} homeLabel="الرئيسية" />

3) RTL / Arabic considerations: place the component in an RTL layout (dir="rtl") and optionally reverse separator.

Notes:
- The component uses usePathname() from next/navigation and is a client component.
- If you need server-resolved titles (e.g. contact name by id), pass a labels map with full-path keys (e.g. `/contacts/123`) from the page where you can fetch the title, or extend the component to accept a `resolveLabel` async prop and load titles on mount.
*/
