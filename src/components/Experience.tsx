"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, Globe, MapPin, Sparkles } from "lucide-react";

/* ── Updated certifications ── */
const CERTS = [
  {
    title:    "Understanding Agentic AI",
    issuer:   "AgentAcademy.ai",
    desc:     "Agentic AI architectures, multi-agent systems, and autonomous task execution.",
    icon:     "🤖",
    color:    "#06B6D4",
    badge:    "AI / Agents",
  },
  {
    title:    "AI Fluency: Framework & Foundations",
    issuer:   "Anthropic Skilljar",
    desc:     "Core AI concepts, responsible development, and Claude's capabilities & design.",
    icon:     "✦",
    color:    "#8B5CF6",
    badge:    "Foundations",
  },
  {
    title:    "Intro to AI: A Beginner's Guide",
    issuer:   "Udemy",
    desc:     "Fundamentals of Artificial Intelligence — machine learning, neural nets, and applications.",
    icon:     "🧠",
    color:    "#3B82F6",
    badge:    "Machine Learning",
  },
];

function CertCard({ c, i, inView }: { c: typeof CERTS[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.25 + i * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl p-5 flex flex-col gap-3 group cursor-default overflow-hidden"
      style={{
        background:   `${c.color}08`,
        border:       `1px solid ${c.color}22`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition:   "box-shadow .25s ease, border-color .25s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 28px ${c.color}18, 0 8px 40px rgba(0,0,0,0.35)`;
        e.currentTarget.style.borderColor = `${c.color}45`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = `${c.color}22`;
      }}
    >
      {/* Top glow line on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${c.color}90, transparent)` }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${c.color}18`,
            border:     `1px solid ${c.color}35`,
            boxShadow:  `0 0 12px ${c.color}12`,
          }}
        >
          {c.icon}
        </div>

        {/* Badge */}
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
          style={{
            color:      c.color,
            background: `${c.color}14`,
            border:     `1px solid ${c.color}28`,
          }}
        >
          {c.badge}
        </span>
      </div>

      {/* Title */}
      <div>
        <h4 className="text-sm font-bold text-white leading-snug mb-1">{c.title}</h4>
        <div className="flex items-center gap-1.5">
          <Sparkles size={9} style={{ color: c.color }} />
          <span className="text-xs font-mono" style={{ color: `${c.color}CC` }}>{c.issuer}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/40 text-xs leading-relaxed">{c.desc}</p>

      {/* Bottom accent dot */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }}
        />
        <span className="text-[10px] font-mono text-white/25">Certified</span>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border text-xs font-mono mb-5"
            style={{ borderColor: "rgba(6,182,212,0.3)", color: "#06B6D4" }}
          >
            <Briefcase size={11} /> EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-4">
            Work <span className="grad">Experience</span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT — Internship ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <div
              className="glass rounded-2xl p-6 md:p-7 h-full"
              style={{ border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.25)",
                  }}
                >
                  <Globe size={20} style={{ color: "#06B6D4" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="text-white font-bold text-base">Web Development Intern</h3>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(6,182,212,0.12)",
                        color: "#06B6D4",
                        border: "1px solid rgba(6,182,212,0.25)",
                      }}
                    >Current</span>
                  </div>
                  <div className="text-sm font-mono" style={{ color: "rgba(6,182,212,0.8)" }}>
                    Terabeam Proxim Wireless Pvt. Ltd
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-white/30" />
                      <span className="text-white/30 text-xs">Hyderabad</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {[
                  "Building and maintaining web applications using modern frontend technologies",
                  "Collaborating with the engineering team on product features and UI components",
                  "Implementing responsive UI and optimizing performance",
                  "Working with REST APIs and integrating backend services",
                ].map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/55 text-sm">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: "rgba(6,182,212,0.6)" }}
                    />
                    {r}
                  </li>
                ))}
              </ul>

              {/* Activities */}
              <div className="pt-5 border-t border-white/6">
                <div className="text-[10px] font-mono text-white/25 mb-3 tracking-widest">ACTIVITIES</div>
                {[
                  { title: "Project Expo",  icon: "🏆", desc: "Presented innovative projects at college expo" },
                  { title: "Zoho Workshop", icon: "🔧", desc: "Intensive tech workshop by Zoho" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2.5">
                    <span className="text-base">{a.icon}</span>
                    <div>
                      <span className="text-sm text-white/65 font-medium">{a.title}</span>
                      <span className="text-xs text-white/30 ml-2">{a.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Certifications ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
              >
                <Award size={15} style={{ color: "#8B5CF6" }} />
              </div>
              <h3 className="font-display font-bold text-white">Certifications</h3>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full ml-1"
                style={{ color: "#8B5CF6", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}
              >
                {CERTS.length} earned
              </span>
            </div>

            {/* Cert cards — staggered grid */}
            <div className="grid sm:grid-cols-1 gap-3">
              {CERTS.map((c, i) => (
                <CertCard key={c.title} c={c} i={i} inView={inView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
