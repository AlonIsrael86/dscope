import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * CosmicIndustryIcon — hand-crafted, Pricing-tier-grade cosmic illustrations.
 *
 * Per Katia (2026-05-27): «в такому стилі мають бути іконки в індустріях,
 * але і в цінах і в індустріях іконка рухається і частини картинки виходять
 * наче за якусь рамку і обрізаються — виправ це».
 *
 * Two fixes baked in:
 *   1. **No clipping** — SVG `overflow: visible`, extra-padded viewBox
 *      (`-15 -15 130 130`), parent container `overflow-visible`. Orbits,
 *      satellites, sparkles, glow can extend past the nominal 0–100 box
 *      without being cut.
 *   2. **Variety per industry** — 6 distinct cosmic compositions selected
 *      by industry index, each as elaborate as the 4 Pricing tier badges:
 *        v=0 → Ringed Planet (Saturn-like)
 *        v=1 → Spiral Galaxy
 *        v=2 → Pulsar with shockwave rings
 *        v=3 → Comet with flame trail
 *        v=4 → Nebula cloud + bright core
 *        v=5 → Binary star system with accretion bridge
 *
 * The semantic lucide glyph stays in the centre (Shield for Insurance,
 * Globe for Global Delivery, …) but smaller, so the card still reads at
 * a glance.
 */

interface Props {
  icon: LucideIcon;
  color: string;
  variant?: number;
}

export const CosmicIndustryIcon = React.memo(({ icon: Icon, color, variant = 0 }: Props) => {
  // Unique gradient ids per instance so the SVG defs don't collide when
  // multiple cards render side-by-side.
  const uid = React.useId();
  const v = ((variant % 6) + 6) % 6;

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-visible"
      style={{ color }}
    >
      <svg
        viewBox="-15 -15 130 130"
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="currentColor"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="45%"  stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-bright`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="50%"  stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-ring`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0" />
            <stop offset="25%"  stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#ffffff"      stopOpacity="0.95" />
            <stop offset="75%"  stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft halo behind everything (all variants) */}
        <circle cx="50" cy="50" r="42" fill={`url(#${uid}-core)`}>
          <animate attributeName="r"       values="40;46;40" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* ─── v=0  Ringed Planet ─── */}
        {v === 0 && (
          <>
            {/* tilted ring system (3 ring strokes) */}
            <g transform="rotate(-20 50 50)" style={{ transformOrigin: '50px 50px', animation: 'spin 28s linear infinite' }}>
              <ellipse cx="50" cy="50" rx="46" ry="11" stroke={`url(#${uid}-ring)`} strokeWidth="1.4" />
              <ellipse cx="50" cy="50" rx="42" ry="9.5" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.8" strokeDasharray="3 1.5" />
              <ellipse cx="50" cy="50" rx="38" ry="8" stroke={`url(#${uid}-ring)`} strokeWidth="0.7" />
              {/* shepherd moon */}
              <circle cx="96" cy="50" r="1.6" fill="#ffffff" stroke="none" />
            </g>
            {/* planet body */}
            <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeOpacity="0.8" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="16" fill={`url(#${uid}-core)`} />
            {/* surface bands */}
            <path d="M 36 45 Q 50 47 64 45" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.5" />
            <path d="M 36 55 Q 50 53 64 55" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.5" />
            {/* twin moons in fixed orbit */}
            <g style={{ transformOrigin: '50px 50px', animation: 'spin 14s linear infinite reverse' }}>
              <circle cx="14" cy="50" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="86" cy="50" r="0.9" fill="#ffffff" stroke="none" />
            </g>
          </>
        )}

        {/* ─── v=1  Spiral Galaxy ─── */}
        {v === 1 && (
          <g style={{ transformOrigin: '50px 50px', animation: 'spin 32s linear infinite' }}>
            {/* 4 spiral arms drawn as curved paths */}
            <path d="M 50 50 Q 70 40 84 50 T 96 62" stroke={`url(#${uid}-ring)`} strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M 50 50 Q 30 60 16 50 T 4 38" stroke={`url(#${uid}-ring)`} strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M 50 50 Q 60 30 50 14 T 38 2" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" fill="none" strokeDasharray="2 1.5" />
            <path d="M 50 50 Q 40 70 50 86 T 62 98" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.1" strokeLinecap="round" fill="none" strokeDasharray="2 1.5" />
            {/* star cluster dots along arms */}
            <circle cx="78" cy="47" r="0.9" fill="#ffffff" stroke="none" />
            <circle cx="22" cy="53" r="0.9" fill="#ffffff" stroke="none" />
            <circle cx="56" cy="22" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="44" cy="78" r="0.7" fill="currentColor" stroke="none" />
            {/* bright bulge */}
            <circle cx="50" cy="50" r="9" fill={`url(#${uid}-bright)`} stroke="none" />
            <circle cx="50" cy="50" r="3" fill="#ffffff" stroke="none" />
          </g>
        )}

        {/* ─── v=2  Pulsar with shockwave rings ─── */}
        {v === 2 && (
          <>
            {/* 3 expanding pulse rings */}
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1" fill="none">
              <animate attributeName="r"       values="14;38;14" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0;0.9" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.8" fill="none">
              <animate attributeName="r"       values="14;42;14" dur="3s" begin="-1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin="-1s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" fill="none">
              <animate attributeName="r"       values="14;46;14" dur="3s" begin="-2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin="-2s" repeatCount="indefinite" />
            </circle>
            {/* polar jets (rotating beam) */}
            <g style={{ transformOrigin: '50px 50px', animation: 'spin 6s linear infinite' }}>
              <path d="M 50 50 L 50 4" stroke={`url(#${uid}-bright)`} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
              <path d="M 50 50 L 50 96" stroke={`url(#${uid}-bright)`} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            </g>
            {/* bright neutron core */}
            <circle cx="50" cy="50" r="10" fill={`url(#${uid}-bright)`} stroke="none" />
            <circle cx="50" cy="50" r="4" fill="#ffffff" stroke="none">
              <animate attributeName="opacity" values="0.9;1;0.9" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* ─── v=3  Comet with flame trail ─── */}
        {/* Trail used to run M 78 25 → 22 78 (corner to corner) which
            passes straight through the SVG centre (50,50) — wiping out
            the lucide glyph rendered there (per Katia 2026-05-27:
            «financial ops там не вистачає іконки всередині»). Trail
            now sits in the upper-right quadrant only, stopping ~62,42
            so it never reaches the centre. */}
        {v === 3 && (
          <g style={{ transformOrigin: '50px 50px', animation: 'spin 22s linear infinite' }}>
            {/* trail — upper-right quadrant only, never crosses centre */}
            <path d="M 84 22 L 62 42" stroke={`url(#${uid}-ring)`} strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
            <path d="M 78 14 L 60 32" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M 90 30 L 68 50" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
            {/* sparks scattering off trail — none on the centre line */}
            <circle cx="70" cy="20" r="0.8" fill="currentColor" stroke="none">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="58" cy="14" r="0.6" fill="#ffffff" stroke="none">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.4s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="92" cy="14" r="0.7" fill="currentColor" stroke="none">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" begin="0.2s" repeatCount="indefinite" />
            </circle>
            {/* comet head — pushed further into the corner */}
            <circle cx="84" cy="22" r="11" fill={`url(#${uid}-bright)`} stroke="none" />
            <circle cx="84" cy="22" r="4.5" fill="#ffffff" stroke="none" />
          </g>
        )}

        {/* ─── v=4  Nebula cloud + bright core ─── */}
        {v === 4 && (
          <>
            {/* 3 overlapping soft blobs (nebula) */}
            <ellipse cx="38" cy="42" rx="22" ry="14" fill={`url(#${uid}-core)`} stroke="none" opacity="0.85">
              <animate attributeName="opacity" values="0.6;0.95;0.6" dur="5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="62" cy="58" rx="24" ry="15" fill={`url(#${uid}-core)`} stroke="none" opacity="0.75">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="6s" begin="-1s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="55" cy="35" rx="18" ry="11" fill={`url(#${uid}-core)`} stroke="none" opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.85;0.4" dur="7s" begin="-2s" repeatCount="indefinite" />
            </ellipse>
            {/* embedded stars at multiple positions */}
            <circle cx="20" cy="20" r="1.4" fill="#ffffff" stroke="none">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="82" cy="22" r="1" fill="currentColor" stroke="none">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" begin="0.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="78" r="1.2" fill="#ffffff" stroke="none">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="18" cy="80" r="0.9" fill="currentColor" stroke="none">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.0s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            {/* bright protostar centre */}
            <circle cx="50" cy="50" r="8" fill={`url(#${uid}-bright)`} stroke="none" />
            <circle cx="50" cy="50" r="2.5" fill="#ffffff" stroke="none">
              <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* cross-light spikes */}
            <line x1="50" y1="36" x2="50" y2="64" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.5" />
            <line x1="36" y1="50" x2="64" y2="50" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.5" />
          </>
        )}

        {/* ─── v=5  Binary star system with accretion bridge ─── */}
        {v === 5 && (
          <g style={{ transformOrigin: '50px 50px', animation: 'spin 12s linear infinite' }}>
            {/* outer wobble ring */}
            <ellipse cx="50" cy="50" rx="40" ry="14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" strokeDasharray="2 1.6" />
            {/* accretion bridge between the two stars */}
            <path d="M 22 50 Q 50 38 78 50" stroke={`url(#${uid}-ring)`} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 22 50 Q 50 62 78 50" stroke={`url(#${uid}-ring)`} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.65" />
            {/* primary star (left, larger) */}
            <circle cx="22" cy="50" r="11" fill={`url(#${uid}-bright)`} stroke="none" />
            <circle cx="22" cy="50" r="5" fill="#ffffff" stroke="none">
              <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* secondary star (right, smaller) */}
            <circle cx="78" cy="50" r="8" fill={`url(#${uid}-bright)`} stroke="none" />
            <circle cx="78" cy="50" r="3" fill="currentColor" stroke="none">
              <animate attributeName="opacity" values="0.85;1;0.85" dur="2s" begin="-1s" repeatCount="indefinite" />
            </circle>
            {/* scatter sparks */}
            <circle cx="50" cy="36" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="50" cy="64" r="0.7" fill="currentColor" stroke="none" />
          </g>
        )}

        {/* Sparkle particles around the icon (all variants) — staggered ping dots */}
        <circle cx="6" cy="14" r="0.9" fill="currentColor" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" begin="0s"   repeatCount="indefinite" />
        </circle>
        <circle cx="94" cy="16" r="0.7" fill="#ffffff" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.6s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="92" r="0.9" fill="currentColor" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.0s" begin="1.0s" repeatCount="indefinite" />
        </circle>
        <circle cx="8" cy="88" r="0.7" fill="#ffffff" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" begin="1.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Semantic lucide glyph — slightly larger now (w-10 → w-11)
          and stronger drop-shadow so it always reads as the anchor
          element even when the cosmic scene is busy around it. */}
      <Icon
        className="relative z-10 w-10 h-10 md:w-11 md:h-11 text-white"
        strokeWidth={1.7}
        style={{ filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 22px ${color}cc)` }}
      />
    </div>
  );
});

CosmicIndustryIcon.displayName = 'CosmicIndustryIcon';
