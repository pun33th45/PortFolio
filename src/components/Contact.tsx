"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle, Github, Linkedin, Mail, MessageSquare, Phone, Send } from "lucide-react";

const SOCIALS = [
  { icon:Mail,     label:"Email",    value:"puneethraaaj@gmail.com",        href:"mailto:puneethraaaj@gmail.com",                        color:"#06B6D4" },
  { icon:Linkedin, label:"LinkedIn", value:"puneeth-raj-774506211",         href:"https://www.linkedin.com/in/puneeth-raj-774506211",    color:"#2563EB" },
  { icon:Github,   label:"GitHub",   value:"pun33th45",                     href:"https://github.com/pun33th45",                         color:"#8B5CF6" },
  { icon:Phone,    label:"Phone",    value:"+91 9398971543",                href:"tel:+919398971543",                                    color:"#10B981" },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [form, setForm]     = useState({ name:"", email:"", message:"" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    await new Promise(r => setTimeout(r, 1400));
    setSent(true); setSending(false);
    setForm({ name:"", email:"", message:"" });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
        style={{ background:"radial-gradient(circle, #06B6D4, transparent)" }} />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.6 }}
          className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-cyan/20 text-brand-cyan text-xs font-mono mb-5">
            <MessageSquare size={11} /> CONTACT
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Let&apos;s <span className="grad">Connect</span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.1 }}>
            <div className="glass rounded-2xl border border-white/8 p-7">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <CheckCircle size={48} className="text-brand-cyan" />
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-white/50 text-center">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                  <button onClick={() => setSent(false)}
                    className="mt-2 px-5 py-2 rounded-xl text-sm text-brand-cyan border border-brand-cyan/25 hover:bg-brand-cyan/10 transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  {[
                    { key:"name",    label:"Name",    type:"text",  ph:"Your name"    },
                    { key:"email",   label:"Email",   type:"email", ph:"your@email.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs text-white/45 font-mono mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required
                        value={(form as never)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 glass border border-white/8 focus:border-brand-cyan/40 focus:outline-none transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-white/45 font-mono mb-1.5">Message</label>
                    <textarea rows={4} placeholder="Tell me about your project..." required
                      value={form.message} onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 glass border border-white/8 focus:border-brand-cyan/40 focus:outline-none transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
                    style={{ background:"linear-gradient(135deg,#2563EB,#06B6D4)" }}>
                    <Send size={15} />
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:.2 }}
            className="space-y-4">
            {SOCIALS.map((s, i) => (
              <motion.a key={s.label} href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                initial={{ opacity:0, y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:.3 + i * .07 }}
                className="flex items-center gap-4 glass rounded-xl border border-white/8 p-5 hover:border-white/16 transition-all group"
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 0 1px ${s.color}22`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background:`${s.color}15`, border:`1px solid ${s.color}22` }}>
                  <s.icon size={18} style={{ color:s.color }} />
                </div>
                <div>
                  <div className="text-xs text-white/35 font-mono mb-0.5">{s.label}</div>
                  <div className="text-sm text-white font-medium group-hover:text-brand-cyan transition-colors">{s.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
