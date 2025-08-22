// placementOpHead/tl/components/tlCard.js
"use client";
import React from "react";
import { FiUser, FiBriefcase, FiEye } from "react-icons/fi";

const TLCard = ({ teamLeader, onViewDetails, serialNumber }) => {
  // Added serialNumber prop

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mb-4 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 min-w-[280px]">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#cd5e77]/5 rounded-bl-full"></div>

      {/* TL header with Serial Number */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 pr-6 truncate">
          {teamLeader.name}
        </h2>
        {/* Display Serial Number Badge */}
        <div className="bg-[#cd5e77]/10 text-[#cd5e77] text-xs font-semibold px-2 py-1 rounded-full">
          # {serialNumber}
        </div>
      </div>

      {/* Details grid */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
            <FiUser className="h-4 w-4 text-[#cd5e77]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-sm truncate">{teamLeader.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#f0ced6] flex items-center justify-center mr-3">
            <FiBriefcase className="h-4 w-4 text-[#cd5e77]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Role</p>
            <p className="font-medium">{teamLeader.role}</p>
          </div>
        </div>
      </div>

      {/* View button */}
      <button
        onClick={() => onViewDetails(teamLeader)}
        className="w-full cursor-pointer bg-gradient-to-r from-[#cd5e77] to-[#b9556b] hover:from-[#b9556b] hover:to-[#a44b5f] text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <FiEye className="h-4 w-4" /> View Details
      </button>
    </div>
  );
};

export default TLCard;
