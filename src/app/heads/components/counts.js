"use client";
import React, { useMemo } from "react";
import { useDataContext } from "../../context/dataContext"; 

// Reusable function to render domain-specific counts
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

const Counts = () => {
  const {
    calculateUpcomingBatchesPerDomain, // For Ongoing Batches
    allStudentData, // For Live Students
    // Use unique trainer arrays for all domains
    fullstackTrainers,
    dataanalyticsTrainers,
    marketingTrainers,
    sapTrainers,
    bankingTrainers,
    devopsTrainers,
  } = useDataContext();

  // 1. Get Ongoing Batches
  const ongoingBatchesPerDomain = calculateUpcomingBatchesPerDomain();

  // 2. Calculate Live Students per Domain (students with status "Ongoing")
  const liveStudentsPerDomain = useMemo(() => {
    const counts = {
      fullstack: 0,
      data: 0,
      marketing: 0,
      sap: 0,
      banking: 0,
      devops: 0,
    };

    allStudentData.forEach(student => {
      if (student.status === "Ongoing") {
        if (student.batch?.startsWith('FS')) {
          counts.fullstack += 1;
        } else if (student.batch?.startsWith('DA')) {
          counts.data += 1;
        } else if (student.batch?.startsWith('MK')) {
          counts.marketing += 1;
        } else if (student.batch?.startsWith('SA')) {
          counts.sap += 1;
        } else if (student.batch?.startsWith('BK')) {
          counts.banking += 1;
        } else if (student.batch?.startsWith('DV')) {
          counts.devops += 1;
        }
      }
    });

    return counts;
  }, [allStudentData]);

  // 3. Calculate Trainer Count per Domain (Unique Names)
  const trainerCountPerDomain = useMemo(() => {
    return {
      fullstack: fullstackTrainers.length,
      data: dataanalyticsTrainers.length,
      marketing: marketingTrainers.length,
      sap: sapTrainers.length,
      banking: bankingTrainers.length,
      devops: devopsTrainers.length,
    };
  }, [
    fullstackTrainers,
    dataanalyticsTrainers,
    marketingTrainers,
    sapTrainers,
    bankingTrainers,
    devopsTrainers,
  ]);

  const countCards = [
    {
      title: "Ongoing Batches",
      data: ongoingBatchesPerDomain,
      color: "from-cyan-500 to-blue-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-cyan-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: "Live Students",
      data: liveStudentsPerDomain,
      color: "from-lime-500 to-green-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-lime-600"
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
      ),
    },
    {
      title: "Trainers",
      data: trainerCountPerDomain,
      color: "from-rose-500 to-pink-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-rose-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {countCards.map((card, index) => (
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

export default Counts;