'use client';
import React, { useState, useRef } from "react";
import NavBar from "../navBar/page";
import { Toaster } from "react-hot-toast";
import Dashboard from "./dashboard/dashboard";
import Upcoming from "./upcoming/upcoming";
import { useDataContext } from "../context/dataContext";

export default function SMEPage() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const searchContainerRef = useRef(null);

    const { batchHead } = useDataContext();

    return (
        <div className="flex min-h-screen mt-16 md:mt-1">
            <NavBar />
            <Toaster position="top-right" />
                  <div className="fixed top-15 md:top-0 ms-[-19px] border-b-2 border-gray-300 flex items-center justify-between bg-white w-full py-9 px-4 md:px-8 z-20">
        <h1 className="fixed pl-3 text-xl text-gray-800 font-semibold">
          {batchHead}
        </h1>
      </div>
            <div 
                className={`px-10 pt-20 flex-1 bg-[#F8FAFD] `}
                ref={searchContainerRef}
            >
                {/* ====== TABS ====== */}
                <div className="flex bg-[#ECE6F0] rounded-xl py-2 mb-4 relative mt-5">
                    <div
                        className={`absolute top-1 bottom-1 py-2 bg-[#F8FAFD] rounded-lg shadow-sm transition-all
                        duration-300 ease-in-out z-0
                        ${activeTab === "Dashboard" 
                            ? "left-1 w-[calc(33.33%-0.5rem)] py-2"
                            : activeTab === "Domain" 
                            ? "left-[calc(33.33%+0.25rem)] w-[calc(33.33%-0.5rem)]"
                            : "left-[calc(66.66%+0.25rem)] w-[calc(33.33%-0.5rem)]"
                        }`}
                    />
                    {["Dashboard", "Domain", "Upcoming"].map((label) => (
                        <span
                            key={label}
                            className={`flex-1 cursor-pointer items-center text-gray-700 text-center py-2 text-xs font-semibold select-none relative z-10
                            ${activeTab === label ? "text-indigo-600" : "text-gray-700"}`}
                            onClick={() => setActiveTab(label)}
                        >
                            {label}
                        </span>
                    ))}
                </div>



                {/* ====== TAB CONTENT ====== */}
                <div className="mt-6">
                    {activeTab === "Dashboard" && (
                        <Dashboard/>
                    )}

                    {activeTab === "Domain" && (
                        <p>Domain</p>
                    )}

                    {activeTab === "Upcoming" && (
                      <Upcoming />
                    )}
                </div>
            </div>
        </div>
    );
}