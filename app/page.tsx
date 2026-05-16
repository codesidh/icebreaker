import Tile from "@/components/Tile";

const ICEBREAKERS = [
  {
    href: "/jokes",
    emoji: "😄",
    title: "Jokes",
    blurb: "Tell a quick joke to get a laugh and break the silence.",
    color: "bg-sun",
  },
  {
    href: "/trivia",
    emoji: "🧠",
    title: "Trivia",
    blurb: "Surprising facts you can share — and maybe change a mind.",
    color: "bg-sky",
  },
  {
    href: "/riddles",
    emoji: "🤔",
    title: "Riddles",
    blurb: "Stump a new friend, then enjoy the “aha!” together.",
    color: "bg-lime",
  },
  {
    href: "/conversation",
    emoji: "💬",
    title: "Conversation Starters",
    blurb: "Pick a side, say why. See what everyone else thinks.",
    color: "bg-bubble",
  },
];

const GAMES = [
  {
    href: "/games/tic-tac-toe",
    emoji: "❌",
    title: "Tic-Tac-Toe",
    blurb: "Classic 3-in-a-row vs. the computer.",
    color: "bg-sky",
  },
  {
    href: "/games/twenty-one",
    emoji: "✋",
    title: "Count to 21",
    blurb: "Don’t be the one to say 21! Learn the secret trick.",
    color: "bg-tangerine",
  },
  {
    href: "/games/word-search",
    emoji: "🔤",
    title: "Word Search",
    blurb: "Find the hidden words. Pick a new theme any time.",
    color: "bg-lime",
  },
  {
    href: "/games/sudoku",
    emoji: "🔢",
    title: "Sudoku",
    blurb: "Fill the grid 1–9. Three difficulty levels.",
    color: "bg-grape",
  },
  {
    href: "/games/memory",
    emoji: "🧩",
    title: "Memory Match",
    blurb: "Flip the cards and find every pair.",
    color: "bg-bubble",
  },
  {
    href: "/games/hangman",
    emoji: "🎈",
    title: "Hangman",
    blurb: "Guess the word before the balloons pop.",
    color: "bg-sun",
  },
  {
    href: "/games/rock-paper-scissors",
    emoji: "✊",
    title: "Rock Paper Scissors",
    blurb: "Best of 5 against the computer.",
    color: "bg-mint",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* ---- Hero ---- */}
      <section className="rise relative mb-12 text-center">
        <span
          className="float absolute -left-1 top-0 hidden text-5xl sm:block"
          style={{ animationDelay: "0.4s" }}
          aria-hidden
        >
          🎲
        </span>
        <span
          className="float absolute -right-1 top-4 hidden text-5xl sm:block"
          style={{ animationDelay: "1.2s" }}
          aria-hidden
        >
          😄
        </span>

        <p className="mb-3 inline-block rotate-[-2deg] rounded-full border-[3px] border-ink bg-sun px-4 py-1 text-sm font-extrabold shadow-[3px_3px_0_var(--color-ink)]">
          A friend-making app 🧊
        </p>
        <h1 className="text-5xl leading-[1.05] text-stroke text-paper sm:text-7xl">
          Icebreaker
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base font-bold sm:text-lg">
          New at school or sitting alone at lunch? Pick anything below — a joke,
          a riddle, a big question, or a game. It makes saying{" "}
          <span className="bg-sky px-1">“hi”</span> a whole lot easier.
        </p>
      </section>

      {/* ---- Break the Ice ---- */}
      <section className="mb-12">
        <h2 className="rise mb-5 flex items-center gap-2 text-2xl sm:text-3xl">
          <span aria-hidden>🧊</span> Break the Ice
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ICEBREAKERS.map((t, i) => (
            <Tile key={t.href} {...t} index={i} />
          ))}
        </div>
      </section>

      {/* ---- Play & Think ---- */}
      <section>
        <h2 className="rise mb-5 flex items-center gap-2 text-2xl sm:text-3xl">
          <span aria-hidden>🎮</span> Play &amp; Think
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((t, i) => (
            <Tile key={t.href} {...t} index={i + 1} />
          ))}
        </div>
      </section>

      <footer className="mt-14 pb-4 text-center text-xs font-bold opacity-50">
        Icebreaker — a school project. Every game is original. Be kind, have
        fun. 💛
      </footer>
    </div>
  );
}
