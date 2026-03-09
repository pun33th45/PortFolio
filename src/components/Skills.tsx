"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Tech {
  name:  string;
  badge: string;
  color: string;
  bg:    string;
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
      { name:"OpenCV",     badge:"CV",  color:"#5C9EBD", bg:"rgba(92,158,189,0.14)", level:74 },
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

function TechCard({ tech, delay }: { tech: Tech; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="relative glass rounded-xl border p-4 flex flex-col gap-3"
      style={{
        borderColor: hov ? `${tech.color}45` : "rgba(255,255,255,0.08)",
        boxShadow:   hov
          ? `0 0 0 1px ${tech.color}30, 0 8px 32px ${tech.color}18, 0 0 60px ${tech.color}06`
          : "none",
        background: hov
          ? `radial-gradient(ellipse at 50% -10%, ${tech.color}10 0%, rgba(255,255,255,0.04) 70%)`
          : "rgba(255,255,255,0.04)",
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      {/* Top accent line on hover */}
      <div
        style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
          background: hov
            ? `linear-gradient(90deg, transparent, ${tech.color}80, transparent)`
            : "transparent",
          borderRadius: "1px",
          transition: "background 0.3s ease",
        }}
      />

      {/* Badge + name */}
      <div className="flex items-center gap-2.5">
        <motion.div
          animate={hov ? { scale: 1.1, rotate: [0, -3, 3, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.35 }}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
          style={{
            background: tech.bg,
            color: tech.color,
            border: `1px solid ${tech.color}${hov ? "50" : "25"}`,
            boxShadow: hov ? `0 0 12px ${tech.color}35` : "none",
            transition: "border-color .25s, box-shadow .25s",
          }}
        >
          {tech.badge}
        </motion.div>
        <span className="text-sm font-semibold" style={{ color: hov ? "#f1f5f9" : "rgba(255,255,255,0.8)" }}>
          {tech.name}
        </span>
      </div>

      {/* Level bar */}
      <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${tech.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: delay + 0.1 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${tech.color}70, ${tech.color})`,
            boxShadow: hov ? `0 0 6px ${tech.color}80` : "none",
            transition: "box-shadow .25s",
          }}
        />
      </div>

      {/* Level label */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>proficiency</span>
        <span className="text-[10px] font-mono font-bold" style={{ color: hov ? tech.color : "rgba(255,255,255,0.3)" }}>
          {tech.level}%
        </span>
      </div>
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
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border text-xs font-mono mb-5"
            style={{ borderColor: "rgba(6,182,212,0.3)", color: "#06B6D4" }}
          >
            🛠 TECH STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Skills &amp; <span className="grad">Technologies</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Tools I use daily to design, build, and deploy intelligent systems.
          </p>
        </motion.div>

        {/* Category sections */}
        <div className="space-y-12">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: `0 0 16px ${cat.color}50` }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                  style={{
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}35`,
                    transition: "all .25s",
                  }}
                >
                  {cat.emoji}
                </motion.div>
                <h3 className="font-display font-bold text-white text-base">{cat.label}</h3>
                <div className="flex-1 relative h-px overflow-visible">
                  <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(90deg, ${cat.color}50, ${cat.color}10, transparent)` }}
                  />
                  {/* Shimmer dot */}
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: ci * 0.5 }}
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
                  />
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ color: cat.color, background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}
                >
                  {cat.techs.length} tools
                </span>
              </div>

              {/* Tech cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {cat.techs.map((tech, ti) => (
                  <TechCard
                    key={tech.name}
                    tech={tech}
                    delay={ci * 0.06 + ti * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
