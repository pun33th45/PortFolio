import os

BASE = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src"

files = {}

# ── 1. LoadingScreen.tsx ─────────────────────────────────────────────────────
files["components/LoadingScreen.tsx"] = '''"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Initializing Portfolio",
  "Loading Projects",
  "Preparing Interface",
];

export default function LoadingScreen() {
  const [visible,  setVisible]  = useState(true);
  const [stepIdx,  setStepIdx]  = useState(0);
  const [fadeOut,  setFadeOut]  = useState(false);

  useEffect(() => {
    // Cycle through steps
    const stepTimer = setInterval(() => {
      setStepIdx(i => {
        if (i < STEPS.length - 1) return i + 1;
        clearInterval(stepTimer);
        return i;
      });
    }, 500);

    // Start fade-out at 1.8s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    // Unmount at 2.2s
    const hideTimer = setTimeout(() => setVisible(false), 2200);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: "#07070A" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.08]"
              style={{ background: "radial-gradient(circle, #3B82F6, #06B6D4, #8B5CF6)" }} />
          </div>

          {/* Neural ring animation */}
          <div className="relative mb-10">
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 rounded-full"
              style={{ border: "2px solid transparent",
                background: "linear-gradient(#07070A, #07070A) padding-box, linear-gradient(135deg, #3B82F6, #06B6D4, #8B5CF6) border-box" }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full"
              style={{ border: "1.5px solid transparent",
                background: "linear-gradient(#07070A, #07070A) padding-box, linear-gradient(225deg, #06B6D4, #8B5CF6) border-box" }}
            />
            {/* Center pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-8 h-8 rounded-full"
                style={{ background: "radial-gradient(circle, #06B6D4, #3B82F6)" }}
              />
            </div>
            {/* Corner dots */}
            {[0, 90, 180, 270].map((deg, i) => (
              <motion.div key={deg}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                className="absolute w-1.5 h-1.5 rounded-full bg-brand-cyan"
                style={{
                  top: "50%", left: "50%",
                  transform: `rotate(${deg}deg) translateX(52px) translateY(-50%)`,
                }}
              />
            ))}
          </div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display font-black text-4xl mb-2 tracking-tight"
            style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Puneeth Raj
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-white/30 font-mono text-xs tracking-widest mb-8"
          >
            AI ENGINEER & ML DEVELOPER
          </motion.p>

          {/* Step text */}
          <div className="h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-sm"
                style={{ color: "#06B6D4" }}
              >
                {STEPS[stepIdx]}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >_</motion.span>
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div className="mt-6 w-48 h-px bg-white/8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #3B82F6, #06B6D4, #8B5CF6)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
'''

# ── 2. Skills.tsx — modern badge-card grid ────────────────────────────────────
files["components/Skills.tsx"] = '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Tech {
  name: string;
  badge: string;
  color: string;
  bg: string;
  level: number;
}

interface Category {
  label: string;
  emoji: string;
  color: string;
  techs: Tech[];
}

const CATEGORIES: Category[] = [
  {
    label: "Programming",
    emoji: "⌨️",
    color: "#06B6D4",
    techs: [
      { name:"Python",     badge:"Py",   color:"#06B6D4", bg:"rgba(6,182,212,0.12)",    level:92 },
      { name:"Java",       badge:"☕",   color:"#F59E0B", bg:"rgba(245,158,11,0.12)",   level:80 },
      { name:"C",          badge:"C",    color:"#3B82F6", bg:"rgba(59,130,246,0.12)",   level:75 },
      { name:"JavaScript", badge:"JS",   color:"#EAB308", bg:"rgba(234,179,8,0.12)",    level:85 },
      { name:"TypeScript", badge:"TS",   color:"#3B82F6", bg:"rgba(59,130,246,0.14)",   level:78 },
    ],
  },
  {
    label: "AI / Machine Learning",
    emoji: "🧠",
    color: "#8B5CF6",
    techs: [
      { name:"TensorFlow", badge:"TF",  color:"#FF6F00", bg:"rgba(255,111,0,0.12)",   level:88 },
      { name:"Keras",      badge:"K",   color:"#D00000", bg:"rgba(208,0,0,0.12)",     level:85 },
      { name:"NLP",        badge:"NL",  color:"#8B5CF6", bg:"rgba(139,92,246,0.12)", level:82 },
      { name:"OpenCV",     badge:"CV",  color:"#5C3317", bg:"rgba(92,51,23,0.18)",   level:74 },
      { name:"Scikit",     badge:"SK",  color:"#F97316", bg:"rgba(249,115,22,0.12)", level:76 },
    ],
  },
  {
    label: "Web Development",
    emoji: "🌐",
    color: "#3B82F6",
    techs: [
      { name:"React",      badge:"⚛",   color:"#61DAFB", bg:"rgba(97,218,251,0.10)", level:86 },
      { name:"Node.js",    badge:"N",   color:"#86CC16", bg:"rgba(134,204,22,0.12)", level:78 },
      { name:"HTML",       badge:"</>", color:"#E34F26", bg:"rgba(227,79,38,0.12)",  level:90 },
      { name:"CSS",        badge:"✦",   color:"#1572B6", bg:"rgba(21,114,182,0.12)", level:85 },
      { name:"Flask",      badge:"Fl",  color:"#06B6D4", bg:"rgba(6,182,212,0.10)",  level:80 },
    ],
  },
  {
    label: "Tools & Design",
    emoji: "🛠",
    color: "#10B981",
    techs: [
      { name:"GitHub",     badge:"⊕",   color:"#E2E8F0", bg:"rgba(226,232,240,0.08)", level:90 },
      { name:"VS Code",    badge:"{ }",  color:"#007ACC", bg:"rgba(0,122,204,0.12)",   level:95 },
      { name:"Figma",      badge:"F",   color:"#A259FF", bg:"rgba(162,89,255,0.12)",  level:70 },
      { name:"Docker",     badge:"🐳",  color:"#2496ED", bg:"rgba(36,150,237,0.12)",  level:65 },
      { name:"Linux",      badge:"🐧",  color:"#FCC624", bg:"rgba(252,198,36,0.10)",  level:72 },
    ],
  },
];

function TechCard({ tech, delay, catColor }: { tech: Tech; delay: number; catColor: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative glass rounded-xl border border-white/8 p-4 flex flex-col gap-3 transition-all duration-250"
      style={{
        boxShadow: hov ? `0 0 0 1px ${tech.color}30, 0 12px 32px ${tech.color}12` : "none",
        borderColor: hov ? `${tech.color}28` : "rgba(255,255,255,0.08)",
      }}
    >
      {/* Badge */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
          style={{ background: tech.bg, color: tech.color, border: `1px solid ${tech.color}25` }}>
          {tech.badge}
        </div>
        <span className="text-sm font-semibold text-white/85">{tech.name}</span>
      </div>

      {/* Level bar */}
      <div className="h-0.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${tech.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: delay + 0.1 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${tech.color}80, ${tech.color})` }}
        />
      </div>

      {/* Hover glow */}
      {hov && (
        <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${tech.color}08, transparent 70%)` }} />
      )}
    </motion.div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            🛠 TECH STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Skills & <span className="grad">Technologies</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Tools I use daily to design, build, and deploy intelligent systems.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <motion.div key={cat.label}
              initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5, delay: ci * 0.08 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                  style={{ background:`${cat.color}15`, border:`1px solid ${cat.color}25` }}>
                  {cat.emoji}
                </div>
                <h3 className="font-display font-bold text-white text-base">{cat.label}</h3>
                <div className="flex-1 h-px" style={{ background:`linear-gradient(90deg, ${cat.color}30, transparent)` }} />
              </div>

              {/* Tech cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {cat.techs.map((tech, ti) => (
                  <TechCard key={tech.name} tech={tech} delay={ci * 0.05 + ti * 0.04} catColor={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'''

# ── 3. About.tsx — correct timeline ──────────────────────────────────────────
files["components/About.tsx"] = '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Lightbulb, MapPin, Rocket } from "lucide-react";

const QUALITIES = [
  { icon: Brain,     label:"AI-First Thinking", desc:"Every problem is an opportunity to apply intelligent solutions"     },
  { icon: Code2,     label:"Clean Architecture", desc:"Code that is readable, scalable, and maintainable"                },
  { icon: Rocket,    label:"System Builder",     desc:"Designing scalable AI systems that solve real problems"            },
  { icon: Lightbulb, label:"Innovation Driven",  desc:"Constantly exploring new technologies and research areas"         },
];

const TIMELINE = [
  {
    year: "2023",
    title: "Started Programming",
    desc: "Began my coding journey — learned Python, C, and core computer science fundamentals. Discovered a passion for building systems from scratch.",
    color: "#06B6D4",
    icon: "🚀",
  },
  {
    year: "2024",
    title: "First Machine Learning Project",
    desc: "Built ML-Based Language Translator using Seq2Seq architecture with Bahdanau Attention. Deep-dived into TensorFlow, NLP, and deep learning research.",
    color: "#8B5CF6",
    icon: "🧠",
  },
  {
    year: "2025",
    title: "Web Development Internship",
    desc: "Joined Terabeam Proxim Wireless Pvt. Ltd as a Web Development Intern. Working on real-world products alongside a professional engineering team.",
    color: "#10B981",
    icon: "💼",
  },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT — Bio + qualities */}
          <div className="space-y-5">
            <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.1, duration:.6 }}>
              <div className="glass rounded-2xl border border-white/8 p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
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
                  As a Computer Science student specializing in{" "}
                  <span className="text-brand-cyan font-medium">AI & Machine Learning</span>, I bridge the gap
                  between intelligent systems and practical, production-ready applications.
                </p>
                <p className="text-white/60 leading-relaxed">
                  My work focuses on building systems that{" "}
                  <span className="text-brand-purple font-medium">understand context</span>, predict outcomes,
                  and create genuine value. I believe the best technology is invisible to the user but transformative in impact.
                </p>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.18, duration:.6 }}>
              <div className="glass rounded-2xl border border-brand-purple/20 p-6">
                <div className="text-xs font-mono text-brand-purple/70 mb-3">EDUCATION</div>
                <div className="text-white font-bold text-base">B.Tech Computer Science (AI & ML)</div>
                <div className="text-brand-purple text-sm font-mono mt-1">Sreyas Institute of Engineering and Technology</div>
                <div className="text-white/35 text-xs font-mono mt-2">2023 – Present</div>
              </div>
            </motion.div>

            {/* Qualities grid */}
            <div className="grid grid-cols-2 gap-3">
              {QUALITIES.map((q, i) => (
                <motion.div key={q.label}
                  initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}}
                  transition={{ delay:.25 + i * .07 }}
                  className="glass rounded-xl border border-white/8 p-4 hover:border-brand-cyan/20 transition-all group">
                  <q.icon size={16} className="text-brand-cyan mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold text-white mb-0.5">{q.label}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{q.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Vertical timeline */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.15, duration:.6 }}>
            <div className="glass rounded-2xl border border-white/8 p-8">
              <div className="text-xs font-mono text-white/35 mb-8 tracking-wider">MY JOURNEY</div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-0 bottom-0 w-px"
                  style={{ background:"linear-gradient(to bottom, #06B6D4, #8B5CF6, #10B981)" }} />

                <div className="space-y-10">
                  {TIMELINE.map((t, i) => (
                    <motion.div key={t.year}
                      initial={{ opacity:0, x:16 }}
                      animate={inView ? { opacity:1, x:0 } : {}}
                      transition={{ delay: .3 + i * .15, duration: .5 }}
                      className="relative pl-14"
                    >
                      {/* Node */}
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{
                          background: `${t.color}18`,
                          border: `2px solid ${t.color}50`,
                          boxShadow: `0 0 16px ${t.color}25`,
                        }}>
                        {t.icon}
                      </div>
                      {/* Connector dot */}
                      <div className="absolute left-[18px] top-[18px] w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
                        style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />

                      {/* Content */}
                      <div className="glass rounded-xl border border-white/8 p-5 hover:border-white/14 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                            style={{ color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}25` }}>
                            {t.year}
                          </span>
                          <span className="font-display font-bold text-white text-sm">{t.title}</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
'''

# ── 4. page.tsx — add LoadingScreen ──────────────────────────────────────────
files["app/page.tsx"] = '''import Navigation     from "@/components/Navigation";
import Hero           from "@/components/Hero";
import About          from "@/components/About";
import AIFocus        from "@/components/AIFocus";
import Projects       from "@/components/Projects";
import Skills         from "@/components/Skills";
import Experience     from "@/components/Experience";
import Contact        from "@/components/Contact";
import Quote          from "@/components/Quote";
import ScrollProgress  from "@/components/ScrollProgress";
import PremiumCursor   from "@/components/PremiumCursor";
import ParticleNetwork from "@/components/ParticleNetwork";
import LoadingScreen   from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main style={{ background:"#07070A" }} className="min-h-screen relative overflow-x-hidden">
      <LoadingScreen />
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
'''

# Write files
BASE_PATH = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src"
for rel, content in files.items():
    path = os.path.join(BASE_PATH, rel)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Written: {rel}")

print("Done.")
