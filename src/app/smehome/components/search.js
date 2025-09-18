"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { notification } from "antd";

export default function Search({
  batches = [],
  students = [],
  onSearch,
  onReset,
  selectedBatch,
  setSelectedBatch,
  selectedEpicStatus,
  setSelectedEpicStatus,
}) {
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showEpicDropdown, setShowEpicDropdown] = useState(false);
  const [batchInput, setBatchInput] = useState(selectedBatch || "");
  const [epicInput, setEpicInput] = useState(selectedEpicStatus || "");
  const [api, contextHolder] = notification.useNotification();

  const batchDropdownRef = useRef(null);
  const epicDropdownRef = useRef(null);

  // --- Extract unique EPIC statuses from the student data ---
  const uniqueEpicStatuses = [
    ...new Set(students.map((student) => student.epicStatus).filter(Boolean)),
  ];

  // --- Filter batch options based on typed input ---
  const filteredBatchOptions = batches.filter((b) =>
    b.batchNo.toLowerCase().includes(batchInput.toLowerCase())
  );

  // --- Filter EPIC status options based on typed input ---
  const filteredEpicOptions = uniqueEpicStatuses.filter((status) =>
    status.toLowerCase().includes(epicInput.toLowerCase())
  );

  // --- Close dropdowns when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(event.target)
      ) {
        setShowBatchDropdown(false);
      }
      if (
        epicDropdownRef.current &&
        !epicDropdownRef.current.contains(event.target)
      ) {
        setShowEpicDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Search handler with validation ---
  const handleSearchClick = () => {
    // Validation 1: Check if at least one filter is selected
    if (!selectedBatch && !selectedEpicStatus) {
      api.error({
        message: "Search Error",
        description:
          "Please select at least one filter (Batch or EPIC Status) to search.",
        placement: "topRight",
        duration: 4,
        // showProgress: true,
        pauseOnHover: true,
        closeIcon: (
          <RiCloseCircleLine
            className="text-[#cd5e77] hover:text-[#a57900]"
            size={20}
          />
        ),
      });
      return;
    }

    // Validation 2: Check if any students match the criteria BEFORE calling onSearch
    let filteredStudents = [...students];

    if (selectedBatch) {
      filteredStudents = filteredStudents.filter(
        (s) => s.batch === selectedBatch
      );
    }

    if (selectedEpicStatus) {
      filteredStudents = filteredStudents.filter(
        (s) => s.epicStatus === selectedEpicStatus
      );
    }

    if (filteredStudents.length === 0) {
      api.info({
        message: "No Results Found",
        description:
          "No students match your selected criteria. Please try different filters.",
        placement: "topRight",
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
        closeIcon: (
          <RiCloseCircleLine
            className="text-[#cd5e77] hover:text-[#a57900]"
            size={20}
          />
        ),
      });
      return;
    }

    // If validations pass, proceed with the search
    onSearch();
  };

  // --- Reset handler ---
  const handleResetClick = () => {
    setBatchInput("");
    setEpicInput("");
    setSelectedBatch("");
    setSelectedEpicStatus("");
    setShowBatchDropdown(false);
    setShowEpicDropdown(false);
    onReset();
  };

  return (
    <>
      {contextHolder}
      {/* Add custom styles for notifications */}
      <style jsx global>{`
        /* Custom notification styles for #cd5e77 */
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #cd5e77 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-icon,
        .ant-notification-notice-error .ant-notification-notice-icon,
        .ant-notification-notice-warning .ant-notification-notice-icon,
        .ant-notification-notice-info .ant-notification-notice-icon {
          color: #cd5e77 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-message,
        .ant-notification-notice-error .ant-notification-notice-message,
        .ant-notification-notice-warning .ant-notification-notice-message,
        .ant-notification-notice-info .ant-notification-notice-message {
          color: #cd5e77 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #cd5e77 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #cd5e77 !important;
        }
        /* Custom close icon styling */
        .ant-notification-notice-close {
          transition: all 0.3s ease;
        }
        /* Ensure progress bar container also uses the color */
        .ant-notification-notice-progress {
          background: rgba(
            205,
            94,
            119,
            0.1
          ) !important; /* Light version of #cd5e77 */
        }
      `}</style>

      <div id="search-container" className="bg-[#ffffff] py-3 rounded-xl">
        <div className="flex flex-row flex-wrap justify-center gap-3 px-2 py-3">
          {/* --- Batch Dropdown --- */}
          <div className="relative" ref={batchDropdownRef}>
            <input
              type="text"
              id="batch"
              placeholder=" "
              value={batchInput}
              onChange={(e) => {
                setBatchInput(e.target.value);
                setShowBatchDropdown(true);
              }}
              onClick={() => setShowBatchDropdown(true)}
              className="block px-4 pb-2 pt-5 w-[170px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer cursor-pointer"
            />
            <label
              htmlFor="batch"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]"
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
                  setBatchInput("");
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear batch"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showBatchDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#faeef1] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredBatchOptions.length > 0 ? (
                  filteredBatchOptions.map((batch) => (
                    <div
                      key={batch.batchNo}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-[#fcb9ca] focus:bg-[#fcb9ca] focus:outline-none"
                      onClick={() => {
                        setSelectedBatch(batch.batchNo);
                        setBatchInput(batch.batchNo);
                        setShowBatchDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedBatch(batch.batchNo);
                          setBatchInput(batch.batchNo);
                          setShowBatchDropdown(false);
                        }
                      }}
                      role="option"
                      aria-selected={selectedBatch === batch.batchNo}
                    >
                      {batch.batchNo}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No matching batches
                  </div>
                )}
              </div>
            )}
          </div>

          {/* --- EPIC Status Dropdown --- */}
          <div className="relative" ref={epicDropdownRef}>
            <input
              type="text"
              id="epic-status"
              placeholder=" "
              value={epicInput}
              onChange={(e) => {
                setEpicInput(e.target.value);
                setShowEpicDropdown(true);
              }}
              onClick={() => setShowEpicDropdown(true)}
              className="block px-4 pb-2 pt-5 w-[170px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer cursor-pointer"
            />
            <label
              htmlFor="epic-status"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6 peer-focus:bg-[#ffffff]"
            >
              EPIC
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {selectedEpicStatus && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEpicStatus("");
                  setEpicInput("");
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                aria-label="Clear EPIC status"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showEpicDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#faeef1] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredEpicOptions.length > 0 ? (
                  filteredEpicOptions.map((status) => (
                    <div
                      key={status}
                      tabIndex={0}
                      className="px-4 py-2 cursor-pointer hover:bg-[#fcb9ca] focus:bg-[#fcb9ca] focus:outline-none"
                      onClick={() => {
                        setSelectedEpicStatus(status);
                        setEpicInput(status);
                        setShowEpicDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedEpicStatus(status);
                          setEpicInput(status);
                          setShowEpicDropdown(false);
                        }
                      }}
                      role="option"
                      aria-selected={selectedEpicStatus === status}
                    >
                      {status}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No matching statuses
                  </div>
                )}
              </div>
            )}
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex items-center flex-wrap">
            <button
              onClick={handleSearchClick}
              className="cursor-pointer bg-[#cd5e77] hover:bg-[#cd5e78ba] text-white px-4 py-4 rounded-l-xl text-sm font-semibold flex items-center gap-2 transition-colors duration-200"
            >
              <FaSearch />
              <span>Search</span>
            </button>
            <button
              onClick={handleResetClick}
              className="cursor-pointer bg-[#f5dfe4] hover:bg-[#FAEFF1] px-4 py-4 rounded-r-xl text-sm font-semibold text-gray-700 flex items-center gap-2 transition-colors duration-200"
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
