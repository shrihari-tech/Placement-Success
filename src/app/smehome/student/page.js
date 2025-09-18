// src/app/smehome/page.js
// src/app/smehome/page.js
"use client";
import React, { useState, useEffect, useMemo } from "react";
import SMENavbar from "../smenavbar";
import Search from "../components/search";
import StudentTable from "../components/StudentTable";
import { useDataContext } from "../../context/dataContext";

export default function StudentPage() {
  const { studentBatchSelect, studentData } = useDataContext();
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedEpicStatus, setSelectedEpicStatus] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Extract unique batches for the dropdown
  const uniqueBatches = useMemo(() => {
    return [...new Set(studentData.map((s) => s.batch).filter(Boolean))].sort();
  }, [studentData]);

  // Extract unique EPIC statuses for the dropdown
  const uniqueEpicStatuses = useMemo(() => {
    return [
      ...new Set(studentData.map((s) => s.epicStatus).filter(Boolean)),
    ].sort();
  }, [studentData]);

  // --- Search Handler ---
  const handleSearch = () => {
    let results = [...studentData];

    if (selectedBatch) {
      results = results.filter((s) => s.batch === selectedBatch);
    }

    if (selectedEpicStatus) {
      results = results.filter((s) => s.epicStatus === selectedEpicStatus);
    }

    // Only show the table if there are results
    if (results.length > 0) {
      setFilteredStudents(results);
      setShowTable(true);
    } else {
      // Show an empty state message
      setFilteredStudents([]);
      setShowTable(true);
    }
  };

  // --- Reset Handler ---
  const handleReset = () => {
    setSelectedBatch("");
    setSelectedEpicStatus("");
    setFilteredStudents([]);
    setShowTable(false);
  };

  return (
    <div className="h-screen overflow-auto">
      <SMENavbar />
      <main className="mx-auto w-full">
        {/* --- HEADER SECTION  --- */}
        <div className="border-b-2 border-gray-300 bg-white ps-10 pt-2 mb-2 md:mb-4">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2 flex items-center">
            Students
          </p>
        </div>

        {/* --- Search Component --- */}
        <Search
          batches={uniqueBatches.map((batch) => ({ batchNo: batch }))}
          students={studentData}
          onSearch={handleSearch}
          onReset={handleReset}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          selectedEpicStatus={selectedEpicStatus}
          setSelectedEpicStatus={setSelectedEpicStatus}
        />

        {/* --- Results Table --- */}
        {showTable && <StudentTable students={filteredStudents} />}
      </main>
    </div>
  );
}
