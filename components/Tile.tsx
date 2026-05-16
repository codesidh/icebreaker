import Link from "next/link";

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
  /** Tailwind background utility, e.g. "bg-bubble". */
  color: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className={`pop rise group ${color} flex flex-col gap-2 p-5 transition-transform duration-100 hover:-translate-y-1 active:translate-y-0`}
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      <span
        className="text-4xl transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
        aria-hidden
      >
        {emoji}
      </span>
      <span className="font-display text-xl font-bold leading-tight">
        {title}
      </span>
      <span className="text-sm font-semibold opacity-80">{blurb}</span>
    </Link>
  );
}
