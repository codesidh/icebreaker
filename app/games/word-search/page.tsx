"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { generate, lineBetween, type Puzzle } from "@/lib/games/wordSearch";
import { WORD_THEMES } from "@/lib/data/words";

const SIZE = 12;
const ck = (r: number, c: number) => `${r},${c}`;
const sortKey = (cells: [number, number][]) =>
  JSON.stringify([...cells].sort((a, b) => a[0] - b[0] || a[1] - b[1]));

export default function WordSearchPage() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [start, setStart] = useState<[number, number] | null>(null);
  const [reveal, setReveal] = useState(false);
  const [wins, setWins] = useState(0);

  const theme = WORD_THEMES[themeIdx];

  const newPuzzle = useCallback(
    (idx: number) => {
      setPuzzle(generate(WORD_THEMES[idx].words, SIZE));
      setFound(new Set());
      setFoundCells(new Set());
      setStart(null);
      setReveal(false);
    },
    [],
  );

  useEffect(() => {
    newPuzzle(themeIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const won = useMemo(
    () => !!puzzle && found.size === puzzle.placements.length && found.size > 0,
    [puzzle, found],
  );

  useEffect(() => {
    if (won) setWins((w) => w + 1);
  }, [won]);

  function tap(r: number, c: number) {
    if (!puzzle || won) return;
    if (!start) {
      setStart([r, c]);
      return;
    }
    const cells = lineBetween(start[0], start[1], r, c);
    setStart(null);
    if (!cells) return;

    const key = sortKey(cells);
    for (const p of puzzle.placements) {
      if (found.has(p.word)) continue;
      if (sortKey(p.cells) === key) {
        setFound((f) => new Set(f).add(p.word));
        setFoundCells((fc) => {
          const n = new Set(fc);
          p.cells.forEach(([rr, cc]) => n.add(ck(rr, cc)));
          return n;
        });
        return;
      }
    }
  }

  const revealCells = useMemo(() => {
    const s = new Set<string>();
    if (reveal && puzzle) {
      puzzle.placements.forEach((p) =>
        p.cells.forEach(([r, c]) => s.add(ck(r, c))),
      );
    }
    return s;
  }, [reveal, puzzle]);

  return (
    <Shell
      emoji="🔤"
      title="Word Search"
      accent="bg-lime"
      blurb="Tap the first letter, then the last letter of a word — across, down, or diagonal. Switch themes any time!"
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {WORD_THEMES.map((t, i) => (
            <button
              key={t.name}
              onClick={() => {
                setThemeIdx(i);
                newPuzzle(i);
              }}
              className={`btn btn-sm ${
                themeIdx === i ? "bg-grape text-paper" : "bg-paper"
              }`}
            >
              {t.emoji} {t.name}
            </button>
          ))}
        </div>

        {won ? (
          <p className="pop pop-in bg-sun px-6 py-3 font-display text-2xl font-bold">
            You found them all! 🎉
          </p>
        ) : null}

        {puzzle ? (
          <div className="pop overflow-x-auto bg-paper p-3">
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
              }}
            >
              {puzzle.grid.map((row, r) =>
                row.map((ch, c) => {
                  const isFound = foundCells.has(ck(r, c));
                  const isStart =
                    start && start[0] === r && start[1] === c;
                  const isReveal = revealCells.has(ck(r, c));
                  return (
                    <button
                      key={ck(r, c)}
                      onClick={() => tap(r, c)}
                      className={`flex aspect-square w-7 items-center justify-center rounded-md text-[13px] font-extrabold transition-colors sm:w-9 sm:text-base ${
                        isFound
                          ? "bg-lime"
                          : isStart
                            ? "bg-bubble text-paper"
                            : isReveal
                              ? "bg-sky/60"
                              : "hover:bg-sun"
                      }`}
                    >
                      {ch}
                    </button>
                  );
                }),
              )}
            </div>
          </div>
        ) : (
          <p className="font-bold">Building puzzle…</p>
        )}

        <div className="pop w-full max-w-md bg-paper p-4">
          <p className="mb-2 font-display text-lg font-bold">
            Find these {theme.emoji}
          </p>
          <div className="flex flex-wrap gap-2">
            {theme.words.map((w) => (
              <span
                key={w}
                className={`rounded-full border-[3px] border-ink px-3 py-1 text-sm font-extrabold ${
                  found.has(w)
                    ? "bg-lime line-through opacity-60"
                    : "bg-paper"
                }`}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="btn bg-lime"
            onClick={() => newPuzzle(themeIdx)}
          >
            New puzzle 🔄
          </button>
          <button
            className="btn btn-sm bg-paper"
            onClick={() => setReveal((v) => !v)}
          >
            {reveal ? "Hide answers" : "Stuck? Reveal 👀"}
          </button>
        </div>
      </div>
    </Shell>
  );
}
