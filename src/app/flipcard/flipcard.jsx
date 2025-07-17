'use client';
import React from 'react';

export default function FlipCard({ id, isActive, onClick, frontContent, backContent }) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`
        relative cursor-pointer 
        [perspective:1000px] 
        transition-all duration-500 ease-in-out
        ${isActive ? 'w-72 h-56 sm:w-80 sm:h-64' : 'w-72 h-56 sm:w-80 sm:h-64'}
      `}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700
          [transform-style:preserve-3d] ${isActive ? 'rotate-y-180 scale-105' : ''}
        `}
      >
        {/* Front Side */}
        <div className="absolute text-sm w-full h-full flex items-center justify-center text-center bg-white rounded-xl shadow-xl backface-hidden">
          {frontContent}
        </div>

        {/* Back Side */}
        <div className="absolute w-full  text-sm h-full flex flex-col items-center justify-center text-center bg-[#eaddff] text-gray-700 pt-7 rounded-xl shadow-xl [transform:rotateY(180deg)] backface-hidden">
          {backContent}
        </div>
      </div>
    </div>
  );
}
