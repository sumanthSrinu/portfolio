"use client";

import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { BackgroundPaths } from "./background-paths";
import { Reveal } from "./reveal";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const channels = [
  { label: "LinkedIn", href: profile.linkedin, icon: <LinkedInIcon /> },
  { label: "GitHub", href: profile.github, icon: <GitHubIcon /> },
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: <Phone size={18} aria-hidden="true" /> },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      <BackgroundPaths />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-32 text-center md:py-44">
        <Reveal>
          <p className="label mb-6 text-[11px] sm:text-xs">Release notes · The invite</p>
          <h2 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Let&apos;s build something people <span className="text-gradient">install.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
            Open to React Native and mobile platform roles. Based in {profile.location}, happy to work remote.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-black transition-transform duration-200 hover:scale-[1.03]"
          >
            <Mail size={18} aria-hidden="true" />
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 text-sm text-ink transition-colors duration-200 hover:bg-white/5"
          >
            {copied ? <Check size={16} aria-hidden="true" className="text-emerald-400" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? "Copied" : "Copy email"}
          </button>
          <span role="status" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-muted transition-colors duration-200 hover:bg-white/5 hover:text-ink"
                >
                  {c.icon}
                  {c.label}
                  {c.href.startsWith("http") && <ArrowUpRight size={14} aria-hidden="true" className="opacity-60" />}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
