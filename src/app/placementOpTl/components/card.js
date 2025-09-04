// placementOpTl/components/Card.js
"use client";
import React from "react";
import { FiUser, FiBriefcase, FiEye } from "react-icons/fi";

const Card = ({ data, onViewDetails, serialNumber }) => {
  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 mb-4 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 min-w-[280px]">
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#e6a901]/5 rounded-bl-full"></div>
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 pr-6 truncate">
          {data.name}
        </h2>
        <div className="bg-[#e6a901]/10 text-[#e6a901] text-xs font-semibold px-2 py-1 rounded-full">
          # {serialNumber}
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
            <FiUser className="h-4 w-4 text-[#e6a901]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-sm truncate">{data.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#fff2cc] flex items-center justify-center mr-3">
            <FiBriefcase className="h-4 w-4 text-[#e6a901]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Company</p>
            <p className="font-medium">{data.company}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(data)}
        className="cursor-pointer w-full bg-gradient-to-r from-[#e6a901] to-[#b38401] hover:from-[#b38401] hover:to-[#997101] text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <FiEye className=" h-4 w-4" /> View Details
      </button>
    </div>
  );
};

export default Card;
