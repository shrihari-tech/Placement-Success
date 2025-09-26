// placementOpTl/placement/page.js
"use client";
import React, { useState } from "react"; // ✅ Import useState
import Navbar from "../navbar";
import Tabs from "../components/tab"; 
import CompanySPOCTab from "./CompanySpocTab";
import ShortListedStudentsTab from "./ShortListedStudentsTab";
import PlacementOpportunitiesTab from "./PlacementOpportunitiesTab";
export default function PlacementPage() {
  // ✅ Add state for active tab
  const [activeTab, setActiveTab] = useState("Company SPOC");

  // ✅ Define the available tabs
  const tabs = [
    "Company SPOC",
    "Shortlisted Students",
    "Placement Opportunities",
  ]; // ✅ Corrected typo

  // ✅ Function to render the correct tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "Company SPOC":
        return <CompanySPOCTab />;
      case "Shortlisted Students":
        return <ShortListedStudentsTab />;
      case "Placement Opportunities":
        return <PlacementOpportunitiesTab />;
      default:
        return <CompanySPOCTab />; // Fallback
    }
  };

 return (
  <div className="h-screen overflow-hidden flex flex-col">
    <Navbar />
    <main className="p-6 flex flex-col flex-1 min-h-0">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Placement</h1>
      <div className="container mx-auto flex flex-col flex-1 min-h-0">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} className="mt-6" />
        <div className="bg-white rounded-lg shadow-md p-6 mt-4 flex-1 min-h-0 overflow-auto">
          {renderActiveTab()}
        </div>
      </div>
    </main>
  </div>
);
}