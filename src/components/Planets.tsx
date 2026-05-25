import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANETS_DATA } from '../data/planetsConstants';

/**
 * RealisticPlanet — minimalist cosmic style.
 *
 * Per Katia: planets shouldn't grab the foreground. Drop the contour and
 * the photo-realistic feature layers entirely. Each planet is now a quiet
 * dark orb — a soft radial gradient with a single hint of color and a
 * narrow atmospheric halo. Distinctive ring planets (Saturn, Uranus) keep
 * their ring as the one identifying feature.
 *
 * Result: low brightness, low contrast, background-art quality — feels
 * cosmic and at home on a dark page without competing with the content.
 */

type Palette = {
  tint: string;      // mid-tone hue of the planet (very desaturated)
  lit: string;       // slightly lighter lit-edge tone
  dark: string;      // deep shade
  void_: string;     // night
  halo: string;      // very subtle atmospheric ring
  ringOuter?: string;
  ringInner?: string;
};

const PALETTES: Record<string, Palette> = {
  mercury: { tint: '#564a3f', lit: '#7a6852', dark: '#1f1812', void_: '#08060a', halo: '#695a48' },
  venus:   { tint: '#7a5734', lit: '#a87a48', dark: '#231408', void_: '#0a0508', halo: '#946338' },
  earth:   { tint: '#2c5680', lit: '#3f78ad', dark: '#0a1a32', void_: '#04081a', halo: '#5587b8' },
  mars:    { tint: '#793a23', lit: '#a55333', dark: '#1f0905', void_: '#0a050a', halo: '#9d4d2d' },
  jupiter: { tint: '#6e553a', lit: '#9a7651', dark: '#1f1610', void_: '#0a0708', halo: '#8a6a48' },
  saturn:  { tint: '#7d6843', lit: '#a48758', dark: '#1f180e', void_: '#0a0708', halo: '#a48758', ringOuter: '#8b754a', ringInner: '#5e4a2c' },
  uranus:  { tint: '#3f7d8a', lit: '#5fa1b0', dark: '#0c1f24', void_: '#040a0e', halo: '#5fa1b0', ringOuter: '#7faab4', ringInner: '#3a5f6a' },
  neptune: { tint: '#2e4783', lit: '#4566ad', dark: '#0a1230', void_: '#040818', halo: '#456fb8' },
};

const DEFAULT_PALETTE: Palette = { tint: '#4a4a4a', lit: '#6a6a6a', dark: '#1a1a1a', void_: '#0a0a0a', halo: '#666' };

const seedFromId = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h;
};

/* ---- Generic ring renderer (Saturn + Uranus) ---- */
const PlanetRings = ({
  gradId, side, rings, rotation,
}: {
  gradId: string; side: 'back' | 'front';
  rings: [number, number, number][]; // [rx, ry, baseOpacity]
  rotation: number;
}) => {
  const sweep = side === 'front' ? 1 : 0;
  const fade = side === 'front' ? 1 : 0.55;
  return (
    <g transform={`translate(100 100) rotate(${rotation})`}>
      {rings.map(([rx, ry, o], i) => (
        <path
          key={`${side}-${i}`}
          d={`M ${-rx} 0 A ${rx} ${ry} 0 0 ${sweep} ${rx} 0`}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeOpacity={o * fade * 0.6}
          strokeWidth={i === Math.floor(rings.length / 2) ? 0.7 : 1.1}
          strokeLinecap="butt"
        />
      ))}
    </g>
  );
};

export const RealisticPlanet = ({
  planet, className = '', isHoverable = true,
}: {
  planet: typeof PLANETS_DATA[0]; className?: string; isHoverable?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const p = PALETTES[planet.id] ?? DEFAULT_PALETTE;
  const seed = seedFromId(planet.id);

  const uid = `pl-${planet.id}-${seed}`;
  const idBody = `${uid}-body`;
  const idHalo = `${uid}-halo`;
  const idRingGrad = `${uid}-ring`;

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full cursor-pointer group ${planet.sizeClass} ${className}`}
      onMouseEnter={() => isHoverable && setIsHovered(true)}
      onMouseLeave={() => isHoverable && setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 10 }}
      whileHover={{ scale: isHoverable ? 2 : 1, opacity: 1 }}
      animate={{ opacity: 0.62 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Hover tooltip + telescopic ring */}
      {isHoverable && isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -top-20 bg-black/80 border border-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-center pointer-events-none whitespace-nowrap drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] z-50"
          >
            <div className="text-white font-display font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              {planet.name}
            </div>
            <div className="text-blue-400 font-mono text-[10px] tracking-wider">{planet.coordinates}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-[-50%] border border-blue-500/30 rounded-full pointer-events-none z-40 flex items-center justify-center"
          >
            <div className="absolute top-0 bottom-0 w-[1px] bg-blue-500/30" />
            <div className="absolute left-0 right-0 h-[1px] bg-blue-500/30" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-blue-400/5 to-white/10 mix-blend-screen" />
          </motion.div>
        </>
      )}

      {/* Jupiter moons — quiet dim dots */}
      {planet.hasMoons && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-[260%] h-[260%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-[20%] left-[20%] w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/40" />
          <div className="absolute top-[80%] left-[30%] w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/30" />
          <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/35" />
          <div className="absolute bottom-[20%] right-[30%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/25" />
        </motion.div>
      )}

      <svg viewBox="0 0 200 200" className="relative w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          {/* Minimalist body — dark center fades to a soft single tint on the
              lit side, slipping back into the night-sky black at the rim. */}
          <radialGradient id={idBody} cx="38%" cy="38%" r="72%">
            <stop offset="0%"   stopColor={p.lit}   stopOpacity="0.9" />
            <stop offset="35%"  stopColor={p.tint}  stopOpacity="0.85" />
            <stop offset="78%"  stopColor={p.dark}  stopOpacity="0.92" />
            <stop offset="100%" stopColor={p.void_} stopOpacity="0.98" />
          </radialGradient>

          {/* Outside-the-body halo — narrow + low opacity, no contour */}
          <radialGradient id={idHalo} cx="50%" cy="50%" r="50%">
            <stop offset="86%" stopColor="transparent" />
            <stop offset="91%" stopColor={p.halo} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Ring gradient — very muted */}
          {(planet.hasRings || planet.id === 'uranus') && (
            <linearGradient id={idRingGrad} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%"   stopColor={p.ringOuter} stopOpacity="0" />
              <stop offset="25%"  stopColor={p.ringOuter} stopOpacity="0.6" />
              <stop offset="50%"  stopColor={p.ringInner} stopOpacity="0.85" />
              <stop offset="75%"  stopColor={p.ringOuter} stopOpacity="0.6" />
              <stop offset="100%" stopColor={p.ringOuter} stopOpacity="0" />
            </linearGradient>
          )}
        </defs>

        {/* Saturn ring (back half) */}
        {planet.hasRings && (
          <PlanetRings
            gradId={idRingGrad}
            side="back"
            rings={[[128, 21, 0.7], [120, 19, 0.85], [114, 18, 0.4], [108, 17, 0.85], [102, 15, 0.7]]}
            rotation={-18}
          />
        )}
        {/* Uranus ring (back half) */}
        {planet.id === 'uranus' && (
          <PlanetRings
            gradId={idRingGrad}
            side="back"
            rings={[[110, 21, 0.5], [104, 19, 0.4]]}
            rotation={-78}
          />
        )}

        {/* Soft outside-body halo */}
        <circle cx="100" cy="100" r="96" fill={`url(#${idHalo})`} />

        {/* The planet itself — single gradient, no surface clutter */}
        <circle cx="100" cy="100" r="84" fill={`url(#${idBody})`} />

        {/* Saturn ring (front half) */}
        {planet.hasRings && (
          <PlanetRings
            gradId={idRingGrad}
            side="front"
            rings={[[128, 21, 0.7], [120, 19, 0.85], [114, 18, 0.4], [108, 17, 0.85], [102, 15, 0.7]]}
            rotation={-18}
          />
        )}
        {/* Uranus ring (front half) */}
        {planet.id === 'uranus' && (
          <PlanetRings
            gradId={idRingGrad}
            side="front"
            rings={[[110, 21, 0.65], [104, 19, 0.55]]}
            rotation={-78}
          />
        )}
      </svg>
    </motion.div>
  );
};
