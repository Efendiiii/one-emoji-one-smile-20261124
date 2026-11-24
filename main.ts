// One Emoji, One Smile — entry: exactly one emoji, nothing else.
// Judge brief: the single emoji most likely to make a stranger smile.
// Picked: 😇 (smiling face with halo) — warm and kind at first glance,
// universal across ages and backgrounds, chosen rather than the default
// smiley, wholesome with no intimacy, sarcasm or flirtation from a stranger.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "😇";

// Guard: exactly one emoji, no other characters.
// [...ENTRY] counts Unicode code points (one for this emoji);
// the gate allows 1-8 characters of UTF-8 text, not only whitespace.
const chars = [...ENTRY];
if (chars.length !== 1) {
  throw new Error(`expected exactly 1 emoji, got ${chars.length} characters`);
}
if (!/\p{Extended_Pictographic}/u.test(ENTRY)) {
  throw new Error("entry is not an emoji");
}
if (ENTRY.trim() === "") {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back guard: the file on disk must be byte-for-byte the single
// emoji, no trailing newline, no extra characters.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the single emoji exactly");
}
if (Buffer.byteLength(written, "utf8") !== 4) {
  throw new Error(`expected 4 UTF-8 bytes, got ${Buffer.byteLength(written, "utf8")}`);
}
