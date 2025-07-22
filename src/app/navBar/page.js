"use client";

import React, { useState, useEffect ,useRef  } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { FiChevronDown } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { usePathname, useRouter } from 'next/navigation';
import { useDataContext } from '../context/dataContext';
import { TbLogout2 } from "react-icons/tb";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSubNav, setShowSubNav] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('');
  const [whatHoverSubNav, setWhatHoverSubNav] = useState("");
  const [isBatchesHovered, setIsBatchesHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubNav, setMobileSubNav] = useState(false);
  
   const mobileMenuRef = useRef(null)
  const { setBatchingValue, firstLetterUser , setStudentBatchSelect } = useDataContext();

  useEffect(() => {
    const storedSubNav = localStorage.getItem('activeSubNav');
    if (storedSubNav) {
      setActiveSubNav(storedSubNav);
      setBatchingValue(storedSubNav);
    }

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
      setShowSubNav(false);
    } else {
      setShowSubNav(false);
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
    setActiveNavItem(navItem);
    setMobileMenuOpen(false);
  };

  const handleSubNavClick = (subNavItem) => {
    setActiveSubNav(subNavItem);
    setBatchingValue(subNavItem);
    localStorage.setItem('activeSubNav', subNavItem);
    router.push('/batches');
    setMobileMenuOpen(false);
  };

  const handleStudentSubNav = (subNavItem) => {
    setStudentBatchSelect(subNavItem);
    setActiveSubNav(subNavItem);
    localStorage.setItem('activeSubNav', subNavItem);
    router.push('/student');
    setMobileMenuOpen(false);
  }

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
    setMobileSubNav((prev) => !prev); // Toggle the showSubNav state
  }
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
              onMouseEnter={() => {setIsBatchesHovered(true)
                setWhatHoverSubNav("batches")
              }}
              onMouseLeave={() => {
                setIsBatchesHovered(false)
                
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
              onMouseEnter={() => {setIsBatchesHovered(true)
                setWhatHoverSubNav("student")
              }}
              onMouseLeave={() => {setIsBatchesHovered(false)
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
          </nav>
        </div>

        {/* Bottom: Notification, Settings */}
        <div className="flex flex-col items-center w-full mb-25">
          <div className="flex flex-col items-center w-full mb-5">
            <button
              className="flex flex-col items-center mb-1 px-3.5 py-1 text-black hover:bg-[#e0ccff] hover:text-black rounded-2xl transition-colors cursor-pointer"
              onClick={() => {
                setShowSubNav(false);
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
              onClick={() => {handleNavItemClick('settings')}}
            >
              <MdOutlineSettings size={20} />
            </Link>
            <span className={`text-xs font-semibold cursor-pointer mb-2 ${activeNavItem === 'settings' ? 'text-[#9585bf]' : 'text-[#49454f]'}`}
            onClick={() => router.push('/seting')}>Settings</span>
          </div>
          <div className="flex flex-col items-center w-full mb-5">
            <Link
              href="/"
              className={`flex flex-col items-center mb-1 px-3.5 py-1 rounded-2xl transition-colors
                hover:bg-[#e0ccff]
                `}
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
                  // if (whatHoverSubNav === 'student') {
                  //   handleStudentSubNav(subNavKey);
                  // }
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
                  //   if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  //   if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  //   if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  // if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  // if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
              <MdOutlineGroups size={20} className="mr-3" />
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
                  // handleSubNavClick(subNavKey);
                  // if (whatHoverSubNav === 'student') {
                  //   handleStudentSubNav(subNavKey);
                  // }
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
                  //   if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  //   if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  //   if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  // if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
                  // if(whatHoverSubNav === 'batches') {
                  //     handleSubNavClick(subNavKey);
                  //   }
                  // else if (whatHoverSubNav === 'student') {
                  //     handleStudentSubNav(subNavKey);
                  //   }
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
              className={`flex items-center px-4 py-2 rounded-lg '}`}
            >
              <TbLogout2 size={20} className="mr-3" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Sub Nav */}
      <div
  className={`hidden md:block fixed top-0 left-[72px] h-screen bg-[#efeeff] transition-all duration-300 z-20 ${showSubNav || isBatchesHovered ? 'w-50 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
  onMouseEnter={() => {
    setIsBatchesHovered(true);
  }}
  onMouseLeave={() => setIsBatchesHovered(false)}
>
  {/* Full Stack Development */}
  <div className="flex flex-col items-start mt-20">
    <button
      className={`cursor-pointer flex items-center mx-2 ps-1 pe-9 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'fullstack' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
      onClick={(e) => {
        e.preventDefault();
        const subNavKey = 'fullstack';
        if(whatHoverSubNav === 'batches') {
            handleSubNavClick(subNavKey);
          }
         else if (whatHoverSubNav === 'student') {
            handleStudentSubNav(subNavKey);
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
      <span className={`font-bold text-[10px] ${activeSubNav === 'fullstack' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>
        Full Stack Development
      </span>
    </button>
  </div>

  {/* Data Analytics & Science */}
  <div className="flex flex-col items-start mt-2">
    <button
      className={`cursor-pointer flex items-center mx-2 ps-1 pe-7 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'dataanalytics' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
      onClick={(e) => {
        e.preventDefault();
        const subNavKey = 'dataanalytics';
         if(whatHoverSubNav === 'batches') {
            handleSubNavClick(subNavKey);
          }
         else if (whatHoverSubNav === 'student') {
            handleStudentSubNav(subNavKey);
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
      <span className={`font-bold text-[10px] ${activeSubNav === 'dataanalytics' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>
        Data Analytics & Science
      </span>
    </button>
  </div>

  {/* Banking & Financial Services */}
  <div className="flex flex-col items-start mt-2">
    <button
      className={`cursor-pointer flex items-center mx-2 ps-1 pe-2 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'banking' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
     onClick={(e) => {
        e.preventDefault();
        const subNavKey = 'banking';
        if(whatHoverSubNav === 'batches') {
            handleSubNavClick(subNavKey);
          }
         else if (whatHoverSubNav === 'student') {
            handleStudentSubNav(subNavKey);
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
      <span className={`font-bold text-[10px] ${activeSubNav === 'banking' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>
        Banking & Financial Services
      </span>
    </button>
  </div>

  {/* Digital Marketing */}
  <div className="flex flex-col items-start mt-2">
    <button
      className={`cursor-pointer flex items-center mx-2 ps-1 pe-17 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'marketing' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
     onClick={(e) => {
        e.preventDefault();
        const subNavKey = 'marketing';
        if(whatHoverSubNav === 'batches') {
            handleSubNavClick(subNavKey);
          }
         else if (whatHoverSubNav === 'student') {
            handleStudentSubNav(subNavKey);
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
      <span className={`font-bold text-[10px] ${activeSubNav === 'marketing' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>
        Digital Marketing
      </span>
    </button>
  </div>

  {/* SAP */}
  <div className="flex flex-col items-start mt-2">
    <button
      className={`cursor-pointer flex items-center mx-2 ps-1 pe-30 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'sap' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
     onClick={(e) => {
        e.preventDefault();
        const subNavKey = 'sap';
        if(whatHoverSubNav === 'batches') {
            handleSubNavClick(subNavKey);
          }
         else if (whatHoverSubNav === 'student') {
            handleStudentSubNav(subNavKey);
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
      <span className={`font-bold text-[10px] ${activeSubNav === 'sap' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>
        SAP
      </span>
    </button>
  </div>

  {/* DevOps */}
  <div className="flex flex-col items-start mt-2">
    <button
      className={`cursor-pointer flex items-center mx-2 ps-1 pe-27 py-2 rounded-md transition-colors font-semibold gap-2 ${activeSubNav === 'devops' ? 'bg-[#E8DEF8] text-black' : 'text-black hover:bg-[#E8DEF8]'}`}
    onClick={(e) => {
        e.preventDefault();
        const subNavKey = 'devops';
        if(whatHoverSubNav === 'batches') {
            handleSubNavClick(subNavKey);
          }
         else if (whatHoverSubNav === 'student') {
            handleStudentSubNav(subNavKey);
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
      <span className={`font-bold text-[10px] ${activeSubNav === 'devops' ? 'text-[#49454F]' : 'text-[#49454F] hover:bg-[#E8DEF8]'}`}>
        DevOps
      </span>
    </button>
  </div>
</div>
    </>
  );
}
