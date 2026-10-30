"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { heroBeats, profile } from "@/content/profile";
import { BackgroundPaths } from "./background-paths";
import InteractiveNeuralVortex from "./ui/interactive-neural-vortex-background";

type Beat = (typeof heroBeats)[number];
const STAGES = ["Build", "Sign", "Ship"];

function BeatCopy({ beat, index }: { beat: Beat; index: number }) {
  const Heading = index === 0 ? "h1" : "h2";
  return (
    <>
      <p className="label mb-6 text-[11px] sm:text-xs">{beat.label}</p>
      {"eyebrow" in beat && <p className="mb-4 font-mono text-sm text-muted">{beat.eyebrow}</p>}
      <Heading className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
        {beat.lead} <span className="text-gradient">{beat.accent}</span>
      </Heading>
      <p className="mt-7 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">{beat.body}</p>
      {index === heroBeats.length - 1 && (
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-black transition-transform duration-200 hover:scale-[1.03]"
          >
            Say hi to me
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="inline-flex min-h-12 items-center rounded-full border border-line px-6 font-medium text-ink transition-colors duration-200 hover:bg-white/5"
          >
            See the work
          </a>
        </div>
      )}
    </>
  );
}

function AnimatedBeat({ beat, index, progress, active }: { beat: Beat; index: number; progress: MotionValue<number>; active: boolean }) {
  const n = heroBeats.length;
  const start = index / n;
  const end = (index + 1) / n;
  const fade = 0.07;
  const gap = 0.025;
  const first = index === 0;
  const last = index === n - 1;

  // Sequential handoff: each beat is fully gone `gap` before its boundary and the next
  // starts `gap` after it, so two headlines never overlap. Offsets stay within 0–1.
  const inStart = start + gap;
  const outEnd = end - gap;
  const range = first
    ? [0, outEnd - fade, outEnd]
    : last
      ? [inStart, inStart + fade, 1]
      : [inStart, inStart + fade, outEnd - fade, outEnd];
  const opacity = useTransform(progress, range, first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, range, first ? [0, 0, -24] : last ? [24, 0, 0] : [24, 0, 0, -24]);

  return (
    <motion.div
      style={{ opacity, y, willChange: "opacity, transform" }}
      inert={!active}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <BeatCopy beat={beat} index={index} />
    </motion.div>
  );
}

function PipelineProgress({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 0.95], [0, 1]);
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-8 mx-auto w-[min(420px,80vw)]">
      <div className="mb-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
        {STAGES.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="h-px w-full bg-line">
        <motion.div style={{ scaleX }} className="h-px origin-left bg-linear-to-r from-purple-400 via-violet-400 to-pink-400" />
      </div>
    </div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Scroll</span>
      <ArrowDown size={16} className="animate-bounce" />
    </motion.div>
  );
}

// Sticky three-beat hero in the style of vevaar.com: the section is several
// screens tall and the beats crossfade as you scroll through it.
export function HeroScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Spring-smoothed progress so wheel/trackpad steps glide instead of jumping.
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    setActive(Math.min(heroBeats.length - 1, Math.floor(v * heroBeats.length)));
  });

  if (reduce) {
    return (
      <section id="top" className="relative">
        <BackgroundPaths />
        {heroBeats.map((beat, i) => (
          <div key={beat.label} className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
            <BeatCopy beat={beat} index={i} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section id="top" ref={ref} className="relative h-[360vh] md:h-[420vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Reduced motion keeps the static BackgroundPaths (branch above). */}
        <InteractiveNeuralVortex className="opacity-90" />
        {heroBeats.map((beat, i) => (
          <AnimatedBeat key={beat.label} beat={beat} index={i} progress={smooth} active={active === i} />
        ))}
        <PipelineProgress progress={smooth} />
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}
