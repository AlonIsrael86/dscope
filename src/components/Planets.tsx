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
  // Slightly more vivid than the prior pass so the planets read closer to
  // the NASA reference (warmer Mercury, orange-rust Mars, vivid Earth blue,
  // saturated Neptune indigo) while still keeping the cosmic dark-page mood.
  mercury: { hot: '#efe2c4', light: '#b9947a', base: '#7a5a40', shade: '#352014', night: '#0d0805', halo: '#9c7a59' },
  venus:   { hot: '#fff0bc', light: '#f7b766', base: '#dd7e36', shade: '#5d2e10', night: '#180a04', halo: '#ec9750' },
  earth:   { hot: '#d4ebff', light: '#5fa9e0', base: '#1a5fae', shade: '#0a2a5c', night: '#03091a', halo: '#5aa9e4' },
  mars:    { hot: '#f6c4a0', light: '#df7440', base: '#a7411b', shade: '#4a1808', night: '#1a0603', halo: '#d35a2c' },
  jupiter: { hot: '#fae3b8', light: '#dba578', base: '#a0633b', shade: '#3f2412', night: '#150807', halo: '#d29565' },
  saturn:  { hot: '#fbe6b8', light: '#e5c08a', base: '#b48a55', shade: '#503820', night: '#180e07', halo: '#dfba85', ringOuter: '#e4c98f', ringInner: '#7a5530' },
  uranus:  { hot: '#dffaff', light: '#82d6e6', base: '#37a2b9', shade: '#19515f', night: '#04141b', halo: '#7fcfe1', ringOuter: '#a8e1ec', ringInner: '#4b7c87' },
  neptune: { hot: '#c0d6f5', light: '#577ed3', base: '#1f4598', shade: '#0e1f4a', night: '#040818', halo: '#456fd0' },
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
    {/* Larger crater basins */}
    <circle cx="58" cy="80" r="11"  fill="#3a3127" opacity="0.6" />
    <circle cx="120" cy="78" r="13" fill="#2e2620" opacity="0.6" />
    <circle cx="135" cy="128" r="10" fill="#241d17" opacity="0.55" />
    <circle cx="78" cy="120" r="8"  fill="#2c241e" opacity="0.55" />
    {/* Medium craters */}
    <circle cx="90" cy="55" r="6"  fill="#28201a" opacity="0.65" />
    <circle cx="105" cy="100" r="6" fill="#1e1814" opacity="0.5" />
    <circle cx="60" cy="140" r="6"  fill="#241d17" opacity="0.5" />
    <circle cx="140" cy="60" r="5"  fill="#28201a" opacity="0.55" />
    <circle cx="38" cy="100" r="5"  fill="#2c241e" opacity="0.5" />
    {/* Many small crater dots */}
    <circle cx="70" cy="65" r="2.5" fill="#1a140f" opacity="0.6" />
    <circle cx="95" cy="78" r="2"   fill="#1a140f" opacity="0.55" />
    <circle cx="155" cy="92" r="2.5" fill="#1a140f" opacity="0.55" />
    <circle cx="50" cy="115" r="2"  fill="#1a140f" opacity="0.5" />
    <circle cx="115" cy="142" r="2.5" fill="#1a140f" opacity="0.55" />
    <circle cx="82" cy="148" r="2"  fill="#1a140f" opacity="0.5" />
    <circle cx="100" cy="40" r="2"  fill="#1a140f" opacity="0.55" />
    <circle cx="148" cy="138" r="2" fill="#1a140f" opacity="0.5" />
    {/* Crater rim highlights (sunlit side) */}
    <circle cx="55" cy="76" r="3"  fill="#bdae93" opacity="0.55" />
    <circle cx="116" cy="74" r="4"  fill="#a89678" opacity="0.5" />
    <circle cx="86" cy="52" r="2"  fill="#bdae93" opacity="0.5" />
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
    {/* Continent silhouettes — richer hints (Eurasia, Africa, N./S. America, Australia, Antarctica) */}
    <g>
      {/* Eurasia */}
      <path d="M62 56 C 80 50 108 52 130 56 C 142 60 138 70 124 74 C 110 78 88 76 72 72 C 60 68 56 62 62 56 Z" fill="#4a8a3e" opacity="0.85" />
      <path d="M120 60 C 134 58 152 62 154 70 C 152 76 138 76 124 72 Z" fill="#3a7430" opacity="0.85" />
      {/* North Africa + Sahara hint */}
      <path d="M96 76 C 112 76 122 84 120 96 C 118 106 108 110 100 108 C 94 106 90 96 92 88 C 92 82 94 78 96 76 Z" fill="#b88a4e" opacity="0.75" />
      {/* Sub-Saharan / horn */}
      <path d="M104 102 C 114 100 122 108 118 118 C 114 126 104 126 100 120 C 98 114 100 106 104 102 Z" fill="#3e7a35" opacity="0.85" />
      {/* North America */}
      <path d="M44 70 C 56 64 70 70 72 80 C 74 92 66 100 56 102 C 46 102 38 92 40 82 C 40 76 42 72 44 70 Z" fill="#4a8a3e" opacity="0.85" />
      {/* Central + S. America */}
      <path d="M58 104 C 64 100 70 108 68 116 C 70 130 62 142 56 148 C 50 144 48 130 50 120 C 52 112 54 106 58 104 Z" fill="#3a7430" opacity="0.85" />
      {/* Australia */}
      <path d="M134 124 C 144 122 152 128 148 136 C 142 142 130 140 128 134 C 126 130 130 126 134 124 Z" fill="#a87742" opacity="0.8" />
      {/* Antarctica hint (bottom rim) */}
      <ellipse cx="100" cy="172" rx="40" ry="6" fill="#f0f4ff" opacity="0.45" />
      {/* Arctic ice cap */}
      <ellipse cx="100" cy="30" rx="36" ry="5" fill="#f0f4ff" opacity="0.4" />
    </g>
    {/* Two cloud layers rotating at different rates */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 200, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }} opacity="0.55">
      <ellipse cx="76" cy="60" rx="30" ry="4" fill="#ffffff" />
      <ellipse cx="120" cy="92" rx="34" ry="5" fill="#ffffff" />
      <ellipse cx="92" cy="130" rx="38" ry="4" fill="#ffffff" />
    </motion.g>
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 280, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }} opacity="0.4">
      <ellipse cx="110" cy="72" rx="22" ry="3" fill="#ffffff" />
      <ellipse cx="70" cy="110" rx="26" ry="3" fill="#ffffff" />
      <ellipse cx="130" cy="146" rx="20" ry="3" fill="#ffffff" />
    </motion.g>
    {/* Tight atmospheric blue rim */}
    <circle cx="100" cy="100" r="84" fill="none" stroke="#9fd3ff" strokeOpacity="0.35" strokeWidth="1.2" />
  </g>
);

const SurfaceMars = () => (
  <g>
    {/* Dark mare regions — irregular shapes hinting at Syrtis Major / Mare Erythraeum */}
    <path d="M60 72 C 78 64 100 70 110 80 C 116 90 108 100 92 102 C 76 102 62 92 58 84 C 56 80 58 76 60 72 Z" fill="#5a2410" opacity="0.6" />
    <path d="M118 96 C 138 94 148 108 140 122 C 132 132 116 130 110 120 C 106 112 110 100 118 96 Z" fill="#4a1d0a" opacity="0.55" />
    <ellipse cx="78" cy="128" rx="24" ry="11" fill="#5e2a16" opacity="0.5" />
    <path d="M40 100 C 48 96 56 102 54 112 C 50 122 42 122 38 114 C 36 108 36 102 40 100 Z" fill="#4d1f0e" opacity="0.55" />
    {/* Valles Marineris — long horizontal scar */}
    <path d="M48 92 Q 90 88 138 96" stroke="#391506" strokeWidth="2.5" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
    <path d="M52 94 Q 90 92 134 100" stroke="#1f0703" strokeWidth="1" strokeOpacity="0.45" fill="none" strokeLinecap="round" />
    {/* A few crater dots */}
    <circle cx="86" cy="80" r="3" fill="#2b1006" opacity="0.6" />
    <circle cx="124" cy="74" r="2.5" fill="#2b1006" opacity="0.55" />
    <circle cx="100" cy="148" r="3.5" fill="#2b1006" opacity="0.6" />
    {/* Polar caps — slightly larger + softer */}
    <ellipse cx="100" cy="22" rx="26" ry="10" fill="#f5ede0" opacity="0.7" />
    <ellipse cx="100" cy="178" rx="22" ry="8" fill="#f5ede0" opacity="0.55" />
    {/* Warm sub-solar dust highlight */}
    <ellipse cx="138" cy="78" rx="12" ry="6" fill="#f0a877" opacity="0.4" />
  </g>
);

const SurfaceJupiter = () => (
  <g>
    {/* 8 alternating equatorial bands of varying width — more photo-real */}
    <rect x="16" y="38"  width="168" height="10" fill="#c89e72" opacity="0.55" />
    <rect x="16" y="48"  width="168" height="12" fill="#7c5631" opacity="0.55" />
    <rect x="16" y="60"  width="168" height="10" fill="#ddb589" opacity="0.5" />
    <rect x="16" y="70"  width="168" height="14" fill="#6f4a26" opacity="0.55" />
    <rect x="16" y="84"  width="168" height="18" fill="#eccea0" opacity="0.5" />
    <rect x="16" y="102" width="168" height="10" fill="#7a4f29" opacity="0.6" />
    <rect x="16" y="112" width="168" height="14" fill="#d8a87a" opacity="0.45" />
    <rect x="16" y="126" width="168" height="12" fill="#65411f" opacity="0.55" />
    <rect x="16" y="138" width="168" height="12" fill="#caa074" opacity="0.5" />
    <rect x="16" y="150" width="168" height="10" fill="#7d5938" opacity="0.5" />
    {/* Great Red Spot — three-layer ellipse with swirl rim */}
    <ellipse cx="84" cy="110" rx="18" ry="8" fill="#8a3018" opacity="0.85" />
    <ellipse cx="84" cy="110" rx="13" ry="6" fill="#a23a1c" opacity="0.85" />
    <ellipse cx="84" cy="110" rx="8"  ry="3.5" fill="#581608" opacity="0.85" />
    <ellipse cx="84" cy="110" rx="18" ry="8" fill="none" stroke="#fbe2b6" strokeWidth="0.6" strokeOpacity="0.5" />
    {/* Band swirl streaks — small white wisps following bands */}
    <ellipse cx="138" cy="78"  rx="10" ry="1.6" fill="#fbe2b6" opacity="0.55" />
    <ellipse cx="56"  cy="92"  rx="14" ry="1.8" fill="#fbe2b6" opacity="0.5" />
    <ellipse cx="120" cy="122" rx="12" ry="1.5" fill="#fbe2b6" opacity="0.45" />
    <ellipse cx="48"  cy="138" rx="10" ry="1.6" fill="#fbe2b6" opacity="0.4" />
    {/* Subtle band edge shading */}
    <rect x="16" y="98" width="168" height="2" fill="#3a2410" opacity="0.45" />
    <rect x="16" y="68" width="168" height="2" fill="#3a2410" opacity="0.3" />
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

/* ----------------- Generic ring system (used by Saturn & Uranus) ----------------- */
const PlanetRings = ({
  p, gradId, side, rings, rotation,
}: {
  p: Palette; gradId: string; side: 'back' | 'front';
  rings: [number, number, number][]; // [rx, ry, baseOpacity]
  rotation: number;                   // degrees, ring tilt
}) => {
  const sweep = side === 'front' ? 1 : 0;
  const fade = side === 'front' ? 1 : 0.6;
  return (
    <g transform={`translate(100 100) rotate(${rotation})`}>
      {rings.map(([rx, ry, o], i) => (
        <path
          key={`${side}-${i}`}
          d={`M ${-rx} 0 A ${rx} ${ry} 0 0 ${sweep} ${rx} 0`}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeOpacity={o * fade}
          strokeWidth={i === Math.floor(rings.length / 2) ? 0.9 : 1.4}
          strokeLinecap="butt"
        />
      ))}
    </g>
  );
};

/* ----------------- Saturn ring system (6 concentric rings, properly wrapped) ----------------- */
const SaturnRings = ({ p, gradId, side }: { p: Palette; gradId: string; side: 'back' | 'front' }) => {
  // (radius x, radius y, base opacity)
  const rings: [number, number, number][] = [
    [132, 22, 0.85],  // outermost (A ring outer)
    [124, 20, 0.95],  // A ring
    [118, 19, 0.40],  // Cassini Division (visibly dimmer)
    [112, 18, 0.95],  // B ring (brightest)
    [104, 16, 0.85],  // B ring inner
    [ 96, 14, 0.55],  // C ring (faint, closest to planet)
  ];
  // sweepFlag 0 = top arc (BACK of ring, behind planet)
  // sweepFlag 1 = bottom arc (FRONT of ring, over planet)
  const sweep = side === 'front' ? 1 : 0;
  const fade = side === 'front' ? 1 : 0.6;
  return (
    <g transform="translate(100 100) rotate(-18)">
      {rings.map(([rx, ry, o], i) => (
        <path
          key={`${side}-${i}`}
          d={`M ${-rx} 0 A ${rx} ${ry} 0 0 ${sweep} ${rx} 0`}
          fill="none"
          stroke={i === 2 ? (p.ringInner ?? '#7a5530') : `url(#${gradId})`}
          strokeOpacity={o * fade}
          strokeWidth={i === 2 ? 0.9 : 1.6}
          strokeLinecap="butt"
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

          {/* Ring stroke gradient (Saturn + Uranus) */}
          {(planet.hasRings || planet.id === 'uranus') && (
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

        {/* Uranus tilted ring (vertical-ish, ~75° because of axial tilt) — back half */}
        {planet.id === 'uranus' && (
          <PlanetRings
            p={p}
            gradId={idRingGrad}
            side="back"
            rings={[[112, 22, 0.55], [106, 20, 0.4], [100, 18, 0.45]]}
            rotation={-78}
          />
        )}

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

        {/* Uranus tilted ring — front half */}
        {planet.id === 'uranus' && (
          <PlanetRings
            p={p}
            gradId={idRingGrad}
            side="front"
            rings={[[112, 22, 0.7], [106, 20, 0.55], [100, 18, 0.6]]}
            rotation={-78}
          />
        )}
      </svg>
    </motion.div>
  );
};
