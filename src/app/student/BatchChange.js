"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../context/dataContext"; //
import { Toaster, toast } from "sonner";
import Image from "next/image";

const BatchChange = () => {
  const { batchData, studentData, allBatchNames, allStudentData } =
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
  const fromRef = useRef(null);
  const toRef = useRef(null);

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
  }, [allStudentData, fromBatch]);

  const handleRefresh = () => {
    setFromBatch("");
    setToBatch("");
    setSearchTermFrom("");
    setSearchTermTo("");
    setShowTable(false);
    setReason("");
    setAttachment(null);
  };

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
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        defaultValue={(() => {
                          const batchCode = (
                            student.batch ||
                            student.batchNo ||
                            ""
                          ).toUpperCase();

                          if (batchCode.startsWith("FS"))
                            return "Full Stack Development";
                          if (batchCode.startsWith("DA"))
                            return "Data Analytics & Science";
                          if (batchCode.startsWith("BK"))
                            return "Banking & Financial Services";
                          if (batchCode.startsWith("MK"))
                            return "Digital Marketing";
                          if (batchCode.startsWith("SAP")) return "SAP";
                          if (batchCode.startsWith("DV")) return "DevOps";

                          return ""; // fallback
                        })()}
                      >
                        <option value="Full Stack Development">
                          Full Stack Development
                        </option>
                        <option value="Data Analytics & Science">
                          Data Analytics & Science
                        </option>
                        <option value="Banking & Financial Services">
                          Banking & Financial Services
                        </option>
                        <option value="Digital Marketing">
                          Digital Marketing
                        </option>
                        <option value="SAP">SAP</option>
                        <option value="DevOps">DevOps</option>
                      </select>
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
                placeholder="Enter reason for batch change"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6750A4]"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachment (Image)
              </label>
              <input
                type="file"
                accept="image/"
                onChange={(e) => setAttachment(e.target.files[0])}
                className="cursor-pointer block w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#E8DEF8] file:text-[#6750A4] hover:file:bg-[#d1c3ea]"
              />
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={handleRefresh}
                className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!reason.trim()) {
                    toast.error("Please enter a reason for the batch change.");
                    return;
                  }
                  if (!attachment) {
                    toast.error("Please attach an image before submitting.");
                    return;
                  }
                    selectedStudents.forEach((student) => {
                      updateStudent(student.bookingId, { ...student, batch: toBatch });
                    });
                  toast.success("Submitted successfully");
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
    </div>
  );
};

export default BatchChange;
