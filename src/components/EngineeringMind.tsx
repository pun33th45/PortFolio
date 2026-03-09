"use client";
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
