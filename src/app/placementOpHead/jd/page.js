// placementOpHead/ophome/jd/page.js
'use client';
import React from 'react';
import Navbar from '../navbar';

export default function JDPage() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      
      {/* Added pt-16 for mobile header height and pt-1 for desktop */}
      <main className="ml-0 md:ml-[10px] pt-16 md:pt-1 ps-0 h-full overflow-y-auto">
        {/* Header Section with Bottom Border */}
        <div className="border-b-2 border-gray-300 bg-white ps-8 pt-2 mb-2 md:mb-4">
          <h1 className="text-xl md:text-2xl text-gray-700 font-semibold mb-2">
           JD Dashboard
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 ps-7">
          {/* JD Dashboard Content */}
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">JD Dashboard</h2>
              <p className="text-gray-600">Under Development</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}