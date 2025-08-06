// upcoming.js
"use client";
import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import { useDataContext } from "../../context/dataContext";
import Image from "next/image";

export default function Upcoming() {
  const { getOpportunitiesByDomain, batchingvalue, batchHead, studentData } =
    useDataContext();
  const [upcomingOpportunities, setUpcomingOpportunities] = useState([]);
  // --- State for View Modal ---
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewOpportunityDetails, setViewOpportunityDetails] = useState(null);

  const toDDMMYYYY = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., Jul
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseDate = (str) => {
    if (!str) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
    if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
      const [dd, mm, yyyy] = str.split("-");
      return new Date(`${yyyy}-${mm}-${dd}`);
    }
    return new Date(str);
  };

  const formatDate = (str) => (str ? toDDMMYYYY(parseDate(str)) : "");

  useEffect(() => {
    // --- Get today's date in YYYY-MM-DD format for comparison ---
    const today = new Date().toISOString().split("T")[0];
    console.log("Today's Date (for filtering):", today); // Optional: for debugging

    // --- Get all opportunities for the current domain ---
    const allOpportunities = getOpportunitiesByDomain(batchingvalue) || [];
    console.log("All Opportunities for Domain:", allOpportunities); // Optional: for debugging

    // --- Filter Opportunities ---
    // 1. Must belong to the current batchHead (domain)
    // 2. Must have a driveDate that is today or in the future (>= today)
    const filteredOpportunities = allOpportunities.filter(
      (opp) => opp.createdDomain === batchHead && opp.driveDate >= today // This ensures today and future dates are included
    );
    console.log("Filtered Upcoming Opportunities:", filteredOpportunities); // Optional: for debugging

    // --- Sort by ID descending (newest first), similar to dashboard ---
    const sortedOpportunities = [...filteredOpportunities].sort(
      (a, b) => (b.id || 0) - (a.id || 0)
    );

    // --- Update State ---
    setUpcomingOpportunities(sortedOpportunities);
  }, [getOpportunitiesByDomain, batchingvalue, batchHead]); // Re-run effect if these values change

  // --- View Modal Handlers ---
  const handleViewOpportunity = (opportunity) => {
    setViewOpportunityDetails(opportunity);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewOpportunityDetails(null);
  };

  return (
    <div>
      <div className="mb-8 p-4  ">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Upcoming Opportunities
        </h2>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {upcomingOpportunities.length > 0 ? (
          upcomingOpportunities.map((opportunity, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mb-4 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 min-w-[280px]"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#6750A4]/5 rounded-bl-full"></div>
              {/* Company header */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 pr-6">
                  {opportunity.companyName}
                </h2>
                <div className="bg-[#6750A4]/10 text-[#6750A4] text-xs font-semibold px-2 py-1 rounded-full">
                  #{upcomingOpportunities.length - index} {/* Serial number */}
                </div>
              </div>
              {/* Details grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#6750A4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Drive Date</p>
                    <p className="font-medium">
                      {formatDate(opportunity.driveDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#6750A4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium">{opportunity.driveRole}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#6750A4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Package</p>
                    <p className="font-medium">{opportunity.package}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#6750A4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Batch</p>
                    <p className="font-medium">{opportunity.selectedBatch}</p>
                  </div>
                </div>
              </div>
              {/* View button */}
              <button
                onClick={() => handleViewOpportunity(opportunity)}
                className="w-full cursor-pointer bg-gradient-to-r from-[#6750A4] to-[#5a4a8f] hover:from-[#5a4a8f] hover:to-[#4d3f7a] text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiEye className="h-4 w-4" /> View Details
              </button>
            </div>
          ))
        ) : (
          // --- No Opportunities Found UI ---
          <div className="col-span-full w-full py-12">
            <div className="text-center">
              <div className="inline-block p-4 bg-[#E8DEF8] rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#6750A4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No Upcoming Opportunities
              </h3>
              <p className="text-gray-500">
                There are currently no upcoming opportunities for this domain.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* --- View Modal (Copied from dashboard.js) --- */}
      {showViewModal && viewOpportunityDetails && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={handleCloseViewModal} // Close on backdrop click
        >
          <div
            className="w-full max-w-4xl bg-[#F8FAFD] rounded-[10px] p-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Opportunity Details</h2>
              <button
                onClick={handleCloseViewModal}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>
            {/* Display Opportunity Details */}
            <div className="flex justify-evenly gap-2 md:gap-1 flex-wrap items-center mb-6 p-3 bg-[#ECE6F0] rounded">
              <div
                className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
              >
                <p className="text-sm p-1">
                  <span className="font-semibold">Company:</span>{" "}
                  {viewOpportunityDetails.companyName}
                </p>
              </div>
              <div
                className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
              >
                <p className="text-sm p-1">
                  <span className="font-semibold">Date:</span>{" "}
                  {formatDate(viewOpportunityDetails.driveDate)}
                </p>
              </div>
              <div
                className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
              >
                <p className="text-sm p-1">
                  <span className="font-semibold">Role:</span>{" "}
                  {viewOpportunityDetails.driveRole}
                </p>
              </div>
              <div
                className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
              >
                <p className="text-sm p-1">
                  <span className="font-semibold">Package:</span>{" "}
                  {viewOpportunityDetails.package}
                </p>
              </div>
              <div
                className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}
              >
                <p className="text-sm p-1">
                  <span className="font-semibold">Batch:</span>{" "}
                  {viewOpportunityDetails.selectedBatch}
                </p>
              </div>
            </div>
            {/* Students Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Epic Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(viewOpportunityDetails.selectedStudents) &&
                  viewOpportunityDetails.selectedStudents.length > 0 ? (
                    viewOpportunityDetails.selectedStudents.map(
                      (bookingId, index) => {
                        const student = studentData.find(
                          (s) => s.bookingId === bookingId
                        );
                        if (!student) return null; // Skip if student not found
                        return (
                          <tr key={bookingId} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {student.name}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {student.email}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {student.phone}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {student.epicStatus}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                              {student.attendance}%
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-6 text-center text-sm text-gray-500"
                      >
                        No students assigned to this opportunity.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
