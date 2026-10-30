"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const DURATION_MS = 1200;
const SEEN_KEY = "preloader-seen";

const subscribe = () => () => {};
function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

// Telugu "Namaste" counter intro, shown once per browser session.
export function Preloader() {
  const reduce = useReducedMotion();
  const seen = useSyncExternalStore(subscribe, readSeen, () => false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const visible = !seen && !reduce && !done;

  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        timer = setTimeout(() => setDone(true), 200);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          data-preloader
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center">
            <p className="font-display text-4xl font-light tracking-tight md:text-5xl">నమస్తే</p>
            <p className="label mt-4 text-[10px] md:text-xs">Compiling experience</p>
            <p className="font-display text-[22vw] font-extralight leading-none tabular-nums md:text-[13vw]">
              {count}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
