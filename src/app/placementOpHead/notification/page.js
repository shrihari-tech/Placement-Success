// placementOpHead/ophome/notification/page.js
'use client';
import React from 'react';
import Navbar from '../navbar';

export default function NotificationPage() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <main className="ml-[72px] p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Notifications</h1>
        <p className="text-gray-600">This is the Notifications page content.</p>
        {/* Add notification-related components here */}
      </main>
    </div>
  );
}