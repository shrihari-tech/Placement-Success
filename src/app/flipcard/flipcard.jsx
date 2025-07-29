'use client';
import React from 'react';

export default function FlipCard({ frontContent, backContent, isFlipped }) {
  return (
    <div
      className={`
        relative cursor-pointer group
        [perspective:1000px]
        w-85 h-80 sm:w-85 sm:h-80
        md:hover:translate-y-[-15px]
        transition-all duration-500 ease-in-out
      `}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-700
          [transform-style:preserve-3d]
          ${isFlipped ? 'rotate-y-180' : ''}
          group-hover:rotate-y-180
        `}
      >
        {/* Front Side */}
        <div className="absolute text-sm w-full h-full flex items-center justify-center text-center bg-white rounded-xl shadow-2xl backface-hidden transition-all duration-500">
          {frontContent}
        </div>

        {/* Back Side */}
        <div className="absolute w-full text-sm h-full flex flex-col items-center justify-center text-center bg-white text-gray-700 pt-7 rounded-xl shadow-2xl [transform:rotateY(180deg)] backface-hidden">
          {backContent}
        </div>
      </div>
    </div>
  );
}
