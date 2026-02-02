'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, Clock, Ticket, 
  Info, AlertCircle, CheckCircle, Loader2, Users, 
  ShieldCheck, Zap, Sparkles 
} from 'lucide-react';
import api from "@/api/api";

const TOTAL_CAPACITY = 5;
const WS_URL = 'ws://localhost:8000/ws/bookings/';

export default function Book() {
  const router = useRouter();
  const [remaining, setRemaining] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  
  const wsRef = useRef(null);

  // Initial Logic (Simplified for brevity, keep your original fetch logic here)
  useEffect(() => {
    const init = async () => {
      try {
        const [resRem, resStatus] = await Promise.all([
          api.get('/booking/remaining/'),
          api.get('/booking/my-booking/').catch(() => ({ data: null }))
        ]);
        setRemaining(resRem.data.remaining);
        if (resStatus.data) setIsBooked(true);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    init();
  }, []);

  const handleBook = async () => {
    setBookingLoading(true);
    try {
      const res = await api.post('/booking/book/');
      if (res.data.success) {
        setRemaining(res.data.remaining);
        setIsBooked(true);
        // Optional: Small delay before redirect for the "Success" state to breathe
        setTimeout(() => router.push('/seat/ticket'), 1500);
      }
    } catch (err) {
      setBookingError(err.response?.data?.error || "Transaction failed");
    } finally { setBookingLoading(false); }
  };

  const availablePercent = remaining !== null ? Math.round((remaining / TOTAL_CAPACITY) * 100) : 0;

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
         <Sparkles className="text-orange-500 w-10 h-10" />
       </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* --- Aesthetic Background Elements --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.back()} className="hover:text-orange-400 transition-colors flex items-center gap-2">
            <ArrowLeft size={20} /> <span className="text-sm font-medium">Events</span>
          </button>
          <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-bold">Ojus '26</div>
        </div>
      </header>

      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* Left: Content Area */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
              READY FOR <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                THE MAIN STAGE?
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Grab your digital pass for the cultural night. Real-time availability is shown on the right. One ticket per student ID.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { icon: Calendar, label: "Date", val: "Feb 9, 2026" },
               { icon: Clock, label: "Doors Open", val: "7:30 AM" },
               { icon: MapPin, label: "Venue", val: "Kashinath Ghanekar" },
               { icon: ShieldCheck, label: "Entry", val: "Student ID Required" }
             ].map((item, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
               >
                 <item.icon className="text-orange-500 mb-3" size={20} />
                 <div className="text-xs text-gray-500 uppercase font-bold">{item.label}</div>
                 <div className="text-white font-medium">{item.val}</div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Right: Booking Widget */}
        <div className="lg:col-span-5">
          <motion.div 
            layout
            className="sticky top-32 p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10"
          >
            <div className="bg-[#0c0c0c] rounded-[calc(1.5rem-1px)] p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Booking</h3>
                  <p className="text-sm text-gray-500">Live seat counter</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-mono font-bold text-orange-500">{remaining}</span>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Left</p>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative h-4 bg-white/5 rounded-full mb-10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${availablePercent}%` }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-600 to-red-500 rounded-full"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[move_1s_linear_infinite]" />
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {isBooked ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="inline-flex p-4 bg-green-500/10 rounded-full text-green-500 mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">You're on the list!</h4>
                    <p className="text-gray-500 text-sm mb-6">Check your dashboard for the QR pass.</p>
                    <button 
                      onClick={() => router.push('/seat/ticket')}
                      className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all"
                    >
                      View Ticket
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {bookingError && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-2 items-center text-red-400 text-sm">
                        <AlertCircle size={16} /> {bookingError}
                      </div>
                    )}
                    
                    <button
                      onClick={handleBook}
                      disabled={bookingLoading || remaining === 0}
                      className="group relative w-full py-5 bg-orange-600 hover:bg-orange-500 disabled:bg-white/5 disabled:text-gray-600 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 overflow-hidden"
                    >
                      {bookingLoading ? <Loader2 className="animate-spin" /> : (
                        <>
                          {remaining === 0 ? "Sold Out" : "Secure Seat Now"}
                          <Zap size={20} className="group-hover:fill-current" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-600 mt-4 uppercase tracking-widest font-bold">
                      Strictly 1 Seat per Verification
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
    </div>
  );
}