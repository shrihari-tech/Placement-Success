"use client";
import React from "react";
import NavBar from "../navBar/page";
import Image from "next/image";
import { FaSearch } from "react-icons/fa"; //search Icons
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,LabelList,ResponsiveContainer,} from "recharts";


export default function HomePage() {
  //to assume live date
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  const formattedDate = `${mm}/${dd}/${yyyy}`;
  const CustomDot = ({ cx, cy }) => {
  return (
    <g>
      {/* Outermost light blue circle */}
      <circle cx={cx} cy={cy} r={10} fill="#c7d2fe" />
      {/* Middle white circle */}
      <circle cx={cx} cy={cy} r={5.5} fill="#ffffff" />
      {/* Innermost blue circle */}
      <circle cx={cx} cy={cy} r={3.5} fill="#3b82f6" />
    </g>
  );
};

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
        <div className="mt-10">
          <h4 className="text-s text-black font-semibold">Placement projection</h4>
          {/* Barchat */}
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {["Current month", "Previous month"].map((title, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 w-full md:w-1/2">
                <h2 className="font-semibold text-[13px] mb-5 text-[#000000] ">{title}</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={[
                    { name: "FSD", value: 56 },
                    { name: "DA & DS", value: 64 },
                    { name: "Banking", value: 76 },
                    { name: "DM", value: 78 },
                    { name: "SAP", value: 70 },
                    { name: "DevOps", value: 37 },
                  ]}>
                    <CartesianGrid 
                    strokeDasharray="3 3"  // dotted line style
                    vertical={true}        // show vertical grid lines
                    horizontal={true}      // show horizontal grid lines
                    stroke="#d1d5db"       // light gray color (Tailwind: gray-300)
                  />
                    <XAxis 
                        dataKey="name" 
                        interval={0} 
                        tick={{ textAnchor: "middle" ,fontSize: 10}} 
                        padding={{ left: 50, right: 50}} 
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 10 }} 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={1}
                      activeDot={{ r: 6 }}
                     dot={<CustomDot />}
                    >
                      <LabelList
                        dataKey="value"
                        position="top"
                        offset={12}
                        style={{ fontSize: 12, fill: "#666" }}
                      />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center items-center text-sm text-gray-500 mt-2 gap-1">
                  <Image 
                    src='/LegendNode.svg' 
                    width={16} 
                    height={16} 
                    alt="legendNode"
                  />
                  <span>2025</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
