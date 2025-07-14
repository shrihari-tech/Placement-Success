"use client";
import React, { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from 'sonner';
import { useDataContext } from '../context/dataContext';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef(null);
  const router = useRouter();

  //usecontext variable 
     const { setLoginUser } = useDataContext();

  const allowedDomains = ["gmail.com", "skac.ac.in"];

  // Validate only the email field (for onChange)
  const validateEmailField = (value) => {
    if (!value.trim()) {
      setEmailError("");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      setEmailError("Invalid email format");
    } else if (value.split('@')[0].length > 40) {
      setEmailError("Email prefix should not exceed 40 characters");
    } else {
      const emailDomain = value.split('@')[1];
      if (emailDomain && !allowedDomains.includes(emailDomain)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }
  };

  const passwordValidate = (value) => {
    if (value) {
      setPasswordError("");
    }
  };

  // Full validation for onSubmit
  const validate = () => {
    let valid = true;
    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else if (email.split('@')[0].length > 40) {
      setEmailError("Email prefix should not exceed 40 characters");
      valid = false;
    } else {
      const emailDomain = email.split('@')[1];
      if (!allowedDomains.includes(emailDomain)) {
        setEmailError("Invalid email format");
        valid = false;
      }
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (valid && email === 'admin@gmail.com' && password === '1234567') {
      toast.success("Login successful! Redirecting...");
      setLoginUser(email);
      return valid;
    }
    else{
      toast.error("Enter the valid Email and Password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setTimeout(() => router.push('/home'), 2000);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen px-2 overflow-hidden">
      {/* Background Image at Top Left */}
      <div className="fixed top-0 left-0 z-0 ">
        <Image
          src="/Background.png"
          alt="Background"
          className="object-contain"
          priority
          width={650}
          height={650}
        />
      </div>
      <div>
        <div>
          <Toaster position="top-right"/>
        </div>
      </div>
      {/* Logo Section */}
      <div className="fixed top-6 right-6 flex items-center justify-center z-20">
        <Image
          src='/logo1.webp'
          className="h-12 w-36 md:h-16 md:w-44"
          alt="Logo"
          width={70}
          height={50}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-8 md:px-16 bg-blur-saturation mt-[105] w-full max-w-4xl z-10 fixed">
        {/* Form Section */}
        <div className="flex flex-col items-start justify-start w-full max-w-md">
          <div className="mb-5">
            <div className="flex flex-row gap-1">
                <h1 className="font-bold text-3xl md:text-4xl">Welcome !</h1>
            <Image
                src='/Rocket SVG Icon 1.svg' 
                alt="Rocket image"
                width={40}
                height={40} 
              />
            </div>
            <h2 className="font-bold text-3xl md:text-4xl">Placement Team</h2>
          </div>

          <form noValidate className="flex flex-col items-center justify-center space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Email Input */}
                  <div className="relative w-full">
                    <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmailField(e.target.value);
                }}
                placeholder="Enter your email"
                className={`peer w-full p-3 rounded-sm border ${emailError ? "border-red-500" : "border-gray-300"} text-black 
                  focus:border-[#3f2fb4] focus:border-2 focus:outline-none transition-all duration-200 
                  placeholder-transparent`}
                required
                    />
                    <label
                    htmlFor="email"
                    className={`absolute left-3 bg-white px-1 transition-all
                      ${email ? "-top-2 text-sm text-[#3f2fb4]" : "top-3 text-base text-gray-400"}
                      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#3f2fb4]`}
                    >
                    Enter your email
                    </label>
                    {emailError && (
                    <p className="text-red-600 text-sm mt-1">{emailError}</p>
                    )}
                  </div>

                  {/* Password Input */}
            <div className="relative w-full">
               <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordValidate(e.target.value);
                }}
                placeholder="Password"
                className={`peer w-full p-3 pr-10 rounded-sm border ${passwordError ? "border-red-500" : "border-gray-300"} text-black 
                  focus:border-[#3f2fb4] focus:border-2 focus:outline-none transition-all duration-200 
                  placeholder-transparent`}
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 bg-white px-1 transition-all
                  ${password ? "-top-2 text-sm text-[#3f2fb4]" : "top-3 text-base text-gray-400"}
                  peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#3f2fb4]`}
              >
                Password
              </label>
              {/* Eye Toggle */}
              <div
                className="absolute right-3 top-4 text-xl text-gray-500 cursor-pointer"
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
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className={`w-full p-3 mt-6 cursor-pointer rounded-xl border-none ${email || password ? "bg-[#3f2fb4] text-white" : "bg-gray-300 text-gray-400"} font-bold 
                        hover:text-white transition-colors duration-300`}
            >
            Login
            </button>

            {/* password forget & account creating */}
            <div className="mt-4 text-center space-y-2 w-full">
              <p className="text-sm text-gray-500 mt-2">
                <Link href="/passwordreset" className="text-[#3f2fb4] hover:underline">Forgot Password?</Link>
              </p>
             <p className="text-sm text-gray-500 mt-2">
                Don&apos;t have an account?
                <Link href="/createaccount" className="text-[#3f2fb4] hover:underline"> Create one</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}