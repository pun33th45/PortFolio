"use client";
import { motion } from "framer-motion";

interface Props { children: React.ReactNode; className?: string; }

export default function MagneticButton({ children, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
