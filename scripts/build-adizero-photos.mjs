// One-shot: optimise the curated Adizero behind-the-scenes selection.
// These are camera originals (~20MP JPEG), so no cropping — resize + WebP only.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const REPO = path.resolve(import.meta.dirname, "..");
const sharp = createRequire(path.join(REPO, "package.json"))("sharp");

const SRC = "/Users/blackpanther/Desktop/MMG Site/Adizero BTS photos";
const OUT = process.argv[2] || path.join(REPO, "public/photos/adizero");
fs.mkdirSync(OUT, { recursive: true });

// Curated from 58 originals. Dropped: near-black frames, soft frames, and
// repeated takes of the same action. Ordered for visual rhythm — night and
// day, crew and talent, wide and tight alternating.
const PICKS = [
  ["7244-1",  "adz-director-field-night",   "Director walking the field between setups under stadium lights"],
  ["7330-20", "adz-jib-track",              "Crew running a jib rig along the running track at night"],
  ["7272-8",  "adz-athlete-throw-night",    "Athlete throwing under the lights on the darkened field"],
  ["7249-2",  "adz-operator-cart",          "Operator prepping the camera on a dolly cart"],
  ["7260-5",  "adz-huddle",                 "Athletes and crew regrouping between takes"],
  ["7318-18", "adz-operator-vest",          "Camera operator rigged into a stabiliser vest"],
  ["7292-12", "adz-two-athletes",           "Two athletes talking mid-field during a reset"],
  ["7267-7",  "adz-rig-bleachers",          "Operator working a gimbal rig in front of the bleachers"],
  ["7288-11", "adz-athlete-ball",           "Athlete holding the ball, waiting on the next take"],
  ["7308-16", "adz-crew-build",             "Crew building the camera rig on the sideline"],
  ["7323-19", "adz-lone-operator",          "Lone operator crossing the field beneath the goalposts"],
  ["7279-10", "adz-crew-athletes-night",    "Crew and athletes between setups on the night shoot"],
  ["7367-27", "adz-director-portrait",      "Director on the track in daylight"],
  ["7362-26", "adz-gimbal-day",             "Operator carrying a gimbal rig along the track"],
  ["7355-25", "adz-athlete-rest",           "Athlete resting against the goalpost padding between takes"],
  ["7424-32", "adz-director-points",        "Director framing up a shot with the camera team"],
  ["7380-30", "adz-ronin",                  "Operator running a Ronin rig on the sideline"],
  ["7446-34", "adz-backlit-walk",           "Crew walking back to set, backlit by low sun"],
  ["7492-37", "adz-jib-bench",              "Jib arm swung out over the team bench"],
  ["7461-35", "adz-crew-line",              "Crew lined along the track watching a take"],
  ["7612-48", "adz-director-laughing",      "Director laughing between setups, kit in hand"],
  ["7637-49", "adz-wide-hills",             "Wide of the unit working the field with hills behind"],
  ["7516-38", "adz-drone",                  "Drone on the track ready to launch for an aerial pass"],
  ["7670-52", "adz-athlete-throw-day",      "Athlete throwing in daylight as the drone tracks him"],
  ["7546-42", "adz-athlete-bench",          "Athlete lacing up on the bench before a take"],
  ["7714-58", "adz-op-filming-athletes",    "Operator filming two athletes running the play"],
];

const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
const manifest = [];

for (const [key, name, alt] of PICKS) {
  const match = files.find((f) => f.includes(key + "."));
  if (!match) {
    console.log(`MISSING: ${key}`);
    continue;
  }
  const dest = path.join(OUT, `${name}.webp`);
  const info = await sharp(path.join(SRC, match))
    .rotate() // honour EXIF orientation
    .resize(1800, 1800, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(dest);
  const kb = Math.round(fs.statSync(dest).size / 1024);
  manifest.push({ name, alt, w: info.width, h: info.height, kb });
  console.log(`${(name + ".webp").padEnd(30)} ${info.width}x${info.height}  ${String(kb).padStart(4)}KB`);
}

fs.writeFileSync(path.join(OUT, "..", "adizero-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} photos, ${(manifest.reduce((a, m) => a + m.kb, 0) / 1024).toFixed(1)}MB`);
