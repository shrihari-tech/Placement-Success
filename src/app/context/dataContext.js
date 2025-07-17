"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Create the context
const DataContext = createContext({});

// ➤ Hook to use this context in components
export const useDataContext = () => {
  const pathname = usePathname();
  useEffect(()=>{
    if(pathname === '/'){
       localStorage.setItem('activeSubNav', '');
    }
  },[pathname])

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

// ===== Full‑Stack =====
export const fullstackInitial = [
  { id: 1, batchNo: "FS01", mode: "Online",  status: "Completed", startDate: "2024-01-01", endDate: "2024-06-30",
    sections: { Domain:{startDate:"2024-01-01",endDate:"2024-03-01"}, Aptitude:{startDate:"2024-03-02",endDate:"2024-05-01"}, Communication:{startDate:"2024-05-02",endDate:"2024-06-30"} } },
  { id: 2, batchNo: "FS02", mode: "Offline", status: "Completed", startDate: "2024-02-01", endDate: "2024-07-31",
    sections: { Domain:{startDate:"2024-02-01",endDate:"2024-04-01"}, Aptitude:{startDate:"2024-04-02",endDate:"2024-06-01"}, Communication:{startDate:"2024-06-02",endDate:"2024-07-31"} } },
  { id: 3, batchNo: "FS03", mode: "Online",  status: "Completed", startDate: "2024-03-01", endDate: "2024-08-31",
    sections: { Domain:{startDate:"2024-03-01",endDate:"2024-05-01"}, Aptitude:{startDate:"2024-05-02",endDate:"2024-07-01"}, Communication:{startDate:"2024-07-02",endDate:"2024-08-31"} } },
  { id: 4, batchNo: "FS04", mode: "Offline", status: "Completed", startDate: "2024-04-01", endDate: "2024-09-30",
    sections: { Domain:{startDate:"2024-04-01",endDate:"2024-06-01"}, Aptitude:{startDate:"2024-06-02",endDate:"2024-08-01"}, Communication:{startDate:"2024-08-02",endDate:"2024-09-30"} } },
  { id: 5, batchNo: "FS05", mode: "Online",  status: "Completed", startDate: "2024-05-01", endDate: "2024-10-31",
    sections: { Domain:{startDate:"2024-05-01",endDate:"2024-07-01"}, Aptitude:{startDate:"2024-07-02",endDate:"2024-09-01"}, Communication:{startDate:"2024-09-02",endDate:"2024-10-31"} } },
  { id: 6, batchNo: "FS06", mode: "Offline", status: "Completed", startDate: "2024-06-01", endDate: "2024-11-30",
    sections: { Domain:{startDate:"2024-06-01",endDate:"2024-08-01"}, Aptitude:{startDate:"2024-08-02",endDate:"2024-10-01"}, Communication:{startDate:"2024-10-02",endDate:"2024-11-30"} } },
  { id: 7, batchNo: "FS07", mode: "Online",  status: "Completed", startDate: "2024-07-01", endDate: "2024-12-31",
    sections: { Domain:{startDate:"2024-07-01",endDate:"2024-09-01"}, Aptitude:{startDate:"2024-09-02",endDate:"2024-11-01"}, Communication:{startDate:"2024-11-02",endDate:"2024-12-31"} } },
  { id: 8, batchNo: "FS08", mode: "Offline", status: "Completed", startDate: "2024-08-01", endDate: "2025-01-31",
    sections: { Domain:{startDate:"2024-08-01",endDate:"2024-10-01"}, Aptitude:{startDate:"2024-10-02",endDate:"2024-12-01"}, Communication:{startDate:"2024-12-02",endDate:"2025-01-31"} } },
  { id: 9, batchNo: "FS09", mode: "Online",  status: "Completed", startDate: "2024-09-01", endDate: "2025-02-28",
    sections: { Domain:{startDate:"2024-09-01",endDate:"2024-11-01"}, Aptitude:{startDate:"2024-11-02",endDate:"2025-01-01"}, Communication:{startDate:"2025-01-02",endDate:"2025-02-28"} } },
  { id:10, batchNo: "FS10", mode: "Offline", status: "Ongoing",   startDate: "2024-10-01", endDate: "2025-03-31",
    sections: { Domain:{startDate:"2024-10-01",endDate:"2024-12-01"}, Aptitude:{startDate:"2024-12-02",endDate:"2025-02-01"}, Communication:{startDate:"2025-02-02",endDate:"2025-03-31"} } }
];

// ===== Data‑Analytics =====
export const dataanalyticsInitial = [
  { id: 1, batchNo: "DA01", mode: "Online",  status: "Completed", startDate: "2024-01-01", endDate: "2024-06-30",
    sections: { Domain:{startDate:"2024-01-01",endDate:"2024-03-01"}, Aptitude:{startDate:"2024-03-02",endDate:"2024-05-01"}, Communication:{startDate:"2024-05-02",endDate:"2024-06-30"} } },
  { id: 2, batchNo: "DA02", mode: "Offline", status: "Completed", startDate: "2024-02-01", endDate: "2024-07-31",
    sections: { Domain:{startDate:"2024-02-01",endDate:"2024-04-01"}, Aptitude:{startDate:"2024-04-02",endDate:"2024-06-01"}, Communication:{startDate:"2024-06-02",endDate:"2024-07-31"} } },
  { id: 3, batchNo: "DA03", mode: "Online",  status: "Completed", startDate: "2024-03-01", endDate: "2024-08-31",
    sections: { Domain:{startDate:"2024-03-01",endDate:"2024-05-01"}, Aptitude:{startDate:"2024-05-02",endDate:"2024-07-01"}, Communication:{startDate:"2024-07-02",endDate:"2024-08-31"} } },
  { id: 4, batchNo: "DA04", mode: "Offline", status: "Completed", startDate: "2024-04-01", endDate: "2024-09-30",
    sections: { Domain:{startDate:"2024-04-01",endDate:"2024-06-01"}, Aptitude:{startDate:"2024-06-02",endDate:"2024-08-01"}, Communication:{startDate:"2024-08-02",endDate:"2024-09-30"} } },
  { id: 5, batchNo: "DA05", mode: "Online",  status: "Completed", startDate: "2024-05-01", endDate: "2024-10-31",
    sections: { Domain:{startDate:"2024-05-01",endDate:"2024-07-01"}, Aptitude:{startDate:"2024-07-02",endDate:"2024-09-01"}, Communication:{startDate:"2024-09-02",endDate:"2024-10-31"} } },
  { id: 6, batchNo: "DA06", mode: "Offline", status: "Completed", startDate: "2024-06-01", endDate: "2024-11-30",
    sections: { Domain:{startDate:"2024-06-01",endDate:"2024-08-01"}, Aptitude:{startDate:"2024-08-02",endDate:"2024-10-01"}, Communication:{startDate:"2024-10-02",endDate:"2024-11-30"} } },
  { id: 7, batchNo: "DA07", mode: "Online",  status: "Completed", startDate: "2024-07-01", endDate: "2024-12-31",
    sections: { Domain:{startDate:"2024-07-01",endDate:"2024-09-01"}, Aptitude:{startDate:"2024-09-02",endDate:"2024-11-01"}, Communication:{startDate:"2024-11-02",endDate:"2024-12-31"} } },
  { id: 8, batchNo: "DA08", mode: "Offline", status: "Completed", startDate: "2024-08-01", endDate: "2025-01-31",
    sections: { Domain:{startDate:"2024-08-01",endDate:"2024-10-01"}, Aptitude:{startDate:"2024-10-02",endDate:"2024-12-01"}, Communication:{startDate:"2024-12-02",endDate:"2025-01-31"} } },
  { id: 9, batchNo: "DA09", mode: "Online",  status: "Completed", startDate: "2024-09-01", endDate: "2025-02-28",
    sections: { Domain:{startDate:"2024-09-01",endDate:"2024-11-01"}, Aptitude:{startDate:"2024-11-02",endDate:"2025-01-01"}, Communication:{startDate:"2025-01-02",endDate:"2025-02-28"} } },
  { id:10, batchNo: "DA10", mode: "Offline", status: "Ongoing",   startDate: "2024-10-01", endDate: "2025-03-31",
    sections: { Domain:{startDate:"2024-10-01",endDate:"2024-12-01"}, Aptitude:{startDate:"2024-12-02",endDate:"2025-02-01"}, Communication:{startDate:"2025-02-02",endDate:"2025-03-31"} } }
];

// ===== Banking =====
export const bankingInitial = [
  { id: 1, batchNo: "BK01", mode: "Offline", status: "Completed", startDate: "2024-01-01", endDate: "2024-06-30",
    sections: { Domain:{startDate:"2024-01-01",endDate:"2024-03-01"}, Aptitude:{startDate:"2024-03-02",endDate:"2024-05-01"}, Communication:{startDate:"2024-05-02",endDate:"2024-06-30"} } },
  { id: 2, batchNo: "BK02", mode: "Online",  status: "Completed", startDate: "2024-02-01", endDate: "2024-07-31",
    sections: { Domain:{startDate:"2024-02-01",endDate:"2024-04-01"}, Aptitude:{startDate:"2024-04-02",endDate:"2024-06-01"}, Communication:{startDate:"2024-06-02",endDate:"2024-07-31"} } },
  { id: 3, batchNo: "BK03", mode: "Offline", status: "Completed", startDate: "2024-03-01", endDate: "2024-08-31",
    sections: { Domain:{startDate:"2024-03-01",endDate:"2024-05-01"}, Aptitude:{startDate:"2024-05-02",endDate:"2024-07-01"}, Communication:{startDate:"2024-07-02",endDate:"2024-08-31"} } },
  { id: 4, batchNo: "BK04", mode: "Online",  status: "Completed", startDate: "2024-04-01", endDate: "2024-09-30",
    sections: { Domain:{startDate:"2024-04-01",endDate:"2024-06-01"}, Aptitude:{startDate:"2024-06-02",endDate:"2024-08-01"}, Communication:{startDate:"2024-08-02",endDate:"2024-09-30"} } },
  { id: 5, batchNo: "BK05", mode: "Offline", status: "Completed", startDate: "2024-05-01", endDate: "2024-10-31",
    sections: { Domain:{startDate:"2024-05-01",endDate:"2024-07-01"}, Aptitude:{startDate:"2024-07-02",endDate:"2024-09-01"}, Communication:{startDate:"2024-09-02",endDate:"2024-10-31"} } },
  { id: 6, batchNo: "BK06", mode: "Online",  status: "Completed", startDate: "2024-06-01", endDate: "2024-11-30",
    sections: { Domain:{startDate:"2024-06-01",endDate:"2024-08-01"}, Aptitude:{startDate:"2024-08-02",endDate:"2024-10-01"}, Communication:{startDate:"2024-10-02",endDate:"2024-11-30"} } },
  { id: 7, batchNo: "BK07", mode: "Offline", status: "Completed", startDate: "2024-07-01", endDate: "2024-12-31",
    sections: { Domain:{startDate:"2024-07-01",endDate:"2024-09-01"}, Aptitude:{startDate:"2024-09-02",endDate:"2024-11-01"}, Communication:{startDate:"2024-11-02",endDate:"2024-12-31"} } },
  { id: 8, batchNo: "BK08", mode: "Online",  status: "Completed", startDate: "2024-08-01", endDate: "2025-01-31",
    sections: { Domain:{startDate:"2024-08-01",endDate:"2024-10-01"}, Aptitude:{startDate:"2024-10-02",endDate:"2024-12-01"}, Communication:{startDate:"2024-12-02",endDate:"2025-01-31"} } },
  { id: 9, batchNo: "BK09", mode: "Offline", status: "Completed", startDate: "2024-09-01", endDate: "2025-02-28",
    sections: { Domain:{startDate:"2024-09-01",endDate:"2024-11-01"}, Aptitude:{startDate:"2024-11-02",endDate:"2025-01-01"}, Communication:{startDate:"2025-01-02",endDate:"2025-02-28"} } },
  { id:10, batchNo: "BK10", mode: "Online",  status: "Ongoing",   startDate: "2024-10-01", endDate: "2025-03-31",
    sections: { Domain:{startDate:"2024-10-01",endDate:"2024-12-01"}, Aptitude:{startDate:"2024-12-02",endDate:"2025-02-01"}, Communication:{startDate:"2025-02-02",endDate:"2025-03-31"} } }
];

// ===== Digital‑Marketing =====
export const marketingInitial = [
  { id: 1, batchNo: "DM01", mode: "Online",  status: "Completed", startDate: "2024-01-01", endDate: "2024-06-30",
    sections: { Domain:{startDate:"2024-01-01",endDate:"2024-03-01"}, Aptitude:{startDate:"2024-03-02",endDate:"2024-05-01"}, Communication:{startDate:"2024-05-02",endDate:"2024-06-30"} } },
  { id: 2, batchNo: "DM02", mode: "Offline", status: "Completed", startDate: "2024-02-01", endDate: "2024-07-31",
    sections: { Domain:{startDate:"2024-02-01",endDate:"2024-04-01"}, Aptitude:{startDate:"2024-04-02",endDate:"2024-06-01"}, Communication:{startDate:"2024-06-02",endDate:"2024-07-31"} } },
  { id: 3, batchNo: "DM03", mode: "Online",  status: "Completed", startDate: "2024-03-01", endDate: "2024-08-31",
    sections: { Domain:{startDate:"2024-03-01",endDate:"2024-05-01"}, Aptitude:{startDate:"2024-05-02",endDate:"2024-07-01"}, Communication:{startDate:"2024-07-02",endDate:"2024-08-31"} } },
  { id: 4, batchNo: "DM04", mode: "Offline", status: "Completed", startDate: "2024-04-01", endDate: "2024-09-30",
    sections: { Domain:{startDate:"2024-04-01",endDate:"2024-06-01"}, Aptitude:{startDate:"2024-06-02",endDate:"2024-08-01"}, Communication:{startDate:"2024-08-02",endDate:"2024-09-30"} } },
  { id: 5, batchNo: "DM05", mode: "Online",  status: "Completed", startDate: "2024-05-01", endDate: "2024-10-31",
    sections: { Domain:{startDate:"2024-05-01",endDate:"2024-07-01"}, Aptitude:{startDate:"2024-07-02",endDate:"2024-09-01"}, Communication:{startDate:"2024-09-02",endDate:"2024-10-31"} } },
  { id: 6, batchNo: "DM06", mode: "Offline", status: "Completed", startDate: "2024-06-01", endDate: "2024-11-30",
    sections: { Domain:{startDate:"2024-06-01",endDate:"2024-08-01"}, Aptitude:{startDate:"2024-08-02",endDate:"2024-10-01"}, Communication:{startDate:"2024-10-02",endDate:"2024-11-30"} } },
  { id: 7, batchNo: "DM07", mode: "Online",  status: "Completed", startDate: "2024-07-01", endDate: "2024-12-31",
    sections: { Domain:{startDate:"2024-07-01",endDate:"2024-09-01"}, Aptitude:{startDate:"2024-09-02",endDate:"2024-11-01"}, Communication:{startDate:"2024-11-02",endDate:"2024-12-31"} } },
  { id: 8, batchNo: "DM08", mode: "Offline", status: "Completed", startDate: "2024-08-01", endDate: "2025-01-31",
    sections: { Domain:{startDate:"2024-08-01",endDate:"2024-10-01"}, Aptitude:{startDate:"2024-10-02",endDate:"2024-12-01"}, Communication:{startDate:"2024-12-02",endDate:"2025-01-31"} } },
  { id: 9, batchNo: "DM09", mode: "Online",  status: "Completed", startDate: "2024-09-01", endDate: "2025-02-28",
    sections: { Domain:{startDate:"2024-09-01",endDate:"2024-11-01"}, Aptitude:{startDate:"2024-11-02",endDate:"2025-01-01"}, Communication:{startDate:"2025-01-02",endDate:"2025-02-28"} } },
  { id:10, batchNo: "DM10", mode: "Offline", status: "Ongoing",   startDate: "2024-10-01", endDate: "2025-03-31",
    sections: { Domain:{startDate:"2024-10-01",endDate:"2024-12-01"}, Aptitude:{startDate:"2024-12-02",endDate:"2025-02-01"}, Communication:{startDate:"2025-02-02",endDate:"2025-03-31"} } }
];

// ===== DevOps =====
export const devopsInitial = [
  { id: 1, batchNo: "DO01", mode: "Online",  status: "Completed", startDate: "2024-01-01", endDate: "2024-06-30",
    sections: { Domain:{startDate:"2024-01-01",endDate:"2024-03-01"}, Aptitude:{startDate:"2024-03-02",endDate:"2024-05-01"}, Communication:{startDate:"2024-05-02",endDate:"2024-06-30"} } },
  { id: 2, batchNo: "DO02", mode: "Offline", status: "Completed", startDate: "2024-02-01", endDate: "2024-07-31",
    sections: { Domain:{startDate:"2024-02-01",endDate:"2024-04-01"}, Aptitude:{startDate:"2024-04-02",endDate:"2024-06-01"}, Communication:{startDate:"2024-06-02",endDate:"2024-07-31"} } },
  { id: 3, batchNo: "DO03", mode: "Online",  status: "Completed", startDate: "2024-03-01", endDate: "2024-08-31",
    sections: { Domain:{startDate:"2024-03-01",endDate:"2024-05-01"}, Aptitude:{startDate:"2024-05-02",endDate:"2024-07-01"}, Communication:{startDate:"2024-07-02",endDate:"2024-08-31"} } },
  { id: 4, batchNo: "DO04", mode: "Offline", status: "Completed", startDate: "2024-04-01", endDate: "2024-09-30",
    sections: { Domain:{startDate:"2024-04-01",endDate:"2024-06-01"}, Aptitude:{startDate:"2024-06-02",endDate:"2024-08-01"}, Communication:{startDate:"2024-08-02",endDate:"2024-09-30"} } },
  { id: 5, batchNo: "DO05", mode: "Online",  status: "Completed", startDate: "2024-05-01", endDate: "2024-10-31",
    sections: { Domain:{startDate:"2024-05-01",endDate:"2024-07-01"}, Aptitude:{startDate:"2024-07-02",endDate:"2024-09-01"}, Communication:{startDate:"2024-09-02",endDate:"2024-10-31"} } },
  { id: 6, batchNo: "DO06", mode: "Offline", status: "Completed", startDate: "2024-06-01", endDate: "2024-11-30",
    sections: { Domain:{startDate:"2024-06-01",endDate:"2024-08-01"}, Aptitude:{startDate:"2024-08-02",endDate:"2024-10-01"}, Communication:{startDate:"2024-10-02",endDate:"2024-11-30"} } },
  { id: 7, batchNo: "DO07", mode: "Online",  status: "Completed", startDate: "2024-07-01", endDate: "2024-12-31",
    sections: { Domain:{startDate:"2024-07-01",endDate:"2024-09-01"}, Aptitude:{startDate:"2024-09-02",endDate:"2024-11-01"}, Communication:{startDate:"2024-11-02",endDate:"2024-12-31"} } },
  { id: 8, batchNo: "DO08", mode: "Offline", status: "Completed", startDate: "2024-08-01", endDate: "2025-01-31",
    sections: { Domain:{startDate:"2024-08-01",endDate:"2024-10-01"}, Aptitude:{startDate:"2024-10-02",endDate:"2024-12-01"}, Communication:{startDate:"2024-12-02",endDate:"2025-01-31"} } },
  { id: 9, batchNo: "DO09", mode: "Online",  status: "Completed", startDate: "2024-09-01", endDate: "2025-02-28",
    sections: { Domain:{startDate:"2024-09-01",endDate:"2024-11-01"}, Aptitude:{startDate:"2024-11-02",endDate:"2025-01-01"}, Communication:{startDate:"2025-01-02",endDate:"2025-02-28"} } },
  { id:10, batchNo: "DO10", mode: "Offline", status: "Ongoing",   startDate: "2024-10-01", endDate: "2025-03-31",
    sections: { Domain:{startDate:"2024-10-01",endDate:"2024-12-01"}, Aptitude:{startDate:"2024-12-02",endDate:"2025-02-01"}, Communication:{startDate:"2025-02-02",endDate:"2025-03-31"} } }
];

export const sapInitial = [
  {
    id: 1, batchNo: "SAP01", mode: "Offline", status: "Completed", startDate: "2024-01-10", endDate: "2024-06-30",
    sections: {
      Domain: { startDate: "2024-01-10", endDate: "2024-03-10" },
      Aptitude: { startDate: "2024-03-11", endDate: "2024-05-10" },
      Communication: { startDate: "2024-05-11", endDate: "2024-06-30" }
    }
  },
  {
    id: 2, batchNo: "SAP02", mode: "Online", status: "Completed", startDate: "2024-02-01", endDate: "2024-07-31",
    sections: {
      Domain: { startDate: "2024-02-01", endDate: "2024-04-01" },
      Aptitude: { startDate: "2024-04-02", endDate: "2024-06-01" },
      Communication: { startDate: "2024-06-02", endDate: "2024-07-31" }
    }
  },
  {
    id: 3, batchNo: "SAP03", mode: "Offline", status: "Completed", startDate: "2024-03-01", endDate: "2024-08-31",
    sections: {
      Domain: { startDate: "2024-03-01", endDate: "2024-05-01" },
      Aptitude: { startDate: "2024-05-02", endDate: "2024-07-01" },
      Communication: { startDate: "2024-07-02", endDate: "2024-08-31" }
    }
  },
  {
    id: 4, batchNo: "SAP04", mode: "Online", status: "Completed", startDate: "2024-04-01", endDate: "2024-09-30",
    sections: {
      Domain: { startDate: "2024-04-01", endDate: "2024-06-01" },
      Aptitude: { startDate: "2024-06-02", endDate: "2024-08-01" },
      Communication: { startDate: "2024-08-02", endDate: "2024-09-30" }
    }
  },
  {
    id: 5, batchNo: "SAP05", mode: "Offline", status: "Completed", startDate: "2024-05-01", endDate: "2024-10-31",
    sections: {
      Domain: { startDate: "2024-05-01", endDate: "2024-07-01" },
      Aptitude: { startDate: "2024-07-02", endDate: "2024-09-01" },
      Communication: { startDate: "2024-09-02", endDate: "2024-10-31" }
    }
  },
  {
    id: 6, batchNo: "SAP06", mode: "Online", status: "Completed", startDate: "2024-06-01", endDate: "2024-11-30",
    sections: {
      Domain: { startDate: "2024-06-01", endDate: "2024-08-01" },
      Aptitude: { startDate: "2024-08-02", endDate: "2024-10-01" },
      Communication: { startDate: "2024-10-02", endDate: "2024-11-30" }
    }
  },
  {
    id: 7, batchNo: "SAP07", mode: "Offline", status: "Completed", startDate: "2024-07-01", endDate: "2024-12-31",
    sections: {
      Domain: { startDate: "2024-07-01", endDate: "2024-09-01" },
      Aptitude: { startDate: "2024-09-02", endDate: "2024-11-01" },
      Communication: { startDate: "2024-11-02", endDate: "2024-12-31" }
    }
  },
  {
    id: 8, batchNo: "SAP08", mode: "Online", status: "Ongoing", startDate: "2024-08-01", endDate: "2025-01-31",
    sections: {
      Domain: { startDate: "2024-08-01", endDate: "2024-10-01" },
      Aptitude: { startDate: "2024-10-02", endDate: "2024-12-01" },
      Communication: { startDate: "2024-12-02", endDate: "2025-01-31" }
    }
  },
  {
    id: 9, batchNo: "SAP09", mode: "Offline", status: "Ongoing", startDate: "2024-09-01", endDate: "2025-02-28",
    sections: {
      Domain: { startDate: "2024-09-01", endDate: "2024-11-01" },
      Aptitude: { startDate: "2024-11-02", endDate: "2025-01-01" },
      Communication: { startDate: "2025-01-02", endDate: "2025-02-28" }
    }
  },
  {
    id: 10, batchNo: "SAP10", mode: "Online", status: "Ongoing", startDate: "2024-10-01", endDate: "2025-03-31",
    sections: {
      Domain: { startDate: "2024-10-01", endDate: "2024-12-01" },
      Aptitude: { startDate: "2024-12-02", endDate: "2025-02-01" },
      Communication: { startDate: "2025-02-02", endDate: "2025-03-31" }
    }
  }
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

  const userName =  loginUser.split("@")[0];
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
 // DataContext.jsx
const updateBatch = (id, updatedFields) => {
  const updateList = (list) =>
    list.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));

  switch (batchingvalue) {
    case "fullstack":
      setFullstackData(prev => updateList(prev));
      break;
    case "dataanalytics":
      setDataanalyticsData(prev => updateList(prev));
      break;
    case "banking":
      setBankingData(prev => updateList(prev));
      break;
    case "marketing":
      setMarketingData(prev => updateList(prev));
      break;
    case "sap":
      setSapData(prev => updateList(prev));
      break;
    case "devops":
      setDevopsData(prev => updateList(prev));
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
        addBatch,updateBatch,deleteBatch ,userName
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
