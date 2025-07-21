"use client";

import { useState, useRef } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import * as XLSX from "xlsx";

export default function BulkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const requiredFields = [
    
    "BATCH NAME",
    "STUDENT FULL NAME (AS PER DOCUMENTS)",
    "Booking ID",
    "MODE OF STUDY",
    "Certificate Received                    ( Y or N )",
    "GENDER",
    "DOB",
    "EMAIL ADDRESS",
    "CONTACT NUMBER (10 digit)",
    "ALTERNATE CONTACT NUMBER( 10 digit)",
    "RESIDENTIAL ADDRESS (COMPLETE ADDRESS)",
    "PINCODE",
    "CURRENT CITY/TOWN OF RESIDENCE",
    "CURRENT STATE OF RESIDENCE",
    "PASSPORT SIZE PROFESSIONAL PHOTO (WITH WHITE BACKGROUND ONLY)",
    "UPDATED CV",
    "10 th Percentage",
    "10 th YEAR OF COMPLETION",
    "12 th / DIPLOMA %(Percentage)",
    "12 th YEAR OF COMPLETION",
    "UG %( Percentage)",
    "UG MODE",
    "UG SPECIALIZATION",
    "UG YEAR OF COMPLETION",
    "UG - DEGREE CERTIFICATE AVAILABILITY",
    "UG - ARREARS PENDING AS OF TODAY IF ANY",
    "PG % ( Percentage)",
    "PG SPECIALIZATION",
    "PG YEAR OF COMPLETION",
    "PG - DEGREE CERTIFICATE AVAILABILITY",
    "PG - ARREARS PENDING AS OF TODAY IF ANY",
    "GAP IN EDUCATION IF ANY",
    "REASON FOR GAP IN EDUCATION",
    "WORK EXPERIENCE (IF ANY)",
    "WORK EXPERIENCE ( IN MONTHS)",
    "PREVIOUS ORGANISATION NAME (if any)",
    "WILLING TO RELOCATE (FOR PLACEMENT ASSISTANCE)",
    "LANGUAGES KNOWN (TO WRITE)",
    "LANGUAGES KNOWN (TO READ)",
    "LANGUAGES KNOWN (TO SPEAK)",
  ];

  const handleOpenModal = () => {
    setIsOpen(true);
    setFile(null);
    setUploadSuccess(false);
    setError("");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop();
      if (!["xlsx", "xls"].includes(fileExtension)) {
        setError("Upload only Excel file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0].map((h) =>
          h ? h.toString().trim() : ""
        );

        const missingFields = requiredFields.filter(
          (field) => !headers.includes(field)
        );

        if (missingFields.length > 0) {
          setError("Wrong template!! Check the template given below.");
          setFile(null);
          return;
        }

        setFile(selectedFile);
        setUploadSuccess(false);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      fileInputRef.current.click();
      return;
    }

    // Simulate upload
    console.log("Uploading:", file.name);
    setTimeout(() => {
      setUploadSuccess(true);
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-[#6750A4] text-white px-4 py-2 rounded hover:bg-[#553b95]"
      >
        Bulk Add
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="w-[90%] sm:w-[500px] bg-[#F8FAFD] rounded-[10px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Upload Bulk File</h2>
              <button
                onClick={handleCloseModal}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                <RiCloseCircleLine size={20} />
              </button>
            </div>

            <div
              className="border border-dashed border-gray-400 rounded-md p-8 text-center cursor-pointer hover:bg-gray-100 transition mb-4"
              onClick={handleBoxClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx,.xls"
              />
              {file ? (
                <div className="text-gray-700">{file.name}</div>
              ) : (
                <div className="text-gray-500">Click to select a file</div>
              )}
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center mb-2">
                {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              className="w-full bg-[#6750A4] text-white px-4 py-2 rounded hover:bg-[#553b95]"
            >
              Upload
            </button>

            {uploadSuccess && (
              <div className="mt-2 text-green-600 text-sm text-center">
                File uploaded successfully!
              </div>
            )}

            <div className="mt-6 text-center">
              <a
                href="/template.xlsx"
                download
                className="text-[#6750A4] underline text-sm hover:text-[#553b95]"
              >
                📥 Download Example Template
              </a>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="cursor-pointer bg-[#6750A4] text-white px-4 py-2.5 rounded text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
