"use client";
import React, { useState, useEffect, useRef } from "react";
import SMENavbar from "../smenavbar";
import { useDataContext } from "../../context/dataContext";
import QuickReport from "./components/QuickReport";
import PlacedStudent from "./components/PlacedStudent";
import Placement from "./components/Placement";
import Tabs from "../components/tab"; // ✅ Import the Tabs component

export default function BatchePage() {
  const { batchesNames } = useDataContext();
  const [domainInfo, setDomainInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("Quick Report");

  // ✅ Define the tabs array
  const tabs = ["Quick Report", "Placed Student", "Placement"];

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
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <SMENavbar />
      <main className="flex-grow overflow-y-auto ml-[25px] p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
          {domainInfo?.name}
        </h2>

        {/* ====== TABS ====== */}
        {/* ✅ Use the imported Tabs component */}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
          className="mb-4" // Optional: Add margin bottom for spacing
        />

        <h2 className="text-lg text-[#cd5e77] mb-3">Placement Report</h2>

        {activeTab === "Quick Report" && <QuickReport />}
        {activeTab === "Placed Student" && <PlacedStudent />}
        {activeTab === "Placement" && <Placement />}
      </main>
    </div>
  );
}
