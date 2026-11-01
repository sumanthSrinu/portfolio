"use client";

import { ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import { shippedApps, type ShippedApp } from "@/content/profile";
import { Reveal } from "./reveal";

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.15.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28Z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M3.6 1.8c-.3.3-.4.8-.4 1.3v17.8c0 .5.1 1 .4 1.3l.1.1 10-10v-.2l-10-10-.1-.3Zm13.4 13.4-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2h-.1Zm-.1.1L13.5 12 3.6 21.9c.4.4 1 .4 1.7.1l11.6-6.7M16.9 8.7 5.3 2C4.6 1.6 4 1.7 3.6 2.1l9.9 9.9 3.4-3.3Z" />
    </svg>
  );
}

function StoreLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/10 px-4 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition-colors duration-200 hover:bg-white/20"
    >
      {icon}
      {label}
      <ArrowUpRight size={13} aria-hidden="true" className="opacity-60 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function AppIcon({ app, size }: { app: ShippedApp; size: number }) {
  if (app.icon) {
    return <Image src={app.icon} alt="" width={size} height={size} className="rounded-[22%] shadow-lg shadow-black/40 ring-1 ring-white/10" style={{ width: size, height: size }} />;
  }
  return (
    <span aria-hidden="true" className="grid place-items-center rounded-[22%] bg-white/10 font-display font-bold" style={{ width: size, height: size, fontSize: size * 0.45 }}>
      {app.name[0]}
    </span>
  );
}

// Everything shown once a panel is open.
function PanelDetails({ app }: { app: ShippedApp }) {
  const links = [
    app.appStore && <StoreLink key="as" href={app.appStore} label="App Store" icon={<AppleMark />} />,
    app.playStore && <StoreLink key="gp" href={app.playStore} label="Google Play" icon={<PlayMark />} />,
    app.web && <StoreLink key="web" href={app.web} label="Web" icon={<Globe size={14} aria-hidden="true" />} />,
  ].filter(Boolean);

  return (
    <div className="relative flex h-full flex-col justify-end p-7 md:p-10">
      <AppIcon app={app} size={72} />
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--app)" }}>
        {app.category}
      </p>
      <h4 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{app.name}</h4>
      {app.company !== app.name && <p className="mt-1 text-muted">at {app.company}</p>}
      <p className="mt-4 max-w-md leading-relaxed text-neutral-300">{app.role}</p>
      <ul className="mt-5 grid max-w-lg gap-x-6 gap-y-2 text-sm text-neutral-200 sm:grid-cols-2">
        {app.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rounded-full" style={{ background: "var(--app)" }} />
            {h}
          </li>
        ))}
      </ul>
      {links.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{links}</div>}
    </div>
  );
}

function Glow() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 85% 0%, color-mix(in oklab, var(--app) 38%, transparent), transparent 60%)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
    </>
  );
}

// Desktop: a row of panels where the active one widens and the rest fold into
// slim strips with a vertical name. Hover, focus or click opens a panel.
function PanelRow() {
  const [active, setActive] = useState(0);

  return (
    <div className="hidden h-[480px] gap-3 md:flex">
      {shippedApps.map((app, i) => {
        const open = active === i;
        return (
          <div
            key={app.name}
            onMouseEnter={() => setActive(i)}
            onFocusCapture={() => setActive(i)}
            style={{ ["--app" as string]: app.color, flexGrow: open ? 5 : 1 } as CSSProperties}
            className={`relative min-w-0 basis-0 overflow-hidden rounded-3xl border bg-card transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${open ? "border-white/15" : "border-line"}`}
          >
            <Glow />
            {/* Image watermark for depth */}
            {app.icon && (
              <Image
                src={app.icon}
                alt=""
                aria-hidden="true"
                width={256}
                height={256}
                className={`pointer-events-none absolute -right-16 -top-16 size-72 rounded-[22%] blur-[2px] transition-opacity duration-700 ${open ? "opacity-[0.12]" : "opacity-0"}`}
              />
            )}

            {/* Open state */}
            <div
              className={`absolute inset-0 w-[min(640px,62vw)] transition-[opacity,transform] duration-500 motion-reduce:transition-none ${open ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-3 opacity-0"}`}
              inert={!open}
            >
              <PanelDetails app={app} />
            </div>

            {/* Folded state: strip with icon and vertical name */}
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={open}
              aria-label={`Show ${app.name}`}
              tabIndex={open ? -1 : 0}
              className={`absolute inset-0 flex flex-col items-center justify-between py-7 transition-opacity duration-300 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              <AppIcon app={app} size={44} />
              <span className="font-display text-2xl font-semibold tracking-tight text-neutral-200 [writing-mode:vertical-rl] rotate-180">{app.name}</span>
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: "var(--app)" }} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// Mobile: every app shown open, stacked.
function PanelStack() {
  return (
    <div className="grid gap-3 md:hidden">
      {shippedApps.map((app) => (
        <div key={app.name} style={{ ["--app" as string]: app.color } as CSSProperties} className="relative overflow-hidden rounded-3xl border border-line bg-card">
          <Glow />
          <PanelDetails app={app} />
        </div>
      ))}
    </div>
  );
}

// "Apps I've shipped": expanding brand-tinted panels, one per production app.
export function ShippedApps() {
  if (shippedApps.length === 0) return null;
  return (
    <div className="mt-16">
      <Reveal className="mb-6">
        <p className="label mb-3 text-[11px]">In the wild</p>
        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Apps I&apos;ve <span className="text-gradient">shipped.</span>
        </h3>
      </Reveal>
      <Reveal>
        <PanelRow />
        <PanelStack />
      </Reveal>
    </div>
  );
}
