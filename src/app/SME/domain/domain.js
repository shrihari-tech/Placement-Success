// src/app/SME/domain/domain.js
"use client";
import React, { useState, useMemo } from "react";
import { notification } from "antd";
import { RiCloseCircleLine, RiEyeLine } from "react-icons/ri"; // Added RiEyeLine
import Navbar from "../../navBar/page";
import OverallCard from "../../placementOpTl/components/overallCard";
import Search from "../components/search";
import PreviewModal from "../components/previewModal";
import { useDataContext } from "../../context/dataContext";
import {
  fullstackInitial,
  dataanalyticsInitial,
  bankingInitial,
  marketingInitial,
  sapInitial,
  devopsInitial,
} from "../../context/dataContext";

export default function DomainTab() {
  const { allStudentData } = useDataContext();

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP",
    devops: "DV",
  };

  const placedStudentsData = useMemo(() => {
    return allStudentData.filter(
      (s) => s.placement && (s.placement === "Placed" || s.placement === "placed")
    );
  }, [allStudentData]);

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

  const handleSearch = () => {
    if (!selectedDomain) {
      api.error({
        message: 'Search Error',
        description: 'Please select a domain to search for placed students.',
        placement: 'topRight',
        duration: 4,
        showProgress: true,
        pauseOnHover: true,
        closeIcon: <RiCloseCircleLine className="text-[#6750a4] hover:text-[#a57900]" size={20} />,
      });
      return;
    }

    let filteredStudents = placedStudentsData;
    const prefix = domainPrefixMap[selectedDomain];

    if (prefix) {
      filteredStudents = filteredStudents.filter((s) =>
        s.batch?.startsWith(prefix)
      );
    }

    setSearchResults(filteredStudents);
    setShowTable(true);
  };

  const handleReset = () => {
    setSelectedDomain("");
    setSelectedBatch("");
    setSearchResults([]);
    setShowTable(false);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsPreviewModalOpen(true);
    setIsEditMode(false);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setSelectedStudent(null);
    setIsEditMode(false);
  };

  const handleUpdateStudent = (updatedData) => {
    console.log("Update student:", updatedData);
    handleClosePreviewModal();
  };

  const handleDeleteStudent = (studentId) => {
    console.log("Delete student:", studentId);
    handleClosePreviewModal();
  };

  return (
    <div className="h-screen overflow-auto">
      {contextHolder}
      <style jsx global>{`
        .ant-notification-notice-success,
        .ant-notification-notice-error,
        .ant-notification-notice-warning,
        .ant-notification-notice-info {
          border-color: #6750a4 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-icon,
        .ant-notification-notice-error .ant-notification-notice-icon,
        .ant-notification-notice-warning .ant-notification-notice-icon,
        .ant-notification-notice-info .ant-notification-notice-icon {
          color: #6750a4 !important;
        }
        .ant-notification-notice-success .ant-notification-notice-message,
        .ant-notification-notice-error .ant-notification-notice-message,
        .ant-notification-notice-warning .ant-notification-notice-message,
        .ant-notification-notice-info .ant-notification-notice-message {
          color: #6750a4 !important;
        }
        .ant-notification-notice-close:hover {
          background-color: #6750a4 !important;
          color: white !important;
        }
        .ant-notification-notice-progress-bar {
          background: #6750a4 !important;
        }
        .ant-notification-notice-progress {
          background: rgba(230, 169, 1, 0.1) !important;
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
          requireDomainForBatch={true}
          batchValidationMessage="Select domain first please!"
          searchValidationMessage="Please select a domain to search for placed students."
        />

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleViewDetails(s)}
                          className="text-gray-500 hover:text-gray-700cursor-pointer"
                          aria-label="View Details"
                        >
                          <RiEyeLine size={18} />
                        </button>
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
            <p className="text-gray-600">No placed students found for the selected domain.</p>
          </div>
        )}

        {selectedStudent && (
          <PreviewModal
            isOpen={isPreviewModalOpen}
            onClose={handleClosePreviewModal}
            data={selectedStudent}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            onDelete={handleDeleteStudent}
            onUpdate={handleUpdateStudent}
          />
        )}
      </main>
    </div>
  );
}