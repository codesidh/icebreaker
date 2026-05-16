import Shell from "@/components/Shell";
import RevealDeck from "@/components/RevealDeck";
import { JOKES } from "@/lib/data/jokes";

const items = JOKES.map((j) => ({ prompt: j.setup, answer: j.punchline }));

export default function JokesPage() {
  return (
    <Shell
      emoji="😄"
      title="Jokes"
      accent="bg-sun"
      blurb="Read the setup out loud, let them guess, then hit reveal. A laugh is the easiest icebreaker there is."
    >
      <RevealDeck
        items={items}
        promptLabel="Joke"
        answerLabel="Punchline"
        revealCta="Reveal the punchline 🥁"
        nextCta="Another joke 😆"
        answerColor="bg-bubble"
      />
    </Shell>
  );
}
