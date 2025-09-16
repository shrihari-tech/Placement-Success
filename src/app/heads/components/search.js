// heads/components/search.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { notification } from "antd";

export default function Search({
  domains = [],
  batches = [],
  onSearch,
  onReset,
  selectedDomain,
  setSelectedDomain,
  selectedBatch,
  setSelectedBatch,
  requireDomainForSearch = true,
  searchValidationMessage = "Please select a domain before searching",
  requireDomainForBatch = true,
  batchValidationMessage = "Select domain first please!",
  domainPrefixMap = {},
}) {
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const domainDropdownRef = useRef(null);
  const batchDropdownRef = useRef(null);

  // --- Computed Value: Filter batches based on selected domain ---
  const filteredBatches =
    selectedDomain && domainPrefixMap[selectedDomain]
      ? batches.filter((batch) =>
          batch.batchNo?.startsWith(domainPrefixMap[selectedDomain])
        )
      : [];

  // --- Effect: Close dropdowns when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        domainDropdownRef.current &&
        !domainDropdownRef.current.contains(event.target)
      ) {
        setShowDomainDropdown(false);
      }
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(event.target)
      ) {
        setShowBatchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Dependencies removed as refs don't change

  // --- Effect: Reset batch when domain changes ---
  useEffect(() => {
    if (!selectedDomain) {
      setSelectedBatch(""); // Clear batch if domain is cleared
    }
    // Close batch dropdown if domain changes
    setShowBatchDropdown(false);
  }, [selectedDomain, setSelectedBatch]);

  // --- Handler: Enhanced search with optional validation ---
  const handleSearchClick = () => {
    // Optional validation: Check if domain is required for search
    if (requireDomainForSearch && !selectedDomain) {
      api.info({
        message: "Domain Required", // Generic title
        description: searchValidationMessage, // Configurable message
        placement: "topRight",
        duration: 3,
      });
      return; // Prevent search
    }
    // If validation passes, call the parent's onSearch handler
    onSearch();
  };

  // --- Handler: Reset filters ---
  const handleResetClick = () => {
    // Reset local dropdown states
    setShowDomainDropdown(false);
    setShowBatchDropdown(false);
    // Call the parent's onReset handler
    onReset();
  };

  return (
    <>
      {contextHolder} {/* Ant Design Notification Context Holder */}
      <div
        id="search-container"
        className="bg-[#ffffff] py-3 rounded-xl"
        tabIndex={0} // Make focusable if needed
      >
        <div className="flex flex-row flex-wrap justify-center gap-3 px-2 py-3">
          {/* --- Domain Dropdown --- */}
          <div className="relative" ref={domainDropdownRef}>
            <input
              type="text"
              id="domain"
              readOnly
              placeholder=" "
              value={
                selectedDomain
                  ? domains.find((d) => d.key === selectedDomain)?.label || ""
                  : ""
              }
              onClick={() => setShowDomainDropdown(!showDomainDropdown)}
              className="block px-4 pb-2 pt-5 w-[260px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#5f6a0a] peer cursor-pointer"
            />
            <label
              htmlFor="domain"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#5f6a0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]"
            >
              Domain
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {/* Clear Domain Button */}
            {selectedDomain && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown toggle
                  setSelectedDomain("");
                  // setSelectedBatch(""); // Handled by useEffect now
                  handleSearchClick(); // Optional: Trigger search on clear
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear domain"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {/* Domain Dropdown Options */}
            {showDomainDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#e1e6b7] border border-gray-300 rounded-md shadow-md">
                {domains.map((domain) => (
                  <div
                    key={domain.key}
                    tabIndex={0} // Make focusable
                    className="px-4 py-2 cursor-pointer hover:bg-[#bac658] focus:bg-[#bac658] focus:outline-none"
                    onClick={() => {
                      setSelectedDomain(domain.key);
                      // setSelectedBatch(""); // Handled by useEffect now
                      setShowDomainDropdown(false);
                      // Optional: Auto-search or let user click Search button
                      // handleSearchClick();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        // Enter or Space
                        e.preventDefault();
                        setSelectedDomain(domain.key);
                        // setSelectedBatch(""); // Handled by useEffect now
                        setShowDomainDropdown(false);
                        // Optional: Auto-search
                        // handleSearchClick();
                      }
                    }}
                    role="option" // Accessibility
                    aria-selected={selectedDomain === domain.key}
                  >
                    {domain.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Batch Dropdown --- */}
          <div className="relative" ref={batchDropdownRef}>
            <input
              type="text"
              id="batch"
              readOnly
              placeholder=" "
              value={selectedBatch || ""}
              onClick={(e) => {
                // Optional validation: Check if domain is required for batch interaction
                if (requireDomainForBatch && !selectedDomain) {
                  api.info({
                    message: "Domain Required", // Generic title
                    description: batchValidationMessage, // Configurable message
                    placement: "topRight",
                    duration: 3,
                  });
                  return; // Prevent dropdown from opening
                }
                // Toggle dropdown visibility if domain check passes (or not required)
                setShowBatchDropdown(!showBatchDropdown);
              }}
              // No 'disabled' attribute, input is always clickable for validation feedback
              className={`block px-4 pb-2 pt-5 w-[170px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#5f6a0a] peer cursor-pointer`}
            />
            <label
              htmlFor="batch"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#5f6a0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]"
            >
              Batch
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {/* Clear Batch Button */}
            {selectedBatch && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown toggle
                  setSelectedBatch("");
                  // Optional: Auto-search on clear
                  // handleSearchClick();
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear batch"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {/* Batch Dropdown Options */}
            {showBatchDropdown &&
              selectedDomain &&
              filteredBatches.length > 0 && (
                <div className="absolute z-10 w-full text-sm bg-[#e1e6b7] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                  {filteredBatches.map((batch) => (
                    <div
                      key={batch.batchNo}
                      tabIndex={0} // Make focusable
                      className="px-4 py-2 cursor-pointer hover:bg-[#bac658] focus:bg-[#bac658] focus:outline-none"
                      onClick={() => {
                        setSelectedBatch(batch.batchNo);
                        setShowBatchDropdown(false);
                        // Optional: Auto-search on selection
                        // handleSearchClick();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          // Enter or Space
                          e.preventDefault();
                          setSelectedBatch(batch.batchNo);
                          setShowBatchDropdown(false);
                          // Optional: Auto-search
                          // handleSearchClick();
                        }
                      }}
                      role="option" // Accessibility
                      aria-selected={selectedBatch === batch.batchNo}
                    >
                      {batch.batchNo}
                    </div>
                  ))}
                </div>
              )}
            {/* Optional: Show message if no batches for selected domain */}
            {showBatchDropdown &&
              selectedDomain &&
              filteredBatches.length === 0 && (
                <div className="absolute z-10 w-full text-sm bg-[#fff8e6] border border-gray-300 rounded-md shadow-md p-2 text-gray-500">
                  No batches available for this domain.
                </div>
              )}
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex items-center flex-wrap">
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="cursor-pointer bg-[#6d790b] hover:bg-[#5e680a] text-white px-4 py-4 rounded-l-xl  text-sm font-semibold flex items-center gap-2 transition-colors duration-200"
              aria-label="Search"
            >
              <FaSearch className="inline-block" />
              <span>Search</span>
            </button>
            {/* Reset Button */}
            <button
              onClick={handleResetClick}
              className="cursor-pointer bg-[#d7de9f] hover:bg-[#ebeecf] px-4 py-4 rounded-r-xl text-sm font-semibold  text-gray-700 flex items-center gap-2 transition-colors duration-200"
              aria-label="Reset filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true" // Icon is decorative
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
