"use client";

import { useCallback, useEffect, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";

const FACES = ["🦊", "🐼", "🐸", "🐙", "🦄", "🐝", "🐢", "🦋"];

type Card = { id: number; face: string; flipped: boolean; matched: boolean };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function freshDeck(): Card[] {
  return shuffle(
    [...FACES, ...FACES].map((face, i) => ({
      id: i,
      face,
      flipped: false,
      matched: false,
    })),
  );
}

function orderedDeck(): Card[] {
  return [...FACES, ...FACES].map((face, i) => ({
    id: i,
    face,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryPage() {
  const [cards, setCards] = useState<Card[]>(orderedDeck);
  const [picks, setPicks] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [wins, setWins] = useState(0);

  const reset = useCallback(() => {
    setCards(freshDeck());
    setPicks([]);
    setMoves(0);
    setLock(false);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  const won = cards.length > 0 && cards.every((c) => c.matched);

  useEffect(() => {
    if (won) setWins((w) => w + 1);
  }, [won]);

  function flip(idx: number) {
    if (lock || cards[idx].flipped || cards[idx].matched) return;
    const next = cards.map((c, i) =>
      i === idx ? { ...c, flipped: true } : c,
    );
    const open = [...picks, idx];
    setCards(next);
    setPicks(open);

    if (open.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = open;
      if (next[a].face === next[b].face) {
        setTimeout(() => {
          setCards((cs) =>
            cs.map((c, i) =>
              i === a || i === b ? { ...c, matched: true } : c,
            ),
          );
          setPicks([]);
          setLock(false);
        }, 420);
      } else {
        setTimeout(() => {
          setCards((cs) =>
            cs.map((c, i) =>
              i === a || i === b ? { ...c, flipped: false } : c,
            ),
          );
          setPicks([]);
          setLock(false);
        }, 850);
      }
    }
  }

  return (
    <Shell
      emoji="🧩"
      title="Memory Match"
      accent="bg-bubble"
      blurb="Flip two cards. If they match, they stay. Find all 8 pairs in as few moves as you can!"
    >
      <Confetti seed={wins} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3 font-display font-bold">
          <span className="pop tint-sun px-5 py-2">Moves: {moves}</span>
          <span className="pop tint-lime px-5 py-2">
            Pairs: {cards.filter((c) => c.matched).length / 2} / {FACES.length}
          </span>
        </div>

        {won ? (
          <p className="pop tint-lime pop-in px-6 py-3 font-display text-2xl font-bold">
            You matched them all in {moves} moves! 🎉
          </p>
        ) : null}

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card, i) => {
            const up = card.flipped || card.matched;
            return (
              <button
                key={card.id}
                onClick={() => flip(i)}
                disabled={up || lock}
                className={`chip flex aspect-square w-[min(20vw,5.5rem)] items-center justify-center text-[min(9vw,2.5rem)] ${
                  card.matched
                    ? "sel-lime"
                    : up
                      ? "bg-white/[0.07]"
                      : "tint-grape"
                }`}
              >
                <span className={up ? "pop-in" : ""}>
                  {up ? card.face : "❓"}
                </span>
              </button>
            );
          })}
        </div>

        <button className="btn bg-bubble text-lg" onClick={reset}>
          Shuffle &amp; restart 🔄
        </button>
      </div>
    </Shell>
  );
}
