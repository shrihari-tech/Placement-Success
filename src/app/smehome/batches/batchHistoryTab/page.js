// app/samehome/batches/BatchListTab.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDataContext } from "../../../context/dataContext";
import { FiEye, FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import EditStudentModal from "../batchListTab/EditStudentModal";
import { notification } from "antd"; // ✅ AntD notification

export default function BatchHistoryTab() {
  const {
    batchesNames,
    selectedBatch,
    setSelectedBatch,
    studentData,
    batchEpicStats,
    allFullstackTrainer,
  } = useDataContext();

  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const batchDropdownRef = useRef(null);

  // ✅ Notification hook
  const [api, contextHolder] = notification.useNotification();

  // --- Helper Functions ---
  const handleSearch = () => {
    if (!selectedBatch) {
      api.error({
        message: "Search Error",
        description: "Please select a batch before searching.",
        placement: "topRight",
        duration: 4,
        showProgress: false,
        pauseOnHover: true,
        closeIcon: (
          <RiCloseCircleLine
            className="text-[#cd5e77] hover:text-[#b9556b]"
            size={20}
          />
        ),
      });
      return;
    }

    const results = allFullstackTrainer.filter(
      (student) => student.batch === selectedBatch
    );
    setFilteredStudents(results);
    setSearchInitiated(true);

    if (results.length === 0) {
      api.warning({
        message: "No Students Found",
        description: `No students found in batch "${selectedBatch}".`,
        placement: "topRight",
        duration: 4,
        showProgress: false,
        closeIcon: (
          <RiCloseCircleLine
            className="text-[#cd5e77] hover:text-[#b9556b]"
            size={20}
          />
        ),
      });
    }
  };

  const handleReset = () => {
    setSelectedBatch("");
    setShowBatchDropdown(false);
    setFilteredStudents([]);
    setSearchInitiated(false);
  };

  const filteredBatches = Array.isArray(batchesNames) ? batchesNames : [];

  const epicStatsForSelectedBatch = selectedBatch
    ? batchEpicStats[selectedBatch] || {}
    : {};

  // --- Effects ---
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(e.target)
      ) {
        setShowBatchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      setShowBatchDropdown(false);
      setFilteredStudents([]);
      setSearchInitiated(false);
      setSelectedBatch("");
    };
  }, []);

  useEffect(() => {
    if (searchInitiated && selectedBatch) {
      const results = allFullstackTrainer.find(
        (student) => student.batch === selectedBatch
      );
      setFilteredStudents(results ? [results] : []);
    }
  }, [allFullstackTrainer, selectedBatch, searchInitiated]);

  return (
    <>
      {contextHolder}

      <style jsx global>{`
        .ant-notification-notice {
          border: none !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .ant-notification-notice-icon {
          color: #cd5e77 !important;
        }
        .ant-notification-notice-message {
          color: #cd5e77 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #cd5e77 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar,
        .ant-notification-notice-progress {
          display: none !important;
        }
      `}</style>

      {/* Search Filters */}
      <div
        id="search-container"
        className="bg-[#ffffff] py-3 rounded-xl"
        tabIndex={0}
      >
        <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
          {/* Batch Dropdown */}
          <div className="relative" ref={batchDropdownRef}>
            <input
              type="text"
              id="batch-select"
              placeholder=" "
              value={selectedBatch ?? ""}
              maxLength={16}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setShowBatchDropdown(true);
              }}
              onClick={() => setShowBatchDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowBatchDropdown(false);
                }
              }}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer cursor-pointer"
              autoComplete="off"
              aria-haspopup="listbox"
              aria-expanded={showBatchDropdown}
            />
            <label
              htmlFor="batch-select"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
            >
              Batch
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
              aria-hidden="true"
            />
            {selectedBatch && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear batch selection"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showBatchDropdown && filteredBatches.length > 0 && (
              <div
                role="listbox"
                className="absolute z-10 w-full text-sm bg-[#faeff1] border border-gray-300 rounded-md shadow-md mt-1"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {filteredBatches
                  .filter((batchName) =>
                    batchName
                      .toLowerCase()
                      .includes((selectedBatch ?? "").toLowerCase())
                  )
                  .map((batchName) => (
                    <div
                      key={batchName}
                      tabIndex={0}
                      role="option"
                      aria-selected={selectedBatch === batchName}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                      onClick={() => {
                        setSelectedBatch(batchName);
                        setShowBatchDropdown(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedBatch(batchName);
                          setShowBatchDropdown(false);
                        }
                      }}
                    >
                      {batchName}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Search and Reset Buttons */}
          <div className="flex gap-2 md:justify-end">
            <button
              type="button"
              onClick={handleSearch}
              className="cursor-pointer bg-[#cd5e77] hover:bg-[#b9556b] text-white px-5 py-4 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <FaSearch className="inline-block" /> Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer bg-[#f5dfe4] hover:bg-[#f0cfd6] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Image
                src="/reset.svg"
                alt="Reset Icon"
                width={20}
                height={20}
                className="object-contain"
              />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Student Table */}
      {searchInitiated && filteredStudents.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-auto">
          <div className="w-full max-w-full overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trainer History
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timing History
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.bookingId}
                    className="hover:bg-[#faeff1] hover:text-gray-900 text-gray-500 "
                  >
                    <td className="px-5 text-gray-700 text-center py-3 text-sm whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-medium text-gray-500 whitespace-nowrap">
                      {student?.batch}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student?.mode}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      <select
                        value={student?.trainer[student.trainer.length - 1]}
                      >
                        {[...student?.trainer].reverse().map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      <select
                        value={`${
                          student.sTiming[student.sTiming.length - 1]
                        } - ${student.eTiming[student.eTiming.length - 1]}`}
                      >
                        {[...student.sTiming].reverse().map((start, index) => {
                          const end = [...student.eTiming].reverse()[index];
                          return (
                            <option key={index} value={`${start} - ${end}`}>
                              {`${start} - ${end}`}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
