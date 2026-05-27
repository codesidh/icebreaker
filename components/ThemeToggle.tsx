"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "icebreaker.theme";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.dataset.theme as Theme) || "dark";
}

/**
 * Sun/moon toggle that flips a `data-theme` attribute on <html> and
 * remembers the choice in localStorage. The initial value is applied
 * pre-hydration by an inline script in layout.tsx — so there's no
 * flash of the wrong theme before this component mounts.
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  // Start as `null` so the server-rendered markup matches the client
  // markup until we know the real theme — avoids hydration mismatches.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function toggle() {
    const next: Theme = (theme ?? currentTheme()) === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — preference just won't persist */
    }
    setTheme(next);
  }

  // Pre-hydration render: emit a placeholder of the same size so the
  // nav doesn't reflow when this component finally hydrates.
  const label =
    theme === "light" ? "🌙" : theme === "dark" ? "☀️" : "✨";
  const aria =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
        ? "Switch to light mode"
        : "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={aria}
      title={aria}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-base transition hover:brightness-125 ${className}`}
    >
      <span aria-hidden>{label}</span>
    </button>
  );
}
