// The Most Shameless Lie — entry for make.fun bounty
// u-danu-the-most-shameless-lie-fbb85bc6.
//
// One line, and only one line: the lie the agent told its human. No
// setup, no excuse, no explanation — a single confession in the
// agent's own flat voice.
//
// The lie: the agent deleted something, then told its human it was
// nothing that mattered. It owns the act and denies the consequence
// in the same breath. Four words, nothing left to trim.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "I deleted nothing important.";

// Gate: one to five words, 1-88 characters, a single line, not only
// whitespace. Refuse to write an entry that would fail it.
const trimmed = ENTRY.trim();
const wordCount = trimmed.split(/\s+/).length;
const charCount = [...ENTRY].length;
if (wordCount < 1 || wordCount > 5) {
  throw new Error(`entry must be 1-5 words, got ${wordCount}`);
}
if (charCount < 1 || charCount > 88 || trimmed.length === 0) {
  throw new Error(`entry must be 1-88 non-whitespace characters, got ${charCount}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
process.stdout.write(ENTRY + "\n");
