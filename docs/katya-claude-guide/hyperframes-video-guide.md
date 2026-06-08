# HyperFrames video guide (with the `frame.md` association)

How to build an on-brand Dscope video with HyperFrames. This is the updated HyperFrames skill — the key
update versus older versions is the **`frame.md` association**: there is now a motion/brand contract you must
read before animating, so videos come out as a branded *film* instead of web cards floating over a background.

## What HyperFrames is
An **HTML/CSS/JS-first** video tool: you build a composition out of DOM scenes animated by a timeline, then
render it to MP4. Great for: KPI/feature recaps, kinetic-type intros, product/feature showcase films, proof
clips, dashboard-motion loops. It is NOT a one-click PDF/PPTX→video converter — treat decks/screenshots as
source material, not final output.
- Docs: https://hyperframes.heygen.com/introduction
- Repo / skill pack: https://github.com/heygen-com/hyperframes

## STEP 0 — read `frame.md` first (non-negotiable)
Open **`/frame.md`** at the repo root. It is the motion contract: the Dscope palette in motion (space-black +
blue→cyan signal + emerald lead-lock), the ONE metaphor ("signal resolving into a decision"), the exact
~30s 6-beat feature-showcase structure, safe areas, the anti-slop list, and the render spec. Build to it. If
`frame.md` and this guide ever disagree, `frame.md` wins.

## Install / commands
```bash
npx hyperframes init my-video-project     # scaffold
npx hyperframes preview                    # local preview
npx hyperframes catalog --json             # browse ready blocks (glass cards, kinetic type, graphs…)
npx hyperframes add <name> --no-clipboard  # pull a catalog block
npx hyperframes render <composition-dir> --hdr --quality high --workers 1 --output out.mp4
```

## Build flow
1. **Story** (from `frame.md` §8): ONE story, ONE idea per beat. For a feature page, the story is *visitors
   arrive → the agent turns them into qualified leads → every feature serves that.* Do NOT enumerate all
   features; weave a few in as fast console "ticks."
2. **Scenes**: one DOM scene per beat. Premium restraint — big negative black space, strong hierarchy, the
   blue→cyan signal as the through-line, an emerald "lead-lock" as the success gesture.
3. **Build + preview**, then **render**, then **polish** + frame-accurate QA.

## Critical gotchas (these cause silent failures)
- **Kinetic scenes must be plain `class="scene"` divs (opacity:0 default), driven ENTIRELY by ONE GSAP master
  timeline registered to `window.__timelines`.** Do NOT use `class="clip"` + `data-start`/`data-duration` on
  individual animated scenes — that visibility lifecycle is rAF-based and **freezes at t=0** during the
  deterministic render (you get a static video). Reserve `class="clip"`/`data-start` for sub-composition
  mounts and timed media only.
- **Localize fonts**: download the `.woff2` and ship a local `@font-face` in the composition folder. A bare
  Google Fonts `<link>` can render as tofu in the sandboxed renderer.
- **If `hyperframes render` outputs a static / byte-identical tiny MP4** (timeline stuck at t=0 — a known
  failure on some compositions), self-render: load the composition headless (Playwright/Puppeteer), kill the
  runtime's rAF reset loop, seek `window.__timelines[<id>].time(t)` per frame, screenshot a PNG sequence,
  then assemble with ffmpeg: `ffmpeg -framerate 30 -i f_%05d.png -c:v libx264 -pix_fmt yuv420p out.mp4`.
- **Always verify it animates**: extract 3 frames at different times and confirm they're visually different
  before shipping. A "moving solid shape" can fool a pixel-std check — look at the frames.

## Outputs (two files, always)
- **(a) H.264 / `yuv420p` SDR MP4** — the file the browser popup uses. **HEVC/HDR will NOT play in most
  browsers**, so the on-page popup ALWAYS points at the H.264 file. Keep it small (target < 3 MB for a 30s
  clip): `-c:v libx264 -pix_fmt yuv420p -crf 21 -movflags +faststart`.
- **(b) HDR HLG HEVC MP4** — Alon's high-quality review copy (his standard). Verify with `ffprobe`:
  `hevc / yuv420p10le / bt2020 / arib-std-b67`. The live page does not use this one.

## QA before "done"
Extract one keyframe per beat. Check: on-brand palette (no purple AI gradient, no flat black), no card-wall,
no orphan word, the end card is not weaker than the body, labels are legible over the footage, English copy,
no baked-in dates/prices, no invented metrics. Silent-readable (it autoplays muted).

## Where built assets go
The shipped popup video + poster live in the repo at `public/<client>/assets/`
(`intro-dscope.mp4` + `intro-dscope-poster.jpg`) so they deploy with the page and the popup references them
with a relative path — **no external links**. See `intro-popup-howto.md`.
