//  placementOpTl/tlHome/YetToBeTab.js
'use client';
import React, { useState } from "react";
import Navbar from "../navbar";
import OverallCard from "../components/overallCard";
import Search from "../components/search"; // Import the reusable Search
import { useDataContext } from "../../context/dataContext";
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from "../../context/dataContext";

export default function YetToBePlacedTab() {
  const { allStudentData } = useDataContext();

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Define domain prefixes specific to this tab (same as PlacedTab in this case)
  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP",
    devops: "DV",
  };

  // Filter for "Yet to Place" students
  const yetToPlaceStudentsData = allStudentData.filter(
    (s) => s.placement && s.placement === "Yet to Place" // Exact match as per your data
  );
  console.log("YetToBePlacedTab - Filtered yetToPlaceStudentsData:", yetToPlaceStudentsData); // Debug log

  const handleSearch = () => {
    let filteredStudents = yetToPlaceStudentsData;
    console.log("YetToBePlacedTab - Initial filteredStudents (yet to place only):", filteredStudents.length); // Debug log

    if (selectedDomain) {
      const prefix = domainPrefixMap[selectedDomain];
      console.log("YetToBePlacedTab - Domain prefix:", prefix); // Debug log
      if (prefix) {
        const initialCount = filteredStudents.length;
        filteredStudents = filteredStudents.filter((s) =>
          s.batch?.startsWith(prefix)
        );
        console.log(`YetToBePlacedTab - After domain filter (${prefix}):`, filteredStudents.length, `(removed ${initialCount - filteredStudents.length})`); // Debug log
      }
    }

    if (selectedBatch) {
      const initialCount = filteredStudents.length;
      filteredStudents = filteredStudents.filter(
        (s) => s.batch === selectedBatch
      );
      console.log(`YetToBePlacedTab - After batch filter (${selectedBatch}):`, filteredStudents.length, `(removed ${initialCount - filteredStudents.length})`); // Debug log
    }

    console.log("YetToBePlacedTab - Final filteredStudents for table:", filteredStudents); // Debug log
    setSearchResults(filteredStudents);
    setShowTable(true);
  };

  const handleReset = () => {
    setSelectedDomain("");
    setSelectedBatch("");
    setSearchResults([]);
    setShowTable(false);
  };

  // Combine all batches
  const allBatches = [
    ...fullstackInitial,
    ...dataanalyticsInitial,
    ...bankingInitial,
    ...marketingInitial,
    ...sapInitial,
    ...devopsInitial,
  ];

  // Define domains for this tab
  const domains = [
    { key: "fullstack", label: "Full Stack Development" },
    { key: "dataanalytics", label: "Data Analytics & Science" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "sap", label: "SAP" },
    { key: "banking", label: "Banking & Financial Services" },
    { key: "devops", label: "DevOps" },
  ];

  return (
    <div className="h-screen overflow-auto">
      <Navbar />
      <main className="ml-[5px] p-6">
        <div className="mb-8">
          <OverallCard
            title="Overall Yet to be Placed Students"
            studentData={yetToPlaceStudentsData}
          />
        </div>

        {/* --- Reusable Search Component --- */}
        <Search
          // --- Basic Props ---
          domains={domains}
          batches={allBatches}
          onSearch={handleSearch}
          onReset={handleReset}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          // --- Reusability Props (using defaults mostly) ---
          domainPrefixMap={domainPrefixMap}
          // Optional: Customize messages if needed for this tab
          // searchValidationMessage="Please select a domain to find students yet to be placed"
          // batchValidationMessage="Please select a domain first to choose a batch"
        />

        {/* Table */}
        {showTable && searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="overflow-x-auto">
              {/* Added min-w-max to prevent columns from getting too narrow on smaller screens */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                    {/* --- New Columns --- */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aptitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPIC</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((s, i) => (
                    <tr key={s.bookingId || i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.batch}</td>
                      {/* --- New Data Cells --- */}
                      {/* Assuming the property name is 'aptitudeScore' based on the context data */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.aptitudeScore ?? "-"}</td>
                      {/* Assuming the property name is 'epicStatus' based on the context data */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.epicStatus ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showTable && searchResults.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
            <p className="text-gray-600">No students found for the selected criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}