"use client";

import Link from "next/link";
import React, { useState } from "react";

const IndoorPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  // Mock data for events - you can replace with actual data
  const eventsData = {
    1: [
      {
        id: 1,
        name: "Valorant Tournament",
        banner: "/api/placeholder/400/200",
        time: "10:00 AM - 2:00 PM",
        description: "5v5 Competitive Tournament",
        participants: 50,
        prize: "₹10,000",
      },
      {
        id: 2,
        name: "Badminton Singles",
        banner: "/api/placeholder/400/200",
        time: "3:00 PM - 6:00 PM",
        description: "Single Elimination Tournament",
        participants: 32,
        prize: "₹5,000",
      },
      {
        id: 3,
        name: "Table Tennis Championship",
        banner: "/api/placeholder/400/200",
        time: "11:00 AM - 4:00 PM",
        description: "Best of 5 matches",
        participants: 24,
        prize: "₹3,000",
      },
      {
        id: 4,
        name: "Chess Masters",
        banner: "/api/placeholder/400/200",
        time: "2:00 PM - 5:00 PM",
        description: "Rapid Chess Tournament",
        participants: 40,
        prize: "₹2,000",
      },
    ],
    2: [
      {
        id: 5,
        name: "CS:GO Showdown",
        banner: "/api/placeholder/400/200",
        time: "11:00 AM - 3:00 PM",
        description: "Team Deathmatch Tournament",
        participants: 40,
        prize: "₹8,000",
      },
      {
        id: 6,
        name: "Badminton Doubles",
        banner: "/api/placeholder/400/200",
        time: "4:00 PM - 7:00 PM",
        description: "Double Elimination Tournament",
        participants: 16,
        prize: "₹6,000",
      },
    ],
    3: [
      {
        id: 7,
        name: "FIFA 24 Championship",
        banner: "/api/placeholder/400/200",
        time: "12:00 PM - 5:00 PM",
        description: "1v1 FIFA Tournament",
        participants: 64,
        prize: "₹7,000",
      },
      {
        id: 8,
        name: "Table Tennis Doubles",
        banner: "/api/placeholder/400/200",
        time: "2:00 PM - 6:00 PM",
        description: "Double Match Tournament",
        participants: 20,
        prize: "₹4,000",
      },
    ],
  };

  const days = [1, 2, 3, 4]; // You can add more days

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <div className="container mx-auto px-4 mt-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Indoor Arena
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master your skills in gaming, badminton, table tennis, and chess.
            Compete, conquer, and claim victory!
          </p>
          {/* Add this Back Button */}
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold mt-10 py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Sports
          </Link>
        </div>
      </section>

      {/* Days Navigation - Full Width Buttons */}
      <section className="py-8 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-4 border border-red-500/30">
            <div className="grid grid-cols-4 gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`py-4 rounded-xl font-semibold transition-all duration-300 ${
                    selectedDay === day
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/25 transform scale-105"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Events - <span className="text-red-500">Day {selectedDay}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eventsData[selectedDay]?.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                {/* Event Banner */}
                <div className="h-48 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.participants} Participants
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">
                        {event.time}
                      </span>
                    </div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">
                      Prize: {event.prize}
                    </span>
                  </div>

                  <Link
                    href={`/sports/events/${event.id}`}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-center block"
                  >
                    Event Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Events Message */}
          {(!eventsData[selectedDay] ||
            eventsData[selectedDay].length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No events scheduled for Day {selectedDay}
              </div>
              <div className="text-gray-500 text-sm mt-2">
                Check back later for updates!
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/80 border-t border-red-500/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Ready to compete? Choose your event and show them what you're made
            of! 🏆
          </p>
        </div>
      </footer>
    </main>
  );
};

export default IndoorPage;
