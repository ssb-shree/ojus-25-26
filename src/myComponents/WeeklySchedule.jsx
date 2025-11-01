"use client";
import React from "react";

const schedule = [
  { day: "Sunday", date: "13" },
  { day: "Monday", date: "14" },
  { day: "Tuesday", date: "15" },
  { day: "Wednesday", date: "16" },
  { day: "Thursday", date: "17" },
  { day: "Friday", date: "18" },
  { day: "Saturday", date: "19" },
];

const WeeklySchedule = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-500 to-purple-900 flex flex-col items-center text-white">
      {/* Header */}
      <div className="flex flex-col items-center mt-10">
        <div className="flex items-center justify-center bg-yellow-400 text-purple-900 font-bold text-4xl rounded-lg px-8 py-4">
          <span className="mx-4">WEEKLY</span>
          <span className="mx-4">SCHEDULE</span>
        </div>
        <p className="bg-purple-800 text-yellow-400 px-4 py-1 mt-2 rounded-full text-sm font-semibold">
          WEEK OF OCT. 13
        </p>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 px-6 mt-10 w-full max-w-6xl">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="bg-purple-800 border-t-8 border-yellow-400 rounded-lg text-center py-6 flex flex-col items-center shadow-lg"
          >
            <div className="text-yellow-400 font-extrabold text-5xl mb-1">{item.date}</div>
            <div className="text-sm font-semibold mb-4">{item.day}</div>
            <div className="text-xs leading-relaxed">
              <p>Women's Basketball</p>
              <p>vs Ohio A&M</p>
              <p>7:00 PM ET</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center w-full max-w-6xl mt-10 border-t border-yellow-300 pt-4 px-6 text-sm text-yellow-200">
        <p>LSU ATHLETICS</p>
        <p>NIKE</p>
      </div>
    </div>
  );
};

export default WeeklySchedule;
