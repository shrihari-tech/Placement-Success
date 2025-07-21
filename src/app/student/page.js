"useclient"
import React from "react"
import NavBar from "../navBar/page";
import BulkModal from "./bulkModal";

export default function StudentPage() {
  return (
    <div className="container mx-auto p-4">
      <NavBar />
      {/* Main Content */}
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <p>This is the student dashboard where you can view your profile, apply for placements, and manage your applications.</p>
      <BulkModal />
      {/* Add more student-specific features here */}
    </div>
  );
}