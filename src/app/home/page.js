"use client";
import React from "react";

export default function HomePage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">🎉 Welcome, Admin!</h1>
        <p className="text-xl">You have successfully logged in.</p>
      </div>
    </div>
  );
}
