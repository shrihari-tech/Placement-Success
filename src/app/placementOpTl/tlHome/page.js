// placementOpTl/tlHome/page.js
"use client";
import React, { useState } from "react";
import Navbar from "../navbar"; // Correct default import
import Image from "next/image";
import Tabs from "../components/tab";
import PlacedTab from "./placedTab";
import YetToBeTab from "./yetToBeTab";

export default function Home() {
  const storedUserName = localStorage.getItem("loginUser") || "";
  const namePart = storedUserName.split("@")[0]?.split(".")[1] || "";
  const displayName = namePart
    ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
    : "User";

  const [activeTab, setActiveTab] = useState("Placed Student");

  return (
    <div className="overflow-y-auto min-h-screen bg-gray-50">
      <Navbar /> 
      {/* Added pt-16 for mobile header height and pt-0 for desktop */}
      <main className="mx-auto w-full pt-16 md:pt-0">
        {/* --- HEADER SECTION --- */}
        <div className="border-b-2 border-gray-300 bg-white ps-10 pt-2 mb-2 md:mb-4">
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-2 flex items-center">
            Hi {displayName}
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
          </p>
        </div>

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

        {/* Tabs Section */}
        <div className="container mx-auto px-4 ps-7">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={["Placed Student", "Yet to be Placed"]}
            className="mt-6"
          />
          
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            {activeTab === "Placed Student" ? <PlacedTab /> : <YetToBeTab />}
          </div>
        </div>
      </main>
    </div>
  );
}