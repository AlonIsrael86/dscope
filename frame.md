# frame.md - Dscope (motion / video brand contract)

> The video sibling of `DESIGN.md`. Read this BEFORE animating ANYTHING for Dscope - every intro
> popup, feature showcase, proof clip, ad, or motion graphic on this site. It turns the static Dscope
> brand (cosmic enterprise infrastructure) into a coherent MOTION system, so agents produce an on-brand
> FILM - not web/deck cards floating over a background, not the Opus cream/serif house style, not a
> generic purple-AI gradient. Engine + render: pair with the `jit-hyperframes-video` skill.
>
> Scope: this contract governs BOTH surfaces of the repo - the main cosmic SPA (`src/`, `index.html`)
> AND the light client-showcase pages (`public/<client>/index.html`). The FILM is always Dscope-branded
> (dark/cosmic); on a light showcase page it appears as a dark cinematic popup over a near-black backdrop
> (the same way a dark video lightbox sits on a light editorial page). A per-client co-accent (e.g.
> SolidCAM red `#D81E2C`) may tint one or two moments, but the film's identity stays Dscope.

## 1. What Dscope feels like in motion
A **planetary-scale control room coming online.** Think a satellite acquiring signal, an enterprise
intelligence console booting, lines of light resolving into order across deep space. Calm, confident,
precise - never frantic, never "techno-glitch." The ONE metaphor: **signal resolving into a decision** -
scattered points of light converge into a clean line / orbit / answer. Motion is purposeful: things
*arrive* and *lock*, they don't drift. If a frame looks like a marketing landing page or a dashboard
screenshot in motion, it's wrong. Restraint is the brand: deep space, a single blue-to-cyan signal,
generous black, one idea per beat.

## 2. Canvas & format defaults
- **Default surface = on-page intro/showcase popup -> 16:9, 1920x1080, 30fps.** (Square 1080x1080 or
  vertical 1080x1920 only when explicitly requested for social/ads.)
- Length: **~30s** for the feature-showcase intro. Hard cap 35s - it pops up on entry and a CEO will
  forward the page to employees, so it must hold attention and finish cleanly.
- Safe area: keep logo, headline, key labels >= 6% from every edge (~115px on a 1080-height frame) so a
  rounded modal / letterbox never clips them.
- **Two deliverables every time:** (a) **H.264 SDR MP4** (`yuv420p`) = the universal web-popup + file-review
  copy - HEVC will NOT play in most browsers, so the popup ALWAYS points at the H.264 file; (b) **HDR HLG
  HEVC MP4** = Alon's high-quality review copy per the HDR standard. The popup on the live page uses (a).

## 3. Color system (motion)
- Lead background: **space black `#020617`** (deepest `#010610` for the most "console" scenes). Depth comes
  from a subtle radial vignette, faint star/particle field, and one soft blue glow pool - NOT flat pure
  black and NOT a gradient-mesh slop wash. One light source feel.
- The ONE signal accent: the **Dscope blue->cyan gradient `#4FACFE` -> `#00F2FE`** - the converging signal
  lines, the active glow, the underline that draws in, the CTA. Use it as "this is the intelligence."
- Success / "this drives leads" cue: **emerald `#34D399`** with a **converge-and-lock** gesture (the signal
  snapping to a clean node / a lead pin landing) - that is the confirmation gesture, NOT a generic
  checkmark. A captured lead "locks" in emerald.
- Text: white `#FFFFFF` for headlines; `rgba(255,255,255,.62)` for support. Hairlines `rgba(255,255,255,.10)`.
- Per-client co-accent (optional, <=2 moments): e.g. SolidCAM red `#D81E2C`. Used only to nod to the host
  brand (a logo lockup, one accent tick) - never replaces the Dscope blue as the lead signal.

## 4. Typography (motion)
- Display/headlines: **italic display serif-grotesque**, tight tracking - the Dscope signature (matches the
  site's `font-display`, "Multi Tasking AI Automation Platform" italic look). Big, confident, one line per beat.
- Eyebrow / labels / feature names: **mono, all-caps, wide tracking (`letter-spacing:.3-.4em`)** - the Dscope
  `font-mono` eyebrow pattern. Feature labels tick in like console readouts.
- Numbers/metrics: tabular numerals, count-up where a real number is shown. Never invent metrics.
- **Embed fonts LOCALLY** as `@font-face` (woff2 in the composition folder). A bare Google Fonts `<link>`
  warns and falls back to tofu in the deterministic renderer. Mandatory.
- Line-height 1.1-1.3 for big display; no ALL-CAPS on long display lines (caps only for mono eyebrows/labels).

## 5. Language / direction
- **English by default** (the Dscope site and the SolidCAM showcase are English). If a Hebrew variant is
  requested: `dir="rtl"`, reveals originate from the RIGHT, wrap numbers/URLs/Latin product names in
  `dir="ltr"`, never an orphan Hebrew word on a line, never visually left-aligned Hebrew in a pill/row.

## 6. Motion grammar
- Easing: `power3.out` / `power4.out` for arrivals; quick `power2.inOut` for cuts. Everything on a single
  GSAP master timeline registered to `window.__timelines` so the self-renderer can seek per frame.
- Signature moves: (a) **signal converge** - scattered points of light pull into one clean blue line/orbit;
  (b) **console tick** - a mono label snaps in with a 1px cyan underline draw; (c) **lead lock** - a pin /
  node lands and locks in emerald (the "this drives leads" beat); (d) **glass card surface** - a frosted
  panel resolves out of the dark to hold ONE feature, then dissolves (one feature per beat, never a wall of
  cards). (e) optional **planet/orbit drift** in the deep background for continuity.
- Proof reveal: when a real capability is shown (chat reply, voice waveform, page-aware slogan changing,
  lead routed to CRM), show the REAL behavior, cropped to the proof region - not a stretched full screenshot.
- Transitions: clean cuts on the beat or a soft blue light-sweep. NO glitch/distortion, NO blur stacks, NO
  random camera moves, NO purple AI gradient.
- Scenes that show/hide over time = plain `class="scene"` divs (opacity:0) driven by the timeline. Do NOT use
  `class="clip"`+`data-start` on kinetic scenes (it freezes at t=0 in the deterministic render).

## 7. Logo & lockup
- Use the real **Dscope** wordmark (white, the site's blue/violet mark) on the dark scenes. On a co-branded
  showcase film, a "Dscope x <Client>" lockup may appear once (host logo contrast-checked against the actual
  frame behind it - never a white/light logo on a light glow pool).
- Entrance: wordmark resolves out of the converging signal with a short cyan underline draw. End card =
  Dscope mark + ONE claim + the live link/CTA, full-screen on space black. The end card must NOT be weaker
  than the body.

## 8. Beat structure - the SolidCAM / client feature-showcase intro (~30s, 16:9)
The page lists ~18 features ("Every feature - and why it drives leads"). The film does NOT list all 18 - it
tells ONE story: *visitors arrive, the agent turns them into qualified leads, and every feature serves that.*
1. **0-3s Hook (space black):** signal converges; one line - the stakes. e.g. *"Your website is full of
   buyers who never say hello."* Cyan underline draw.
2. **3-9s The agent comes alive:** a frosted console resolves - **AI chat + real-time voice** answer a real
   SolidCAM-style question. Mono label ticks: `AI SALES AGENT` / `VOICE`.
3. **9-15s It reads the room:** **smart, page-aware triggers** - the slogan/offer changes by page/scroll;
   a custom popup surfaces at the right moment. Label: `PAGE-AWARE TRIGGERS`.
4. **15-21s It captures:** **branching lead form -> instant CRM capture**; a lead pin **locks in emerald**
   (the confirmation gesture). Label: `LEAD CAPTURE -> YOUR CRM`. This is the "why it drives leads" core.
5. **21-27s It compounds:** post-conversation intelligence, integrations/automations, knowledge base,
   multilingual, one-script install - shown as fast console ticks converging on the signal line (NOT a card
   wall). Label: `+ EVERY FEATURE SERVES THE LEAD`.
6. **27-30s End card:** Dscope (x SolidCAM) lockup + claim (*"Turn visitors into pipeline."*) + CTA. Cyan
   underline. Hold.

Pacing: ~6 beats, no beat longer than ~6s, cut on rhythm. **Silent-readable first** (it autoplays muted).

## 9. Voice in video
- English, enterprise-confident, category-led, short. No marketing fluff, no jargon dumped on screen.
- Lead with the OUTCOME (leads / pipeline / qualified demo requests), then the capability. The copy must say
  *why* a feature drives leads, not just name it.
- Evergreen: NO dates, NO prices, NO mutable claims baked in (pricing is still being finalized - keep it out).

## 10. Audio
- Default **silent + kinetic** - it autoplays muted in a popup (must be muted to autoplay in browsers; design
  for sound-off). If music is added it must be a licensed/royalty-safe ambient/console bed, ffprobe-verified -
  never a placeholder synth/electrical tone.

## 11. Render spec (Alon HDR standard)
- Build: HyperFrames HTML/CSS/GSAP composition, 1920x1080@30, ~30s. If `hyperframes render` emits a static
  t=0 clip, self-render with `scripts/utils/hf-selfrender.js` (seeks `window.__timelines[id].time(t)` per
  frame, screenshots a PNG sequence), then `ffmpeg -framerate 30 -i f_%05d.png ... out.mp4`.
- Outputs: high-quality **H.264 yuv420p MP4** (the live popup + review) AND **HDR HLG HEVC MP4** (Alon review)
  via `scripts/utils/convert-video-to-hlg-hdr.ps1` -> verify with `verify-video-hdr.ps1` / `ffprobe`
  (hevc / yuv420p10le / bt2020 / arib-std-b67). The popup on the live page references the H.264 file ONLY.
- Frame-accurate QA: extract one keyframe per beat; check alignment, logo contrast over the actual frame,
  no orphan word, numbers correct, no card-wall slop.

## 12. Anti-slop (the exact failures to avoid)
- Web/deck cards or pills floating over a background instead of composed scenes, or a "wall of 18 feature
  cards." A branded video is a FILM - ONE feature per beat, converging on one story.
- Opus house style (cream bg, serif everywhere, italic accents, terracotta). Override with this palette.
- Purple/blue generic-AI gradient; neon glow substituting for concept; generic green checkmark (use the
  emerald **lead-lock** instead); a stretched edge-to-edge screenshot in the frame (crop to the proof region);
  glitch/distortion as a default; baked-in dates/prices; placeholder/electrical music; inventing metrics.

## 13. Assets
- Brand tokens: `DESIGN.md` (cosmic SPA + showcase-page systems) + `public/solidcam/index.html` `:root`.
- Fonts: italic display + mono eyebrow (download woff2 into the composition folder; localize for the renderer).
- Composition + renders live in the composition folder; the SHIPPED popup video + poster live in the repo at
  `public/<client>/assets/` (e.g. `public/solidcam/assets/intro-dscope.mp4` + `intro-dscope-poster.jpg`) so
  they deploy with the page and the popup can reference them with a relative path (no external links).
- The on-page popup pattern itself is documented in `docs/katya-claude-guide/intro-popup-howto.md`.
- Worked reference for the popup mechanics + a real built film: the Calcalist 2026 concept
  (`clients/calcalist/calcalist-2026-concept-repo/` - its `index.html` intro popup + `frame.md` + the
  `assets/intro-2026.mp4`). Build mechanics reference: `clients/orin-shpalter/brand-assets/frame.md`.
