"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { loadJSON, saveJSON } from "@/lib/storage";

type Level = "easy" | "medium" | "hard";
type Phase = "idle" | "play" | "over";
type Duration = 30 | 60 | 90;

const DURATIONS: { value: Duration; label: string }[] = [
  { value: 30, label: "⚡ 30s" },
  { value: 60, label: "⏱️ 60s" },
  { value: 90, label: "🏁 90s" },
];

const LEVELS: { id: Level; label: string; hint: string }[] = [
  { id: "easy", label: "🙂 Easy", hint: "Adding & subtracting" },
  { id: "medium", label: "😎 Medium", hint: "Add, subtract, multiply" },
  { id: "hard", label: "🔥 Hard", hint: "All four, bigger numbers" },
];

type Problem = { text: string; answer: number; options: number[] };

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeProblem(level: Level): Problem {
  let a: number;
  let b: number;
  let op: "+" | "-" | "×" | "÷";
  let answer: number;

  const ops: Record<Level, ("+" | "-" | "×" | "÷")[]> = {
    easy: ["+", "-"],
    medium: ["+", "-", "×"],
    hard: ["+", "-", "×", "÷"],
  };
  op = ops[level][randInt(0, ops[level].length - 1)];

  if (op === "+") {
    const max = level === "easy" ? 20 : level === "medium" ? 50 : 99;
    a = randInt(1, max);
    b = randInt(1, max);
    answer = a + b;
  } else if (op === "-") {
    const max = level === "easy" ? 20 : level === "medium" ? 50 : 99;
    a = randInt(1, max);
    b = randInt(1, a); // keep it non-negative
    answer = a - b;
  } else if (op === "×") {
    const max = level === "medium" ? 12 : 15;
    a = randInt(2, max);
    b = randInt(2, max);
    answer = a * b;
  } else {
    // division with a clean whole-number answer
    b = randInt(2, 12);
    answer = randInt(2, 12);
    a = b * answer;
  }

  // Build 3 plausible wrong answers near the correct one.
  const opts = new Set<number>([answer]);
  while (opts.size < 4) {
    const delta = randInt(1, Math.max(3, Math.round(answer * 0.25) || 5));
    const cand = answer + (Math.random() < 0.5 ? -delta : delta);
    if (cand >= 0 && cand !== answer) opts.add(cand);
  }
  const options = [...opts].sort(() => Math.random() - 0.5);
  return { text: `${a} ${op} ${b}`, answer, options };
}

export default function MathSprintPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [level, setLevel] = useState<Level>("easy");
  const [duration, setDuration] = useState<Duration>(60);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [picked, setPicked] = useState<number | null>(null);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Best score is tracked per (level, duration) — a 30s and a 90s
  // round on the same level aren't really comparable.
  const bestKey = `icebreaker.mathsprint.best.${level}.${duration}`;

  useEffect(() => {
    setBest(loadJSON<number>(bestKey, 0));
  }, [bestKey]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const finish = useCallback(() => {
    stop();
    setPhase("over");
    setScore((s) => {
      const prevBest = loadJSON<number>(bestKey, 0);
      if (s > prevBest) {
        saveJSON(bestKey, s);
        setBest(s);
        setNewBest(true);
      }
      return s;
    });
  }, [bestKey, stop]);

  const start = useCallback(() => {
    setScore(0);
    setAsked(0);
    setPicked(null);
    setNewBest(false);
    setTimeLeft(duration);
    setProblem(makeProblem(level));
    setPhase("play");
    stop();
    timer.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [level, duration, finish, stop]);

  useEffect(() => () => stop(), [stop]);

  function answer(opt: number) {
    if (phase !== "play" || picked !== null || !problem) return;
    setPicked(opt);
    setAsked((n) => n + 1);
    if (opt === problem.answer) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      setProblem(makeProblem(level));
    }, 260);
  }

  const accuracy = asked ? Math.round((score / asked) * 100) : 0;

  return (
    <Shell
      emoji="⚡"
      title="Math Sprint"
      accent="bg-mint"
      blurb="How many can you solve before time runs out? Pick a level, pick a duration, and go!"
    >
      <Confetti seed={newBest ? 1 : 0} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              disabled={phase === "play"}
              className={`btn btn-sm ${
                level === l.id ? "bg-grape text-white" : "bg-white/8"
              } disabled:opacity-40`}
              title={l.hint}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-widest opacity-70">
            Round length
          </span>
          {DURATIONS.map((d) => (
            <button
              key={d.value}
              onClick={() => setDuration(d.value)}
              disabled={phase === "play"}
              className={`btn btn-sm ${
                duration === d.value ? "bg-mint text-white" : "bg-white/8"
              } disabled:opacity-40`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {phase === "idle" ? (
          <div className="pop flex max-w-md flex-col items-center gap-4 p-8 text-center">
            <div className="text-5xl">⚡</div>
            <p className="font-display text-xl font-bold">
              Solve as many as you can before the timer runs out.
            </p>
            <p className="text-sm font-semibold text-muted">
              {LEVELS.find((l) => l.id === level)!.hint} · {duration}s · Best:{" "}
              {best}
            </p>
            <button className="btn bg-mint text-lg" onClick={start}>
              Start {duration}s sprint ⏱️
            </button>
          </div>
        ) : null}

        {phase === "play" && problem ? (
          <>
            <div className="w-full max-w-md">
              <div className="mb-1 flex justify-between text-sm font-extrabold">
                <span>Score: {score}</span>
                <span>⏱️ {timeLeft}s</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full border border-white/15 bg-white/5">
                <div
                  className="h-full rounded-full bg-mint transition-[width] duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / duration) * 100}%` }}
                />
              </div>
            </div>

            <div
              key={asked}
              className="pop pop-in flex w-full max-w-md items-center justify-center px-6 py-10"
            >
              <span className="font-display text-5xl font-bold sm:text-6xl">
                {problem.text} = ?
              </span>
            </div>

            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              {problem.options.map((opt) => {
                const isAns = opt === problem.answer;
                const tone =
                  picked === null
                    ? ""
                    : isAns
                      ? "sel-lime"
                      : picked === opt
                        ? "sel-cherry"
                        : "opacity-40";
                return (
                  <button
                    key={opt}
                    onClick={() => answer(opt)}
                    disabled={picked !== null}
                    className={`chip ${tone} px-5 py-5 text-2xl font-extrabold disabled:cursor-default`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {phase === "over" ? (
          <div className="pop pop-in flex max-w-md flex-col items-center gap-3 p-8 text-center">
            <div className="text-5xl">{newBest ? "🏆" : "⏰"}</div>
            <p className="font-display text-3xl font-bold">
              {score} correct!
            </p>
            <p className="text-sm font-semibold text-muted">
              Accuracy {accuracy}% · {duration}s · Best {best}
              {newBest ? " · New record! 🎉" : ""}
            </p>
            <div className="mt-2 flex gap-2">
              <button className="btn bg-mint text-lg" onClick={start}>
                Play again 🔄
              </button>
              <button
                className="btn bg-white/8"
                onClick={() => setPhase("idle")}
              >
                Change settings
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}
