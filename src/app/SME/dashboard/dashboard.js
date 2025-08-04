'use client';

import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { RiCloseCircleLine } from "react-icons/ri";
import Image from "next/image";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useDataContext } from "../../context/dataContext"; // Adjust path as needed

// --- Domain Configuration ---
// This centralizes domain-specific settings like color and display name.
const DOMAIN_CONFIG = {
  "Full Stack Development": {
    key: "FSD",
    displayName: "Full Stack Development",
    color: "#6366f1", // indigo-500
  },
  "Data Analytics & Science": {
    key: "DA & DS",
    displayName: "Data Analytics & Science",
    color: "#10B981", // emerald-500
  },
  "Banking & Financial Services": {
    key: "Banking",
    displayName: "Banking",
    color: "#F59E0B", // amber-500
  },
  "Digital Marketing": { // Assuming "DM" maps to "Digital Marketing"
     key: "DM",
     displayName: "Digital Marketing",
     color: "#8B5CF6", // violet-500
  },
  "SAP": {
    key: "SAP",
    displayName: "SAP",
    color: "#EC4899", // pink-500
  },
  "DevOps": {
    key: "DevOps",
    displayName: "DevOps",
    color: "#0EA5E9", // sky-500
  },
  // Add other domains as needed
};

// --- Graph Data Generator ---
// Generates mock data. Replace with real data fetching logic.
const generateGraphData = (domainKey, isCurrentMonth) => {
  const data = [];
  const daysInMonth = isCurrentMonth
    ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    : new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
  // Max placements can be adjusted or fetched from context
  const maxPlacements = { "FSD": 15, "DA & DS": 12, "Banking": 10, "DM": 8, "SAP": 6, "DevOps": 5 };

  for (let day = 1; day <= daysInMonth; day++) {
    const baseValue = maxPlacements[domainKey] || 5;
    const variation = Math.floor(Math.random() * (baseValue / 2));
    const value = Math.max(0, baseValue - variation + Math.floor(Math.random() * baseValue));
    data.push({ name: day.toString(), value: value });
  }
  return data;
};

// --- Graph Component ---
// A reusable component for displaying a single month's graph.
const PlacementGraph = ({ title, data, monthLabel, color }) => {
  // Create a unique gradient ID based on color and month label to prevent conflicts
  const gradientId = `colorUv-${color.replace('#', '')}-${monthLabel.replace(/\s+/g, '-')}`;

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full">
      <div className="flex items-center mb-2 md:mb-3">
        <h2 className="font-semibold text-xs md:text-sm text-gray-700">{title}</h2>
        <Image src="/Line-1.svg" alt="Line-1" width={100} height={20} className="ml-2" />
      </div>
      <div className="h-[200px] md:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              // Ensure Y-axis starts at 0 and adjusts to max data value + buffer
              domain={[0, dataMax => Math.ceil((dataMax + 1) / 5) * 5]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 2, fill: color }}
              activeDot={{ r: 4, stroke: '#fff', strokeWidth: 2 }}
            >
              <LabelList dataKey="value" position="top" offset={10} style={{ fontSize: 10, fill: "#666" }} />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1.5">
        <Image src="/LegendNode.svg" width={14} height={14} alt="legendNode" />
        <span>{monthLabel}</span>
      </div>
    </div>
  );
};

export default function SMEPage() {
  const { studentData, batchingvalue, batchHead, getOpportunitiesByDomain } = useDataContext();

  // --- Graph Date Logic ---
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const currentMonthIndex = date.getMonth();
  const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
  const previousYear = currentMonthIndex === 0 ? yyyy - 1 : yyyy;
  const currentMonthName = monthNames[currentMonthIndex];
  const previousMonthName = monthNames[previousMonthIndex];

  // --- Opportunities State ---
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All"); // All, Completed, Ongoing
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // --- State for View Modal ---
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewOpportunityDetails, setViewOpportunityDetails] = useState(null);

  // --- Fetch Opportunities from Context ---
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when domain/batch changes

    const fetchedOpportunities = 
      getOpportunitiesByDomain(batchingvalue)?.filter(
        (opportunity) => opportunity.createdDomain === batchHead
      ) || [];

    // Sort by ID descending (newest first)
    const sortedOpportunities = [...fetchedOpportunities].sort(
      (a, b) => (b.id || 0) - (a.id || 0)
    );

    setOpportunities(sortedOpportunities);
    // filteredOpportunities will be updated by the effect below
  }, [batchingvalue, batchHead, getOpportunitiesByDomain]);

  // --- Apply Filter and Pagination ---
  useEffect(() => {
    let result = [...opportunities];

    const today = new Date().toISOString().split("T")[0];

    if (filterStatus === "Completed") {
      result = result.filter(opportunity => opportunity.driveDate < today);
    } else if (filterStatus === "Ongoing") {
      result = result.filter(opportunity => opportunity.driveDate >= today);
    }
    // If filterStatus is "All", result remains all opportunities

    setFilteredOpportunities(result);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [opportunities, filterStatus]);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOpportunities = filteredOpportunities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // --- View Modal Handlers ---
  const handleViewOpportunity = (opportunity) => {
    setViewOpportunityDetails(opportunity);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewOpportunityDetails(null);
  };

  // --- Filter Dropdown Options ---
  const filterOptions = [
    { key: "All", label: "All" },
    { key: "Completed", label: "Completed" },
    { key: "Ongoing", label: "Ongoing" },
  ];

  // --- Dynamic Graph Data ---
  // Get domain config based on current batchHead
  const currentDomainConfig = DOMAIN_CONFIG[batchHead];
  let graphContent = null;

  if (currentDomainConfig) {
    // Generate data for current and previous month based on the domain key
    const currentMonthData = generateGraphData(currentDomainConfig.key, true);
    const previousMonthData = generateGraphData(currentDomainConfig.key, false);

    graphContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PlacementGraph
          title={`Current Month (${currentMonthName})`}
          data={currentMonthData}
          monthLabel={currentMonthName}
          color={currentDomainConfig.color}
        />
        <PlacementGraph
          title={`Previous Month (${previousMonthName})`}
          data={previousMonthData}
          monthLabel={`${previousMonthName} ${previousMonthIndex === 11 ? previousYear : yyyy}`}
          color={currentDomainConfig.color}
        />
      </div>
    );
  } else {
    graphContent = (
      <div className="text-center py-10 text-gray-500">
        Graphs for the domain {batchHead} are not configured yet.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFD]">

      {/* Main Content Area */}
      <div className="flex-1 p-6">

        {/* --- Domain-Specific Graphs Section --- */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Placement Analytics</h2>
          {graphContent}
        </div>
        
        {/* --- Opportunities Section --- */}
        <div className="mt-10">
          {/* Opportunities Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Opportunities</h1>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6750A4]"
                aria-haspopup="true"
                aria-expanded={showFilterDropdown}
              >
                <span>
                  {filterOptions.find(option => option.key === filterStatus)?.label || "Filter"}
                </span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                  <div className="py-1">
                    {filterOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => {
                          setFilterStatus(option.key);
                          setShowFilterDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          filterStatus === option.key
                            ? "bg-[#E8DEF8] text-[#6750A4]"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opportunities Grid - Exactly matching student opportunities structure */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-[-20px] md:mt-4 w-full">
            {currentOpportunities.length > 0 ? (
              currentOpportunities.map((opportunity, index) => (
                <div
                  key={index + indexOfFirstItem} // Use global index for unique key
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
                      #{' '}
                      {filteredOpportunities.length -
                        (indexOfFirstItem + index)}{' '}
                      {/* Display global serial number */}
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
                        <p className="font-medium">{opportunity.driveDate}</p>
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
                        <p className="font-medium">
                          {opportunity.selectedBatch}
                        </p>
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
                    No Opportunities Found
                  </h3>
                  <p className="text-gray-500">
                    {filterStatus === "All"
                      ? "There are currently no opportunities available for this domain."
                      : `No ${filterStatus.toLowerCase()} opportunities found.`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#6750A4] hover:bg-[#E8DEF8]"
                }`}
                aria-label="Previous Page"
              >
                <FiChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Show first, last, current, and nearby pages
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-[#6750A4] text-white"
                          : "text-[#6750A4] hover:bg-[#E8DEF8]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                // Show ellipsis for gaps
                else if (
                  (pageNumber === currentPage - 2 && pageNumber > 2) ||
                  (pageNumber === currentPage + 2 && pageNumber < totalPages - 1)
                ) {
                  return (
                    <span key={`ellipsis-${pageNumber}`} className="px-2 py-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#6750A4] hover:bg-[#E8DEF8]"
                }`}
                aria-label="Next Page"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
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
              <div className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}>
                <p className="text-sm p-1">
                  <span className="font-semibold">Company:</span> {viewOpportunityDetails.companyName}
                </p>
              </div>
              <div className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}>
                <p className="text-sm p-1">
                  <span className="font-semibold">Date:</span> {viewOpportunityDetails.driveDate}
                </p>
              </div>
              <div className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}>
                <p className="text-sm p-1">
                  <span className="font-semibold">Role:</span> {viewOpportunityDetails.driveRole}
                </p>
              </div>
              <div className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}>
                <p className="text-sm p-1">
                  <span className="font-semibold">Package:</span> {viewOpportunityDetails.package}
                </p>
              </div>
              <div className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition`}>
                <p className="text-sm p-1">
                  <span className="font-semibold">Batch:</span> {viewOpportunityDetails.selectedBatch}
                </p>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">S.No</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Epic Status</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attendance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.isArray(viewOpportunityDetails.selectedStudents) && 
                    viewOpportunityDetails.selectedStudents.length > 0 ? (
                      viewOpportunityDetails.selectedStudents.map((bookingId, index) => {
                        const student = studentData.find((s) => s.bookingId === bookingId);
                        if (!student) return null; // Skip if student not found
                        return (
                          <tr key={bookingId} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.name}</td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.email}</td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.phone}</td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.epicStatus}</td>
                            <td className="px-4 py-3 text-center text-sm text-gray-700 whitespace-nowrap">{student.attendance}%</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-4 py-6 text-center text-sm text-gray-500">
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