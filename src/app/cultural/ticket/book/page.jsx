'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "@/api/api";

const TOTAL_CAPACITY = 1200;
const WS_URL = 'ws://localhost:8000/ws/bookings/';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000; // 3 seconds

export default function Book() {
  const navigate = useNavigate();
  
  const [remaining, setRemaining] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  
  const wsRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);

  // Fetch remaining seats
  const fetchRemaining = async () => {
    try {
      const response = await api.get('/booking/remaining/');
      setRemaining(response.data.remaining);
      setError(null);
    } catch (err) {
      console.error('Error fetching remaining seats:', err);
      setError('Failed to fetch booking info.');
    }
  };

  // Fetch booking status
  const fetchBookingStatus = async () => {
    try {
      const response = await api.get('/booking/my-booking/');
      setIsBooked(true);
      setBookingDetails(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setIsBooked(false);
        setBookingDetails(null);
      } else {
        console.error('Error fetching booking status:', err);
      }
    }
  };

  // Initialize page data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([fetchRemaining(), fetchBookingStatus()]);
      setLoading(false);
    };

    initializeData();
  }, []);

  // Connect to WebSocket
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        wsRef.current = new WebSocket(WS_URL);

        wsRef.current.onopen = () => {
          console.log('WebSocket connected');
          reconnectAttemptsRef.current = 0; // Reset reconnect counter on success
        };

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.event === 'COUNT_UPDATE') {
              setRemaining(data.remaining);
            }
          } catch (err) {
            console.error('Error parsing WebSocket message:', err);
          }
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        wsRef.current.onclose = () => {
          console.log('WebSocket disconnected');
          // Attempt to reconnect
          if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current += 1;
            reconnectTimeoutRef.current = setTimeout(
              connectWebSocket,
              RECONNECT_DELAY
            );
          }
        };
      } catch (err) {
        console.error('Error connecting to WebSocket:', err);
      }
    };

    connectWebSocket();

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // Handle booking
  const handleBook = async () => {
    setBookingLoading(true);
    setBookingError(null);

    try {
      const response = await api.post('/booking/book/');
      if (response.data.success) {
        // Update remaining count
        setRemaining(response.data.remaining);
        // Redirect to ticket page
        setTimeout(() => navigate('/ticket'), 500);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Failed to complete booking.';
      setBookingError(errorMessage);
      console.error('Booking error:', err);
    } finally {
      setBookingLoading(false);
    }
  };

  const bookedSeats = TOTAL_CAPACITY - (remaining ?? 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Event Booking
            </h1>
            <p className="text-gray-600">Limited capacity booking system</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Counters */}
          <div className="grid grid-cols-3 gap-4">
            {/* Total Capacity */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">
                Total
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {TOTAL_CAPACITY}
              </p>
            </div>

            {/* Booked */}
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">
                Booked
              </p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {bookedSeats}
              </p>
            </div>

            {/* Remaining */}
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider">
                Remaining
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {remaining ?? '—'}
              </p>
            </div>
          </div>

          {/* Large Remaining Display */}
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-8 text-center text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Seats Available</p>
            <p className="text-5xl font-bold">{remaining ?? '—'}</p>
          </div>

          {/* Booking Error */}
          {bookingError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {bookingError}
            </div>
          )}

          {/* Booking Section */}
          {isBooked ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-semibold">
                  ✓ You are already registered
                </p>
                <p className="text-green-600 text-sm mt-1">
                  View your booking confirmation and details.
                </p>
              </div>
              <button
                onClick={() => navigate('/ticket')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
              >
                View Your Ticket
              </button>
            </div>
          ) : (
            <button
              onClick={handleBook}
              disabled={bookingLoading || remaining === 0}
              className={`w-full font-semibold py-3 rounded-lg transition ${
                bookingLoading || remaining === 0
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {bookingLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : remaining === 0 ? (
                'Sold Out'
              ) : (
                'Book My Spot'
              )}
            </button>
          )}

          {/* Live Update Status */}
          <div className="text-center text-xs text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Live updates enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
