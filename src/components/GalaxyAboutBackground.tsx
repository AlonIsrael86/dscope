import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * GalaxyAboutBackground
 *
 * Dedicated background for /about. Per Katia:
 *   - Real, named constellations instead of a random starfield
 *     ("на фоні не тільки рандомні зірки а справжні сузір'я відомі")
 *   - Minimalist galaxy look
 *   - Color shifts as the visitor scrolls
 *
 * Layers (back → front):
 *   - Scroll-driven primary gradient (3 cosmic-palette stops only)
 *   - Single soft galaxy core blob, its color also follows scroll
 *   - SVG overlay drawing 5 well-known constellations: Ursa Major
 *     (Big Dipper), Orion, Cassiopeia, Lyra, Cygnus (Northern Cross).
 *     Each is its own glowing star cluster with the actual asterism
 *     lines between them, plus a small label that fades in on hover.
 *   - A sparse ambient star sprinkle so the field isn't empty between
 *     constellations (15 dots, twinkle only, no drift)
 *   - Subtle vignette for foreground readability
 *
 * All colors stay in the cosmic palette: indigo / violet / cyan /
 * emerald / white. No off-palette warm tones.
 */

type Star = { x: number; y: number; mag?: number }; // x,y in viewport %, mag = magnitude (radius multiplier)
type Constellation = {
  name: string;
  labelX: number; // % position for label
  labelY: number;
  stars: Star[];
  edges: [number, number][];
};

const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Ursa Major',
    labelX: 14,
    labelY: 24,
    stars: [
      { x: 6, y: 18 },         // Alkaid (handle tip)
      { x: 9, y: 16 },         // Mizar
      { x: 12.5, y: 14 },      // Alioth
      { x: 16, y: 14, mag: 1.2 }, // Megrez (bowl top-left)
      { x: 17, y: 19 },        // Phecda (bowl bottom-left)
      { x: 22, y: 20 },        // Merak (bowl bottom-right)
      { x: 22, y: 13, mag: 1.4 }, // Dubhe (bowl top-right, brighter)
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    name: 'Orion',
    labelX: 53,
    labelY: 80,
    stars: [
      { x: 47, y: 58, mag: 1.6 }, // Betelgeuse (shoulder, brightish)
      { x: 60, y: 57 },           // Bellatrix (shoulder)
      { x: 52, y: 65 },           // Alnitak (belt left)
      { x: 55, y: 66 },           // Alnilam (belt center)
      { x: 58, y: 67 },           // Mintaka (belt right)
      { x: 48, y: 76 },           // Saiph (foot)
      { x: 62, y: 77, mag: 1.7 }, // Rigel (foot, brightest)
      { x: 55, y: 71 },           // Sword middle
    ],
    edges: [
      [0, 1], [0, 2], [1, 4],
      [2, 3], [3, 4], [2, 5],
      [4, 6], [3, 7],
    ],
  },
  {
    name: 'Cassiopeia',
    labelX: 86,
    labelY: 24,
    stars: [
      { x: 78, y: 12 },
      { x: 82, y: 17 },
      { x: 86, y: 13 },
      { x: 90, y: 19 },
      { x: 94, y: 14 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: 'Lyra',
    labelX: 77,
    labelY: 56,
    stars: [
      { x: 73, y: 44, mag: 1.7 }, // Vega
      { x: 78, y: 47 },
      { x: 76, y: 53 },
      { x: 72, y: 50 },
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
  },
  {
    name: 'Cygnus',
    labelX: 36,
    labelY: 35,
    stars: [
      { x: 32, y: 32 },  // 0 top  — Deneb
      { x: 33, y: 40 },  // 1
      { x: 35, y: 47 },  // 2 center (Sadr)
      { x: 27, y: 47 },  // 3 left arm
      { x: 42, y: 47 },  // 4 right arm
      { x: 39, y: 56 },  // 5 bottom — Albireo
    ],
    edges: [[0, 1], [1, 2], [2, 3], [2, 4], [2, 5]],
  },
];

// Sparse ambient stars between constellations (twinkle only, no drift)
const AMBIENT_STARS = [
  { x: 4, y: 65, r: 0.9 }, { x: 12, y: 78, r: 1.1 },
  { x: 24, y: 36, r: 0.7 }, { x: 39, y: 12, r: 1.0 },
  { x: 44, y: 22, r: 0.8 }, { x: 50, y: 35, r: 1.1 },
  { x: 64, y: 30, r: 0.9 }, { x: 67, y: 12, r: 0.7 },
  { x: 70, y: 70, r: 1.0 }, { x: 78, y: 80, r: 0.8 },
  { x: 88, y: 56, r: 1.0 }, { x: 93, y: 38, r: 0.7 },
  { x: 95, y: 70, r: 0.9 }, { x: 19, y: 56, r: 0.7 },
  { x: 52, y: 18, r: 0.9 },
];

export const GalaxyAboutBackground = React.memo(() => {
  const { scrollYProgress } = useScroll();

  // In-palette scroll color stops
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

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
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

      {/* Constellations + ambient stars in one full-viewport SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Ambient sprinkle — twinkle only */}
        {AMBIENT_STARS.map((s, i) => (
          <circle key={`a-${i}`} cx={s.x} cy={s.y} r={s.r / 8} fill="white" opacity={0.55}>
            <animate
              attributeName="opacity"
              values="0.25;0.9;0.25"
              dur={`${3 + (i % 4)}s`}
              begin={`${(i * 0.37) % 4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Constellations */}
        {CONSTELLATIONS.map((cn, ci) => (
          <g key={cn.name}>
            {/* Asterism lines */}
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
                  stroke="rgba(165,180,252,0.45)"
                  strokeWidth="0.13"
                  strokeLinecap="round"
                  strokeDasharray="0.6 0.5"
                />
              );
            })}
            {/* Constellation stars (slightly brighter than ambient, twinkle) */}
            {cn.stars.map((s, si) => {
              const r = ((s.mag ?? 1) * 0.22);
              const haloR = r * 4;
              return (
                <g key={`${cn.name}-s-${si}`}>
                  {/* Soft halo */}
                  <circle cx={s.x} cy={s.y} r={haloR} fill="rgba(199,210,254,0.35)">
                    <animate
                      attributeName="opacity"
                      values="0.18;0.5;0.18"
                      dur={`${4 + (si % 3)}s`}
                      begin={`${(ci * 0.4 + si * 0.2) % 5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Core star */}
                  <circle cx={s.x} cy={s.y} r={r} fill="white">
                    <animate
                      attributeName="opacity"
                      values="0.7;1;0.7"
                      dur={`${2.5 + (si % 3)}s`}
                      begin={`${(ci * 0.3 + si * 0.15) % 4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
            {/* Constellation name (subtle) */}
            <text
              x={cn.labelX}
              y={cn.labelY}
              textAnchor="middle"
              fontSize="1.2"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.05"
              fill="rgba(196,181,253,0.55)"
              style={{ textTransform: 'uppercase' }}
            >
              {cn.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Subtle vignette */}
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
