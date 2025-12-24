"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./indoor.module.css";
import { indoor } from "@/utils/sports_data_final_with_contacts";

import { Press_Start_2P, Space_Grotesk } from "next/font/google";
import { SearchIcon, ArrowRightIcon } from "lucide-react";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weigth: "500",
  subsets: ["latin"],
});

const tabs = [
  { key: "day1", displayValue: "Day 1" },
  { key: "day2", displayValue: "Day 2" },
  { key: "day4", displayValue: "Day 4" },
];

export default function IndoorSportsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useAuth();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    hover: { scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.4)", transition: { duration: 0.4 } },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeInOut" } },
  };

  return (
    <section className={`min-h-screen w-screen bg-[#1e293b] overflow-x-hidden ${spaceGrotesk.className}`}>
      {/* Hero */}
      <motion.div
        className={`${styles.hero} flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center w-full h-[20%] px-6 md:px-10 overflow-hidden`}
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="w-full flex flex-col items-start justify-center md:w-2/3 text-center md:text-left py-2">
          <h1 className={`${pressStart2P.className} text-xl md:text-4xl ${styles.title}`}>
            Welcome, {user?.first_name || "Guest"}
          </h1>
          <Link href="outdoor" className="hidden md:flex underline text-sm md:text-xl text-slate-300 mt-5">
            Caught up with indoor sports? Check out the outdoor events next!
          </Link>
          <Link href="outdoor" className="md:hidden underline text-sm md:text-xl text-slate-300 mt-2">
            Check out the outdoor events next!
          </Link>
        </div>

        <div className="hidden md:flex w-1/3 h-full items-center justify-end">
          <motion.img
            src="/sports-2026.png"
            alt="Banner"
            className="h-40 object-contain drop-shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          />
        </div>
      </motion.div>

      {/* Search */}
      <div className="bg-[#1e293b] w-full h-auto px-5 text-slate-300">
        <div className="border-b flex flex-row gap-x-10 justify-center items-center py-1 text-lg pt-5">
          <span>
            <SearchIcon />
          </span>
          <input
            className="placeholder-slate-300 border-none outline-none w-full bg-[#1e293b]"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search By Sports Name"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="h-full w-full px-5 mt-2 ">
        <div className="w-full flex flex-row gap-x-2 justify-around items-center bg-[#2d384a] rounded-md p-1">
          {tabs.map(({ key, displayValue }) => (
            <button
              className={`w-full p-2 rounded-lg ${activeTab === key ? "bg-[#1e293b]" : ""}`}
              key={key}
              onClick={() => {
                setActiveTab(key);
                setSearchInput("");
              }}
            >
              {displayValue}
            </button>
          ))}
        </div>

        {/* Cards */}
        <motion.div
          className="h-full w-full flex justify-center items-center mt-2 flex-wrap flex-row"
          variants={listVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          <AnimatePresence>
            {(searchInput
              ? indoor[activeTab]?.filter(({ name }) => name.toLowerCase().includes(searchInput.toLowerCase()))
              : indoor[activeTab]
            )?.map(({ name, description, img_url, slug }, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
              >
                <Cards name={name} description={description} img={img_url} slug={slug} />
              </motion.div>
            )) || <p className="text-gray-400">No Sports to display...</p>}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Cards({ img, name, description, slug }) {
  return (
    <Link href={`/sports/indoor/${slug}`} className="flex items-end justify-center p-4">
      <motion.div
        className="cursor-pointer overflow-hidden relative size-72 rounded-md shadow-xl flex flex-col p-4"
        whileHover={{ scale: 1.02, boxShadow: "0px 15px 35px rgba(0,0,0,0.4)" }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 bg-opacity-50"></div>

        {/* Text */}
        <div className="mt-auto relative z-10 text content">
          <h1 className=" font-extrabold text-4xl md:text-3xl tracking-tight text-gray-50  text-ellipsis">
            {name || "Invalid Name"}
          </h1>
          <p className="font-semibold text-sm text-gray-50 my-4">{description || "did not receive description"}</p>
          <button className="flex underline items-center gap-1">
            Click here for Details <ArrowRightIcon />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
