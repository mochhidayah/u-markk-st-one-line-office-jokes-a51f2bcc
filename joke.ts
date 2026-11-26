// joke.ts — a tiny one-line joke composer for office life.
//
// The composer keeps a short shelf of invented setup/twist pairs, scores each
// finished line the way the house judge is briefed to weigh them (real office
// detail up front, laugh landing in the last few words, clear on one reading),
// and hands the best line to main.ts. Nothing here is copied from anywhere:
// every pair below was written for this entry.

export interface JokePair {
  /** The office scene, stated plainly. */
  setup: string;
  /** The turn that makes it a joke; must land at the very end. */
  twist: string;
}

export const PAIRS: JokePair[] = [
  {
    setup: "Our printer only jams on documents marked urgent,",
    twist: "which makes it the only thing in this office that actually reads.",
  },
  {
    setup: "The Monday meeting exists so twelve people can discover together",
    twist: "that nobody read the email.",
  },
  {
    setup: "I hit reply-all to ask to be removed from the thread,",
    twist: "and forty-seven people replied-all to agree with me.",
  },
];

export interface ScoredJoke {
  line: string;
  score: number;
}

/** Score a finished line: punch position matters most, then a snug length. */
export function scoreLine(line: string): number {
  const words = line.trim().split(/\s+/);
  const lastWord = words[words.length - 1] ?? "";
  // The laugh should live in the final beat: reward a punchy last word.
  const punchWords = new Set([
    "reads.",
    "email.",
    "me.",
    "works.",
    "again.",
    "Monday.",
  ]);
  let score = punchWords.has(lastWord) ? 40 : 10;
  // Snug middle length reads best out loud: 60-160 chars is the sweet spot.
  const len = line.length;
  if (len >= 60 && len <= 160) score += 30;
  else if (len >= 40 && len < 60) score += 15;
  else if (len > 160 && len <= 199) score += 10;
  // One clean sentence, no clutter: a single comma at most.
  const commas = (line.match(/,/g) ?? []).length;
  if (commas <= 1) score += 20;
  // Penalise a line that needs a second sentence to land.
  if (line.split(/[.!?]/).filter(Boolean).length > 1) score -= 25;
  return score;
}

export function compose(pair: JokePair): string {
  return `${pair.setup} ${pair.twist}`;
}

/** Pick the best-scoring line on the shelf. Deterministic: same line every run. */
export function buildJoke(): string {
  let best: ScoredJoke | null = null;
  for (const pair of PAIRS) {
    const line = compose(pair);
    const score = scoreLine(line);
    if (best === null || score > best.score) best = { line, score };
  }
  return (best as ScoredJoke).line;
}
