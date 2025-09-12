// placementOpTl/components/CreateButton.js
'use client';
import React from 'react';

const CreateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center px-4 py-2 bg-[#e6a901] text-white rounded-md hover:bg-[#cc9601] focus:outline-none focus:ring-2 focus:ring-[#e6a901] focus:ring-offset-2 transition-colors duration-200"
    >
      <span className="mr-2 text-lg font-bold">+</span> Create
    </button>
  );
};

export default CreateButton;