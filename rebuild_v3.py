import os

BASE = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src"

files = {}

# ─── 1. PremiumCursor ───────────────────────────────────────────────────────
files["components/PremiumCursor.tsx"] = '''"use client";
import { useEffect, useRef } from "react";

export default function PremiumCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let expanded = false;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const enter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a,button,[role=button],input,textarea,select,label");
      if (el && !expanded) {
        expanded = true;
        ring.style.width  = "38px";
        ring.style.height = "38px";
        ring.style.borderColor = "rgba(0,212,255,0.55)";
        ring.style.background  = "rgba(0,212,255,0.07)";
      }
    };

    const leave = (e: MouseEvent) => {
      const to = (e.relatedTarget as HTMLElement)?.closest("a,button,[role=button],input,textarea,select,label");
      if (!to && expanded) {
        expanded = false;
        ring.style.width  = "22px";
        ring.style.height = "22px";
        ring.style.borderColor = "rgba(0,212,255,0.28)";
        ring.style.background  = "transparent";
      }
    };

    const tick = () => {
      const spd = 0.12;
      rx = lerp(rx, mx, spd);
      ry = lerp(ry, my, spd);
      const half = expanded ? 19 : 11;
      ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout",  leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout",  leave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed", top:0, left:0, width:6, height:6,
        borderRadius:"50%", background:"#00d4ff",
        pointerEvents:"none", zIndex:10000,
        boxShadow:"0 0 8px rgba(0,212,255,0.9)",
      }} />
      <div ref={ringRef} style={{
        position:"fixed", top:0, left:0, width:22, height:22,
        borderRadius:"50%", border:"1.5px solid rgba(0,212,255,0.28)",
        pointerEvents:"none", zIndex:9999,
        transition:"width 0.18s ease,height 0.18s ease,border-color 0.18s ease,background 0.18s ease",
      }} />
    </>
  );
}
'''

# ─── 2. MagneticButton — clean scale hover, no magnetic pull ─────────────────
files["components/MagneticButton.tsx"] = '''"use client";
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
'''

# ─── 3. Skills — clean progress-bar card grid ───────────────────────────────
files["components/Skills.tsx"] = '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Globe, Wrench } from "lucide-react";

const CATS = [
  {
    label: "Programming",
    icon: Code2,
    color: "#00d4ff",
    skills: [
      { name:"Python",      level:92 },
      { name:"Java",        level:80 },
      { name:"C",           level:75 },
      { name:"JavaScript",  level:85 },
      { name:"TypeScript",  level:78 },
      { name:"SQL",         level:72 },
    ],
  },
  {
    label: "AI / Machine Learning",
    icon: Brain,
    color: "#9b5de5",
    skills: [
      { name:"TensorFlow",    level:88 },
      { name:"Keras",         level:85 },
      { name:"NLP / Seq2Seq", level:82 },
      { name:"OpenCV",        level:74 },
      { name:"LangChain",     level:70 },
      { name:"Scikit-learn",  level:78 },
    ],
  },
  {
    label: "Web Development",
    icon: Globe,
    color: "#3b82f6",
    skills: [
      { name:"React / Next.js", level:86 },
      { name:"Node.js",         level:78 },
      { name:"Flask",           level:80 },
      { name:"FastAPI",         level:72 },
      { name:"MongoDB",         level:70 },
      { name:"TailwindCSS",     level:88 },
    ],
  },
  {
    label: "Tools & DevOps",
    icon: Wrench,
    color: "#00ff88",
    skills: [
      { name:"Git / GitHub",    level:90 },
      { name:"Docker",          level:65 },
      { name:"Linux",           level:72 },
      { name:"Android Studio",  level:68 },
      { name:"Jupyter",         level:85 },
      { name:"VS Code",         level:95 },
    ],
  },
];

function Bar({ level, color }: { level: number; color: string }) {
  return (
    <div className="relative h-1 rounded-full bg-white/8 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
      />
    </div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4">
            <Code2 size={12} /> SKILLS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {CATS.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity:0, y:30 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay: ci * 0.1 }}
                className="glass rounded-2xl border border-white/8 p-7 hover:border-white/14 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${cat.color}18` }}>
                    <Icon size={16} style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-base">{cat.label}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map(sk => (
                    <div key={sk.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-white/65 font-mono">{sk.name}</span>
                        <span className="text-xs font-mono" style={{ color: cat.color }}>{sk.level}%</span>
                      </div>
                      <Bar level={sk.level} color={cat.color} />
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
'''

# ─── 4. Projects — clean grid, no orbit toggle ──────────────────────────────
files["components/Projects.tsx"] = '''"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Github, Star } from "lucide-react";

type Cat = "All" | "AI/ML" | "Web" | "Mobile" | "Systems";

interface Project {
  id:number; title:string; desc:string; stack:string[];
  category:Cat; github:string; featured?:boolean; icon:string; color:string;
}

const PROJECTS: Project[] = [
  { id:1,  title:"ML-Based Translator",        desc:"Seq2Seq NMT with Bahdanau Attention, custom tokenization, multilingual corpus preprocessing, served via Flask REST API.",         stack:["Python","TensorFlow","Keras","NLP","Flask"],       category:"AI/ML",   github:"https://github.com/pun33th45/ML-based-translator",                    icon:"🌐", color:"#00d4ff", featured:true },
  { id:2,  title:"Segmentation Using ML",       desc:"U-Net deep learning image segmentation for pixel-level semantic classification and scene understanding.",                         stack:["Python","TensorFlow","OpenCV","U-Net"],            category:"AI/ML",   github:"https://github.com/pun33th45/Segmentation_Using_ML",                  icon:"🔬", color:"#9b5de5", featured:true },
  { id:3,  title:"Insight AI",                  desc:"AI analytics platform analyzing data patterns and generating intelligent summaries via LLM integration.",                        stack:["Python","LLM","React","FastAPI"],                  category:"AI/ML",   github:"https://github.com/pun33th45/Insight-ai",                            icon:"💡", color:"#00d4ff" },
  { id:4,  title:"AI Resume Analyzer",          desc:"NLP-powered resume parsing and job-matching system that scores candidates and provides structured feedback.",                    stack:["Python","NLP","Flask","spaCy"],                    category:"AI/ML",   github:"https://github.com/pun33th45/ai-resume-analyzer",                    icon:"📄", color:"#3b82f6" },
  { id:5,  title:"AI-Based Code Editor",        desc:"Smart editor with real-time AI suggestions, error detection, and intelligent autocomplete powered by LLMs.",                    stack:["Python","React","AI","Monaco","LLM"],              category:"AI/ML",   github:"https://github.com/pun33th45/Ai-based-code-editor",                  icon:"⌨️", color:"#9b5de5", featured:true },
  { id:6,  title:"CodePilotAI",                 desc:"AI coding co-pilot with context-aware code generation, refactoring suggestions, and NL-to-code translation.",                  stack:["Python","LLM","React","TypeScript"],               category:"AI/ML",   github:"https://github.com/pun33th45/CodePilotAI",                           icon:"🚀", color:"#00d4ff" },
  { id:7,  title:"PromptForge AI",              desc:"Prompt engineering platform with A/B testing, version control, and performance analytics for LLM prompts.",                    stack:["Python","AI","React","LLM"],                      category:"AI/ML",   github:"https://github.com/pun33th45/promptforge-ai",                        icon:"⚡", color:"#3b82f6" },
  { id:8,  title:"SpotMate",                    desc:"Full-stack spot booking platform with real-time availability, user authentication, and reservation management.",               stack:["React","Node.js","MongoDB","Express"],             category:"Web",     github:"https://github.com/pun33th45/SpotMate",                              icon:"📍", color:"#00d4ff" },
  { id:9,  title:"iPerf Web Performance Tool",  desc:"Browser-based network testing interface for iPerf. Visualizes bandwidth, jitter, and latency in real-time.",                  stack:["Python","Flask","JavaScript","WebSockets"],        category:"Web",     github:"https://github.com/pun33th45/iperf-web-performance-tool",            icon:"📊", color:"#9b5de5" },
  { id:10, title:"CompileX Beta",               desc:"Online multi-language code compilation platform with real-time execution and shareable coding sessions.",                      stack:["React","Node.js","Docker","TypeScript"],           category:"Web",     github:"https://github.com/pun33th45/CompileX-BETA",                         icon:"🖥️", color:"#3b82f6", featured:true },
  { id:11, title:"Web Dev Projects",            desc:"Collection of modern web projects demonstrating responsive design, CSS animations, and interactive UI patterns.",               stack:["HTML","CSS","JavaScript"],                        category:"Web",     github:"https://github.com/pun33th45/Web-dev-projects",                      icon:"🌊", color:"#00d4ff" },
  { id:12, title:"Secret Coder",                desc:"Gamified coding challenge platform with progressive difficulty, leaderboards, and developer achievement system.",              stack:["JavaScript","Node.js","MongoDB","Socket.io"],      category:"Web",     github:"https://github.com/pun33th45/Secret-coder",                          icon:"🔐", color:"#9b5de5" },
  { id:13, title:"ParkMate Android",            desc:"Smart parking finder Android app with real-time slot availability, GPS navigation, and booking management.",                  stack:["Java","Android","Google Maps","Firebase"],         category:"Mobile",  github:"https://github.com/pun33th45/ParkMate-android",                      icon:"🅿️", color:"#00ff88", featured:true },
  { id:14, title:"Network Performance Tester",  desc:"Measures network throughput, latency, and packet loss with diagnostic reporting and real-time visualization.",                stack:["Python","Networking","Socket","Matplotlib"],       category:"Systems", github:"https://github.com/pun33th45/network-performance-tester-application", icon:"📡", color:"#3b82f6" },
  { id:15, title:"Channel Connectivity Tester", desc:"Automated network channel testing tool identifying bottlenecks and generating diagnostic reports for engineers.",             stack:["Python","Networking","CLI","Diagnostics"],         category:"Systems", github:"https://github.com/pun33th45/Channel-connectivity-tester",           icon:"🔗", color:"#9b5de5" },
  { id:16, title:"Park Matrix",                 desc:"Data-driven smart parking management system tracking occupancy patterns and predicting availability with analytics.",          stack:["Python","NumPy","Pandas","Data Analysis"],         category:"Systems", github:"https://github.com/pun33th45/Park-Matrix",                           icon:"🗺️", color:"#00d4ff" },
];

const CATS: Cat[] = ["All", "AI/ML", "Web", "Mobile", "Systems"];

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [hov, setHov]   = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: -((e.clientY - r.top)  / r.height - 0.5) * 8,
      y:  ((e.clientX - r.left) / r.width  - 0.5) * 8,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:10 }}
      transition={{ duration:0.3, delay: i * 0.04 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setHov(false); }}
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov ? -4 : 0}px)`,
          transition: "transform 0.18s ease, box-shadow 0.25s ease",
          boxShadow: hov ? `0 16px 48px ${project.color}12, 0 0 0 1px ${project.color}25` : "none",
        }}
        className="glass rounded-2xl border border-white/8 p-5 flex flex-col gap-4 h-full"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{project.icon}</span>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-sm font-bold text-white leading-tight">{project.title}</h3>
                {project.featured && <Star size={9} fill={project.color} style={{ color:project.color }} />}
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ color:project.color, background:`${project.color}14` }}>
                {project.category}
              </span>
            </div>
          </div>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="p-1.5 glass rounded-lg border border-white/8 text-white/35 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <Github size={13} />
          </a>
        </div>

        <p className="text-white/50 text-xs leading-relaxed flex-1">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(t => (
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

  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.category === cat);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4">
            <Code2 size={12} /> PROJECTS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-4">
            What I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            16 real projects across AI/ML, web development, mobile, and systems engineering.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200"
              style={{
                background: cat===c ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)",
                border:     cat===c ? "1px solid rgba(0,212,255,0.38)" : "1px solid rgba(255,255,255,0.08)",
                color:      cat===c ? "#00d4ff" : "rgba(255,255,255,0.4)",
              }}
            >{c}</button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
'''

# ─── 5. page.tsx — clean section order ─────────────────────────────────────
files["app/page.tsx"] = '''import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import PremiumCursor from "@/components/PremiumCursor";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function Home() {
  return (
    <main className="relative bg-space-black min-h-screen">
      <ScrollProgress />
      <PremiumCursor />
      <ParticleNetwork />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
'''

# ─── 6. Patch globals.css: replace cursor:none with pointer-fine media query ─
css_path = os.path.join(BASE, "app/globals.css")
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

old = "/* Global cursor override */\n*, *::before, *::after { cursor: none !important; }"
new = "/* Custom cursor — hide system cursor only on pointer devices */\n@media (pointer: fine) {\n  *, *::before, *::after { cursor: none !important; }\n}"

if old in css:
    css = css.replace(old, new)
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print("  Patched: globals.css (cursor media query)")
else:
    print("  globals.css cursor rule not found, skipping patch")

# ─── Write all files ─────────────────────────────────────────────────────────
for rel, content in files.items():
    path = os.path.join(BASE, rel)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Written: {rel}")

print("Done.")
