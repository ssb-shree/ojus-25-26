// "use client";

// import { ArrowRight } from "lucide-react";
// import CurvedLoop from "@/components/CurvedLoop";
// import { Marquee } from "@/components/ui/marquee";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 },
// };

// const titleVariant = {
//   hidden: { opacity: 0, scale: 0.96 },
//   visible: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.96 },
// };

// import { useEventStore } from "@/services/store";

// const Sections = ({
//   title = "Day 1 of Ojus Cultural",
//   venue = "Apsit Campus",
//   description = "lorem34",
//   dayNumber = 1,
//   dayEvents = [],
//   defaultEvent = null,
//   buttonText = "Explore all Day 1 events",
// }) => {
//   const { eventData, allEventData, setDefaultEventData } = useEventStore();

//   const eventsForDay = dayEvents.length > 0 ? dayEvents : allEventData;
//   const currentEventData = eventData || defaultEvent;

//   const updateEventData = (event) => {
//     useEventStore.getState().setEventData(event);
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col justify-between pt-14 items-center bg-[#682020] text-neutral-100 overflow-hidden">
//       {/* Event meta */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={title + venue}
//           className="text-center space-y-1"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >
//           <h6 className="text-2xl uppercase tracking-[0.3em] text-neutral-300">
//             {title}
//           </h6>
//           <span className="text-sm font-medium text-neutral-400">{venue}</span>
//         </motion.div>
//       </AnimatePresence>

//       {/* Main heading */}
//       <AnimatePresence mode="wait">
//         <motion.h1
//           key={currentEventData?.name || "default"}
//           className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center max-w-4xl leading-tight mb-2"
//           variants={titleVariant}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           transition={{ duration: 0.7, ease: "easeOut" }}
//         >
//           {currentEventData?.name || "Event Name"}
//         </motion.h1>
//       </AnimatePresence>

//       {/* Curved marquee */}
//       <div className="hidden h-[45vh] md:flex">
//         <CurvedLoop
//           data={eventsForDay}
//           curveAmount={-400}
//           onEventHover={updateEventData}
//           onEventLeave={setDefaultEventData}
//         />
//       </div>

//       {/* Normal marquee for mobile */}
      // <div className="w-screen flex md:hidden flex-col overflow-hidden">
      //   <Marquee>
      //     {eventsForDay.map((event, index) => (
      //       <div
      //         key={index}
      //         onMouseEnter={() => updateEventData(event)}
      //         onMouseLeave={setDefaultEventData}
      //       >
      //         <Card {...event} />
      //       </div>
      //     ))}
      //   </Marquee>
      // </div>

//       {/* Description */}
//       <AnimatePresence mode="wait">
//         <motion.p
//           key={currentEventData?.descp || "description"}
//           className="max-w-2xl text-center text-base sm:text-lg leading-relaxed text-neutral-300 px-6"
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
//         >
//           {currentEventData?.descp || description}
//         </motion.p>
//       </AnimatePresence>

//       {/* CTA - UPDATED: Changed from /cultural/day/X to /cultural/X */}
//       <Link href={`/cultural/${dayNumber}`}>
//         <motion.button
//           className="group flex items-center gap-3 border border-orange-400 bg-orange-500/90 hover:bg-orange-500 transition-colors rounded-t-xl rounded-b-xs px-6 py-3"
//           whileHover={{ y: -2 }}
//           whileTap={{ scale: 0.97 }}
//         >
//           <span className="text-sm font-semibold tracking-wide">
//             {buttonText || `Explore all Day ${dayNumber} events`}
//           </span>
//           <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
//         </motion.button>
//       </Link>
//     </div>
//   );
// };

// export default Sections;

// import { memo } from "react";

// const Card = memo(function Card({
//   img = "https://placehold.co/200x200",
//   name,
//   descp,
// }) {
//   return (
//     <div className="flex items-end justify-center p-4 mt-8">
//       <div
//         className="relative size-56 rounded-md overflow-hidden shadow-xl p-4 flex flex-col"
//         style={{
//           backgroundImage: `url('${img}')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/70" />
//         <div className="relative z-10 my-auto mx-auto text-white">
//           <h1 className="text-xl font-bold">{name}</h1>
//         </div>
//       </div>
//     </div>
//   );
// });



"use client";

import { ArrowRight } from "lucide-react";
import CurvedLoop from "@/components/CurvedLoop";
import { Marquee } from "@/components/ui/marquee";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

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
  color="white",
  defaultEvent = null,
  buttonText = "Explore all Day 1 events",
  randomEventCount = 6, // Number of random events to show
}) => {
  const { eventData, allEventData, setDefaultEventData } = useEventStore();
  const [randomEvents, setRandomEvents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [pauseMobileMarquee, setPauseMobileMarquee] = useState(false);

  // Get random events
  const getRandomEvents = (events, count) => {
    if (!events || events.length === 0) return [];
    
    // Shuffle the events array
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    
    // Take the first 'count' events
    return shuffled.slice(0, Math.min(count, events.length));
  };

  // Initialize random events on component mount
  useEffect(() => {
    const eventsForDay = dayEvents.length > 0 ? dayEvents : allEventData;
    const randomSelection = getRandomEvents(eventsForDay, randomEventCount);
    setRandomEvents(randomSelection);
    
    // Set a random default event if none is provided
    if (randomSelection.length > 0 && !defaultEvent) {
      const randomDefault = randomSelection[Math.floor(Math.random() * randomSelection.length)];
      useEventStore.getState().setEventData(randomDefault);
    }
  }, [dayEvents, allEventData, randomEventCount, defaultEvent, refreshKey]);

  // Get events for display (use random events)
  const eventsForDisplay = useMemo(() => {
    return randomEvents.length > 0 ? randomEvents : (dayEvents.length > 0 ? dayEvents : allEventData).slice(0, randomEventCount);
  }, [randomEvents, dayEvents, allEventData, randomEventCount]);

  const currentEventData = eventData || defaultEvent;

  const updateEventData = (event) => {
    useEventStore.getState().updateEventData(event);
  };

  // Function to refresh random events
  const refreshRandomEvents = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={`h-screen w-screen flex flex-col pb-5 justify-between pt-14 items-center ${color} text-neutral-100 overflow-hidden relative`}>
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

      {/* Random refresh button (small and subtle) */}
      {/* <motion.button
        onClick={refreshRandomEvents}
        className="absolute top-20 right-4 md:right-6 text-xs px-3 py-1 rounded-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/30 text-orange-200 transition-all z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Show different events"
      >
        Refresh Events
      </motion.button> */}

      {/* Curved marquee with random events */}
      <div className="hidden h-[45vh] md:flex">
        <CurvedLoop
          key={refreshKey} // Re-render when random events change
          data={eventsForDisplay}
          curveAmount={-400}
          onEventHover={updateEventData}
          onEventLeave={updateEventData}
        />
      </div>
      {/* Mobile view */}
      <div className="w-screen flex md:hidden flex-col overflow-hidden">
        <Marquee paused={pauseMobileMarquee} speed={40}>
          {eventsForDisplay.map((event, index) => (
            <div
              key={index}
              className=""
              onClick={() => {updateEventData(event);
                setPauseMobileMarquee(true);
              }}
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
          className="max-w-2xl text-center text-base sm:text-lg  leading-relaxed text-neutral-300 px-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {currentEventData?.descp || description}
        </motion.p>
      </AnimatePresence>


      <div className="w-screen flex md:hidden flex-col overflow-hidden">
        <Marquee paused={pauseMobileMarquee} speed={40} reverse={true}>
          {eventsForDisplay.map((event, index) => (
            <div
              key={index}
              className=""
              onClick={() => {updateEventData(event);
                setPauseMobileMarquee(true);
              }}
            >
              <Card {...event} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Counter showing random selection */}
      <div className="text-sm text-neutral-400 text-center mt-2">
        Showing {eventsForDisplay.length} of {dayEvents.length || allEventData.length} events
      </div>

      {/* CTA */}
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
        className="relative size-48 rounded-md overflow-hidden shadow-xl p-4 flex flex-col"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 my-auto mx-auto text-white text-center">
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-xs mt-2 opacity-90 line-clamp-2">{descp}</p>
        </div>
      </div>
    </div>
  );
});