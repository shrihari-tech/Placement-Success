"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiChevronDown } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
// Import the new icon
import { SiAlwaysdata } from "react-icons/si";
// Import SME icon
import { RiUserLocationLine } from "react-icons/ri";
import { usePathname, useRouter } from 'next/navigation';
import { useDataContext } from '../context/dataContext';
import { TbLogout2 } from "react-icons/tb";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSubNav, setShowSubNav] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('');
  const [whatHoverSubNav, setWhatHoverSubNav] = useState(""); // 'batches', 'student', 'data', or 'sme'
  const [isBatchesHovered, setIsBatchesHovered] = useState(false); // Used for all hover interactions
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubNav, setMobileSubNav] = useState(false); // For Student mobile subnav
  const [mobileDataSubNavOpen, setMobileDataSubNavOpen] = useState(false); // For Data mobile subnav
  const [mobileSMESubNavOpen, setMobileSMESubNavOpen] = useState(false); // For SME mobile subnav

  const mobileMenuRef = useRef(null);
  const { setBatchingValue, firstLetterUser, setStudentBatchSelect } = useDataContext();

  useEffect(() => {
    const storedSubNav = localStorage.getItem('activeSubNav');
    if (storedSubNav) {
      setActiveSubNav(storedSubNav);
      setBatchingValue(storedSubNav);
      setStudentBatchSelect(storedSubNav);
    }
    if (pathname === '/home') {
      setActiveNavItem('home');
      setShowSubNav(false);
    } else if (pathname === '/student') {
      setActiveNavItem('student');
      setShowSubNav(false);
    } else if (pathname === '/seting') { // Assuming typo in original code: '/seting'
      setActiveNavItem('settings');
      setShowSubNav(false);
    } else if (pathname === '/batches') {
      setActiveNavItem('batches');
      setShowSubNav(false);
    } else if (pathname === '/SME') {
      setActiveNavItem('sme');
      setShowSubNav(false);
    } else {
      // Check if pathname is under /data/...
      if (pathname.startsWith('/data')) {
        setActiveNavItem('data');
        setShowSubNav(false);
      } else {
        setShowSubNav(false);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      localStorage.setItem('activeSubNav', '');
    }
  }, []);

  // Close mobile menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavItemClick = (navItem) => {
    // Immediate state updates
    setActiveNavItem(navItem);
    setMobileMenuOpen(false);
    // Force immediate re-render
    React.startTransition(() => {
      setActiveNavItem(navItem);
    });
  };

  const handleSubNavClick = (subNavItem) => {
    // Immediate state updates in batch
    React.startTransition(() => {
      setActiveSubNav(subNavItem);
      setBatchingValue(subNavItem);
      setMobileMenuOpen(false);
    });
    // Synchronous localStorage update
    localStorage.setItem('activeSubNav', subNavItem);
    router.push('/batches');
  };

  const handleStudentSubNav = (subNavItem) => {
    // Immediate state updates in batch
    React.startTransition(() => {
      setStudentBatchSelect(subNavItem);
      setActiveSubNav(subNavItem);
      setMobileMenuOpen(false);
    });
    // Synchronous localStorage update
    localStorage.setItem('activeSubNav', subNavItem);
    router.push('/student');
  };

  // Handler for the new Data sub-navigation item
  const handleDataSubNavClick = (subNavItem) => {
    // Immediate state updates in batch
    React.startTransition(() => {
      setActiveSubNav(subNavItem);
      setMobileMenuOpen(false);
    });
    // Synchronous localStorage update
    localStorage.setItem('activeSubNav', subNavItem);
    router.push('/data');
  };

  // Handler for the new SME sub-navigation item - Updated to match Batches and Student behavior
  const handleSMESubNavClick = (subNavItem) => {
    // Immediate state updates in batch - matching Batches and Student pattern
    React.startTransition(() => {
      setActiveSubNav(subNavItem);
      setBatchingValue(subNavItem); // Added to match Batches behavior
      setStudentBatchSelect(subNavItem); // Added to match Student behavior
      setMobileMenuOpen(false);
    });
    // Synchronous localStorage update
    localStorage.setItem('activeSubNav', subNavItem);
    router.push('/SME');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleBatchesClick = () => {
    if (window.innerWidth < 768) {
      setShowSubNav((prev) => !prev); // Toggle the showSubNav state
    }
  };

  const handleStudentClick = () => {
    if (window.innerWidth < 768) {
      setMobileSubNav((prev) => !prev); // Toggle the student mobile subnav
    }
  };

  // Handler for toggling the Data mobile sub-menu
  const handleDataClick = () => {
    if (window.innerWidth < 768) {
      setMobileDataSubNavOpen((prev) => !prev); // Toggle the data mobile subnav
    }
  };

  // Handler for toggling the SME mobile sub-menu
  const handleSMEClick = () => {
    if (window.innerWidth < 768) {
      setMobileSMESubNavOpen((prev) => !prev); // Toggle the SME mobile subnav
    }
  };

  // Immediate hover handlers for desktop
  const handleMouseEnterBatches = () => {
    setIsBatchesHovered(true);
    setWhatHoverSubNav("batches");
  };

  const handleMouseEnterStudent = () => {
    setIsBatchesHovered(true);
    setWhatHoverSubNav("student");
  };

  const handleMouseEnterSME = () => {
    setIsBatchesHovered(true);
    setWhatHoverSubNav("sme");
  };

  const handleMouseEnterData = () => {
    setIsBatchesHovered(true);
    setWhatHoverSubNav("data");
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#eaddff] z-40 flex items-center justify-between p-3">
        <button
          className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-2xl font-bold text-lg"
          onClick={() => router.push('/home')}
        >
          {firstLetterUser}
        </button>

        <button onClick={toggleMobileMenu} className="p-2">
          <GiHamburgerMenu size={24} />
        </button>
      </header>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[72px] bg-[#eaddff] flex-col justify-between items-center z-30">
        {/* Top: Menu Icon */}
        <div className="flex flex-col items-center w-full">
          {/* User Avatar */}
          <div className="flex flex-col items-center w-full mb-10 mt-7">
            <button
              className="flex flex-col items-center mb-2 px-3.5 py-1 bg-black text-white rounded-2xl w-10 h-10 justify-center font-bold text-lg"
              onClick={() => {
                setShowSubNav(false);
                setActiveNavItem(''); // Clear active item if clicking avatar
              }}
            >
              {firstLetterUser}
            </button>
          </div>
          {/* Navigation Icons */}
          <nav className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full mb-5" onClick={() => router.push('/home')}>
              <Link
                href="/home"
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'home' ? 'bg-[#6750A4] text-white' : 'hover:bg-[#e0ccff] hover:text-black'}`}
                onClick={() => handleNavItemClick('home')}
              >
                <LuLayoutGrid size={20} />
              </Link>
              <span className={`text-xs font-semibold cursor-pointer ${activeNavItem === 'home' ? 'text-[#9585bf]' : 'text-[#49454f]'}`}
                onClick={() => router.push('/home')}>Home</span>
            </div>
            <div
              className="flex flex-col items-center w-full mb-5"
              onMouseEnter={handleMouseEnterBatches}
              onMouseLeave={() => {
                // Removed setIsBatchesHovered(false) here to keep subnav open if hovering over it
              }}
            >
              <button
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'batches' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
              >
                <MdOutlineGroups size={20} />
              </button>
              <span className={`text-xs font-semibold cursor-pointer ${activeNavItem === 'batches' ? 'text-[#9585bf]' : 'text-[#49454f]'}`}>Batches</span>
            </div>
            <div className="flex flex-col items-center w-full mb-5"
              onMouseEnter={handleMouseEnterStudent}
              onMouseLeave={() => {
                // Removed setIsBatchesHovered(false) here to keep subnav open if hovering over it
              }}
            >
              <button
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'student' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
                onClick={() => handleNavItemClick('student')}
              >
                <RiGraduationCapLine size={20} />
              </button>
              <span className={`text-xs font-semibold cursor-pointer ${activeNavItem === 'student' ? 'text-[#9585bf]' : 'text-[#49454f]'}`}
              >Student</span>
            </div>
            {/* New SME Icon */}
            <div
              className="flex flex-col items-center w-full mb-5"
              onMouseEnter={handleMouseEnterSME}
              onMouseLeave={() => {
                // Removed setIsBatchesHovered(false) here to keep subnav open if hovering over it
              }}
            >
              <button
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'sme' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
                onClick={() => {
                    handleNavItemClick('sme');
                }}
              >
                <RiUserLocationLine  size={20} />
              </button>
              <span className={`text-xs font-semibold cursor-pointer ${activeNavItem === 'sme' ? 'text-[#9585bf]' : 'text-[#49454f]'}`}
              >Placement</span>
            </div>
          </nav>
        </div>
        {/* Bottom: Notification, Settings */}
        <div className="flex flex-col items-center w-full mb-25">
          <div className="flex flex-col items-center w-full mb-5">
            <button
              className="flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#e0ccff] hover:text-black rounded-2xl transition-colors cursor-pointer"
              onClick={() => {
                setShowSubNav(false);
                setActiveNavItem(''); // Clear active item if clicking notification
              }}
            >
              <MdOutlineNotifications size={20} />
            </button>
            <span className="text-xs font-semibold cursor-pointer text-[#49454f] mb-2">Notification</span>
          </div>
          <div className="flex flex-col items-center w-full mb-5" onClick={() => router.push('/seting')}>
            <Link
              href="/seting"
              className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'settings' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
              onClick={() => { handleNavItemClick('settings'); }}
            >
              <MdOutlineSettings size={20} />
            </Link>
            <span className={`text-xs font-semibold cursor-pointer mb-2 ${activeNavItem === 'settings' ? 'text-[#9585bf]' : 'text-[#49454f]'}`}
              onClick={() => router.push('/seting')}>Settings</span>
          </div>
          <div className="flex flex-col items-center w-full mb-5">
            <Link
              href="/"
              className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors hover:bg-[#e0ccff]`}
              onClick={() => {
                // Optional: Clear states on logout
                setActiveNavItem('');
                setActiveSubNav('');
                localStorage.removeItem('activeSubNav');
              }}
            >
              <TbLogout2 size={20} />
            </Link>
            <span className={`text-xs font-semibold cursor-pointer mb-2`}
              onClick={() => router.push('/')}>Logout</span>
          </div>
        </div>
      </aside>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden fixed top-16 left-0 w-full bg-[#eaddff] z-30 p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/home"
              className={`flex items-center px-4 py-2 rounded-lg ${activeNavItem === 'home' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff]'}`}
              onClick={() => handleNavItemClick('home')}
            >
              <LuLayoutGrid size={20} className="mr-3" />
              <span>Home</span>
            </Link>
            <div className="flex flex-col">
              <button
                className={`flex items-center px-4 py-2 rounded-lg ${activeNavItem === 'batches' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff]'}`}
                onClick={handleBatchesClick}
              >
                <MdOutlineGroups size={20} className="mr-3" />
                <span>Batches</span><FiChevronDown className="absolute right-8 " size={25} />
              </button>

              {showSubNav && (
                <div className="pl-8 mt-2 space-y-2">
                  {/* Full Stack Development */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'fullstack' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'fullstack';
                      handleSubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/computer.svg'
                      alt="Computer Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Full Stack Development
                  </button>
                  {/* Data Analytics & Science */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'dataanalytics' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'dataanalytics';
                      handleSubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/bar_chart_4_bars.svg'
                      alt="Data Analytics Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Data Analytics & Science
                  </button>
                  {/* Banking & Financial Services */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'banking' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'banking';
                      handleSubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/account_balance.svg'
                      alt="Banking Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Banking & Financial Services
                  </button>
                  {/* Digital Marketing */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'marketing' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'marketing';
                      handleSubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/ad.svg'
                      alt="Marketing Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Digital Marketing
                  </button>
                  {/* SAP */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'sap' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'sap';
                      handleSubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/device_hub.svg'
                      alt="SAP Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    SAP
                  </button>
                  {/* DevOps */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'devops' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'devops';
                      handleSubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/deployed_code_history.svg'
                      alt="DevOps Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    DevOps
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <button
                className={`flex items-center px-4 py-2 rounded-lg ${activeNavItem === 'student' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff]'}`}
                onClick={handleStudentClick}
              >
                <RiGraduationCapLine size={20} className="mr-3" />
                <span>Student</span><FiChevronDown className="absolute right-8 " size={25} />
              </button>

              {mobileSubNav && (
                <div className="pl-8 mt-2 space-y-2">
                  {/* Full Stack Development */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'fullstack' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'fullstack';
                      handleStudentSubNav(subNavKey);
                    }}
                  >
                    <Image
                      src='/computer.svg'
                      alt="Computer Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Full Stack Development
                  </button>
                  {/* Data Analytics & Science */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'dataanalytics' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'dataanalytics';
                      handleStudentSubNav(subNavKey);
                    }}
                  >
                    <Image
                      src='/bar_chart_4_bars.svg'
                      alt="Data Analytics Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Data Analytics & Science
                  </button>
                  {/* Banking & Financial Services */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'banking' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'banking';
                      handleStudentSubNav(subNavKey);
                    }}
                  >
                    <Image
                      src='/account_balance.svg'
                      alt="Banking Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Banking & Financial Services
                  </button>
                  {/* Digital Marketing */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'marketing' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'marketing';
                      handleStudentSubNav(subNavKey);
                    }}
                  >
                    <Image
                      src='/ad.svg'
                      alt="Marketing Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Digital Marketing
                  </button>
                  {/* SAP */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'sap' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'sap';
                      handleStudentSubNav(subNavKey);
                    }}
                  >
                    <Image
                      src='/device_hub.svg'
                      alt="SAP Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    SAP
                  </button>
                  {/* DevOps */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'devops' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'devops';
                      handleStudentSubNav(subNavKey);
                    }}
                  >
                    <Image
                      src='/deployed_code_history.svg'
                      alt="DevOps Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    DevOps
                  </button>
                </div>
              )}
            </div>
            {/* New SME Menu Item for Mobile */}
            <div className="flex flex-col">
              <button
                className={`flex items-center px-4 py-2 rounded-lg ${activeNavItem === 'sme' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff]'}`}
                onClick={handleSMEClick} // Toggle mobile SME subnav
              >
                <RiUserLocationLine  size={20} className="mr-3" />
                <span>Placement</span>
                <FiChevronDown className="absolute right-8" size={25} />
              </button>

              {/* Mobile Sub-menu for SME */}
              {mobileSMESubNavOpen && (
                <div className="pl-8 mt-2 space-y-2">
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'fullstack' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'fullstack';
                      handleSMESubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/computer.svg'
                      alt="Computer Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Full Stack Development
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'dataanalytics' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'dataanalytics';
                      handleSMESubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/bar_chart_4_bars.svg'
                      alt="Data Analytics Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Data Analytics & Science
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'banking' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'banking';
                      handleSMESubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/account_balance.svg'
                      alt="Banking Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Banking & Financial Services
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'marketing' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'marketing';
                      handleSMESubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/ad.svg'
                      alt="Marketing Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    Digital Marketing
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'sap' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'sap';
                      handleSMESubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/device_hub.svg'
                      alt="SAP Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    SAP
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${activeSubNav === 'devops' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const subNavKey = 'devops';
                      handleSMESubNavClick(subNavKey);
                    }}
                  >
                    <Image
                      src='/deployed_code_history.svg'
                      alt="DevOps Icon"
                      width={15}
                      height={15}
                      className="mr-3"
                    />
                    DevOps
                  </button>
                </div>
              )}
            </div>

            <button
              className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-[#e0ccff]"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveNavItem(''); // Clear active item
              }}
            >
              <MdOutlineNotifications size={20} className="mr-3" />
              <span>Notification</span>
            </button>
            <Link
              href="/seting"
              className={`flex items-center px-4 py-2 rounded-lg ${activeNavItem === 'settings' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff]'}`}
              onClick={() => handleNavItemClick('settings')}
            >
              <MdOutlineSettings size={20} className="mr-3" />
              <span>Settings</span>
            </Link>
            <Link
              href="/"
              className={`flex items-center px-4 py-2 rounded-lg`}
              onClick={() => {
                 // Optional: Clear states on logout
                 setActiveNavItem('');
                 setActiveSubNav('');
                 localStorage.removeItem('activeSubNav');
                 setMobileMenuOpen(false); // Close menu on logout click
              }}
            >
              <TbLogout2 size={20} className="mr-3" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      )}
      {/* Desktop Sub Nav - Modified to handle 'sme' hover */}
      <div
        className={`hidden md:block fixed top-0 left-[72px] h-screen bg-[#efeeff] transition-all duration-300 z-20 ${showSubNav || isBatchesHovered ? 'w-50 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
        onMouseEnter={() => {
          setIsBatchesHovered(true);
        }}
        onMouseLeave={() => setIsBatchesHovered(false)}
      >
        {/* Conditional rendering based on whatHoverSubNav */}
        {whatHoverSubNav === "batches" || whatHoverSubNav === "student" || whatHoverSubNav === "sme" ? (
          <>
            {/* Full Stack Development */}
            <div className="flex flex-col items-start mt-20">
              <button
                className={`cursor-pointer flex items-center mx-2 ps-1 pe-9 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'fullstack' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const subNavKey = 'fullstack';
                  if (whatHoverSubNav === 'batches') {
                    handleSubNavClick(subNavKey);
                  } else if (whatHoverSubNav === 'student') {
                    handleStudentSubNav(subNavKey);
                  } else if (whatHoverSubNav === 'sme') {
                    handleSMESubNavClick(subNavKey);
                  }
                }}
              >
                <Image
                  src='/computer.svg'
                  alt="Computer Icon"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span className={`font-bold text-[10px] ${activeSubNav === 'fullstack' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Full Stack Development</span>
              </button>
            </div>
            {/* Data Analytics & Science */}
            <div className="flex flex-col items-start mt-2">
              <button
                className={`cursor-pointer flex items-center mx-2 ps-1 pe-7 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'dataanalytics' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const subNavKey = 'dataanalytics';
                  if (whatHoverSubNav === 'batches') {
                    handleSubNavClick(subNavKey);
                  } else if (whatHoverSubNav === 'student') {
                    handleStudentSubNav(subNavKey);
                  } else if (whatHoverSubNav === 'sme') {
                    handleSMESubNavClick(subNavKey);
                  }
                }}
              >
                <Image
                  src='/bar_chart_4_bars.svg'
                  alt="Data Analytics Icon"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span className={`font-bold text-[10px] ${activeSubNav === 'dataanalytics' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Data Analytics & Science</span>
              </button>
            </div>
            {/* Banking & Financial Services */}
            <div className="flex flex-col items-start mt-2">
              <button
                className={`cursor-pointer flex items-center mx-2 ps-1 pe-2 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'banking' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const subNavKey = 'banking';
                  if (whatHoverSubNav === 'batches') {
                    handleSubNavClick(subNavKey);
                  } else if (whatHoverSubNav === 'student') {
                    handleStudentSubNav(subNavKey);
                  } else if (whatHoverSubNav === 'sme') {
                    handleSMESubNavClick(subNavKey);
                  }
                }}
              >
                <Image
                  src='/account_balance.svg'
                  alt="Banking Icon"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span className={`font-bold text-[10px] ${activeSubNav === 'banking' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Banking & Financial Services</span>
              </button>
            </div>
            {/* Digital Marketing */}
            <div className="flex flex-col items-start mt-2">
              <button
                className={`cursor-pointer flex items-center mx-2 ps-1 pe-17 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'marketing' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const subNavKey = 'marketing';
                  if (whatHoverSubNav === 'batches') {
                    handleSubNavClick(subNavKey);
                  } else if (whatHoverSubNav === 'student') {
                    handleStudentSubNav(subNavKey);
                  } else if (whatHoverSubNav === 'sme') {
                    handleSMESubNavClick(subNavKey);
                  }
                }}
              >
                <Image
                  src='/ad.svg'
                  alt="Marketing Icon"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span className={`font-bold text-[10px] ${activeSubNav === 'marketing' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Digital Marketing</span>
              </button>
            </div>
            {/* SAP */}
            <div className="flex flex-col items-start mt-2">
              <button
                className={`cursor-pointer flex items-center mx-2 ps-1 pe-30 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'sap' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const subNavKey = 'sap';
                  if (whatHoverSubNav === 'batches') {
                    handleSubNavClick(subNavKey);
                  } else if (whatHoverSubNav === 'student') {
                    handleStudentSubNav(subNavKey);
                  } else if (whatHoverSubNav === 'sme') {
                    handleSMESubNavClick(subNavKey);
                  }
                }}
              >
                <Image
                  src='/device_hub.svg'
                  alt="SAP Icon"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span className={`font-bold text-[10px] ${activeSubNav === 'sap' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>SAP</span>
              </button>
            </div>
            {/* DevOps */}
            <div className="flex flex-col items-start mt-2">
              <button
                className={`cursor-pointer flex items-center mx-2 ps-1 pe-27 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'devops' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
                onClick={(e) => {
                  e.preventDefault();
                  const subNavKey = 'devops';
                  if (whatHoverSubNav === 'batches') {
                    handleSubNavClick(subNavKey);
                  } else if (whatHoverSubNav === 'student') {
                    handleStudentSubNav(subNavKey);
                  } else if (whatHoverSubNav === 'sme') {
                    handleSMESubNavClick(subNavKey);
                  }
                }}
              >
                <Image
                  src='/deployed_code_history.svg'
                  alt="DevOps Icon"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span className={`font-bold text-[10px] ${activeSubNav === 'devops' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>DevOps</span>
              </button>
            </div>
          </>
        ) : whatHoverSubNav === "data" ? (
          // Sub-menu for the new "Data" icon
          <div className="flex flex-col items-start mt-20">
             {/* Data Sub-item */}
             <button
               className={`cursor-pointer flex items-center mx-2 ps-1 pe-9 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'data' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
               onClick={(e) => {
                 e.preventDefault();
                 const subNavKey = 'data'; // Unique key for the data item
                 handleDataSubNavClick(subNavKey); // Use the new handler
               }}
             >
               <span className={`font-bold text-[10px] ${activeSubNav === 'data' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Data</span>
             </button>
             {/* Add more data sub-items here if needed in the future */}
           </div>
        ) : null}
      </div>
    </>
  );
}
