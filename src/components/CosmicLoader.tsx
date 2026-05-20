import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import Assets
import { Medusa, BioluminescentFish } from './BrandOceanCreatures';
import { DnaHelix, WaterMolecule } from './BrandMicroscopicObjects';

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
    }, 10000);
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

      {/* Ocean/Molecular Assets */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        {/* Top left */}
        <div className="absolute top-[10%] left-[10%] opacity-30 scale-75 blur-[2px]">
          <Medusa />
        </div>
        {/* Bottom right */}
        <div className="absolute bottom-[10%] right-[10%] opacity-30 scale-75 blur-[2px]">
          <BioluminescentFish />
        </div>
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
              <AnimatePresence mode="wait">
                <motion.span
                  key={logoState}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.5 }}
                  className="text-emerald-400 flex items-center"
                >
                  {getAnimatedPart()}
                </motion.span>
              </AnimatePresence>
              <span className="ml-1 uppercase">Scope</span>
              <span className="text-2xl md:text-4xl text-white/50 ml-1">.ai</span>
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
