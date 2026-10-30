import { ArrowUpRight, BarChart3, Check, Film, Layers, Link2, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { project } from "@/content/profile";
import { AppRevamp } from "./app-revamp";
import { ReleaseDashboard } from "./release-dashboard";
import { Reveal, SectionHeading } from "./reveal";
import { SpotlightCard } from "./spotlight-card";

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-300">
          {i}
        </li>
      ))}
    </ul>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[15px] text-neutral-300">
          <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-violet-300" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function Feature({ index, label, title, text, points, chips, visual, flip }: { index: string; label: string; title: string; text: string; points: string[]; chips: string[]; visual: ReactNode; flip?: boolean }) {
  return (
    <Reveal>
      <SpotlightCard className="p-5 sm:p-7 md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={flip ? "lg:order-2" : ""}>
            <p className="label mb-4 text-[11px]">
              <span className="text-gradient">{index}</span> · {label}
            </p>
            <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{text}</p>
            <Points items={points} />
            <Chips items={chips} />
          </div>
          <div className={flip ? "lg:order-1" : ""}>{visual}</div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function Card({ icon, title, text, chips, delay }: { icon: ReactNode; title: string; text: string; chips: string[]; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <SpotlightCard className="h-full p-7">
        <div className="mb-5 grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-violet-300">{icon}</div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
        <Chips items={chips} />
      </SpotlightCard>
    </Reveal>
  );
}

export function WorkBento() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-28 md:px-8 md:py-36">
      <SectionHeading
        label="Camera roll · The work"
        title="Things I build that"
        accent="pay rent."
        intro="At Astrosure I own the app from the first commit to the store listing. Two projects carry the most weight."
      />

      <div className="space-y-4">
        <Feature
          index="01"
          label="Flagship"
          title="Release dashboard"
          text="An internal dashboard that turns a release into a few clicks: pick a branch and an environment, and it builds, signs and ships to the stores, on a GitHub Actions + Fastlane pipeline I rebuilt underneath it."
          points={[
            "Build any branch across dev, preprod and prod, with version overrides",
            "Release notes pushed straight to TestFlight and Play",
            "Concurrency locks and cancellation permissions",
            "Build history, per-run build times and live store-version tracking",
            "Store-ready Android builds in 8–10 minutes",
          ]}
          chips={["GitHub Actions", "Fastlane", "Code signing", "Sentry", "Self-hosted runners"]}
          visual={<ReleaseDashboard />}
        />

        <Feature
          flip
          index="02"
          label="Revamp"
          title="App revamp to the new UI"
          text="Moved the app to its new UI: rebuilt the core screens from Figma on personalised v2 APIs, and added the sharing and export features that came with it."
          points={[
            "Onboarding, horoscope, transits and charts rebuilt from Figma",
            "Personalised v2 APIs behind every screen",
            "In-app PDF downloads and image sharing",
            "Cosmic Audio: narrated audio series with background and lock-screen playback",
          ]}
          chips={["React Native", "Figma", "v2 APIs", "PDF export"]}
          visual={<AppRevamp />}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          icon={<BarChart3 size={20} aria-hidden="true" />}
          title="Analytics & attribution"
          text="Four tools, one truth: identity merging, per-destination routing and a shared event_id so every event reconciles across app and web."
          chips={["CleverTap", "AppsFlyer", "RudderStack", "GA4"]}
        />
        <Card
          delay={0.05}
          icon={<Link2 size={20} aria-hidden="true" />}
          title="Deep links & push"
          text="Routing for custom schemes, universal links and OneLink that survives cold and warm starts, and a fix for the route bug that crashed every incoming link."
          chips={["Universal links", "OneLink", "Redux Persist"]}
        />
        <Card
          delay={0.1}
          icon={<Layers size={20} aria-hidden="true" />}
          title="Full-stack features"
          text="An NPS system end to end, a WhatsApp channel with delivery webhooks, and an audio module on FastAPI with admin roles."
          chips={["FastAPI", "Next.js", "SQLAlchemy"]}
        />
        <Card
          icon={<ShieldCheck size={20} aria-hidden="true" />}
          title="Platform compliance"
          text="Led the React Native 0.74 → 0.78 upgrade, 16 KB page-size support for Google Play, iOS 27 scene lifecycle and ATT."
          chips={["RN 0.78", "16 KB pages", "ATT"]}
        />
        {/* Spans two columns so the five cards fill both rows. */}
        <Reveal delay={0.05} className="h-full md:col-span-2">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-3xl border border-line bg-linear-to-br from-violet-500/10 via-transparent to-pink-500/10 p-7 transition-colors duration-300 hover:border-violet-400/40"
          >
            <div className="mb-5 grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-violet-300">
              <Film size={20} aria-hidden="true" />
            </div>
            <p className="label mb-2 text-[11px]">Side project</p>
            <h3 className="font-display text-xl font-semibold">{project.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.text}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-medium text-ink">
              Live demo
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
