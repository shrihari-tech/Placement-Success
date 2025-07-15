"use client";
import React, { useState } from "react";
import NavBar from "../navBar/page";
import Image from "next/image";
// import { FaSearch } from "react-icons/fa"; //search Icons
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';
import { useDataContext } from '../context/dataContext';



export default function HomePage() {

  const { userName } = useDataContext();
  const [showModel ,setShowModal] = useState(false);
  const [modelhead,setModelHead] = useState('');
  //to assume live date
  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  const formattedDate = `${mm}/${dd}/${yyyy}`;
  const monthyear = `${mm}` - 1;
  const currentmonth = `${mm}/${yyyy}`;
  const premonth = `${monthyear}/${yyyy}`;
  const CustomDot = ({ cx, cy }) => {
  return (
    <g>
      {/* Outermost light blue circle */}
      <circle cx={cx} cy={cy} r={9} fill="#c7d2fe" />
      {/* Middle white circle */}
      <circle cx={cx} cy={cy} r={5} fill="#ffffff" />
      {/* Innermost blue circle */}
      <circle cx={cx} cy={cy} r={3} fill="#3b82f6" />
    </g>
  );
};
 const handleclosemodel = () => {
    setShowModal(false);
    setModelHead('');
  }

  return (
    <div className="container justify-center items-center mx-auto p-4">
      <NavBar />
      <div className="border-b-2 border-gray-300  mb-10 ms-[-35] me-[-30] ">
            <p
              className="ms-10 text-2xl text-gray-700  font-semibold mb-4 flex flex-row"
            >Hi {userName}  <Image
                src='/waving-hand_1f44b 1.svg'           
                alt="hand"
                className="mt-[-4] animate-bounce ms-2 rotate-y-180"
                width={35}
                height={35}
               style={{
                  animation: 'wave 1.5s ease-in-out infinite',
                  transformOrigin: 'bottom right',
                }}
                />  
                <style jsx>{`
                  @keyframes wave {
                    0% { transform: rotate(0deg); }
                    10% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    30% { transform: rotate(14deg); }
                    40% { transform: rotate(-4deg); }
                    50% { transform: rotate(10deg); }
                    60%, 100% { transform: rotate(0deg); }
                  }
                `}</style>
             
            </p>
        </div>
      {/* Main Content */}
      <div className=" p-7 ms-[-30] mt-[-39]">
        <div>
           {/* Live Count Section */}
        <h2 className="text-s text-gray-700 font-semibold mb-4">Live Count</h2>
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
          <h4 className="text-s text-gray-700 font-semibold">Placement projection</h4>

          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Current month chart */}
            <div className="bg-white rounded-xl shadow-md  p-4 w-full md:w-1/2">
            <div className="flex flex-row mb-3">
              <div className="flex flex-col ">
              <h2 className="font-semibold ms-2 text-[12px] mb-5 text-gray-700">Current month</h2>
              <Image
                src='/Line-1.svg'
                alt="Line-1"
                width={140}
                height={140}
                className="mt-[-20]"
              />
              </div>
              <div>
                <Image
                src='/Line-2.svg'
                alt="Line-2"
                width={540}
                height={440}
                className="mt-[19.5px] ml-[-0.5px]"
              />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={[
                { name: "FSD", value: 56 },
                { name: "DA & DS", value: 64 },
                { name: "Banking", value: 76 },
                { name: "DM", value: 78 },
                { name: "SAP", value: 70 },
                { name: "DevOps", value: 37 },
              ]}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#d1d5db" />
                <XAxis 
                  dataKey="name"
                  interval={0}
                  tick={{ textAnchor: "middle", fontSize: 10 }}
                  padding={{ left: 60, right: 60 }}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                {/* Gradient Area (below the line) */}
                <Area
                  type="monotone"
                  dataKey="value"
                  fill="url(#colorUv)"
                  stroke="none"
                />

                {/* Main Line */}
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
              </ComposedChart>
            </ResponsiveContainer>
              <div className="flex justify-center items-center text-sm text-gray-500 mt-2 gap-1.5">
                <Image 
                  src='/LegendNode.svg' 
                  width={16} 
                  height={16} 
                  alt="legendNode"
                />
                <span>{currentmonth}</span>
              </div>
            </div>

            {/* Previous month chart */}
            <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-1/2">
              <div className="flex flex-row mb-3">
              <div className="flex flex-col ">
              <h2 className="font-semibold text-[12px] mb-5 ms-2 text-gray-700">Previous month</h2>
              <Image
                src='/Line-1.svg'
                alt="Line-1"
                width={140}
                height={140}
                className="mt-[-20]"
              />
              </div>
              <div>
                <Image
                src='/Line-2.svg'
                alt="Line-2"
                width={540}
                height={440}
                className="mt-[19.5px] ml-[-0.5px]"
              />
              </div>
            </div>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={[
                  { name: "FSD", value: 27 },
                  { name: "DA & DS", value: 64 },
                  { name: "Banking", value: 36 },
                  { name: "DM", value: 58 },
                  { name: "SAP", value: 80 },
                  { name: "DevOps", value: 67 },
                ]}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#d1d5db" />
                  <XAxis 
                    dataKey="name"
                    interval={0}
                    tick={{ textAnchor: "middle", fontSize: 10 }}
                    padding={{ left: 60, right: 60 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  {/* Gradient Area (below the line) */}
                  <Area
                    type="monotone"
                    dataKey="value"
                    fill="url(#colorUv)"
                    stroke="none"
                  />

                  {/* Main Line */}
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
                </ComposedChart>
              </ResponsiveContainer>
              <div className="flex justify-center items-center text-sm text-gray-500 mt-2 gap-1.5">
                <Image 
                  src='/LegendNode.svg' 
                  width={16} 
                  height={16} 
                  alt="legendNode"
                />
                <span>{premonth}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Domain */}
        <div className="mt-10">
          <div className="text-s text-gray-700 font-semibold mb-8 flex flex-col">
            <h1>Domain</h1>
          </div>
          <div className="flex flex-row gap-3">
            {/* full Stack */}
            <button className="flex flex-row border-1 border-gray-500 text-sm font-semibold rounded-lg px-2 py-1 text-gray-700 cursor-pointer"
            onClick={()=>{setShowModal(true)
              setModelHead('Full Stack Development')
            }}
            >
              <Image
                src='/computer.svg'
                alt="Fullstack"
                width={15}
                height={15}
              /> <span className="px-2 pt-0.5 text-[#404040]">Full Stack Development</span>
            </button>
            {/* Data analytics */}
             <button className="flex flex-row border-1 text-sm border-gray-500 font-semibold rounded-lg px-2 py-1 text-gray-700 cursor-pointer"
             onClick={()=>{setShowModal(true)
              setModelHead('Data Analytics & Science')
             }}
             >
              <Image
                src='/bar_chart_4_bars.svg'
                alt="Fullstack"
                width={15}
                height={15}
              />  <span className="px-2 pt-0.5">Data Analytics & Science</span>
            </button>
            {/* Banking & Financial Services */}
             <button className="flex flex-row border-1 text-sm border-gray-500 font-semibold rounded-lg px-2 py-1 text-gray-700 cursor-pointer"
             onClick={()=>{setShowModal(true)
              setModelHead('Banking & Financial Services')
             }}
             >
              <Image
                src='/account_balance.svg'
                alt="Fullstack"
                width={15}
                height={15}
              />  <span className="px-2 pt-0.5">Banking & Financial Services</span>
            </button>
            {/* Digital Marketing */}
             <button className="flex flex-row border-1 text-sm border-gray-500 font-semibold rounded-lg px-2 py-1 text-gray-700 cursor-pointer"
             onClick={()=>{setShowModal(true)
              setModelHead('Digital Marketing')
             }}
             >
              <Image
                src='/ad.svg'
                alt="Fullstack"
                width={15}
                height={15}
              />  <span className="px-2 pt-0.5">Digital Marketing</span>
            </button>
            {/* SAP */}
             <button className="flex flex-row border-1 text-sm border-gray-500 font-semibold rounded-lg px-2 py-1  text-gray-700 cursor-pointer"
              onClick={()=>{setShowModal(true)
                setModelHead('SAP')
              }}
             >
              <Image
                src='/device_hub.svg'
                alt="Fullstack"
                width={15}
                height={15}
              />  <span className="px-2 pt-0.5">SAP</span>
            </button>
            {/* DevOps */}
             <button className="flex flex-row border-1 text-sm border-gray-500 font-semibold rounded-lg px-2 py-1  text-gray-700 cursor-pointer"
             onClick={()=>{setShowModal(true)
              setModelHead('DevOps')
             }}
             >
              <Image
                src='/deployed_code_history.svg'
                alt="Fullstack"
                width={15}
                height={15}
              /> <span className="px-2 pt-0.5">DevOps</span>
            </button>
          </div>
        </div> 
      </div>
      {showModel && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end"
        onClick={handleclosemodel}
        >
          {/* Modal Container */}
          <div className="bg-[#F8FAFD] w-full max-w-md h-full overflow-y-auto shadow-lg p-6 rounded-l-3xl"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {modelhead}
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Box 1 */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Completed batch count</p>
                <p className="text-2xl font-semibold text-gray-800">52</p>
              </div>

              {/* Box 2 */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Ongoing batch count</p>
                <p className="text-2xl font-semibold text-gray-800">14</p>
              </div>

              {/* Box 3 */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Completed Student count</p>
                <p className="text-2xl font-semibold text-gray-800">1600</p>
              </div>

              {/* Box 4 */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Ongoing Student count</p>
                <p className="text-2xl font-semibold text-gray-800">230</p>
              </div>

              {/* Box 5 */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Placement eligible count</p>
                <p className="text-2xl font-semibold text-gray-800">30</p>
              </div>

              {/* Box 6 */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-gray-500 mb-2">Already placed count</p>
                <p className="text-2xl font-semibold text-gray-800">600</p>
              </div>

              {/* Box 7 (Full width) */}
              <div className="bg-white p-4 rounded-xl shadow-sm ">
                <p className="text-xs text-gray-500 mb-2">Yet to be placed</p>
                <p className="text-2xl font-semibold text-gray-800">120</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
