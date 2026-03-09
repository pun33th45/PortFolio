"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Lightbulb, Wrench, Rocket, CheckCircle2, User } from "lucide-react";

const FEATURES = [
  {
    icon:  Brain,
    label: "AI & Machine Learning",
    desc:  "Focused on developing intelligent systems and learning modern AI technologies.",
    color: "#06B6D4",
  },
  {
    icon:  Lightbulb,
    label: "Problem Solving",
    desc:  "Enjoy analyzing problems and designing efficient technical solutions.",
    color: "#8B5CF6",
  },
  {
    icon:  Wrench,
    label: "Developer Mindset",
    desc:  "Passionate about writing clean code and building useful tools.",
    color: "#3B82F6",
  },
  {
    icon:  Rocket,
    label: "Continuous Learning",
    desc:  "Constantly exploring new technologies and improving my technical skills.",
    color: "#10B981",
  },
];

const HIGHLIGHTS = [
  "AI & Machine Learning Focus",
  "Building real-world developer tools",
  "Strong interest in intelligent systems",
  "Continuous learner exploring new technologies",
];

function FeatureCard({ f, i }: { f: typeof FEATURES[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: 0.1 + i * 0.09 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative rounded-2xl p-5 flex gap-4 items-start group cursor-default overflow-hidden"
      style={{
        background:          `${f.color}08`,
        border:              `1px solid ${f.color}22`,
        backdropFilter:      "blur(16px)",
        WebkitBackdropFilter:"blur(16px)",
        transition:          "box-shadow .25s ease, border-color .25s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow    = `0 0 32px ${f.color}18, 0 8px 40px rgba(0,0,0,0.35)`;
        e.currentTarget.style.borderColor  = `${f.color}48`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow    = "none";
        e.currentTarget.style.borderColor  = `${f.color}22`;
      }}
    >
      {/* Top accent glow on hover */}
      <div
        className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${f.color}90, transparent)` }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${f.color}18`,
          border:     `1px solid ${f.color}35`,
          boxShadow:  `0 0 12px ${f.color}10`,
        }}
      >
        <f.icon size={19} style={{ color: f.color }} />
      </div>

      {/* Text */}
      <div>
        <div className="font-display font-bold text-white text-sm mb-1.5">{f.label}</div>
        <div className="text-white/50 text-xs leading-relaxed">{f.desc}</div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 15% 50%, rgba(6,182,212,0.05) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>

        {/* ── Main two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT ── Title + Intro + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Label pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border text-xs font-mono mb-6"
              style={{ borderColor: "rgba(6,182,212,0.3)", color: "#06B6D4" }}
            >
              <User size={11} /> ABOUT ME
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white mb-4 leading-tight">
              Who I <span className="grad">Am</span>
            </h2>

            {/* Glowing divider */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="h-px flex-1"
                style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.6), rgba(139,92,246,0.3), transparent)" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#06B6D4", boxShadow: "0 0 8px #06B6D4, 0 0 16px rgba(6,182,212,0.4)" }}
              />
            </div>

            {/* Intro paragraph */}
            <p className="text-white/65 leading-relaxed text-base mb-8">
              I am a Computer Science student specializing in{" "}
              <span style={{ color: "#06B6D4", fontWeight: 600 }}>Artificial Intelligence and Machine Learning</span>.
              I enjoy building intelligent systems, experimenting with machine learning technologies, and creating
              practical software solutions. My goal is to combine engineering with intelligent automation to build
              tools that solve real-world problems.
            </p>

            {/* Highlight bullets */}
            <div className="space-y-3">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={15}
                    style={{ color: i % 2 === 0 ? "#06B6D4" : "#8B5CF6", flexShrink: 0 }}
                  />
                  <span className="text-white/70 text-sm">{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT ── Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.label} f={f} i={i} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
