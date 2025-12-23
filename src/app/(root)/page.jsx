"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nova_Square, Alfa_Slab_One } from "next/font/google";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DomeGallery from "@/components/DomeGallery";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import ImageMouseTrail from "@/components/mousetrail";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube, FaCode } from "react-icons/fa6";

const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

export const alfa = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});

const apsitTop10 = [
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147751/_DSC0834_exwqzn.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147753/9_n0jkch.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147752/4_ufz4vk.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147752/_DSC0446_1_irqwmt.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147746/pic8_kgduwc.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147745/_DSC0451_zcortl.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147758/IMG_4937_1_ooy2py.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147752/IMG_6333_flt6db.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7348_d86u0z.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147766/76f73241-eab9-427d-993e-4b1995fa9b1d_o0yhll.jpg",
];
const ojusTop10 = [
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147776/IMG_7226_bwszqo.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147765/IMG_7052_o42sla.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147738/IMG_3840_scpwhs.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147732/IMG_8299_bdaa6y.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147757/IMG_6228_c0ey2q.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147763/IMG_4966_unxiau.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147767/IMG_7121_lymzzh.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147766/IMG_7102_cyozm9.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/13_pvmckt.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147753/_DSC0119_bggwyq.jpg",
];
const domeImages30 = [
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/13_pvmckt.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147767/IMG_7121_lymzzh.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147764/_DSC0195_lcfuoq.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147762/IMG_0451_dhg0bm.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147763/pic11_snh0g0.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147756/18_on00gn.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147752/4_ufz4vk.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147753/9_n0jkch.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147746/pic8_kgduwc.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147745/_DSC0451_zcortl.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147743/IMG20250324145504_xm3ini.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7852_rweehf.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147734/_DSC0984_ljwpke.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147732/IMG_7909_df8ldg.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147732/IMG_8299_bdaa6y.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147731/_DSC0553_zrskr1.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147730/IMG_8277_mqbqju.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147730/IMG_8329_cbdfyk.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147743/_DSC0279_1_zwl9ej.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147743/IMG_0513_oq1owq.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147744/IMG_5334_w2qxy0.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147751/_DSC0834_exwqzn.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147765/IMG_7052_o42sla.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147766/76f73241-eab9-427d-993e-4b1995fa9b1d_o0yhll.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7843_skkewr.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147772/IMG_7349_u0loil.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147767/IMG_7219_lxh10v.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147757/IMG_6228_c0ey2q.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147740/DSC_6280_ax8h6x.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147736/PXL_20250324_064509830_gkkcqm.jpg",
  "https://res.cloudinary.com/dwbqrzur6/image/upload/f_auto,q_auto,w_1600/fl_preserve_transparency/v1763147731/IMG_8032_toaxtl.jpg",
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
        {user.first_name || user.username || "Dashboard"}
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [footerClicked, setFooterClick] = useState(true);

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

  const socials = [
    {
      name: "instagram",
      link: "https://instagram.com/ojus_apsit",
      icon: <FaInstagram className="size-6 hover:text-pink-500 hover:scale-110 transition-transform duration-200" />,
    },
    {
      name: "facebook",
      link: "https://www.facebook.com/ojusapsit",
      icon: <FaFacebook className="size-6 hover:text-blue-500 hover:scale-110 transition-transform duration-200" />,
    },
    {
      name: "youtube",
      link: "https://www.youtube.com/@ojus-radianceofeuphoria5292",
      icon: <FaYoutube className="size-6 hover:text-red-500 hover:scale-110 transition-transform duration-200" />,
    },
  ];

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

          <nav className="relative w-full h-full flex flex-col z-20 text-center">
            <div className="h-20 w-full p-4 flex items-center justify-between">
              <Link href="/" className="cursor-none h-full flex items-center">
                <img
                  src="/logo.jpg"
                  alt="ojus logo"
                  className="h-full rounded-full scale-75 sm:scale-90 md:scale-100 object-contain"
                />
              </Link>

              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => window.lenis.scrollTo("#highlights")}
                  className="cursor-none  font-bold text-lg sm:text-xl bg-purple-500 text-white px-3 sm:px-4 py-1 rounded-lg"
                >
                  HIGHLIGHTS
                </button>

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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Reveric Etheria</h1>
              <h2 className="text-lg sm:text-xl md:text-2xl opacity-90">APSIT proudly presents OJUS</h2>

              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  href={"/sports/indoor"}
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
          </nav>
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

                <span className="">
                  From dance and music to fashion, theatre, and gaming, Ojus showcases diverse student talent and
                  embodies APSIT’s cultural spirit, creating unforgettable memories for everyone who attends and
                  experiences the festival’s lively atmosphere.
                </span>
              </p>
            </motion.div>
          </div>
          <div className="size-full hidden md:flex flex-col">
            <h3 className={` text-xl text-center font-extrabold`}>Hover Mouse Below</h3>
            <ImageMouseTrail
              // className={"border border-black"}
              items={ojusTop10}
              maxNumberOfImages={5}
              distance={25}
              imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-sm"
            ></ImageMouseTrail>
          </div>
        </section>

        {/* --------- --------- SECTION FOR MOBILE VIEW ONLY ------------------ */}
        <div className="w-full h-[70vh] md:hidden flex flex-col gap-y-4 justify-center items-center p-6 bg-linear-to-b from-zinc-200 to-zinc-black text-black">
          <h3 className={` text-xl text-center ${alfa.className}`}>Experience The Warmth of Ojus</h3>
          <ImageMouseTrail
            className={"h-full"}
            items={[...apsitTop10, ...ojusTop10]}
            maxNumberOfImages={5}
            distance={25}
            imgClass="sm:w-40 w-28 sm:h-48 h-36 rounded-sm"
          ></ImageMouseTrail>
          <h3 className={` text-xl text-center font-light ${alfa.className} text-zinc-300`}>Swipe Or Tap Above</h3>
        </div>
        {/* --------- --------- SECTION 3 ------------------ */}
        <section className="w-full md:mmin-h-screen flex justify-center items-center px-6 sm:px-12 md:px-20 py-16 bg-black text-white">
          <div className="hidden md:flex flex-col size-full md:mr-10">
            <h3 className={` text-xl text-center font-extrabold`}>Hover Mouse Below</h3>
            <ImageMouseTrail
              // className={" border"}
              items={apsitTop10}
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

                <span className="md:flex">
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
        <section id="highlights" className="w-screen h-[70vh] md:h-[80vh]">
          <DomeGallery images={domeImages30} grayscale={false} fitBasis={"max"} minRadius={1100} segments={40} />
        </section>

        {/* --------- --------- SECTION 5 ------------------ */}
        <footer className="w-screen bg-black text-white flex flex-col md:flex-row justify-around items-center py-5">
          {/* LEFT SECTION */}
          <div className="flex flex-row justify-center items-center min-h-[90px]">
            {/* FIXED SIZE LOGO BOX */}
            <motion.div
              onClick={() => setFooterClick((p) => !p)}
              className="cursor-none mr-5 flex justify-center items-center w-[90px] h-[90px]"
              whileTap={{ scale: 0.9 }}
            >
              <motion.img
                key={footerClicked ? "color" : "bw"}
                src={footerClicked ? "/apsit-logo-color.png" : "/logo.jpg"}
                alt="apsit logo"
                className={`object-contain scale-75 w-full ${footerClicked ? "" : "rounded-full"}`}
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* TEXT WITH RESERVED SPACE */}
            <div className="flex flex-col justify-start items-center md:w-70">
              <AnimatePresence mode="wait">
                <motion.p
                  key={footerClicked ? "apsit" : "ojus"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {footerClicked ? "A.P. Shah Institue Of Technology" : "OJUS - Reveric Etheria"}
                  <br />
                  Thane, Maharashtra
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: SOCIAL ICONS (NO MORE MOVING) */}
          <nav className="flex flex-col-reverse md:flex-col mt-3 md:mt-0 min-w-[150px] justify-center gap-y-3">
            <p className="whitespace-nowrap text-center uppercase">Experience the fest vibes on socials</p>

            <div className="flex flex-row items-center justify-center gap-x-5">
              {socials.map((social) => (
                <motion.div key={social.name} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors hover:text-${social.color}-400`}
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
              <div>
                <FaCode className="size-6 hover:text-green-500 hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
          </nav>
        </footer>
      </main>
    </AuthProvider>
  );
};

export default OjusCommonPage;
