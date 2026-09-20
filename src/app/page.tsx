"use client";

import { TransitionLink as Link } from "@/components/TransitionLink";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export default function Home() {
  return (
    <main>
      {/* LX Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video src="/lx-hero.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
        </div>
        
        <RevealGroup className="relative z-20 text-center px-4 max-w-4xl mx-auto" delay={0.2} stagger={0.3}>
          <RevealItem>
            <p className="text-xs md:text-sm font-light uppercase tracking-[0.4em] text-zinc-300 mb-6">THE LX SERIES</p>
          </RevealItem>
          <RevealItem>
            <h1 className="text-7xl md:text-9xl font-serif italic text-white tracking-tight leading-none mb-8">Elevated Adventure</h1>
          </RevealItem>
          <RevealItem>
            <p className="text-xs md:text-sm font-light uppercase tracking-[0.4em] text-zinc-300 max-w-lg mx-auto leading-[2em]">
              CONQUER ANY TERRAIN WITH<br />UNCOMPROMISING LUXURY.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="pt-12">
              <Link href="/bespoke" className="inline-block px-8 py-3 border border-white text-white text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors duration-300">
                Build Yours
              </Link>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* IS Feature Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video src="/is500-hero.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover video-zoom origin-center" />
        </div>

        <RevealGroup className="relative z-20 text-center px-4 max-w-4xl mx-auto" delay={0.2} stagger={0.2}>
          <RevealItem>
            <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight leading-none mb-6">
              A Study in Radiant <span className="text-[#E92429]">Crimson.</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-zinc-300 font-light leading-relaxed text-sm md:text-base max-w-2xl mx-auto mb-10">
              The new IS doesn<span style={{ fontFamily: "system-ui, sans-serif" }}>'</span>t just catch the light<span style={{ fontFamily: "system-ui, sans-serif" }}>&mdash;</span>it commands it. Every line is sculpted to reduce drag and increase desire, featuring a paint process that creates deeper shadows and more brilliant highlights.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="inline-block relative">
              <Link href="/fsport" className="inline-flex items-center justify-center gap-4 text-white text-xs uppercase tracking-[0.3em] hover:text-[#E92429] transition-colors pb-4 border-b border-white/30 hover:border-[#E92429] px-2 group">
                DISCOVER F<span style={{ fontFamily: "system-ui, sans-serif" }}>-</span>SPORT <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Exclusive Event Section */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealGroup className="order-2 lg:order-1" delay={0.2} stagger={0.2}>
              <RevealItem>
                <div className="overflow-hidden bg-zinc-100 relative group">
                  <img src="/LEXUS LS500h 2023.jpg" alt="Lexus LS 500h 2023" className="w-full h-[500px] md:h-[700px] object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </RevealItem>
            </RevealGroup>

            <RevealGroup className="order-1 lg:order-2 lg:pl-12" delay={0.3} stagger={0.2}>
              <RevealItem>
                <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 font-semibold">Exclusive Invitation</p>
              </RevealItem>
              <RevealItem>
                <h2 className="text-5xl md:text-7xl font-serif italic text-black tracking-tight mb-8 leading-tight">
                  The Lexus Evening of Excellence
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="text-zinc-600 font-light text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                  Join us for an unforgettable evening celebrating the intersection of meticulous craftsmanship, visionary design, and automotive excellence. Experience exclusive previews of our upcoming concepts, enjoy curated gastronomy, and immerse yourself in the relentless pursuit of perfection. Space is strictly limited.
                </p>
              </RevealItem>
              <RevealItem>
                <a href="#" className="inline-flex items-center gap-4 text-black text-xs uppercase tracking-[0.2em] font-medium hover:text-[#E92429] transition-colors group border-b border-black pb-2 hover:border-[#E92429]">
                  RSVP NOW <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Global CTA Section */}
      <section className="bg-[#0a0a0a] py-40 px-6 text-center">
        <RevealGroup className="max-w-3xl mx-auto" delay={0.2} stagger={0.2}>
          <RevealItem>
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-6 font-light">Your Journey Begins</p>
          </RevealItem>
          <RevealItem>
            <h2 className="text-5xl md:text-8xl font-serif italic text-white tracking-tight mb-14">
              The Next Chapter Awaits.
            </h2>
          </RevealItem>
          <RevealItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/collection" className="w-full sm:w-auto px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors font-medium">
                Explore Vehicles
              </Link>
              <Link href="/bespoke" className="w-full sm:w-auto px-10 py-4 border border-zinc-700 text-white text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all font-medium">
                Build & Price
              </Link>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>
    </main>
  );
}
