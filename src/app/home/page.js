"use client";
import React, { useState } from "react";
import NavBar from "../navBar/page";
import Image from "next/image";
import { useRef, useEffect } from "react";
import FlipCard from "../flipcard/flipcard";
// import { FaSearch } from "react-icons/fa"; //search Icons
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';
import { useDataContext } from '../context/dataContext';

export default function HomePage() {

  const { userName , batchData, getStatsByBatch } = useDataContext();
  const [showModel ,setShowModal] = useState(false);
  const [modelhead,setModelHead] = useState('');
  //to assume live date

   const [activeCard, setActiveCard] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveCard(null); // 👈 Close the active card
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cards = [
    { id: 'fullstack', title: 'Full Stack Development', image:'/website-generic-svgrepo-com.svg' ,icon: '/computer.svg' },
    { id: 'data', title: 'Data Analytics & Science',image:'/data-trends-svgrepo-com.svg', icon: '/bar_chart_4_bars.svg' },
    { id: 'banking', title: 'Banking & Financial Services',image:'/biometric_18491889.png', icon: '/account_balance.svg' },
    { id: 'marketing', title: 'Digital Marketing',image:'/digital-marketing-promotion-advertising-svgrepo-com.svg', icon: '/ad.svg' },
    { id: 'sap', title: 'SAP',image:'/sap-svgrepo-com.svg', icon: '/device_hub.svg' },
    { id: 'devops', title: 'DevOps',image:'/7053234.jpg', icon: '/deployed_code_history.svg' }
  ];

  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  const formattedDate = `${mm}/${dd}/${yyyy}`;
  const premonth = (mm - 1 + 12) % 12;
  const currentmonth = (mm % 12);
  const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
      <div className=" p-7 justify-center mt-[-39]">
        <div>
           {/* Live Count Section */}
        <h2 className="text-s text-gray-700 font-semibold mb-4 ms-[-15]">Live Count</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {/* Card 1: Live Batch Count */}
          <div className="bg-white rounded-3xl shadow-md flex items-center justify-between py-5 px-5 w-85">
            <div className="ps-2">
              <h3 className="text-4xl font-medium text-[#696969] mb-2">25</h3>
              <p className="text-[#AEAEAE] text-[13px]">{formattedDate}</p>
              <p className="text-[#404040] mt-10">Live Batch count</p>
            </div>
            <div className="flex items-center justify-center w-auto h-auto">
              <Image
                src="/Live-home.svg" // Replace with the actual path to your icon
                alt="Batch Icon"
                className="mb-15"
                width={56}
                height={56}
              />
            </div>
          </div>

          {/* Card 2: Live Student Count */}
          <div className="bg-white p-4 rounded-3xl shadow-md flex items-center justify-between py-5 px-5 w-85">
            <div className="ps-2">
              <h3 className="text-4xl font-medium text-[#696969] mb-2">1200</h3>
              <p className="text-[#AEAEAE] text-[13px]">{formattedDate}</p>
              <p className="text-[#404040] mt-10">Live Student count</p>
            </div>
            <div className="flex items-center justify-center w-auto h-auto ">
              <Image
                src="/student-home.svg" 
                alt="Student Icon"
                className="mb-15"
                width={56}
                height={56}
              />
            </div>
          </div>

          {/* Card 3: Live Domain Count */}
          <div className="bg-white p-4 rounded-3xl shadow-md flex items-center justify-between py-5 px-5 w-85">
            <div className="ps-2">
              <h3 className="text-4xl font-medium text-[#696969] mb-2">13</h3>
              <p className="text-[#AEAEAE] text-[13px]">{formattedDate}</p>
              <p className="text-[#404040] mt-10">Live Domain count</p>
            </div>
            <div className="flex items-center justify-center w-auto h-auto">
              <Image
                src="/Domian-home.svg" 
                alt="Domain Icon"
                className="mb-15"
                width={56}
                height={56}
              />
            </div>
          </div>
        </div>
        </div>
        {/* Barchat code */}
        <div className="mt-10">
          <h4 className="text-s text-gray-700 font-semibold ms-[-15]">Placement projection</h4>

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
                <span>{month[currentmonth]}</span>
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
                <span>{month[premonth]}</span>
              </div>
            </div>
          </div>
        </div>

      {/* Domain Section with FlipCards */}

<div className="mt-10 " ref={containerRef}>
  <div className="text-s text-gray-700 font-semibold mb-8 ms-[-15] flex flex-col"onChange={(e) => e.stopPropagation()}>
    <h1>Domain</h1>
  </div>
  <div className=" flex flex-row flex-wrap justify-between gap-4">
    {cards.map((card) => {
      const stats = getStatsByBatch(card.id) || {};
      return (
        <div key={card.id} className={`transition-all duration-300`}>
          <FlipCard
            id={card.id}
            isActive={activeCard === card.id}
            onClick={(id) => {
              setActiveCard(id === activeCard ? null : id);
              getStatsByBatch(id);
            }}
            frontContent={
              <div className="flex flex-col items-center h-full p-4 py-10">
  <div>
    <Image className="py-5" src={card.image} alt={card.title} width={100} height={100} />
  </div>
  <span className="mt-2 text-sm font-semibold flex items-center gap-2">
    {/* <Image src={card.icon} alt={card.title} width={20} height={20} /> */}
    {card.title}
  </span>
</div>

            }
            backContent={
  <div className="px-5 pb-8  text-xs">
  <p className="text-sm font-bold pb-3">{card.title}</p>

  <div className="grid grid-cols-2 gap-2">
    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition">
      <span className="font-medium">Completed Batches:</span> {stats.completedBatches || 0}
    </div>

    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition">
      <span className="font-medium">Ongoing Batches:</span> {stats.ongoingBatches || 0}
    </div>

    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition">
      <span className="font-medium">Completed Students:</span> {stats.completedStudents || 0}
    </div>

    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition">
      <span className="font-medium">Ongoing Students:</span> {stats.ongoingStudents || 0}
    </div>

    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition">
      <span className="font-medium">Placement Eligible:</span> {stats.placementEligible || 0}
    </div>

    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition">
      <span className="font-medium">Already Placed:</span> {stats.alreadyPlaced || 0}
    </div>

    <div className="bg-gray-50 rounded-md shadow p-2 hover:bg-violet-50 transition col-span-2">
      <span className="font-medium">Yet to Place:</span> {stats.yetToPlace || 0}
    </div>
  </div>
</div>


            }
          />
        </div>
      );
    })}
  </div>
</div>

      </div>

      
  
    </div>
  );
}
