// One-shot: split Augustinus Bader deck screenshots into individual stills,
// trim deck margin, resize and encode to WebP.
//
// Source filenames contain U+202F (narrow no-break space) before "AM", so the
// directory is ALWAYS globbed — never hardcode a filename or it ENOENTs.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

// Resolve sharp from the repo's node_modules rather than this script's
// location, so the script can live outside the project while iterating.
const REPO =
  "/Users/blackpanther/Library/CloudStorage/GoogleDrive-dennis@filmhouseweddings.com/My Drive/MMG Site/Source Files/mmg";
const sharp = createRequire(path.join(REPO, "package.json"))("sharp");

const SRC = "/Users/blackpanther/Desktop/MMG Site/MMG DECKS/NR DECKS/Photos";
const OUT = process.argv[2];
if (!OUT) {
  console.error("usage: node build-ab-photos.mjs <outdir>");
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

// Crop boxes as fractions of each source, derived by eye from each screenshot.
// Keyed by the time portion of the filename. `boxes` are [x0,y0,x1,y1].
// `trim: false` for panels sitting on white where trim would eat the product.
const PLAN = {
  "8.02.46": {
    label: "product",
    boxes: [
      [0, 0, 0.435, 0.44],      // dark product shot, hard light
      [0, 0.44, 0.435, 1],      // marble surface, two bottles + cap
      [0.435, 0, 1, 1],         // grey field, The Cream + The Rich Cream
    ],
  },
  "8.02.52": { label: "product", trim: false, boxes: [[0, 0, 1, 1]] },
  "8.02.58": { label: "packaging", boxes: [[0, 0, 0.495, 1], [0.5, 0, 1, 1]] },
  "8.03.06": { label: "packaging", boxes: [[0, 0, 0.431, 1], [0.44, 0, 1, 1]] },
  "8.03.13": {
    label: "product",
    boxes: [
      [0, 0, 0.5, 0.53],        // bottle + long shadow, prism flare
      [0, 0.547, 0.5, 1],       // extreme close, Rich Cream label
      [0.5, 0, 1, 1],           // black field, two bottles reflected
    ],
  },
  // Resolved by inspection: split reads better than the wide shot, which was
  // mostly empty white field.
  "8.03.21": {
    label: "packaging",
    trim: false,
    boxes: [[0, 0, 0.5, 1], [0.5, 0, 1, 1]],
  },
  "8.03.29": { label: "editorial", boxes: [[0, 0, 0.51, 1], [0.51, 0, 1, 1]] },
  "8.03.36": { label: "editorial", boxes: [[0, 0, 1, 1]] },
  "8.03.45": { label: "editorial", boxes: [[0, 0, 0.47, 1], [0.47, 0, 1, 1]] },
  "8.03.52": { label: "editorial", boxes: [[0, 0, 1, 1]] },
  // 8.04.28 omitted: both panels duplicate photos already taken from
  // 8.03.52 and 8.03.45.
};

const files = fs
  .readdirSync(SRC)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .sort();

const manifest = [];

for (const file of files) {
  // Match the time key regardless of which whitespace precedes "AM".
  const key = Object.keys(PLAN).find((k) => file.includes(k));
  if (!key) {
    console.log(`SKIP (no plan entry): ${file}`);
    continue;
  }
  const spec = PLAN[key];
  const src = path.join(SRC, file);
  const meta = await sharp(src).metadata();

  for (let i = 0; i < spec.boxes.length; i++) {
    const [fx0, fy0, fx1, fy1] = spec.boxes[i];
    const left = Math.round(fx0 * meta.width);
    const top = Math.round(fy0 * meta.height);
    const width = Math.round((fx1 - fx0) * meta.width);
    const height = Math.round((fy1 - fy0) * meta.height);

    const suffix = spec.boxes.length > 1 ? `-${i + 1}` : "";
    const name = `${key.replace(/\./g, "")}${suffix}.webp`;
    const dest = path.join(OUT, name);

    let pipe = sharp(src).extract({ left, top, width, height });
    if (spec.trim !== false) {
      // threshold kept low so only true flat deck margin is removed
      pipe = pipe.trim({ threshold: 6 });
    }
    const info = await pipe
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(dest);

    const kb = Math.round(fs.statSync(dest).size / 1024);
    manifest.push({
      file: name,
      source: key,
      label: spec.label,
      w: info.width,
      h: info.height,
      kb,
    });
    console.log(
      `${name.padEnd(16)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}  ${String(kb).padStart(4)}KB  ${spec.label}`
    );
  }
}

fs.writeFileSync(
  path.join(OUT, "manifest.json"),
  JSON.stringify(manifest, null, 2)
);
const totalMB = (manifest.reduce((a, m) => a + m.kb, 0) / 1024).toFixed(1);
console.log(`\n${manifest.length} stills, ${totalMB}MB total`);
