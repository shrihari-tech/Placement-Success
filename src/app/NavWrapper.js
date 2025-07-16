"use client";
import NavBar from "./navBar/page";
import { usePathname } from "next/navigation";

export default function NavWrapper({ children }) {
  const pathname = usePathname();
  const showNavBarPaths = ["/home", "/batches", "/student", "/seting" ,"/showbatches"];
  const showNavBar = showNavBarPaths.includes(pathname);

  // Set margin-left to 60 only for /batches, otherwise use default
  let mainClass = "flex-1 p-4 w-full";
  if (showNavBar) {
    if (pathname === "/batches" || pathname === "/showbatches") {
      mainClass = "flex-1 p-4 ml-68";
    } else {
      mainClass = "flex-1 p-4 ml-10 md:ml-20";
    }
  }

  return (
    <div className="flex">
      {showNavBar && <NavBar />}
      <main className={mainClass}>
        {children}
      </main>
    </div>
  );
}