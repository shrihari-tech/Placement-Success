// YetToBePlacedTab.jsx
'use client';
import React, { useState } from "react";
import Navbar from "../navbar";
import OverallCard from "../components/overallCard"; // Ensure the path is correct
import Search from "../components/search"; // Ensure the path is correct
import { useDataContext } from "../../context/dataContext"; // Ensure the path is correct
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from "../../context/dataContext"; // Ensure the path is correct

export default function YetToBePlacedTab() {
  const { allStudentData } = useDataContext(); // Get all student data from context

  // State for search filters
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Mapping from domain keys to batch prefixes
  // Make sure these prefixes match your actual batch IDs (e.g., DA, BK, MK, SAP, DV, FS)
  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP", // Corrected prefix based on your data
    devops: "DV",
  };

  // Filter all students to get only 'Yet to Place' ones for the OverallCard and initial search base
  const yetToPlaceStudentsData = allStudentData.filter(
    (s) => s.placement && s.placement === "Yet to Place" // Exact match for "Yet to Place"
  );

  // Search function for the table
  const handleSearch = () => {
    // Start with the pre-filtered "Yet to Place" students
    let filteredStudents = yetToPlaceStudentsData;

    if (selectedDomain) {
      const prefix = domainPrefixMap[selectedDomain];
      if (prefix) { // Check if prefix exists
        filteredStudents = filteredStudents.filter((s) =>
          s.batch?.startsWith(prefix)
        );
      }
    }

    if (selectedBatch) {
      filteredStudents = filteredStudents.filter(
        (s) => s.batch === selectedBatch
      );
    }

    setSearchResults(filteredStudents);
    setShowTable(true);
  };

  // Reset function
  const handleReset = () => {
    setSelectedDomain("");
    setSelectedBatch("");
    setSearchResults([]);
    setShowTable(false);
  };

  const allBatches = [
    ...fullstackInitial,
    ...dataanalyticsInitial,
    ...bankingInitial,
    ...marketingInitial,
    ...sapInitial,
    ...devopsInitial,
  ];

  return (
    <div className="h-screen overflow-auto">
      <Navbar />
      <main className="ml-[5px] p-6">
        {/* Overall Card - Pass only 'Yet to Place' students */}
        <div className="mb-8">
          <OverallCard
            title="Overall Yet to be Placed Students"
            studentData={yetToPlaceStudentsData} // ✅ Pass the filtered list of 'Yet to Place' students
          />
        </div>

        {/* Search */}
        <Search
          domains={[
            { key: "fullstack", label: "Full Stack Development" },
            { key: "dataanalytics", label: "Data Analytics & Science" },
            { key: "marketing", label: "Digital Marketing" },
            { key: "sap", label: "SAP" },
            { key: "banking", label: "Banking & Financial Services" },
            { key: "devops", label: "DevOps" },
          ]}
          batches={allBatches}
          onSearch={handleSearch}
          onReset={handleReset}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
        />

        {/* Table */}
        {showTable && searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((s, i) => (
                    <tr key={s.bookingId || i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.batch}</td>
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