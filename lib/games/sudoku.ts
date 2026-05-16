export type Grid = number[][]; // 9x9, 0 = empty
export type Difficulty = "easy" | "medium" | "hard";

function emptyGrid(): Grid {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function cloneGrid(g: Grid): Grid {
  return g.map((row) => [...row]);
}

function canPlace(g: Grid, r: number, c: number, n: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (g[r][i] === n || g[i][c] === n) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (g[br + i][bc + j] === n) return false;
    }
  }
  return true;
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fill(g: Grid): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (g[r][c] === 0) {
        for (const n of shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (canPlace(g, r, c, n)) {
            g[r][c] = n;
            if (fill(g)) return true;
            g[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/** Count solutions, stopping early once `limit` is reached. */
function countSolutions(g: Grid, limit = 2): number {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (g[r][c] === 0) {
        let count = 0;
        for (let n = 1; n <= 9; n++) {
          if (canPlace(g, r, c, n)) {
            g[r][c] = n;
            count += countSolutions(g, limit - count);
            g[r][c] = 0;
            if (count >= limit) return count;
          }
        }
        return count;
      }
    }
  }
  return 1; // no empty cells -> a complete, valid solution
}

const REMOVE: Record<Difficulty, number> = {
  easy: 40,
  medium: 50,
  hard: 56,
};

export function generatePuzzle(difficulty: Difficulty): {
  puzzle: Grid;
  solution: Grid;
} {
  const solution = emptyGrid();
  fill(solution);

  const puzzle = cloneGrid(solution);
  let toRemove = REMOVE[difficulty];

  // Remove in rotationally symmetric pairs while the solution stays unique.
  const cells = shuffled(Array.from({ length: 81 }, (_, i) => i));
  for (const idx of cells) {
    if (toRemove <= 0) break;
    const r = Math.floor(idx / 9);
    const c = idx % 9;
    if (puzzle[r][c] === 0) continue;

    const r2 = 8 - r;
    const c2 = 8 - c;
    const a = puzzle[r][c];
    const b = puzzle[r2][c2];
    puzzle[r][c] = 0;
    puzzle[r2][c2] = 0;

    if (countSolutions(cloneGrid(puzzle), 2) !== 1) {
      puzzle[r][c] = a;
      puzzle[r2][c2] = b;
    } else {
      toRemove -= r === r2 && c === c2 ? 1 : 2;
    }
  }

  return { puzzle, solution };
}

/** Indices of cells that conflict with another filled cell. */
export function conflicts(g: Grid): boolean[][] {
  const bad = Array.from({ length: 9 }, () => Array(9).fill(false));
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const n = g[r][c];
      if (n === 0) continue;
      g[r][c] = 0;
      if (!canPlace(g, r, c, n)) bad[r][c] = true;
      g[r][c] = n;
    }
  }
  return bad;
}

export function isComplete(g: Grid): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const n = g[r][c];
      if (n === 0) return false;
      g[r][c] = 0;
      const ok = canPlace(g, r, c, n);
      g[r][c] = n;
      if (!ok) return false;
    }
  }
  return true;
}
