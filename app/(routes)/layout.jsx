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
      <div>{!isLoaded && <BarLoader width={"100%"} color="#4444FF" />}</div>
      <aside>
        <nav className="bottom-0 fixed z-40 py-2 w-full bg-white border-t-2 lg:left-0 lg:w-[18%] lg:h-screen  lg:static ">
          <div className="flex justify-evenly items-center lg:flex-col lg:space-y-3 lg:justify-center lg:items-start">
            {navItems.map((item, index) => (
              <>
                <Link href={item.href} key={index}>
                  {/* <div className="hidden lg:w-full lg:hover:bg-gray-200 lg:flex justify-start items-center"> */}

                  <div
                    className={`flex flex-col items-center space-y-0.5 cursor-pointer lg:flex-row lg:space-y-0 lg:space-x-3 lg:mt-5 lg:text-center ${
                      pathname === item.href
                        ? "text-purple-600"
                        : "text-gray-700"
                    }`}
                    key={index}
                  >
                    <div className="flex flex-col justify-center  items-center lg:flex-row lg:space-x-3 lg:py-3 lg:w-full lg:px-10">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-lg">{item.label}</span>
                    </div>
                    {/* </div> */}
                  </div>
                </Link>
              </>
            ))}
          </div>
        </nav>
      </aside>
      <main className="lg:flex-grow lg:ml-64 lg:p-10 lg:-mt-[49rem]">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
