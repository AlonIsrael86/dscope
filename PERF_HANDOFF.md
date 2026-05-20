# Dscope — Performance Handoff (P2 continuation)

> Read this fully before continuing performance work. Self-contained context
> for a fresh Claude Code session. Created 2026-05-18 ~22:35 IST.

## Current git state
- **Branch**: `etap2-split-app` (NOT merged to main — production is safe on Etap 1)
- All work committed + pushed. `main` = stable Etap 1 (React Router live on https://dscope-ashen.vercel.app)
- Restore point tag: `v1-vite-baseline` @ `11cfac4`
- Local path: `~/Documents/Targetbob/Dscope/`

## What is done
- **Etap 1** (merged to main, live): React Router, 11 routes, vercel.json SPA rewrite, per-route title
- **Etap 2.1–2.2b** (branch only): extracted ContactPlaceholder, 17 lazy-wrappers (`src/lazyComponents.tsx`), CaseStudies (`src/routes/CaseStudies.tsx`), TestimonialsSection (`src/routes/Testimonials.tsx`). App.tsx 9674 → ~9420 lines. Pure refactor, 0 visual change. **NOT the perf fix** — code hygiene only.
- **FpsMeter** (`src/components/FpsMeter.tsx`) — TEMPORARY debug overlay, top-left corner, shows `FPS NN · min NN`. **MUST be removed before merge to main** (search "TEMPORARY" / FpsMeter import in App.tsx).

## The real problem — PROVEN
- **Baseline measured by Katia on her real machine: FPS 22 · min 9** (red — janky, drops to slideshow). This is the ground truth.
- **Root cause (statically proven)**: App.tsx has **94 `repeat: Infinity` animations + 49 `backdrop-blur` + ~70 `blur()` + 11 `mix-blend`**. The `home` route mounts ALL sections at once (single-page scroll), so all 94 animations run simultaneously even for sections below the fold (not visible, but still consuming GPU every frame).
- Symptom Katia reported: "виснуть всі ефекти — планети, тексти які виїжджають, анімації" (all effects lag).

## Hypotheses RULED OUT (do not re-investigate)
- ❌ "Three.js eager import blocks main thread" — FALSE. JS loads in <1s, total blocking only 87ms. Bundle is NOT the problem.
- ❌ "Loader takes 90s" — FALSE. That was an artifact of Claude-in-Chrome's **hidden tab** (Chrome throttles timers in background tabs). On a real active tab the loader is ~4s.
- ❌ Fixing the loader timer (setInterval→rAF) — placebo, won't help.

## CRITICAL tooling constraint
**Claude-in-Chrome runs in a hidden/background tab** (`visibilityState: "hidden"`, `hasFocus: false`). It CANNOT measure FPS or see real rendering — the browser pauses rAF/paint in hidden tabs. This invalidated an earlier audit. **Therefore: the agent is blind to FPS. Every perf change must be measured by Katia on her own machine** via the FpsMeter overlay. Workflow per step: agent changes code → push → Katia opens preview URL → reads `FPS · min` in corner + checks nothing visually changed → reports numbers → agent adjusts.

## Plan (priority order)
- **P2 (MAIN FIX, do first)**: Pause `repeat: Infinity` animations + 3D when their section is NOT in viewport (IntersectionObserver → `animation-play-state: paused` / don't run motion). ~80 of 94 animations run offscreen for nothing. **0 visual change** (not visible = identical to viewer). Biggest win, lowest visual risk. Even helps start FPS on `home` (all sections mounted at once).
- **P1 (content-visibility:auto)**: RISKY here — many scroll-pinned sections (`ref={containerRef}`, `min-h-[500vh]`). Could break scroll-linked animations. Lower priority, careful, needs Katia visual check.
- **P3 (re-render memo)**: React.memo/useMemo on heaviest components. Smaller effect, 0 visual risk. Do after P2.

## Hard constraints (Alon + Katia)
- **DO NOT change the visual appearance.** Any optimization must keep the design pixel-identical for the viewer. Katia verifies each step.
- DO NOT do Three.js refactor (ruled out).
- DO NOT merge to main until: perf measurably better (Katia confirms FPS), visual unchanged, FpsMeter removed, full Chrome+Safari test.
- Work on branch `etap2-split-app`. Production untouched.
- Record every change in `CHANGELOG.md` (format: date/time IST/author=Катя/commit/summary/verified).
- Respond to Katia in Ukrainian.

## How to measure (Katia's side)
Preview URL pattern: push branch → Vercel auto-builds preview → `vercel ls dscope --scope yeda-tech` to get newest Preview URL (SSO-protected, Katia logged in as design@yedatech.io). Latest as of handoff: https://dscope-og4aohrre-yeda-tech.vercel.app . Katia opens it, reads FPS corner overlay, scrolls, reports `FPS` + `min` + which section worst.

## Next concrete step
Start P2: find how the 94 Infinity animations are structured per section, design a viewport-gated pause wrapper (IntersectionObserver) applied at section level (not per-animation — too granular). Implement on 1-2 sections as pilot, push, Katia measures delta, then scale. Keep visual identical.
