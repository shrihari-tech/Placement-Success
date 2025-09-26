// placementOpHead/navbar.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { BsWindow } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { useDataContext } from "../context/dataContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("");
  const { firstLetterUser } = useDataContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Match paths correctly for your current structure
    if (
      pathname === "/placementOpHead/ophome" ||
      pathname === "/placementOpHead/ophome/"
    ) {
      setActiveNavItem("home");
    } else if (pathname === "/placementOpHead/tl") {
      setActiveNavItem("tl");
    } else if (pathname === "/placementOpHead/jd") {
      setActiveNavItem("jd");
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
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#efb2f7] z-40 flex items-center justify-between p-3">
        <button
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
          onClick={() => router.push("/placementOpHead/ophome")}
        >
          {firstLetterUser}
        </button>
        <button onClick={toggleMobileMenu} className="p-2">
          <GiHamburgerMenu size={24} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[72px] bg-[#d3a8d9] flex-col justify-between items-center z-30">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full mb-10 mt-7">
            <button
              className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
              onClick={() => router.push("/placementOpHead/ophome")}
            >
              {firstLetterUser}
            </button>
          </div>

          <nav className="flex flex-col items-center w-full">
            {/* Home */}
            <div className="flex flex-col items-center w-full mb-9">
              <Link
                href="/placementOpHead/ophome"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "home"
                    ? "bg-[#9025a1] text-white"
                    : "hover:bg-[#e8d3ec] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("home")}
              >
                <LuLayoutGrid size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "home" ? "text-[#9025a1]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpHead/ophome")}
              >
                Home
              </span>
            </div>

            {/* tl */}
            <div className="flex flex-col items-center w-full mb-9">
              <Link
                href="/placementOpHead/tl"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "tl"
                    ? "bg-[#9025a1] text-white"
                    : "hover:bg-[#e8d3ec] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("tl")}
              >
                <MdOutlineGroups size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "tl" ? "text-[#9025a1]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpHead/tl")}
              >
                TL
              </span>
            </div>

            {/* JD Dashboard */}
            <div className="flex flex-col items-center w-full mb-9">
              <Link
                href="/placementOpHead/jd"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "jd"
                    ? "bg-[#9025a1] text-white"
                    : "hover:bg-[#e8d3ec] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("jd")}
              >
                <BsWindow size={20} />
              </Link>
              <span
                className={`text-xs font-semibold text-center cursor-pointer ${
                  activeNavItem === "jd" ? "text-[#9025a1]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpHead/jd")}
              >
                JD Dashboard
              </span>
            </div>

            {/* Notification */}
            <div className="flex flex-col items-center w-full mb-9">
              <Link
                href="/placementOpHead/notification"
                className="cursor-pointer flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#e8d3ec] hover:text-black rounded-2xl"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                <MdOutlineNotifications size={20} />
              </Link>
              <span className="cursor-pointer text-xs font-semibold text-[#49454f] mb-2">
                Notification
              </span>
            </div>

            {/* Settings */}
            <div className="flex flex-col items-center w-full mb-9">
              <Link
                href="/placementOpHead/settings"
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "settings"
                    ? "bg-[#9025a1] text-white"
                    : "text-black hover:bg-[#e8d3ec] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("settings")}
              >
                <MdOutlineSettings size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer mb-2 ${
                  activeNavItem === "settings"
                    ? "text-[#9025a1]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpHead/settings")}
              >
                Settings
              </span>
            </div>

            {/* Logout */}
            <div className="flex flex-col items-center w-full mb-9">
              <Link
                href="/login"
                className="flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl hover:bg-[#e8d3ec] text-black"
              >
                <TbLogout2 size={20} />
              </Link>
              <span className="text-xs font-semibold mb-2 text-[#49454f]">
                Logout
              </span>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-16 left-0 w-full bg-[#d3a8d9] z-30 p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {/* Home */}
            <Link
              href="/placementOpHead/ophome"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "home"
                  ? "bg-[#9025a1] text-white"
                  : "text-black hover:bg-[#e8d3ec]"
              }`}
              onClick={() => handleNavItemClick("home")}
            >
              <LuLayoutGrid size={20} className="mr-3" />
              <span>Home</span>
            </Link>

            {/* TL */}
            <Link
              href="/placementOpHead/tl"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "tl"
                  ? "bg-[#9025a1] text-white"
                  : "text-black hover:bg-[#e8d3ec]"
              }`}
              onClick={() => handleNavItemClick("tl")}
            >
              <MdOutlineGroups size={20} className="mr-3" />
              <span>TL</span>
            </Link>

            {/* JD Dashboard */}
            <Link
              href="/placementOpHead/jd"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "jd"
                  ? "bg-[#9025a1] text-white"
                  : "text-black hover:bg-[#e8d3ec]"
              }`}
              onClick={() => handleNavItemClick("jd")}
            >
              <BsWindow size={20} className="mr-3" />
              <span>JD Dashboard</span>
            </Link>

            {/* Notification */}
            <Link
              href="/placementOpHead/notification"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#e8d3ec]"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <MdOutlineNotifications size={20} className="mr-3" />
              <span>Notification</span>
            </Link>

            {/* Settings */}
            <Link
              href="/placementOpHead/settings"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "settings"
                  ? "bg-[#9025a1] text-white"
                  : "text-black hover:bg-[#e8d3ec]"
              }`}
              onClick={() => handleNavItemClick("settings")}
            >
              <MdOutlineSettings size={20} className="mr-3" />
              <span>Settings</span>
            </Link>

            {/* Logout */}
            <Link
              href="/login"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#e8d3ec]"
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

export default Navbar;
