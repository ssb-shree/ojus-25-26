"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

export default function Ticket() {
  const router = useRouter();
  const ticketRef = useRef(null);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch booking ---------------- */
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get("/booking/my-booking/");
        setBooking(res.data.booking);
      } catch {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, []);

  /* ---------------- Download ---------------- */
  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    const dataUrl = await toPng(ticketRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `ticket-${booking.moodleID}.png`;
    link.click();
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-primary" />
          <p className="text-sm opacity-70">Preparing your ticket…</p>
        </div>
      </div>
    );
  }

  /* ---------------- No booking ---------------- */
  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold">No Booking Found</h1>
          <p className="opacity-70">You haven’t booked a seat yet.</p>
          <button onClick={() => router.push("/book")} className="btn btn-primary w-full">
            Go to Booking
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Ticket ---------------- */
  return (
   <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-6 rounded-t-2xl">
      <div ref={ticketRef} className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-6 py-6 rounded-t-2xl">
          <h1 className="text-3xl font-extrabold tracking-wide">🎟 Booking Confirmed</h1>
          <p className="opacity-90 mt-1">Show this ticket at the entry</p>
        </div>

        {/* Body */}
        <div className="card-body gap-5">
          <div className="grid grid-cols-2 gap-4">
            <Info label="Student">
              {booking.first_name} {booking.last_name}
            </Info>

            <Info label="Year">
              <span className="">{booking.year}</span>
            </Info>

            <Info label="Moodle ID">
              <span className="font-mono">{booking.moodleID}</span>
            </Info>

            <Info label="Registered">{new Date(booking.registered_on).toLocaleDateString()}</Info>
          </div>

          <div className="divider">ENTRY QR</div>

          {/* QR */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-base-100 p-4 rounded-2xl shadow-inner border">
              <QRCodeSVG value={String(`https://cycles-annual-essay-handles.trycloudflare.com/booking/mark-present/${booking.moodleID}`)} width={180} height={180} />
            </div>

            <span className="badge badge-outline">Scan at gate</span>
          </div>

          {/* Actions */}
          <div className="card-actions flex-col gap-2 pt-4">
            <button onClick={downloadTicket} className="btn btn-success w-full">
              ⬇ Download Ticket
            </button>

            <button onClick={() => window.print()} className="btn btn-primary btn-outline w-full">
              🖨 Print
            </button>

            <button onClick={() => router.push("/book")} className="btn btn-ghost w-full">
              ← Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-base-200 text-center py-3 text-xs opacity-70 rounded-b-2xl">
          Confirmation ID:
          <span className="font-mono font-semibold ml-1">OJUS25-{booking.moodleID}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Info row ---------------- */
function Info({ label, children }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide opacity-60">{label}</p>
      <div className="text-lg font-semibold">{children}</div>
    </div>
  );
}
