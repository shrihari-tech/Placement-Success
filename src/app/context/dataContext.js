"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const DataContext = createContext({});

// ➤ Hook to use this context in components
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

// Sample data arrays (used only as initial values)
const fullstackInitial = [
  { id: 1, batchNo: "FS01", status: "Completed", startDate: "01 Jan 2024", endDate: "30 Jun 2024", mode: "Offline" },
  { id: 2, batchNo: "FS02", status: "Completed", startDate: "10 Feb 2024", endDate: "10 Aug 2024", mode: "Online" },
  { id: 3, batchNo: "FS03", status: "Completed", startDate: "15 Mar 2024", endDate: "15 Sep 2024", mode: "Offline" },
];

const dataanalyticsInitial = [
  { id: 1, batchNo: "DA01", status: "Ongoing", startDate: "01 Jan 2024", endDate: "30 Jun 2024", mode: "Online" },
  { id: 2, batchNo: "DA02", status: "Ongoing", startDate: "05 Feb 2024", endDate: "05 Aug 2024", mode: "Offline" },
];

const bankingInitial = [
  { id: 1, batchNo: "BK01", status: "Completed", startDate: "01 Jan 2024", endDate: "01 Jul 2024", mode: "Offline" },
];

const marketingInitial = [
  { id: 1, batchNo: "DM01", status: "Ongoing", startDate: "01 Jan 2024", endDate: "30 Jun 2024", mode: "Online" },
];

const sapInitial = [
  { id: 1, batchNo: "SAP01", status: "Ongoing", startDate: "01 Feb 2024", endDate: "01 Aug 2024", mode: "Offline" },
];

const devopsInitial = [
  { id: 1, batchNo: "DO01", status: "Completed", startDate: "01 Jan 2024", endDate: "01 Jul 2024", mode: "Online" },
];

// ➤ Provider Component
const DataProvider = ({ children }) => {
  const [batchingvalue, setBatchingValue] = useState(""); // selected domain
  const [loginUser, setLoginUser] = useState(""); // logged-in user
  const [batchHead, setBatchHead] = useState(""); // domain title for UI
  const [batchData, setBatchData] = useState([]); // currently active batch data

  // ➤ Domain-wise individual state data
  const [fullstackData, setFullstackData] = useState(fullstackInitial);
  const [dataanalyticsData, setDataanalyticsData] = useState(dataanalyticsInitial);
  const [bankingData, setBankingData] = useState(bankingInitial);
  const [marketingData, setMarketingData] = useState(marketingInitial);
  const [sapData, setSapData] = useState(sapInitial);
  const [devopsData, setDevopsData] = useState(devopsInitial);

  const firstLetterUser = loginUser?.charAt(0).toUpperCase() || "";

  // 🔄 Update batchData and batchHead when batchingvalue changes
  useEffect(() => {
    switch (batchingvalue) {
      case "fullstack":
        setBatchHead("Full Stack Development");
        setBatchData(fullstackData);
        break;
      case "dataanalytics":
        setBatchHead("Data Analytics & Science");
        setBatchData(dataanalyticsData);
        break;
      case "banking":
        setBatchHead("Banking & Financial Services");
        setBatchData(bankingData);
        break;
      case "marketing":
        setBatchHead("Digital Marketing");
        setBatchData(marketingData);
        break;
      case "sap":
        setBatchHead("SAP");
        setBatchData(sapData);
        break;
      case "devops":
        setBatchHead("DevOps");
        setBatchData(devopsData);
        break;
      default:
        setBatchHead("");
        setBatchData([]);
    }
  }, [batchingvalue,fullstackData,dataanalyticsData,bankingData,marketingData,sapData,devopsData,]);

  // 🔧 Add a new batch to current domain
  const addBatch = (newBatch) => {
    const batchWithId = { ...newBatch, id: Date.now() };

    switch (batchingvalue) {
      case "fullstack":
        setFullstackData((prev) => [...prev, batchWithId]);
        break;
      case "dataanalytics":
        setDataanalyticsData((prev) => [...prev, batchWithId]);
        break;
      case "banking":
        setBankingData((prev) => [...prev, batchWithId]);
        break;
      case "marketing":
        setMarketingData((prev) => [...prev, batchWithId]);
        break;
      case "sap":
        setSapData((prev) => [...prev, batchWithId]);
        break;
      case "devops":
        setDevopsData((prev) => [...prev, batchWithId]);
        break;
    }
  };

  // 🔧 Update an existing batch by ID in current domain
  const updateBatch = (id, updatedFields) => {
    const updateList = (list) =>
      list.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));

    switch (batchingvalue) {
      case "fullstack":
        setFullstackData(updateList);
        break;
      case "dataanalytics":
        setDataanalyticsData(updateList);
        break;
      case "banking":
        setBankingData(updateList);
        break;
      case "marketing":
        setMarketingData(updateList);
        break;
      case "sap":
        setSapData(updateList);
        break;
      case "devops":
        setDevopsData(updateList);
        break;
    }
  };

  // 🔧 Delete a batch by ID from current domain
  const deleteBatch = (id) => {
    const removeFromList = (list) => list.filter((item) => item.id !== id);

    switch (batchingvalue) {
      case "fullstack":
        setFullstackData(removeFromList);
        break;
      case "dataanalytics":
        setDataanalyticsData(removeFromList);
        break;
      case "banking":
        setBankingData(removeFromList);
        break;
      case "marketing":
        setMarketingData(removeFromList);
        break;
      case "sap":
        setSapData(removeFromList);
        break;
      case "devops":
        setDevopsData(removeFromList);
        break;
    }
  };

  return (
    <DataContext.Provider
      value={{ batchingvalue,setBatchingValue,loginUser,setLoginUser,firstLetterUser,batchHead,batchData,
        addBatch,updateBatch,deleteBatch
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
