// components/flipcard/flipcard.js
"use client";

import React from 'react';

export default function FlipCard({ frontContent, backContent, isActive, onClick }) { // Accept isActive and onClick props
  return (
    <div
      onClick={onClick} // Handle click
      className={`
        relative cursor-pointer overflow-hidden
        w-20 h-56 sm:h-70
        ${isActive ? 'w-80 md:w-90' : 'w-25'} // Adjust width based on active state
        transition-all duration-500 ease-in-out
        bg-white rounded-xl shadow-2xl
        ${isActive ? 'z-[100]' : ''} // Bring active card to front
      `}
    >
      {/* Front Side - Always present, opacity changes */}
      <div className={`
        absolute inset-0 flex items-center justify-start p-2 transition-opacity duration-300 w-70
        // Hide front when active
        ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}>
        {frontContent}
      </div>

      {/* Back Side - Always present, opacity and scale change */}
      <div className={`
        absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out
        // Show and style back when active
        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}>
        {backContent}
      </div>
    </div>
  );
}