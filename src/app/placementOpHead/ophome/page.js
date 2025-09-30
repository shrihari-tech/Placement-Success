// placementOpHead/ophome/page.js
"use client";
import React, { useMemo, useEffect, useState } from "react";
import Navbar from "../navbar";
import Dashboard from "./components/dashboard";
import Image from "next/image";
import { useDataContext } from "../../context/dataContext";

export default function Home() {
  const storedUserName = localStorage.getItem("loginUser") || "";
  const namePart = storedUserName.split("@")[0]?.split(".")[1] || "";
  const displayName = namePart
    ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
    : "User";

  const {
    calculateTotalBatchesPerDomain,
    calculateUpcomingBatchesPerDomain,
    batchStatsData = {},
  } = useDataContext();

  // State for total batches data
  const [totalBatchesData, setTotalBatchesData] = useState({
    fullstack: 0,
    data: 0,
    marketing: 0,
    sap: 0,
    banking: 0,
    devops: 0
  });

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch total batches from API
  useEffect(() => {
    const fetchTotalBatches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching total batches from API...");
        const res = await fetch("http://localhost:5000/batches/totalBatches");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Total batches API response:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        // Set the total batches data
        setTotalBatchesData({
          fullstack: data.totalBatchesPerDomain?.fullstack ?? 0,
          data: data.totalBatchesPerDomain?.data ?? 0,
          marketing: data.totalBatchesPerDomain?.marketing ?? 0,
          sap: data.totalBatchesPerDomain?.sap ?? 0,
          banking: data.totalBatchesPerDomain?.banking ?? 0,
          devops: data.totalBatchesPerDomain?.devops ?? 0,
        });

      } catch (err) {
        console.error("Error fetching total batches:", err);
        setError(err.message);
        // Set default values on error
        setTotalBatchesData({
          fullstack: 0,
          data: 0,
          marketing: 0,
          sap: 0,
          banking: 0,
          devops: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTotalBatches();
  }, []);

  const statsData = useMemo(() => {
    const totalBatchesPerDomain = {
      fullstack: totalBatchesData.fullstack,
      data: totalBatchesData.data,
      marketing: totalBatchesData.marketing,
      sap: totalBatchesData.sap,
      banking: totalBatchesData.banking,
      devops: totalBatchesData.devops,
    };

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
      yetToPlaceStudentsPerDomain,
    };
  }, [
    totalBatchesData,
    calculateUpcomingBatchesPerDomain,
    batchStatsData,
  ]);

  const [graphData, setGraphData] = useState({
    previousData: [],
    currentData: [],
  });

useEffect(() => {
  const fetchGraphData = async () => {
    try {
      const res = await fetch("http://localhost:5000/students/graph-data");
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed with status ${res.status}: ${text}`);
      }
      const data = await res.json();
      setGraphData(data);
    } catch (err) {
      console.error("Graph fetch error:", err);
    }
  };
  fetchGraphData();
}, []);


  return (
    <div className="overflow-y-auto min-h-screen bg-gray-50">
      <Navbar />

      {/* Added pt-16 for mobile header height and pt-0 for desktop */}
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
        <div className="container mx-auto px-2 ps-6">
          {/* Page Title with Hi text and animation */}
          <div className="mb-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
            </div>
          </div>
          {/* Dashboard Container */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Dashboard graphData={graphData} statsData={statsData} />
          </div>
        </div>
      </main>
    </div>
  );
}
