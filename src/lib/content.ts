export const clients = [
  "Anthropic",
  "Nike",
  "Adidas",
  "Paramount+",
  "Augustinus Bader",
  "Anastasia Beverly Hills",
  "XIX Entertainment",
  "Now United",
  "Sequoia Productions",
];

// Single source for the services list: the Work page renders it and the SEO
// schema and llms.txt describe it, so they cannot drift apart.
export const services = [
  "Brand films",
  "Event coverage",
  "Launch and activation coverage",
  "Red carpet and talent interviews",
  "Same day recaps",
  "Social cutdowns",
  "Photography",
  "Motion graphics",
];

export const capabilities = [
  {
    code: "A1",
    title: "Brand Films",
    description:
      "Campaign and brand films for lifestyle and major brands, built from your concept and shot to feel like film, not filler.",
  },
  {
    code: "A2",
    title: "Corporate Events",
    description:
      "Conferences, galas, launches, and keynotes, captured with cinematic restraint and a calm crew that has done it before.",
  },
  {
    code: "A3",
    title: "Photography",
    description:
      "Editorial and campaign stills produced alongside the film, one consistent eye across motion and still.",
  },
  {
    code: "A4",
    title: "Post and Color",
    description:
      "Editing, color, sound, and finishing handled in house, so the final cut carries the intent it started with.",
  },
  {
    code: "A5",
    title: "Production Support",
    description:
      "Shot lists, treatments, and run of show built from your brief, so your concept lands the way you pictured it.",
  },
];

export type MediaItem =
  | { type: "vimeo"; vimeoId: string; vimeoHash?: string }
  | { type: "image"; src: string; alt: string };

export type Credit = { role: string; name: string };

// Stills shown in the collage under a case study's film. Intrinsic w/h are
// required so the grid reserves space and nothing has to be cropped.
export type Photo = { src: string; alt: string; w: number; h: number };

// Long-form editorial sections rendered under "What We Did". Used by pages
// that need more than the standard synopsis + execution pair — an event
// overview, a process breakdown — without giving each one a bespoke route.
export type Section = {
  kicker: string; // small accent label above the block
  body?: string[]; // paragraphs
  bullets?: { label: string; text: string }[]; // optional labelled list
};

// Emitted as Event structured data when present. `startDate` is optional so a
// page can ship before the date is confirmed; add it and the schema completes.
export type EventInfo = {
  name: string;
  description: string;
  startDate?: string; // ISO 8601, e.g. "2026-08-09"
  locality: string;
  region: string;
  country: string;
  venueName?: string;
  organizerName: string;
  organizerUrl?: string;
};

export type CategorySlug =
  | "events-launches"
  | "brand-campaigns"
  | "social-short-form"
  | "photography"
  | "fashion-apparel"
  | "public-sector";

export type Category = { slug: CategorySlug; label: string; blurb: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  roleLine: string; // e.g. "Brand film for CRAVE" — IF-style "Main Title for Netflix"
  categories: CategorySlug[];
  synopsis: string; // describes the client's project/brief
  whatWeDid: string; // MMG's execution story; "\n\n" separates paragraphs
  metaDescription?: string; // overrides synopsis in <meta description>
  sections?: Section[]; // optional long-form blocks under "What We Did"
  event?: EventInfo; // rendered as Event schema when the work covers an event
  heroVideo?: { vimeoId: string; vimeoHash?: string };
  vertical?: boolean; // 9:16 film: the project page plays it in a tall, centered frame
  youtubeId?: string; // YouTube only (trailers we do not host on Vimeo); project page embeds it, feed and slideshow ignore it
  bg: string; // gradient fallback for cards without video
  media: MediaItem[];
  photos?: Photo[]; // optional stills collage, rendered beneath the film
  photosLayout?: "stack"; // "stack" = full width, one per row (for pre-made collages)
  photosAtTop?: boolean; // show the stills right under the title instead of near the bottom
  photosLabel?: string; // kicker above the collage; defaults to "Photography"
  credits: Credit[];
  related: string[]; // exactly 3 slugs
  featured: boolean;
  span: number; // keep for homepage grid: 4 | 6 | 8
  ratio: "16/9" | "4/3" | "fill";
  published: boolean; // false = hidden from all grids/slides and /project route 404s
  caseStudy?: boolean; // shown in the Case studies strip on /work
  stat?: { value: string; label: string }; // the big number on its strip card
  stripPhotos?: Photo[]; // stills that fade in over the strip while the card is hovered
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
    slug: "events-launches",
    label: "Events and launches",
    blurb:
      "Events, launches, and press moments, captured multi camera and delivered fast.",
  },
  {
    slug: "brand-campaigns",
    label: "Brand and campaigns",
    blurb:
      "Brand films and campaign work. Your concept, filmed and finished at the highest level.",
  },
  {
    slug: "social-short-form",
    label: "Social and short form",
    blurb:
      "Vertical cutdowns, recaps, and fast turnaround clips built to post the same day.",
  },
  {
    slug: "photography",
    label: "Photography",
    blurb: "Event, campaign, and press stills, produced alongside the film.",
  },
  {
    slug: "fashion-apparel",
    label: "Fashion and apparel",
    blurb:
      "Apparel, footwear, and streetwear content with an edge, shot to feel modern.",
  },
  {
    slug: "public-sector",
    label: "Public sector",
    blurb:
      "Cities and public agencies, produced with the same crew, care, and finish we bring to brands.",
  },
];

const placeholderCredits: Credit[] = [
  { role: "Director", name: "TBD" },
  { role: "Director of Photography", name: "TBD" },
  { role: "Editor", name: "TBD" },
  { role: "Producer", name: "TBD" },
  { role: "Colorist", name: "TBD" },
];

// Campaign stills, split out of the Augustinus Bader photo deck. Ordered for
// visual rhythm rather than by source file — editorial and product alternate
// so the collage doesn't read as two separate blocks.
const augustinusBaderPhotos: Photo[] = [
  { src: "/photos/augustinus-bader/ab-moss-portrait.webp", w: 2300, h: 1718,
    alt: "Silver haired model seated on volcanic moss beneath an open Icelandic sky" },
  { src: "/photos/augustinus-bader/ab-portrait-wind.webp", w: 1176, h: 1724,
    alt: "Model on a grass hillside, hair caught across her face in the wind" },
  { src: "/photos/augustinus-bader/ab-duo-on-black.webp", w: 1118, h: 1716,
    alt: "The Cream and The Rich Cream bottles on black" },
  { src: "/photos/augustinus-bader/ab-bottle-long-shadow.webp", w: 998, h: 752,
    alt: "The Cream bottle and copper cap under hard light with a long shadow" },
  { src: "/photos/augustinus-bader/ab-portrait-curls.webp", w: 1218, h: 1728,
    alt: "Close portrait of a model with natural curls against a grey backdrop" },
  { src: "/photos/augustinus-bader/ab-box-with-bottles.webp", w: 1282, h: 1720,
    alt: "Augustinus Bader gift box with The Cream and The Rich Cream" },
  { src: "/photos/augustinus-bader/ab-highland-dress.webp", w: 2302, h: 1718,
    alt: "Model in a white dress seated on a green highland hillside" },
  { src: "/photos/augustinus-bader/ab-portrait-freckles.webp", w: 1072, h: 1722,
    alt: "Portrait of a freckled man in a safari shirt, hand at his collar" },
  { src: "/photos/augustinus-bader/ab-marble-duo.webp", w: 1296, h: 1726,
    alt: "The Cream and The Rich Cream on marble beneath soft window light" },
  { src: "/photos/augustinus-bader/ab-bottle-light-flare.webp", w: 1148, h: 906,
    alt: "A bottle in a beam of light with a long shadow and lens flare" },
  { src: "/photos/augustinus-bader/ab-portrait-shoulder.webp", w: 1110, h: 1720,
    alt: "Close portrait of a blonde model, chin resting on her shoulder" },
];

// Landscape stills used for the hover preview on the Case studies strip.
const augustinusBaderStripPhotos: Photo[] = augustinusBaderPhotos.filter(
  (p) => p.w > p.h && p.w >= 1500
);

// Behind-the-scenes stills from the Adizero shoot, curated down from 58 camera
// originals: near-black frames, soft frames and repeated takes were dropped.
const adizeroPhotos: Photo[] = [
  { src: "/photos/adizero/adz-director-field-night.webp", w: 1200, h: 1800,
    alt: "Director walking the field between setups under stadium lights" },
  { src: "/photos/adizero/adz-jib-track.webp", w: 1200, h: 1800,
    alt: "Crew running a jib rig along the running track at night" },
  { src: "/photos/adizero/adz-athlete-throw-night.webp", w: 1200, h: 1800,
    alt: "Athlete throwing under the lights on the darkened field" },
  { src: "/photos/adizero/adz-operator-cart.webp", w: 1200, h: 1800,
    alt: "Operator prepping the camera on a dolly cart" },
  { src: "/photos/adizero/adz-huddle.webp", w: 1200, h: 1800,
    alt: "Athletes and crew regrouping between takes" },
  { src: "/photos/adizero/adz-operator-vest.webp", w: 1200, h: 1800,
    alt: "Camera operator rigged into a stabiliser vest" },
  { src: "/photos/adizero/adz-two-athletes.webp", w: 1200, h: 1800,
    alt: "Two athletes talking mid-field during a reset" },
  { src: "/photos/adizero/adz-rig-bleachers.webp", w: 1800, h: 1200,
    alt: "Operator working a gimbal rig in front of the bleachers" },
  { src: "/photos/adizero/adz-athlete-ball.webp", w: 1200, h: 1800,
    alt: "Athlete holding the ball, waiting on the next take" },
  { src: "/photos/adizero/adz-crew-build.webp", w: 1200, h: 1800,
    alt: "Crew building the camera rig on the sideline" },
  { src: "/photos/adizero/adz-lone-operator.webp", w: 1200, h: 1800,
    alt: "Lone operator crossing the field beneath the goalposts" },
  { src: "/photos/adizero/adz-crew-athletes-night.webp", w: 1200, h: 1800,
    alt: "Crew and athletes between setups on the night shoot" },
  { src: "/photos/adizero/adz-director-portrait.webp", w: 1200, h: 1800,
    alt: "Director on the track in daylight" },
  { src: "/photos/adizero/adz-gimbal-day.webp", w: 1200, h: 1800,
    alt: "Operator carrying a gimbal rig along the track" },
  { src: "/photos/adizero/adz-athlete-rest.webp", w: 1200, h: 1800,
    alt: "Athlete resting against the goalpost padding between takes" },
  { src: "/photos/adizero/adz-director-points.webp", w: 1200, h: 1800,
    alt: "Director framing up a shot with the camera team" },
  { src: "/photos/adizero/adz-ronin.webp", w: 1200, h: 1800,
    alt: "Operator running a Ronin rig on the sideline" },
  { src: "/photos/adizero/adz-backlit-walk.webp", w: 1200, h: 1800,
    alt: "Crew walking back to set, backlit by low sun" },
  { src: "/photos/adizero/adz-jib-bench.webp", w: 1800, h: 1200,
    alt: "Jib arm swung out over the team bench" },
  { src: "/photos/adizero/adz-crew-line.webp", w: 1200, h: 1800,
    alt: "Crew lined along the track watching a take" },
  { src: "/photos/adizero/adz-director-laughing.webp", w: 1200, h: 1800,
    alt: "Director laughing between setups, kit in hand" },
  { src: "/photos/adizero/adz-wide-hills.webp", w: 1800, h: 1200,
    alt: "Wide of the unit working the field with hills behind" },
  { src: "/photos/adizero/adz-drone.webp", w: 1200, h: 1800,
    alt: "Drone on the track ready to launch for an aerial pass" },
  { src: "/photos/adizero/adz-athlete-throw-day.webp", w: 1200, h: 1800,
    alt: "Athlete throwing in daylight as the drone tracks him" },
  { src: "/photos/adizero/adz-athlete-bench.webp", w: 1200, h: 1800,
    alt: "Athlete lacing up on the bench before a take" },
  { src: "/photos/adizero/adz-op-filming-athletes.webp", w: 1200, h: 1800,
    alt: "Operator filming two athletes running the play" },
];

const jcpenneyPhotos: Photo[] = [
  { src: "/photos/jcpenney/jcp-climbing-selfie.webp", w: 2000, h: 1047,
    alt: "Mother and daughter taking a selfie in front of a climbing wall" },
  { src: "/photos/jcpenney/jcp-soldier-window.webp", w: 2000, h: 1105,
    alt: "Service member in uniform looking out a window" },
];

const cravePhotos: Photo[] = [
  { src: "/photos/crave/crave-collage-1-selfies.webp", w: 2000, h: 1115,
    alt: "Three CRAVE campaign photos: a woman taking a selfie on the beach, a woman and her dog on a boat, a woman holding a star at sunset" },
  { src: "/photos/crave/crave-collage-2-everyday.webp", w: 2000, h: 1119,
    alt: "Three CRAVE campaign photos: a motorcyclist checking a phone, a blue CRAVE case among berries and flowers, a woman using her phone in a cafe booth" },
  { src: "/photos/crave/crave-collage-3-coast.webp", w: 2000, h: 1115,
    alt: "Three CRAVE campaign photos: two friends walking a coastal cliff, a blue CRAVE case on a sofa with a magazine, two friends leaning on a vintage truck on the beach" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "claude-impact-lab-los-angeles",
    title: "Claude Impact Lab: Los Angeles",
    client: "Claude Community Events",
    roleLine: "Event coverage for Claude Community Events",
    categories: ["events-launches"],
    metaDescription:
      "Inside the Claude Impact Lab in Los Angeles, the full day build event where the Claude Community turned a question about AI and work into working prototypes.",
    synopsis:
      "The Claude Impact Lab is a full day, in person build event hosted by Claude Community Events, the network of local groups who meet around the world to build with Anthropic's Claude. In Los Angeles, the Impact Lab brought together developers, non developers, and everyone in between for one goal: turn a single question, raised by the local community itself, into a working prototype by the end of the day.",
    // TODO: confirm MMG's exact scope on the day — full day coverage, a single
    // segment, or interviews — and make this line specific.
    whatWeDid:
      "Make Move Grow was on site to capture the day in film, from the morning brief through the final demos.",
    sections: [
      {
        kicker: "Who organizes it",
        body: [
          "Claude Impact Labs and Claude Conversations are organized locally under Claude Community Events, a global program of grassroots meetups for people who build with Claude, the AI assistant made by Anthropic. The Los Angeles chapter is hosted by Travis Johnson and Evan Grenda.",
        ],
      },
    ],
    // TODO: add `startDate` once the build day is confirmed — the Event schema
    // is incomplete without it and dated events surface more precisely.
    event: {
      name: "Claude Impact Lab: Los Angeles",
      description:
        "A full day, in person build event where the Los Angeles Claude Community formed teams and built working prototypes around a problem raised at the July 24 Claude Conversation.",
      locality: "Los Angeles",
      region: "CA",
      country: "US",
      organizerName: "Claude Community Events",
    },
    heroVideo: { vimeoId: "1220956795", vimeoHash: "b0599cfcef" },
    bg: "linear-gradient(155deg,#2a1e16,#100b09)",
    media: [{ type: "vimeo", vimeoId: "1220956795", vimeoHash: "b0599cfcef" }],
    credits: placeholderCredits,
    related: [
      "emmys-governors-ball",
      "city-of-lancaster-commercial",
      "crave-4orce-goldberg",
    ],
    featured: false,
    span: 8,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "crave-4orce-goldberg",
    title: "CRAVE 4ORCE - Goldberg",
    client: "CRAVE",
    roleLine: "Campaign and commercials for CRAVE, featuring Bill Goldberg",
    categories: ["brand-campaigns"],
    metaDescription:
      "How we helped CRAVE build a digital brand: the #cravetheadventure campaign, a 13,000 member Facebook community, and three films including CRAVE 4ORCE featuring Bill Goldberg and the product launch film Dive.",
    synopsis:
      "CRAVE is an e commerce company that sells travel accessories made to support everyday life. It came to us for a brand overhaul for the digital space. Outside of Amazon listings it had no digital presence, and it needed to speak directly to its audience and cut through the noise of its many competitors.",
    whatWeDid:
      "We came alongside the CRAVE team to add to the desirability of the product and tie it back to the people who use it, giving the brand a face to match its name. After intensive strategy meetings, we developed the campaign around a community of adventurers.\n\nThe 5 month campaign ran in phases, from production of the visual assets, to building the community on Facebook and Instagram, to bringing on brand ambassadors, micro influencers whose daily lives matched the message. User generated giveaways stretched organic reach beyond the everyday adventurer. Three films came out of the campaign: the commercials CRAVE 4ORCE, featuring Bill Goldberg, and Power Your Day, and Dive, a product launch film. CRAVE 4ORCE and Dive were both built to show the strength of the charging cable.",
    sections: [
      {
        kicker: "The result",
        body: [
          "The branding campaign, #cravetheadventure, doubled as a brand signifier. It gathered a community of adventurers and moved the products from an online only listing into the everyday travel kit.",
        ],
        bullets: [
          { label: "13,000 Facebook community", text: "Built over the 5 month campaign." },
          { label: "5,000 Instagram followers", text: "Built over the same period." },
          { label: "3 films", text: "CRAVE 4ORCE, featuring Bill Goldberg, Power Your Day, and the product launch film Dive." },
        ],
      },
      {
        kicker: "Services",
        body: [
          "Copywriting, social media strategy and management, influencer onboarding, story concepting, script writing, photo and video content creation (pre production, production, and post production), and graphic design.",
        ],
      },
    ],
    photos: cravePhotos,
    photosLabel: "Campaign photography",
    photosLayout: "stack",
    stripPhotos: cravePhotos,
    heroVideo: { vimeoId: "1164850371", vimeoHash: "026c23e26c" },
    bg: "linear-gradient(155deg,#2b2b33,#0e0e12)",
    media: [
      { type: "vimeo", vimeoId: "1164850371", vimeoHash: "026c23e26c" },
      // Dive and Power Your Day also live as their own projects.
      { type: "vimeo", vimeoId: "1235204172", vimeoHash: "ed84c5335c" },
      { type: "vimeo", vimeoId: "1235219771", vimeoHash: "56e421b693" },
    ],
    credits: placeholderCredits,
    related: ["crave-dive-product-launch", "crave-power-your-day", "augustinus-bader-the-body-knows"],
    featured: true,
    span: 8,
    ratio: "16/9",
    published: true,
    caseStudy: true,
    stat: { value: "13K", label: "member Facebook community in 5 months, plus 3 films" },
  },
  {
    slug: "summit-recap",
    title: "Summit Recap",
    client: "TBD", // TODO: replace placeholder content
    roleLine: "Event coverage for Summit",
    // moved from corporate-government when that category was paused (July 2026)
    categories: ["events-launches"],
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
    categories: ["brand-campaigns", "fashion-apparel"],
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
    categories: ["brand-campaigns", "fashion-apparel"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] Adidas wanted a brand film to introduce the Adizero as the lightest cleat in football, positioning it around speed and performance for elite athletes.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG shot and finished the film with a focus on kinetic, high frame rate photography and a tight edit built to sell speed in every cut, delivered across broadcast and digital formats.",
    heroVideo: { vimeoId: "1164850287", vimeoHash: "3e401aa088" },
    bg: "linear-gradient(155deg,#1d1d25,#0e0e12)",
    media: [{ type: "vimeo", vimeoId: "1164850287", vimeoHash: "3e401aa088" }],
    photos: adizeroPhotos,
    photosLabel: "Behind the Scenes",
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
    roleLine: "Launch campaign production for Augustinus Bader",
    categories: ["brand-campaigns", "photography"],
    metaDescription:
      "How we produced the Augustinus Bader launch campaign, The Body Knows: 25 people across 3 nations over 3 months, shot in Germany, Iceland, and Los Angeles.",
    synopsis:
      "Augustinus Bader is an international high end biotech skincare company whose formula activates the body's own stem cells to rejuvenate skin and repair blemishes, burns, and scars once thought permanent. Months before launch, the brand had no content at all. It needed a full campaign to tell its story across digital media and drive sales, on an extremely tight deadline.",
    whatWeDid:
      "We came alongside the brand's team, starting by sitting with them to learn the details of its story and backstory, then built the campaign around it, \"The Body Knows,\" through to final approved revisions. With launch quickly approaching, we assembled a team from the ground up that could execute a full campaign at a high level.\n\nThe campaign embodied the brand and told every part of its story through commercial video content and photography, connecting the brand and its product to the elements of nature. The team traveled the world to capture it, three weeks across Germany and Iceland, followed by a week of shooting back in Los Angeles, on location and in the studio, then a month of editing.",
    sections: [
      {
        kicker: "By the numbers",
        bullets: [
          { label: "25 people across 3 nations", text: "One team, assembled from the ground up, working over a 3 month period." },
          { label: "3 weeks on location", text: "Filming across Germany and Iceland." },
          { label: "1 week in Los Angeles", text: "Shooting on location and in the studio." },
          { label: "1 month of editing", text: "Cutting the campaign after the shoot wrapped." },
        ],
      },
      {
        kicker: "Services",
        body: [
          "Concepting, scripting, photo and video content creation (pre production, production, and post production), photo retouching, behind the scenes, VFX, color, and original music composition.",
        ],
      },
    ],
    heroVideo: { vimeoId: "1235204171", vimeoHash: "047c2b892a" },
    bg: "linear-gradient(155deg,#211e18,#100f0c)",
    media: [{ type: "vimeo", vimeoId: "1235204171", vimeoHash: "047c2b892a" }],
    photos: augustinusBaderPhotos,
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "adizero-lightest-cleat", "calvin-klein-mycalvins"],
    featured: false,
    span: 6,
    ratio: "4/3",
    published: true,
    caseStudy: true,
    stat: { value: "25 people", label: "across 3 nations in 3 months, Germany to Iceland to LA" },
    stripPhotos: augustinusBaderStripPhotos,
  },
  {
    slug: "emmys-governors-ball",
    title: "Emmys Governors Ball",
    client: "Sequoia Productions",
    roleLine: "Event coverage for Sequoia Productions",
    categories: ["events-launches"],
    metaDescription:
      "Live event film for the Emmys Governors Ball, produced for Sequoia Productions. MMG covered the night and finished in house.",
    synopsis:
      "The Governors Ball is the official after-party of the Primetime Emmy Awards. Sequoia Productions trusted MMG to film the night live, under the same clock as national broadcast.",
    whatWeDid:
      "We covered arrivals, stage moments, and floor energy with a lean crew, then finished in house so files could turn around clean for brand and social use.\n\nThis is the kind of live event work MMG does for producers, PR teams, and brands whose events do not get a second take.",
    sections: [
      {
        kicker: "What we delivered",
        body: ["Live night event film, in house edit and color, files ready for brand and social cutdowns."],
      },
    ],
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
    slug: "nfl-pro-bowl-recap",
    title: "NFL Pro Bowl Recap",
    client: "AwesomenessTV",
    roleLine: "Event coverage for AwesomenessTV",
    categories: ["events-launches", "social-short-form"],
    // TODO: replace placeholder content
    synopsis:
      "[PLACEHOLDER] AwesomenessTV needed a recap of the NFL Pro Bowl that captured the energy of the weekend for its audience.",
    // TODO: replace placeholder content
    whatWeDid:
      "[PLACEHOLDER] MMG covered the event and delivered a fast turnaround recap built for social distribution.",
    heroVideo: { vimeoId: "1140164075", vimeoHash: "4250270e36" },
    bg: "linear-gradient(155deg,#14202b,#090d12)",
    media: [{ type: "vimeo", vimeoId: "1140164075", vimeoHash: "4250270e36" }],
    credits: placeholderCredits,
    related: ["emmys-governors-ball", "claude-impact-lab-los-angeles", "city-of-lancaster-commercial"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "anastasia-beverly-hills-oscars",
    title: "Anastasia Beverly Hills x Oscars",
    client: "Anastasia Beverly Hills",
    roleLine: "Post production for Anastasia Beverly Hills",
    categories: ["social-short-form"],
    // MMG did post production only on this one; we did not shoot it. TODO (Dennis): year, what the edit covered (color, sound, graphics?).
    metaDescription:
      "Vertical Oscars event recap for Anastasia Beverly Hills. MMG handled post production, cutting the footage into a recap built for social.",
    synopsis:
      "Anastasia Beverly Hills teamed up with the Oscars and needed a vertical event recap ready for social.",
    whatWeDid:
      "MMG handled post production only. We took the footage and cut it into a vertical recap built for social, then finished it in house.",
    heroVideo: { vimeoId: "1234162900", vimeoHash: "0c45cb4bd7" },
    vertical: true,
    bg: "linear-gradient(155deg,#2b1a20,#110a0d)",
    media: [{ type: "vimeo", vimeoId: "1234162900", vimeoHash: "0c45cb4bd7" }],
    credits: placeholderCredits,
    related: ["emmys-governors-ball", "nfl-pro-bowl-recap", "chera-tv-launch-party"],
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
    categories: ["public-sector", "brand-campaigns"],
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
    slug: "ace-family-usc-charity-event",
    title: "The ACE Family: USC Charity Event",
    client: "The ACE Family",
    roleLine: "Event film for The ACE Family",
    categories: ["events-launches", "social-short-form"],
    metaDescription:
      "How we produced content for The ACE Family, one of YouTube's fastest growing family channels, including an overnight turnaround on the USC Charity Event. Over 66 million combined views.",
    synopsis:
      "The ACE Family is one of the fastest growing family channels on YouTube, with 15 million subscribers at the time and an audience of Gen Z and Millennials. They came to us with a wave of ideas for multiple projects and wanted their content to stand above the rest, from the channel itself to upcoming events and even the traditional film world, all on short timelines.",
    // TODO: add USC Charity Event date and who it raised money for.
    whatWeDid:
      "We came alongside the family's team. Working with YouTubers is not always easy. Schedules change and concepts do not always go as planned. So we developed ideas while staying on call, ready to move at a moment's notice on expedited timelines. For events that allowed it, we planned in advance. For the ones that did not, we executed in real time, on the fly.\n\nFor the USC Charity Event, the turnaround was overnight. A crew of 5 to 10 shot the event, and our team edited through the night.\n\nWe intermixed our cinematic content with their vlog footage, creating a quality of production the family channel space had not seen before, a far cry from the original vlog style.",
    sections: [
      {
        kicker: "By the numbers",
        bullets: [
          { label: "Overnight turnaround", text: "USC Charity Event, shot by a crew of 5 to 10 and edited through the night by our team." },
          { label: "66 million plus views", text: "Combined YouTube views on the videos we shot for The ACE Family alone." },
          { label: "15 million subscribers", text: "On the channel at the time, with the family at the top of the leading family channels on YouTube." },
        ],
      },
      {
        kicker: "Services",
        body: [
          "Idea conceptualization, copywriting, video production, editing, visual effects, color, photography, photo retouching, social media strategy, and graphic design.",
        ],
      },
    ],
    bg: "linear-gradient(155deg,#1f2a1a,#0c100a)",
    media: [],
    credits: placeholderCredits,
    related: ["emmys-governors-ball", "claude-impact-lab-los-angeles", "nfl-pro-bowl-recap"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: false, // PULLED from the public site (sensitive client). Kept here as an archived template only.
    stat: { value: "66M+", label: "combined YouTube views on the videos we shot" },
  },
  {
    slug: "jcpenney-worth-it",
    title: "JCPenney: Worth It",
    client: "JCPenney",
    roleLine: "Campaign commercials for JCPenney, with AwesomenessTV",
    categories: ["brand-campaigns"],
    metaDescription:
      "How we produced JCPenney's Worth It back to school campaign with AwesomenessTV: five commercials shot over 10 consecutive days, with over 5 million views on Facebook.",
    synopsis:
      "J.C. Penney is a national American department store chain offering affordable clothing and household appliances. Working with its agency, AwesomenessTV, JCPenney asked us to help conceptualize a campaign to reclaim its position as the trusted, trendy go to clothing retailer, aimed at the back to school season. The school year was a couple of months out and moms across America were getting ready to shop for new clothes and school items for their kids, so timing and trends mattered.",
    whatWeDid:
      "We came alongside AwesomenessTV and the JCPenney team, and time was against us, so we moved quickly to settle on the focus and approach of the campaign. The household marketplace has many angles, and we needed one that could be relatable to a wide range of people, while keeping the desirability of the product and the heart of the consumer in focus. We took an all encompassing idea and hit home across many different lives.\n\nWe settled on the Modern American Mom and the importance of relationships. That created a feeling of intimacy between the brand and the family, while quietly showing that JCPenney understands current product trends and is a contender in the everyday retail space. The spots included \"Where Did Summer Go?\" and \"Home Is Where Family Is.\"",
    sections: [
      {
        kicker: "By the numbers",
        bullets: [
          { label: "5 commercial slots", text: "Shot over a consecutive 10 day period." },
          { label: "5 million plus views", text: "On Facebook, renewing the buzz around the JCPenney brand." },
        ],
      },
      {
        kicker: "Services",
        body: ["Conceptualization, script writing, pre production, production, and post production."],
      },
    ],
    bg: "linear-gradient(155deg,#2a1a1a,#100a0a)",
    media: [],
    photos: jcpenneyPhotos,
    photosAtTop: true,
    photosLabel: "Stills",
    stripPhotos: jcpenneyPhotos,
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "calvin-klein-mycalvins", "adizero-lightest-cleat"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true, // text only: no video, so it stays out of the homepage feed (see feedCaseStudies)
    caseStudy: true,
    stat: { value: "5M+", label: "Facebook views, 5 commercials shot in 10 days" },
  },
  {
    slug: "1212-gateway-brand-film",
    title: "1212 Gateway | Brand Film",
    client: "1212 Gateway",
    roleLine: "Beauty brand film for 1212 Gateway",
    categories: ["brand-campaigns", "photography"],
    // TODO (Dennis): confirm the client name and spelling, add the Vimeo link, year, synopsis, results.
    // Instagram @ownthelight credits this film to Producer Dennis Mulyar and DP Sam Windell.
    synopsis: "[PLACEHOLDER] Beauty campaign brand film for 1212 Gateway.",
    whatWeDid: "[PLACEHOLDER] What we handled on the 1212 Gateway brand film.",
    bg: "linear-gradient(155deg,#2a1d22,#120b0e)",
    media: [],
    credits: placeholderCredits,
    related: ["augustinus-bader-the-body-knows", "calvin-klein-mycalvins", "crave-4orce-goldberg"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: false, // flip to true once heroVideo + media are added below
    // heroVideo: { vimeoId: "", vimeoHash: "" },
    // media: [{ type: "vimeo", vimeoId: "", vimeoHash: "" }],
  },
  {
    slug: "youtube-vs-tiktok-boxing-trailer",
    title: "YouTube vs. TikTok | Official Trailer",
    client: "Social Gloves",
    roleLine: "Official trailer for the YouTube vs. TikTok boxing event",
    categories: ["events-launches", "social-short-form"],
    // Dennis was part of this project and the MMG team executed it. TODO: confirm year and client name.
    metaDescription:
      "Official trailer for the YouTube vs. TikTok boxing event at Hard Rock Stadium in Miami.",
    synopsis:
      "A headline creator boxing event pitting YouTube against TikTok at Hard Rock Stadium in Miami. Our team executed the official trailer.",
    whatWeDid:
      "Our team executed the trailer for the event.",
    youtubeId: "x2qTU6HFc7M",
    bg: "linear-gradient(155deg,#241418,#0e0809)",
    media: [],
    credits: placeholderCredits,
    related: ["nfl-pro-bowl-recap", "emmys-governors-ball", "claude-impact-lab-los-angeles"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "medelita-medical-apparel",
    title: "Medelita | Medical Apparel",
    client: "Medelita",
    roleLine:
      "Launch campaign film for Medelita medical apparel",
    categories: ["fashion-apparel", "brand-campaigns"],
    // TODO (Dennis): add a synopsis, what we handled, year, credits.
    synopsis:
      "Medelita makes medical apparel. This film supports the launch campaign for a new line the brand just dropped.",
    whatWeDid: "[PLACEHOLDER] What we handled on the Medelita film.",
    heroVideo: { vimeoId: "1235204170", vimeoHash: "97ab54b75d" },
    bg: "linear-gradient(155deg,#1a2428,#0a0e10)",
    media: [{ type: "vimeo", vimeoId: "1235204170", vimeoHash: "97ab54b75d" }],
    credits: placeholderCredits,
    related: ["calvin-klein-mycalvins", "adizero-lightest-cleat", "crave-4orce-goldberg"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "adidas-originals-fashion-ad",
    title: "Adidas Originals | Original Is Different",
    client: "Adidas Originals",
    roleLine: "Fashion ad for Adidas Originals",
    categories: ["fashion-apparel", "brand-campaigns"],
    // Different film from Adizero. TODO (Dennis): synopsis, what we handled, year, credits.
    synopsis:
      "adidas Originals is the lifestyle side of adidas, where sport heritage meets street style and self expression. This fashion ad follows a woman running through the desert and across changing landscapes, a new look in each, shot in a cinematic, high quality way that makes the clothes feel part of the world around her.",
    whatWeDid: "[PLACEHOLDER] What we handled on the Adidas Originals fashion ad.",
    bg: "linear-gradient(155deg,#1b1b22,#0b0b0f)",
    heroVideo: { vimeoId: "984616244", vimeoHash: "db15cd36bb" },
    media: [{ type: "vimeo", vimeoId: "984616244", vimeoHash: "db15cd36bb" }],
    credits: placeholderCredits,
    related: ["adizero-lightest-cleat", "calvin-klein-mycalvins", "crave-4orce-goldberg"],
    featured: false,
    span: 6,
    ratio: "4/3",
    published: true,
  },
  {
    slug: "crave-dive-product-launch",
    title: "CRAVE | Dive",
    client: "CRAVE",
    roleLine: "Product launch film for CRAVE",
    categories: ["events-launches", "brand-campaigns"],
    // TODO (Dennis): year and any results.
    synopsis:
      "The whole point of this ad was to test the iPhone's strength, and we had a skydiver hang off a helicopter to test it. This was a product launch film shot in documentary style, reminiscent of Red Bull.",
    whatWeDid: "[PLACEHOLDER] What we handled on Dive.",
    heroVideo: { vimeoId: "1235204172", vimeoHash: "ed84c5335c" },
    bg: "linear-gradient(155deg,#2b2b33,#0e0e12)",
    media: [{ type: "vimeo", vimeoId: "1235204172", vimeoHash: "ed84c5335c" }],
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "crave-power-your-day", "calvin-klein-mycalvins"],
    featured: false,
    span: 6,
    ratio: "16/9",
    published: true,
  },
  {
    slug: "chera-tv-launch-party",
    title: "Chera TV | Launch Party",
    client: "Chera TV",
    roleLine: "Red carpet launch party coverage for Chera TV",
    categories: ["events-launches"],
    // TODO (Dennis): synopsis, what we handled, date, deliverables, credits. Possibly the vertical streaming platform grand opening red carpet.
    synopsis:
      "Chera TV is the world's first vertical, high quality streaming platform. Its launch was celebrated with a red carpet party, captured on video by our team.",
    whatWeDid: "[PLACEHOLDER] What we handled at the Chera TV launch party.",
    heroVideo: { vimeoId: "1189774742", vimeoHash: "022e3fdcf7" },
    bg: "linear-gradient(155deg,#241c2b,#0c0a10)",
    media: [{ type: "vimeo", vimeoId: "1189774742", vimeoHash: "022e3fdcf7" }],
    credits: placeholderCredits,
    related: ["emmys-governors-ball", "claude-impact-lab-los-angeles", "nfl-pro-bowl-recap"],
    featured: false,
    span: 6,
    ratio: "4/3",
    published: true,
  },
  {
    slug: "crave-power-your-day",
    title: "CRAVE | Power Your Day",
    client: "CRAVE",
    roleLine: "Commercial for CRAVE",
    categories: ["brand-campaigns"],
    // TODO (Dennis): synopsis, what we handled, year, credits.
    synopsis:
      "Power Your Day is an ad that shows how the CRAVE battery pack fits into everyday life, as you walk, as you go through your day, as you go through your life. We featured many parts of Los Angeles and made it reminiscent of, and inspired by, an Apple ad.",
    whatWeDid: "[PLACEHOLDER] What we handled on Power Your Day.",
    heroVideo: { vimeoId: "1235219771", vimeoHash: "56e421b693" },
    bg: "linear-gradient(155deg,#2b2b33,#0e0e12)",
    media: [{ type: "vimeo", vimeoId: "1235219771", vimeoHash: "56e421b693" }],
    credits: placeholderCredits,
    related: ["crave-4orce-goldberg", "crave-dive-product-launch", "adizero-lightest-cleat"],
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
    categories: ["brand-campaigns"],
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

// Homepage feed: exactly these four, in this order.
const FEED_ORDER = [
  "claude-impact-lab-los-angeles",
  "nfl-pro-bowl-recap",
  "chera-tv-launch-party",
  "crave-power-your-day",
];

export const feedCaseStudies: CaseStudy[] = FEED_ORDER.map((slug) =>
  getCaseStudy(slug)
).filter((cs): cs is CaseStudy => Boolean(cs && cs.published && cs.media.length > 0));

// Hero slideshow (the first thing visitors see): exactly these four, in this order.
const SLIDE_ORDER = [
  "adidas-originals-fashion-ad",
  "emmys-governors-ball",
  "crave-dive-product-launch",
  "augustinus-bader-the-body-knows",
];

export const heroSlideCaseStudies: CaseStudy[] = SLIDE_ORDER.map((slug) =>
  getCaseStudy(slug)
).filter((cs): cs is CaseStudy => Boolean(cs && cs.published && cs.heroVideo));

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
  "events-launches": "Events and launches",
  "brand-campaigns": "Brand and campaigns",
  "social-short-form": "Social and short form",
  photography: "Photography",
  "fashion-apparel": "Fashion and apparel",
  "public-sector": "Public sector",
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
