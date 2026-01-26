"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Trophy, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { culturalEventsData } from "@/lib/culturalData";

// Helper function to find event by ID across all days
function findEventById(eventId) {
  for (const dayKey in culturalEventsData) {
    const dayData = culturalEventsData[dayKey];
    const event = dayData.events.find(e => e.id === parseInt(eventId));
    if (event) {
      return {
        event,
        dayNumber: dayKey,
        dayData: {
          title: dayData.title,
          date: dayData.date,
          venue: dayData.venue,
          description: dayData.description
        }
      };
    }
  }
  return null;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [eventInfo, setEventInfo] = useState(null);

  const eventId = String(params?.eventid || params?.eventId || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = findEventById(eventId);
      setEventInfo(found);
      setIsLoading(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Event Not Found
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We couldn't find the event you're looking for.
          </p>
          <button
            onClick={() => router.push('/cultural')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Back to Cultural Fest
          </button>
        </div>
      </div>
    );
  }

  const { event, dayNumber, dayData } = eventInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/cultural/${dayNumber}`)}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Day {dayNumber} Events</span>
            </button>
            
            <div className="text-sm text-gray-400">
              {event.category}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative pt-16 pb-0 overflow-hidden">
        <div className="absolute inset-0 h-[50vh]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${event.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/70 to-gray-950"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 pb-12"
          >
            {/* Event Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl">
              {event.name}
            </h1>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Day</p>
                    <p className="text-sm font-semibold text-white">Day {dayNumber}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-semibold text-white">{event.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Participants</p>
                    <p className="text-sm font-semibold text-white">{event.participants}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Trophy className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Prize</p>
                    <p className="text-sm font-semibold text-white">{event.prize}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* About Event */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  Event Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {event.description || event.descp}
                </p>
              </motion.div>

              {/* Event Heads/Organizers - Added from JSON */}
              {event.heads && event.heads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
                >
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Event Heads
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.heads.map((head, index) => (
                      <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                        <p className="font-medium text-white mb-1">{head.name}</p>
                        {head.contact && (
                          <p className="text-sm text-gray-400">Contact: {head.contact}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Registration Button - Only if registrationLink exists */}
              {event.registrationLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <button
                    onClick={() => window.open(event.registrationLink, '_blank')}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Register Now
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
              >
                <h3 className="text-lg font-bold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Calendar className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Day & Date</p>
                      <p className="text-sm font-medium text-gray-200">
                        Day {dayNumber} • {dayData.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-sm font-medium text-gray-200">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <MapPin className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Venue</p>
                      <p className="text-sm font-medium text-gray-200">{event.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Tag className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-medium text-gray-200">{event.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Users className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Participants</p>
                      <p className="text-sm font-medium text-gray-200">{event.participants}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Trophy className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Prize Pool</p>
                      <p className="text-sm font-medium text-gray-200">{event.prize}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Day Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
              >
                <h3 className="text-lg font-bold mb-3">Day {dayNumber} Overview</h3>
                <p className="text-sm text-gray-400 mb-4">{dayData.description}</p>
                <div className="text-sm">
                  <p className="text-gray-500 mb-1">Main Venue:</p>
                  <p className="text-gray-300">{dayData.venue}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 px-4 border-t border-gray-800/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push(`/cultural/${dayNumber}`)}
              className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>All Day {dayNumber} Events</span>
            </button>
            <button
              onClick={() => router.push('/cultural')}
              className="flex-1 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 rounded-lg font-medium transition-all duration-300"
            >
              Cultural Fest Home
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-gray-800/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              © 2024 Ojus Cultural Fest • Day {dayNumber}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}