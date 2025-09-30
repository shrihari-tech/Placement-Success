// placementOpTl/placement/shortListedStudents.js
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { notification } from "antd";
import { RiCloseCircleLine } from "react-icons/ri";
import Navbar from "../navbar";
import ShortlistedSearch from "../components/shortlistedSearch";
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from "../../context/dataContext";

const getDomainLabelFromBatch = (batch, domainPrefixMap, domains) => {
  if (!batch) return "-";
  if (batch.startsWith("SAP")) return "SAP";
  const prefix = batch.substring(0, 2);
  const domainKey = Object.keys(domainPrefixMap).find(
    (key) => domainPrefixMap[key] === prefix
  );
  return domainKey
    ? domains.find((d) => d.key === domainKey)?.label || prefix
    : prefix;
};

export default function ShortListedStudentsTab() {
  const [api, contextHolder] = notification.useNotification();

  const [allPlacedStudents, setAllPlacedStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showTable, setShowTable] = useState(false); // ✅ Start as false
  const [loading, setLoading] = useState(false);

  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP",
    devops: "DV",
  };

  const domains = [
    { key: "fullstack", label: "Full Stack Development" },
    { key: "dataanalytics", label: "Data Analytics & Science" },
    { key: "marketing", label: "Digital Marketing" },
    { key: "sap", label: "SAP" },
    { key: "banking", label: "Banking & Financial Services" },
    { key: "devops", label: "DevOps" },
  ];

  const allBatches = useMemo(
    () => [
      ...fullstackInitial,
      ...dataanalyticsInitial,
      ...bankingInitial,
      ...marketingInitial,
      ...sapInitial,
      ...devopsInitial,
    ],
    []
  );

  // Fetch all placed students on mount (but don't show table)
  useEffect(() => {
    const fetchPlaced = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/students?placement=Placed"
        );
        if (!res.ok) throw new Error("Failed to load placed students");
        const data = await res.json();
        setAllPlacedStudents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        api.error({ message: "Error", description: err.message, duration: 5 });
      }
    };
    fetchPlaced();
  }, [api]);

  const uniqueCompanies = useMemo(() => {
    return [
      ...new Set(
        allPlacedStudents
          .map((s) => s.company)
          .filter((company) => company?.trim())
      ),
    ].sort();
  }, [allPlacedStudents]);

  // ✅ Search handler: ONLY show table after search
  const handleSearch = () => {
    if (!selectedDomain && !selectedBatch && !selectedCompany) {
      api.error({
        message: "Search Error",
        description:
          "Please select at least one filter (Domain, Batch, or Company).",
        placement: "topRight",
        duration: 4,
        closeIcon: <RiCloseCircleLine className="text-[#a17640]" size={20} />,
      });
      return;
    }

    setLoading(true);
    let filtered = [...allPlacedStudents];

    // ✅ CRITICAL: Use batch_no (not batch)
    if (selectedDomain) {
      const prefix = domainPrefixMap[selectedDomain];
      filtered = filtered.filter((s) => s.batch_no?.startsWith(prefix));
    }

    if (selectedBatch) {
      filtered = filtered.filter((s) => s.batch_no === selectedBatch);
    }

    if (selectedCompany) {
      const companyLower = selectedCompany.toLowerCase().trim();
      filtered = filtered.filter(
        (s) => s.company?.toLowerCase().trim() === companyLower
      );
    }

    setSearchResults(filtered);
    setShowTable(true); // ✅ Only show after search
    setLoading(false);
  };

  const handleReset = () => {
    setSelectedDomain("");
    setSelectedBatch("");
    setSelectedCompany("");
    setSearchResults([]);
    setShowTable(false); // ✅ Hide table on reset
  };

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
        .ant-notification-notice-icon {
          color: #a17640 !important;
        }
        .ant-notification-notice-message {
          color: #a17640 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #a17640 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #a17640 !important;
        }
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important;
        }
      `}</style>

      <Navbar />
      <main className="ml-[5px] p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Shortlisted Students
        </h1>

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
          notificationApi={api}
        />

        {loading && (
          <p className="text-center text-blue-600 mt-4">Searching...</p>
        )}

        {/* ✅ Table ONLY appears after search */}
        {showTable && searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Batch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Domain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Package
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchResults.map((student, i) => (
                    <tr
                      key={student.bookingId || i}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.batch_no || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getDomainLabelFromBatch(
                          student.batch_no,
                          domainPrefixMap,
                          domains
                        ) || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.company || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.designation || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.salary || "-"}
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
              No placed students found matching the selected criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
