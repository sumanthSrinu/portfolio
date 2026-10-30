"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ label, title, accent, intro }: { label: string; title: string; accent?: string; intro?: string }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="label mb-5 text-[11px] sm:text-xs">{label}</p>
      <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
        {title} {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {intro && <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
