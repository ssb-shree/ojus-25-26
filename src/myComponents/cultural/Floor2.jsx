import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Drama, Shirt, Theater as Theatre, Clock, Trophy, Users, MapPin } from "lucide-react";

function Floor2Page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dreamlike background with pink/purple gradient */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.3 0.18 330) 0%, oklch(0.2 0.15 290) 50%, oklch(0.25 0.16 310) 100%)",
          }}
        />
        {/* Floating ethereal orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-pink-500/20 blur-[120px] floating-animation" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-purple-500/20 blur-[120px] floating-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-[120px] floating-animation"
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
            <Badge className="bg-white/10 text-white border-white/20">Floor 2</Badge>
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
              <span className="text-sm text-white font-medium">Second Floor - Performance Arena</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance">Floor 2</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto text-balance">
              Where movement becomes art - Dance, drama, and fashion converge in spectacular performances
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6">
            {/* Group Dance */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Sparkles className="h-6 w-6 text-pink-400" />
                          <h3 className="text-2xl font-bold text-white">Group Dance Competition</h3>
                        </div>
                        <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Dance</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹60,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Synchronize your moves and captivate the audience with stunning choreography. Any dance style,
                      unlimited creativity. Show the power of unity through dance.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-pink-400" />
                        <span className="text-sm">Day 1, 5:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-pink-400" />
                        <span className="text-sm">8-15 members</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-pink-400" />
                        <span className="text-sm">3 Rounds</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Team size: 8-15 dancers</li>
                        <li>• Performance duration: 8-12 minutes</li>
                        <li>• Any dance style or fusion allowed</li>
                        <li>• Props and costumes permitted</li>
                      </ul>
                    </div>

                    <Button className="bg-pink-600 hover:bg-pink-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/dance-group-performing-choreography-on-stage-with-.jpg"
                      alt="Group Dance"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Street Play */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Drama className="h-6 w-6 text-purple-400" />
                          <h3 className="text-2xl font-bold text-white">Street Play (Nukkad Natak)</h3>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Drama</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹35,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Powerful performances with social messages. Take theatre to the streets with impactful
                      storytelling that resonates with the audience and creates awareness.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">Day 2, 11:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">6-12 members</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">Social Impact</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Team size: 6-12 actors</li>
                        <li>• Duration: 15-20 minutes</li>
                        <li>• Must have a social message</li>
                        <li>• Minimal props only</li>
                      </ul>
                    </div>

                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/street-play-actors-performing-outdoor-theater.jpg"
                      alt="Street Play"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fashion Show */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Shirt className="h-6 w-6 text-rose-400" />
                          <h3 className="text-2xl font-bold text-white">Fashion Show</h3>
                        </div>
                        <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30">Fashion</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹45,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Walk the ramp with confidence and style. Showcase the latest trends, traditional wear, or your own
                      unique designs. Make a statement that turns heads.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-rose-400" />
                        <span className="text-sm">Day 3, 7:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-rose-400" />
                        <span className="text-sm">Solo/Team</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-rose-400" />
                        <span className="text-sm">Multiple Categories</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Categories: Traditional, Western, Fusion</li>
                        <li>• Walk duration: 3-5 minutes per team</li>
                        <li>• Choreography and theme required</li>
                        <li>• Original designs encouraged</li>
                      </ul>
                    </div>

                    <Button className="bg-rose-600 hover:bg-rose-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/fashion-show-runway-models-walking-with-spotlights.jpg"
                      alt="Fashion Show"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mono Acting */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Theatre className="h-6 w-6 text-violet-400" />
                          <h3 className="text-2xl font-bold text-white">Mono Acting</h3>
                        </div>
                        <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">Drama</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹20,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Solo theatrical performance that showcases your acting prowess. Embody multiple characters, tell
                      compelling stories, and captivate the audience with your one-person show.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-violet-400" />
                        <span className="text-sm">Day 2, 3:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-violet-400" />
                        <span className="text-sm">Solo</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-violet-400" />
                        <span className="text-sm">Acting Excellence</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Solo performance only</li>
                        <li>• Duration: 7-10 minutes</li>
                        <li>• Any theme or script allowed</li>
                        <li>• Minimal props permitted</li>
                      </ul>
                    </div>

                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/actor-performing-monologue-on-stage-dramatic-light.jpg"
                      alt="Mono Acting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Floor Navigation */}
          <div className="mt-16 flex justify-center gap-4">
            <Link href="1">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                ← Previous: Floor 1
              </Button>
            </Link>
            <Link href="3">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                Next: Floor 3 →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Floor2Page;
