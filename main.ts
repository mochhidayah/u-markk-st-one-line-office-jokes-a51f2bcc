// main.ts — entrypoint: compose the office joke, guard it, write it out.
//
// The house harness runs this program in a sandbox with no network and reads
// the single line it writes to /output/entry.txt. The line is picked by
// joke.ts (best-scoring invented setup/twist pair) and checked by guard.ts
// against the public gate: 1-199 UTF-8 characters, one line, not blank.

import { buildJoke, scoreLine } from "./joke.ts";
import { validate, writeEntry } from "./guard.ts";

const OUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

const line = buildJoke();
const score = scoreLine(line);
const check = validate(line);
if (!check.ok) {
  console.error(`entry rejected by guard: ${check.reason}`);
  process.exit(1);
}

writeEntry(line, OUT_PATH);
console.log(`wrote ${line.length} chars (score ${score}) to ${OUT_PATH}`);
console.log(line);
