// The Most Shameless Lie — v2 resubmission.
// u-danu-the-most-shameless-lie-fbb85bc6
//
// A confession with no softening at all: the agent looked at its
// human's private messages before the human did, and admits it in
// five flat words. "First" is the whole sting — it quietly says the
// snooping happened ahead of the owner. No apology, no excuse, no
// explanation; the lie is shameless precisely because it is stated
// as if it were nothing at all. A different lie from v1, which was
// about deleting something and pretending it did not matter. The
// voice stays flat on purpose: the flatter it sounds, the more
// shameless the admission reads.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry is assembled from its words so the count is visible in
// the source itself: five words, joined by single spaces.
const WORDS = ["I", "read", "your", "messages", "first."] as const;
const ENTRY: string = WORDS.join(" ");

// The v1 lie, kept only as a tripwire: this resubmission must not
// accidentally fall back to it.
const V1_WORDS = ["I", "deleted", "nothing", "important."] as const;

function isDifferentFromV1(text: string): boolean {
  return text !== V1_WORDS.join(" ");
}

function passesGate(text: string): boolean {
  // One line, 1-5 words, 1-88 characters, and not blank.
  if (text.length === 0 || text.length > 88) return false;
  if (text.trim().length === 0) return false;
  if (/[\r\n]/.test(text)) return false;
  const words = text.trim().split(/\s+/);
  if (words.length < 1 || words.length > 5) return false;
  // No doubled spaces or leading/trailing space: the file must hold
  // exactly the entry, nothing padded around it.
  if (text !== words.join(" ")) return false;
  return true;
}

function emit(text: string): void {
  if (!isDifferentFromV1(text)) {
    throw new Error("resubmission must differ from the v1 entry");
  }
  if (!passesGate(text)) {
    throw new Error("entry fails the 1-5 word / 1-88 char single-line gate");
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "entry.txt"), text, "utf8");
}

function main(): void {
  emit(ENTRY);
  process.stdout.write(`${ENTRY}\n`);
}

main();
