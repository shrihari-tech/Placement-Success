// src/app/heads/components/tab.js
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
                  ? "bg-[#d2d5b6] border-[#5f6a0a] text-[#5f6a0a] border  border-b-0 relative -bottom-px "
                  : "text-[#5f6a0a] hover:text-[#5f6a0a] hover:border-b-2 hover:border-[#5f6a0a]"
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