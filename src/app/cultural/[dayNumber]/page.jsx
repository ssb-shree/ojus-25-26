"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { culturalEventsData } from "@/lib/culturalData";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function DayEventsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Debug: Log all params to see what we're getting
  console.log("All params:", params);
  
  // Try multiple possible param names
  const dayNumber = String(
    params?.dayNumber || 
    params?.daynumber || 
    params?.daynum || 
    params?.day || 
    ''
  );
  
  console.log("Extracted day number:", dayNumber);
  console.log("Available data keys:", Object.keys(culturalEventsData));
  
  const dayData = culturalEventsData[dayNumber];
  console.log("Day data found:", !!dayData);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [dayNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm font-medium">Loading Day {dayNumber} events...</p>
        </div>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Day Not Found
        </h1>
        <p className="text-gray-400 mb-4 text-center max-w-md">
          Day {dayNumber || "undefined"} does not exist. The cultural fest only has 3 days.
        </p>
        <div className="text-xs text-gray-600 mb-6 p-4 bg-gray-900 rounded-lg max-w-md">
          <p className="mb-2">Debug Info:</p>
          <p>Params: {JSON.stringify(params)}</p>
          <p>Day Number: {dayNumber}</p>
          <p>Available Days: {Object.keys(culturalEventsData).join(", ")}</p>
        </div>
        <button
          onClick={() => router.push('/cultural')}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cultural Fest
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Header - Fixed and clean */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/cultural')}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Cultural Fest</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Day {dayNumber}
              </h1>
              <p className="text-xs text-gray-500">Events</p>
            </div>
            
            <div className="w-20">
              <div className="flex items-center justify-end gap-1">
                {["1", "2", "3"].map((day) => (
                  <button
                    key={day}
                    onClick={() => router.push(`/cultural/${day}`)}
                    className={`w-6 h-6 text-xs rounded-md transition-all duration-300 ${
                      day === dayNumber
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-800/50 rounded-full mb-4 border border-gray-700/50">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-gray-300">{dayData.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              {dayData.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400 text-sm">{dayData.venue}</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-6">
              {dayData.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Count */}
      <div className="px-4 mb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-300">All Events</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-1"></div>
            </div>
            <div className="text-sm text-gray-400">
              {dayData.events.length} {dayData.events.length === 1 ? 'event' : 'events'}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {dayData.events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.15)"
                }}
                className="group relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800/50 hover:border-orange-500/30 transition-all duration-300 backdrop-blur-sm flex flex-col"
              >
                {/* Event Image with gradient overlay */}
                <div className="relative h-40 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url('${event.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-gray-900/90 backdrop-blur-sm text-orange-300 text-xs font-semibold rounded-full border border-gray-700/50">
                      {event.category}
                    </span>
                  </div>
                  
                  {/* Time Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-gray-900/90 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-full border border-gray-700/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </span>
                  </div>
                </div>
                
                {/* Event Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-300 transition-colors">
                      {event.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  
                  {/* Venue */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-gray-300 text-xs">{event.venue}</span>
                    </div>
                  </div>
                  
                  {/* Single View Details Button */}
                  <button 
                    onClick={() => router.push(`/cultural/event/${event.id}`)}
                    className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-orange-500/50 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    <Eye className="w-4 h-4 group-hover:text-orange-400 transition-colors" />
                    <span>View Details</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* Back to Home Button */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <button
            onClick={() => router.push('/cultural')}
            className="w-full py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-orange-500/50 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Cultural Fest Home</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              © 2026 Ojus Cultural Fest
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}