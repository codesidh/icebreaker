"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { loadJSON, saveJSON } from "@/lib/storage";

type Best = { moves: number; secs: number };

function solvedBoard(n: number): number[] {
  return Array.from({ length: n * n }, (_, i) => (i + 1) % (n * n));
}

function neighbors(idx: number, n: number): number[] {
  const r = Math.floor(idx / n);
  const c = idx % n;
  const out: number[] = [];
  if (r > 0) out.push(idx - n);
  if (r < n - 1) out.push(idx + n);
  if (c > 0) out.push(idx - 1);
  if (c < n - 1) out.push(idx + 1);
  return out;
}

// Scramble by walking the blank with random valid moves — always solvable.
function scramble(n: number): number[] {
  const b = solvedBoard(n);
  let blank = b.length - 1;
  let prev = -1;
  const steps = n * n * 40;
  for (let s = 0; s < steps; s++) {
    const opts = neighbors(blank, n).filter((x) => x !== prev);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    [b[blank], b[pick]] = [b[pick], b[blank]];
    prev = blank;
    blank = pick;
  }
  return b.every((v, i) => v === solvedBoard(n)[i]) ? scramble(n) : b;
}

export default function SlidePuzzlePage() {
  const [n, setN] = useState(3);
  const [tiles, setTiles] = useState<number[]>(() => solvedBoard(3));
  const [moves, setMoves] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [secs, setSecs] = useState(0);
  const [won, setWon] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [best, setBest] = useState<Best | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  const bestKey = `icebreaker.slide.best.${n}`;

  const newGame = useCallback(
    (size: number) => {
      if (tick.current) clearInterval(tick.current);
      tick.current = null;
      setTiles(scramble(size));
      setMoves(0);
      setSecs(0);
      setStartedAt(null);
      setWon(false);
      setBest(loadJSON<Best | null>(`icebreaker.slide.best.${size}`, null));
    },
    [],
  );

  useEffect(() => {
    newGame(3);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [newGame]);

  // Run the clock while playing.
  useEffect(() => {
    if (startedAt === null || won) return;
    tick.current = setInterval(
      () => setSecs(Math.floor((Date.now() - startedAt) / 1000)),
      1000,
    );
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [startedAt, won]);

  function move(idx: number) {
    if (won) return;
    const blank = tiles.indexOf(0);
    if (!neighbors(blank, n).includes(idx)) return;

    const nb = [...tiles];
    [nb[blank], nb[idx]] = [nb[idx], nb[blank]];
    setTiles(nb);
    setMoves((m) => m + 1);
    if (startedAt === null) setStartedAt(Date.now());

    if (nb.every((v, i) => v === solvedBoard(n)[i])) {
      setWon(true);
      const finalSecs = startedAt
        ? Math.floor((Date.now() - startedAt) / 1000)
        : 0;
      setSecs(finalSecs);
      setConfetti((c) => c + 1);
      const prev = loadJSON<Best | null>(bestKey, null);
      const score: Best = { moves: moves + 1, secs: finalSecs };
      if (
        !prev ||
        score.moves < prev.moves ||
        (score.moves === prev.moves && score.secs < prev.secs)
      ) {
        saveJSON(bestKey, score);
        setBest(score);
      }
    }
  }

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(
    secs % 60,
  ).padStart(2, "0")}`;

  return (
    <Shell
      emoji="🔀"
      title="Slide Puzzle"
      accent="bg-sky"
      blurb="Slide the numbered tiles back into order, 1 to the end. A classic test of planning ahead — fewer moves is better!"
    >
      <Confetti seed={confetti} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[3, 4].map((s) => (
            <button
              key={s}
              onClick={() => {
                setN(s);
                newGame(s);
              }}
              className={`btn btn-sm ${
                n === s ? "bg-grape text-white" : "bg-white/8"
              }`}
            >
              {s}×{s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 font-display font-bold">
          <span className="pop tint-sky px-5 py-2">Moves: {moves}</span>
          <span className="pop tint-mint px-5 py-2">⏱️ {mmss}</span>
          {best ? (
            <span className="pop tint-sun px-5 py-2">
              Best: {best.moves} moves
            </span>
          ) : null}
        </div>

        {won ? (
          <p className="pop tint-lime pop-in px-6 py-3 font-display text-2xl font-bold">
            Solved in {moves} moves &amp; {mmss}! 🎉
          </p>
        ) : null}

        <div
          className="pop w-full p-2 sm:p-2.5"
          style={{ maxWidth: "min(90vw, 24rem)" }}
        >
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          >
            {tiles.map((v, i) =>
              v === 0 ? (
                <div key={i} className="aspect-square w-full" />
              ) : (
                <button
                  key={i}
                  onClick={() => move(i)}
                  className="chip tint-grape flex aspect-square w-full items-center justify-center font-display text-[clamp(1.1rem,7vw,2rem)] font-bold"
                >
                  {v}
                </button>
              ),
            )}
          </div>
        </div>

        <button
          className="btn bg-sky text-white text-lg"
          onClick={() => newGame(n)}
        >
          Shuffle &amp; restart 🔄
        </button>
      </div>
    </Shell>
  );
}
