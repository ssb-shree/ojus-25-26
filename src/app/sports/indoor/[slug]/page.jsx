"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

import toast from "react-hot-toast";

import { indoor } from "@/utils/sports_data_final_with_contacts";
import { ArrowLeftRightIcon, ArrowRight } from "lucide-react";

const EventDetailsPage = ({ params }) => {
  const [indoorSlug, setIndoorSlug] = useState("");
  useEffect(() => {
    const getSlug = async () => {
      const { slug } = await params;
      setIndoorSlug(slug);
    };
    getSlug();
  }, [params]);

  const allEvents = Object.values(indoor).flat();

  const event = allEvents.find((item) => item.slug === indoorSlug);

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
    if (!isAuthenticated) {
      setMessage("⚠️ Please log in to register.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await api.post("/api/registrations/", {
        sport_slug: event.slug,
      });

      setMessage("✅ Successfully registered!");
      setLiveParticipantCount((p) => p + 1);
      setIsRegistered(true);
    } catch (err) {
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
      <main data-theme="dark" className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-8">
        <div className="container mx-auto px-4 pb-12 flex justify-center items-center flex-col">
          <Link href="/sports/indoor" className="btn btn-ghost mb-4 text-gray-400 self-start text-sm">
            ← Back to Indoor Events
          </Link>

          <div className="hero bg-base-200 rounded-xl overflow-hidden border border-gray-700 w-full max-w-2xl">
            <div className="hero-content p-0 flex-col w-full">
              <div className="relative w-full h-52">
                <img src={event.img_url} alt={event.name} className="w-full h-full object-cover" />
                <span className={`badge badge-sm absolute top-3 right-3 ${isIndoor ? "badge-error" : "badge-success"}`}>
                  {isIndoor ? "Indoor" : "Outdoor"}
                </span>
              </div>

              <div className="p-4 w-full">
                <h1 className="text-xl font-semibold mb-4">{event.name}</h1>

                <div className="stats stats-horizontal gap-4 shadow mb-6 w-full">
                  <div className="stat p-3 bg-base-300 rounded-xl">
                    <div className="stat-title text-xs">Date</div>
                    <div className="stat-value text-sm">{event.day}</div>
                  </div>
                  <div className="stat p-3 bg-base-300 rounded-xl">
                    <div className="stat-title text-xs">Venue</div>
                    <div className="stat-value text-sm">{event.venue}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 card bg-base-300 shadow">
                    <div className="card-body p-4">
                      <h2 className="card-title text-sm">About This Event</h2>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </div>
                  </div>

                  <div className="card bg-base-300 shadow">
                    <div className="card-body p-4">
                      <h2 className="card-title text-sm">Coordinator</h2>
                      {event["co-ordinators"].map((value, index) => (
                        <p key={index} className="text-gray-300 text-sm">
                          {value[0]} – {value[2]}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {!isRegistered ? (
                    <button
                      onClick={handleRegister}
                      disabled={loading || !isAuthenticated}
                      className="btn btn-primary w-full rounded-xl"
                    >
                      {loading ? "Registering..." : isAuthenticated ? "Register for Event" : "Log in to Register"}
                    </button>
                  ) : userTeam?.in_team ? (
                    <Link href={`/sports/teams/${userTeam.team.id}`} className="btn btn-secondary w-full">
                      View Team: {userTeam.team.name}
                    </Link>
                  ) : (
                    <div className={` ${event.teamLimit === 0 ? "hidden" : "flex gap-3"} }`}>
                      <button onClick={() => setShowCreateTeam(true)} className="btn btn-info flex-1">
                        Create Team
                      </button>
                      <button onClick={() => setShowJoinTeam(true)} className="btn btn-success flex-1">
                        Join Team
                      </button>
                    </div>
                  )}

                  {isAuthenticated || (
                    <Link
                      href={"/auth/login"}
                      className="text-center capitalize flex flex-row justify-center items-center underline mt-3 text-xs text-gray-300"
                    >
                      <span>Click here to log into your account</span>
                    </Link>
                  )}

                  {message && <p className="text-center mt-3 text-xs text-gray-300">{message}</p>}

                  <CreateTeamModal open={showCreateTeam} onClose={() => setShowCreateTeam(false)} event={event} />
                  <JoinTeamModal open={showJoinTeam} onClose={() => setShowJoinTeam(false)} event={event} />
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

function CreateTeamModal({ open, onClose, event }) {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("COMPS");
  const [submitting, setSubmitting] = useState(false);
  if (!open) return null;

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!event?.slug) {
        throw new Error("Sport slug missing");
      }
      const res = await api.post(`api/sports/${event.slug}/teams/create/`, {
        name,
        branch,
      });
      onClose();
      toast.success("Team created successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || err.message || "Failed to create team");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: "#0f1724",
          padding: 20,
          borderRadius: 8,
          minWidth: 360,
          color: "#fff",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Create Team for {event?.name}</h3>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Sport (pre-selected)</label>
          <input
            value={event.name || ""}
            disabled
            style={{
              width: "100%",
              padding: 8,
              background: "#111827",
              color: "#fff",
              border: "1px solid #374151",
              borderRadius: 6,
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Team Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              background: "#111827",
              color: "#fff",
              border: "1px solid #374151",
              borderRadius: 6,
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}></div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={{ padding: "8px 12px", borderRadius: 6 }}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              background: "#7c3aed",
              color: "#fff",
            }}
          >
            {submitting ? "Creating..." : "Create Team"}
          </button>
        </div>
      </form>
    </div>
  );
}

function JoinTeamModal({ open, onClose, event }) {
  const [teamId, setTeamId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  if (!open) return null;
  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post(`api/teams/${teamId}/join/`);
      toast.success("Request sent");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to send join request");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: "#0f1724",
          padding: 20,
          borderRadius: 8,
          minWidth: 320,
          color: "#fff",
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Join Team</h3>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>Team ID</label>
          <input
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              background: "#111827",
              color: "#fff",
              border: "1px solid #374151",
              borderRadius: 6,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={{ padding: "8px 12px", borderRadius: 6 }}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              background: "#059669",
              color: "#fff",
            }}
          >
            {submitting ? "Sending..." : "Send Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
