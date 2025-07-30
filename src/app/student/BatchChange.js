"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../context/dataContext"; 
import { Toaster, toast } from "sonner";
import Image from "next/image";

const BatchChange = () => {
  // Track domain errors for each student row
  const [domainErrors, setDomainErrors] = useState({});
  const { batchData, allBatchNames, allStudentData , updateStudent } =
    useDataContext(); //

  const [fromBatch, setFromBatch] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [toBatch, setToBatch] = useState("");
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [searchTermTo, setSearchTermTo] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isReasonEmpty, setIsReasonEmpty] = useState(false);
  const [reasonError, setReasonError] = useState("");
  const [isAttachmentEmpty, setIsAttachmentEmpty] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [EditDiscarddModel , setEditDiscarddModel] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const getDomainFromBatch = (batch) => {
    const code = batch.toUpperCase();
    if (code.startsWith("FS")) return "Full Stack Development";
    if (code.startsWith("DA")) return "Data Analytics & Science";
    if (code.startsWith("BK")) return "Banking & Financial Services";
    if (code.startsWith("MK")) return "Digital Marketing";
    if (code.startsWith("SAP")) return "SAP";
    if (code.startsWith("DV")) return "DevOps";
    return "";
  };

  const batchList = useMemo(() => {
    return allBatchNames ? allBatchNames.sort() : [];
  }, [allBatchNames]);


  const filteredFromBatches = useMemo(() => {
    return batchList.filter(
      (batch) =>
        !searchTermFrom ||
        batch.toLowerCase().includes(searchTermFrom.toLowerCase())
    );
  }, [batchList, searchTermFrom]);

  const filteredToBatches = useMemo(() => {
    return batchList.filter(
      (batch) =>
        batch !== fromBatch &&
        (!searchTermTo ||
          batch.toLowerCase().includes(searchTermTo.toLowerCase()))
    );
  }, [batchList, fromBatch, searchTermTo]);

  const filteredStudents = useMemo(() => {
    if (!fromBatch) return [];
    return allStudentData.filter(
      (s) => (s.batch || s.batchNo)?.toLowerCase() === fromBatch.toLowerCase()
    );
  }, [allStudentData , toBatch]);

  const handleRefresh = () => {
    setFromBatch("");
    setToBatch("");
    setSearchTermFrom("");
    setSearchTermTo("");
    setShowTable(false);
    setReason("");
    setAttachment(null);
    setEditDiscarddModel(false);
    setSelectedStudents([]);};

  const handleSearch = useCallback(() => {
    if (!fromBatch || !toBatch) {
      toast.error("Please select both From and To batches");
      return;
    }
    if (fromBatch === toBatch) {
      toast.error("From and To batch cannot be the same");
      return;
    }
    setShowTable(true);
  }, [fromBatch, toBatch]);

  useEffect(() => {
    const handleSearchGlobalKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    };

    window.addEventListener("keydown", handleSearchGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleSearchGlobalKeyDown);
    };
  }, [handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleBatchchangeSubmit = () => {
    // --- Validation ---
    if (!reason.trim() && !attachment) {
      toast.error("Please enter a reason or attach an image before submitting.");
      setIsReasonEmpty(true);
      setReasonError("Please enter a reason for the batch change");
      setIsAttachmentEmpty(true);
      setAttachmentError("Please attach an image before submitting.");
      return;
    }
    else if (!reason.trim()) {
      toast.error("Please enter a reason for the batch change.");
      setIsReasonEmpty(true);
      setReasonError("Please enter a reason for the batch change");
      return;
    } else if (!attachment) {
      toast.error("Please attach an image before submitting.");
      setIsAttachmentEmpty(true);
      setAttachmentError("Please attach an image before submitting.");
      return;
    }
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student to change the batch.");
      return;
    }
    selectedStudents.forEach((bookingId) => {
      const studentToUpdate = filteredStudents.find(s => s.bookingId === bookingId);
      if (studentToUpdate) {
         const updatedStudentData = { ...studentToUpdate, batch: toBatch }; 
         updateStudent(bookingId, updatedStudentData);
      }
    });

    // --- Success Feedback & Reset ---
    toast.success("Batch change request submitted successfully!");
    
    // Clear form fields
    setReason("");
    setAttachment(null);
    
    // Clear errors
    handleRefresh();
    setReasonError("");
    setIsReasonEmpty(false);
    handleRefresh();
    setAttachmentError("");
    setIsAttachmentEmpty(false);
    setShowConfirmModal(false);
    setSelectedStudents([]); 
  }

  const handleDiscard = () => {
    if (reason || attachment || selectedStudents.length > 0) {
      setEditDiscarddModel(true);
    } else {
      handleRefresh();
      setEditDiscarddModel(false);
    }
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="bg-[#F4F3FF] py-3 rounded-xl">
        <div className="flex flex-row justify-center flex-wrap gap-5 py-3">
          {/* From Batch Dropdown */}
          <div className="relative" ref={fromRef}>
            <input
              type="text"
              id="from-batch"
              placeholder=" "
              value={fromBatch}
              onChange={(e) => {
                setSearchTermFrom(e.target.value);
                setFromBatch(e.target.value);
                setShowFromDropdown(true);
              }}
              onClick={() => setShowFromDropdown(!showFromDropdown)}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              autoComplete="off"
            />
            <label
              htmlFor="from-batch"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6"
            >
              From Batch
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {fromBatch && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFromBatch("");
                  setSearchTermFrom("");
                  setShowFromDropdown(false);
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showFromDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {/* Changed from allbatchName.map to filteredFromBatches.map */}
                {filteredFromBatches.map((batch) => (
                  <div
                    key={batch}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setFromBatch(batch);
                      setSearchTermFrom(batch);
                      setShowFromDropdown(false);
                    }}
                  >
                    {batch}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* To Batch Dropdown */}
          <div className="relative" ref={toRef}>
            <input
              type="text"
              id="to-batch"
              placeholder=" "
              value={toBatch}
              onChange={(e) => {
                setSearchTermTo(e.target.value);
                setToBatch(e.target.value);
                setShowToDropdown(true);
              }}
              onClick={() => setShowToDropdown(!showToDropdown)}
              className="block px-4 pb-2 pt-5 w-[200px] text-sm text-gray-900 bg-[#F4F3FF] rounded-sm border-2 border-gray-400 focus:outline-none focus:border-[#6750A4] peer cursor-pointer"
              autoComplete="off"
            />
            <label
              htmlFor="to-batch"
              className="absolute px-2 text-sm text-gray-500 duration-300 bg-[#F4F3FF] transform -translate-y-4 scale-75 top-4 z-5 origin-[0] left-4 peer-focus:text-xs peer-focus:text-[#6750A4] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6"
            >
              To Batch
            </label>
            <FiChevronDown
              className="absolute top-5 right-3 text-gray-500 pointer-events-none"
              size={16}
            />
            {toBatch && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setToBatch("");
                  setSearchTermTo("");
                  setShowToDropdown(false);
                }}
                className="cursor-pointer absolute top-4 right-8 text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            )}
            {showToDropdown && (
              <div className="absolute z-10 w-full text-sm bg-[#f3edf7] border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {/* Changed from allbatchName.filter(...).map to filteredToBatches.map */}
                {filteredToBatches.map((batch) => (
                  <div
                    key={batch}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setToBatch(batch);
                      setSearchTermTo(batch);
                      setShowToDropdown(false);
                    }}
                  >
                    {batch}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-end">
            <button
              className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4e7] text-white px-5 py-4 rounded-xl text-sm font-semibold"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              onClick={handleRefresh}
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

      {showTable && (
        <>
          <div className="bg-white rounded-2xl shadow-sm mt-6 w-full overflow-x-auto">
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
                    Booking ID
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Domain
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.bookingId}
                    className="hover:bg-[#f4f3ff] hover:text-[#4005a0]"
                  >
                    <td className="px-4 text-center py-3 text-sm whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      {student.name}
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      {student.bookingId}
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      <label className="relative inline-block">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.bookingId)}
                          onChange={(e) => {
                            const bookingId = student.bookingId; // Get the ID of the student for this row
                            if (e.target.checked) {
                              // If checkbox is checked, add the bookingId to the array
                              setSelectedStudents(prevSelected => [...prevSelected, bookingId]);
                            } else {
                              // If checkbox is unchecked, remove the bookingId from the array
                              setSelectedStudents(prevSelected =>
                                prevSelected.filter(id => id !== bookingId)
                              );
                            }
                          }}
                          className="peer hidden"
                          id="customCheck"
                        />
                        <span className="block h-5 w-5 border-2 border-gray-500 rounded-sm peer-checked:bg-[#6750A4] peer-checked:border-[#6750A4] cursor-pointer transition"></span>
                        <svg
                          className="absolute left-[2px] top-[2px] w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </label>
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      <div className="flex flex-col items-center">
                        <select
                          className={`border rounded px-2 py-1 text-sm ${
                            domainErrors[student.bookingId]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          value={(() => getDomainFromBatch(toBatch))()} // always show the correct one
                          onChange={(e) => {
                            const selectedDomain = e.target.value;
                            const correctDomain = getDomainFromBatch(toBatch);

                            if (selectedDomain !== correctDomain) {
                              setDomainErrors((prev) => ({
                                ...prev,
                                [student.bookingId]: true,
                              }));
                            } else {
                              setDomainErrors((prev) => {
                                const updated = { ...prev };
                                delete updated[student.bookingId];
                                return updated;
                              });
                            }
                          }}
                        >
                          {[
                            "Full Stack Development",
                            "Data Analytics & Science",
                            "Banking & Financial Services",
                            "Digital Marketing",
                            "SAP",
                            "DevOps",
                          ].map((option) => (
                            <option
                              key={option}
                              value={option}
                              disabled={option !== getDomainFromBatch(toBatch)}
                            >
                              {option}
                            </option>
                          ))}
                        </select>

                        {domainErrors[student.bookingId] && (
                          <span className="text-red-500 text-xs mt-1">
                            The transfer batch name and the domain should be
                            same
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-white p-4 rounded-xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <textarea
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onFocus={() => setIsReasonEmpty(false)}
                placeholder="Enter reason for batch change"
                className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4] ${
                  isReasonEmpty ? "border-red-500 border-1" : ""
                }`}
              ></textarea>
              {isReasonEmpty && (
                <p className="text-red-500 text-sm mt-1">{reasonError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachment (Image)
              </label>
              <input
                type="file"
                accept="image/"
                onChange={(e) => setAttachment(e.target.files[0])}
                onFocus={() => setIsAttachmentEmpty(false)}
                className={`cursor-pointer block w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#E8DEF8] file:text-[#6750A4] hover:file:bg-[#d1c3ea]
                  ${isAttachmentEmpty ? "border-red-500 border-1" : ""}
                  `}
              />
              {isAttachmentEmpty && (
                <p className="text-red-500 text-sm mt-1">{attachmentError}</p>
              )}
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={handleDiscard}
                className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
               setShowConfirmModal(true)
                }}
                className="cursor-pointer bg-[#6750A4] text-white hover:bg-[#584195] px-6 py-2 rounded-md text-sm font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
      {showTable && filteredStudents.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No students found in batch &quot{fromBatch}&quot.
        </div>
      )}
            {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowConfirmModal(false)}>
          <div className="w-[500px] bg-[#F8FAFD] rounded-[10px] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Confirm Changes</h2>
              <button onClick={() => setShowConfirmModal(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            <p className="mb-4 text-gray-700 text-sm">
              Are you sure you want to update student from <strong className='text-m'>{fromBatch}</strong> to <strong className='text-m'>{toBatch}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowConfirmModal(false)} className="cursor-pointer bg-[#e8def8] text-[#4a4459] px-4 py-2.5 rounded-2xl text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleBatchchangeSubmit } className="cursor-pointer bg-[#6750a4] hover:bg-[#5f537d] text-white px-4 py-2.5 rounded-xl text-sm font-medium">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Confirmation Modal */}
      {EditDiscarddModel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Discard Changes?</h3>
              <p className="text-sm text-gray-500 mb-6">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditDiscarddModel(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-[#6750a4] text-white rounded-xl hover:bg-[#675b86] focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchChange;
