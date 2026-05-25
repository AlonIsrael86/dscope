import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * GalaxyAboutBackground
 *
 * /about background. Per Katia:
 *   - Many named constellations spread across the WHOLE viewport
 *     (so the sky feels full, not three lonely clusters).
 *   - Stars are simple bright dots in slightly varying sizes —
 *     no big halo bubbles, no labels.
 *   - Every star twinkles on its own schedule (staggered, not synced).
 *   - Color of the gradient gently shifts on scroll, all in palette.
 */

type Star = { x: number; y: number; mag?: number };
type Constellation = {
  name: string;
  stars: Star[];
  edges: [number, number][];
};

// Constellation positions are evocative, not astronomically precise.
// Coords in viewport % (viewBox 0 0 100 100). Total ~95 stars across
// 14 well-known constellations, distributed across the whole canvas.
const CONSTELLATIONS: Constellation[] = [
  // ── TOP BAND ────────────────────────────────────────────────────
  {
    // Ursa Major — Big Dipper, upper-left
    name: 'Ursa Major',
    stars: [
      { x: 4, y: 12 }, { x: 7.5, y: 9 }, { x: 11, y: 7 },
      { x: 14.5, y: 7, mag: 1.2 }, { x: 16, y: 11 },
      { x: 20, y: 13 }, { x: 20, y: 7, mag: 1.4 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  },
  {
    // Ursa Minor — Little Dipper, top-center-left
    name: 'Ursa Minor',
    stars: [
      { x: 28, y: 4, mag: 1.3 }, { x: 31, y: 6 }, { x: 33, y: 9 },
      { x: 36, y: 8 }, { x: 38, y: 11 }, { x: 41, y: 13 }, { x: 39, y: 16 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  },
  {
    // Cassiopeia — W, top-right
    name: 'Cassiopeia',
    stars: [
      { x: 76, y: 7 }, { x: 81, y: 12 }, { x: 85, y: 8 },
      { x: 90, y: 14 }, { x: 95, y: 9 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    // Cepheus — top-right-mid, house shape
    name: 'Cepheus',
    stars: [
      { x: 60, y: 4 }, { x: 64, y: 8 }, { x: 68, y: 5 },
      { x: 70, y: 12 }, { x: 62, y: 13 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0]],
  },

  // ── UPPER-MID BAND ──────────────────────────────────────────────
  {
    // Cygnus — Northern Cross, upper-mid-left
    name: 'Cygnus',
    stars: [
      { x: 9, y: 28 }, { x: 12, y: 33 }, { x: 14, y: 38 },
      { x: 8, y: 38 }, { x: 19, y: 38 }, { x: 17, y: 45 },
    ],
    edges: [[0,1],[1,2],[2,3],[2,4],[2,5]],
  },
  {
    // Lyra — Vega + parallelogram, upper-mid
    name: 'Lyra',
    stars: [
      { x: 32, y: 24, mag: 1.7 },
      { x: 36, y: 28 }, { x: 35, y: 33 }, { x: 31, y: 30 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0]],
  },
  {
    // Pegasus — Great Square, upper-mid-right
    name: 'Pegasus',
    stars: [
      { x: 53, y: 25 }, { x: 62, y: 24 }, { x: 63, y: 33 }, { x: 54, y: 34 },
      { x: 48, y: 22 }, { x: 45, y: 18 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[0,4],[4,5]],
  },
  {
    // Andromeda — chain, upper-right
    name: 'Andromeda',
    stars: [
      { x: 70, y: 24 }, { x: 76, y: 27 }, { x: 82, y: 30 },
      { x: 88, y: 33 }, { x: 93, y: 28 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4]],
  },

  // ── CENTER BAND ─────────────────────────────────────────────────
  {
    // Hercules — left-center
    name: 'Hercules',
    stars: [
      { x: 6, y: 50 }, { x: 11, y: 47 }, { x: 12, y: 53 },
      { x: 17, y: 52 }, { x: 14, y: 58 }, { x: 9, y: 60 },
    ],
    edges: [[0,1],[1,3],[3,4],[4,5],[5,0],[1,2],[2,4]],
  },
  {
    // Leo — center, sickle + triangle
    name: 'Leo',
    stars: [
      { x: 28, y: 48 }, { x: 32, y: 45 }, { x: 35, y: 50 },
      { x: 33, y: 55 }, { x: 40, y: 52 }, { x: 44, y: 57 },
      { x: 38, y: 60 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6],[6,3]],
  },
  {
    // Auriga — pentagon, center-right
    name: 'Auriga',
    stars: [
      { x: 56, y: 46 }, { x: 62, y: 44 }, { x: 65, y: 49 },
      { x: 61, y: 54 }, { x: 56, y: 52 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0]],
  },
  {
    // Boötes — kite, center-right
    name: 'Bootes',
    stars: [
      { x: 75, y: 46, mag: 1.5 }, // Arcturus
      { x: 80, y: 51 }, { x: 84, y: 55 }, { x: 81, y: 60 },
      { x: 77, y: 56 }, { x: 73, y: 52 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,5],[4,1]],
  },

  // ── LOWER-MID BAND ──────────────────────────────────────────────
  {
    // Orion — belt + shoulders + feet + sword, center-bottom
    name: 'Orion',
    stars: [
      { x: 32, y: 70, mag: 1.5 }, // Betelgeuse
      { x: 44, y: 69 },           // Bellatrix
      { x: 37, y: 75 },           // belt L
      { x: 39, y: 76 },           // belt M
      { x: 41, y: 77 },           // belt R
      { x: 33, y: 82 },           // Saiph
      { x: 46, y: 83, mag: 1.7 }, // Rigel
      { x: 39, y: 80 },           // sword
    ],
    edges: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[3,7]],
  },
  {
    // Taurus — V (face) + Aldebaran, mid-bottom
    name: 'Taurus',
    stars: [
      { x: 53, y: 67, mag: 1.4 }, // Aldebaran
      { x: 58, y: 64 }, { x: 60, y: 70 },
      { x: 64, y: 66 }, { x: 67, y: 73 },
    ],
    edges: [[0,1],[1,3],[3,4],[0,2],[2,4]],
  },
  {
    // Gemini — Castor + Pollux + bodies, mid-bottom-right
    name: 'Gemini',
    stars: [
      { x: 75, y: 67 }, { x: 79, y: 69 },
      { x: 82, y: 75 }, { x: 78, y: 78 },
      { x: 76, y: 73 },
      { x: 86, y: 71 }, { x: 89, y: 78 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,5],[5,6]],
  },

  // ── BOTTOM BAND ─────────────────────────────────────────────────
  {
    // Canis Major — Sirius + body, bottom-left
    name: 'Canis Major',
    stars: [
      { x: 8, y: 86, mag: 1.8 }, // Sirius
      { x: 12, y: 90 }, { x: 16, y: 87 },
      { x: 20, y: 92 }, { x: 14, y: 83 },
    ],
    edges: [[0,1],[1,2],[2,3],[2,4],[4,0]],
  },
  {
    // Scorpius — curve, bottom-center
    name: 'Scorpius',
    stars: [
      { x: 30, y: 88 }, { x: 35, y: 90 }, { x: 40, y: 88 },
      { x: 44, y: 92 }, { x: 49, y: 90 }, { x: 53, y: 87 },
      { x: 56, y: 91 }, { x: 60, y: 88, mag: 1.4 }, // Antares
    ],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]],
  },
  {
    // Sagittarius — teapot, bottom-right
    name: 'Sagittarius',
    stars: [
      { x: 68, y: 87 }, { x: 72, y: 90 }, { x: 76, y: 88 },
      { x: 80, y: 92 }, { x: 76, y: 85 }, { x: 84, y: 86 },
      { x: 88, y: 90 },
    ],
    edges: [[0,1],[1,2],[2,3],[3,5],[5,2],[4,0],[4,2],[5,6]],
  },
];

// Light ambient sprinkle so the gaps between constellations also feel alive
const AMBIENT_STARS = Array.from({ length: 70 }).map((_, i) => ({
  x: (i * 17.31 + 7) % 100,
  y: ((i * i * 0.83) + i * 11) % 100,
  r: 0.08 + ((i * 0.137) % 0.10),
}));

export const GalaxyAboutBackground = React.memo(() => {
  const { scrollYProgress } = useScroll();

  const colorTop = useTransform(scrollYProgress, [0, 0.5, 1], ['#1e1b4b', '#3b0764', '#0e1a3a']);
  const colorMid = useTransform(scrollYProgress, [0, 0.5, 1], ['#312e81', '#581c87', '#0c4a6e']);
  const colorBottom = useTransform(scrollYProgress, [0, 0.5, 1], ['#020617', '#0b021a', '#020617']);
  const coreColor = useTransform(scrollYProgress, [0, 0.5, 1], ['rgba(99,102,241,0.30)', 'rgba(168,85,247,0.30)', 'rgba(34,211,238,0.28)']);

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

  // Stable per-star twinkle parameters so it looks asynchronous but doesn't
  // jump on every React re-render.
  const constellationsRender = useMemo(() => {
    return CONSTELLATIONS.map((cn, ci) => {
      const stars = cn.stars.map((s, si) => {
        const baseR = (s.mag ?? 1) * 0.14;
        // Pseudo-random but deterministic stagger per star
        const seed = ci * 19 + si * 7;
        const dur = 2.4 + ((seed * 0.41) % 4.2);
        const delay = (seed * 0.27) % 5.5;
        return { ...s, r: baseR, dur, delay };
      });
      return { ...cn, stars };
    });
  }, []);

  const ambientRender = useMemo(() => {
    return AMBIENT_STARS.map((s, i) => ({
      ...s,
      dur: 2.2 + ((i * 0.61) % 4),
      delay: (i * 0.43) % 6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      <motion.div className="absolute inset-0" style={{ background: gradient }} />

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

      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Ambient sprinkle in the gaps */}
        {ambientRender.map((s, i) => (
          <circle key={`a-${i}`} cx={s.x} cy={s.y} r={s.r} fill="white" opacity="0.7">
            <animate
              attributeName="opacity"
              values="0.25;0.95;0.25"
              dur={`${s.dur}s`}
              begin={`${s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Constellations: dashed asterism lines + per-star twinkle */}
        {constellationsRender.map((cn) => (
          <g key={cn.name}>
            {cn.edges.map(([a, b], ei) => {
              const sa = cn.stars[a];
              const sb = cn.stars[b];
              return (
                <line
                  key={`${cn.name}-e-${ei}`}
                  x1={sa.x}
                  y1={sa.y}
                  x2={sb.x}
                  y2={sb.y}
                  stroke="rgba(165,180,252,0.35)"
                  strokeWidth="0.12"
                  strokeLinecap="round"
                  strokeDasharray="0.5 0.6"
                />
              );
            })}
            {cn.stars.map((s, si) => (
              <circle key={`${cn.name}-s-${si}`} cx={s.x} cy={s.y} r={s.r} fill="white">
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur={`${s.dur}s`}
                  begin={`${s.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))}
      </svg>

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
