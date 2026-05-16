"use client";

import { useMemo } from "react";

const COLORS = [
  "var(--color-sun)",
  "var(--color-bubble)",
  "var(--color-sky)",
  "var(--color-lime)",
  "var(--color-tangerine)",
  "var(--color-grape)",
  "var(--color-mint)",
];

/**
 * A burst of falling confetti. Bump `seed` (e.g. a win counter) to re-fire.
 * Renders nothing when seed is 0 so it stays quiet until something is won.
 */
export default function Confetti({ seed }: { seed: number }) {
  const pieces = useMemo(() => {
    if (seed <= 0) return [];
    return Array.from({ length: 90 }, (_, i) => ({
      id: `${seed}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2.2 + Math.random() * 1.6,
      color: COLORS[i % COLORS.length],
      size: 7 + Math.random() * 9,
      round: Math.random() > 0.5,
    }));
  }, [seed]);

  if (pieces.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-fall absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            border: "1.5px solid var(--color-ink)",
            borderRadius: p.round ? "999px" : "3px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
