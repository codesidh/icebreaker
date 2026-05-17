"use client";

import { useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";

const MOVES = [
  { id: "rock", emoji: "✊", label: "Rock" },
  { id: "paper", emoji: "✋", label: "Paper" },
  { id: "scissors", emoji: "✌️", label: "Scissors" },
] as const;

type MoveId = (typeof MOVES)[number]["id"];

const BEATS: Record<MoveId, MoveId> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const WIN_AT = 3; // best of 5

export default function RpsPage() {
  const [you, setYou] = useState<MoveId | null>(null);
  const [cpu, setCpu] = useState<MoveId | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "tie" | null>(null);
  const [score, setScore] = useState({ you: 0, cpu: 0 });
  const [wins, setWins] = useState(0);

  const matchOver = score.you >= WIN_AT || score.cpu >= WIN_AT;

  function play(move: MoveId) {
    if (matchOver) return;
    const c = MOVES[Math.floor(Math.random() * 3)].id;
    setYou(move);
    setCpu(c);

    let r: "win" | "lose" | "tie";
    if (move === c) r = "tie";
    else if (BEATS[move] === c) r = "win";
    else r = "lose";
    setResult(r);

    if (r === "win") {
      setScore((s) => {
        const ns = { ...s, you: s.you + 1 };
        if (ns.you >= WIN_AT) setWins((w) => w + 1);
        return ns;
      });
    } else if (r === "lose") {
      setScore((s) => ({ ...s, cpu: s.cpu + 1 }));
    }
  }

  function reset() {
    setYou(null);
    setCpu(null);
    setResult(null);
    setScore({ you: 0, cpu: 0 });
  }

  const msg = matchOver
    ? score.you >= WIN_AT
      ? "You win the match! 🏆"
      : "Computer wins the match 🤖"
    : result === "win"
      ? "You won that round! 🎉"
      : result === "lose"
        ? "Computer won that round"
        : result === "tie"
          ? "Tie — go again!"
          : "Pick your move";

  return (
    <Shell
      emoji="✊"
      title="Rock Paper Scissors"
      accent="bg-mint"
      blurb="First to 3 wins the match. Rock beats scissors, scissors beat paper, paper beats rock."
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3 font-display font-bold">
          <span className="pop tint-lime px-6 py-2 text-center">
            <div className="text-2xl">{score.you}</div>
            <div className="text-xs uppercase">You</div>
          </span>
          <span className="pop tint-cherry px-6 py-2 text-center">
            <div className="text-2xl">{score.cpu}</div>
            <div className="text-xs uppercase">Computer</div>
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="pop flex aspect-square w-[min(26vw,7rem)] items-center justify-center text-[min(13vw,3.5rem)]">
            <span className={you ? "pop-in" : "opacity-30"}>
              {you ? MOVES.find((m) => m.id === you)!.emoji : "❔"}
            </span>
          </div>
          <span className="font-display text-2xl font-bold">vs</span>
          <div className="pop flex aspect-square w-[min(26vw,7rem)] items-center justify-center text-[min(13vw,3.5rem)]">
            <span className={cpu ? "pop-in" : "opacity-30"}>
              {cpu ? MOVES.find((m) => m.id === cpu)!.emoji : "❔"}
            </span>
          </div>
        </div>

        <p className="pop tint-sky px-6 py-2 font-display text-lg font-bold">
          {msg}
        </p>

        <div className="flex gap-3">
          {MOVES.map((m) => (
            <button
              key={m.id}
              onClick={() => play(m.id)}
              disabled={matchOver}
              className="chip flex aspect-square w-[min(26vw,6rem)] flex-col items-center justify-center gap-1 disabled:opacity-40"
            >
              <span className="text-4xl">{m.emoji}</span>
              <span className="text-xs font-extrabold uppercase">
                {m.label}
              </span>
            </button>
          ))}
        </div>

        <button className="btn bg-mint text-lg" onClick={reset}>
          New match 🔄
        </button>
      </div>
    </Shell>
  );
}
