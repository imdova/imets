"use client";

import { useRef } from "react";

type Tab = {
  label: string;
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
        <div className="mb-7 flex min-w-max gap-2 whitespace-nowrap border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(tab.label, index)}
              className={`px-8 py-2 text-center transition-all duration-300 ${
                activeTab === tab.label
                  ? "border-b border-b-main font-semibold text-main"
                  : "text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineTabs;
