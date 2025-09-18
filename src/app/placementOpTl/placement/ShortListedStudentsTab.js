// placementOpTl/placement/shortListedStudents.js
'use client';
import React, { useState, useMemo } from 'react';
import { notification } from 'antd'; // Import notification
import { RiCloseCircleLine } from 'react-icons/ri'; // Import the icon
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
  // Handle SAP (3 chars like "SAP") and others (2 chars like "FS", "DA")
  // This logic assumes batch names like "FS01", "DA02", "SAP01"
  // Adjust substring logic if your batch naming is different.
  let prefix = "";
  if (batch.startsWith("SAP")) {
     prefix = "SAP";
  } else if (batch.length >= 2) {
     prefix = batch.substring(0, 2); // Take first 2 characters for others
  } else {
     prefix = batch; // Fallback if batch name is unexpectedly short
  }
  const domainKey = Object.keys(domainPrefixMap).find(key => domainPrefixMap[key] === prefix);
  return domainKey ? domains.find(d => d.key === domainKey)?.label || prefix : prefix;
};

export default function ShortListedStudentsTab() {
  const { allStudentData } = useDataContext();

  // State for search criteria
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Notification hook
  const [api, contextHolder] = notification.useNotification();

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
    // Check if at least one filter is selected
    if (!selectedDomain && !selectedBatch && !selectedCompany) {
      // Show error notification using the custom style with #a17640
      api.error({
        message: 'Search Error',
        description: 'Please select at least one filter (Domain, Batch, or Company) to search.',
        placement: 'topRight',
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
        closeIcon: <RiCloseCircleLine className="text-[#a17640] hover:text-[#cc9601]" size={20} />,
      });
      return; // Stop the search if no criteria
    }

    let filteredStudents = [...placedStudentsData];

    if (selectedDomain) {
      const prefix = domainPrefixMap[selectedDomain];
      if (prefix) {
        // Ensure batch starts with the prefix (e.g., "FS", "DA")
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
      // Case-insensitive and trimmed comparison for company
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
      {/* Include the context holder for notifications */}
      {contextHolder}
      {/* Add custom styles for notifications */}
      <style jsx global>{`
        /* Custom notification styles for #a17640 */
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #a17640 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-icon,
        .ant-notification-notice-error .ant-notification-notice-icon,
        .ant-notification-notice-warning .ant-notification-notice-icon,
        .ant-notification-notice-info .ant-notification-notice-icon {
          color: #a17640 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-message,
        .ant-notification-notice-error .ant-notification-notice-message,
        .ant-notification-notice-warning .ant-notification-notice-message,
        .ant-notification-notice-info .ant-notification-notice-message {
          color: #a17640 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #a17640 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #a17640 !important;
        }
        /* Custom close icon styling */
        .ant-notification-notice-close {
          transition: all 0.3s ease;
        }
        /* Ensure progress bar container also uses the color */
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important; /* Light version of #a17640 */
        }
      `}</style>
      <Navbar />
      <main className="ml-[5px] p-6"> {/* Kept ml-[5px] as in your original PlacedTab */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Shortlisted Students</h1>

        {/* Pass the notification API to ShortlistedSearch if it needs to show notifications */}
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
          notificationApi={api} // Pass the notification API
          // Optional: Customize validation messages if needed in the component itself
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