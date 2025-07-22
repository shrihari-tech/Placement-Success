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

  
// ===== Full‑Stack =====
export const fullstackInitial = [
  {
    id: 1,
    batchNo: "FS01",
    mode: "Online",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    sections: {
      Domain: { startDate: "2024-01-01", endDate: "2024-03-01" },
      Aptitude: { startDate: "2024-03-02", endDate: "2024-05-01" },
      Communication: { startDate: "2024-05-02", endDate: "2024-06-30" },
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
    startDate: "2024-02-01",
    endDate: "2024-07-31",
    sections: {
      Domain: { startDate: "2024-02-01", endDate: "2024-04-01" },
      Aptitude: { startDate: "2024-04-02", endDate: "2024-06-01" },
      Communication: { startDate: "2024-06-02", endDate: "2024-07-31" },
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
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    sections: {
      Domain: { startDate: "2024-03-01", endDate: "2024-05-01" },
      Aptitude: { startDate: "2024-05-02", endDate: "2024-07-01" },
      Communication: { startDate: "2024-07-02", endDate: "2024-08-31" },
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
    startDate: "2024-04-01",
    endDate: "2024-09-30",
    sections: {
      Domain: { startDate: "2024-04-01", endDate: "2024-06-01" },
      Aptitude: { startDate: "2024-06-02", endDate: "2024-08-01" },
      Communication: { startDate: "2024-08-02", endDate: "2024-09-30" },
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
    startDate: "2024-05-01",
    endDate: "2024-10-31",
    sections: {
      Domain: { startDate: "2024-05-01", endDate: "2024-07-01" },
      Aptitude: { startDate: "2024-07-02", endDate: "2024-09-01" },
      Communication: { startDate: "2024-09-02", endDate: "2024-10-31" },
    },
    session: "FN",
    studentsPlaced: 95,
    pending: 25,
    totalCount: 120,
  }
];


export const dataanalyticsInitial = [
  {
    "id": 1,
    "batchNo": "DA01",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-01-01",
    "endDate": "2024-06-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 79,
    "pending": 44,
    "totalCount": 123
  },
  {
    "id": 2,
    "batchNo": "DA02",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-02-01",
    "endDate": "2024-07-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 42,
    "pending": 16,
    "totalCount": 58
  },
  {
    "id": 3,
    "batchNo": "DA03",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-03-01",
    "endDate": "2024-08-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 46,
    "pending": 10,
    "totalCount": 56
  },
  {
    "id": 4,
    "batchNo": "DA04",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-04-01",
    "endDate": "2024-09-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 79,
    "pending": 10,
    "totalCount": 89
  },
  {
    "id": 5,
    "batchNo": "DA05",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-05-01",
    "endDate": "2024-10-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 84,
    "pending": 14,
    "totalCount": 98
  }
];

export const bankingInitial = [
  {
    "id": 1,
    "batchNo": "BK01",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-01-01",
    "endDate": "2024-06-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 84,
    "pending": 25,
    "totalCount": 109
  },
  {
    "id": 2,
    "batchNo": "BK02",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-02-01",
    "endDate": "2024-07-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 100,
    "pending": 34,
    "totalCount": 134
  },
  {
    "id": 3,
    "batchNo": "BK03",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-03-01",
    "endDate": "2024-08-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 34,
    "pending": 35,
    "totalCount": 69
  },
  {
    "id": 4,
    "batchNo": "BK04",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-04-01",
    "endDate": "2024-09-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 92,
    "pending": 36,
    "totalCount": 128
  },
  {
    "id": 5,
    "batchNo": "BK05",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-05-01",
    "endDate": "2024-10-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 45,
    "pending": 25,
    "totalCount": 70
  }
];

export const marketingInitial = [
  {
    "id": 1,
    "batchNo": "DM01",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-01-01",
    "endDate": "2024-06-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 40,
    "pending": 10,
    "totalCount": 50
  },
  {
    "id": 2,
    "batchNo": "DM02",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-02-01",
    "endDate": "2024-07-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 94,
    "pending": 14,
    "totalCount": 108
  },
  {
    "id": 3,
    "batchNo": "DM03",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-03-01",
    "endDate": "2024-08-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 76,
    "pending": 18,
    "totalCount": 94
  },
  {
    "id": 4,
    "batchNo": "DM04",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-04-01",
    "endDate": "2024-09-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 88,
    "pending": 36,
    "totalCount": 124
  },
  {
    "id": 5,
    "batchNo": "DM05",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-05-01",
    "endDate": "2024-10-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 85,
    "pending": 28,
    "totalCount": 113
  }
];

export const devopsInitial = [
  {
    "id": 1,
    "batchNo": "DO01",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-01-01",
    "endDate": "2024-06-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 34,
    "pending": 47,
    "totalCount": 81
  },
  {
    "id": 2,
    "batchNo": "DO02",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-02-01",
    "endDate": "2024-07-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 35,
    "pending": 39,
    "totalCount": 74
  },
  {
    "id": 3,
    "batchNo": "DO03",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-03-01",
    "endDate": "2024-08-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 33,
    "pending": 39,
    "totalCount": 72
  },
  {
    "id": 4,
    "batchNo": "DO04",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-04-01",
    "endDate": "2024-09-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 100,
    "pending": 46,
    "totalCount": 146
  },
  {
    "id": 5,
    "batchNo": "DO05",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-05-01",
    "endDate": "2024-10-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 43,
    "pending": 14,
    "totalCount": 57
  }
];

export const sapInitial = [
  {
    "id": 1,
    "batchNo": "SAP01",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-01-01",
    "endDate": "2024-06-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 79,
    "pending": 18,
    "totalCount": 97
  },
  {
    "id": 2,
    "batchNo": "SAP02",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-02-01",
    "endDate": "2024-07-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 34,
    "pending": 31,
    "totalCount": 65
  },
  {
    "id": 3,
    "batchNo": "SAP03",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-03-01",
    "endDate": "2024-08-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 64,
    "pending": 35,
    "totalCount": 99
  },
  {
    "id": 4,
    "batchNo": "SAP04",
    "mode": "Offline",
    "status": "Completed",
    "startDate": "2024-04-01",
    "endDate": "2024-09-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "FN",
    "studentsPlaced": 53,
    "pending": 14,
    "totalCount": 67
  },
  {
    "id": 5,
    "batchNo": "SAP05",
    "mode": "Online",
    "status": "Completed",
    "startDate": "2024-05-01",
    "endDate": "2024-10-28",
    "sections": {
      "Domain": {
        "startDate": "2024-01-01",
        "endDate": "2024-03-01"
      },
      "Aptitude": {
        "startDate": "2024-03-02",
        "endDate": "2024-05-01"
      },
      "Communication": {
        "startDate": "2024-05-02",
        "endDate": "2024-06-30"
      }
    },
    "session": "AN",
    "studentsPlaced": 40,
    "pending": 42,
    "totalCount": 82
  }
];

// student data 
export const fullstackStudentData  = [
  {
    sno: 1,
    name: "Ravi Kumar",
    email: "ravi01@gmail.com",
    bookingId: "FS01-001",
    epicStatus: "Excellent",
    placement: "Placed",
    batch: "FS01"
  },
  {
    sno: 2,
    name: "Meena R",
    email: "meena02@gmail.com",
    bookingId: "FS01-002",
    epicStatus: "Proficient",
    placement: "Yet to Place",
    batch: "FS01"
  },
  {
    sno: 3,
    name: "Arun V",
    email: "arun03@gmail.com",
    bookingId: "FS01-003",
    epicStatus: "Ideal",
    placement: "Not Placed",
    batch: "FS01"
  },
  {
    sno: 4,
    name: "Divya S",
    email: "divya04@gmail.com",
    bookingId: "FS01-004",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "FS01"
  },
  {
    sno: 5,
    name: "Karan M",
    email: "karan05@gmail.com",
    bookingId: "FS01-005",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "FS01"
  },

  // FS02
  {
    sno: 1,
    name: "Sundar P",
    email: "sundar01@gmail.com",
    bookingId: "FS02-001",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "FS02"
  },
  {
    sno: 2,
    name: "Geetha T",
    email: "geetha02@gmail.com",
    bookingId: "FS02-002",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS02"
  },
  {
    sno: 3,
    name: "Hari K",
    email: "hari03@gmail.com",
    bookingId: "FS02-003",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "FS02"
  },
  {
    sno: 4,
    name: "Aishwarya N",
    email: "aishu04@gmail.com",
    bookingId: "FS02-004",
    epicStatus: "Ideal",
    placement: "Not Required",
    batch: "FS02"
  },
  {
    sno: 5,
    name: "Vignesh R",
    email: "vignesh05@gmail.com",
    bookingId: "FS02-005",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "FS02"
  },

  // FS03
  {
    sno: 1,
    name: "Lakshmi B",
    email: "lakshmi01@gmail.com",
    bookingId: "FS03-001",
    epicStatus: "Ideal",
    placement: "Placed",
    batch: "FS03"
  },
  {
    sno: 2,
    name: "Naveen M",
    email: "naveen02@gmail.com",
    bookingId: "FS03-002",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "FS03"
  },
  {
    sno: 3,
    name: "Pranav K",
    email: "pranav03@gmail.com",
    bookingId: "FS03-003",
    epicStatus: "Capable",
    placement: "Yet to Place",
    batch: "FS03"
  },
  {
    sno: 4,
    name: "Sahana D",
    email: "sahana04@gmail.com",
    bookingId: "FS03-004",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS03"
  },
  {
    sno: 5,
    name: "Kavya R",
    email: "kavya05@gmail.com",
    bookingId: "FS03-005",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "FS03"
  },

  // FS04
  {
    sno: 1,
    name: "Surya V",
    email: "surya01@gmail.com",
    bookingId: "FS04-001",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS04"
  },
  {
    sno: 2,
    name: "Radha M",
    email: "radha02@gmail.com",
    bookingId: "FS04-002",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "FS04"
  },
  {
    sno: 3,
    name: "Tarun B",
    email: "tarun03@gmail.com",
    bookingId: "FS04-003",
    epicStatus: "Capable",
    placement: "Placed",
    batch: "FS04"
  },
  {
    sno: 4,
    name: "Deepa S",
    email: "deepa04@gmail.com",
    bookingId: "FS04-004",
    epicStatus: "Excellent",
    placement: "Not Placed",
    batch: "FS04"
  },
  {
    sno: 5,
    name: "Yash A",
    email: "yash05@gmail.com",
    bookingId: "FS04-005",
    epicStatus: "Capable",
    placement: "Not Required",
    batch: "FS04"
  },

  // FS05
  {
    sno: 1,
    name: "Bhavya N",
    email: "bhavya01@gmail.com",
    bookingId: "FS05-001",
    epicStatus: "Ideal",
    placement: "Yet to Place",
    batch: "FS05"
  },
  {
    sno: 2,
    name: "Ganesh T",
    email: "ganesh02@gmail.com",
    bookingId: "FS05-002",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS05"
  },
  {
    sno: 3,
    name: "Sneha P",
    email: "sneha03@gmail.com",
    bookingId: "FS05-003",
    epicStatus: "Excellent",
    placement: "Not Required",
    batch: "FS05"
  },
  {
    sno: 4,
    name: "Karthik S",
    email: "karthik04@gmail.com",
    bookingId: "FS05-004",
    epicStatus: "Capable",
    placement: "Not Placed",
    batch: "FS05"
  },
  {
    sno: 5,
    name: "Ishita R",
    email: "ishita05@gmail.com",
    bookingId: "FS05-005",
    epicStatus: "Proficient",
    placement: "Placed",
    batch: "FS05"
  }
];

export const dataAnalyticsStudentData = [
  // DA01
  { sno: 1, name: "Anjali R", email: "anjali01@gmail.com", bookingId: "DA01-001", epicStatus: "Capable", placement: "Placed", batch: "DA01" },
  { sno: 2, name: "Rohit K", email: "rohit02@gmail.com", bookingId: "DA01-002", epicStatus: "Excellent", placement: "Yet to Place", batch: "DA01" },
  { sno: 3, name: "Preethi M", email: "preethi03@gmail.com", bookingId: "DA01-003", epicStatus: "Proficient", placement: "Not Placed", batch: "DA01" },
  { sno: 4, name: "Varun S", email: "varun04@gmail.com", bookingId: "DA01-004", epicStatus: "Ideal", placement: "Placed", batch: "DA01" },
  { sno: 5, name: "Lavanya T", email: "lavanya05@gmail.com", bookingId: "DA01-005", epicStatus: "Excellent", placement: "Not Required", batch: "DA01" },

  // DA02
  { sno: 1, name: "Siddharth B", email: "sid01@gmail.com", bookingId: "DA02-001", epicStatus: "Ideal", placement: "Not Placed", batch: "DA02" },
  { sno: 2, name: "Deepika L", email: "deepika02@gmail.com", bookingId: "DA02-002", epicStatus: "Capable", placement: "Yet to Place", batch: "DA02" },
  { sno: 3, name: "Arvind J", email: "arvind03@gmail.com", bookingId: "DA02-003", epicStatus: "Excellent", placement: "Placed", batch: "DA02" },
  { sno: 4, name: "Ramya V", email: "ramya04@gmail.com", bookingId: "DA02-004", epicStatus: "Proficient", placement: "Not Required", batch: "DA02" },
  { sno: 5, name: "Kiran N", email: "kiran05@gmail.com", bookingId: "DA02-005", epicStatus: "Proficient", placement: "Placed", batch: "DA02" },

  // DA03
  { sno: 1, name: "Vinoth S", email: "vinoth01@gmail.com", bookingId: "DA03-001", epicStatus: "Ideal", placement: "Yet to Place", batch: "DA03" },
  { sno: 2, name: "Sneha L", email: "sneha02@gmail.com", bookingId: "DA03-002", epicStatus: "Excellent", placement: "Not Placed", batch: "DA03" },
  { sno: 3, name: "Harish P", email: "harish03@gmail.com", bookingId: "DA03-003", epicStatus: "Capable", placement: "Placed", batch: "DA03" },
  { sno: 4, name: "Meera G", email: "meera04@gmail.com", bookingId: "DA03-004", epicStatus: "Proficient", placement: "Not Required", batch: "DA03" },
  { sno: 5, name: "Dinesh K", email: "dinesh05@gmail.com", bookingId: "DA03-005", epicStatus: "Capable", placement: "Placed", batch: "DA03" },

  // DA04
  { sno: 1, name: "Aarthi S", email: "aarthi01@gmail.com", bookingId: "DA04-001", epicStatus: "Excellent", placement: "Placed", batch: "DA04" },
  { sno: 2, name: "Rajeev N", email: "rajeev02@gmail.com", bookingId: "DA04-002", epicStatus: "Capable", placement: "Yet to Place", batch: "DA04" },
  { sno: 3, name: "Vidya T", email: "vidya03@gmail.com", bookingId: "DA04-003", epicStatus: "Proficient", placement: "Not Placed", batch: "DA04" },
  { sno: 4, name: "Nithin B", email: "nithin04@gmail.com", bookingId: "DA04-004", epicStatus: "Ideal", placement: "Not Required", batch: "DA04" },
  { sno: 5, name: "Pooja M", email: "pooja05@gmail.com", bookingId: "DA04-005", epicStatus: "Excellent", placement: "Placed", batch: "DA04" },

  // DA05
  { sno: 1, name: "Suresh R", email: "suresh01@gmail.com", bookingId: "DA05-001", epicStatus: "Capable", placement: "Not Required", batch: "DA05" },
  { sno: 2, name: "Bhavani K", email: "bhavani02@gmail.com", bookingId: "DA05-002", epicStatus: "Ideal", placement: "Placed", batch: "DA05" },
  { sno: 3, name: "Lokesh M", email: "lokesh03@gmail.com", bookingId: "DA05-003", epicStatus: "Excellent", placement: "Yet to Place", batch: "DA05" },
  { sno: 4, name: "Gayathri L", email: "gayathri04@gmail.com", bookingId: "DA05-004", epicStatus: "Proficient", placement: "Not Placed", batch: "DA05" },
  { sno: 5, name: "Manoj S", email: "manoj05@gmail.com", bookingId: "DA05-005", epicStatus: "Excellent", placement: "Placed", batch: "DA05" }
];

export const bankingStudentData = [
  // BK01
  { sno: 1, name: "Amit P", email: "amit01@gmail.com", bookingId: "BK01-001", epicStatus: "Ideal", placement: "Placed", batch: "BK01" },
  { sno: 2, name: "Nisha R", email: "nisha02@gmail.com", bookingId: "BK01-002", epicStatus: "Proficient", placement: "Yet to Place", batch: "BK01" },
  { sno: 3, name: "Karthik G", email: "karthik03@gmail.com", bookingId: "BK01-003", epicStatus: "Excellent", placement: "Not Placed", batch: "BK01" },
  { sno: 4, name: "Rekha S", email: "rekha04@gmail.com", bookingId: "BK01-004", epicStatus: "Capable", placement: "Not Required", batch: "BK01" },
  { sno: 5, name: "Rakesh T", email: "rakesh05@gmail.com", bookingId: "BK01-005", epicStatus: "Excellent", placement: "Placed", batch: "BK01" },

  // BK02
  { sno: 1, name: "Divya V", email: "divya01@gmail.com", bookingId: "BK02-001", epicStatus: "Capable", placement: "Yet to Place", batch: "BK02" },
  { sno: 2, name: "Sathish R", email: "sathish02@gmail.com", bookingId: "BK02-002", epicStatus: "Proficient", placement: "Placed", batch: "BK02" },
  { sno: 3, name: "Neha K", email: "neha03@gmail.com", bookingId: "BK02-003", epicStatus: "Excellent", placement: "Not Placed", batch: "BK02" },
  { sno: 4, name: "Mahesh J", email: "mahesh04@gmail.com", bookingId: "BK02-004", epicStatus: "Ideal", placement: "Placed", batch: "BK02" },
  { sno: 5, name: "Tina L", email: "tina05@gmail.com", bookingId: "BK02-005", epicStatus: "Capable", placement: "Not Required", batch: "BK02" },

  // BK03
  { sno: 1, name: "Ajay S", email: "ajay01@gmail.com", bookingId: "BK03-001", epicStatus: "Proficient", placement: "Placed", batch: "BK03" },
  { sno: 2, name: "Sneha T", email: "snehat02@gmail.com", bookingId: "BK03-002", epicStatus: "Capable", placement: "Yet to Place", batch: "BK03" },
  { sno: 3, name: "Harini V", email: "harini03@gmail.com", bookingId: "BK03-003", epicStatus: "Excellent", placement: "Not Required", batch: "BK03" },
  { sno: 4, name: "Naveen D", email: "naveen04@gmail.com", bookingId: "BK03-004", epicStatus: "Ideal", placement: "Not Placed", batch: "BK03" },
  { sno: 5, name: "Bhuvana S", email: "bhuvana05@gmail.com", bookingId: "BK03-005", epicStatus: "Proficient", placement: "Placed", batch: "BK03" },

  // BK04
  { sno: 1, name: "Megha N", email: "megha01@gmail.com", bookingId: "BK04-001", epicStatus: "Capable", placement: "Not Placed", batch: "BK04" },
  { sno: 2, name: "Vikas K", email: "vikas02@gmail.com", bookingId: "BK04-002", epicStatus: "Ideal", placement: "Placed", batch: "BK04" },
  { sno: 3, name: "Anitha R", email: "anitha03@gmail.com", bookingId: "BK04-003", epicStatus: "Proficient", placement: "Not Required", batch: "BK04" },
  { sno: 4, name: "Rahul S", email: "rahul04@gmail.com", bookingId: "BK04-004", epicStatus: "Excellent", placement: "Yet to Place", batch: "BK04" },
  { sno: 5, name: "Krishna P", email: "krishna05@gmail.com", bookingId: "BK04-005", epicStatus: "Capable", placement: "Placed", batch: "BK04" },

  // BK05
  { sno: 1, name: "Shruti G", email: "shruti01@gmail.com", bookingId: "BK05-001", epicStatus: "Ideal", placement: "Yet to Place", batch: "BK05" },
  { sno: 2, name: "Dinesh A", email: "dinesh02@gmail.com", bookingId: "BK05-002", epicStatus: "Excellent", placement: "Placed", batch: "BK05" },
  { sno: 3, name: "Kavitha R", email: "kavitha03@gmail.com", bookingId: "BK05-003", epicStatus: "Proficient", placement: "Not Required", batch: "BK05" },
  { sno: 4, name: "Rajan V", email: "rajan04@gmail.com", bookingId: "BK05-004", epicStatus: "Capable", placement: "Not Placed", batch: "BK05" },
  { sno: 5, name: "Anu J", email: "anu05@gmail.com", bookingId: "BK05-005", epicStatus: "Excellent", placement: "Placed", batch: "BK05" }
];

export const marketingStudentData = [
  // MK01
  { sno: 1, name: "Rahul M", email: "rahul01@gmail.com", bookingId: "MK01-001", epicStatus: "Excellent", placement: "Placed", batch: "MK01" },
  { sno: 2, name: "Meera D", email: "meera02@gmail.com", bookingId: "MK01-002", epicStatus: "Capable", placement: "Not Required", batch: "MK01" },
  { sno: 3, name: "Gokul N", email: "gokul03@gmail.com", bookingId: "MK01-003", epicStatus: "Ideal", placement: "Yet to Place", batch: "MK01" },
  { sno: 4, name: "Lavanya M", email: "lavanya04@gmail.com", bookingId: "MK01-004", epicStatus: "Proficient", placement: "Placed", batch: "MK01" },
  { sno: 5, name: "Jayanth P", email: "jayanth05@gmail.com", bookingId: "MK01-005", epicStatus: "Capable", placement: "Not Placed", batch: "MK01" },

  // MK02
  { sno: 1, name: "Snehal R", email: "snehal01@gmail.com", bookingId: "MK02-001", epicStatus: "Ideal", placement: "Not Required", batch: "MK02" },
  { sno: 2, name: "Aditya S", email: "aditya02@gmail.com", bookingId: "MK02-002", epicStatus: "Excellent", placement: "Placed", batch: "MK02" },
  { sno: 3, name: "Priya V", email: "priya03@gmail.com", bookingId: "MK02-003", epicStatus: "Proficient", placement: "Yet to Place", batch: "MK02" },
  { sno: 4, name: "Saran K", email: "saran04@gmail.com", bookingId: "MK02-004", epicStatus: "Capable", placement: "Not Placed", batch: "MK02" },
  { sno: 5, name: "Keerthi L", email: "keerthi05@gmail.com", bookingId: "MK02-005", epicStatus: "Excellent", placement: "Placed", batch: "MK02" },

  // MK03
  { sno: 1, name: "Yogesh B", email: "yogesh01@gmail.com", bookingId: "MK03-001", epicStatus: "Capable", placement: "Not Placed", batch: "MK03" },
  { sno: 2, name: "Revathi T", email: "revathi02@gmail.com", bookingId: "MK03-002", epicStatus: "Ideal", placement: "Yet to Place", batch: "MK03" },
  { sno: 3, name: "Ritika A", email: "ritika03@gmail.com", bookingId: "MK03-003", epicStatus: "Proficient", placement: "Placed", batch: "MK03" },
  { sno: 4, name: "Manoj K", email: "manoj04@gmail.com", bookingId: "MK03-004", epicStatus: "Excellent", placement: "Not Required", batch: "MK03" },
  { sno: 5, name: "Sharanya S", email: "sharanya05@gmail.com", bookingId: "MK03-005", epicStatus: "Capable", placement: "Placed", batch: "MK03" },

  // MK04
  { sno: 1, name: "Ashwin R", email: "ashwin01@gmail.com", bookingId: "MK04-001", epicStatus: "Proficient", placement: "Not Required", batch: "MK04" },
  { sno: 2, name: "Pavithra D", email: "pavithra02@gmail.com", bookingId: "MK04-002", epicStatus: "Excellent", placement: "Placed", batch: "MK04" },
  { sno: 3, name: "Siddhi T", email: "siddhi03@gmail.com", bookingId: "MK04-003", epicStatus: "Ideal", placement: "Yet to Place", batch: "MK04" },
  { sno: 4, name: "Bala K", email: "bala04@gmail.com", bookingId: "MK04-004", epicStatus: "Capable", placement: "Not Placed", batch: "MK04" },
  { sno: 5, name: "Hema L", email: "hema05@gmail.com", bookingId: "MK04-005", epicStatus: "Proficient", placement: "Placed", batch: "MK04" },

  // MK05
  { sno: 1, name: "Sowmya N", email: "sowmya01@gmail.com", bookingId: "MK05-001", epicStatus: "Capable", placement: "Placed", batch: "MK05" },
  { sno: 2, name: "Jithin B", email: "jithin02@gmail.com", bookingId: "MK05-002", epicStatus: "Excellent", placement: "Not Placed", batch: "MK05" },
  { sno: 3, name: "Irfan H", email: "irfan03@gmail.com", bookingId: "MK05-003", epicStatus: "Ideal", placement: "Yet to Place", batch: "MK05" },
  { sno: 4, name: "Vidya S", email: "vidya04@gmail.com", bookingId: "MK05-004", epicStatus: "Proficient", placement: "Placed", batch: "MK05" },
  { sno: 5, name: "Siddarth M", email: "siddarth05@gmail.com", bookingId: "MK05-005", epicStatus: "Capable", placement: "Not Required", batch: "MK05" }
];

export const sapStudentData = [
  // SAP01
  { sno: 1, name: "Ritika N", email: "ritika01@gmail.com", bookingId: "SAP01-001", epicStatus: "Capable", placement: "Placed", batch: "SAP01" },
  { sno: 2, name: "Abhishek R", email: "abhishek02@gmail.com", bookingId: "SAP01-002", epicStatus: "Excellent", placement: "Yet to Place", batch: "SAP01" },
  { sno: 3, name: "Trisha D", email: "trisha03@gmail.com", bookingId: "SAP01-003", epicStatus: "Ideal", placement: "Not Placed", batch: "SAP01" },
  { sno: 4, name: "Kiran S", email: "kiran04@gmail.com", bookingId: "SAP01-004", epicStatus: "Proficient", placement: "Not Required", batch: "SAP01" },
  { sno: 5, name: "Snehal R", email: "snehal05@gmail.com", bookingId: "SAP01-005", epicStatus: "Capable", placement: "Placed", batch: "SAP01" },

  // SAP02
  { sno: 1, name: "Nandhini B", email: "nandhini01@gmail.com", bookingId: "SAP02-001", epicStatus: "Excellent", placement: "Placed", batch: "SAP02" },
  { sno: 2, name: "Akhil K", email: "akhil02@gmail.com", bookingId: "SAP02-002", epicStatus: "Ideal", placement: "Yet to Place", batch: "SAP02" },
  { sno: 3, name: "Geetha M", email: "geetha03@gmail.com", bookingId: "SAP02-003", epicStatus: "Capable", placement: "Not Placed", batch: "SAP02" },
  { sno: 4, name: "Rohit V", email: "rohit04@gmail.com", bookingId: "SAP02-004", epicStatus: "Proficient", placement: "Placed", batch: "SAP02" },
  { sno: 5, name: "Vidya R", email: "vidya05@gmail.com", bookingId: "SAP02-005", epicStatus: "Excellent", placement: "Not Required", batch: "SAP02" },

  // SAP03
  { sno: 1, name: "Kavitha S", email: "kavitha01@gmail.com", bookingId: "SAP03-001", epicStatus: "Proficient", placement: "Placed", batch: "SAP03" },
  { sno: 2, name: "Arjun T", email: "arjun02@gmail.com", bookingId: "SAP03-002", epicStatus: "Capable", placement: "Not Required", batch: "SAP03" },
  { sno: 3, name: "Bhavana D", email: "bhavana03@gmail.com", bookingId: "SAP03-003", epicStatus: "Ideal", placement: "Not Placed", batch: "SAP03" },
  { sno: 4, name: "Mani K", email: "mani04@gmail.com", bookingId: "SAP03-004", epicStatus: "Excellent", placement: "Yet to Place", batch: "SAP03" },
  { sno: 5, name: "Lavanya G", email: "lavanya05@gmail.com", bookingId: "SAP03-005", epicStatus: "Capable", placement: "Placed", batch: "SAP03" },

  // SAP04
  { sno: 1, name: "Rajesh R", email: "rajesh01@gmail.com", bookingId: "SAP04-001", epicStatus: "Excellent", placement: "Placed", batch: "SAP04" },
  { sno: 2, name: "Meena S", email: "meena02@gmail.com", bookingId: "SAP04-002", epicStatus: "Capable", placement: "Yet to Place", batch: "SAP04" },
  { sno: 3, name: "Yuvraj D", email: "yuvraj03@gmail.com", bookingId: "SAP04-003", epicStatus: "Proficient", placement: "Not Placed", batch: "SAP04" },
  { sno: 4, name: "Shruti L", email: "shruti04@gmail.com", bookingId: "SAP04-004", epicStatus: "Ideal", placement: "Not Required", batch: "SAP04" },
  { sno: 5, name: "Ganesh V", email: "ganesh05@gmail.com", bookingId: "SAP04-005", epicStatus: "Capable", placement: "Placed", batch: "SAP04" },

  // SAP05
  { sno: 1, name: "Divakar K", email: "divakar01@gmail.com", bookingId: "SAP05-001", epicStatus: "Ideal", placement: "Yet to Place", batch: "SAP05" },
  { sno: 2, name: "Revathi P", email: "revathi02@gmail.com", bookingId: "SAP05-002", epicStatus: "Excellent", placement: "Placed", batch: "SAP05" },
  { sno: 3, name: "Sathya N", email: "sathya03@gmail.com", bookingId: "SAP05-003", epicStatus: "Capable", placement: "Not Required", batch: "SAP05" },
  { sno: 4, name: "Preethi J", email: "preethi04@gmail.com", bookingId: "SAP05-004", epicStatus: "Proficient", placement: "Not Placed", batch: "SAP05" },
  { sno: 5, name: "Sanjay M", email: "sanjay05@gmail.com", bookingId: "SAP05-005", epicStatus: "Excellent", placement: "Placed", batch: "SAP05" }
];


export const devopsStudentData = [
  // DV01
  { sno: 1, name: "Vikram R", email: "vikram01@gmail.com", bookingId: "DV01-001", epicStatus: "Excellent", placement: "Placed", batch: "DV01" },
  { sno: 2, name: "Aishwarya M", email: "aishu02@gmail.com", bookingId: "DV01-002", epicStatus: "Proficient", placement: "Yet to Place", batch: "DV01" },
  { sno: 3, name: "Mohan S", email: "mohan03@gmail.com", bookingId: "DV01-003", epicStatus: "Capable", placement: "Not Placed", batch: "DV01" },
  { sno: 4, name: "Radha T", email: "radha04@gmail.com", bookingId: "DV01-004", epicStatus: "Ideal", placement: "Not Required", batch: "DV01" },
  { sno: 5, name: "Nirmal B", email: "nirmal05@gmail.com", bookingId: "DV01-005", epicStatus: "Excellent", placement: "Placed", batch: "DV01" },

  // DV02
  { sno: 1, name: "Sangeetha D", email: "sangeetha01@gmail.com", bookingId: "DV02-001", epicStatus: "Capable", placement: "Not Placed", batch: "DV02" },
  { sno: 2, name: "Rajan M", email: "rajan02@gmail.com", bookingId: "DV02-002", epicStatus: "Proficient", placement: "Yet to Place", batch: "DV02" },
  { sno: 3, name: "Keerthana K", email: "keerthi03@gmail.com", bookingId: "DV02-003", epicStatus: "Ideal", placement: "Not Required", batch: "DV02" },
  { sno: 4, name: "Arun R", email: "arun04@gmail.com", bookingId: "DV02-004", epicStatus: "Excellent", placement: "Placed", batch: "DV02" },
  { sno: 5, name: "Divya S", email: "divya05@gmail.com", bookingId: "DV02-005", epicStatus: "Capable", placement: "Placed", batch: "DV02" },

  // DV03
  { sno: 1, name: "Bhaskar V", email: "bhaskar01@gmail.com", bookingId: "DV03-001", epicStatus: "Ideal", placement: "Yet to Place", batch: "DV03" },
  { sno: 2, name: "Harsha M", email: "harsha02@gmail.com", bookingId: "DV03-002", epicStatus: "Proficient", placement: "Placed", batch: "DV03" },
  { sno: 3, name: "Lalitha D", email: "lalitha03@gmail.com", bookingId: "DV03-003", epicStatus: "Excellent", placement: "Not Required", batch: "DV03" },
  { sno: 4, name: "Deepak R", email: "deepak04@gmail.com", bookingId: "DV03-004", epicStatus: "Capable", placement: "Not Placed", batch: "DV03" },
  { sno: 5, name: "Meenakshi S", email: "meenakshi05@gmail.com", bookingId: "DV03-005", epicStatus: "Proficient", placement: "Placed", batch: "DV03" },

  // DV04
  { sno: 1, name: "Santosh N", email: "santosh01@gmail.com", bookingId: "DV04-001", epicStatus: "Excellent", placement: "Not Placed", batch: "DV04" },
  { sno: 2, name: "Indu A", email: "indu02@gmail.com", bookingId: "DV04-002", epicStatus: "Ideal", placement: "Yet to Place", batch: "DV04" },
  { sno: 3, name: "Kiran V", email: "kiran03@gmail.com", bookingId: "DV04-003", epicStatus: "Capable", placement: "Not Required", batch: "DV04" },
  { sno: 4, name: "Praveen L", email: "praveen04@gmail.com", bookingId: "DV04-004", epicStatus: "Proficient", placement: "Placed", batch: "DV04" },
  { sno: 5, name: "Sowmiya P", email: "sowmiya05@gmail.com", bookingId: "DV04-005", epicStatus: "Capable", placement: "Placed", batch: "DV04" },

  // DV05
  { sno: 1, name: "Pavan T", email: "pavan01@gmail.com", bookingId: "DV05-001", epicStatus: "Excellent", placement: "Placed", batch: "DV05" },
  { sno: 2, name: "Reshma R", email: "reshma02@gmail.com", bookingId: "DV05-002", epicStatus: "Ideal", placement: "Yet to Place", batch: "DV05" },
  { sno: 3, name: "Sundar M", email: "sundar03@gmail.com", bookingId: "DV05-003", epicStatus: "Capable", placement: "Not Placed", batch: "DV05" },
  { sno: 4, name: "Aarthi G", email: "aarthi04@gmail.com", bookingId: "DV05-004", epicStatus: "Proficient", placement: "Not Required", batch: "DV05" },
  { sno: 5, name: "Manikandan V", email: "manikandan05@gmail.com", bookingId: "DV05-005", epicStatus: "Excellent", placement: "Placed", batch: "DV05" }
];





// ➤ Provider Component
const DataProvider = ({ children }) => {
  const [batchingvalue, setBatchingValue] = useState(""); // selected domain
  const [studentBatchSelect , setStudentBatchSelect] = useState("") //Select student Domain
  const [batchesNames , setBatchesNames] = useState([]); // name of batches in current domain
  const [ studentData , setStudentData] = useState([]); // student data for current domain
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

  // ➤ Domain-wise individual student data
  const [ fullstackStudent , setFullstackStudent ] = useState(fullstackStudentData);
  const [ dataanalyticsStudent , setDataanalyticsStudent ] = useState(dataAnalyticsStudentData);
  const [ bankingStudent , setBankingStudent ] = useState(bankingStudentData);
  const [ marketingStudent , setMarketingStudent ] = useState(marketingStudentData);
  const [ sapStudent , setSapStudent ] = useState(sapStudentData);
  const [ devopsStudent , setDevopsStudent ] = useState(devopsStudentData);


  const userName =  loginUser.split("@")[0];
  const firstLetterUser = loginUser?.charAt(0).toUpperCase() || "";

  // Update batchData and batchHead when batchingvalue changes
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

    // 🔄 Update studentData and studentHead when batchingvalue changes
useEffect(() => {
    switch (studentBatchSelect) {
      case "fullstack":
        setBatchHead("Full Stack Development");
        setBatchesNames(fullstackData.map(batch => batch.batchNo));
        setStudentData(fullstackStudent);
        break;
      case "dataanalytics":
        setBatchHead("Data Analytics & Science");
        setBatchesNames(dataanalyticsData.map(batch => batch.batchNo));
        setStudentData(dataanalyticsStudent);
        break;
      case "banking":
        setBatchHead("Banking & Financial Services");
        setBatchesNames(bankingData.map(batch => batch.batchNo));
        setStudentData(bankingStudent);
        break;
      case "marketing":
        setBatchHead("Digital Marketing");
        setBatchesNames(marketingData.map(batch => batch.batchNo));
        setStudentData(marketingStudent);
        break;
      case "sap":
        setBatchHead("SAP");
        setBatchesNames(sapData.map(batch => batch.batchNo));
        setStudentData(sapStudent);
        break;
      case "devops":
        setBatchHead("DevOps");
        setBatchesNames(devopsData.map(batch => batch.batchNo));
        setStudentData(devopsStudent);
        break;
      default:
        setBatchHead("");
        setBatchesNames([]);
        setStudentData([]);
    }
  },[studentBatchSelect , fullstackStudent  , dataanalyticsStudent , bankingStudent , marketingStudent , sapStudent , devopsStudent]);

  // Update studentData and batchesNames when studentBatchSelect changes
  useEffect(() => {
    switch (studentBatchSelect) {
      case "fullstack":
        setBatchHead("Full Stack Development");
        setBatchesNames(fullstackStudent.map(batch => batch.batch));
        setStudentData(fullstackStudent);
        break;
      case "dataanalytics":
        setBatchHead("Data Analytics & Science");
        setBatchesNames(dataanalyticsStudent.map(batch => batch.batch));
        setStudentData(dataanalyticsStudent);
        break;
      case "banking":
        setBatchHead("Banking & Financial Services");
        setBatchesNames(bankingStudent.map(batch => batch.batch));
        setStudentData(bankingStudent);
        break;
      case "marketing":
        setBatchHead("Digital Marketing");
        setBatchesNames(marketingStudent.map(batch => batch.batch));
        setStudentData(marketingStudent);
        break;
      case "sap":
        setBatchHead("SAP");
        setBatchesNames(sapStudent.map(batch => batch.batch));
        setStudentData(sapStudent);
        break;
      case "devops":
        setBatchHead("DevOps");
        setBatchesNames(devopsStudent.map(batch => batch.batch));
        setStudentData(devopsStudent);
        break;
      default:
        setBatchHead("");
        setBatchesNames([]);
        setStudentData([]);
    }
  }, [studentBatchSelect, fullstackStudent, dataanalyticsStudent, bankingStudent, marketingStudent, sapStudent, devopsStudent]);


 const deleteStudent = (bookingId) => {
  const removeFromList = (list) => list.filter((item) => item.bookingId !== bookingId);

  let updatedList = [];

  switch (batchingvalue) {
    case "fullstack":
      updatedList = removeFromList(fullstackStudent);
      setFullstackStudent(updatedList);
      break;
    case "dataanalytics":
      updatedList = removeFromList(dataanalyticsStudent);
      setDataanalyticsStudent(updatedList);
      break;
    case "banking":
      updatedList = removeFromList(bankingStudent);
      setBankingStudent(updatedList);
      break;
    case "marketing":
      updatedList = removeFromList(marketingStudent);
      setMarketingStudent(updatedList);
      break;
    case "sap":
      updatedList = removeFromList(sapStudent);
      setSapStudent(updatedList);
      break;
    case "devops":
      updatedList = removeFromList(devopsStudent);
      setDevopsStudent(updatedList);
      break;
    default:
      return;
  }

  // This is the key fix: update the global studentData too
  setStudentData(updatedList);
};


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

// Update an existing student by bookingId in current domain
 const updateStudent = (bookingId, updatedFields) => {
    const updateList = (list) =>
      list.map((item) => (item.bookingId === bookingId ? { ...item, ...updatedFields } : item));

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


  const [selectedBatch, setSelectedBatch] = useState(null);

  const getStatsByBatch = (batchKey) => batchStatsData[batchKey];

  return (
    <DataContext.Provider
      value={{ batchingvalue,setBatchingValue,setStudentBatchSelect,loginUser,setLoginUser,firstLetterUser,batchHead,batchData,addBatch,updateBatch,deleteBatch ,userName , selectedBatch,setSelectedBatch,getStatsByBatch,batchStatsData,batchesNames,studentData,deleteStudent,updateStudent
      }}
    >  
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
