"use client";
import { useState, useRef } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    tabRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="w-full">
      <div className="no-scrollbar overflow-x-auto">
        {/* Tab Buttons */}
        <div className="mb-7 flex min-w-max gap-2 whitespace-nowrap border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(index)}
              className={`px-8 py-2 text-center transition-all duration-300 ${
                activeTab === index
                  ? "text-primary border-b border-b-gray-200 font-semibold"
                  : "text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
