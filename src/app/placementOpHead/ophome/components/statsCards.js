// ophome/components/statsCards.js
"use client";
import React from "react";

const renderDomainCounts = (counts) => {
  const domains = [
    {
      key: "fullstack",
      label: "FSD",
      colorClass: "text-blue-600",
      bgClass: "bg-blue-50",
    },
    {
      key: "data",
      label: "DADS",
      colorClass: "text-green-600",
      bgClass: "bg-green-50",
    },
    {
      key: "marketing",
      label: "DM",
      colorClass: "text-purple-600",
      bgClass: "bg-purple-50",
    },
    {
      key: "sap",
      label: "SAP",
      colorClass: "text-yellow-600",
      bgClass: "bg-yellow-50",
    },
    {
      key: "banking",
      label: "BFS",
      colorClass: "text-indigo-600",
      bgClass: "bg-indigo-50",
    },
    {
      key: "devops",
      label: "DV",
      colorClass: "text-pink-600",
      bgClass: "bg-pink-50",
    },
  ];

  return domains.map((domain) => (
    <div
      key={domain.key}
      className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 hover:shadow-md ${domain.bgClass}`}
    >
      <span className={`text-xs font-semibold ${domain.colorClass} mb-1`}>
        {domain.label}
      </span>
      <span className="text-lg font-bold text-gray-800">
        {(counts && counts[domain.key]) ?? 0}
      </span>
    </div>
  ));
};

const StatsCards = ({ 
  totalBatchesPerDomain,
  upcomingBatchesPerDomain,
  placedStudentsPerDomain,
  yetToPlaceStudentsPerDomain
}) => {
  const statCards = [
    {
      title: "Total Batches",
      data: totalBatchesPerDomain || {},
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      title: "Upcoming Batches",
      data: upcomingBatchesPerDomain || {},
      color: "from-emerald-500 to-teal-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-emerald-600"
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
      ),
    },
    {
      title: "Placed Students",
      data: placedStudentsPerDomain || {},
      color: "from-amber-500 to-orange-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Yet to be Placed Students",
      data: yetToPlaceStudentsPerDomain || {},
      color: "from-violet-500 to-purple-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-violet-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-gray-50 mr-3">{card.icon}</div>
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {renderDomainCounts(card.data)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;