// placementOpTl/placement/shortListedStudents.js
'use client';
import React, { useState, useMemo } from 'react';
import Navbar from '../navbar';
import ShortlistedSearch from '../components/shortlistedSearch';
import { useDataContext } from '../../context/dataContext';
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from '../../context/dataContext';

// Helper function to get domain label from batch prefix
const getDomainLabelFromBatch = (batch, domainPrefixMap, domains) => {
  if (!batch) return '-';
  const prefix = batch.substring(0, batch.length > 2 && batch[2] !== '0' ? 3 : 2); // Handle SAP (3 chars) and others (2 chars)
  const domainKey = Object.keys(domainPrefixMap).find(key => domainPrefixMap[key] === prefix);
  return domainKey ? domains.find(d => d.key === domainKey)?.label || prefix : prefix;
};

export default function ShortListedStudentsTab() {
  const { allStudentData } = useDataContext();

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP", // 3 characters
    devops: "DV",
  };

  // --- Filter for 'Placed' Students ---
  const placedStudentsData = useMemo(() => {
    return allStudentData.filter(
      (s) => s.placement && (s.placement === "Placed" || s.placement === "placed")
    );
  }, [allStudentData]);

  // --- Extract Unique Companies from Placed Students ---
  const uniqueCompanies = useMemo(() => {
    const companiesSet = new Set(
      placedStudentsData
        .map(student => student.company)
        .filter(company => company && company.trim() !== "")
    );
    return Array.from(companiesSet).sort();
  }, [placedStudentsData]);

  // --- Combine all batches ---
  const allBatches = useMemo(() => [
    ...fullstackInitial,
    ...dataanalyticsInitial,
    ...bankingInitial,
    ...marketingInitial,
    ...sapInitial,
    ...devopsInitial,
  ], []);

  // --- Define domains ---
  const domains = [
    { key: "fullstack", label: "Full Stack Development" },
    { key: "dataanalytics", label: "Data Analytics & Science" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "sap", label: "SAP" },
    { key: "banking", label: "Banking & Financial Services" },
    { key: "devops", label: "DevOps" },
  ];

  // --- Search Handler ---
  const handleSearch = () => {
    let filteredStudents = [...placedStudentsData];

    if (selectedDomain) {
      const prefix = domainPrefixMap[selectedDomain];
      if (prefix) {
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

    if (selectedCompany) {
      filteredStudents = filteredStudents.filter(
        (s) => s.company && s.company.toLowerCase().trim() === selectedCompany.toLowerCase().trim()
      );
    }

    setSearchResults(filteredStudents);
    setShowTable(true);
  };

  // --- Reset Handler ---
  const handleReset = () => {
    setSelectedDomain("");
    setSelectedBatch("");
    setSelectedCompany("");
    setSearchResults([]);
    setShowTable(false);
  };

  return (
    <div className="h-screen overflow-auto">
      <Navbar />
      <main className="ml-[5px] p-6"> {/* Kept ml-[5px] as in your original PlacedTab */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Shortlisted Students</h1>

        <ShortlistedSearch
          domains={domains}
          batches={allBatches}
          companies={uniqueCompanies}
          onSearch={handleSearch}
          onReset={handleReset}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          domainPrefixMap={domainPrefixMap}
          // Optional: Customize validation messages if needed
          // searchValidationMessage="Please select a domain, batch, or company to shortlist students."
        />

        {/* --- Results Table --- */}
        {showTable && searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="overflow-x-auto">
              {/* Added 'w-full' and 'min-w-max' for better table handling on smaller screens */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {/* Updated table headers to match requirements */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Batch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Domain</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Designation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Package</th> 
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((student, i) => (
                    <tr key={student.bookingId || student.id || i} className="hover:bg-gray-50">
                      {/* Updated table cells to match requirements and include domain derivation */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.batch || "-"}</td>
                      {/* Derived Domain Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getDomainLabelFromBatch(student.batch, domainPrefixMap, domains) || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.company || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.designation || "-"}</td>
                      {/* Changed Salary to Package */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.salary || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showTable && searchResults.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
            <p className="text-gray-600">No placed students found matching the selected criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}