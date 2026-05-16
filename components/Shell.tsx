import Link from "next/link";
import type { ReactNode } from "react";

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
  /** Tailwind background utility from the candy palette, e.g. "bg-bubble". */
  accent?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="rise mb-7 flex flex-col gap-5">
        <nav className="flex items-center justify-between">
          <Link href="/" className="btn btn-sm bg-paper" aria-label="Back to home">
            ← Home
          </Link>
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight"
          >
            Icebreaker <span aria-hidden>🧊</span>
          </Link>
        </nav>

        <div
          className={`pop ${accent} flex items-center gap-4 px-5 py-5 sm:px-7`}
        >
          <span
            className="float text-4xl drop-shadow-[2px_2px_0_rgba(31,17,51,0.25)] sm:text-5xl"
            aria-hidden
          >
            {emoji}
          </span>
          <div>
            <h1 className="text-2xl leading-tight sm:text-4xl">{title}</h1>
            {blurb ? (
              <p className="mt-1 max-w-prose text-sm font-semibold opacity-80 sm:text-base">
                {blurb}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <main className="rise" style={{ animationDelay: "90ms" }}>
        {children}
      </main>

      <footer className="mt-12 pb-4 text-center text-xs font-bold opacity-50">
        Icebreaker — a school project. Made to help people make friends. 💛
      </footer>
    </div>
  );
}
