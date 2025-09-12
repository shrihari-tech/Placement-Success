// placedTab.jsx
'use client';
import React, { useState } from "react";
import { notification } from 'antd'; // Import notification
import { RiCloseCircleLine } from 'react-icons/ri'; // Import the icon
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

export default function PlacedTab() {
  const { allStudentData } = useDataContext();

  // State for search criteria
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Notification hook
  const [api, contextHolder] = notification.useNotification();

  // Define domain prefixes specific to this tab
  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP",
    devops: "DV",
  };

  // Filter for "Placed" students
  const placedStudentsData = allStudentData.filter(
    (s) => s.placement && (s.placement === "Placed" || s.placement === "placed") // Handle case variations
  );
  // console.log("PlacedTab - Filtered placedStudentsData:", placedStudentsData); // Debug log - can be removed

  // --- Search Handler ---
  const handleSearch = () => {
    // Check if at least one filter is selected (Domain or Batch)
    // Adjust condition based on your specific requirements (e.g., require domain OR batch)
    if (!selectedDomain && !selectedBatch) {
      // Show error notification using the custom style with #e6a901
      api.error({
        message: 'Search Error',
        description: 'Please select at least one filter (Domain or Batch) to search for placed students.',
        placement: 'topRight',
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
        closeIcon: <RiCloseCircleLine className="text-[#e6a901] hover:text-[#cc9601]" size={20} />,
      });
      return; // Stop the search if no criteria
    }

    let filteredStudents = placedStudentsData;
    // console.log("PlacedTab - Initial filteredStudents (placed only):", filteredStudents.length); // Debug log - can be removed

    if (selectedDomain) {
      const prefix = domainPrefixMap[selectedDomain];
      // console.log("PlacedTab - Domain prefix:", prefix); // Debug log - can be removed
      if (prefix) {
        // const initialCount = filteredStudents.length; // Debug log - can be removed
        filteredStudents = filteredStudents.filter((s) =>
          s.batch?.startsWith(prefix)
        );
        // console.log(`PlacedTab - After domain filter (${prefix}):`, filteredStudents.length, `(removed ${initialCount - filteredStudents.length})`); // Debug log - can be removed
      }
    }

    if (selectedBatch) {
      // const initialCount = filteredStudents.length; // Debug log - can be removed
      filteredStudents = filteredStudents.filter(
        (s) => s.batch === selectedBatch
      );
      // console.log(`PlacedTab - After batch filter (${selectedBatch}):`, filteredStudents.length, `(removed ${initialCount - filteredStudents.length})`); // Debug log - can be removed
    }

    // console.log("PlacedTab - Final filteredStudents for table:", filteredStudents); // Debug log - can be removed
    setSearchResults(filteredStudents);
    setShowTable(true);
  };

  // --- Reset Handler ---
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
      {/* Include the context holder for notifications */}
      {contextHolder}
      {/* Add custom styles for notifications */}
      <style jsx global>{`
        /* Custom notification styles for #e6a901 */
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #e6a901 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-icon,
        .ant-notification-notice-error .ant-notification-notice-icon,
        .ant-notification-notice-warning .ant-notification-notice-icon,
        .ant-notification-notice-info .ant-notification-notice-icon {
          color: #e6a901 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-message,
        .ant-notification-notice-error .ant-notification-notice-message,
        .ant-notification-notice-warning .ant-notification-notice-message,
        .ant-notification-notice-info .ant-notification-notice-message {
          color: #e6a901 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #e6a901 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #e6a901 !important;
        }
        /* Custom close icon styling */
        .ant-notification-notice-close {
          transition: all 0.3s ease;
        }
        /* Ensure progress bar container also uses the color */
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important; /* Light version of #e6a901 */
        }
      `}</style>
      <Navbar />
      <main className="ml-[5px] p-6">
        <div className="mb-8">
          <OverallCard
            title="Overall Placed Students"
            studentData={placedStudentsData}
          />
        </div>

        {/* --- Reusable Search Component --- */}
        {/* Pass the notification API to Search if it needs to show notifications */}
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
          // --- Reusability Props ---
          domainPrefixMap={domainPrefixMap}
          notificationApi={api} // Pass the notification API
          // Optional: Customize messages if needed in the component itself
          // searchValidationMessage="Please select a domain to find placed students"
          // batchValidationMessage="Please select a domain first to choose a batch"
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((s, i) => (
                    <tr key={s.bookingId || i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.company || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.designation || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showTable && searchResults.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
            <p className="text-gray-600">No placed students found for the selected criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}