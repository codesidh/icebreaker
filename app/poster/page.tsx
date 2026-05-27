"use client";

import type { ReactNode } from "react";
import { TEAM, SCHOOL } from "@/lib/credits";

// ─────────────────────────────────────────────────────────────
//  ✏️  Team names & school live in lib/credits.ts (one place,
//  shared with the website footer).
//  The live website your QR code points to:
const LIVE_URL = "ambitious-desert-027b7dd0f.7.azurestaticapps.net";
// ─────────────────────────────────────────────────────────────

// The board is PRINTED, so it uses fixed paper-friendly colors
// (white panels, dark ink) independent of the app's dark theme.
const INK = "#1d1b30";
const MUTED = "#5d5a72";
const C = {
  grape: "#5b5bd6",
  sky: "#2e90fa",
  mint: "#11b3a3",
  lime: "#2fb24d",
  sun: "#e0902b",
  tangerine: "#f5803e",
  bubble: "#e85aa0",
  cherry: "#e5484d",
};

// Each panel prints as its OWN full portrait page (3 sheets total).
// Lay the 3 sheets side-by-side on the trifold board.
const PRINT_CSS = `
@media print {
  @page { size: Letter portrait; margin: 9mm; }
  html, body { background:#fff !important; }
  .no-print { display:none !important; }
  .stage { background:#fff !important; padding:0 !important; }

  /* Break the on-screen grid: one panel per page, stacked. */
  .board {
    display:block !important;
    box-shadow:none !important;
    margin:0 !important;
    width:100% !important;
    max-width:none !important;
    gap:0 !important;
  }

  /* Each panel fills one full sheet, never splits across pages. */
  .panel {
    break-after: page;
    break-inside: avoid;
    box-shadow:none !important;
    border-radius:0 !important;
    min-height: 257mm;          /* ≈ Letter portrait printable height */
    margin:0 !important;
  }
  .panel:last-of-type { break-after: auto; }

  /* Spread the blocks so the page looks full and big. */
  .panel-body {
    flex: 1 1 auto;
    justify-content: space-between;
    padding-left: 12mm !important;
    padding-right: 12mm !important;
  }
  .panel-eyebrow { padding-top: 9px !important; padding-bottom: 9px !important; }

  /* Bigger type — readable across a room when on the board. */
  .board h2 { font-size: 2.05rem !important; }
  .board h3 { font-size: 1.4rem !important; }
  .blk-body { font-size: 1.08rem !important; line-height: 1.4 !important; }
  .panel-foot { font-size: 0.95rem !important; }
  .qr-img { height: 64mm !important; width: 64mm !important; }
  .lead { font-size: 1rem !important; }

  .board, .board * {
    -webkit-print-color-adjust:exact !important;
    print-color-adjust:exact !important;
  }
}
`;

function Block({
  icon,
  title,
  children,
  color,
}: {
  icon: string;
  title: string;
  children: ReactNode;
  color: string;
}) {
  return (
    <section
      style={{
        background: "#fbfaff",
        border: "1px solid rgba(29,27,48,0.08)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <h3
        className="mb-1.5 flex items-center gap-2 font-display text-lg font-bold"
        style={{ color: INK }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-base"
          style={{ background: `color-mix(in srgb, ${color} 18%, white)` }}
          aria-hidden
        >
          {icon}
        </span>
        {title}
      </h3>
      <div
        className="blk-body text-[0.92rem] font-semibold leading-snug"
        style={{ color: INK }}
      >
        {children}
      </div>
    </section>
  );
}

function Panel({
  accent,
  eyebrow,
  children,
}: {
  accent: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div
      className="panel flex flex-col overflow-hidden rounded-2xl"
      style={{
        background: "#ffffff",
        boxShadow: "0 24px 50px -28px rgba(0,0,0,0.6)",
      }}
    >
      <div
        className="panel-eyebrow px-5 py-2 text-center font-display text-sm font-bold uppercase tracking-[0.2em]"
        style={{ background: accent, color: "#fff" }}
      >
        {eyebrow}
      </div>
      <div className="panel-body flex flex-1 flex-col gap-3 px-5 pt-3">
        <div className="flex flex-1 flex-col gap-3">{children}</div>
        {/* Slim credit band — same on every page, reads as one
            continuous strip across the trifold. */}
        <div
          className="panel-foot mt-3 rounded-xl px-4 py-2 text-center font-display text-xs font-bold"
          style={{ background: INK, color: "#fff" }}
        >
          Made by {TEAM} · {SCHOOL} · Built with Next.js, hosted on Azure 💛
        </div>
      </div>
    </div>
  );
}

export default function PosterPage() {
  return (
    <>
      <style>{PRINT_CSS}</style>

      {/* ---- Controls (screen only) ---- */}
      <div className="no-print mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <div className="pop flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl">🖼️ Your trifold project board</h1>
            <p className="mt-1 text-sm font-semibold text-muted">
              Prints as <b>3 separate pages — one full page per panel</b>.
              Click print, choose <b>Portrait</b>, set <b>Margins: Default</b>{" "}
              and turn <b>Background graphics ON</b>. Print all 3 sheets and
              place them side-by-side on your trifold board.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a href="/" className="btn btn-sm bg-white/8">
              ← Back to app
            </a>
            <button
              className="btn bg-grape text-white"
              onClick={() => window.print()}
              style={{ boxShadow: "0 14px 32px -12px var(--color-grape)" }}
            >
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-muted">
          Tip: open <code>app/poster/page.tsx</code> to type your real team
          names — it’s marked at the top. On screen the 3 panels sit
          side-by-side so you can preview the whole board.
        </p>
      </div>

      {/* ---- The board (always paper-colored so it prints clean) ---- */}
      <div className="stage px-4 pb-12 sm:px-6">
        <div
          className="board mx-auto grid w-full max-w-6xl items-stretch gap-5 md:grid-cols-3"
          style={{ color: INK }}
        >
          {/* PAGE 1 — the idea */}
          <Panel accent={C.sky} eyebrow="Science Fair Project">
            <div className="text-center">
              <div className="text-6xl">🧊</div>
              <div className="font-display text-4xl font-bold">Icebreaker</div>
              <p className="lead text-sm font-bold" style={{ color: MUTED }}>
                A friendly way to make friends
              </p>
            </div>

            <Block icon="❓" title="The Problem" color={C.cherry}>
              Being new at school — or sitting alone at lunch — is hard. People
              want to talk, but they don’t know how to start.
            </Block>

            <Block icon="💡" title="Our Idea" color={C.sun}>
              A free app that hands you an easy first move: a joke, a riddle, a
              big question, or a quick game you can play with someone.
            </Block>

            <Block icon="🙋" title="Who It Helps" color={C.mint}>
              New students, anyone eating alone, and shy people who want to
              make a friend but need a little help starting.
            </Block>
          </Panel>

          {/* PAGE 2 — try it now */}
          <Panel accent={C.grape} eyebrow="Try It Right Now">
            <div className="text-center">
              <h2 className="text-2xl leading-tight">Scan it on your phone 📱</h2>
              <p className="lead mt-1 text-sm font-bold" style={{ color: MUTED }}>
                Works on any phone, tablet, or computer.
                <br />
                No download. No sign-up.
              </p>
            </div>

            <div
              className="mx-auto rounded-2xl bg-white p-3"
              style={{ border: "1px solid rgba(29,27,48,0.12)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qr.svg"
                alt="QR code — scan to open the Icebreaker app"
                className="qr-img mx-auto block h-52 w-52"
              />
            </div>

            <div
              className="rounded-xl px-3 py-2 text-center font-display text-sm font-bold"
              style={{ background: C.grape, color: "#fff" }}
            >
              {LIVE_URL}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              {["🆓 Free", "📵 No login", "🎮 11 games"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg px-2 py-2"
                  style={{
                    background: "#fbfaff",
                    border: "1px solid rgba(29,27,48,0.08)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <Block icon="🧪" title="We Tested It" color={C.tangerine}>
              We tried Icebreaker with students <i>and</i> teachers at our
              school and used their feedback to make it better.
            </Block>
          </Panel>

          {/* PAGE 3 — how it works + tech */}
          <Panel accent={C.tangerine} eyebrow="How It Works">
            <Block icon="🧊" title="Break the Ice" color={C.sky}>
              <ul className="ml-4 list-disc space-y-0.5">
                <li>Jokes &amp; riddles to get a laugh</li>
                <li>Surprising trivia facts</li>
                <li>
                  Conversation questions — pick a side, say <i>why</i>, and the
                  app saves &amp; tallies answers
                </li>
              </ul>
            </Block>

            <Block icon="🎮" title="Play &amp; Think" color={C.bubble}>
              11 original games — Tic-Tac-Toe, Count&nbsp;to&nbsp;21, Word
              Search, Sudoku, Memory Match, Hangman, Rock&nbsp;Paper&nbsp;Scissors,
              Maze, and learning games: Math&nbsp;Sprint, Memory&nbsp;Sequence,
              Slide&nbsp;Puzzle. <b>No copied games.</b>
            </Block>

            <Block icon="☁️" title="We Used the Cloud" color={C.grape}>
              Code lives on <b>GitHub</b>. The website runs on{" "}
              <b>Microsoft Azure</b>. When we change the code, it updates the
              live site <i>all by itself</i>.
            </Block>

            <Block icon="🚀" title="What’s Next" color={C.lime}>
              More questions, more games, and letting friends compare their
              answers across phones.
            </Block>
          </Panel>
        </div>
      </div>
    </>
  );
}
