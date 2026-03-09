"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Initializing Portfolio...",
  "Loading AI Projects...",
  "Rendering Interface...",
  "Launching Developer Environment...",
];

export default function LoadingScreen() {
  // `gone` = true removes the node from DOM entirely (after CSS fade finishes)
  const [gone, setGone]     = useState(false);
  const [stepIdx, setStepIdx] = useState(0);

  // Use a ref so interval callback always has the latest index without
  // the closure going stale across Strict-Mode double-invocations.
  const counterRef = useRef(0);

  useEffect(() => {
    // Step cycling — every 480 ms
    counterRef.current = 0;
    const si = setInterval(() => {
      counterRef.current += 1;
      if (counterRef.current < STEPS.length) {
        setStepIdx(counterRef.current);
      } else {
        clearInterval(si);
      }
    }, 480);

    // Remove from DOM 400 ms after the CSS fade finishes
    // CSS fade: delay 2.3s + duration 0.7s = 3.0s total → add 100ms buffer
    const ht = setTimeout(() => setGone(true), 3100);

    return () => {
      clearInterval(si);
      clearTimeout(ht);
    };
  }, []);

  if (gone) return null;

  return (
    /*
      The exit is driven purely by the CSS animation in globals.css:
        .loading-exit { animation: fade-out-load 0.7s ease 2.3s forwards; }
      This is immune to React Strict Mode double-invoke because the browser
      owns the CSS timeline — it starts when the element is painted and ends
      after 3s regardless of what React does with effects.
    */
    <div
      className="loading-exit fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#05050A" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08), rgba(6,182,212,0.06) 35%, transparent 70%)" }}
        />
      </div>

      {/* Corner brackets */}
      {[
        "top-8 left-8 border-t-2 border-l-2",
        "top-8 right-8 border-t-2 border-r-2",
        "bottom-8 left-8 border-b-2 border-l-2",
        "bottom-8 right-8 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 ${cls}`}
          style={{ borderColor: "rgba(6,182,212,0.4)" }}
        />
      ))}

      {/* Neural rings */}
      <div className="relative mb-10">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full"
          style={{
            border: "1.5px solid transparent",
            background: "linear-gradient(#05050A,#05050A) padding-box, linear-gradient(135deg,#3B82F6,#06B6D4,#8B5CF6) border-box",
          }}
        />
        {/* Middle ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full"
          style={{
            border: "1.5px solid transparent",
            background: "linear-gradient(#05050A,#05050A) padding-box, linear-gradient(225deg,#06B6D4,#8B5CF6) border-box",
          }}
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-9 rounded-full"
          style={{
            border: "1px solid transparent",
            background: "linear-gradient(#05050A,#05050A) padding-box, linear-gradient(90deg,#3B82F6aa,transparent 50%,#06B6D4aa) border-box",
          }}
        />
        {/* Center orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-9 h-9 rounded-full"
            style={{ background: "radial-gradient(circle,#06B6D4,#3B82F6 55%,#8B5CF6)" }}
          />
        </div>
        {/* Orbital dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={deg}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.23 }}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: "50%", left: "50%",
              background: i % 2 === 0 ? "#06B6D4" : "#8B5CF6",
              transform: `rotate(${deg}deg) translateX(60px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Name — immediately visible, no opacity-0 initial */}
      <h1
        className="font-display font-black text-5xl mb-2 tracking-tight grad"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Puneeth Raj
      </h1>

      <p
        className="font-mono text-xs tracking-[0.3em] mb-8"
        style={{ color: "rgba(6,182,212,0.6)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        AI ENGINEER &amp; ML DEVELOPER
      </p>

      {/* Cycling step text — uses AnimatePresence just for text swap */}
      <div className="h-6 flex items-center justify-center mb-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-sm flex items-center gap-2"
            style={{ color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#06B6D4" }} />
            {STEPS[stepIdx]}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              style={{ color: "#8B5CF6" }}
            >
              █
            </motion.span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar — CSS animation duration matches the step cycle */}
      <div className="w-56 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6)",
            animation: "grow-bar 2.1s ease forwards",
          }}
        />
      </div>

      {/* Step indicator pills */}
      <div className="flex gap-2 mt-5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width:      i === stepIdx ? 20 : 6,
              background: i <= stepIdx
                ? "linear-gradient(90deg,#06B6D4,#8B5CF6)"
                : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
