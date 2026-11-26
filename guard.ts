// guard.ts — the gatekeeper for the entry file.
//
// The house gate is strict and public: /output/entry.txt must be UTF-8 text of
// 1 to 199 characters, not only white space, on a single line. This module
// enforces exactly that before anything is written, so a bad line can never
// reach the judge.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export interface GuardResult {
  ok: boolean;
  reason: string;
}

export function validate(line: string): GuardResult {
  if (typeof line !== "string" || line.length === 0) {
    return { ok: false, reason: "empty line" };
  }
  if (line.trim().length === 0) {
    return { ok: false, reason: "only white space" };
  }
  if (line.length > 199) {
    return { ok: false, reason: `too long: ${line.length} chars (max 199)` };
  }
  if (/[\r\n]/.test(line)) {
    return { ok: false, reason: "must be a single line" };
  }
  // No control characters other than plain spaces.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(line)) {
    return { ok: false, reason: "contains control characters" };
  }
  return { ok: true, reason: "valid" };
}

/** Write the line exactly, with no trailing newline, creating folders as needed. */
export function writeEntry(line: string, outPath: string): void {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
}
