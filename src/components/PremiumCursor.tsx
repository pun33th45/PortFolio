"use client";
import { useEffect, useRef } from "react";

export default function PremiumCursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current, r = ring.current;
    if (!d || !r) return;
    let mx = -200, my = -200, rx = -200, ry = -200, big = false, raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      d.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
    });
    document.addEventListener("mouseover", e => {
      if ((e.target as HTMLElement).closest("a,button,[role=button],input,textarea")) {
        big = true;
        r.style.width = r.style.height = "38px";
        r.style.borderColor = "rgba(6,182,212,0.6)";
        r.style.background  = "rgba(6,182,212,0.07)";
      }
    });
    document.addEventListener("mouseout", e => {
      if (!(e.relatedTarget as HTMLElement)?.closest("a,button,[role=button],input,textarea")) {
        big = false;
        r.style.width = r.style.height = "22px";
        r.style.borderColor = "rgba(6,182,212,0.3)";
        r.style.background  = "transparent";
      }
    });

    const tick = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12);
      const h = big ? 19 : 11;
      r.style.transform = `translate(${rx - h}px,${ry - h}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:"fixed", top:0, left:0, width:6, height:6, borderRadius:"50%",
        background:"#06B6D4", pointerEvents:"none", zIndex:10000,
        boxShadow:"0 0 10px rgba(6,182,212,0.9)",
      }} />
      <div ref={ring} style={{
        position:"fixed", top:0, left:0, width:22, height:22, borderRadius:"50%",
        border:"1.5px solid rgba(6,182,212,0.3)", pointerEvents:"none", zIndex:9999,
        transition:"width .18s ease,height .18s ease,border-color .18s ease,background .18s ease",
      }} />
    </>
  );
}
