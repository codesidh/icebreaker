"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { canMove, generateMaze, type Maze } from "@/lib/games/maze";

type Level = { id: "easy" | "medium" | "hard"; label: string; size: number };

const LEVELS: Level[] = [
  { id: "easy", label: "🙂 Easy", size: 8 },
  { id: "medium", label: "😎 Medium", size: 12 },
  { id: "hard", label: "🔥 Hard", size: 16 },
];

type Dir = "n" | "e" | "s" | "w";

export default function MazePage() {
  const [levelId, setLevelId] = useState<Level["id"]>("easy");
  const level = useMemo(
    () => LEVELS.find((l) => l.id === levelId) ?? LEVELS[0],
    [levelId],
  );

  const [maze, setMaze] = useState<Maze | null>(null);
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [moves, setMoves] = useState(0);
  const [wins, setWins] = useState(0);

  // For swipe input — capture where the touch started so we can pick
  // a direction on touch-end.
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const reset = useCallback((size: number) => {
    setMaze(generateMaze(size, size));
    setPos([0, 0]);
    setMoves(0);
  }, []);

  useEffect(() => {
    reset(level.size);
  }, [level, reset]);

  const won = !!maze && pos[0] === maze.goal[0] && pos[1] === maze.goal[1];

  useEffect(() => {
    if (won) setWins((w) => w + 1);
  }, [won]);

  const step = useCallback(
    (d: Dir) => {
      if (!maze || won) return;
      setPos(([r, c]) => {
        if (!canMove(maze, r, c, d)) return [r, c];
        const deltas: Record<Dir, [number, number]> = {
          n: [-1, 0],
          s: [1, 0],
          e: [0, 1],
          w: [0, -1],
        };
        const [dr, dc] = deltas[d];
        setMoves((m) => m + 1);
        return [r + dr, c + dc];
      });
    },
    [maze, won],
  );

  // Keyboard: arrow keys + WASD.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, Dir> = {
        ArrowUp: "n",
        ArrowDown: "s",
        ArrowLeft: "w",
        ArrowRight: "e",
        w: "n",
        W: "n",
        s: "s",
        S: "s",
        a: "w",
        A: "w",
        d: "e",
        D: "e",
      };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      step(d);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    // 18px threshold — ignore taps and tiny drifts.
    if (Math.max(ax, ay) < 18) return;
    if (ax > ay) step(dx > 0 ? "e" : "w");
    else step(dy > 0 ? "s" : "n");
  }

  // ---- Render ---------------------------------------------------------
  // Cell size is computed in CSS via the grid, but we draw walls with
  // inline borders so the maze always looks crisp at every level.

  return (
    <Shell
      emoji="🧭"
      title="Maze"
      accent="bg-grape"
      blurb="Find your way from the start (🟣) to the finish (🏁). Use arrow keys, WASD, the on-screen pad, or swipe!"
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevelId(l.id)}
              className={`btn btn-sm ${
                levelId === l.id ? "bg-grape text-white" : "bg-white/8"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm font-extrabold">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
            Moves: {moves}
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
            {level.size} × {level.size}
          </span>
        </div>

        {won ? (
          <p className="pop tint-lime pop-in px-6 py-3 font-display text-2xl font-bold">
            🏁 You made it in {moves} moves!
          </p>
        ) : null}

        {maze ? (
          <div
            className="pop bg-paper p-2 sm:p-3"
            style={{ width: "min(94vw, 32rem)" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="grid touch-none select-none"
              style={{
                gridTemplateColumns: `repeat(${maze.cols}, minmax(0, 1fr))`,
              }}
              aria-label="Maze"
            >
              {maze.cells.map((row, r) =>
                row.map((cell, c) => {
                  const isPlayer = pos[0] === r && pos[1] === c;
                  const isGoal =
                    maze.goal[0] === r && maze.goal[1] === c;
                  const isStart =
                    maze.start[0] === r && maze.start[1] === c;
                  const wall = "2px solid var(--color-ink)";
                  const open = "2px solid transparent";
                  return (
                    <div
                      key={`${r},${c}`}
                      className="flex aspect-square items-center justify-center text-xs sm:text-sm"
                      style={{
                        borderTop: cell.n ? wall : open,
                        borderRight: cell.e ? wall : open,
                        borderBottom: cell.s ? wall : open,
                        borderLeft: cell.w ? wall : open,
                        background: isPlayer
                          ? "color-mix(in srgb, var(--color-grape) 55%, transparent)"
                          : isGoal
                            ? "color-mix(in srgb, var(--color-lime) 35%, transparent)"
                            : isStart
                              ? "color-mix(in srgb, var(--color-sky) 18%, transparent)"
                              : "transparent",
                        boxShadow: isPlayer
                          ? "0 0 0 2px var(--color-grape), 0 0 14px -2px var(--color-grape)"
                          : undefined,
                      }}
                      aria-label={
                        isPlayer
                          ? "You are here"
                          : isGoal
                            ? "Finish"
                            : undefined
                      }
                    >
                      {isGoal && !isPlayer ? "🏁" : null}
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        ) : (
          <p className="font-bold">Building maze…</p>
        )}

        {/* Directional pad — handy on mobile, redundant on desktop. */}
        <div className="grid grid-cols-3 gap-2">
          <span />
          <button
            className="chip h-14 w-14 text-2xl font-extrabold"
            onClick={() => step("n")}
            aria-label="Move up"
          >
            ↑
          </button>
          <span />
          <button
            className="chip h-14 w-14 text-2xl font-extrabold"
            onClick={() => step("w")}
            aria-label="Move left"
          >
            ←
          </button>
          <button
            className="chip h-14 w-14 text-2xl font-extrabold"
            onClick={() => step("s")}
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            className="chip h-14 w-14 text-2xl font-extrabold"
            onClick={() => step("e")}
            aria-label="Move right"
          >
            →
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button className="btn bg-grape" onClick={() => reset(level.size)}>
            New maze 🔄
          </button>
        </div>
      </div>
    </Shell>
  );
}
