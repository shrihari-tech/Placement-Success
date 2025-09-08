// placementOpHead/ophome/placement/page.js
'use client';
import React from 'react';
import Navbar from '../navbar';

export default function PlacementPage() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <main className="ml-[72px] p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Placement</h1>
        <p className="text-gray-600">This is the Placement page content.</p>
        {/* Add placement-related components here */}
      </main>
    </div>
  );
}