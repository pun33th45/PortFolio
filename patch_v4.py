import os, re

BASE    = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio\src"
ROOT    = r"c:\Users\PYadav\OneDrive\Desktop\Portfolio"

# ──────────────────────────────────────────────
# 1. tailwind.config.ts — update accent colors
# ──────────────────────────────────────────────
tw_path = os.path.join(ROOT, "tailwind.config.ts")
with open(tw_path, "r", encoding="utf-8") as f:
    tw = f.read()

tw = tw.replace('"#00d4ff"', '"#06B6D4"')   # neon.cyan
tw = tw.replace('"#9b5de5"', '"#8B5CF6"')   # neon.purple
tw = tw.replace('"#030712"', '"#0B0B0F"')   # space.black
tw = tw.replace(
    '"cyber-grid": "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)"',
    '"cyber-grid": "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)"'
)
tw = tw.replace(
    '"neon-glow": "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)"',
    '"neon-glow": "radial-gradient(ellipse at center, rgba(6,182,212,0.18) 0%, transparent 70%)"'
)

with open(tw_path, "w", encoding="utf-8") as f:
    f.write(tw)
print("  Patched: tailwind.config.ts")

# ──────────────────────────────────────────────
# 2. globals.css — update CSS variables + background
# ──────────────────────────────────────────────
css_path = os.path.join(BASE, "app/globals.css")
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

css = css.replace("--neon-cyan: #00d4ff;",   "--neon-cyan: #06B6D4;")
css = css.replace("--neon-purple: #9b5de5;", "--neon-purple: #8B5CF6;")
css = css.replace("background-color: #030712;", "background-color: #0B0B0F;")
css = css.replace("background: linear-gradient(180deg, #00d4ff, #9b5de5);",
                  "background: linear-gradient(180deg, #06B6D4, #8B5CF6);")
# text-neon-cyan
css = css.replace("color: #00d4ff;", "color: #06B6D4;")
css = css.replace("color: #9b5de5;", "color: #8B5CF6;")
# gradient-text
css = css.replace("background: linear-gradient(135deg, #00d4ff 0%, #9b5de5 50%, #3b82f6 100%);",
                  "background: linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #3B82F6 100%);")
css = css.replace("background: linear-gradient(135deg, #00d4ff, #9b5de5);",
                  "background: linear-gradient(135deg, #06B6D4, #8B5CF6);")
# scrollbar
css = css.replace("background: linear-gradient(90deg, #00d4ff, #9b5de5, #3b82f6);",
                  "background: linear-gradient(90deg, #06B6D4, #8B5CF6, #3B82F6);")
# scroll progress bar
css = css.replace("background: linear-gradient(90deg, #00d4ff, #9b5de5, #3b82f6);",
                  "background: linear-gradient(90deg, #06B6D4, #8B5CF6, #3B82F6);")

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)
print("  Patched: globals.css")

# ──────────────────────────────────────────────
# 3. Hero.tsx — remove resume button, startup phrase, CGPA stat
# ──────────────────────────────────────────────
hero_path = os.path.join(BASE, "components/Hero.tsx")
with open(hero_path, "r", encoding="utf-8") as f:
    hero = f.read()

# Remove resume download button (the whole MagneticButton block)
hero = re.sub(
    r'\s*<MagneticButton>\s*<a href="/resume\.pdf" download[^<]*>.*?</a>\s*</MagneticButton>',
    '',
    hero, flags=re.DOTALL
)

# Remove "startup founder" phrase, replace description
old_desc = 'Third-year B.Tech CS student specializing in <span className="text-neon-cyan">AI & Machine Learning</span> at Sreyas Institute. Building production-ready AI systems. Future <span className="text-neon-purple">startup founder</span>.'
new_desc = 'Third-year B.Tech CS student specializing in <span className="text-neon-cyan">AI & Machine Learning</span> at Sreyas Institute. Building production-ready AI systems that create real-world impact.'
hero = hero.replace(old_desc, new_desc)

# Remove CGPA from stats row, keep 3 stats
hero = hero.replace(
    '{[["16+","Projects"],["7.76","CGPA"],["15+","Technologies"],["2025","Intern"]].map(([val, lbl]) => (',
    '{[["16+","Projects"],["15+","Technologies"],["2025","Intern"]].map(([val, lbl]) => ('
)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero)
print("  Patched: Hero.tsx")

# ──────────────────────────────────────────────
# 4. About.tsx — remove CGPA, startup refs, fix education dates
# ──────────────────────────────────────────────
about_path = os.path.join(BASE, "components/About.tsx")
with open(about_path, "r", encoding="utf-8") as f:
    about = f.read()

# Remove startup mindset quality card - replace label and desc
about = about.replace(
    '{ icon: Rocket, label: "Startup Mindset", desc: "Build fast, iterate, ship value" }',
    '{ icon: Rocket, label: "System Builder",  desc: "Designing scalable AI systems that solve real problems" }'
)

# Remove "startup" bio paragraph - replace with cleaner bio
old_para = "Beyond code, I&apos;m passionate about <span className=\"text-neon-cyan font-medium\">startups</span> and the philosophy of building products that matter. Every project I work on is an exercise in thinking like a founder."
new_para = "Beyond code, I&apos;m passionate about building <span className=\"text-neon-cyan font-medium\">intelligent systems</span> that are not just technically sound but genuinely useful. Every project I work on is an opportunity to solve a real problem with AI."
about = about.replace(old_para, new_para)

# Remove CGPA from education card — replace the education block
old_edu = """                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-semibold">B.Tech Computer Science</div>
                    <div className="text-neon-purple text-sm font-mono">AI & Machine Learning</div>
                  </div>
                  <div className="text-right">
                    <div className="text-neon-cyan text-lg font-bold font-mono">7.76</div>
                    <div className="text-white/40 text-xs">CGPA</div>
                  </div>
                </div>
                <div className="text-white/60 text-sm">Sreyas Institute of Engineering & Technology</div>
                <div className="text-white/40 text-xs mt-1 font-mono">2023 – 2027 (Expected)</div>"""

new_edu = """                <div className="mb-2">
                  <div className="text-white font-semibold">B.Tech Computer Science (AI & ML)</div>
                  <div className="text-neon-purple text-sm font-mono mt-0.5">Sreyas Institute of Engineering and Technology</div>
                </div>
                <div className="text-white/40 text-xs font-mono">2023 – Present</div>"""

about = about.replace(old_edu, new_edu)

with open(about_path, "w", encoding="utf-8") as f:
    f.write(about)
print("  Patched: About.tsx")

# ──────────────────────────────────────────────
# 5. New AIFocus.tsx
# ──────────────────────────────────────────────
ai_focus = '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Database, Lightbulb, Cpu, TrendingUp, Zap } from "lucide-react";

const CARDS = [
  {
    icon: Brain,
    title: "Machine Learning Systems",
    desc: "Designing models that learn from data, improve predictions over time, and adapt to real-world complexity. From Seq2Seq to transformer-based architectures.",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    icon: Lightbulb,
    title: "AI Problem Solving",
    desc: "Applying machine learning to solve concrete problems — from image segmentation to NLP-powered resume analysis — with measurable, production-ready results.",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.12)",
  },
  {
    icon: Database,
    title: "Data-Driven Thinking",
    desc: "Using data insights to guide intelligent decisions. Every model begins with understanding the distribution, quality, and structure of the underlying data.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.12)",
  },
  {
    icon: Zap,
    title: "Automation & Intelligence",
    desc: "Building systems that automate complex reasoning tasks — code editors with AI assistance, prompt engineering platforms, and analytics pipelines.",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.12)",
  },
];

export default function AIFocus() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai-focus" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #06B6D4, #8B5CF6, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/25 text-neon-cyan text-xs font-mono mb-4">
            <Cpu size={12} /> AI FOCUS
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-4">
            How I Think About <span className="gradient-text-cyan-purple">AI</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Exploring intelligent systems and machine learning solutions — from theory to deployment.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity:0, y:32 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.5, delay: i * 0.1 }}
                whileHover={{ y:-6, transition:{ duration:0.2 } }}
                className="group relative glass rounded-2xl border border-white/8 p-6 overflow-hidden cursor-default"
                style={{ transition: "box-shadow 0.25s ease" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 0 1px ${card.color}30, 0 20px 48px ${card.glow}`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
              >
                {/* Corner glow */}
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${card.color}20, transparent 70%)` }} />

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${card.color}18`, border: `1px solid ${card.color}28` }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>

                <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.color}60, transparent)` }} />
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { val:"7+", label:"AI / ML Projects", color:"#06B6D4" },
            { val:"3+", label:"Frameworks Used",  color:"#8B5CF6" },
            { val:"2+", label:"Research Areas",   color:"#3B82F6" },
            { val:"1",  label:"Internship",        color:"#06B6D4" },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl border border-white/8 p-5 text-center">
              <div className="text-3xl font-black font-display mb-1" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs text-white/40 font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
'''

with open(os.path.join(BASE, "components/AIFocus.tsx"), "w", encoding="utf-8") as f:
    f.write(ai_focus)
print("  Written: AIFocus.tsx")

# ──────────────────────────────────────────────
# 6. New Quote.tsx — closing section
# ──────────────────────────────────────────────
quote = '''"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Quote() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full blur-3xl opacity-[0.055]"
          style={{ background: "radial-gradient(ellipse, #06B6D4, #8B5CF6, transparent)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity:0, scale:0.96 }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.8, ease:"easeOut" }}
        >
          {/* Quote mark */}
          <div className="text-8xl font-display font-black leading-none text-neon-cyan/12 select-none mb-4">&ldquo;</div>

          <motion.p
            initial={{ opacity:0, y:20 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.7, delay:0.15 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight mb-8"
          >
            Great engineers don&apos;t just write code&nbsp;&mdash;{" "}
            <span className="gradient-text-cyan-purple">they build the future.</span>
          </motion.p>

          <motion.div
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ duration:0.6, delay:0.35 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/40" />
            <span className="text-neon-cyan/60 font-mono text-xs tracking-widest">PUNEETH RAJ</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
'''

with open(os.path.join(BASE, "components/Quote.tsx"), "w", encoding="utf-8") as f:
    f.write(quote)
print("  Written: Quote.tsx")

# ──────────────────────────────────────────────
# 7. page.tsx — add AIFocus and Quote, correct order
# ──────────────────────────────────────────────
page = '''import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIFocus from "@/components/AIFocus";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Quote from "@/components/Quote";
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

with open(os.path.join(BASE, "app/page.tsx"), "w", encoding="utf-8") as f:
    f.write(page)
print("  Written: page.tsx")

print("\nAll done.")
