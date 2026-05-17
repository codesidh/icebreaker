"use client";

import { useCallback, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import {
  TARGET,
  hintFor,
  optimalMove,
  randomMove,
} from "@/lib/games/nim21";

type Turn = "you" | "computer";

export default function TwentyOnePage() {
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState<Turn>("you");
  const [first, setFirst] = useState<Turn>("you");
  const [smart, setSmart] = useState(true); // true = Tricky, false = Chill
  const [showTrick, setShowTrick] = useState(false);
  const [loser, setLoser] = useState<Turn | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [wins, setWins] = useState(0);

  const over = loser !== null;

  const reset = useCallback(
    (starter: Turn) => {
      setCount(0);
      setLoser(null);
      setLog([]);
      setTurn(starter);
      setFirst(starter);
    },
    [],
  );

  const applyMove = useCallback(
    (by: Turn, n: number) => {
      setCount((c) => {
        const nc = c + n;
        setLog((l) => [
          `${by === "you" ? "You" : "Computer"} said ${
            nc - n + 1 === nc ? nc : `${nc - n + 1}…${nc}`
          } (+${n})`,
          ...l,
        ]);
        if (nc >= TARGET) {
          setLoser(by);
          if (by === "computer") setWins((w) => w + 1);
        } else {
          setTurn(by === "you" ? "computer" : "you");
        }
        return nc;
      });
    },
    [],
  );

  // Computer's turn.
  useEffect(() => {
    if (turn !== "computer" || over) return;
    const t = setTimeout(() => {
      const n = smart ? optimalMove(count) : randomMove(count);
      applyMove("computer", Math.min(n, TARGET - count));
    }, 600);
    return () => clearTimeout(t);
  }, [turn, over, count, smart, applyMove]);

  const yourTurn = turn === "you" && !over;

  return (
    <Shell
      emoji="✋"
      title="Count to 21"
      accent="bg-tangerine"
      blurb="Take turns adding 1, 2, or 3. Whoever is forced to say 21 loses. There's a secret math trick to win every time…"
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSmart(false)}
            className={`btn btn-sm ${!smart ? "bg-grape text-white" : "bg-white/8"}`}
          >
            😌 Chill computer
          </button>
          <button
            onClick={() => setSmart(true)}
            className={`btn btn-sm ${smart ? "bg-grape text-white" : "bg-white/8"}`}
          >
            😏 Tricky computer
          </button>
        </div>

        <div className="pop flex flex-col items-center gap-1 bg-paper px-12 py-7">
          <span className="text-xs font-extrabold uppercase tracking-widest opacity-60">
            Count
          </span>
          <span className="font-display text-7xl font-bold">{count}</span>
          <span className="text-sm font-bold opacity-70">
            of {TARGET} — don&apos;t say it!
          </span>
        </div>

        {over ? (
          <p
            className={`pop pop-in px-6 py-3 font-display text-2xl font-bold ${
              loser === "computer" ? "tint-lime" : "tint-cherry"
            }`}
          >
            {loser === "computer"
              ? "You win! The computer said 21 🎉"
              : "You said 21 — computer wins 🤖"}
          </p>
        ) : (
          <p className="font-display text-lg font-bold">
            {yourTurn ? "Your turn — add how many?" : "Computer is thinking…"}
          </p>
        )}

        <div className="flex gap-3">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => applyMove("you", n)}
              disabled={!yourTurn || count + n > TARGET}
              className="chip h-20 w-20 text-3xl font-extrabold disabled:opacity-40"
            >
              +{n}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="btn bg-tangerine"
            onClick={() => reset(first === "you" ? "computer" : "you")}
          >
            New game ({first === "you" ? "computer" : "you"} starts) 🔄
          </button>
          <button
            className="btn btn-sm bg-white/8"
            onClick={() => setShowTrick((s) => !s)}
          >
            {showTrick ? "Hide the trick" : "Show me the trick 🪄"}
          </button>
        </div>

        {showTrick ? (
          <div className="pop tint-lime pop-in w-full max-w-xl p-5 text-sm font-bold sm:text-base">
            <p className="mb-2 font-display text-lg">🪄 The secret</p>
            <p>
              Try to land the count on <b>4, 8, 12, 16, or 20</b>. If you do,
              the other player can never escape — they&apos;ll be forced to say
              21. The trick: whoever goes <b>second</b> and plays perfectly
              always wins, so let the computer start!
            </p>
            {yourTurn ? (
              <p className="mt-3 rounded-xl border border-white/20 bg-paper p-3">
                💡 {hintFor(count)}
              </p>
            ) : null}
          </div>
        ) : null}

        {log.length > 0 ? (
          <div className="w-full max-w-xl">
            <h2 className="mb-2 text-lg">📜 Moves</h2>
            <ul className="pop space-y-1 bg-paper p-4 text-sm font-bold">
              {log.slice(0, 8).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}
