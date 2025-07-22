"use client";

import { useState, useRef, useContext } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import * as XLSX from "xlsx";

export default function BulkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [showBatchInput, setShowBatchInput] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null);
  
  

  const headerFieldsToIgnore = [
    "BASIC ESSENTIAL DETAILS",
    "10TH & 12TH DETAILS",
    "UG DETAILS",
    "PG DETAILS",
    "Languages Known",
  ];

  const requiredDataFields = [
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

  const validateExcelHeaders = (jsonData) => {
    if (!jsonData || jsonData.length < 2) return false;

    const headerRow1 = jsonData[0].map((h) => (h || "").toString().trim());
    const unknownRow1Fields = headerRow1.filter(
      (field) => field !== "" && !headerFieldsToIgnore.includes(field)
    );

    if (unknownRow1Fields.length > 0) return false;

    const headerRow2 = jsonData[1].map((h) => (h || "").toString().trim());

    const missingFields = requiredDataFields.filter(
      (field) => !headerRow2.includes(field)
    );

    const extraFields = headerRow2.filter(
      (field) => !requiredDataFields.includes(field)
    );

    return missingFields.length === 0 && extraFields.length === 0;
  };

  const handleFileUpload = (selectedFile) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const valid = validateExcelHeaders(jsonData);
      if (!valid) {
        setError("Wrong template! Check the template below.");
        setFile(null);
        setShowBatchInput(false);
        return;
      }

      setError("");
      setFile(selectedFile);
      setShowBatchInput(true);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");
    setUploadMessage("");
    setShowBatchInput(false);

    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop();
      if (!["xlsx", "xls"].includes(ext)) {
        setError("Upload only Excel file");
        return;
      }
      handleFileUpload(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      fileInputRef.current.click();
      return;
    }
    setShowBatchInput(true);
  };
//handleSubmit function
const handleSubmit = () => {
  if (!batchName.trim()) {
    setError("Please enter a batch name.");
    return;
  }

  if (!file) {
    setError("Please select an Excel file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    if (jsonData.length === 0) {
      setError("Excel is empty.");
      return;
    }

    setUploadMessage("File \"" + file.name + "\" uploaded successfully with batch: " + batchName);
    setFile(null);
    setBatchName("");
    setShowBatchInput(false);
    setError("");
  };

  reader.readAsArrayBuffer(file);
};

  

  const handleOpenModal = () => {
    setIsOpen(true);
    setFile(null);
    setError("");
    setShowBatchInput(false);
    setBatchName("");
    setUploadMessage("");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="cursor-pointer bg-[#6750a4] hover:bg-[#6650a4e7] text-white px-5 py-4 rounded-xl text-sm font-semibold"
      >
        Bulk Add
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 "
          onClick={handleCloseModal}
        >
          <div
            className="w-[90%] sm:w-[500px] bg-[#F8FAFD] rounded-[10px] p-6 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 ">
              <h2 className="text-lg font-medium">Upload Bulk File</h2>
              <button onClick={handleCloseModal} className="cursor-pointer">
                <RiCloseCircleLine size={20} className="text-gray-500" />
              </button>
            </div>

            <div
              className="border border-dashed border-gray-400 rounded-md p-8 text-center cursor-pointer hover:bg-gray-100 mb-4"
              onClick={handleBoxClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx,.xls"
              />
              <div className="text-gray-700">
                {file ? file.name : "Click to select a file"}
              </div>
            </div>

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {uploadMessage && (
              <div className="text-green-600 text-sm text-center mb-2">
                {uploadMessage}
              </div>
            )}

            <button
              onClick={handleUpload}
              className="w-full bg-[#6750A4] text-white px-4 py-2 rounded hover:bg-[#553b95] cursor-pointer"
            >
              Upload
            </button>

            {showBatchInput && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter Batch Name (e.g., DA01)"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded mb-3"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#6750A4] text-white px-4 py-2 rounded hover:bg-[#553b95] cursor-pointer"
                >
                  Submit
                </button>
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
                className="bg-[#6750A4] text-white px-4 py-2 rounded text-sm cursor-pointer"
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
