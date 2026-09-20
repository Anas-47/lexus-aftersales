"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TransitionOverlay() {
  const pathname = usePathname();

  useEffect(() => {
    const overlay = document.getElementById("page-transition-overlay");
    if (overlay) {
      // Fade out the overlay when the pathname changes (new page loaded)
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }
  }, [pathname]);

  return (
    <div 
      id="page-transition-overlay" 
      className="fixed inset-0 bg-[#050505] z-[9999] opacity-100 pointer-events-none transition-opacity duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
    />
  );
}
