# `DESIGN.md` and `frame.md` — what they are and why they matter

These two files are why everything on this site looks consistent. Treat them as **contracts**, not notes.

## `DESIGN.md` — the SCREEN contract
A design contract for agents: the exact visual system for the site **before** you write markup. It answers,
up front: What does this page feel like? What must it NOT look like? What are the precise colors, fonts,
spacing, radii, components, and motion rules? What passes QA?

This repo's `DESIGN.md` covers **two surfaces**:
- **Surface 1** — the dark cosmic SPA (`index.html` + `src/`).
- **Surface 2** — the light client showcase pages you build in `public/<client>/`. Its color tokens, the
  **per-client accent override** (`body.client-<name>{…}`), Inter typography, component rules, and a QA
  checklist are all spelled out. Copy an existing page and re-accent — don't reinvent.

**When to use it:** before any HTML/CSS change, and again at the end (run its QA checklist before you call a
page "done"). When the visual system changes, update `DESIGN.md` in the same PR.

## `frame.md` — the VIDEO contract (the sibling of DESIGN.md)
`DESIGN.md` keeps the brand consistent across **screens**. But when you ask an agent to make a **video** from
a design.md alone, it tends to translate the web design back into floating webpage/deck cards — a dashboard in
motion, not a film. `frame.md` is the missing brief that fixes this: it teaches the agent how the brand
**moves** — which color is the "signal," the ONE motion metaphor, the confirmation gesture, the beat
structure, safe areas, and the anti-slop list. **Read `frame.md` before building any video, popup film, ad, or
motion graphic.**

Dscope's `frame.md` in one breath: deep **space-black**, a single **blue→cyan signal** that converges into a
decision, an **emerald "lead-lock"** as the success gesture, ONE feature per beat, a tight ~30s 6-beat
feature-showcase film, English, silent-readable. A branded video is a **film**, not a card wall.

## The end-to-end workflow
**New / changed page:**
1. Read `DESIGN.md` (Surface 2). 2. Build per the system (copy + re-accent). 3. Run the Surface-2 QA
checklist (screenshots at 360/390/768/1440, zero horizontal overflow, accent applied, no orphan words).
4. Push to `main` (auto-deploys). 5. Verify by loading the live page.

**New video / intro popup:**
1. Read `frame.md`. 2. Build the HyperFrames composition to its beats (see `hyperframes-video-guide.md`).
3. Render an **H.264 SDR MP4** (the browser popup file) + a poster, plus an HDR copy for Alon's review.
4. Drop the assets in `public/<client>/assets/` and wire the popup (see `intro-popup-howto.md`).
5. QA: it plays in Chrome + Safari, reads well over the page, auto-closes; no broken black box.

## Keeping the contracts honest
- If you introduce a new color/font/component/section pattern, **add it to `DESIGN.md`** (append, don't
  rewrite). If you change how video looks, **update `frame.md`**. A drifted contract is worse than none.
- Anti-slop (banned unless explicitly asked): generic centered SaaS hero; purple/blue AI gradient; 3 equal
  feature cards as "the idea"; neon glow as concept; gray placeholder boxes; fake metrics like 99.9%; emojis
  in UI; physical `left/right` CSS; a video that's web cards floating over a background.
