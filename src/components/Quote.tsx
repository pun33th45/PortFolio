"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Quote() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-36 overflow-hidden quote-scan">
      {/* Deep layered glow background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Wide outer glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.07) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)" }}
        />
        {/* Tight center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, rgba(6,182,212,0.08) 50%, transparent 80%)" }}
        />
        {/* Animated pulse blob */}
        <motion.div
          animate={{
            opacity: [0.04, 0.10, 0.04],
            scale:   [1, 1.08, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(ellipse, #06B6D4, #3B82F6, #8B5CF6)" }}
        />
      </div>

      {/* Decorative horizontal lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.08) 20%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.08) 80%, transparent 100%)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Opening quotation mark */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display font-black leading-none mb-4 select-none"
            style={{
              fontSize: "8rem",
              background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.15))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 0.8,
            }}
          >&ldquo;</motion.div>

          {/* Quote text */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display font-bold leading-tight tracking-tight mb-10"
            style={{ fontSize: "clamp(1.75rem,4vw,3.25rem)" }}
          >
            <span className="text-white">Great engineers don&apos;t just write code</span>
            {" "}
            <span
              style={{
                background: "linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(6,182,212,0.25))",
              }}
            >
              — they design the future.
            </span>
          </motion.p>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.div
              animate={inView ? { scaleX: [0, 1] } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px w-16 origin-right"
              style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.45))" }}
            />
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }}
              />
              <span className="font-mono text-xs tracking-[0.25em]" style={{ color: "rgba(6,182,212,0.6)" }}>
                PUNEETH RAJ
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#8B5CF6", boxShadow: "0 0 6px #8B5CF6" }}
              />
            </div>
            <motion.div
              animate={inView ? { scaleX: [0, 1] } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-px w-16 origin-left"
              style={{ background: "linear-gradient(270deg, transparent, rgba(139,92,246,0.45))" }}
            />
          </motion.div>

          {/* Bottom neon glow tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65 }}
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border"
            style={{ borderColor: "rgba(6,182,212,0.2)", boxShadow: "0 0 20px rgba(6,182,212,0.06)" }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }}
            />
            <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
              AI ENGINEER · ML DEVELOPER · SYSTEM BUILDER
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
