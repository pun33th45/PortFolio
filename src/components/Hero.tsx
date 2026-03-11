"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";

function GithubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

const ROLES = [
  "Building Intelligent Systems",
  "Engineering AI Solutions",
  "Creating Developer Tools",
  "Full-Stack AI Developer",
];

/* ── Floating code snippets data ── */
const CODE_SNIPPETS = [
  {
    lang: "Python",
    langColor: "#06B6D4",
    dotColor: "#06B6D4",
    floatClass: "code-float-a",
    lines: [
      { indent: 0, tokens: [{ t: "def ", c: "#8B5CF6" }, { t: "train_model", c: "#06B6D4" }, { t: "(data):", c: "#f1f5f9" }] },
      { indent: 1, tokens: [{ t: "model", c: "#f1f5f9" }, { t: ".", c: "#8B5CF6" }, { t: "fit", c: "#06B6D4" }, { t: "(data)", c: "#f1f5f9" }] },
      { indent: 1, tokens: [{ t: "return ", c: "#8B5CF6" }, { t: "predictions", c: "#3B82F6" }] },
    ],
  },
  {
    lang: "Node.js",
    langColor: "#8B5CF6",
    dotColor: "#8B5CF6",
    floatClass: "code-float-b",
    lines: [
      { indent: 0, tokens: [{ t: "app", c: "#f1f5f9" }, { t: ".", c: "#8B5CF6" }, { t: "get", c: "#06B6D4" }, { t: '("/api", ', c: "#f1f5f9" }, { t: "(req, res) =>", c: "#8B5CF6" }] },
      { indent: 1, tokens: [{ t: "res", c: "#f1f5f9" }, { t: ".", c: "#8B5CF6" }, { t: "json", c: "#06B6D4" }, { t: "(projects)", c: "#f1f5f9" }] },
      { indent: 0, tokens: [{ t: "});", c: "#f1f5f9" }] },
    ],
  },
];

function CodeSnippetPanel({ snippet, style }: { snippet: typeof CODE_SNIPPETS[0]; style: React.CSSProperties }) {
  return (
    <div
      className={snippet.floatClass}
      style={{
        position: "absolute",
        ...style,
        background: "rgba(5,5,10,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${snippet.dotColor}28`,
        borderRadius: "12px",
        padding: "12px 16px",
        minWidth: "220px",
        boxShadow: `0 0 24px ${snippet.dotColor}15, 0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 0.5px ${snippet.dotColor}10`,
        zIndex: 5,
      }}
    >
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
        {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
        ))}
        <span style={{ marginLeft: 6, fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: snippet.langColor, opacity: 0.8 }}>
          {snippet.lang}
        </span>
      </div>
      {/* Code lines */}
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", lineHeight: "1.7" }}>
        {snippet.lines.map((line, li) => (
          <div key={li} style={{ paddingLeft: line.indent * 16 }}>
            {line.tokens.map((tok, ti) => (
              <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [idx, setIdx]       = useState(0);
  const [txt, setTxt]       = useState("");
  const [del, setDel]       = useState(false);
  const containerRef        = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  // Only apply y-parallax. Opacity transform was causing content to start invisible
  // when useScroll initialises before the ref is attached (scrollYProgress != 0).
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    const role = ROLES[idx];
    let t: NodeJS.Timeout;
    if (!del && txt.length < role.length)
      t = setTimeout(() => setTxt(role.slice(0, txt.length + 1)), 50);
    else if (!del && txt.length === role.length)
      t = setTimeout(() => setDel(true), 2400);
    else if (del && txt.length > 0)
      t = setTimeout(() => setTxt(role.slice(0, txt.length - 1)), 25);
    else { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [txt, del, idx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 cyber-grid opacity-100" />

      {/* Top glow — stronger */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.14) 0%, transparent 70%)" }} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(5,5,10,0.8))" }} />

      <motion.div style={{ y }} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border mb-8 w-fit"
              style={{ borderColor: "rgba(6,182,212,0.3)", boxShadow: "0 0 12px rgba(6,182,212,0.08)" }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#06B6D4", boxShadow: "0 0 6px #06B6D4" }}
              />
              <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest" style={{ color: "#06B6D4" }}>AVAILABLE FOR OPPORTUNITIES</span>
              <Sparkles size={10} style={{ color: "#06B6D4" }} />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6"
            >
              <div className="text-white/30 font-mono text-sm mb-3 tracking-widest">&lt; AI Engineer /&gt;</div>
              <h1 className="font-display font-black leading-none tracking-tight">
                <span className="block text-white" style={{ fontSize: "clamp(3.5rem,8vw,7rem)" }}>Puneeth</span>
                <span
                  className="block pb-2"
                  style={{
                    fontSize: "clamp(3.5rem,8vw,7rem)",
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 24px rgba(6,182,212,0.3))",
                  }}
                >
                  Raj
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-8 mb-6 flex items-center"
            >
              <Terminal size={13} className="text-brand-cyan/50 mr-2 shrink-0" />
              <span className="font-mono text-base text-white/70">
                {txt}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 animate-pulse align-middle"
                  style={{ background: "#06B6D4", boxShadow: "0 0 8px #06B6D4" }}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/50 leading-relaxed mb-10 max-w-lg"
            >
              Third-year B.Tech CS student specializing in{" "}
              <span style={{ color: "#06B6D4", fontWeight: 500 }}>AI & Machine Learning</span>{" "}
              at Sreyas Institute. Building production-ready AI systems that create real-world impact.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => scrollTo("projects")}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.04] active:scale-[.97] relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  boxShadow: "0 0 24px rgba(59,130,246,0.4), 0 0 48px rgba(6,182,212,0.1)",
                }}
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }} />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white/80 glass border border-white/10 hover:border-brand-cyan/40 hover:text-white transition-all duration-200 hover:scale-[1.04] active:scale-[.97]"
                style={{ boxShadow: "0 0 0 0 transparent" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 16px rgba(6,182,212,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                Contact Me
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex gap-8 mb-8"
            >
              {[["16+", "Projects"], ["15+", "Technologies"], ["2025", "Intern"]].map(([v, l]) => (
                <div key={l} className="group">
                  <div
                    className="text-2xl font-black font-display grad group-hover:scale-110 transition-transform origin-left"
                  >{v}</div>
                  <div className="text-xs text-white/35 font-mono">{l}</div>
                </div>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex gap-2">
              {[
                { icon: GithubIcon, href: "https://github.com/pun33th45",                     label: "GitHub"   },
                { icon: Linkedin, href: "https://www.linkedin.com/in/puneeth-raj-774506211", label: "LinkedIn" },
                { icon: Mail,     href: "mailto:puneethraaaj@gmail.com",                       label: "Email"    },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  className="p-3 glass rounded-xl border border-white/8 text-white/40 transition-all duration-200 hover:scale-105"
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#06B6D4";
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(6,182,212,0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Globe + floating code panels */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: "540px" }}
          >
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-brand-cyan/8 glow-pulse" />
              <div className="absolute w-96 h-96 rounded-full border border-brand-purple/5" />
              <div className="absolute w-56 h-56 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }} />
            </div>

            {/* Globe */}
            <div className="w-full h-full">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-brand-cyan animate-pulse" />
                </div>
              }>
                <Globe3D />
              </Suspense>
            </div>

            {/* Floating tech labels */}
            {[
              { label: "TensorFlow", x: "6%",  y: "18%", d: 0.8 },
              { label: "Neural NLP", x: "72%", y: "14%", d: 1.0 },
              { label: "Python",     x: "4%",  y: "66%", d: 1.2 },
              { label: "React",      x: "76%", y: "70%", d: 1.4 },
            ].map(f => (
              <motion.div key={f.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: f.d }}
                className="absolute font-mono text-xs px-2 py-1 glass rounded-lg"
                style={{
                  left: f.x, top: f.y,
                  color: "rgba(6,182,212,0.8)",
                  border: "1px solid rgba(6,182,212,0.2)",
                  boxShadow: "0 0 10px rgba(6,182,212,0.08)",
                }}
              >
                {f.label}
              </motion.div>
            ))}

            {/* Floating code snippet — Python */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              style={{ position: "absolute", top: "5%", right: "-8%", zIndex: 10 }}
            >
              <CodeSnippetPanel snippet={CODE_SNIPPETS[0]} style={{}} />
            </motion.div>

            {/* Floating code snippet — Node.js */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              style={{ position: "absolute", bottom: "8%", left: "-12%", zIndex: 10 }}
            >
              <CodeSnippetPanel snippet={CODE_SNIPPETS[1]} style={{}} />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={() => scrollTo("about")}
        >
          <span className="text-[10px] font-mono text-white/20 tracking-widest">EXPLORE</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown size={13} className="text-brand-cyan/35" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
