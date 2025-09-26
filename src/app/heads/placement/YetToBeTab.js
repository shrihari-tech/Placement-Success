//src/app/owner/placement/YetToBeTab.js
"use client";
import React, { useState } from "react";
import { notification } from "antd";
import { RiCloseCircleLine } from "react-icons/ri";
import Search from "../components/search";

export default function YetToBePlacedTab() {
  // State for search criteria
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for preview modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  // --- Search Handler ---
  const handleSearch = async () => {
    if (!selectedDomain && !selectedBatch) {
      api.error({
        message: "Search Error",
        description:
          "Please select at least one filter (Domain or Batch) to search for students yet to be placed.",
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

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedDomain) params.append("domain", selectedDomain);
      if (selectedBatch) params.append("batch", selectedBatch);

      // ✅ Fetch from the new API endpoint
      const res = await fetch(
        `http://localhost:5000/owner/placement/yet-to-place?${params}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();

      setSearchResults(data);
      setShowTable(true);
    } catch (err) {
      console.error("Search error:", err);
      api.error({
        message: "Fetch Error",
        description: "Failed to load student data. Please try again.",
        duration: 4,
      });
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Reset Handler ---
  const handleReset = () => {
    setSelectedDomain("");
    setSelectedBatch("");
    setSearchResults([]);
    setShowTable(false);
  };

  // Combine all batches (you can keep this for search dropdown)
  const allBatches = [];
  // If you still need mock batches for dropdown, keep your existing logic
  // Otherwise, consider fetching batches dynamically

  // Define domains
  const domains = [
    { key: "fullstack", label: "Full Stack Development" },
    { key: "dataanalytics", label: "Data Analytics & Science" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "sap", label: "SAP" },
    { key: "banking", label: "Banking & Financial Services" },
    { key: "devops", label: "DevOps" },
  ];

  // Handle View Details
  const handleViewDetails = async (student) => {
    try {
      const res = await fetch(
        `http://localhost:5000/owner/reports/student/${student.booking_id}`
      );
      if (!res.ok) throw new Error("Student not found");
      const fullStudent = await res.json();
      setSelectedStudent(fullStudent);
      setIsPreviewOpen(true);
    } catch (err) {
      console.error("Failed to load student details:", err);
      api.error({
        message: "Error",
        description: "Could not load full student details.",
        duration: 3,
      });
    }
  };

  return (
    <div className="bg-white">
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
        batches={allBatches} // You can leave empty or populate if needed
        onSearch={handleSearch}
        onReset={handleReset}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        selectedBatch={selectedBatch}
        setSelectedBatch={setSelectedBatch}
        domainPrefixMap={domainPrefixMap}
        requireDomainForBatch={false} // Optional: allow batch search without domain
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4 text-gray-600">Searching...</div>
      )}

      {/* Table */}
      {showTable && searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6 border border-gray-200">
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
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Epic Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((student, index) => (
                  <tr
                    key={student.booking_id || index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.epicStatus === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : student.epicStatus === "Proficient"
                            ? "bg-blue-100 text-blue-800"
                            : student.epicStatus === "Ideal"
                            ? "bg-purple-100 text-purple-800"
                            : student.epicStatus === "Capable"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {student.epicStatus || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTable && searchResults.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
          <p className="text-gray-600">
            No students found for the selected criteria.
          </p>
        </div>
      )}
    </div>
  );
}
