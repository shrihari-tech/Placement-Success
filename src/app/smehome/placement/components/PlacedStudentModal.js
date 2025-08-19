"use client";
import { RiCloseCircleLine } from "react-icons/ri";
import Image from "next/image";

const PlacedStudentModal = ({ isOpen, onClose, selectedStudent }) => {
  if (!isOpen || !selectedStudent) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[600px] bg-[#F8FAFD] rounded-[10px] p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Placed Student Details
          </h2>
          <button
            onClick={onClose}
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
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover border"
          />

          {/* Info */}
          <div className="flex flex-col sm:flex-row justify-between w-full gap-10 text-sm sm:text-base">
            <div className="space-y-1">
              <p>
                <span className="font-semibold text-[#6750A4]">Name:</span>{" "}
                {selectedStudent.name}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">Email:</span>{" "}
                {selectedStudent.email}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">Mobile:</span>{" "}
                {selectedStudent.phone}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">Batch:</span>{" "}
                {selectedStudent.batch}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">Mode:</span>{" "}
                {selectedStudent.mode}
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <span className="font-semibold text-[#6750A4]">Placement:</span>{" "}
                {selectedStudent.placement}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">Company:</span>{" "}
                {selectedStudent.company}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">
                  Designation:
                </span>{" "}
                {selectedStudent.designation}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">Salary:</span>
                {selectedStudent.salary}
              </p>
              <p>
                <span className="font-semibold text-[#6750A4]">
                  Placed Month:
                </span>{" "}
                {selectedStudent.placedMonth}
              </p>
            </div>
          </div>
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
  );
};

export default PlacedStudentModal;
