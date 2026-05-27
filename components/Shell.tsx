import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Shell({
  emoji,
  title,
  blurb,
  accent = "bg-sun",
  children,
}: {
  emoji: string;
  title: string;
  blurb?: string;
  /** A candy-palette bg utility (e.g. "bg-bubble"); used as a glow tint. */
  accent?: string;
  children: ReactNode;
}) {
  const token = accent.replace(/^bg-/, "");
  const accentStyle = {
    ["--accent" as string]: `var(--color-${token})`,
  } as CSSProperties;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-7">
      <nav className="rise glass sticky top-3 z-30 mb-6 flex items-center justify-between rounded-2xl px-3 py-2">
        <Link
          href="/"
          className="btn btn-sm bg-white/5"
          aria-label="Back to home"
        >
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 pr-1 font-display text-lg font-bold tracking-tight"
          >
            <span aria-hidden>🧊</span> Icebreaker
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <header
        className="rise pop relative mb-8 overflow-hidden"
        style={{ ...accentStyle, animationDelay: "60ms" }}
      >
        {/* accent glow wash */}
        <div
          className="pointer-events-none absolute -top-16 left-0 h-40 w-2/3 opacity-50 blur-3xl"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <div className="relative flex items-center gap-4 px-5 py-5 sm:gap-5 sm:px-7 sm:py-6">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ring-1 ring-white/15 sm:h-16 sm:w-16 sm:text-4xl"
            style={{
              background: "color-mix(in srgb, var(--accent) 26%, transparent)",
              boxShadow: "0 10px 28px -10px var(--accent)",
            }}
            aria-hidden
          >
            {emoji}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl leading-tight sm:text-4xl">{title}</h1>
            {blurb ? (
              <p className="mt-1.5 max-w-prose text-sm font-semibold text-muted sm:text-base">
                {blurb}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <main className="rise" style={{ animationDelay: "120ms" }}>
        {children}
      </main>

      <footer className="mt-14 border-t border-white/10 pt-6 pb-4 text-center text-xs font-semibold text-muted">
        Icebreaker — a school project, made to help people make friends. 💛
      </footer>
    </div>
  );
}
