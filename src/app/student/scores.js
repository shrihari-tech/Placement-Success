import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDataContext } from "../context/dataContext";
import { Toaster, toast } from "sonner";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { FiChevronDown, FiEdit, FiTrash2 } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";

const Scores = () => {
  const { studentData, updateStudent } = useDataContext();
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedScope, setSelectedScope] = useState("");
  const [filteredScores, setFilteredScores] = useState([]);
  const [appliedScope, setAppliedScope] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [showScopeDelete, setShowScopeDelete] = useState(false);
  const [deleteScopConfirmationInput, setDeleteScoreConfirmationInput] =
    useState("");
  const [deleteScoreError, setDeleteScoreError] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedScore, setEditedScore] = useState("");
  const [edits, setEdits] = useState({});
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showSaveConfirmationAll, setSaveConfirmationAll] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [hasEdits, setHasEdits] = useState(false);
  const [matchedStudentId, setMatchedStudentId] = useState("");
  const [clearAllConfirmation, setClearAllConfirmation] = useState(false);
  const [editEPIC, setEditEPIC] = useState(false);
  const [epicDropdownPosition, setEpicDropdownPosition] = useState({
    left: 0,
    top: 0,
  });

  const tableRef = useRef(null);
  const batchDropdownRef = useRef(null);
  const scoreDropdownRef = useRef(null);
  const EPIC_OPTIONS = ["Excellent", "Capable", "Ideal", "Proficient"];

  const batchesNames = useMemo(() => {
    return [...new Set(studentData.map((s) => s.batch))];
  }, [studentData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        batchDropdownRef.current &&
        !batchDropdownRef.current.contains(event.target)
      ) {
        setShowBatchDropdown(false);
      }
      if (
        scoreDropdownRef.current &&
        !scoreDropdownRef.current.contains(event.target)
      ) {
        setShowScopeDropdown(false);
      }
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setShowScopeDelete(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don’t interrupt when modals are open
      if (
        showSaveConfirmation ||
        showCancelConfirmation ||
        showSaveConfirmationAll ||
        clearAllConfirmation
      )
        return;

      if (editingStudentId !== null) {
        const clickedInsideTable = event.target.closest("table");
        if (!clickedInsideTable) {
          const student = filteredScores.find(
            (s) => s.bookingId === editingStudentId
          );
          const originalScore =
            appliedScope === "MileStone-1"
              ? student.mile1 || ""
              : appliedScope === "MileStone-2"
              ? student.mile2 || ""
              : appliedScope === "MileStone-3"
              ? student.mile3 || ""
              : appliedScope === "IRC"
              ? student.irc || ""
              : appliedScope === "EPIC"
              ? student.epicStatus || ""
              : appliedScope === "Attendance"
              ? student.attendance || ""
              : "";

          // Only show confirmation if changes were made
          if (editedScore !== originalScore) {
            setShowCancelConfirmation(true);
          } else {
            setEditingStudentId(null); // No change, so silently exit edit mode
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    editingStudentId,
    editedScore,
    filteredScores,
    selectedScope,
    showSaveConfirmation,
    showCancelConfirmation,
    showSaveConfirmationAll,
    clearAllConfirmation,
  ]);

  const handleEditClick = (student, e) => {
    e?.stopPropagation();
    setEditingStudentId(student.bookingId);
    setEditedScore(
      appliedScope === "MileStone-1"
        ? student.mile1 || ""
        : appliedScope === "MileStone-2"
        ? student.mile2 || ""
        : appliedScope === "MileStone-3"
        ? student.mile3 || ""
        : appliedScope === "IRC"
        ? student.irc || ""
        : appliedScope === "EPIC"
        ? student.epicStatus || ""
        : appliedScope === "Attendance"
        ? student.attendance || ""
        : ""
    );
    setHasEdits(false);
  };

  const handleSaveClick = (e) => {
    e?.stopPropagation();
    setShowSaveConfirmation(true);
  };

  const handleSaveAll = (e) => {
    e?.stopPropagation();
    setSaveConfirmationAll(true);
  };

  const confirmSave = () => {
    if (!editingStudentId || editedScore === undefined) return;

    const studentToEdit = studentData.find(
      (s) => s.bookingId === editingStudentId
    );
    if (!studentToEdit) {
      toast.error("Student data not found.");
      return;
    }

    let updatedFields = {};
    switch (appliedScope) {
      case "MileStone-1":
        updatedFields.mile1 = editedScore;
        break;
      case "MileStone-2":
        updatedFields.mile2 = editedScore;
        break;
      case "MileStone-3":
        updatedFields.mile3 = editedScore;
        break;
      case "IRC":
        updatedFields.irc = editedScore;
        break;
      case "EPIC":
        updatedFields.epicStatus = editedScore;
        break;
      case "Attendance":
        updatedFields.attendance = editedScore;
        break;
      default:
        toast.error("Invalid scope for update.");
        return;
    }
    updateStudent(editingStudentId, updatedFields);

    setFilteredScores((prevScores) =>
      prevScores.map((student) =>
        student.bookingId === editingStudentId
          ? { ...student, ...updatedFields }
          : student
      )
    );

    // Reset editing state
    setEditingStudentId(null);
    setShowSaveConfirmation(false);
    setEdits((prev) => {
      const newEdits = { ...prev };
      delete newEdits[editingStudentId];
      return newEdits;
    });
    // Update hasEdits correctly - check if any edits remain AFTER deleting the current one
    setHasEdits(
      Object.keys(edits).filter((id) => id !== editingStudentId).length > 0
    );

    toast.success("Score updated successfully");
  };

  const cancelSave = () => {
    confirmCancelEdit();
    setShowSaveConfirmation(false);
  };

  const confirmCancelEdit = () => {
    // Get the original score before resetting
    const student = filteredScores.find(
      (s) => s.bookingId === editingStudentId
    );
    const originalScore =
      appliedScope === "MileStone-1"
        ? student.mile1 || ""
        : appliedScope === "MileStone-2"
        ? student.mile2 || ""
        : appliedScope === "MileStone-3"
        ? student.mile3 || ""
        : appliedScope === "IRC"
        ? student.irc || ""
        : appliedScope === "EPIC"
        ? student.epicStatus || ""
        : appliedScope === "Attendance"
        ? student.attendance || ""
        : "";

    setEditedScore(originalScore);
    setEditingStudentId(null);
    setShowCancelConfirmation(false);
    setEdits((prev) => {
      const newEdits = { ...prev };
      delete newEdits[editingStudentId];
      return newEdits;
    });
  };

  const cancelCancelEdit = () => {
    setShowCancelConfirmation(false);
  };

  const renderScoreCell = (student) => {
    if (editingStudentId === student.bookingId) {
      // Special handling for EPIC scores
      if (appliedScope === "EPIC") {
        return (
          <div className="relative" style={{ minWidth: "100px" }}>
            <input
              type="text"
              placeholder=" "
              value={editedScore}
              readOnly
              onClick={(e) => {
                setEditEPIC(!editEPIC);
                const rect = e.currentTarget.getBoundingClientRect();
                setEpicDropdownPosition({
                  left: rect.left,
                  top: rect.bottom,
                });
              }}
              className="block px-2 text-sm w-[100px] text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              autoComplete="off"
            />
            {editEPIC && (
              <div
                className="fixed z-50 text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md"
                style={{
                  left: `${epicDropdownPosition.left}px`,
                  top: `${epicDropdownPosition.top}px`,
                  minWidth: "100px",
                }}
              >
                {EPIC_OPTIONS.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setEditedScore(option);
                      setEdits((prev) => ({
                        ...prev,
                        [student.bookingId]: { score: option },
                      }));
                      setHasEdits(true);
                      setEditEPIC(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      // Existing numeric input handling for other score types
      return (
        <input
          type="text"
          maxLength={3}
          value={editedScore}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!/^\d*$/.test(inputValue)) return;
            const numericValue =
              inputValue === "" ? NaN : parseInt(inputValue, 10);
            if (
              inputValue === "" ||
              (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100)
            ) {
              const newScore =
                inputValue === ""
                  ? ""
                  : String(Math.min(100, Math.max(0, numericValue)));
              setEditedScore(newScore);
              setEdits((prev) => ({
                ...prev,
                [student.bookingId]: { score: newScore },
              }));
              setHasEdits(true);
            }
          }}
          className="w-12 px-2 py-1 rounded text-center border-2 border-[#6750A4] appearance-none outline-none"
          autoFocus
        />
      );
    } else {
      const pendingEdit = edits[student.bookingId];
      if (pendingEdit) {
        return (
          <span className="text-purple-700 font-bold">{pendingEdit.score}</span>
        );
      }
      return appliedScope === "MileStone-1"
        ? student.mile1 || "N/A"
        : appliedScope === "MileStone-2"
        ? student.mile2 || "N/A"
        : appliedScope === "MileStone-3"
        ? student.mile3 || "N/A"
        : appliedScope === "IRC"
        ? student.irc || "N/A"
        : appliedScope === "EPIC"
        ? student.epicStatus || "N/A"
        : appliedScope === "Attendance"
        ? student.attendance || "N/A"
        : "N/A";
    }
  };

  const renderActionButtons = (student) => {
    if (editingStudentId === student.bookingId) {
      return (
        <button
          className="cursor-pointer p-1 hover:bg-gray-100 rounded"
          onClick={(e) => handleSaveClick(e)}
        >
          <FaRegSave className="h-4 w-4" />
        </button>
      );
    } else {
      return (
        <button
          className="cursor-pointer p-1 hover:bg-gray-100 rounded"
          onClick={(e) => handleEditClick(student, e)}
        >
          <FiEdit className="h-4 w-4" />
        </button>
      );
    }
  };

  const ConfirmSaveAll = () => {
    if (Object.keys(edits).length === 0) {
      toast.info("No changes to save");
      return;
    }

    Object.entries(edits).forEach(([bookingId, editData]) => {
      let updatedFields = {};
      const newScore = editData.score;

      if (appliedScope === "MileStone-1") updatedFields.mile1 = newScore;
      else if (appliedScope === "MileStone-2") updatedFields.mile2 = newScore;
      else if (appliedScope === "MileStone-3") updatedFields.mile3 = newScore;
      else if (appliedScope === "IRC") updatedFields.irc = newScore;
      else if (appliedScope === "EPIC") updatedFields.epicStatus = newScore;
      else if (appliedScope === "Attendance")
        updatedFields.attendance = newScore;
      else {
        console.error(
          "Invalid scope for update in ConfirmSaveAll:",
          appliedScope
        );
        toast.error(`Invalid scope for student ${bookingId}`);
        return;
      }
      updateStudent(bookingId, updatedFields);
    });
    setFilteredScores((prevScores) =>
      prevScores.map((student) => {
        if (edits[student.bookingId]) {
          // Apply the edit to the UI representation
          const updatedStudent = { ...student };
          const newScore = edits[student.bookingId].score;
          if (appliedScope === "MileStone-1") updatedStudent.mile1 = newScore;
          else if (appliedScope === "MileStone-2")
            updatedStudent.mile2 = newScore;
          else if (appliedScope === "MileStone-3")
            updatedStudent.mile3 = newScore;
          else if (appliedScope === "IRC") updatedStudent.irc = newScore;
          else if (appliedScope === "EPIC")
            updatedStudent.epicStatus = newScore;
          else if (appliedScope === "Attendance")
            updatedStudent.attendance = newScore;
          return updatedStudent;
        }
        return student;
      })
    );

    // Clear the edits state and related flags after processing
    setEdits({});
    setHasEdits(false);
    setEditingStudentId(null);
    setSaveConfirmationAll(false); // Close the confirmation modal

    toast.success("All changes saved successfully");
  };

  const handleCancelAll = () => {
    setEditingStudentId(null);
    setEdits({});
    setHasEdits(false);
    setSaveConfirmationAll(false);
    setClearAllConfirmation(false);
  };

  const handleScoreSearch = useCallback(() => {
    if (selectedBatch === "" || selectedScope === "") {
      toast.error("Please select Both option to search");
      return;
    }

    const results = studentData.filter(
      (student) => student.batch === selectedBatch
    );
    setFilteredScores(results);
    setAppliedScope(selectedScope);
    setSearchInitiated(true);
  }, [studentData, selectedBatch, selectedScope]);

  useEffect(() => {
    const handleSearchGlobalKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleScoreSearch();
      }
    };

    window.addEventListener("keydown", handleSearchGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleSearchGlobalKeyDown);
    };
  }, [handleScoreSearch]);

  const handleScoreReset = () => {
    setSelectedBatch("");
    setSelectedScope("");
    setFilteredScores(studentData);
    setSearchInitiated(false);
    setEdits({});
    setHasEdits(false);
  };

  const handleScopeCloseDeleteModal = () => {
    setShowScopeDelete(false);
    setDeleteScoreConfirmationInput("");
    setDeleteScoreError("");
  };

  const handleDeleteScope = () => {
    if (deleteScopConfirmationInput.trim() === "") {
      setDeleteScoreError("Please enter the Booking ID to confirm deletion.");
      return;
    }
    const bookingId = deleteScopConfirmationInput.trim();
    const studentIndexInContext = studentData.findIndex(
      (student) => student.bookingId === bookingId
    );

    if (studentIndexInContext === -1) {
      setDeleteScoreError("Booking ID not found in the current domain.");
      return;
    }
    const studentToDelete = studentData[studentIndexInContext];
    setMatchedStudentId(studentToDelete.bookingId);
    let updatedFields = {};
    if (appliedScope === "MileStone-1") updatedFields.mile1 = 0;
    else if (appliedScope === "MileStone-2") updatedFields.mile2 = 0;
    else if (appliedScope === "MileStone-3") updatedFields.mile3 = 0;
    else if (appliedScope === "IRC") updatedFields.irc = 0;
    else if (appliedScope === "EPIC") updatedFields.epicStatus = 0;
    else if (appliedScope === "Attendance") updatedFields.attendance = 0;
    else {
      toast.error("Invalid scope for deletion.");
      return;
    }
    updateStudent(bookingId, updatedFields);

    const studentIndexInFiltered = filteredScores.findIndex(
      (student) => student.bookingId === bookingId
    );
    if (studentIndexInFiltered !== -1) {
      const updatedScores = [...filteredScores];
      // Apply the update to the filtered list for UI
      if (appliedScope === "MileStone-1")
        updatedScores[studentIndexInFiltered].mile1 = 0;
      else if (appliedScope === "MileStone-2")
        updatedScores[studentIndexInFiltered].mile2 = 0;
      else if (appliedScope === "MileStone-3")
        updatedScores[studentIndexInFiltered].mile3 = 0;
      else if (appliedScope === "IRC")
        updatedScores[studentIndexInFiltered].irc = 0;
      else if (appliedScope === "EPIC")
        updatedScores[studentIndexInFiltered].epicStatus = 0;
      else if (appliedScope === "Attendance")
        updatedScores[studentIndexInFiltered].attendance = 0;

      setFilteredScores(updatedScores);
    }
    setShowScopeDelete(false);
    setDeleteScoreConfirmationInput("");
    setDeleteScoreError("");
    toast.success("Score deleted successfully");
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="bg-[#ffffff] py-3 rounded-xl" ref={tableRef}>
        <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
          {/* Batch Dropdown */}
          <div className="relative" ref={batchDropdownRef}>
            <input
              type="text"
              placeholder=" "
              value={selectedBatch}
              maxLength={16}
              onChange={(e) => {
                setSelectedBatch(e.target.value);
                setShowBatchDropdown(true);
              }}
              onClick={() => setShowBatchDropdown(!showBatchDropdown)}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              autoComplete="off"
            />
            <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
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
              <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md">
                {batchesNames.map((batchName) => (
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

          {/* Scope Dropdown */}
          <div className="relative" ref={scoreDropdownRef}>
            <input
              type="text"
              placeholder=" "
              value={selectedScope}
              maxLength={16}
              onChange={(e) => {
                setSelectedScope(e.target.value);
                setShowScopeDropdown(true);
              }}
              onClick={() => setShowScopeDropdown(!showScopeDropdown)}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#ffffff] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              autoComplete="off"
            />
            <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#ffffff] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
              Score
            </label>
            {selectedScope && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedScope("");
                  setShowScopeDropdown(false);
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {showScopeDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md">
                {[
                  "MileStone-1",
                  "MileStone-2",
                  "MileStone-3",
                  "IRC",
                  "EPIC",
                  "Attendance",
                ].map((scopeOption) => (
                  <div
                    key={scopeOption}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedScope(scopeOption);
                      setShowScopeDropdown(false);
                    }}
                  >
                    {scopeOption}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search and Reset Buttons */}
          <div className="flex gap-2 md:justify-end">
            <button
              onClick={handleScoreSearch}
              className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4e7] text-white px-5 py-4 rounded-xl text-sm font-semibold"
            >
              <FaSearch className="inline-block" /> Search
            </button>
            <button
              onClick={handleScoreReset}
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
          </div>
        </div>
      </div>

      {/* Display Filtered Scores */}
      {searchInitiated && (
        <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-hidden">
          <div className="w-full max-w-full overflow-visible">
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
                    {appliedScope || "Score"}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredScores.map((student, index) => (
                  <tr
                    key={student.bookingId}
                    className="hover:bg-[#f4f3ff] hover:text-gray-900 text-gray-500"
                  >
                    <td className="px-4 text-gray-700 text-center py-3 text-sm whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-center  text-sm whitespace-nowrap">
                      {student.name}
                    </td>
                    <td className="px-4 py-3 text-center  text-sm whitespace-nowrap">
                      {student.email}
                    </td>
                    <td className="px-4 py-3 text-center  text-sm whitespace-nowrap">
                      {student.bookingId}
                    </td>
                    <td className="px-4 py-3 text-center  text-sm whitespace-nowrap">
                      {student.phone}
                    </td>
                    <td className="px-4 py-3 text-center  text-sm whitespace-nowrap">
                      {renderScoreCell(student)}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <div className="flex gap-1 items-center justify-center">
                        {renderActionButtons(student)}
                        <button
                          onClick={() => {
                            setMatchedStudentId(student.bookingId);
                            setShowScopeDelete(true);
                          }}
                          className="cursor-pointer p-1 hover:bg-gray-100 rounded text-black"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Save All / Cancel All Buttons */}
                {hasEdits && Object.keys(edits).length > 1 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap"
                    >
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setClearAllConfirmation(true)}
                          className="cursor-pointer bg-[#E8DEF8] hover:bg-[#d1c3ea] px-4 py-2 rounded-xl text-sm font-semibold text-gray-700"
                        >
                          Cancel All
                        </button>
                        <button
                          onClick={handleSaveAll}
                          className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4e7] text-white px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                          Save All
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showScopeDelete && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleScopeCloseDeleteModal}
        >
          <div
            className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-m font-medium">Delete Score</h2>
              <button
                onClick={handleScopeCloseDeleteModal}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <div className="mb-4">
              <p className="py-5">
                Enter the exact Booking Id of the student{" "}
                <span className="font-bold">{matchedStudentId}</span> to delete.
              </p>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                id="delete-confirmation"
                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                placeholder=" "
                value={deleteScopConfirmationInput}
                onChange={(e) =>
                  setDeleteScoreConfirmationInput(e.target.value)
                }
                required
              />
              <label
                htmlFor="delete-confirmation"
                className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F8FAFD] transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6"
              >
                Booking ID
              </label>
            </div>
            {deleteScoreError && (
              <p className="text-red-500 text-sm mb-4">{deleteScoreError}</p>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleScopeCloseDeleteModal}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteScope}
                className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {showSaveConfirmation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[400px] bg-[#F8FAFD] rounded-[10px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Confirm Save</h2>
              <button
                onClick={cancelSave}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to save these changes?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelSave}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saveall Confirmation Modal */}
      {showSaveConfirmationAll && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[400px] bg-[#F8FAFD] rounded-[10px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Confirm Save</h2>
              <button
                onClick={handleCancelAll}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <p className="mb-6">
              Are you sure you want to save All these changes?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelAll}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={ConfirmSaveAll}
                className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[400px] bg-[#F8FAFD] rounded-[10px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Unsaved Changes</h2>
              <button
                onClick={cancelCancelEdit}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <p className="mb-6">
              You have unsaved changes. Are you sure you want to cancel?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelCancelEdit}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Continue Editing
              </button>
              <button
                onClick={confirmCancelEdit}
                className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conform clearAll model */}
      {clearAllConfirmation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[400px] bg-[#F8FAFD] rounded-[10px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Confirm Clear All</h2>
              <button
                onClick={() => setClearAllConfirmation(false)}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to clear all scores?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setClearAllConfirmation(false)}
                className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCancelAll}
                className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scores;
