import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * CosmicIndustryIcon — rich Pricing-tier-level cosmic composition.
 *
 * Per Katia: industries icons should be as elaborate as the Pricing tier
 * badges (Comet / Satellite / Telescope / Black Hole). Hand-crafted SVG
 * composition with multiple animated layers around the industry's
 * semantic lucide glyph:
 *
 *   - 3 spinning orbital ellipses (different angles / speeds /
 *     dash patterns), each carrying a satellite dot
 *   - 4 pulsing sparkle particles around the icon
 *   - Multi-stop pulsing inner glow disk
 *   - Outer arc partial-ring with gradient fade
 *   - Central lucide industry glyph (semantic — Shield for Insurance,
 *     Globe for Global Delivery, …) with double drop-shadow glow
 *   - Background scanlines / pulse waves for depth
 */

interface Props {
  icon: LucideIcon;
  color: string;
}

export const CosmicIndustryIcon = React.memo(({ icon: Icon, color }: Props) => {
  // Unique gradient id per instance so the SVG defs don't collide when
  // multiple cards render side-by-side.
  const uid = React.useId();

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ color }}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="currentColor"
      >
        <defs>
          {/* Linear gradient for the orbital rings — fades in/out so each
              orbit reads as a thin arc rather than a flat ellipse. */}
          <linearGradient id={`${uid}-orbit`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0" />
            <stop offset="20%"  stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="50%"  stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="80%"  stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          {/* Radial glow under the icon — pulses subtly. */}
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.45" />
            <stop offset="45%"  stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          {/* White-hot satellite glow */}
          <radialGradient id={`${uid}-sat`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="60%"  stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background pulse disc — large soft halo behind everything */}
        <circle cx="50" cy="50" r="40" fill={`url(#${uid}-core)`}>
          <animate attributeName="r"    values="38;44;38" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3.5s" repeatCount="indefinite" />
        </circle>

        {/* Outermost orbit — slow CW, satellite + tail */}
        <g style={{ transformOrigin: '50px 50px', animation: 'spin 18s linear infinite' }}>
          <ellipse cx="50" cy="50" rx="46" ry="15" stroke={`url(#${uid}-orbit)`} strokeWidth="0.8" />
          {/* Satellite dot at one end of the orbit */}
          <circle cx="96" cy="50" r="2.5" fill={`url(#${uid}-sat)`} stroke="none" />
          <circle cx="96" cy="50" r="1.2" fill="#ffffff" stroke="none" />
          {/* Trail behind the satellite */}
          <path d="M 90 50 Q 86 52 84 53" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.6" strokeLinecap="round" />
        </g>

        {/* Mid orbit — dashed, CCW, tilted 60° */}
        <g
          transform="rotate(60 50 50)"
          style={{ transformOrigin: '50px 50px', animation: 'spin 24s linear infinite reverse' }}
        >
          <ellipse cx="50" cy="50" rx="42" ry="14" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="2 1.6" />
          <circle cx="8" cy="50" r="1.6" fill="currentColor" stroke="none" />
        </g>

        {/* Inner orbit — fast CCW, tilted -55° */}
        <g
          transform="rotate(-55 50 50)"
          style={{ transformOrigin: '50px 50px', animation: 'spin 9s linear infinite reverse' }}
        >
          <ellipse cx="50" cy="50" rx="36" ry="12" stroke={`url(#${uid}-orbit)`} strokeWidth="0.7" />
          <circle cx="14" cy="50" r="1.4" fill="#ffffff" stroke="none" />
        </g>

        {/* Sparkle particles around the icon — 4 ping dots */}
        <circle cx="18" cy="18" r="0.9" fill="currentColor" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" begin="0s"   repeatCount="indefinite" />
        </circle>
        <circle cx="82" cy="22" r="0.7" fill="#ffffff" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.6s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="84" cy="80" r="0.9" fill="currentColor" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.0s" begin="1.0s" repeatCount="indefinite" />
        </circle>
        <circle cx="16" cy="82" r="0.7" fill="#ffffff" stroke="none">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" begin="1.4s" repeatCount="indefinite" />
        </circle>

        {/* Outer arc — partial ring at top-right, scanline-style */}
        <path d="M 88 30 A 40 40 0 0 1 92 58" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M 12 70 A 40 40 0 0 1 8 42" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" strokeLinecap="round" />

        {/* Central crisp disk under the icon (multi-stroke for depth) */}
        <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.10" stroke="none" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.7" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" strokeDasharray="1.2 1.4" />
      </svg>

      {/* Central industry glyph — kept semantic (Shield/Globe/Target/…) so
          users still read the card at a glance. */}
      <Icon
        className="relative z-10 w-11 h-11 md:w-12 md:h-12 text-white"
        strokeWidth={1.5}
        style={{ filter: `drop-shadow(0 0 9px ${color}) drop-shadow(0 0 22px ${color}aa)` }}
      />
    </div>
  );
});

CosmicIndustryIcon.displayName = 'CosmicIndustryIcon';
