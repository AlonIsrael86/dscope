# DESIGN.md — Dscope Marketing Site

> **This contract governs EVERYTHING in this repo - every page we build and every thing we add.**
> Dscope ships on **two surfaces**, each with its own visual system but ONE shared standard of quality
> (premium, restrained, on-brand - never generic SaaS):
>
> 1. **Surface 1 - the main cosmic SPA** (`index.html` + `src/`, React/Vite): the dark "planetary
>    enterprise infrastructure" brand. **Sections "Objective" through "What I Did NOT Touch" below describe
>    this surface.**
> 2. **Surface 2 - client showcase / demo pages** (`public/<client>/index.html`, static HTML, e.g.
>    `public/solidcam/`): a **light** proposal/showcase system (Inter, white, per-client accent) used to
>    pitch a specific client and explain the Dscope/TargetBob widget. **See "Surface 2" near the bottom.**
>
> The **video/motion** contract for both surfaces is the sibling file **`frame.md`** (read it before any
> intro popup, showcase film, ad, or motion graphic). The intro-popup convention is documented under
> "Intro popup convention" near the bottom and lives in `docs/katya-claude-guide/`.

## Objective
Build the public Dscope marketing site that preserves Alexei Kogan's
Google AI Studio design 1:1, polishes it into a production-quality build,
and ships under `dscope.targetbob.ai` for first delivery to **Emil Somekh
at SolidCAM**. The site is the trust artifact that proves Dscope is a real
enterprise AI automation company with a real team and real clients — not
a sketch.

## Audience
- **First viewer**: Emil Somekh, SolidCAM (Israeli industrial CAM software,
  global enterprise). He already received a SEO/GEO proposal from Alon
  months ago. This site must read as the operating company behind that
  proposal — not as a personal project.
- **Secondary**: Sroulik (Israel-Canada). Future enterprise prospects
  pitched alongside GeoScale and Yeda.

## Visual Contract — Alexei's AI Studio Build
The source of truth is `aistudio.google.com/apps/516ef4b9-a33f-466e-8ea8-d7dccbe71ff8`.
Katia exported it into `github.com/YedatechDesign/Dscope` branch
`etap2-split-app`. I forked that branch as the baseline. Every section,
component, color, font, animation, and 3D model is preserved. My work is
polish on top.

## Visual Theme & Atmosphere
**Cosmic / planetary enterprise infrastructure.** Dark space backgrounds,
photoreal planets, galaxies, stars, ocean creatures, microscopic objects.
Italic display headlines reading like a manifesto. Frosted glass and
luminous gradients on top of black. The mood is **astronomer's notebook
meets enterprise control room** — confident, technical, slightly mythic.

## Color System
| Role | Hex | Use |
|------|-----|-----|
| Background | `#020617` | Outer space dark — body bg |
| Pricing bg | `#010610` | Deeper black for pricing section |
| Lead accent | `#4facfe` | Glowing blue — primary CTAs, links, glints |
| Accent gradient end | `#00f2fe` | Cyan tip of the blue gradient |
| Success | `#34d399` (emerald-400) | "current role" tags, active states |
| Alert | `#fbbf24` (amber-300) | Pricing "updating" pill |
| Negative | `#ef4444` (red-500) | "former role" strike-through |
| Text primary | `#ffffff` | Headlines |
| Text secondary | `rgba(255,255,255,0.6)` | Body |
| Border subtle | `rgba(255,255,255,0.1)` | Card outlines |

## Typography
- **Display**: italic black serif/grotesque hybrid (`font-display` token
  → loaded inline). Used for hero, section titles, page headers.
- **Body**: sans-serif (`font-sans`) — Inter-family, light weight on dark.
- **Mono accent**: `font-mono` — used for eyebrow tags, all-caps labels
  with `tracking-[0.4em]+`.
- Italic + tight tracking on display = signature pattern. Do not change.

## Layout Rules
- Single-page tab routing via React Router. URLs: `/`, `/vision`,
  `/platform`, `/dashboard`, `/services`, `/industries`, `/pricing`,
  `/company`, `/team` (new), `/case-studies`, `/brand-book`, `/contact`.
- Every section has a full-bleed cosmic background.
- Section rhythm: eyebrow tag → italic display headline → supporting
  paragraph → component (grid / chart / 3D scene / dashboard mockup).
- Cards use `rounded-[2rem]` to `rounded-[4rem]` — soft, oversized radius
  is a brand pattern.
- Spacing scale uses Tailwind defaults; vertical rhythm `py-20` to
  `py-32` between major sections.

## Component Rules
- **Hero**: word-by-word fade-in on "Multi Tasking AI Automation Platform".
  Italic display. ClientMarquee orbiting underneath in 3D perspective.
- **Nav**: 11 tabs in a 2-column overlay grid. Now 12 with Team added.
  Already fixed by Katia to scroll if the screen is too short.
- **Cards (philosophy / sectors / dashboards)**: single border, no
  stacked outlines, no rectangular gradient overlay leaking the corner
  radius. Fixed by Katia.
- **Pricing**: decagon planet plans. Added "Updating — Final v2.1
  Pricing Lands Soon" amber pill below the title (Alexei is still
  finalizing numbers).
- **Team**: replaced 3 fictional people with the real 6 founders
  (Alexei, Alon, Katia, Nir, Yoav, Michael). Portraits are initial-based
  generative avatars in dark navy — placeholder until real headshots.

## Motion System
- **Purpose**: every motion explains hierarchy, scroll position, or the
  platform metaphor (planet rotates, satellite orbits, particle flows
  along a process).
- **Implementations**: Motion (Framer) for everything declarative;
  React Three Fiber for 3D scenes; `useScroll` / `useTransform` for
  scroll-driven progress.
- **Performance status**: known issue — site is at FPS 22 avg / min 9 on
  Katia's machine. 94 `repeat:Infinity` animations + 49 backdrop-blurs
  on the home route. Documented in `PERF_HANDOFF.md`. P2 work paused;
  not blocking launch. Track for post-launch.
- **Reduced motion**: respected on cosmic backgrounds (existing).

## Content Rules
- **Language**: English only. (Alexei's earlier 2026-05-17 Hebrew-first
  direction is overridden by Alon's later English-final decision.)
- **Voice**: confident, technical, slightly mythic. "Planetary scale AI
  infrastructure architected for modern enterprises."
- **Anti-patterns**: no emoji in UI, no consumer SaaS warmth, no fake
  metrics like 99.9%, no Lorem Ipsum.

## Responsive Rules
- Mobile breakpoint at `sm:` (640px), tablet at `md:` (768px), desktop
  at `lg:` (1024px). Hero uses `clamp()` and viewport units.
- 3D scenes degrade gracefully — `useThree` + lazy-loaded with
  `<Suspense>` so the SPA mounts even if WebGL is slow.

## Accessibility & SEO
- Site is **private + noindex** during this phase:
  - `<meta name="robots" content="noindex, nofollow, noarchive, ...">`
  - `public/robots.txt` Disallow all
  - `X-Robots-Tag: noindex, nofollow` HTTP header via `vercel.json`
- All interactive cards keyboard-accessible (Enter/Space activate).
- Team cards have `aria-label="View details for {name}, {role}"`.
- Color contrast on white-on-`#020617` exceeds AA.

## Visual QA Checklist
- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] Hero loads with the Glimmer sweep that fades out (Katia's fix)
- [ ] Nav overlay shows all 12 tabs without clipping at 1440x900 AND
      375x812
- [ ] Core Philosophy card has single border, no rectangular corner artifact
- [ ] Pricing shows the amber "Updating" pill
- [ ] Team page shows 6 real names with current/former role labels
- [ ] Robots: `curl -I https://dscope.targetbob.ai/` returns
      `X-Robots-Tag: noindex, nofollow`
- [ ] Robots: `curl https://dscope.targetbob.ai/robots.txt` returns
      `Disallow: /`
- [ ] No console errors in Chrome at desktop and mobile viewport

## Implementation Notes
- **Stack**: Vite 6 + React 19 + Tailwind v4 + Motion (Framer) +
  React Three Fiber + react-router-dom v7 + recharts + lucide-react.
  Same as Alexei's AI Studio export. **Not Next.js** — switching
  would mean rewriting 9,400 lines of `App.tsx` and would destroy
  Alexei's design integrity.
- **Repo**: `AlonIsrael86/dscope` (private). Collaborators added:
  Yoav Yellin, Michael Pavlov.
- **Hosting**: Vercel. Domain: `dscope.targetbob.ai` via Cloudflare DNS
  CNAME (proxy off, Vercel manages SSL).
- **Performance**: documented as known issue, follow-up after launch.

## What I Polished
1. Replaced 3 fictional team members with 6 real founders + roles.
2. Added Team nav tab and `/team` route.
3. Added "Updating Pricing" amber pill to the pricing header.
4. Added complete `noindex` stack: meta tags, robots.txt, X-Robots-Tag.
5. Hardened `vercel.json` with security headers
   (Referrer-Policy, X-Content-Type-Options, X-Frame-Options).
6. Updated `index.html` with full OG + canonical + theme-color.
7. Set `<link rel="canonical">` to `dscope.targetbob.ai`.

## What I Did NOT Touch (intentional preservation of Alexei's vision)
- Three.js scenes, planets, ocean creatures, microscopic objects
- Hero copy: "Multi Tasking AI Automation Platform"
- Pricing decagon planet structure
- Brand Book pages
- Color tokens (the blue/cyan gradient is Alexei's signature)
- The 11-tab navigation pattern
- Any of Katia's recent fixes (Glimmer fade, card outlines, nav scroll)

---

# Surface 2 — Client Showcase / Demo Pages (`public/<client>/`)

> A separate, **light** design system from the cosmic SPA above. Used for per-client showcase/proposal
> pages (e.g. `public/solidcam/index.html`, served at `features.dscope.ai/<client>`) that pitch one client
> and explain the Dscope/TargetBob widget — a CEO forwards the link to their team. **Every new client demo
> page MUST follow this system** so all of them feel like one product, only re-accented per client.

## Objective & audience (Surface 2)
- Make a single client (e.g. **SolidCAM** — industrial CAM/CNC machining software) feel the page was built
  for them, and make the value obvious: *the Dscope/TargetBob widget turns their website visitors into
  qualified leads.* The agent on the page only explains features (no pricing — pricing is being finalized).
- Audience: the client's decision-maker + the employees they forward it to. **English.**

## Visual theme (Surface 2)
- **Light, premium, editorial-product** — white canvas, crisp hairlines, soft oversized shadows, one
  rounded radius family. Confident and clean, never a generic SaaS template, never cosmic/dark (that's the
  popup film's job). The dark Dscope film appears only inside the black-backdrop intro popup.

## Color system (Surface 2) — tokens live in each page's `:root`
| Token | Value | Role |
|---|---|---|
| `--bg` / `--bg-2` | `#FFFFFF` / `#F4F6F9` | Page / light section bands |
| `--surface` / `--surface-2` | `#FFFFFF` / `#F7F9FC` | Cards / hovered cards |
| `--text` / `--muted` / `--faint` | `#161A22` / `#545C6B` / `#8A93A3` | Text primary / secondary / tertiary |
| `--border` / `--border-2` | `rgba(17,24,39,.10)` / `.16` | Hairlines |
| `--dscope-blue` / `--dscope-violet` | `#4F7CFF` / `#7A5CFF` | The Dscope mark stays blue/violet on every page |
| `--accent` / `--accent-2` / `--accent-3` | **per client** | Primary / deep / secondary accent (CTAs, glints) |
| `--accent-tint` / `--accent-tint-2` | per client | Soft accent washes (hero glow, chips) |

**Per-client accent override (the core reusability pattern).** The shared stylesheet defaults `--accent` to
Dscope blue; a `body.client-<name>` class overrides it. SolidCAM example already in the page:
```css
body.client-solidcam{
  --accent:#D81E2C; --accent-2:#A8141C; --accent-3:#C9A24B; /* SolidCAM red + bronze/gold */
  --accent-ink:#fff; --accent-tint:rgba(216,30,44,.07); --accent-tint-2:rgba(216,30,44,.16);
}
```
To add a new client: add `body.client-<name>{…}` with their brand colors, set `<body class="client-<name>">`,
swap the logo + copy. Nothing else in the system changes. Pull the client's real brand colors from their
site/logo — never invent.

## Typography (Surface 2)
- **Inter** (400–800), loaded via Google Fonts. Body line-height 1.6. Headlines tight, bold. No ALL CAPS on
  long lines; mono-style eyebrow tags may use small caps + letter-spacing. (The cosmic SPA's italic display
  is Surface-1 only — do not mix it onto the light pages.)

## Layout & components (Surface 2)
- `--maxw:1140px`, `.container` padding-inline 24px, **logical properties only** (`margin-inline`,
  `inset-inline-*`) — no `left`/`right`.
- Radius family: `--radius:18px` / `--radius-sm:12px`; soft shadows `--shadow` / `--shadow-sm`.
- Buttons: pill (`border-radius:999px`); `.btn-primary` = accent gradient fill, `.btn-ghost` = white + hairline.
- Sticky blurred nav with a **co-brand lockup** (`Dscope` wordmark · separator · client logo + "Prepared for…").
- Section rhythm: eyebrow chip → `<h2>` → supporting line → grid/cards. Reveal-on-scroll via IntersectionObserver
  (`.reveal` → `.in`). Feature pages use a **feature grid** where each card = one feature + **why it drives leads**.
- The live agent is the real TargetBob embed (`app.targetbob.ai/embed/project.js`, the page's `data-project-id`).

## Content rules (Surface 2)
- Lead with the **outcome** (leads / pipeline / qualified demo requests), then the feature. Every feature card
  must answer "why does this drive leads." No pricing, no fake metrics, no emojis, no Lorem Ipsum.

## Accessibility & SEO (Surface 2)
- `noindex` while these are private showcases. Real Hebrew/English `aria-label`s, `:focus-visible` rings,
  semantic landmarks, AA contrast. Zero horizontal overflow at 360/390/768/1440.

---

# Intro popup convention (applies to Surface 2 pages)

A black-backdrop **video lightbox** that auto-plays a ~30s Dscope feature-showcase **film** on entry (the
motion contract is **`frame.md`**). It mirrors the Calcalist 2026 concept popup: fixed near-black backdrop
(`rgba(2,6,23,.94)` + blur), a 16:9 rounded stage, a muted autoplay `<video>`, a corner close button, Esc /
click-outside / tap-to-play fallback, and **auto-close on end**. Default: **show once per browser** (a
`localStorage` flag); a single `SHOW_INTRO_POPUP` switch turns it off, `SHOW_ONCE=false` makes it show every load.

- Markup/script: a self-contained block before `</body>` (see `public/solidcam/index.html`, fenced
  `DSCOPE INTRO POPUP (start)…(end)`). Classes are `dsi*` to avoid collisions.
- Video assets live in `public/<client>/assets/` (`intro-dscope.mp4` H.264/SDR for the browser popup +
  `intro-dscope-poster.jpg`). The popup references them with a **relative** path — no external links.
- Build the film per **`frame.md`** + the `jit-hyperframes-video` skill. Full how-to + removal steps for a
  non-engineer: **`docs/katya-claude-guide/intro-popup-howto.md`**.

## Visual QA (every Surface-2 page, before "done")
- [ ] Desktop 1440 + mobile 390/360 + tablet 768 screenshots; **zero horizontal overflow** at all widths.
- [ ] Per-client accent applied via `body.client-<name>`; Dscope mark stays blue/violet.
- [ ] No orphan word alone on a headline's last line.
- [ ] If the intro popup is on: it opens, plays, closes on end + on Esc/click-outside/✕; the dark film reads
      well over the page; the H.264 mp4 plays in Chrome + Safari; no broken/missing-poster black box.
- [ ] No cookie/consent/overlay in any proof screenshot.
