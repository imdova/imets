"use client";

import { LucideIcon } from "lucide-react";
import { useRef } from "react";

type Tab = {
  label: string;
  icon?: LucideIcon;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (label: string) => void;
};

const LineTabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (label: string, index: number) => {
    onTabChange(label);
    const targetEl = tabRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex min-w-max gap-2 whitespace-nowrap border-b border-gray-200">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => handleTabClick(tab.label, index)}
                className={`flex items-center gap-2 px-8 py-2 text-center transition-all duration-300 ${
                  activeTab === tab.label
                    ? "border-b border-b-main font-semibold text-main"
                    : "text-gray-600"
                }`}
              >
                {Icon && <Icon size={14} />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LineTabs;
