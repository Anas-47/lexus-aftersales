import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SvgStrokeRevealProps {
  text: ReactNode;
  className?: string;
  fontSize?: string | number;
  fontFamily?: string;
  duration?: number;
  strokeColor?: string;
  fillColor?: string;
  viewBox?: string;
  strokeWidth?: string;
}

export function SvgStrokeReveal({
  text,
  className,
  fontSize = "120px",
  fontFamily = "inherit",
  duration = 3,
  strokeColor = "currentColor",
  fillColor = "currentColor",
  viewBox = "0 0 1000 200",
  strokeWidth = "2px",
}: SvgStrokeRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={cn("relative inline-block w-full overflow-visible", className)}>
      <style>{`
        @keyframes stroke-reveal-anim {
          0% {
            stroke-dasharray: 4000;
            stroke-dashoffset: 4000;
            fill: transparent;
            stroke: ${strokeColor};
          }
          40% {
            stroke-dasharray: 4000;
            stroke-dashoffset: 0;
            fill: transparent;
            stroke: ${strokeColor};
          }
          70%, 100% {
            stroke-dasharray: 4000;
            stroke-dashoffset: 0;
            fill: ${fillColor};
            stroke: transparent;
          }
        }
        .svg-stroke-text {
          stroke-width: ${strokeWidth};
          stroke-dasharray: 4000;
          stroke-dashoffset: 4000;
          fill: transparent;
          stroke: ${strokeColor};
        }
        .animate-ready {
          animation: stroke-reveal-anim ${duration}s ease-in-out forwards;
        }
      `}</style>
      <svg
        className="w-full h-auto overflow-visible"
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={fontSize}
          fontFamily={fontFamily}
          className={cn("svg-stroke-text", isInView && "animate-ready")}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
