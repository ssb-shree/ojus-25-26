"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

import { outdoor } from "@/utils/sports_data_final_with_contacts";

const EventDetailsPage = ({ params }) => {
  const [outdoorSlug, setOutdoorSlug] = useState("");
  useEffect(() => {
    const getSlug = async () => {
      const { slug } = await params;
      setOutdoorSlug(slug);
    };
    getSlug();
  }, [params]);

  const allEvents = Object.values(outdoor).flat();

  const event = allEvents.find((item) => item.slug === outdoorSlug);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [liveParticipantCount, setLiveParticipantCount] = useState(event ? event.participants : 0);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [userTeam, setUserTeam] = useState(null);

  useEffect(() => {
    if (!event) return;
    api
      .get("api/sports/")
      .then((res) => {
        const match = res.data.find((s) => s.name.trim() === event.name.trim());
        if (match) setLiveParticipantCount(match.participants_count);
      })
      .catch(() => {});
  }, [event]);

  useEffect(() => {
    if (!event?.slug) return;
    api
      .get("api/user-registration-info/")
      .then((res) => {
        const found = res.data.registrations?.find((r) => r.sport?.slug === event.slug);
        setIsRegistered(Boolean(found));
      })
      .catch(() => {});
  }, [event]);

  useEffect(() => {
    if (!isRegistered || !event?.slug) return;
    api
      .get(`api/sports/${event.slug}/user-team/`)
      .then((res) => setUserTeam(res.data))
      .catch(() => {});
  }, [isRegistered, event]);

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    try {
      if (!isAuthenticated) {
        setMessage("⚠️ Please log in to register.");
        return;
      }
      await api.post("api/registrations/", {
        sport_slug: event.slug,
      });
      setMessage("✅ Successfully registered!");
      setLiveParticipantCount((p) => p + 1);
    } catch {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading)
    return <div className="min-h-screen flex items-center justify-center text-purple-400">Loading...</div>;

  if (!event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link href="/sports" className="btn btn-primary mt-6">
          Back to Sports
        </Link>
      </div>
    );

  const isIndoor = event.category === "indoor";
  const backLink = isIndoor ? "/sports/indoor" : "/sports/outdoor";

  return (
    event && (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-8">
        <div className="container mx-auto px-4 pb-16 flex justify-center items-center flex-col">
          <Link href={"/sports/outdoor"} className="btn btn-ghost mb-6 text-gray-300 self-start">
            ← Back to Outdoor Events
          </Link>

          <div className="hero bg-base-200 rounded-2xl overflow-hidden border border-gray-700 w-80 sm:w-150 lg:w-300">
            <div className="hero-content p-0 flex-col w-full">
              <div className="relative w-full h-60 sm:h-72 lg:h-80">
                <img src={event.img_url} alt={event.name} className="w-full h-full object-cover" />
                <span
                  className={`badge badge-lg absolute top-4 right-4 p-2 ${isIndoor ? "badge-error" : "badge-success"}`}
                >
                  {isIndoor ? "Indoor" : "Outdoor"}
                </span>
              </div>

              <div className="p-3 lg:p-10 w-full  ">
                <h1 className="text-[17px] sm:text-3xl lg:text-4xl font-bold mb-8">{event.name}</h1>

                <div className="stats stats-vertical sm:stats-horizontal flex sm:gap-7 sm:flex-row flex-row shadow mb-10 w-full">
                  <div className="stat sm:p-5 p-3 bg-base-300 rounded-2xl">
                    <div className="stat-title text-[10px] sm:text-lg ">Date</div>
                    <div className="stat-value sm:text-lg text-[10px]">{event.day}</div>
                  </div>
                  <div className="stat bg-base-300 sm:p-5 p-3 rounded-2xl">
                    <div className="stat-title text-[10px] sm:text-lg">Venue</div>
                    <div className="stat-value sm:text-lg text-[10px]">{event.venue}</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-2 -mt-8 sm:mt-0 sm:gap-8">
                  <div className="lg:col-span-2 card bg-base-300 shadow">
                    <div className="card-body rounded-2xl sm:p-5 p-3 ">
                      <h2 className="card-title sm:text-lg text-[10px] ">About This Event</h2>
                      <p className="text-gray-300 text-[10px] sm:text-lg ">{event.description}</p>
                    </div>
                  </div>

                  <div className="card bg-base-300 shadow">
                    <div className="card-body rounded-2xl sm:p-5 p-3">
                      <h2 className="card-title sm:text-lg text-[10px]">Coordinator</h2>
                      {event["co-ordinators"].map((value, index) => (
                        <p key={index} className="text-gray-300 text-[10px] sm:text-lg">
                          {event["co-ordinators"][index][0]} - {event["co-ordinators"][index][2]}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:mt-10 mt-3">
                  {!isRegistered ? (
                    <button
                      onClick={handleRegister}
                      disabled={loading || !isAuthenticated}
                      className="btn btn-primary btn-lg w-72 self-center sm:w-full rounded-2xl "
                    >
                      {loading ? "Registering..." : isAuthenticated ? "Register for Event" : "Log in to Register"}
                    </button>
                  ) : userTeam?.in_team ? (
                    <Link href={`/sports/teams/${userTeam.team.id}`} className="btn btn-secondary btn-lg w-full">
                      View Team: {userTeam.team.name}
                    </Link>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => setShowCreateTeam(true)} className="btn btn-info flex-1">
                        Create Team
                      </button>
                      <button onClick={() => setShowJoinTeam(true)} className="btn btn-success flex-1">
                        Join Team
                      </button>
                    </div>
                  )}

                  {message && <p className="text-center mt-4 text-sm text-gray-300">{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default EventDetailsPage;
