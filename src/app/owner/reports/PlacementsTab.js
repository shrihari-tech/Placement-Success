// src/app/heads/reports/PlacementsTab.js
"use client";
import React, { useState } from "react";
import { notification } from "antd";
import { RiCloseCircleLine } from "react-icons/ri";
import Search from "../components/search";
import { useDataContext } from "../../context/dataContext";
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from "../../context/dataContext";

export default function PlacementsTab() {
  const { allStudentData } = useDataContext();

  // State for search criteria
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Notification hook
  const [api, contextHolder] = notification.useNotification();

  // Define domain prefixes
  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP",
    devops: "DV",
  };

  // --- Filter for "Placed" students ---
  const placedStudentsData = allStudentData.filter(
    (s) => s.placement && (s.placement === "Placed" || s.placement === "placed")
  );

  // --- Search Handler ---
  const handleSearch = () => {
    if (!selectedDomain && !selectedBatch) {
      api.error({
        message: "Search Error",
        description:
          "Please select at least one filter (Domain or Batch) to search for placed students.",
        placement: "topRight",
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
        closeIcon: (
          <RiCloseCircleLine
            className="text-[#6d790b] hover:text-[#cc9601]"
            size={20}
          />
        ),
      });
      return;
    }

    let filteredStudents = placedStudentsData;

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

  // Define domains
  const domains = [
    { key: "fullstack", label: "Full Stack Development" },
    { key: "dataanalytics", label: "Data Analytics & Science" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "sap", label: "SAP" },
    { key: "banking", label: "Banking & Financial Services" },
    { key: "devops", label: "DevOps" },
  ];

  return (
    <div className=" bg-white ">
      {contextHolder}

      <style jsx global>{`
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #6d790b !important;
        }
        .ant-notification-notice-icon {
          color: #6d790b !important;
        }
        .ant-notification-notice-message {
          color: #6d790b !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #6d790b !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #6d790b !important;
        }
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important;
        }
      `}</style>

      {/* Search Component */}
      <Search
        domains={domains}
        batches={allBatches}
        onSearch={handleSearch}
        onReset={handleReset}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        domainPrefixMap={domainPrefixMap}
      />

      {/* Table */}
      {showTable && searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((s, i) => (
                  <tr key={s.bookingId || i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {s.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {s.company || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {s.designation || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {s.salary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTable && searchResults.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
          <p className="text-gray-600">
            No placed students found for the selected criteria.
          </p>
        </div>
      )}
    </div>
  );
}
