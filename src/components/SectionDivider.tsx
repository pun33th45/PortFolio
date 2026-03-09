"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Subtle animated glow separator placed between major sections.
 * Fades in when it enters the viewport.
 */
export default function SectionDivider({ variant = "cyan" }: { variant?: "cyan" | "purple" | "blue" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const colors: Record<string, { line: string; dot: string; glow: string }> = {
    cyan:   { line: "rgba(6,182,212,0.15)",   dot: "#06B6D4", glow: "rgba(6,182,212,0.3)"   },
    purple: { line: "rgba(139,92,246,0.15)",  dot: "#8B5CF6", glow: "rgba(139,92,246,0.3)"  },
    blue:   { line: "rgba(59,130,246,0.15)",  dot: "#3B82F6", glow: "rgba(59,130,246,0.3)"  },
  };
  const c = colors[variant];

  return (
    <div ref={ref} className="relative flex items-center justify-center py-2 overflow-hidden" aria-hidden>
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 h-px origin-right"
        style={{ background: `linear-gradient(90deg, transparent, ${c.line})` }}
      />

      {/* Center glow dot + ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative mx-4 flex items-center justify-center"
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-full"
          style={{ background: c.glow }}
        />
        {/* Center dot */}
        <div
          className="w-1.5 h-1.5 rounded-full relative z-10"
          style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}, 0 0 16px ${c.glow}` }}
        />
      </motion.div>

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 h-px origin-left"
        style={{ background: `linear-gradient(270deg, transparent, ${c.line})` }}
      />
    </div>
  );
}
