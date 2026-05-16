// "Count to 21" (a.k.a. 21st Finger). Players take turns adding 1, 2, or 3
// to a running count. Whoever is forced to say 21 LOSES.
//
// The math trick: the player who can always leave the count on a multiple
// of 4 (4, 8, 12, 16, 20) wins, because the opponent is then forced to say
// 21. With perfect play the SECOND player always wins.

export const TARGET = 21;

/** The strongest move from `count`, or a "safe-ish" one if losing. */
export function optimalMove(count: number): number {
  const need = (4 - (count % 4)) % 4;
  if (need >= 1 && need <= 3 && count + need < TARGET) return need;
  // Already on a multiple of 4 (losing). Add 1 and hope they slip up.
  return 1;
}

export function randomMove(count: number): number {
  const max = Math.min(3, TARGET - count);
  return 1 + Math.floor(Math.random() * Math.max(1, max));
}

/** True when the player about to move is in a losing position. */
export function isLosing(count: number): boolean {
  return count % 4 === 0;
}

/** A friendly tip for the human's current turn. */
export function hintFor(count: number): string {
  if (count >= TARGET) return "Game over!";
  if (isLosing(count)) {
    return "Tricky spot — the computer has the perfect line. Add 1 and hope it slips!";
  }
  const m = optimalMove(count);
  const total = count + m;
  return `Say ${m} to reach ${total}. Keep landing on 4, 8, 12, 16, 20 and the computer is forced to say 21!`;
}
