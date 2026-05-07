"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*ｦｧｨｩｪｫｬｭｮｯアイウエオカキクケコ";
const FONT_SIZE = 14;

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive]   = useState(false);
  const inputRef  = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) { setActive(false); inputRef.current = ""; return; }
      const ch = e.key.length === 1 ? e.key.toLowerCase() : "";
      if (ch) {
        inputRef.current = (inputRef.current + ch).slice(-6);
        if (inputRef.current === "matrix") setActive(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    const cols  = Math.floor(c.width / FONT_SIZE);
    const drops = Array<number>(cols).fill(1);

    let raf: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.055)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = drops[i] * FONT_SIZE < FONT_SIZE * 4 ? "#c0ffcc" : "#00e040";
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 99998, cursor: "pointer" }}
      onClick={() => { setActive(false); inputRef.current = ""; }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 11,
        color: "rgba(0,224,64,0.45)",
        letterSpacing: "0.22em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        [PRESS ANY KEY OR CLICK TO EXIT]
      </div>
      <div style={{
        position: "absolute",
        top: 32,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 13,
        color: "rgba(0,224,64,0.7)",
        letterSpacing: "0.3em",
        pointerEvents: "none",
      }}>
        MATRIX MODE ACTIVATED
      </div>
    </div>
  );
}
