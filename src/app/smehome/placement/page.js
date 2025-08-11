"use client";
import React, { useState, useEffect, useRef } from "react";
import SMENavbar from "../smenavbar";
import { useDataContext } from "../../context/dataContext";
import BatchListTab from "../batches/batchListTab/page";
import TrainerUpdateTab from "../batches/trainerUpdateTab/page";
import BatchHistoryTab from "../batches/batchHistoryTab/page";
import QuickReport from "./components/QuickReport";

export default function BatchePage() {
  const { batchesNames } = useDataContext(); // ❌ removed getBatchHead
  const [domainInfo, setDomainInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("Quick Report");

  const domainDetails = {
    fs: { name: "Full Stack Development", icon: "/computer.svg" },
    da: { name: "Data Analytics & Science", icon: "/bar_chart_4_bars.svg" },
    mk: { name: "Digital Marketing", icon: "/ad.svg" },
    dv: { name: "DevOps", icon: "/deployed_code_history.svg" },
    bk: { name: "Banking & Financial Services", icon: "/account_balance.svg" },
    sap: { name: "SAP", icon: "/device_hub.svg" },
  };

  useEffect(() => {
    const rawDomainCode = localStorage.getItem("domainCode");
    const domainCodeMap = {
      fullstack: "fs",
      dataanalytics: "da",
      marketing: "mk",
      devops: "dv",
      banking: "bk",
      sap: "sap",
    };

    const shortCode = domainCodeMap[rawDomainCode];
    if (shortCode) {
      setDomainInfo(domainDetails[shortCode]);
      // ✅ no fetching here — batchesNames is already in context
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <SMENavbar />
      <main className="flex-grow overflow-y-auto ml-[25px] p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
          {domainInfo?.name}
        </h2>

        {/* Tabs */}
        <div className="flex bg-[#fdeff1] rounded-xl py-2 mb-4 relative mt-5">
          <div
            className={`absolute top-1 bottom-1 py-2 bg-[#f9f9f9] rounded-lg shadow-sm transition-all
            duration-300 ease-in-out z-0
            ${
              activeTab === "Quick Report"
                ? "left-1 w-[calc(33%-0.5rem)]"
                : activeTab === "Placed Student"
                ? "left-[calc(33%+0.25rem)] w-[calc(33%-0.5rem)]"
                : "left-[calc(66%+0.25rem)] w-[calc(33%-0.5rem)]"
            }`}
          />
          {["Quick Report", "Placed Student", "Placement"].map((label) => (
            <span
              key={label}
              className={`flex-1 cursor-pointer items-center text-center py-2 text-xs font-semibold select-none relative z-10
              ${activeTab === label ? "text-indigo-600" : "text-gray-700"}`}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </span>
          ))}
        </div>

        <h2 className="text-lg text-[#cd5e77] mb-3">Placement Report</h2>

        {activeTab === "Quick Report" && <QuickReport />}
        {activeTab === "Placed Student" && <TrainerUpdateTab />}
        {activeTab === "Placement" && <BatchHistoryTab />}
      </main>
    </div>
  );
}
