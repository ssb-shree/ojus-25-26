"use client";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center font-mono tracking-wide place-items-center">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center px-4 py-3 sm:px-6 sm:py-4 shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[130px]"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1">
            {String(item.value).padStart(2, "0")}
          </p>
          <span className="uppercase text-xs sm:text-sm tracking-widest text-gray-400">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
