export type Placement = { word: string; cells: [number, number][] };
export type Puzzle = { grid: string[][]; placements: Placement[] };

const DIRS: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function tryPlace(
  grid: string[][],
  word: string,
  size: number,
): [number, number][] | null {
  for (let attempt = 0; attempt < 120; attempt++) {
    const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
    const r0 = Math.floor(Math.random() * size);
    const c0 = Math.floor(Math.random() * size);
    const rEnd = r0 + dr * (word.length - 1);
    const cEnd = c0 + dc * (word.length - 1);
    if (rEnd < 0 || rEnd >= size || cEnd < 0 || cEnd >= size) continue;

    let ok = true;
    for (let i = 0; i < word.length; i++) {
      const ch = grid[r0 + dr * i][c0 + dc * i];
      if (ch !== "" && ch !== word[i]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;

    const cells: [number, number][] = [];
    for (let i = 0; i < word.length; i++) {
      const r = r0 + dr * i;
      const c = c0 + dc * i;
      grid[r][c] = word[i];
      cells.push([r, c]);
    }
    return cells;
  }
  return null;
}

export function generate(words: string[], size = 12): Puzzle {
  const grid: string[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ""),
  );
  const placements: Placement[] = [];

  // Longest words first — they're the hardest to fit.
  const ordered = [...words].sort((a, b) => b.length - a.length);
  for (const word of ordered) {
    const cells = tryPlace(grid, word, size);
    if (cells) placements.push({ word, cells });
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = LETTERS[Math.floor(Math.random() * 26)];
      }
    }
  }

  return { grid, placements };
}

/** Cells between two points if they form a straight line; else null. */
export function lineBetween(
  r0: number,
  c0: number,
  r1: number,
  c1: number,
): [number, number][] | null {
  const dr = r1 - r0;
  const dc = c1 - c0;
  const stepR = Math.sign(dr);
  const stepC = Math.sign(dc);

  const straight =
    dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
  if (!straight) return null;

  const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
  const cells: [number, number][] = [];
  for (let i = 0; i < len; i++) {
    cells.push([r0 + stepR * i, c0 + stepC * i]);
  }
  return cells;
}
