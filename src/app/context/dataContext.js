"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

// Create the context
const DataContext = createContext({});

// ➤ Hook to use this context in components
export const useDataContext = () => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      localStorage.setItem("activeSubNav", "");
    }
  }, [pathname]);

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

const fullstackOpportunitiesInitial = [];
const dataanalyticsOpportunitiesInitial = [];
const marketingOpportunitiesInitial = [];
const digitalmarketingOpportunitiesInitial = [];
const sapOpportunitiesInitial = [];
const devopsOpportunitiesInitial = [];
const bankingOpportunitiesInitial = [];


// ===== Full‑Stack =====
export const fullstackInitial = [
  {
    id: 1,
    batchNo: "FS01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-03",
    endDate: "2024-06-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: { startDate: "2024-01-03", endDate: "2024-02-28" },
      Aptitude: { startDate: "2024-03-01", endDate: "2024-04-25" },
      Communication: { startDate: "2024-04-26", endDate: "2024-06-28" },
    },
    session: "FN",
    studentsPlaced: 120,
    pending: 40,
    totalCount: 160,
  },
  {
    id: 2,
    batchNo: "FS02",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-02-05",
    endDate: "2024-08-02",
    trainerName: "Shri Hari",
    sections: {
      Domain: { startDate: "2024-02-05", endDate: "2024-03-30" },
      Aptitude: { startDate: "2024-04-01", endDate: "2024-06-02" },
      Communication: { startDate: "2024-06-04", endDate: "2024-08-02" },
    },
    session: "AN",
    studentsPlaced: 85,
    pending: 35,
    totalCount: 120,
  },
  {
    id: 3,
    batchNo: "FS03",
    mode: "Online",
    status: "Completed",
    startDate: "2024-03-04",
    endDate: "2024-09-01",
    trainerName: "Shri Hari",
    sections: {
      Domain: { startDate: "2024-03-04", endDate: "2024-04-29" },
      Aptitude: { startDate: "2024-04-30", endDate: "2024-06-25" },
      Communication: { startDate: "2024-06-26", endDate: "2024-09-01" },
    },
    session: "FN",
    studentsPlaced: 100,
    pending: 50,
    totalCount: 150,
  },
  {
    id: 4,
    batchNo: "FS04",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-04-05",
    endDate: "2024-10-04",
    trainerName: "Shri Hari",
    sections: {
      Domain: { startDate: "2024-04-05", endDate: "2024-06-05" },
      Aptitude: { startDate: "2024-06-06", endDate: "2024-08-05" },
      Communication: { startDate: "2024-08-06", endDate: "2024-10-04" },
    },
    session: "AN",
    studentsPlaced: 110,
    pending: 45,
    totalCount: 155,
  },
  {
    id: 5,
    batchNo: "FS05",
    mode: "Online",
    status: "Completed",
    startDate: "2024-05-06",
    endDate: "2024-11-04",
    trainerName: "Shri Hari",
    sections: {
      Domain: { startDate: "2024-05-06", endDate: "2024-07-01" },
      Aptitude: { startDate: "2024-07-02", endDate: "2024-09-02" },
      Communication: { startDate: "2024-09-03", endDate: "2024-11-04" },
    },
    session: "FN",
    studentsPlaced: 95,
    pending: 25,
    totalCount: 120,
  },
];

export const dataanalyticsInitial = [
  {
    id: 1,
    batchNo: "DA01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-06-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 79,
    pending: 44,
    totalCount: 123,
  },
  {
    id: 2,
    batchNo: "DA02",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-02-01",
    endDate: "2024-07-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 42,
    pending: 16,
    totalCount: 58,
  },
  {
    id: 3,
    batchNo: "DA03",
    mode: "Online",
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2024-08-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 46,
    pending: 10,
    totalCount: 56,
  },
  {
    id: 4,
    batchNo: "DA04",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-09-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 79,
    pending: 10,
    totalCount: 89,
  },
  {
    id: 5,
    batchNo: "DA05",
    mode: "Online",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-10-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 84,
    pending: 14,
    totalCount: 98,
  },
];

export const bankingInitial = [
  {
    id: 1,
    batchNo: "BK01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-06-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 84,
    pending: 25,
    totalCount: 109,
  },
  {
    id: 2,
    batchNo: "BK02",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-02-01",
    endDate: "2024-07-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 100,
    pending: 34,
    totalCount: 134,
  },
  {
    id: 3,
    batchNo: "BK03",
    mode: "Online",
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2024-08-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 34,
    pending: 35,
    totalCount: 69,
  },
  {
    id: 4,
    batchNo: "BK04",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-09-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 92,
    pending: 36,
    totalCount: 128,
  },
  {
    id: 5,
    batchNo: "BK05",
    mode: "Online",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-10-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 45,
    pending: 25,
    totalCount: 70,
  },
];

export const marketingInitial = [
  {
    id: 1,
    batchNo: "MK01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-06-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 40,
    pending: 10,
    totalCount: 50,
  },
  {
    id: 2,
    batchNo: "MK02",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-02-01",
    endDate: "2024-07-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 94,
    pending: 14,
    totalCount: 108,
  },
  {
    id: 3,
    batchNo: "MK03",
    mode: "Online",
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2024-08-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 76,
    pending: 18,
    totalCount: 94,
  },
  {
    id: 4,
    batchNo: "MK04",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-09-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 88,
    pending: 36,
    totalCount: 124,
  },
  {
    id: 5,
    batchNo: "MK05",
    mode: "Online",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-10-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 85,
    pending: 28,
    totalCount: 113,
  },
];

export const devopsInitial = [
  {
    id: 1,
    batchNo: "DV01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-06-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 34,
    pending: 47,
    totalCount: 81,
  },
  {
    id: 2,
    batchNo: "DV02",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-02-01",
    endDate: "2024-07-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 35,
    pending: 39,
    totalCount: 74,
  },
  {
    id: 3,
    batchNo: "DV03",
    mode: "Online",
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2024-08-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 33,
    pending: 39,
    totalCount: 72,
  },
  {
    id: 4,
    batchNo: "DV04",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-09-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 100,
    pending: 46,
    totalCount: 146,
  },
  {
    id: 5,
    batchNo: "DV05",
    mode: "Online",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-10-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 43,
    pending: 14,
    totalCount: 57,
  },
];

export const sapInitial = [
  {
    id: 1,
    batchNo: "SAP01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-06-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 79,
    pending: 18,
    totalCount: 97,
  },
  {
    id: 2,
    batchNo: "SAP02",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-02-01",
    endDate: "2024-07-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 34,
    pending: 31,
    totalCount: 65,
  },
  {
    id: 3,
    batchNo: "SAP03",
    mode: "Online",
    status: "Completed",
    startDate: "2024-03-01",
    endDate: "2024-08-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 64,
    pending: 35,
    totalCount: 99,
  },
  {
    id: 4,
    batchNo: "SAP04",
    mode: "Offline",
    status: "Completed",
    startDate: "2024-04-01",
    endDate: "2024-09-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "FN",
    studentsPlaced: 53,
    pending: 14,
    totalCount: 67,
  },
  {
    id: 5,
    batchNo: "SAP05",
    mode: "Online",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-10-28",
    trainerName: "Shri Hari",
    sections: {
      Domain: {
        startDate: "2024-01-01",
        endDate: "2024-03-01",
      },
      Aptitude: {
        startDate: "2024-03-02",
        endDate: "2024-05-01",
      },
      Communication: {
        startDate: "2024-05-02",
        endDate: "2024-06-30",
      },
    },
    session: "AN",
    studentsPlaced: 40,
    pending: 42,
    totalCount: 82,
  },
];

// student data
export const fullstackStudentData = [
  {
    sno: 1,
    name: "Ravi Kumar",
    email: "ravi01@gmail.com",
    bookingId: "FS01-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "FS01",
    phone: "9876543210",
    mode: "Online",
    mile1: 87,
    mile2: 76,
    mile3: 93,
    irc: 90,
    attendance: 82,
    status: "Ongoing",
    domainScore: 85,
    aptitudeScore: 78,
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Meena R",
    email: "meena02@gmail.com",
    bookingId: "FS01-002",
    epicStatus: "Proficient",
    placement: "Yet to Place",
    batch: "FS01",
    phone: "9123456789",
    mode: "Offline",
    mile1: 79,
    mile2: 84,
    mile3: 67,
    irc: 73,
    attendance: 94,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Arun V",
    email: "arun03@gmail.com",
    bookingId: "FS01-003",
    epicStatus: "Ideal",
    placement: "Not Placed",
    batch: "FS01",
    phone: "9871234560",
    mode: "Online",
    mile1: 91,
    mile2: 56,
    mile3: 60,
    irc: 77,
    attendance: 71,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Divya S",
    email: "divya04@gmail.com",
    bookingId: "FS01-004",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "FS01",
    phone: "9834567891",
    mode: "Offline",
    mile1: 95,
    mile2: 63,
    mile3: 89,
    irc: 58,
    attendance: 86,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Karan M",
    email: "karan05@gmail.com",
    bookingId: "FS01-005",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "FS01",
    phone: "9945671234",
    mode: "Online",
    mile1: 59,
    mile2: 99,
    mile3: 68,
    irc: 63,
    attendance: 75,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Sundar P",
    email: "sundar01@gmail.com",
    bookingId: "FS02-001",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "FS02",
    phone: "9012345678",
    mode: "Offline",
    mile1: 82,
    mile2: 91,
    mile3: 72,
    irc: 84,
    attendance: 77,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Geetha T",
    email: "geetha02@gmail.com",
    bookingId: "FS02-002",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS02",
    phone: "9988776655",
    mode: "Online",
    mile1: 96,
    mile2: 58,
    mile3: 73,
    irc: 80,
    attendance: 66,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Hari K",
    email: "hari03@gmail.com",
    bookingId: "FS02-003",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "FS02",
    phone: "9876501234",
    mode: "Offline",
    mile1: 75,
    mile2: 87,
    mile3: 90,
    irc: 74,
    attendance: 58,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Aishwarya N",
    email: "aishu04@gmail.com",
    bookingId: "FS02-004",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "FS02",
    phone: "9823456712",
    mode: "Online",
    mile1: 89,
    mile2: 54,
    mile3: 95,
    irc: 68,
    attendance: 79,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Vignesh R",
    email: "vignesh05@gmail.com",
    bookingId: "FS02-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "FS02",
    phone: "9786543210",
    mode: "Offline",
    mile1: 69,
    mile2: 81,
    mile3: 83,
    irc: 91,
    attendance: 63,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Lakshmi B",
    email: "lakshmi01@gmail.com",
    bookingId: "FS03-001",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "FS03",
    phone: "9900112233",
    mode: "Online",
    mile1: 85,
    mile2: 66,
    mile3: 99,
    irc: 88,
    attendance: 91,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Naveen M",
    email: "naveen02@gmail.com",
    bookingId: "FS03-002",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "FS03",
    phone: "9011223344",
    mode: "Offline",
    mile1: 61,
    mile2: 95,
    mile3: 76,
    irc: 96,
    attendance: 89,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Pranav K",
    email: "pranav03@gmail.com",
    bookingId: "FS03-003",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "FS03",
    phone: "9090909090",
    mode: "Online",
    mile1: 78,
    mile2: 80,
    mile3: 64,
    irc: 70,
    attendance: 84,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Sahana D",
    email: "sahana04@gmail.com",
    bookingId: "FS03-004",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS03",
    phone: "9123456780",
    mode: "Offline",
    mile1: 92,
    mile2: 59,
    mile3: 88,
    irc: 93,
    attendance: 73,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Kavya R",
    email: "kavya05@gmail.com",
    bookingId: "FS03-005",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "FS03",
    phone: "9345678901",
    mode: "Online",
    mile1: 53,
    mile2: 86,
    mile3: 71,
    irc: 87,
    attendance: 69,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Surya V",
    email: "surya01@gmail.com",
    bookingId: "FS04-001",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS04",
    phone: "9867543210",
    mode: "Offline",
    mile1: 94,
    mile2: 77,
    mile3: 62,
    irc: 76,
    attendance: 90,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Radha M",
    email: "radha02@gmail.com",
    bookingId: "FS04-002",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "FS04",
    phone: "9856234123",
    mode: "Online",
    mile1: 68,
    mile2: 82,
    mile3: 70,
    irc: 85,
    attendance: 78,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Tarun B",
    email: "tarun03@gmail.com",
    bookingId: "FS04-003",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "FS04",
    phone: "9998887776",
    mode: "Offline",
    mile1: 97,
    mile2: 73,
    mile3: 85,
    irc: 92,
    attendance: 95,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Deepa S",
    email: "deepa04@gmail.com",
    bookingId: "FS04-004",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "FS04",
    phone: "9876123450",
    mode: "Online",
    mile1: 66,
    mile2: 93,
    mile3: 54,
    irc: 69,
    attendance: 61,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Yash A",
    email: "yash05@gmail.com",
    bookingId: "FS04-005",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "FS04",
    phone: "9765432109",
    mode: "Offline",
    mile1: 90,
    mile2: 65,
    mile3: 98,
    irc: 60,
    attendance: 87,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Bhavya N",
    email: "bhavya01@gmail.com",
    bookingId: "FS05-001",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "FS05",
    phone: "9654321098",
    mode: "Online",
    mile1: 57,
    mile2: 97,
    mile3: 66,
    irc: 82,
    attendance: 68,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Ganesh T",
    email: "ganesh02@gmail.com",
    bookingId: "FS05-002",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS05",
    phone: "9870011223",
    mode: "Offline",
    mile1: 86,
    mile2: 62,
    mile3: 91,
    irc: 89,
    attendance: 93,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Sneha P",
    email: "sneha03@gmail.com",
    bookingId: "FS05-003",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "FS05",
    phone: "9761234567",
    mode: "Online",
    mile1: 80,
    mile2: 64,
    mile3: 92,
    irc: 94,
    attendance: 74,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Karthik S",
    email: "karthik04@gmail.com",
    bookingId: "FS05-004",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "FS05",
    phone: "9345612789",
    mode: "Offline",
    mile1: 98,
    mile2: 69,
    mile3: 57,
    irc: 66,
    attendance: 85,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },

  {
    sno: 5,
    name: "Ishita R",
    email: "ishita05@gmail.com",
    bookingId: "FS05-005",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS05",
    phone: "9123876543",
    mode: "Online",
    mile1: 63,
    mile2: 90,
    mile3: 86,
    irc: 72,
    attendance: 70,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
];

export const dataAnalyticsStudentData = [
  {
    sno: 1,
    name: "Anjali R",
    email: "anjali01@gmail.com",
    bookingId: "DA01-001",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "DA01",
    phone: "9876543210",
    mode: "Offline",
    mile1: 84,
    mile2: 74,
    mile3: 99,
    irc: 95,
    attendance: 76,
    status: "Completed",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Rohit K",
    email: "rohit02@gmail.com",
    bookingId: "DA01-002",
    epicStatus: "Excellent",
    placement: "Yet to Place",
    batch: "DA01",
    phone: "9123456789",
    mode: "Online",
    mile1: 69,
    mile2: 82,
    mile3: 94,
    irc: 85,
    attendance: 61,
    status: "Ongoing",
        domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Preethi M",
    email: "preethi03@gmail.com",
    bookingId: "DA01-003",
    epicStatus: "Proficient",
    placement: "Not Placed",
    batch: "DA01",
    phone: "9871234560",
    mode: "Offline",
    mile1: 93,
    mile2: 77,
    mile3: 88,
    irc: 91,
    attendance: 79,
    status: "Completed",
     domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",

  },
  {
    sno: 4,
    name: "Varun S",
    email: "varun04@gmail.com",
    bookingId: "DA01-004",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "DA01",
    phone: "9834567891",
    mode: "Online",
    mile1: 60,
    mile2: 98,
    mile3: 55,
    irc: 64,
    attendance: 68,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Lavanya T",
    email: "lavanya05@gmail.com",
    bookingId: "DA01-005",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "DA01",
    phone: "9945671234",
    mode: "Offline",
    mile1: 78,
    mile2: 85,
    mile3: 91,
    irc: 93,
    attendance: 83,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
     trainerName: "Shri Hari",
    
  },
  {
    sno: 1,
    name: "Siddharth B",
    email: "sid01@gmail.com",
    bookingId: "DA02-001",
    epicStatus: "Ideal",
    placement: "Not Placed",
    batch: "DA02",
    phone: "9012345678",
    mode: "Online",
    mile1: 72,
    mile2: 53,
    mile3: 90,
    irc: 86,
    attendance: 65,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
     trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Deepika L",
    email: "deepika02@gmail.com",
    bookingId: "DA02-002",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "DA02",
    phone: "9988776655",
    mode: "Offline",
    mile1: 66,
    mile2: 91,
    mile3: 86,
    irc: 77,
    attendance: 70,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
     trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Arvind J",
    email: "arvind03@gmail.com",
    bookingId: "DA02-003",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DA02",
    phone: "9876501234",
    mode: "Online",
    mile1: 95,
    mile2: 76,
    mile3: 82,
    irc: 89,
    attendance: 88,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
     trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Ramya V",
    email: "ramya04@gmail.com",
    bookingId: "DA02-004",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "DA02",
    phone: "9823456712",
    mode: "Offline",
    mile1: 55,
    mile2: 60,
    mile3: 74,
    irc: 66,
    attendance: 59,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
     trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Kiran N",
    email: "kiran05@gmail.com",
    bookingId: "DA02-005",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "DA02",
    phone: "9786543210",
    mode: "Online",
    mile1: 90,
    mile2: 87,
    mile3: 98,
    irc: 94,
    attendance: 92,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Vinoth S",
    email: "vinoth01@gmail.com",
    bookingId: "DA03-001",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "DA03",
    phone: "9900112233",
    mode: "Offline",
    mile1: 58,
    mile2: 79,
    mile3: 63,
    irc: 71,
    attendance: 55,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Sneha L",
    email: "sneha02@gmail.com",
    bookingId: "DA03-002",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "DA03",
    phone: "9011223344",
    mode: "Online",
    mile1: 76,
    mile2: 88,
    mile3: 92,
    irc: 87,
    attendance: 82,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Harish P",
    email: "harish03@gmail.com",
    bookingId: "DA03-003",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "DA03",
    phone: "9090909090",
    mode: "Offline",
    mile1: 61,
    mile2: 70,
    mile3: 69,
    irc: 65,
    attendance: 64,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Meera G",
    email: "meera04@gmail.com",
    bookingId: "DA03-004",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "DA03",
    phone: "9123456780",
    mode: "Online",
    mile1: 89,
    mile2: 95,
    mile3: 97,
    irc: 99,
    attendance: 91,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Dinesh K",
    email: "dinesh05@gmail.com",
    bookingId: "DA03-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "DA03",
    phone: "9345678901",
    mode: "Offline",
    mile1: 62,
    mile2: 68,
    mile3: 72,
    irc: 73,
    attendance: 66,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Aarthi S",
    email: "aarthi01@gmail.com",
    bookingId: "DA04-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DA04",
    phone: "9867543210",
    mode: "Online",
    mile1: 85,
    mile2: 92,
    mile3: 79,
    irc: 90,
    attendance: 89,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Rajeev N",
    email: "rajeev02@gmail.com",
    bookingId: "DA04-002",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "DA04",
    phone: "9856234123",
    mode: "Offline",
    mile1: 63,
    mile2: 66,
    mile3: 80,
    irc: 74,
    attendance: 60,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Vidya T",
    email: "vidya03@gmail.com",
    bookingId: "DA04-003",
    epicStatus: "Proficient",
    placement: "Not Placed",
    batch: "DA04",
    phone: "9998887776",
    mode: "Online",
    mile1: 67,
    mile2: 64,
    mile3: 73,
    irc: 70,
    attendance: 71,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Nithin B",
    email: "nithin04@gmail.com",
    bookingId: "DA04-004",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "DA04",
    phone: "9876123450",
    mode: "Offline",
    mile1: 92,
    mile2: 90,
    mile3: 85,
    irc: 95,
    attendance: 86,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Pooja M",
    email: "pooja05@gmail.com",
    bookingId: "DA04-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DA04",
    phone: "9765432109",
    mode: "Online",
    mile1: 59,
    mile2: 62,
    mile3: 65,
    irc: 60,
    attendance: 57,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Suresh R",
    email: "suresh01@gmail.com",
    bookingId: "DA05-001",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "DA05",
    phone: "9654321098",
    mode: "Offline",
    mile1: 54,
    mile2: 56,
    mile3: 58,
    irc: 61,
    attendance: 52,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Bhavani K",
    email: "bhavani02@gmail.com",
    bookingId: "DA05-002",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "DA05",
    phone: "9870011223",
    mode: "Online",
    mile1: 81,
    mile2: 84,
    mile3: 87,
    irc: 88,
    attendance: 85,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Lokesh M",
    email: "lokesh03@gmail.com",
    bookingId: "DA05-003",
    epicStatus: "Excellent",
    placement: "Yet to Place",
    batch: "DA05",
    phone: "9761234567",
    mode: "Offline",
    mile1: 97,
    mile2: 93,
    mile3: 94,
    irc: 98,
    attendance: 96,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Gayathri L",
    email: "gayathri04@gmail.com",
    bookingId: "DA05-004",
    epicStatus: "Proficient",
    placement: "Not Placed",
    batch: "DA05",
    phone: "9345612789",
    mode: "Online",
    mile1: 65,
    mile2: 67,
    mile3: 70,
    irc: 69,
    attendance: 73,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Manoj S",
    email: "manoj05@gmail.com",
    bookingId: "DA05-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DA05",
    phone: "9123876543",
    mode: "Offline",
    mile1: 88,
    mile2: 86,
    mile3: 83,
    irc: 85,
    attendance: 84,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
];

export const bankingStudentData = [
  {
    sno: 1,
    name: "Amit P",
    email: "amit01@gmail.com",
    bookingId: "BK01-001",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "BK01",
    phone: "9876543210",
    mode: "Online",
    mile1: 83,
    mile2: 64,
    mile3: 91,
    irc: 75,
    attendance: 88,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Nisha R",
    email: "nisha02@gmail.com",
    bookingId: "BK01-002",
    epicStatus: "Proficient",
    placement: "Yet to Place",
    batch: "BK01",
    phone: "9123456789",
    mode: "Offline",
    mile1: 96,
    mile2: 88,
    mile3: 79,
    irc: 93,
    attendance: 67,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Karthik G",
    email: "karthik03@gmail.com",
    bookingId: "BK01-003",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "BK01",
    phone: "9871234560",
    mode: "Online",
    mile1: 78,
    mile2: 66,
    mile3: 90,
    irc: 89,
    attendance: 81,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Rekha S",
    email: "rekha04@gmail.com",
    bookingId: "BK01-004",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "BK01",
    phone: "9834567891",
    mode: "Offline",
    mile1: 91,
    mile2: 77,
    mile3: 59,
    irc: 84,
    attendance: 73,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Rakesh T",
    email: "rakesh05@gmail.com",
    bookingId: "BK01-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "BK01",
    phone: "9945671234",
    mode: "Online",
    mile1: 55,
    mile2: 85,
    mile3: 72,
    irc: 95,
    attendance: 90,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Divya V",
    email: "divya01@gmail.com",
    bookingId: "BK02-001",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "BK02",
    phone: "9012345678",
    mode: "Offline",
    mile1: 87,
    mile2: 79,
    mile3: 93,
    irc: 91,
    attendance: 68,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Sathish R",
    email: "sathish02@gmail.com",
    bookingId: "BK02-002",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "BK02",
    phone: "9988776655",
    mode: "Online",
    mile1: 60,
    mile2: 97,
    mile3: 65,
    irc: 87,
    attendance: 72,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Neha K",
    email: "neha03@gmail.com",
    bookingId: "BK02-003",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "BK02",
    phone: "9876501234",
    mode: "Offline",
    mile1: 81,
    mile2: 69,
    mile3: 97,
    irc: 90,
    attendance: 76,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Mahesh J",
    email: "mahesh04@gmail.com",
    bookingId: "BK02-004",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "BK02",
    phone: "9823456712",
    mode: "Online",
    mile1: 93,
    mile2: 88,
    mile3: 55,
    irc: 63,
    attendance: 83,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Tina L",
    email: "tina05@gmail.com",
    bookingId: "BK02-005",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "BK02",
    phone: "9786543210",
    mode: "Offline",
    mile1: 86,
    mile2: 58,
    mile3: 66,
    irc: 72,
    attendance: 59,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Ajay S",
    email: "ajay01@gmail.com",
    bookingId: "BK03-001",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "BK03",
    phone: "9900112233",
    mode: "Online",
    mile1: 79,
    mile2: 90,
    mile3: 82,
    irc: 78,
    attendance: 85,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Sneha T",
    email: "snehat02@gmail.com",
    bookingId: "BK03-002",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "BK03",
    phone: "9011223344",
    mode: "Offline",
    mile1: 98,
    mile2: 74,
    mile3: 83,
    irc: 94,
    attendance: 65,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Harini V",
    email: "harini03@gmail.com",
    bookingId: "BK03-003",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "BK03",
    phone: "9090909090",
    mode: "Online",
    mile1: 69,
    mile2: 92,
    mile3: 88,
    irc: 88,
    attendance: 93,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Naveen D",
    email: "naveen04@gmail.com",
    bookingId: "BK03-004",
    epicStatus: "Ideal",
    placement: "Not Placed",
    batch: "BK03",
    phone: "9123456780",
    mode: "Offline",
    mile1: 67,
    mile2: 73,
    mile3: 95,
    irc: 70,
    attendance: 71,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Bhuvana S",
    email: "bhuvana05@gmail.com",
    bookingId: "BK03-005",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "BK03",
    phone: "9345678901",
    mode: "Online",
    mile1: 75,
    mile2: 59,
    mile3: 61,
    irc: 79,
    attendance: 86,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Megha N",
    email: "megha01@gmail.com",
    bookingId: "BK04-001",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "BK04",
    phone: "9867543210",
    mode: "Offline",
    mile1: 84,
    mile2: 62,
    mile3: 84,
    irc: 73,
    attendance: 66,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Vikas K",
    email: "vikas02@gmail.com",
    bookingId: "BK04-002",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "BK04",
    phone: "9856234123",
    mode: "Online",
    mile1: 61,
    mile2: 93,
    mile3: 74,
    irc: 76,
    attendance: 80,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Anitha R",
    email: "anitha03@gmail.com",
    bookingId: "BK04-003",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "BK04",
    phone: "9998887776",
    mode: "Offline",
    mile1: 58,
    mile2: 83,
    mile3: 96,
    irc: 86,
    attendance: 69,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Rahul S",
    email: "rahul04@gmail.com",
    bookingId: "BK04-004",
    epicStatus: "Excellent",
    placement: "Yet to Place",
    batch: "BK04",
    phone: "9876123450",
    mode: "Online",
    mile1: 62,
    mile2: 80,
    mile3: 67,
    irc: 85,
    attendance: 75,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Krishna P",
    email: "krishna05@gmail.com",
    bookingId: "BK04-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "BK04",
    phone: "9765432109",
    mode: "Offline",
    mile1: 70,
    mile2: 94,
    mile3: 86,
    irc: 92,
    attendance: 78,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Shruti G",
    email: "shruti01@gmail.com",
    bookingId: "BK05-001",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "BK05",
    phone: "9654321098",
    mode: "Online",
    mile1: 64,
    mile2: 68,
    mile3: 87,
    irc: 67,
    attendance: 82,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Dinesh A",
    email: "dinesh02@gmail.com",
    bookingId: "BK05-002",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "BK05",
    phone: "9870011223",
    mode: "Offline",
    mile1: 85,
    mile2: 70,
    mile3: 60,
    irc: 74,
    attendance: 74,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Kavitha R",
    email: "kavitha03@gmail.com",
    bookingId: "BK05-003",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "BK05",
    phone: "9761234567",
    mode: "Online",
    mile1: 92,
    mile2: 75,
    mile3: 76,
    irc: 83,
    attendance: 88,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Rajan V",
    email: "rajan04@gmail.com",
    bookingId: "BK05-004",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "BK05",
    phone: "9345612789",
    mode: "Offline",
    mile1: 59,
    mile2: 91,
    mile3: 58,
    irc: 71,
    attendance: 63,
    status: "Ongoing",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Anu J",
    email: "anu05@gmail.com",
    bookingId: "BK05-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "BK05",
    phone: "9123876543",
    mode: "Online",
    mile1: 77,
    mile2: 60,
    mile3: 89,
    irc: 64,
    attendance: 70,
    status: "Completed",
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
];

export const marketingStudentData = [
  {
    sno: 1,
    name: "Rahul M",
    email: "rahul01@gmail.com",
    bookingId: "MK01-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "MK01",
    phone: "9876543210",
    mode: "Online",
    mile1: 87,
    mile2: 91,
    mile3: 69,
    irc: 95,
    attendance: 84,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Meera D",
    email: "meera02@gmail.com",
    bookingId: "MK01-002",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "MK01",
    phone: "9123456789",
    mode: "Offline",
    mile1: 64,
    mile2: 98,
    mile3: 82,
    irc: 89,
    attendance: 71,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Gokul N",
    email: "gokul03@gmail.com",
    bookingId: "MK01-003",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "MK01",
    phone: "9812345678",
    mode: "Online",
    mile1: 79,
    mile2: 60,
    mile3: 95,
    irc: 90,
    attendance: 69,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Lavanya M",
    email: "lavanya04@gmail.com",
    bookingId: "MK01-004",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "MK01",
    phone: "9345678901",
    mode: "Offline",
    mile1: 75,
    mile2: 89,
    mile3: 70,
    irc: 86,
    attendance: 80,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Jayanth P",
    email: "jayanth05@gmail.com",
    bookingId: "MK01-005",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "MK01",
    phone: "9789012345",
    mode: "Online",
    mile1: 93,
    mile2: 58,
    mile3: 61,
    irc: 84,
    attendance: 65,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Snehal R",
    email: "snehal01@gmail.com",
    bookingId: "MK02-001",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "MK02",
    phone: "9871234560",
    mode: "Offline",
    mile1: 85,
    mile2: 74,
    mile3: 87,
    irc: 92,
    attendance: 63,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Aditya S",
    email: "aditya02@gmail.com",
    bookingId: "MK02-002",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "MK02",
    phone: "9988776655",
    mode: "Online",
    mile1: 66,
    mile2: 85,
    mile3: 98,
    irc: 78,
    attendance: 77,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Priya V",
    email: "priya03@gmail.com",
    bookingId: "MK02-003",
    epicStatus: "Proficient",
    placement: "Yet to Place",
    batch: "MK02",
    phone: "9001122334",
    mode: "Offline",
    mile1: 91,
    mile2: 88,
    mile3: 59,
    irc: 73,
    attendance: 58,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Saran K",
    email: "saran04@gmail.com",
    bookingId: "MK02-004",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "MK02",
    phone: "9765432109",
    mode: "Online",
    mile1: 57,
    mile2: 77,
    mile3: 76,
    irc: 88,
    attendance: 69,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Keerthi L",
    email: "keerthi05@gmail.com",
    bookingId: "MK02-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "MK02",
    phone: "9345612789",
    mode: "Offline",
    mile1: 70,
    mile2: 95,
    mile3: 60,
    irc: 83,
    attendance: 90,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Yogesh B",
    email: "yogesh01@gmail.com",
    bookingId: "MK03-001",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "MK03",
    phone: "9867543210",
    mode: "Online",
    mile1: 82,
    mile2: 59,
    mile3: 84,
    irc: 91,
    attendance: 68,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Revathi T",
    email: "revathi02@gmail.com",
    bookingId: "MK03-002",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "MK03",
    phone: "9011223344",
    mode: "Offline",
    mile1: 88,
    mile2: 72,
    mile3: 63,
    irc: 67,
    attendance: 66,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Ritika A",
    email: "ritika03@gmail.com",
    bookingId: "MK03-003",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "MK03",
    phone: "9090909090",
    mode: "Online",
    mile1: 95,
    mile2: 87,
    mile3: 79,
    irc: 85,
    attendance: 72,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Manoj K",
    email: "manoj04@gmail.com",
    bookingId: "MK03-004",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "MK03",
    phone: "9988001122",
    mode: "Offline",
    mile1: 90,
    mile2: 93,
    mile3: 56,
    irc: 79,
    attendance: 64,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Sharanya S",
    email: "sharanya05@gmail.com",
    bookingId: "MK03-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "MK03",
    phone: "9876123450",
    mode: "Online",
    mile1: 58,
    mile2: 83,
    mile3: 91,
    irc: 76,
    attendance: 86,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Ashwin R",
    email: "ashwin01@gmail.com",
    bookingId: "MK04-001",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "MK04",
    phone: "9654321098",
    mode: "Offline",
    mile1: 80,
    mile2: 63,
    mile3: 92,
    irc: 90,
    attendance: 73,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Pavithra D",
    email: "pavithra02@gmail.com",
    bookingId: "MK04-002",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "MK04",
    phone: "9012345678",
    mode: "Online",
    mile1: 97,
    mile2: 79,
    mile3: 81,
    irc: 75,
    attendance: 59,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Siddhi T",
    email: "siddhi03@gmail.com",
    bookingId: "MK04-003",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "MK04",
    phone: "9761234567",
    mode: "Offline",
    mile1: 61,
    mile2: 60,
    mile3: 94,
    irc: 70,
    attendance: 75,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Bala K",
    email: "bala04@gmail.com",
    bookingId: "MK04-004",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "MK04",
    phone: "9870011223",
    mode: "Online",
    mile1: 73,
    mile2: 67,
    mile3: 88,
    irc: 62,
    attendance: 62,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Hema L",
    email: "hema05@gmail.com",
    bookingId: "MK04-005",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "MK04",
    phone: "9345678902",
    mode: "Offline",
    mile1: 60,
    mile2: 78,
    mile3: 66,
    irc: 68,
    attendance: 79,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Sowmya N",
    email: "sowmya01@gmail.com",
    bookingId: "MK05-001",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "MK05",
    phone: "9786543210",
    mode: "Online",
    mile1: 74,
    mile2: 56,
    mile3: 65,
    irc: 81,
    attendance: 87,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Jithin B",
    email: "jithin02@gmail.com",
    bookingId: "MK05-002",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "MK05",
    phone: "9234567890",
    mode: "Offline",
    mile1: 62,
    mile2: 91,
    mile3: 60,
    irc: 77,
    attendance: 60,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Irfan H",
    email: "irfan03@gmail.com",
    bookingId: "MK05-003",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "MK05",
    phone: "9321456789",
    mode: "Online",
    mile1: 86,
    mile2: 70,
    mile3: 89,
    irc: 74,
    attendance: 61,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Vidya S",
    email: "vidya04@gmail.com",
    bookingId: "MK05-004",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "MK05",
    phone: "9875432101",
    mode: "Offline",
    mile1: 78,
    mile2: 92,
    mile3: 73,
    irc: 69,
    attendance: 67,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Siddarth M",
    email: "siddarth05@gmail.com",
    bookingId: "MK05-005",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "MK05",
    phone: "9567890123",
    mode: "Online",
    mile1: 59,
    mile2: 84,
    mile3: 97,
    irc: 82,
    attendance: 70,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
];

export const sapStudentData = [
  {
    sno: 1,
    name: "Ritika N",
    email: "ritika01@gmail.com",
    bookingId: "SAP01-001",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "SAP01",
    phone: "9876543012",
    mode: "Online",
    mile1: 82,
    mile2: 74,
    mile3: 69,
    irc: 80,
    attendance: 90,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Abhishek R",
    email: "abhishek02@gmail.com",
    bookingId: "SAP01-002",
    epicStatus: "Excellent",
    placement: "Yet to Place",
    batch: "SAP01",
    phone: "9345627890",
    mode: "Offline",
    mile1: 91,
    mile2: 87,
    mile3: 93,
    irc: 88,
    attendance: 95,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Trisha D",
    email: "trisha03@gmail.com",
    bookingId: "SAP01-003",
    epicStatus: "Ideal",
    placement: "Not Placed",
    batch: "SAP01",
    phone: "9781203456",
    mode: "Online",
    mile1: 68,
    mile2: 72,
    mile3: 70,
    irc: 75,
    attendance: 85,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Kiran S",
    email: "kiran04@gmail.com",
    bookingId: "SAP01-004",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "SAP01",
    phone: "9567012345",
    mode: "Offline",
    mile1: 85,
    mile2: 89,
    mile3: 80,
    irc: 83,
    attendance: 92,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Snehal R",
    email: "snehal05@gmail.com",
    bookingId: "SAP01-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "SAP01",
    phone: "9123456790",
    mode: "Online",
    mile1: 76,
    mile2: 70,
    mile3: 74,
    irc: 77,
    attendance: 88,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Nandhini B",
    email: "nandhini01@gmail.com",
    bookingId: "SAP02-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "SAP02",
    phone: "9876032123",
    mode: "Offline",
    mile1: 94,
    mile2: 92,
    mile3: 91,
    irc: 90,
    attendance: 97,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Akhil K",
    email: "akhil02@gmail.com",
    bookingId: "SAP02-002",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "SAP02",
    phone: "9012345678",
    mode: "Online",
    mile1: 64,
    mile2: 68,
    mile3: 70,
    irc: 72,
    attendance: 80,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Geetha M",
    email: "geetha03@gmail.com",
    bookingId: "SAP02-003",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "SAP02",
    phone: "9234567891",
    mode: "Offline",
    mile1: 75,
    mile2: 73,
    mile3: 70,
    irc: 74,
    attendance: 86,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Rohit V",
    email: "rohit04@gmail.com",
    bookingId: "SAP02-004",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "SAP02",
    phone: "9789345670",
    mode: "Online",
    mile1: 88,
    mile2: 84,
    mile3: 87,
    irc: 85,
    attendance: 90,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Vidya R",
    email: "vidya05@gmail.com",
    bookingId: "SAP02-005",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "SAP02",
    phone: "9109876543",
    mode: "Offline",
    mile1: 92,
    mile2: 93,
    mile3: 89,
    irc: 90,
    attendance: 93,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Kavitha S",
    email: "kavitha01@gmail.com",
    bookingId: "SAP03-001",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "SAP03",
    phone: "9876789012",
    mode: "Online",
    mile1: 83,
    mile2: 80,
    mile3: 78,
    irc: 81,
    attendance: 89,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Arjun T",
    email: "arjun02@gmail.com",
    bookingId: "SAP03-002",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "SAP03",
    phone: "9321456709",
    mode: "Offline",
    mile1: 74,
    mile2: 70,
    mile3: 72,
    irc: 76,
    attendance: 85,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Bhavana D",
    email: "bhavana03@gmail.com",
    bookingId: "SAP03-003",
    epicStatus: "Ideal",
    placement: "Not Placed",
    batch: "SAP03",
    phone: "9567890123",
    mode: "Online",
    mile1: 69,
    mile2: 71,
    mile3: 65,
    irc: 70,
    attendance: 83,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Mani K",
    email: "mani04@gmail.com",
    bookingId: "SAP03-004",
    epicStatus: "Excellent",
    placement: "Yet to Place",
    batch: "SAP03",
    phone: "9345678901",
    mode: "Offline",
    mile1: 90,
    mile2: 87,
    mile3: 88,
    irc: 86,
    attendance: 91,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Lavanya G",
    email: "lavanya05@gmail.com",
    bookingId: "SAP03-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "SAP03",
    phone: "9012233445",
    mode: "Online",
    mile1: 80,
    mile2: 78,
    mile3: 82,
    irc: 79,
    attendance: 87,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Rajesh R",
    email: "rajesh01@gmail.com",
    bookingId: "SAP04-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "SAP04",
    phone: "9876123409",
    mode: "Offline",
    mile1: 95,
    mile2: 94,
    mile3: 92,
    irc: 93,
    attendance: 98,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Meena S",
    email: "meena02@gmail.com",
    bookingId: "SAP04-002",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "SAP04",
    phone: "9123456701",
    mode: "Online",
    mile1: 73,
    mile2: 71,
    mile3: 75,
    irc: 70,
    attendance: 84,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Yuvraj D",
    email: "yuvraj03@gmail.com",
    bookingId: "SAP04-003",
    epicStatus: "Proficient",
    placement: "Not Placed",
    batch: "SAP04",
    phone: "9234512345",
    mode: "Offline",
    mile1: 78,
    mile2: 80,
    mile3: 76,
    irc: 82,
    attendance: 87,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Shruti L",
    email: "shruti04@gmail.com",
    bookingId: "SAP04-004",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "SAP04",
    phone: "9988776655",
    mode: "Online",
    mile1: 65,
    mile2: 69,
    mile3: 70,
    irc: 68,
    attendance: 79,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Ganesh V",
    email: "ganesh05@gmail.com",
    bookingId: "SAP04-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "SAP04",
    phone: "9090901234",
    mode: "Offline",
    mile1: 80,
    mile2: 77,
    mile3: 79,
    irc: 81,
    attendance: 85,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Divakar K",
    email: "divakar01@gmail.com",
    bookingId: "SAP05-001",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "SAP05",
    phone: "9871112223",
    mode: "Online",
    mile1: 70,
    mile2: 68,
    mile3: 66,
    irc: 72,
    attendance: 82,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Revathi P",
    email: "revathi02@gmail.com",
    bookingId: "SAP05-002",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "SAP05",
    phone: "9345098765",
    mode: "Offline",
    mile1: 91,
    mile2: 93,
    mile3: 90,
    irc: 94,
    attendance: 96,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Sathya N",
    email: "sathya03@gmail.com",
    bookingId: "SAP05-003",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "SAP05",
    phone: "9109234567",
    mode: "Online",
    mile1: 76,
    mile2: 73,
    mile3: 74,
    irc: 75,
    attendance: 86,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Preethi J",
    email: "preethi04@gmail.com",
    bookingId: "SAP05-004",
    epicStatus: "Proficient",
    placement: "Not Placed",
    batch: "SAP05",
    phone: "9567891112",
    mode: "Offline",
    mile1: 82,
    mile2: 85,
    mile3: 81,
    irc: 84,
    attendance: 89,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Sanjay M",
    email: "sanjay05@gmail.com",
    bookingId: "SAP05-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "SAP05",
    phone: "9789012346",
    mode: "Online",
    mile1: 90,
    mile2: 92,
    mile3: 93,
    irc: 91,
    attendance: 95,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
];

export const devopsStudentData = [
  {
    sno: 1,
    name: "Vikram R",
    email: "vikram01@gmail.com",
    bookingId: "DV01-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DV01",
    phone: "9876543001",
    mode: "Online",
    mile1: 92,
    mile2: 90,
    mile3: 95,
    irc: 91,
    attendance: 96,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Aishwarya M",
    email: "aishu02@gmail.com",
    bookingId: "DV01-002",
    epicStatus: "Proficient",
    placement: "Yet to Place",
    batch: "DV01",
    phone: "9345612002",
    mode: "Offline",
    mile1: 82,
    mile2: 85,
    mile3: 80,
    irc: 83,
    attendance: 89,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Mohan S",
    email: "mohan03@gmail.com",
    bookingId: "DV01-003",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "DV01",
    phone: "9781234003",
    mode: "Online",
    mile1: 70,
    mile2: 73,
    mile3: 75,
    irc: 72,
    attendance: 84,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Radha T",
    email: "radha04@gmail.com",
    bookingId: "DV01-004",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "DV01",
    phone: "9567012004",
    mode: "Offline",
    mile1: 65,
    mile2: 68,
    mile3: 70,
    irc: 67,
    attendance: 80,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Nirmal B",
    email: "nirmal05@gmail.com",
    bookingId: "DV01-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DV01",
    phone: "9123456005",
    mode: "Online",
    mile1: 95,
    mile2: 94,
    mile3: 93,
    irc: 96,
    attendance: 98,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Sangeetha D",
    email: "sangeetha01@gmail.com",
    bookingId: "DV02-001",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "DV02",
    phone: "9876032006",
    mode: "Offline",
    mile1: 74,
    mile2: 76,
    mile3: 72,
    irc: 75,
    attendance: 85,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Rajan M",
    email: "rajan02@gmail.com",
    bookingId: "DV02-002",
    epicStatus: "Proficient",
    placement: "Yet to Place",
    batch: "DV02",
    phone: "9012345007",
    mode: "Online",
    mile1: 83,
    mile2: 80,
    mile3: 85,
    irc: 82,
    attendance: 88,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Keerthana K",
    email: "keerthi03@gmail.com",
    bookingId: "DV02-003",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "DV02",
    phone: "9234567008",
    mode: "Offline",
    mile1: 68,
    mile2: 70,
    mile3: 67,
    irc: 69,
    attendance: 79,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Arun R",
    email: "arun04@gmail.com",
    bookingId: "DV02-004",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DV02",
    phone: "9789345009",
    mode: "Online",
    mile1: 91,
    mile2: 92,
    mile3: 94,
    irc: 90,
    attendance: 95,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Divya S",
    email: "divya05@gmail.com",
    bookingId: "DV02-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "DV02",
    phone: "9109876010",
    mode: "Offline",
    mile1: 76,
    mile2: 79,
    mile3: 77,
    irc: 78,
    attendance: 86,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Bhaskar V",
    email: "bhaskar01@gmail.com",
    bookingId: "DV03-001",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "DV03",
    phone: "9876789011",
    mode: "Online",
    mile1: 66,
    mile2: 69,
    mile3: 68,
    irc: 70,
    attendance: 82,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Harsha M",
    email: "harsha02@gmail.com",
    bookingId: "DV03-002",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "DV03",
    phone: "9321456012",
    mode: "Offline",
    mile1: 85,
    mile2: 84,
    mile3: 86,
    irc: 87,
    attendance: 90,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Lalitha D",
    email: "lalitha03@gmail.com",
    bookingId: "DV03-003",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "DV03",
    phone: "9567890013",
    mode: "Online",
    mile1: 93,
    mile2: 92,
    mile3: 91,
    irc: 94,
    attendance: 96,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Deepak R",
    email: "deepak04@gmail.com",
    bookingId: "DV03-004",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "DV03",
    phone: "9345678014",
    mode: "Offline",
    mile1: 72,
    mile2: 74,
    mile3: 70,
    irc: 73,
    attendance: 83,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Meenakshi S",
    email: "meenakshi05@gmail.com",
    bookingId: "DV03-005",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "DV03",
    phone: "9012233015",
    mode: "Online",
    mile1: 84,
    mile2: 86,
    mile3: 83,
    irc: 85,
    attendance: 89,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Santosh N",
    email: "santosh01@gmail.com",
    bookingId: "DV04-001",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "DV04",
    phone: "9876123016",
    mode: "Offline",
    mile1: 90,
    mile2: 91,
    mile3: 92,
    irc: 89,
    attendance: 94,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Indu A",
    email: "indu02@gmail.com",
    bookingId: "DV04-002",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "DV04",
    phone: "9123456017",
    mode: "Online",
    mile1: 67,
    mile2: 65,
    mile3: 66,
    irc: 68,
    attendance: 80,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Kiran V",
    email: "kiran03@gmail.com",
    bookingId: "DV04-003",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "DV04",
    phone: "9234512018",
    mode: "Offline",
    mile1: 71,
    mile2: 72,
    mile3: 74,
    irc: 70,
    attendance: 85,
    domainScore: 85,
    aptitudeScore: 78,
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Praveen L",
    email: "praveen04@gmail.com",
    bookingId: "DV04-004",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "DV04",
    phone: "9988776019",
    mode: "Online",
    mile1: 87,
    mile2: 88,
    mile3: 86,
    irc: 89,
    attendance: 91,
    domainScore: 85, 
    aptitudeScore: 78,  
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Sowmiya P",
    email: "sowmiya05@gmail.com",
    bookingId: "DV04-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "DV04",
    phone: "9090901020",
    mode: "Offline",
    mile1: 78,
    mile2: 76,
    mile3: 80,
    irc: 79,
    attendance: 86,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 1,
    name: "Pavan T",
    email: "pavan01@gmail.com",
    bookingId: "DV05-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DV05",
    phone: "9871112021",
    mode: "Online",
    mile1: 96,
    mile2: 94,
    mile3: 95,
    irc: 97,
    attendance: 99,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 2,
    name: "Reshma R",
    email: "reshma02@gmail.com",
    bookingId: "DV05-002",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "DV05",
    phone: "9345098022",
    mode: "Offline",
    mile1: 66,
    mile2: 68,
    mile3: 65,
    irc: 69,
    attendance: 81,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 3,
    name: "Sundar M",
    email: "sundar03@gmail.com",
    bookingId: "DV05-003",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "DV05",
    phone: "9109234023",
    mode: "Online",
    mile1: 74,
    mile2: 73,
    mile3: 76,
    irc: 75,
    attendance: 84,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 4,
    name: "Aarthi G",
    email: "aarthi04@gmail.com",
    bookingId: "DV05-004",
    epicStatus: "Proficient",
    placement: "Not Required",
    batch: "DV05",
    phone: "9567891024",
    mode: "Offline",
    mile1: 81,
    mile2: 83,
    mile3: 80,
    irc: 82,
    attendance: 88,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
  {
    sno: 5,
    name: "Manikandan V",
    email: "manikandan05@gmail.com",
    bookingId: "DV05-005",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "DV05",
    phone: "9789012025",
    mode: "Online",
    mile1: 95,
    mile2: 96,
    mile3: 94,
    irc: 93,
    attendance: 97,
    domainScore: 85, 
    aptitudeScore: 78, 
    communicationScore: 80,
    trainerName: "Shri Hari",
  },
];
const batchStatsData = {
  fullstack: {
    completedBatches: 18,
    ongoingBatches: 4,
    completedStudents: 500,
    ongoingStudents: 80,
    placementEligible: 50,
    alreadyPlaced: 320,
    yetToPlace: 180,
  },
  data: {
    completedBatches: 12,
    ongoingBatches: 3,
    completedStudents: 400,
    ongoingStudents: 50,
    placementEligible: 30,
    alreadyPlaced: 260,
    yetToPlace: 140,
  },
  banking: {
    completedBatches: 8,
    ongoingBatches: 2,
    completedStudents: 300,
    ongoingStudents: 40,
    placementEligible: 20,
    alreadyPlaced: 180,
    yetToPlace: 120,
  },
  marketing: {
    completedBatches: 5,
    ongoingBatches: 1,
    completedStudents: 200,
    ongoingStudents: 20,
    placementEligible: 10,
    alreadyPlaced: 120,
    yetToPlace: 80,
  },
  sap: {
    completedBatches: 6,
    ongoingBatches: 2,
    completedStudents: 100,
    ongoingStudents: 30,
    placementEligible: 8,
    alreadyPlaced: 60,
    yetToPlace: 70,
  },
  devops: {
    completedBatches: 3,
    ongoingBatches: 2,
    completedStudents: 100,
    ongoingStudents: 10,
    placementEligible: 5,
    alreadyPlaced: 40,
    yetToPlace: 70,
  },
};

// ➤ Provider Component
const DataProvider = ({ children }) => {
  const [batchingvalue, setBatchingValue] = useState(""); // selected domain
  const [studentBatchSelect, setStudentBatchSelect] = useState(""); //Select student Domain
  const [batchesNames, setBatchesNames] = useState([]); // name of batches in current domain
  const [studentData, setStudentData] = useState([]); // student data for current domain
  const [loginUser, setLoginUser] = useState(""); // logged-in user
  const [batchHead, setBatchHead] = useState(""); // domain title for UI
  const [batchData, setBatchData] = useState([]); // currently active batch data
  const [allBatchNames, setAllBatchNames] = useState([]); //all batch names across domains
  const [allStudentData, setAllStudentData] = useState([]); // for storing all student records
  const [batchEpicStats, setBatchEpicStats] = useState({});

  const [liveCounts, setLiveCounts] = useState({
    batch: 0,
    student: 0,
    domain: 6,
  }); // live counts of students in each domain

  // ➤ Domain-wise individual state data
  const [fullstackData, setFullstackData] = useState(fullstackInitial);
  const [dataanalyticsData, setDataanalyticsData] =
    useState(dataanalyticsInitial);
  const [bankingData, setBankingData] = useState(bankingInitial);
  const [marketingData, setMarketingData] = useState(marketingInitial);
  const [sapData, setSapData] = useState(sapInitial);
  const [devopsData, setDevopsData] = useState(devopsInitial);

  // ➤ Domain-wise individual student data
  const [fullstackStudent, setFullstackStudent] =
    useState(fullstackStudentData);
  const [dataanalyticsStudent, setDataanalyticsStudent] = useState(
    dataAnalyticsStudentData
  );
  const [bankingStudent, setBankingStudent] = useState(bankingStudentData);
  const [marketingStudent, setMarketingStudent] =
    useState(marketingStudentData);
  const [sapStudent, setSapStudent] = useState(sapStudentData);
  const [devopsStudent, setDevopsStudent] = useState(devopsStudentData);

  // ➤ Domain-wise individual opportunities data
  const [fullstackOpportunities, setFullstackOpportunities] = useState(
    fullstackOpportunitiesInitial
  );
  const [dataanalyticsOpportunities, setDataanalyticsOpportunities] = useState(
    dataanalyticsOpportunitiesInitial
  );
  const [marketingOpportunities, setMarketingOpportunities] = useState(
    marketingOpportunitiesInitial
  );
  const [digitalmarketingOpportunities, setDigitalmarketingOpportunities] =
    useState(digitalmarketingOpportunitiesInitial);
  const [sapOpportunities, setSapOpportunities] = useState(
    sapOpportunitiesInitial
  );
  const [devopsOpportunities, setDevopsOpportunities] = useState(
    devopsOpportunitiesInitial
  );
  const [bankingOpportunities, setBankingOpportunities] = useState(bankingOpportunitiesInitial);

  const userName = loginUser.split("@")[0];
  const firstLetterUser = loginUser?.charAt(0).toUpperCase() || "";

  const liveBatchNames = useMemo(() => {
    return [...new Set(studentData.map((s) => s.batch).filter(Boolean))].sort();
  }, [studentData]);

const calculateBatchEpicStats = (studentsArray) => {
  const stats = {};
  studentsArray.forEach((student) => {
    const batchName = student.batch; // Assuming the student object has a 'batch' property
    const status = student.epicStatus; // Assuming the student object has an 'epicStatus' property

    // Initialize batch object if it doesn't exist
    if (!stats[batchName]) {
      stats[batchName] = {}; // Or initialize with all possible statuses if you want 0 counts initially
    }

    // Increment the count for the specific status within the batch
    // Handle cases where epicStatus might be missing or invalid
    if (status && typeof status === 'string') {
        stats[batchName][status] = (stats[batchName][status] || 0) + 1;
    } else {
        // Optional: Handle students without a defined epicStatus
        // e.g., count them under 'Unknown' or skip
        const unknownKey = 'Unknown';
        stats[batchName][unknownKey] = (stats[batchName][unknownKey] || 0) + 1;
    }
  });
  return stats;
};

  //all batches names across domains
  useEffect(() => {
    const fullstack = fullstackData.map((b) => b.batchNo);
    const analytics = dataanalyticsData.map((b) => b.batchNo);
    const banking = bankingData.map((b) => b.batchNo);
    const marketing = marketingStudentData.map((b) => b.batch);
    const sap = sapData.map((b) => b.batchNo);
    const devops = devopsData.map((b) => b.batchNo);

    const all = [
      ...fullstack,
      ...analytics,
      ...banking,
      ...marketing,
      ...sap,
      ...devops,
    ];

    const uniqueSorted = Array.from(new Set(all)).sort();
    setAllBatchNames(uniqueSorted);

    const allStudents = [
      ...fullstackStudent,
      ...dataanalyticsStudent,
      ...bankingStudent,
      ...marketingStudentData,
      ...sapStudent,
      ...devopsStudent,
    ];
    setAllStudentData(allStudents);
    setLiveCounts((prev) => ({ ...prev, student: allStudents.length }));
    const uniqueBatchCount = new Set(
      allStudents.map((student) => student.batch)
    ).size;
    setLiveCounts((prev) => ({ ...prev, batch: uniqueBatchCount }));
  }, [
    fullstackData,
    dataanalyticsData,
    bankingData,
    marketingStudentData,
    sapData,
    devopsData,
    fullstackStudent,
    dataanalyticsStudent,
    bankingStudent,
    sapStudent,
    devopsStudent,
  ]);

  // Update batchData and batchHead when batchingvalue changes
  useEffect(() => {
    switch (batchingvalue) {
      case "fullstack":
        setBatchHead("Full Stack Development");
        setBatchesNames(fullstackData.map((b) => b.batchNo));
        setBatchData(fullstackData);
        break;
      case "dataanalytics":
        setBatchHead("Data Analytics & Science");
        setBatchesNames(dataanalyticsData.map((b) => b.batchNo));
        setBatchData(dataanalyticsData);
        break;
      case "banking":
        setBatchHead("Banking & Financial Services");
        setBatchesNames(bankingData.map((b) => b.batchNo));
        setBatchData(bankingData);
        break;
      case "marketing":
        setBatchHead("Digital Marketing");
        setBatchesNames(marketingData.map((b) => b.batchNo));
        setBatchData(marketingData);
        break;
      case "sap":
        setBatchHead("SAP");
        setBatchesNames(sapData.map((b) => b.batchNo));
        setBatchData(sapData);
        break;
      case "devops":
        setBatchHead("DevOps");
        setBatchesNames(devopsData.map((b) => b.batchNo));
        setBatchData(devopsData);
        break;
      default:
        setBatchHead("");
        setBatchData([]);
    }
  }, [
    batchingvalue,
    fullstackData,
    dataanalyticsData,
    bankingData,
    marketingData,
    sapData,
    devopsData,
  ]);

  const addMultipleStudents = (newStudents) => {
    const updateList = (list) => [...list, ...newStudents];
    switch (batchingvalue) {
      case "fullstack":
        setFullstackStudent(updateList(fullstackStudent));
        break;
      case "dataanalytics":
        setDataanalyticsStudent(updateList(dataanalyticsStudent));
        break;
      case "banking":
        setBankingStudent(updateList(bankingStudent));
        break;
      case "marketing":
        setMarketingStudent(updateList(marketingStudent));
        break;
      case "sap":
        setSapStudent(updateList(sapStudent));
        break;
      case "devops":
        setDevopsStudent(updateList(devopsStudent));
        break;
    }
    setStudentData(updateList(studentData));
  };

  // 🔄 Update studentData and studentHead when batchingvalue changes
  useEffect(() => {
    switch (studentBatchSelect) {
case "fullstack":
  setBatchHead("Full Stack Development");
  setBatchesNames([...new Set(fullstackStudent.map(s => s.batch).filter(Boolean))].sort());
  setStudentData(fullstackStudent);
  setBatchEpicStats(calculateBatchEpicStats(fullstackStudent));
  break;

case "dataanalytics":
  setBatchHead("Data Analytics & Science");
  setBatchesNames([...new Set(dataanalyticsStudent.map(s => s.batch).filter(Boolean))].sort());
  setStudentData(dataanalyticsStudent);
  setBatchEpicStats(calculateBatchEpicStats(dataanalyticsStudent));
  break;

case "marketing":
  setBatchHead("Digital Marketing");
  setBatchesNames([...new Set(marketingStudent.map(s => s.batch).filter(Boolean))].sort());
  setStudentData(marketingStudent);
  setBatchEpicStats(calculateBatchEpicStats(marketingStudent));
  break;

case "devops":
  setBatchHead("DevOps");
  setBatchesNames([...new Set(devopsStudent.map(s => s.batch).filter(Boolean))].sort());
  setStudentData(devopsStudent);
  setBatchEpicStats(calculateBatchEpicStats(devopsStudent));
  break;

case "banking":
  setBatchHead("Banking & Financial Services");
  setBatchesNames([...new Set(bankingStudent.map(s => s.batch).filter(Boolean))].sort());
  setStudentData(bankingStudent);
  setBatchEpicStats(calculateBatchEpicStats(bankingStudent));
  break;

case "sap":
  setBatchHead("SAP");
  setBatchesNames([...new Set(sapStudent.map(s => s.batch).filter(Boolean))].sort());
  setStudentData(sapStudent);
  setBatchEpicStats(calculateBatchEpicStats(sapStudent));
  break;

default:
  setBatchHead("");
  setBatchesNames([]);
  setStudentData([]);
  setBatchEpicStats({});

    }
  }, [
    studentBatchSelect,
    fullstackStudent,
    dataanalyticsStudent,
    bankingStudent,
    marketingStudent,
    sapStudent,
    devopsStudent,
  ]);

  // Update studentData and batchesNames when studentBatchSelect changes
  useEffect(() => {
    switch (studentBatchSelect) {
      case "fullstack":
        setBatchHead("Full Stack Development");
        // setBatchesNames(fullstackStudent.map((batch) => batch.batch));
        setStudentData(fullstackStudent);
        break;
      case "dataanalytics":
        setBatchHead("Data Analytics & Science");
        // setBatchesNames(dataanalyticsStudent.map((batch) => batch.batch));
        setStudentData(dataanalyticsStudent);
        break;
      case "banking":
        setBatchHead("Banking & Financial Services");
        // setBatchesNames(bankingStudent.map((batch) => batch.batch));
        setStudentData(bankingStudent);
        break;
      case "marketing":
        setBatchHead("Digital Marketing");
        // setBatchesNames(marketingStudent.map((batch) => batch.batch));
        setStudentData(marketingStudent);
        break;
      case "sap":
        setBatchHead("SAP");
        // setBatchesNames(sapStudent.map((batch) => batch.batch));
        setStudentData(sapStudent);
        break;
      case "devops":
        setBatchHead("DevOps");
        // setBatchesNames(devopsStudent.map((batch) => batch.batch));
        setStudentData(devopsStudent);
        break;
      default:
        setBatchHead("");
        setBatchesNames([]);
        setStudentData([]);
    }
  }, [
    studentBatchSelect,
    fullstackStudent,
    dataanalyticsStudent,
    bankingStudent,
    marketingStudent,
    sapStudent,
    devopsStudent,
  ]);

  const deleteStudent = (bookingId) => {
    const removeFromList = (list) =>
      list.filter((item) => item.bookingId !== bookingId);
    let updatedDomainList = [];

    switch (batchingvalue) {
      case "fullstack":
        updatedDomainList = removeFromList(fullstackStudent);
        setFullstackStudent(updatedDomainList);
        break;
      case "dataanalytics":
        updatedDomainList = removeFromList(dataanalyticsStudent);
        setDataanalyticsStudent(updatedDomainList);
        break;
      case "banking":
        updatedDomainList = removeFromList(bankingStudent);
        setBankingStudent(updatedDomainList);
        break;
      case "marketing":
        updatedDomainList = removeFromList(marketingStudent);
        setMarketingStudent(updatedDomainList);
        break;
      case "sap":
        updatedDomainList = removeFromList(sapStudent);
        setSapStudent(updatedDomainList);
        break;
      case "devops":
        updatedDomainList = removeFromList(devopsStudent);
        setDevopsStudent(updatedDomainList);
        break;
      default:
        return;
    }

    // 🔁 Now update studentData only for the current domain
    setStudentData((prev) =>
      prev.filter(
        (student) =>
          // Keep all students except the one being deleted
          !(student.bookingId === bookingId && student.domain === batchingvalue)
      )
    );
  };

  // 🔧 Add a new batch to current domain
  const addBatch = (newBatch) => {
    const batchWithId = { ...newBatch };

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

  // Update an existing batch by ID in current domain
  const updateBatch = (id, updatedFields) => {
    const updateList = (list) =>
      list.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      );

    switch (batchingvalue) {
      case "fullstack":
        setFullstackData((prev) => updateList(prev));
        break;
      case "dataanalytics":
        setDataanalyticsData((prev) => updateList(prev));
        break;
      case "banking":
        setBankingData((prev) => updateList(prev));
        break;
      case "marketing":
        setMarketingData((prev) => updateList(prev));
        break;
      case "sap":
        setSapData((prev) => updateList(prev));
        break;
      case "devops":
        setDevopsData((prev) => updateList(prev));
        break;
    }
  };

  // Update an existing student by bookingId in current domain
  const updateStudent = (bookingId, updatedFields) => {
    console.log("DataContext updateStudent called with:", {
      bookingId,
      updatedFields,
    });

    let originalDomain = "";
    let originalStudent = "";

    if (fullstackStudent.some((s) => s.bookingId === bookingId)) {
      originalStudent = fullstackStudent.find((s) => s.bookingId === bookingId);
      originalDomain = "fullstack";
    } else if (dataanalyticsStudent.some((s) => s.bookingId === bookingId)) {
      originalStudent = dataanalyticsStudent.find(
        (s) => s.bookingId === bookingId
      );
      originalDomain = "dataanalytics";
    } else if (bankingStudent.some((s) => s.bookingId === bookingId)) {
      originalStudent = bankingStudent.find((s) => s.bookingId === bookingId);
      originalDomain = "banking";
    } else if (marketingStudent.some((s) => s.bookingId === bookingId)) {
      originalStudent = marketingStudent.find((s) => s.bookingId === bookingId);
      originalDomain = "marketing";
    } else if (sapStudent.some((s) => s.bookingId === bookingId)) {
      originalStudent = sapStudent.find((s) => s.bookingId === bookingId);
      originalDomain = "sap";
    } else if (devopsStudent.some((s) => s.bookingId === bookingId)) {
      originalStudent = devopsStudent.find((s) => s.bookingId === bookingId);
      originalDomain = "devops";
    }

    // 2. Update the specific domain's student list
    const updateList = (list) =>
      list.map((item) =>
        item.bookingId === bookingId ? { ...item, ...updatedFields } : item
      );

    switch (originalDomain) {
      case "fullstack":
        setFullstackStudent((prev) => updateList(prev));
        break;
      case "dataanalytics":
        setDataanalyticsStudent((prev) => updateList(prev));
        break;
      case "banking":
        setBankingStudent((prev) => updateList(prev));
        break;
      case "marketing":
        setMarketingStudent((prev) => updateList(prev));
        break;
      case "sap":
        setSapStudent((prev) => updateList(prev));
        break;
      case "devops":
        setDevopsStudent((prev) => updateList(prev));
        break;
      default:
        console.error("Unknown domain for student update:", originalDomain);
        return;
    }

    setStudentData((prev) =>
      prev.map((item) =>
        item.bookingId === bookingId ? { ...item, ...updatedFields } : item
      )
    );

    setAllStudentData((prev) =>
      prev.map((item) =>
        item.bookingId === bookingId ? { ...item, ...updatedFields } : item
      )
    );
  };

  const batchChange = (bookingId, updatedStudentData) => {
    console.log("DataContext batchChange called with:", {
      bookingId,
      updatedStudentData,
    });

    let originalDomain = "";
    let originalListSetter = null;

    // 1. Identify the original domain and remove student from it
    const removeStudent = (list) =>
      list.filter((item) => item.bookingId !== bookingId);

    if (fullstackStudent.some((s) => s.bookingId === bookingId)) {
      originalDomain = "fullstack";
      originalListSetter = setFullstackStudent;
    } else if (dataanalyticsStudent.some((s) => s.bookingId === bookingId)) {
      originalDomain = "dataanalytics";
      originalListSetter = setDataanalyticsStudent;
    } else if (bankingStudent.some((s) => s.bookingId === bookingId)) {
      originalDomain = "banking";
      originalListSetter = setBankingStudent;
    } else if (marketingStudent.some((s) => s.bookingId === bookingId)) {
      originalDomain = "marketing";
      originalListSetter = setMarketingStudent;
    } else if (sapStudent.some((s) => s.bookingId === bookingId)) {
      originalDomain = "sap";
      originalListSetter = setSapStudent;
    } else if (devopsStudent.some((s) => s.bookingId === bookingId)) {
      originalDomain = "devops";
      originalListSetter = setDevopsStudent;
    }

    if (!originalListSetter) {
      console.error("Original domain not found for bookingId:", bookingId);
      return;
    }

    // Remove from original domain
    originalListSetter((prev) => removeStudent(prev));

    // 2. Determine target domain from batch ID (e.g., FS01 → fullstack)
    const batchCode = updatedStudentData.batch?.slice(0, 2).toUpperCase();
    let targetSetter = null;

    switch (batchCode) {
      case "FS":
        targetSetter = setFullstackStudent;
        break;
      case "DA":
        targetSetter = setDataanalyticsStudent;
        break;
      case "BK":
        targetSetter = setBankingStudent;
        break;
      case "MK":
        targetSetter = setMarketingStudent;
        break;
      case "SA":
        targetSetter = setSapStudent;
        break;
      case "DV":
        targetSetter = setDevopsStudent;
        break;
      default:
        console.error("Unknown target batch prefix:", batchCode);
        return;
    }

    // 3. Add to new domain
    targetSetter((prev) => [...prev, updatedStudentData]);

    // 4. Update global data lists
    setStudentData((prev) =>
      prev.map((item) =>
        item.bookingId === bookingId ? updatedStudentData : item
      )
    );
  };

  // Inside DataContext.js
const addOpportunity = (opportunity, domain) => { // Accept domain as an argument
  // Use the passed domain, fallback to batchingvalue if not provided
  // (Providing it explicitly is preferred, but fallback maintains some compatibility)
  const targetDomain = domain || batchingvalue;

  // Check the resolved targetDomain
  if (!targetDomain) {
    console.error("Domain is not set. Cannot add opportunity.");
    // Assuming you have a toast notification system available in DataContext
    // If not, you might need to handle this error differently (e.g., throw an error
    // that the calling component can catch, or return a specific error code/object)
    if (typeof toast !== 'undefined' && toast.error) {
        toast.error("Failed to add opportunity: Domain not specified.");
    }
    return;
  }

  // Add the determined domain to the opportunity object
  const opportunityWithDomain = { ...opportunity, domain: targetDomain };

  // Update the correct domain-specific opportunities array
  switch (targetDomain) {
    case "fullstack":
      setFullstackOpportunities((prev) => [...prev, opportunityWithDomain]);
      break;
    case "dataanalytics":
      setDataanalyticsOpportunities((prev) => [...prev, opportunityWithDomain]);
      break;
    case "banking":
      setBankingOpportunities((prev) => [...prev, opportunityWithDomain]);
      break;
    case "marketing":
      setMarketingOpportunities((prev) => [...prev, opportunityWithDomain]);
      break;
    case "sap":
      setSapOpportunities((prev) => [...prev, opportunityWithDomain]);
      break;
    case "devops":
      setDevopsOpportunities((prev) => [...prev, opportunityWithDomain]);
      break;
    default:
      console.error("Unknown domain for adding opportunity:", targetDomain);
      if (typeof toast !== 'undefined' && toast.error) {
         toast.error(`Failed to add opportunity: Unknown domain '${targetDomain}'.`);
      }
  }
};

  //  ➧  Fetch opportunities for the current domain
  const getOpportunitiesByDomain = (domain) => {
    switch (domain) {
      case "fullstack":
        return fullstackOpportunities;
      case "dataanalytics":
        return dataanalyticsOpportunities;
      case "marketing":
        return marketingOpportunities;
      case "sap":
        return sapOpportunities;
      case "devops":
        return devopsOpportunities;
      default:
        return [];
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

  const addStudent = (newStudent) => {
    const updateList = (list) => [...list, newStudent];
    switch (batchingvalue) {
      case "fullstack":
        setFullstackStudent(updateList(fullstackStudent));
        break;
      case "dataanalytics":
        setDataanalyticsStudent(updateList(dataanalyticsStudent));
        break;
      case "banking":
        setBankingStudent(updateList(bankingStudent));
        break;
      case "marketing":
        setMarketingStudent(updateList(marketingStudent));
        break;
      case "sap":
        setSapStudent(updateList(sapStudent));
        break;
      case "devops":
        setDevopsStudent(updateList(devopsStudent));
        break;
    }
    setStudentData(updateList(studentData));
  };

  const [selectedBatch, setSelectedBatch] = useState(null);

  const getStatsByBatch = (batchKey) => batchStatsData[batchKey];

  return (
    <DataContext.Provider
      value={{
        batchingvalue,
        batchChange,
        setBatchingValue,
        setStudentBatchSelect,
        loginUser,
        setLoginUser,
        firstLetterUser,
        batchHead,
        batchData,
        addBatch,
        updateBatch,
        deleteBatch,
        userName,
        selectedBatch,
        setSelectedBatch,
        getStatsByBatch,
        batchStatsData,
        batchesNames,
        studentData,
        deleteStudent,
        updateStudent,
        addStudent,
        addMultipleStudents,
        addOpportunity,
        getOpportunitiesByDomain,
        allBatchNames,
        allStudentData,
        batchData,
        studentData,
        liveCounts,
        liveBatchNames,
        batchEpicStats, 
        calculateBatchEpicStats,
        fullstackOpportunities,
      setFullstackOpportunities,
      dataanalyticsOpportunities,
      setDataanalyticsOpportunities,
      marketingOpportunities,
      setMarketingOpportunities,
      sapOpportunities,
      setSapOpportunities,
      devopsOpportunities,
      setDevopsOpportunities,
      bankingOpportunities,
      setBankingOpportunities,

      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
