"use client";

import React, { useEffect, useState, useMemo } from "react";
import SMENavbar from "../smehome/smenavbar";
import Image from "next/image";
import {
  useDataContext,
  fullstackInitial,
  dataanalyticsInitial,
  marketingInitial,
  devopsInitial,
  sapInitial,
  bankingInitial,
  fullstackStudentData,
  dataAnalyticsStudentData,
  marketingStudentData,
  devopsStudentData,
  sapStudentData,
  bankingStudentData,
} from "../context/dataContext";

export default function SMEHomePage() {
  const {
    userName,
    fullstackData = fullstackInitial,
    dataanalyticsData = dataanalyticsInitial,
    marketingData = marketingInitial,
    devopsData = devopsInitial,
    sapData = sapInitial,
    bankingData = bankingInitial,
    fullstackStudent = fullstackStudentData,
    dataanalyticsStudent = dataAnalyticsStudentData,
    marketingStudent = marketingStudentData,
    devopsStudent = devopsStudentData,
    sapStudent = sapStudentData,
    bankingStudent = bankingStudentData,
  } = useDataContext();

  const [domainInfo, setDomainInfo] = useState(null);
  const [overviewData, setOverviewData] = useState(null);

  const domainDetails = {
    fs: { name: "Full Stack Development", icon: "/computer.svg" },
    da: { name: "Data Analytics & Science", icon: "/bar_chart_4_bars.svg" },
    mk: { name: "Digital Marketing", icon: "/ad.svg" },
    dv: { name: "DevOps", icon: "/deployed_code_history.svg" },
    bk: { name: "Banking & Financial Services", icon: "/account_balance.svg" },
    sap: { name: "SAP", icon: "/device_hub.svg" },
  };

  const displayName = useMemo(() => {
    let emailToUse = "";
    if (userName) {
      emailToUse = userName.includes("@") ? userName : "";
    }
    if (!emailToUse) {
      emailToUse = localStorage.getItem("loginUser") || "";
    }
    if (emailToUse) {
      const namePart = emailToUse.split("@")[0]?.split(".")[1] || "";
      return namePart
        ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
        : "User";
    }
    return "User";
  }, [userName]);

  const getDataFromContext = (code) => {
    switch (code) {
      case "fullstack":
        return {
          batches: fullstackData,
          students: fullstackStudent,
        };
      case "dataanalytics":
        return {
          batches: dataanalyticsData,
          students: dataanalyticsStudent,
        };
      case "marketing":
        return {
          batches: marketingData,
          students: marketingStudent,
        };
      case "devops":
        return {
          batches: devopsData,
          students: devopsStudent,
        };
      case "sap":
        return {
          batches: sapData,
          students: sapStudent,
        };
      case "banking":
        return {
          batches: bankingData,
          students: bankingStudent,
        };
      default:
        return { batches: [], students: [] };
    }
  };

  useEffect(() => {
    const rawDomainCode = localStorage.getItem("domainCode");

    // Mapping full domain names to short codes
    const domainCodeMap = {
      fullstack: "fs",
      dataanalytics: "da",
      marketing: "mk",
      devops: "dv",
      banking: "bk",
      sap: "sap",
    };

    const actualCode = rawDomainCode;
    const shortCode = domainCodeMap[rawDomainCode];

    if (!actualCode || !shortCode) {
      console.error("Invalid or missing domain code");
      return;
    }

    // Set domain info for UI display
    setDomainInfo(domainDetails[shortCode]);

    // Get data from context
    const { batches: fetchedBatches = [], students: fetchedStudents = [] } =
      getDataFromContext(actualCode);

    const totalBatches = fetchedBatches.length;
    const totalStudents = fetchedStudents.length;

    const ongoingCount = fetchedStudents.filter(
      (s) => s.status?.toLowerCase() === "ongoing"
    ).length;

    const completedCount = fetchedStudents.filter(
      (s) => s.status?.toLowerCase() === "completed"
    ).length;

    const placed = fetchedStudents.filter(
      (s) => s.placement === "Placed"
    ).length;
    const yetToPlace = fetchedStudents.filter(
      (s) => s.placement === "Yet to Place"
    ).length;
    const notPlaced = fetchedStudents.filter(
      (s) => s.placement === "Not Placed"
    ).length;

    const epicCountMap = {};
    fetchedStudents.forEach((s) => {
      if (s.epicStatus) {
        epicCountMap[s.epicStatus] = (epicCountMap[s.epicStatus] || 0) + 1;
      }
    });

    setOverviewData({
      totalBatches,
      totalStudents,
      ongoingCount,
      completedCount,
      placed,
      yetToPlace,
      notPlaced,
      epicCountMap,
    });
  }, [
    fullstackData,
    dataanalyticsData,
    marketingData,
    devopsData,
    sapData,
    bankingData,
    fullstackStudent,
    dataanalyticsStudent,
    marketingStudent,
    devopsStudent,
    sapStudent,
    bankingStudent,
  ]);

  return (
    <div className="overflow-hidden min-h-screen bg-gray-50">
      <SMENavbar />

      <main className="mx-auto w-full">
        {/* --- HEADER SECTION (UNCHANGED AS REQUESTED) --- */}
        <div className="border-b-2 border-gray-300 bg-white ps-10 pt-2 mb-2 md:mb-4">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2 flex items-center">
            Hi {displayName}
            <Image
              src="/waving-hand_1f44b 1.svg"
              alt="hand"
              className="ml-2 animate-bounce"
              width={28}
              height={28}
              style={{
                animation: "wave 1.5s ease-in-out infinite",
                transformOrigin: "bottom right",
              }}
            />
          </p>
        </div>

        <style jsx>{`
          @keyframes wave {
            0% {
              transform: rotate(0deg);
            }
            10% {
              transform: rotate(14deg);
            }
            20% {
              transform: rotate(-8deg);
            }
            30% {
              transform: rotate(14deg);
            }
            40% {
              transform: rotate(-4deg);
            }
            50% {
              transform: rotate(10deg);
            }
            60%,
            100% {
              transform: rotate(0deg);
            }
          }
        `}</style>
        {/* --- END HEADER SECTION --- */}

        {/* --- MAIN CONTENT AREA (ENHANCED UI) --- */}
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {overviewData && (
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                {domainInfo?.name}
              </h2>

              {/* Stats Grid - Modified Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Total Batches Card - Full width on small screens, 1/2 width on md/lg */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 sm:col-span-2 lg:col-span-2">
                  <div className="flex items-stretch h-full">
                    {" "}
                    {/* Use flex for side-by-side layout */}
                    {/* Icon Container - Larger and on the left */}
                    <div className="flex items-center justify-center bg-[#f5dee3] px-3 md:px-4">
                      {" "}
                      {/* Adjust padding for width */}
                      <div className="p-2 md:p-3 rounded-lg text-[#cd5e77]">
                        {" "}
                        {/* Icon wrapper, adjust padding if needed */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 md:h-10 md:w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          {/* Increased icon size */}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Text Content - Takes remaining space */}
                    <div className="flex-grow p-4 md:p-5 flex flex-col justify-center">
                      {" "}
                      {/* flex-col justify-center for vertical alignment */}
                      <p className="text-xs md:text-lg font-medium text-gray-500">
                        Total Batches
                      </p>
                      <p className="text-xl md:text-3xl font-bold text-gray-700 mt-1">
                        {overviewData.totalBatches}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placement Block - Full width on small screens, 1/2 width on md/lg */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 sm:col-span-2 lg:col-span-2">
                  <div className="p-4 md:p-5">
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#cd5e77]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      Placement
                    </h3>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-[#f5dfe4] rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-[#FAEFF1] transition-colors duration-200">
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                          Placed
                        </p>
                        <p className="text-lg md:text-xl font-bold text-pink-700 mt-1">
                          {overviewData.placed}
                        </p>
                      </div>
                      <div className="bg-[#f5dfe4] rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-[#FAEFF1] transition-colors duration-200">
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                          Yet to Place
                        </p>
                        <p className="text-lg md:text-xl font-bold text-pink-700 mt-1">
                          {overviewData.yetToPlace}
                        </p>
                      </div>
                      {/* Optional: Uncomment if you want to display Not Placed count
                      <div className="bg-red-50 rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-red-100 transition-colors duration-200 col-span-2 sm:col-span-1">
                        <p className="text-xs md:text-sm font-medium text-gray-600">Not Placed</p>
                        <p className="text-lg md:text-xl font-bold text-red-700 mt-1">{overviewData.notPlaced}</p>
                      </div>
                      */}
                    </div>
                  </div>
                </div>

                {/* Student Count Block - Full width on small/medium screens, 1/2 width on lg */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 sm:col-span-2 lg:col-span-2">
                  <div className="p-4 md:p-5">
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#cd5e77]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      Student Count
                    </h3>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="bg-[#f5dfe4] rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-[#FAEFF1] transition-colors duration-200">
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                          Ongoing
                        </p>
                        <p className="text-lg md:text-xl font-bold text-pink-700 mt-1">
                          {overviewData.ongoingCount}
                        </p>
                      </div>
                      <div className="bg-[#f5dfe4] rounded-lg md:rounded-xl p-3 md:p-4 text-center hover:bg-[#FAEFF1] transition-colors duration-200">
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                          Completed
                        </p>
                        <p className="text-lg md:text-xl font-bold text-pink-700 mt-1">
                          {overviewData.completedCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EPIC Status Block - Full width on small/medium screens, 1/2 width on lg */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 sm:col-span-2 lg:col-span-2">
                  <div className="p-4 md:p-5 h-full flex flex-col">
                    {" "}
                    {/* Ensure full height and flex column for better alignment */}
                    <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 flex items-center flex-shrink-0">
                      {" "}
                      {/* Flex shrink prevents title from growing */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 mr-2 text-[#cd5e77]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        />
                      </svg>
                      EPIC Status
                    </h3>
                    {Object.entries(overviewData.epicCountMap).length > 0 ? (
                      <div className="grid grid-cols-4 gap-2 md:gap-3 overflow-y-auto flex-grow">
                        {Object.entries(overviewData.epicCountMap).map(
                          ([status, count]) => (
                            <div
                              key={status}
                              className="bg-[#f5dee3] rounded-lg p-2 md:p-3 text-center hover:bg-[#faeef1] transition-colors duration-200 flex flex-col items-center justify-center min-h-[60px]"
                            >
                              {" "}
                              {/* Light Tint background, slightly lighter on hover */}
                              <p className="text-[0.65rem] md:text-xs font-semibold text-gray-700 truncate w-full">
                                {status}
                              </p>{" "}
                              {/* Darker text for contrast */}
                              <p className="text-base md:text-lg font-bold text-[#cd5e77] mt-1">
                                {count}
                              </p>{" "}
                              {/* Base Color for count */}
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic py-3 md:py-4 text-center text-sm flex-grow flex items-center justify-center">
                        {" "}
                        {/* Center text if empty */}
                        No EPIC data available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* --- END MAIN CONTENT AREA --- */}
      </main>
    </div>
  );
}
