// placementOpHead/tl/components/createButton.js
"use client";
import React from "react";

const CreateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 bg-[#9025a1] text-white rounded-md hover:bg-[#731d80] focus:outline-none focus:ring-2 focus:ring-[#9025a1] focus:ring-offset-2 transition-colors duration-200"
    >
      <span className="mr-2 text-lg font-bold">+</span> Create
    </button>
  );
};

export default CreateButton;
