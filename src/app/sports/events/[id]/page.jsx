"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

/* ======================================================
   EVENTS DATA — FULL, NOTHING REMOVED
====================================================== */

const allEvents = {
  1: {
    slug: "badminton-singles-m-f",
    id: 1,
    name: "Badminton (Singles) (Male & Female)",
    type: "indoor",
    banner:
      "https://imgs.search.brave.com/Oh6R46eyLxByjyN45CnVXT6l0UDVh0bYbycIvE6vUTA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcG9y/dHNtYXRpay5jb20v/dXBsb2Fkcy90aHVt/YnMvOTAweDQ1MC9t/YXRpay1zcG9ydHMt/Y29ybmVyL21hdGlr/LWtub3ctaG93L2Jh/ZG1pbnRvbjFfMTU2/MjMxMzEyNy5qcGc",
    description:
      "Single Elimination Tournament. Test your endurance, skill, and strategic gameplay on the court.",
    time: "3:00 PM - 6:00 PM",
    participants: 32,
    venue: "Indoor Sports Complex",
    coordinator: {
      name: "Rahul Sharma",
      contact: "+91 98765 43210",
    },
  },

  2: {
    slug: "chess-boys-girls",
    id: 2,
    name: "Chess (Boys & Girls)",
    type: "indoor",
    banner:
      "https://imgs.search.brave.com/GuwPS9Mxksff5TB9UoPxh0Lc-Q_z-njE-VV_SC7VCuA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzQwLzgzLzc2/LzM2MF9GXzQ0MDgz/NzY3Nl9rT1NaT2Fh/am0xbjUyMlZBT1p5/U1hUN2JsR0U0Vmxu/Yi5qcGc",
    description:
      "Rapid Chess Tournament. Challenge your mind with strategic thinking and pattern recognition.",
    time: "2:00 PM - 5:00 PM",
    participants: 40,
    venue: "Conference Hall A",
    coordinator: {
      name: "Priya Patel",
      contact: "+91 98765 43211",
    },
  },

  3: {
    slug: "badminton-doubles",
    id: 3,
    name: "Badminton (Doubles)",
    type: "indoor",
    banner:
      "https://imgs.search.brave.com/d4rbk-WJtvdVZDbHDcVkI9HZJ14MVSO5bz-kbeUiRdk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTYy/NDQ2MDk5L3Bob3Rv/L2JsdWUtYmFkbWlu/dG9uLWNvdXJ0LWFu/ZC1zaHV0dGxlY29j/a3Mtd2l0aC1wbGF5/ZXJzLWNvbXBldGlu/Zy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9eWtia2FQZUtF/OHF0dzRvSnpIb21o/U3ltUnhFV3UwVm9Q/a1dEc0kwSlpqaz0",
    description:
      "Double Elimination Tournament. Perfect your teamwork and coordination with your partner.",
    time: "4:00 PM - 7:00 PM",
    participants: 16,
    venue: "Indoor Sports Complex",
    coordinator: {
      name: "Rahul Sharma",
      contact: "+91 98765 43210",
    },
  },

  4: {
    slug: "carrom",
    id: 4,
    name: "Carrom",
    type: "indoor",
    banner:
      "https://imgs.search.brave.com/Hsauj5En3QU0Rjka0Mn-L3GrhvFuh_yLN8Zewd1Ceqk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jZ3RyYWRlci5j/b20vdmFyaWFudHMv/VjhDQktEamFOMTNo/Mkp6dnduNVVGakR3/Lzc4YWRkOWMyZjAy/ZmJkNzNhNDNmZmIz/OTcwYmUzODY4M2M1/ZjE1ZWZmNmNhODQ5/ZGM3OGM2NDRmNGZm/OWNlMWIvbWFpbiUy/MGRpZmZ1c2Uud2Vi/cA",
    description:
      "Singles and Doubles Carrom Tournament. A game of skill, strategy, and precision.",
    time: "1:00 PM - 5:00 PM",
    participants: 40,
    venue: "Student Lounge",
    coordinator: {
      name: "Ankit Verma",
      contact: "+91 98765 43212",
    },
  },

  5: {
    slug: "table-tennis",
    id: 5,
    name: "Table Tennis",
    type: "indoor",
    banner:
      "https://imgs.search.brave.com/aHzH8sJiAUbTox9QFDtgNDhym6hysJrujCSVUOivRhg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzkyLzI2LzM1/LzM2MF9GXzg5MjI2/MzU0NF9PU1V0bVJR/aDBJR1Z3RGJEQk90/QWk5OGhQNGFlaDB1/Vy5qcGc",
    description:
      "Best of 5 matches. Whether you're a defensive player or aggressive attacker, this is your chance to shine.",
    time: "11:00 AM - 4:00 PM",
    participants: 24,
    venue: "Indoor Sports Complex",
    coordinator: {
      name: "Neha Singh",
      contact: "+91 98765 43213",
    },
  },

  /* =======================
     OUTDOOR EVENTS
  ======================= */

  9: {
    slug: "dodgeball-girls",
    id: 9,
    name: "Dodgeball (Girls)",
    type: "outdoor",
    banner:
      "https://imgs.search.brave.com/d1eNVIXryIpVVx3DpYq-Lquiy6FZqq-smuH7bj3RFYg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE0LzkyLzQ1LzYw/LzM2MF9GXzE0OTI0/NTYwODdfQ2xudmFP/dU1WMVhUWUxqc2J3/TGdGUTRIUERlY3hy/UEouanBn",
    description:
      "High-energy team competition. Last player standing wins!",
    time: "10:00 AM - 1:00 PM",
    participants: 30,
    venue: "Basketball Court",
    coordinator: {
      name: "Sneha Reddy",
      contact: "+91 98765 43214",
    },
  },

  10: {
    slug: "overarm-cricket-boys",
    id: 10,
    name: "Overarm Cricket (Boys)",
    type: "outdoor",
    banner:
      "https://static.vecteezy.com/system/resources/thumbnails/048/510/760/small/close-up-view-of-a-worn-cricket-ball-and-bat-lying-on-grass-field-photo.jpg",
    description:
      "T20 Overarm Cricket Championship. Perfect your shots and strategize your bowling under the open sky.",
    time: "8:00 AM - 1:00 PM",
    participants: 80,
    venue: "Main Cricket Ground",
    coordinator: {
      name: "Vikram Malhotra",
      contact: "+91 98765 43215",
    },
  },

  11: {
    slug: "tug-of-war-boys",
    id: 11,
    name: "Tug of War (Boys)",
    type: "outdoor",
    banner:
      "https://thumbs.dreamstime.com/b/silhouette-team-tug-war-sunset-teamwork-unity-strength-concept-powerful-image-group-people-pulling-rope-game-368016364.jpg",
    description:
      "Test of strength and teamwork. Pull your way to victory.",
    time: "12:00 PM - 3:00 PM",
    participants: 20,
    venue: "Central Arena",
    coordinator: {
      name: "Arjun Kumar",
      contact: "+91 98765 43216",
    },
  },

  12: {
    slug: "kabaddi-boys-girls",
    id: 12,
    name: "Kabaddi (Boys & Girls)",
    type: "outdoor",
    banner:
      "https://s.wsj.net/public/resources/images/BN-DY585_ikabad_G_20140804072941.jpg",
    description:
      "Traditional Indian contact sport emphasizing agility, breath control, and strength.",
    time: "1:00 PM - 5:00 PM",
    participants: 40,
    venue: "Kabaddi Court",
    coordinator: {
      name: "Rajeshwari Iyer",
      contact: "+91 98765 43217",
    },
  },

  13: {
    slug: "box-cricket-both",
    id: 13,
    name: "Box Cricket (Both)",
    type: "outdoor",
    banner:
      "https://d3mt0x61rkkfy3.cloudfront.net/venue/b11383c4-36e2-48f0-8b19-e6e7c1b77d55/original/1649321297-image_cropper_70F503E4-1CE2-4B37-A764-F2C7ADCF0F44-20622-00000357BCBECFD7.jpg",
    description:
      "Fast-paced, high-scoring cricket played in an enclosed area.",
    time: "9:00 AM - 2:00 PM",
    participants: 60,
    venue: "Box Cricket Arena",
    coordinator: {
      name: "Sanjay Mehta",
      contact: "+91 98765 43218",
    },
  },

  14: {
    slug: "football-boys",
    id: 14,
    name: "Football (Boys)",
    type: "outdoor",
    banner:
      "https://media.istockphoto.com/id/1219371111/photo/football-or-soccer-player-in-action-on-stadium-with-flashlights-kicking-ball-for-winning-goal.jpg",
    description:
      "7-a-side Football Tournament. Fast-paced action, teamwork, and skill define this exciting competition.",
    time: "2:00 PM - 6:00 PM",
    participants: 64,
    venue: "Football Ground",
    coordinator: {
      name: "Karan Joshi",
      contact: "+91 98765 43219",
    },
  },

  15: {
    slug: "volleyball-boys",
    id: 15,
    name: "Volleyball (Boys)",
    type: "outdoor",
    banner:
      "https://thumbs.dreamstime.com/b/professional-volleyball-players-action-night-court-open-air-78544707.jpg",
    description:
      "Volleyball Championship. Team coordination and quick reflexes are essential for victory.",
    time: "3:00 PM - 7:00 PM",
    participants: 40,
    venue: "Volleyball Court",
    coordinator: {
      name: "Amit Chauhan",
      contact: "+91 98765 43220",
    },
  },

  16: {
    slug: "throwball-girls",
    id: 16,
    name: "Throwball (Girls)",
    type: "outdoor",
    banner:
      "https://assets.superblog.ai/site_cuid_clr6oh1no0006rmr89yhkxgu8/images/image-40-4-1712752390016-compressed.png",
    description:
      "A popular team sport, focusing on throwing and catching the ball over a net.",
    time: "3:00 PM - 6:00 PM",
    participants: 24,
    venue: "Throwball Court",
    coordinator: {
      name: "Pooja Nair",
      contact: "+91 98765 43221",
    },
  },

  17: {
    slug: "kho-kho-girls",
    id: 17,
    name: "Kho-kho (Girls)",
    type: "outdoor",
    banner:
      "https://bharatiyakhel.in/wp-content/uploads/2024/01/kho-kho.png",
    description:
      "One of the oldest tag games, demanding speed, stamina, and strategic chasing.",
    time: "11:00 AM - 2:00 PM",
    participants: 30,
    venue: "Kho-kho Ground",
    coordinator: {
      name: "Divya Sharma",
      contact: "+91 98765 43222",
    },
  },
};

/* ======================================================
   COMPONENT
====================================================== */

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = parseInt(params.id);
  const event = allEvents[eventId];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [liveParticipantCount, setLiveParticipantCount] = useState(
    event ? event.participants : 0
  );
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
        const match = res.data.find(
          (s) => s.name.trim() === event.name.trim()
        );
        if (match) setLiveParticipantCount(match.participants_count);
      })
      .catch(() => {});
  }, [event]);

  useEffect(() => {
    if (!event?.slug) return;
    api
      .get("api/user-registration-info/")
      .then((res) => {
        const found = res.data.registrations?.find(
          (r) => r.sport?.slug === event.slug
        );
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
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-400">
        Loading...
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link href="/sports" className="btn btn-primary mt-6">
          Back to Sports
        </Link>
      </div>
    );

  const isIndoor = event.type === "indoor";
  const backLink = isIndoor ? "/sports/indoor" : "/sports/outdoor";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-20">
      <div className="container mx-auto px-4 pb-16 flex justify-center items-center flex-col">

        <Link href={backLink} className="btn btn-ghost mb-6 text-gray-300 self-start">
          ← Back to {isIndoor ? "Indoor" : "Outdoor"} Events
        </Link>

        <div className="hero bg-base-200 rounded-2xl overflow-hidden border border-gray-700 w-80 sm:w-150 lg:w-300">
          <div className="hero-content p-0 flex-col w-full">

            <div className="relative w-full h-60 sm:h-72 lg:h-80">
              <img
                src={event.banner}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <span
                className={`badge badge-lg absolute top-4 right-4 p-2 ${
                  isIndoor ? "badge-error" : "badge-success"
                }`}
              >
                {isIndoor ? "Indoor" : "Outdoor"}
              </span>
            </div>

            <div className="p-3 lg:p-10 w-full  ">
              <h1 className="text-[17px] sm:text-3xl lg:text-4xl font-bold mb-8">
                {event.name}
              </h1>

              <div className="stats stats-vertical sm:stats-horizontal flex sm:gap-7 sm:flex-row flex-row shadow mb-10 w-full">
                <div className="stat sm:p-5 p-3 bg-base-300 rounded-2xl">
                  <div className="stat-title">Time</div>
                  <div className="stat-value sm:text-lg text-[10px]">{event.time}</div>
                </div>
                <div className="stat bg-base-300 sm:p-5 p-3 rounded-2xl">
                  <div className="stat-title">Venue</div>
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
                    <h2 className="card-title sm: text-[10px]">Coordinator</h2>
                    <p className="font-semibold text-[10px] sm:text-lg ">
                      {event.coordinator.name}
                    </p>
                    <p className=" text-gray-400 text-[10px] sm:text-lg ">
                      {event.coordinator.contact}
                    </p>
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
                    {loading
                      ? "Registering..."
                      : isAuthenticated
                      ? "Register for Event"
                      : "Log in to Register"}
                  </button>
                ) : userTeam?.in_team ? (
                  <Link
                    href={`/sports/teams/${userTeam.team.id}`}
                    className="btn btn-secondary btn-lg w-full"
                  >
                    View Team: {userTeam.team.name}
                  </Link>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowCreateTeam(true)}
                      className="btn btn-info flex-1"
                    >
                      Create Team
                    </button>
                    <button
                      onClick={() => setShowJoinTeam(true)}
                      className="btn btn-success flex-1"
                    >
                      Join Team
                    </button>
                  </div>
                )}

                {message && (
                  <p className="text-center mt-4 text-sm text-gray-300">
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
