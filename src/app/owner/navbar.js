// owner/navbar.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation";
import { useDataContext } from "../context/dataContext";
import {
  RiUserLocationLine,
  RiBarChart2Line,
  RiFileList2Line,
} from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { IoIosOptions } from "react-icons/io";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("");
  const { firstLetterUser } = useDataContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (pathname === "/owner/dashboard" || pathname === "/owner/dashboard/") {
      setActiveNavItem("dashboard");
    } else if (pathname === "/owner/reports") {
      setActiveNavItem("reports");
    } else if (pathname === "/owner/epic") {
      setActiveNavItem("epic");
    } else if (pathname === "/owner/placement") {
      // 👈 Added
      setActiveNavItem("placement");
    } else if (pathname === "/owner/settings") {
      setActiveNavItem("settings");
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
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#c3c89d] z-40 flex items-center justify-between p-3">
        <button
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
          onClick={() => router.push("/owner/dashboard")}
        >
          {firstLetterUser}
        </button>
        <button onClick={toggleMobileMenu} className="p-2">
          <GiHamburgerMenu size={24} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[72px] bg-[#c3c89d] flex-col justify-between items-center z-30">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full mb-6 mt-7">
            <button
              className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
              onClick={() => router.push("/owner/dashboard")}
            >
              {firstLetterUser}
            </button>
          </div>

          <nav className="flex flex-col items-center w-full">
            {/* Dashboard */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/dashboard"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "dashboard"
                    ? "bg-[#868d07] text-white"
                    : "hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("dashboard")}
              >
                <LuLayoutGrid size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "dashboard"
                    ? "text-[#868d07]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/dashboard")}
              >
                Dashboard
              </span>
            </div>

            {/* Reports */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/reports"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "reports"
                    ? "bg-[#868d07] text-white"
                    : "hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("reports")}
              >
                <RiBarChart2Line size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "reports"
                    ? "text-[#868d07]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/reports")}
              >
                Reports
              </span>
            </div>

            {/* Epic */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/epic"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "epic"
                    ? "bg-[#868d07] text-white"
                    : "hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("epic")}
              >
                <RiFileList2Line size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "epic" ? "text-[#868d07]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/epic")}
              >
                Epic
              </span>
            </div>

            {/* 👇 Placement — NEW */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/placement"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "placement"
                    ? "bg-[#868d07] text-white"
                    : "hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("placement")}
              >
                <RiUserLocationLine size={20} />{" "}
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "placement"
                    ? "text-[#868d07]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/placement")}
              >
                Placement
              </span>
            </div>

            {/* 👇 User - CURD */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/users"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "users"
                    ? "bg-[#868d07] text-white"
                    : "hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("users")}
              >
                <HiUsers size={20} />{" "}
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "users"
                    ? "text-[#868d07]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/users")}
              >
                Users
              </span>
            </div>

            {/* 👇 Utilty - CURD */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/utility"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "utility"
                    ? "bg-[#868d07] text-white"
                    : "hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("utility")}
              >
                <IoIosOptions size={20} />{" "}
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "utility"
                    ? "text-[#868d07]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/utility")}
              >
                utility
              </span>
            </div>

            {/* Notification */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/notification"
                className="cursor-pointer flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#9dae11] hover:text-black rounded-2xl"
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
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/owner/settings"
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "settings"
                    ? "bg-[#868d07] text-white"
                    : "text-black hover:bg-[#9dae11] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("settings")}
              >
                <MdOutlineSettings size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer mb-2 ${
                  activeNavItem === "settings"
                    ? "text-[#868d07]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/owner/settings")}
              >
                Settings
              </span>
            </div>

            {/* Logout */}
            <div className="flex flex-col items-center w-full mb-2">
              <Link
                href="/login"
                className="flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl hover:bg-[#9dae11] text-black"
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
          className="md:hidden fixed top-16 left-0 w-full bg-[#c3c89d] z-30 p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {/* Dashboard */}
            <Link
              href="/owner/dashboard"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "dashboard"
                  ? "bg-[#868d07] text-white"
                  : "text-black hover:bg-[#9dae11]"
              }`}
              onClick={() => handleNavItemClick("dashboard")}
            >
              <LuLayoutGrid size={20} className="mr-3" />
              <span>Dashboard</span>
            </Link>

            {/* Reports */}
            <Link
              href="/owner/reports"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "reports"
                  ? "bg-[#868d07] text-white"
                  : "text-black hover:bg-[#9dae11]"
              }`}
              onClick={() => handleNavItemClick("reports")}
            >
              <RiBarChart2Line size={20} className="mr-3" />
              <span>Reports</span>
            </Link>

            {/* Epic */}
            <Link
              href="/owner/epic"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "epic"
                  ? "bg-[#868d07] text-white"
                  : "text-black hover:bg-[#9dae11]"
              }`}
              onClick={() => handleNavItemClick("epic")}
            >
              <RiFileList2Line size={20} className="mr-3" />
              <span>EPIC</span>
            </Link>

            {/* 👇 Placement — NEW */}
            <Link
              href="/owner/placement"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "placement"
                  ? "bg-[#868d07] text-white"
                  : "text-black hover:bg-[#9dae11]"
              }`}
              onClick={() => handleNavItemClick("placement")}
            >
              <RiUserLocationLine size={20} className="mr-3" />
              <span>Placement</span>
            </Link>

            {/* Notification */}
            <Link
              href="/owner/notification"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#9dae11]"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <MdOutlineNotifications size={20} className="mr-3" />
              <span>Notification</span>
            </Link>

            {/* Settings */}
            <Link
              href="/owner/settings"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "settings"
                  ? "bg-[#868d07] text-white"
                  : "text-black hover:bg-[#9dae11]"
              }`}
              onClick={() => handleNavItemClick("settings")}
            >
              <MdOutlineSettings size={20} className="mr-3" />
              <span>Settings</span>
            </Link>

            {/* Logout */}
            <Link
              href="/login"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#9dae11]"
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
