"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";

interface FSportItemProps {
  id: string;
  title: string;
  category: string;
  description: string;
  overlay: string;
  tagClass: string;
  titleClass: string;
  image: string;
}

export function FSportElasticGallery() {
  const items: FSportItemProps[] = [
    {
      id: "IS F",
      title: "IS F",
      category: "V8 Sedan",
      description: "The spark that ignited the F marque. A naturally aspirated 5.0L V8 stuffed into a compact sedan, creating an aggressive, roaring legacy.",
      overlay: "bg-black/40",
      tagClass: "border-[#0066FF]/30 bg-[#0066FF]/20 text-white",
      titleClass: "text-white",
      image: "/isf.jpg"
    },
    {
      id: "GS F",
      title: "GS F",
      category: "Executive",
      description: "A dual-personality masterpiece. A luxurious executive cruiser that transforms into a track-ready, V8-powered predator on command.",
      overlay: "bg-black/40",
      tagClass: "border-[#0066FF]/30 bg-[#0066FF]/20 text-white",
      titleClass: "text-white",
      image: "/gsf.jpg"
    },
    {
      id: "RC F",
      title: "RC F",
      category: "Track Coupe",
      description: "Aggressive aero, torque-vectoring differentials, and an unrelenting 472-hp naturally aspirated heart. Born for the apex.",
      overlay: "bg-black/40",
      tagClass: "border-[#0066FF]/30 bg-[#0066FF]/20 text-white",
      titleClass: "text-white",
      image: "/rcf.jpg"
    },
    {
      id: "LFA",
      title: "LFA",
      category: "V10 Supercar",
      description: "The absolute pinnacle of Lexus engineering. A hand-built, carbon-fiber titan with a naturally aspirated V10 that sings an unforgettable F1-inspired symphony.",
      overlay: "bg-black/40",
      tagClass: "border-[#D4AF37]/30 bg-[#D4AF37]/20 text-white",
      titleClass: "text-white",
      image: "/lfa.jpg"
    },
  ];

  const [activeId, setActiveId] = useState<string | null>("IS F");

  return (
    <section className="w-full py-20 bg-[#050505] md:py-32 relative z-20">
      <RevealGroup className="text-center mb-16" delay={0.2}>
        <RevealItem>
          <h2 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight">Command the Arsenal.</h2>
        </RevealItem>
      </RevealGroup>

      <div className="mx-auto flex h-[500px] w-full max-w-[90vw] flex-col gap-2 px-4 md:h-[60vh] md:flex-row md:gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-sm border border-zinc-800 bg-gradient-to-br from-[#0a0a0a] to-[#000000]",
              "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group",
              activeId === item.id ? "flex-[4]" : "flex-[1]",
              activeId === item.id ? "brightness-100" : "brightness-50 hover:brightness-75"
            )}
          >
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={cn(
                  "object-cover transition-transform duration-1000",
                  activeId === item.id ? "scale-100" : "scale-110",
                  item.id === "RC F" ? "object-left" : "object-center" // Adjusting RC F specifically if needed
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500",
                  activeId === item.id ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  item.overlay,
                  activeId === item.id ? "opacity-0" : "opacity-100"
                )}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8 z-10">
              <div
                className={cn(
                  "flex flex-col gap-2 transition-all duration-500",
                  activeId === item.id ? "translate-y-0 opacity-100 delay-200" : "translate-y-12 opacity-0"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-sm border px-2 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur-md md:px-3 md:text-xs", item.tagClass)}>
                    {item.category}
                  </span>
                </div>
                <h3 
                  className={cn("text-5xl uppercase leading-none md:text-7xl tracking-widest", item.titleClass)}
                  style={{ fontFamily: "'Nobel-Regular', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="max-w-md text-sm md:text-base text-zinc-300 font-light mt-2 hidden md:block leading-relaxed">
                  {item.description}
                </p>
                {/* Mobile version, slightly smaller text/margin */}
                <p className="max-w-md text-xs text-zinc-300 font-light mt-1 block md:hidden leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div
                className={cn(
                  "absolute transition-all duration-500 bottom-4 left-1/2 -translate-x-1/2 md:bottom-8",
                  activeId === item.id ? "opacity-0 scale-50" : "opacity-100 delay-500"
                )}
              >
                <span 
                  className="hidden whitespace-nowrap text-3xl uppercase tracking-widest text-zinc-300 [writing-mode:vertical-rl] md:block"
                  style={{ fontFamily: "'Nobel-Regular', sans-serif" }}
                >
                  {item.title}
                </span>
                <span className="block text-xs font-bold text-zinc-300 md:hidden">
                  {item.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
