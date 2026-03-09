"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-screen"
            style={{ left: pos.x, top: pos.y, translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: clicking ? 0.8 : 1 }}
            transition={{ duration: 0.1 }}
          >
            <div className={`rounded-full transition-all duration-150 ${clicking ? "w-5 h-5" : "w-4 h-4"}`} style={{ background: "rgba(0,212,255,0.9)", boxShadow: "0 0 10px rgba(0,212,255,0.8)" }} />
          </motion.div>
          <motion.div
            className="fixed pointer-events-none z-[9998] rounded-full border border-neon-cyan/30"
            style={{ width: 40, height: 40, left: pos.x - 20, top: pos.y - 20 }}
            animate={{ scale: clicking ? 1.5 : 1, opacity: clicking ? 0.3 : 0.6 }}
            transition={{ duration: 0.15 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
