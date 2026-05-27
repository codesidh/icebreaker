"use client";

import { useEffect, useMemo, useState } from "react";

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
 * Pieces fade out as they reach the bottom of the viewport, and are then
 * unmounted entirely — so no rogue squares ever sit at the page edge.
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

  // Track which burst is currently on-screen. After the longest piece
  // finishes falling we wipe everything from the DOM.
  const [activeSeed, setActiveSeed] = useState(seed);

  useEffect(() => {
    if (seed <= 0) {
      setActiveSeed(seed);
      return;
    }
    setActiveSeed(seed);
    // Longest piece = max(delay) + max(duration) → 0.6 + 3.8 = 4.4s.
    // Add a small buffer so the fade-out has time to finish.
    const t = setTimeout(() => setActiveSeed(0), 5000);
    return () => clearTimeout(t);
  }, [seed]);

  if (activeSeed <= 0 || pieces.length === 0 || activeSeed !== seed) {
    return null;
  }

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
