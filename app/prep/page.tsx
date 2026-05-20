import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prep Sheet — Icebreaker",
  description:
    "Mithun's prep sheet for presenting the Icebreaker project to friends and teachers.",
  robots: { index: false, follow: false },
};

const OCEAN_LADDER = [
  { emoji: "🐚", name: "Shell", tag: "Brave start" },
  { emoji: "🦀", name: "Crab", tag: "Climbing" },
  { emoji: "🐢", name: "Sea Turtle", tag: "Steady" },
  { emoji: "🐠", name: "Clownfish", tag: "Sharp" },
  { emoji: "🐬", name: "Dolphin", tag: "Brilliant" },
  { emoji: "🦈", name: "Shark", tag: "Perfect!" },
];

const GAMES_LIST = [
  "Tic-Tac-Toe",
  "Count to 21",
  "Word Search",
  "Sudoku",
  "Memory Match",
  "Hangman",
  "Rock Paper Scissors",
  "Math Sprint",
  "Memory Sequence",
  "Slide Puzzle",
];

const JOURNEY = [
  {
    n: 1,
    emoji: "💡",
    title: "Brainstorm with ChatGPT",
    body: "I gave ChatGPT a prompt about kindness and friendship. It helped shape the topic, the problem, and the kind of app we could build.",
    token: "grape",
  },
  {
    n: 2,
    emoji: "🤝",
    title: "Pitched it to a friend",
    body: "I shared the idea with my friend and brought him on board so we could build it together as a team.",
    token: "bubble",
  },
  {
    n: 3,
    emoji: "💖",
    title: "First build in Lovable",
    body: "We built the first working website together using Lovable — an AI website builder. It had the 3 core ideas we wanted.",
    token: "tangerine",
  },
  {
    n: 4,
    emoji: "🧭",
    title: "Asked Dad for help",
    body: "I showed it to my dad. He's my mentor — he guided me to take the project further with a more powerful tool.",
    token: "sun",
  },
  {
    n: 5,
    emoji: "🤖",
    title: "Rebuilt with Claude",
    body: "With Claude's help, I copied the 3 ideas from the Lovable version and rebuilt the whole website — and added the Ocean Tier ladder and lots more games.",
    token: "sky",
  },
];

const TECH = [
  { emoji: "⚛️", name: "Next.js", note: "The website framework" },
  { emoji: "🐙", name: "GitHub", note: "Where the code lives" },
  { emoji: "⚙️", name: "GitHub Actions", note: "Auto-builds on every push" },
  { emoji: "☁️", name: "Azure Static Web Apps", note: "Hosts the live site" },
];

const TOOLS_CHAIN = ["ChatGPT", "Lovable", "Claude"];

const TIPS = [
  {
    n: 1,
    text: "Start with the problem — people feel lonely.",
    token: "bubble",
  },
  {
    n: 2,
    text: "Show the two sections — Break the Ice and Games.",
    token: "sky",
  },
  {
    n: 3,
    text: "Demo Trivia — show the 🐚 Shell → 🦈 Shark ladder.",
    token: "mint",
  },
  {
    n: 4,
    text: "End with how I built it — and that I had help from Claude.",
    token: "grape",
  },
];

function SectionLabel({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className="mb-2 text-xs font-bold uppercase tracking-[0.2em]"
      style={{ color: `var(--color-${color})` }}
    >
      {children}
    </p>
  );
}

export default function PrepPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* ---- Top label (no back-to-home nav, this page stands alone) ---- */}
      <div className="rise mb-8 flex flex-wrap items-center justify-between gap-3">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-muted">
          <span aria-hidden>🧊</span> Icebreaker · Prep sheet
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-muted ring-1 ring-white/10">
          For Mithun · Not linked from the app
        </span>
      </div>

      {/* ---- Hero ---- */}
      <header className="rise mb-12 text-center">
        <p
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 text-xs font-bold text-muted ring-1 ring-white/12 sm:text-sm"
        >
          <span
            className="inline-block h-2 w-2 animate-pulse rounded-full"
            style={{ background: "var(--color-mint)" }}
            aria-hidden
          />
          My cheat sheet for talking about Icebreaker
        </p>
        <h1 className="text-balance text-4xl font-bold leading-[1.05] sm:text-6xl">
          How I built <span className="text-gradient">Icebreaker</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-semibold text-muted sm:text-lg">
          A simple guide — what the app does, why I made it, and how I built it
          — so I can explain it clearly to friends and teachers.
        </p>
      </header>

      {/* ---- 1. The Big Idea ---- */}
      <section className="rise mb-14">
        <div className="mb-5 text-center sm:text-left">
          <SectionLabel color="grape">1 · The big idea</SectionLabel>
          <h2 className="text-2xl sm:text-3xl">💛 Topic, Problem, Solution</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          <div className="pop tint-bubble p-6">
            <p className="text-xs font-extrabold uppercase tracking-widest opacity-70">
              Topic
            </p>
            <p className="mt-2 font-display text-xl font-bold sm:text-2xl">
              Kindness & Friendship
            </p>
          </div>
          <div className="pop tint-tangerine p-6">
            <p className="text-xs font-extrabold uppercase tracking-widest opacity-70">
              Problem
            </p>
            <p className="mt-2 font-display text-xl font-bold leading-tight sm:text-2xl">
              People feel lonely when they're in public by themselves.
            </p>
          </div>
          <div className="pop tint-mint p-6">
            <p className="text-xs font-extrabold uppercase tracking-widest opacity-70">
              Solution
            </p>
            <p className="mt-2 font-display text-xl font-bold leading-tight sm:text-2xl">
              An app that makes saying <span className="italic">"hi"</span> easy
              — jokes, questions, trivia, and games.
            </p>
          </div>
        </div>
      </section>

      {/* ---- 2. What the app does ---- */}
      <section className="rise mb-14">
        <div className="mb-5 text-center sm:text-left">
          <SectionLabel color="sky">2 · What the app does</SectionLabel>
          <h2 className="text-2xl sm:text-3xl">📱 Two sections</h2>
        </div>

        {/* ---- 2a. Break the Ice ---- */}
        <div className="pop mb-6 p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-3xl"
              style={{
                background:
                  "color-mix(in srgb, var(--color-grape) 25%, transparent)",
                boxShadow: "0 10px 24px -10px var(--color-grape)",
              }}
              aria-hidden
            >
              🧊
            </span>
            <div>
              <p
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: "var(--color-grape)" }}
              >
                Section 1
              </p>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Break the Ice
              </h3>
            </div>
          </div>

          <p className="mb-5 text-base font-semibold text-muted sm:text-lg">
            Four ways to start a conversation when you don't know what to say.
          </p>

          {/* Conversation Starters */}
          <div className="pop tint-bubble mb-4 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl" aria-hidden>
                💬
              </span>
              <h4 className="font-display text-xl font-bold sm:text-2xl">
                Conversation Starters
              </h4>
            </div>
            <ul className="ml-1 list-inside list-disc space-y-1.5 text-sm font-semibold sm:text-base">
              <li>
                You get an opinion question with <b>two sides — A or B</b>.
              </li>
              <li>
                Pick a side, then <b>say WHY out loud</b> — that's how the
                conversation starts.
              </li>
              <li>
                Your answer is saved, and a{" "}
                <b>live bar chart</b> shows how everyone picked Side A vs Side
                B.
              </li>
              <li>
                There's an <b>Answer Wall</b> where you can scroll past answers
                and compare with friends.
              </li>
            </ul>
          </div>

          {/* Trivia */}
          <div className="pop tint-sky mb-4 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl" aria-hidden>
                🧠
              </span>
              <h4 className="font-display text-xl font-bold sm:text-2xl">
                Trivia
              </h4>
            </div>
            <ul className="ml-1 mb-4 list-inside list-disc space-y-1.5 text-sm font-semibold sm:text-base">
              <li>
                Each round is <b>10 questions</b> from different categories.
              </li>
              <li>
                After every question you see a{" "}
                <b>fun fact</b> — so you learn something even if you guess
                wrong.
              </li>
              <li>
                Your last <b>8 scores</b> and your <b>best score</b> are saved
                so you can try to beat yourself.
              </li>
              <li>
                At the end you get ranked on the <b>Ocean Tier ladder</b>:
              </li>
            </ul>

            {/* Ocean ladder */}
            <p className="mb-2 text-xs font-extrabold uppercase tracking-widest opacity-70">
              Ocean tier ladder
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {OCEAN_LADDER.map((t, i) => (
                <div
                  key={t.name}
                  className="pop flex flex-col items-center gap-1 p-3 text-center"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-sky) 10%, transparent)",
                  }}
                >
                  <span className="text-3xl" aria-hidden>
                    {t.emoji}
                  </span>
                  <span className="font-display text-sm font-bold leading-tight">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    {t.tag}
                  </span>
                  {i < OCEAN_LADDER.length - 1 ? (
                    <span
                      className="hidden text-muted sm:block"
                      aria-hidden
                    ></span>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs font-bold text-muted">
              🐚 Shell → 🦈 Shark — can you reach the top?
            </p>
          </div>

          {/* Jokes + Riddles row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="pop tint-sun p-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  😄
                </span>
                <h4 className="font-display text-xl font-bold sm:text-2xl">
                  Jokes
                </h4>
              </div>
              <p className="text-sm font-semibold sm:text-base">
                A short, kid-friendly joke you can tell out loud. A laugh is the
                fastest way to break the silence.
              </p>
            </div>
            <div className="pop tint-lime p-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  🤔
                </span>
                <h4 className="font-display text-xl font-bold sm:text-2xl">
                  Riddles
                </h4>
              </div>
              <p className="text-sm font-semibold sm:text-base">
                Stump a new friend with a riddle, then enjoy the{" "}
                <i>"aha!"</i> moment together.
              </p>
            </div>
          </div>
        </div>

        {/* ---- 2b. Play & Think (Games) ---- */}
        <div className="pop p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-3xl"
              style={{
                background:
                  "color-mix(in srgb, var(--color-tangerine) 25%, transparent)",
                boxShadow: "0 10px 24px -10px var(--color-tangerine)",
              }}
              aria-hidden
            >
              🎮
            </span>
            <div>
              <p
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: "var(--color-tangerine)" }}
              >
                Section 2
              </p>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Play & Think
              </h3>
            </div>
          </div>
          <p className="mb-4 text-base font-semibold text-muted sm:text-lg">
            Once the ice is broken, there are <b>10 original games</b> to play
            together — or alone if you just want to have fun.
          </p>
          <div className="flex flex-wrap gap-2">
            {GAMES_LIST.map((g) => (
              <span
                key={g}
                className="tint-tangerine rounded-full border px-3.5 py-1.5 text-sm font-bold"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 3. How I built it ---- */}
      <section className="rise mb-14">
        <div className="mb-5 text-center sm:text-left">
          <SectionLabel color="tangerine">3 · How I built it</SectionLabel>
          <h2 className="text-2xl sm:text-3xl">🛠️ The journey — 5 steps</h2>
        </div>
        <ol className="grid grid-cols-1 gap-4 sm:gap-5">
          {JOURNEY.map((step) => (
            <li
              key={step.n}
              className={`pop tint-${step.token} flex items-start gap-4 p-5 sm:gap-5 sm:p-6`}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-bold sm:h-14 sm:w-14 sm:text-3xl"
                style={{
                  background: `color-mix(in srgb, var(--color-${step.token}) 35%, transparent)`,
                  boxShadow: `0 10px 24px -10px var(--color-${step.token})`,
                }}
                aria-hidden
              >
                {step.n}
              </span>
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold sm:text-xl">
                  <span aria-hidden>{step.emoji}</span> {step.title}
                </h3>
                <p className="mt-1 text-sm font-semibold leading-snug sm:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- 4. The tech ---- */}
      <section className="rise mb-14">
        <div className="mb-5 text-center sm:text-left">
          <SectionLabel color="mint">4 · The tech</SectionLabel>
          <h2 className="text-2xl sm:text-3xl">🧰 What powers the app</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map((t) => (
            <div
              key={t.name}
              className="pop flex items-start gap-3 p-5"
            >
              <span className="text-3xl" aria-hidden>
                {t.emoji}
              </span>
              <div>
                <p className="font-display text-lg font-bold">{t.name}</p>
                <p className="text-sm font-semibold text-muted">{t.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pop tint-grape mt-5 p-6">
          <p className="text-xs font-extrabold uppercase tracking-widest opacity-70">
            How it all goes live
          </p>
          <p className="mt-2 text-base font-semibold leading-snug sm:text-lg">
            When I save my code on my laptop, I push it to <b>GitHub</b>.{" "}
            <b>GitHub Actions</b> wakes up, builds the website, and sends it to{" "}
            <b>Microsoft Azure Static Web Apps</b> — and the site is live for
            everyone within a minute. The code is{" "}
            <b>public on GitHub</b> so anyone can see how it's made.
          </p>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-muted">
            Tools I used along the way
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {TOOLS_CHAIN.map((tool, i) => (
              <span key={tool} className="flex items-center gap-3">
                <span className="tint-sky rounded-full border px-4 py-2 font-display text-sm font-bold sm:text-base">
                  {tool}
                </span>
                {i < TOOLS_CHAIN.length - 1 ? (
                  <span className="font-display text-xl font-bold text-muted">
                    →
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 5. Talking tips ---- */}
      <section className="rise mb-10">
        <div className="mb-5 text-center sm:text-left">
          <SectionLabel color="bubble">5 · Talking tips</SectionLabel>
          <h2 className="text-2xl sm:text-3xl">🎤 How to present it</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TIPS.map((tip) => (
            <div
              key={tip.n}
              className={`pop tint-${tip.token} flex items-start gap-4 p-5`}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold"
                style={{
                  background: `color-mix(in srgb, var(--color-${tip.token}) 38%, transparent)`,
                }}
                aria-hidden
              >
                {tip.n}
              </span>
              <p className="text-base font-bold leading-snug sm:text-lg">
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t border-white/10 pt-6 pb-4 text-center text-xs font-semibold text-muted">
        Icebreaker — a school project by Mithun. Built with ChatGPT, Lovable &
        Claude · Hosted on Microsoft Azure ☁️
      </footer>
    </div>
  );
}
