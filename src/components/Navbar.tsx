"use client";

import { useState, useEffect } from "react";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsPastHero(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHeritage = pathname === '/heritage';

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 px-8 flex justify-between items-center transition-all duration-300 ease-in-out border-b ${
          (isHeritage && isPastHero)
            ? "py-4 bg-transparent border-transparent pointer-events-none opacity-0"
            : isScrolled 
              ? "py-4 bg-black/80 backdrop-blur-[16px] border-white/10" 
              : "py-8 bg-transparent border-transparent"
        }`}
      >
        {/* Left Section: 1/3 width */}
        <div className="hidden md:flex items-center w-1/3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm px-1 py-0.5 text-xs uppercase tracking-[0.2em] font-light text-zinc-300"
          >
            <span>Menu</span>
          </button>
          <div className="ml-auto flex items-center gap-8 md:gap-12 pr-4 lg:pr-12 text-xs uppercase tracking-[0.2em] font-light text-zinc-300">
            <Link href="/fsport" className="hover-glow-fsport transition-colors">
              F<span style={{ fontFamily: "system-ui, sans-serif" }}>-</span>sport
            </Link>
            <Link href="/heritage" style={{ fontFamily: "'Alexis', sans-serif", fontSize: "1.4em" }} className="hover-glow-golden transition-colors">
              Heritage
            </Link>
          </div>
        </div>

        {/* Mobile Left Section */}
        <div className="flex md:hidden w-1/3 justify-start">
          <button onClick={() => setIsOpen(true)} className="text-zinc-300 hover:text-white">
            <span className="text-xs uppercase">Menu</span>
          </button>
        </div>

        {/* Center Section: 1/3 width */}
        <div className="flex justify-center w-1/3">
          <Link
            href="/"
            className="text-3xl font-bold tracking-[0.4em] uppercase text-white focus-visible:outline-none rounded-sm px-2 py-1 transition-all duration-500 hover:[text-shadow:0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.4)]"
          >
            LEXUS
          </Link>
        </div>

        {/* Right Section: 1/3 width */}
        <div className="hidden md:flex items-center w-1/3">
          <div className="mr-auto flex items-center gap-8 md:gap-12 pl-4 lg:pl-12 text-xs uppercase tracking-[0.2em] font-light text-zinc-300">
            <Link href="/bespoke" className="hover:text-white transition-colors">
              Bespoke Build
            </Link>
            <Link href="/collection" className="hover-glow-red transition-colors">
              Collection
            </Link>
          </div>
        </div>
        
        {/* Mobile Right Section Spacer */}
        <div className="flex md:hidden w-1/3"></div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-12 right-12 text-zinc-400 hover:text-white transition-colors"
            >
              <span className="text-sm uppercase tracking-widest">Close</span>
            </button>
            <div className="flex flex-col items-center gap-8 md:gap-12 text-center">
              <Link href="/fsport" className="text-3xl md:text-6xl font-serif italic text-white hover:text-[#0066FF] transition-colors">
                F-sport
              </Link>
              <Link href="/heritage" className="text-3xl md:text-6xl font-serif italic text-white hover:text-[#D4AF37] transition-colors">
                Heritage
              </Link>
              <Link href="/collection" className="text-3xl md:text-6xl font-serif italic text-white hover-glow-red transition-colors">
                Collection
              </Link>
              <Link href="/bespoke" className="text-3xl md:text-6xl font-serif italic text-white hover:text-zinc-400 transition-colors">
                Bespoke
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

