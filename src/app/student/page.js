"use client"
import React from "react"
import NavBar from "../navBar/page";
import { useDataContext } from '../context/dataContext';


export default function StudentPage() {
  
  const { batchHead } = useDataContext();

  return (
    <div className="container mx-auto p-4">
      <NavBar />
      <div className="fixed top-15 md:top-0 ms-[-19px] border-b-2 border-gray-300 flex items-center justify-between bg-white w-full py-9 px-4 z-20">
                <h1 className="fixed pl-3 text-xl text-gray-800 font-semibold">{batchHead}</h1>
            </div>
    </div>
  );
}