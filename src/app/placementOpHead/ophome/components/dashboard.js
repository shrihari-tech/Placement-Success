// ophome/components/dashboard.js
"use client";
import React from "react";
import StatsCards from "./statsCards";
import Graphs from "./graphs";

const Dashboard = ({ graphData, statsData }) => {
  const { previousData, currentData } = graphData || {};
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div>
        <h2 className="text-xl text-gray-700 font-semibold mb-4">Overview</h2>
        <StatsCards {...statsData} />
      </div>

      {/* Graphs */}
      <div>
        <h2 className="text-xl text-gray-700 font-semibold mb-4">Statistics</h2>
        <Graphs previousData={graphData.previousData} currentData={graphData.currentData} />
     
      </div>
    </div>
  );
};

export default Dashboard;