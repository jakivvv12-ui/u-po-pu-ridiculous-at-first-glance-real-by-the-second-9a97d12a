const fs = require("fs");
const path = require("path");

// One-sentence startup pitch: a service that sounds ridiculous at first
// glance, then obviously real once the economics land.
const LINE =
  "We hire out professional apologizers to say sorry to your mother-in-law for you, because a $20 apology beats a $200 therapy session and a ruined Sunday dinner.";

// Guards: one line, at most 200 characters, no newline inside, not blank.
if ([...LINE].length > 200) {
  throw new Error(`entry line too long: ${[...LINE].length} characters (max 200)`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line is empty or whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must not contain a newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.txt";
const outFile = outDir.endsWith(".txt") ? outDir : path.join(outDir, "entry.txt");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, LINE + "\n", "utf8");
// Verify round-trip: exactly one line, byte-identical to LINE + newline.
const back = fs.readFileSync(outFile, "utf8");
if (back !== LINE + "\n") {
  throw new Error("round-trip verification failed");
}
console.log(`wrote ${outFile} (${[...LINE].length} chars)`);
