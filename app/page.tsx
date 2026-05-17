import Link from "next/link";
import Tile from "@/components/Tile";
import StatStrip from "@/components/StatStrip";
import { TEAM, SCHOOL } from "@/lib/credits";

const ICEBREAKERS = [
  {
    href: "/jokes",
    emoji: "😄",
    title: "Jokes",
    blurb: "Tell a quick joke to get a laugh and break the silence.",
    color: "bg-sun",
  },
  {
    href: "/trivia",
    emoji: "🧠",
    title: "Trivia",
    blurb: "Surprising facts you can share — and maybe change a mind.",
    color: "bg-sky",
  },
  {
    href: "/riddles",
    emoji: "🤔",
    title: "Riddles",
    blurb: "Stump a new friend, then enjoy the “aha!” together.",
    color: "bg-lime",
  },
  {
    href: "/conversation",
    emoji: "💬",
    title: "Conversation Starters",
    blurb: "Pick a side, say why. See what everyone else thinks.",
    color: "bg-bubble",
  },
];

const GAMES = [
  {
    href: "/games/tic-tac-toe",
    emoji: "❌",
    title: "Tic-Tac-Toe",
    blurb: "Classic 3-in-a-row vs. the computer.",
    color: "bg-sky",
  },
  {
    href: "/games/twenty-one",
    emoji: "✋",
    title: "Count to 21",
    blurb: "Don’t be the one to say 21! Learn the secret trick.",
    color: "bg-tangerine",
  },
  {
    href: "/games/word-search",
    emoji: "🔤",
    title: "Word Search",
    blurb: "Find the hidden words. Pick a new theme any time.",
    color: "bg-lime",
  },
  {
    href: "/games/sudoku",
    emoji: "🔢",
    title: "Sudoku",
    blurb: "Fill the grid 1–9. Three difficulty levels.",
    color: "bg-grape",
  },
  {
    href: "/games/memory",
    emoji: "🧩",
    title: "Memory Match",
    blurb: "Flip the cards and find every pair.",
    color: "bg-bubble",
  },
  {
    href: "/games/hangman",
    emoji: "🎈",
    title: "Hangman",
    blurb: "Guess the word before the balloons pop.",
    color: "bg-sun",
  },
  {
    href: "/games/rock-paper-scissors",
    emoji: "✊",
    title: "Rock Paper Scissors",
    blurb: "Best of 5 against the computer.",
    color: "bg-mint",
  },
  {
    href: "/games/math-sprint",
    emoji: "⚡",
    title: "Math Sprint",
    blurb: "Beat the clock with mental math. 3 levels.",
    color: "bg-mint",
  },
  {
    href: "/games/memory-sequence",
    emoji: "🎵",
    title: "Memory Sequence",
    blurb: "Watch & repeat the growing pattern.",
    color: "bg-grape",
  },
  {
    href: "/games/slide-puzzle",
    emoji: "🔀",
    title: "Slide Puzzle",
    blurb: "Slide the numbers back into order.",
    color: "bg-sky",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-7">
      {/* ---- Sticky glass nav ---- */}
      <nav className="rise glass sticky top-3 z-30 mb-12 flex items-center justify-between rounded-2xl px-4 py-2.5 sm:mb-16">
        <span className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span aria-hidden>🧊</span> Icebreaker
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-muted ring-1 ring-white/10">
          School project
        </span>
      </nav>

      {/* ---- Hero ---- */}
      <section className="rise mb-14 text-center sm:mb-20">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 text-xs font-bold text-muted ring-1 ring-white/12 sm:text-sm">
          <span
            className="inline-block h-2 w-2 animate-pulse rounded-full"
            style={{ background: "var(--color-mint)" }}
            aria-hidden
          />
          A friendly way to make friends
        </p>
        <h1 className="text-balance text-5xl font-bold leading-[1.04] sm:text-7xl">
          Make a <span className="text-gradient">friend</span> today.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base font-semibold text-muted sm:text-lg">
          New at school or sitting alone at lunch? Pick a joke, a riddle, a big
          question, or a game — Icebreaker makes saying “hi” a whole lot easier.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#explore"
            className="btn bg-grape text-white"
            style={{ boxShadow: "0 16px 38px -12px var(--color-grape)" }}
          >
            Explore the app →
          </a>
          <Link href="/poster" className="btn bg-white/8">
            🖼️ Project board
          </Link>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-muted sm:text-sm">
          {["No sign-up", "Works on any device", "100% original games"].map(
            (chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/6 px-3.5 py-1.5 ring-1 ring-white/10"
              >
                {chip}
              </span>
            ),
          )}
        </div>
      </section>

      {/* ---- Animated stats ---- */}
      <section className="rise mb-16" style={{ animationDelay: "120ms" }}>
        <StatStrip />
      </section>

      {/* ---- Break the Ice ---- */}
      <section id="explore" className="mb-14 scroll-mt-24">
        <div className="rise mb-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-grape)" }}
          >
            Start a conversation
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl">🧊 Break the Ice</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {ICEBREAKERS.map((t, i) => (
            <Tile key={t.href} {...t} index={i} />
          ))}
        </div>
      </section>

      {/* ---- Play & Think ---- */}
      <section>
        <div className="rise mb-6">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-tangerine)" }}
          >
            Play together
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl">🎮 Play &amp; Think</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {GAMES.map((t, i) => (
            <Tile key={t.href} {...t} index={i + 1} />
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-white/10 pt-6 pb-4 text-center text-xs font-semibold text-muted">
        <Link
          href="/poster"
          className="font-bold text-ink underline decoration-dotted underline-offset-4"
        >
          🖼️ Project board (printable trifold)
        </Link>
        <p className="mt-2">
          Icebreaker — a school project. Every game is original. Be kind, have
          fun. 💛
        </p>
        <p className="mt-4 text-balance">
          Made by{" "}
          <span className="font-bold text-ink">{TEAM}</span>
          <br />
          {SCHOOL}
        </p>
      </footer>
    </div>
  );
}
