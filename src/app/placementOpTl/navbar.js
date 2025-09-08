// placementOpTl/navbar.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { SiAlwaysdata } from "react-icons/si";
import { usePathname, useRouter } from "next/navigation";
import { useDataContext } from "../context/dataContext";
import { RiUserLocationLine } from "react-icons/ri";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("");
  const { firstLetterUser } = useDataContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (
      pathname === "/placementOpTl/tlHome" ||
      pathname === "/placementOpTl/tlHome/"
    ) {
      setActiveNavItem("home");
    } else if (pathname === "/placementOpTl/placement") {
      setActiveNavItem("placement");
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
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#fff2cc] z-40 flex items-center justify-between p-3">
        <button
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
          onClick={() => router.push("/placementOpTl/tlHome")}
        >
          {firstLetterUser}
        </button>
        <button onClick={toggleMobileMenu} className="p-2">
          <GiHamburgerMenu size={24} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[72px] bg-[#fff2cc] flex-col justify-between items-center z-30">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full mb-12 mt-7">
            <button
              className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
              onClick={() => router.push("/placementOpTl/tlHome")}
            >
              {firstLetterUser}
            </button>
          </div>

          <nav className="flex flex-col items-center w-full">
            {/* Home */}
            <div className="flex flex-col items-center w-full mb-12">
              <Link
                href="/placementOpTl/tlHome"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "home"
                    ? "bg-[#e6a901] text-white"
                    : "hover:bg-[#ffde80] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("home")}
              >
                <LuLayoutGrid size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "home" ? "text-[#e6a901]" : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpTl/tlHome")}
              >
                Home
              </span>
            </div>

            {/* Placement (replaced TL) */}
            <div className="flex flex-col items-center w-full mb-12">
              <Link
                href="/placementOpTl/placement"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "placement"
                    ? "bg-[#e6a901] text-white"
                    : "hover:bg-[#ffde80] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("placement")}
              >
                <RiUserLocationLine size={20} />{" "}
                {/* Changed icon to SiAlwaysdata */}
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer ${
                  activeNavItem === "placement"
                    ? "text-[#e6a901]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpTl/placement")}
              >
                Placement
              </span>
            </div>

            {/* Notification */}
            <div className="flex flex-col items-center w-full mb-12">
              <Link
                href="/placementOpTl/notification"
                className="cursor-pointer flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#ffde80] hover:text-black rounded-2xl"
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
            <div className="flex flex-col items-center w-full mb-12">
              <Link
                href="/placementOpTl/settings"
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${
                  activeNavItem === "settings"
                    ? "bg-[#e6a901] text-white"
                    : "text-black hover:bg-[#ffde80] hover:text-black"
                }`}
                onClick={() => handleNavItemClick("settings")}
              >
                <MdOutlineSettings size={20} />
              </Link>
              <span
                className={`text-xs font-semibold cursor-pointer mb-2 ${
                  activeNavItem === "settings"
                    ? "text-[#e6a901]"
                    : "text-[#49454f]"
                }`}
                onClick={() => router.push("/placementOpTl/settings")}
              >
                Settings
              </span>
            </div>

            {/* Logout */}
            <div className="flex flex-col items-center w-full mb-12">
              <Link
                href="/login"
                className="flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl hover:bg-[#ffde80] text-black"
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
          className="md:hidden fixed top-16 left-0 w-full bg-[#fff2cc] z-30 p-4 shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            {/* Home */}
            <Link
              href="/placementOpTl/tlHome"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "home"
                  ? "bg-[#e6a901] text-white"
                  : "text-black hover:bg-[#ffde80]"
              }`}
              onClick={() => handleNavItemClick("home")}
            >
              <LuLayoutGrid size={20} className="mr-3" />
              <span>Home</span>
            </Link>

            {/* Placement (replaced TL) */}
            <Link
              href="/placementOpTl/placement"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "placement"
                  ? "bg-[#e6a901] text-white"
                  : "text-black hover:bg-[#ffde80]"
              }`}
              onClick={() => handleNavItemClick("placement")}
            >
              <RiUserLocationLine size={20}  className="mr-3" />
             
              <span>Placement</span>
            </Link>

            {/* Notification */}
            <Link
              href="/placementOpTl/notification"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#ffde80]"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <MdOutlineNotifications size={20} className="mr-3" />
              <span>Notification</span>
            </Link>

            {/* Settings */}
            <Link
              href="/placementOpTl/settings"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeNavItem === "settings"
                  ? "bg-[#e6a901] text-white"
                  : "text-black hover:bg-[#ffde80]"
              }`}
              onClick={() => handleNavItemClick("settings")}
            >
              <MdOutlineSettings size={20} className="mr-3" />
              <span>Settings</span>
            </Link>

            {/* Logout */}
            <Link
              href="/login"
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#ffde80]"
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
