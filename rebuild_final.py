import os

BASE = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src"
ROOT = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio"

files = {}

# ── tailwind.config.ts ──────────────────────────────────────────────────────
files["tailwind"] = (os.path.join(ROOT, "tailwind.config.ts"), '''import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          blue:   "#2563EB",
          cyan:   "#06B6D4",
          purple: "#8B5CF6",
          green:  "#10B981",
        },
        bg: {
          base: "#07070A",
          card: "rgba(255,255,255,0.035)",
          border: "rgba(255,255,255,0.08)",
        },
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
''')

# ── globals.css ──────────────────────────────────────────────────────────────
files["css"] = (os.path.join(BASE, "app/globals.css"), '''@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --blue:   #2563EB;
  --cyan:   #06B6D4;
  --purple: #8B5CF6;
  --green:  #10B981;
  --bg:     #07070A;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background-color: var(--bg);
  color: #f1f5f9;
  font-family: "Inter", sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Custom cursor (pointer devices only) ── */
@media (pointer: fine) {
  *, *::before, *::after { cursor: none !important; }
}

/* ── Glass card ── */
.glass {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* ── Gradient text ── */
.grad {
  background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.grad-cp {
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Cyber grid bg ── */
.cyber-grid {
  background-image: linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--cyan), var(--purple));
  border-radius: 2px;
}

/* ── Glow pulse animation ── */
@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1;   }
}
.glow-pulse { animation: glow-pulse 2.5s ease-in-out infinite; }

/* ── Floating orb animation ── */
@keyframes orb-float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-18px) scale(1.03); }
}

/* ── Section connector line ── */
.section-line {
  position: absolute;
  left: 50%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(6,182,212,0.25), transparent);
}
''')

# ── PremiumCursor.tsx ────────────────────────────────────────────────────────
files["cursor"] = (os.path.join(BASE, "components/PremiumCursor.tsx"), '''"use client";
import { useEffect, useRef } from "react";

export default function PremiumCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current, r = ring.current;
    if (!d || !r) return;
    let mx = -200, my = -200, rx = -200, ry = -200, big = false, raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      d.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
    });
    document.addEventListener("mouseover", e => {
      if ((e.target as HTMLElement).closest("a,button,[role=button],input,textarea")) {
        big = true;
        r.style.width = r.style.height = "38px";
        r.style.borderColor = "rgba(6,182,212,0.6)";
        r.style.background  = "rgba(6,182,212,0.07)";
      }
    });
    document.addEventListener("mouseout", e => {
      if (!(e.relatedTarget as HTMLElement)?.closest("a,button,[role=button],input,textarea")) {
        big = false;
        r.style.width = r.style.height = "22px";
        r.style.borderColor = "rgba(6,182,212,0.3)";
        r.style.background  = "transparent";
      }
    });

    const tick = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12);
      const h = big ? 19 : 11;
      r.style.transform = `translate(${rx - h}px,${ry - h}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:"fixed", top:0, left:0, width:6, height:6, borderRadius:"50%",
        background:"#06B6D4", pointerEvents:"none", zIndex:10000,
        boxShadow:"0 0 10px rgba(6,182,212,0.9)",
      }} />
      <div ref={ring} style={{
        position:"fixed", top:0, left:0, width:22, height:22, borderRadius:"50%",
        border:"1.5px solid rgba(6,182,212,0.3)", pointerEvents:"none", zIndex:9999,
        transition:"width .18s ease,height .18s ease,border-color .18s ease,background .18s ease",
      }} />
    </>
  );
}
''')

# ── ParticleNetwork.tsx ─────────────────────────────────────────────────────
files["particles"] = (os.path.join(BASE, "components/ParticleNetwork.tsx"), '''"use client";
import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const mouse = { x: -999, y: -999 };
    window.addEventListener("resize", () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const N = 70;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.hypot(dx, dy);
        if (dist < 150) { p.x -= dx * .003; p.y -= dy * .003; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.4)"; ctx.fill();
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(6,182,212,${(1 - d / 120) * 0.12})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", opacity:.6 }} />;
}
''')

# ── ScrollProgress.tsx ───────────────────────────────────────────────────────
files["scroll"] = (os.path.join(BASE, "components/ScrollProgress.tsx"), '''"use client";
import { motion, useScroll, useSpring } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div style={{ scaleX: s, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9998]"
      style2={{ background: "linear-gradient(90deg, #06B6D4, #2563EB, #8B5CF6)" }}
    />
  );
}
''')

# ── Navigation.tsx ───────────────────────────────────────────────────────────
files["nav"] = (os.path.join(BASE, "components/Navigation.tsx"), '''"use client";
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
      const sections = LINKS.map(l => document.querySelector(l.href));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(LINKS[i].href); return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${scrolled ? "glass border border-white/8 py-3 px-6 shadow-[0_4px_32px_rgba(0,0,0,0.4)]" : ""}`}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-black text-xl tracking-tight">
          <span className="grad-cp">PR</span>
          <span className="text-white/20 font-mono text-sm ml-2">/ portfolio</span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <button key={l.href} onClick={() => go(l.href)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === l.href
                  ? "text-white bg-white/8 border border-white/10"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >{l.label}</button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setOpen(o => !o)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            className="md:hidden mt-2 mx-4 glass rounded-2xl border border-white/8 p-4 space-y-1">
            {LINKS.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
''')

# ── Hero.tsx ─────────────────────────────────────────────────────────────────
files["hero"] = (os.path.join(BASE, "components/Hero.tsx"), '''"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

const ROLES = [
  "AI & Machine Learning Engineer",
  "Neural Network Architect",
  "Intelligent Systems Builder",
  "Full-Stack AI Developer",
];

export default function Hero() {
  const [idx, setIdx]         = useState(0);
  const [txt, setTxt]         = useState("");
  const [del, setDel]         = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);
  const { scrollYProgress }   = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  useEffect(() => {
    const role = ROLES[idx];
    let t: NodeJS.Timeout;
    if (!del && txt.length < role.length)
      t = setTimeout(() => setTxt(role.slice(0, txt.length + 1)), 55);
    else if (!del && txt.length === role.length)
      t = setTimeout(() => setDel(true), 2600);
    else if (del && txt.length > 0)
      t = setTimeout(() => setTxt(role.slice(0, txt.length - 1)), 28);
    else { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [txt, del, idx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 cyber-grid opacity-100" />
      {/* Top glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.12) 0%, transparent 70%)" }} />

      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-cyan/20 mb-8 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-xs font-mono text-brand-cyan tracking-widest">AVAILABLE FOR OPPORTUNITIES</span>
              <Sparkles size={10} className="text-brand-cyan" />
            </motion.div>

            {/* Name */}
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:.2, duration:.7 }} className="mb-6">
              <div className="text-white/30 font-mono text-sm mb-3 tracking-widest">&lt; AI Engineer /&gt;</div>
              <h1 className="font-display font-black leading-[0.9] tracking-tight">
                <span className="block text-white" style={{ fontSize:"clamp(3.5rem,8vw,7rem)" }}>Puneeth</span>
                <span className="block grad-cp"    style={{ fontSize:"clamp(3.5rem,8vw,7rem)" }}>Raj</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.4 }}
              className="h-8 mb-6 flex items-center">
              <Terminal size={13} className="text-brand-cyan/50 mr-2 shrink-0" />
              <span className="font-mono text-base text-white/65">
                {txt}
                <span className="inline-block w-0.5 h-5 bg-brand-cyan ml-0.5 animate-pulse align-middle" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.5 }}
              className="text-white/50 leading-relaxed mb-10 max-w-lg">
              Third-year B.Tech CS student specializing in{" "}
              <span className="text-brand-cyan">AI & Machine Learning</span> at Sreyas Institute.
              Building production-ready AI systems that create real-world impact.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:.6 }}
              className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => scrollTo("projects")}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[.97]"
                style={{ background:"linear-gradient(135deg,#2563EB,#06B6D4)", boxShadow:"0 0 24px rgba(37,99,235,0.35)" }}>
                View Projects
              </button>
              <button onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white/80 glass border border-white/10 hover:border-brand-cyan/30 hover:text-white transition-all duration-200 hover:scale-[1.03] active:scale-[.97]">
                Contact Me
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.75 }}
              className="flex gap-8 mb-8">
              {[["16+","Projects"],["15+","Technologies"],["2025","Intern"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-black font-display grad">{v}</div>
                  <div className="text-xs text-white/35 font-mono">{l}</div>
                </div>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.9 }}
              className="flex gap-2">
              {[
                { icon: Github,   href: "https://github.com/pun33th45",                       label:"GitHub"   },
                { icon: Linkedin, href: "https://www.linkedin.com/in/puneeth-raj-774506211", label:"LinkedIn" },
                { icon: Mail,     href: "mailto:puneethraaaj@gmail.com",                       label:"Email"    },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  className="p-3 glass rounded-xl border border-white/8 text-white/40 hover:text-brand-cyan hover:border-brand-cyan/25 transition-all duration-200">
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Globe */}
          <motion.div initial={{ opacity:0, scale:.85 }} animate={{ opacity:1, scale:1 }}
            transition={{ delay:.3, duration:1 }}
            className="relative hidden lg:flex items-center justify-center" style={{ height:"520px" }}>
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-brand-cyan/8 glow-pulse" />
              <div className="absolute w-96 h-96 rounded-full border border-brand-purple/5" />
              <div className="absolute w-56 h-56 rounded-full"
                style={{ background:"radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }} />
            </div>
            <div className="w-full h-full">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-brand-cyan animate-pulse" /></div>}>
                <Globe3D />
              </Suspense>
            </div>
            {/* Floating labels */}
            {[
              { label:"TensorFlow", x:"6%",  y:"18%", d:.8 },
              { label:"Neural NLP", x:"72%", y:"14%", d:1.0 },
              { label:"Python",     x:"4%",  y:"66%", d:1.2 },
              { label:"React",      x:"76%", y:"70%", d:1.4 },
            ].map(f => (
              <motion.div key={f.label} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:f.d }}
                className="absolute font-mono text-xs text-brand-cyan/65 px-2 py-1 glass rounded-lg border border-brand-cyan/15"
                style={{ left:f.x, top:f.y }}>
                {f.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={() => scrollTo("about")}>
          <span className="text-[10px] font-mono text-white/20 tracking-widest">EXPLORE</span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.8, repeat:Infinity }}>
            <ArrowDown size={13} className="text-brand-cyan/35" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
''')

# ── About.tsx ────────────────────────────────────────────────────────────────
files["about"] = (os.path.join(BASE, "components/About.tsx"), '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Lightbulb, MapPin, Rocket, Users } from "lucide-react";

const QUALITIES = [
  { icon: Brain,     label:"AI-First Thinking", desc:"Every problem is an opportunity to apply intelligent solutions" },
  { icon: Code2,     label:"Clean Architecture", desc:"Code that is readable, scalable, and maintainable"            },
  { icon: Rocket,    label:"System Builder",     desc:"Designing scalable AI systems that solve real problems"        },
  { icon: Lightbulb, label:"Innovation Driven",  desc:"Constantly exploring new technologies and research"           },
];

const TIMELINE = [
  { year:"2021", title:"Started Coding",       desc:"Began with Python and C fundamentals",                           color:"#06B6D4" },
  { year:"2023", title:"B.Tech Enrollment",    desc:"Joined Sreyas Institute — CS (AI & ML specialization)",          color:"#8B5CF6" },
  { year:"2023", title:"First ML Project",     desc:"Built ML-Based Translator with Seq2Seq + Bahdanau Attention",    color:"#2563EB" },
  { year:"2024", title:"Web Dev Internship",   desc:"Joined Terabeam Proxim Wireless as Web Development Intern",      color:"#10B981" },
];

function Card({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:.5, delay }}
    >{children}</motion.div>
  );
}

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Heading */}
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            ABOUT ME
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Who I <span className="grad">Am</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Building intelligent systems at the intersection of AI and software engineering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Bio + qualities */}
          <div className="space-y-6">
            <Card delay={.1}>
              <div className="glass rounded-2xl border border-white/8 p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background:"linear-gradient(135deg,rgba(6,182,212,0.15),rgba(139,92,246,0.15))" }}>
                    <span className="text-xl font-black grad-cp font-display">PR</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">Puneeth Raj</h3>
                    <p className="text-brand-cyan text-sm font-mono">AI Engineer & CS Student</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-white/35" />
                      <span className="text-white/35 text-xs">Hyderabad, India</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed mb-3">
                  As a third-year Computer Science student specializing in{" "}
                  <span className="text-brand-cyan font-medium">AI & Machine Learning</span>, I bridge the gap
                  between intelligent systems and practical applications.
                </p>
                <p className="text-white/60 leading-relaxed">
                  My work focuses on building systems that{" "}
                  <span className="text-brand-purple font-medium">understand context</span>, predict outcomes,
                  and create genuine value. I believe the best technology is invisible to the user but
                  transformative in impact.
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {QUALITIES.map((q, i) => (
                <Card key={q.label} delay={.2 + i * .08}>
                  <div className="glass rounded-xl border border-white/8 p-4 hover:border-brand-cyan/20 transition-all group">
                    <q.icon size={18} className="text-brand-cyan mb-2.5 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-semibold text-white mb-1">{q.label}</div>
                    <div className="text-xs text-white/40 leading-relaxed">{q.desc}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT — Education + timeline */}
          <div className="space-y-6">
            {/* Education */}
            <Card delay={.15}>
              <div className="glass rounded-2xl border border-brand-purple/20 p-6">
                <div className="text-xs font-mono text-brand-purple/70 mb-3">EDUCATION</div>
                <div className="text-white font-bold text-lg">B.Tech Computer Science (AI & ML)</div>
                <div className="text-brand-purple text-sm font-mono mt-1">Sreyas Institute of Engineering and Technology</div>
                <div className="text-white/35 text-xs font-mono mt-2">2023 – Present</div>
              </div>
            </Card>

            {/* Timeline */}
            <Card delay={.2}>
              <div className="glass rounded-2xl border border-white/8 p-6">
                <div className="text-xs font-mono text-white/40 mb-5">JOURNEY</div>
                <div className="relative">
                  <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan/40 via-brand-purple/40 to-transparent" />
                  <div className="space-y-5">
                    {TIMELINE.map((t, i) => (
                      <motion.div key={i} initial={{ opacity:0, x:12 }} whileInView={{ opacity:1, x:0 }}
                        viewport={{ once:true }} transition={{ delay:.3 + i * .08 }}
                        className="relative pl-9">
                        <div className="absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background:`${t.color}18`, border:`1px solid ${t.color}35` }}>
                          <div className="w-2 h-2 rounded-full" style={{ background:t.color }} />
                        </div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono" style={{ color:t.color }}>{t.year}</span>
                          <span className="text-sm font-semibold text-white">{t.title}</span>
                        </div>
                        <p className="text-white/45 text-xs">{t.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
''')

# ── AIFocus.tsx ──────────────────────────────────────────────────────────────
files["aifocus"] = (os.path.join(BASE, "components/AIFocus.tsx"), '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Database, Lightbulb, Zap } from "lucide-react";

const CARDS = [
  { icon: Brain,     title:"Machine Learning Systems",   desc:"Designing models that learn from data, improve predictions over time, and adapt to real-world complexity — from Seq2Seq to transformer architectures.", color:"#06B6D4" },
  { icon: Lightbulb, title:"AI Problem Solving",         desc:"Applying machine learning to concrete problems — image segmentation, NLP-powered resume analysis — with measurable, production-ready results.",           color:"#8B5CF6" },
  { icon: Database,  title:"Data-Driven Thinking",       desc:"Using data insights to guide intelligent decisions. Every model begins with understanding the distribution, quality, and structure of the data.",          color:"#2563EB" },
  { icon: Zap,       title:"Automation & Intelligence",  desc:"Building systems that automate complex reasoning tasks — smart code editors, prompt engineering platforms, and real-time analytics pipelines.",           color:"#10B981" },
];

export default function AIFocus() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="ai-focus" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      {/* Center ambient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full blur-3xl"
          style={{ background:"radial-gradient(ellipse, rgba(37,99,235,0.06), rgba(139,92,246,0.05), transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Heading */}
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            AI FOCUS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            How I Think About <span className="grad-cp">AI</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Exploring intelligent systems and machine learning solutions — from theory to deployment.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title}
                initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:.5, delay: i * .1 }}
                whileHover={{ y:-6 }}
                className="group relative glass rounded-2xl border border-white/8 p-6 overflow-hidden transition-shadow duration-300"
                style={{ "--c": c.color } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 0 1px ${c.color}28, 0 20px 48px ${c.color}12`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
              >
                {/* Corner glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background:`radial-gradient(circle, ${c.color}20, transparent 70%)` }} />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background:`${c.color}15`, border:`1px solid ${c.color}25` }}>
                  <Icon size={20} style={{ color:c.color }} />
                </div>

                <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">{c.title}</h3>
                <p className="text-white/48 text-sm leading-relaxed">{c.desc}</p>

                {/* Bottom line reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:`linear-gradient(90deg, transparent, ${c.color}55, transparent)` }} />
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val:"7+", label:"AI / ML Projects", color:"#06B6D4" },
            { val:"3+", label:"ML Frameworks",    color:"#8B5CF6" },
            { val:"2+", label:"Research Areas",   color:"#2563EB" },
            { val:"1",  label:"Internship",        color:"#10B981" },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl border border-white/8 p-5 text-center">
              <div className="text-3xl font-black font-display mb-1" style={{ color:s.color }}>{s.val}</div>
              <div className="text-xs text-white/38 font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
''')

# ── Projects.tsx — DEFINITIVE filter fix ────────────────────────────────────
files["projects"] = (os.path.join(BASE, "components/Projects.tsx"), '''"use client";
import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, Star, Code2 } from "lucide-react";

type Cat = "All" | "AI/ML" | "Web" | "Mobile" | "Systems";

const CATS: { label: string; value: Cat }[] = [
  { label:"All",     value:"All"     },
  { label:"AI / ML", value:"AI/ML"   },
  { label:"Web",     value:"Web"     },
  { label:"Mobile",  value:"Mobile"  },
  { label:"Systems", value:"Systems" },
];

interface Project {
  id:number; title:string; desc:string; stack:string[];
  cat:Cat; github:string; featured?:boolean; icon:string; color:string;
}

const PROJECTS: Project[] = [
  { id:1,  title:"ML-Based Translator",        desc:"Seq2Seq NMT with Bahdanau Attention — custom tokenization, multilingual corpus preprocessing, served via Flask REST API.",          stack:["Python","TensorFlow","Keras","NLP","Flask"],        cat:"AI/ML",   github:"https://github.com/pun33th45/ML-based-translator",                    icon:"🌐", color:"#06B6D4", featured:true  },
  { id:2,  title:"Segmentation Using ML",       desc:"U-Net deep learning architecture for pixel-level semantic image segmentation and scene understanding.",                             stack:["Python","TensorFlow","OpenCV","U-Net"],             cat:"AI/ML",   github:"https://github.com/pun33th45/Segmentation_Using_ML",                  icon:"🔬", color:"#8B5CF6", featured:true  },
  { id:3,  title:"Insight AI",                  desc:"AI analytics platform that analyzes data patterns and generates intelligent summaries via LLM integration.",                       stack:["Python","LLM","React","FastAPI"],                   cat:"AI/ML",   github:"https://github.com/pun33th45/Insight-ai",                            icon:"💡", color:"#06B6D4"                },
  { id:4,  title:"AI Resume Analyzer",          desc:"NLP-powered resume parsing and job-matching system — scores candidates and provides structured actionable feedback.",              stack:["Python","NLP","Flask","spaCy"],                     cat:"AI/ML",   github:"https://github.com/pun33th45/ai-resume-analyzer",                    icon:"📄", color:"#2563EB"                },
  { id:5,  title:"AI-Based Code Editor",        desc:"Smart code editor with real-time AI suggestions, error detection, and intelligent autocomplete powered by language models.",       stack:["Python","React","Monaco","LLM"],                    cat:"AI/ML",   github:"https://github.com/pun33th45/Ai-based-code-editor",                  icon:"⌨️", color:"#8B5CF6", featured:true  },
  { id:6,  title:"CodePilotAI",                 desc:"AI coding co-pilot with context-aware generation, refactoring suggestions, and natural language to code translation.",             stack:["Python","LLM","React","TypeScript"],                cat:"AI/ML",   github:"https://github.com/pun33th45/CodePilotAI",                           icon:"🚀", color:"#06B6D4"                },
  { id:7,  title:"PromptForge AI",              desc:"Prompt engineering platform with A/B testing, version control, and performance analytics for LLM prompts.",                       stack:["Python","AI","React","LLM"],                        cat:"AI/ML",   github:"https://github.com/pun33th45/promptforge-ai",                        icon:"⚡", color:"#2563EB"                },
  { id:8,  title:"SpotMate",                    desc:"Full-stack spot booking platform with real-time availability, user authentication, and seamless reservation management.",          stack:["React","Node.js","MongoDB","Express"],              cat:"Web",     github:"https://github.com/pun33th45/SpotMate",                              icon:"📍", color:"#06B6D4"                },
  { id:9,  title:"iPerf Web Performance Tool",  desc:"Browser-based network testing interface for iPerf — visualizes bandwidth, jitter, and latency with real-time charts.",             stack:["Python","Flask","JavaScript","WebSockets"],         cat:"Web",     github:"https://github.com/pun33th45/iperf-web-performance-tool",            icon:"📊", color:"#8B5CF6"                },
  { id:10, title:"CompileX Beta",               desc:"Online multi-language code compilation platform with real-time execution, syntax highlighting, and shareable sessions.",           stack:["React","Node.js","Docker","TypeScript"],            cat:"Web",     github:"https://github.com/pun33th45/CompileX-BETA",                         icon:"🖥️", color:"#2563EB", featured:true  },
  { id:11, title:"Web Dev Projects",            desc:"Collection of modern web projects demonstrating responsive design, CSS animations, and interactive UI patterns.",                  stack:["HTML","CSS","JavaScript"],                         cat:"Web",     github:"https://github.com/pun33th45/Web-dev-projects",                      icon:"🌊", color:"#06B6D4"                },
  { id:12, title:"Secret Coder",                desc:"Gamified coding challenge platform with progressive difficulty, leaderboards, and developer achievement system.",                  stack:["JavaScript","Node.js","MongoDB","Socket.io"],       cat:"Web",     github:"https://github.com/pun33th45/Secret-coder",                          icon:"🔐", color:"#8B5CF6"                },
  { id:13, title:"ParkMate Android",            desc:"Smart parking Android app with real-time slot availability, GPS navigation to nearest spots, and booking management.",             stack:["Java","Android","Google Maps","Firebase"],          cat:"Mobile",  github:"https://github.com/pun33th45/ParkMate-android",                      icon:"🅿️", color:"#10B981", featured:true  },
  { id:14, title:"Network Performance Tester",  desc:"Measures network throughput, latency, and packet loss with comprehensive diagnostic reporting and visualization.",                 stack:["Python","Networking","Socket","Matplotlib"],        cat:"Systems", github:"https://github.com/pun33th45/network-performance-tester-application", icon:"📡", color:"#2563EB"                },
  { id:15, title:"Channel Connectivity Tester", desc:"Automated network channel testing tool identifying bottlenecks and generating diagnostic reports for network engineers.",          stack:["Python","Networking","CLI","Diagnostics"],          cat:"Systems", github:"https://github.com/pun33th45/Channel-connectivity-tester",           icon:"🔗", color:"#8B5CF6"                },
  { id:16, title:"Park Matrix",                 desc:"Data-driven smart parking management tracking occupancy patterns and predicting availability through analytics.",                  stack:["Python","NumPy","Pandas","Data Analysis"],          cat:"Systems", github:"https://github.com/pun33th45/Park-Matrix",                           icon:"🗺️", color:"#06B6D4"                },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [hov, setHov]   = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: -((e.clientY - r.top)  / r.height - .5) * 7,
      y:  ((e.clientX - r.left) / r.width  - .5) * 7,
    });
  };

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:.95 }}
      transition={{ duration:.3, delay: Math.min(i * .05, .4) }}
    >
      <div ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setHov(false); }}
        style={{
          transform:`perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov?-5:0}px)`,
          transition:"transform .18s ease, box-shadow .25s ease",
          boxShadow: hov ? `0 0 0 1px ${p.color}28, 0 20px 50px ${p.color}10` : "none",
        }}
        className="glass rounded-2xl border border-white/8 p-5 flex flex-col gap-4 h-full"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{p.icon}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white leading-tight">{p.title}</h3>
                {p.featured && <Star size={9} fill={p.color} style={{ color:p.color }} />}
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded mt-0.5 inline-block"
                style={{ color:p.color, background:`${p.color}14` }}>{p.cat}</span>
            </div>
          </div>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="p-1.5 glass rounded-lg border border-white/8 text-white/35 hover:text-brand-cyan hover:border-brand-cyan/30 transition-all shrink-0">
            <Github size={13} />
          </a>
        </div>

        <p className="text-white/48 text-xs leading-relaxed flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map(t => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/6">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [cat, setCat] = useState<Cat>("All");

  // Filtering — definitively correct
  const filtered = useMemo(
    () => cat === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === cat),
    [cat]
  );

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            <Code2 size={11} /> PROJECTS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            What I&apos;ve <span className="grad">Built</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            16 real projects — AI/ML, web development, mobile, and systems engineering.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12">
          {CATS.map(c => (
            <button key={c.value} onClick={() => setCat(c.value)}
              className="px-5 py-2 rounded-full text-sm font-mono transition-all duration-200"
              style={{
                background: cat === c.value ? "rgba(6,182,212,0.15)"  : "rgba(255,255,255,0.04)",
                border:     cat === c.value ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color:      cat === c.value ? "#06B6D4"               : "rgba(255,255,255,0.4)",
              }}
            >{c.label}</button>
          ))}
        </motion.div>

        {/* Grid — AnimatePresence keyed on cat ensures re-animation on filter change */}
        <AnimatePresence mode="wait">
          <motion.div key={cat}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
''')

# ── Skills.tsx ───────────────────────────────────────────────────────────────
files["skills"] = (os.path.join(BASE, "components/Skills.tsx"), '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Globe, Wrench } from "lucide-react";

const CATS = [
  { label:"Programming",         icon:Code2,  color:"#06B6D4",
    skills:[{n:"Python",l:92},{n:"Java",l:80},{n:"C",l:75},{n:"JavaScript",l:85},{n:"TypeScript",l:78},{n:"SQL",l:72}] },
  { label:"AI / Machine Learning", icon:Brain,  color:"#8B5CF6",
    skills:[{n:"TensorFlow",l:88},{n:"Keras",l:85},{n:"NLP / Seq2Seq",l:82},{n:"OpenCV",l:74},{n:"LangChain",l:70},{n:"Scikit-learn",l:78}] },
  { label:"Web Development",     icon:Globe,  color:"#2563EB",
    skills:[{n:"React / Next.js",l:86},{n:"Node.js",l:78},{n:"Flask",l:80},{n:"FastAPI",l:72},{n:"MongoDB",l:70},{n:"TailwindCSS",l:88}] },
  { label:"Tools & DevOps",      icon:Wrench, color:"#10B981",
    skills:[{n:"Git / GitHub",l:90},{n:"Docker",l:65},{n:"Linux",l:72},{n:"Android Studio",l:68},{n:"Jupyter",l:85},{n:"VS Code",l:95}] },
];

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            <Code2 size={11} /> SKILLS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Tech <span className="grad">Stack</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {CATS.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.label}
                initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:.5, delay:ci * .1 }}
                className="glass rounded-2xl border border-white/8 p-7 hover:border-white/14 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background:`${cat.color}18`, border:`1px solid ${cat.color}25` }}>
                    <Icon size={16} style={{ color:cat.color }} />
                  </div>
                  <h3 className="font-display font-bold text-white">{cat.label}</h3>
                </div>
                <div className="space-y-3.5">
                  {cat.skills.map(sk => (
                    <div key={sk.n}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-white/60 font-mono">{sk.n}</span>
                        <span className="text-xs font-mono" style={{ color:cat.color }}>{sk.l}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          initial={{ width:0 }} whileInView={{ width:`${sk.l}%` }}
                          viewport={{ once:true }} transition={{ duration:1, ease:"easeOut" }}
                          className="h-full rounded-full"
                          style={{ background:`linear-gradient(90deg, ${cat.color}80, ${cat.color})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
''')

# ── Experience.tsx ───────────────────────────────────────────────────────────
files["experience"] = (os.path.join(BASE, "components/Experience.tsx"), '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, Globe, MapPin } from "lucide-react";

const CERTS = [
  { title:"Introduction to AI",           issuer:"Coursera",           year:"2023", icon:"🤖", color:"#06B6D4" },
  { title:"Programming Fundamentals",     issuer:"Duke University",    year:"2023", icon:"💻", color:"#8B5CF6" },
  { title:"Effective Speaking & Listening", issuer:"Wadhwani Foundation", year:"2023", icon:"🎤", color:"#2563EB" },
];

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            <Briefcase size={11} /> EXPERIENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Work <span className="grad">Experience</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Internship */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.1, duration:.6 }}>
            <div className="glass rounded-2xl border border-brand-cyan/20 p-7 h-full">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-cyan/10 border border-brand-cyan/20 shrink-0">
                  <Globe size={20} className="text-brand-cyan" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-white font-bold text-base">Web Development Intern</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20">Current</span>
                  </div>
                  <div className="text-brand-cyan/80 text-sm font-mono">Terabeam Proxim Wireless Pvt. Ltd</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/35 text-xs font-mono">Oct 2025 – Present</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-white/30" />
                      <span className="text-white/30 text-xs">Hyderabad</span>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Building and maintaining web applications using modern frontend technologies",
                  "Collaborating with the engineering team on product features and UI components",
                  "Implementing responsive UI and optimizing performance",
                  "Working with REST APIs and integrating backend services",
                ].map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/55 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/60 mt-1.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.2, duration:.6 }}>
            <div className="glass rounded-2xl border border-white/8 p-7 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Award size={18} className="text-brand-purple" />
                <h3 className="font-display font-bold text-white">Certifications</h3>
              </div>
              <div className="space-y-4">
                {CERTS.map((c, i) => (
                  <motion.div key={i} initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{}}
                    transition={{ delay:.3 + i * .08 }}
                    className="flex items-center gap-4 p-4 glass rounded-xl border border-white/6 hover:border-white/12 transition-all">
                    <span className="text-2xl">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{c.title}</div>
                      <div className="text-xs text-white/40 font-mono">{c.issuer} · {c.year}</div>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background:c.color }} />
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/6">
                <div className="text-xs font-mono text-white/30 mb-3">ACTIVITIES</div>
                {[
                  { title:"Project Expo", icon:"🏆", desc:"Presented innovative projects at college expo" },
                  { title:"Zoho Workshop", icon:"🔧", desc:"Intensive tech workshop by Zoho" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <span>{a.icon}</span>
                    <div><span className="text-sm text-white/60 font-medium">{a.title}</span><span className="text-xs text-white/35 ml-2">{a.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
''')

# ── Contact.tsx ───────────────────────────────────────────────────────────────
files["contact"] = (os.path.join(BASE, "components/Contact.tsx"), '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle, Github, Linkedin, Mail, MessageSquare, Phone, Send } from "lucide-react";

const SOCIALS = [
  { icon:Mail,     label:"Email",    value:"puneethraaaj@gmail.com",        href:"mailto:puneethraaaj@gmail.com",                        color:"#06B6D4" },
  { icon:Linkedin, label:"LinkedIn", value:"puneeth-raj-774506211",         href:"https://www.linkedin.com/in/puneeth-raj-774506211",    color:"#2563EB" },
  { icon:Github,   label:"GitHub",   value:"pun33th45",                     href:"https://github.com/pun33th45",                         color:"#8B5CF6" },
  { icon:Phone,    label:"Phone",    value:"+91 9398971543",                href:"tel:+919398971543",                                    color:"#10B981" },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [form, setForm]     = useState({ name:"", email:"", message:"" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSent(true); setSending(false);
    setForm({ name:"", email:"", message:"" });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
        style={{ background:"radial-gradient(circle, #06B6D4, transparent)" }} />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            <MessageSquare size={11} /> CONTACT
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Let&apos;s <span className="grad">Connect</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.1 }}>
            <div className="glass rounded-2xl border border-white/8 p-7">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <CheckCircle size={48} className="text-brand-cyan" />
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-white/50 text-center">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                  <button onClick={() => setSent(false)}
                    className="mt-2 px-5 py-2 rounded-xl text-sm text-brand-cyan border border-brand-cyan/25 hover:bg-brand-cyan/10 transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  {[
                    { key:"name",    label:"Name",    type:"text",  ph:"Your name"    },
                    { key:"email",   label:"Email",   type:"email", ph:"your@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-white/45 font-mono mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required
                        value={(form as never)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 glass border border-white/8 focus:border-brand-cyan/40 focus:outline-none transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-white/45 font-mono mb-1.5">Message</label>
                    <textarea rows={4} placeholder="Tell me about your project..." required
                      value={form.message} onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 glass border border-white/8 focus:border-brand-cyan/40 focus:outline-none transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
                    style={{ background:"linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                    <Send size={15} />
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.2 }}
            className="space-y-4">
            {SOCIALS.map((s, i) => (
              <motion.a key={s.label} href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                initial={{ opacity:0, y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.3 + i * .07 }}
                className="flex items-center gap-4 glass rounded-xl border border-white/8 p-5 hover:border-white/16 transition-all group"
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 0 1px ${s.color}22`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background:`${s.color}15`, border:`1px solid ${s.color}22` }}>
                  <s.icon size={18} style={{ color:s.color }} />
                </div>
                <div>
                  <div className="text-xs text-white/35 font-mono mb-0.5">{s.label}</div>
                  <div className="text-sm text-white font-medium group-hover:text-brand-cyan transition-colors">{s.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
''')

# ── Quote.tsx ────────────────────────────────────────────────────────────────
files["quote"] = (os.path.join(BASE, "components/Quote.tsx"), '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Quote() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background:"radial-gradient(ellipse, #06B6D4, #2563EB, #8B5CF6, transparent)" }} />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div initial={{ opacity:0, scale:.96 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:.8 }}>
          <div className="text-8xl font-display font-black leading-none text-brand-cyan/10 mb-2 select-none">&ldquo;</div>
          <motion.p initial={{ opacity:0, y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.15, duration:.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight mb-8">
            Great engineers don&apos;t just write code{" "}
            <span className="grad-cp">— they design the future.</span>
          </motion.p>
          <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:.35 }}
            className="flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-brand-cyan/35" />
            <span className="text-brand-cyan/50 font-mono text-xs tracking-widest">PUNEETH RAJ</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-brand-cyan/35" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
''')

# ── page.tsx ─────────────────────────────────────────────────────────────────
files["page"] = (os.path.join(BASE, "app/page.tsx"), '''import Navigation    from "@/components/Navigation";
import Hero          from "@/components/Hero";
import About         from "@/components/About";
import AIFocus       from "@/components/AIFocus";
import Projects      from "@/components/Projects";
import Skills        from "@/components/Skills";
import Experience    from "@/components/Experience";
import Contact       from "@/components/Contact";
import Quote         from "@/components/Quote";
import ScrollProgress from "@/components/ScrollProgress";
import PremiumCursor  from "@/components/PremiumCursor";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function Home() {
  return (
    <main style={{ background:"#07070A" }} className="min-h-screen relative overflow-x-hidden">
      <ScrollProgress />
      <PremiumCursor />
      <ParticleNetwork />
      <Navigation />
      <Hero />
      <About />
      <AIFocus />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Quote />
    </main>
  );
}
''')

# ── Write all files ───────────────────────────────────────────────────────────
for key, (path, content) in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Written: {os.path.relpath(path, ROOT)}")

# ── Fix ScrollProgress.tsx (had a typo with style2) ─────────────────────────
sp_path = os.path.join(BASE, "components/ScrollProgress.tsx")
sp = '''"use client";
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
'''
with open(sp_path, "w", encoding="utf-8") as f:
    f.write(sp)
print("  Fixed: ScrollProgress.tsx")

print("\nAll files written successfully.")
