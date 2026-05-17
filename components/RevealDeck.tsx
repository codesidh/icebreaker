"use client";

import { useCallback, useEffect, useState } from "react";

type Item = { prompt: string; answer: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RevealDeck({
  items,
  promptLabel,
  answerLabel,
  revealCta,
  nextCta,
  answerColor,
}: {
  items: Item[];
  promptLabel: string;
  answerLabel: string;
  revealCta: string;
  nextCta: string;
  /** Tailwind bg utility for the revealed answer card. */
  answerColor: string;
}) {
  // Deterministic first render (avoids hydration mismatch), then shuffle.
  const [order, setOrder] = useState<number[]>(() =>
    items.map((_, i) => i),
  );
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState(1);

  useEffect(() => {
    setOrder(shuffle(items.map((_, i) => i)));
  }, [items]);

  const item = items[order[pos]] ?? items[0];

  const next = useCallback(() => {
    setRevealed(false);
    setPos((p) => {
      const np = p + 1;
      if (np >= order.length) {
        setOrder(shuffle(items.map((_, i) => i)));
        return 0;
      }
      return np;
    });
    setSeen((s) => s + 1);
  }, [order.length, items]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="rounded-full border border-white/20 bg-paper px-4 py-1 text-sm font-extrabold">
        #{seen} · {promptLabel}
      </p>

      <div
        key={`q-${pos}`}
        className="pop pop-in w-full max-w-2xl bg-paper p-7 text-center sm:p-10"
      >
        <p className="text-xl font-extrabold leading-snug sm:text-3xl">
          {item.prompt}
        </p>
      </div>

      {revealed ? (
        <div
          key={`a-${pos}`}
          className={`pop pop-in w-full max-w-2xl ${answerColor} p-6 text-center sm:p-8`}
        >
          <p className="mb-1 text-xs font-extrabold uppercase tracking-widest opacity-70">
            {answerLabel}
          </p>
          <p className="text-lg font-extrabold leading-snug sm:text-2xl">
            {item.answer}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {!revealed ? (
          <button
            className="btn bg-sun text-lg"
            onClick={() => setRevealed(true)}
          >
            {revealCta}
          </button>
        ) : (
          <button className="btn bg-sky text-lg" onClick={next}>
            {nextCta}
          </button>
        )}
        {revealed ? (
          <button className="btn btn-sm bg-paper" onClick={next}>
            Skip ⏭️
          </button>
        ) : (
          <button className="btn btn-sm bg-paper" onClick={next}>
            Not this one ⏭️
          </button>
        )}
      </div>
    </div>
  );
}
