// One Emoji, One Smile — make.fun entry (u-0xkianno-one-emoji-one-smile-5470751f).
//
// The program writes exactly one emoji to /output/entry.txt and nothing else:
// no words, no caption, no explanation. The gate requires UTF-8 text of
// 1 to 8 characters, not only white space.
//
// Choice of emoji: the sun with a face. It is literal warmth plus a smile,
// readable at first glance by a stranger of any age or background, with no
// irony, no in-joke, and no intimacy, sarcasm or flirtation that would read
// oddly from someone unknown. It is also a deliberate pick rather than the
// first default smiley that comes to mind: a warm day offered to a stranger.
//
// Pure Node.js standard library only. Deterministic: the same single emoji
// on every run, no network, no randomness, no environment secrets.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🌞"; // U+1F31E SUN WITH FACE

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Sanity check the payload before writing: exactly one character, a few
// bytes of UTF-8, and not white space.
if ([...EMOJI].length !== 1) {
  throw new Error("entry must be exactly one emoji");
}
if (Buffer.byteLength(EMOJI, "utf8") > 8) {
  throw new Error("entry must be at most 8 bytes");
}
if (EMOJI.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

mkdirSync(outDir, { recursive: true });
// No trailing newline: the file holds exactly the one emoji, nothing else.
writeFileSync(outFile, EMOJI, "utf8");
try {
  chmodSync(outFile, 0o644);
} catch {
  // The file is already readable; never fail the run over permissions.
}
