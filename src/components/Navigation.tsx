"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about",      label: "About"      },
  { href: "#projects",   label: "Projects"   },
  { href: "#skills",     label: "Skills"     },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact"    },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Bottom-up priority: last visible section wins
      const sections = LINKS.map(l => document.querySelector(l.href));
      let found = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          found = LINKS[i].href; break;
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to md+
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass border border-white/8 py-3 px-5 shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
            : ""
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-black text-xl tracking-tight flex items-center gap-2 flex-shrink-0"
        >
          <span className="grad-cp">PR</span>
          <span className="text-white/20 font-mono text-sm hidden sm:inline">/ portfolio</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {LINKS.map(l => {
            const isActive = active === l.href;
            return (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      border:     "1px solid rgba(6,182,212,0.25)",
                      boxShadow:  "0 0 12px rgba(6,182,212,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {/* Active bottom glow dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg glass border border-white/8 transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ color: open ? "#06B6D4" : "rgba(255,255,255,0.6)" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="block"><X    size={18} /></motion.span>
              : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.15 }} className="block"><Menu size={18} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1,  y: 0,   scale: 1    }}
            exit={{    opacity: 0,  y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mx-3 mt-2 glass rounded-2xl border border-white/8 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          >
            {LINKS.map((l, i) => {
              const isActive = active === l.href;
              return (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => go(l.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-between"
                  style={{
                    background:  isActive ? "rgba(6,182,212,0.08)"         : "transparent",
                    borderLeft:  isActive ? "2px solid rgba(6,182,212,0.5)" : "2px solid transparent",
                    color:       isActive ? "#06B6D4"                       : "rgba(255,255,255,0.6)",
                    paddingLeft: isActive ? "14px"                          : "16px",
                  }}
                >
                  {l.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
