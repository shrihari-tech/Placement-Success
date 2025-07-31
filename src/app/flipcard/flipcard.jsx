'use client';
import React from 'react';

export default function FlipCard({ frontContent, backContent, isFlipped }) {
  return (
    <div
      className={`
        relative cursor-pointer
        z-[1] // Base z-index
        group // Define a group for hover interactions on children
        [perspective:1500px] // 3D perspective
        w-[170px] h-[170px] // Base size (adjust if needed)
        transition-all duration-500 ease-in-out // Smooth transitions for scale, z-index, flip
        md:group-hover:z-[20] // Bring to front on desktop hover
        md:group-hover:scale-110 // Scale up on desktop hover
      `}
    >
      {/* This div handles the flipping animation */}
      <div
        className={`
          relative w-full h-full transition-transform duration-700
          [transform-style:preserve-3d]
          // Apply rotation based on prop (mobile) or group hover (desktop)
          ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
          group-hover:[transform:rotateY(180deg)] // Flip on group hover
        `}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex items-center justify-center text-center bg-white rounded-xl shadow-lg backface-hidden p-2">
          {frontContent}
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center bg-white text-gray-700 pt-4 rounded-xl shadow-lg [transform:rotateY(180deg)] backface-hidden p-2">
          {backContent}
        </div>
      </div>
    </div>
  );
}
