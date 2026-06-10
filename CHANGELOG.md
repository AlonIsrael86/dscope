# Changelog — Dscope

All notable changes to the Dscope marketing site, in reverse chronological order.

**Format**: `## YYYY-MM-DD` → `### [HH:MM IST] Author — commit_hash — Summary`

---

## 2026-06-10

### [14:49 IST] Alon (Claude Code) — branch `home-v2-smooth`
**`/home-v2` — perf-overhauled duplicate of the home route (P2 executed). `/` untouched.**
- New hidden route `/home-v2` (not in NAV_TABS): same composition, sections, copy and design language as `/`, re-engineered for smoothness. The `PERF_HANDOFF.md` P2 plan, finally executed — measured on a desktop dev machine:
  - scroll avg FPS **41 → 143** (full refresh rate), p95 frame **35ms → 7ms**, worst frame **63ms → 14ms**, frames >50ms **3 → 0**, settled-at-bottom **17 → 60 FPS**.
- What changed (visual parity verified by side-by-side screenshots at 4 scroll positions, desktop + mobile, plus a section-inventory sweep — `/home-v2` headings are a superset of `/`):
  - `GalaxyBackgroundV2`: 450 individually-animated star divs (450 infinite Motion tickers) → 2 `StarFieldCanvas` layers, one 30fps draw loop, same density/twinkle/glow; 8 Motion comets → CSS keyframes; sun "breathing" via infinite `filter` animation (full repaint of a 72vw element per frame) → compositor-only transform pulse + opacity crossfade. Planets kept 1:1.
  - `HeroV2`: 35 per-node Motion loops + 70 mouse-drift transforms → CSS dot pulse + one container-level parallax spring (v1 moved all nodes in unison anyway, so visually identical); `blur-[150px]` ambient glow → equivalent radial-gradient (no Gaussian pass); marquee untouched (already CSS).
  - Hero gated: marquee rAF + grid unmount once scrolled well past (kept alive forever in v1). `IndustryAutomation` gated with `InViewGate` (was ungated). Lower-section gates kept as-is. `CollaborationDiorama` block extended to render on home-v2 too.
  - Glow blocks in the Neural Integration Node section: `blur-[120px]`/`blur-[100px]` filter divs → radial gradients.
- SEO (crawl-ready for when the site-wide noindex lifts — noindex stack untouched per the indexing rule): per-route title/description targeting automation / AI / CRM-integration keywords (Salesforce, HubSpot, Zoho) per Alexei's May 25+28 SEO directives; route-scoped JSON-LD (Organization + WebSite + WebPage + SoftwareApplication) injected on mount; OG/canonical handled by the existing per-route meta sync.
- App.tsx changes are additive-only for the `/` path: `export` keywords on 7 section components, routing-table entries, a lazy `HomeV2` render branch, `'home-v2'` added to background exclusion lists (original `GalaxyBackground` never double-renders), `CollaborationDiorama` condition extended.
- New files: `src/routes/HomeV2.tsx`, `src/components/v2/GalaxyBackgroundV2.tsx`, `src/components/v2/HeroV2.tsx`, `src/components/v2/StarFieldCanvas.tsx`; `index.css` gained three `homeV2*` keyframe blocks (scoped class names, unused by `/`).
- **Verified**: `npm run lint` (tsc) clean, `npm run build` clean, console output identical to `/` (no new errors/warnings), zero horizontal overflow at mobile width, QA screenshots in `clients/targetbob/screenshots/home-v2-qa/`.

---

## 2026-05-20

### [13:58 IST] Katia — retrospective note (no code change)
**The 4 partial extractions (Etap 2.1–2.2b) were unnecessary in hindsight.**
- We extracted `ContactPlaceholder`, 17 lazy-wrappers, `CaseStudies`, `TestimonialsSection` — but stopped at 4 out of ~140 components.
- Stopping mid-pilot gave no real benefit: 4 files don't make App.tsx meaningfully cleaner (9674 → 9419 lines, still 9000+). The user sees zero difference.
- The full split (~25–50 hours) is code hygiene for future maintenance, **not required for launch**.
- In retrospect, the right call would have been to leave App.tsx untouched until launch, then split sections **incrementally when actually editing them**.
- Exception: `src/lazyComponents.tsx` (17 lazy-wrappers grouped) is a legitimate technical abstraction — worth keeping regardless of whether the rest of the split ever happens.
- Decision: leaving the 4 extractions as-is for now (no functional harm), but documenting that this was unnecessary work in hindsight. Honest record so Alon sees all calls, including suboptimal ones.

### [13:30 IST] Katia — `d9ab3b1` (branch `etap2-split-app`)
**Fix #3 — round gradient overlay to match parent card.**
- Gradient overlay div (`absolute inset-0 bg-gradient-to-br ...`) had no `rounded-*`, so it stayed rectangular while parent card was `rounded-[4rem]`. The blue→purple diagonal gradient made the square corners visible at top-left / bottom-right of the Core Philosophy card.
- Added `rounded-[4rem]` to the overlay so it follows the parent's curve.
- **Verified**: Katia — corners now look consistently rounded; "perfect, everything works".

### [13:08 IST] Katia — `4539263` (branch `etap2-split-app`)
**Cleanup #3 — remove animated `visionBgColor` on Vision motion wrapper.**
- The parent `<motion.div>` of the Core Philosophy card had `style.backgroundColor: visionBgColor` (scroll-driven color motion value). It rendered as a rectangular layer behind the card → looked like a second "frame" with square corners.
- Removed that one style; other transforms (skew/scale/rotateZ/opacity/y) kept.
- **Verified**: Katia — the rectangular layer behind the card is gone.

### [12:57 IST] Katia — `838fd32` (branch `etap2-split-app`)
**Cleanup #3 — remove border from two sibling cards under Core Philosophy.**
- The two cards below the CP card (`<SpaceCakeChart>` container at L7961, and the "Beyond Execution" block at L7971) had `border border-white/5` + `rounded-3xl`. Their small radius made them read as extra rectangular frames near the CP corner.
- Removed `border border-white/5` from both. Kept bg / blur / rounded.

### [12:51 IST] Katia — `34a585a` (branch `etap2-split-app`)
**Fix #3 — single clean border on Core Philosophy card.**
- The restored card had both `border border-white/5` AND `ring-1 ring-white/10` → two stacked outlines ("layered" effect Katia noticed).
- Removed `ring-1 ring-white/10`. Bumped border opacity to `border-white/10` so the single remaining border is as visible as the previous combo was.

### [12:44 IST] Katia — `2e58a5b` (branch `etap2-split-app`)
**Fix #1 — Glimmer sweep fades out after the run.**
- Logo's Glimmer animation (`<motion.div initial={x:-100%, skewX:-45} animate={x:200%}`) ran once across the wordmark, but stayed visible parked at `x:200%` after — a static light diagonal sliver sat to the right of the logo on every page.
- Added `opacity:[1,1,0]` keyframes to fade it out at the end of the 3s run. Behavior is now "sweeps on load, then gone" (Katia's request).

### [12:40 IST] Katia — `dcb49d3` (branch `etap2-split-app`)
**Revert #3 — restore Core Philosophy card (Katia changed her mind).**
- The card border/ring/bg/blur/gradient overlay was originally Alexei's design. Katia first asked to clean it, then asked to put it back.
- Restored full className `border border-white/5 bg-white/[0.02] rounded-[4rem] backdrop-blur-xl ... ring-1 ring-white/10` + the `bg-gradient-to-br from-blue-500/10 ... opacity-50` overlay div. (Following commits then refined the single-frame look.)

### [12:25 IST] Katia — `736670e` (branch `etap2-split-app`)
**Fix #2 (re-applied) — nav overlay scrolls so all 11 tabs visible.**
- Same change as `0ce8bf5`, picked up by a delayed background task. Kept as a no-op duplicate.

### [12:10 IST] Katia — `8478d40` (branch `etap2-split-app`)
**Cleanup #3 (later reverted) — remove border+ring from Core Philosophy card.**
- First attempt at "cleaner look" (Katia's initial request) — removed border+ring from the CP card. Later fully reverted by `dcb49d3` because Katia preferred the original outline.

### [12:00 IST] Katia — `0ce8bf5` (branch `etap2-split-app`)
**Fix #2 — nav overlay scrolls so all 11 tabs are visible.**
- Adding the 11th tab (Contact) in Etap 1 turned the 2-col menu grid into 6 rows. With `overflow-hidden` + `place-content-center` the top row (HOME / VISION) was clipped on shorter screens.
- Overlay: `overflow-hidden` → `overflow-y-auto`. Grid: `h-full` → `min-h-full`, `overflow-hidden` → `overflow-y-auto`, bumped vertical padding.
- Result: center if it fits (no visual change on large screens), scroll instead of clip if it doesn't. Menu-only change, no effect on page sections.
- **Verified**: Katia — all 11 tabs visible.

### [00:30 IST] Katia — `7e35378` (branch `etap2-split-app`)
**Revert P2-A — `will-change` on blur caused planet-in-a-box site-wide.**
- `will-change:transform` GPU-promoted every blur element, which clipped the blur to each layer's square bounds → visible rectangular frames around the planet glow, the quote card, and more across the whole site. Real visual regression — violates the hard "0 visual change" constraint.
- Net gain was marginal anyway (min FPS 9→14, avg unchanged).
- Conclusion: GPU-promoting blur is not visually safe in this design; the heavy blur effects themselves are the cost — needs Alon's call on simplifying effects (B/C). No safe "free" perf win remains via CSS tricks.

---

## 2026-05-19

### [00:10 IST] Katia — `fb60c07` (branch `etap2-split-app`)
**Attempt P2-A — GPU-promote large arbitrary-blur glow layers (`will-change:transform`).**
- Trace showed Rendering 6.5s + compositing 10.5s dominate (scripting only 1.7s). Big static `blur-[60..150px]` glow divs re-blur every frame during scroll.
- Hypothesis: `will-change:transform` keeps them on their own GPU layer → rasterize once, cheap composite after. Targeted only arbitrary blur (the heaviest), not Tailwind named blur-xl/3xl.
- Result on Katia's machine: min FPS 9 → 14 (modest), but introduced visible square frames around blur elements. Reverted by `7e35378`.

### [22:38 IST] Katia — performance audit + handoff (branch `etap2-split-app`)
**Performance audit completed, baseline captured, P2 → fresh session.**
- Added a temporary `FpsMeter` overlay (`src/components/FpsMeter.tsx`) — Katia measures FPS on her real machine (Claude-in-Chrome is a hidden tab and cannot measure FPS itself).
- **Baseline measured by Katia on real machine: FPS 22 · min 9** — janky, objectively bad.
- **Root cause (statically proven)**: 94 `repeat:Infinity` animations + 49 `backdrop-blur` + ~70 `blur()` + 11 `mix-blend`. The `home` route mounts ALL sections at once so the 94 animations all run simultaneously even when their section is offscreen.
- **Ruled out** (artifacts of hidden-tab timer throttling in the earlier wrong audit): bundle/Three.js/loader are NOT the cause. JS loads in <1s.
- Created `PERF_HANDOFF.md` — full self-contained context to continue P2 in a fresh session.
- **Open**: P2 (pause offscreen animations — main fix, 0 visual change); content-visibility:auto (risky with scroll-pinned sections); P3 memo; remove FpsMeter before merge.

---

## 2026-05-18

### [18:10 IST] Katia — `80c9ba7` (branch `etap2-split-app`)
**Etap 2.1 — start splitting App.tsx (pilot).**
- Created branch `etap2-split-app` off `main`.
- Created `src/routes/` directory.
- Pilot: moved `ContactPlaceholder` (lines 1380-1396 of App.tsx) → `src/routes/Contact.tsx` (named export).
- App.tsx: removed the inline definition, added `import { ContactPlaceholder } from './routes/Contact'`.
- Proves the extract mechanism works before touching the larger sections.
- **Verified**: `tsc --noEmit` clean, `npm run build` clean (6.71s).

### [18:25 IST] Katia — `0fc1a69` (branch `etap2-split-app`)
**Etap 2.2a — moved 17 lazy-wrappers out.**
- Created `src/lazyComponents.tsx` — 17 `lazy()` + `<Suspense>` wrappers (SpaceObjectRenderer, RealisticPlanet, RealisticAnimals3D, SpaceTech2D, IndustryTech2D, LionSculpture, ModelViewer, FlybyObject, OceanBackground, OceanHorizonBackground, MarsBackground, DeepOceanBackground, ScrollParticles, MoleculesBackground, MicrochipsBackground, BoomableSpaceObject, SectorDashboardModal).
- App.tsx: 17 inline lazy-define blocks replaced with one `import`; the regular imports interleaved among them (GalaxyBackground, PLANETS_DATA, DashboardCaseView, CaseDashboardMockups) preserved.
- App.tsx: 9674 → 9627 lines. Same lazy chunks, no behavior or visual change.
- **Verified**: `tsc --noEmit` clean, `npm run build` clean (6.12s).

### [18:35 IST] Katia — `bb7c057` + `81e8810` (branch `etap2-split-app`)
**Etap 2.2b — moved 2 self-contained sections out.**
- `CaseStudies` (124 lines, only motion + 6 lucide icons, zero internal deps) → `src/routes/CaseStudies.tsx` (commit `bb7c057`).
- `TestimonialsSection` (86 lines, only motion, inline data, 0 deps) → `src/routes/Testimonials.tsx` (commit `81e8810`).
- App.tsx: 9627 → 9419 lines (−208 in 2.2b, −255 total in Etap 2 so far).
- Each extraction is its own commit with `tsc` + `build` test. No behavior or visual change.
- **Verified**: `tsc --noEmit` clean, `npm run build` clean (5.86s).
- **Data-coupled sections** (ClientMarquee→CLIENTS, SpaceCakeChart→SECTOR_DATA) left for later — they need a separate data-extraction step.
- **Open**: rest of 2.2b (~15 sections, one or two per session); thin App.tsx; lazy routes (code-split for speed); final test + merge.

### [15:50 IST] Katia — `8551190` (branch `react-router-migration`)
**React Router setup + 11 routes (Etap 1 of the hybrid plan).**
- Created branch `react-router-migration` off `main` (tag `v1-vite-baseline` as restore point).
- Added `react-router-dom` dependency.
- `src/main.tsx` wrapped in `<BrowserRouter>`.
- In `App.tsx`: added `<Routes>` with 11 paths: `/`, `/vision`, `/platform`, `/dashboard`, `/services`, `/industries`, `/pricing`, `/company`, `/case-studies`, `/brand-book`, `/contact`.
- URL ↔ activeTab synced via `useLocation` / `useNavigate` — the existing `activeTab` state keeps working (minimally invasive approach).
- `SatelliteNav`: `setActiveTab(...)` swapped for `navigate(...)` — menu clicks now update the URL.
- `vercel.json`: added the SPA rewrite (`/(.*) → /index.html`) — refresh on `/platform` works.
- `/contact` — simple placeholder (email/phone); proper form later.
- Per-route `<title>` via `useEffect` (basic SEO meta).
- Merged to `main` (commits `8551190` + `6367866`); production deploy `dscope-l0tm0yjzn`.
- **Verified**: locally (`npm run dev`) and on production (Claude-in-Chrome): `/pricing` shows the full page, `/contact` shows the ContactPlaceholder, tab title is per-route ("Contact — Dscope"), 0 console errors, SPA rewrite (direct URL / refresh, no 404), design unbroken.
- **Open**: split `App.tsx` (9674 lines) into per-route files (Etap 2 next session); Hebrew UI + RTL (Etap 4); decide with Alon what happens to vision / dashboard / case-studies / brand-book / service-support in the new structure.

---

## 2026-05-17

### [16:00 IST] Katia — `11cfac4`
**Safari — aggressive `motion.g` fix.** Removed `initial: opacity 0` + `whileInView` + `viewport` from the `SecretarialBlueprint` nodes — IntersectionObserver did not trigger for SVG `<motion.g>` in Safari, so the nodes stayed at opacity 0. Hover / scale animations kept.
- **Verified**: Katia — nodes visible in Safari ✓

### [15:55 IST] Katia — `c74f9f9`
**Cleanup AI Studio scratch (~390 KB).** Deleted 25 files: `patch_*.cjs`, `fix_*.cjs`, `grep_*.txt`, `hovers.txt`, `math_random_lines.txt`, `writingtitle_usages.txt`, `cwd.txt`, `src/patch_industries.cjs`, `src/components/Swallowtail2D.tsx`, the entire `app/` folder. Vite was already tree-shaking these — no visual impact.

### [15:45 IST] Katia — `5004b68`
**Safari module-loading fix + Dscope branding.** Created `vercel.json` overriding `Content-Type: application/javascript` for `/assets/*.js` — Vercel was serving them as `text/plain`, so Safari refused to execute the lazy chunks → "Importing a module script failed". Tab title → "Dscope — Enterprise AI Automation". `metadata.json` name updated. Added an SVG favicon (Δ on dark).
- **Verified**: Katia — Safari navigation works ✓

### [15:35 IST] Katia — `297bb39`
**Safari schematic nodes — position fix (part 1).** Split `motion.g animate={x,y}` into an outer static `<g transform="translate(x,y)">` + inner `<motion.g>` for opacity/scale. CSS transforms on SVG `<g>` are unreliable in Safari. Full fix landed in the next commit `11cfac4`.

### [15:00 IST] Katia — `905bd8c`
**Fix dead external `noise.svg`.** Six references to `https://grainy-gradients.vercel.app/noise.svg` (404 — that external Vercel project is dead) replaced with inline `data:image/svg+xml` using `feTurbulence`. No external dependency. Also added `dist/` (missing from AI Studio's `.gitignore`) and `.vercel/` to `.gitignore`.

### [14:30 IST] Katia — `e03af93`
**Initial baseline.** Exact 1-to-1 copy of the Google AI Studio Remix export (app id `6f7cced2-9cff-483d-9dd3-70ab0e13c05b`). Stack: React 19 / Vite 6 / TypeScript / Tailwind 4 / Three.js / R3F / framer-motion / Lucide / Recharts / @google/genai. Includes all the temporary AI Studio scratch files (deleted later in `c74f9f9`).

---

## Tags
- **`v1-vite-baseline`** @ `11cfac4` — restore point before React Router / Next.js migration. Restore with: `git checkout v1-vite-baseline`.
