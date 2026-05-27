import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * CosmicIndustryIcon
 *
 * Mirrors the Pricing tier icon look-and-feel (clean, no halo bubble,
 * orbits + satellites + central glow) but keeps the industry's lucide
 * glyph as the central semantic element (Shield for Insurance, Globe
 * for Global Delivery, …).
 *
 * Per Katia: "ці іконки треба замінити щоб були по стилю як ті що ти
 * робив для цін" — same visual language as /pricing tier badges.
 */

interface Props {
  icon: LucideIcon;
  color: string;
}

export const CosmicIndustryIcon = React.memo(({ icon: Icon, color }: Props) => {
  // Tailwind-arbitrary `style={{ '--c': color }}` so the same CSS rules
  // pick up the per-industry brand colour without baking colour into class.
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ color }}>
      {/* Orbits / satellites — pure SVG, no halo bubble */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="currentColor"
      >
        {/* Outer orbit — slow CW */}
        <g style={{ transformOrigin: '50px 50px', animation: 'spin 14s linear infinite' }}>
          <ellipse cx="50" cy="50" rx="44" ry="14" strokeOpacity="0.45" strokeWidth="0.7" />
          <circle cx="94" cy="50" r="2.2" fill="currentColor" stroke="none" />
        </g>
        {/* Mid orbit — dashed CCW */}
        <ellipse
          cx="50" cy="50" rx="44" ry="14"
          strokeOpacity="0.30"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          transform="rotate(60 50 50)"
          style={{ transformOrigin: '50px 50px', animation: 'spin 22s linear infinite reverse' }}
        />
        {/* Inner orbit — faster CCW with a small white satellite */}
        <g
          transform="rotate(-60 50 50)"
          style={{ transformOrigin: '50px 50px', animation: 'spin 8s linear infinite reverse' }}
        >
          <ellipse cx="50" cy="50" rx="44" ry="14" strokeOpacity="0.35" strokeWidth="0.55" />
          <circle cx="6" cy="50" r="1.8" fill="#ffffff" stroke="none" style={{ filter: `drop-shadow(0 0 4px currentColor)` }} />
        </g>
        {/* Central glow disk under the icon — sharp, no fade */}
        <circle cx="50" cy="50" r="14" fill="currentColor" fillOpacity="0.18" stroke="none" />
        <circle cx="50" cy="50" r="14" strokeOpacity="0.6" strokeWidth="0.7" />
      </svg>

      {/* Central industry glyph */}
      <Icon
        className="relative z-10 w-12 h-12 md:w-14 md:h-14 text-white"
        strokeWidth={1.4}
        style={{ filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 22px ${color}aa)` }}
      />
    </div>
  );
});

CosmicIndustryIcon.displayName = 'CosmicIndustryIcon';
