"use client";
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
