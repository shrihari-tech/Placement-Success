"use client";
import React from "react";
import NavBar from "../navBar/page";

export default function HomePage() {
  return (
    <div className="container justify-center items-center mx-auto p-4">
      <NavBar />
      {/* Main Content */}
      <h1>Welcome to the Home Page</h1>
      <p>This is the main entry point of our application.</p>
      <p>Feel free to explore the features and functionalities we offer.</p>
      <p>Enjoy your stay!</p>
    </div>
  );
}
