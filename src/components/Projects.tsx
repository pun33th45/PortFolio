"use client";
import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Code2, ExternalLink } from "lucide-react";

type Cat = "All" | "AI/ML" | "Web" | "Mobile" | "Systems";

const CATS: { label: string; value: Cat }[] = [
  { label: "All",     value: "All"     },
  { label: "AI / ML", value: "AI/ML"   },
  { label: "Web",     value: "Web"     },
  { label: "Mobile",  value: "Mobile"  },
  { label: "Systems", value: "Systems" },
];

interface Project {
  id: number; title: string; desc: string; stack: string[];
  cat: Cat; github: string; featured?: boolean; icon: string; color: string;
}

const PROJECTS: Project[] = [
  { id:1,  title:"ML-Based Translator",        desc:"Seq2Seq NMT with Bahdanau Attention — custom tokenization, multilingual corpus preprocessing, served via Flask REST API.",          stack:["Python","TensorFlow","Keras","NLP","Flask"],        cat:"AI/ML",   github:"https://github.com/pun33th45/ML-based-translator",                    icon:"🌐", color:"#06B6D4", featured:true  },
  { id:2,  title:"Segmentation Using ML",       desc:"U-Net deep learning architecture for pixel-level semantic image segmentation and scene understanding.",                             stack:["Python","TensorFlow","OpenCV","U-Net"],             cat:"AI/ML",   github:"https://github.com/pun33th45/Segmentation_Using_ML",                  icon:"🔬", color:"#8B5CF6", featured:true  },
  { id:3,  title:"Insight AI",                  desc:"AI analytics platform that analyzes data patterns and generates intelligent summaries via LLM integration.",                       stack:["Python","LLM","React","FastAPI"],                   cat:"AI/ML",   github:"https://github.com/pun33th45/Insight-ai",                            icon:"💡", color:"#06B6D4"               },
  { id:4,  title:"AI Resume Analyzer",          desc:"NLP-powered resume parsing and job-matching system — scores candidates and provides structured actionable feedback.",              stack:["Python","NLP","Flask","spaCy"],                     cat:"AI/ML",   github:"https://github.com/pun33th45/ai-resume-analyzer",                    icon:"📄", color:"#3B82F6"               },
  { id:5,  title:"AI-Based Code Editor",        desc:"Smart code editor with real-time AI suggestions, error detection, and intelligent autocomplete powered by language models.",       stack:["Python","React","Monaco","LLM"],                    cat:"AI/ML",   github:"https://github.com/pun33th45/Ai-based-code-editor",                  icon:"⌨️", color:"#8B5CF6", featured:true  },
  { id:6,  title:"CodePilotAI",                 desc:"AI coding co-pilot with context-aware generation, refactoring suggestions, and natural language to code translation.",             stack:["Python","LLM","React","TypeScript"],                cat:"AI/ML",   github:"https://github.com/pun33th45/CodePilotAI",                           icon:"🚀", color:"#06B6D4"               },
  { id:7,  title:"PromptForge AI",              desc:"Prompt engineering platform with A/B testing, version control, and performance analytics for LLM prompts.",                       stack:["Python","AI","React","LLM"],                        cat:"AI/ML",   github:"https://github.com/pun33th45/promptforge-ai",                        icon:"⚡", color:"#3B82F6"               },
  { id:8,  title:"SpotMate",                    desc:"Full-stack spot booking platform with real-time availability, user authentication, and seamless reservation management.",          stack:["React","Node.js","MongoDB","Express"],              cat:"Web",     github:"https://github.com/pun33th45/SpotMate",                              icon:"📍", color:"#06B6D4"               },
  { id:9,  title:"iPerf Web Performance Tool",  desc:"Browser-based network testing interface for iPerf — visualizes bandwidth, jitter, and latency with real-time charts.",             stack:["Python","Flask","JavaScript","WebSockets"],         cat:"Web",     github:"https://github.com/pun33th45/iperf-web-performance-tool",            icon:"📊", color:"#8B5CF6"               },
  { id:10, title:"CompileX Beta",               desc:"Online multi-language code compilation platform with real-time execution, syntax highlighting, and shareable sessions.",           stack:["React","Node.js","Docker","TypeScript"],            cat:"Web",     github:"https://github.com/pun33th45/CompileX-BETA",                         icon:"🖥️", color:"#3B82F6", featured:true  },
  { id:11, title:"Web Dev Projects",            desc:"Collection of modern web projects demonstrating responsive design, CSS animations, and interactive UI patterns.",                  stack:["HTML","CSS","JavaScript"],                         cat:"Web",     github:"https://github.com/pun33th45/Web-dev-projects",                      icon:"🌊", color:"#06B6D4"               },
  { id:12, title:"Secret Coder",                desc:"Gamified coding challenge platform with progressive difficulty, leaderboards, and developer achievement system.",                  stack:["JavaScript","Node.js","MongoDB","Socket.io"],       cat:"Web",     github:"https://github.com/pun33th45/Secret-coder",                          icon:"🔐", color:"#8B5CF6"               },
  { id:13, title:"ParkMate",                     desc:"Peer-to-peer smart parking platform for Hyderabad — weighted multi-criteria scoring algorithm, real-time slot booking, Gemini 2.0 Flash AI integration, ZXing QR verification, and Cashfree payment gateway. Built as final year capstone project.", stack:["Kotlin","Jetpack Compose","Supabase","PostgreSQL","Gemini 2.0","Cashfree","ZXing","Android"], cat:"Mobile",  github:"https://github.com/pun33th45/ParkMate-android",                      icon:"🅿️", color:"#10B981", featured:true  },
  { id:14, title:"Network Performance Tester",  desc:"Measures network throughput, latency, and packet loss with comprehensive diagnostic reporting and visualization.",                 stack:["Python","Networking","Socket","Matplotlib"],        cat:"Systems", github:"https://github.com/pun33th45/network-performance-tester-application", icon:"📡", color:"#3B82F6"               },
  { id:15, title:"Channel Connectivity Tester", desc:"Automated network channel testing tool identifying bottlenecks and generating diagnostic reports for network engineers.",          stack:["Python","Networking","CLI","Diagnostics"],          cat:"Systems", github:"https://github.com/pun33th45/Channel-connectivity-tester",           icon:"🔗", color:"#8B5CF6"               },
  { id:16, title:"Park Matrix",                 desc:"Data-driven smart parking management tracking occupancy patterns and predicting availability through analytics.",                  stack:["Python","NumPy","Pandas","Data Analysis"],          cat:"Systems", github:"https://github.com/pun33th45/Park-Matrix",                           icon:"🗺️", color:"#06B6D4"               },
  { id:17, title:"Autonomous Vehicle Detection", desc:"Real-time obstacle detection for autonomous vehicles using YOLOv8 with a Streamlit dashboard — live on HuggingFace Spaces.",      stack:["Python","YOLOv8","PyTorch","Streamlit","FastAPI","Computer Vision"], cat:"AI/ML",   github:"https://github.com/pun33th45/autonomous-vehicle-obstacle-detection-yolo", icon:"🚗", color:"#10B981", featured:true },
  { id:18, title:"N8N Workflow Generator",        desc:"Generate production-ready n8n automation workflows from plain English descriptions using Google Gemini AI.",                       stack:["TypeScript","Google Gemini","n8n","AI Automation"],  cat:"AI/ML",   github:"https://github.com/pun33th45/n8n-workflow-generator",                     icon:"⚙️", color:"#F59E0B"               },
  { id:19, title:"RAG Developer Assistant",       desc:"AI-powered RAG-based developer assistant — upload entire codebases or documents and interact using natural language queries.",    stack:["Python","RAG","LLM","LangChain","Vector DB"],         cat:"AI/ML",   github:"https://github.com/pun33th45/RAG-Based-Developer-Assistant",              icon:"🤖", color:"#8B5CF6"               },
  { id:20, title:"Football Value Predictor",      desc:"ML model estimating football player transfer market values based on performance statistics and data-driven feature analysis.",    stack:["Python","Scikit-learn","Pandas","NumPy","ML"],        cat:"AI/ML",   github:"https://github.com/pun33th45/football-transfer-market-value-predictor",   icon:"⚽", color:"#3B82F6"               },
  { id:21, title:"FinSight AI",                   desc:"AI-powered expense tracker that logs spending, sets budgets, and generates smart insights into personal financial habits.",        stack:["TypeScript","React","Next.js","AI","Finance"],        cat:"Web",     github:"https://github.com/pun33th45/finsight-ai",                               icon:"💰", color:"#06B6D4"               },
  { id:22, title:"Selenium E-Commerce Framework", desc:"Industry-level Selenium Java automation framework for e-commerce — TestNG, Maven, Page Object Model, Log4j2, Extent Reports.",   stack:["Java","Selenium","TestNG","Maven","Log4j2"],          cat:"Systems", github:"https://github.com/pun33th45/selenium-ecommerce-framework",               icon:"🧪", color:"#F97316"               },
];

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov]   = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: -((e.clientY - r.top)  / r.height - 0.5) * 10,
      y:  ((e.clientX - r.left) / r.width  - 0.5) * 10,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.4) }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hov ? -6 : 0}px)`,
          transition: "transform .18s ease, box-shadow .3s ease, border-color .3s ease",
          boxShadow: hov
            ? `0 0 0 1px ${p.color}45, 0 20px 50px ${p.color}18, 0 0 80px ${p.color}06`
            : "none",
          borderColor: hov ? `${p.color}40` : "rgba(255,255,255,0.08)",
          background: hov
            ? `radial-gradient(ellipse at 50% 0%, ${p.color}06 0%, rgba(255,255,255,0.04) 60%)`
            : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${hov ? p.color + "40" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column" as const,
          gap: "16px",
          height: "100%",
          position: "relative" as const,
          overflow: "hidden",
        }}
      >
        {/* Top glow streak on hover */}
        {hov && (
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
            background: `linear-gradient(90deg, transparent, ${p.color}80, transparent)`,
            pointerEvents: "none",
          }} />
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold font-mono text-sm flex-shrink-0"
              style={{
                background: `${p.color}18`,
                color: p.color,
                border: `1px solid ${p.color}35`,
              }}
            >
              {p.title.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white leading-tight">{p.title}</h3>
                {p.featured && (
                  <Star size={9} fill={p.color} style={{ color: p.color, filter: `drop-shadow(0 0 4px ${p.color})` }} />
                )}
              </div>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded mt-0.5 inline-block"
                style={{ color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}25` }}
              >{p.cat}</span>
            </div>
          </div>
          <a
            href={p.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="p-1.5 glass rounded-lg border border-white/8 text-white/35 transition-all duration-200 shrink-0 flex items-center gap-1"
            onMouseEnter={e => {
              e.currentTarget.style.color = p.color;
              e.currentTarget.style.borderColor = `${p.color}50`;
              e.currentTarget.style.boxShadow = `0 0 12px ${p.color}30`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "";
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <GithubIcon size={13} />
            <ExternalLink size={9} />
          </a>
        </div>

        <p className="text-white/48 text-xs leading-relaxed flex-1">{p.desc}</p>

        {/* Tech stack — animate badges on hover */}
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((t, ti) => (
            <motion.span
              key={t}
              animate={hov ? { y: -2, scale: 1.04 } : { y: 0, scale: 1 }}
              transition={{ duration: 0.2, delay: ti * 0.03 }}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md"
              style={{
                background: hov ? `${p.color}12` : "rgba(255,255,255,0.05)",
                color: hov ? p.color : "rgba(255,255,255,0.4)",
                border: `1px solid ${hov ? p.color + "30" : "rgba(255,255,255,0.06)"}`,
                transition: "color .2s, background .2s, border-color .2s",
              }}
            >{t}</motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [cat, setCat] = useState<Cat>("All");

  const filtered = useMemo(
    () => cat === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === cat),
    [cat],
  );

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border text-xs font-mono mb-5"
            style={{ borderColor: "rgba(6,182,212,0.3)", color: "#06B6D4" }}
          >
            <Code2 size={11} /> PROJECTS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            What I&apos;ve <span className="grad">Built</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            22 real projects — AI/ML, web development, mobile, and systems engineering.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATS.map(c => {
            const active = cat === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className="px-5 py-2 rounded-full text-sm font-mono transition-all duration-200"
                style={{
                  background: active ? "rgba(6,182,212,0.15)"  : "rgba(255,255,255,0.04)",
                  border:     active ? "1px solid rgba(6,182,212,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  color:      active ? "#06B6D4"               : "rgba(255,255,255,0.4)",
                  boxShadow:  active ? "0 0 16px rgba(6,182,212,0.12)" : "none",
                }}
              >{c.label}</button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
