"use client";
import { useState, useEffect, useRef } from "react";

const LINES = [
  { prefix: "$ ",  text: "init portfolio.exe",            delay: 0    },
  { prefix: "> ",  text: "Loading AI modules...",          delay: 420  },
  { prefix: "> ",  text: "Connecting to network...",       delay: 820  },
  { prefix: "> ",  text: "Rendering interface...",         delay: 1200 },
  { prefix: "✓ ", text: "System ready. Welcome, Human.",  delay: 1600 },
];
const TOTAL_MS = 2500;

export default function LoadingScreen() {
  const [gone,    setGone]    = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dismiss = () => {
    if (leaving || gone) return;
    setLeaving(true);
    timersRef.current.forEach(clearTimeout);
    const t = setTimeout(() => {
      setGone(true);
      try { sessionStorage.setItem("loader-shown", "1"); } catch (_) { /* ignore */ }
    }, 450);
    timersRef.current = [t];
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem("loader-shown")) { setGone(true); return; }
    } catch (_) { /* ignore */ }

    const ts: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => {
      ts.push(setTimeout(() => setVisible(v => [...v, i]), LINES[i].delay));
    });
    ts.push(setTimeout(dismiss, TOTAL_MS));
    timersRef.current = ts;

    return () => ts.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#05050A",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity:   leaving ? 0 : 1,
        transform: leaving ? "translateY(-16px)" : "none",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      {/* Corner brackets */}
      {[
        "top-8 left-8 border-t-2 border-l-2",
        "top-8 right-8 border-t-2 border-r-2",
        "bottom-8 left-8 border-b-2 border-l-2",
        "bottom-8 right-8 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-10 h-10 ${cls}`}
          style={{ borderColor: "rgba(6,182,212,0.35)" }} />
      ))}

      {/* Terminal window */}
      <div style={{
        width: "min(500px, 90vw)",
        background: "rgba(6,182,212,0.03)",
        border: "1px solid rgba(6,182,212,0.22)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(6,182,212,0.08), 0 32px 80px rgba(0,0,0,0.5)",
      }}>
        {/* Title bar */}
        <div style={{
          padding: "10px 16px",
          borderBottom: "1px solid rgba(6,182,212,0.12)",
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(6,182,212,0.05)",
        }}>
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
          <span style={{
            marginLeft: 8,
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 11,
            color: "rgba(6,182,212,0.55)",
            letterSpacing: "0.05em",
          }}>
            portfolio.exe — bash
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: "20px 24px", fontFamily: "JetBrains Mono,monospace", fontSize: 13, minHeight: 172 }}>
          {LINES.map((line, i) => (
            <div key={i} style={{
              display: "flex", gap: 8, marginBottom: 10,
              opacity:   visible.includes(i) ? 1 : 0,
              transform: visible.includes(i) ? "none" : "translateY(6px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              <span style={{ color: line.prefix.includes("✓") ? "#10B981" : "#8B5CF6", flexShrink: 0 }}>
                {line.prefix}
              </span>
              <span style={{ color: line.prefix.includes("✓") ? "#10B981" : "rgba(241,245,249,0.75)" }}>
                {line.text}
              </span>
              {i === visible.length - 1 && visible.length < LINES.length && (
                <span style={{
                  display: "inline-block", width: 7, height: 14,
                  background: "#06B6D4",
                  animation: "blink-cursor 0.7s steps(1) infinite",
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Name */}
      <div style={{ marginTop: 28, textAlign: "center" }}>
        <h1 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 900,
          fontSize: "clamp(1.9rem,5vw,2.9rem)",
          background: "linear-gradient(135deg,#06B6D4,#3B82F6,#8B5CF6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 4,
        }}>
          Puneeth Raj
        </h1>
        <p style={{
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 10,
          color: "rgba(6,182,212,0.45)",
          letterSpacing: "0.3em",
        }}>
          AI ENGINEER &amp; ML DEVELOPER
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={dismiss}
        style={{
          position: "fixed", bottom: 28, right: 28,
          padding: "6px 14px",
          borderRadius: 8,
          border: "1px solid rgba(6,182,212,0.22)",
          background: "transparent",
          color: "rgba(6,182,212,0.45)",
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 11,
          cursor: "pointer",
          letterSpacing: "0.05em",
          transition: "color .2s, border-color .2s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "rgba(6,182,212,0.9)";
          e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = "rgba(6,182,212,0.45)";
          e.currentTarget.style.borderColor = "rgba(6,182,212,0.22)";
        }}
      >
        skip →
      </button>
    </div>
  );
}
