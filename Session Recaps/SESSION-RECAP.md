# MMG Site — Session Recap
Last updated: August 31, 2026

## Homepage feed reorder (Aug 31, 2026) — deployed at `0d17748`

`FEED_ORDER` in content.ts is now: Emmys → **Claude Impact Lab** → Lancaster → Calvin Klein →
Adizero → CRAVE → Augustinus Bader. Dennis's call.

The **hero slideshow is a separate order** and was not touched — `HeroSlideshow.tsx` renders
`publishedCaseStudies` (i.e. declaration order in the `caseStudies` array), so Claude Impact Lab is
currently the first slide because its entry sits first in that array. Moving a slide means moving
the object in `caseStudies`, not editing `FEED_ORDER`.

---

## Latest: Claude Impact Lab, Los Angeles case study (Aug 31, 2026) — built, not yet committed

New published case study at `/project/claude-impact-lab-los-angeles`, first item in `FEED_ORDER`,
category **Event Coverage**, client **Claude Community Events** (Anthropic named in the body copy,
not as the client). Hero film: Vimeo `1220956795` / `b0599cfcef`.

Dennis cut the page down from the SEO brief he supplied: **"Where the question came from", "What
happens during a Claude Impact Lab", "Who can join", and the whole FAQ block are all removed.** The
page is now hero film → title → synopsis → What We Did → "Who organizes it" → related work. The FAQ
infrastructure was deleted with it (`FaqBlock.tsx`, the `Faq` type, the `faqs` field, and the
FAQPage JSON-LD branch) rather than left as dead code — re-add if a future page wants FAQs.

Surviving additions to `content.ts`: `CaseStudy` gained three optional fields — `metaDescription`,
`sections` (accent-kicker editorial blocks; supports paragraphs plus an optional labelled list),
and `event`. Rendered by the new `ProjectSections.tsx`. The project page emits **Event** and
**VideoObject** JSON-LD, each only when the matching content exists. All fields optional, so the
other six case studies render exactly as before.

Verified by a clean `npm run build` in the local SSD scratchpad copy (the Drive path still can't
build — see AGENTS.md): 23/23 static pages, page prerendered, meta description correct, sitemap
entry present, Vimeo poster resolving, 0 console errors.

Open on this page:
- [ ] **Impact Lab build-day date** — `event.startDate` is absent, so the Event schema is incomplete
      and there's no date on the page. Add the ISO date to `event` in content.ts when confirmed.
- [ ] **MMG's actual scope on the day** — "What We Did" is still the brief's generic placeholder line
      ("on site to capture the day in film"). Needs Dennis's real scope.
- [ ] Credits are still `placeholderCredits` (hidden until real names land).

---

## Current State: 🚀 REDESIGN IS LIVE ON makemovegrow.com (deployed July 21, 2026)

Merged `if-redesign` → `main` at `ba40bde`, pushed, Vercel deployed. Smoke-checked in production: all pages 200, hidden projects/category 404, no placeholder text rendered, reveal email absent from HTML, thumbnails loading.

Same-day iterations included in the launch (commits `1808bc5`, `ba40bde`):
- CaseVideo = full Vimeo player with controls (background=1 had killed the play button)
- New published projects: **Emmys Governors Ball** (event-coverage; Dennis asked for "Academy Awards" but supplied video is titled Emmys — confirm; client listed as Sequoia Productions, unconfirmed) and **City of Lancaster | Commercial** (branded)
- **Corporate & Government category paused** (commented out in content.ts); Summit Recap moved to event-coverage
- Vimeo oEmbed poster thumbnails on category + related cards (`src/lib/vimeo.ts`, 24h cache, gradient fallback)
- Homepage feed order via `FEED_ORDER` in content.ts: Governors Ball, Calvin Klein, Adizero, CRAVE, Augustinus Bader, Lancaster (slideshow order unchanged — CRAVE first)
- Intro overlay spacing fix ("Ideas deserve execution." — single span child inside flex h1)
- About: v2 narrative story (no em dashes, "Dennis' father"), stance section removed

Post-deploy same day (commit `2df58a5`, also live): empty-category state is now a styled "Coming soon." block (currently only Live Action shows it).

Post-launch TODOs:
- [ ] Write real synopses/whatWeDid/credits in content.ts (sections auto-appear)
- [ ] Confirm dennis@makemovegrow.com mailbox exists (contact reveal email!) — flip char codes to hello@ if not
- [ ] Real social URLs → flip SHOW_SOCIALS in Footer.tsx + contact/page.tsx
- [ ] Live Action: publish Founder Story with video (page shows "Coming soon." until then)
- [ ] Academy Awards Governors Ball video (if separate from Emmys one)
- [ ] Real live-action preview footage for work-page pill (still Adizero)
- [ ] OG image; designed 404; Vimeo poster frames for slideshow
- [ ] Restore Corporate & Government when ready (uncomment in content.ts)

---

## Previous State (July 21, pre-deploy): PARTIAL-LAUNCH BUILD READY — AWAITING DENNIS'S LOCALHOST OK TO DEPLOY

Commit `bb9d5cf` on `if-redesign` (July 21) prepares a **partial public launch** (no full case studies yet):
- `content.ts`: `published` flag — Summit Recap + Founder Story hidden (no video/TBD client) but kept as saved templates; `publishedCaseStudies` drives every grid/slide/related list; `isPlaceholder()` / `hasRealCredits()` helpers
- `/project/[slug]`: unpublished → 404; synopsis / What We Did / credits sections auto-hide while placeholder and **reappear automatically** once real copy replaces the `[PLACEHOLDER]` strings / TBD names in content.ts — templates fully preserved in code
- About: real founder story (adapted from filmhouseweddings.com/about — father/birthday quote, Dennis Mulyar bio, MMG execution positioning)
- Footer + contact: social icons hidden behind `SHOW_SOCIALS = false` (flip + add real URLs later); footer email now hello@makemovegrow.com
- New `sitemap.ts` + `robots.ts`
- QA July 21: build clean; no [PLACEHOLDER]/TBD rendered anywhere; hidden projects 404; no links to them; no 390px overflow; zero console errors; reveal email still absent from served HTML
- NOTE: Corporate & Government and Live Action category pages show "No projects in this category yet." (their only projects are the two hidden ones) — auto-heals when those publish
- Contact click-to-reveal is still dennis@makemovegrow.com — **mailbox unconfirmed**; flip char codes to hello@ if it doesn't exist
- **Deploy = merge if-redesign → main + push (Vercel auto-deploys). Waiting on Dennis's explicit OK after localhost review.**

### Dev-serving workaround (July 21)
Google Drive evicted node_modules from local cache — dev server wouldn't boot from the Drive path. Serving now runs from a **local SSD copy** (session scratchpad, ephemeral): copy src → `npm install` → `npm run dev` there. **Drive repo stays source of truth**; edit local, rsync back, commit in Drive repo. Dennis drops photos/files in `Source Files/mmg/public/` (or anywhere in MMG Site + tell Claude). Fix for next time: Drive → "Make available offline" on the mmg folder.

---

## Previous State (July 8): ITERATION 2.3 ON LOCAL BRANCH — NOT DEPLOYED

Redesign commits on local branch **`if-redesign`**:
- `7ffc402` — Iteration 1: IF-style IA (work/category/case-study routes, mobile drawer, positioning)
- `2ca11e0` — Iteration 2: IF homepage copy + 3-page structure
- `ae872e7` — Iteration 2.3 (current): homepage intro sequence ("Ideas deserve execution." alone on paper ~1.3s → cross-fade into slideshow; timers start on reveal; reduced-motion skips); Work page headline is now "Ideas deserve execution." with the "not a creative agency" paragraph removed; all four What We Do pills trigger full-screen preview videos via a [PLACEHOLDER] override map in work/page.tsx (branded=CRAVE, event-coverage=Calvin Klein, corporate-government=Augustinus Bader, live-action=Adizero — replace with real category footage); Contact "Let's build something lasting." headline removed.
- `00a5915` — Iteration 2.2: homepage brand statement ("MMG is a storytelling partner for brands and entities that shape culture." between slideshow and feed); IF-style footer on all pages (info@makemovegrow.com — CONFIRM MAILBOX EXISTS, SVG social icons with placeholder URLs, © 2026 + /copyright-policy stub page); What We Do rebuilt as IF pillar layout (big red "content creation" + sentence + category pill row, desktop hover on a pill fades in a full-viewport cover-sized preview video — only Branded has video today, others show gradient); About formats list updated (Ads/Brand films/Live events/Live action/Government initiatives/Corporate campaigns — page still needs Dennis's pass); contact services line removed.
- `28e702f` — Iteration 2.1: FHW slideshow nav + polish. Desktop hero gets air under the tagline (lg:pt-[128px]); slideshow has left/right click zones with a mouse-following directional arrow (desktop only — title block remains the project link; touch keeps full-slide link), a 6s loading bar that restarts per slide, auto-advance that continues after manual nav, and bigger chevrons (28px desktop / 36px mobile, 52px hit area); /work now ends at the four category blocks (All Projects grid removed); contact says "Dennis Muyar" with a single merged "General Inquiry / Press" row.

**`main` is untouched; nothing was pushed.** Vercel still serves the old site.
Dennis reviews at **localhost:3000** (`npm run dev`) and decides when to merge/push.

**Live at (OLD version):** https://www.makemovegrow.com
**GitHub:** https://github.com/FilmHouseWeddings/mmg-site
**Working directory:** `Source Files/mmg`

---

## Iteration 2 (July 8) — Copy Imaginary Forces

### Homepage (copies IF structure)
- **HeroSlideshow**: cross-fading autoplay project videos (~70vh), title bottom-left over scrim, red prev/next chevrons + dash-style dots, auto-advance 6s (pauses after manual nav), each slide links to its case study
- **"Ideas deserve execution."** intro overlay fades in on load, out at ~2.5s (IF's brand-statement pattern)
- **Alternating feed**: media 49% / text 48% rows alternating left/right; red uppercase kicker (category) + big title + "VIEW PROJECT →" (hover red + nudge); mobile stacks media-above-text, kicker hidden

### 3-page structure
- Nav (header, flyout, drawer, footer): **what we do** (/work) · **about us** (/about) · **contact** (/contact)
- **/about** (new): stance copy + [PLACEHOLDER] story + "formats we execute" + We've served ticker. /the-group deleted → 308 redirect
- **/contact** (rebuilt on IF /connect): Dennis — Managing Director with **bot-proof click-to-reveal email** (dennis@makemovegrow.com assembled from char codes on click; never in served HTML — verified by curl grep); General/Press → hello@makemovegrow.com; social placeholder links (TODO: real URLs); services line

### Taxonomy
- Four category tabs: **Branded | Event Coverage | Corporate & Government | Live Action**
- Summit Recap moved to Corporate & Government ([PLACEHOLDER] judgment — Dennis to confirm)
- /work overview shows "CONTENT CREATION" grouping heading above the category blocks (IF pillar-copy layer)

### Cleanup
- Deleted orphans: Hero.tsx, Work.tsx (grid), Stance.tsx (copy lives in /about now)
- Fixed duplicated "— MMG — MMG" page titles (layout template now applies once)

### QA (July 8)
Playwright at 1440×900 + 390×844: 22/23 pass (the 1 "partial" — filter pills only on category pages, not /work index — matches IF's actual behavior; kept)
- No horizontal overflow on any page at 390px; 5 pills wrap cleanly
- Zero console errors
- Screenshots: `MMG Site/it2-*.png` (14 files, desktop + mobile)

---

## Stack notes (gotchas — read before editing)
- Next.js 16 (App Router, Turbopack); Tailwind v4 — tokens in `@theme` in globals.css, NO config file
- Palette LOCKED: paper #F6F4EF, ink #16161B, accent #CB2138; Archivo + Space Mono
- `backdrop-filter` gets stripped by the CSS build — use rgba alpha, not blur
- Inline `style={{gridTemplateColumns}}` beats `max-[...]:` classes — use `grid-cols-[...]`
- `Reveal.tsx` props: className + delay ONLY
- Repo path has spaces (Google Drive) — quote everything in shell

---

## TODO / Next Steps

- [ ] **Dennis: review localhost:3000** → iterate or approve → merge if-redesign → main (push = auto-deploy)
- [ ] Confirm Summit Recap belongs under Corporate & Government
- [ ] Replace [PLACEHOLDER] content: about-page story, case-study synopses/credits in content.ts
- [ ] Real social URLs for /contact (Instagram, YouTube, LinkedIn)
- [ ] Add real Vimeo videos: Summit Recap + Founder Story (they're gradient placeholders in slideshow/feed)
- [ ] Check CRAVE 4ORCE Vimeo embed settings (503 seen July 7)
- [ ] Confirm dennis@makemovegrow.com mailbox exists (Google Workspace alias?)
- [ ] OG image asset
- [ ] Test on a real iPhone
- [ ] Re-enable contact form when ready (Resend key → Vercel env, ContactForm.tsx kept)
- [ ] DKIM in GoDaddy

---

## Deployment / Email (unchanged)
- Vercel auto-deploys on push to `main` — **that's why we don't push**
- GoDaddy DNS: A @ → 216.198.79.1; CNAME www → e03f1fedb00b58e8.vercel-dns-017.com
- Google Workspace: hello@makemovegrow.com (MX added; DKIM pending)
