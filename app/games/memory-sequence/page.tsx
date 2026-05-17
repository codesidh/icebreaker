"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { loadJSON, saveJSON } from "@/lib/storage";

type Phase = "idle" | "watch" | "input" | "over";

const BEST_KEY = "icebreaker.sequence.best";

// 4 pads — color + a gentle tone so it trains ear + eye memory.
const PADS = [
  { color: "var(--color-sky)", tone: 329.63 },
  { color: "var(--color-sun)", tone: 392.0 },
  { color: "var(--color-lime)", tone: 440.0 },
  { color: "var(--color-bubble)", tone: 523.25 },
];

export default function MemorySequencePage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seq, setSeq] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [inputAt, setInputAt] = useState(0);
  const [best, setBest] = useState(0);
  const [confetti, setConfetti] = useState(0);

  const seqRef = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    setBest(loadJSON<number>(BEST_KEY, 0));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  function beep(i: number) {
    try {
      if (!audio.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audio.current = new Ctx();
      }
      const ctx = audio.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = PADS[i].tone;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.34);
    } catch {
      /* audio not available — the game still works visually */
    }
  }

  const flash = useCallback((i: number) => {
    setActive(i);
    beep(i);
    const t = setTimeout(() => setActive(null), 380);
    timers.current.push(t);
  }, []);

  const playback = useCallback(
    (sequence: number[]) => {
      setPhase("watch");
      clearTimers();
      sequence.forEach((pad, idx) => {
        const on = setTimeout(() => flash(pad), 650 * idx + 400);
        timers.current.push(on);
      });
      const done = setTimeout(
        () => {
          setPhase("input");
          setInputAt(0);
        },
        650 * sequence.length + 400,
      );
      timers.current.push(done);
    },
    [clearTimers, flash],
  );

  const nextRound = useCallback(
    (current: number[]) => {
      const grown = [...current, Math.floor(Math.random() * 4)];
      seqRef.current = grown;
      setSeq(grown);
      const t = setTimeout(() => playback(grown), 500);
      timers.current.push(t);
    },
    [playback],
  );

  const start = useCallback(() => {
    clearTimers();
    setConfetti(0);
    seqRef.current = [];
    setSeq([]);
    nextRound([]);
  }, [clearTimers, nextRound]);

  function tap(i: number) {
    if (phase !== "input") return;
    flash(i);
    const expected = seqRef.current[inputAt];
    if (i !== expected) {
      clearTimers();
      const reached = seqRef.current.length - 1; // last full round cleared
      setPhase("over");
      if (reached > best) {
        saveJSON(BEST_KEY, reached);
        setBest(reached);
      }
      return;
    }
    const nextAt = inputAt + 1;
    if (nextAt === seqRef.current.length) {
      // round cleared!
      if (seqRef.current.length % 5 === 0) setConfetti((c) => c + 1);
      setPhase("watch");
      const t = setTimeout(() => nextRound(seqRef.current), 600);
      timers.current.push(t);
    } else {
      setInputAt(nextAt);
    }
  }

  const level = seq.length;
  const cleared = phase === "over" ? seq.length - 1 : level;

  return (
    <Shell
      emoji="🎵"
      title="Memory Sequence"
      accent="bg-grape"
      blurb="Watch the pattern light up, then repeat it. It gets one step longer each round — a real workout for your memory!"
    >
      <Confetti seed={confetti} />
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3 font-display font-bold">
          <span className="pop px-5 py-2">
            Round: {phase === "idle" ? 0 : level}
          </span>
          <span className="pop px-5 py-2">Best: {best}</span>
        </div>

        <p className="pop px-6 py-2 text-center font-display font-bold">
          {phase === "idle"
            ? "Press Start, then watch closely 👀"
            : phase === "watch"
              ? "Watch the pattern… 👀"
              : phase === "input"
                ? `Your turn — repeat it! (${inputAt}/${seq.length})`
                : `Game over — you reached round ${cleared} 🧠`}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {PADS.map((p, i) => {
            const lit = active === i;
            return (
              <button
                key={i}
                onClick={() => tap(i)}
                disabled={phase !== "input"}
                aria-label={`Pad ${i + 1}`}
                className="rounded-2xl border border-white/15 transition-all duration-150 disabled:cursor-default"
                style={{
                  width: "min(38vw, 9.5rem)",
                  height: "min(38vw, 9.5rem)",
                  background: p.color,
                  opacity: lit ? 1 : 0.34,
                  transform: lit ? "scale(0.96)" : "scale(1)",
                  boxShadow: lit
                    ? `0 0 0 3px rgba(255,255,255,0.5), 0 16px 40px -8px ${p.color}`
                    : "inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              />
            );
          })}
        </div>

        {phase === "idle" || phase === "over" ? (
          <button className="btn bg-grape text-white text-lg" onClick={start}>
            {phase === "over" ? "Play again 🔄" : "Start 🎬"}
          </button>
        ) : null}
      </div>
    </Shell>
  );
}
