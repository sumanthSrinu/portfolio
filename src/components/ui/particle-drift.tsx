"use client";

import { useEffect, useRef } from "react";

// Particle Drift background (ASCII nodes drifting down, light beams rising,
// proximity links and a cursor tether), ported from the 21st.dev iframe
// version to a plain canvas so it needs no CDN scripts.

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()".split("");
const ACCENT = "167, 139, 250"; // violet-400, matches the site accent
const NEUTRAL = "156, 163, 175";
const LINK = 120;
const REACH = 180;

type Node = { x: number; y: number; vy: number; char: string };
type Beam = { x: number; y: number; length: number; speed: number; opacity: number };

const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function ParticleDrift({ className = "", density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let beams: Beam[] = [];
    const mouse = { x: -1000, y: -1000 };
    let frame = 0;
    let visible = false;

    function seed() {
      // Scale counts with area so phones aren't crowded.
      const area = Math.min(1, (width * height) / (1440 * 800));
      nodes = Array.from({ length: Math.max(24, Math.round(90 * density * area)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.4 + 0.1,
        char: pick(),
      }));
      beams = Array.from({ length: Math.max(8, Math.round(25 * density * area)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    }

    function resize() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw(step: boolean) {
      ctx!.clearRect(0, 0, width, height);

      for (const b of beams) {
        if (step) {
          b.y -= b.speed;
          if (b.y + b.length < 0) {
            b.y = height + 100;
            b.x = Math.random() * width;
          }
        }
        const g = ctx!.createLinearGradient(b.x, b.y, b.x, b.y + b.length);
        g.addColorStop(0, `rgba(${ACCENT}, ${b.opacity})`);
        g.addColorStop(1, "transparent");
        ctx!.strokeStyle = g;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(b.x, b.y);
        ctx!.lineTo(b.x, b.y + b.length);
        ctx!.stroke();
      }

      ctx!.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(${NEUTRAL}, ${0.15 * (1 - d / LINK)})`;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      ctx!.font = "12px ui-monospace, monospace";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const n of nodes) {
        if (step) {
          n.y += n.vy;
          if (n.y > height + 20) {
            n.y = -20;
            n.x = Math.random() * width;
          }
        }
        const dist = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (step && (dist < REACH || Math.random() > 0.98)) n.char = pick();
        if (dist < REACH) {
          ctx!.strokeStyle = `rgba(${ACCENT}, ${0.5 * (1 - dist / REACH)})`;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
        ctx!.fillStyle = dist < REACH ? `rgb(${ACCENT})` : `rgba(${NEUTRAL}, 0.4)`;
        ctx!.fillText(n.char, n.x, n.y);
      }
    }

    function loop() {
      draw(true);
      frame = requestAnimationFrame(loop);
    }
    function start() {
      if (!reduce && visible && !frame) frame = requestAnimationFrame(loop);
    }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onResize() {
      resize();
      if (reduce) draw(false);
    }

    resize();
    draw(false);

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 size-full ${className}`} />;
}
