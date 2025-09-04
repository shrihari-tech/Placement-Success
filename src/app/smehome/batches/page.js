"use client";
import React, { useState, useEffect, useCallback } from "react";
import SMENavbar from "../smenavbar";
import { useDataContext } from "../../context/dataContext";
import BatchListTab from "../batches/batchListTab/page";
import TrainerUpdateTab from "../batches/trainerUpdateTab/page";
import BatchHistoryTab from "../batches/batchHistoryTab/page";
import { useRouter } from "next/navigation";
import Tabs from "../components/tab"; 

export default function BatchePage() {
  const {
    batchesNames,
    setBatchesNames,
    studentBatchSelect,
    setStudentBatchSelect,
  } = useDataContext();
  const [domainInfo, setDomainInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("Batch List");
  const [isLoading, setIsLoading] = useState(true);
  const [lastDomain, setLastDomain] = useState(null);
  const router = useRouter();

  const domainDetails = {
    fs: { name: "Full Stack Development", icon: "/computer.svg" },
    da: { name: "Data Analytics & Science", icon: "/bar_chart_4_bars.svg" },
    mk: { name: "Digital Marketing", icon: "/ad.svg" },
    dv: { name: "DevOps", icon: "/deployed_code_history.svg" },
    bk: { name: "Banking & Financial Services", icon: "/account_balance.svg" },
    sap: { name: "SAP", icon: "/device_hub.svg" },
  };

  const loadDomainData = useCallback(() => {
    const rawDomainCode = localStorage.getItem("domainCode");
    const domainCodeMap = {
      fullstack: "fs",
      dataanalytics: "da",
      marketing: "mk",
      devops: "dv",
      banking: "bk",
      sap: "sap",
    };

    const shortCode = domainCodeMap[rawDomainCode];
    if (shortCode) {
      setDomainInfo(domainDetails[shortCode]);

      // Set the domain in context to trigger data loading
      if (studentBatchSelect !== rawDomainCode) {
        setStudentBatchSelect(rawDomainCode);
      }

      setLastDomain(rawDomainCode);
    }
  }, [studentBatchSelect, setStudentBatchSelect]);

  useEffect(() => {
    // Check authentication first
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const domainCode = localStorage.getItem("domainCode");

      if (!isAuthenticated || !domainCode) {
        router.push("/"); // Redirect to login if not authenticated
        return;
      }

      // Check if session expired
      const expiration = localStorage.getItem("expiration");
      if (expiration && new Date(expiration) < new Date()) {
        localStorage.clear();
        router.push("/");
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (isLoading) return;

    loadDomainData();
  }, [isLoading, loadDomainData]);

  // Handle domain changes (if needed)
  useEffect(() => {
    if (!isLoading && lastDomain) {
      const currentDomain = localStorage.getItem("domainCode");
      if (currentDomain && currentDomain !== lastDomain) {
        loadDomainData();
      }
    }
  }, [isLoading, lastDomain, loadDomainData]);

  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3f2fb4]"></div>
      </div>
    );
  }

  // Define tabs array for reusability
  const tabs = ["Batch List", "Trainer Update", "Batch History"];

  return (
    <div className="flex flex-col h-screen">
      <SMENavbar />
      <main className="flex-grow overflow-y-auto ml-[25px] p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
          {domainInfo?.name}
        </h2>

        {/* Tabs - Using the reusable component */}
        <Tabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs} 
        />

        {activeTab === "Batch List" && (
          <BatchListTab domainName={domainInfo?.name} />
        )}
        {activeTab === "Trainer Update" && <TrainerUpdateTab />}
        {activeTab === "Batch History" && <BatchHistoryTab />}
      </main>
    </div>
  );
}