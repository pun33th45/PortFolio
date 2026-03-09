"use client";
import { useRef, useEffect } from "react";

interface Point3D { x: number; y: number; z: number; }

function fibonacci(count: number, r: number): Point3D[] {
  const pts: Point3D[] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    pts.push({
      x: r * Math.cos(theta) * Math.sin(phi),
      y: r * Math.sin(theta) * Math.sin(phi),
      z: r * Math.cos(phi),
    });
  }
  return pts;
}

function ring(pointsN: number, radius: number, tilt: number): Point3D[] {
  const pts: Point3D[] = [];
  for (let i = 0; i < pointsN; i++) {
    const a = (i / pointsN) * Math.PI * 2;
    const x = radius * Math.cos(a);
    const y = 0;
    const z = radius * Math.sin(a);
    pts.push({
      x,
      y: y * Math.cos(tilt) - z * Math.sin(tilt),
      z: y * Math.sin(tilt) + z * Math.cos(tilt),
    });
  }
  return pts;
}

function project(p: Point3D, rotY: number, rotX: number, fov: number, cx: number, cy: number) {
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  let x1 = p.x * cosY + p.z * sinY;
  const y1 = p.y;
  let z1 = -p.x * sinY + p.z * cosY;
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y2 = y1 * cosX - z1 * sinX;
  z1 = y1 * sinX + z1 * cosX;
  const scale = fov / (fov + z1);
  return { sx: cx + x1 * scale, sy: cy + y2 * scale, scale, z: z1 };
}

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rotY = useRef(0);
  const rotX = useRef(0);

  const globePts = fibonacci(400, 120);
  const ring0 = ring(60, 122, 0);
  const ring1 = ring(60, 122, Math.PI / 4);
  const ring2 = ring(60, 122, -Math.PI / 4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      const fov = 380;
      ctx.clearRect(0, 0, W, H);

      rotY.current += 0.006;
      rotX.current += (mouse.current.y * 0.25 - rotX.current) * 0.04;

      const pulse = 1 + Math.sin(Date.now() * 0.0015) * 0.06;
      const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22 * pulse);
      gr.addColorStop(0, "rgba(6,182,212,0.28)");
      gr.addColorStop(1, "rgba(6,182,212,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 22 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();

      for (const p of globePts) {
        const { sx, sy, scale, z } = project(p, rotY.current, rotX.current, fov, cx, cy);
        const depth = (z + 130) / 260;
        const alpha = 0.3 + depth * 0.7;
        const r = Math.max(0.8, scale * 1.5);
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212," + (alpha * 0.85).toFixed(2) + ")";
        ctx.fill();
      }

      for (const [pts, color] of [
        [ring0, "6,182,212"],
        [ring1, "139,92,246"],
        [ring2, "139,92,246"],
      ] as [Point3D[], string][]) {
        for (const p of pts) {
          const { sx, sy, scale, z } = project(p, rotY.current, rotX.current, fov, cx, cy);
          const depth = (z + 130) / 260;
          const alpha = 0.2 + depth * 0.5;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.6, scale * 1.0), 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + color + "," + (alpha * 0.7).toFixed(2) + ")";
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}
