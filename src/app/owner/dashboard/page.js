// src/app/heads/dashboard/page.js
"use client";
import React, { useMemo } from "react";
import Navbar from "../navbar"; // 👈 Adjust path if needed
import Image from "next/image";
import { useDataContext } from "../../context/dataContext";

export default function Dashboard() {
  const storedUserName = localStorage.getItem("loginUser") || "";
  const namePart = storedUserName.split("@")[0]?.split(".")[1] || "";
  const displayName = namePart
    ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
    : "User";

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

        {/* Main Content */}
        <div className="container mx-auto px-4 ps-7">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
            </div>
          </div>

          {/* Your actual dashboard content */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome to the Admin Module!
            </h2>
            <p className="text-gray-600">
              This is your central hub for managing placement operations at the
              Admin level.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
