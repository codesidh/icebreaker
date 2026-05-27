"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [reveal, setReveal] = useState(false);
  const [wins, setWins] = useState(0);

  // Swipe selection — track where the drag began and the live line of
  // cells the finger/cursor is sweeping over.
  const [dragStart, setDragStart] = useState<[number, number] | null>(null);
  const [dragCells, setDragCells] = useState<[number, number][] | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const theme = WORD_THEMES[themeIdx];

  const newPuzzle = useCallback(
    (idx: number) => {
      setPuzzle(generate(WORD_THEMES[idx].words, SIZE));
      setFound(new Set());
      setFoundCells(new Set());
      setDragStart(null);
      setDragCells(null);
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

  /** Try to record the currently-swept line as a found word. */
  const commitSelection = useCallback(
    (cells: [number, number][] | null) => {
      if (!puzzle || !cells || cells.length < 2) return;
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
    },
    [puzzle, found],
  );

  /** Look up the (row, col) under a pointer position, or null. */
  const cellFromPoint = useCallback(
    (clientX: number, clientY: number): [number, number] | null => {
      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return null;
      const cellEl = (el as HTMLElement).closest("[data-cell]");
      if (!cellEl) return null;
      const rc = (cellEl as HTMLElement).dataset.cell;
      if (!rc) return null;
      const [rs, cs] = rc.split(",");
      return [Number(rs), Number(cs)];
    },
    [],
  );

  // --- Pointer handlers wired to the whole grid -----------------------

  function onPointerDown(e: React.PointerEvent) {
    if (!puzzle || won) return;
    const pos = cellFromPoint(e.clientX, e.clientY);
    if (!pos) return;
    // Capture future move/up events even if the finger leaves the cell.
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDragStart(pos);
    setDragCells([pos]);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart) return;
    const pos = cellFromPoint(e.clientX, e.clientY);
    if (!pos) return;
    const line = lineBetween(dragStart[0], dragStart[1], pos[0], pos[1]);
    // Only update if it's a valid straight line — keeps the highlight
    // clean as the user wiggles around looking for the right endpoint.
    if (line) setDragCells(line);
  }

  function endDrag() {
    commitSelection(dragCells);
    setDragStart(null);
    setDragCells(null);
  }

  // If the pointer is released outside the grid, still clean up.
  useEffect(() => {
    if (!dragStart) return;
    const onUp = () => endDrag();
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragStart, dragCells]);

  const dragKeys = useMemo(() => {
    const s = new Set<string>();
    dragCells?.forEach(([r, c]) => s.add(ck(r, c)));
    return s;
  }, [dragCells]);

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
      blurb="Swipe across letters — across, down, or diagonal — to spell each word. Lift your finger to lock it in!"
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
                themeIdx === i ? "bg-grape text-white" : "bg-white/8"
              }`}
            >
              {t.emoji} {t.name}
            </button>
          ))}
        </div>

        {won ? (
          <p className="pop tint-lime pop-in px-6 py-3 font-display text-2xl font-bold">
            You found them all! 🎉
          </p>
        ) : null}

        {puzzle ? (
          <div className="pop w-full max-w-[min(94vw,32rem)] bg-paper p-2.5 sm:p-3">
            <div
              ref={gridRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              className="grid touch-none select-none gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
              }}
            >
              {puzzle.grid.map((row, r) =>
                row.map((ch, c) => {
                  const key = ck(r, c);
                  const isFound = foundCells.has(key);
                  const isDrag = dragKeys.has(key);
                  const isReveal = revealCells.has(key);
                  return (
                    <div
                      key={key}
                      data-cell={key}
                      className={`flex aspect-square w-full items-center justify-center rounded-md text-[clamp(0.6rem,2.7vw,0.95rem)] font-extrabold transition-colors ${
                        isFound
                          ? "tint-lime"
                          : isDrag
                            ? "sel-bubble"
                            : isReveal
                              ? "tint-sky"
                              : "text-ink/80"
                      }`}
                    >
                      {ch}
                    </div>
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
                className={`rounded-full border px-3 py-1 text-sm font-extrabold ${
                  found.has(w)
                    ? "tint-lime line-through opacity-70"
                    : "border-white/15 bg-white/5 text-muted"
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
