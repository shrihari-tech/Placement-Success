"useclient"
import React from "react"
import NavBar from "../navBar/page";

export default function SettingPage() {
  return (
    <>
    <NavBar />
    <div className="container mx-auto p-4"> 
        {/* Main Content */}
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>This is the settings page where you can configure your preferences.</p>
      {/* Add more settings options here */}
    </div>
    </>
  );
}