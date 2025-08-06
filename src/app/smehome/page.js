"use client";

import React, { useEffect, useState } from "react";
import SMENavbar from "../smehome/smenavbar";
import Image from "next/image";
import { useDataContext } from "../context/dataContext";
import {
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
  const { userName } = useDataContext();

  const [domainInfo, setDomainInfo] = useState(null);
  const [overviewData, setOverviewData] = useState(null);

  const email = userName || "";
  const prefix = email.split("@")[0];
  const domainFull = email.split("@")[1] || "";
  const namePart = prefix?.split(".")[1] || "";

  const displayName = namePart
    ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
    : "User";

  const domainDetails = {
    fs: { name: "Full Stack Development", icon: "/computer.svg" },
    da: { name: "Data Analytics & Science", icon: "/bar_chart_4_bars.svg" },
    mk: { name: "Digital Marketing", icon: "/ad.svg" },
    dv: { name: "DevOps", icon: "/deployed_code_history.svg" },
    bk: { name: "Banking & Financial Services", icon: "/account_balance.svg" },
    sap: { name: "SAP", icon: "/device_hub.svg" },
  };

  const getDomainData = (code) => {
    const dataMap = {
      fs: { batches: fullstackInitial, students: fullstackStudentData },
      da: { batches: dataanalyticsInitial, students: dataAnalyticsStudentData },
      mk: { batches: marketingInitial, students: marketingStudentData },
      dv: { batches: devopsInitial, students: devopsStudentData },
      sap: { batches: sapInitial, students: sapStudentData },
      bk: { batches: bankingInitial, students: bankingStudentData },
    };
    return dataMap[code] || { batches: [], students: [] };
  };

  useEffect(() => {
    const domainCode = localStorage.getItem("domainCode");
    if (!domainCode) return;

    if (domainDetails[domainCode]) {
      setDomainInfo(domainDetails[domainCode]);
    }

    const { batches, students } = getDomainData(domainCode);

    const totalBatches = batches.length;
    const totalStudents = students.length;
    const ongoingCount = students.filter(
      (s) => s.status?.toLowerCase() === "ongoing"
    ).length;
    const completedCount = students.filter(
      (s) => s.status?.toLowerCase() === "completed"
    ).length;

    const placed = students.filter((s) => s.placement === "Placed").length;
    const yetToPlace = students.filter(
      (s) => s.placement === "Yet to Place"
    ).length;
    const notPlaced = students.filter(
      (s) => s.placement === "Not Placed"
    ).length;

    const epicCountMap = {};
    students.forEach((s) => {
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
  }, []);

  return (
    <div className="overflow-hidden min-h-screen bg-gray-50">
      <SMENavbar />

      <main className="mx-auto w-full">
        {/* Header */}
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

          {domainInfo?.name && (
            <div className="text-lg font-semibold text-gray-700 mt-2">
              {domainInfo.name}
            </div>
          )}
        </div>

        {/* Animation */}
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

        {/* Stats Grid */}
        <div className="p-4 md:p-10">
          {overviewData && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Domain Overview
              </h2>

              {/* Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Batches */}
                <div className="bg-white shadow rounded-xl p-6 flex items-center justify-center text-center text-[#6750A4] text-2xl font-bold">
                  Total Batches: {overviewData.totalBatches}
                </div>

                {/* Student Count Block */}
                <div className="bg-white shadow rounded-xl p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-3">
                    Student Count
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-indigo-50 rounded p-4">
                      <p className="text-sm text-gray-500">Ongoing</p>
                      <p className="text-lg font-bold text-[#6750A4]">
                        {overviewData.ongoingCount}
                      </p>
                    </div>
                  <div className="bg-indigo-50 rounded p-4">
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-lg font-bold text-[#6750A4]">
                        {overviewData.completedCount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placement Block */}
                <div className="bg-white shadow rounded-xl p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-3">
                    Placement
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 rounded p-4">
                      <p className="text-sm text-gray-500">Placed</p>
                      <p className="text-lg font-bold text-green-600">
                        {overviewData.placed}
                      </p>
                    </div>
                    <div className="bg-yellow-50 rounded p-4">
                      <p className="text-sm text-gray-500">Yet to Place</p>
                      <p className="text-lg font-bold text-yellow-600">
                        {overviewData.yetToPlace}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EPIC Status Block */}
                <div className="bg-white shadow rounded-xl p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-3">
                    EPIC Status
                  </h3>
                  {Object.entries(overviewData.epicCountMap).length > 0 ? (
                    <ul className="space-y-2 text-sm text-gray-600">
                      {Object.entries(overviewData.epicCountMap).map(
                        ([status, count]) => (
                          <li key={status} className="flex justify-between">
                            <span>{status}</span>
                            <span className="font-bold text-[#6750A4]">
                              {count}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      No EPIC data available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
