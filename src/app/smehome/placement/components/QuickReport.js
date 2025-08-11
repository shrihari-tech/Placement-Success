"use client";
import { FaGraduationCap } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
const date = new Date();
const mm = String(date.getMonth() + 1).padStart(2, "0");
const dd = String(date.getDate()).padStart(2, "0");
const yyyy = date.getFullYear();
const formattedDate = `${mm}/${dd}/${yyyy}`;
const premonth = (mm - 1 + 12) % 12;
const currentmonth = mm % 12;
const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomDot = ({ cx, cy }) => {
  return (
    <g>
      <circle cx={cx} cy={cy} r={9} fill="#c7d2fe" />
      <circle cx={cx} cy={cy} r={5} fill="#ffffff" />
      <circle cx={cx} cy={cy} r={3} fill="#3b82f6" />
    </g>
  );
};

function QuickReport() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {/* Previous month chart */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full relative">
        <div className="flex items-center mb-2 md:mb-3">
          <h2 className="font-semibold text-xs md:text-sm text-gray-700">
            Previous month
          </h2>
        </div>
        <div className="h-[200px] md:h-[250px] ">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={[
                { name: "2", value: 8 },
                { name: "4", value: 9 },
                { name: "6", value: 10 },
                { name: "8", value: 24 },
                { name: "10", value: 30 },
                { name: "12", value: 30 },
              ]}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
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
                domain={[0, 40]}
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
        <div className="flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1">
          <FaGraduationCap size={20} />
          <p>Students</p>
        </div>

        <div
          className="absolute flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 
        gap-1 top-34 pb-3 rotate-270"
        >
          <RiMoneyRupeeCircleLine size={20} />
          <p>LPA</p>
        </div>
      </div>

      {/* Current month chart */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full relative">
        <div className="flex items-center mb-2 md:mb-3">
          <h2 className="font-semibold text-xs md:text-sm text-gray-700">
            Current month
          </h2>
        </div>
        <div className="h-[200px] md:h-[250px] ">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={[
                { name: "2", value: 8 },
                { name: "4", value: 9 },
                { name: "6", value: 10 },
                { name: "8", value: 24 },
                { name: "10", value: 30 },
                { name: "12", value: 30 },
              ]}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
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
                domain={[0, 40]}
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
        <div className="flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1">
          <FaGraduationCap size={20} />
          <p>Students</p>
        </div>

        <div
          className="absolute flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 
        gap-1 top-34 pb-3 rotate-270"
        >
          <RiMoneyRupeeCircleLine size={20} />
          <p>LPA</p>
        </div>
      </div>
    </div>
  );
}

export default QuickReport;
