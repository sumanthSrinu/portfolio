"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/profile";

type Stat = (typeof stats)[number];

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
      ease: [0.16, 1, 0.3, 1],
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

export function StatsBand() {
  return (
    <section aria-label="By the numbers" className="border-y border-line bg-surface">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col-reverse px-6 py-10 md:py-14 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
          >
            <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            <dd className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              <CountUp stat={s} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
