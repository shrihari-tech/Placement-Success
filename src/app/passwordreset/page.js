"use client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";   
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleReset = () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Reset link sent to your email");
    setTimeout(() => {
      router.push("/"); // Redirect to login or home after a while
    }, 2000);
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen px-4">
      <div>
        <Image
          src="/Login-Background.png"
          alt="Background Image"
          className="absolute inset-0 z-0 opacity-50 w-100 h-100"
        />
         {/* Logo Section */}
        <div className="flex items-center justify-center md:me-20 mb-6 md:mb-0">
          <Image src='/logo1.webp' className="h-25 w-60 md:h-40 md:w-160" alt="Logo" width={160} height={40} />
        </div>
      </div>
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-6 md:px-16 bg-transparent rounded-lg  w-full max-w-4xl z-10">
        
        {/* Form Section */}
        <div className="flex flex-col items-start justify-start w-full max-w-md">
          <div className="mb-6">
            <h1 className="font-bold text-3xl md:text-4xl">Reset Password</h1>
            <p className="text-gray-500 mt-1">We’ll send a link to reset your password</p>
          </div>

          <div className="relative w-full">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="peer w-full p-2 rounded-2xl border border-gray-300 text-black 
                         focus:border-blue-900 focus:ring-1 focus:outline-none transition-all duration-200 
                         placeholder-transparent"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 bg-white px-1 transition-all
                ${email ? "-top-2 text-sm text-blue-900" : "top-2.5 text-base text-gray-400"}
                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-900`}
            >
              Enter your email
            </label>
          </div>

          <button
            onClick={handleReset}
            className="w-full p-2 mt-6 rounded-full border-none bg-blue-900 font-bold text-white 
                       hover:bg-green-600 transition-colors duration-300"
          >
            Send Reset Link
          </button>

          <div className="mt-4 text-center w-full">
            <Link
              href="/"
              className="text-sm text-blue-900 hover:underline inline-block mt-3"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
