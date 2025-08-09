import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

// Define a type for available Lucide icon names
type LucideIconName = keyof typeof LucideIcons;

type DropdownItem = {
  id: string | number;
  title: string;
  description?: string;
  time?: string;
  icon?: LucideIconName;
  url?: string;
  onClick?: () => void;
  isUnread?: boolean;
  meta?: string;
};

type DropdownProps = {
  triggerIcon: LucideIconName;
  items: readonly DropdownItem[];
  title: string;
  showBadge?: boolean;
  badgeCount?: number;
  position?: "left" | "right";
  footerLink?: {
    text: string;
    url: string;
  };
  renderItem?: (item: DropdownItem) => React.ReactNode;
  children?: React.ReactNode;
};

export const DynamicDropdown = ({
  triggerIcon,
  items,
  title,
  showBadge = false,
  badgeCount = 0,
  position = "right",
  footerLink,
  renderItem,
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const TriggerIcon = LucideIcons[triggerIcon] as LucideIcons.LucideIcon;

  return (
    <div className="md:relative" ref={dropdownRef}>
      {children ? (
        <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-full rounded-md border border-gray-200 px-3 hover:bg-gray-100"
        >
          <TriggerIcon size={16} className="text-sm text-gray-600" />
          {showBadge && badgeCount > 0 && (
            <span className="absolute right-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#e2b403] text-[8px] text-white">
              {badgeCount}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute ${position}-2 z-50 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg sm:w-64`}
        >
          <div className="border-b border-gray-200 bg-main px-4 py-2 text-white">
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id}>
                {renderItem ? (
                  renderItem(item)
                ) : (
                  <DropdownItemComponent item={item} />
                )}
              </div>
            ))}
          </div>
          {footerLink && (
            <div className="border-t border-gray-200 px-4 py-2 text-center">
              <Link
                href={footerLink.url}
                className="hover:text-main/80 text-sm font-medium text-main"
              >
                {footerLink.text}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DropdownItemComponent = ({ item }: { item: DropdownItem }) => {
  const ItemIcon = item.icon
    ? (LucideIcons[item.icon] as LucideIcons.LucideIcon)
    : null;

  if (item.url) {
    return (
      <Link
        href={item.url}
        className={`block border-b border-gray-100 px-4 py-3 hover:bg-gray-50 ${
          item.isUnread ? "bg-blue-50" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            {ItemIcon && (
              <ItemIcon className="mr-2 mt-0.5 flex-shrink-0" size={16} />
            )}
            <div>
              <h4 className="text-sm font-medium">{item.title}</h4>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
          </div>
          {item.time && (
            <span className="text-xs text-gray-500">{item.time}</span>
          )}
        </div>
        {item.isUnread && (
          <div className="mt-1 h-2 w-2 rounded-full bg-[#e2b403]"></div>
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={item.onClick}
      className={`w-full border-b border-gray-100 px-4 py-3 text-left hover:bg-gray-50 ${
        item.isUnread ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-center">
        {ItemIcon && <ItemIcon className="mr-2 text-gray-600" size={16} />}
        <span className="text-sm text-gray-700">{item.title}</span>
      </div>
      {item.description && (
        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
      )}
    </button>
  );
};
