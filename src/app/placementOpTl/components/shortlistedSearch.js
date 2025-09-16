// placementOpTl/components/shortlistedSearch.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { notification } from "antd";

export default function ShortlistedSearch({
  domains = [],
  batches = [],
  companies = [],
  onSearch,
  onReset,
  selectedDomain,
  setSelectedDomain,
  selectedBatch,
  setSelectedBatch,
  selectedCompany,
  setSelectedCompany,
  domainPrefixMap = {},
  requireDomainForBatch = true,
  batchValidationMessage = "Select domain first please!",
  requireDomainForCompany = false,
  companyValidationMessage = "Select domain first please!",
  requireDomainOrCompanyForSearch = true,
  searchValidationMessage = "Please select either a domain or a company before searching",
}) {
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [domainInput, setDomainInput] = useState(
    selectedDomain ? domains.find((d) => d.key === selectedDomain)?.label || "" : ""
  );
  const [batchInput, setBatchInput] = useState(selectedBatch || "");
  const [companyInput, setCompanyInput] = useState(selectedCompany || "");
  const [api, contextHolder] = notification.useNotification();

  const domainDropdownRef = useRef(null);
  const batchDropdownRef = useRef(null);
  const companyDropdownRef = useRef(null);

  // --- Filter batches based on selected domain ---
  const filteredBatches = selectedDomain && domainPrefixMap[selectedDomain]
    ? batches.filter((batch) =>
        batch.batchNo?.startsWith(domainPrefixMap[selectedDomain])
      )
    : [];

  // --- Filter domain options based on typed input ---
  const filteredDomainOptions = domains.filter(d =>
    d.label.toLowerCase().includes(domainInput.toLowerCase())
  );

  // --- Filter batch options based on typed input ---
  const filteredBatchOptions = filteredBatches.filter(b =>
    b.batchNo.toLowerCase().includes(batchInput.toLowerCase())
  );

  // --- Filter company options based on typed input ---
  const filteredCompanyOptions = companies.filter(c =>
    c.toLowerCase().includes(companyInput.toLowerCase())
  );

  // --- Close dropdowns when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target)) {
        setShowDomainDropdown(false);
      }
      if (batchDropdownRef.current && !batchDropdownRef.current.contains(event.target)) {
        setShowBatchDropdown(false);
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
        setShowCompanyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Reset batch when domain changes ---
  useEffect(() => {
    if (!selectedDomain) {
      setSelectedBatch("");
      setBatchInput("");
    }
    setShowBatchDropdown(false);
  }, [selectedDomain, setSelectedBatch]);

  // --- Search handler with combined validation ---
  const handleSearchClick = () => {
    if (requireDomainOrCompanyForSearch && !selectedDomain && !selectedCompany) {
      api.info({
        message: "Selection Required",
        description: searchValidationMessage,
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    onSearch();
  };

  // --- Reset handler ---
  const handleResetClick = () => {
    setDomainInput("");
    setBatchInput("");
    setCompanyInput("");
    setSelectedDomain("");
    setSelectedBatch("");
    setSelectedCompany("");
    setShowDomainDropdown(false);
    setShowBatchDropdown(false);
    setShowCompanyDropdown(false);
    onReset();
  };

  return (
    <>
      {contextHolder}

      <div id="shortlisted-search-container" className="bg-[#ffffff] py-3 rounded-xl" tabIndex={0}>
        <div className="flex flex-row flex-wrap justify-center gap-3 px-2 py-3">

          {/* --- Domain Dropdown --- */}
          <div className="relative" ref={domainDropdownRef}>
            <input
              type="text"
              id="domain"
              placeholder=" "
              value={domainInput}
              onChange={(e) => { setDomainInput(e.target.value); setShowDomainDropdown(true); }}
              onClick={() => setShowDomainDropdown(true)}
              className="block px-4 pb-2 pt-5 w-[260px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#a17640] peer cursor-pointer"
            />
            <label htmlFor="domain" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]">
              Domain
            </label>
            <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
            {selectedDomain && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedDomain(""); setDomainInput(""); }} className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700" aria-label="Clear domain">
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showDomainDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#f5f1eb] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredDomainOptions.length > 0 ? filteredDomainOptions.map((domain) => (
                  <div
                    key={domain.key}
                    tabIndex={0}
                    className="px-4 py-2 cursor-pointer hover:bg-[#e2d5c5] focus:bg-[#e2d5c5] focus:outline-none"
                    onClick={() => { setSelectedDomain(domain.key); setDomainInput(domain.label); setShowDomainDropdown(false); }}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedDomain(domain.key); setDomainInput(domain.label); setShowDomainDropdown(false); } }}
                    role="option"
                    aria-selected={selectedDomain === domain.key}
                  >
                    {domain.label}
                  </div>
                )) : (
                  <div className="px-4 py-2 text-gray-500">No matching domain</div>
                )}
              </div>
            )}
          </div>

          {/* --- Batch Dropdown --- */}
          <div className="relative" ref={batchDropdownRef}>
            <input
              type="text"
              id="batch"
              placeholder=" "
              value={batchInput}
              onChange={(e) => { setBatchInput(e.target.value); setShowBatchDropdown(true); }}
              onClick={(e) => {
                if (requireDomainForBatch && !selectedDomain) {
                  api.info({ message: "Domain Required", description: batchValidationMessage, placement: "topRight", duration: 3 });
                  return;
                }
                setShowBatchDropdown(true);
              }}
              className="block px-4 pb-2 pt-5 w-[150px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#a17640] peer cursor-pointer"
            />
            <label htmlFor="batch" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]">
              Batch
            </label>
            <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
            {selectedBatch && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedBatch(""); setBatchInput(""); }} className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700" aria-label="Clear batch">
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showBatchDropdown && selectedDomain && (filteredBatchOptions.length > 0 ? (
              <div className="absolute z-10 w-full text-sm bg-[#f5f1eb] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredBatchOptions.map((batch) => (
                  <div key={batch.batchNo} tabIndex={0} className="px-4 py-2 cursor-pointer hover:bg-[#e2d5c5] focus:bg-[#e2d5c5] focus:outline-none"
                    onClick={() => { setSelectedBatch(batch.batchNo); setBatchInput(batch.batchNo); setShowBatchDropdown(false); }}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedBatch(batch.batchNo); setBatchInput(batch.batchNo); setShowBatchDropdown(false); } }}
                    role="option" aria-selected={selectedBatch === batch.batchNo}>
                    {batch.batchNo}
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute z-10 w-full text-sm bg-[#f5f1eb] border border-gray-300 rounded-md shadow-md p-2 text-gray-500">
                No batches available for this domain.
              </div>
            ))}
          </div>

          {/* --- Company Dropdown --- */}
          <div className="relative" ref={companyDropdownRef}>
            <input
              type="text"
              id="company"
              placeholder=" "
              value={companyInput}
              onChange={(e) => { setCompanyInput(e.target.value); setShowCompanyDropdown(true); }}
              onClick={(e) => {
                if (requireDomainForCompany && !selectedDomain) {
                  api.info({ message: "Domain Required", description: companyValidationMessage, placement: "topRight", duration: 3 });
                  return;
                }
                setShowCompanyDropdown(true);
              }}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#a17640] peer cursor-pointer"
            />
            <label htmlFor="company" className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#a17640] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]">
              Company
            </label>
            <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
            {selectedCompany && (
              <button onClick={(e) => { e.stopPropagation(); setSelectedCompany(""); setCompanyInput(""); }} className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700" aria-label="Clear company">
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showCompanyDropdown && (filteredCompanyOptions.length > 0 ? (
              <div className="absolute z-10 w-full text-sm bg-[#f5f1eb] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredCompanyOptions.map((company) => (
                  <div key={company} tabIndex={0} className="px-4 py-2 cursor-pointer hover:bg-[#e2d5c5] focus:bg-[#e2d5c5] focus:outline-none"
                    onClick={() => { setSelectedCompany(company); setCompanyInput(company); setShowCompanyDropdown(false); }}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedCompany(company); setCompanyInput(company); setShowCompanyDropdown(false); } }}
                    role="option" aria-selected={selectedCompany === company}>
                    {company}
                  </div>
                ))}
              </div>
            ) : (
              <div className="absolute z-10 w-full text-sm bg-[#fff8e6] border border-gray-300 rounded-md shadow-md p-2 text-gray-500">
                No companies available.
              </div>
            ))}
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex items-center flex-wrap">
            <button onClick={handleSearchClick} className="cursor-pointer bg-[#a17640] hover:bg-[#906a39] text-white px-4 py-4 rounded-l-xl  text-sm font-semibold flex items-center gap-2 transition-colors duration-200" aria-label="Search">
              <FaSearch className="inline-block" />
              <span>Search</span>
            </button>
            <button onClick={handleResetClick} className="cursor-pointer bg-[#e2d5c5] hover:bg-[#f5f1eb] px-4 py-4 rounded-r-xl text-sm font-semibold  text-gray-700 flex items-center gap-2 transition-colors duration-200" aria-label="Reset filters">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.356-2m15.356 2H15" />
              </svg>
              <span>Reset</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
