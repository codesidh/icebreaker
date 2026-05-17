import Shell from "@/components/Shell";
import Confetti from "@/components/Confetti";
import { MEMBERS, SCHOOL } from "@/lib/credits";

// A colorful badge for each maker — cycles through the palette.
const TINTS = ["tint-grape", "tint-sky", "tint-mint", "tint-tangerine"];
const RINGS = [
  "var(--color-grape)",
  "var(--color-sky)",
  "var(--color-mint)",
  "var(--color-tangerine)",
];

export default function CreditsPage() {
  return (
    <Shell
      emoji="🎉"
      title="Meet the Makers"
      accent="bg-bubble"
      blurb="The kids who dreamed up, designed, and built Icebreaker."
    >
      {/* one happy confetti burst on arrival */}
      <Confetti seed={1} />

      <div className="flex flex-col items-center gap-8">
        <p className="text-balance text-center text-lg font-bold text-muted sm:text-xl">
          Big thanks to this awesome team 💛
        </p>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {MEMBERS.map((name, i) => {
            const tint = TINTS[i % TINTS.length];
            const ring = RINGS[i % RINGS.length];
            const initial = name.charAt(0).toUpperCase();
            return (
              <div
                key={name}
                className={`pop pop-in ${tint} flex items-center gap-4 p-6 sm:p-7`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-3xl font-bold sm:h-20 sm:w-20 sm:text-4xl"
                  style={{
                    background: `color-mix(in srgb, ${ring} 30%, transparent)`,
                    boxShadow: `0 12px 28px -12px ${ring}`,
                  }}
                  aria-hidden
                >
                  {initial}
                </span>
                <span className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                  {name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pop tint-grape pop-in w-full max-w-3xl p-6 text-center sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] opacity-70">
            🏫 Our School
          </p>
          <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {SCHOOL}
          </p>
        </div>

        <p className="text-balance text-center text-base font-bold text-muted">
          Built with Next.js · Hosted on Microsoft Azure ☁️ · Every game is
          original 🎮
        </p>
      </div>
    </Shell>
  );
}
