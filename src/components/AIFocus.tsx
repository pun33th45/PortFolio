"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Database, Lightbulb, Zap } from "lucide-react";

const CARDS = [
  { icon: Brain,     title:"Machine Learning Systems",   desc:"Designing models that learn from data, improve predictions over time, and adapt to real-world complexity — from Seq2Seq to transformer architectures.", color:"#06B6D4" },
  { icon: Lightbulb, title:"AI Problem Solving",         desc:"Applying machine learning to concrete problems — image segmentation, NLP-powered resume analysis — with measurable, production-ready results.",           color:"#8B5CF6" },
  { icon: Database,  title:"Data-Driven Thinking",       desc:"Using data insights to guide intelligent decisions. Every model begins with understanding the distribution, quality, and structure of the data.",          color:"#2563EB" },
  { icon: Zap,       title:"Automation & Intelligence",  desc:"Building systems that automate complex reasoning tasks — smart code editors, prompt engineering platforms, and real-time analytics pipelines.",           color:"#10B981" },
];

export default function AIFocus() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="ai-focus" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      {/* Center ambient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full blur-3xl"
          style={{ background:"radial-gradient(ellipse, rgba(37,99,235,0.06), rgba(139,92,246,0.05), transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Heading */}
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            AI FOCUS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            How I Think About <span className="grad-cp">AI</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Exploring intelligent systems and machine learning solutions — from theory to deployment.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={c.title}
                initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}}
                transition={{ duration:.5, delay: i * .1 }}
                whileHover={{ y:-6 }}
                className="group relative glass rounded-2xl border border-white/8 p-6 overflow-hidden transition-shadow duration-300"
                style={{ "--c": c.color } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 0 1px ${c.color}28, 0 20px 48px ${c.color}12`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
              >
                {/* Corner glow */}
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background:`radial-gradient(circle, ${c.color}20, transparent 70%)` }} />

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background:`${c.color}15`, border:`1px solid ${c.color}25` }}>
                  <Icon size={20} style={{ color:c.color }} />
                </div>

                <h3 className="font-display font-bold text-white text-base mb-3 leading-snug">{c.title}</h3>
                <p className="text-white/48 text-sm leading-relaxed">{c.desc}</p>

                {/* Bottom line reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background:`linear-gradient(90deg, transparent, ${c.color}55, transparent)` }} />
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val:"7+", label:"AI / ML Projects", color:"#06B6D4" },
            { val:"3+", label:"ML Frameworks",    color:"#8B5CF6" },
            { val:"2+", label:"Research Areas",   color:"#2563EB" },
            { val:"1",  label:"Internship",        color:"#10B981" },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl border border-white/8 p-5 text-center">
              <div className="text-3xl font-black font-display mb-1" style={{ color:s.color }}>{s.val}</div>
              <div className="text-xs text-white/38 font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
