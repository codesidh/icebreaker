"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import {
  cloneGrid,
  conflicts,
  generatePuzzle,
  isComplete,
  type Difficulty,
  type Grid,
} from "@/lib/games/sudoku";

const LEVELS: { id: Difficulty; label: string }[] = [
  { id: "easy", label: "🙂 Easy" },
  { id: "medium", label: "😎 Medium" },
  { id: "hard", label: "🔥 Hard" },
];

export default function SudokuPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [puzzle, setPuzzle] = useState<Grid | null>(null);
  const [values, setValues] = useState<Grid | null>(null);
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [busy, setBusy] = useState(true);
  const [wins, setWins] = useState(0);

  const make = useCallback((d: Difficulty) => {
    setBusy(true);
    setSel(null);
    // Let the spinner paint before the heavy generation runs.
    setTimeout(() => {
      const { puzzle: p } = generatePuzzle(d);
      setPuzzle(p);
      setValues(cloneGrid(p));
      setBusy(false);
    }, 30);
  }, []);

  useEffect(() => {
    make("easy");
  }, [make]);

  const bad = useMemo(
    () => (values ? conflicts(cloneGrid(values)) : null),
    [values],
  );
  const solved = useMemo(
    () => (values ? isComplete(cloneGrid(values)) : false),
    [values],
  );

  useEffect(() => {
    if (solved) setWins((w) => w + 1);
  }, [solved]);

  const setCell = useCallback(
    (n: number) => {
      if (!sel || !puzzle || !values || solved) return;
      const [r, c] = sel;
      if (puzzle[r][c] !== 0) return; // given — locked
      setValues((v) => {
        if (!v) return v;
        const nv = cloneGrid(v);
        nv[r][c] = n;
        return nv;
      });
    },
    [sel, puzzle, values, solved],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key >= "1" && e.key <= "9") setCell(Number(e.key));
      if (e.key === "Backspace" || e.key === "0" || e.key === "Delete")
        setCell(0);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCell]);

  return (
    <Shell
      emoji="🔢"
      title="Sudoku"
      accent="bg-grape"
      blurb="Fill every row, column, and 3×3 box with 1–9, no repeats. Tap a square, then a number."
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setDifficulty(l.id);
                make(l.id);
              }}
              className={`btn btn-sm ${
                difficulty === l.id ? "bg-grape text-ink" : "bg-paper"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {solved ? (
          <p className="pop pop-in bg-sun px-6 py-3 font-display text-2xl font-bold">
            Solved it! 🎉 Brain = powerful 🧠
          </p>
        ) : null}

        {busy || !puzzle || !values ? (
          <p className="pop bg-paper px-6 py-10 font-display text-lg font-bold">
            Shuffling a fresh puzzle… 🔀
          </p>
        ) : (
          <div className="pop w-full max-w-[min(92vw,26rem)] p-1.5 sm:p-2">
            <div className="grid aspect-square grid-cols-9 gap-[2px] overflow-hidden rounded-lg bg-white/15">
              {values.map((row, r) =>
                row.map((val, c) => {
                  const given = puzzle[r][c] !== 0;
                  const selected = sel && sel[0] === r && sel[1] === c;
                  const sameLine =
                    sel && (sel[0] === r || sel[1] === c);
                  const isBad = bad?.[r][c];
                  const thickR = r % 3 === 2 && r !== 8;
                  const thickC = c % 3 === 2 && c !== 8;
                  return (
                    <button
                      key={`${r},${c}`}
                      onClick={() => setSel([r, c])}
                      className={`flex aspect-square w-full items-center justify-center text-[clamp(0.85rem,4.4vw,1.35rem)] font-extrabold ${
                        given
                          ? "bg-white/12 font-black text-ink"
                          : isBad
                            ? "bg-cherry text-ink"
                            : selected
                              ? "bg-sun text-ink"
                              : sameLine
                                ? "bg-sun/20 text-ink"
                                : "bg-white/[0.03] text-ink"
                      }`}
                      style={{
                        marginBottom: thickR ? 3 : 0,
                        marginRight: thickC ? 3 : 0,
                      }}
                    >
                      {val !== 0 ? val : ""}
                    </button>
                  );
                }),
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => setCell(n)}
              disabled={!sel || solved}
              className="chip h-12 w-12 text-xl font-extrabold disabled:opacity-40"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setCell(0)}
            disabled={!sel || solved}
            className="chip h-12 w-14 text-base font-extrabold disabled:opacity-40"
          >
            ⌫
          </button>
        </div>

        <button
          className="btn bg-grape text-ink text-lg"
          onClick={() => make(difficulty)}
        >
          New puzzle 🔄
        </button>
      </div>
    </Shell>
  );
}
