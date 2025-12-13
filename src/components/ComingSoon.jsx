"use client";
import { motion } from "framer-motion";
import Galaxy from "./Galaxy";
import Link from "next/link";

import { RxCross2 } from "react-icons/rx";
export const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

const ComingSoon = ({ type }) => {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center text-center gap-y-4">
      {/* Background */}
      <Galaxy
        className="absolute inset-0 z-0 pointer-events-none"
        mouseRepulsion={true}
        mouseInteraction={false}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
      />

      {/* Foreground content */}
      <div className={`relative z-10 flex items-center justify-center gap-x-4 ${nova.className}`}>
        <motion.img
          src="/apsit-logo-color.png"
          className="size-30 md:size-50 object-contain shrink-0"
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        />

        <motion.span
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
          v
          className="text-white text-xl font-bold"
        >
          <RxCross2 size={30} />
        </motion.span>

        <motion.img
          src={type === "sports" ? "/sports-2026.png" : "/cultural-2026.png"}
          className="size-30 md:size-50 object-contain shrink-0"
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center gap-y-3 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="text-white text-4xl sm:text-5xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {type === "sports" ? "OJUS SPORTS" : "OJUS CULTURAL"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/80 text-sm sm:text-base max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {type === "sports" ? "Gear up!! Registrations will open soon." : "Culture. Creativity. Chaos. Coming soon."}
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Link
            href={`/${type}`}
            className="inline-block mt-4 px-7 py-2.5 rounded-lg border border-white text-white font-semibold tracking-wide
                 bg-white/5 backdrop-blur-sm
                 hover:bg-white hover:text-black
                 hover:-translate-y-1 transition-all duration-300"
          >
            Explore Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
