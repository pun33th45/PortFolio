"use client";
import { useEffect, useRef } from "react";

interface TrailPoint { x: number; y: number; age: number; }

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const cursor = { x: -100, y: -100 };
    const trail: TrailPoint[] = [];
    const MAX_TRAIL = 28;

    window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      trail.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trail.length > MAX_TRAIL) trail.shift();
    });

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const progress = i / trail.length;
        const size = progress * 6;
        const alpha = progress * 0.35;
        const grd = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size + 4);
        grd.addColorStop(0, `rgba(0,212,255,${alpha})`);
        grd.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath();
        ctx.arc(t.x, t.y, size + 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Main cursor dot
      ctx.save();
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,212,255,0.95)";
      ctx.fill();
      ctx.restore();

      // Outer ring
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,212,255,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
}
