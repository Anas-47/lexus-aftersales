"use client";

import { RevealGroup, RevealItem, TypewriterReveal } from "@/components/ui/reveal";
import { LuminaInteractiveList, LuminaSlide } from "@/components/ui/lumina-interactive-list";

export default function Heritage() {
  const heritageSlides: LuminaSlide[] = [
    { title: "LS 400", year: "1989", description: "The flagship that shocked the automotive world. Forged by 3,900 engineers, 450 prototypes, and a billion-dollar investment, the LS 400 set an unprecedented benchmark for NVH (Noise, Vibration, and Harshness). Its 4.0L 1UZ-FE V8 was so impossibly smooth that a pyramid of champagne glasses could rest on its hood at 145 mph without spilling a drop, forever redefining the parameters of luxury.", media: "/LEXUS LS400 1989 highres.jpg" },
    { title: "SC 300/400", year: "1991", description: "A legendary grand tourer born from the revolutionary Calty Design Research studio in California. The SC introduced the world to 3D-mapped engine control and featured advanced hydro-pneumatic suspension engineering. Beneath its sweeping, pillarless-style silhouette lived a masterpiece of aerodynamic grace, proving that Japanese luxury coupes could rival Europe's finest grand tourers on the global stage.", media: "/LEXUS SC300 1992 highres.jpg" },
    { title: "GS 300", year: "1993", description: "The iconic midsize sport sedan that seamlessly fused European aesthetic flair with relentless Japanese engineering. Penned by the legendary Italdesign Giugiaro, its aggressive quad-headlamp silhouette and rear-wheel-drive architecture birthed a new era of performance sedans. It wasn't just a car; it was a bold declaration of intent that Lexus could conquer the sport luxury market.", media: "/LEXUS GS300 2 highres.jpg" },
    { title: "LX 470", year: "1998", description: "Uncompromising luxury meets unstoppable capability. Forged on the bulletproof underpinnings of the legendary Land Cruiser 100 series, the LX 470 was designed to conquer the most unforgiving environments on Earth while enveloping its occupants in vault-like silence and exquisite leather. It cemented Lexus as the undisputed king of luxury overlanding.", media: "/LEXUS LX470 1996 highres.jpg" },
    { title: "IS 300", year: "2000", description: "A rebellious compact sport sedan engineered for pure, unadulterated driving exhilaration. The IS 300 introduced the world to the iconic chronograph-style instrument cluster and 'Altezza' tail lights, reshaping automotive design for over a decade. Powered by the legendary 2JZ inline-six engine, it became an instant cultural phenomenon and a tuning icon.", media: "/LEXUS IS 2000 midres.jpg" },
    { title: "LFA", year: "2010", description: "The absolute pinnacle of Lexus engineering, passion, and acoustic perfection. Ten years in the making, the LFA features a bespoke 4.8L naturally aspirated V10 co-developed with Yamaha that revs from idle to 9,000 RPM in a blistering 0.6 seconds—a feat so rapid it required a fully digital tachometer. Only 500 were ever built, cementing its status as an immortal automotive masterpiece.", media: "/LEXUS LFA highres.jpg" },
    { title: "LC 500", year: "2017", description: "A breathtaking concept car miraculously brought to life. Retaining 95% of the revolutionary LF-LC concept design, the LC 500 is a rolling sculpture of glass, aluminum, and carbon fiber. Propelled by a roaring, naturally aspirated 5.0L V8 soul, it represents the emotional zenith of the Lexus brand, proving that true artistry and high-performance engineering are one and the same.", media: "/LEXUS LC500 convertable highres.jpg" }
  ];

  return (
    <main className="bg-[#050505] min-h-screen">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video src="/LEXUS - Balance.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-105" />
        </div>
        <RevealGroup className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8" delay={0.2} stagger={0.3}>
          <TypewriterReveal 
            text="Heritage"
            style={{ fontFamily: "'Alexis', sans-serif" }} 
            className="text-5xl md:text-8xl tracking-tight leading-tight text-[#D4AF37]"
            delay={0.2}
          />
          <RevealItem>
            <p className="text-zinc-400 font-light uppercase tracking-[0.4em] text-sm md:text-base max-w-2xl mx-auto mt-8">
              The relentless pursuit of perfection.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="relative w-full">
        <LuminaInteractiveList slides={heritageSlides} theme="heritage" />
      </section>
    </main>
  );
}
