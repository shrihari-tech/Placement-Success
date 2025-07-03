"use client";
import React, { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from 'sonner';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const passwordRef = useRef(null);
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmitFunction = () => {
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (email === "admin@123.com" && password === "123") {
      toast.success("Login successful!");
      router.push("/home");
      setEmail("");
      setPassword("");
    } else {
      toast.error("Please enter the valid Email & Password");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen px-4">
       <Toaster position="top-right"/>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-6 md:px-16 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center md:me-20 mb-6 md:mb-0">
          <Image src='/logo1.webp' className="h-25 w-60 md:h-40 md:w-160" alt="Logo" width={160} height={40}/>
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-start justify-start w-full max-w-md">
          <div className="mb-5">
            <h1 className="font-bold text-3xl md:text-4xl">Welcome !</h1>
            <h2 className="font-bold text-2xl md:text-3xl">Placement Team</h2>
          </div>

          <div noValidate className="flex flex-col items-center justify-center space-y-4 w-full">

            {/* Email Input */}
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="peer w-full p-2 rounded-2xl border border-gray-300 text-black 
                           focus:border-blue-900 focus:ring-1 focus:outline-none transition-all duration-200 
                           placeholder-transparent"
                required
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

            {/* Password Input */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="peer w-full p-2 pr-10 rounded-2xl border border-gray-300 text-black 
                           focus:border-blue-900 focus:ring-1 focus:outline-none transition-all duration-200 
                           placeholder-transparent"
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 bg-white px-1 transition-all
                  ${password ? "-top-2 text-sm text-blue-900" : "top-2.5 text-base text-gray-400"}
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-900`}
              >
                password
              </label>
              {/* Eye Toggle */}
              <div
                className="absolute right-3 top-3 text-xl text-gray-500 cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                  setTimeout(() => {
                    if (passwordRef.current) {
                      const length = passwordRef.current.value.length;
                      passwordRef.current.focus();
                      passwordRef.current.setSelectionRange(length, length);
                    }
                  }, 0);
                }}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitFunction}
              className="w-full p-2 mt-4 rounded-full border-none bg-blue-900 font-bold text-white 
                         hover:bg-green-600 transition-colors duration-300"
            >
              Login
            </button>

            {/* password forget & account creating */}
            <div className="mt-4 text-center space-y-2 w-full">
              <p className="text-sm text-gray-500 mt-2">
                <Link href="/passwordreset" className="text-blue-900 hover:underline">Forgot Password?</Link>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Don&apos;t have an account?
                <Link href="/createaccount" className="text-blue-900 hover:underline"> Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
