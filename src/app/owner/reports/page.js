// src/app/heads/reports/page.js
"use client";
import React, { useState } from "react";
import Navbar from "../navbar";
import Tabs from "../components/tab";
import BatchesTab from "./BatchesTab";
import PlacementsTab from "./PlacementsTab";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("batches"); // default tab

  const tabs = ["batches", "placements"];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "batches":
        return <BatchesTab />;
      case "placements":
        return <PlacementsTab />;
      default:
        return <BatchesTab />;
    }
  };

  return (
    <div className="overflow-y-auto min-h-screen bg-white">
      <Navbar />

      {/* Added pt-16 for mobile header height and pt-0 for desktop */}
      <main className="mx-auto w-full pt-16 md:pt-0">
        {/* --- HEADER SECTION --- */}
        <div className="border-b-2 border-gray-300 bg-white ps-10 pt-2 mb-2 md:mb-4">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2 flex items-center">
            Reports
          </p>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 ps-7">
          {/* Tabs */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            className="mb-6"
          />

          {/* Active Tab Content */}
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}
