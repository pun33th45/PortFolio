"use client";
import { useRef, useEffect, useState } from "react";

interface Props { children: React.ReactNode; className?: string; }

export default function MagneticButton({ children, className = "" }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const [pos, setPos]       = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const RADIUS = 60;

    const onMove = (e: MouseEvent) => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS) {
        const strength = (1 - dist / RADIUS) * 8;
        setPos({ x: (dx / (dist || 1)) * strength, y: (dy / (dist || 1)) * strength });
        setActive(true);
      } else if (active) {
        setPos({ x: 0, y: 0 });
        setActive(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${active ? 1.04 : 1})`,
        transition: active
          ? "transform 0.12s ease"
          : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
}
