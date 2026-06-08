# Dscope showcase pages — guide for the build agent

This folder is the operating guide for building and maintaining **client showcase / demo pages** in this
repo (`public/<client>/index.html`, served at `features.dscope.ai/<client>` — e.g. the SolidCAM page at
`public/solidcam/`). It is written for a Claude Code agent + the person directing it. Read it before
adding a page, changing a page, or producing any video/motion for this site.

## The two contracts (read these first, every time)
| File | What it is | When to read |
|---|---|---|
| **`/DESIGN.md`** | The **screen** design contract. Governs both the main cosmic SPA (Surface 1) and the light client showcase pages (**Surface 2** — that's what you build here). Has the exact colors, fonts, layout, the per-client accent pattern, and the QA checklist. | Before any HTML/CSS change. |
| **`/frame.md`** | The **video / motion** brand contract (the sibling of DESIGN.md). Governs every intro popup, showcase film, ad, or motion graphic. Has the Dscope palette in motion, the "signal resolving into a decision" metaphor, and the exact 6-beat film structure. | Before building ANY video. |

> Rule: never design a page from scratch and never build a video from vibes. Open `DESIGN.md` for screens,
> `frame.md` for video. They exist so every page and every clip looks like ONE consistent, premium product.

## What's in this guide
1. **`design-and-frame-explained.md`** — what `DESIGN.md` and `frame.md` are, why they matter, and the
   end-to-end workflow for a new page or a new video.
2. **`hyperframes-video-guide.md`** — the HyperFrames skill (how to actually build + render an on-brand
   video), including the all-important `frame.md` association. This is the updated HyperFrames skill.
3. **`intro-popup-howto.md`** — the black-backdrop intro-video popup: how it works, how to add it to a new
   client page, how to swap the video, and **how to remove it** if a client doesn't want it.

## How to add a new client showcase page (the short version)
1. Copy `public/solidcam/index.html` to `public/<client>/index.html`.
2. In `DESIGN.md` → "Surface 2", follow the **per-client accent** pattern: add a `body.client-<name>{…}`
   block with the client's real brand colors, set `<body class="client-<name>">`, swap the logo + copy.
3. Keep the Dscope wordmark blue/violet; keep the light system; lead every feature with *why it drives leads*.
4. Wire the real TargetBob embed (`app.targetbob.ai/embed/project.js` + the client's `data-project-id`).
5. (Optional) Add the intro popup + build its film — see `intro-popup-howto.md` + `frame.md`.
6. Run the Surface-2 visual QA checklist in `DESIGN.md`. Push to `main` — Vercel auto-deploys.

## Deploy reality (no Vercel access needed)
This repo is `AlonIsrael86/dscope`, public, on Vercel Hobby with **GitHub-synced auto-deploy**: every push to
`main` deploys itself. You don't touch Vercel or DNS. `features.dscope.ai/<client>` and `dscope.ai/<client>`
serve the same files (same project). Verify a deploy by **loading the live page**, not by trusting a green
check — Vercel can say "Ready" while your browser shows a cached old version (hard-refresh / incognito).
