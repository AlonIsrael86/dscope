import React from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

/**
 * CosmicIndustryIcon
 *
 * Wraps a stock lucide industry icon (Shield, Globe, Target, …) in cosmic
 * decoration so each industry tile reads like a tiny solar system, while
 * the central glyph keeps the original semantic meaning the user expects:
 *
 *   - Pulsing halo in the area's brand color (the "atmosphere")
 *   - Subtle outer ring (the "exosphere")
 *   - Dashed mid-orbit ring rotating opposite to the satellites
 *   - Two orbital satellites at different radii and speeds
 *     (outer color dot + inner white-hot dot)
 *   - The lucide icon at the center with a layered drop-shadow glow
 *
 * Same idea, cosmic execution — per Katia.
 */

interface Props {
  icon: LucideIcon;
  color: string;
}

export const CosmicIndustryIcon = React.memo(({ icon: Icon, color }: Props) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Atmosphere — pulsing halo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}55 0%, ${color}1f 42%, transparent 75%)`,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Static outer ring — exosphere */}
      <div
        className="absolute w-[92%] h-[92%] rounded-full border opacity-25"
        style={{ borderColor: color }}
      />

      {/* Outer orbit — slow CW satellite (brand color) */}
      <motion.div
        className="absolute w-[88%] h-[88%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}77`,
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Mid dashed orbital ring (CCW) */}
      <motion.div
        className="absolute w-[72%] h-[72%] rounded-full border border-dashed"
        style={{ borderColor: `${color}66` }}
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner orbit — faster CCW satellite (white-hot) */}
      <motion.div
        className="absolute w-[60%] h-[60%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: `0 0 8px #ffffff, 0 0 16px ${color}`,
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Central industry glyph — original lucide icon, cosmic glow */}
      <Icon
        className="relative z-10 w-14 h-14 md:w-16 md:h-16 text-white"
        strokeWidth={1.3}
        style={{
          filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 18px ${color}aa)`,
        }}
      />
    </div>
  );
});

CosmicIndustryIcon.displayName = 'CosmicIndustryIcon';
