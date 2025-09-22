"use client";
import React, { useMemo } from "react";
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
import { FaGraduationCap } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useDataContext } from "../../context/dataContext";

const CustomDot = ({ cx, cy }) => {
  return (
    <g>
      <circle cx={cx} cy={cy} r={9} fill="#c7d2fe" />
      <circle cx={cx} cy={cy} r={5} fill="#ffffff" />
      <circle cx={cx} cy={cy} r={3} fill="#3b82f6" />
    </g>
  );
};

const Graph = ({ title, data, color = "#6366f1" }) => {
  const gradientId = `colorUv-${title.replace(/\s+/g, "-")}`;

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-md p-3 md:p-4 w-full relative">
      <div className="flex items-center mb-2 md:mb-3">
        <h2 className="font-semibold text-xs md:text-sm text-gray-700">
          {title}
        </h2>
      </div>
      <div className="h-[200px] md:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
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
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              // <-- Reserve space for YAxis labels
            />
            <Area
              type="monotone"
              dataKey="students"
              fill={`url(#${gradientId})`}
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="students"
              stroke={color}
              strokeWidth={1}
              activeDot={{ r: 6 }}
              dot={<CustomDot />}
            >
              <LabelList
                dataKey="students"
                position="top"
                offset={10}
                style={{ fontSize: 10, fill: "#666" }}
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1">
        <p>Domains</p>
      </div>

      <div
        className="absolute flex justify-center items-center text-xs md:text-sm text-gray-500 mt-2 gap-1 top-34 pb-18 rotate-270"
        style={{ top: "130px" }}
      >
        <FaGraduationCap size={20} />
        <p>No. of Students</p>
      </div>
    </div>
  );
};

const Graphs = () => {
  const { batchStatsData } = useDataContext();

  // Prepare data for Placed Students
  const placedData = useMemo(
    () => [
      { name: "FSD", students: batchStatsData.fullstack?.alreadyPlaced || 0 },
      { name: "DADS", students: batchStatsData.data?.alreadyPlaced || 0 },
      { name: "BFS", students: batchStatsData.banking?.alreadyPlaced || 0 },
      { name: "MK", students: batchStatsData.marketing?.alreadyPlaced || 0 },
      { name: "DV", students: batchStatsData.devops?.alreadyPlaced || 0 },
      { name: "SAP", students: batchStatsData.sap?.alreadyPlaced || 0 },
    ],
    [batchStatsData]
  );

  // Prepare data for Yet to be Placed Students
  const yetToPlaceData = useMemo(
    () => [
      { name: "FSD", students: batchStatsData.fullstack?.yetToPlace || 0 },
      { name: "DADS", students: batchStatsData.data?.yetToPlace || 0 },
      { name: "BFS", students: batchStatsData.banking?.yetToPlace || 0 },
      { name: "MK", students: batchStatsData.marketing?.yetToPlace || 0 },
      { name: "DV", students: batchStatsData.devops?.yetToPlace || 0 },
      { name: "SAP", students: batchStatsData.sap?.yetToPlace || 0 },
    ],
    [batchStatsData]
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <Graph
          title="Placed Students by Domain"
          data={placedData}
          color="#3B82F6"
        />
        <Graph
          title="Yet to be Placed Students by Domain"
          data={yetToPlaceData}
          color="#F59E0B"
        />
      </div>
    </div>
  );
};

export default Graphs;
