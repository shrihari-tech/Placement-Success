"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FiEye, FiEdit, FiTrash2, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import Opportunity from "./oppotunities";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../context/dataContext";
import BulkModal from "./bulkModal";
import EditStudentModal from "./EditStudentModal";
import ViewStudentModal from "./ViewStudentModal";
import BatchChange from "./BatchChange";
import Scores from "./scores";

export default function StudentDataPage() {
  const { studentData, batchHead, batchData, deleteStudent } = useDataContext();
  const [activeTab, setActiveTab] = useState("Student Data");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPlacement, setSelectedPlacement] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(studentData);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPlacementDropdown, setShowPlacementDropdown] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const batchDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const placementDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);

  const batchesNames = useMemo(() => {
    return [...new Set(studentData.map((s) => s.batch))];
  }, [studentData]);

  const handleSearch = useCallback(() => {
    let results = studentData;
    if (
      selectedBatch === "" &&
      selectedStatus === "" &&
      selectedPlacement === ""
    ) {
      toast.error("Please select at least one filter option to search");
      return;
    }
    if (selectedBatch) {
      results = results.filter((student) => student.batch === selectedBatch);
    }

    // Filter by status
    if (selectedStatus) {
      results = results.filter((student) => {
        const batch = batchData.find(
          (batch) => batch.batchNo === student.batch
        );
        if (!batch) return false;

        const isCompleted =
          new Date(batch.sections?.Domain?.endDate) < new Date() &&
          new Date(batch.sections?.Aptitude?.endDate) < new Date() &&
          new Date(batch.sections?.Communication?.endDate) < new Date();

        return selectedStatus === "Completed" ? isCompleted : !isCompleted;
      });
    }

    // Filter by placement
    if (selectedPlacement) {
      results = results.filter(
        (student) => student.placement === selectedPlacement
      );
    }

    setFilteredStudents(results);
    setSearchInitiated(true);
  }, [
    studentData,
    selectedBatch,
    selectedStatus,
    selectedPlacement,
    batchData,
  ]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (searchInitiated) {
        handleSearch();
      }
    }
  }, [studentData]);

  const handleReset = () => {
    setSelectedBatch("");
    setSelectedStatus("");
    setSelectedPlacement("");
    setFilteredStudents(studentData);
    setSearchInitiated(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(event.target)
      ) {
        setShowBatchDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        placementDropdownRef.current &&
        !placementDropdownRef.current.contains(event.target)
      ) {
        setShowPlacementDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleDeleteStudent = () => {
    if (!deleteConfirmationInput.trim()) {
      setDeleteError("Please enter the booking ID to confirm deletion");
      return;
    }

    if (
      !deletingStudent ||
      deleteConfirmationInput.trim() !== deletingStudent.bookingId
    ) {
      setDeleteError(
        "Booking ID does not match. Please enter the exact booking ID."
      );
      return;
    }

    // Delete the student from the correct domain and update studentData globally
    deleteStudent(deletingStudent.bookingId);

    // Reset modal states
    setShowDeleteModal(false);
    setDeleteConfirmationInput("");
    setDeleteError("");
    setDeletingStudent(null);

    toast.success("Student deleted successfully");

    // 🔄 Reapply filters to refresh the displayed list (if any filters were applied)
    handleSearch();
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmationInput("");
    setDeleteError("");
    setDeletingStudent(null);
  };

useEffect(() => {
  const handleGlobalKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeTab === "Student Data") {
        handleSearch();
      }
    }
  };

  window.addEventListener("keydown", handleGlobalKeyDown);
  return () => {
    window.removeEventListener("keydown", handleGlobalKeyDown);
  };
}, [handleSearch, activeTab]);

  useEffect(() => {
    if (editingStudent || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editingStudent, showDeleteModal]);

  return (
    <div className="flex min-h-screen mt-16 md:mt-1">
      <Toaster position="top-right" />
      <div
        className={`px-3 pt-20 flex-1 bg-[#F8FAFD] mb-12`}
        ref={searchContainerRef}
      >
        {/* ====== HEADER ====== */}
        <div className="fixed top-15 md:top-0 ms-[-19px] border-b-2 border-gray-300 flex items-center justify-between bg-white w-full py-9 px-4 z-20">
          <h1 className="fixed pl-3 text-xl text-gray-800 font-semibold">
            {batchHead}
          </h1>
        </div>
        {/* ====== TABS ====== */}
        <div className="flex bg-[#ECE6F0] rounded-xl p-1 mb-4 relative">
          <div
            className={`absolute top-1 bottom-1 bg-[#F8FAFD] rounded-lg shadow-sm transition-all
            duration-300 ease-in-out z-0
            ${
              activeTab === "Student Data"
                ? "left-1 w-[calc(25%-0.5rem)]"
                : activeTab === "Scores"
                ? "left-[calc(25%+0.25rem)] md:left-[calc(25%+0.25rem)] w-[calc(25%-0.8rem)] md:w-[calc(25%-0.5rem)]"
                : activeTab === "Opportunities"
                ? "left-[calc(50%-0.5rem)] md:left-[calc(50%-0.25rem)] w-[calc(25%+0.7rem)] md:w-[calc(25%-0.5rem)]"
                : "left-[calc(75%+0.25rem)] w-[calc(25%-0.5rem)]"
            }`}
          />
          {["Student Data", "Scores", "Opportunities", "Batch Change"].map(
            (label) => (
              <span
                key={label}
                className={`flex-1 items-center text-gray-800 text-center py-2 text-xs font-semibold select-none cursor-default relative z-10
                ${activeTab === label ? "text-indigo-600" : "text-black"}`}
                onClick={() => setActiveTab(label)}
              >
                {label}
              </span>
            )
          )}
        </div>
        {activeTab === "Student Data" ? (
          <div className="mb-4">
            {/* ====== SEARCH SECTION ====== */}
            <div
              id="search-container"
              className="bg-[#F4F3FF] py-3 rounded-xl"
              tabIndex={0}
            >
              <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
                {/* Batch Dropdown */}
                <div className="relative" ref={batchDropdownRef}>
                  <input
                    type="text"
                    id="batch-select"
                    placeholder=" "
                    value={selectedBatch}
                    onChange={(e) => {
                      setSelectedBatch(e.target.value);
                      setShowBatchDropdown(true);
                    }}
                    onClick={() => setShowBatchDropdown(!showBatchDropdown)}
                    className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="batch-select"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
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
                        setShowBatchDropdown(false);
                      }}
                      className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                    >
                      <RiCloseCircleLine size={20} />
                    </button>
                  )}
                  {showBatchDropdown && (
                    <div
                      className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md"
                      style={{
                        maxHeight: batchesNames.length > 5 ? "200px" : "auto",
                        overflowY: batchesNames.length > 5 ? "auto" : "visible",
                      }}
                    >
                      <div
                        key=""
                        tabIndex={0}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedBatch("");
                          setShowBatchDropdown(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setSelectedBatch("");
                            setShowBatchDropdown(false);
                            handleSearch();
                          }
                        }}
                      ></div>
                      {batchesNames
                        .filter(
                          (batchName) =>
                            !selectedBatch ||
                            batchName
                              .toLowerCase()
                              .includes(selectedBatch.toLowerCase())
                        )
                        .map((batchName) => (
                          <div
                            key={batchName}
                            tabIndex={0}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                              setSelectedBatch(batchName);
                              setShowBatchDropdown(false);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setSelectedBatch(batchName);
                                setShowBatchDropdown(false);
                                handleSearch();
                              }
                            }}
                          >
                            {batchName}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                {/* Status Dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    id="status-select"
                    readOnly
                    placeholder=" "
                    value={selectedStatus || ""}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
                  />
                  <label
                    htmlFor="status-select"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                  >
                    Status
                  </label>
                  <FiChevronDown
                    className="absolute top-5 right-3 text-gray-500 pointer-events-none"
                    size={16}
                  />
                  {selectedStatus && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStatus("");
                        setShowStatusDropdown(false);
                      }}
                      className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                    >
                      <RiCloseCircleLine size={20} />
                    </button>
                  )}
                  {showStatusDropdown && (
                    <div
                      className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md"
                      ref={statusDropdownRef}
                    >
                      <div
                        key=""
                        tabIndex={0}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedStatus("");
                          setShowStatusDropdown(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setSelectedStatus("");
                            setShowStatusDropdown(false);
                            handleSearch();
                          }
                        }}
                      ></div>
                      {["Completed", "Ongoing"].map((statusOption) => (
                        <div
                          key={statusOption}
                          tabIndex={0}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelectedStatus(statusOption);
                            setShowStatusDropdown(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setSelectedStatus(statusOption);
                              setShowStatusDropdown(false);
                              handleSearch();
                            }
                          }}
                        >
                          {statusOption}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Placement Dropdown */}
                <div className="relative">
                  <input
                    type="text"
                    id="placement-select"
                    readOnly
                    placeholder=" "
                    value={selectedPlacement || ""}
                    onClick={() =>
                      setShowPlacementDropdown(!showPlacementDropdown)
                    }
                    className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
                  />
                  <label
                    htmlFor="placement-select"
                    className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
                  >
                    Placement
                  </label>
                  <FiChevronDown
                    className="absolute top-5 right-3 text-gray-500 pointer-events-none"
                    size={16}
                  />
                  {selectedPlacement && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlacement("");
                        setShowPlacementDropdown(false);
                        handleSearch();
                      }}
                      className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
                    >
                      <RiCloseCircleLine size={20} />
                    </button>
                  )}
                  {showPlacementDropdown && (
                    <div
                      className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md"
                      ref={placementDropdownRef}
                    >
                      <div
                        key=""
                        tabIndex={0}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedPlacement("");
                          setShowPlacementDropdown(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setSelectedPlacement("");
                            setShowPlacementDropdown(false);
                          }
                        }}
                      ></div>
                      {[
                        "Placed",
                        "Yet to Place",
                        "Not Placed",
                        "Not Required",
                      ].map((placementOption) => (
                        <div
                          key={placementOption}
                          tabIndex={0}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelectedPlacement(placementOption);
                            setShowPlacementDropdown(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              setSelectedPlacement(placementOption);
                              setShowPlacementDropdown(false);
                              handleSearch();
                            }
                          }}
                        >
                          {placementOption}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Search and Reset Buttons */}
                <div className="flex gap-2 md:justify-end">
                  <button
                    onClick={handleSearch}
                    className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4] text-white px-5 py-4 rounded-xl text-sm font-semibold"
                  >
                    Search
                  </button>
                  <button
                    onClick={handleReset}
                    className="cursor-pointer bg-[#E8DEF8] hover:bg-[#d1c3ea] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-1"
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
                  <BulkModal />
                </div>
              </div>
            </div>
            {/* ====== TABLE SECTION ====== */}
            {searchInitiated && (
              <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-hidden">
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
                          Email
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          Booking ID
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          Phone No.
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          Mode of Study
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student.bookingId}
                          className="hover:bg-[#F4F3FF] hover:text-gray-900   text-gray-500"
                        >
                          <td className="px-5 text-gray-700 text-center py-3 text-sm whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-5 py-3 text-center  text-sm whitespace-nowrap">
                            {student.name}
                          </td>
                          <td className="px-5 py-3 text-center  text-sm whitespace-nowrap">
                            {student.email}
                          </td>
                          <td className="px-5 py-3 text-center text-sm whitespace-nowrap">
                            {student.bookingId}
                          </td>
                          <td className="px-5 py-3 text-center  text-sm whitespace-nowrap">
                            {student.phone}
                          </td>
                          <td className="px-5 py-3 text-center  text-sm whitespace-nowrap">
                            {student.mode}
                          </td>
                          <td className="px-5 py-3 text-sm whitespace-nowrap">
                            <div className="flex gap-1 items-center justify-center">
                              <button
                                className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setShowViewModal(true);
                                }}
                              >
                                <FiEye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEditStudent(student)}
                                className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                              >
                                <FiEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setDeletingStudent(student);
                                  setDeleteConfirmationInput("");
                                  setDeleteError("");
                                }}
                                className="cursor-pointer p-1 hover:bg-gray-100 rounded "
                              >
                                <FiTrash2 className="h-4 w-4" />
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
          </div>
        ) : activeTab === "Batch Change" ? (
          <BatchChange />
        ) : activeTab === "Opportunities" ? (
          <Opportunity />
        ) : <Scores/>}
      </div>
      {/*View Student Modal*/}
      {selectedStudent && (
        <ViewStudentModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          selectedStudent={selectedStudent}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleCloseDeleteModal}
        >
          <div
            className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Delete Student</h2>
              <button
                onClick={handleCloseDeleteModal}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <div>
              <p className="py-5">
                Enter the exact Booking Id of the student{" "}
                <span className="font-bold">{deletingStudent.bookingId}</span>{" "}
                to delete.
              </p>
            </div>
            {/* Confirmation Input */}
            <div className="relative mb-6">
              <input
                type="text"
                id="delete-confirmation"
                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                placeholder=" "
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                required
              />
              <label
                htmlFor="delete-confirmation"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Booking ID
              </label>
            </div>
            {/* Error Message */}
            {deleteError && (
              <p className="text-red-500 text-sm mb-4">{deleteError}</p>
            )}
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseDeleteModal}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudent}
                className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={handleSearch}
        />
      )}
    </div>
  );
}
