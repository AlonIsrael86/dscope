# DESIGN.md — Dscope Marketing Site

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
