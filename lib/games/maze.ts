// Maze generation via recursive-backtracking DFS. Each cell tracks
// which of its four walls are present. Start cell is (0,0); goal is
// the opposite corner. Always solvable.

export type Cell = { n: boolean; e: boolean; s: boolean; w: boolean };
export type Maze = {
  rows: number;
  cols: number;
  cells: Cell[][]; // [row][col]
  start: [number, number];
  goal: [number, number];
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateMaze(rows: number, cols: number): Maze {
  const cells: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      n: true,
      e: true,
      s: true,
      w: true,
    })),
  );
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );

  type Dir = "n" | "e" | "s" | "w";
  const opp: Record<Dir, Dir> = { n: "s", s: "n", e: "w", w: "e" };
  const step: Record<Dir, [number, number]> = {
    n: [-1, 0],
    s: [1, 0],
    e: [0, 1],
    w: [0, -1],
  };

  // Iterative DFS so we don't blow the stack on big grids.
  const stack: [number, number][] = [[0, 0]];
  visited[0][0] = true;
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const dirs = shuffle<Dir>(["n", "e", "s", "w"]);
    let advanced = false;
    for (const d of dirs) {
      const [dr, dc] = step[d];
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (visited[nr][nc]) continue;
      cells[r][c][d] = false;
      cells[nr][nc][opp[d]] = false;
      visited[nr][nc] = true;
      stack.push([nr, nc]);
      advanced = true;
      break;
    }
    if (!advanced) stack.pop();
  }

  return {
    rows,
    cols,
    cells,
    start: [0, 0],
    goal: [rows - 1, cols - 1],
  };
}

/** True if the player can step from (r,c) in direction d. */
export function canMove(
  maze: Maze,
  r: number,
  c: number,
  d: "n" | "e" | "s" | "w",
): boolean {
  const cell = maze.cells[r]?.[c];
  if (!cell) return false;
  if (cell[d]) return false;
  const step: Record<typeof d, [number, number]> = {
    n: [-1, 0],
    s: [1, 0],
    e: [0, 1],
    w: [0, -1],
  };
  const [dr, dc] = step[d];
  const nr = r + dr;
  const nc = c + dc;
  return nr >= 0 && nr < maze.rows && nc >= 0 && nc < maze.cols;
}
