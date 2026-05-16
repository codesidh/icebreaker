"use client";

import { useCallback, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import {
  bestMove,
  isFull,
  winner,
  type Board,
  type Difficulty,
} from "@/lib/games/ticTacToe";

const HUMAN = "X";
const AI = "O";

const LEVELS: { id: Difficulty; label: string }[] = [
  { id: "chill", label: "😌 Chill" },
  { id: "tricky", label: "😏 Tricky" },
  { id: "boss", label: "🤖 Boss" },
];

export default function TicTacToePage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(""));
  const [turn, setTurn] = useState<"human" | "ai">("human");
  const [difficulty, setDifficulty] = useState<Difficulty>("tricky");
  const [score, setScore] = useState({ you: 0, ai: 0, draw: 0 });
  const [wins, setWins] = useState(0);

  const result = winner(board);
  const over = !!result || isFull(board);

  const reset = useCallback(() => {
    setBoard(Array(9).fill(""));
    setTurn("human");
  }, []);

  // Computer's turn.
  useEffect(() => {
    if (turn !== "ai" || over) return;
    const t = setTimeout(() => {
      setBoard((b) => {
        if (winner(b) || isFull(b)) return b;
        const move = bestMove(b, AI, HUMAN, difficulty);
        if (move < 0) return b;
        const nb = [...b];
        nb[move] = AI;
        return nb;
      });
      setTurn("human");
    }, 450);
    return () => clearTimeout(t);
  }, [turn, over, difficulty]);

  // Tally a finished game once.
  useEffect(() => {
    if (!over) return;
    if (result?.mark === HUMAN) {
      setScore((s) => ({ ...s, you: s.you + 1 }));
      setWins((w) => w + 1);
    } else if (result?.mark === AI) {
      setScore((s) => ({ ...s, ai: s.ai + 1 }));
    } else {
      setScore((s) => ({ ...s, draw: s.draw + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over]);

  function play(i: number) {
    if (board[i] || over || turn !== "human") return;
    const nb = [...board];
    nb[i] = HUMAN;
    setBoard(nb);
    setTurn("ai");
  }

  const status = result
    ? result.mark === HUMAN
      ? "You win! 🎉"
      : "Computer wins 🤖"
    : isFull(board)
      ? "It's a draw 🤝"
      : turn === "human"
        ? "Your move (❌)"
        : "Computer thinking…";

  return (
    <Shell
      emoji="❌"
      title="Tic-Tac-Toe"
      accent="bg-sky"
      blurb="You're ❌, the computer is ⭕. Three in a row wins. Start on Chill, then try to beat the Boss!"
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setDifficulty(l.id);
                reset();
              }}
              className={`btn btn-sm ${
                difficulty === l.id ? "bg-grape text-paper" : "bg-paper"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="pop bg-sun px-6 py-2 font-display text-lg font-bold">
          {status}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, i) => {
            const highlight = result?.line.includes(i);
            return (
              <button
                key={i}
                onClick={() => play(i)}
                disabled={!!cell || over || turn !== "human"}
                className={`chip flex h-24 w-24 items-center justify-center text-5xl font-extrabold sm:h-28 sm:w-28 ${
                  highlight ? "bg-lime" : "bg-paper"
                } ${cell === "X" ? "text-bubble" : "text-sky"}`}
              >
                <span className={cell ? "pop-in" : ""}>{cell}</span>
              </button>
            );
          })}
        </div>

        <button className="btn bg-bubble text-lg" onClick={reset}>
          New round 🔄
        </button>

        <div className="flex gap-3 text-center font-display font-bold">
          <Stat label="You" value={score.you} color="bg-lime" />
          <Stat label="Draws" value={score.draw} color="bg-sun" />
          <Stat label="Computer" value={score.ai} color="bg-cherry" />
        </div>
      </div>
    </Shell>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`pop ${color} px-5 py-2`}>
      <div className="text-2xl">{value}</div>
      <div className="text-xs uppercase tracking-wide">{label}</div>
    </div>
  );
}
