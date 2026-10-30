"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-linear-to-r from-purple-400 via-violet-400 to-pink-400"
      />
      <div className="mx-4 mt-3 flex max-w-5xl items-center justify-between gap-4 rounded-full border border-line/80 bg-black/60 py-2 pl-5 pr-2 backdrop-blur-md md:mx-auto">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight" aria-label={`${profile.name}, back to top`}>
          sumanth<span className="text-gradient">.</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-white/5 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.03]"
          >
            Say hi
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-muted hover:text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="mx-4 mt-2 rounded-3xl border border-line bg-black/90 p-2 backdrop-blur-md md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-ink hover:bg-white/5">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
