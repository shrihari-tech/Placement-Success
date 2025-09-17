'use client';
import React, { useState, useRef } from "react";
import NavBar from "../navBar/page";
import { Toaster } from "react-hot-toast";
import Dashboard from "./dashboard/dashboard";
import Upcoming from "./upcoming/upcoming";
import { useDataContext } from "../context/dataContext";
import Tabs from "./components/tab"; // Import the Tabs component
import DomainTab from "./domain/domain";

export default function SMEPage() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const searchContainerRef = useRef(null);

    const { batchHead } = useDataContext();

    // Define the tabs array to pass to the Tabs component
    const tabs = ["Dashboard", "Domain", "Upcoming"];

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
                {/* Use the imported Tabs component */}
                <Tabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                    className="mb-4" // Optional: Add margin bottom
                />

                {/* ====== TAB CONTENT ====== */}
                <div className="mt-6">
                    {activeTab === "Dashboard" && (
                        <Dashboard/>
                    )}

                    {activeTab === "Domain" && (
                        <DomainTab />
                    )}

                    {activeTab === "Upcoming" && (
                      <Upcoming />
                    )}
                </div>
            </div>
        </div>
    );
}