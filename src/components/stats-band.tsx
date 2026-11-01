"use client";

import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { shippedApps, stats } from "@/content/profile";
import { SpotlightCard } from "./spotlight-card";
import { TechLogo } from "./tech-icons";

type Stat = (typeof stats)[number];
const EASE = [0.16, 1, 0.3, 1] as const;

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const from = "from" in stat ? stat.from : 0;
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(from, stat.value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, from, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {"prefix" in stat ? stat.prefix : ""}
      {reduce ? stat.value : value}
      {stat.suffix}
    </span>
  );
}

/* ── Years: the three apps on a timeline that draws itself ─────────────── */

const STOPS = [
  { app: shippedApps[2], year: "2023" },
  { app: shippedApps[1], year: "2024" },
  { app: shippedApps[0], year: "Now" },
];

function YearsVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mt-8 px-5">
      <div className="absolute inset-x-10 top-5 h-px bg-line" />
      <motion.div
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-x-10 top-5 h-px origin-left bg-linear-to-r from-purple-400 via-violet-400 to-pink-400"
      />
      <ol className="relative flex justify-between">
        {STOPS.map(({ app, year }, i) => (
          <motion.li
            key={app.name}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.35, ease: EASE }}
            className="flex flex-col items-center gap-2"
          >
            <span className="relative">
              {i === STOPS.length - 1 && (
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-xl bg-violet-400/30 motion-reduce:hidden" />
              )}
              {app.icon && (
                <Image src={app.icon} alt="" width={40} height={40} className="relative size-10 rounded-xl ring-1 ring-white/10" />
              )}
            </span>
            <span className="text-xs font-medium text-neutral-200">{app.name}</span>
            <span className="font-mono text-[11px] text-faint">{year}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* ── Commits: contribution heatmap that fills in column by column ──────── */

const ROWS = 7;
const COLS = 30;
// Deterministic pseudo-random levels (same on server and client), denser
// towards recent weeks.
const CELLS = Array.from({ length: ROWS * COLS }, (_, i) => {
  const col = Math.floor(i / ROWS);
  const noise = ((i * 2654435761) >>> 0) % 100;
  const bias = (col / COLS) * 45;
  const score = noise * 0.7 + bias;
  return score > 90 ? 4 : score > 76 ? 3 : score > 60 ? 2 : score > 42 ? 1 : 0;
});
const LEVEL = ["bg-white/[0.04]", "bg-violet-500/25", "bg-violet-500/45", "bg-violet-400/70", "bg-fuchsia-400"];

function CommitsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const shown = inView || reduce;
  return (
    <div ref={ref} className="mt-8">
      <div className="grid grid-flow-col grid-rows-7 gap-[3px] sm:gap-1">
        {CELLS.map((level, i) => (
          <span
            key={i}
            style={{ transitionDelay: reduce ? undefined : `${Math.floor(i / ROWS) * 28}ms` }}
            className={`aspect-square rounded-[3px] transition-[opacity,transform] duration-500 ${LEVEL[level]} ${
              shown ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-faint">
        less
        {LEVEL.map((c) => (
          <span key={c} className={`size-2.5 rounded-[3px] ${c}`} />
        ))}
        more
      </div>
    </div>
  );
}

/* ── Build: iOS and Android runs ticking through their stages ──────────── */

type Run = { platform: string; seconds: number; stages: { name: string; at: number }[] };

const RUNS: Run[] = [
  {
    platform: "ios",
    seconds: 14 * 60 + 5,
    stages: [
      { name: "Install pods", at: 0 },
      { name: "Archive", at: 0.2 },
      { name: "Sign", at: 0.7 },
      { name: "Upload → TestFlight", at: 0.8 },
    ],
  },
  {
    platform: "android",
    seconds: 9 * 60 + 12,
    stages: [
      { name: "Install deps", at: 0 },
      { name: "Assemble AAB", at: 0.18 },
      { name: "Sign", at: 0.62 },
      { name: "Upload → Play", at: 0.78 },
    ],
  },
];
const LONGEST = Math.max(...RUNS.map((r) => r.seconds));

function clock(secs: number) {
  return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
}

function RunRow({ run, p }: { run: Run; p: number }) {
  const done = p >= 1;
  return (
    <div className="rounded-2xl border border-line bg-black/40 p-4 sm:p-5">
      <div className="flex items-center justify-between text-faint">
        <span className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${done ? "bg-emerald-400" : "animate-pulse bg-amber-400"}`} />
          {run.platform} · release · prod
        </span>
        <span className="tabular-nums text-neutral-200">{clock(Math.round(p * run.seconds))}</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          style={{ transform: `scaleX(${p})` }}
          className="h-full origin-left rounded-full bg-linear-to-r from-purple-400 via-violet-400 to-pink-400"
        />
      </div>
      <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:justify-between">
        {run.stages.map((s, i) => {
          const next = run.stages[i + 1]?.at ?? 1;
          const state = p >= next ? "done" : p >= s.at ? "running" : "queued";
          return (
            <li key={s.name} className={`flex items-center gap-2 sm:whitespace-nowrap ${state === "queued" ? "text-faint/60" : "text-neutral-200"}`}>
              {state === "done" ? (
                <Check size={13} className="shrink-0 text-emerald-400" aria-hidden="true" />
              ) : (
                <span
                  aria-hidden="true"
                  className={`size-[13px] shrink-0 rounded-full border ${state === "running" ? "animate-spin border-violet-400 border-t-transparent" : "border-line"}`}
                />
              )}
              {s.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function BuildVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, 1, { duration: 4.2, ease: [0.45, 0, 0.55, 1], onUpdate: setProgress });
    return () => controls.stop();
  }, [inView, reduce]);

  // Both runs share one clock, so the shorter run finishes first.
  const t = (reduce ? 1 : progress) * LONGEST;

  return (
    <div ref={ref} className="mt-8 space-y-3 font-mono text-xs">
      {RUNS.map((run) => (
        <RunRow key={run.platform} run={run} p={Math.min(1, t / run.seconds)} />
      ))}
    </div>
  );
}

/* ── Tools: one event fanned out to every analytics destination ────────── */

const TOOLS = [
  { name: "CleverTap", x: 22, y: 16 },
  { name: "AppsFlyer", x: 78, y: 16 },
  { name: "RudderStack", x: 22, y: 84 },
  { name: "GA4", x: 78, y: 84 },
];

function ToolsVisual() {
  return (
    <div className="relative mt-6 min-h-56 flex-1 md:min-h-64">
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {TOOLS.map((t, i) => {
          const d = `M50 50 L${t.x} ${t.y}`;
          return (
            <g key={t.name}>
              <path d={d} stroke="#27272a" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
              <path
                d={d}
                pathLength={100}
                stroke="#c084fc"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                fill="none"
                className="event-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            </g>
          );
        })}
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/40 bg-[#1a1426] px-4 py-2 font-mono text-sm text-violet-200 shadow-[0_0_30px_-6px_rgba(167,139,250,0.7)]">
        events
      </span>
      {TOOLS.map((t) => (
        <span
          key={t.name}
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm text-neutral-200"
        >
          <TechLogo name={t.name} className="size-4" />
          {t.name}
        </span>
      ))}
    </div>
  );
}

/* ── Bento ─────────────────────────────────────────────────────────────── */

const VISUAL: Record<Stat["kind"], { span: string; visual: ReactNode }> = {
  years: { span: "md:col-span-5", visual: <YearsVisual /> },
  commits: { span: "md:col-span-7", visual: <CommitsVisual /> },
  build: { span: "md:col-span-7", visual: <BuildVisual /> },
  tools: { span: "md:col-span-5", visual: <ToolsVisual /> },
};

export function StatsBand() {
  return (
    <section aria-label="By the numbers" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <p className="label mb-6 text-[11px] sm:text-xs">By the numbers</p>
        <ul className="grid gap-4 md:grid-cols-12">
          {stats.map((s, i) => (
            <motion.li
              key={s.kind}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
              className={VISUAL[s.kind].span}
            >
              <SpotlightCard className="h-full p-6 md:p-8">
                <div className="flex h-full flex-col">
                  <p className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                    <CountUp stat={s} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                  <div className="flex flex-1 flex-col justify-end">{VISUAL[s.kind].visual}</div>
                </div>
              </SpotlightCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
