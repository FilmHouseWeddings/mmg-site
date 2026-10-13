# MMG site: implementation handoff (2026-10-12)

Branch: `pr-positioning-copy` (nothing committed or pushed yet when this was written). Pushing/merging to `main` deploys instantly on Vercel, so merge only after review.
Goal of the whole branch: make PR firms and agencies see MMG as a content expert partner, not an agency competitor, and show range from live events to high end commercials.

## How to verify locally
Google Drive paths cannot run `next build` (hangs). Copy `src/`, `public/`, `next.config.ts`, `package*.json` to a scratch folder outside Drive, `npm install`, `npx next build`, `npx next start -p 3099`. Build and TypeScript pass; 25 sitemap URLs return 200 with no placeholder text visible.
Note: `npx eslint src` reports 9 React-compiler rule errors (setState in effects, refs in render) in Header, Pillars, HeroSlideshow, CaseStudyStrip. They are the site's existing pattern, do not affect the build, and were left alone.

## Homepage (src/app/page.tsx, content.ts, components)
- Top carousel (HeroSlideshow, `SLIDE_ORDER` in content.ts), final order: Adidas Originals, Emmys, CRAVE Dive, Augustinus Bader.
- Logo strip sits directly under the carousel. Order: Anthropic, Nike, Adidas, Paramount+, Augustinus Bader, Anastasia Beverly Hills, XIX Entertainment, Now United, Sequoia Productions. Lancaster, Crave, Medelita, 1212 Gateway removed.
- Statement (BrandStatement.tsx): "Content experts who back up brands, PR firms, agencies, and event teams, from the live moment to the finished commercial." Start a project button stays here (Dennis decided).
- Video feed (`FEED_ORDER`): Claude Impact Lab, NFL Pro Bowl recap, Chera TV launch party, CRAVE Power Your Day. No repeats of the carousel.
- Closing line: "Backed by 15 years of experience. Bring us the idea, we'll execute it." No button at the bottom (Dennis decided).
- Visually hidden `<h1>` added (the animated "Ideas deserve execution." overlay is now a `<p>` because it unmounts after the intro).

## Other pages
- /work: Content creation pill block, Case studies strip (pills only; hover shows project stills, falling back to the Vimeo poster frame), Services list (now exported as `services` from content.ts).
- Case studies on the strip: CRAVE, Augustinus Bader, JCPenney (ACE Family is pulled and unpublished).
- /about redesigned (simple What We Do style): "We execute ideas." / who we are / who we work with. Sign-off block (name, title, button) removed on purpose. Add crew photos later if wanted.
- /copyright-policy deleted, footer link removed, 308 redirect to / added in next.config.ts.
- Contact form: "Budget range" field is optional. Mail goes through Resend; the route reads `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` at runtime, so the inbox is a Vercel env var, not code. Until the makemovegrow.com domain is verified in Resend, inquiries land at dennis@filmhouseweddings.com. Site-wide address shown is hello@makemovegrow.com; confirm that mailbox exists.

## Projects (content.ts)
Live: Claude Impact Lab, CRAVE 4ORCE Goldberg (with Dive and Power Your Day embedded plus 3 photo collages), CRAVE Dive, CRAVE Power Your Day, Calvin Klein, Adizero, Augustinus Bader (new hero film, new 11 photo grid), Emmys, NFL Pro Bowl, City of Lancaster, JCPenney (photos right under the title), Medelita, Adidas Originals "Original Is Different", Chera TV launch party, YouTube vs. TikTok trailer (YouTube embed via new `youtubeId`).
Hidden placeholders (published: false): 1212 Gateway brand film (needs Vimeo + copy), ACE Family (pulled, do not restore), founder story, summit recap.
Descriptions Dennis still owes (hidden "What we did" sections): Dive, Power Your Day, Chera TV, Medelita, Adidas Originals, trailer role detail, JCPenney year and crew size, Impact Lab date/scope, Emmys turnaround numbers.

## SEO and GEO (all in the backend)
- Shared copy in `src/lib/seo.ts` (title, description, long description).
- Default title: "MMG | Content Experts for Events, Launches and Commercials"; description under 160 characters; every page has a self canonical (`alternates.canonical: "./"`).
- Per page descriptions for /work, /work/[category], /about, /contact. Project pages: description, OG and Twitter image from the video poster (Vimeo oEmbed, YouTube thumbnail, or first photo).
- JSON-LD: Organization + ProfessionalService with services catalog, audience, knowsAbout, areaServed; WebSite; BreadcrumbList and VideoObject on project pages (YouTube too). `foundingDate` deliberately omitted (15 years = founder's experience, not company age).
- robots.ts explicitly welcomes search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and friends), blocks /api/.
- `/llms.txt` generated from content.ts (stays in sync automatically).
- `/opengraph-image` default share card; sitemap has lastModified.
- Still to do after launch: submit the sitemap in Google Search Console, add `uploadDate` to VideoObject when dates are known, add `sameAs` once real social URLs exist, set up a Google Business Profile.

## Open decisions / risks
- Contact mail: finish Resend domain verification (three DNS records at GoDaddy, see SESSION-RECAP.md) then set the two env vars.
- Pill hover images: CRAVE uses its photo collages, JCPenney its two stills, Augustinus Bader its landscape shots. Re-check every pill before shipping.
- Adizero is off the carousel but still on the Work pages.
- The Adidas Originals description is paraphrased from public brand sources and Dennis's own account of the ad. Review it.
- Commit message footer: end with the attribution lines the harness provides.
