"use client";

import { useCallback, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { HANGMAN_WORDS } from "@/lib/data/words";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MAX_WRONG = 6;

export default function HangmanPage() {
  const [idx, setIdx] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wins, setWins] = useState(0);

  const entry = HANGMAN_WORDS[idx];
  const word = entry.word;

  const wrong = [...guessed].filter((l) => !word.includes(l));
  const lost = wrong.length >= MAX_WRONG;
  const won = word.split("").every((l) => guessed.has(l));
  const over = lost || won;

  const newWord = useCallback(() => {
    setIdx(Math.floor(Math.random() * HANGMAN_WORDS.length));
    setGuessed(new Set());
  }, []);

  useEffect(() => {
    newWord();
  }, [newWord]);

  useEffect(() => {
    if (won) setWins((w) => w + 1);
  }, [won]);

  const guess = useCallback(
    (l: string) => {
      if (over || guessed.has(l)) return;
      setGuessed((g) => new Set(g).add(l));
    },
    [over, guessed],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toUpperCase();
      if (k.length === 1 && k >= "A" && k <= "Z") guess(k);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guess]);

  const balloonsLeft = MAX_WRONG - wrong.length;

  return (
    <Shell
      emoji="🎈"
      title="Hangman"
      accent="bg-sun"
      blurb="Guess the hidden word one letter at a time. Every wrong guess pops a balloon — don't pop them all!"
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-2 text-4xl" aria-label="balloons left">
          {Array.from({ length: MAX_WRONG }, (_, i) => (
            <span key={i} className={i < balloonsLeft ? "float" : "opacity-40"}>
              {i < balloonsLeft ? "🎈" : "💥"}
            </span>
          ))}
        </div>

        <div className="pop tint-sky px-5 py-3 text-center font-display font-bold">
          Hint: {entry.hint}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {word.split("").map((l, i) => {
            const show = guessed.has(l) || over;
            return (
              <span
                key={i}
                className={`flex h-14 w-11 items-center justify-center rounded-lg border-b-2 border-white/25 text-3xl font-extrabold ${
                  show ? "bg-white/[0.06] pop-in" : "bg-transparent"
                } ${lost && !guessed.has(l) ? "text-cherry" : ""}`}
              >
                {show ? l : ""}
              </span>
            );
          })}
        </div>

        {won ? (
          <p className="pop tint-lime pop-in px-6 py-3 font-display text-2xl font-bold">
            You got it! 🎉
          </p>
        ) : lost ? (
          <p className="pop tint-cherry pop-in px-6 py-3 font-display text-2xl font-bold">
            Out of balloons! The word was “{word}”.
          </p>
        ) : null}

        <div className="flex max-w-xl flex-wrap justify-center gap-2">
          {ALPHABET.map((l) => {
            const used = guessed.has(l);
            const right = used && word.includes(l);
            return (
              <button
                key={l}
                onClick={() => guess(l)}
                disabled={used || over}
                className={`chip h-10 w-10 text-base font-extrabold disabled:cursor-default ${
                  used ? (right ? "sel-lime" : "sel-cherry") : ""
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>

        <button className="btn bg-sun text-lg" onClick={newWord}>
          New word 🔄
        </button>
      </div>
    </Shell>
  );
}
