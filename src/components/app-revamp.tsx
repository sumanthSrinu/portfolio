"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Real screens from the shipped v2 app (iPhone 17 simulator, 30 Oct 2026),
// cropped to the display: 697 × 1517 px each.
const SCREENS = {
  charts: { src: "/revamp/charts.png", alt: "Your Charts: North Indian birth chart with the planet legend and Ascendant card" },
  home: { src: "/revamp/home.png", alt: "Home: day picker, the Aquarius sign card with energy level and lucky colours, and the Agastyaa tip" },
  reports: { src: "/revamp/reports.png", alt: "Reports: best-selling reports carousel and the Diwali Special Report" },
} as const;

function Phone({ screen, priority }: { screen: keyof typeof SCREENS; priority?: boolean }) {
  const { src, alt } = SCREENS[screen];
  return (
    <div className="w-[180px] shrink-0 rounded-[2rem] border border-zinc-700/80 bg-zinc-950 p-1.5 shadow-2xl shadow-black/60 sm:w-[200px]">
      {/* Same aspect as the screenshots, so nothing is cropped. */}
      <div className="relative aspect-697/1517 overflow-hidden rounded-[1.6rem] bg-[#F0F5F7]">
        <Image src={src} alt={alt} fill sizes="200px" priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

// Three real v2 screens (Your Charts, Home, Reports), with a gentle scroll parallax.
export function AppRevamp() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const down = useTransform(scrollYProgress, [0, 1], [-20, 30]);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-6">
      <div aria-hidden="true" className="absolute inset-0 m-auto size-72 rounded-full bg-violet-600/20 blur-3xl" />
      <motion.div style={reduce ? undefined : { y: down }} className="relative z-0 -mr-10 hidden -rotate-6 opacity-90 sm:block">
        <Phone screen="charts" />
      </motion.div>
      <motion.div style={reduce ? undefined : { y: up }} className="relative z-10">
        <Phone screen="home" />
      </motion.div>
      <motion.div style={reduce ? undefined : { y: down }} className="relative z-0 -ml-10 hidden rotate-6 opacity-90 sm:block">
        <Phone screen="reports" />
      </motion.div>
    </div>
  );
}
