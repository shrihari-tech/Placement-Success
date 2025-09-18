// heads/placement/page.js
"use client";
import React from "react";
import Navbar from "../navbar";
import YetToBePlacedTab from "./YetToBeTab";

export default function PlacementPage() {
  return (
    <div className="overflow-y-auto min-h-screen bg-white">
      <Navbar />

      {/* Added pt-16 for mobile header height and pt-0 for desktop */}
      <main className="mx-auto w-full pt-16 md:pt-0">
        {/* --- HEADER SECTION --- */}
        <div className="border-b-2 border-gray-300 bg-white ps-10 pt-2 mb-2 md:mb-4">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2 flex items-center">
            Placement
          </p>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 ps-7">
          <h3 className="text-lg text-gray-700 font-semibold mb-4">
            Yet To Be Placed Students
          </h3>
          {/* Render YetToBePlacedTab directly */}
          <YetToBePlacedTab />
        </div>
      </main>
    </div>
  );
}
