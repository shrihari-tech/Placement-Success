"use client";

import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [toastId, setToastId] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const allowedDomains = ["gmail.com", "skac.ac.in"];

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const validate = () => {
    setEmailError("");
    // setIsSubmitted(false);
    if (!email) {
      toast.error("Email is required");
      setEmailError("Email field is empty");
      return false;
    } else if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      setEmailError("Invalid email format");
      return false;
    } else if (email.split("@")[0].length > 40) {
      setEmailError("Email prefix should not exceed 40 characters");
      return false;
    } else {
      const domain = email.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        setEmailError("Email domain not allowed");
        return false;
      }
    }
    return true;
  };

  const handleReset = () => {
    if (!validate()) return;

    const id = toast.success("Reset link sent to your email", { duration: Infinity });
    setToastId(id);
    setIsDisabled(true);
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed top-0 left-0 z-0">
        <Image
          src="/Login-Background.png"
          alt="Background"
          className="object-contain"
          priority
          width={650}
          height={650}
        />
      </div>

      {/* Toaster */}
      <Toaster position="top-right" />

      {/* Logo */}
      <div className="fixed top-6 right-6 z-10">
        <Image src="/logo1.webp" className="h-12 w-36" alt="Logo" width={70} height={50} />
      </div>

      {/* Form */}
      <div className="flex flex-col items-center justify-center gap-8 py-10 px-8 md:px-16 bg-none  w-full max-w-4xl z-10 fixed">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-3xl md:text-4xl">Reset Password</h1>
          <p className="text-gray-500 mt-1">We'll send a link to reset your password</p>

          <div className="relative w-full mt-6">
            <input
              type="email"
              id="email"
              value={email}
             onChange={(e) => {
                setEmail(e.target.value);
                setIsDisabled(false);
                setIsSubmitted(false);
              }}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Enter your email"
              className={`peer w-full p-3 rounded-sm border text-black 
                ${(emailError && !isSubmitted) ? 'border-red-600' : (inputFocused || isSubmitted ? 'border-[#3F2FB4] ring-1' : 'border-gray-300')} 
                focus:outline-none transition-all duration-200 
                placeholder-transparent`}
            />
            <label
              htmlFor="email"
              className={`absolute left-3 bg-white px-1 transition-all
                ${(email || inputFocused || isSubmitted) ? "-top-2 text-sm text-[#3F2FB4]" : "top-3 text-base text-gray-400"}
                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#3F2FB4]`}
            >
              Enter your email
            </label>
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>

          <button
            onClick={handleReset}
            disabled={isDisabled}
            className={`w-full p-3 mt-6 rounded-xl border-none font-bold transition-colors duration-300
              ${isSubmitted ? 'bg-[#3F2FB4] text-white' :
                (inputFocused ? 'bg-[#3F2FB4] text-white' : 'bg-gray-300 text-gray-400')}`}
          >
            Send Reset Link
          </button>

          <div className="mt-4 text-center w-full">
            <Link
              href="/"
              onClick={() => {
                if (toastId) toast.dismiss(toastId);
              }}
              className="text-sm text-[#3F2FB4] hover:underline inline-block mt-3"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
