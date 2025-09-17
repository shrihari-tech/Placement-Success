// src/app/SME/components/search.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { notification } from "antd";

export default function Search({
  domains = [],
  onSearch, // `batches` prop is no longer needed
  onReset,
  selectedDomain,
  setSelectedDomain,
  // `selectedBatch`, `setSelectedBatch` props are no longer needed
  requireDomainForSearch = true,
  searchValidationMessage = "Please select a domain before searching",
  // `requireDomainForBatch`, `batchValidationMessage`, `domainPrefixMap` are no longer needed for UI
}) {
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [domainInput, setDomainInput] = useState(
    selectedDomain ? domains.find((d) => d.key === selectedDomain)?.label || "" : ""
  );
  const [api, contextHolder] = notification.useNotification();

  const domainDropdownRef = useRef(null);

  // --- Filter domain options based on typed input ---
  const filteredDomainOptions = domains.filter(d =>
    d.label.toLowerCase().includes(domainInput.toLowerCase())
  );

  // --- Close dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target)) {
        setShowDomainDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Search handler with validation ---
  const handleSearchClick = () => {
    if (requireDomainForSearch && !selectedDomain) {
      api.info({
        message: "Domain Required",
        description: searchValidationMessage,
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    onSearch(); // Call the parent's search function
  };

  // --- Reset handler ---
  const handleResetClick = () => {
    setDomainInput("");
    setSelectedDomain("");
    setShowDomainDropdown(false);
    onReset(); // Call the parent's reset function
  };

  return (
    <>
      {contextHolder}
      <div id="search-container" className="bg-[#ffffff] py-3 rounded-xl">
        <div className="flex flex-row flex-wrap justify-center gap-3 px-2 py-3">

          {/* --- Domain Dropdown (Only this remains) --- */}
          <div className="relative" ref={domainDropdownRef}>
            <input
              type="text"
              id="domain"
              placeholder=" "
              value={domainInput}
              onChange={(e) => {
                setDomainInput(e.target.value);
                setShowDomainDropdown(true);
              }}
              onClick={() => setShowDomainDropdown(true)}
              className="block px-4 pb-2 pt-5 w-[260px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750a4] peer cursor-pointer"
            />
            <label
              htmlFor="domain"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750a4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]"
            >
              Domain
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {selectedDomain && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDomain("");
                  setDomainInput("");
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear domain"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showDomainDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredDomainOptions.length > 0 ? (
                  filteredDomainOptions.map((domain) => (
                    <div
                      key={domain.key}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-[#eddcf9] focus:bg-[#6750a4] focus:outline-none"
                      onClick={() => {
                        setSelectedDomain(domain.key);
                        setDomainInput(domain.label);
                        setShowDomainDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedDomain(domain.key);
                          setDomainInput(domain.label);
                          setShowDomainDropdown(false);
                        }
                      }}
                      role="option"
                      aria-selected={selectedDomain === domain.key}
                    >
                      {domain.label}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No matching domain</div>
                )}
              </div>
            )}
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex items-center flex-wrap">
            <button
              onClick={handleSearchClick}
              className="cursor-pointer bg-[#6750a4] hover:bg-[#56438d] text-white px-4 py-4 rounded-l-xl text-sm font-semibold flex items-center gap-2 transition-colors duration-200"
            >
              <FaSearch />
              <span>Search</span>
            </button>
            <button
              onClick={handleResetClick}
              className="cursor-pointer bg-[#E8DEF8] hover:bg-[#c0b2d6] px-4 py-4 rounded-r-xl text-sm font-semibold text-gray-700 flex items-center gap-2 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.356-2m15.356 2H15"
                />
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}