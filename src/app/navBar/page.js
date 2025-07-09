"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineGroups, MdOutlineSettings, MdOutlineNotifications } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSubNav, setShowSubNav] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('');
  const [prevPath, setPrevPath] = useState('');

  // Set initial active state based on current pathname
  useEffect(() => {
    if (pathname === '/home') {
      setActiveNavItem('home');
      setShowSubNav(false);
    } else if (pathname === '/student') {
      setActiveNavItem('student');
      setShowSubNav(false);
    } else if (pathname === '/seting') {
      setActiveNavItem('settings');
      setShowSubNav(false);
    } else if (pathname === '/batches') {
      setActiveNavItem('batches');
      setShowSubNav(true);
    } else {
      setShowSubNav(false);
    }
    setPrevPath(pathname);
  }, [pathname]);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    setShowSubNav(false);
    setActiveSubNav(null);
  };

  const handleBatchesClick = () => {
    setActiveNavItem('batches');
    if (pathname !== '/batches') {
      router.push('/batches');
    }
    // Do NOT setShowSubNav here! Let useEffect handle submenu visibility.
    setActiveSubNav(null);
  };

  const handleSubNavClick = (subNavItem) => {
    setActiveSubNav(subNavItem);
    // Submenu stays open; do NOT setShowSubNav(false)
    if (pathname !== '/batches') router.push('/batches');
  };

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen w-10 md:w-20 bg-[#EADDFF] flex flex-col justify-between items-center z-30">
        <div className="flex flex-col items-center w-full">
          <div className='mt-5 mb-3'>
            <button className="mb-2 p-2 rounded-lg">
              <GiHamburgerMenu size={20} className="text-black" />
            </button>
          </div>
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
        <div className="flex flex-col items-center w-full mb-15">
          <div className="flex flex-col items-center w-full mb-5">
            <button 
              className="flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#e0ccff] hover:text-black rounded-2xl transition-colors"
              onClick={() => {
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
                setShowSubNav(false);
                setActiveSubNav(null);
              }}
            >
              A
            </button>
          </div>
        </div>
      </aside>
      {/* Sub Nav */}
      <div
        className={`fixed top-0 left-10 md:left-20 h-screen bg-[#efe6ff] transition-all duration-300 z-20 ${showSubNav ? 'w-50 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-start mt-20">
          <button
            className={`flex items-center mx-2 ps-1 pe-9 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'fullstack' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('fullstack')}
          >
            <Image
              src='/computer.png'
              alt="Computer Icon"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="font-bold text-[10px] text-[#49454F]">Full Stack Development</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-7 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'dataanalytics' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]' }`}
            onClick={() => handleSubNavClick('dataanalytics')}
          >
            <Image
              src='/bar_chart_4_bars.png'
              alt="Data Analytics Icon"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="font-bold text-[10px] text-[#49454F]">Data Analytics & Science</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-2 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'banking' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('banking')}
          >
            <Image
              src='/account_balance.png'
              alt="Banking Icon"
              width={15}
              height={15}
              className="object-contain"
            /> 
            <span className="font-bold text-[10px] text-[#49454F]">Banking & Financial Services</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-17 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'marketing' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('marketing')}
          >
            <Image
              src='/ad.png'
              alt="Marketing Icon"
              width={15}
              height={15}
              className="object-contain"
            />          
            <span className="font-bold text-[10px] text-[#49454F]">Digital Marketing</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-30 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'sap' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('sap')}
          >
            <Image
              src='/device_hub.png'
              alt="SAP Icon"
              width={15}
              height={15}
              className="object-contain"
            />  
            <span className="font-bold text-[10px] text-[#49454F]">SAP</span>
          </button>
        </div>
        <div className="flex flex-col items-start mt-2">
          <button
            className={`flex items-center mx-2 ps-1 pe-27 py-2 rounded-md transition-colors font-semibold  gap-2 ${activeSubNav === 'devops' ? 'bg-[#be99ff] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
            onClick={() => handleSubNavClick('devops')}
          >
            <Image
              src='/deployed_code_history.png'
              alt="DevOps Icon"
              width={15}
              height={15}
              className="object-contain"
            />
            <span className="font-bold text-[10px] text-[#49454F]">DevOps</span>
          </button>
        </div>
      </div>
    </>
  );
}