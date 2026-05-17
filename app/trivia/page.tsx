"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { TRIVIA } from "@/lib/data/trivia";

// One game = 10 questions (or fewer if the bank is smaller).
const ROUND = Math.min(10, TRIVIA.length);
const HISTORY_KEY = "icebreaker.trivia.history";
const MAX_HISTORY = 8;

type Attempt = { score: number; total: number; at: number };

type Tier = {
  emoji: string;
  name: string;
  tag: string;
  quote: string;
  token: string; // a palette color token, e.g. "grape"
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Ocean-themed ladder. Score is out of ROUND (usually 10).
function tierFor(score: number, total: number): Tier {
  const pct = total > 0 ? score / total : 0;
  if (score === total)
    return {
      emoji: "🦈",
      name: "Shark",
      tag: "Perfect run!",
      quote:
        "Incredible — not a single miss! You're a whole ocean of knowledge. 🌊",
      token: "grape",
    };
  if (pct >= 0.9)
    return {
      emoji: "🐬",
      name: "Dolphin",
      tag: "Brilliant",
      quote: "So close to perfect! Dolphins are super smart — and so are you.",
      token: "sky",
    };
  if (pct >= 0.7)
    return {
      emoji: "🐠",
      name: "Clownfish",
      tag: "Sharp",
      quote: "Sharp work! A little more practice and you'll be unstoppable.",
      token: "mint",
    };
  if (pct >= 0.5)
    return {
      emoji: "🐢",
      name: "Sea Turtle",
      tag: "Steady",
      quote: "Steady and strong. Keep swimming — you're learning fast!",
      token: "lime",
    };
  if (pct >= 0.3)
    return {
      emoji: "🦀",
      name: "Crab",
      tag: "Climbing",
      quote: "Every expert started right here. Try again — you'll climb higher!",
      token: "tangerine",
    };
  return {
    emoji: "🐚",
    name: "Shell",
    tag: "Brave start",
    quote:
      "Brave start! Knowledge is like the ocean — keep exploring and you'll go far. 🐚",
    token: "bubble",
  };
}

const LADDER = ["🐚", "🦀", "🐢", "🐠", "🐬", "🦈"];

export default function TriviaPage() {
  // Indices into TRIVIA for this round (length = ROUND, no repeats).
  const [round, setRound] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"play" | "done">("play");
  const [history, setHistory] = useState<Attempt[]>([]);

  function startRound() {
    setRound(shuffle(TRIVIA.map((_, i) => i)).slice(0, ROUND));
    setPos(0);
    setPicked(null);
    setScore(0);
    setPhase("play");
  }

  // Build the first round after mount (avoids SSR/export hydration
  // mismatch from shuffling) and load saved history.
  useEffect(() => {
    startRound();
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as Attempt[]);
    } catch {
      /* storage blocked — history just won't persist */
    }
  }, []);

  const q = TRIVIA[round[pos]] ?? TRIVIA[0];
  const isLast = pos === ROUND - 1;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function finish() {
    const attempt: Attempt = { score, total: ROUND, at: Date.now() };
    const nextHistory = [attempt, ...history].slice(0, MAX_HISTORY);
    setHistory(nextHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    } catch {
      /* storage blocked — just don't persist */
    }
    setPhase("done");
  }

  function next() {
    if (isLast) {
      finish();
      return;
    }
    setPicked(null);
    setPos((p) => p + 1);
  }

  function clearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
  }

  // ---------- RESULTS SCREEN ----------
  if (phase === "done") {
    const tier = tierFor(score, ROUND);
    const best = history.reduce((m, a) => Math.max(m, a.score), score);

    return (
      <Shell
        emoji="🧠"
        title="Trivia"
        accent="bg-sky"
        blurb="Round complete! Here's how you did."
      >
        <div className="flex flex-col items-center gap-6">
          <div
            className={`pop pop-in tint-${tier.token} w-full max-w-2xl p-8 text-center sm:p-10`}
          >
            <div className="text-7xl sm:text-8xl" aria-hidden>
              {tier.emoji}
            </div>
            <p className="mt-2 text-xs font-extrabold uppercase tracking-widest opacity-70">
              {tier.tag}
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {tier.name}
            </h2>
            <p className="mt-3 text-5xl font-extrabold">
              {score}
              <span className="text-2xl font-bold text-muted">
                {" "}
                / {ROUND}
              </span>
            </p>
            <p className="mx-auto mt-4 max-w-md text-base font-bold leading-snug sm:text-lg">
              {tier.quote}
            </p>

            {/* Tier ladder so kids can see how to level up */}
            <div className="mt-6 flex items-center justify-center gap-2 text-2xl">
              {LADDER.map((e) => (
                <span
                  key={e}
                  className={
                    e === tier.emoji
                      ? "scale-125"
                      : "opacity-35 grayscale"
                  }
                  aria-hidden
                >
                  {e}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs font-bold text-muted">
              🐚 Shell → 🦈 Shark — can you reach the top?
            </p>
          </div>

          <button
            className="btn bg-sky text-lg"
            onClick={startRound}
            style={{ boxShadow: "0 14px 32px -12px var(--color-sky)" }}
          >
            🔄 Play 10 new questions
          </button>

          {/* History */}
          <div className="pop w-full max-w-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">
                Your scores 🏆
              </h3>
              <span className="text-sm font-extrabold text-muted">
                Best: {best}/{ROUND}
              </span>
            </div>
            {history.length === 0 ? (
              <p className="text-sm font-bold text-muted">
                No past rounds yet — this one will show up here.
              </p>
            ) : (
              <>
                <ul className="flex flex-col gap-2">
                  {history.map((a) => {
                    const t = tierFor(a.score, a.total);
                    return (
                      <li
                        key={a.at}
                        className="flex items-center justify-between rounded-xl border border-white/12 bg-white/5 px-4 py-2.5"
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <span aria-hidden>{t.emoji}</span>
                          {t.name}
                        </span>
                        <span className="flex items-center gap-4">
                          <span className="font-extrabold">
                            {a.score}/{a.total}
                          </span>
                          <span className="text-xs font-bold text-muted">
                            {new Date(a.at).toLocaleDateString()}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={clearHistory}
                  className="mt-3 text-xs font-bold text-muted underline decoration-dotted underline-offset-4"
                >
                  Clear history
                </button>
              </>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  // ---------- PLAYING SCREEN ----------
  const progress = Math.round((pos / ROUND) * 100);

  return (
    <Shell
      emoji="🧠"
      title="Trivia"
      accent="bg-sky"
      blurb="10 questions. Answer your best — then get your ocean tier!"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="tint-grape rounded-full border px-4 py-1 text-sm font-extrabold">
            {q.category}
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-extrabold text-muted">
            Question {pos + 1} of {ROUND}
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-extrabold text-muted">
            Score: {score}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-2 w-full max-w-2xl overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={pos + 1}
          aria-valuemin={1}
          aria-valuemax={ROUND}
        >
          <div
            className="h-full rounded-full bg-sky transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          key={`q-${pos}`}
          className="pop pop-in w-full max-w-2xl bg-paper p-7 text-center sm:p-9"
        >
          <p className="text-xl font-extrabold leading-snug sm:text-2xl">
            {q.question}
          </p>
        </div>

        <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === picked;
            let tone = "";
            if (picked !== null) {
              if (isAnswer) tone = "sel-lime";
              else if (isPicked) tone = "sel-cherry";
              else tone = "opacity-45";
            }
            return (
              <button
                key={i}
                disabled={picked !== null}
                onClick={() => choose(i)}
                className={`chip ${tone} px-5 py-4 text-left text-base font-bold disabled:cursor-default`}
              >
                <span className="mr-2 font-display">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
                {picked !== null && isAnswer ? " ✅" : ""}
                {picked !== null && isPicked && !isAnswer ? " ❌" : ""}
              </button>
            );
          })}
        </div>

        {picked !== null ? (
          <div className="pop tint-sun pop-in w-full max-w-2xl p-5 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest opacity-70">
              {picked === q.answer ? "Nice! 🎉" : "Good try!"} Fun fact
            </p>
            <p className="mt-1 text-base font-bold sm:text-lg">{q.fact}</p>
          </div>
        ) : null}

        <button
          className="btn bg-sky text-lg"
          onClick={next}
          disabled={picked === null}
        >
          {isLast ? "See my results 🏁" : "Next question ➡️"}
        </button>
      </div>
    </Shell>
  );
}
