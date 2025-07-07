"use client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [toastId, setToastId] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const allowedDomains = ["gmail.com", "skac.ac.in"];
const validate = () => {
    let valid = true;
    setEmailError("");
    if (!email) {
      setEmailError("Email field is empty");
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else if (email.split('@')[0].length > 40) {
      setEmailError("Email prefix should not exceed 40 characters");
      valid = false;
    } else {
      const emailDomain = email.split('@')[1];
      if (emailDomain && !allowedDomains.includes(emailDomain)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    if (valid) {
      const id = toast.success('Message sended to Email ID', { duration: Infinity });
      setToastId(id);
      setIsDisabled(true);
      setInputFocused(false); // Ensure button returns to inactive style
    }
    return valid;
  };
  return (
    <div className="container mx-auto flex items-center justify-center h-screen px-4 relative overflow-hidden">
      {/* Background Image at Top Left */}
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
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {/* Logo Section */}
      <div className="absolute top-6 right-6 flex items-center justify-center z-20">
              <Image
                src='/logo1.webp'
                className="h-12 w-36"
                alt="Logo"
                width={70}
                height={50}
              />
      </div>
      {/* Form Section */}
      <div className="flex flex-col items-center justify-center gap-8 py-10 px-8 md:px-16 bg-blur-saturation mt-[105] rounded-lg w-full max-w-4xl z-10 absolute">
        <div className="flex flex-col items-start justify-start w-full max-w-md">
          <div className="mb-6">
            <h1 className="font-bold text-3xl md:text-4xl">Reset Password</h1>
            <p className="text-gray-500 mt-1">We'll send a link to reset your password</p>
          </div>
          <div className="relative w-full">
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`peer w-full p-3 rounded-sm border ${emailError ? "border-red-500" : "border-gray-300"} text-black 
                  focus:border-[#3F2FB4] focus:border-2 focus:outline-none transition-all duration-200 
                  placeholder-transparent`}
                required
                disabled={isDisabled}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 bg-white px-1 transition-all
                  ${email ? "-top-2 text-sm text-[#3F2FB4]" : "top-3 text-base text-gray-400"}
                  peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#3F2FB4]`}
              >
                Enter your email
              </label>
              {emailError && (
                <p className="text-red-600 text-sm mt-1">{emailError}</p>
              )}
          </div>
          <button
            onClick={validate}
            className={`w-full p-3 mt-6 rounded-xl border-none font-bold transition-colors duration-300
              ${inputFocused || isDisabled ? 'bg-[#3F2FB4] text-white' : 'bg-gray-200 text-gray-400 hover:bg-[#3F2FB4] hover:text-white'}`}
            disabled={isDisabled}
          >
            Send Reset Link
          </button>
          <div className="mt-4 text-center w-full">
            <Link
              href="/"
              className="text-sm text-[#3F2FB4] hover:underline inline-block mt-3"
              onClick={() => { if (toastId) toast.dismiss(toastId); }}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
            </div>
        );
      }