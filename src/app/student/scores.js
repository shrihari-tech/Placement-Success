import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useDataContext } from "../context/dataContext";
import { Toaster, toast } from 'sonner';
import { FiChevronDown, FiEdit, FiTrash2 } from 'react-icons/fi';
import { RiCloseCircleLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";

const Scores = () => {
    const { studentData, updateStudent } = useDataContext();
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedScope, setSelectedScope] = useState("");
    const [filteredScores, setFilteredScores] = useState(studentData);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [showBatchDropdown, setShowBatchDropdown] = useState(false);
    const [showScopeDropdown, setShowScopeDropdown] = useState(false);
    const [showScopeDelete, setShowScopeDelete] = useState(false);
    const [deleteScopConfirmationInput, setDeleteScoreConfirmationInput] = useState("");
    const [deleteScoreError, setDeleteScoreError] = useState("");
    const [editingStudentId, setEditingStudentId] = useState(null);
    const [editedScore, setEditedScore] = useState('');
    const [edits, setEdits] = useState({});
    const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
    const [showSaveConfirmationAll, setSaveConfirmationAll] = useState(false)
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
    const [hasEdits, setHasEdits] = useState(false);
    const [matchedStudentId, setMatchedStudentId] = useState("");

    const tableRef = useRef(null);
    const batchDropdownRef = useRef(null);
    const scoreDropdownRef = useRef(null);

    const batchesNames = useMemo(() => {
        return [...new Set(studentData.map(s => s.batch))];
    }, [studentData]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (batchDropdownRef.current && !batchDropdownRef.current.contains(event.target)) {
                setShowBatchDropdown(false);
            }
            if (scoreDropdownRef.current && !scoreDropdownRef.current.contains(event.target)) {
                setShowScopeDropdown(false);
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
        if (showSaveConfirmation || showCancelConfirmation || showSaveConfirmationAll) return;

        if (editingStudentId !== null) {
            const clickedInsideTable = event.target.closest("table");
            if (!clickedInsideTable) {
                const student = filteredScores.find((s) => s.bookingId === editingStudentId);
                const originalScore =
                    selectedScope === "MileStone-1" ? student.mile1 || "" :
                    selectedScope === "MileStone-2" ? student.mile2 || "" :
                    selectedScope === "MileStone-3" ? student.mile3 || "" :
                    selectedScope === "IRC" ? student.irc || "" :
                    selectedScope === "EPIC" ? student.epic || "" :
                    selectedScope === "Attendance" ? student.attendance || "" : "";

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
}, [editingStudentId, editedScore, filteredScores, selectedScope, showSaveConfirmation, showCancelConfirmation, showSaveConfirmationAll]);

    const handleEditClick = (student, e) => {
        e?.stopPropagation();
        setEditingStudentId(student.bookingId);
        setEditedScore(
            selectedScope === 'MileStone-1' ? student.mile1 || '' :
            selectedScope === 'MileStone-2' ? student.mile2 || '' :
            selectedScope === 'MileStone-3' ? student.mile3 || '' :
            selectedScope === 'IRC' ? student.irc || '' :
            selectedScope === 'EPIC' ? student.epic || '' :
            selectedScope === 'Attendance' ? student.attendance || '' : ''
        );
        setHasEdits(false); // Reset hasEdits when entering edit mode
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
        const updatedScores = filteredScores.map(student => {
            if (student.bookingId === editingStudentId) {
                const updatedStudent = { ...student };
                if (selectedScope === 'MileStone-1') updatedStudent.mile1 = editedScore;
                else if (selectedScope === 'MileStone-2') updatedStudent.mile2 = editedScore;
                else if (selectedScope === 'MileStone-3') updatedStudent.mile3 = editedScore;
                else if (selectedScope === 'IRC') updatedStudent.irc = editedScore;
                else if (selectedScope === 'EPIC') updatedStudent.epic = editedScore;
                else if (selectedScope === 'Attendance') updatedStudent.attendance = editedScore;
                return updatedStudent;
            }
            return student;
        });

        setFilteredScores(updatedScores);
        updateStudent(updatedScores); // Update the context
        setEditingStudentId(null);
        setShowSaveConfirmation(false);
        setEdits(prev => {
            const newEdits = { ...prev };
            delete newEdits[editingStudentId];
            return newEdits;
        });
        setHasEdits(Object.keys(edits).length > 1);
        toast.success("Score updated successfully");
    };

    const cancelSave = () => {
        confirmCancelEdit();
        setShowSaveConfirmation(false);
    };

    const confirmCancelEdit = () => {
        // Get the original score before resetting
        const student = filteredScores.find((s) => s.bookingId === editingStudentId);
        const originalScore = 
            selectedScope === "MileStone-1" ? student.mile1 || "" :
            selectedScope === "MileStone-2" ? student.mile2 || "" :
            selectedScope === "MileStone-3" ? student.mile3 || "" :
            selectedScope === "IRC" ? student.irc || "" :
            selectedScope === "EPIC" ? student.epic || "" :
            selectedScope === "Attendance" ? student.attendance || "" : "";

        setEditedScore(originalScore);
        setEditingStudentId(null);
        setShowCancelConfirmation(false);

        // Also remove any pending edits for this student
        setEdits(prev => {
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
            return (
                <input
                    type="text"
                    value={editedScore}
                    onChange={(e) => {
                        const newScore = e.target.value;
                        setEditedScore(newScore);
                        setEdits(prev => ({
                            ...prev,
                            [student.bookingId]: { score: newScore }
                        }));
                        setHasEdits(true); // Set hasEdits to true when editing
                    }}
                    className="w-12 px-2 py-1 rounded text-center border-2 border-[#6750A4] appearance-none outline-none"
                    autoFocus
                />
            );
        } else {
            const pendingEdit = edits[student.bookingId];
            if (pendingEdit) {
                return <span className="text-purple-700 font-bold">{pendingEdit.score}</span>;
            }
            return (
                selectedScope === 'MileStone-1' ? student.mile1 || "N/A" :
                selectedScope === 'MileStone-2' ? student.mile2 || "N/A" :
                selectedScope === 'MileStone-3' ? student.mile3 || "N/A" :
                selectedScope === 'IRC' ? student.irc || "N/A" :
                selectedScope === 'EPIC' ? student.epic || "N/A" :
                selectedScope === 'Attendance' ? student.attendance || "N/A" : "N/A"
            );
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

        const updatedScores = filteredScores.map(student => {
            if (edits[student.bookingId]) {
                const updatedStudent = { ...student };
                const newScore = edits[student.bookingId].score;

                if (selectedScope === 'MileStone-1') updatedStudent.mile1 = newScore;
                else if (selectedScope === 'MileStone-2') updatedStudent.mile2 = newScore;
                else if (selectedScope === 'MileStone-3') updatedStudent.mile3 = newScore;
                else if (selectedScope === 'IRC') updatedStudent.irc = newScore;
                else if (selectedScope === 'EPIC') updatedStudent.epic = newScore;
                else if (selectedScope === 'Attendance') updatedStudent.attendance = newScore;

                return updatedStudent;
            }
            return student;
        });

        setFilteredScores(updatedScores);
        updateStudent(updatedScores); // Update the context
        setEdits({});
        setHasEdits(false);
        setEditingStudentId(null);
        setSaveConfirmationAll(false);
        toast.success("All changes saved successfully");
    };

    const handleCancelAll = () => {
        setEditingStudentId(null);
        setEdits({});
        setHasEdits(false);
        setSaveConfirmationAll(false)
    };

    const handleScoreSearch = useCallback(() => {
        if (selectedBatch === '' || selectedScope === '') {
            toast.error("Please select Both option to search");
            return;
        }
        let results = studentData.filter((student) => student.batch === selectedBatch);
        setFilteredScores(results);
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
        const studentIndex = filteredScores.findIndex(student => student.bookingId === bookingId);
        setMatchedStudentId();

        if (studentIndex === -1) {
            setDeleteScoreError("Booking ID not found.");
            return;
        }

        const updatedScores = [...filteredScores];
        if (selectedScope === 'MileStone-1') {
            updatedScores[studentIndex].mile1 = 0;
        } else if (selectedScope === 'MileStone-2') {
            updatedScores[studentIndex].mile2 = 0;
        } else if (selectedScope === 'MileStone-3') {
            updatedScores[studentIndex].mile3 = 0;
        } else if (selectedScope === 'IRC') {
            updatedScores[studentIndex].irc = 0;
        } else if (selectedScope === 'Attendance') {
            updatedScores[studentIndex].attendance = 0;
        }

        setFilteredScores(updatedScores);
        updateStudent(updatedScores); // Update the context
        setShowScopeDelete(false);
        setDeleteScoreConfirmationInput("");
        toast.success("Score deleted successfully");
    };
 

    return (
        <div>
            <Toaster position="top-right" />
            <div className="bg-[#F4F3FF] py-3 rounded-xl" ref={tableRef}
              
            >
                <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
                    {/* Batch Dropdown */}
                    <div className="relative" ref={batchDropdownRef}>
                        <input
                            type="text"
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
                        <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                            Batch
                        </label>
                        <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
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
                            onChange={(e) => {
                                setSelectedScope(e.target.value);
                                setShowScopeDropdown(true);
                            }}
                            onClick={() => setShowScopeDropdown(!showScopeDropdown)}
                            className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
                            autoComplete="off"
                        />
                        <label className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-6">
                            Scope
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
                        <FiChevronDown className="absolute top-5 right-3 text-gray-500 pointer-events-none" size={16} />
                        {showScopeDropdown && (
                            <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md">
                                {["MileStone-1", "MileStone-2", "MileStone-3", "IRC", "EPIC", "Attendance"].map((scopeOption) => (
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
                            Search
                        </button>
                        <button
                            onClick={handleScoreReset}
                            className="cursor-pointer bg-[#E8DEF8] hover:bg-[#d1c3ea] px-4 py-4 rounded-xl text-sm font-semibold text-gray-700 flex items-center gap-1"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Display Filtered Scores */}
            {searchInitiated && (
                <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-hidden">
                    <div className="w-full max-w-full overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">S.No</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone No.</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                        {selectedScope || "Score"}
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredScores.map((student, index) => (
                                    <tr key={student.bookingId} className="hover:bg-[#e1cfff] hover:text-[#4005a0]">
                                        <td className="px-4 text-gray-700 text-center py-3 text-sm whitespace-nowrap">{index + 1}</td>
                                        <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">{student.name}</td>
                                        <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">{student.email}</td>
                                        <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">{student.bookingId}</td>
                                        <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">{student.phone}</td>
                                        <td className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">
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
                {/* Save All / Cancel All Buttons */}
{hasEdits && Object.keys(edits).length > 1 && (
    <tr>
        <td colSpan={7} className="px-4 py-3 text-center text-gray-700 text-sm whitespace-nowrap">
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleCancelAll}
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleScopeCloseDeleteModal}>
                    <div className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-m font-medium">Delete Score</h2>
                            <button onClick={handleScopeCloseDeleteModal} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                <RiCloseCircleLine size={20} />
                            </button>
                        </div>
                        <div className='mb-4'>
                            <p className='py-5'>Enter the exact Booking Id of the student <span className='font-bold'>{matchedStudentId}</span> to delete.</p>
                        </div>
                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="delete-confirmation"
                                className="block px-4 pb-2 pt-5 w-full text-sm text-gray-900 bg-[#F8FAFD] rounded-sm border-2 border-gray-400 appearance-none focus:outline-none focus:border-[#6750A4] peer"
                                placeholder=" "
                                value={deleteScopConfirmationInput}
                                onChange={(e) => setDeleteScoreConfirmationInput(e.target.value)}
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
                            <button onClick={cancelSave} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                <RiCloseCircleLine size={20} />
                            </button>
                        </div>
                        <p className="mb-6">Are you sure you want to save these changes?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={cancelSave} className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium">
                                Cancel
                            </button>
                            <button onClick={confirmSave} className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium">
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
                            <button onClick={handleCancelAll} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                <RiCloseCircleLine size={20} />
                            </button>
                        </div>
                        <p className="mb-6">Are you sure you want to save All these changes?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={handleCancelAll} className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium">
                                Cancel
                            </button>
                            <button onClick={ConfirmSaveAll} className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium">
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
                            <button onClick={cancelCancelEdit} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                <RiCloseCircleLine size={20} />
                            </button>
                        </div>
                        <p className="mb-6">You have unsaved changes. Are you sure you want to cancel?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={cancelCancelEdit} className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium">
                                Continue Editing
                            </button>
                            <button onClick={confirmCancelEdit} className="cursor-pointer bg-[#6750a4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium">
                                Discard Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scores;