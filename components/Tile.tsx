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
  /** A candy-palette bg utility (e.g. "bg-bubble"); used as a tint. */
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
      className="pop rise group relative flex flex-col gap-3 overflow-hidden p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgba(29,27,48,0.5)]"
      style={style}
    >
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-200 group-hover:scale-105"
        style={{ background: "color-mix(in srgb, var(--accent) 15%, white)" }}
        aria-hidden
      >
        {emoji}
      </span>
      <span className="font-display text-lg font-bold leading-tight">
        {title}
      </span>
      <span className="text-sm font-semibold text-muted">{blurb}</span>
      <span
        className="mt-1 inline-flex items-center gap-1 text-sm font-bold transition-all duration-200 group-hover:gap-2"
        style={{ color: "var(--accent)" }}
      >
        Open
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
