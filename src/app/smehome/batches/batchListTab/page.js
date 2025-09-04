// app/samehome/batches/BatchListTab.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDataContext } from "../../../context/dataContext"; // Ensure this path is correct for your project structure
import { FiEye, FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import EditStudentModal from "./EditStudentModal"; // Adjust the import path as needed

export default function BatchListTab() {
  // 1. Destructure necessary values from DataContext
  const {
    batchesNames,
    selectedBatch,
    setSelectedBatch,
    studentData,
    batchEpicStats,
  } = useDataContext();

  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const batchDropdownRef = useRef(null);

  // --- Helper Functions ---
  const handleSearch = () => {
    if (!selectedBatch) {
      alert("Please select a batch");
      return;
    }
    const results = studentData.filter(
      (student) => student.batch === selectedBatch
    );
    setFilteredStudents(results);
    setSearchInitiated(true);
    // Note: Epic stats are now calculated in DataContext and accessed via batchEpicStats
  };

  const handleReset = () => {
    setSelectedBatch("");
    setShowBatchDropdown(false);
    setFilteredStudents([]);
    setSearchInitiated(false);
    // Reset modal states if used
    // setSelectedStudent(null);
    // setShowViewModal(false);
    // setEditingStudent(null);
    // setDeletingStudent(null);
    // setShowDeleteModal(false);
    // setDeleteConfirmationInput("");
    // setDeleteError("");
  };

  // --- Data Processing ---
  // Simplified: batchesNames from context is already filtered for the domain
  const filteredBatches = Array.isArray(batchesNames) ? batchesNames : [];

  console.log(filteredBatches, batchesNames, "jjj");

  // 2. Get Epic Status data for the currently selected batch from DataContext
  // batchEpicStats[selectedBatch] will be an object like { Excellent: 5, Capable: 10, ... }
  // or undefined/{} if no data or batch not selected.
  const epicStatsForSelectedBatch = selectedBatch
    ? batchEpicStats[selectedBatch] || {}
    : {};

  // --- Effects ---
  // Close dropdown when clicking outside
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

  // --- Effect to update filtered students when studentData or selectedBatch changes ---
  useEffect(() => {
    if (searchInitiated && selectedBatch) {
      const results = studentData.filter(
        (student) => student.batch === selectedBatch
      );
      setFilteredStudents(results);
    }
  }, [studentData, selectedBatch, searchInitiated]);


  // --- Rendering ---
  return (
    <>
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
              value={selectedBatch ?? ""} // Handles null/undefined
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
                  handleReset(); // Use the reset function
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
                {filteredBatches.filter((batchName) =>
                  batchName
                    .toLowerCase()
                    .includes((selectedBatch ?? "").toLowerCase())
                ).length === 0 &&
                  selectedBatch && (
                    <div className="px-4 py-2 text-gray-500 italic">
                      No matching batches
                    </div>
                  )}
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
                    Name
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone No.
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode of Study
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
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
                      {student.name}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student.email}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student.bookingId}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student.phone}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student.mode}
                    </td>
                    <td className="px-5 py-3 text-sm whitespace-nowrap">
                      <div className="flex gap-1 items-center justify-center">
                        <button
                          type="button"
                          className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowViewModal(true);
                          }}
                          aria-label={`View details for ${student.name}`}
                        >
                          <FiEye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingStudent(student);
                            setShowEditModal(true);
                          }}
                          className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          aria-label={`Edit ${student.name}`}
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Epic Status Display Section - Shown after search and if data exists */}

      {searchInitiated && selectedBatch && (
        <div className="mt-6 bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 w-1/2">
          {" "}
          {/* Full width container */}
          <div className="p-4 md:p-5 h-full flex flex-col">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 flex items-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#cd5e77]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              EPIC Status for Batch:{" "}
              <span className="text-[#cd5e77] ml-1">{selectedBatch}</span>
            </h3>

            {Object.keys(epicStatsForSelectedBatch).length > 0 ? (
              <div className="grid grid-cols-4 gap-2 md:gap-3 overflow-y-auto flex-grow">
                {Object.entries(epicStatsForSelectedBatch).map(
                  ([status, count]) => (
                    <div
                      key={status}
                      // --- Use fixed background color #f5dee3 ---
                      className="bg-[#faeef1] rounded-lg p-2 md:p-3 text-center hover:bg-[#f5dee3] transition-colors duration-200 flex flex-col items-center justify-center min-h-[60px]" // Removed dynamic color class
                    >
                      <p className="text-[0.65rem] md:text-xs font-semibold text-gray-700 truncate w-full">
                        {status}
                      </p>
                      <p className="text-base md:text-lg font-bold text-[#cd5e77] mt-1">
                        {" "}
                        {/* Keep count color consistent */}
                        {count}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic py-3 md:py-4 text-center text-sm flex-grow flex items-center justify-center">
                No EPIC data available for this batch.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <EditStudentModal
          student={editingStudent}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingStudent(null);
          }}
          onSave={() => {
            handleSearch();
            setShowEditModal(false);
            setEditingStudent(null);
          }}
        />
      )}
    </>
  );
}
