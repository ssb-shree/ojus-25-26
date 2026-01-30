"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function Ticket() {
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------------------
     Fetch Booking
  ---------------------------- */
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get("/booking/my-booking/");
        setBooking(response.data);
        console.log(response.data)
      } catch (err) {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  /* ---------------------------
     Loading Screen
  ---------------------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading your ticket...</p>
      </div>
    );
  }

  /* ---------------------------
     No Booking Found
  ---------------------------- */
  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            No Booking Found
          </h1>

          <p className="text-gray-600">
            You have not booked your spot yet.
          </p>

          <button
            onClick={() => router.push("/book")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
          >
            ← Back to Booking
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------
     Ticket Display
  ---------------------------- */
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold">Booking Confirmed</h1>
          <p className="text-indigo-100 mt-2">
            Your seat is reserved
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5">

          {/* Username */}
          <div>
            <p className="text-gray-500 text-sm uppercase">
              Student Username
            </p>
            <p className="text-xl font-semibold">
              {booking.first_name}
            </p>
          </div>

          {/* Moodle ID */}
          <div>
            <p className="text-gray-500 text-sm uppercase">
              Moodle ID
            </p>
            <p className="text-xl font-semibold">
              {/* #{booking.student.moodleID} */}
            </p>
          </div>

          {/* Year */}
          <div>
            <p className="text-gray-500 text-sm uppercase">
              Year
            </p>
            <p className="text-xl font-semibold">
              {/* {booking.student.year} */}
            </p>
          </div>

          {/* Registered On (Raw, No Formatting) */}
          <div>
            <p className="text-gray-500 text-sm uppercase">
              Registered On
            </p>
            <p className="text-lg font-medium text-gray-800">
              {/* {booking.registered_on} */}
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => router.push("/book")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold"
            >
              ← Back
            </button>

            <button
              onClick={() => window.print()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              🖨 Print Ticket
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 text-center py-3 text-sm text-gray-600">
          Confirmation ID:{" "}
          <span className="font-mono font-semibold">
            {/* {booking.student.username}*/}-OJUS25
          </span>
        </div>
      </div>
    </div>
  );
}
