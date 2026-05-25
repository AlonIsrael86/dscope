import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import Assets — only the abstract scientific ones; ocean creatures
// (Medusa, BioluminescentFish) were swapped for cosmic equivalents below
// per Katia: replace fish with something fitting the cosmic site style.
import { DnaHelix, WaterMolecule } from './BrandMicroscopicObjects';

/** Ringed planet — replaces the previous Medusa decoration. */
const RingedPlanet = () => (
  <svg viewBox="0 0 220 220" className="w-[180px] h-[180px]">
    <defs>
      <radialGradient id="ringedPlanetBody" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="55%" stopColor="#6d28d9" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </radialGradient>
      <radialGradient id="ringedPlanetHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(168,85,247,0.6)" />
        <stop offset="60%" stopColor="rgba(168,85,247,0.15)" />
        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
      </radialGradient>
      <linearGradient id="ringedPlanetRing" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="rgba(34,211,238,0)" />
        <stop offset="40%" stopColor="rgba(34,211,238,0.7)" />
        <stop offset="60%" stopColor="rgba(168,85,247,0.7)" />
        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
      </linearGradient>
    </defs>
    {/* Outer halo */}
    <circle cx="110" cy="110" r="100" fill="url(#ringedPlanetHalo)" />
    {/* Tilted ring (behind body) */}
    <g transform="rotate(-22 110 110)">
      <ellipse cx="110" cy="110" rx="100" ry="22" fill="none" stroke="url(#ringedPlanetRing)" strokeWidth="6" opacity="0.85" />
      <ellipse cx="110" cy="110" rx="92" ry="18" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    </g>
    {/* Planet body */}
    <circle cx="110" cy="110" r="54" fill="url(#ringedPlanetBody)" />
    {/* Subtle terminator highlight */}
    <circle cx="92" cy="92" r="14" fill="rgba(255,255,255,0.18)" />
    {/* Ring front edge */}
    <g transform="rotate(-22 110 110)">
      <path d="M 10 110 A 100 22 0 0 0 210 110" fill="none" stroke="url(#ringedPlanetRing)" strokeWidth="6" opacity="0.95" />
    </g>
  </svg>
);

/** Shooting comet with a glowing trail — replaces the previous BioluminescentFish. */
const ShootingComet = () => (
  <svg viewBox="0 0 240 140" className="w-[200px] h-[120px]">
    <defs>
      <linearGradient id="cometTrail" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(34,211,238,0)" />
        <stop offset="60%" stopColor="rgba(34,211,238,0.65)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
      </linearGradient>
      <radialGradient id="cometHead" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="rgba(125,211,252,0.9)" />
        <stop offset="100%" stopColor="rgba(34,211,238,0)" />
      </radialGradient>
    </defs>
    {/* Trail */}
    <path d="M 20 80 C 70 70, 130 64, 190 60" stroke="url(#cometTrail)" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M 40 86 C 90 78, 140 72, 188 64" stroke="url(#cometTrail)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M 60 94 C 110 84, 160 76, 192 68" stroke="url(#cometTrail)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    {/* Comet head */}
    <circle cx="195" cy="60" r="22" fill="url(#cometHead)" />
    <circle cx="195" cy="60" r="8" fill="#ffffff" />
    {/* A couple of sparks left behind */}
    <circle cx="80" cy="78" r="1.6" fill="#a5f3fc" opacity="0.8" />
    <circle cx="120" cy="70" r="1.2" fill="#ffffff" opacity="0.7" />
    <circle cx="155" cy="64" r="1.4" fill="#a5f3fc" opacity="0.85" />
  </svg>
);

export const CosmicLoader = () => {
  const [percent, setPercent] = useState(0);
  const [logoState, setLogoState] = useState(0); // 0: Delta sym, 1: D, 2: Delta, 3: auto

  useEffect(() => {
    const percentInterval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 40); // 40ms * 100 = 4000ms (matches app loading time)

    return () => clearInterval(percentInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoState((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getAnimatedPart = () => {
    switch (logoState) {
      case 0: return "Δ";
      case 1: return "D";
      case 2: return "Delta";
      case 3: return "auto";
      default: return "Δ";
    }
  };

  // Cycle accent color in lockstep with the symbol: green → blue → pink → ...
  const LOGO_COLORS = ['text-emerald-400', 'text-blue-400', 'text-pink-400'];
  const currentLogoColor = LOGO_COLORS[logoState % LOGO_COLORS.length];

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[1000] bg-[#00040a] flex items-center justify-center overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-50">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 blur-[180px] rounded-full animate-pulse [animation-delay:1s]" />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full border border-blue-300/20 bg-blue-400/5 backdrop-blur-sm"
            style={{
               width: 10 + Math.random() * 30,
               height: 10 + Math.random() * 30,
               left: `${Math.random() * 100}%`,
               bottom: '-10%',
            }}
            animate={{
               y: [0, -window.innerHeight - 200],
               x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
            }}
            transition={{
               duration: 8 + Math.random() * 10,
               repeat: Infinity,
               ease: "linear",
               delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Cosmic / Molecular Assets — corners */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        {/* Top left — ringed planet with a slow spin */}
        <motion.div
          className="absolute top-[8%] left-[8%] opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <RingedPlanet />
        </motion.div>
        {/* Bottom right — comet drifting across its corner */}
        <motion.div
          className="absolute bottom-[12%] right-[8%] opacity-50"
          animate={{ x: [-20, 12, -20], y: [4, -6, 4] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ShootingComet />
        </motion.div>
        {/* Top right */}
        <div className="absolute top-[15%] right-[15%] opacity-40 scale-50">
          <DnaHelix pure />
        </div>
        {/* Bottom left */}
        <div className="absolute bottom-[20%] left-[15%] opacity-40 scale-50">
          <WaterMolecule pure />
        </div>
      </div>

      {/* Main UI */}
      <div className="relative z-20 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo Name */}
          <div className="relative flex items-center gap-3 group p-2 -m-2 overflow-visible transition-all duration-500">
            <div className="flex items-center font-display font-black tracking-tighter text-6xl md:text-8xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <motion.span
                layout
                transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
                className="inline-flex items-center overflow-hidden leading-none py-[0.05em]"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={logoState}
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                    className={`${currentLogoColor} inline-block leading-none transition-colors duration-700`}
                  >
                    {getAnimatedPart()}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
              <motion.span layout transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }} className="ml-1 uppercase">Scope</motion.span>
            </div>
            
            {/* Glimmer Animation Sweep */}
            <motion.div 
              initial={{ x: '-100%', skewX: -45 }}
              animate={{ x: '200%' }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            />
          </div>

          {/* Progress Indicator */}
          <div className="flex flex-col items-center gap-3 w-64 md:w-80">
             <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
               <motion.div 
                 className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 rounded-full"
                 initial={{ width: 0 }}
                 animate={{ width: `${percent}%` }}
                 transition={{ ease: "linear", duration: 0.1 }}
               />
               <motion.div 
                 className="absolute top-0 left-0 bottom-0 bg-white/30"
                 initial={{ width: 0 }}
                 animate={{ width: `${percent}%`, x: [0, 50, 0] }}
                 transition={{ ease: "linear", duration: 1, repeat: Infinity }}
                 style={{ mixBlendMode: 'overlay' }}
               />
             </div>
             
             <div className="flex justify-between w-full text-[10px] sm:text-xs font-mono text-white/50 tracking-[0.2em] uppercase">
                <span className="flex items-center gap-2">
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }} 
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" 
                  />
                  Booting System
                </span>
                <span>{percent}%</span>
             </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
