import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANETS_DATA } from '../data/planetsConstants';

/**
 * RealisticPlanet — cinematic cosmic re-do.
 *
 * Per Katia: planets should fit the site's deep-space style — premium,
 * ethereal, slightly mysterious — not bright cartoon orbs.
 *
 * Each planet is one SVG composed of:
 *   1. A wide atmospheric halo (richer, in the planet's atmosphere
 *      colour, fading out gracefully)
 *   2. The sphere body with a multi-stop off-centre radial gradient
 *      that combines (a) night-side darkness and (b) a soft warm
 *      terminator near the lit limb — gives a real photographic
 *      "lit from one side" feel
 *   3. Surface micro-detail via a heavily-blurred turbulence filter,
 *      clipped to the sphere (subtle, never grainy)
 *   4. A soft directional highlight (faint, no harsh white spot)
 *   5. Optional thin ring system (Saturn) drawn in two halves so the
 *      planet sits IN the ring with real depth
 *
 * Palettes are tuned to be in-palette with the cosmic site: muted,
 * desaturated, with hints of cyan/violet/amber rather than pure
 * highlighter colours.
 */

type Palette = {
  /** Brightest sub-solar point of the sphere */
  hot: string;
  /** Lit side mid-tone */
  light: string;
  /** Sphere base hue */
  base: string;
  /** Terminator (cooler, slightly desaturated) */
  shade: string;
  /** Night side */
  night: string;
  /** Atmospheric halo colour */
  halo: string;
  /** Saturn rings */
  ringOuter?: string;
  ringInner?: string;
};

const PALETTES: Record<string, Palette> = {
  mercury: { hot: '#e5dfd2', light: '#a89e8d', base: '#6b6359', shade: '#332e29', night: '#0e0c0a', halo: '#7c7466' },
  venus:   { hot: '#fff6d8', light: '#f0d199', base: '#c69a5d', shade: '#5a4225', night: '#180e06', halo: '#e7c89a' },
  earth:   { hot: '#d4ecff', light: '#7aaedb', base: '#3a6f9e', shade: '#1d3a5e', night: '#06101e', halo: '#67a9dc' },
  mars:    { hot: '#f4c9a9', light: '#d4895c', base: '#9b502c', shade: '#4e2210', night: '#180805', halo: '#c66a3e' },
  jupiter: { hot: '#f3dfb6', light: '#cba578', base: '#946840', shade: '#3f2814', night: '#15090a', halo: '#c79c70' },
  saturn:  { hot: '#fbeac0', light: '#deb98a', base: '#a6855b', shade: '#4b3a25', night: '#180f08', halo: '#d6b48a', ringOuter: '#d8c08a', ringInner: '#8a6a3f' },
  uranus:  { hot: '#dff5f8', light: '#8ec8d4', base: '#4a8e9d', shade: '#1f4753', night: '#061319', halo: '#7fc4d2' },
  neptune: { hot: '#c7d8f2', light: '#6f8fd5', base: '#3a5298', shade: '#1a274e', night: '#070b1b', halo: '#5c7fcc' },
};

const DEFAULT_PALETTE: Palette = { hot: '#d5d5d5', light: '#9c9c9c', base: '#666666', shade: '#2e2e2e', night: '#0a0a0a', halo: '#888888' };

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

  const uid = `pl-${planet.id}-${seed}`;
  const idBody = `${uid}-body`;
  const idHaloIn = `${uid}-halo-in`;
  const idHaloOut = `${uid}-halo-out`;
  const idNoise = `${uid}-noise`;
  const idClip = `${uid}-clip`;
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
      {/* Tooltip & telescopic ring on hover */}
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

      {/* Jupiter moons orbiting */}
      {planet.hasMoons && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-[260%] h-[260%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#dcd0b3] shadow-[0_0_6px_rgba(220,208,179,0.7)]" />
          <div className="absolute top-[80%] left-[30%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#cfd6e0]" />
          <div className="absolute top-[30%] right-[15%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#9aa0aa]" />
          <div className="absolute bottom-[20%] right-[30%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#5e5e64]" />
        </motion.div>
      )}

      {/* Grounding shadow */}
      <div className="absolute -bottom-[12%] left-[20%] right-[20%] h-[12%] rounded-[100%] bg-black/50 blur-[8px] pointer-events-none z-0 mix-blend-multiply" />

      <svg
        viewBox="0 0 200 200"
        className="relative w-full h-full overflow-visible z-10"
        aria-hidden="true"
      >
        <defs>
          {/* Sphere body — soft cinematic gradient. Light from upper-left,
              shading down to night side. */}
          <radialGradient id={idBody} cx="30%" cy="28%" r="82%">
            <stop offset="0%"   stopColor={p.hot} />
            <stop offset="18%"  stopColor={p.light} />
            <stop offset="42%"  stopColor={p.base} />
            <stop offset="70%"  stopColor={p.shade} />
            <stop offset="90%"  stopColor={p.night} />
            <stop offset="100%" stopColor={p.night} />
          </radialGradient>

          {/* Inner atmospheric ring — tight band just outside the body */}
          <radialGradient id={idHaloIn} cx="50%" cy="50%" r="50%">
            <stop offset="46%" stopColor="transparent" />
            <stop offset="49%" stopColor={p.halo} stopOpacity="0.55" />
            <stop offset="55%" stopColor={p.halo} stopOpacity="0.18" />
            <stop offset="70%" stopColor="transparent" />
          </radialGradient>

          {/* Outer atmospheric glow — wide, soft */}
          <radialGradient id={idHaloOut} cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="transparent" />
            <stop offset="55%" stopColor={p.halo} stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Saturn ring gradient */}
          {planet.hasRings && (
            <linearGradient id={idRingGrad} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%"   stopColor={p.ringOuter} stopOpacity="0" />
              <stop offset="18%"  stopColor={p.ringOuter} stopOpacity="0.7" />
              <stop offset="50%"  stopColor={p.ringInner} stopOpacity="0.95" />
              <stop offset="82%"  stopColor={p.ringOuter} stopOpacity="0.7" />
              <stop offset="100%" stopColor={p.ringOuter} stopOpacity="0" />
            </linearGradient>
          )}

          {/* Surface micro-noise — subtle, soft blur so it never reads as grain.
              Gas giants get horizontally stretched frequency for banding. */}
          <filter id={idNoise} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency={planet.id === 'jupiter' || planet.id === 'saturn' ? '0.014 0.55' : '0.6'} numOctaves="2" seed={seed} />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.10 0" />
            <feGaussianBlur stdDeviation="0.4" />
          </filter>

          <clipPath id={idClip}>
            <circle cx="100" cy="100" r="84" />
          </clipPath>
        </defs>

        {/* Saturn — back half of the ring (behind body) */}
        {planet.hasRings && (
          <g transform="translate(100 100) rotate(-16)">
            <ellipse rx="124" ry="20" fill="none" stroke={`url(#${idRingGrad})`} strokeWidth="4" />
            <ellipse rx="110" ry="17" fill="none" stroke={p.ringInner} strokeOpacity="0.35" strokeWidth="1.2" />
          </g>
        )}

        {/* Wide outer atmospheric glow */}
        <circle cx="100" cy="100" r="100" fill={`url(#${idHaloOut})`} />

        {/* Tight inner atmospheric ring */}
        <circle cx="100" cy="100" r="92" fill={`url(#${idHaloIn})`} />

        {/* Sphere body */}
        <circle cx="100" cy="100" r="84" fill={`url(#${idBody})`} />

        {/* Subtle surface detail clipped to the sphere */}
        <g clipPath={`url(#${idClip})`}>
          <rect x="16" y="16" width="168" height="168" filter={`url(#${idNoise})`} opacity="0.75" />
          {/* Mars polar caps — softer, less white */}
          {planet.id === 'mars' && (
            <>
              <ellipse cx="100" cy="22" rx="18" ry="7" fill="#f5ece0" opacity="0.4" />
              <ellipse cx="100" cy="178" rx="16" ry="6" fill="#f5ece0" opacity="0.28" />
            </>
          )}
          {/* Soft cosmic highlight — gentle radial brightening only on the
              lit upper-left, no hard specular blob */}
          <ellipse cx="72" cy="60" rx="34" ry="22" fill="white" opacity="0.10" />
        </g>

        {/* Saturn — front half of the ring (over body, lower half only) */}
        {planet.hasRings && (
          <g transform="translate(100 100) rotate(-16)" clipPath="inset(50% 0 0 0)">
            <ellipse rx="124" ry="20" fill="none" stroke={`url(#${idRingGrad})`} strokeWidth="4" />
            <ellipse rx="110" ry="17" fill="none" stroke={p.ringInner} strokeOpacity="0.85" strokeWidth="1.2" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
