"use client";

import { useEffect, useRef, useState } from "react";
import { JOKES } from "@/lib/data/jokes";
import { RIDDLES } from "@/lib/data/riddles";
import { TRIVIA } from "@/lib/data/trivia";
import { OPINION_QUESTIONS } from "@/lib/data/conversation";

const STATS = [
  { value: JOKES.length, label: "Jokes", suffix: "+", color: "var(--color-sun)" },
  { value: RIDDLES.length, label: "Riddles", suffix: "+", color: "var(--color-lime)" },
  { value: TRIVIA.length, label: "Trivia facts", suffix: "+", color: "var(--color-sky)" },
  { value: OPINION_QUESTIONS.length, label: "Big questions", suffix: "+", color: "var(--color-bubble)" },
  { value: 10, label: "Original games", suffix: "", color: "var(--color-grape)" },
];

function useCountUp(target: number, run: boolean, ms = 1100) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      // ease-out cubic
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

function Stat({
  value,
  label,
  suffix,
  color,
  run,
}: {
  value: number;
  label: string;
  suffix: string;
  color: string;
  run: boolean;
}) {
  const n = useCountUp(value, run);
  return (
    <div className="pop flex flex-col items-center px-3 py-4 text-center">
      <span
        className="font-display text-3xl font-bold tabular-nums sm:text-4xl"
        style={{ color }}
      >
        {n}
        {suffix}
      </span>
      <span className="mt-1 text-xs font-bold text-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function StatStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
    >
      {STATS.map((s) => (
        <Stat key={s.label} {...s} run={run} />
      ))}
    </div>
  );
}
