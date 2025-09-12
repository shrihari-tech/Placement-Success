// placementOpTl/placement/page.js
"use client";
import React, { useState } from "react"; // ✅ Import useState
import Navbar from "../navbar";
import Tabs from "../components/tab"; // Make sure this component exists and works as expected
// import CompanySPOCTab from "@/app/placementOpTl/placement/CompanySpocTab";
// import ShortListedStudentsTab from "@/app/placementOpTl/placement/ShortListedStudentsTab";
// import PlacementOpportunitiesTab from "./PlacementOpportunitiesTab"
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
    <div className="h-screen overflow-hidden">

      <Navbar />
      <Test />
      <main className="ml-[0px] p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Placement</h1>
       
        {/* Optional: Remove placeholder */}
        <div className="container mx-auto  ">
          {/* ✅ Pass the necessary props to the Tabs component */}
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs} // ✅ Pass the tabs array
            className="mt-6"
          />

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            {/* ✅ Use the render function */}
            {renderActiveTab()}
          </div>
        </div>
      </main>
    </div>
  );
}
