"use client";

import type { CSSProperties } from "react";

// ─────────────────────────────────────────────────────────────
//  ✏️  KIDS: put your names here — they show on the board.
const TEAM = "Add your team names here";
const SCHOOL = "Add your school / class here";
//  The live website your QR code points to:
const LIVE_URL = "ambitious-desert-027b7dd0f.7.azurestaticapps.net";
// ─────────────────────────────────────────────────────────────

const PRINT_CSS = `
@media print {
  @page { size: Letter landscape; margin: 8mm; }
  html, body { background:#fff !important; }
  .no-print { display:none !important; }
  .board { box-shadow:none !important; border:none !important; margin:0 !important;
           width:100% !important; max-width:none !important; gap:6mm !important; }
  .panel { break-inside:avoid; box-shadow:none !important; }
  .board, .board * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
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
  children: React.ReactNode;
  color: string;
}) {
  return (
    <section className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
      <h3 className="mb-1.5 flex items-center gap-2 font-display text-lg font-bold">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-base"
          style={{ background: `color-mix(in srgb, ${color} 18%, white)` }}
          aria-hidden
        >
          {icon}
        </span>
        {title}
      </h3>
      <div className="text-[0.92rem] font-semibold leading-snug text-ink/90">
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
  children: React.ReactNode;
}) {
  return (
    <div className="panel pop flex flex-col gap-3 overflow-hidden p-0">
      <div
        className="px-5 py-2 text-center font-display text-sm font-bold uppercase tracking-[0.2em] text-white"
        style={{ background: accent }}
      >
        {eyebrow}
      </div>
      <div className="flex flex-col gap-3 px-5 pb-5">{children}</div>
    </div>
  );
}

export default function PosterPage() {
  return (
    <>
      <style>{PRINT_CSS}</style>

      {/* ---- Controls (screen only) ---- */}
      <div className="no-print mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <div className="pop flex flex-col gap-4 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl">🖼️ Your trifold project board</h1>
            <p className="mt-1 text-sm font-semibold text-muted">
              Click print, choose <b>Landscape</b> and{" "}
              <b>“Save as PDF”</b> (or print on paper), then cut out the three
              panels and glue them onto your board.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a href="/" className="btn btn-sm bg-white text-ink">
              ← Back to app
            </a>
            <button
              className="btn bg-grape text-white"
              onClick={() => window.print()}
            >
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>
        <p className="mt-3 text-center text-xs font-semibold text-muted">
          Tip: open the file <code>app/poster/page.tsx</code> to type your real
          team names — it’s marked at the top.
        </p>
      </div>

      {/* ---- The board ---- */}
      <div
        className="board mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 sm:px-6 md:grid-cols-3"
        style={
          { ["--g" as string]: "var(--color-grape)" } as CSSProperties
        }
      >
        {/* LEFT — the idea */}
        <Panel accent="var(--color-sky)" eyebrow="Science Fair Project">
          <div className="text-center">
            <div className="text-5xl">🧊</div>
            <div className="font-display text-4xl font-bold">Icebreaker</div>
            <p className="text-sm font-bold text-muted">
              A friendly way to make friends
            </p>
          </div>

          <Block icon="❓" title="The Problem" color="var(--color-cherry)">
            Being new at school — or sitting alone at lunch — is hard. People
            want to talk, but they don’t know how to start.
          </Block>

          <Block icon="💡" title="Our Idea" color="var(--color-sun)">
            A free app that hands you an easy first move: a joke, a riddle, a
            big question, or a quick game you can play with someone.
          </Block>

          <Block icon="🙋" title="Who It Helps" color="var(--color-mint)">
            New students, anyone eating alone, and shy people who want to make
            a friend but need a little help starting.
          </Block>
        </Panel>

        {/* CENTER — try it now */}
        <Panel accent="var(--color-grape)" eyebrow="Try It Right Now">
          <div className="text-center">
            <h2 className="text-2xl leading-tight">
              Scan it on your phone 📱
            </h2>
            <p className="mt-1 text-sm font-bold text-muted">
              Works on any phone, tablet, or computer.
              <br />
              No download. No sign-up.
            </p>
          </div>

          <div className="mx-auto rounded-2xl bg-white p-3 ring-1 ring-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr.svg"
              alt="QR code — scan to open the Icebreaker app"
              className="mx-auto block h-52 w-52"
            />
          </div>

          <div
            className="rounded-xl px-3 py-2 text-center font-display text-sm font-bold text-white"
            style={{ background: "var(--color-grape)" }}
          >
            {LIVE_URL}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
            {["🆓 Free", "📵 No login", "🎮 7 games"].map((t) => (
              <span
                key={t}
                className="rounded-lg bg-white/80 px-2 py-2 ring-1 ring-black/5"
              >
                {t}
              </span>
            ))}
          </div>

          <Block icon="🧪" title="We Tested It" color="var(--color-tangerine)">
            We tried Icebreaker with students <i>and</i> teachers at our
            school and used their feedback to make it better.
          </Block>
        </Panel>

        {/* RIGHT — how it works + tech */}
        <Panel accent="var(--color-tangerine)" eyebrow="How It Works">
          <Block icon="🧊" title="Break the Ice" color="var(--color-sky)">
            <ul className="ml-4 list-disc space-y-0.5">
              <li>Jokes & riddles to get a laugh</li>
              <li>Surprising trivia facts</li>
              <li>
                Conversation questions — pick a side, say <i>why</i>, and the
                app saves & tallies answers
              </li>
            </ul>
          </Block>

          <Block icon="🎮" title="Play & Think" color="var(--color-bubble)">
            7 original games: Tic-Tac-Toe, Count&nbsp;to&nbsp;21, Word Search,
            Sudoku, Memory Match, Hangman, Rock&nbsp;Paper&nbsp;Scissors.{" "}
            <b>No copied games.</b>
          </Block>

          <Block icon="☁️" title="We Used the Cloud" color="var(--color-grape)">
            Code lives on <b>GitHub</b>. The website runs on{" "}
            <b>Microsoft Azure</b>. When we change the code, it updates the
            live site <i>all by itself</i>.
          </Block>

          <Block icon="🚀" title="What’s Next" color="var(--color-lime)">
            More questions, more games, and letting friends compare their
            answers across phones.
          </Block>
        </Panel>

        {/* Footer strip */}
        <div
          className="panel rounded-2xl px-5 py-3 text-center font-display text-sm font-bold text-white md:col-span-3"
          style={{ background: "var(--color-ink)" }}
        >
          Made by {TEAM} · {SCHOOL} · Built with Next.js, hosted on Azure 💛
        </div>
      </div>
    </>
  );
}
