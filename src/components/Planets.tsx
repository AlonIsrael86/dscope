import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANETS_DATA } from '../data/planetsConstants';

/**
 * RealisticPlanet — photo-style SVG planets with per-planet surface detail.
 *
 * Per Katia: match the reference NASA-style look (real-looking spheres
 * with recognisable features per planet) but stay in the site's cosmic
 * style — i.e. tighter halo than a real photo, slightly desaturated
 * palette, soft ambient cosmic glow rather than studio lighting.
 *
 * Each planet has its OWN surface composer (`renderSurface`) that draws
 * the things you actually see on a NASA photograph:
 *   Mercury  — scattered craters
 *   Venus    — thick rotating cloud swirls
 *   Earth    — continents (Africa/Eurasia/Americas hint) + rotating
 *              cloud band + blue limb glow
 *   Mars     — dark mare blots + bright polar caps
 *   Jupiter  — 5 alternating horizontal bands + Great Red Spot
 *   Saturn   — soft body bands + a multi-ring system with Cassini gap
 *              (5 concentric rings drawn in two halves for depth)
 *   Uranus   — pale cyan body with a faint vertical ring
 *   Neptune  — deep blue body with the Great Dark Spot + faint bands
 *
 * The sphere body itself is one off-centre radial gradient (5 stops) so
 * the lit hemisphere reads as real and the night side is properly dark.
 */

type Palette = {
  hot: string;       // sub-solar highlight
  light: string;     // lit mid-tone
  base: string;      // body hue
  shade: string;     // terminator
  night: string;     // night side
  halo: string;      // atmospheric ring colour
  ringOuter?: string;
  ringInner?: string;
};

const PALETTES: Record<string, Palette> = {
  mercury: { hot: '#e6dbc7', light: '#a89886', base: '#6e6253', shade: '#322a24', night: '#0d0b09', halo: '#7c6f5c' },
  venus:   { hot: '#fff1c4', light: '#f0c478', base: '#cf8945', shade: '#5a361a', night: '#1b0c05', halo: '#e2a665' },
  earth:   { hot: '#cfe7ff', light: '#5da3d8', base: '#1f5fa4', shade: '#0e2f5e', night: '#040c1d', halo: '#6cb4e4' },
  mars:    { hot: '#f0bea0', light: '#cb7547', base: '#9b4823', shade: '#491c0c', night: '#180603', halo: '#c66236' },
  jupiter: { hot: '#f6e2b8', light: '#d2a778', base: '#9a6c45', shade: '#42291a', night: '#150909', halo: '#cb9870' },
  saturn:  { hot: '#fbe7be', light: '#dfb887', base: '#a5825a', shade: '#4a3722', night: '#170e07', halo: '#d6b385', ringOuter: '#d7c193', ringInner: '#9d7b48' },
  uranus:  { hot: '#dff6fa', light: '#90cdda', base: '#4a9aa9', shade: '#1f4d5b', night: '#06141a', halo: '#7fc4d2' },
  neptune: { hot: '#bccff0', light: '#5d83cd', base: '#2c4990', shade: '#152149', night: '#060a1a', halo: '#5072c7' },
};

const DEFAULT_PALETTE: Palette = { hot: '#d5d5d5', light: '#9c9c9c', base: '#666', shade: '#2e2e2e', night: '#0a0a0a', halo: '#888' };

const seedFromId = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h;
};

/* ----------------- Per-planet surface detail composers ----------------- */
// All draw inside a 200x200 viewBox, clipped to a r=84 circle at (100,100).

const SurfaceMercury = () => (
  <g>
    {/* Crater patches — scattered darker discs */}
    <circle cx="58" cy="80" r="9"  fill="#3a3127" opacity="0.55" />
    <circle cx="90" cy="55" r="6"  fill="#28201a" opacity="0.6" />
    <circle cx="120" cy="78" r="11" fill="#2e2620" opacity="0.55" />
    <circle cx="78" cy="120" r="7"  fill="#2c241e" opacity="0.5" />
    <circle cx="135" cy="125" r="8"  fill="#251e18" opacity="0.55" />
    <circle cx="105" cy="100" r="5"  fill="#1e1814" opacity="0.45" />
    <circle cx="60" cy="135" r="6"  fill="#241d17" opacity="0.45" />
    {/* Highlights inside craters */}
    <circle cx="56" cy="78" r="3"  fill="#bdae93" opacity="0.5" />
    <circle cx="118" cy="76" r="4"  fill="#a89678" opacity="0.4" />
  </g>
);

const SurfaceVenus = ({ ringId }: { ringId: string }) => (
  <g>
    {/* Thick rotating cloud swirls */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 220, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }}>
      <ellipse cx="80" cy="70" rx="60" ry="9" fill="#fde7b6" opacity="0.35" />
      <ellipse cx="120" cy="95" rx="55" ry="7" fill="#f8d18a" opacity="0.45" />
      <ellipse cx="90" cy="120" rx="60" ry="10" fill="#fbe1a8" opacity="0.4" />
      <ellipse cx="115" cy="140" rx="50" ry="7" fill="#f4c47a" opacity="0.4" />
    </motion.g>
    <use href={`#${ringId}-spec`} />
  </g>
);

const SurfaceEarth = () => (
  <g>
    {/* Continent silhouettes — abstract hints, not literal maps */}
    <g fill="#3f7d3a" opacity="0.85">
      {/* Africa-ish */}
      <path d="M104 72 C 112 70 122 82 120 96 C 118 110 110 116 102 118 C 95 120 92 110 95 100 C 95 88 100 78 104 72 Z" />
      {/* Eurasia-ish */}
      <path d="M70 60 C 88 55 110 60 124 64 C 130 68 116 76 96 76 C 80 76 65 70 70 60 Z" />
      {/* Americas-ish */}
      <path d="M52 78 C 60 72 70 80 68 92 C 70 110 60 130 56 142 C 50 138 46 122 48 108 C 48 96 46 84 52 78 Z" />
      {/* Australia-ish */}
      <path d="M132 122 C 140 120 148 126 144 134 C 140 140 130 138 128 132 C 126 128 128 124 132 122 Z" />
    </g>
    {/* White cloud swirls (slowly rotating) */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 180, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }} opacity="0.55">
      <ellipse cx="78" cy="62" rx="32" ry="6" fill="#ffffff" />
      <ellipse cx="120" cy="92" rx="34" ry="5" fill="#ffffff" />
      <ellipse cx="90" cy="130" rx="40" ry="6" fill="#ffffff" />
    </motion.g>
  </g>
);

const SurfaceMars = () => (
  <g>
    {/* Dark mare patches */}
    <path d="M70 75 C 90 70 110 78 108 90 C 102 100 80 102 72 92 C 66 86 64 80 70 75 Z" fill="#562613" opacity="0.55" />
    <path d="M120 110 C 138 110 142 124 132 132 C 122 138 110 132 112 122 C 113 116 116 112 120 110 Z" fill="#4a200f" opacity="0.5" />
    <ellipse cx="85" cy="130" rx="22" ry="9" fill="#5a2a18" opacity="0.45" />
    {/* Polar caps */}
    <ellipse cx="100" cy="24" rx="22" ry="9" fill="#f5ece0" opacity="0.55" />
    <ellipse cx="100" cy="176" rx="18" ry="7" fill="#f5ece0" opacity="0.4" />
    {/* Highlights */}
    <ellipse cx="135" cy="80" rx="10" ry="5" fill="#f0a877" opacity="0.4" />
  </g>
);

const SurfaceJupiter = () => (
  <g>
    {/* 5 horizontal bands */}
    <rect x="16" y="48"  width="168" height="14" fill="#dab48a" opacity="0.5" />
    <rect x="16" y="66"  width="168" height="10" fill="#7e5530" opacity="0.55" />
    <rect x="16" y="82"  width="168" height="18" fill="#e8c690" opacity="0.45" />
    <rect x="16" y="104" width="168" height="12" fill="#6f4a28" opacity="0.55" />
    <rect x="16" y="120" width="168" height="14" fill="#d6a87a" opacity="0.45" />
    <rect x="16" y="140" width="168" height="10" fill="#7e5b35" opacity="0.5" />
    {/* Great Red Spot */}
    <ellipse cx="86" cy="112" rx="14" ry="7" fill="#8a3018" opacity="0.85" />
    <ellipse cx="86" cy="112" rx="9" ry="4" fill="#5c1a0a" opacity="0.7" />
    {/* Swirl details */}
    <ellipse cx="140" cy="92" rx="10" ry="3" fill="#fbe2b6" opacity="0.45" />
    <ellipse cx="60" cy="124" rx="8" ry="3" fill="#fbe2b6" opacity="0.4" />
  </g>
);

const SurfaceSaturn = () => (
  <g>
    {/* Soft horizontal bands (lighter than Jupiter) */}
    <rect x="16" y="60"  width="168" height="14" fill="#e6c896" opacity="0.35" />
    <rect x="16" y="88"  width="168" height="16" fill="#caa069" opacity="0.35" />
    <rect x="16" y="116" width="168" height="14" fill="#dfbc8a" opacity="0.3" />
    <rect x="16" y="140" width="168" height="10" fill="#a48050" opacity="0.4" />
  </g>
);

const SurfaceUranus = () => (
  <g>
    {/* Very subtle banding */}
    <ellipse cx="100" cy="100" rx="84" ry="12" fill="#bce6ee" opacity="0.18" />
    <ellipse cx="100" cy="100" rx="84" ry="28" fill="#bce6ee" opacity="0.10" />
  </g>
);

const SurfaceNeptune = () => (
  <g>
    {/* Faint horizontal bands */}
    <rect x="16" y="70"  width="168" height="14" fill="#7396dc" opacity="0.22" />
    <rect x="16" y="110" width="168" height="14" fill="#22376f" opacity="0.35" />
    {/* Great Dark Spot */}
    <ellipse cx="120" cy="92" rx="13" ry="7" fill="#0e1e4c" opacity="0.7" />
    <ellipse cx="120" cy="92" rx="6" ry="3" fill="#06112e" opacity="0.8" />
    {/* Wispy bright cloud */}
    <ellipse cx="80" cy="128" rx="22" ry="3" fill="#dbe6ff" opacity="0.45" />
  </g>
);

const renderSurface = (planetId: string, ringId: string) => {
  switch (planetId) {
    case 'mercury': return <SurfaceMercury />;
    case 'venus':   return <SurfaceVenus ringId={ringId} />;
    case 'earth':   return <SurfaceEarth />;
    case 'mars':    return <SurfaceMars />;
    case 'jupiter': return <SurfaceJupiter />;
    case 'saturn':  return <SurfaceSaturn />;
    case 'uranus':  return <SurfaceUranus />;
    case 'neptune': return <SurfaceNeptune />;
    default: return null;
  }
};

/* ----------------- Saturn ring system (5 concentric thin rings) ----------------- */
const SaturnRings = ({ p, gradId, side }: { p: Palette; gradId: string; side: 'back' | 'front' }) => {
  // (radius, ry, opacity) — Cassini gap simulated by spacing
  const rings: [number, number, number][] = [
    [128, 21, 0.95],
    [120, 19, 0.85],
    [114, 18, 0.55], // Cassini gap (dim)
    [108, 16, 0.95],
    [102, 15, 0.7],
  ];
  return (
    <g
      transform="translate(100 100) rotate(-18)"
      clipPath={side === 'front' ? 'inset(50% 0 0 0)' : undefined}
    >
      {rings.map(([rx, ry, o], i) => (
        <ellipse
          key={i}
          rx={rx}
          ry={ry}
          fill="none"
          stroke={i % 2 === 0 ? `url(#${gradId})` : (p.ringInner ?? '#9d7b48')}
          strokeOpacity={side === 'front' ? o : o * 0.55}
          strokeWidth={i === 2 ? 1 : 1.6}
        />
      ))}
    </g>
  );
};

/* ----------------- Component ----------------- */
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
  const idLimb = `${uid}-limb`;
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
      {/* Hover tooltip + targeting overlay */}
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

      {/* Jupiter moons */}
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

      {/* Uranus tipped ring */}
      {planet.id === 'uranus' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[170%] h-[10%] -rotate-[78deg] rounded-full border border-cyan-200/30 shadow-[0_0_10px_rgba(165,243,252,0.15)]" />
        </div>
      )}

      {/* Grounding shadow */}
      <div className="absolute -bottom-[12%] left-[20%] right-[20%] h-[12%] rounded-[100%] bg-black/50 blur-[8px] pointer-events-none z-0 mix-blend-multiply" />

      <svg
        viewBox="0 0 200 200"
        className="relative w-full h-full overflow-visible z-10"
        aria-hidden="true"
      >
        <defs>
          {/* Sphere body — 5-stop cinematic gradient */}
          <radialGradient id={idBody} cx="30%" cy="28%" r="82%">
            <stop offset="0%"   stopColor={p.hot} />
            <stop offset="18%"  stopColor={p.light} />
            <stop offset="42%"  stopColor={p.base} />
            <stop offset="72%"  stopColor={p.shade} />
            <stop offset="100%" stopColor={p.night} />
          </radialGradient>

          {/* Atmospheric halo (tight, photo-realistic) */}
          <radialGradient id={idHalo} cx="50%" cy="50%" r="50%">
            <stop offset="45%" stopColor="transparent" />
            <stop offset="48%" stopColor={p.halo} stopOpacity="0.45" />
            <stop offset="56%" stopColor={p.halo} stopOpacity="0.10" />
            <stop offset="80%" stopColor="transparent" />
          </radialGradient>

          {/* Limb darkening — multiply, makes the edge feel round */}
          <radialGradient id={idLimb} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="92%" stopColor="rgba(0,0,0,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
          </radialGradient>

          {/* Saturn ring stroke gradient (fades in/out around the planet) */}
          {planet.hasRings && (
            <linearGradient id={idRingGrad} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%"   stopColor={p.ringOuter} stopOpacity="0" />
              <stop offset="20%"  stopColor={p.ringOuter} stopOpacity="0.85" />
              <stop offset="50%"  stopColor={p.ringInner} stopOpacity="1" />
              <stop offset="80%"  stopColor={p.ringOuter} stopOpacity="0.85" />
              <stop offset="100%" stopColor={p.ringOuter} stopOpacity="0" />
            </linearGradient>
          )}

          <clipPath id={idClip}>
            <circle cx="100" cy="100" r="84" />
          </clipPath>
        </defs>

        {/* Saturn back-half rings */}
        {planet.hasRings && <SaturnRings p={p} gradId={idRingGrad} side="back" />}

        {/* Atmospheric halo */}
        <circle cx="100" cy="100" r="94" fill={`url(#${idHalo})`} />

        {/* Sphere body */}
        <circle cx="100" cy="100" r="84" fill={`url(#${idBody})`} />

        {/* Per-planet surface detail */}
        <g clipPath={`url(#${idClip})`}>
          {renderSurface(planet.id, uid)}
          {/* Limb darkening over everything */}
          <circle cx="100" cy="100" r="84" fill={`url(#${idLimb})`} />
          {/* Soft sub-solar highlight */}
          <ellipse cx="72" cy="58" rx="36" ry="22" fill="white" opacity="0.10" />
        </g>

        {/* Saturn front-half rings (overlap lower planet limb) */}
        {planet.hasRings && <SaturnRings p={p} gradId={idRingGrad} side="front" />}
      </svg>
    </motion.div>
  );
};
