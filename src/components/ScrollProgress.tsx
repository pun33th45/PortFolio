"use client";
import { motion, useScroll, useSpring } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: s, transformOrigin: "left",
        background: "linear-gradient(90deg, #06B6D4, #2563EB, #8B5CF6)",
        position:"fixed", top:0, left:0, right:0, height:2, zIndex:9998 }}
    />
  );
}
