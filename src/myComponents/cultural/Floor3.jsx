import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Palette, Camera, BookOpen, Pen, Clock, Trophy, Users, MapPin } from "lucide-react";

function Floor3Page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dreamlike background with teal/blue gradient */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.3 0.15 220) 0%, oklch(0.2 0.13 200) 50%, oklch(0.25 0.14 240) 100%)",
          }}
        />
        {/* Floating ethereal orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-teal-500/20 blur-[120px] floating-animation" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] floating-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-blue-500/20 blur-[120px] floating-animation"
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
            <Badge className="bg-white/10 text-white border-white/20">Floor 3</Badge>
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
              <span className="text-sm text-white font-medium">Third Floor - Creative Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-balance">Floor 3</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto text-balance">
              Where imagination takes form - Art, literature, and photography merge in creative expression
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6">
            {/* Art Exhibition & Competition */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Palette className="h-6 w-6 text-teal-400" />
                          <h3 className="text-2xl font-bold text-white">Live Art Competition</h3>
                        </div>
                        <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Art</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹30,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Create masterpieces in real-time! Bring your artistic vision to life with painting, sketching, or
                      digital art. Express your creativity on canvas while the world watches.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-teal-400" />
                        <span className="text-sm">Day 1, 10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-teal-400" />
                        <span className="text-sm">Solo artists</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-teal-400" />
                        <span className="text-sm">3 hours</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Time limit: 3 hours</li>
                        <li>• Theme will be announced on spot</li>
                        <li>• Any medium: acrylic, watercolor, digital</li>
                        <li>• Basic materials provided</li>
                      </ul>
                    </div>

                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/artist-painting-on-canvas-colorful-art-studio.jpg"
                      alt="Art Competition"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photography Contest */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Camera className="h-6 w-6 text-cyan-400" />
                          <h3 className="text-2xl font-bold text-white">Photography Contest</h3>
                        </div>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Photography</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹25,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Capture moments, tell stories through your lens. Submit your best photographs across multiple
                      categories and let your visual storytelling shine.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">All 3 Days</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">Solo</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm">Multiple Categories</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Categories: Portrait, Landscape, Abstract, Street</li>
                        <li>• Submit 3-5 photographs</li>
                        <li>• Original work only, no AI</li>
                        <li>• Minimal editing allowed</li>
                      </ul>
                    </div>

                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/photographer-with-camera-taking-photos-artistic.jpg"
                      alt="Photography"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Poetry Slam */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <BookOpen className="h-6 w-6 text-blue-400" />
                          <h3 className="text-2xl font-bold text-white">Poetry Slam</h3>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Literary</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹18,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Share your poetic expressions with passion and emotion. Spoken word, traditional poetry, or
                      experimental verse - all forms welcome in this celebration of words.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Day 2, 4:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Solo</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Expression</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Performance time: 3-5 minutes</li>
                        <li>• Original poetry required</li>
                        <li>• Any language permitted</li>
                        <li>• Props not allowed</li>
                      </ul>
                    </div>

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/poet-performing-spoken-word-on-stage-with-micropho.jpg"
                      alt="Poetry Slam"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creative Writing */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 glow-effect">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Pen className="h-6 w-6 text-indigo-400" />
                          <h3 className="text-2xl font-bold text-white">Creative Writing Competition</h3>
                        </div>
                        <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Literary</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-yellow-400">₹22,000</div>
                        <div className="text-sm text-white/60">Prize Pool</div>
                      </div>
                    </div>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      Craft stories that transport readers to other worlds. Short stories, essays, or flash fiction -
                      showcase your narrative skills and imaginative storytelling.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="h-4 w-4 text-indigo-400" />
                        <span className="text-sm">Day 1-2, Submit</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Users className="h-4 w-4 text-indigo-400" />
                        <span className="text-sm">Solo</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Trophy className="h-4 w-4 text-indigo-400" />
                        <span className="text-sm">Best Story</span>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">Rules</h4>
                      <ul className="text-sm text-white/70 space-y-1 leading-relaxed">
                        <li>• Word limit: 1500-2500 words</li>
                        <li>• Theme: Between Dreams and Reality</li>
                        <li>• Any genre accepted</li>
                        <li>• Submit by Day 2, 6:00 PM</li>
                      </ul>
                    </div>

                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Register for Event</Button>
                  </div>
                  <div className="md:w-80 h-64 rounded-xl overflow-hidden">
                    <img
                      src="/writer-with-notebook-creative-writing-artistic-des.jpg"
                      alt="Creative Writing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Floor Navigation */}
          <div className="mt-16 flex justify-center gap-4">
            <Link href="2">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                ← Previous: Floor 2
              </Button>
            </Link>
            <Link href="4">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                Next: Floor 4 →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Floor3Page;
