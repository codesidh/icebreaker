import Link from "next/link";
import type { CSSProperties } from "react";

export default function Tile({
  href,
  emoji,
  title,
  blurb,
  color,
  index,
}: {
  href: string;
  emoji: string;
  title: string;
  blurb: string;
  /** A candy-palette bg utility (e.g. "bg-bubble"); used as a glow tint. */
  color: string;
  index: number;
}) {
  const token = color.replace(/^bg-/, "");
  const style = {
    ["--accent" as string]: `var(--color-${token})`,
    animationDelay: `${110 + index * 60}ms`,
  } as CSSProperties;

  return (
    <Link
      href={href}
      className="pop rise group relative flex flex-col gap-3 overflow-hidden p-5 transition-transform duration-200 hover:-translate-y-1"
      style={style}
    >
      {/* accent glow that intensifies on hover */}
      <span
        className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <span
        className="absolute inset-x-0 top-0 h-[3px] opacity-80"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <span
        className="relative flex h-12 w-12 items-center justify-center rounded-xl text-2xl ring-1 ring-white/15 transition-transform duration-200 group-hover:scale-105"
        style={{
          background: "color-mix(in srgb, var(--accent) 28%, transparent)",
          boxShadow: "0 10px 26px -10px var(--accent)",
        }}
        aria-hidden
      >
        {emoji}
      </span>
      <span className="relative font-display text-lg font-bold leading-tight">
        {title}
      </span>
      <span className="relative text-sm font-semibold text-muted">
        {blurb}
      </span>
      <span
        className="relative mt-1 inline-flex items-center gap-1 text-sm font-bold transition-all duration-200 group-hover:gap-2"
        style={{ color: "var(--accent)" }}
      >
        Open
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
