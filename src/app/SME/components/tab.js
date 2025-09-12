"use client";
import React from "react";

export default function Tabs({
  activeTab,
  setActiveTab,
  tabs,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-gray-200 mb-4 mt-5">
        {tabs.map((label) => (
          <button
            key={label}
            className={`flex-1 py-2 px-3 text-base font-bold transition-colors duration-200 capitalize text-center cursor-pointer
              ${
                activeTab === label
                  ? "bg-[#ebe3ff] border-[#6750A4] text-[#6750A4] border  border-b-0 relative -bottom-px "
                  : "text-[#6750A4] hover:text-[#56438d] hover:border-b-2 hover:border-[#6750A4]"
              }`}
            onClick={() => setActiveTab(label)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}