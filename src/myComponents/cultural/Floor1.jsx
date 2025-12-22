import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Radio, Mic, Disc3, Clock, Trophy, Users, MapPin, Calendar, Star } from "lucide-react";

function Floor1Page() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, oklch(0.3 0.2 280) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.3 0.18 260) 0%, transparent 50%), linear-gradient(135deg, oklch(0.15 0.12 280) 0%, oklch(0.1 0.1 260) 50%, oklch(0.12 0.15 300) 100%)",
          }}
        />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-2xl z-50 border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-white hover:text-purple-300 transition-all duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-lg">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-purple-500/30 px-4 py-2 text-sm">
              <Music className="h-4 w-4 mr-2 inline" />
              Floor 1 - Music
            </Badge>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-purple-500/30"
            >
              Register Now
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 relative">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-full border border-purple-500/20 shadow-lg shadow-purple-500/10">
              <MapPin className="h-5 w-5 text-purple-300" />
              <span className="text-base text-white font-medium">First Floor - Music Venue</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 animate-gradient text-balance">
              Floor 1: Music
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed text-balance mb-8">
              Where melodies meet dreams - Experience the symphony of sounds and rhythms that transport you between
              reality and reverie
            </p>
          </div>

          <div className="grid gap-8">
            {/* Battle of Bands */}
            <Card className="group bg-gradient-to-br from-purple-950/40 to-blue-950/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="lg:w-2/5 h-80 lg:h-auto relative overflow-hidden">
                    <img
                      src="/band-performing-on-stage-with-colorful-lights.jpg"
                      alt="Battle of Bands"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <Badge className="bg-purple-600/90 text-white border-0 text-lg px-4 py-2 shadow-lg">
                        <Music className="h-5 w-5 mr-2 inline" />
                        Music Competition
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                          Battle of Bands
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                          Bring your band and compete against the best. Show your musical prowess with original
                          compositions or stunning covers. Three rounds of pure musical battle that will test your
                          creativity, skill, and stage presence.
                        </p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Clock className="h-5 w-5 text-purple-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Time</div>
                        <div className="text-white font-semibold">Day 1, 4:00 PM</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Users className="h-5 w-5 text-blue-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Team Size</div>
                        <div className="text-white font-semibold">4-8 members</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Star className="h-5 w-5 text-pink-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Event Heads </div>
                        <div className="text-white font-semibold">Lucky Sharma - 9670240625</div>
                      </div>
                    </div>

                    {/* Rules */}
                    <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
                      <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-purple-500 rounded-full" />
                        Competition Rules
                      </h4>
                      <ul className="text-white/80 space-y-3 leading-relaxed">
                        <li className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Band must have 4-8 members with at least one vocalist</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Performance duration: 15-20 minutes per round</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Original compositions receive bonus points in judging</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-purple-400 mt-1">•</span>
                          <span>Basic equipment provided (bring your own instruments recommended)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solo Singing - Similar enhanced design */}
            <Card className="group bg-gradient-to-br from-blue-950/40 to-cyan-950/40 backdrop-blur-xl border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 h-80 lg:h-auto relative overflow-hidden">
                    <img
                      src="/solo-singer-performing-with-microphone-on-stage.jpg"
                      alt="Solo Singing"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <Badge className="bg-blue-600/90 text-white border-0 text-lg px-4 py-2 shadow-lg">
                        <Mic className="h-5 w-5 mr-2 inline" />
                        Vocal Excellence
                      </Badge>
                    </div>
                  </div>

                  <div className="lg:w-3/5 p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                          Solo Singing Competition
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                          Showcase your vocal talents in this solo singing competition. Any genre, any language - just
                          pure talent and passion. Let your voice echo through the halls of Reverie Etheria and
                          captivate every listener.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Clock className="h-5 w-5 text-blue-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Time</div>
                        <div className="text-white font-semibold">Day 2, 2:00 PM</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Users className="h-5 w-5 text-cyan-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Category</div>
                        <div className="text-white font-semibold">Solo</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Star className="h-5 w-5 text-pink-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Event Heads </div>
                        <div className="text-white font-semibold">Lucky Sharma - 9670240625</div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
                      <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-blue-500 rounded-full" />
                        Competition Rules
                      </h4>
                      <ul className="text-white/80 space-y-3 leading-relaxed">
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Performance time: 5-7 minutes per round</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Any genre or language permitted - showcase your unique style</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Karaoke tracks allowed, live accompaniment preferred</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>No lip-syncing - authentic vocal performance required</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DJ Night */}
            <Card className="group bg-gradient-to-br from-violet-950/40 to-purple-950/40 backdrop-blur-xl border-violet-500/20 hover:border-violet-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.02] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 h-80 lg:h-auto relative overflow-hidden">
                    <img
                      src="/dj-performing-at-night-with-neon-lights-and-crowd.jpg"
                      alt="DJ Night"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <Badge className="bg-violet-600/90 text-white border-0 text-lg px-4 py-2 shadow-lg">
                        <Disc3 className="h-5 w-5 mr-2 inline" />
                        Electronic Music
                      </Badge>
                    </div>
                  </div>

                  <div className="lg:w-3/5 p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                          DJ Night Competition
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                          Drop the beat and light up the night! Compete with fellow DJs to create the most electrifying
                          atmosphere. Mix, scratch, and remix your way to victory under the starlit dreamscape.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Clock className="h-5 w-5 text-violet-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Time</div>
                        <div className="text-white font-semibold">Day 3, 8:00 PM</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Users className="h-5 w-5 text-purple-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Category</div>
                        <div className="text-white font-semibold">Solo DJs</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <Star className="h-5 w-5 text-pink-400 mb-2" />
                        <div className="text-white/60 text-sm mb-1">Event Heads </div>
                        <div className="text-white font-semibold">Lucky Sharma - 9670240625</div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
                      <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-violet-500 rounded-full" />
                        Competition Rules
                      </h4>
                      <ul className="text-white/80 space-y-3 leading-relaxed">
                        <li className="flex items-start gap-3">
                          <span className="text-violet-400 mt-1">•</span>
                          <span>30-minute set performance with full creative control</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-violet-400 mt-1">•</span>
                          <span>Professional DJ equipment and sound system provided</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-violet-400 mt-1">•</span>
                          <span>Original mixes and mashups strongly encouraged</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-violet-400 mt-1">•</span>
                          <span>Must maintain crowd energy and engagement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Link href="/cultural/floor/2">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-6 text-lg group"
              >
                Explore Floor 2: Dance & Drama
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default Floor1Page;
