"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "brightness(0)" }}
        animate={{ opacity: 1, filter: "brightness(1)" }}
        exit={{ opacity: 0, filter: "brightness(0)" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#050505] min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
