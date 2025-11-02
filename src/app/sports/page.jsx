import CountdownTimer from "@/myComponents/CountdownTimer";
import Link from "next/link";
import React from "react";

import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";
const SportsPage = () => {
  const socials = [
    {
      name: "x",
      link: "https://twitter.com/",
      icon: (
        <FaXTwitter className="size-6 text-white hover:scale-110 transition-transform duration-200" />
      ),
    },
    {
      name: "instagram",
      link: "https://instagram.com/",
      icon: (
        <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
      ),
    },
    {
      name: "facebook",
      link: "https://facebook.com/",
      icon: (
        <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
      ),
    },
    {
      name: "youtube",
      link: "https://youtube.com/",
      icon: (
        <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />
      ),
    },
  ];

  const arenas = [
    {
      name: "Indoor",
      activities: ["Gaming", "Badminton", "Table Tennis", "Chess"],
      link: "/indoor",
    },
    {
      name: "Outdoor",
      activities: ["Cricket", "Football", "Basketball"],
      link: "/outdoor",
    },
  ];

  return (
    <main className="absolute z-10">
      <section className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-3xl mb-4 text-center underline">
            Banner Drops in
          </h1>
          <CountdownTimer targetDate="2025-11-03T00:00:00" />
        </div>
        <div className="bottom-0 flex flex-row gap-x-5 mt-10">
          {socials.map((social, index) => (
            <Link
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${`hover:text-${social.color}-400`} transition-colors`}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </section>
      <section className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center">
          Choose Your Arena
        </h1>
        <p className="text-gray-300 mb-12 text-center">
          Select your battlefield and dominate!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          {arenas.map((arena) => (
            <div
              key={arena.name}
              className="border border-gray-700 rounded-xl p-8 flex flex-col justify-between hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <h2 className="text-3xl font-semibold mb-4">{arena.name}</h2>
              <p className="text-gray-300 mb-6">
                {arena.activities.join(" · ")}
              </p>
              <a
                href={`/sports${arena.link}`} 
                className="self-start text-white font-medium underline hover:text-gray-400"
              >
                Enter →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SportsPage;
