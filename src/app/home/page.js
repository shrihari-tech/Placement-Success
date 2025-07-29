"use client";

import React from "react";
import NavBar from "../navBar/page";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FlipCard from "../flipcard/flipcard";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';
import { useDataContext } from '../context/dataContext';

export default function HomePage() {
  const { userName, getStatsByBatch ,setBatchingValue ,liveCounts } = useDataContext();
  const router=useRouter();
  const cardFlip = true; // Set to true to enable card flip functionality

  

  const handleCardClick = (id) => {
    setBatchingValue(id);
    router.push('/batches');
    
  };

  const cards = [
    { id: 'fullstack', title: 'Full Stack Development',image : '/fullstack.svg', icon: '/computer.svg' },
    { id: 'dataanalytics', title: 'Data Analytics & Science',image : '/Data.svg', icon: '/bar_chart_4_bars.svg' },
    { id: 'banking', title: 'Banking & Financial Services',image : '/banking.svg', icon: '/account_balance.svg' },
    { id: 'marketing', title: 'Digital Marketing',image : '/Digital Marketing.svg', icon: '/ad.svg' },
    { id: 'sap', title: 'SAP',image : '/SAP.svg', icon: '/device_hub.svg' },
    { id: 'devops', title: 'DevOps',image : '/DevOps.svg',  icon: '/deployed_code_history.svg' }
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
    <div className="pt-15 sm:pt-0">
      {/* NavBar at the top */}
      <NavBar />
      {/* Main content container with proper centering */}
      <main className="flex-grow mx-auto w-full">
        {/* Greeting Section */}
        <div className="border-b-2 border-gray-300 bg-white ps-10 pt-5 mb-6 md:mb-10 ">
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
        <div className="p-4 md:p-2 md:px-10 md:pb-10">
          {/* Live Count Section */}
          <div>
            <h2 className="text-sm md:text-base text-gray-700 font-semibold mb-4">Live Count</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Card 1: Live Batch Count */}
              <div className="bg-white rounded-xl md:rounded-3xl shadow-md flex items-center justify-between p-4 md:p-5">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">{liveCounts.batch}</h3>
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
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">{liveCounts.student}</h3>
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
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">{liveCounts.domain}</h3>
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

            {cardFlip && 
            <div className="index-0 mt-6 md:mt-15" >
              <div className="text-sm md:text-base text-gray-700 font-semibold mb-4 md:mb-8">
                <h1>Domain</h1>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                  {cards.map((card) => {
                    const stats = getStatsByBatch(card.id) || {};
                    return (
                    <div key={card.id} className="transition-all duration-300" data-is-card="true" onClick={() => handleCardClick(card.id)}>
                        <FlipCard
                          frontContent={
                            <div className="flex flex-col items-center gap-10 ">
                              <div>
                                <Image src={card.image} alt={card.title} width={160} height={160} />
                              </div>
                              <span className=" text-l font-semibold">   
                                {card.title}
                              </span>
                            </div>
                          }
                          backContent={
                            <div className="px-3 md:px-5 pb-4 md:pb-8 text-xs">
                              <p className="text-xs md:text-sm font-bold pb-2 md:pb-3">{card.title}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { label: "Completed Batches", value: stats.completedBatches || 0 , color: "bg-green-100 border-green-300" ,         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ),},
                                  { label: "Ongoing Batches", value: stats.ongoingBatches || 0 , color: "bg-blue-100 border-blue-300" ,         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
        ),},
                                  { label: "Completed Students", value: stats.completedStudents || 0 , color: "bg-purple-100 border-purple-300",         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        ),},
                                  { label: "Ongoing Students", value: stats.ongoingStudents || 0 , color: "bg-indigo-100 border-indigo-300" ,         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        ),},
                                  { label: "Placement Eligible", value: stats.placementEligible || 0 , color: "bg-yellow-100 border-yellow-300" ,         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ),},
                                  { label: "Already Placed", value: stats.alreadyPlaced || 0 ,color: "bg-teal-100 border-teal-300" ,         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ),},
                                  { label: "Yet to Place", value: stats.yetToPlace || 0, colSpan: 2 , color: "bg-rose-100 border-rose-300",         icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        ),},
                                ].map((item, index) => (
                                  <div
                                    key={index}
                                    className={`bg-[#eaddff] rounded-md border-t-3 border-[#6b21a8] hover:bg-[#e1cfff] shadow p-1 md:px-4 transition ${
                                      item.colSpan ? 'col-span-2' : ''
                                    }`}
                                  >
                                    <div><span className="inline-block">{item.icon}</span></div> <div><span className="font-medium">{item.label}:</span>{item.value}</div> 
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
            </div>}
        </div>
      </main>
    </div>
  );
}