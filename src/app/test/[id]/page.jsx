'use client'
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/api/api';

export default function Ticket() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canMark, setCanMark] = useState(false);
  const [marking, setMarking] = useState(false);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        // Fetch by moodleID when route contains id
        const url = id ? `/booking/booking/${id}/` : '/booking/my-booking/';
        const response = await api.get(url);
        // support both response shapes
        const data = response.data;
        if (data.booking) {
          // old my-booking shape
          setBooking({
            student: {
              username: data.booking.student || `student_${data.booking.moodleID}`,
              moodleID: data.booking.moodleID || id,
              year: data.booking.year,
              branch: data.booking.branch || '',
            },
            registered_on: data.booking.registered_on,
            attended: data.booking.attended || false,
          });
          setCanMark(false);
        } else {
          setBooking(data);
          setCanMark(Boolean(data.can_mark));
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError(err.response?.data?.detail || 'Failed to load booking details.');
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleMarkPresent = async () => {
    if (!id) return;
    setMarking(true);
    try {
      const res = await api.post(`/booking/mark-present/${id}/`);
      if (res.data.success) {
        setMarked(true);
      }
    } catch (err) {
      console.error('Mark present error:', err);
      setError(err.response?.data?.detail || 'Failed to mark present.');
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ticket...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
            <div>
              <div className="text-6xl mb-4">📋</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">No Booking Found</h1>
              <p className="text-gray-600">This booking does not exist. Please check the link or return to bookings.</p>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div className="space-y-2">
              <button onClick={() => router.push('/test/book')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">← Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const student = booking.student || {};
  const registeredDate = booking.registered_on ? new Date(booking.registered_on) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="w-full max-w-3xl">
        <div className="overflow-hidden rounded-3xl shadow-2xl bg-white">
          {/* Banner */}
          <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 p-6 text-white text-center">
            <h2 className="text-2xl font-extrabold">Kashinath Ghanekar</h2>
            <p className="text-sm opacity-90">Event Guest of Honour</p>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{student.username || `student_${student.moodleID}`}</h3>
                  <p className="text-sm text-gray-500">Moodle ID: <span className="font-mono">{student.moodleID}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-semibold">{student.year || '-'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-medium text-gray-800">{student.branch || '-'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">Main Auditorium</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Registered</p>
                  <p className="font-medium text-gray-800">{registeredDate ? registeredDate.toLocaleString() : '-'}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-600">Status: <span className={`font-semibold ${booking.attended ? 'text-green-600' : 'text-orange-600'}`}>{booking.attended ? 'Present' : 'Not marked'}</span></p>
              </div>
            </div>

            {/* QR + Actions */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">QR Placeholder</div>
              </div>

              {canMark && (
                <button onClick={handleMarkPresent} disabled={marking || marked} className={`w-full px-4 py-2 rounded-lg font-semibold ${marked ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  {marked ? 'Marked Present' : (marking ? 'Marking...' : 'Mark Present')}
                </button>
              )}

              <button onClick={() => window.print()} className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300">Print Ticket</button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-sm text-gray-600 text-center">Reference ID: <span className="font-mono">{student.username || student.moodleID}-OJUS25</span></div>
        </div>
      </div>
    </div>
  );
}
