"use client";

import { useEffect, useMemo, useState } from "react";
import Shell from "@/components/Shell";
import { OPINION_QUESTIONS } from "@/lib/data/conversation";
import { loadJSON, saveJSON } from "@/lib/storage";

const KEY = "icebreaker.opinions.v1";

type Answer = {
  id: string;
  qid: string;
  question: string;
  side: "A" | "B";
  sideLabel: string;
  why: string;
  ts: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ConversationPage() {
  const [order, setOrder] = useState<number[]>(() =>
    OPINION_QUESTIONS.map((_, i) => i),
  );
  const [pos, setPos] = useState(0);
  const [side, setSide] = useState<"A" | "B" | null>(null);
  const [why, setWhy] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setOrder(shuffle(OPINION_QUESTIONS.map((_, i) => i)));
    setAnswers(loadJSON<Answer[]>(KEY, []));
  }, []);

  const q = OPINION_QUESTIONS[order[pos]] ?? OPINION_QUESTIONS[0];

  const tally = useMemo(() => {
    const mine = answers.filter((a) => a.qid === q.id);
    const a = mine.filter((m) => m.side === "A").length;
    const b = mine.filter((m) => m.side === "B").length;
    return { a, b, total: a + b };
  }, [answers, q.id]);

  function persist(list: Answer[]) {
    setAnswers(list);
    saveJSON(KEY, list);
  }

  function save() {
    if (!side) return;
    const entry: Answer = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      qid: q.id,
      question: q.question,
      side,
      sideLabel: side === "A" ? q.sideA : q.sideB,
      why: why.trim(),
      ts: Date.now(),
    };
    persist([entry, ...answers]);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1600);
  }

  function next() {
    setSide(null);
    setWhy("");
    setJustSaved(false);
    setPos((p) => {
      const np = p + 1;
      if (np >= order.length) {
        setOrder(shuffle(OPINION_QUESTIONS.map((_, i) => i)));
        return 0;
      }
      return np;
    });
  }

  function clearAll() {
    if (typeof window !== "undefined" && window.confirm("Clear all saved answers?")) {
      persist([]);
    }
  }

  const pctA = tally.total ? Math.round((tally.a / tally.total) * 100) : 0;
  const pctB = tally.total ? 100 - pctA : 0;

  return (
    <Shell
      emoji="💬"
      title="Conversation Starters"
      accent="bg-bubble"
      blurb="Pick a side and say WHY out loud — that's the conversation. Your answer gets saved so you can compare with friends."
    >
      <div className="flex flex-col items-center gap-6">
        <div
          key={`q-${pos}`}
          className="pop pop-in w-full max-w-2xl bg-paper p-7 text-center sm:p-9"
        >
          <div className="float mb-2 text-4xl" aria-hidden>
            {q.emoji}
          </div>
          <p className="text-xl font-extrabold leading-snug sm:text-3xl">
            {q.question}
          </p>
        </div>

        <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {(["A", "B"] as const).map((s) => {
            const label = s === "A" ? q.sideA : q.sideB;
            const active = side === s;
            return (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`chip px-5 py-5 text-lg font-extrabold ${
                  active
                    ? s === "A"
                      ? "bg-sky"
                      : "bg-tangerine"
                    : "bg-paper"
                }`}
              >
                {active ? "✔ " : ""}
                {label}
              </button>
            );
          })}
        </div>

        {side ? (
          <div className="pop pop-in w-full max-w-2xl bg-sun p-5">
            <label
              htmlFor="why"
              className="mb-2 block font-display text-lg font-bold"
            >
              Why “{side === "A" ? q.sideA : q.sideB}”? 🗣️
            </label>
            <textarea
              id="why"
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={3}
              placeholder="Say it out loud to a friend first… then jot the short version here."
              className="w-full resize-none rounded-xl border-[3px] border-ink bg-paper p-3 font-semibold outline-none focus:bg-white"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button className="btn bg-lime" onClick={save}>
                Save my answer 💾
              </button>
              {justSaved ? (
                <span className="pop-in font-display font-bold">
                  Saved! 🎉
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* live results for this question */}
        {tally.total > 0 ? (
          <div className="pop w-full max-w-2xl bg-paper p-5">
            <p className="mb-3 font-display text-lg font-bold">
              The results so far ({tally.total})
            </p>
            <div className="space-y-3">
              <Bar label={q.sideA} pct={pctA} count={tally.a} color="bg-sky" />
              <Bar
                label={q.sideB}
                pct={pctB}
                count={tally.b}
                color="bg-tangerine"
              />
            </div>
          </div>
        ) : null}

        <button className="btn bg-bubble text-lg" onClick={next}>
          Next question ➡️
        </button>

        {/* answers wall */}
        {answers.length > 0 ? (
          <div className="w-full max-w-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl">📋 Answer wall ({answers.length})</h2>
              <button className="btn btn-sm bg-cherry text-paper" onClick={clearAll}>
                Clear all
              </button>
            </div>
            <div className="space-y-3">
              {answers.slice(0, 25).map((a) => (
                <div key={a.id} className="pop bg-paper p-4">
                  <p className="text-sm font-extrabold opacity-70">
                    {a.question}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold">
                    <span
                      className={`mr-2 inline-block rounded-full border-[3px] border-ink px-2 py-0.5 text-sm ${
                        a.side === "A" ? "bg-sky" : "bg-tangerine"
                      }`}
                    >
                      {a.sideLabel}
                    </span>
                  </p>
                  {a.why ? (
                    <p className="mt-1 font-semibold">“{a.why}”</p>
                  ) : (
                    <p className="mt-1 text-sm font-semibold italic opacity-50">
                      (said out loud — not typed)
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function Bar({
  label,
  pct,
  count,
  color,
}: {
  label: string;
  pct: number;
  count: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-extrabold">
        <span>{label}</span>
        <span>
          {count} · {pct}%
        </span>
      </div>
      <div className="h-6 w-full overflow-hidden rounded-full border-[3px] border-ink bg-white">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
