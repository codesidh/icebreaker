import Shell from "@/components/Shell";
import RevealDeck from "@/components/RevealDeck";
import { RIDDLES } from "@/lib/data/riddles";

const items = RIDDLES.map((r) => ({ prompt: r.riddle, answer: r.answer }));

export default function RiddlesPage() {
  return (
    <Shell
      emoji="🤔"
      title="Riddles"
      accent="bg-lime"
      blurb="Ask the riddle, give them a minute to think, then reveal it together. Bonus points if they get it!"
    >
      <RevealDeck
        items={items}
        promptLabel="Riddle"
        answerLabel="Answer"
        revealCta="Show the answer 💡"
        nextCta="Another riddle 🧩"
        answerColor="bg-sky"
      />
    </Shell>
  );
}
