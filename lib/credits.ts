// ─────────────────────────────────────────────────────────────
//  ✏️  The one place to edit who made Icebreaker.
//  Used by the Credits page AND the printable poster.
// ─────────────────────────────────────────────────────────────
export const MEMBERS = [
  "Mithran ObliPrabu",
  "Mahir Patel",
  "Aarav Eticala",
  "Aadvik Gandhi",
];

export const SCHOOL = "Milltown · Bridgewater, New Jersey";

// Joined form ("A, B, C & D") for the poster's slim credit band.
export const TEAM =
  MEMBERS.length > 1
    ? `${MEMBERS.slice(0, -1).join(", ")} & ${MEMBERS[MEMBERS.length - 1]}`
    : MEMBERS[0];
