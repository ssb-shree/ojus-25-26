"use client";

import { ArrowRight } from "lucide-react";
import CurvedLoop from "@/components/CurvedLoop";
import { Marquee } from "@/components/ui/marquee";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const titleVariant = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

import { useEventStore } from "@/services/store";

const Sections = ({
  title = "Day 1 of Ojus Cultural",
  venue = "Apsit Campus",
  description = "lorem34",
  dayNumber = 1,
  dayEvents = [],
  defaultEvent = null,
  buttonText = "Explore all Day 1 events",
}) => {
  const { eventData, allEventData, setDefaultEventData } = useEventStore();

  const eventsForDay = dayEvents.length > 0 ? dayEvents : allEventData;
  const currentEventData = eventData || defaultEvent;

  const updateEventData = (event) => {
    useEventStore.getState().setEventData(event);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-between pt-14 items-center bg-[#682020] text-neutral-100 overflow-hidden">
      {/* Event meta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={title + venue}
          className="text-center space-y-1"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h6 className="text-2xl uppercase tracking-[0.3em] text-neutral-300">
            {title}
          </h6>
          <span className="text-sm font-medium text-neutral-400">{venue}</span>
        </motion.div>
      </AnimatePresence>

      {/* Main heading */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentEventData?.name || "default"}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center max-w-4xl leading-tight mb-2"
          variants={titleVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {currentEventData?.name || "Event Name"}
        </motion.h1>
      </AnimatePresence>

      {/* Curved marquee */}
      <div className="hidden h-[45vh] md:flex">
        <CurvedLoop
          data={eventsForDay}
          curveAmount={-400}
          onEventHover={updateEventData}
          onEventLeave={setDefaultEventData}
        />
      </div>

      {/* Normal marquee for mobile */}
      <div className="w-screen flex md:hidden flex-col overflow-hidden">
        <Marquee>
          {eventsForDay.map((event, index) => (
            <div
              key={index}
              onMouseEnter={() => updateEventData(event)}
              onMouseLeave={setDefaultEventData}
            >
              <Card {...event} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentEventData?.descp || "description"}
          className="max-w-2xl text-center text-base sm:text-lg leading-relaxed text-neutral-300 px-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {currentEventData?.descp || description}
        </motion.p>
      </AnimatePresence>

      {/* CTA - UPDATED: Changed from /cultural/day/X to /cultural/X */}
      <Link href={`/cultural/${dayNumber}`}>
        <motion.button
          className="group flex items-center gap-3 border border-orange-400 bg-orange-500/90 hover:bg-orange-500 transition-colors rounded-t-xl rounded-b-xs px-6 py-3"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-sm font-semibold tracking-wide">
            {buttonText || `Explore all Day ${dayNumber} events`}
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </Link>
    </div>
  );
};

export default Sections;

import { memo } from "react";

const Card = memo(function Card({
  img = "https://placehold.co/200x200",
  name,
  descp,
}) {
  return (
    <div className="flex items-end justify-center p-4 mt-8">
      <div
        className="relative size-56 rounded-md overflow-hidden shadow-xl p-4 flex flex-col"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 my-auto mx-auto text-white">
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
      </div>
    </div>
  );
});