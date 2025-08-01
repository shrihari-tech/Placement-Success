"use client";
import { useEffect, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri"; 
import Image from "next/image";
import { useDataContext } from "../context/dataContext";


const ViewStudentModal = ({ isOpen, onClose, selectedStudent }) => {
  const [infoTab, setInfoTab] = useState("Domain");
  const [sectionData, setSectionData] = useState({});

  const { batchData } = useDataContext();

    const toDDMMYYYY = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // e.g., Jul
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseDate = (str) => {
    if (!str) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
    if (/^\d{2}-\d{2}-\d{4}$/.test(str)) {
      const [dd, mm, yyyy] = str.split("-");
      return new Date(`${yyyy}-${mm}-${dd}`);
    }
    return new Date(str);
  };

  const formatDate = (str) => (str ? toDDMMYYYY(parseDate(str)) : "");

useEffect(() => {
  if(batchData && selectedStudent) {
    const batchInfo = batchData.find(b => b.batchNo.trim() === selectedStudent.batch.trim());
    if (batchInfo) {
      setSectionData(batchInfo.sections);
    }
  }
},[selectedStudent.batch])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  
  }, [isOpen]);

  if (!isOpen || !selectedStudent) return null;

  const getDomainNameFromBatch = (batchNo) => {
    if (!batchNo) return "N/A";

    const prefix = batchNo.substring(0, 2).toUpperCase();

    switch (prefix) {
      case "FS":
        return "Full Stack Development";
      case "DA":
        return "Data Analytics & Science";
      case "BK":
        return "Banking & Financial Services";
      case "MK":
        return "Digital Marketing";
      case "DV":
        return "DevOps";
      case "SA":
        return "SAP";
      default:
        return "Unknown";
    }
  };
  //   const domainSection = fullBatch?.sections?.Domain || {};
  // const aptitudeSection = fullBatch?.sections?.Aptitude || {};
  // const communicationSection = fullBatch?.sections?.Communication || {};

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose} // Changed to use onClose prop
    >
      <div
        className="relative w-[700px] bg-[#F8FAFD] rounded-[10px] p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Student Details</h2>
          <button
            onClick={onClose} // Changed to use onClose prop
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <RiCloseCircleLine size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          {/* Profile Picture */}
          <Image
            src={selectedStudent.image || "/profile.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          {/* Info Grid */}
          <div className="flex flex-col sm:flex-row justify-between w-full gap-10 text-sm sm:text-base">
            {/* Left Column */}
            <div className="space-y-1">
              <div>
                <span className="font-semibold text-[#6750A4]">Name:</span>{" "}
                <span className="text-gray-700">{selectedStudent.name}</span>
              </div>
              <div>
                <span className="font-semibold text-[#6750A4]">Domain:</span>{" "}
                <span className="text-gray-700">
                  {getDomainNameFromBatch(selectedStudent?.batch)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#6750A4]">Placement:</span>{" "}
                <span className="text-gray-700">
                  {selectedStudent.placement}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#6750A4]">Mode:</span>{" "}
                <span className="text-gray-700">{selectedStudent.mode}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              <div>
                <span className="font-semibold text-[#6750A4]">Email:</span>{" "}
                <span className="text-gray-700">{selectedStudent.email}</span>
              </div>
              <div>
                <span className="font-semibold text-[#6750A4]">Phone:</span>{" "}
                <span className="text-gray-700">{selectedStudent.phone} </span>
              </div>
              <div>
                <span className="font-semibold text-[#6750A4]">
                  Booking ID:
                </span>{" "}
                <span className="text-gray-700">
                  {selectedStudent.bookingId}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full mt-4">
          <div className="cursor-pointer relative ">
            <div className="flex">
              {["Domain", "Aptitude", "Communication"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInfoTab(tab)}
                  className={`cursor-pointer flex-1 py-2 text-sm sm:text-base font-medium text-center transition-all duration-300 ${
                    infoTab === tab ? "text-[#6750A4]" : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Animated underline */}
            <div
              className="cursor-pointer absolute bottom-0 left-0 h-[3px] bg-[#6750A4] transition-all duration-300 ease-in-out"
              style={{
                width: "33.3333%",
                transform: `translateX(${
                  ["Domain", "Aptitude", "Communication"].indexOf(infoTab) * 100
                }%)`,
              }}
            />
          </div>

          {/* Tab Content */}
          <div className="mt-4 text-sm">
            {infoTab === "Domain" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center text-sm sm:text-base">
                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Start Date:</p>
                  <p className="text-gray-700"> {formatDate(sectionData.Domain?.startDate) || "N/A"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">End Date:</p>
                  <p className="text-gray-700">{formatDate(sectionData.Domain?.endDate) || "N/A"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Domain Status:</p>
                  <p className="text-gray-700">{ new Date(sectionData.Domain?.endDate) < new Date() ? "Completed" : "Ongoing"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Domain Progress:</p>
                  <p className="text-gray-700">Initial Phase</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Domain Trainer:</p>
                  <p className="text-gray-700">Shri Hari</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">EPIC:</p>
                  <p className="text-gray-700">{selectedStudent.epicStatus}</p>
                </div>
              </div>
            )}

            {infoTab === "Aptitude" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center text-sm sm:text-base">
                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Start Date:</p>
                  <p className="text-gray-700">{formatDate(sectionData.Aptitude?.startDate) || "N/A"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">End Date:</p>
                  <p className="text-gray-700">{formatDate(sectionData.Aptitude?.endDate) || "N/A"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Aptitude Status:</p>
                  <p className="text-gray-700">{ new Date(sectionData.Aptitude?.endDate) < new Date() ? "Completed" : "Ongoing"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Aptitude Progress:</p>
                  <p className="text-gray-700">Capstone Project</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Aptitude Trainer:</p>
                  <p className="text-gray-700">Shri Hari</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">EPIC:</p>
                  <p className="text-gray-700">{selectedStudent.epicStatus}</p>
                </div>
              </div>
            )}
            {infoTab === "Communication" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center text-sm sm:text-base">
                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">Start Date:</p>
                  <p className="text-gray-700">{formatDate(sectionData.Communication?.startDate) || "N/A"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">End Date:</p>
                  <p className="text-gray-700">{formatDate(sectionData.Communication.endDate) || "N/A"}</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">
                    Communication Status:
                  </p>
                  <p className="text-gray-700">{ new Date(sectionData.Communication?.endDate) < new Date() ? "Completed" : "Ongoing" }</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">
                    Communication Progress:
                  </p>
                  <p className="text-gray-700">IRC Completed</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">
                    Communication Trainer:
                  </p>
                  <p className="text-gray-700">Shri Hari</p>
                </div>

                <div className="bg-[#ece6f0] rounded-xl p-4 border-t-3 border-[#6750A4] shadow-md w-[280px] mx-auto">
                  <p className="text-gray-700 font-bold">EPIC:</p>
                  <p className="text-gray-700">{selectedStudent.epicStatus}</p>
                </div>
              </div>
            )}
          </div>
          {/* Close Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="cursor-pointer bg-[#6750A4] text-white px-4 py-2.5 rounded-2xl text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
