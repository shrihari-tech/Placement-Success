// placementOpTl/components/search.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { notification } from "antd";

export default function Search({
  domains,
  batches,
  onSearch,
  onReset,
  selectedDomain,
  setSelectedDomain,
  selectedBatch,
  setSelectedBatch,
}) {
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const domainDropdownRef = useRef(null);
  const batchDropdownRef = useRef(null);

  // Create a mapping from domain keys to batch prefixes
  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SA",
    devops: "DV",
  };

  // Filter batches based on selected domain
  const filteredBatches = selectedDomain
    ? batches.filter((batch) =>
        batch.batchNo?.startsWith(domainPrefixMap[selectedDomain])
      )
    : [];

  // Close dropdowns when clicking outside
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
  }, [showDomainDropdown, showBatchDropdown]);

  // Reset batch when domain changes
  useEffect(() => {
    if (!selectedDomain) {
      setSelectedBatch("");
    }
  }, [selectedDomain, setSelectedBatch]);

  // Enhanced search handler with validation
  const handleSearch = () => {
    if (!selectedDomain) {
      api.info({
        message: "Domain Required",
        description: "Please select a domain before searching",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    onSearch();
  };

  return (
    <>
      {contextHolder}

      <div
        id="search-container"
        className="bg-[#ffffff] py-3 rounded-xl"
        tabIndex={0}
      >
        <div className="flex flex-row flex-wrap justify-center gap-3 px-2 py-3">
          {/* Domain Dropdown - Even wider width */}
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
              className="block px-4 pb-2 pt-5 w-[260px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#e6a901] peer cursor-pointer"
            />
            <label
              htmlFor="domain"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#e6a901] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#fff8e6]"
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
                  setSelectedBatch("");
                  handleSearch();
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showDomainDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#fff8e6] border border-gray-300 rounded-md shadow-md">
                {domains.map((domain) => (
                  <div
                    key={domain.key}
                    tabIndex={0}
                    className="px-4 py-2 cursor-pointer hover:bg-[#ffe499]"
                    onClick={() => {
                      setSelectedDomain(domain.key);
                      setSelectedBatch("");
                      setShowDomainDropdown(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedDomain(domain.key);
                        setSelectedBatch("");
                        setShowDomainDropdown(false);
                        handleSearch();
                      }
                    }}
                  >
                    {domain.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Batch Dropdown - Now enabled but shows toast when no domain */}
          <div className="relative" ref={batchDropdownRef}>
            <input
              type="text"
              id="batch"
              readOnly
              placeholder=" "
              value={selectedBatch || ""}
              onClick={(e) => {
                if (!selectedDomain) {
                  // Show toast when clicking batch input without domain selected
                  api.info({
                    message: "Domain Required",
                    description: "Select domain first please!",
                    placement: "topRight",
                    duration: 3,
                  });
                  return;
                }
                // Only show dropdown if domain is selected
                setShowBatchDropdown(!showBatchDropdown);
              }}
              className={`block px-4 pb-2 pt-5 w-[170px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#e6a901] peer cursor-pointer`}
            />
            <label
              htmlFor="batch"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#e6a901] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#fff8e6]"
            >
              Batch
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {selectedBatch && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBatch("");
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showBatchDropdown &&
              selectedDomain &&
              filteredBatches.length > 0 && (
                <div className="absolute z-10 w-full text-sm bg-[#fff8e6] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                  {filteredBatches.map((batch) => (
                    <div
                      key={batch.batchNo}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-[#ffe499]"
                      onClick={() => {
                        setSelectedBatch(batch.batchNo);
                        setShowBatchDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelectedBatch(batch.batchNo);
                          setShowBatchDropdown(false);
                        }
                      }}
                    >
                      {batch.batchNo}
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Search and Reset Buttons */}
          <div className="flex items-center flex-wrap">
            <button
              onClick={handleSearch}
              className="cursor-pointer bg-[#e6a901] hover:bg-[#cc9601] text-white px-4 py-4 rounded-l-xl border-r-gray-700 text-sm font-semibold flex items-center gap-2"
            >
              <FaSearch className="inline-block" />
              <span>Search</span>
            </button>
            <button
              onClick={onReset}
              className="cursor-pointer bg-[#ffebb3] hover:bg-[#fff2cc] px-4 py-4 rounded-r-xl text-sm font-semibold border-l-gray-900 text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
