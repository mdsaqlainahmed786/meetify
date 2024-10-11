"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { PiChalkboardSimple } from "react-icons/pi";
import { MdEvent } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }) => {
  const { isLoaded } = useUser();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <PiChalkboardSimple /> },
    { href: "/events", label: "Events", icon: <MdEvent /> },
    { href: "/meetings", label: "Meetings", icon: <IoPeopleOutline /> },
    { href: "/availability", label: "Availability", icon: <FaRegClock /> },
  ];

  return (
    <div>
      {!isLoaded && <BarLoader width={"100%"} color="#A020F0" />}
      <div className="flex flex-col min-h-screen md:flex-row">
        {/* Sidebar for medium screens and up */}
        <aside className="hidden md:block w-64 bg-[#1F1F1F] border-r-2 border-purple-600">
          <nav className="mt-8 text-white">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-4 hover:bg-neutral-800 ${
                      pathname === item.href ? "text-purple-600" : "text-white"
                    }`}
                  >
                    <span className="w-5 h-5 mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 pb-[5rem] md:p-8">
          {children}
        </main>

        {/* Bottom tabs for small screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t-2 border-purple-600 shadow-md">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-4 ${
                    pathname === item.href ? "text-purple-600" : "text-white"
                  }`}
                >
                  <span className="w-6 h-6">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AppLayout;
