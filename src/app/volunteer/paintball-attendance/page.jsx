"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/api/api";
import { toast } from "react-hot-toast";

export default function PaintballAttendancePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [leaderMoodleId, setLeaderMoodleId] = useState("");
  const [marking, setMarking] = useState(false);
  const [marked, setMarked] = useState(new Set());

  // Check if user is managing on mount
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await api.get("auth/me/");
        if (res.status === 200) {
          setUser(res.data);
          if (!res.data.is_managing) {
            toast.error("Access denied: Only managing volunteers can access this");
            router.push("/");
            return;
          }
        }
      } catch (err) {
        toast.error("Login required");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAccess();
  }, [router]);

  // Fetch all teams for paintball
  useEffect(() => {
    if (!user?.is_managing) return;
    const fetchTeams = async () => {
      try {
        const res = await api.get("cultural/teams/attendance/paintball/");
        if (res.status === 200) {
          setTeams(res.data);
          // track which teams are marked as attended
          const attendedIds = new Set(
            res.data.filter(t => t.attended).map(t => t.id)
          );
          setMarked(attendedIds);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeams();
  }, [user?.is_managing]);

  const handleMarkAttended = async () => {
    const id = (leaderMoodleId || "").trim();
    if (!id) {
      toast.error("Please enter team leader Moodle ID");
      return;
    }

    setMarking(true);
    try {
      const res = await api.post("cultural/teams/attendance/mark/", {
        leader_moodle_id: parseInt(id, 10),
      });
      if (res.status === 200) {
        toast.success(res.data.message || "Team marked as attended");
        setLeaderMoodleId("");
        
        // update local teams list (leader is object now)
        setTeams(prev =>
          prev.map(t =>
            t.leader && t.leader.moodleID === parseInt(id, 10) ? { ...t, attended: true } : t
          )
        );

        // add to marked set
        const team = teams.find(t => t.leader && t.leader.moodleID === parseInt(id, 10));
        if (team) {
          setMarked(prev => new Set([...prev, team.id]));
        }
      }
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || "Failed to mark attendance";
      toast.error(msg);
      console.log(err);
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-2 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user?.is_managing) {
    return null;
  }

  const attendedCount = teams.filter(t => marked.has(t.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Paintball Attendance
            </h1>
            <div className="text-sm text-gray-400">{user.username}</div>
          </div>
        </div>
      </header>

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-2xl">
          {/* Progress Card */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">Teams Marked Attended</p>
                <p className="text-4xl font-bold">
                  {attendedCount} <span className="text-lg text-gray-400">/ {teams.length}</span>
                </p>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-full">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Mark Attendance Form */}
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              Mark Team Attended
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Team Leader Moodle ID</label>
                <input
                  type="number"
                  value={leaderMoodleId}
                  onChange={(e) => setLeaderMoodleId(e.target.value)}
                  placeholder="Enter leader's Moodle ID"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleMarkAttended}
                disabled={marking}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-bold transition-all duration-300 disabled:opacity-50"
              >
                {marking ? "Marking..." : "Mark Attended"}
              </button>
            </div>
          </div>

          {/* Teams List */}
          <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              Registered Teams ({teams.length})
            </h2>

            {teams.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No teams registered for Paintball</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {teams.map((team) => {
                  const isAttended = marked.has(team.id);
                  return (
                    <div
                      key={team.id}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        isAttended
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-gray-800/30 border-gray-700/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-white">{team.name}</p>
                            {isAttended && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">Leader: {team.leader && (team.leader.first_name || team.leader.last_name) ? `${team.leader.first_name || ''} ${team.leader.last_name || ''}`.trim() : team.leader?.moodleID} ({team.leader?.moodleID})</p>
                          <p className="text-sm text-gray-400">Members: {team.members && team.members.length > 0 ? team.members.map(m => `${(m.first_name || m.last_name) ? `${m.first_name || ''} ${m.last_name || ''}`.trim() : m.moodleID} (${m.moodleID})`).join(', ') : "None"}</p>
                          {team.secondary_contact_number && (
                            <p className="text-sm text-gray-400">Contact: {team.secondary_contact_number}</p>
                          )}
                        </div>
                        <div className={`text-xs font-semibold px-3 py-1 rounded-full ${isAttended ? "bg-green-500/20 text-green-300" : "bg-gray-700/50 text-gray-300"}`}>
                          {isAttended ? "Attended" : "Pending"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
