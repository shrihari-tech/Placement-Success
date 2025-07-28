"use client";

import React from "react";
import NavBar from "../navBar/page";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FlipCard from "../flipcard/flipcard";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';
import { useDataContext } from '../context/dataContext';

export default function HomePage() {
  const { userName, getStatsByBatch ,setBatchingValue } = useDataContext();
  const router=useRouter();
  

  const handleCardClick = (id) => {
    setBatchingValue(id);
    router.push('/batches');
    
  };

  const cards = [
    { id: 'fullstack', title: 'Full Stack Development', icon: '/computer.svg' },
    { id: 'dataanalytics', title: 'Data Analytics & Science', icon: '/bar_chart_4_bars.svg' },
    { id: 'banking', title: 'Banking & Financial Services', icon: '/account_balance.svg' },
    { id: 'marketing', title: 'Digital Marketing', icon: '/ad.svg' },
    { id: 'sap', title: 'SAP', icon: '/device_hub.svg' },
    { id: 'devops', title: 'DevOps',  icon: '/deployed_code_history.svg' }
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
        <circle cx={cx} cy={cy} r={9} fill="#c7d2fe" />
        <circle cx={cx} cy={cy} r={5} fill="#ffffff" />
        <circle cx={cx} cy={cy} r={3} fill="#3b82f6" />
      </g>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar at the top */}
      <NavBar />
      {/* Main content container with proper centering */}
      <main className="flex-grow mx-auto w-full max-w-[1800px] px-[-15] sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Greeting Section */}
        <div className="border-b-2 border-gray-300 mb-6 md:mb-10 mt-10 sm:mt-1">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4 flex items-center">
            Hi {userName}
            <Image
              src='/waving-hand_1f44b 1.svg'
              alt="hand"
              className="ml-2 animate-bounce"
              width={28}
              height={28}
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
        <div className="p-2 md:p-4">
          {/* Live Count Section */}
          <div>
            <h2 className="text-sm md:text-base text-gray-700 font-semibold mb-4">Live Count</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Card 1: Live Batch Count */}
              <div className="bg-white rounded-xl md:rounded-3xl shadow-md flex items-center justify-between p-4 md:p-5">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">25</h3>
                  <p className="text-[#AEAEAE] text-xs md:text-[13px]">{formattedDate}</p>
                  <p className="text-[#404040] mt-4 md:mt-10 text-sm md:text-base">Live Batch count</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
                  <Image
                    src="/Live-home.svg"
                    alt="Batch Icon"
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                </div>
              </div>

              {/* Card 2: Live Student Count */}
              <div className="bg-white rounded-xl md:rounded-3xl shadow-md flex items-center justify-between p-4 md:p-5">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">1200</h3>
                  <p className="text-[#AEAEAE] text-xs md:text-[13px]">{formattedDate}</p>
                  <p className="text-[#404040] mt-4 md:mt-10 text-sm md:text-base">Live Student count</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
                  <Image
                    src="/student-home.svg"
                    alt="Student Icon"
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                </div>
              </div>

              {/* Card 3: Live Domain Count */}
              <div className="bg-white rounded-xl md:rounded-3xl shadow-md flex items-center justify-between p-4 md:p-5">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">13</h3>
                  <p className="text-[#AEAEAE] text-xs md:text-[13px]">{formattedDate}</p>
                  <p className="text-[#404040] mt-4 md:mt-10 text-sm md:text-base">Live Domain count</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
                  <Image
                    src="/Domian-home.svg"
                    alt="Domain Icon"
                    width={48}
                    height={48}
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Barchart Section */}
          <div className="mt-6 md:mt-10">
            <h4 className="text-sm md:text-base text-gray-700 font-semibold mb-4">Placement projection</h4>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              {/* Current month chart */}
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full">
                <div className="flex items-center mb-2 md:mb-3">
                  <h2 className="font-semibold text-xs md:text-sm text-gray-700">Current month</h2>
                  <Image
                    src='/Line-1.svg'
                    alt="Line-1"
                    width={100}
                    height={20}
                    className="ml-2"
                  />
                </div>
                <div className="h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
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
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        fill="url(#colorUv)"
                        stroke="none"
                      />
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
                          offset={10}
                          style={{ fontSize: 10, fill: "#666" }}
                        />
                      </Line>
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1.5">
                  <Image
                    src='/LegendNode.svg'
                    width={14}
                    height={14}
                    alt="legendNode"
                  />
                  <span>{month[currentmonth]}</span>
                </div>
              </div>

              {/* Previous month chart */}
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full">
                <div className="flex items-center mb-2 md:mb-3">
                  <h2 className="font-semibold text-xs md:text-sm text-gray-700">Previous month</h2>
                  <Image
                    src='/Line-1.svg'
                    alt="Line-1"
                    width={100}
                    height={20}
                    className="ml-2"
                  />
                </div>
                <div className="h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
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
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        fill="url(#colorUv)"
                        stroke="none"
                      />
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
                          offset={10}
                          style={{ fontSize: 10, fill: "#666" }}
                        />
                      </Line>
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1.5">
                  <Image
                    src='/LegendNode.svg'
                    width={14}
                    height={14}
                    alt="legendNode"
                  />
                  <span>{month[premonth]}</span>
                </div>
              </div>
            </div>
          </div>

            {/* Domain Section with FlipCards */}
            <div className="mt-6 md:mt-10" >
              <div className="text-sm md:text-base text-gray-700 font-semibold mb-4 md:mb-8">
                <h1>Domain</h1>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-row">
                  {cards.map((card) => {
                    const stats = getStatsByBatch(card.id) || {};
                    return (
                    <div key={card.id} className="transition-all duration-300 ml-[-150]" data-is-card="true" onClick={() => handleCardClick(card.id)}>
                        <FlipCard
                          frontContent={
                            <div className="flex flex-row items-center gap-3 ">
                              <div>
                                <Image src={card.icon} alt={card.title} width={20} height={20} />
                              </div>
                              <span className=" text-xs font-semibold">   
                                {card.title}
                              </span>
                            </div>
                          }
                          backContent={
                            <div className="px-3 md:px-5 pb-4 md:pb-8 text-xs">
                              <p className="text-xs md:text-sm font-bold pb-2 md:pb-3">{card.title}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { label: "Completed Batches", value: stats.completedBatches || 0 },
                                  { label: "Ongoing Batches", value: stats.ongoingBatches || 0 },
                                  { label: "Completed Students", value: stats.completedStudents || 0 },
                                  { label: "Ongoing Students", value: stats.ongoingStudents || 0 },
                                  { label: "Placement Eligible", value: stats.placementEligible || 0 },
                                  { label: "Already Placed", value: stats.alreadyPlaced || 0 },
                                  { label: "Yet to Place", value: stats.yetToPlace || 0, colSpan: 2 },
                                ].map((item, index) => (
                                  <div
                                    key={index}
                                    className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] shadow p-1 md:p-2 hover:bg-violet-50 transition ${
                                      item.colSpan ? 'col-span-2' : ''
                                    }`}
                                  >
                                    <span className="font-medium">{item.label}:</span> {item.value}
                                  </div>
                                ))}
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
      </main>
    </div>
  );
}