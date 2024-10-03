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
      <div>{!isLoaded && <BarLoader width={"100%"} color="#A020F0" />}</div>
      <aside>
        <nav className="bottom-0 fixed z-40 py-2 w-full bg-white border-t-2 lg:left-0 lg:w-[18%] lg:h-[90.5%]">
          <div className="flex justify-evenly items-center lg:flex-col lg:space-y-3 lg:justify-center lg:items-start">
            {navItems.map((item, index) => (
              <>
                <div
                  className={`flex flex-col items-center space-y-0.5 cursor-pointer lg:flex-row lg:space-y-0 lg:space-x-3 lg:mt-5 lg:w-full lg:hover:bg-blue-200 lg:text-center ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
                  }`}
                  key={index}
                >
                  <Link href={item.href}>
                    <div className="flex flex-col justify-center items-center lg:pl-20 lg:flex-row lg:space-x-3 lg:py-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </nav>
      </aside>
      <main className="lg:flex-grow lg:ml-64 lg:p-10 mt-20 lg:mt-10">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
