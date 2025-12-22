import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gamepad2, Code2, TrophyIcon, Zap, Clock, Trophy, Users, MapPin } from "lucide-react";

function Floor4Page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dreamlike background with orange/amber gradient */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.16 50) 0%, oklch(0.25 0.14 30) 50%, oklch(0.3 0.15 70) 100%)",
          }}
        />
        {/* Floating ethereal orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-orange-500/20 blur-[120px] floating-animation" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-amber-500/20 blur-[120px] floating-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-yellow-500/20 blur-[120px] floating-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge className="bg-white/10 text-white border-white/20">Floor 4</Badge>
            <Button size="sm" className="bg-white text-black hover:bg-white/90">
              Register
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <MapPin className="h-4 w-4 text-white" />
              <span className="text-sm text-white font-medium">Fourth Floor - Tech Zone</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance">Floor 4</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto text-balance">
              Where innovation meets competition - Gaming, coding, and technology converge
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6">
            {/* E-Sports Tournament */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Gamepad2 className="h-6 w-6 text-orange-400" />
                          <h3 className="text-2xl font-bold text-white">E-Sports Tournament</h3>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Gaming</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹75,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Battle in the digital arena! Compete in popular games including Valorant, CS:GO, and Mobile
                      Legends. Form your squad and prove your gaming supremacy in intense tournament matches.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-sm">All 3 Days</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-orange-400" />
                        <span className="text-sm">Teams of 5</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-orange-400" />
                        <span className="text-sm">Knockout Format</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Games: Valorant, CS:GO, Mobile Legends</li>
                        <li>• Team size: 5 players + 1 substitute</li>
                        <li>• Single/Double elimination format</li>
                        <li>• Gaming stations provided</li>
                      </ul>
                    </div>

                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/esports-tournament-gamers-competing-with-monitors-an.jpg"
                      alt="E-Sports"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hackathon */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Code2 className="h-6 w-6 text-amber-400" />
                          <h3 className="text-2xl font-bold text-white">24-Hour Hackathon</h3>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Coding</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹50,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Code innovative solutions to real-world problems! 24 hours of intense coding, collaboration, and
                      creativity. Build projects that make a difference and showcase your technical prowess.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span className="text-sm">Day 1-2, 24hrs</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-amber-400" />
                        <span className="text-sm">Teams of 2-4</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-amber-400" />
                        <span className="text-sm">Innovation</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Duration: 24 hours non-stop</li>
                        <li>• Team size: 2-4 members</li>
                        <li>• Any tech stack allowed</li>
                        <li>• Problem statement revealed at start</li>
                      </ul>
                    </div>

                    <Button className="bg-amber-600 hover:bg-amber-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/hackathon-developers-coding-on-laptops-intense-focus.jpg"
                      alt="Hackathon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tech Quiz */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <TrophyIcon className="h-6 w-6 text-yellow-400" />
                          <h3 className="text-2xl font-bold text-white">Tech Quiz Championship</h3>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Quiz</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹30,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Test your technology knowledge across programming, AI, cybersecurity, and emerging tech.
                      Fast-paced rounds with buzzer system for the ultimate tech trivia showdown.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Day 2, 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Teams of 3</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">5 Rounds</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Team size: 3 members</li>
                        <li>• Topics: Programming, AI, Web, Security</li>
                        <li>• Buzzer-based rapid fire rounds</li>
                        <li>• Negative marking in final rounds</li>
                      </ul>
                    </div>

                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/tech-quiz-competition-students-with-buzzers-on-stage.jpg"
                      alt="Tech Quiz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VR Experience Zone */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="h-6 w-6 text-cyan-400" />
                          <h3 className="text-2xl font-bold text-white">VR Experience Zone</h3>
                        </div>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Interactive</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">Free</div>
                        <div className="text-sm text-white/60">Open to All</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Step into virtual worlds! Experience cutting-edge VR technology with immersive games, simulations,
                      and educational experiences. Perfect blend of entertainment and innovation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">All 3 Days</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">Walk-in</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">Experience</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Features</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Latest VR headsets and controllers</li>
                        <li>• Multiple VR games and experiences</li>
                        <li>• 10-15 minute sessions</li>
                        <li>• No registration required</li>
                      </ul>
                    </div>

                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Learn More</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/person-wearing-vr-headset-immersive-virtual-reality.jpg"
                      alt="VR Experience"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Floor Navigation */}
          <div className="mt-16 flex justify-center gap-4">
            <Link href="4">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                ← Previous: Floor 3
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Floor4Page;
