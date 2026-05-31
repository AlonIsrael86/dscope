import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * GalaxyAboutBackground
 *
 * Per Katia:
 *   - Whole viewport covered in 18 named constellations (no labels)
 *   - Stars are TRUE circles (rendered as round divs, not SVG circles
 *     inside a stretched viewBox)
 *   - Each star twinkles asynchronously (per-instance CSS animation)
 *   - Each CONSTELLATION as a whole drifts gently — stars and their
 *     connection lines move together so the asterism stays intact —
 *     and each one drifts on its own slow path so the sky never feels
 *     synced ("хай сузіря всі трохи рухаються")
 *   - Background gradient gently shifts on scroll
 *
 * Ambient sprinkle stars stay where they are (they're not part of any
 * constellation, just fills the gaps).
 */

type Star = { x: number; y: number; mag?: number };
type Constellation = { name: string; stars: Star[]; edges: [number, number][] };

const CONSTELLATIONS: Constellation[] = [
  // ── TOP BAND ──
  {
    name: 'Ursa Major',
    stars: [
      { x: 4, y: 12 }, { x: 7.5, y: 9 }, { x: 11, y: 7 },
      { x: 14.5, y: 7, mag: 1.2 }, { x: 16, y: 11 },
      { x: 20, y: 13 }, { x: 20, y: 7, mag: 1.4 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  },
  {
    name: 'Ursa Minor',
    stars: [
      { x: 28, y: 4, mag: 1.3 }, { x: 31, y: 6 }, { x: 33, y: 9 },
      { x: 36, y: 8 }, { x: 38, y: 11 }, { x: 41, y: 13 }, { x: 39, y: 16 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  },
  {
    name: 'Cassiopeia',
    stars: [
      { x: 76, y: 7 }, { x: 81, y: 12 }, { x: 85, y: 8 },
      { x: 90, y: 14 }, { x: 95, y: 9 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    name: 'Cepheus',
    stars: [
      { x: 60, y: 4 }, { x: 64, y: 8 }, { x: 68, y: 5 },
      { x: 70, y: 12 }, { x: 62, y: 13 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0]],
  },

  // ── UPPER-MID BAND ──
  {
    name: 'Cygnus',
    stars: [
      { x: 9, y: 28 }, { x: 12, y: 33 }, { x: 14, y: 38 },
      { x: 8, y: 38 }, { x: 19, y: 38 }, { x: 17, y: 45 },
    ],
    edges: [[0,1],[1,2],[2,3],[2,4],[2,5]],
  },
  {
    name: 'Lyra',
    stars: [
      { x: 32, y: 24, mag: 1.7 },
      { x: 36, y: 28 }, { x: 35, y: 33 }, { x: 31, y: 30 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0]],
  },
  {
    name: 'Pegasus',
    stars: [
      { x: 53, y: 25 }, { x: 62, y: 24 }, { x: 63, y: 33 }, { x: 54, y: 34 },
      { x: 48, y: 22 }, { x: 45, y: 18 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[0,4],[4,5]],
  },
  {
    name: 'Andromeda',
    stars: [
      { x: 70, y: 24 }, { x: 76, y: 27 }, { x: 82, y: 30 },
      { x: 88, y: 33 }, { x: 93, y: 28 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
  },

  // ── CENTER BAND ──
  {
    name: 'Hercules',
    stars: [
      { x: 6, y: 50 }, { x: 11, y: 47 }, { x: 12, y: 53 },
      { x: 17, y: 52 }, { x: 14, y: 58 }, { x: 9, y: 60 },
    ],
    edges: [[0,1],[1,3],[3,4],[4,5],[5,0],[1,2],[2,4]],
  },
  {
    name: 'Leo',
    stars: [
      { x: 28, y: 48 }, { x: 32, y: 45 }, { x: 35, y: 50 },
      { x: 33, y: 55 }, { x: 40, y: 52 }, { x: 44, y: 57 },
      { x: 38, y: 60 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6],[6,3]],
  },
  {
    name: 'Auriga',
    stars: [
      { x: 56, y: 46 }, { x: 62, y: 44 }, { x: 65, y: 49 },
      { x: 61, y: 54 }, { x: 56, y: 52 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0]],
  },
  {
    name: 'Bootes',
    stars: [
      { x: 75, y: 46, mag: 1.5 },
      { x: 80, y: 51 }, { x: 84, y: 55 }, { x: 81, y: 60 },
      { x: 77, y: 56 }, { x: 73, y: 52 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,5],[4,1]],
  },

  // ── LOWER-MID BAND ──
  {
    name: 'Orion',
    stars: [
      { x: 32, y: 70, mag: 1.5 }, { x: 44, y: 69 },
      { x: 37, y: 75 }, { x: 39, y: 76 }, { x: 41, y: 77 },
      { x: 33, y: 82 }, { x: 46, y: 83, mag: 1.7 }, { x: 39, y: 80 },
    ],
    edges: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[3,7]],
  },
  {
    name: 'Taurus',
    stars: [
      { x: 53, y: 67, mag: 1.4 }, { x: 58, y: 64 }, { x: 60, y: 70 },
      { x: 64, y: 66 }, { x: 67, y: 73 },
    ],
    edges: [[0,1],[1,3],[3,4],[0,2],[2,4]],
  },
  {
    name: 'Gemini',
    stars: [
      { x: 75, y: 67 }, { x: 79, y: 69 }, { x: 82, y: 75 }, { x: 78, y: 78 },
      { x: 76, y: 73 }, { x: 86, y: 71 }, { x: 89, y: 78 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,5],[5,6]],
  },

  // ── BOTTOM BAND ──
  {
    name: 'Canis Major',
    stars: [
      { x: 8, y: 86, mag: 1.8 }, { x: 12, y: 90 }, { x: 16, y: 87 },
      { x: 20, y: 92 }, { x: 14, y: 83 },
    ],
    edges: [[0,1],[1,2],[2,3],[2,4],[4,0]],
  },
  {
    name: 'Scorpius',
    stars: [
      { x: 30, y: 88 }, { x: 35, y: 90 }, { x: 40, y: 88 },
      { x: 44, y: 92 }, { x: 49, y: 90 }, { x: 53, y: 87 },
      { x: 56, y: 91 }, { x: 60, y: 88, mag: 1.4 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
  },
  {
    name: 'Sagittarius',
    stars: [
      { x: 68, y: 87 }, { x: 72, y: 90 }, { x: 76, y: 88 },
      { x: 80, y: 92 }, { x: 76, y: 85 }, { x: 84, y: 86 },
      { x: 88, y: 90 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,5],[5,2],[4,0],[4,2],[5,6]],
  },
];

// Ambient sprinkle in the gaps — these stay where they are (not part
// of any constellation, so no drift)
const AMBIENT_STARS = Array.from({ length: 70 }).map((_, i) => ({
  x: (i * 17.31 + 7) % 100,
  y: ((i * i * 0.83) + i * 11) % 100,
  mag: 0.6 + ((i * 0.11) % 0.6),
}));

const STAR_KEYFRAMES = `
  @keyframes star-twinkle {
    0%   { opacity: 0.35; transform: translate(-50%, -50%) scale(0.8); }
    50%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.15); }
    100% { opacity: 0.35; transform: translate(-50%, -50%) scale(0.8); }
  }
`;

// Per-star micro-jitter parameters — deterministic per (constellation, star)
// so the constellation breathes gently but the same asterism is always
// recognizable. Amplitude in viewBox % units (0.5–1.2%), so the shape
// shifts slightly but stays clearly the same constellation.
const jitterParams = (index: number, si: number) => {
  const seed = index * 31 + si * 13;
  return {
    freqX: 0.0007 + ((seed * 0.0000037) % 0.0006), // rad/ms
    freqY: 0.0006 + ((seed * 0.0000041) % 0.0005),
    phaseX: ((seed * 0.7) % (2 * Math.PI)),
    phaseY: ((seed * 0.9) % (2 * Math.PI)),
    ampX: 0.12 + ((seed % 7) * 0.04), // 0.12 .. 0.36 %
    ampY: 0.10 + ((seed % 5) * 0.04), // 0.10 .. 0.26 %
  };
};

// One constellation: its own absolute-inset layer that gently drifts
// as a WHOLE, plus each star inside also micro-jitters individually so
// the asterism subtly breathes. Lines re-render every animation frame
// from the live star positions so they always connect to the moving
// endpoints — the shape stays clearly recognizable.
const ConstellationLayer = React.memo(({ cn, index }: { cn: Constellation; index: number }) => {
  // Group drift (whole constellation glides together)
  const dxA = ((index * 17) % 9) - 4;
  const dyA = ((index * 23) % 7) - 3;
  const dxB = ((index * 11) % 7) - 3;
  const dyB = ((index * 31) % 9) - 4;
  const dur = 18 + ((index * 5) % 14);
  const delay = (index * 0.9) % 6;

  const jitterRefs = useMemo(() => cn.stars.map((_, si) => jitterParams(index, si)), [index, cn.stars]);

  // ~30fps state tick → stars + lines re-position every ~33ms
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  useEffect(() => {
    const loop = (now: number) => {
      if (now - lastRef.current >= 33) {
        setT(now);
        lastRef.current = now;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Compute current (jittered) position for each star at this tick
  const positions = cn.stars.map((s, si) => {
    const j = jitterRefs[si];
    return {
      x: s.x + Math.sin(t * j.freqX + j.phaseX) * j.ampX,
      y: s.y + Math.cos(t * j.freqY + j.phaseY) * j.ampY,
    };
  });

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        x: [`0%`, `${dxA}%`, `${dxB}%`, `0%`],
        y: [`0%`, `${dyA}%`, `${dyB}%`, `0%`],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Asterism lines — endpoints follow the live jittered star positions */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {cn.edges.map(([a, b], ei) => {
          const pa = positions[a];
          const pb = positions[b];
          return (
            <line
              key={`${cn.name}-e-${ei}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="rgba(165,180,252,0.32)"
              strokeWidth="0.11"
              strokeLinecap="round"
              strokeDasharray="0.45 0.55"
            />
          );
        })}
      </svg>
      {/* Stars — round divs at the same jittered positions, with continuous twinkle */}
      {cn.stars.map((s, si) => {
        const mag = s.mag ?? 1;
        const px = 2.4 + mag * 1.6;
        const seed = index * 31 + si * 13;
        const tDur = 2.6 + ((seed * 0.41) % 4.6);
        const tDelay = (seed * 0.27) % 6;
        const p = positions[si];
        return (
          <div
            key={`${cn.name}-s-${si}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${px}px`,
              height: `${px}px`,
              boxShadow: `0 0 ${px * 1.6}px rgba(255,255,255,0.55)`,
              transform: 'translate(-50%, -50%)',
              animation: `star-twinkle ${tDur}s ease-in-out ${tDelay}s infinite`,
            }}
          />
        );
      })}
    </motion.div>
  );
});
ConstellationLayer.displayName = 'ConstellationLayer';

import { useReducedEffects } from '../hooks/useReducedEffects';

export const GalaxyAboutBackground = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const { reduced } = useReducedEffects();

  // Per Katia 2026-05-27: «на сторінці about фон змінює кольори,
  // прибери звідти зелений колір».
  // Previously the mid-scroll stop was dark emerald (#022c22 /
  // #053e2c). Now all 3 stops rotate through DARK BLUE / NAVY /
  // INDIGO only — no greens, no purples, no pinks. Photographs still
  // sit comfortably on the dark base, scroll still shifts subtly.
  const colorTop    = useTransform(scrollYProgress, [0, 0.5, 1], ['#0a1535', '#0c1230', '#0e1a3a']);
  const colorMid    = useTransform(scrollYProgress, [0, 0.5, 1], ['#0c1a4a', '#142552', '#0c2540']);
  const colorBottom = useTransform(scrollYProgress, [0, 0.5, 1], ['#020617', '#02050f', '#020617']);
  const coreColor   = useTransform(scrollYProgress, [0, 0.5, 1], ['rgba(79,172,254,0.18)', 'rgba(99,102,241,0.18)', 'rgba(79,172,254,0.18)']);

  const gradient = useTransform(
    [colorTop, colorMid, colorBottom],
    ([t, m, b]) => `linear-gradient(180deg, ${t} 0%, ${m} 55%, ${b} 100%)`
  );
  const coreBg = useTransform(
    [coreColor],
    ([c]) => `radial-gradient(circle, ${c} 0%, rgba(0,0,0,0) 65%)`
  );

  const blobAnim = useMemo(
    () => ({
      x: [0, 30, -20, 0],
      y: [0, -25, 20, 0],
      scale: [1, 1.05, 0.96, 1],
    }),
    []
  );

  const ambientRendered = useMemo(
    () =>
      AMBIENT_STARS.map((s, i) => {
        const px = 1.4 + s.mag * 1.3;
        const dur = 2.4 + ((i * 0.61) % 4.4);
        const delay = (i * 0.43) % 6.5;
        return { ...s, px, dur, delay, i };
      }),
    []
  );

  // LITE mode: render ONLY the scroll-driven gradient. Skip the
  // 200-star sprinkle field, the 18 drifting constellations, the
  // breathing/drifting blob — all of it. Result: <50ms of background
  // work per scroll tick instead of ~5-10ms × ~220 elements.
  if (reduced) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <motion.div className="absolute inset-0" style={{ background: gradient }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.65) 100%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      <style>{STAR_KEYFRAMES}</style>

      {/* Scroll-driven primary gradient */}
      <motion.div className="absolute inset-0" style={{ background: gradient }} />

      {/* Soft galaxy core that breathes + drifts; color follows scroll */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '40%',
          width: '70vw',
          height: '70vw',
          translateX: '-50%',
          translateY: '-50%',
          background: coreBg,
          filter: 'blur(60px)',
        }}
        animate={blobAnim}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient sprinkle stars — stationary, just twinkle. In LITE
          mode we render only every 3rd star (~67 instead of ~200)
          and skip the per-star CSS twinkle animation. */}
      {ambientRendered
        .filter((s) => (reduced ? s.i % 3 === 0 : true))
        .map((s) => (
          <div
            key={`a-${s.i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.px}px`,
              height: `${s.px}px`,
              boxShadow: `0 0 ${s.px * 1.6}px rgba(255,255,255,0.4)`,
              transform: 'translate(-50%, -50%)',
              animation: reduced
                ? 'none'
                : `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}

      {/* Each constellation: its own drifting layer (stars + lines
          together). In LITE mode we drop the drifting layer entirely
          — constellations themselves are decorative noise compared to
          the gradient + ambient stars. */}
      {!reduced &&
        CONSTELLATIONS.map((cn, ci) => (
          <ConstellationLayer key={cn.name} cn={cn} index={ci} />
        ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.65) 100%)',
        }}
      />
    </div>
  );
});

GalaxyAboutBackground.displayName = 'GalaxyAboutBackground';
