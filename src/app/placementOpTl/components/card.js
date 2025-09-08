// placementOpTl/components/Card.js
"use client";
import React from "react";
import { FiUser, FiBriefcase, FiEye } from "react-icons/fi";

const Card = ({ data, onViewDetails, serialNumber }) => {
  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 flex-1 min-w-[260px] w-full"> {/* Adjusted padding and min-width */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#e6a901]/5 rounded-bl-full"></div> {/* Adjusted size for mobile */}
      <div className="flex items-start justify-between mb-3 sm:mb-4"> {/* Adjusted margin */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 pr-4 sm:pr-6 truncate"> {/* Adjusted font size */}
          {data.name}
        </h2>
        <div className="bg-[#e6a901]/10 text-[#e6a901] text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full whitespace-nowrap"> {/* Adjusted text size and padding */}
          #{serialNumber}
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6"> {/* Adjusted spacing */}
        <div className="flex items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fff2cc] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0"> {/* Adjusted size and margin */}
            <FiUser className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#e6a901]" /> {/* Adjusted icon size */}
          </div>
          <div className="min-w-0"> {/* Added to prevent text overflow issues */}
            <p className="text-[10px] sm:text-xs text-gray-500">Email</p>
            <p className="font-medium text-sm sm:text-sm truncate">{data.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fff2cc] flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0"> {/* Adjusted size and margin */}
            <FiBriefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#e6a901]" /> {/* Adjusted icon size */}
          </div>
          <div className="min-w-0"> {/* Added to prevent text overflow issues */}
            <p className="text-[10px] sm:text-xs text-gray-500">Company</p>
            <p className="font-medium text-sm sm:text-sm truncate">{data.company || "-"}</p> {/* Added fallback */}
          </div>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(data)}
        className="cursor-pointer w-full bg-gradient-to-r from-[#e6a901] to-[#b38401] hover:from-[#b38401] hover:to-[#997101] text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 shadow-sm hover:shadow-md" // Adjusted padding, rounded corners, gap
      >
        <FiEye className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {/* Adjusted icon size */}
        <span className="text-xs sm:text-sm">View Details</span> {/* Adjusted text size */}
      </button>
    </div>
  );
};

export default Card;