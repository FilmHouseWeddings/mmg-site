import { isPlaceholder, type Section } from "@/lib/content";

// Service pages (/services/[slug]). Each one targets a single service in a
// single area, backed by case studies already on the site. Copy rule: every
// claim comes from an existing case study or from Dennis. Anything still
// unconfirmed starts with "[PLACEHOLDER]" and is dropped at render time, the
// same way content.ts hides template copy.

export type ServiceArea = { type: "City" | "AdministrativeArea"; name: string };

export type ServiceFaq = { q: string; a: string };

export type ServicePage = {
  slug: string;
  name: string; // short name for the hub and breadcrumbs
  linkLabel: string; // link text on the hub, other service pages, and llms.txt
  metaTitle: string; // rendered as "<metaTitle> | MMG"; keep it under 55 characters
  metaDescription: string; // under 160 characters
  kicker: string; // small accent label above the H1
  h1: string;
  answer: string; // 40 to 60 word direct answer, the paragraph answer engines quote
  intro: string[]; // paragraphs under the answer
  deliverables: { label: string; text: string }[];
  process: { label: string; text: string }[];
  turnaround: string[];
  sections?: Section[]; // extra long form blocks, e.g. same day recaps
  proofSlugs: string[]; // case studies shown as cards
  proofStats?: { label: string; text: string }[]; // numbers already published in case studies
  testimonial?: { quote: string; name: string; title: string }; // only a real, approved quote
  faqs: ServiceFaq[];
  serviceType: string;
  areaServed: ServiceArea[];
  servicesListMatch: string[]; // entries in content.ts `services` this page covers (schema only)
  published: boolean; // false = 404, no sitemap or llms.txt entry
};

const LA: ServiceArea = { type: "City", name: "Los Angeles" };
const OC: ServiceArea = { type: "AdministrativeArea", name: "Orange County" };

export const servicePages: ServicePage[] = [
  {
    slug: "red-carpet-video-coverage",
    name: "Red carpet video coverage",
    linkLabel: "Red carpet video coverage in Los Angeles",
    metaTitle: "Red Carpet Video Coverage in Los Angeles",
    metaDescription:
      "Red carpet, arrivals, and talent interview video in Los Angeles for PR firms, event producers, and brands. Filmed live, finished in house, delivered fast.",
    kicker: "Services / Red carpet",
    h1: "Red carpet video coverage in Los Angeles",
    answer:
      "MMG films red carpets, arrivals, and talent interviews in Los Angeles and Orange County for PR firms, event producers, and brands. We run a lean crew on the carpet and the floor, edit and color in house, and deliver clean files built for press, social, and brand use, fast.",
    intro: [
      "A red carpet gives you one take. Talent moves on the publicist's clock, the press line is packed, the light changes as the night goes on, and the crowd noise never stops. The coverage has to be right the first time, and it has to be ready while people are still talking about the night.",
      "That is the work we are built for. For the Emmys Governors Ball, the official after party of the Primetime Emmy Awards, Sequoia Productions trusted us to film the night live, under the same clock as national broadcast. We covered arrivals, stage moments, and floor energy with a lean crew, then finished in house so the files turned around clean for brand and social use.",
      "The concept stays yours. Your team sets the talent list, the questions, and the approvals. We execute the plan on the night and hand back footage your publicists and social team can use right away.",
    ],
    deliverables: [
      { label: "Arrivals and step and repeat", text: "Talent arrivals, walk ups, and the moments in front of the wall, framed for both horizontal and vertical use." },
      { label: "Talent interviews", text: "Interviews on the carpet or in a quiet corner, run by your host or publicist, with clean audio in a loud room." },
      { label: "Event film", text: "A finished piece that carries the night from arrivals to the last toast, edited and colored in house." },
      { label: "Social cutdowns", text: "Short vertical and horizontal edits built to post while the event is still trending." },
      { label: "Photography", text: "Stills produced alongside the film, one consistent eye across motion and still." },
      { label: "Organized selects", text: "Labeled files your PR team can search, so the best moments are easy to pull for press." },
    ],
    process: [
      { label: "Brief and run of show", text: "You send the talent list, timing, and credentials. We build a shot list and run of show from your brief." },
      { label: "Positions and access", text: "We coordinate with your publicist and the event producer on press line positions, carpet access, and interview spots." },
      { label: "On the night", text: "Multi camera coverage on the carpet and the floor, so arrivals, stage moments, and the room are all covered." },
      { label: "Edit and color in house", text: "No outside vendors, so the edit starts as soon as the cards come off the cameras." },
      { label: "Delivery", text: "Files formatted for press, social, and brand channels, delivered on the schedule set in the brief." },
    ],
    turnaround: [
      "Turnaround is set in the brief, around the moment your press and social posts need to go live. Because edit and color happen in house, nothing waits on an outside vendor.",
      "[PLACEHOLDER] Typical red carpet turnaround: e.g. social cutdowns the same night, full event film within X days.",
    ],
    proofSlugs: ["emmys-governors-ball", "chera-tv-launch-party"],
    faqs: [
      {
        q: "Do you work with our PR team and publicists?",
        a: "Yes. Most of our red carpet work comes through producers, PR firms, and agencies. The talent list, interview questions, and approvals stay with your team. We execute the plan and keep your publicists in the loop on the night.",
      },
      {
        q: "Can you supply the interviewer or host?",
        a: "[PLACEHOLDER] Does MMG provide a host or interviewer, or does the client always bring one?",
      },
      {
        q: "How many cameras does a red carpet need?",
        a: "[PLACEHOLDER] Typical crew size for a red carpet (e.g. one carpet camera plus one floor camera), and when you add more.",
      },
      {
        q: "Can you shoot photos at the same time?",
        a: "Yes. Photography can run alongside the film, so stills and video come from one crew with one look.",
      },
      {
        q: "What does red carpet coverage cost?",
        a: "It depends on the number of cameras, the hours on site, whether you need photography, and how fast you need the edit. Send us the run of show and we will come back with a quote.",
      },
      {
        q: "Where do you work?",
        a: "We serve Los Angeles and Orange County, and we travel for the right event. Our team has filmed as far away as Germany and Iceland for the Augustinus Bader campaign.",
      },
    ],
    serviceType: "Red carpet and talent interview video coverage",
    areaServed: [LA, OC],
    servicesListMatch: ["Red carpet and talent interviews"],
    published: true,
  },
  {
    slug: "event-video-production",
    name: "Event video production",
    linkLabel: "Event video production in Los Angeles and Orange County",
    metaTitle: "Event Video Production in LA and Orange County",
    metaDescription:
      "Event, launch, and conference video in Los Angeles and Orange County. Multi camera coverage, same day recaps, and photography, edited and colored in house.",
    kicker: "Services / Events",
    h1: "Event video production in Los Angeles and Orange County",
    answer:
      "MMG films events, launches, conferences, and galas in Los Angeles and Orange County for brands, PR firms, agencies, and event teams. We cover the day multi camera, edit and color in house, and deliver same day recaps, social cutdowns, and a finished event film your team can post and keep using.",
    intro: [
      "An event does not get a second take. Keynotes run long, schedules shift, and the best moments happen in the room you are not standing in. Good event coverage plans for all of that, so your team gets every moment that matters without managing the crew.",
      "We back up your team from the live moment to the finished film. At the Claude Impact Lab in Los Angeles, a full day build event hosted by Claude Community Events, we were on site to capture the day from the morning brief through the final demos. At the Emmys Governors Ball, we filmed the night live for Sequoia Productions and finished in house so files turned around clean for brand and social use.",
      "The concept stays yours. You know your audience and your message. We bring the crew, the cameras, and the edit, and we turn the day into content you can post right away and keep using long after the venue is cleared.",
    ],
    deliverables: [
      { label: "Event film", text: "A finished piece that tells the story of the day, edited, colored, and mixed in house." },
      { label: "Same day recaps", text: "A short edit delivered while the event is still happening or the night it ends, built to post the same day." },
      { label: "Social cutdowns", text: "Vertical and horizontal clips for each platform, ready for your social team." },
      { label: "Keynotes and sessions", text: "Clean multi camera recordings of talks and panels, for sharing after the event or for a content library." },
      { label: "Interviews and testimonials", text: "Short interviews with speakers, guests, and your team, filmed on site." },
      { label: "Photography", text: "Event and press stills produced alongside the film by the same crew." },
    ],
    process: [
      { label: "Brief and run of show", text: "You share the agenda, the must have moments, and where the content will live. We build a shot list and crew plan from your brief." },
      { label: "Site walk and logistics", text: "We plan camera positions, audio, and load in with your venue and AV team, so nothing slows the event down." },
      { label: "Coverage on the day", text: "Multi camera coverage across the stage, the floor, and the moments in between, with a calm crew that stays out of the way." },
      { label: "Same day and next day edits", text: "Recaps and cutdowns go out first. The full event film follows, edited and colored in house." },
      { label: "Delivery and archive", text: "Final files in the formats you need, plus organized footage for future content." },
    ],
    turnaround: [
      "Fast turnaround is the reason teams call us. Same day recaps are one of our core services, and because edit and color happen in house, the full event film is not waiting in an outside vendor's queue.",
      "[PLACEHOLDER] Typical event turnaround: e.g. same day recap within X hours, full event film within X days.",
    ],
    sections: [
      {
        kicker: "Same day recaps",
        body: [
          "A recap that posts the same day keeps the momentum of the event alive. Attendees share it, sponsors see their names while the event is fresh, and your audience sees what they missed while it still matters.",
          "We plan the recap before doors open. The shot list marks the moments the recap needs, an editor works from the first footage while coverage continues, and the edit is built to fit the platforms it will post on.",
        ],
      },
      {
        kicker: "Events we cover",
        body: [
          "Conferences and summits, product launches and activations, galas and award nights, community and build events, and launch parties with a red carpet. For carpets and talent interviews, see our red carpet video coverage.",
        ],
      },
    ],
    proofSlugs: ["claude-impact-lab-los-angeles", "emmys-governors-ball", "nfl-pro-bowl-recap"],
    faqs: [
      {
        q: "Can you deliver a recap the same day?",
        a: "Yes. Same day recaps are one of our core services. We plan the recap in the brief, so the edit can start while coverage is still running.",
      },
      {
        q: "How many cameras does an event need?",
        a: "[PLACEHOLDER] Typical crew size by event type (single room talk, multi room conference, gala), and when you add cameras.",
      },
      {
        q: "Do you cover multi day events?",
        a: "[PLACEHOLDER] Confirm multi day coverage and how daily recaps work across several days.",
      },
      {
        q: "Do you work with our venue and AV team?",
        a: "Yes. We plan camera positions, audio, and load in with your venue and AV team ahead of the day, so the crew fits the event instead of the other way around.",
      },
      {
        q: "What does event video cost?",
        a: "It depends on the number of cameras, hours on site, how many deliverables you need, and how fast you need them. Send us the agenda and we will come back with a quote.",
      },
      {
        q: "Do you work outside Los Angeles and Orange County?",
        a: "Yes. Southern California is home, and we travel for the right project. Our team has filmed across Germany and Iceland for the Augustinus Bader campaign.",
      },
    ],
    serviceType: "Event video production",
    areaServed: [LA, OC],
    servicesListMatch: ["Event coverage", "Launch and activation coverage", "Same day recaps"],
    published: true,
  },
  {
    slug: "brand-films-and-commercials",
    name: "Brand films and commercials",
    linkLabel: "Brand films and commercials in Los Angeles",
    metaTitle: "Brand Film and Commercial Production in Los Angeles",
    metaDescription:
      "Brand films and commercials produced in Los Angeles for brands and agencies. Your concept, filmed and finished in house: production, edit, color, and photo.",
    kicker: "Services / Brand films",
    h1: "Brand films and commercial production in Los Angeles",
    answer:
      "MMG produces brand films and commercials in Los Angeles for brands and the agencies behind them. You bring the concept. We handle production, edit, color, and finishing in house, and deliver campaign films, cutdowns, and photography that look like film, not filler.",
    intro: [
      "A great concept can still fall apart in execution. Schedules slip, the shoot runs out of light, and the edit drifts from the idea everyone approved. Our job is to make sure the final cut carries the intent it started with.",
      "We work from your brief, or your agency's. For JCPenney's Worth It back to school campaign, we worked alongside its agency, AwesomenessTV, and shot five commercials over ten consecutive days. For Augustinus Bader's The Body Knows, a team of 25 worked across three nations in three months: three weeks on location in Germany and Iceland, a week in Los Angeles on location and in the studio, then a month of editing.",
      "The concept stays yours. The execution is ours. Production, post, and photography sit under one roof, so the film and the stills share one look, and nothing gets lost between vendors.",
    ],
    deliverables: [
      { label: "Brand films", text: "Longer pieces that tell the story of the brand, the product, or the people behind it." },
      { label: "Commercials", text: "Campaign spots in the lengths your media plan needs, for broadcast, streaming, and paid social." },
      { label: "Cutdowns", text: "Short edits and vertical versions of every spot, built for each platform." },
      { label: "Campaign photography", text: "Stills produced alongside the film, one consistent eye across motion and still." },
      { label: "Post and color", text: "Editing, color, sound, and finishing handled in house." },
      { label: "Production support", text: "Shot lists, treatments, and schedules built from your brief, so your concept lands the way you pictured it." },
    ],
    process: [
      { label: "Brief", text: "You or your agency bring the concept, the audience, and where the work will run." },
      { label: "Pre production", text: "Treatment, shot list, casting, locations, and schedule, all built from your brief and approved by your team." },
      { label: "Production", text: "A crew sized to the job, on location or in the studio, in Los Angeles or wherever the story needs to go." },
      { label: "Post production", text: "Edit, color, sound, and finishing in house, with review rounds built into the schedule." },
      { label: "Delivery", text: "Final masters, cutdowns, and stills in every format the media plan calls for." },
    ],
    turnaround: [
      "Timelines follow the campaign. JCPenney needed five spots shot in ten days to hit the back to school window. Augustinus Bader ran three months from first shoot day to final cut. We build the schedule around your launch date and hold it.",
      "[PLACEHOLDER] Typical timeline for a single commercial or brand film, from brief to delivery.",
    ],
    proofSlugs: ["jcpenney-worth-it", "augustinus-bader-the-body-knows", "crave-4orce-goldberg"],
    proofStats: [
      { label: "5 commercials in 10 days", text: "JCPenney Worth It, with AwesomenessTV, and over 5 million views on Facebook." },
      { label: "25 people, 3 nations, 3 months", text: "Augustinus Bader The Body Knows, from Germany and Iceland to Los Angeles." },
      { label: "3 films", text: "CRAVE 4ORCE featuring Bill Goldberg, Power Your Day, and the launch film Dive." },
    ],
    faqs: [
      {
        q: "Do you come up with the concept?",
        a: "We build from your concept, or your agency's. If you need help turning a brief into a plan, we can support with treatments and shot lists, but the idea stays yours. That is by design: we are the execution partner, not a competing agency.",
      },
      {
        q: "Do you work with agencies?",
        a: "Yes. We worked alongside AwesomenessTV on JCPenney's Worth It campaign, and we are built to slot in behind agencies and creative directors.",
      },
      {
        q: "Do you shoot outside Los Angeles?",
        a: "Yes. The Augustinus Bader campaign took our team across Germany and Iceland before a final week of shooting in Los Angeles.",
      },
      {
        q: "How long does a commercial take?",
        a: "It depends on the scope. JCPenney's five spots were shot in ten consecutive days. A larger campaign like Augustinus Bader ran three months, including a month of editing. We set the schedule around your launch date.",
      },
      {
        q: "What does a brand film or commercial cost?",
        a: "Cost depends on shoot days, crew size, locations, talent, and how many versions and cutdowns you need. Send us the brief and we will come back with a quote.",
      },
    ],
    serviceType: "Brand film and commercial production",
    areaServed: [LA, OC],
    servicesListMatch: ["Brand films"],
    published: true,
  },
  {
    // Gated: stays unpublished until Dennis confirms Irvine as the base city
    // and supplies at least one corporate example to use as proof.
    slug: "corporate-video-orange-county",
    name: "Corporate video production",
    linkLabel: "Corporate video production in Irvine and Orange County",
    metaTitle: "Corporate Video Production in Irvine and Orange County",
    metaDescription:
      "Corporate video production in Irvine and Orange County: company events, leadership messages, recruiting films, and product launches, finished in house.",
    kicker: "Services / Corporate",
    h1: "Corporate video production in Irvine and Orange County",
    answer:
      "MMG produces corporate video in Irvine and across Orange County for company marketing and communications teams: events and all hands meetings, leadership messages, recruiting films, and product launches. We work from your brief, edit and color in house, and deliver fast.",
    intro: [
      "[PLACEHOLDER] Why Orange County companies hire MMG: base in Irvine, response time, the corporate work done so far.",
      "The concept stays yours. Your communications team owns the message and the approvals. We bring the crew, the cameras, and the edit, and deliver video your team can use internally and publicly.",
    ],
    deliverables: [
      { label: "Company events", text: "All hands meetings, conferences, and offsites, with recaps and full session recordings." },
      { label: "Leadership messages", text: "Executive interviews and announcements, filmed in your office or on location." },
      { label: "Recruiting and culture films", text: "The people and the workplace, filmed to help you hire." },
      { label: "Product launches", text: "Launch films and event coverage for new products and services." },
    ],
    process: [
      { label: "Brief", text: "Your team shares the message, the audience, and where the video will run." },
      { label: "Plan", text: "Shot list, schedule, and interview plan built from your brief." },
      { label: "Shoot", text: "A crew sized to the job, in your office, at your event, or on location." },
      { label: "Edit and deliver", text: "Edit, color, and sound in house, with review rounds for your approvers." },
    ],
    turnaround: ["[PLACEHOLDER] Typical corporate turnaround."],
    proofSlugs: ["claude-impact-lab-los-angeles", "city-of-lancaster-commercial", "jcpenney-worth-it"],
    faqs: [
      {
        q: "[PLACEHOLDER] Are you insured, and can you work with our procurement process?",
        a: "[PLACEHOLDER] Insurance coverage, W-9, vendor onboarding.",
      },
    ],
    serviceType: "Corporate video production",
    areaServed: [{ type: "City", name: "Irvine" }, OC],
    servicesListMatch: [],
    published: false,
  },
];

export const publishedServicePages = servicePages.filter((s) => s.published);

export function getServicePage(slug: string): ServicePage | undefined {
  return publishedServicePages.find((s) => s.slug === slug);
}

// Page for an entry in content.ts `services`, if one exists. Used only in the
// Organization schema: the pages are searchable but not linked from the site.
export function getServiceHref(serviceName: string): string | undefined {
  const page = publishedServicePages.find((s) => s.servicesListMatch.includes(serviceName));
  return page ? `/services/${page.slug}` : undefined;
}

// Drops placeholder copy so unconfirmed claims never render or reach schema.
export function realText(items: string[]): string[] {
  return items.filter((t) => !isPlaceholder(t));
}

export function realItems<T extends { text: string }>(items: T[]): T[] {
  return items.filter((i) => !isPlaceholder(i.text));
}

export function realFaqs(faqs: ServiceFaq[]): ServiceFaq[] {
  return faqs.filter((f) => !isPlaceholder(f.q) && !isPlaceholder(f.a));
}
