"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../navBar/page";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FlipCard from "../flipcard/flipcard";
import {ComposedChart,Line,Area,XAxis,YAxis,CartesianGrid,LabelList,ResponsiveContainer} from "recharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDataContext } from "../context/dataContext";
export default function HomePage() {
  const { userName, getStatsByBatch, setBatchingValue, liveCounts } =
    useDataContext();
  const router = useRouter();
  const cardFlip = true;
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState(null);

  ChartJS.register(ArcElement, Tooltip, Legend);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = (id) => {
    if (isMobile) {
      setFlippedCardId((prevId) => (prevId === id ? null : id));
    } else {
      setBatchingValue(id);
      router.push("/batches");
    }
  };

  const cards = [
    {
      id: "fullstack",
      title: "Full Stack Development",
      image: "/fullstack.svg",
      icon: "/computer.svg",
    },
    {
      id: "data",
      title: "Data Analytics & Science",
      image: "/Data.svg",
      icon: "/bar_chart_4_bars.svg",
    },
    {
      id: "banking",
      title: "Banking & Financial Services",
      image: "/banking.svg",
      icon: "/account_balance.svg",
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      image: "/Digital Marketing.svg",
      icon: "/ad.svg",
    },
    { id: "sap", title: "SAP", image: "/SAP.svg", icon: "/device_hub.svg" },
    {
      id: "devops",
      title: "DevOps",
      image: "/DevOps.svg",
      icon: "/deployed_code_history.svg",
    },
  ];

  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  const formattedDate = `${mm}/${dd}/${yyyy}`;
  const premonth = (mm - 1 + 12) % 12;
  const currentmonth = mm % 12;
  const month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];

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
              src="/waving-hand_1f44b 1.svg"
              alt="hand"
              className="ml-2 animate-bounce"
              width={28}
              height={28}
              style={{
                animation: "wave 1.5s ease-in-out infinite",
                transformOrigin: "bottom right",
              }}
            />
            <style jsx>{`
              @keyframes wave {
                0% {
                  transform: rotate(0deg);
                }
                10% {
                  transform: rotate(14deg);
                }
                20% {
                  transform: rotate(-8deg);
                }
                30% {
                  transform: rotate(14deg);
                }
                40% {
                  transform: rotate(-4deg);
                }
                50% {
                  transform: rotate(10deg);
                }
                60%,
                100% {
                  transform: rotate(0deg);
                }
              }
            `}</style>
          </p>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-2 md:px-10 md:pb-10">
          {/* Live Count Section */}
          <div>
            <h2 className="text-sm md:text-base text-gray-700 font-semibold mb-4">
              Live Count
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Card 1: Live Batch Count */}
              <div className="bg-white rounded-xl md:rounded-3xl shadow-md flex items-center justify-between p-4 md:p-5">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">
                    {liveCounts.batch}
                  </h3>
                  <p className="text-[#AEAEAE] text-xs md:text-[13px]">
                    {formattedDate}
                  </p>
                  <p className="text-[#404040] mt-4 md:mt-10 text-sm md:text-base">
                    Live Batch count
                  </p>
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
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">
                    {liveCounts.student}
                  </h3>
                  <p className="text-[#AEAEAE] text-xs md:text-[13px]">
                    {formattedDate}
                  </p>
                  <p className="text-[#404040] mt-4 md:mt-10 text-sm md:text-base">
                    Live Student count
                  </p>
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
                  <h3 className="text-3xl md:text-4xl font-medium text-[#696969] mb-1 md:mb-2">
                    {liveCounts.domain}
                  </h3>
                  <p className="text-[#AEAEAE] text-xs md:text-[13px]">
                    {formattedDate}
                  </p>
                  <p className="text-[#404040] mt-4 md:mt-10 text-sm md:text-base">
                    Live Domain count
                  </p>
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
            <h4 className="text-sm md:text-base text-gray-700 font-semibold mb-4">
              Placement projection
            </h4>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              {/* Current month chart */}
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full">
                <div className="flex items-center mb-2 md:mb-3">
                  <h2 className="font-semibold text-xs md:text-sm text-gray-700">
                    Current month
                  </h2>
                  <Image
                    src="/Line-1.svg"
                    alt="Line-1"
                    width={100}
                    height={20}
                    className="ml-2"
                  />
                </div>
                <div className="h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={[
                        { name: "FSD", value: 56 },
                        { name: "DA & DS", value: 64 },
                        { name: "Banking", value: 76 },
                        { name: "DM", value: 78 },
                        { name: "SAP", value: 70 },
                        { name: "DevOps", value: 37 },
                      ]}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6366f1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={true}
                        horizontal={true}
                        stroke="#d1d5db"
                      />
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
                    src="/LegendNode.svg"
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
                  <h2 className="font-semibold text-xs md:text-sm text-gray-700">
                    Previous month
                  </h2>
                  <Image
                    src="/Line-1.svg"
                    alt="Line-1"
                    width={100}
                    height={20}
                    className="ml-2"
                  />
                </div>
                <div className="h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={[
                        { name: "FSD", value: 27 },
                        { name: "DA & DS", value: 64 },
                        { name: "Banking", value: 36 },
                        { name: "DM", value: 58 },
                        { name: "SAP", value: 80 },
                        { name: "DevOps", value: 67 },
                      ]}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6366f1"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={true}
                        horizontal={true}
                        stroke="#d1d5db"
                      />
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
                    src="/LegendNode.svg"
                    width={14}
                    height={14}
                    alt="legendNode"
                  />
                  <span>{month[premonth]}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Domain Cards Section */}
          {cardFlip && (
            <div className="index-0 mt-6 md:mt-15">
              <div className="text-sm md:text-base text-gray-700 font-semibold mb-4 md:mb-8">
                <h1>Domain</h1>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col gap-4 md:gap-4 md:flex-row">
                  {cards.map((card) => {
                    const stats = getStatsByBatch(card.id) || {};
                    const isFlipped = isMobile
                      ? flippedCardId === card.id
                      : false;

                    const items = [
                      {
                        label: "Completed Batches",
                        value: stats.completedBatches || 0,
                      },
                      {
                        label: "Ongoing Batches",
                        value: stats.ongoingBatches || 0,
                      },
                      {
                        label: "Completed Students",
                        value: stats.completedStudents || 0,
                      },
                      {
                        label: "Ongoing Students",
                        value: stats.ongoingStudents || 0,
                      },
                      {
                        label: "Placement Eligible",
                        value: stats.placementEligible || 0,
                      },
                      {
                        label: "Already Placed",
                        value: stats.alreadyPlaced || 0,
                      },
                      { label: "Yet to Place", value: stats.yetToPlace || 0 },
                    ];

                    const total = items.reduce(
                      (sum, item) => sum + item.value,
                      0
                    );

                    return (
                      <div
                        key={card.id}
                        className="transition-all duration-300 "
                        data-is-card="true"
                        onClick={() => handleCardClick(card.id)}
                      >
                        <FlipCard
                          frontContent={
                            <div className="flex flex-col items-center gap-7">
                              <div>
                                <Image
                                  src={card.image}
                                  alt={card.title}
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <span className="text-[10px] text-gray-800 font-semibold">
                                {card.title}
                              </span>
                            </div>
                          }
                         backContent={
                            <div className="relative w-65 h-100 p-1.5 rounded-xl overflow-hidden shadow bg-white">
                              <svg
                                className="absolute top-0 left-0 w-full h-full rounded-xl"
                                viewBox="0 0 800 600"
                                preserveAspectRatio="none"
                              >
                                <path
                                  fill="#9076deff"
                                  fillOpacity="0.6"
                                  d="M 0 0 L 800 0 L 800 624 C 600 624, 440 624, 400 520 C 360 416, 440 364, 300 312 C 160 260, 240 208, 200 104 C 160 0, 0 0, 0 0 Z"
                                />
                              </svg>
                              <div className="relative z-10 h-full w-full flex flex-col">
                                {/* Tighter title */}
                                <p className="text-sm font-bold text-white drop-shadow-md text-center pt-1">
                                  {card.title}
                                </p>
                                {/* Tighter grid with less padding and gap */}
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-1 flex-grow">
                                  {/* Left side stats */}
                                  <div className="space-y-1">
                                    {/* Redesigned compact stat boxes */}
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Completed Batches</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.completedBatches || 0}</div>
                                    </div>
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Completed Students</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.completedStudents || 0}</div>
                                    </div>
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Placement Eligible</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.placementEligible || 0}</div>
                                    </div>
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Yet to Place</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.yetToPlace || 0}</div>
                                    </div>
                                  </div>
                                  {/* Right side stats */}
                                  <div className="space-y-1">
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Ongoing Batches</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.ongoingBatches || 0}</div>
                                    </div>
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Ongoing Students</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.ongoingStudents || 0}</div>
                                    </div>
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Already Placed</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{stats.alreadyPlaced || 0}</div>
                                    </div>
                                    <div className="bg-white/80 px-1 py-0.5 rounded shadow text-center">
                                      <div className="text-[11px] font-semibold leading-tight">Total Students</div>
                                      <div className="text-[13px] text-[#6750A4] font-bold leading-tight">{total}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          isFlipped={isFlipped}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
