"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { TRIVIA } from "@/lib/data/trivia";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TriviaPage() {
  const [order, setOrder] = useState<number[]>(() =>
    TRIVIA.map((_, i) => i),
  );
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  useEffect(() => {
    setOrder(shuffle(TRIVIA.map((_, i) => i)));
  }, []);

  const q = TRIVIA[order[pos]] ?? TRIVIA[0];

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setAnswered((n) => n + 1);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setPos((p) => {
      const np = p + 1;
      if (np >= order.length) {
        setOrder(shuffle(TRIVIA.map((_, i) => i)));
        return 0;
      }
      return np;
    });
  }

  return (
    <Shell
      emoji="🧠"
      title="Trivia"
      accent="bg-sky"
      blurb="Quiz a new friend, or guess together. Each fact is something fun to talk about."
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="tint-grape rounded-full border px-4 py-1 text-sm font-extrabold">
            {q.category}
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-extrabold text-muted">
            Score: {score}/{answered}
          </span>
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
          Next question ➡️
        </button>
      </div>
    </Shell>
  );
}
