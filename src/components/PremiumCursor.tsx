"use client";
import { useEffect, useRef } from "react";

export default function PremiumCursor() {
  const dot    = useRef<HTMLDivElement>(null);
  const ring   = useRef<HTMLDivElement>(null);
  const ripple = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const d = dot.current, r = ring.current, rpl = ripple.current;
    if (!d || !r || !rpl) return;
    let mx = -200, my = -200, rx = -200, ry = -200, big = false, raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      d.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,[role=button],input,textarea,select")) {
        big = true;
        r.style.width = r.style.height = "48px";
        r.style.borderColor = "rgba(6,182,212,0.55)";
        r.style.background  = "rgba(6,182,212,0.12)";
      }
    };
    const onOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as HTMLElement)?.closest("a,button,[role=button],input,textarea,select")) {
        big = false;
        r.style.width = r.style.height = "22px";
        r.style.borderColor = "rgba(6,182,212,0.3)";
        r.style.background  = "transparent";
      }
    };
    const onClick = () => {
      rpl.style.left   = `${mx}px`;
      rpl.style.top    = `${my}px`;
      rpl.style.opacity = "1";
      rpl.style.animation = "none";
      void rpl.offsetWidth;
      rpl.style.animation = "cursor-ripple 0.55s ease-out forwards";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("click", onClick);

    const tick = () => {
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12);
      const h = big ? 24 : 11;
      r.style.transform = `translate(${rx - h}px,${ry - h}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("click", onClick);
    };
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
      <div ref={ripple} style={{
        position:"fixed", top:0, left:0, width:0, height:0, borderRadius:"50%",
        border:"1px solid rgba(6,182,212,0.5)", pointerEvents:"none", zIndex:9998,
        transform:"translate(-50%,-50%)", opacity:0,
      }} />
    </>
  );
}
