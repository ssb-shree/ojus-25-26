"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./indoor.module.css";

import { indoor } from "@/utils/sports_data_final_with_contacts";

import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import { ArrowRight, ArrowRightIcon, SearchIcon } from "lucide-react";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const tabs = [
  {
    key: "day1",
    displayValue: "Day 1",
  },
  {
    key: "day2",
    displayValue: "Day 2",
  },
  {
    key: "day3",
    displayValue: "Day 3",
  },
  {
    key: "day4",
    displayValue: "Day 4",
  },
];
export default function IndoorSportsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [searchInput, setSearchInput] = useState("");

  return (
    <section className={`min-h-screen w-screen bg-[#1e293b] overflow-x-hidden ${spaceGrotesk.className} `}>
      <div
        className={`${styles.hero} flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center w-full h-[20%] px-6 md:px-10 overflow-hidden`}
      >
        <div className="w-full flex flex-col items-start justify-center md:w-2/3 text-center md:text-left py-2">
          <h1 className={`${pressStart2P.className} text-xl md:text-4xl ${styles.title}`}>Welcome, {"Username"}</h1>
          <Link href="outdoor" className="hidden md:flex underline text-sm md:text-xl text-slate-300 mt-5">
            Caught up with indoor sports? Check out the outdoor events next!
          </Link>
          <Link href="outdoor" className="md:hidden underline text-sm md:text-xl text-slate-300 mt-2">
            Check out the outdoor events next!
          </Link>
        </div>

        {/* Right banner / image */}
        <div className="hidden md:flex w-1/3 h-full items-center justify-end">
          <img src="/sports-2026.png" alt="Banner" className="h-40 object-contain drop-shadow-xl" />
        </div>
      </div>

      <div className="bg-[#1e293b] w-full h-auto px-5 text-slate-300">
        <div className=" border-b flex flex-row gap-x-10 justify-center items-center py-1 text-lg pt-5">
          <span>
            <SearchIcon />
          </span>
          <input
            className="placeholder-slate-300 border-none outline-none w-full"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search By Sports Name"
          />
        </div>
      </div>

      <div className="h-full w-full px-5 mt-2 ">
        <div className="w-full flex flex-row gap-x-2 justify-around items-center bg-[#2d384a] rounded-md p-1">
          {tabs.map(({ key, displayValue }) => (
            <button
              className={`w-full p-2 rounded-lg ${activeTab === key ? "bg-[#1e293b]" : null} `}
              key={key}
              onClick={() => setActiveTab(key)}
            >
              {displayValue}
            </button>
          ))}
        </div>

        {searchInput ? (
          <div className="h-full w-full flex justify-center items-center mt-2 flex-wrap flex-row">
            {indoor[activeTab]
              ?.filter(({ name }) => name.toLowerCase().includes(searchInput.toLowerCase()))
              .map(({ name, description, img_url, id }, index) => (
                <Cards key={index} name={name} description={description} img={img_url} id={id} />
              )) || <p>No Such Sports found...</p>}
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center mt-2 flex-wrap flex-row ">
            {indoor[activeTab]?.map(({ name, description, img_url, id }, index) => (
              <Cards key={index} name={name} description={description} img={img_url} id={id} />
            )) || "No Sports to display..."}
          </div>
        )}
      </div>
    </section>
  );
}

function Cards({ img, name, description, id }) {
  return (
    <div className="flex items-end justify-center p-4">
      <div
        className="cursor-pointer overflow-hidden relative size-72 rounded-md shadow-xl flex flex-col p-4"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 bg-opacity-50"></div>

        {/* Text */}
        <div className="mt-auto relative z-10 text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50">{name || "invalid name"}</h1>
          <p className="font-normal text-sm text-gray-50 my-4">{description || "did not receive description"}</p>
          <Link href={`events/${id}`} className="flex underline">
            Click here for Details <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
