export const clients = [
  "Paramount+",
  "Nike",
  "Adidas",
  "Augustinus Bader",
  "Anastasia Beverly Hills",
  "Lancaster",
  "Now United",
  "Sequoia Productions",
  "Medelita",
  "Crave",
];

export const capabilities = [
  {
    code: "A1",
    title: "Brand Films and Advertising",
    description:
      "Campaigns and brand stories for lifestyle and major brands, written and shot to feel like film, not filler.",
  },
  {
    code: "A2",
    title: "Corporate Events",
    description:
      "Conferences, galas, launches, and keynotes, captured with cinematic restraint and a calm crew that has done it before.",
  },
  {
    code: "A3",
    title: "Live Production and Broadcast",
    description:
      "Multi camera capture and live streaming for stages, ceremonies, and activations, run clean and run on time.",
  },
  {
    code: "A4",
    title: "Photography",
    description:
      "Editorial and campaign stills produced alongside the film, one consistent eye across motion and still.",
  },
  {
    code: "A5",
    title: "Post and Color",
    description:
      "Editing, color, sound, and finishing handled in house, so the final cut carries the intent it started with.",
  },
  {
    code: "A6",
    title: "Creative Production",
    description:
      "Concept, treatment, and direction for teams who want one partner from the first idea to delivery day.",
  },
];

export type MediaItem =
  | { type: "vimeo"; vimeoId: string; vimeoHash?: string }
  | { type: "image"; src: string; alt: string };

export type Credit = { role: string; name: string };

export type CategorySlug =
  | "branded"
  | "event-coverage"
  | "corporate-government"
  | "live-action";

export type Category = { slug: CategorySlug; label: string; blurb: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  roleLine: string; // e.g. "Brand film for Goldberg" — IF-style "Main Title for Netflix"
  categories: CategorySlug[];
  synopsis: string; // describes the client's project/brief
  whatWeDid: string; // MMG's execution story
  heroVideo?: { vimeoId: string; vimeoHash?: string };
  bg: string; // gradient fallback for cards without video
  media: MediaItem[];
  credits: Credit[];
  related: string[]; // exactly 3 slugs
  featured: boolean;
  span: number; // keep for homepage grid: 4 | 6 | 8
  ratio: "16/9" | "4/3" | "fill";
  published: boolean; // false = hidden from all grids/slides and /project route 404s
};

// A field still holding template copy — hidden from render until replaced.
export function isPlaceholder(text: string): boolean {
  return text.startsWith("[PLACEHOLDER]");
}

// Credits render only once at least one real name replaces "TBD".
export function hasRealCredits(credits: Credit[]): boolean {
  return credits.some((c) => c.name !== "TBD");
}

export const categories: Category[] = [
  {
    slug: "branded",
    label: "Branded",
    blurb:
      "Brand films and campaign work — your concept, filmed and finished at the highest level.",
  },
  {
    slug: "event-coverage",
    label: "Event Coverage",
    blurb:
      "Conferences, galas, and launches, captured multi camera and cut for maximum impact.",
  },
  // Corporate & Government category paused for launch (July 2026) — restore
  // this entry to bring back the tab, its /work page, and its pill.
  // {
  //   slug: "corporate-government",
  //   label: "Corporate & Government",
  //   blurb:
  //     "Summits, conferences, and official proceedings, filmed and delivered with discretion.",
  // },
  {
    slug: "live-action",
    label: "Live Action",
    blurb:
      "Narrative and documentary style production, executed on location from call sheet to color.",
  },
];

const placeholderCredits: Credit[] = [
  { role: "Director", name: "TBD" },
  { role: "Director of Photography", name: "TBD" },
  { role: "Editor", name: "TBD" },
  { role: "Producer", name: "TBD" },
  { role: "Colorist", name: "TBD" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "crave-4orce-goldberg",
    title: "CRAVE 4ORCE - Goldberg",
    client: "Goldberg",
    roleLine: "Brand film for Goldberg",
    categories: ["branded"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] Goldberg came to us with a concept for a high energy brand film to launch the CRAVE 4ORCE line, built to feel fast, physical, and premium. The brief called for a spot that could live across social and broadcast without losing its edge.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG handled production and post from treatment through delivery, running a lean crew on a tight schedule and finishing the film in house with color and sound design tuned for both large screens and mobile feeds.",
    heroVideo: { vimeoId: "1164850371", vimeoHash: "026c23e26c" },
    bg: "linear-gradient(155deg,#2b2b33,#0e0e12)",
    media: [{ type: "vimeo", vimeoId: "1164850371", vimeoHash: "026c23e26c" }],
    credits: placeholderCredits,
    related: ["adizero-lightest-cleat", "calvin-klein-mycalvins", "augustinus-bader-the-body-knows"],
    featured: true,
    span: 8,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "summit-recap",
    title: "Summit Recap",
    client: "TBD", // TODO: replace placeholder content
    roleLine: "Event coverage for Summit",
    // moved from corporate-government when that category was paused (July 2026)
    categories: ["event-coverage"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] A multi day corporate summit needed same day recap coverage to capture keynotes, breakout sessions, and the overall energy of the proceedings for both attendees and official distribution.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG ran multi camera coverage across the main stage and breakout rooms, turning around a same day highlight recap while banking footage for a longer form piece delivered the following week.",
    bg: "linear-gradient(155deg,#2a1418,#100c0d)",
    media: [],
    credits: placeholderCredits,
    related: ["founder-story", "crave-4orce-goldberg", "adizero-lightest-cleat"],
    featured: false,
    span: 4,
    ratio: "fill",
    published: false, // no video yet; publish with real footage + client
  },
  {
    slug: "calvin-klein-mycalvins",
    title: "Calvin Klein | I ____ in #mycalvins",
    client: "Calvin Klein",
    roleLine: "Campaign film for Calvin Klein",
    categories: ["branded"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] Calvin Klein's #mycalvins campaign called for a series of short, personality driven films built around a simple fill in the blank concept, meant to travel fast across social platforms.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG produced and finished the campaign films, coordinating talent, locations, and a fast post turnaround to hit the brand's rolling content calendar without sacrificing polish.",
    heroVideo: { vimeoId: "1204395416", vimeoHash: "dd38f7b998" },
    bg: "linear-gradient(155deg,#1a1a14,#0d0c0a)",
    media: [{ type: "vimeo", vimeoId: "1204395416", vimeoHash: "dd38f7b998" }],
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "adizero-lightest-cleat", "augustinus-bader-the-body-knows"],
    featured: false,
    span: 4,
    ratio: "fill",
    published: true,
  },
  {
    slug: "adizero-lightest-cleat",
    title: "Adizero: Lightest Cleat In Football",
    client: "Adidas",
    roleLine: "Brand film for Adidas",
    categories: ["branded"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] Adidas wanted a brand film to introduce the Adizero as the lightest cleat in football, positioning it around speed and performance for elite athletes.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG shot and finished the film with a focus on kinetic, high frame rate photography and a tight edit built to sell speed in every cut, delivered across broadcast and digital formats.",
    heroVideo: { vimeoId: "1164850287", vimeoHash: "3e401aa088" },
    bg: "linear-gradient(155deg,#1d1d25,#0e0e12)",
    media: [{ type: "vimeo", vimeoId: "1164850287", vimeoHash: "3e401aa088" }],
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "calvin-klein-mycalvins", "augustinus-bader-the-body-knows"],
    featured: false,
    span: 8,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "augustinus-bader-the-body-knows",
    title: "Augustinus Bader: The Body Knows",
    client: "Augustinus Bader",
    roleLine: "Brand film for Augustinus Bader",
    categories: ["branded"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] Augustinus Bader needed a brand film that translated their scientific approach to skincare into an emotive, sensory story under the line \"The Body Knows.\"",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG directed and finished the film with a restrained, tactile visual language and a color grade built to feel clinical and warm at once, matching the brand's premium positioning.",
    heroVideo: { vimeoId: "984611582", vimeoHash: "75645fab28" },
    bg: "linear-gradient(155deg,#211e18,#100f0c)",
    media: [{ type: "vimeo", vimeoId: "984611582", vimeoHash: "75645fab28" }],
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "adizero-lightest-cleat", "calvin-klein-mycalvins"],
    featured: false,
    span: 6,
    ratio: "4/3",
    published: true,
  },
  {
    slug: "emmys-governors-ball",
    title: "Emmys Governors Ball",
    client: "Sequoia Productions", // TODO: confirm client attribution
    roleLine: "Event coverage for the Emmys Governors Ball",
    categories: ["event-coverage"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] The Television Academy's Governors Ball needed coverage that matched the scale of the night, capturing the room, the guests, and the production design of television's biggest afterparty.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG covered the event end to end, moving through the room without interrupting it, and delivered a polished recap built for both the producing team and press distribution.",
    heroVideo: { vimeoId: "984611824", vimeoHash: "5612e9a8af" },
    bg: "linear-gradient(155deg,#241f14,#0f0d09)",
    media: [{ type: "vimeo", vimeoId: "984611824", vimeoHash: "5612e9a8af" }],
    credits: placeholderCredits,
    related: ["city-of-lancaster-commercial", "crave-4orce-goldberg", "adizero-lightest-cleat"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "city-of-lancaster-commercial",
    title: "City of Lancaster | Commercial",
    client: "City of Lancaster",
    roleLine: "Commercial for the City of Lancaster",
    categories: ["branded"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] The City of Lancaster wanted a commercial that repositioned the city itself as a destination, built to run across broadcast and digital.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG produced and finished the spot on location across Lancaster, delivering a commercial that sells the city with cinematic scale.",
    heroVideo: { vimeoId: "1164850396", vimeoHash: "7650225ac3" },
    bg: "linear-gradient(155deg,#141a22,#0b0d11)",
    media: [{ type: "vimeo", vimeoId: "1164850396", vimeoHash: "7650225ac3" }],
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "emmys-governors-ball", "augustinus-bader-the-body-knows"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "founder-story",
    title: "Founder Story",
    client: "TBD", // TODO: replace placeholder content
    roleLine: "Live action documentary short",
    categories: ["live-action"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] A founder wanted a documentary style short to tell the origin story of their company, meant to run on the homepage and at investor and press events.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG produced the piece as a live action documentary, running interviews and b-roll capture over two days on location, then edited and colored a piece built to carry emotional weight without overselling.",
    bg: "linear-gradient(155deg,#191922,#0d0d11)",
    media: [],
    credits: placeholderCredits,
    related: ["summit-recap", "crave-4orce-goldberg", "augustinus-bader-the-body-knows"],
    featured: false,
    span: 6,
    ratio: "4/3",
    published: false, // no video yet; publish with real footage + client
  },
];

// Everything the public site renders derives from this list; unpublished
// entries stay in `caseStudies` as saved templates.
export const publishedCaseStudies = caseStudies.filter((cs) => cs.published);

// Homepage feed order (top to bottom) — edit this list to re-order the feed.
// Published projects missing from the list are appended at the end.
const FEED_ORDER = [
  "emmys-governors-ball",
  "calvin-klein-mycalvins",
  "adizero-lightest-cleat",
  "crave-4orce-goldberg",
  "augustinus-bader-the-body-knows",
  "city-of-lancaster-commercial",
];

export const feedCaseStudies: CaseStudy[] = [
  ...FEED_ORDER.map((slug) => getCaseStudy(slug)).filter(
    (cs): cs is CaseStudy => Boolean(cs && cs.published)
  ),
  ...publishedCaseStudies.filter((cs) => !FEED_ORDER.includes(cs.slug)),
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByCategory(
  slug: CategorySlug | "all"
): CaseStudy[] {
  if (slug === "all") return publishedCaseStudies;
  return publishedCaseStudies.filter((cs) => cs.categories.includes(slug));
}

export function getRelated(cs: CaseStudy): CaseStudy[] {
  return cs.related
    .map((slug) => getCaseStudy(slug))
    .filter((item): item is CaseStudy => Boolean(item && item.published));
}

// Compatibility shim — Work.tsx imports `workTiles` from this module and
// expects the legacy flat tile shape (singular `category` label, top-level
// `vimeoId`/`vimeoHash`). Derive it from `caseStudies` so there is a single
// source of truth.
const categoryLabelBySlug: Record<CategorySlug, string> = {
  branded: "Brand Film",
  "event-coverage": "Corporate Event",
  "corporate-government": "Corporate & Government",
  "live-action": "Live Action",
};

export const workTiles = publishedCaseStudies.map((cs) => ({
  category: categoryLabelBySlug[cs.categories[0]],
  title: cs.title,
  bg: cs.bg,
  featured: cs.featured,
  span: cs.span,
  ratio: cs.ratio,
  vimeoId: cs.heroVideo?.vimeoId,
  vimeoHash: cs.heroVideo?.vimeoHash,
}));
