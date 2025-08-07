// components/SMENavbar.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { RiGraduationCapLine, RiUserLocationLine } from "react-icons/ri";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { useDataContext } from "../context/dataContext";

const SMENavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("");
  const { firstLetterUser } = useDataContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (pathname === "/smehome") {
      setActiveNavItem("home");
    } else if (pathname === "/smehome/batches") {
      setActiveNavItem("batches");
    } else if (pathname === "/smehome/student") {
      setActiveNavItem("student");
    } else if (pathname === "/smehome/placement") {
      setActiveNavItem("sme");
    } else {
      setActiveNavItem("");
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#eaddff] z-40 flex items-center justify-between p-3">
        <button
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
          onClick={() => router.push("/smehome")}
        >
          {firstLetterUser}
        </button>
        <button onClick={toggleMobileMenu} className="p-2">
          <GiHamburgerMenu size={24} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[72px] bg-[#eaddff] flex-col justify-between items-center z-30">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full mb-10 mt-7">
            <button
              className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
              onClick={() => router.push("/smehome")}
            >
              {firstLetterUser}
            </button>
          </div>

          <nav className="flex flex-col items-center w-full">
            {/* Home */}
            <div className="flex flex-col items-center w-full mb-5">
              <Link
                href="/smehome"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "home"
                    ? "bg-[#6750A4] text-white"
                    : "hover:bg-[#e0ccff] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("home")}
              >
                <LuLayoutGrid size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "home" ? "text-[#9585bf]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/smehome")}
              >
                Home
              </span>
            </div>

            {/* Batches */}
            <div className="flex flex-col items-center w-full mb-5">
              <Link
                href="/smehome/batches"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "batches"
                    ? "bg-[#6750A4] text-white"
                    : "hover:bg-[#e0ccff] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("batches")}
              >
                <MdOutlineGroups size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "batches"
                    ? "text-[#9585bf]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/smehome/batches")}
              >
                Batches
              </span>
            </div>

            {/* Student */}
            <div className="flex flex-col items-center w-full mb-5">
              <Link
                href="/smehome/student"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "student"
                    ? "bg-[#6750A4] text-white"
                    : "hover:bg-[#e0ccff] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("student")}
              >
                <RiGraduationCapLine size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "student"
                    ? "text-[#9585bf]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/smehome/student")}
              >
                Student
              </span>
            </div>

            {/* Placement */}
            <div className="flex flex-col items-center w-full mb-5">
              <Link
                href="/smehome/placement"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "sme"
                    ? "bg-[#6750A4] text-white"
                    : "hover:bg-[#e0ccff] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("sme")}
              >
                <RiUserLocationLine size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "sme" ? "text-[#9585bf]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/smehome/placement")}
              >
                Placement
              </span>
            </div>
          </nav>
        </div>

        <div className="flex flex-col items-center w-full mb-5">
          {/* Notification */}
          <div className="flex flex-col items-center w-full mb-5">
            <button
              className="cursor-pointer flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#e0ccff] hover:text-black rounded-2xl"
              onClick={() => {
                setMobileMenuOpen(false); // Optional: add your logic
              }}
            >
              <MdOutlineNotifications size={20} />
            </button>
            <span className="text-xs font-semibold text-[#49454f] mb-2">
              Notification
            </span>
          </div>

          {/* Settings */}
          <div className="flex flex-col items-center w-full mb-5">
            <Link
              href="/smehome/setting"
              className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                activeNavItem === "settings"
                  ? "bg-[#6750A4] text-white"
                  : "text-black hover:bg-[#e0ccff] hover:text-black"
              }`}
              onClick={() => handleNavItemClick("settings")}
            >
              <MdOutlineSettings size={20} />
            </Link>
            <span
              className={`text-xs font-semibold cursor-pointer mb-2 ${
                activeNavItem === "settings"
                  ? "text-[#9585bf]"
                  : "text-[#49454f]"
              }`}
              onClick={() => router.push("/smehome/setting")}
            >
              Settings
            </span>
          </div>

          {/* Logout */}
          <div className="flex flex-col items-center w-full mb-5">
            <Link
              href="/login"
              className="flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl hover:bg-[#e0ccff] text-black"
            >
              <TbLogout2 size={20} />
            </Link>
            <span className="text-xs font-semibold mb-2 text-[#49454f]">
              Logout
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-16 left-0 w-full bg-[#eaddff] z-30 p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {/* Home */}
            <Link
              href="/smehome"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "home"
                  ? "bg-[#6750A4] text-white"
                  : "text-black hover:bg-[#e0ccff]"
              }`}
              onClick={() => handleNavItemClick("home")}
            >
              <LuLayoutGrid size={20} className="mr-3" />
              <span>Home</span>
            </Link>

            {/* Batches */}
            <Link
              href="/smehome/batches"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "batches"
                  ? "bg-[#6750A4] text-white"
                  : "text-black hover:bg-[#e0ccff]"
              }`}
              onClick={() => handleNavItemClick("batches")}
            >
              <MdOutlineGroups size={20} className="mr-3" />
              <span>Batches</span>
            </Link>

            {/* Student */}
            <Link
              href="/smehome/student"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "student"
                  ? "bg-[#6750A4] text-white"
                  : "text-black hover:bg-[#e0ccff]"
              }`}
              onClick={() => handleNavItemClick("student")}
            >
              <RiGraduationCapLine size={20} className="mr-3" />
              <span>Student</span>
            </Link>

            {/* Placement */}
            <Link
              href="/smehome/placement"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "sme"
                  ? "bg-[#6750A4] text-white"
                  : "text-black hover:bg-[#e0ccff]"
              }`}
              onClick={() => handleNavItemClick("sme")}
            >
              <RiUserLocationLine size={20} className="mr-3" />
              <span>Placement</span>
            </Link>

            {/* Settings */}
            <Link
              href="/smehome/setting"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "settings"
                  ? "bg-[#6750A4] text-white"
                  : "text-black hover:bg-[#e0ccff]"
              }`}
              onClick={() => handleNavItemClick("settings")}
            >
              <MdOutlineSettings size={20} className="mr-3" />
              <span>Settings</span>
            </Link>

            {/* Logout */}
            <Link
              href="/smehome"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#e0ccff]"
              onClick={() => {
                setActiveNavItem("");
                setMobileMenuOpen(false);
              }}
            >
              <TbLogout2 size={20} className="mr-3" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SMENavbar;
