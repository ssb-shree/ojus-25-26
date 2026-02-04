"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Trophy, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { culturalEventsData } from "@/lib/culturalData";
import api from "@/api/api";

import {toast} from "react-hot-toast"

// Helper function to find event by ID across all days
function findEventById(eventId) {
  for (const dayKey in culturalEventsData) {
    const dayData = culturalEventsData[dayKey];
    const event = dayData.events.find(e => e.id === parseInt(eventId));
    if (event) {
      return {
        event,
        dayNumber: dayKey,
        dayData: {
          title: dayData.title,
          date: dayData.date,
          venue: dayData.venue,
          description: dayData.description
        }
      };
    }
  }
  return null;
}



export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [eventInfo, setEventInfo] = useState(null);
  const [user, setUser] = useState(null)
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [userTeams, setUserTeams] = useState([])
  const [eventTeams, setEventTeams] = useState([])
  const [teamName, setTeamName] = useState('')
  const [memberIdsInput, setMemberIdsInput] = useState('')
  const [teamSecondary, setTeamSecondary] = useState('')
  const [teamCreating, setTeamCreating] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [phoneNumberInput, setPhoneNumberInput] = useState("")
  const [phoneSaving, setPhoneSaving] = useState(false)
  const eventId = String(params?.eventid || params?.eventId || '');

  const submitPhoneNumber = async () => {
    const val = (phoneNumberInput || '').trim()
    if (!val || val.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }
    setPhoneSaving(true)
    try {
      const res = await api.put('auth/me/update/', { phone_number: val })
      if (res.status === 200) {
        toast.success('Phone number saved')
        setUser(res.data)
        setShowPhoneModal(false)
      } else {
        toast.error('Failed to save phone number')
      }
    } catch (err) {
      const serverMsg = err?.response?.data || err?.message || 'Something went wrong'
      if (typeof serverMsg === 'string') toast.error(serverMsg)
      else if (serverMsg?.phone_number) toast.error(serverMsg.phone_number[0])
      else toast.error('Could not update phone number')
      console.log(err)
    } finally {
      setPhoneSaving(false)
    }
  }

  const handleRegister = async (event_slug)=>{

  if(event_slug === undefined) {
    toast.error("registration is not available")
    return
  }

  try {
    const res = await api.get("auth/me/");
    if (res.status !== 200) {
      toast.error("Login before registering")
      return
    }

    setUser(res.data);

    // Require phone number before registering
    if (res.data?.phone_number === "") {
      setPhoneNumberInput("")
      setShowPhoneModal(true)
      toast.error('Please add your phone number before registering')
      return
    }

    const regRes = await api.post("cultural/register/", {
      event_slug: event_slug,
    })

    if (regRes.status === 200 || regRes.status === 201) {
      toast.success("Registered successfully")
      // mark locally as registered by slug (ensure strings)
      setRegisteredEvents(prev => Array.from(new Set([...prev.map(String), String(event_slug)])))
    } else {
      toast.error("Registration failed")
    }
  } catch (error) {
    // Prefer backend error messages when available
    const serverMsg = error?.response?.data || error?.message || "Something went wrong"
    if (typeof serverMsg === 'string') {
      toast.error(serverMsg)
    } else if (serverMsg?.error) {
      toast.error(serverMsg.error)
    } else {
      // validation errors like { student: ['This field is required.'] }
      const firstField = serverMsg && typeof serverMsg === 'object' && Object.keys(serverMsg)[0]
      const firstMsg = firstField ? serverMsg[firstField][0] : null
      toast.error(firstMsg || 'Registration failed')
    }
    console.log(error)
  }
}

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = findEventById(eventId);
      setEventInfo(found);
      setIsLoading(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [eventId]);

  // Fetch user's registrations if authenticated
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const me = await api.get('auth/me/')
        if (me.status === 200) {
          setUser(me.data)

          // If phone_number is a blank string, prompt the user
          if (me.data?.phone_number === "") {
            setPhoneNumberInput("")
            setShowPhoneModal(true)
          }

          const regs = await api.get('cultural/registrations/')
          if (regs.status === 200) {
            // backend now exposes event_slug on registration; normalize to strings
            setRegisteredEvents(regs.data.map(r => (r.event_slug ? String(r.event_slug) : String(r.event))))
          }

          // fetch teams for authenticated user
          try {
            const t = await api.get('cultural/teams/my/')
            if (t.status === 200) {
              setUserTeams(t.data)
            }
          } catch (err) {
            // ignore
          }
        }
      } catch (err) {
        // ignore unauthenticated / network errors here
      }
    }

    fetchRegistrations()
  }, [])
  
  // Fetch teams for this event (public)
  const fetchEventTeams = async () => {
    try {
      if (!event?.slug) return
      const res = await api.get(`cultural/teams/event/${event.slug}/`)
      if (res.status === 200) {
        setEventTeams(res.data)
      }
    } catch (err) {
      // ignore
    }
  }

  // Submit create team
  const submitTeam = async () => {
    if (!event?.slug) {
      toast.error('Event slug missing')
      return
    }
    const name = (teamName || '').trim()
    if (!name) {
      toast.error('Please enter team name')
      return
    }

    // parse member ids
    const raw = (memberIdsInput || '').trim()
    const ids = raw ? raw.split(/[,\s]+/).map(s => parseInt(s, 10)).filter(n => !isNaN(n)) : []

    setTeamCreating(true)
    try {
      const payload = {
        event_slug: event.slug,
        name,
        member_moodle_ids: ids,
        secondary_contact_number: teamSecondary,
      }
      const res = await api.post('cultural/teams/create/', payload)
      if (res.status === 201) {
        toast.success('Team created')
        // add to user teams and event teams
        setUserTeams(prev => [res.data, ...prev])
        setEventTeams(prev => [res.data, ...prev])
        setTeamName('')
        setMemberIdsInput('')
        setTeamSecondary('')
      } else {
        toast.error('Failed to create team')
      }
    } catch (err) {
      const serverMsg = err?.response?.data || err?.message || 'Something went wrong'
      if (typeof serverMsg === 'string') toast.error(serverMsg)
      else if (serverMsg?.member_moodle_ids) toast.error(serverMsg.member_moodle_ids[0])
      else if (serverMsg?.non_field_errors) toast.error(serverMsg.non_field_errors[0] || serverMsg.non_field_errors)
      else toast.error('Could not create team')
      console.log(err)
    } finally {
      setTeamCreating(false)
    }
  }
  
  const isRegistered = eventInfo && (registeredEvents.includes(String(eventInfo.event?.slug)) || registeredEvents.includes(String(eventInfo.event?.id)))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Event Not Found
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We couldn't find the event you're looking for.
          </p>
          <button
            onClick={() => router.push('/cultural')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Back to Cultural Fest
          </button>
        </div>
      </div>
    );
  }

  const { event, dayNumber, dayData } = eventInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

      {showPhoneModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gray-800">
            <h2 className="text-lg font-bold mb-2">Add Phone Number</h2>
            <p className="text-sm text-gray-400 mb-4">Please provide your phone number to continue.</p>
            <input
              type="tel"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4"
              placeholder="Enter phone number"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowPhoneModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitPhoneNumber}
                disabled={phoneSaving}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"
              >
                {phoneSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/cultural/${dayNumber}`)}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Day {dayNumber} Events</span>
            </button>
            
            <div className="text-sm text-gray-400">
              {event.category}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative pt-16 pb-0 overflow-hidden">
        <div className="absolute inset-0 h-[50vh]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${event.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/70 to-gray-950"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-12 pb-12"
          >
            {/* Event Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl">
              {event.name}
            </h1>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Day</p>
                    <p className="text-sm font-semibold text-white">Day {dayNumber}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-semibold text-white">{event.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Participants</p>
                    <p className="text-sm font-semibold text-white">{event.participants}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Trophy className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Prize</p>
                    <p className="text-sm font-semibold text-white">{event.prize}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* About Event */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  Event Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {event.description || event.descp}
                </p>
              </motion.div>

              {/* Event Heads/Organizers - Added from JSON */}
              {event.heads && event.heads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
                >
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-git b from-blue-500 to-purple-500 rounded-full"></div>
                    Event Heads
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.heads.map((head, index) => (
                      <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                        <p className="font-medium text-white mb-1">{head.name}</p>
                        {head.contact && (
                          <p className="text-sm text-gray-400">Contact: {head.contact}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Registration / Team Section - Only if registrationLink exists */}
              {event.registrationLink && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* Team events show team UI instead of individual registration */}
                  {['valorant','paintball'].includes(String(event.slug)) ? (
                    // Team flow
                    <div>
                      {/* If user is part of a team for this event */}
                      {user && (userTeams || []).some(t => t.event_slug === String(event.slug) && (t.leader === user.moodleID || (t.members || []).includes(user.moodleID))) ? (
                        <div className="w-full py-4 bg-gray-700 text-gray-200 rounded-xl font-bold text-lg text-center">
                          You are part of a team for this event.
                        </div>
                      ) : (
                        // show team creation form for authenticated users
                        <div>
                          {user ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Team name"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                              />

                              <input
                                type="text"
                                value={memberIdsInput}
                                onChange={(e) => setMemberIdsInput(e.target.value)}
                                placeholder="Member Moodle IDs (comma separated, exclude leader)"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                              />

                              <input
                                type="tel"
                                value={teamSecondary}
                                onChange={(e) => setTeamSecondary(e.target.value)}
                                placeholder="Secondary contact number (optional)"
                                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                              />

                              <div className="flex gap-3">
                                <button
                                  disabled={teamCreating}
                                  onClick={submitTeam}
                                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold text-lg transition-all duration-300"
                                >
                                  {teamCreating ? 'Creating...' : 'Create Team'}
                                </button>
                                <button
                                  onClick={() => {
                                    setTeamName('');
                                    setMemberIdsInput('');
                                    setTeamSecondary('');
                                  }}
                                  className="py-3 px-4 bg-gray-800 rounded-xl font-medium"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full py-4 bg-gray-700 text-gray-200 rounded-xl font-bold text-lg text-center">
                              Login to create a team
                            </div>
                          )}
                        </div>
                      )}

                      {/* show event teams list (optional) */}
                      <div className="mt-4 text-sm text-gray-400">
                        <button
                          onClick={fetchEventTeams}
                          className="underline"
                        >View all teams for this event</button>
                        {eventTeams && eventTeams.length > 0 && (
                          <ul className="mt-2 list-disc list-inside text-gray-300">
                            {eventTeams.map(t => (
                              <li key={t.id}>{t.name} — Leader: {t.leader}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Individual registration flow (unchanged) but block if user is part of a team
                    (event.slug && (isRegistered ? (
                      <button
                        disabled
                        className="w-full py-4 bg-gray-700 text-gray-300 rounded-xl font-bold text-lg transition-all duration-200"
                      >
                        Registered
                      </button>
                    ) : (
                      // If user is in a team for the event, block
                      user && (userTeams || []).some(t => t.event_slug === String(event.slug) && (t.leader === user.moodleID || (t.members || []).includes(user.moodleID))) ? (
                        <div className="w-full py-4 bg-gray-700 text-gray-200 rounded-xl font-bold text-lg text-center">
                          Cannot register individually while part of a team for this event
                        </div>
                      ) : (
                        <button
                          onClick={()=> handleRegister(event.slug)}
                          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Register Now
                        </button>
                      )
                    ))) || (
                      <div className="w-full py-4 bg-gray-700 text-gray-300 rounded-xl font-bold text-lg text-center">
                        On Spot registration only
                      </div>
                    )
                  )}
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
              >
                <h3 className="text-lg font-bold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Calendar className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Day & Date</p>
                      <p className="text-sm font-medium text-gray-200">
                        Day {dayNumber} • {dayData.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Time</p>
                      <p className="text-sm font-medium text-gray-200">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <MapPin className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Venue</p>
                      <p className="text-sm font-medium text-gray-200">{event.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Tag className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-medium text-gray-200">{event.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-4 border-b border-gray-800/50">
                    <Users className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Participants</p>
                      <p className="text-sm font-medium text-gray-200">{event.participants}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Trophy className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Prize Pool</p>
                      <p className="text-sm font-medium text-gray-200">{event.prize}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Day Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900/30 rounded-xl p-6 border border-gray-800/50"
              >
                <h3 className="text-lg font-bold mb-3">Day {dayNumber} Overview</h3>
                <p className="text-sm text-gray-400 mb-4">{dayData.description}</p>
                <div className="text-sm">
                  <p className="text-gray-500 mb-1">Main Venue:</p>
                  <p className="text-gray-300">{dayData.venue}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 px-4 border-t border-gray-800/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push(`/cultural/${dayNumber}`)}
              className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>All Day {dayNumber} Events</span>
            </button>
            <button
              onClick={() => router.push('/cultural')}
              className="flex-1 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 rounded-lg font-medium transition-all duration-300"
            >
              Cultural Fest Home
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-gray-800/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              © 2024 Ojus Cultural Fest • Day {dayNumber}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}