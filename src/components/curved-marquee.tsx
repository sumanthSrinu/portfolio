"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { TechLogo } from "./tech-icons";

const GAP = 20;
const SPEED = 45; // px per second along the track

// Logo tiles riding the inside of a cylinder: they enter large and angled at one
// edge, flatten out at the centre and curve away at the other. After 21st.dev
// "Tilted Grid Hero" by ruixen.ui. Positions are written straight to the DOM each
// frame, so React never re-renders while it moves.
export function CurvedMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(rootRef, { margin: "100px" });
  const reduce = useReducedMotion();
  const paused = useRef(false);
  const offset = useRef(0);

  // Repeat the list so the loop is always wider than the widest screen.
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let last = performance.now();

    const place = () => {
      const width = root.clientWidth;
      const tile = width < 768 ? 88 : 112;
      const spacing = tile + GAP;
      const total = loop.length * spacing;
      const radius = Math.max(width * 0.48, 240);
      const half = width / 2 + tile;

      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        // Position along the track, wrapped so it is centred on the viewport.
        let x = (i * spacing + offset.current) % total;
        if (x < 0) x += total;
        x -= total / 2;

        if (Math.abs(x) > half * 1.25) {
          el.style.visibility = "hidden";
          return;
        }
        const theta = Math.max(-1.4, Math.min(1.4, x / radius));
        const screenX = radius * Math.sin(theta);
        const z = radius * (1 - Math.cos(theta)) * 1.25;
        const edge = Math.min(1, Math.abs(screenX) / (width / 2));
        el.style.visibility = "visible";
        el.style.opacity = String(1 - Math.pow(edge, 4) * 0.85);
        el.style.transform = `translate3d(${screenX - tile / 2}px, ${-tile / 2}px, ${z}px) rotateY(${-theta}rad)`;
        el.style.width = el.style.height = `${tile}px`;
      });
    };

    if (reduce || !inView) {
      place();
      return;
    }

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (!paused.current) offset.current += (reverse ? 1 : -1) * SPEED * dt;
      place();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, reverse, loop.length]);

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      className="relative h-40 [perspective:900px] md:h-52"
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {loop.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            style={{ visibility: "hidden" }}
            className="absolute left-1/2 top-1/2 will-change-transform"
          >
            <div className="group relative grid size-full place-items-center rounded-2xl border border-white/5 bg-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-white/15 hover:bg-neutral-800">
              <TechLogo name={t} className="size-11 text-(--brand) md:size-14" />
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-2 -rotate-6 scale-90 whitespace-nowrap rounded-lg bg-black px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-[0_2px_0_#a78bfa] ring-1 ring-white/10 transition duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                {t}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
