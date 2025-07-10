"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi"; //hamburger icon
import { LuLayoutGrid } from "react-icons/lu"; //home icon
import { MdOutlineGroups } from "react-icons/md"; //batch icon
import { MdOutlineSettings } from "react-icons/md"; //settings icon
import { MdOutlineNotifications } from "react-icons/md"; //notification icon
import { RiGraduationCapLine } from "react-icons/ri"; //graduation icon
import { usePathname, useRouter } from 'next/navigation';
import { useDataContext } from '../context/dataContext';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSubNav, setShowSubNav] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('');

  //access the datacontext variable
   const { setBatchingValue ,firstLetterUser } = useDataContext();
  // Set initial active state based on current pathname
  useEffect(() => {
    if (pathname === '/home') {
      setActiveNavItem('home');
      setShowSubNav(false); // Close sub-nav when on other pages
    } else if (pathname === '/student') {
      setActiveNavItem('student');
      setShowSubNav(false); // Close sub-nav when on other pages
    } else if (pathname === '/seting') {
      setActiveNavItem('settings');
      setShowSubNav(false); // Close sub-nav when on other pages
    } else if (pathname === '/batches') {
      setActiveNavItem('batches');
      setShowSubNav(true);
      
    } else if (pathname === '/showbatches') {
      setActiveNavItem('batches');
      setShowSubNav(true);
    } 
    else {
      // For any other page, close sub-nav
      setShowSubNav(false);
    }
  }, [pathname]);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    // setShowSubNav(false);
    setActiveSubNav(null);
  };

  const handleBatchesClick = () => {
    setActiveNavItem('batches');
    // setShowSubNav((prev) => !prev);
    if (showSubNav) {
      setActiveSubNav(null);
    }
    router.push('/showbatches');
  };

  const handleSubNavClick = (subNavItem) => {
    setActiveSubNav(subNavItem);
    setBatchingValue(subNavItem)
    router.push('/batches');
  };

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen w-10 md:w-20 bg-[#eaddff] flex flex-col justify-between items-center z-30">
        {/* Top: Menu Icon */}
        <div className="flex flex-col items-center w-full">
          {/* Menu Icon (Hamburger) */}
          <div className='mt-5 mb-3'>
              <button className="mb-2 p-2 rounded-lg">
            <GiHamburgerMenu size={20} className="text-black" />
          </button>
          </div>
          {/* Navigation Icons */}
          <nav className="flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full mb-5">
              <Link 
                href="/home" 
                className={`flex flex-col items-center text-black mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'home' ? 'bg-[#6750A4] text-white' : 'hover:bg-[#e0ccff] hover:text-black'}`}
                onClick={() => handleNavItemClick('home')}
              >
                <LuLayoutGrid size={20} />
              </Link>
              <span className="text-xs font-semibold text-[#49454F]">Home</span>
            </div>
            <div className="flex flex-col items-center w-full mb-5">
              <button
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'batches' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
                 onClick={handleBatchesClick}
              >
                <MdOutlineGroups size={20} />
              </button>
              <span className="text-xs font-semibold text-[#49454F]">Batches</span>
            </div>
            <div className="flex flex-col items-center w-full mb-5">
              <Link 
                href="/student" 
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'student' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
                onClick={() => handleNavItemClick('student')}
              >
                <RiGraduationCapLine size={20} />
              </Link>
              <span className="text-xs font-semibold text-[#49454F]">Student</span>
            </div>
          </nav>
        </div>
        {/* Bottom: Notification, Settings, User Avatar */}
        <div className="flex flex-col items-center w-full mb-15">
          <div className="flex flex-col items-center w-full mb-5">
              <button 
                className="flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#e0ccff] hover:text-black rounded-2xl transition-colors"
                onClick={() => {
                  // Close sub-nav when clicking notification
                  setShowSubNav(false);
                  setActiveSubNav(null);
                }}
              >
              <MdOutlineNotifications size={20} />
            </button>
            <span className="text-xs font-semibold text-[#49454F] mb-2">Notification</span>
          </div>
          <div className="flex flex-col items-center w-full mb-5">
              <Link 
                href="/seting" 
                className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors ${activeNavItem === 'settings' ? 'bg-[#6750A4] text-white' : 'text-black hover:bg-[#e0ccff] hover:text-black'}`}
                onClick={() => handleNavItemClick('settings')}
              >
              <MdOutlineSettings size={20} />
            </Link>
            <span className="text-xs font-semibold text-[#49454F] mb-2">Settings</span>
          </div>
          <div className="flex flex-col items-center w-full mb-5">
              <button 
                className="flex flex-col items-center mb-2 px-3.5 py-1 bg-black text-white rounded-2xl w-10 h-10 justify-center font-bold text-lg"
                onClick={() => {
                  // Close sub-nav when clicking user avatar
                  setShowSubNav(false);
                  setActiveSubNav(null);
                }}
              >
              {firstLetterUser}
            </button>
          </div>
        </div>
      </aside>


      {/* Sub Nav */}
      <div
        className={`fixed top-0 left-10 md:left-20 h-screen bg-[#efeeff] transition-all duration-300 z-20 ${showSubNav ? 'w-50 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-start mt-20">
          <button
            className={`flex items-center mx-2 ps-1 pe-9 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'fullstack' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('fullstack')}
          >
            <Image
              src='/computer.svg'
              alt="Computer Icon"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className={`font-bold text-[10px] ${activeSubNav === 'fullstack' ? 'text-black' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}
                
            >Full Stack Development</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-7 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'dataanalytics' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]' }`}
            onClick={() => handleSubNavClick('dataanalytics')}
          >
            <Image
              src='/bar_chart_4_bars.svg'
              alt="Data Analytics Icon"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className={`font-bold text-[10px] ${activeSubNav === 'dataanalytics' ? 'text-black' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Data Analytics & Science</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-2 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'banking' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('banking')}
          >
            <Image
              src='/account_balance.svg'
              alt="Banking Icon"
              width={15}
              height={15}
              className="object-contain"
            /> <span className={`font-bold text-[10px] ${activeSubNav === 'banking' ? 'text-black' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Banking & Financial Services</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-17 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'marketing' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('marketing')}
          >
            <Image
              src='/ad.svg'
              alt="Marketing Icon"
              width={15}
              height={15}
              className="object-contain"
            />          <span className={`font-bold text-[10px] ${activeSubNav === 'marketing' ? 'text-black' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>Digital Marketing</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-30 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'sap' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('sap')}
          >
            <Image
              src='/device_hub.svg'
              alt="SAP Icon"
              width={15}
              height={15}
              className="object-contain"
            />  <span className={`font-bold text-[10px] ${activeSubNav === 'sap' ? 'text-black' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>SAP</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-27 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'devops' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('devops')}
          >
            <Image
              src='/deployed_code_history.svg'
              alt="DevOps Icon"
              width={15}
              height={15}
              className="object-contain"
            /><span className={`font-bold text-[10px] ${activeSubNav === 'devops' ? 'text-black' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>DevOps</span>
          </button>
        </div>
      </div>
    </>
  );
}