"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api"; // Assume this is configured with auth token

export default function Ticket() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get("/booking/my-booking/");
        setBooking(response.data);
        setError(null);
      } catch (err) {
        if (err.response?.status === 404) {
          setBooking(null);
        } else {
          console.error("Error fetching booking:", err);
          setError("Failed to load booking details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
            <div>
              <div className="text-6xl mb-4">📋</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">No Booking Found</h1>
              <p className="text-gray-600">
                You haven't booked your spot yet. Please complete your booking to proceed.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
            )}

            <button
              onClick={() => navigate("/book")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            >
              ← Back to Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  const registeredDate = new Date(booking.registered_on);
  const formattedDate = registeredDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = registeredDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="w-full max-w-md">
        {/* Ticket Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6 text-center text-white">
            <div className="text-4xl mb-2">✓</div>
            <h1 className="text-3xl font-bold">Booking Confirmed</h1>
            <p className="text-indigo-100 mt-2">Your seat is reserved</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Status Badge */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                CONFIRMED
              </span>
            </div>

            {/* Details */}
            <div className="space-y-4">
              {/* Username */}
              <div className="border-b pb-4">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">Student Username</p>
                <p className="text-xl font-semibold text-gray-900">{booking.student.username}</p>
              </div>

              {/* Moodle ID */}
              <div className="border-b pb-4">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">Moodle ID</p>
                <p className="text-xl font-semibold text-gray-900">#{booking.student.moodleID}</p>
              </div>

              {/* Year */}
              <div className="border-b pb-4">
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">Year</p>
                <p className="text-xl font-semibold text-gray-900">{booking.student.year}</p>
              </div>

              {/* Registered On */}
              <div>
                <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">Registered On</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-900 font-semibold">{formattedDate}</p>
                  <p className="text-gray-600 text-sm">{formattedTime}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t pt-6"></div>

            {/* Info Message */}
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-blue-700 text-sm">
                Your booking is confirmed and your spot is reserved. Please keep this confirmation safe.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/book")}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition"
              >
                ← Back to Booking Page
              </button>
              <button
                onClick={() => window.print()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                🖨️ Print Ticket
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t">
            <p className="text-gray-600 text-xs">
              Confirmation ID: <span className="font-mono font-semibold">{booking.student.username}-OJUS25</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
