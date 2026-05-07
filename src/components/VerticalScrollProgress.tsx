"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",       label: "Home"     },
  { id: "about",      label: "About"    },
  { id: "projects",   label: "Projects" },
  { id: "skills",     label: "Skills"   },
  { id: "experience", label: "Exp"      },
  { id: "contact",    label: "Contact"  },
];

export default function VerticalScrollProgress() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="hidden lg:flex"
      style={{
        position: "fixed",
        right: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9990,
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      {/* Background line */}
      <div style={{
        position: "absolute",
        right: 3,
        top: 0,
        bottom: 0,
        width: 1,
        background: "rgba(6,182,212,0.12)",
        borderRadius: 1,
      }} />

      {SECTIONS.map(s => {
        const isActive = active === s.id;
        return (
          <div
            key={s.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
          >
            {/* Label — only shown for active */}
            <span style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.1em",
              color: "rgba(6,182,212,0.85)",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "none" : "translateX(6px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              whiteSpace: "nowrap",
            }}>
              {s.label}
            </span>

            {/* Dot */}
            <div style={{
              width:  isActive ? 8 : 4,
              height: isActive ? 8 : 4,
              borderRadius: "50%",
              background: isActive ? "#06B6D4" : "rgba(6,182,212,0.28)",
              boxShadow: isActive ? "0 0 8px rgba(6,182,212,0.8), 0 0 16px rgba(6,182,212,0.3)" : "none",
              transition: "all 0.35s ease",
              flexShrink: 0,
            }} />
          </div>
        );
      })}
    </div>
  );
}
