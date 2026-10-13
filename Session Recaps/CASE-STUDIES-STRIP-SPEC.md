# Case studies strip: build spec (not built yet)

Written Oct 12, 2026 with Dennis. Build this on the What We Do page after the case study copy is final. Copy and category work is on branch `pr-positioning-copy`.

## What it is
A strip of number led cards on `/work`, between the category pills (Pillars) and the Services list. One card per case study. Each card links to the project page. Mockup Dennis approved: 2 by 2 grid on desktop, 1 column on mobile. Each card shows:
- client name in the small red mono kicker
- one big stat (examples: "66M+", "25 people", "13K", "5M+")
- one line under it saying what the stat is
- "View case study" with an arrow

Cards do not need video. The stat is the face of the card, so text only projects (JCPenney) work.

## Strip heading (decided Oct 12, 2026)
Heading: "Case studies". Line under it: "What we shot, who it was for, and how it landed." (Dennis rejected "Real projects, real numbers" as sounding AI written.) No dashes.

## Hover behavior (Dennis, required)
Same interaction as the category pills on `/work`: on hover, the project photos appear over the strip.
- Copy the mechanism in `src/components/Pillars.tsx`: hover capable check `(hover: hover) and (pointer: fine)`, mount images only on first hover, opacity transition about 400ms, `pointer-events-none` on the preview layer, scrim `rgba(0,0,0,0.35)`, and card text flips to `#F6F4EF` while active. Also trigger on keyboard focus and clear on blur.
- Difference from the pills: the pills show a full page backdrop video. Here the photos appear over the strip itself. Default build: the photos cover the strip area, crossfading through that project's stills (3 to 5, about 1.2s each) while its card is hovered. Open question to confirm with Dennis: cover the hovered card only, or the whole strip.
- Touch and small screens: no hover. Show the first still as a quiet card background, or leave the cards plain. Tap goes to the project page.
- Respect `prefers-reduced-motion`: no crossfade, show one still.
- Photos need alt text. Keep text readable over photos (scrim and light text).

## Data needed on each case study (add to `CaseStudy` in `src/lib/content.ts`)
- `stat: { value: string; label: string }` for the card
- `stripPhotos?: Photo[]` for hover (3 to 5 landscape stills, WebP, with `w`, `h`, `alt`)
- `caseStudy: true` flag, so only case studies appear in the strip
Stats so far: ACE "66M+ combined YouTube views", Augustinus Bader "25 people across 3 nations", CRAVE "13K Facebook community", JCPenney "5M+ Facebook views".

## Stills Dennis must supply
Augustinus Bader already has 19 stills in `/public/photos/augustinus-bader` and Adizero has BTS stills. Needed: 3 to 5 stills each for ACE, CRAVE, JCPenney.

## Placement and links
- Build the component as `CaseStudyStrip.tsx`, render it in `src/app/work/page.tsx` between `<Pillars />` and the Services section.
- Add a small "Case studies" link under the homepage feed that goes to the strip (`/work#case-studies`).
- Keep the main nav at three items.

## Status of the case studies
Augustinus Bader and CRAVE are published. JCPenney is published text only and kept out of the homepage feed. ACE stays hidden until its video is added (Dennis is supplying it). Full copy lives in `/Users/blackpanther/Downloads/MMG_Case_Studies.md`.

## Rules
Site copy: no dashes (hyphens only inside official names), contractions fine, plain production voice, never agency language. See memory `mmg-tech-gotchas` for build limits on the Google Drive path.

---

## UPDATE 2026-10-12 (supersedes anything above that mentions cards)

**Strip design now:** pills only. One pill per case study, linking to /project/[slug]. Hovering a pill fades that project's stills in as a banner behind the section (crossfade every 1400ms). No number cards.

**ACE Family: pulled.** Entry stays in content.ts as an archived template (`published: false`, `caseStudy` removed). Do not restore without Dennis's say so.

**Spaces held for later (all `published: false`, placeholder copy, nothing visible):**
- `1212-gateway-brand-film` (beauty campaign, Brand and campaigns + Photography). Needs: confirmed client name, Vimeo id + hash, year, synopsis, what we did, results. IG credits: Producer Dennis Mulyar, DP Sam Windell.
To go live: fill the copy, uncomment `heroVideo` and `media`, set `published: true`. Add `caseStudy: true`, a `stat`, and `stripPhotos` only if it should get a pill.

**Logo / client name placement:** "1212 Gateway" was added at the end of the `clients` ticker array (top of content.ts) as a preview. Remove that line if the name is not approved.

**New in Events and launches:** `youtube-vs-tiktok-boxing-trailer` (client Social Gloves, published). Uses the new optional `youtubeId` field, which embeds on the project page and shows a YouTube thumbnail on cards. It stays out of the homepage feed and slideshow (those are Vimeo only). Confirm MMG's role and the year before merging; "What We Did" is a placeholder and hidden.

## UPDATE 2 (2026-10-12)
- There is only ONE Adidas Originals project (`adizero-lightest-cleat`). The second placeholder was removed.
- Added "XIX Entertainment" to the clients strip (Now United came through Simon Fuller, XIX founder).
- Added hidden placeholder `now-united` under Social and short form. Needs Vimeo link, years, scope, results.
- 1212 Gateway is the client (beauty campaign, for Catherine). Dennis was part of the YouTube vs. TikTok trailer and the team executed it.

## UPDATE 3 (2026-10-12)
- XIX Entertainment stays on the clients scroller only. No Now United project posted (placeholder deleted).
- Adidas Originals fashion ad is a SECOND Adidas project, distinct from Adizero: `adidas-originals-fashion-ad`, hidden until a Vimeo link arrives.
- 1212 Gateway sits under Brand and campaigns (hidden until the film arrives).
- Medelita medical apparel added (Fashion and apparel), live, Vimeo 1235204170.
- Augustinus Bader hero video swapped to Vimeo 1235204171.
- CRAVE now has Dive (product launch film, Vimeo 1235204172) as a second video. Power Your Day is the third, still to come.

## TO REVISIT BEFORE/DURING COMMIT (Dennis, 2026-10-12)
**Pills on the "What We Do" page: every pill must show something on hover.** Hover banners come from `stripPhotos` on each case study. Right now:
- Augustinus Bader: has stills (the two wide Iceland and highland shots), works.
- CRAVE: NO stills, so hover shows nothing. Needs stills or a video frame (Goldberg ad, Dive).
- JCPenney: NO stills, text only. Needs stills or a frame from the spots.
Fix options: add `stripPhotos` for each, or fall back to the project's Vimeo poster frame automatically. Do not ship a pill that hovers to nothing.

## Augustinus Bader gallery (2026-10-12)
Gallery was rebuilt from Dennis's new product photos (Desktop/MMG Site/AB Assets/PHOTOS, 12 screenshots, 11 used; the clipped macro of the bottle label was left out so the grid fills evenly). Old photos are backed up outside the repo. If more photos are added, the grid drops the last landscape when the row count would leave a hole.

**UPDATE (same day): hover gap handled in code.** JCPenney now has two stills. Any pill without stills falls back to its video's poster frame (work/page.tsx, buildStripCards). CRAVE's poster is the "CRAVE" title card, which fights the page text; swap in a better still via `stripPhotos` when one exists. Still worth a final look at every pill before shipping.
