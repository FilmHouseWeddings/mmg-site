# MMG Site — Session Recap
Last updated: July 8, 2026

## Current State: ITERATION 2.1 ON LOCAL BRANCH — NOT DEPLOYED

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
