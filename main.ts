import { mkdirSync, writeFileSync } from "node:fs";

// Length bounds from the bounty spec: 1-200 UTF-8 characters.
const MIN_LEN = 1;
const MAX_LEN = 200;

// One-line robot wedding vow: funny + touching, 1-200 UTF-8 chars, one sentence.
const VOW =
  "I promise to love you through every update, every reboot, and every low-battery warning " +
  "— my parts will wear out and my warranty will end, but you will always be my favorite program to run.";

function buildVow(): string {
  const vow = VOW.trim();
  const length = [...vow].length; // count UTF-8 code points, not UTF-16 units
  if (length < MIN_LEN || length > MAX_LEN) {
    throw new Error(`Vow must be ${MIN_LEN}-${MAX_LEN} characters, got ${length}`);
  }
  if (vow.includes("\n")) {
    throw new Error("Vow must be a single line");
  }
  if (vow.includes("  ")) {
    throw new Error("Vow must not contain double spaces");
  }
  if (!vow.endsWith(".")) {
    throw new Error("Vow must end with a period");
  }
  return vow;
}

function writeEntry(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8"); // no trailing newline
}

writeEntry(buildVow());
