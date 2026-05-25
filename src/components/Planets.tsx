import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANETS_DATA } from '../data/planetsConstants';

/**
 * RealisticPlanet — photo-style SVG planet renderer.
 *
 * Per Katia: match the NASA reference photo as closely as possible
 * while staying in the cosmic site style. Each planet uses dense
 * per-feature SVG layers (continents, storm cells, ring systems,
 * craters, polar caps, atmospheric scatter, limb darkening,
 * sub-solar specular). All on a 200×200 viewBox so the rendering
 * stays sharp at any size and the silhouette is perfectly round.
 */

type Palette = {
  hot: string; light: string; base: string; shade: string; night: string; halo: string;
  ringOuter?: string; ringInner?: string;
};

const PALETTES: Record<string, Palette> = {
  mercury: { hot: '#f2e4c8', light: '#bf9a78', base: '#7d5736', shade: '#3a1f10', night: '#0c0604', halo: '#a87a55' },
  venus:   { hot: '#fff2c0', light: '#f6b85a', base: '#d97a26', shade: '#5e2a0d', night: '#180803', halo: '#ec9444' },
  earth:   { hot: '#dbeeff', light: '#5fa9e0', base: '#1a5fae', shade: '#0a2a5c', night: '#03091a', halo: '#5aa9e4' },
  mars:    { hot: '#f8c096', light: '#dd693a', base: '#a73416', shade: '#4a1404', night: '#1a0402', halo: '#d35a2c' },
  jupiter: { hot: '#fbe2b4', light: '#dba578', base: '#a3673b', shade: '#3f2412', night: '#150807', halo: '#d29565' },
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

/* ============ Per-planet surface composers (rich detail) ============ */
// All draw inside viewBox 200x200, clipped to circle r=84 at (100,100).

const SurfaceMercury = () => (
  <g>
    {/* Large basins (Caloris hint) */}
    <ellipse cx="56" cy="78" rx="14" ry="12" fill="#3a2618" opacity="0.55" />
    <ellipse cx="124" cy="80" rx="16" ry="13" fill="#2e1c10" opacity="0.55" />
    <ellipse cx="138" cy="130" rx="12" ry="10" fill="#2a1a0e" opacity="0.55" />
    <ellipse cx="74" cy="128" rx="11" ry="9" fill="#2c1a0c" opacity="0.5" />
    <ellipse cx="100" cy="98" rx="9" ry="7" fill="#22130a" opacity="0.5" />
    {/* Sunlit crater rims */}
    <ellipse cx="52" cy="74" rx="6" ry="3" fill="#d8be9c" opacity="0.55" />
    <ellipse cx="120" cy="76" rx="6" ry="3" fill="#cca87f" opacity="0.5" />
    <ellipse cx="134" cy="126" rx="4" ry="2" fill="#b8956c" opacity="0.45" />
    {/* Medium craters */}
    {[
      [40, 100, 5], [90, 56, 4], [108, 60, 3], [148, 96, 4], [50, 130, 4],
      [88, 108, 3], [116, 116, 3.5], [156, 108, 3], [80, 84, 3], [104, 142, 3.5],
    ].map(([cx, cy, r], i) => (
      <circle key={`mc-${i}`} cx={cx} cy={cy} r={r} fill="#1d0f07" opacity="0.55" />
    ))}
    {/* Small crater specks */}
    {[
      [68, 64], [78, 96], [96, 70], [114, 100], [128, 64], [60, 110],
      [72, 144], [98, 120], [114, 134], [142, 80], [156, 130], [44, 90],
      [86, 138], [120, 134], [60, 152], [102, 156], [136, 144], [148, 116],
    ].map(([cx, cy], i) => (
      <circle key={`mcs-${i}`} cx={cx} cy={cy} r={1.5} fill="#0f0703" opacity="0.6" />
    ))}
  </g>
);

const SurfaceVenus = () => (
  <g>
    {/* Multiple rotating cloud layers — thick atmospheric swirls */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 240, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }}>
      <ellipse cx="80" cy="62" rx="62" ry="9" fill="#fde0a0" opacity="0.45" />
      <ellipse cx="118" cy="84" rx="58" ry="7" fill="#f7c87a" opacity="0.5" />
      <ellipse cx="86" cy="108" rx="62" ry="9" fill="#fbd896" opacity="0.45" />
      <ellipse cx="124" cy="128" rx="56" ry="7" fill="#f0b066" opacity="0.5" />
      <ellipse cx="92" cy="148" rx="50" ry="6" fill="#fbcb84" opacity="0.45" />
    </motion.g>
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 320, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }} opacity="0.45">
      <ellipse cx="110" cy="70" rx="36" ry="4" fill="#fff0c8" />
      <ellipse cx="80" cy="120" rx="40" ry="4" fill="#fff0c8" />
      <ellipse cx="120" cy="142" rx="32" ry="4" fill="#fff0c8" />
    </motion.g>
    {/* Bright sulfuric highlight patches */}
    <ellipse cx="78" cy="78" rx="14" ry="6" fill="#fff8d6" opacity="0.3" />
    <ellipse cx="124" cy="118" rx="12" ry="5" fill="#fff8d6" opacity="0.25" />
  </g>
);

const SurfaceEarth = () => (
  <g>
    {/* Continents */}
    <g>
      {/* Eurasia main */}
      <path d="M58 54 C 80 48 110 52 132 56 C 144 60 144 70 128 74 C 110 78 86 76 70 72 C 58 68 52 60 58 54 Z" fill="#4a8a3e" opacity="0.85" />
      {/* India hint */}
      <path d="M110 74 C 116 76 118 84 114 86 C 108 88 106 80 110 74 Z" fill="#b88a4e" opacity="0.75" />
      {/* East Asia / Japan */}
      <path d="M136 64 C 144 60 152 66 152 72 C 148 76 138 76 136 70 Z" fill="#3a7430" opacity="0.85" />
      <ellipse cx="156" cy="78" rx="3" ry="5" fill="#3a7430" opacity="0.8" />
      {/* North Africa / Sahara */}
      <path d="M94 74 C 110 74 122 84 120 96 C 116 102 108 104 100 102 C 94 100 90 90 92 84 C 92 78 92 76 94 74 Z" fill="#c8945a" opacity="0.8" />
      {/* Sub-Saharan + horn */}
      <path d="M102 100 C 114 100 122 110 120 122 C 116 132 104 132 100 124 C 96 116 98 104 102 100 Z" fill="#3e7a35" opacity="0.85" />
      {/* Madagascar */}
      <ellipse cx="124" cy="128" rx="3" ry="5" fill="#3a7430" opacity="0.85" />
      {/* North America */}
      <path d="M40 68 C 56 60 72 68 74 80 C 76 92 66 102 54 102 C 42 102 32 92 34 80 C 34 74 36 70 40 68 Z" fill="#4a8a3e" opacity="0.85" />
      {/* Greenland */}
      <ellipse cx="68" cy="44" rx="7" ry="9" fill="#dfe9f5" opacity="0.75" />
      {/* Central America strait */}
      <path d="M52 100 C 58 100 62 106 60 110 C 58 114 54 112 52 108 C 50 104 50 100 52 100 Z" fill="#4a8a3e" opacity="0.8" />
      {/* South America */}
      <path d="M58 110 C 66 108 72 116 70 124 C 72 138 64 152 58 154 C 52 150 48 138 50 128 C 52 120 54 114 58 110 Z" fill="#3a7430" opacity="0.85" />
      {/* Australia */}
      <path d="M134 124 C 146 122 154 128 150 138 C 142 144 128 142 126 134 C 126 130 130 126 134 124 Z" fill="#b88a4e" opacity="0.8" />
      {/* UK / Iceland hint */}
      <circle cx="78" cy="54" r="2" fill="#3a7430" opacity="0.8" />
      <circle cx="74" cy="48" r="2" fill="#3a7430" opacity="0.75" />
      {/* Polar ice caps */}
      <ellipse cx="100" cy="22" rx="42" ry="7" fill="#f0f4ff" opacity="0.7" />
      <ellipse cx="100" cy="178" rx="44" ry="6" fill="#f0f4ff" opacity="0.65" />
    </g>
    {/* Cloud layer 1 — slow, large bands */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 200, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }} opacity="0.6">
      <ellipse cx="76" cy="62" rx="34" ry="5" fill="#ffffff" />
      <ellipse cx="124" cy="94" rx="36" ry="5" fill="#ffffff" />
      <ellipse cx="88" cy="132" rx="40" ry="5" fill="#ffffff" />
      <ellipse cx="140" cy="148" rx="28" ry="4" fill="#ffffff" />
    </motion.g>
    {/* Cloud layer 2 — faster, smaller wisps */}
    <motion.g animate={{ rotate: -360 }} transition={{ duration: 280, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 100px' }} opacity="0.45">
      <ellipse cx="110" cy="72" rx="20" ry="3" fill="#ffffff" />
      <ellipse cx="70" cy="108" rx="22" ry="3" fill="#ffffff" />
      <ellipse cx="118" cy="116" rx="18" ry="3" fill="#ffffff" />
      <ellipse cx="142" cy="74" rx="14" ry="2" fill="#ffffff" />
    </motion.g>
    {/* Hurricane swirl */}
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '54px 132px' }} opacity="0.55">
      <path d="M 50 132 Q 56 124 64 130 Q 60 138 50 132 Z" fill="#ffffff" />
    </motion.g>
    {/* Atmosphere blue rim */}
    <circle cx="100" cy="100" r="84" fill="none" stroke="#9fd3ff" strokeOpacity="0.4" strokeWidth="1.4" />
  </g>
);

const SurfaceMars = () => (
  <g>
    {/* Maria regions (darker rust patches) */}
    <path d="M52 70 C 76 60 102 68 114 80 C 122 92 110 104 90 104 C 70 102 54 92 50 82 C 48 76 50 72 52 70 Z" fill="#4f1d08" opacity="0.6" />
    <path d="M120 92 C 142 90 154 104 146 120 C 138 134 118 132 110 120 C 104 110 110 96 120 92 Z" fill="#3e1605" opacity="0.6" />
    <ellipse cx="76" cy="128" rx="28" ry="13" fill="#561e08" opacity="0.55" />
    <path d="M32 102 C 44 96 56 104 52 116 C 46 128 34 126 28 116 C 26 110 26 104 32 102 Z" fill="#4a1804" opacity="0.6" />
    <ellipse cx="150" cy="76" rx="9" ry="6" fill="#4d1d09" opacity="0.55" />
    {/* Olympus Mons + Tharsis volcanoes — small bright spots */}
    <circle cx="62" cy="92" r="5" fill="#f0b485" opacity="0.6" />
    <circle cx="62" cy="92" r="2" fill="#3a1404" opacity="0.7" />
    <circle cx="78" cy="86" r="3" fill="#e69b6c" opacity="0.55" />
    <circle cx="78" cy="100" r="3" fill="#e69b6c" opacity="0.55" />
    <circle cx="84" cy="94" r="3" fill="#e69b6c" opacity="0.55" />
    {/* Valles Marineris */}
    <path d="M44 96 Q 90 90 142 100" stroke="#2d0a02" strokeWidth="3" strokeOpacity="0.65" fill="none" strokeLinecap="round" />
    <path d="M48 98 Q 90 94 138 104" stroke="#150400" strokeWidth="1.4" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
    {/* Hellas Basin (big southern crater) */}
    <ellipse cx="118" cy="146" rx="16" ry="10" fill="#7a3a1a" opacity="0.45" />
    {/* Crater specks */}
    {[
      [88, 78], [128, 70], [104, 142], [70, 108], [136, 122],
      [56, 84], [100, 84], [124, 132], [42, 124], [148, 134],
    ].map(([cx, cy], i) => (
      <circle key={`mac-${i}`} cx={cx} cy={cy} r={2} fill="#1d0602" opacity="0.55" />
    ))}
    {/* Polar caps — bright, irregular */}
    <ellipse cx="100" cy="22" rx="30" ry="10" fill="#f5ede0" opacity="0.78" />
    <ellipse cx="92" cy="20" rx="14" ry="4" fill="#ffffff" opacity="0.5" />
    <ellipse cx="100" cy="178" rx="26" ry="8" fill="#f5ede0" opacity="0.6" />
    {/* Warm sub-solar dust highlight */}
    <ellipse cx="148" cy="78" rx="14" ry="6" fill="#f4ab78" opacity="0.4" />
  </g>
);

const SurfaceJupiter = () => (
  <g>
    {/* 12 detailed alternating bands (real Jupiter look) */}
    <rect x="16" y="36"  width="168" height="8"  fill="#c69a6e" opacity="0.6" />
    <rect x="16" y="44"  width="168" height="9"  fill="#76502c" opacity="0.55" />
    <rect x="16" y="53"  width="168" height="10" fill="#ddb589" opacity="0.5" />
    <rect x="16" y="63"  width="168" height="8"  fill="#5e3c1e" opacity="0.6" />
    <rect x="16" y="71"  width="168" height="12" fill="#eccba2" opacity="0.45" />
    <rect x="16" y="83"  width="168" height="9"  fill="#7c5230" opacity="0.55" />
    <rect x="16" y="92"  width="168" height="14" fill="#f4d9b0" opacity="0.45" />
    <rect x="16" y="106" width="168" height="8"  fill="#6a4422" opacity="0.6" />
    <rect x="16" y="114" width="168" height="10" fill="#d8a87a" opacity="0.5" />
    <rect x="16" y="124" width="168" height="11" fill="#5d3a1c" opacity="0.6" />
    <rect x="16" y="135" width="168" height="9"  fill="#caa074" opacity="0.5" />
    <rect x="16" y="144" width="168" height="10" fill="#79532f" opacity="0.55" />
    <rect x="16" y="154" width="168" height="10" fill="#b88758" opacity="0.5" />
    {/* Great Red Spot */}
    <ellipse cx="84" cy="110" rx="18" ry="8" fill="#7c2614" opacity="0.85" />
    <ellipse cx="84" cy="110" rx="14" ry="6" fill="#a23a1c" opacity="0.85" />
    <ellipse cx="84" cy="110" rx="8" ry="3.5" fill="#5a1408" opacity="0.85" />
    <ellipse cx="84" cy="110" rx="18" ry="8" fill="none" stroke="#fbe2b6" strokeWidth="0.6" strokeOpacity="0.5" />
    {/* White oval storms */}
    <ellipse cx="138" cy="118" rx="8" ry="3" fill="#fbe9c8" opacity="0.8" />
    <ellipse cx="48"  cy="124" rx="9" ry="3" fill="#fbe9c8" opacity="0.7" />
    {/* Band swirl streaks */}
    <ellipse cx="136" cy="78"  rx="12" ry="1.5" fill="#fbe2b6" opacity="0.6" />
    <ellipse cx="58"  cy="92"  rx="14" ry="1.8" fill="#fbe2b6" opacity="0.55" />
    <ellipse cx="120" cy="138" rx="12" ry="1.5" fill="#fbe2b6" opacity="0.5" />
    <ellipse cx="46"  cy="152" rx="10" ry="1.5" fill="#fbe2b6" opacity="0.45" />
    {/* Subtle dark edge between major bands */}
    <line x1="16" y1="98"  x2="184" y2="98"  stroke="#321a0c" strokeWidth="1.4" strokeOpacity="0.4" />
    <line x1="16" y1="68"  x2="184" y2="68"  stroke="#321a0c" strokeWidth="1.2" strokeOpacity="0.3" />
    <line x1="16" y1="128" x2="184" y2="128" stroke="#321a0c" strokeWidth="1.2" strokeOpacity="0.3" />
  </g>
);

const SurfaceSaturn = () => (
  <g>
    {/* Subtle cloud bands */}
    <rect x="16" y="56"  width="168" height="14" fill="#eecda1" opacity="0.45" />
    <rect x="16" y="70"  width="168" height="8"  fill="#c8a06a" opacity="0.5" />
    <rect x="16" y="78"  width="168" height="14" fill="#e6c897" opacity="0.4" />
    <rect x="16" y="92"  width="168" height="10" fill="#ad8052" opacity="0.5" />
    <rect x="16" y="102" width="168" height="14" fill="#dcba87" opacity="0.4" />
    <rect x="16" y="116" width="168" height="8"  fill="#b48b5a" opacity="0.45" />
    <rect x="16" y="124" width="168" height="14" fill="#e8c89a" opacity="0.35" />
    <rect x="16" y="138" width="168" height="9"  fill="#9b724a" opacity="0.4" />
    {/* Hex polar storm hint */}
    <ellipse cx="100" cy="34" rx="22" ry="6" fill="#cd9a64" opacity="0.4" />
  </g>
);

const SurfaceUranus = () => (
  <g>
    {/* Vertical-ish bands (Uranus is tipped 98°) */}
    <ellipse cx="100" cy="100" rx="84" ry="14" fill="#a3d8e0" opacity="0.18" transform="rotate(-12 100 100)" />
    <ellipse cx="100" cy="100" rx="84" ry="28" fill="#a3d8e0" opacity="0.08" transform="rotate(-12 100 100)" />
    {/* Subtle cloud hint */}
    <ellipse cx="90" cy="84" rx="20" ry="3" fill="#dffaff" opacity="0.18" transform="rotate(-12 100 100)" />
  </g>
);

const SurfaceNeptune = () => (
  <g>
    {/* Deep band shading */}
    <rect x="16" y="58"  width="168" height="14" fill="#5d7ed3" opacity="0.25" />
    <rect x="16" y="80"  width="168" height="14" fill="#16275a" opacity="0.4" />
    <rect x="16" y="106" width="168" height="16" fill="#5d7ed3" opacity="0.2" />
    <rect x="16" y="124" width="168" height="14" fill="#0e1d4a" opacity="0.4" />
    {/* Great Dark Spot */}
    <ellipse cx="120" cy="92" rx="14" ry="7" fill="#0a1740" opacity="0.8" />
    <ellipse cx="120" cy="92" rx="6" ry="3" fill="#040b25" opacity="0.85" />
    {/* Scooter cloud */}
    <ellipse cx="78" cy="128" rx="22" ry="3" fill="#dbe6ff" opacity="0.55" />
    <ellipse cx="142" cy="78" rx="18" ry="2.5" fill="#dbe6ff" opacity="0.45" />
    {/* Small dark spots */}
    <ellipse cx="62" cy="78" rx="6" ry="3" fill="#0a1740" opacity="0.5" />
  </g>
);

const renderSurface = (planetId: string) => {
  switch (planetId) {
    case 'mercury': return <SurfaceMercury />;
    case 'venus':   return <SurfaceVenus />;
    case 'earth':   return <SurfaceEarth />;
    case 'mars':    return <SurfaceMars />;
    case 'jupiter': return <SurfaceJupiter />;
    case 'saturn':  return <SurfaceSaturn />;
    case 'uranus':  return <SurfaceUranus />;
    case 'neptune': return <SurfaceNeptune />;
    default: return null;
  }
};

/* ============ Ring renderer (Saturn + Uranus share this) ============ */
const PlanetRings = ({
  gradId, side, rings, rotation, dimColor,
}: {
  gradId: string; side: 'back' | 'front';
  rings: [number, number, number][]; // [rx, ry, baseOpacity]
  rotation: number;
  dimColor?: string;
}) => {
  const sweep = side === 'front' ? 1 : 0;
  const fade = side === 'front' ? 1 : 0.55;
  return (
    <g transform={`translate(100 100) rotate(${rotation})`}>
      {rings.map(([rx, ry, o], i) => {
        const isGap = i === Math.floor(rings.length / 2);
        return (
          <path
            key={`${side}-${i}`}
            d={`M ${-rx} 0 A ${rx} ${ry} 0 0 ${sweep} ${rx} 0`}
            fill="none"
            stroke={isGap ? (dimColor ?? '#7a5530') : `url(#${gradId})`}
            strokeOpacity={o * fade}
            strokeWidth={isGap ? 0.8 : 1.5}
            strokeLinecap="butt"
          />
        );
      })}
    </g>
  );
};

/* ============ Component ============ */
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
  const idGrain = `${uid}-grain`;

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full cursor-pointer group ${planet.sizeClass} ${className}`}
      onMouseEnter={() => isHoverable && setIsHovered(true)}
      onMouseLeave={() => isHoverable && setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 10 }}
      whileHover={{ scale: isHoverable ? 2 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
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

      <div className="absolute -bottom-[12%] left-[20%] right-[20%] h-[12%] rounded-[100%] bg-black/50 blur-[8px] pointer-events-none z-0 mix-blend-multiply" />

      <svg viewBox="0 0 200 200" className="relative w-full h-full overflow-visible z-10" aria-hidden="true">
        <defs>
          <radialGradient id={idBody} cx="30%" cy="28%" r="82%">
            <stop offset="0%"   stopColor={p.hot} />
            <stop offset="18%"  stopColor={p.light} />
            <stop offset="42%"  stopColor={p.base} />
            <stop offset="72%"  stopColor={p.shade} />
            <stop offset="100%" stopColor={p.night} />
          </radialGradient>

          <radialGradient id={idHalo} cx="50%" cy="50%" r="50%">
            <stop offset="45%" stopColor="transparent" />
            <stop offset="48%" stopColor={p.halo} stopOpacity="0.45" />
            <stop offset="56%" stopColor={p.halo} stopOpacity="0.10" />
            <stop offset="80%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id={idLimb} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="92%" stopColor="rgba(0,0,0,0.30)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.65)" />
          </radialGradient>

          {(planet.hasRings || planet.id === 'uranus') && (
            <linearGradient id={idRingGrad} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%"   stopColor={p.ringOuter} stopOpacity="0" />
              <stop offset="20%"  stopColor={p.ringOuter} stopOpacity="0.85" />
              <stop offset="50%"  stopColor={p.ringInner} stopOpacity="1" />
              <stop offset="80%"  stopColor={p.ringOuter} stopOpacity="0.85" />
              <stop offset="100%" stopColor={p.ringOuter} stopOpacity="0" />
            </linearGradient>
          )}

          {/* Subtle grain over the whole body for photo-like texture */}
          <filter id={idGrain} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed={seed} />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" />
          </filter>

          <clipPath id={idClip}>
            <circle cx="100" cy="100" r="84" />
          </clipPath>
        </defs>

        {/* Saturn back rings */}
        {planet.hasRings && (
          <PlanetRings
            gradId={idRingGrad}
            side="back"
            rings={[[132, 22, 0.85], [124, 20, 0.95], [118, 19, 0.4], [112, 18, 0.95], [104, 16, 0.85], [96, 14, 0.55]]}
            rotation={-18}
            dimColor={p.ringInner}
          />
        )}
        {/* Uranus back rings */}
        {planet.id === 'uranus' && (
          <PlanetRings
            gradId={idRingGrad}
            side="back"
            rings={[[112, 22, 0.55], [106, 20, 0.4], [100, 18, 0.45]]}
            rotation={-78}
            dimColor={p.ringInner}
          />
        )}

        {/* Atmospheric halo */}
        <circle cx="100" cy="100" r="94" fill={`url(#${idHalo})`} />

        {/* Body */}
        <circle cx="100" cy="100" r="84" fill={`url(#${idBody})`} />

        {/* Detail layers clipped to body */}
        <g clipPath={`url(#${idClip})`}>
          {/* Subtle base grain texture */}
          <rect x="16" y="16" width="168" height="168" filter={`url(#${idGrain})`} opacity="0.7" />
          {renderSurface(planet.id)}
          {/* Limb darkening */}
          <circle cx="100" cy="100" r="84" fill={`url(#${idLimb})`} />
          {/* Soft sub-solar highlight */}
          <ellipse cx="72" cy="58" rx="36" ry="22" fill="white" opacity="0.10" />
          {/* Tiny specular */}
          <ellipse cx="62" cy="50" rx="8" ry="4" fill="white" opacity="0.18" />
        </g>

        {/* Saturn front rings */}
        {planet.hasRings && (
          <PlanetRings
            gradId={idRingGrad}
            side="front"
            rings={[[132, 22, 0.85], [124, 20, 0.95], [118, 19, 0.4], [112, 18, 0.95], [104, 16, 0.85], [96, 14, 0.55]]}
            rotation={-18}
            dimColor={p.ringInner}
          />
        )}
        {/* Uranus front rings */}
        {planet.id === 'uranus' && (
          <PlanetRings
            gradId={idRingGrad}
            side="front"
            rings={[[112, 22, 0.7], [106, 20, 0.55], [100, 18, 0.6]]}
            rotation={-78}
            dimColor={p.ringInner}
          />
        )}
      </svg>
    </motion.div>
  );
};
