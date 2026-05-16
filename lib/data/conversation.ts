export type OpinionQuestion = {
  id: string;
  emoji: string;
  question: string;
  sideA: string;
  sideB: string;
};

// "Would you rather" / "do you like" style prompts. There is no wrong
// answer — the point is to pick a side and explain WHY out loud so a
// conversation starts.
export const OPINION_QUESTIONS: OpinionQuestion[] = [
  { id: "dogs", emoji: "🐶", question: "Do you like dogs?", sideA: "Yes, love them", sideB: "Not really" },
  { id: "pizza", emoji: "🍍", question: "Does pineapple belong on pizza?", sideA: "Absolutely", sideB: "No way" },
  { id: "summer", emoji: "🌞", question: "Which is better?", sideA: "Summer", sideB: "Winter" },
  { id: "morning", emoji: "⏰", question: "Are you a…", sideA: "Morning person", sideB: "Night owl" },
  { id: "books", emoji: "📚", question: "Books or movies for a story?", sideA: "Books", sideB: "Movies" },
  { id: "powers", emoji: "🦸", question: "Which superpower?", sideA: "Flying", sideB: "Invisibility" },
  { id: "sweet", emoji: "🍫", question: "Sweet snacks or salty snacks?", sideA: "Sweet", sideB: "Salty" },
  { id: "travel", emoji: "🏖️", question: "Best vacation:", sideA: "Beach", sideB: "Mountains" },
  { id: "music", emoji: "🎧", question: "Do you study better with music on?", sideA: "Yes", sideB: "No, silence" },
  { id: "pets", emoji: "🐱", question: "Cats or dogs?", sideA: "Cats", sideB: "Dogs" },
  { id: "time", emoji: "⏳", question: "Would you rather travel to…", sideA: "The past", sideB: "The future" },
  { id: "robot", emoji: "🤖", question: "Will robots make life better?", sideA: "Yes", sideB: "No" },
  { id: "team", emoji: "🤝", question: "Do you prefer working…", sideA: "In a team", sideB: "Solo" },
  { id: "ocean", emoji: "🚀", question: "Explore which first?", sideA: "Deep ocean", sideB: "Outer space" },
  { id: "breakfast", emoji: "🥞", question: "Is breakfast the best meal?", sideA: "Yes", sideB: "Nope" },
  { id: "homework", emoji: "✏️", question: "Should there be homework?", sideA: "Yes", sideB: "No" },
  { id: "veggies", emoji: "🥦", question: "Are vegetables actually tasty?", sideA: "Yes", sideB: "Not really" },
  { id: "phone", emoji: "📵", question: "Phones at the lunch table?", sideA: "Fine", sideB: "Put them away" },
  { id: "hero", emoji: "🦖", question: "Cooler animal:", sideA: "Dinosaurs", sideB: "Dragons" },
  { id: "season", emoji: "🎃", question: "Best holiday vibe:", sideA: "Halloween", sideB: "Winter break" },
];
