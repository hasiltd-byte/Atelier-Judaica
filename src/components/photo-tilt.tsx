"use client";

import { useRef } from "react";
import Image from "next/image";
import { artworkImages } from "@/data/site";

export function PhotoTilt() {
  const frame = useRef<HTMLDivElement>(null);
  const tick = useRef<number | null>(null);
  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "paused") return;
    const { clientX, clientY } = event;
    if (tick.current !== null) return;
    tick.current = requestAnimationFrame(() => {
      if (frame.current) {
        const bounds = frame.current.getBoundingClientRect();
        frame.current.style.setProperty("--tilt-y", `${((clientX - bounds.left) / bounds.width - .5) * 13}deg`);
        frame.current.style.setProperty("--tilt-x", `${-((clientY - bounds.top) / bounds.height - .5) * 10}deg`);
      }
      tick.current = null;
    });
  }
  function reset() {
    if (tick.current !== null) cancelAnimationFrame(tick.current);
    tick.current = null;
    frame.current?.style.setProperty("--tilt-y", "0deg");
    frame.current?.style.setProperty("--tilt-x", "0deg");
  }
  return <div ref={frame} className="tilt-frame" onPointerMove={move} onPointerLeave={reset}><Image {...artworkImages.candlesticks} sizes="(max-width: 600px) 75vw, 30vw" loading="lazy"/><div className="tilt-caption"><span>כחול. אור. רגע של שבת.</span><span dir="ltr">COBALT / RIMON</span></div></div>;
}
