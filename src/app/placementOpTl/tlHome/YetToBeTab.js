// placementOpTl/tlHome/YetToBeTab.jsx
'use client';
import React, { useState, useEffect } from "react";
import { notification } from 'antd';
import { RiCloseCircleLine } from 'react-icons/ri';
import Navbar from "../navbar";
import OverallCard from "../components/overallCard";
import Search from "../components/search";
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from "../../context/dataContext";

// ✅ Hardcoded URL for "Yet to Place"
const API_URL = "http://localhost:5000/students?placement=Yet to Place";

export default function YetToBePlacedTab() {
  const [api, contextHolder] = notification.useNotification();

  const [yetToPlaceStudents, setYetToPlaceStudents] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP",
    devops: "DV",
  };

  // Fetch on mount
  useEffect(() => {
    const fetchYetToPlace = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to load students');
        const data = await res.json();
        setYetToPlaceStudents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        api.error({ message: "Error", description: err.message, duration: 5 });
      }
    };
    fetchYetToPlace();
  }, [api]);

  // ✅ Search handler - same logic as PlacedTab
  const handleSearch = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/students?placement=Yet to Place";

      if (selectedBatch) {
        url += `&batchId=${encodeURIComponent(selectedBatch)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Search failed");
      const students = await res.json();

      setSearchResults(students);
      setShowTable(true);
    } catch (err) {
      api.error({ message: "Search Failed", description: err.message });
    } finally {
      setLoading(false);
    }
  };

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
      {contextHolder}
      <style jsx global>{`
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #a17640 !important;
        }
        .ant-notification-notice-icon { color: #a17640 !important; }
        .ant-notification-notice-message { color: #a17640 !important; }
        .ant-notification-notice-close:hover {
          background-color: #a17640 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar { background: #a17640 !important; }
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important;
        }
      `}</style>

      <Navbar />
      <main className="ml-[5px] p-6">
        <div className="mb-8">
          <OverallCard
            title="Overall Yet to be Placed Students"
            studentData={yetToPlaceStudents}
          />
        </div>

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
          notificationApi={api}
        />

        {loading && <p className="text-center text-blue-600 mt-4">Searching...</p>}

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">EPIC</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((s, i) => (
                    <tr key={s.bookingId || i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.batch_no || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.attendance ?? "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.epic_status ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showTable && searchResults.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
            <p className="text-gray-600">No students found for the selected criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}