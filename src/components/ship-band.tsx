"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const WORDS = "The best way to grow is to ship often, and learn from every release.".split(" ");
const ACCENT = new Set([7, 8]); // "ship often,"

function Word({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${accent ? "text-gradient" : ""}`}>
      {word}
    </motion.span>
  );
}

// Scroll-scrubbed word reveal, after 21st.dev "Text Reveal".
export function ShipBand() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });

  return (
    <section aria-label="Motto" className="mx-auto max-w-5xl px-4 py-28 md:px-8 md:py-40">
      <p ref={ref} className="font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-6xl md:text-7xl">
        {WORDS.map((w, i) => {
          const accent = ACCENT.has(i);
          if (reduce) {
            return (
              <span key={i} className={`mr-[0.25em] inline-block ${accent ? "text-gradient" : ""}`}>
                {w}
              </span>
            );
          }
          return <Word key={i} word={w} accent={accent} progress={scrollYProgress} range={[i / WORDS.length, (i + 1) / WORDS.length]} />;
        })}
      </p>
    </section>
  );
}
