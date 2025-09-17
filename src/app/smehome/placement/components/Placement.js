"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDataContext } from "../../../context/dataContext";
import { FiEye, FiEdit, FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import Image from "next/image";
import PlacedStudentModal from "./PlacedStudentModal";
import toast, { Toaster } from "react-hot-toast";
import EditPlacementModal from "./EditPlacementModel";

export default function Placement() {
  const {
    batchesNames,
    selectedBatch,
    setSelectedBatch,
    studentData,
    placementFSDStudents,
    setPlacementFSDStudents,
  } = useDataContext();

  console.log(placementFSDStudents, "lll");

  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPlacedModal, setShowPlacedModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // New state for temporary checkbox values
  const [tempCheckboxStates, setTempCheckboxStates] = useState({});

  const batchDropdownRef = useRef(null);

  // Filter only placed students
  const placedStudents = studentData.filter(
    (student) => student.placement === "Placed"
  );

  // --- Search Functions ---
  const handleSearch = () => {
    if (!selectedBatch) {
      alert("Please select a batch");
      return;
    }
    const results = placedStudents.filter(
      (student) => student.batch === selectedBatch
    );
    setFilteredStudents(results);
    setSearchInitiated(true);
  };

  const handleReset = () => {
    setSelectedBatch("");
    setShowBatchDropdown(false);
    setFilteredStudents([]);
    setSearchInitiated(false);
    // Reset temporary checkbox states
    setTempCheckboxStates({});
  };

  const filteredBatches = Array.isArray(batchesNames) ? batchesNames : [];

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

  // Update filtered students if batch changes after search
  useEffect(() => {
    if (searchInitiated && selectedBatch) {
      const results = placedStudents.filter(
        (student) => student.batch === selectedBatch
      );
      setFilteredStudents(results);
    }
  }, [studentData, selectedBatch, searchInitiated]);

  // Initialize temporary checkbox states when filteredStudentsPlacement changes
  useEffect(() => {
    const newTempStates = {};
    filteredStudentsPlacement.forEach((student) => {
      newTempStates[student.sno] = {
        ineligible: student.ineligible || false,
        notRequired: student.notRequired || false,
      };
    });
    setTempCheckboxStates(newTempStates);
  }, [placementFSDStudents, selectedBatch]);

  // --- Final Data to Display ---
  const displayStudents =
    searchInitiated && selectedBatch ? filteredStudents : placedStudents;

  // Modified toggle function for temporary state
  const toggleTempCheckbox = (sno, field) => {
    setTempCheckboxStates((prev) => ({
      ...prev,
      [sno]: {
        ...prev[sno],
        [field]: !prev[sno]?.[field],
      },
    }));
  };

  // Submit function to update the actual state
  const handleSubmit = () => {
    setPlacementFSDStudents((prev) =>
      prev.map((student) => {
        const tempState = tempCheckboxStates[student.sno];
        if (tempState) {
          return {
            ...student,
            ineligible: tempState.ineligible,
            notRequired: tempState.notRequired,
          };
        }
        return student;
      })
    );

    // Show success message or handle success
    toast.success("Saved Sucessfully!", {
      duration: 3000,
      position: "top-right",
    });
  };

  // Check if there are any changes to enable/disable submit button
  const hasChanges = () => {
    return placementFSDStudents.some((student) => {
      const tempState = tempCheckboxStates[student.sno];
      if (!tempState) return false;

      return (
        tempState.ineligible !== (student.ineligible || false) ||
        tempState.notRequired !== (student.notRequired || false)
      );
    });
  };

  const [selectedBatchPlacement, setSelectedBatchPlacement] = useState("All");

  const filteredStudentsPlacement =
    selectedBatch === "All"
      ? placementFSDStudents
      : placementFSDStudents.filter((s) => s.batch === selectedBatch);

  return (
    <>
      <Toaster />

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
              value={selectedBatch ?? ""}
              maxLength={16}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setShowBatchDropdown(true);
              }}
              onClick={() => setShowBatchDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowBatchDropdown(false);
              }}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#fff5f6] rounded-sm border-2 border-gray-400 focus:outline-none focus:border-[#cd5e77] peer cursor-pointer"
              autoComplete="off"
            />
            <label
              htmlFor="batch-select"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#fff5f6] transform -translate-y-4 scale-75 top-4 left-4 peer-focus:text-xs peer-focus:text-[#cd5e77] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
            >
              Batch
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {selectedBatch && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showBatchDropdown && filteredBatches.length > 0 && (
              <div
                className="absolute z-10 w-full text-sm bg-[#faeff1] border border-gray-300 rounded-md shadow-md mt-1"
                style={{ maxHeight: "200px", overflowY: "auto" }}
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
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedBatch(batchName);
                        setShowBatchDropdown(false);
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
              <FaSearch /> Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer bg-[#f5dfe4] hover:bg-[#f0cfd6] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <Image
                src="/reset.svg"
                alt="Reset"
                width={20}
                height={20}
                className="object-contain"
              />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {placementFSDStudents.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-auto">
          <div className="w-full max-w-full overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    S.No
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Batch
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Ineligible
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Not Required
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudentsPlacement.map((student, index) => (
                  <tr
                    key={student.bookingId}
                    className="hover:bg-[#faeff1] text-gray-600"
                  >
                    <td className="px-5 py-3 text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-medium">
                      {student.name}
                    </td>
                    <td className="px-5 py-3 text-center text-sm">
                      {student.batch}
                    </td>
                    <td className="px-5 py-3 text-center text-sm font-semibold text-[#cd5e77]">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                        checked={
                          tempCheckboxStates[student.sno]?.ineligible || false
                        }
                        onChange={() =>
                          toggleTempCheckbox(student.sno, "ineligible")
                        }
                      />
                    </td>

                    <td className="px-5 py-3 text-center text-sm font-semibold text-[#cd5e77]">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                        checked={
                          tempCheckboxStates[student.sno]?.notRequired || false
                        }
                        onChange={() =>
                          toggleTempCheckbox(student.sno, "notRequired")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!hasChanges()}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  hasChanges()
                    ? "bg-[#cd5e77] hover:bg-[#b9556b] text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-gray-500 italic text-center">
          No placed students found.
        </p>
      )}

      {/* View Modal */}
      {showPlacedModal && selectedStudent && (
        <PlacedStudentModal
          isOpen={showPlacedModal}
          onClose={() => {
            setShowPlacedModal(false);
            setSelectedStudent(null);
          }}
          selectedStudent={selectedStudent}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && editingStudent && (
        <EditPlacementModal
          student={editingStudent}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingStudent(null);
          }}
          onSave={() => {
            setShowEditModal(false);
            setEditingStudent(null);
          }}
        />
      )}
    </>
  );
}
