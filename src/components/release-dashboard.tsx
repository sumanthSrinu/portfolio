"use client";

import { Check, GitBranch, Loader2, Lock, Play, X } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ENVS = ["dev", "preprod", "prod"] as const;
const STEPS = ["Install deps", "Archive & sign", "Reconcile build number", "Upload → TestFlight"];

// Illustrative rows; durations reflect the real 8–10 min Android runs.
const HISTORY = [
  { platform: "android", branch: "release/1.8.5", env: "prod", status: "ok", time: "9m 12s", by: "Play · internal" },
  { platform: "ios", branch: "release/1.8.5", env: "prod", status: "ok", time: "—", by: "TestFlight" },
  { platform: "android", branch: "feat/nps-survey", env: "preprod", status: "cancelled", time: "2m 40s", by: "cancelled" },
  { platform: "android", branch: "main", env: "dev", status: "ok", time: "8m 31s", by: "Play · internal" },
] as const;

function PlatformBadge({ platform }: { platform: string }) {
  return (
    <span className="rounded border border-line px-1 font-mono text-[10px] uppercase text-faint">{platform === "ios" ? "iOS" : "AND"}</span>
  );
}

// Mock of the internal release dashboard: pick a branch and environment, watch the run, see history.
export function ReleaseDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [env, setEnv] = useState<(typeof ENVS)[number]>("prod");
  const [tick, setTick] = useState(0);
  const step = reduce ? STEPS.length - 1 : tick % (STEPS.length + 2);
  const running = step < STEPS.length;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-line bg-black/70 text-[13px] shadow-2xl shadow-violet-950/40">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-zinc-700" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-zinc-700" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 font-mono text-xs text-faint">releases.internal / builds</span>
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line p-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-neutral-200">
          <GitBranch size={13} aria-hidden="true" className="text-violet-300" />
          release/1.8.5
        </span>
        <div role="radiogroup" aria-label="Environment (demo)" className="flex rounded-lg border border-line p-0.5">
          {ENVS.map((e) => (
            <button
              key={e}
              type="button"
              role="radio"
              aria-checked={env === e}
              onClick={() => setEnv(e)}
              className={`min-h-8 rounded-md px-2.5 font-mono text-xs transition-colors duration-200 ${env === e ? "bg-violet-500/20 text-violet-200" : "text-faint hover:text-ink"}`}
            >
              {e}
            </button>
          ))}
        </div>
        <span className="font-mono text-xs text-faint">v1.8.5 · override</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-black">
          <Play size={12} aria-hidden="true" fill="currentColor" />
          Build
        </span>
      </div>

      {/* live run */}
      <div className="border-b border-line p-4" aria-hidden="true">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-neutral-200">
            <PlatformBadge platform="ios" />
            Running · <span className="font-mono text-xs text-violet-200">{env}</span>
          </p>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-faint">
            <Lock size={11} /> lock held
          </span>
        </div>
        <div className="mb-2 flex gap-1">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < step || !running ? "bg-emerald-400/80" : i === step ? "bg-violet-400" : "bg-zinc-800"}`}
            />
          ))}
        </div>
        <p className="flex items-center gap-2 font-mono text-xs">
          {running ? (
            <>
              <Loader2 size={12} className="animate-spin text-violet-300" />
              <span className="text-violet-200">{STEPS[step]}</span>
            </>
          ) : (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-300">Uploaded to TestFlight · release notes attached</span>
            </>
          )}
        </p>
      </div>

      {/* history */}
      <table className="w-full text-left">
        <caption className="sr-only">Example build history</caption>
        <thead>
          <tr className="font-mono text-[11px] uppercase tracking-wider text-faint">
            <th className="px-4 pb-1 pt-3 font-normal">Build</th>
            <th className="hidden px-2 pb-1 pt-3 font-normal sm:table-cell">Env</th>
            <th className="px-4 pb-1 pt-3 text-right font-normal sm:px-2 sm:text-left">Time</th>
            <th className="hidden px-4 pb-1 pt-3 text-right font-normal sm:table-cell">Store</th>
          </tr>
        </thead>
        <tbody>
          {HISTORY.map((h, i) => (
            <tr key={i} className="border-t border-line/60 text-neutral-300">
              <td className="px-4 py-2.5">
                <span className="flex items-center gap-2">
                  {h.status === "ok" ? (
                    <Check size={13} aria-label="succeeded" className="text-emerald-400" />
                  ) : (
                    <X size={13} aria-label="cancelled" className="text-zinc-500" />
                  )}
                  <PlatformBadge platform={h.platform} />
                  <span className="truncate font-mono text-xs">{h.branch}</span>
                </span>
              </td>
              <td className="hidden px-2 py-2.5 font-mono text-xs text-faint sm:table-cell">{h.env}</td>
              <td className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-xs tabular-nums sm:px-2 sm:text-left">{h.time}</td>
              <td className="hidden px-4 py-2.5 text-right text-xs text-faint sm:table-cell">{h.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
