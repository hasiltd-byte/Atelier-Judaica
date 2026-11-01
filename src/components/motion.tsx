"use client";

import { useEffect, useState } from "react";

export function MotionControls() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }, { threshold: 0.08 });
    nodes.forEach(node => { node.classList.add("will-reveal"); observer.observe(node); });
    return () => { observer.disconnect(); nodes.forEach(node => node.classList.remove("will-reveal")); };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);
  return <button className="motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span>{paused ? "הפעלת תנועה" : "השהיית תנועה"}</span></button>;
}
