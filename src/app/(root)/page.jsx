"use client";

import Lenis from "lenis";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nova_Square, Alfa_Slab_One } from "next/font/google";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DomeGallery from "@/components/DomeGallery";
import { Marquee } from "@/components/ui/marquee";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import ImageTrail from "@/components/ImageTrail";
import ImageMouseTrail from "@/components/mousetrail";

const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

export const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});

export const items = [
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/13_pvmckt.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147766/76f73241-eab9-427d-993e-4b1995fa9b1d_o0yhll.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147755/IMG_3799_x7yx7n.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147738/IMG_3840_scpwhs.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147757/IMG_4973_qdcnob.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147757/IMG_6228_c0ey2q.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147773/IMG_7057_xqypve.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7348_d86u0z.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7349_u0loil.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147731/IMG_7913_h7hlex.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147730/IMG_8277_mqbqju.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147732/IMG_8299_bdaa6y.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147739/IMG_8755_p9j58i.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147753/_DSC0119_bggwyq.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147751/_DSC0834_exwqzn.jpg",
];

function NavbarAuth() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <span className="cursor-none font-bold text-lg sm:text-xl opacity-70">Loading...</span>;
  }

  if (isAuthenticated && user) {
    return (
      <button
        onClick={() => router.replace("/auth/dashboard")}
        className="cursor-none font-bold text-lg sm:text-xl bg-purple-500 text-white px-3 sm:px-4 py-1 rounded-lg"
        aria-label="Go to dashboard"
      >
        {user.name || user.username || "Dashboard"}
      </button>
    );
  }

  return (
    <Link href="/auth/login/" className="cursor-none font-bold text-lg sm:text-xl">
      LOGIN
    </Link>
  );
}

const OjusCommonPage = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const domeImages = [
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/13_pvmckt.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147766/76f73241-eab9-427d-993e-4b1995fa9b1d_o0yhll.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147755/IMG_3799_x7yx7n.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147738/IMG_3840_scpwhs.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147757/IMG_4973_qdcnob.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147757/IMG_6228_c0ey2q.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147773/IMG_7057_xqypve.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7348_d86u0z.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7349_u0loil.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147731/IMG_7913_h7hlex.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147730/IMG_8277_mqbqju.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147732/IMG_8299_bdaa6y.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147739/IMG_8755_p9j58i.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147753/_DSC0119_bggwyq.jpg",
    "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147751/_DSC0834_exwqzn.jpg",
  ];

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <AuthProvider>
      <main className={`cursor-none w-screen min-h-screen text-white font-sans overflow-x-hidden ${nova.className}`}>
        {/* --------- --------- SECTION 1 ------------------ */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted>
            <source
              src="https://res.cloudinary.com/dzcxkso7f/video/upload/f_auto,q_auto:good,vc_auto/v1763203152/VID-20251109-WA0023_jisifq.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/40 z-10"></div>

          <div className="relative w-full h-full flex flex-col z-20 text-center">
            <div className="h-20 w-full p-4 flex items-center justify-between">
              <Link href="/" className="cursor-none h-full flex items-center">
                <img
                  src="/logo.jpg"
                  alt="ojus logo"
                  className="h-full rounded-full scale-75 sm:scale-90 md:scale-100 object-contain"
                />
              </Link>

              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href={"#highlights"}
                  className="cursor-none  font-bold text-lg sm:text-xl bg-purple-500 text-white px-3 sm:px-4 py-1 rounded-lg"
                >
                  HIGHLIGHTS
                </Link>

                <NavbarAuth />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col justify-center items-center md:justify-end md:items-start h-full w-full px-6 sm:px-12 lg:px-20 pb-20 text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">OJUS 2026</h1>
              <h2 className="text-lg sm:text-xl md:text-2xl opacity-90">OJUS theme of theme</h2>
              <p className="text-sm sm:text-base md:text-lg opacity-80">Get ready for ojus 2025</p>

              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  href={"/sports"}
                  className="cursor-none transform hover:transition-x-1 px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg text-lg hover:bg-purple-400 transition"
                >
                  SPORTS
                </Link>
                <Link
                  href={"/cultural"}
                  className="cursor-none px-5 py-2 bg-purple-500 text-white font-semibold rounded-lg text-lg hover:bg-purple-400 transition"
                >
                  CULTURAL
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --------- --------- SECTION 2 ------------------ */}
        <section className="w-full md:min-h-screen flex justify-center items-center px-6 sm:px-10 md:px-20 py-16 bg-zinc-200 text-black">
          <div className="flex flex-col md:flex-row justify-between gap-16 w-full">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex-1"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none">ABOUT</h2>
              <h1 className="text-7xl sm:text-8xl md:text-[120px] font-extrabold leading-none mt-2">OJUS</h1>

              <p className="mt-8 text-sm md:text-lg leading-relaxed max-w-xl flex flex-col gap-y-2">
                <span>
                  Ojus is APSIT’s annual cultural festival, transforming the campus into a vibrant hub of music, dance,
                  art, and creativity. Each year, a unique and captivating theme sets the tone for the entire
                  celebration, adding excitement and energy.
                </span>

                <span className="hidden md:flex">
                  From dance and music to fashion, theatre, and gaming, Ojus showcases diverse student talent and
                  embodies APSIT’s cultural spirit, creating unforgettable memories for everyone who attends and
                  experiences the festival’s lively atmosphere.
                </span>
              </p>
            </motion.div>
          </div>
          <div className="size-full hidden md:flex flex-col">
            <h3 className={` text-xl text-center ${alfa.className}`}>Hover Mouse Below</h3>
            <ImageMouseTrail
              // className={"border border-black"}
              items={items}
              maxNumberOfImages={5}
              distance={25}
              imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-sm"
            ></ImageMouseTrail>
          </div>
        </section>

        {/* --------- --------- SECTION FOR MOBILE VIEW ONLY ------------------ */}
        <section className="w-full h-[70vh] md:hidden flex flex-col gap-y-4 justify-center items-center p-6 bg-linear-to-b from-zinc-200 to-zinc-black text-black">
          <h3 className={` text-xl text-center ${alfa.className}`}>Experience The Radiance of Ojus</h3>
          <ImageMouseTrail
            className={"h-full"}
            items={items}
            maxNumberOfImages={5}
            distance={25}
            imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-sm"
          ></ImageMouseTrail>
          <h3 className={` text-xl text-center font-light ${alfa.className} text-zinc-300`}>Swipe Or Tap Above</h3>
        </section>
        {/* --------- --------- SECTION 3 ------------------ */}
        <section className="w-full md:mmin-h-screen flex justify-center items-center px-6 sm:px-12 md:px-20 py-16 bg-black text-white">
          <div className="hidden md:flex flex-col size-full md:mr-10">
            <h3 className={` text-xl text-center ${alfa.className}`}>Hover Mouse Below</h3>
            <ImageMouseTrail
              // className={" border"}
              items={items}
              maxNumberOfImages={5}
              distance={25}
              imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-sm"
            ></ImageMouseTrail>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-16 w-full">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex-1"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-none">ABOUT</h2>
              <h1 className="text-7xl sm:text-8xl md:text-[120px] font-extrabold leading-none mt-2">APSIT</h1>

              <p className="mt-8 text-sm md:text-lg leading-relaxed max-w-xl flex flex-col gap-y-2">
                <span>
                  Parshvanath Charitable Trust's A. P. Shah Institute of Technology (APSIT) is a leading engineering
                  institution in Thane, Maharashtra, affiliated with the University of Mumbai and approved by AICTE.
                  Since its inception, APSIT has focused on academic excellence, innovation and holistic development,
                  preparing students to become skilled professionals and responsible citizens.
                </span>

                <span className="hidden md:flex">
                  The institute offers undergraduate engineering programs with modern infrastructure, advanced
                  laboratories and experienced faculty. APSIT bridges the gap between theory and practical learning
                  through industry collaborations, research, project-based education and internships, ensuring students
                  are ready to meet the demands of today’s evolving technological world.
                </span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* --------- --------- SECTION 4 ------------------ */}
        <section id="highlights" className="w-screen h-[75vh] md:h-[80vh]">
          <DomeGallery images={domeImages} grayscale={false} fitBasis={"max"} minRadius={1100} segments={30} />
        </section>

        {/* --------- --------- SECTION 5 ------------------ */}
        <section className="w-screen">
          <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <aside>
              <Link href="/" className="cursor-none h-20 flex items-center">
                <img
                  src="/apsit-logo-color.png"
                  alt="apsit logo"
                  className="h-full scale-75 sm:scale-90 md:scale-100 object-contain"
                />
              </Link>
              <p>
                A.P. Shah Institue Of Technology
                <br />
                Thane, Maharashtra
              </p>
            </aside>
            <nav>
              <h6 className="footer-title">Social</h6>
              <div className="grid grid-flow-col gap-4">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </nav>
          </footer>
        </section>
      </main>
    </AuthProvider>
  );
};

export default OjusCommonPage;
