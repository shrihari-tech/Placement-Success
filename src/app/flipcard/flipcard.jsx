// flipcard.js

"use client";
import React from "react";

export default function FlipCard({ frontContent, backContent, isFlipped }) {
  return (
    <div
      className={`
        relative cursor-pointer 
        group
        [perspective:1500px]
        w-[170px] h-[170px]
        md:hover:translate-y-[-200px] 
        md:hover:z-[20]
        transition-all duration-500 ease-in-out
        md:group-hover:scale-110
      `}
    >
      {/* This div handles the flipping animation and now gets the z-index boost */}
      <div
        className={`
          relative 
          w-full h-full transition-transform duration-700
          [transform-style:preserve-3d]
          z-[1]
          ${isFlipped ? 'z-[20]' : ''}
          md:group-hover:z-[20] 
          ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
          md:group-hover:[transform:rotateY(180deg)]
        `}
      >
        {/* Front Side */}
        <div className="absolute inset-0 flex items-center justify-center text-center bg-white rounded-xl shadow-lg backface-hidden p-2">
          {frontContent}
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center 
          text-center bg-white text-gray-700 rounded-xl shadow-lg [transform:rotateY(180deg)] backface-hidden p-2">
          {backContent}
        </div>
      </div>
    </div>
  );
}