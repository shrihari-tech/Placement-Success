'use client';
import React from 'react';
import SMENavbar from '../smenavbar';

export default function BatchePage() {
  return (
    <div className="h-screen overflow-hidden">
      <SMENavbar />
      <main className="ml-[72px] p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Batches</h1>
        <p className="text-gray-600">This is the Batches page content.</p>
        {/* Add batch-related components here */}
      </main>
    </div>
  );
}
