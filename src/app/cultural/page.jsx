"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Music, Drama, Palette, Gamepad2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const CulturalPage = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">OJUS</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#hero" className="text-sm text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#floor1" className="text-sm text-white/80 hover:text-white transition-colors">
              Floor 1
            </Link>
            <Link href="#floor2" className="text-sm text-white/80 hover:text-white transition-colors">
              Floor 2
            </Link>
            <Link href="#floor3" className="text-sm text-white/80 hover:text-white transition-colors">
              Floor 3
            </Link>
            <Link href="#floor4" className="text-sm text-white/80 hover:text-white transition-colors">
              Floor 4
            </Link>
          </div>
          <Button size="sm" className="bg-white text-black hover:bg-white/90 font-bold">
            Register Now
          </Button>
        </div>
      </nav>

      {/* Hero Section - Full Screen with Performance Background */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="/performers-colorful-stage-background.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-bold border-2 border-white/40 text-white uppercase tracking-wider">
            jan 5-18, 2026
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black mb-4 text-white text-balance leading-none tracking-tighter">
            OJUS
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 sm:w-20 bg-white/40"></div>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 font-bold tracking-wide uppercase">
              Reverie Etheria
            </p>
            <div className="h-1 w-12 sm:w-20 bg-white/40"></div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 md:mb-10 text-balance font-semibold italic px-4">
            Between Dreams and Reality
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-10 md:mb-12 text-balance max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Step into a realm where imagination transcends boundaries. Experience three days of cultural brilliance,
            where art, music, and performance converge in a dreamlike celebration of creativity and talent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button
              size="lg"
              className="text-base sm:text-lg font-bold bg-white text-black hover:bg-white/90 shadow-2xl px-6 sm:px-8 py-5 sm:py-6"
            >
              Get Your Passes
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg font-bold bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white px-6 sm:px-8 py-5 sm:py-6"
            >
              Scroll to Explore
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" className="fill-purple-900"></path>
          </svg>
        </div>
      </section>

      {/* Floor 1 Section - Full Screen */}
      <section id="floor1" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 -z-10" />

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-1.png"
            alt=""
            className="w-full h-full object-contain animate-float opacity-80"
          />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-2.png"
            alt=""
            className="w-full h-full object-contain animate-float-delayed opacity-80"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-purple-900 mx-auto mb-6 sm:mb-8 shadow-2xl border-4 sm:border-6 md:border-8 border-purple-500">
              1
            </div>
            <Music className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white mx-auto mb-4 sm:mb-6" />
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 text-balance uppercase tracking-tight px-2">
              Floor One
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl text-purple-200 mb-6 sm:mb-8 md:mb-10 font-bold uppercase tracking-wider px-4">
              Music & Melodies
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed text-balance font-semibold px-4">
            Immerse yourself in the symphony of sounds. From battle of bands to DJ nights, this floor celebrates the
            universal language of music with competitions that will make your heart beat to the rhythm. Let the melodies
            transport you between dreams and reality.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Battle of Bands
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Solo Singing
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              DJ Night
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Beatboxing
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Acoustic Sessions
            </span>
          </div>

          <Link href="/floors/floor1" className="inline-block px-4">
            <Button
              size="lg"
              className="text-base sm:text-lg md:text-xl font-bold bg-white text-purple-900 hover:bg-white/90 hover:scale-105 transition-transform shadow-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 w-full sm:w-auto"
            >
              Explore All Floor 1 Events
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,20 Q300,100 600,60 T1200,40 L1200,120 L0,120 Z" className="fill-pink-900"></path>
          </svg>
        </div>
      </section>

      {/* Floor 2 Section - Full Screen */}
      <section id="floor2" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-rose-800 to-fuchsia-900 -z-10" />

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-2.png"
            alt=""
            className="w-full h-full object-contain animate-float-slow opacity-80"
          />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-1.png"
            alt=""
            className="w-full h-full object-contain animate-float opacity-80"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-pink-900 mx-auto mb-6 sm:mb-8 shadow-2xl border-4 sm:border-6 md:border-8 border-pink-500">
              2
            </div>
            <Drama className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white mx-auto mb-4 sm:mb-6" />
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 text-balance uppercase tracking-tight px-2">
              Floor Two
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl text-pink-200 mb-6 sm:mb-8 md:mb-10 font-bold uppercase tracking-wider px-4">
              Dance, Drama & Fashion
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed text-balance font-semibold px-4">
            Where movement tells stories and fashion speaks volumes. Experience the grace of dance, the power of street
            plays, and the elegance of runway walks. This floor celebrates expression through motion, emotion, and style
            in the ethereal space between imagination and performance.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Group Dance
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Solo Dance
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Street Play
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Fashion Show
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Mime
            </span>
          </div>

          <Link href="/floors/floor2" className="inline-block px-4">
            <Button
              size="lg"
              className="text-base sm:text-lg md:text-xl font-bold bg-white text-pink-900 hover:bg-white/90 hover:scale-105 transition-transform shadow-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 w-full sm:w-auto"
            >
              Explore All Floor 2 Events
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C200,80 400,20 600,50 S1000,80 1200,30 L1200,120 L0,120 Z" className="fill-teal-900"></path>
          </svg>
        </div>
      </section>

      {/* Floor 3 Section - Full Screen */}
      <section id="floor3" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900 -z-10" />

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-1.png"
            alt=""
            className="w-full h-full object-contain animate-float opacity-80"
          />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-2.png"
            alt=""
            className="w-full h-full object-contain animate-float-delayed opacity-80"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-teal-900 mx-auto mb-6 sm:mb-8 shadow-2xl border-4 sm:border-6 md:border-8 border-teal-500">
              3
            </div>
            <Palette className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white mx-auto mb-4 sm:mb-6" />
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 text-balance uppercase tracking-tight px-2">
              Floor Three
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl text-teal-200 mb-6 sm:mb-8 md:mb-10 font-bold uppercase tracking-wider px-4">
              Arts & Literature
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed text-balance font-semibold px-4">
            A sanctuary for visual artists and wordsmiths. From canvas to camera, from poetry to prose, this floor
            showcases the beauty of creative expression through various artistic mediums. Experience how dreams
            materialize into art and words weave reality into magic.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Art Exhibition
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Poetry Slam
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Photography
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Creative Writing
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Sketching
            </span>
          </div>

          <Link href="/floors/floor3" className="inline-block px-4">
            <Button
              size="lg"
              className="text-base sm:text-lg md:text-xl font-bold bg-white text-teal-900 hover:bg-white/90 hover:scale-105 transition-transform shadow-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 w-full sm:w-auto"
            >
              Explore All Floor 3 Events
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 Q600,0 1200,60 L1200,120 L0,120 Z" className="fill-blue-900"></path>
          </svg>
        </div>
      </section>

      {/* Floor 4 Section - Full Screen */}
      <section id="floor4" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900 -z-10" />

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-2.png"
            alt=""
            className="w-full h-full object-contain animate-float opacity-80"
          />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/5 h-2/3 hidden xl:block">
          <img
            src="/bollywood-character-1.png"
            alt=""
            className="w-full h-full object-contain animate-float-delayed opacity-80"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-white flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blue-900 mx-auto mb-6 sm:mb-8 shadow-2xl border-4 sm:border-6 md:border-8 border-blue-500">
              4
            </div>
            <Gamepad2 className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white mx-auto mb-4 sm:mb-6" />
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 text-balance uppercase tracking-tight px-2">
              Floor Four
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl text-blue-200 mb-6 sm:mb-8 md:mb-10 font-bold uppercase tracking-wider px-4">
              Gaming & Tech
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed text-balance font-semibold px-4">
            Step into the digital realm where technology meets competition. From intense e-sports tournaments to
            innovative hackathons, this floor is where the future of entertainment unfolds. Here, virtual dreams become
            competitive reality, and innovation pushes the boundaries of possibility.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              E-Sports
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Hackathon
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Tech Quiz
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              VR Experience
            </span>
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-white/30 backdrop-blur-sm text-white rounded-full text-sm sm:text-base font-bold border-2 border-white/40 uppercase tracking-wide">
              Coding Challenge
            </span>
          </div>

          <Link href="/floors/floor4" className="inline-block px-4">
            <Button
              size="lg"
              className="text-base sm:text-lg md:text-xl font-bold bg-white text-blue-900 hover:bg-white/90 hover:scale-105 transition-transform shadow-2xl px-8 sm:px-10 md:px-12 py-6 sm:py-7 md:py-8 w-full sm:w-auto"
            >
              Explore All Floor 4 Events
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C400,100 800,100 1200,0 L1200,120 L0,120 Z" className="fill-black"></path>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-white" />
                <span className="text-xl font-bold text-white">OJUS</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Between dreams and reality - where creativity transcends boundaries.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-center">Quick Links</h3>
              <div className="flex flex-row items-center justify-center md:flex-col gap-2 text-sm">
                <Link href="#hero" className="text-white/70 hover:text-white">
                  Home
                </Link>
                <Link href="#floor1" className="text-white/70 hover:text-white">
                  Floor 1
                </Link>
                <Link href="#floor2" className="text-white/70 hover:text-white">
                  Floor 2
                </Link>
                <Link href="#floor3" className="text-white/70 hover:text-white">
                  Floor 3
                </Link>
                <Link href="#floor4" className="text-white/70 hover:text-white">
                  Floor 4
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <p>Email: info@reverieetheria.edu</p>
                <p>Phone: +91 98765 43210</p>
                <p>Location: College Campus</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/60">
            <p>&copy; 2025 Reverie Etheria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CulturalPage;
