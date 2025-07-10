"use client";
import React from "react";
import NavBar from "../navBar/page";
import Image from "next/image";
import { FaSearch } from "react-icons/fa"; //search Icons

export default function HomePage() {
  //to assume live date
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  const formattedDate = `${mm}/${dd}/${yyyy}`;

  return (
    <div className="container justify-center items-center mx-auto  p-4">
      <NavBar />
      {/* Main Content */}
      <div className=" p-6 shadow-md bg-[#F8FAFD] mx-[-30] mt-[-30]">
        {/* Search Input */}
        <div className="mb-15 mt-5 flex flex-row justify-center items-center">
          <input
            type="text"
            placeholder="Search for files"
            className="w-150 ps-8 py-2 border rounded-full "
          />
          <FaSearch 
              className="ms-[-47] p-1.5 text-white bg-[#3F2FB4] rounded-full h-6.5 w-6.5"
          />
        </div>
        <div>
           {/* Live Count Section */}
        <h2 className="text-s text-black font-semibold mb-4">Live Count</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Live Batch Count */}
          <div className="bg-white rounded-3xl  flex items-center justify-between py-5 px-5 w-90">
            <div className="ps-2">
              <h3 className="text-4xl font-medium text-[#696969] mb-2">25</h3>
              <p className="text-[#AEAEAE] text-[13px]">{formattedDate}</p>
              <p className="text-[#404040] mt-10">Live Batch count</p>
            </div>
            <div className="flex items-center justify-center w-auto h-auto">
              <Image
                src="/Home_Batch.svg" // Replace with the actual path to your icon
                alt="Batch Icon"
                className="mb-10"
                width={70}
                height={70}
              />
            </div>
          </div>

          {/* Card 2: Live Student Count */}
          <div className="bg-white p-4 rounded-3xl  flex items-center justify-between py-5 px-5 w-90">
            <div className="ps-2">
              <h3 className="text-4xl font-medium text-[#696969] mb-2">1200</h3>
              <p className="text-[#AEAEAE] text-[13px]">{formattedDate}</p>
              <p className="text-[#404040] mt-10">Live Student count</p>
            </div>
            <div className="flex items-center justify-center w-auto h-auto ">
              <Image
                src="/Home_Live.svg" 
                alt="Student Icon"
                className="mb-10"
                width={70}
                height={70}
              />
            </div>
          </div>

          {/* Card 3: Live Domain Count */}
          <div className="bg-white p-4 rounded-3xl  flex items-center justify-between py-5 px-5 w-90">
            <div className="ps-2">
              <h3 className="text-4xl font-medium text-[#696969] mb-2">13</h3>
              <p className="text-[#AEAEAE] text-[13px]">{formattedDate}</p>
              <p className="text-[#404040] mt-10">Live Domain count</p>
            </div>
            <div className="flex items-center justify-center w-auto h-auto">
              <Image
                src="/Home_Domain.svg" 
                alt="Domain Icon"
                className="mb-10"
                width={70}
                height={70}
              />
            </div>
          </div>
        </div>
        </div>
        {/* Barchat code */}
        <div>
          
        </div>
      </div>
    </div>
  );
}
