// app/samehome/batches/BatchListTab.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDataContext } from "../../../context/dataContext"; // Ensure this path is correct for your project structure
import { FiEye, FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import EditStudentModal from "../batchListTab/EditStudentModal"; // Adjust the import path as needed

export default function BatchHistoryTab() {
  // 1. Destructure necessary values from DataContext
  const {
    batchesNames,
    selectedBatch,
    setSelectedBatch,
    studentData,
    batchEpicStats,
    // allStudentData,
  } = useDataContext();
  // console.log(allStudentData, "hhh");
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

    // console.log(results, "jjj");
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
      const results = studentData.find(
        (student) => student.batch === selectedBatch
      );

      setFilteredStudents([results]);
    }
  }, [studentData, selectedBatch, searchInitiated]);

  // --- Rendering ---
  return (
    <>
      {/* Search Filters */}
      <div
        id="search-container"
        className="bg-[#fff5f6] py-3 rounded-xl"
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
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#fff5f6] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#cd5e77] peer cursor-pointer"
              autoComplete="off"
              aria-haspopup="listbox"
              aria-expanded={showBatchDropdown}
            />
            <label
              htmlFor="batch-select"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#fff5f6] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
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

      {/* {console.log(selectedBatch, "ggg")} */}

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
                    Trainer
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timing
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
                      {student?.batch}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student?.mode}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {student?.name}
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500 whitespace-nowrap">
                      {"9:30 AM - 11:30 AM"}
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
                          aria-label={`View details for ${student?.name}`}
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
                          aria-label={`Edit ${student?.name}`}
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

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <EditStudentModal
          student={editingStudent} // Pass the student data
          onClose={() => {
            setShowEditModal(false); // Close the modal
            setEditingStudent(null); // Clear the student data
          }}
          onSave={() => {
            // Optional: Perform actions after save, like re-fetching data or showing a toast
            // For BatchListTab, re-running the search/filter is often desired to show updated data
            // The handleSearch function will re-filter based on the current selectedBatch and context studentData
            handleSearch(); // This will use the updated studentData from context
            setShowEditModal(false); // Close the modal
            setEditingStudent(null); // Clear the student data
            // Optionally, show a success toast here if desired
            // toast.success("Student updated successfully!");
          }}
        />
      )}
    </>
  );
}
