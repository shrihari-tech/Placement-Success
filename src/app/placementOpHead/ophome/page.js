// placementOpHead/ophome/page.js
"use client";
import React, { useMemo } from "react";
import Navbar from "../navbar";
import Dashboard from "./components/dashboard";
import Image from "next/image";
import { useDataContext } from "../../context/dataContext";

export default function Home() {
  // Get user name from localStorage
  const storedUserName = localStorage.getItem("loginUser") || "";
  const namePart = storedUserName.split("@")[0]?.split(".")[1] || "";
  const displayName = namePart
    ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
    : "User";

  // Use context to get data - this is the data calling in page.js
  const {
    calculateTotalBatchesPerDomain,
    calculateUpcomingBatchesPerDomain,
    batchStatsData = {},
  } = useDataContext();

  // Calculate all stats data in page.js
  const statsData = useMemo(() => {
    const totalBatchesPerDomain = calculateTotalBatchesPerDomain();
    const upcomingBatchesPerDomain = calculateUpcomingBatchesPerDomain();
    
    const placedStudentsPerDomain = {
      fullstack: batchStatsData.fullstack?.alreadyPlaced ?? 0,
      data: batchStatsData.data?.alreadyPlaced ?? 0,
      banking: batchStatsData.banking?.alreadyPlaced ?? 0,
      marketing: batchStatsData.marketing?.alreadyPlaced ?? 0,
      sap: batchStatsData.sap?.alreadyPlaced ?? 0,
      devops: batchStatsData.devops?.alreadyPlaced ?? 0,
    };

    const yetToPlaceStudentsPerDomain = {
      fullstack: batchStatsData.fullstack?.yetToPlace ?? 0,
      data: batchStatsData.data?.yetToPlace ?? 0,
      banking: batchStatsData.banking?.yetToPlace ?? 0,
      marketing: batchStatsData.marketing?.yetToPlace ?? 0,
      sap: batchStatsData.sap?.yetToPlace ?? 0,
      devops: batchStatsData.devops?.yetToPlace ?? 0,
    };

    return {
      totalBatchesPerDomain,
      upcomingBatchesPerDomain,
      placedStudentsPerDomain,
      yetToPlaceStudentsPerDomain
    };
  }, [calculateTotalBatchesPerDomain, calculateUpcomingBatchesPerDomain, batchStatsData]);

  // Graph data
  const graphData = {
    previousData: [
      { name: "2", value: 8 },
      { name: "4", value: 9 },
      { name: "6", value: 10 },
      { name: "8", value: 24 },
      { name: "10", value: 30 },
      { name: "12", value: 30 },
    ],
    currentData: [
      { name: "2", value: 10 },
      { name: "4", value: 12 },
      { name: "6", value: 15 },
      { name: "8", value: 28 },
      { name: "10", value: 32 },
      { name: "12", value: 35 },
    ],
  };

  return (
    <div className="overflow-y-auto min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main className="mx-auto w-full">
        {/* --- HEADER SECTION --- */}
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

        {/* Main Content */}
        <div className="container mx-auto px-4 ps-7">
          {/* Page Title with Hi text and animation */}
          <div className="mb-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
            </div>
          </div>
          {/* Dashboard Container */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Dashboard 
              graphData={graphData} 
              statsData={statsData} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}