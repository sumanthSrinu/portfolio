"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";
import { experience, type Role } from "@/content/profile";
import { Reveal, SectionHeading } from "./reveal";

const VISIBLE = 4;

function RoleEntry({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const shown = expanded ? role.highlights : role.highlights.slice(0, VISIBLE);
  const hidden = role.highlights.length - VISIBLE;

  return (
    <article className="relative grid gap-4 pb-20 pl-10 md:grid-cols-[260px_1fr] md:gap-12 md:pl-0">
      <span aria-hidden="true" className="absolute left-[7px] top-2 size-3 rounded-full border-2 border-black bg-violet-400 ring-4 ring-violet-400/20 md:left-[253px]" />
      <div className="md:sticky md:top-28 md:self-start md:pr-10 md:text-right">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{role.dates}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">{role.company}</h3>
        <p className="text-sm text-muted">
          {role.location}
          {role.note && <span className="block text-faint">{role.note}</span>}
        </p>
      </div>

      <Reveal>
        <p className="font-display text-xl font-semibold text-ink">{role.title}</p>
        <p className="mt-2 text-muted">{role.summary}</p>
        <ul id={listId} className="mt-6 space-y-3">
          {shown.map((h) => (
            <li key={h.text} className="rounded-2xl border border-line bg-card/60 p-5">
              {h.title && <p className="mb-1 font-medium text-ink">{h.title}</p>}
              <p className="text-[15px] leading-relaxed text-neutral-300">{h.text}</p>
            </li>
          ))}
        </ul>
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls={listId}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm text-ink transition-colors duration-200 hover:bg-white/5"
          >
            {expanded ? "Show less" : `Show ${hidden} more`}
            <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </Reveal>
    </article>
  );
}

// Experience timeline with a scroll-drawn beam, after 21st.dev "Timeline" by manuarora700.
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end 70%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-28 md:px-8 md:py-36">
      <SectionHeading
        label="Changelog · The journey"
        title="From commits"
        accent="to stores."
        intro="Three teams, three years, one habit: owning the app all the way to the store listing."
      />
      <div ref={ref} className="relative">
        <div aria-hidden="true" className="absolute bottom-0 left-[12px] top-0 w-px bg-line md:left-[259px]">
          <motion.div style={{ height }} className="w-px bg-linear-to-b from-purple-400 via-violet-400 to-pink-400" />
        </div>
        {experience.map((role) => (
          <RoleEntry key={role.company} role={role} />
        ))}
      </div>
    </section>
  );
}
