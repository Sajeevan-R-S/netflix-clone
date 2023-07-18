import React, { useState } from "react";

function SwitchTabs({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const activeTab = (tab, index) => {
    setSelectedTab(index);
    onTabChange(tab);
  };

  return (
    <div>
      <div className="text-base border rounded cursor-pointer font-medium flex items-center justify-center">
        {data.map((tab, index) => (
          <span
            className={`px-4 py-1 ${
              selectedTab === index ? "bg-[#E50914]" : ""
            }`}
            key={index}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SwitchTabs;
