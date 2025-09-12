"use client";
import React from "react";

export default function Tabs({ activeTab, setActiveTab, tabs, className = "" }) {
  return (
    <div className={`border-b border-gray-200 mb-4 mt-5 ${className}`}>
      <ul className="nav nav-tabs flex -mb-px">
        {tabs.map((label) => (
          <li key={label} className="nav-item flex-1">
            <button
              className={`nav-link block py-2 px-3 text-base font-bold transition-colors duration-200 capitalize w-full text-center cursor-pointer
                ${
                  activeTab === label
                    ? "bg-[#fff5f6] border border-[#cd5e77] text-[#cd5e77] border-b-0 relative -bottom-px"
                    : "text-[#cd5e77] hover:text-[#b9556b] hover:border-b-2 hover:border-[#cd5e77] border-b-transparent"
                }`}
              onClick={() => setActiveTab(label)}
              type="button"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}