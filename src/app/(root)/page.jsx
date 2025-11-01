"use client";

import Link from "next/link";

import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaEnvelope, FaUsers, FaGem } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaYoutube, FaXTwitter, FaFacebook, FaDiscord } from "react-icons/fa6";

const TechfestLanding = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div
      className="relative min-h-screen bg-purple-800 text-white font-sans bg-cover bg-center"
      // style={{
      //   backgroundImage:
      //     "url('https://media.istockphoto.com/id/2180905677/photo/purple-firework-celebrate-anniversary-happy-new-year-2025-4th-of-july-holiday-festival-purple.jpg?s=612x612&w=is&k=20&c=hXUB7KiGh2AuOEtAeyuZk9JHIjyyWCd6ZG4Zj10krxQ=')",
      // }}
    >
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-md">
        <div className="flex w-full  justify-around items-center gap-10 text-lg font-bold">
          <Link href={"/sports"} className="hover:text-purple-400 transition">
            SPORTS
          </Link>
          <button className="hover:text-purple-400 transition">CULTURAL</button>
        </div>
        <button className="bg-purple-600 px-4 py-2 rounded-md text-nowrap font-semibold hover:bg-purple-700">
          SIGN IN
        </button>
      </nav>

      {/* Left Sidebar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/40 p-4 rounded-xl backdrop-blur-md">
        {/* Home */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
          <FaHome />
        </button>

        {/* Events (Dropdown) */}
        <div
          className="relative"
          onMouseEnter={() => setOpenDropdown(true)}
          onMouseLeave={() => setOpenDropdown(false)}
        >
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
            <FaCalendarAlt />
          </button>

          {openDropdown && (
            <div className="absolute left-full top-0 ml-2 bg-black/80 rounded-md p-2 w-40 shadow-lg">
              <ul className="flex flex-col gap-2">
                <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Tech</li>
                <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Cultural</li>
                <li className="hover:bg-purple-700 px-3 py-1 rounded-md cursor-pointer">Gaming</li>
              </ul>
            </div>
          )}
        </div>

        {/* Contact */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
          <FaEnvelope />
        </button>

        {/* About */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
          <FaUsers />
        </button>

        {/* Sponsors */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-purple-700 rounded-md transition">
          <FaGem />
        </button>
      </div>

      {/* Right Social Icons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/40 p-4 rounded-xl backdrop-blur-md">
        <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
          <FaLinkedin size={20} />
        </a>
        <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
          <FaYoutube size={20} />
        </a>
        <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
          <FaXTwitter size={20} />
        </a>
        <a href="#" className="hover:text-purple-400 cursor-pointer transform translate-y-1">
          <FaFacebook size={20} />
        </a>
      </div>

      {/* Center Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold tracking-widest text-purple-300 drop-shadow-lg">OJUS 2025</h1>
        <p className="text-lg mt-3 tracking-wide">Cultural fest of AP shah college</p>
        <p className="mt-2 font-semibold">Banner drop soon...</p>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-6 w-full text-center">
        <p className="text-xl font-mono tracking-widest">
          Sports events are live &nbsp;&nbsp; | &nbsp;&nbsp; Banner drops in 2 days
        </p>
      </div>
    </div>
  );
};

export default TechfestLanding;
