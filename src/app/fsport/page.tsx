"use client";

import { FSportElasticGallery } from "@/components/ui/fsport-elastic-gallery";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SvgStrokeReveal } from "@/components/ui/svg-stroke-reveal";

export default function FSport() {
  return (
    <main>
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video src="/GSF.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
        </div>
      </section>
      
      <section className="pt-32 pb-16 px-8 bg-[#050505] text-center">
        <RevealGroup className="max-w-4xl mx-auto space-y-8" delay={0.2} stagger={0.3}>
          <RevealItem>
            <SvgStrokeReveal text={<>F<tspan fontFamily="system-ui, sans-serif">-</tspan>SPORT</>} className="w-[300px] md:w-[600px] mx-auto mb-4" strokeColor="#0066FF" fillColor="#0066FF" duration={4} viewBox="0 0 800 150" fontSize="130px" strokeWidth="2px" fontFamily="'Nobel-Regular', sans-serif" />
          </RevealItem>
          <RevealItem>
            <p className="text-zinc-400 font-light uppercase tracking-[0.4em] text-sm md:text-base max-w-2xl mx-auto mt-8">
              Engineering a more intelligent path forward.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="pb-32 px-8 bg-[#050505] text-center">
        <RevealGroup className="max-w-3xl mx-auto space-y-12" delay={0.1} stagger={0.2}>
          <RevealItem>
            <h2 className="text-xs uppercase tracking-[0.4em] text-[#0066FF] mb-4">Born on the Track</h2>
            <h3 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">Forged from the DNA of the legendary LFA.</h3>
          </RevealItem>
          
          <RevealItem>
            <div className="w-px h-16 bg-gradient-to-b from-[#0066FF] to-transparent mx-auto"></div>
          </RevealItem>
          
          <RevealItem>
            <p className="text-zinc-400 font-light leading-relaxed text-base md:text-lg">
              Tuned on the world<span style={{ fontFamily: "system-ui, sans-serif" }}>'</span>s most demanding circuits, the F<span style={{ fontFamily: "system-ui, sans-serif" }}>-</span>sport badge is a promise of visceral performance. From aggressively bolstered seating to adaptive variable suspension, every detail is meticulously engineered to blur the line between driver and machine.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <FSportElasticGallery />
    </main>
  );
}



