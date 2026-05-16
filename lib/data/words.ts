// Word lists shared by Word Search and Hangman.
// Keep entries A–Z only and at most 9 letters so they fit a 12×12 grid.

export type WordTheme = { name: string; emoji: string; words: string[] };

export const WORD_THEMES: WordTheme[] = [
  {
    name: "Animals",
    emoji: "🐾",
    words: ["TIGER", "PANDA", "OTTER", "EAGLE", "SHARK", "LLAMA", "MOOSE", "GECKO"],
  },
  {
    name: "Space",
    emoji: "🚀",
    words: ["PLANET", "COMET", "ORBIT", "ROCKET", "GALAXY", "NEBULA", "LUNAR", "STAR"],
  },
  {
    name: "Food",
    emoji: "🍔",
    words: ["MANGO", "PIZZA", "BAGEL", "WAFFLE", "NOODLE", "COOKIE", "CHEESE", "PEACH"],
  },
  {
    name: "School",
    emoji: "🎒",
    words: ["PENCIL", "RULER", "LIBRARY", "SCIENCE", "RECESS", "TEACHER", "MARKER", "DESK"],
  },
  {
    name: "Sports",
    emoji: "⚽",
    words: ["SOCCER", "TENNIS", "HOCKEY", "RUNNER", "MEDAL", "COACH", "SKATE", "GOAL"],
  },
  {
    name: "Nature",
    emoji: "🌳",
    words: ["RIVER", "FOREST", "CANYON", "MEADOW", "PEBBLE", "BREEZE", "ISLAND", "CLOUD"],
  },
];

export type HangmanWord = { word: string; hint: string };

export const HANGMAN_WORDS: HangmanWord[] = [
  { word: "FRIENDSHIP", hint: "What this whole app is about" },
  { word: "LIBRARY", hint: "A quiet place full of books" },
  { word: "PLANET", hint: "Earth is one of these" },
  { word: "RAINBOW", hint: "Colors after the rain" },
  { word: "VOLCANO", hint: "A mountain that can erupt" },
  { word: "DINOSAUR", hint: "Ruled Earth long ago" },
  { word: "TELESCOPE", hint: "Helps you see far-away stars" },
  { word: "BICYCLE", hint: "Two wheels and pedals" },
  { word: "PYRAMID", hint: "Ancient triangle building" },
  { word: "OCTOPUS", hint: "Sea creature with eight arms" },
  { word: "GUITAR", hint: "An instrument with strings" },
  { word: "PUZZLE", hint: "Pieces that fit together" },
  { word: "JOURNEY", hint: "A long trip" },
  { word: "KITCHEN", hint: "Where meals are cooked" },
  { word: "MYSTERY", hint: "Something to be solved" },
  { word: "GALAXY", hint: "Billions of stars together" },
];
