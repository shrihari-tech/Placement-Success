"use client";
import React from "react";
import { FiEye } from "react-icons/fi";

const OpportunitiesCard = ({ data, onViewDetails, serialNumber }) => {
  const getDomainColor = (domain) => {
    switch (domain) {
      case "fullstack":
        return "bg-purple-100 text-purple-800";
      case "dataanalytics":
        return "bg-blue-100 text-blue-800";
      case "marketing":
        return "bg-green-100 text-green-800";
      case "sap":
        return "bg-yellow-100 text-yellow-800";
      case "devops":
        return "bg-indigo-100 text-indigo-800";
      case "banking":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 min-w-[260px] w-full">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#a17640]/5 rounded-bl-full"></div>

      {/* Company header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 pr-4 sm:pr-6 truncate">
          {data.companyName}
        </h2>
        <div className="bg-[#a17640]/10 text-[#a17640] text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full whitespace-nowrap">
          #{serialNumber}
        </div>
      </div>

      {/* Domain badge */}
      <div className="mb-3 sm:mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDomainColor(
            data.domain
          )}`}
        >
          {data.domain
            ?.replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ece3d8] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[#a17640]"
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
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500">Designation</p>
            <p className="font-medium text-sm sm:text-sm truncate">
              <span className="text-gray-700">{data.driveRole || "-"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ece3d8] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[#a17640]"
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
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500">Package</p>
            <p className="font-medium text-sm sm:text-sm truncate">
              <span className="text-gray-700">{data.package || "-"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ece3d8] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[#a17640]"
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
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-gray-500">Batch</p>
            <p className="font-medium text-sm sm:text-sm truncate">
              <span className="text-gray-700">{data.selectedBatch || "-"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* View Details button */}
      <button
        onClick={() => onViewDetails(data)}
        className="cursor-pointer w-full bg-gradient-to-r from-[#a17640] to-[#b38401] hover:from-[#b38401] hover:to-[#997101] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <FiEye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm">View Details</span>
      </button>
    </div>
  );
};

export default OpportunitiesCard;
