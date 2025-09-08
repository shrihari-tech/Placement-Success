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
                  ? "bg-[#fff2cc] border-[#e6a901] text-[#e6a901] border  border-b-0 relative -bottom-px "
                  : "text-[#e6a901] hover:text-[#cc9601] hover:border-b-2 hover:border-[#e6a901]"
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