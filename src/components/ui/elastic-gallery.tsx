"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export interface ElasticItemProps {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  link: string;
}

interface ElasticGalleryProps {
  title?: string;
  subtitle?: string;
  items?: ElasticItemProps[];
}

export function ElasticGallery({ 
  title = "The Collections.", 
  subtitle = "DISCOVER YOUR LEXUS.",
  items: propItems 
}: ElasticGalleryProps) {
  const defaultItems: ElasticItemProps[] = [
    {
      id: "Signature",
      title: "The Signature Series",
      category: "Flagship Vehicles",
      src: "/lc-coupe.jpg",
      alt: "Signature Series",
      link: "/signature"
    },
    {
      id: "Touring",
      title: "Elevated Touring",
      category: "Crossovers",
      src: "/rx-series.jpg",
      alt: "Elevated Touring",
      link: "/touring"
    },
    {
      id: "Overtrail",
      title: "Overtrail Heritage",
      category: "GX & LX SUVs",
      src: "/LEXUS GX highres.jpg",
      alt: "Overtrail Heritage",
      link: "/overtrail"
    },
    {
      id: "Executive",
      title: "Executive Serenity",
      category: "IS, ES & GS Sedans",
      src: "/LEXUS ES 2024 highres.jpg",
      alt: "Executive Serenity",
      link: "/executive"
    },
    {
      id: "Vanguard",
      title: "Vanguard Collection",
      category: "Electrified & Hybrids",
      src: "/LEXUS dual RX highres.jpg",
      alt: "Vanguard Collection",
      link: "/vanguard"
    },
  ];

  const items = propItems || defaultItems;
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id || null);

  return (
    <section className="w-full py-16 bg-[#050505] md:py-24 overflow-hidden min-h-screen">
      <RevealGroup className="text-center mb-16" delay={0.1}>
        <RevealItem>
          <h2 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">{title}</h2>
        </RevealItem>
        <RevealItem>
          <p className="text-zinc-400 font-light mt-4 tracking-widest uppercase text-sm">{subtitle}</p>
        </RevealItem>
      </RevealGroup>

      <div className="mx-auto flex h-[500px] w-full max-w-[95vw] flex-col gap-2 px-4 md:h-[65vh] md:flex-row md:gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            onMouseEnter={() => setActiveId(item.id)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900",
              "transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              activeId === item.id ? "flex-[4]" : "flex-[1]"
            )}
          >
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={cn(
                  "object-cover transition-transform duration-1000",
                  activeId === item.id ? "scale-100" : "scale-110",
                  item.id === "Overtrail" ? "object-center" : "object-cover"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                  activeId === item.id ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-black/40 transition-opacity duration-500",
                  activeId === item.id ? "opacity-0" : "opacity-100"
                )}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8 z-10">
              <div
                className={cn(
                  "flex flex-col gap-2 transition-all duration-500",
                  activeId === item.id
                    ? "translate-y-0 opacity-100 delay-200"
                    : "translate-y-12 opacity-0"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-3xl font-serif italic text-white md:text-5xl">
                  {item.title}
                </h3>
              </div>

              <div
                className={cn(
                  "absolute transition-all duration-500 bottom-8 left-1/2 -translate-x-1/2",
                  activeId === item.id ? "opacity-0 scale-50" : "opacity-100 delay-500"
                )}
              >
                <span className="hidden whitespace-nowrap text-3xl font-serif italic text-zinc-300 [writing-mode:vertical-rl] md:block">
                  {item.title}
                </span>
                <span className="block text-xs font-bold text-zinc-300 md:hidden">
                  {item.id}
                </span>
              </div>
            </div>

            <div
              className={cn(
                "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-500 md:right-8 md:top-8",
                activeId === item.id
                  ? "translate-y-0 opacity-100 delay-300"
                  : "-translate-y-4 opacity-0"
              )}
            >
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

