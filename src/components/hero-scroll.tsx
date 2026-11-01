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
      {"eyebrow" in beat && (
        <p className="mb-6 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-white/15 bg-black/55 px-5 py-2 text-base shadow-[0_0_40px_-12px_rgba(167,139,250,0.6)] backdrop-blur-md sm:text-lg">
          <span aria-hidden="true" className="size-2 rounded-full bg-violet-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
          <span className="text-sweep font-display font-semibold">{profile.name}</span>
          <span aria-hidden="true" className="hidden text-faint sm:inline">—</span>
          <span className="text-gradient basis-full font-display font-semibold sm:basis-auto">{profile.role}</span>
        </p>
      )}
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

// Scroll decides which beat is active; the switch itself is a short timed
// animation. The outgoing beat leaves first and the next one follows, so
// headlines never overlap, and there is no scroll position that shows nothing.
function AnimatedBeat({ beat, index, active }: { beat: Beat; index: number; active: number }) {
  const isActive = active === index;
  return (
    <motion.div
      initial={false}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: index < active ? -24 : 24 }}
      transition={
        isActive
          ? { duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0.22, ease: [0.4, 0, 1, 1] }
      }
      style={{ willChange: "opacity, transform" }}
      inert={!isActive}
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
          <AnimatedBeat key={beat.label} beat={beat} index={i} active={active} />
        ))}
        <PipelineProgress progress={smooth} />
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}
