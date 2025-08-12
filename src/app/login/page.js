"use client";
import React, { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useDataContext } from "../context/dataContext";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const passwordRef = useRef(null);
  const router = useRouter();
  const { setLoginUser } = useDataContext();

  // Whitelisted users
  const allowedUsers = [
    // Full Stack Development
    { email: "ravi.kumar@kgisl.microcollege.in", domain: "fullstack" },
    { email: "sneha.nair@kgisl.microcollege.in", domain: "fullstack" },
    { email: "arjun.t@kgcas.com", domain: "fullstack" },
    { email: "priya.m@kgkite.com", domain: "fullstack" },
    { email: "vijay.s@soi.kgkite.ac.in", domain: "fullstack" },

    // Data Analytics & Science
    { email: "meena.r@kgisl.microcollege.in", domain: "dataanalytics" },
    { email: "karan.s@kgcas.com", domain: "dataanalytics" },
    { email: "lakshmi.p@kgkite.com", domain: "dataanalytics" },
    { email: "dinesh.b@soi.kgkite.ac.in", domain: "dataanalytics" },
    { email: "anitha.j@kgisl.microcollege.in", domain: "dataanalytics" },

    // Digital Marketing
    { email: "rahul.m@kgcas.com", domain: "marketing" },
    { email: "tejaswi.s@kgkite.com", domain: "marketing" },
    { email: "naveen.d@soi.kgkite.ac.in", domain: "marketing" },
    { email: "divya.r@kgisl.microcollege.in", domain: "marketing" },
    { email: "akash.p@kgcas.com", domain: "marketing" },

    // DevOps
    { email: "vikram.r@kgkite.com", domain: "devops" },
    { email: "sangeetha.d@soi.kgkite.ac.in", domain: "devops" },
    { email: "harsha.m@kgisl.microcollege.in", domain: "devops" },
    { email: "lalitha.d@kgcas.com", domain: "devops" },
    { email: "deepak.r@kgkite.com", domain: "devops" },

    // Banking & Financial Services
    { email: "amit.p@soi.kgkite.ac.in", domain: "banking" },
    { email: "divya.v@kgisl.microcollege.in", domain: "banking" },
    { email: "sathish.r@kgcas.com", domain: "banking" },
    { email: "ajay.s@kgkite.com", domain: "banking" },
    { email: "megha.n@soi.kgkite.ac.in", domain: "banking" },

    // SAP
    { email: "ritika.n@kgisl.microcollege.in", domain: "sap" },
    { email: "abhishek.r@kgcas.com", domain: "sap" },
    { email: "trisha.d@kgkite.com", domain: "sap" },
    { email: "kavitha.s@soi.kgkite.ac.in", domain: "sap" },
    { email: "preethi.j@kgisl.microcollege.in", domain: "sap" },

    // Admin
    { email: "admin@gmail.com", domain: "all", role: "admin" },
  ];

  const allowedEmails = allowedUsers.map((u) => u.email);

  const validateEmailField = (value) => {
    if (!value.trim()) {
      setEmailError("");
      return;
    }
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!emailPattern.test(value)) {
      setEmailError("Invalid email format");
    } else if (!allowedEmails.includes(value)) {
      setEmailError("Unauthorized email. Contact admin.");
    } else {
      setEmailError("");
    }
  };

  const passwordValidate = (value) => {
    if (value) setPasswordError("");
  };

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else if (!allowedEmails.includes(email)) {
      setEmailError("Unauthorized email. Contact admin.");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return false;

    if (password !== "1234567") {
      toast.error("Incorrect password");
      setPasswordError("Invalid password");
      return false;
    }

    const user = allowedUsers.find((u) => u.email === email);
    if (user) {
      // Store all necessary session data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("loginUser", email);
      localStorage.setItem("domainCode", user.domain || "all");
      localStorage.setItem("userRole", user.role || "sme");

      // Set expiration (optional)
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 8); // 8 hour session
      localStorage.setItem("expiration", expiration.toISOString());

      if (user.role === "admin") {
        toast.success("Admin login successful! Redirecting to Home...");
        setLoginUser(email);
        setTimeout(() => router.push("/home"), 2000);
      } else {
        toast.success("Login successful! Redirecting to SME Home...");
        setLoginUser(email);
        setTimeout(() => router.push(`/smehome`), 2000); // Removed query param since we're using localStorage
      }
      return true;
    }

    toast.error("Login failed. Please try again.");
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen px-2 overflow-hidden">
      {/* Background Image */}
      <div className="fixed top-0 left-0 z-0">
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
        <Toaster position="top-right" />
      </div>

      {/* Logo */}
      <div className="fixed top-6 md:top-6 md:right-6 z-20">
        <Image
          src="/logo1.webp"
          className="h-20 w-40 md:h-16 md:w-44"
          alt="Logo"
          width={70}
          height={50}
        />
      </div>

      {/* Login Form */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-10 px-8 md:px-16 bg-blur-saturation mt-[105px] w-full max-w-4xl z-10 fixed">
        <div className="flex flex-col items-start justify-start w-full max-w-md">
          <div className="mb-5">
            <div className="flex flex-row gap-1">
              <h1 className="font-bold text-3xl md:text-4xl">
                Welcome Placement Success Team!
              </h1>
              <Image
                src="/Rocket SVG Icon 1.svg"
                alt="Rocket image"
                width={40}
                height={40}
              />
            </div>
          </div>

          <form
            noValidate
            className="flex flex-col items-center justify-center space-y-4 w-full"
            onSubmit={handleSubmit}
          >
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
                className={`peer w-full p-3 rounded-sm border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } text-black focus:border-[#3f2fb4] focus:border-2 focus:outline-none transition-all duration-200 placeholder-transparent`}
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-3 bg-[#F8FAFD] px-1 transition-all ${
                  email
                    ? "-top-2 text-sm text-[#3f2fb4]"
                    : "top-3 text-base text-gray-400"
                } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#3f2fb4]`}
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
                className={`peer w-full p-3 pr-10 rounded-sm border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } text-black focus:border-[#3f2fb4] focus:border-2 focus:outline-none transition-all duration-200 placeholder-transparent`}
                required
              />
              <label
                htmlFor="password"
                className={`absolute left-3 bg-[#F8FAFD] px-1 transition-all ${
                  password
                    ? "-top-2 text-sm text-[#3f2fb4]"
                    : "top-3 text-base text-gray-400"
                } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#3f2fb4]`}
              >
                Password
              </label>
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
              className={`w-full p-3 mt-6 cursor-pointer rounded-xl border-none ${
                email || password
                  ? "bg-[#3f2fb4] text-white"
                  : "bg-gray-300 text-gray-400"
              } font-bold hover:text-white transition-colors duration-300`}
            >
              Login
            </button>

            {/* Links */}
            <div className="mt-4 text-center space-y-2 w-full">
              <p className="text-sm text-gray-500">
                <Link
                  href="/passwordreset"
                  className="text-[#3f2fb4] hover:underline"
                >
                  Forgot Password?
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/createaccount"
                  className="text-[#3f2fb4] hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
