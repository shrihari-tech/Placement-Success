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



// ➤ Provider Component
const DataProvider = ({ children }) => {
  const [batchingvalue, setBatchingValue] = useState(""); // selected domain
  const [studentBatchSelect , setStudentBatchSelect] = useState("") //Select student Domain
  const [loginUser, setLoginUser] = useState(""); // logged-in user
  const [batchesNames , setBatchesNames] = useState([]); // name of batches in current domain
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
        break;
      case "dataanalytics":
        setBatchHead("Data Analytics & Science");
        setBatchesNames(dataanalyticsData.map(batch => batch.batchNo));
        break;
      case "banking":
        setBatchHead("Banking & Financial Services");
        setBatchesNames(bankingData.map(batch => batch.batchNo));
        break;
      case "marketing":
        setBatchHead("Digital Marketing");
        setBatchesNames(marketingData.map(batch => batch.batchNo));
        break;
      case "sap":
        setBatchHead("SAP");
        setBatchesNames(sapData.map(batch => batch.batchNo));
        break;
      case "devops":
        setBatchHead("DevOps");
        setBatchesNames(devopsData.map(batch => batch.batchNo));
        break;
      default:
        setBatchHead("");
        setBatchesNames([]);
    }
  },[studentBatchSelect]);

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


  const [selectedBatch, setSelectedBatch] = useState(null);

  const getStatsByBatch = (batchKey) => batchStatsData[batchKey];

  return (
    <DataContext.Provider
      value={{ batchingvalue,setBatchingValue,setStudentBatchSelect,loginUser,setLoginUser,firstLetterUser,batchHead,batchData,addBatch,updateBatch,deleteBatch ,userName , selectedBatch,setSelectedBatch,getStatsByBatch,batchStatsData,batchesNames
      }}
    >  
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
