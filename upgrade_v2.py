"""Phase 2 portfolio upgrade — GitHub dashboard, orbital projects, engineering mind section."""
import os

BASE_COMP = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src\components"
BASE_APP  = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src\app"
os.makedirs(BASE_COMP, exist_ok=True)

files = {}

# ──────────────────────────────────────────────────────────────
# GITHUB STATS — live GitHub API data dashboard
# ──────────────────────────────────────────────────────────────
files["GitHubStats.tsx"] = r'''"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitBranch, Github, Star, TrendingUp, Users } from "lucide-react";

interface GHRepo {
  id: number; name: string; stargazers_count: number;
  language: string | null; html_url: string; fork: boolean;
}
interface GHUser { public_repos: number; followers: number; following: number; }

const LANG_COLORS: Record<string, string> = {
  Python: "#3776ab", JavaScript: "#f7df1e", TypeScript: "#3178c6",
  Java: "#b07219", C: "#555555", HTML: "#e34c26", CSS: "#563d7c", Kotlin: "#a97bff",
};

export default function GitHubStats() {
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [user, setUser] = useState<GHUser | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    Promise.all([
      fetch("https://api.github.com/users/pun33th45").then(r => r.json()).catch(() => null),
      fetch("https://api.github.com/users/pun33th45/repos?per_page=100&sort=updated").then(r => r.json()).catch(() => []),
    ]).then(([u, r]) => {
      if (u && !u.message) setUser(u);
      if (Array.isArray(r)) setRepos(r.filter((x: GHRepo) => !x.fork));
      setLoading(false);
    });
  }, []);

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const langs = repos.reduce((a: Record<string, number>, r) => {
    if (r.language) a[r.language] = (a[r.language] || 0) + 1;
    return a;
  }, {});
  const sortedLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxL = sortedLangs[0]?.[1] || 1;
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  const statCards = [
    { icon: GitBranch, label: "Public Repos", value: user?.public_repos ?? repos.length, color: "#00d4ff" },
    { icon: Star,      label: "Total Stars",  value: totalStars, color: "#f7df1e" },
    { icon: Users,     label: "Followers",    value: user?.followers ?? 0, color: "#9b5de5" },
    { icon: TrendingUp,label: "Projects",     value: "16+", color: "#00ff88" },
  ];

  return (
    <section id="github" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-neon-cyan/20" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/12 text-white/50 text-xs font-mono mb-4">
            <Github size={11} /> DEVELOPER ANALYTICS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-3">
            GitHub <span className="gradient-text">Intelligence</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            Real-time open-source activity and contribution analytics
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-8 h-8 border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
            <span className="text-white/30 text-xs font-mono">Fetching GitHub data...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stat cards row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                      <s.icon size={16} style={{ color: s.color }} />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: s.color }} />
                  </div>
                  <div className="text-2xl font-black font-display gradient-text">{s.value}</div>
                  <div className="text-xs text-white/35 font-mono mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Language + GitHub Stats card */}
              <div className="space-y-5">
                {/* GitHub readme stats image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl border border-white/8 overflow-hidden"
                >
                  <div className="px-5 pt-4 pb-2">
                    <div className="text-xs font-mono text-white/30 tracking-wider">ACTIVITY STATS</div>
                  </div>
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=pun33th45&show_icons=true&theme=transparent&bg_color=00000000&border_color=00000000&title_color=00d4ff&icon_color=9b5de5&text_color=6b7280&hide_border=true"
                    alt="GitHub activity stats for pun33th45"
                    className="w-full px-3 pb-3"
                  />
                </motion.div>

                {/* Language distribution */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-5 border border-white/8"
                >
                  <div className="text-xs font-mono text-white/30 tracking-wider mb-4">LANGUAGE DISTRIBUTION</div>
                  <div className="space-y-3">
                    {sortedLangs.map(([lang, count], i) => (
                      <div key={lang}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[lang] || "#00d4ff" }} />
                            <span className="text-white/65">{lang}</span>
                          </div>
                          <span className="text-white/30 font-mono">{Math.round((count / repos.length) * 100)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${LANG_COLORS[lang] || "#00d4ff"}, ${LANG_COLORS[lang] || "#00d4ff"}80)` }}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${(count / maxL) * 100}%` } : {}}
                            transition={{ duration: 1, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Top repos */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 }}
                  className="glass rounded-2xl p-5 border border-white/8 h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-xs font-mono text-white/30 tracking-wider">TOP REPOSITORIES</div>
                    <a href="https://github.com/pun33th45" target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-white/30 hover:text-neon-cyan transition-colors flex items-center gap-1">
                      View all <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {topRepos.map((repo, i) => (
                      <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.06 }}
                        whileHover={{ y: -2 }}
                        className="block p-4 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-neon-cyan/20 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-medium text-white/80 group-hover:text-neon-cyan transition-colors line-clamp-1 flex-1 mr-2">
                            {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                          </span>
                          <ExternalLink size={11} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-0.5" />
                        </div>
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] || "#00d4ff" }} />
                              <span className="text-white/35 text-[10px] font-mono">{repo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 ml-auto">
                            <Star size={10} className="text-white/25" />
                            <span className="text-white/30 text-[10px] font-mono">{repo.stargazers_count}</span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
'''

# ──────────────────────────────────────────────────────────────
# ORBIT PROJECTS — Framer Motion solar system
# ──────────────────────────────────────────────────────────────
files["OrbitProjects.tsx"] = r'''"use client";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import { Github, X } from "lucide-react";

interface OProject {
  id: number; name: string; icon: string; color: string;
  ring: number; period: number; startDeg: number;
  desc: string; stack: string[]; github: string;
}

const ORBIT_DATA: OProject[] = [
  { id:1,  name:"ML Translator",   icon:"🧠", color:"#00d4ff", ring:1, period:14, startDeg:30,  desc:"Seq2Seq NMT with Attention mechanism. Custom tokenizer, embedding pipeline, Flask API.", stack:["Python","TensorFlow","NLP","Flask"],         github:"https://github.com/pun33th45/ML-based-translator" },
  { id:2,  name:"CodePilotAI",     icon:"🚀", color:"#9b5de5", ring:1, period:14, startDeg:210, desc:"AI coding co-pilot with context-aware code generation and intelligent refactoring.",         stack:["Python","LLM","React","TypeScript"],     github:"https://github.com/pun33th45/CodePilotAI" },
  { id:3,  name:"AI Code Editor",  icon:"⌨️", color:"#3b82f6", ring:2, period:22, startDeg:0,   desc:"Smart editor with real-time AI suggestions, error detection, and autocomplete.",             stack:["Python","React","AI","Monaco"],          github:"https://github.com/pun33th45/Ai-based-code-editor" },
  { id:4,  name:"Resume Analyzer", icon:"📄", color:"#00ff88", ring:2, period:22, startDeg:120, desc:"NLP-powered resume parsing and job-matching system with actionable scoring.",                stack:["Python","NLP","Flask","spaCy"],          github:"https://github.com/pun33th45/ai-resume-analyzer" },
  { id:5,  name:"Insight AI",      icon:"💡", color:"#ff6b35", ring:2, period:22, startDeg:240, desc:"AI insights platform that analyzes data patterns via large language model integration.",      stack:["Python","LLM","React","FastAPI"],        github:"https://github.com/pun33th45/Insight-ai" },
  { id:6,  name:"CompileX",        icon:"🖥️", color:"#00d4ff", ring:3, period:34, startDeg:60,  desc:"Online multi-language code compiler with real-time execution and shareable sessions.",       stack:["React","Node.js","Docker","TypeScript"], github:"https://github.com/pun33th45/CompileX-BETA" },
  { id:7,  name:"SpotMate",        icon:"📍", color:"#9b5de5", ring:3, period:34, startDeg:180, desc:"Full-stack spot booking platform with real-time availability and payments.",                  stack:["React","Node.js","MongoDB","Express"],   github:"https://github.com/pun33th45/SpotMate" },
  { id:8,  name:"PromptForge",     icon:"⚡", color:"#3b82f6", ring:3, period:34, startDeg:300, desc:"Prompt engineering studio with A/B testing, version control, and analytics.",               stack:["Python","AI","React","LLM"],             github:"https://github.com/pun33th45/promptforge-ai" },
];

const RINGS = [
  { ring: 1, rx: 105, ry: 38 },
  { ring: 2, rx: 175, ry: 63 },
  { ring: 3, rx: 248, ry: 89 },
];

function OrbitPlanet({
  project, onSelect,
}: {
  project: OProject;
  onSelect: (p: OProject) => void;
}) {
  const ring = RINGS.find(r => r.ring === project.ring)!;
  const angle = useMotionValue(project.startDeg);

  useAnimationFrame((t) => {
    angle.set(project.startDeg + (t / 1000) * (360 / project.period));
  });

  const x = useTransform(angle, (deg) => {
    const rad = (deg * Math.PI) / 180;
    return Math.cos(rad) * ring.rx;
  });
  const y = useTransform(angle, (deg) => {
    const rad = (deg * Math.PI) / 180;
    return Math.sin(rad) * ring.ry;
  });

  return (
    <motion.div
      style={{ position: "absolute", left: "50%", top: "50%", x, y, translateX: "-50%", translateY: "-50%", zIndex: 5 }}
      whileHover={{ scale: 1.3, zIndex: 20 }}
      onClick={() => onSelect(project)}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center cursor-pointer relative group"
        style={{
          background: `${project.color}15`,
          border: `1px solid ${project.color}45`,
          boxShadow: `0 0 14px ${project.color}30`,
        }}
        title={project.name}
      >
        <span className="text-lg leading-none">{project.icon}</span>
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 glass rounded border border-white/10 text-[9px] font-mono text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {project.name}
        </div>
      </div>
    </motion.div>
  );
}

export default function OrbitProjects({ onViewGrid }: { onViewGrid: () => void }) {
  const [selected, setSelected] = useState<OProject | null>(null);

  return (
    <div className="relative w-full" style={{ height: "520px" }}>
      {/* SVG orbit ellipses */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        <g transform={`translate(50%, 50%)`}>
          {RINGS.map(r => (
            <ellipse
              key={r.ring}
              cx={0} cy={0}
              rx={r.rx} ry={r.ry}
              fill="none"
              stroke={`rgba(0,212,255,${0.07 - r.ring * 0.015})`}
              strokeWidth="1"
              strokeDasharray="3 9"
            />
          ))}
        </g>
      </svg>

      {/* Center node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(0,212,255,0.2)", "0 0 35px rgba(0,212,255,0.35)", "0 0 20px rgba(0,212,255,0.2)"] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(155,93,229,0.12))",
            border: "1px solid rgba(0,212,255,0.4)",
          }}
        >
          <span className="text-sm font-black gradient-text font-display">PR</span>
          <span className="text-[8px] font-mono text-white/35 mt-0.5">AI ENG</span>
        </motion.div>
      </div>

      {/* Orbiting planets */}
      {ORBIT_DATA.map(p => (
        <OrbitPlanet key={p.id} project={p} onSelect={setSelected} />
      ))}

      {/* Ring legend */}
      <div className="absolute left-4 bottom-4 space-y-1.5">
        {[["Inner orbit","Core AI"], ["Mid orbit","AI Tools"], ["Outer orbit","Web & Apps"]].map(([ring, label]) => (
          <div key={ring} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/35" />
            <span className="text-[10px] font-mono text-white/25">{ring} — {label}</span>
          </div>
        ))}
      </div>

      {/* Grid view toggle */}
      <button
        onClick={onViewGrid}
        className="absolute right-4 top-2 px-3 py-1.5 text-[11px] font-mono text-white/40 border border-white/10 rounded-lg glass hover:border-neon-cyan/25 hover:text-neon-cyan transition-all"
      >
        Grid View ↗
      </button>

      {/* Project detail card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="absolute right-4 bottom-4 w-72 glass rounded-2xl p-5 border z-30"
            style={{ borderColor: `${selected.color}35` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selected.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm">{selected.name}</div>
                  <div className="text-[10px] font-mono mt-0.5" style={{ color: selected.color }}>
                    Ring {selected.ring}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
            <p className="text-white/55 text-xs leading-relaxed mb-3">{selected.desc}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {selected.stack.map(t => (
                <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-white/50">{t}</span>
              ))}
            </div>
            <a href={selected.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg transition-all"
              style={{ color: selected.color, background: `${selected.color}12`, border: `1px solid ${selected.color}30` }}
            >
              <Github size={11} /> View on GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'''

# ──────────────────────────────────────────────────────────────
# ENGINEERING MIND — How I Think case study
# ──────────────────────────────────────────────────────────────
files["EngineeringMind.tsx"] = r'''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, ChevronRight } from "lucide-react";

const FLOW = [
  {
    phase: "01", label: "Problem", icon: "🎯", color: "#00d4ff",
    title: "Identify the Challenge",
    detail: "Language barriers limit global communication. 7,000+ languages exist but ML translation was inaccessible to indie developers. The challenge: build a functional NMT system from scratch with academic-level architecture.",
    tech: [],
  },
  {
    phase: "02", label: "Research", icon: "🔬", color: "#9b5de5",
    title: "Study the Domain",
    detail: "Deep-dived into Seq2Seq architectures, Bahdanau vs Luong attention mechanisms, BLEU scoring metrics, and analyzed Google's Neural Machine Translation system paper.",
    tech: [],
  },
  {
    phase: "03", label: "Architecture", icon: "🏗️", color: "#3b82f6",
    title: "Design the System",
    detail: "Encoder-Decoder with Luong Attention. 256-dim embeddings, 2-layer LSTM encoder/decoder, dropout regularization. Teacher forcing strategy for stable training convergence.",
    tech: ["Seq2Seq", "LSTM", "Attention", "Embeddings"],
  },
  {
    phase: "04", label: "Build", icon: "⚡", color: "#00ff88",
    title: "Implement & Iterate",
    detail: "Built custom BPE tokenizer, vocabulary builder (50K tokens), and TensorFlow training pipeline. 50 epochs with learning rate scheduling and gradient clipping for stability.",
    tech: ["TensorFlow", "Keras", "Python", "NumPy"],
  },
  {
    phase: "05", label: "Evaluate", icon: "📊", color: "#ff6b35",
    title: "Measure & Optimize",
    detail: "BLEU score benchmarking against held-out test set. Attention heatmap visualization to debug alignment issues. Hyperparameter tuning based on validation loss curves and translation quality.",
    tech: ["BLEU Score", "Matplotlib", "Analysis"],
  },
  {
    phase: "06", label: "Deploy", icon: "🚀", color: "#00d4ff",
    title: "Ship to Production",
    detail: "Flask REST API with input sanitization, rate limiting, and structured JSON responses. TF SavedModel serialization for efficient inference. Cross-platform tested on Linux and Windows.",
    tech: ["Flask", "REST API", "TF SavedModel"],
  },
];

export default function EngineeringMind() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="thinking" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(0,212,255,0.025) 0%, transparent 55%)" }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4">
            <Brain size={11} /> ENGINEERING THINKING
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-3">
            How I <span className="gradient-text">Think</span>
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Inside my problem-solving process — from raw idea to production ML system
          </p>
        </motion.div>

        {/* Case study badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.15 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3.5 glass rounded-2xl border border-neon-cyan/20">
            <span className="text-3xl">🧠</span>
            <div>
              <div className="text-sm font-bold text-white font-display">Case Study: ML-Based Language Translator</div>
              <div className="text-xs text-white/40 font-mono mt-0.5">Python · TensorFlow · NLP · Seq2Seq · Flask</div>
            </div>
            <a href="https://github.com/pun33th45/ML-based-translator" target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-neon-cyan/70 hover:text-neon-cyan flex items-center gap-1 transition-colors ml-2">
              GitHub <ChevronRight size={10} />
            </a>
          </div>
        </motion.div>

        {/* Flow steps — alternating layout */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.25), rgba(155,93,229,0.25), rgba(0,212,255,0.08))" }} />

          <div className="space-y-10">
            {FLOW.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="relative grid md:grid-cols-2 gap-0 items-center"
                >
                  {/* Card — alternates sides */}
                  <div className={`${isLeft ? "md:pr-12" : "md:pl-12 md:col-start-2"}`}>
                    <div
                      className="glass rounded-2xl p-6 border hover:border-white/18 transition-all duration-300 group"
                      style={{ borderColor: `${step.color}20` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{step.icon}</div>
                        <div>
                          <div className="text-[10px] font-mono tracking-wider mb-0.5" style={{ color: step.color }}>
                            PHASE {step.phase} — {step.label.toUpperCase()}
                          </div>
                          <h3 className="text-sm font-bold text-white group-hover:text-white/90">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed mb-3">{step.detail}</p>
                      {step.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {step.tech.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-white/50 border border-white/8">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center node — hidden on mobile */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
                    <motion.div
                      initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-mono text-black"
                      style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`, boxShadow: `0 0 18px ${step.color}45` }}
                    >
                      {step.phase}
                    </motion.div>
                  </div>

                  {/* Empty column placeholder */}
                  {isLeft && <div />}
                  {!isLeft && <div className="md:col-start-1 md:row-start-1" />}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Outcome card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1 }}
          className="mt-14 glass rounded-2xl p-7 border border-neon-cyan/20 text-center max-w-2xl mx-auto"
        >
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-lg font-display font-bold text-white mb-2">Result</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            A fully functional Neural Machine Translator with English-to-French capability, BLEU score optimization,
            and a production Flask API — proving end-to-end ML system design from research to deployment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
'''

# ──────────────────────────────────────────────────────────────
# PROJECTS — updated with orbit/grid toggle
# ──────────────────────────────────────────────────────────────
files["Projects.tsx"] = r'''"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, ExternalLink, Github, LayoutGrid, Globe, Star } from "lucide-react";
import dynamic from "next/dynamic";

const OrbitProjects = dynamic(() => import("./OrbitProjects"), { ssr: false });

type Category = "All" | "AI/ML" | "Web" | "Mobile" | "Systems";
type ViewMode = "grid" | "orbit";

interface Project {
  id: number; title: string; desc: string; stack: string[];
  category: Category; github: string; featured?: boolean; icon: string; color: string;
}

const PROJECTS: Project[] = [
  { id:1,  title:"ML-Based Translator",         desc:"Seq2Seq NMT with Bahdanau Attention. Custom tokenization & embedding pipelines, multilingual corpus preprocessing, served via Flask REST API.",            stack:["Python","TensorFlow","Keras","NLP","Flask"],       category:"AI/ML",    github:"https://github.com/pun33th45/ML-based-translator",                icon:"🌐", color:"#00d4ff", featured:true },
  { id:2,  title:"Segmentation Using ML",        desc:"Deep learning image segmentation with U-Net architecture for pixel-level semantic classification and scene understanding.",                               stack:["Python","TensorFlow","OpenCV","U-Net"],            category:"AI/ML",    github:"https://github.com/pun33th45/Segmentation_Using_ML",              icon:"🔬", color:"#9b5de5", featured:true },
  { id:3,  title:"Insight AI",                   desc:"AI-powered analytics platform analyzing data patterns and generating intelligent summaries through large language model integration.",                    stack:["Python","LLM","React","FastAPI"],                  category:"AI/ML",    github:"https://github.com/pun33th45/Insight-ai",                         icon:"💡", color:"#00d4ff" },
  { id:4,  title:"AI Resume Analyzer",           desc:"NLP-powered resume parsing and job-matching system that scores candidates and provides actionable, structured feedback.",                               stack:["Python","NLP","Flask","spaCy"],                    category:"AI/ML",    github:"https://github.com/pun33th45/ai-resume-analyzer",                 icon:"📄", color:"#3b82f6" },
  { id:5,  title:"AI-Based Code Editor",         desc:"Smart editor with real-time AI suggestions, error detection, and intelligent autocomplete powered by language models.",                                 stack:["Python","React","AI","Monaco","LLM"],              category:"AI/ML",    github:"https://github.com/pun33th45/Ai-based-code-editor",               icon:"⌨️", color:"#9b5de5", featured:true },
  { id:6,  title:"CodePilotAI",                  desc:"AI coding co-pilot with context-aware code generation, refactoring suggestions, and natural language to code translation.",                            stack:["Python","LLM","React","TypeScript"],               category:"AI/ML",    github:"https://github.com/pun33th45/CodePilotAI",                        icon:"🚀", color:"#00d4ff" },
  { id:7,  title:"PromptForge AI",               desc:"Professional prompt engineering platform with A/B testing, version control, and performance analytics for LLM prompts.",                               stack:["Python","AI","React","LLM"],                       category:"AI/ML",    github:"https://github.com/pun33th45/promptforge-ai",                     icon:"⚡", color:"#3b82f6" },
  { id:8,  title:"SpotMate",                     desc:"Full-stack spot booking platform with real-time availability, user authentication, and seamless reservation management.",                               stack:["React","Node.js","MongoDB","Express"],             category:"Web",      github:"https://github.com/pun33th45/SpotMate",                           icon:"📍", color:"#00d4ff" },
  { id:9,  title:"iPerf Web Performance Tool",   desc:"Browser-based network performance testing interface for iPerf. Visualizes bandwidth, jitter, and latency with real-time charts.",                     stack:["Python","Flask","JavaScript","WebSockets"],        category:"Web",      github:"https://github.com/pun33th45/iperf-web-performance-tool",         icon:"📊", color:"#9b5de5" },
  { id:10, title:"CompileX Beta",                desc:"Online multi-language code compilation platform with real-time execution, syntax highlighting, and shareable coding sessions.",                        stack:["React","Node.js","Docker","TypeScript"],           category:"Web",      github:"https://github.com/pun33th45/CompileX-BETA",                      icon:"🖥️", color:"#3b82f6", featured:true },
  { id:11, title:"Web Dev Projects",             desc:"Collection of modern web projects demonstrating responsive design, CSS animations, and interactive UI patterns.",                                      stack:["HTML","CSS","JavaScript","Responsive"],            category:"Web",      github:"https://github.com/pun33th45/Web-dev-projects",                   icon:"🌊", color:"#00d4ff" },
  { id:12, title:"Secret Coder",                 desc:"Gamified coding challenge platform with progressive difficulty levels, leaderboards, and developer achievement system.",                                stack:["JavaScript","Node.js","MongoDB","Socket.io"],      category:"Web",      github:"https://github.com/pun33th45/Secret-coder",                       icon:"🔐", color:"#9b5de5" },
  { id:13, title:"ParkMate Android",             desc:"Smart parking finder Android app with real-time slot availability, GPS navigation to nearest spots, and booking management.",                          stack:["Java","Android","Google Maps","Firebase"],         category:"Mobile",   github:"https://github.com/pun33th45/ParkMate-android",                   icon:"🅿️", color:"#00ff88", featured:true },
  { id:14, title:"Network Performance Tester",   desc:"Comprehensive application measuring network throughput, latency, and packet loss with diagnostic reporting and visualization.",                         stack:["Python","Networking","Socket","Matplotlib"],       category:"Systems",  github:"https://github.com/pun33th45/network-performance-tester-application", icon:"📡", color:"#3b82f6" },
  { id:15, title:"Channel Connectivity Tester",  desc:"Automated network channel testing tool identifying bottlenecks and generating diagnostic reports for network engineers.",                               stack:["Python","Networking","CLI","Diagnostics"],         category:"Systems",  github:"https://github.com/pun33th45/Channel-connectivity-tester",        icon:"🔗", color:"#9b5de5" },
  { id:16, title:"Park Matrix",                  desc:"Data-driven smart parking management system tracking occupancy patterns and predicting availability with analytics.",                                   stack:["Python","NumPy","Pandas","Data Analysis"],        category:"Systems",  github:"https://github.com/pun33th45/Park-Matrix",                        icon:"🗺️", color:"#00d4ff" },
];

const CATS: Category[] = ["All", "AI/ML", "Web", "Mobile", "Systems"];

function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 14, y: -((e.clientX - r.left) / r.width - 0.5) * 14 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov ? -5 : 0}px)`,
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        boxShadow: hov ? `0 20px 55px ${project.color}18, 0 0 0 1px ${project.color}22` : "none",
      }}
      className="glass rounded-2xl border border-white/8 p-5 flex flex-col gap-3.5 h-full"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{project.icon}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white leading-tight">{project.title}</h3>
              {project.featured && <Star size={9} fill={project.color} style={{ color: project.color }} />}
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ color: project.color, background: `${project.color}12` }}>
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
        {project.stack.slice(0, 4).map(t => (
          <span key={t} className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-white/50 border border-white/7">{t}</span>
        ))}
        {project.stack.length > 4 && <span className="text-[10px] font-mono text-white/25">+{project.stack.length - 4}</span>}
      </div>
      <motion.div animate={{ opacity: hov ? 1 : 0 }} className="flex items-center gap-1 text-[10px] font-mono" style={{ color: project.color }}>
        <ExternalLink size={9} /> View on GitHub
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<Category>("All");
  const [view, setView] = useState<ViewMode>("grid");

  const counts: Record<string, number> = { All: PROJECTS.length };
  CATS.slice(1).forEach(c => { counts[c] = PROJECTS.filter(p => p.category === c).length; });
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-15" />
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full opacity-4 blur-3xl" style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4">
            <Code2 size={11} /> {PROJECTS.length} PROJECTS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-3">
            Projects &amp; <span className="gradient-text">Builds</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base">
            Production systems spanning AI, web engineering, mobile, and networking
          </p>
        </motion.div>

        {/* Controls row */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
        >
          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {CATS.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  background: active === cat ? "#00d4ff" : "rgba(255,255,255,0.04)",
                  color: active === cat ? "#000" : "rgba(255,255,255,0.5)",
                  border: active === cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {cat} <span className="opacity-60 ml-1">{counts[cat]}</span>
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2 glass rounded-xl border border-white/10 p-1">
            {([["grid", LayoutGrid, "Grid"], ["orbit", Globe, "Orbit"]] as const).map(([mode, Icon, label]) => (
              <button key={mode} onClick={() => setView(mode as ViewMode)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{
                  background: view === mode ? "rgba(0,212,255,0.12)" : "transparent",
                  color: view === mode ? "#00d4ff" : "rgba(255,255,255,0.35)",
                  border: view === mode ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
                }}
              >
                <Icon size={12} />{label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Views */}
        <AnimatePresence mode="wait">
          {view === "orbit" ? (
            <motion.div key="orbit"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-3xl border border-white/8 overflow-hidden"
            >
              <OrbitProjects onViewGrid={() => setView("grid")} />
            </motion.div>
          ) : (
            <motion.div key="grid" layout
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <motion.div key={p.id} layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, delay: i * 0.035 }}
                  >
                    <TiltCard project={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }} className="mt-10 text-center">
          <a href="https://github.com/pun33th45" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-white/10 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/25 transition-all text-xs font-mono"
          >
            <Github size={14} /> View all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
'''

print("Writing Phase 2 upgrade files...")
for name, content in files.items():
    path = os.path.join(BASE_COMP, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Written: {name} ({len(content):,} bytes)")

# ── Updated page.tsx ──────────────────────────────────────────
page_tsx = r'''import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import EngineeringMind from "@/components/EngineeringMind";
import Experience from "@/components/Experience";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import CursorTrail from "@/components/CursorTrail";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function Home() {
  return (
    <main className="relative bg-space-black min-h-screen">
      <ScrollProgress />
      <CursorTrail />
      <ParticleNetwork />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <EngineeringMind />
      <Experience />
      <GitHubStats />
      <Contact />
    </main>
  );
}
'''
with open(os.path.join(BASE_APP, "page.tsx"), "w", encoding="utf-8") as f:
    f.write(page_tsx)
print("  Written: page.tsx")

# ── Update Navigation to add new sections ────────────────────
nav_patch = open(os.path.join(BASE_COMP, "Navigation.tsx"), "r", encoding="utf-8").read()
nav_patch = nav_patch.replace(
    '{ href: "#experience", label: "Experience" },',
    '{ href: "#experience", label: "Experience" },\n  { href: "#github", label: "GitHub" },'
)
nav_patch = nav_patch.replace(
    '  { href: "#about", label: "About" },\n  { href: "#skills", label: "Skills" },\n  { href: "#projects", label: "Projects" },\n  { href: "#experience", label: "Experience" },\n  { href: "#github", label: "GitHub" },\n  { href: "#contact", label: "Contact" },',
    '  { href: "#about", label: "About" },\n  { href: "#skills", label: "Skills" },\n  { href: "#projects", label: "Projects" },\n  { href: "#thinking", label: "Method" },\n  { href: "#github", label: "GitHub" },\n  { href: "#contact", label: "Contact" },'
)
with open(os.path.join(BASE_COMP, "Navigation.tsx"), "w", encoding="utf-8") as f:
    f.write(nav_patch)
print("  Updated: Navigation.tsx")

print("\nPhase 2 upgrade complete!")
