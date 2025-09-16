// components/OverallCard.jsx (or wherever you have this file)
'use client';
import React from 'react';

export default function OverallCard({ title, studentData }) { // studentData should be the list of students relevant to this card (e.g., only placed, or only 'Yet to Place')
  // Define domains with their labels and colors
  const domains = [
    { key: 'fullstack', label: 'FSD', color: 'text-blue-600', bg: 'bg-blue-50' },
    { key: 'dataanalytics', label: 'DADS', color: 'text-green-600', bg: 'bg-green-50' },
    { key: 'marketing', label: 'DM', color: 'text-purple-600', bg: 'bg-purple-50' },
    { key: 'sap', label: 'SAP', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { key: 'banking', label: 'BFS', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { key: 'devops', label: 'DV', color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  // Mapping from domain keys to batch prefixes
  const domainPrefixMap = {
    fullstack: "FS",
    dataanalytics: "DA",
    banking: "BK",
    marketing: "MK",
    sap: "SAP", // Corrected based on your data prefixes
    devops: "DV"
  };

  // Calculate counts based on the passed studentData
  // This assumes studentData passed in is already filtered (e.g., only 'Placed' or only 'Yet to Place')
  const counts = domains.reduce((acc, domain) => {
    if (Array.isArray(studentData)) {
      const prefix = domainPrefixMap[domain.key];
      // Count students in this domain who are in the provided studentData list
      acc[domain.key] = studentData.filter((s) =>
        s.batch?.startsWith(prefix)
      ).length;
    } else {
      acc[domain.key] = 0;
    }
    return acc;
  }, {});

  // Total count is the sum of the filtered students passed in, or sum the domain counts
  // Using domain counts sum is safer if studentData might contain mixed statuses
  const totalCount = Object.values(counts).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#a17640]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        {title}
        <span className="ml-2 text-lg font-bold text-gray-800">
          ({totalCount})
        </span>
      </h2>
      
      {/* Domain Counts */}
      <div className="grid grid-cols-6 gap-2 mt-4">
        {domains.map((domain) => (
          <div
            key={domain.key}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 hover:shadow-md ${domain.bg}`}
          >
            <span className={`text-xs font-semibold ${domain.color} mb-1`}>
              {domain.label}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {counts[domain.key] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}