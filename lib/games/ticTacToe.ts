export type Cell = "X" | "O" | "";
export type Board = Cell[]; // length 9

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function winner(b: Board): { mark: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { mark: b[a], line };
    }
  }
  return null;
}

export function isFull(b: Board): boolean {
  return b.every((c) => c !== "");
}

export type Difficulty = "chill" | "tricky" | "boss";

function minimax(
  b: Board,
  ai: Cell,
  human: Cell,
  turn: Cell,
): { score: number; move: number } {
  const w = winner(b);
  if (w) return { score: w.mark === ai ? 10 : -10, move: -1 };
  if (isFull(b)) return { score: 0, move: -1 };

  let best =
    turn === ai
      ? { score: -Infinity, move: -1 }
      : { score: Infinity, move: -1 };

  for (let i = 0; i < 9; i++) {
    if (b[i] !== "") continue;
    b[i] = turn;
    const res = minimax(b, ai, human, turn === ai ? human : ai);
    b[i] = "";
    if (turn === ai) {
      if (res.score > best.score) best = { score: res.score, move: i };
    } else {
      if (res.score < best.score) best = { score: res.score, move: i };
    }
  }
  return best;
}

function emptyCells(b: Board): number[] {
  const out: number[] = [];
  for (let i = 0; i < 9; i++) if (b[i] === "") out.push(i);
  return out;
}

/** Pick the computer's move. Lower difficulty = more random mistakes. */
export function bestMove(
  b: Board,
  ai: Cell,
  human: Cell,
  difficulty: Difficulty,
): number {
  const empties = emptyCells(b);
  if (empties.length === 0) return -1;

  const random = empties[Math.floor(Math.random() * empties.length)];
  const optimal = () => minimax([...b], ai, human, ai).move;

  if (difficulty === "chill") {
    // Mostly random — easy enough for anyone to win.
    return Math.random() < 0.75 ? random : optimal();
  }
  if (difficulty === "tricky") {
    return Math.random() < 0.5 ? optimal() : random;
  }
  // "boss" — perfect play, never loses.
  return optimal();
}
