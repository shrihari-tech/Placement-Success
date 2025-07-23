import React, { useState, useMemo, useCallback, useEffect,useRef } from 'react';
import { useDataContext } from "../context/dataContext";
import { Toaster, toast } from 'sonner';
import { FiChevronDown } from 'react-icons/fi';
import { RiCloseCircleLine } from "react-icons/ri";
import { FiEdit, FiTrash2} from 'react-icons/fi';


const Scores = () => {
    const { studentData } = useDataContext();
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedScope, setSelectedScope] = useState("");
    const [filteredScores, setFilteredScores] = useState(studentData);
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [showBatchDropdown, setShowBatchDropdown] = useState(false);
    const [showScopeDropdown, setShowScopeDropdown] = useState(false);

    const batchesNames = useMemo(() => {
        return [...new Set(studentData.map(s => s.batch))];
    }, [studentData]);
      const batchDropdownRef = useRef(null);
      const scoreDropdownRef = useRef(null);
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
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
        

    const handleScoreSearch = useCallback(() => {
        let results = studentData;
         if (selectedBatch ==='' || selectedScope ==='') {
            toast.error("Please select Both option to search");
            return;
        }
        else if (selectedBatch) {
            results = results.filter((student) => student.batch === selectedBatch);
        }

        setFilteredScores(results);
        setSearchInitiated(true);
    }, [studentData, selectedBatch, selectedScope]);
    useEffect(() => {
          const handleGlobalKeyDownScope = (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleScoreSearch();
            }
          };
      
          window.addEventListener("keydown", handleGlobalKeyDownScope);
      
          return () => {
            window.removeEventListener("keydown", handleGlobalKeyDownScope);
          };
        }, [handleScoreSearch]);

    const handleScoreReset = () => {
        setSelectedBatch("");
        setSelectedScope("");
        setFilteredScores(studentData);
        setSearchInitiated(false);
    };

    useEffect(() => {
        if (searchInitiated) {
            handleScoreSearch();
        }
    }, [studentData]);

    return (
        <div>
            <Toaster position="top-right" />
            <div className="bg-[#F4F3FF] py-3 rounded-xl">
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
                                {[["Mile-1", "Mile-2", "Mile-3", "IRC", "EPIC", "ATT"].map((scopeOption) => (
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
                                ))]}
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
                                    {selectedScope === 'Mile-1' ? student.mile1 || "N/A" :
                                        selectedScope === 'Mile-2' ? student.mile2 || "N/A " :
                                        selectedScope === 'Mile-3' ? student.mile3 || "N/A " :
                                        selectedScope === 'IRC' ? student.irc || "N/A" :
                                        selectedScope === 'EPIC' ? student.epic || "N/A" :
                                        selectedScope === 'ATT' ? student.attendance || "N/A" : "N/A"}
                                    </td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                                    <div className="flex gap-1 items-center justify-center">            
                                    <button
                                        className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                                        >
                                        <FiEdit className="h-4 w-4" />
                                        </button>
                                        <button
                                        onClick={() => {
                                        }}
                                        className="cursor-pointer p-1 hover:bg-gray-100 rounded text-black"
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
    );
}

export default Scores