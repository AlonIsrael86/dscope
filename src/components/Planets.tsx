import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANETS_DATA } from '../data/planetsConstants';

/**
 * RealisticPlanet — pure-SVG rewrite.
 *
 * Vector circles always anti-alias cleanly, so the silhouette is
 * perfectly round (no "torn" edges from stacked div masks + inset
 * shadows that the previous version had).
 *
 * Each planet is built from four SVG layers:
 *   1. Atmosphere halo (radial gradient ring around the sphere)
 *   2. Sphere body with off-center radial gradient (lit side bright,
 *      far side dark) — produces the 3D illumination
 *   3. Surface micro-noise via feTurbulence filter, masked to the sphere
 *   4. A soft specular highlight on the lit side (small blurred ellipse)
 *
 * Saturn rings + Jupiter moons are SVG too (Saturn ring rendered with
 * a clipped front/back arc so the planet sits inside the ring properly).
 */

type Palette = {
  highlight: string;
  light: string;
  base: string;
  dark: string;
  shadow: string;
  atmosphere: string;
  ringOuter?: string;
  ringInner?: string;
};

const PALETTES: Record<string, Palette> = {
  mercury: { highlight: '#cfc6bb', light: '#a89a8a', base: '#7d7268', dark: '#3a342e', shadow: '#15120f', atmosphere: '#a89a8a' },
  venus:   { highlight: '#fff3c4', light: '#f5d28a', base: '#e4a755', dark: '#7e5520', shadow: '#3a2811', atmosphere: '#fde68a' },
  earth:   { highlight: '#bee5ff', light: '#5ab1ff', base: '#2563eb', dark: '#1e3a8a', shadow: '#0b1838', atmosphere: '#7dd3fc' },
  mars:    { highlight: '#ffb892', light: '#f47546', base: '#c64a1f', dark: '#651e0c', shadow: '#220903', atmosphere: '#fb923c' },
  jupiter: { highlight: '#fbe4b2', light: '#e6b777', base: '#ca8a4b', dark: '#5e3c1c', shadow: '#26170a', atmosphere: '#fbbf24' },
  saturn:  { highlight: '#fff2b8', light: '#f0d28d', base: '#d4a85e', dark: '#624925', shadow: '#2b1f10', atmosphere: '#fde68a', ringOuter: '#fde68a', ringInner: '#d97706' },
  uranus:  { highlight: '#dffeff', light: '#a4f0fa', base: '#67e8f9', dark: '#0e7490', shadow: '#063545', atmosphere: '#67e8f9' },
  neptune: { highlight: '#cde0ff', light: '#7aa9ff', base: '#3b6ed8', dark: '#1e3a8a', shadow: '#0b1838', atmosphere: '#60a5fa' },
};

const DEFAULT_PALETTE: Palette = { highlight: '#dddddd', light: '#aaaaaa', base: '#888888', dark: '#444444', shadow: '#1f1f1f', atmosphere: '#aaaaaa' };

const seedFromId = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h;
};

export const RealisticPlanet = ({
  planet, className = '', isHoverable = true,
}: {
  planet: typeof PLANETS_DATA[0]; className?: string; isHoverable?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const p = PALETTES[planet.id] ?? DEFAULT_PALETTE;
  const seed = seedFromId(planet.id);

  // Unique ids so multiple planets render side-by-side without defs collisions
  const uid = `pl-${planet.id}-${seed}`;
  const idBody = `${uid}-body`;
  const idHalo = `${uid}-halo`;
  const idNoise = `${uid}-noise`;
  const idClip = `${uid}-clip`;
  const idSpec = `${uid}-spec`;
  const idRingGrad = `${uid}-ring`;

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full cursor-pointer group ${planet.sizeClass} ${className}`}
      onMouseEnter={() => isHoverable && setIsHovered(true)}
      onMouseLeave={() => isHoverable && setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 10 }}
      whileHover={{ scale: isHoverable ? 2 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Tooltip & Telescopic Lens on hover */}
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

      {/* Jupiter moons orbiting outside the SVG (kept as separate divs to keep them on top, in motion) */}
      {planet.hasMoons && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#fcd34d] shadow-[0_0_5px_rgba(252,211,77,0.8)]" />
          <div className="absolute top-[80%] left-[30%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f3f4f6]" />
          <div className="absolute top-[30%] right-[15%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#a8a29e]" />
          <div className="absolute bottom-[20%] right-[30%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#57534e]" />
        </motion.div>
      )}

      {/* Grounding shadow beneath */}
      <div className="absolute -bottom-[12%] left-[18%] right-[18%] h-[14%] rounded-[100%] bg-black/55 blur-[6px] pointer-events-none z-0 mix-blend-multiply" />

      {/* The planet itself — pure SVG */}
      <svg
        viewBox="0 0 200 200"
        className="relative w-full h-full overflow-visible z-10"
        aria-hidden="true"
      >
        <defs>
          {/* Sphere body — light from upper-left (offset gradient center) */}
          <radialGradient id={idBody} cx="32%" cy="30%" r="78%">
            <stop offset="0%"  stopColor={p.highlight} />
            <stop offset="25%" stopColor={p.light} />
            <stop offset="55%" stopColor={p.base} />
            <stop offset="82%" stopColor={p.dark} />
            <stop offset="100%" stopColor={p.shadow} />
          </radialGradient>

          {/* Atmospheric halo (soft ring just outside the body) */}
          <radialGradient id={idHalo} cx="50%" cy="50%" r="50%">
            <stop offset="48%" stopColor="transparent" />
            <stop offset="52%" stopColor={p.atmosphere} stopOpacity="0.45" />
            <stop offset="62%" stopColor={p.atmosphere} stopOpacity="0.12" />
            <stop offset="80%" stopColor="transparent" />
          </radialGradient>

          {/* Saturn ring gradient (subtle hue band) */}
          {planet.hasRings && (
            <linearGradient id={idRingGrad} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%"  stopColor={p.ringOuter} stopOpacity="0" />
              <stop offset="20%" stopColor={p.ringOuter} stopOpacity="0.9" />
              <stop offset="50%" stopColor={p.ringInner} stopOpacity="1" />
              <stop offset="80%" stopColor={p.ringOuter} stopOpacity="0.9" />
              <stop offset="100%" stopColor={p.ringOuter} stopOpacity="0" />
            </linearGradient>
          )}

          {/* Surface micro-noise — masked to the sphere by clipPath */}
          <filter id={idNoise} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency={planet.id === 'jupiter' || planet.id === 'saturn' ? '0.012 0.6' : '0.5'} numOctaves="2" seed={seed} />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          </filter>

          {/* Soft specular highlight — small blurred ellipse on the lit side */}
          <filter id={idSpec} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>

          {/* Clip everything noise/specular paints to the sphere */}
          <clipPath id={idClip}>
            <circle cx="100" cy="100" r="86" />
          </clipPath>
        </defs>

        {/* Saturn — back half of the ring (drawn BEFORE the body so the
            body covers the far side, giving real depth) */}
        {planet.hasRings && (
          <g transform="translate(100 100) rotate(-18)">
            <ellipse rx="120" ry="22" fill="none" stroke={`url(#${idRingGrad})`} strokeWidth="6" />
            <ellipse rx="106" ry="19" fill="none" stroke={p.ringInner} strokeOpacity="0.5" strokeWidth="2" />
          </g>
        )}

        {/* Atmospheric halo (outside the body) */}
        <circle cx="100" cy="100" r="95" fill={`url(#${idHalo})`} />

        {/* Sphere body */}
        <circle cx="100" cy="100" r="86" fill={`url(#${idBody})`} />

        {/* Surface texture noise, clipped to the body */}
        <g clipPath={`url(#${idClip})`}>
          <rect x="14" y="14" width="172" height="172" filter={`url(#${idNoise})`} />
          {/* Mars polar caps */}
          {planet.id === 'mars' && (
            <>
              <ellipse cx="100" cy="22" rx="22" ry="9" fill="white" opacity="0.5" />
              <ellipse cx="100" cy="178" rx="20" ry="8" fill="white" opacity="0.35" />
            </>
          )}
          {/* Soft specular highlight on the lit side */}
          <g filter={`url(#${idSpec})`}>
            <ellipse cx="72" cy="62" rx="22" ry="14" fill="white" opacity="0.35" />
            <ellipse cx="64" cy="56" rx="8" ry="5" fill="white" opacity="0.55" />
          </g>
        </g>

        {/* Saturn — front half of the ring (drawn AFTER the body, clipped
            to the bottom half so it appears in front of the planet's
            lower silhouette) */}
        {planet.hasRings && (
          <g transform="translate(100 100) rotate(-18)" clipPath="inset(50% 0 0 0)">
            <ellipse rx="120" ry="22" fill="none" stroke={`url(#${idRingGrad})`} strokeWidth="6" />
            <ellipse rx="106" ry="19" fill="none" stroke={p.ringInner} strokeOpacity="0.9" strokeWidth="2" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
