# Intro-video popup — how it works, add, swap, and REMOVE

The intro popup is a black-backdrop **video lightbox** that auto-plays a ~30s Dscope feature-showcase film
when someone opens a client showcase page, then closes itself. It's the same pattern as the Calcalist 2026
concept popup. Live reference implementation: the SolidCAM page, `public/solidcam/index.html` — find the block
fenced by `DSCOPE INTRO POPUP (start)` … `DSCOPE INTRO POPUP (end)` just before `</body>`.

## How it behaves
- Opens on page load, **muted autoplay** (must be muted to autoplay in browsers), 16:9 rounded stage over a
  near-black blurred backdrop (`rgba(2,6,23,.94)`).
- Closes on: the ✕ button, click outside the video, **Esc**, or **when the video ends**.
- **Shows once per browser** by default (a `localStorage` flag), so a returning visitor isn't nagged.
- If autoplay is blocked, a blue play button appears (tap-to-play fallback).
- Respects `prefers-reduced-motion`.

## The two switches (top of the popup `<script>`)
```js
var SHOW_INTRO_POPUP = true;  // master on/off
var SHOW_ONCE        = true;  // true = once per browser; false = show on every page load
```

## REMOVE IT (if the client doesn't want the video) — two ways, either works
1. **Quick off:** set `SHOW_INTRO_POPUP = false;` in the popup `<script>`. The video never appears. (You can
   leave the block in place for later.)
2. **Full remove:** delete the whole block — everything from the
   `<!-- DSCOPE INTRO POPUP (start) … -->` comment down to `<!-- DSCOPE INTRO POPUP (end) -->`. Optionally
   delete `public/<client>/assets/intro-dscope.mp4` + `…-poster.jpg`.

Then push to `main` (auto-deploys) and hard-refresh the live page to confirm it's gone.

## SHOW IT AGAIN while testing (it remembers you've seen it)
Because of "once per browser," it won't reopen for you after the first view. To see it again:
- Open the page in a **private/incognito** window, or
- Clear the flag in DevTools console: `localStorage.removeItem('dscope_intro_solidcam_seen')` then reload.
  (The key is `dscope_intro_<client>_seen` — rename per page so each client page tracks separately.)

## SWAP / regenerate the video
The popup points at **relative** asset paths inside the page's own folder:
```
public/<client>/assets/intro-dscope.mp4          # H.264 SDR, browser-safe (the file the popup plays)
public/<client>/assets/intro-dscope-poster.jpg   # poster frame
```
To change the film: build a new one per **`/frame.md`** + `hyperframes-video-guide.md`, export an **H.264 /
yuv420p** MP4 (HEVC won't play in browsers), replace those two files (keep the names, or update the `<source>`
+ `poster` in the block), push to `main`, hard-refresh. Keep the mp4 small (< ~3 MB) so the popup opens fast.

## ADD it to a NEW client page
1. Copy the fenced `DSCOPE INTRO POPUP (start)…(end)` block from `public/solidcam/index.html` to just before
   `</body>` on the new page.
2. Change the `localStorage` key `dscope_intro_solidcam_seen` → `dscope_intro_<newclient>_seen`.
3. Put the new client's `intro-dscope.mp4` + `intro-dscope-poster.jpg` in `public/<newclient>/assets/`.
4. Update `aria-label` / any visible copy to the new client. Push → verify on the live page.

## CRITICAL: use ABSOLUTE asset paths (the trailing-slash trap)
The popup's `<source src>` and `poster` MUST be **absolute from the site root** — `/<client>/assets/intro-dscope.mp4`,
NOT relative `assets/intro-dscope.mp4`. Reason: Vercel serves `features.dscope.ai/<client>` (no trailing slash) with
a 200 and NO redirect, so a *relative* `assets/...` resolves against the parent (`features.dscope.ai/assets/...`) and
**404s → black video box on every browser**. It only "works" if you happen to visit the URL with a trailing slash.
The SolidCAM page already uses `/solidcam/assets/...`. For a new client, use `/<client>/assets/...`. (This bit us once;
the page rendered fine but the video 404'd for everyone who opened the no-slash link.)

## Don't ship a broken popup
If you wire the popup but the `intro-dscope.mp4` / poster are missing, visitors see a black box. Either ship
the video assets **with** the popup in the same push, or keep `SHOW_INTRO_POPUP = false` until the film is in
the folder.
