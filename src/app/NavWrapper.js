"use client";
import { useEffect, useState } from "react";
import NavBar from "./navBar/page";
import { usePathname } from "next/navigation";

export default function NavWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const showNavBarPaths = ["/home", "/batches", "/student", "/seting", "/showbatches"];
  const showNavBar = showNavBarPaths.includes(pathname);
  const mainClass = "flex-1 md:ml-15 ";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent mismatch

  return (
    <div className="flex">
      {showNavBar && <NavBar />}
      <main className={mainClass}>
        {children}
      </main>
    </div>
  );
}