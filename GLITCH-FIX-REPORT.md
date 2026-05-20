# Dscope — Glitch Fix Report

**Date:** 2026-05-20
**Live:** https://dscope.targetbob.ai
**Deploy:** https://dscope-c2zgfjijy-alonjustintime-5293s-projects.vercel.app
**Commit:** `ac011f5` on main

Targets are the five concrete glitches Alon flagged on `/pricing` after his personal visual QA pass. Alexei's design language, color tokens, Three.js scenes, and section structure are untouched.

---

## G1 — Nav logo wordmark kept changing across routes (HIGH) — FIXED

**Bug:** On `/` first paint locked to "Δ SCOPE" but on `/pricing` and `/team` the header logo was mid-cycle showing `DSCOPE`, `DELTASCOPE`, `AUTOSCOPE`. The previous polish pass's 1.5s delay only postponed the start of the cycle; the persistent nav wordmark still changed on every route on every load.

**Fix:** `Logo` component now takes a `cycling` prop (default `false`). The Δ/D/Delta/auto transformation only runs on the brand-book "Interactive State" showcase (which is labeled as a hover/cycle demo). The header (`<header className="fixed top-8...">`) and footer use `<Logo/>` without the prop and always render the canonical "Δ Scope".

**Files:**
- `src/App.tsx` line 1669 (Logo component definition — added `cycling` prop, gated `useEffect` on it)
- `src/App.tsx` line 8373 (brand-book showcase — added `cycling` to opt in)

**Verified on:** `/`, `/pricing`, `/team` desktop + mobile (see `screenshots/qa-alon-fix/`).

## G2 — V2.0 vs V2.1 contradiction (HIGH) — FIXED

**Bug:** Eyebrow pill read `DECAGON PRICELIST [V2.0]` while the amber updating pill below H1 read `UPDATING — FINAL V2.1 PRICING LANDS SOON`. Two different versions on one screen.

**Fix:** Updated eyebrow pill to `DECAGON PRICELIST [V2.1]`.

**Files:** `src/components/Pricing.tsx` line 123.

**Verified:** `screenshots/qa-alon-fix/pricing-desktop-fold.jpeg`, `pricing-mobile-fold.jpeg`.

## G3 — "SECTOR PRICING" tight word-break (MEDIUM) — FIXED

**Bug:** H1 used `tracking-tighter` + gradient on the second word, visually collapsing the two words.

**Fix:** Wrapped each word in `inline-block`, added `mr-[0.25em]` on the first word, and applied `style={{ wordSpacing: '0.15em' }}` to the H1.

**Files:** `src/components/Pricing.tsx` line 125-128.

## G4 — "DEPLOY ADVANCED BRAND IDENTITY" tight word-break (MEDIUM) — FIXED

**Bug:** Same `tracking-tighter` issue on the section H2.

**Fix:** Added `style={{ wordSpacing: '0.15em' }}` to the H2.

**Files:** `src/components/Pricing.tsx` line 420.

**Verified:** `screenshots/qa-alon-fix/pricing-desktop-orbital-relay.jpeg` — "DEPLOY ADVANCED BRAND IDENTITY" reads cleanly with breathing space between every word.

## G5 — TECH-2 / Orbital Relay placeholder (HIGH) — FIXED

**Bug:** The frame next to "Deploy Advanced Brand Identity" was empty with a floating lowercase "tech-2" label in the middle. The component (`BoomableSpaceObject type="tech-2"`) called `SpaceObjectRenderer` which has cases for `satellite`, `starlink`, `telescope`, `probe`, `station`, `relay`, `buoy`, `drone`, `reactor`, `warpgate` — but no `tech-2`. The default branch returned `null`, leaving only `BoomableSpaceObject`'s own type label visible.

**Fix:**
1. Changed `type="tech-2"` to `type="relay"` — renders a real animated targeting relay (cyan core, red crosshair, rotating red dashed orbit + blue dotted outer orbit) that matches both the existing "Fig. 1: Orbital Relay Object" caption and the cosmic-decagon palette.
2. Added an opt-in `hideLabel` prop on `BoomableSpaceObject` so the redundant lowercase type label doesn't appear under the visual when there's already an explicit caption in the surrounding markup.

**Files:**
- `src/components/Pricing.tsx` line 438 — usage
- `src/components/BrandSpaceObjects.tsx` lines 312, 346-348 — added `hideLabel` prop

**Verified:** `screenshots/qa-alon-fix/pricing-desktop-orbital-relay.jpeg`.

## G6 — Header decagon bleeding into pricing cards (LOW) — NOT REPRODUCED

After the above fixes I reloaded `/pricing` and scrolled through the cards row at desktop and mobile. The pricing cards row sits below the "Sector Pricing" hero with `mb-32` on the header block and the cards row has its own `pt-` from the section. The DecagonShape inside each card is constrained with `top-[180px] bottom-0`. I did not observe a clipped polygon at the top of the cards row. Closing this without a code change — if Alon still sees it after the V2.1 deploy, send a fresh screenshot at the exact scroll offset and I will look again.

---

## Build & deploy

- `pnpm build` — clean (1 chunk-size warning for vendor-three, pre-existing)
- `npx -y vercel@latest --yes --prod` — deployed in 17s
- Aliased to `https://dscope.targetbob.ai`
- Console errors after deploy: 0 from the app (only chrome-extension errors from `jkagfomdekeocgkicjolfkpciipclpkb`, unrelated)

## Screenshots

All under `C:\Users\Alon\Claude-Code\General\Design\dscope\screenshots\qa-alon-fix\`:

- `pricing-desktop-fold.jpeg` (1440x900) — fold: V2.1 pill, locked Δ SCOPE header, SECTOR PRICING gap
- `pricing-desktop-orbital-relay.jpeg` (1440x900) — System Integration section: DEPLOY ADVANCED BRAND IDENTITY clean spacing + Orbital Relay rendered
- `pricing-mobile-fold.jpeg` (375x812) — mobile fold
- `team-desktop.jpeg` (1440x900) — locked Δ SCOPE on /team
- `home-desktop.jpeg` (1440x900) — locked Δ SCOPE on /

## Honest open items

- G6 was not reproduced after the other fixes shipped. If Alon still sees a clipped polygon at the top of the cards row, I need the exact viewport + scrollY to re-investigate.
- The Logo cycling is still available as a brand-book showcase (Interactive State pane only). If Alon wants the cycle removed entirely (even from the showcase), it's a one-line `cycling` removal.
- The fixed-header SVG circle "Δ in a circle" at the top-right of every page is the navigation toggle for the side tab bar, not the brand wordmark — kept untouched.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
