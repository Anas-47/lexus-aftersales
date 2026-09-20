"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function RevealGroup({
  children,
  className,
  delay = 0,
  stagger = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const y = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const x = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, x, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TypewriterReveal({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split text into an array of characters
  const characters = Array.from(text);

  return (
    <motion.h1
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1, // delay between each character
            delayChildren: delay,
          },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, display: "none" },
            visible: { 
              opacity: 1, 
              display: "inline-block",
              transition: { duration: 0.01 }
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function ScrambleText({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    if (!isInView) return;
    
    let timeoutId: NodeJS.Timeout;
    
    timeoutId = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 4;
      }, 40);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(timeoutId);
  }, [isInView, text, delay]);

  return (
    <h1 ref={ref} className={className} style={style}>
      {displayText || text.replace(/./g, " ")}
    </h1>
  );
}
