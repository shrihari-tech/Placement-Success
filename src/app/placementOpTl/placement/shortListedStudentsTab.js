// placementOpTl/placement/shortListedStudents.js
'use client';
import React from 'react';
import Navbar from '../navbar';

export default function ShortListedStudentsTab() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <main className="ml-[72px] p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Shortlisted Students</h1>
        <p className="text-gray-600">This is the Shortlisted Students page content.</p>
        {/* Add shortlisted students related components here */}
      </main>
    </div>
  );
}