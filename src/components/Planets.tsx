import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PLANETS_DATA } from '../data/planetsConstants';

export const RealisticPlanet = ({
  planet, className = "", isHoverable = true 
}: {
  planet: typeof PLANETS_DATA[0], className?: string, isHoverable?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`relative flex items-center justify-center rounded-full cursor-pointer group ${planet.sizeClass} ${className}`}
      onMouseEnter={() => isHoverable && setIsHovered(true)}
      onMouseLeave={() => isHoverable && setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 10 }}
      whileHover={{ scale: isHoverable ? 2 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Tooltip & Telescopic Lens Effect */}
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
          {/* Telescopic Target Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-[-50%] border border-blue-500/30 rounded-full pointer-events-none z-40 flex items-center justify-center"
          >
            <div className="absolute top-0 bottom-0 w-[1px] bg-blue-500/30" />
            <div className="absolute left-0 right-0 h-[1px] bg-blue-500/30" />
            {/* Lenses reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-blue-400/5 to-white/10 mix-blend-screen" />
          </motion.div>
        </>
      )}

      {/* Rings (if Saturn) behind or around */}
      {planet.hasRings && (
        <div className="absolute top-1/2 left-1/2 w-[250%] h-[20%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[100%] border-[1px] md:border-[2px] border-[#fcd34d]/40 shadow-[0_0_15px_rgba(251,191,36,0.2)] pointer-events-none flex items-center justify-center">
          <div className="w-[85%] h-[85%] rounded-[100%] border-[2px] md:border-[4px] border-[#d97706]/50 flex items-center justify-center">
            <div className="w-[85%] h-[85%] rounded-[100%] border-[3px] md:border-[6px] border-[#fef3c7]/60" />
          </div>
        </div>
      )}

      {/* Jupiter Moons */}
      {planet.hasMoons && (
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Io */}
          <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#fcd34d] shadow-[0_0_5px_rgba(252,211,77,0.8)]" />
          {/* Europa */}
          <div className="absolute top-[80%] left-[30%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f3f4f6]" />
          {/* Ganymede */}
          <div className="absolute top-[30%] right-[15%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#a8a29e]" />
          {/* Callisto */}
          <div className="absolute bottom-[20%] right-[30%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#57534e]" />
        </motion.div>
      )}

      {/* Subtle realistic grounding shadow beneath the planet */}
      <div className="absolute -bottom-[15%] left-[15%] right-[15%] h-[20%] rounded-[100%] bg-black/60 blur-[6px] md:blur-md pointer-events-none z-0 mix-blend-multiply" />

      {/* Planet Body — extra `0 0 0 1.5px rgba(255,255,255,0.22)` outline
          in the box-shadow stack gives the planet a clean silhouette
          even when the dark side blends into the black space backdrop
          (per Katia: «контур планет не всюди видно тому картинки наче
          обідрані»). Inset shadow softened from 0.9 → 0.7 so the lit
          side doesn't crush against the rim. */}
      <div className={`relative w-full h-full rounded-full overflow-hidden ${planet.baseBg} ${planet.id === 'uranus' ? 'blur-[1px]' : ''} shadow-[0_0_0_1.5px_rgba(255,255,255,0.22),0_0_30px_rgba(255,255,255,0.12),inset_-10px_-10px_20px_rgba(0,0,0,0.7)] z-10`}>
        {/* Rotating Texture Layer */}
        <motion.div 
          className="absolute inset-[-50%] w-[200%] h-[200%] rounded-full opacity-90 mix-blend-overlay"
          style={{ background: planet.texture }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100 + Math.random() * 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Polar caps for Mars specifically */}
        {planet.id === 'mars' && (
           <div className="absolute inset-0 rounded-full">
              <div className="absolute top-0 left-1/3 w-1/3 h-1/6 bg-white/70 blur-[2px] rounded-full mix-blend-lighten" />
              <div className="absolute bottom-0 left-1/3 w-1/3 h-1/6 bg-white/50 blur-[2px] rounded-full mix-blend-lighten" />
           </div>
        )}

        {/* Realistic Moon/Planet Surface Noise */}
        <div className={`absolute inset-0 opacity-40 mix-blend-color-burn ${planet.id === 'earth' ? 'opacity-80 mix-blend-soft-light' : ''}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")` }}></div>

        {/* Atmosphere / Cloud Layer (Slower rotation) */}
        {['venus', 'earth', 'jupiter', 'saturn'].includes(planet.id) && (
           <motion.div 
             className="absolute inset-[-20%] w-[140%] h-[140%] mix-blend-screen opacity-40"
             style={{ 
               background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.9) 70%, transparent 100%)',
               filter: 'blur(2px)'
             }}
             animate={{ rotate: -360 }}
             transition={{ duration: 150 + Math.random() * 60, repeat: Infinity, ease: "linear" }}
           />
        )}

        {/* Global Lighting & Shadow (Fixed position so light stays consistent) - custom phases */}
        {planet.id === 'venus' ? (
           <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.8)_0%,transparent_30%,rgba(0,0,0,0.95)_50%)] mix-blend-hard-light pointer-events-none" />
        ) : planet.id === 'mercury' ? (
           <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_10%_50%,rgba(255,255,255,0.5)_0%,transparent_40%,rgba(0,0,0,0.95)_80%)] mix-blend-hard-light pointer-events-none" />
        ) : (
           <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.6)_0%,transparent_50%,rgba(0,0,0,0.95)_85%)] mix-blend-hard-light pointer-events-none" />
        )}
        <div className={`absolute inset-0 rounded-full shadow-[inset_-15px_-15px_25px_rgba(0,0,0,0.9),inset_5px_5px_15px_rgba(255,255,255,0.3)] pointer-events-none ${planet.id === 'earth' ? 'shadow-[inset_-15px_-15px_25px_rgba(0,0,0,0.9),inset_5px_5px_15px_rgba(255,255,255,0.8)] mix-blend-overlay' : ''}`} />
      </div>

      {/* Front half of the ring for Saturn to create depth */}
      {planet.hasRings && (
         <div 
           className="absolute top-1/2 left-1/2 w-[250%] h-[20%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[100%] border-[1px] md:border-[2px] border-[#fcd34d]/80 shadow-[0_4px_15px_rgba(251,191,36,0.4)] pointer-events-none flex items-center justify-center" 
           style={{ zIndex: 10, clipPath: 'polygon(-20% 50%, 120% 50%, 120% 120%, -20% 120%)' }}
         >
          <div className="w-[85%] h-[85%] rounded-[100%] border-[2px] md:border-[4px] border-[#d97706]/90 flex items-center justify-center">
            <div className="w-[85%] h-[85%] rounded-[100%] border-[3px] md:border-[6px] border-[#fef3c7]" />
          </div>
         </div>
      )}
    </motion.div>
  );
};
