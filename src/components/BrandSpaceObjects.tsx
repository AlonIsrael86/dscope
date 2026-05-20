import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AstronautFigure = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.div 
      animate={{ 
        y: isHovered ? [-5, -15, -5] : [0, -5, 0],
        x: isHovered ? [0, 10, 0] : [0, 2, 0],
        rotate: isHovered ? [0, 15, 0] : [0, 5, 0]
      }}
      transition={{ duration: isHovered ? 4 : 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-40px] top-[-40px] md:right-[-60px] md:top-[-60px] z-30 pointer-events-none"
    >
      <div className="relative w-8 h-8 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        {/* Suit Body */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-inner overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-200/50" />
        </div>
        {/* Helmet Visor */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-4 md:w-8 md:h-5 rounded-lg bg-gradient-to-b from-yellow-400 to-orange-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
          {/* Visor Reflection */}
          <div className="absolute top-1 left-1 w-3 h-1 bg-white/40 rounded-full rotate-[-15deg]" />
        </div>
        {/* Backpack / Life Support */}
        <div className="absolute top-1 -right-2 w-3 h-6 bg-gray-300 rounded-sm border border-gray-400 shadow-md" />
        {/* Tether */}
        <svg className="absolute top-[50%] right-[100%] w-24 h-24 overflow-visible">
          <motion.path
            d="M 0 0 C -20 20, -40 0, -60 40"
            fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 1"
            animate={{ d: ["M 0 0 C -20 20, -40 0, -60 40", "M 0 0 C -30 10, -30 10, -60 40", "M 0 0 C -20 20, -40 0, -60 40"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export const SpaceObjectRenderer = ({ type }: { type: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Common styles
  const coreClass = "absolute bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-blue-400/50 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center overflow-hidden z-10";
  const noiseElement = (
    <>
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </>
  );

  const GoldFoilTexture = () => (
    <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)', backgroundSize: '4px 4px' }} />
  );

  const solarGradient = "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #172554 100%)";

  const Wrapper = ({ children, isHovered }: any) => (
    <motion.div 
      className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        scale: isHovered ? 1.15 : [1, 1.05, 1],
      }}
      transition={{ 
        duration: isHovered ? 0.3 : 4,
        repeat: isHovered ? 0 : Infinity,
        ease: "easeInOut" 
      }}
    >
      {/* Subtle pulse ring on hover */}
      <AnimatePresence>
         {isHovered && (
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: [0.1, 0.4, 0], scale: [1, 1.4, 1.8] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"
           />
         )}
      </AnimatePresence>
      {children}
    </motion.div>
  );

  switch (type) {
    case 'satellite':
      return (
        <Wrapper isHovered={isHovered}>
           <AstronautFigure isHovered={isHovered} />
           <div className={`w-16 h-16 md:w-24 md:h-24 ${coreClass}`}>
             {noiseElement}
             <GoldFoilTexture />
             <div className="w-10 h-10 md:w-14 md:h-14 bg-black/80 rounded-full border border-blue-500/30 flex items-center justify-center relative z-20 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-transparent" />
               <div className="w-4 h-4 bg-blue-500/40 rounded-full blur-sm" />
             </div>
             <div className="absolute top-0 w-1 h-8 bg-blue-400/60 -translate-y-1/2 z-30" />
             <div className="absolute left-0 h-1 w-8 bg-blue-400/60 -translate-x-1/2 z-30" />
           </div>
           {/* Solar Arrays */}
           <div className="absolute left-[-60px] md:left-[-100px] w-24 md:w-40 h-32 md:h-40 flex flex-col gap-2 z-0">
             {[...Array(6)].map((_, i) => (
               <div key={`left-panel-${i}`} className="flex-1 border border-blue-400/40 rounded-md relative overflow-hidden transition-colors" style={{ background: solarGradient }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
               </div>
             ))}
           </div>
           <div className="absolute right-[-60px] md:right-[-100px] w-24 md:w-40 h-32 md:h-40 flex flex-col gap-2 z-0">
             {[...Array(6)].map((_, i) => (
               <div key={`right-panel-${i}`} className="flex-1 border border-blue-400/40 rounded-md relative overflow-hidden transition-colors" style={{ background: solarGradient }}>
                  <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent" />
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
               </div>
             ))}
           </div>
        </Wrapper>
      );
    case 'starlink':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-20 h-12 md:w-32 md:h-16 ${coreClass}`}>
               {noiseElement}
               <div className="absolute inset-0 bg-zinc-800/50" />
               <div className="flex gap-2 relative z-20">
                 <div className="w-4 h-4 bg-emerald-500/80 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <div className="w-4 h-4 bg-emerald-500/80 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <div className="w-4 h-4 bg-emerald-500/80 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               </div>
             </div>
             {/* Wide single solar array */}
             <div className="absolute bottom-[20%] w-32 md:w-60 h-16 md:h-24 flex gap-1 z-0">
               {[...Array(12)].map((_, i) => (
                 <div key={`starlink-panel-${i}`} className="flex-1 border border-blue-400/50 rounded-sm relative overflow-hidden" style={{ background: solarGradient }}>
                    <div className="absolute inset-0 bg-white/5" />
                 </div>
               ))}
             </div>
             <div className="absolute top-[20%] w-1.5 h-12 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-full shadow-lg" />
          </Wrapper>
        );
    case 'telescope':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-16 h-32 md:w-24 md:h-48 rounded-t-full ${coreClass} border-b-0`}>
               {noiseElement}
               <GoldFoilTexture />
               <div className="absolute top-4 w-12 h-12 md:w-16 md:h-16 bg-black/90 rounded-full border-4 border-zinc-700 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] opacity-50" />
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/40 to-transparent blur-md" />
                 <div className="absolute w-2 h-2 bg-white rounded-full translate-x-1 translate-y-1 shadow-[0_0_10px_white]" />
               </div>
               {/* Details */}
               <div className="absolute top-1/2 w-full h-px bg-white/10" />
               <div className="absolute top-[60%] w-full h-px bg-white/10" />
             </div>
             <div className="absolute bottom-[-10px] w-24 h-8 md:w-32 md:h-12 bg-zinc-800 border-2 border-orange-400/50 rounded-xl overflow-hidden shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
             </div>
             <div className="absolute left-[-20px] bottom-[10px] w-12 h-24 border border-orange-400/30 transform skew-y-12 overflow-hidden rounded-sm" style={{ background: 'linear-gradient(to right, #78350f, #92400e)' }}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px)] background-size-[4px_4px]" />
             </div>
             <div className="absolute right-[-20px] bottom-[10px] w-12 h-24 border border-orange-400/30 transform -skew-y-12 overflow-hidden rounded-sm" style={{ background: 'linear-gradient(to left, #78350f, #92400e)' }}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px)] background-size-[4px_4px]" />
             </div>
          </Wrapper>
        );
    case 'probe':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-14 h-14 md:w-20 md:h-20 ${coreClass} !rounded-none rotate-45 relative z-10`}>
               {noiseElement}
               <GoldFoilTexture />
               <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-yellow-500/50 rounded-full flex items-center justify-center relative z-20">
                 <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
               </div>
             </div>
             <div className="absolute top-[-30px] md:top-[-50px] w-1 h-12 md:h-20 bg-gradient-to-b from-zinc-400 to-zinc-600 z-0">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 md:w-12 md:h-12 border-2 border-white/40 rounded-full border-b-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
             </div>
             <div className="absolute bottom-[-20px] w-8 h-8 bg-blue-500/30 rounded-full blur-xl" />
          </Wrapper>
        );
    case 'station':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-12 h-32 md:w-16 md:h-48 ${coreClass} !rounded-none z-20 overflow-visible`}>
               {noiseElement}
               <div className="flex flex-col gap-4 w-full h-full p-2 relative z-10">
                 <div className="w-full flex-1 bg-blue-900/40 rounded border border-blue-400/20 shadow-inner" />
                 <div className="w-full flex-1 bg-blue-900/40 rounded border border-blue-400/20 shadow-inner" />
                 <div className="w-full flex-1 bg-blue-900/40 rounded border border-blue-400/20 shadow-inner" />
               </div>
               {/* Flashing lights along core */}
               <div className="absolute left-0 inset-y-0 w-px flex flex-col justify-around py-4">
                 <div className="w-1 h-1 bg-red-500 rounded-full" />
                 <div className="w-1 h-1 bg-red-500 rounded-full" />
               </div>
             </div>
             {/* Left Ring */}
             <div className="absolute left-[8%] w-16 h-32 md:w-24 md:h-48 border-4 border-zinc-600 rounded-l-[100px] border-r-0 z-10 skew-y-6 shadow-2xl">
                <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-700" />
             </div>
             {/* Right Ring */}
             <div className="absolute right-[8%] w-16 h-32 md:w-24 md:h-48 border-4 border-zinc-600 rounded-r-[100px] border-l-0 z-10 -skew-y-6 shadow-2xl">
                <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-700" />
             </div>
             {/* Connecting tube */}
             <div className="absolute w-40 md:w-64 h-6 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 border-y border-zinc-600 z-10" />
          </Wrapper>
        );
    case 'relay':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-16 h-16 md:w-24 md:h-24 ${coreClass} !rounded-full relative z-20`}>
               {noiseElement}
               <GoldFoilTexture />
               <div className="w-8 h-8 md:w-12 md:h-12 bg-black/40 rounded-full flex flex-col items-center justify-center relative z-20">
                 <div className="w-full h-[1px] bg-red-500/50 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                 <div className="w-[1px] h-full bg-red-500/50 absolute shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
               </div>
             </div>
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-red-500/30 rounded-full z-10" />
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-40 h-40 md:w-60 md:h-60 border border-dotted border-blue-500/30 rounded-full z-0 opacity-50" />
          </Wrapper>
        );
    case 'buoy':
        return (
          <Wrapper isHovered={isHovered}>
             <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-1 h-[40%] bg-gradient-to-b from-white/40 to-transparent" />
             <div className={`w-20 h-20 md:w-28 md:h-28 ${coreClass} !rounded-t-3xl !rounded-b-lg relative z-10`}>
               {noiseElement}
               <GoldFoilTexture />
               <div className="w-12 h-6 bg-cyan-950/80 rounded-full border border-cyan-400/40 relative overflow-hidden z-20">
                 <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-4 bg-cyan-400/80 blur-md" />
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100%_4px]" />
               </div>
             </div>
             <div className="absolute top-[5%] w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red] z-20" />
             <div className="absolute top-[5%] w-8 h-8 border border-red-500/20 rounded-full animate-ping z-10" />
          </Wrapper>
        );
    case 'drone':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-24 h-16 md:w-36 md:h-24 ${coreClass} !rounded-3xl relative z-10`}>
               {noiseElement}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20" />
               <div className="w-10 h-10 bg-zinc-900 rounded-full border-2 border-zinc-700 flex items-center justify-center relative z-20 shadow-inner">
                 <div className="w-4 h-4 rounded-full bg-blue-500/80 shadow-[0_0_20px_blue]" />
                 <div className="absolute inset-0 rounded-full border border-blue-400/20" />
               </div>
             </div>
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} className="absolute顶-10 left-[10%] w-8 h-1 bg-gradient-to-r from-transparent via-zinc-400 to-transparent rounded-full shadow-lg" />
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} className="absolute顶-10 right-[10%] w-8 h-1 bg-gradient-to-r from-transparent via-zinc-400 to-transparent rounded-full shadow-lg" />
             <div className="absolute bottom-[10%] w-16 h-8 border-b-2 border-zinc-500/30 rounded-b-xl z-0" />
          </Wrapper>
        );
    case 'reactor':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-20 h-24 md:w-32 md:h-36 ${coreClass} !rounded-[2rem] relative z-10`}>
               {noiseElement}
               <div className="flex flex-col gap-2 w-full px-4 relative z-20">
                 <div className="h-2 bg-purple-900/60 rounded-full border border-purple-500/20" />
                 <div className="h-6 bg-purple-600/80 rounded-full shadow-[0_0_30px_purple] relative overflow-hidden">
                    <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1, repeat: Infinity }} className="absolute inset-y-0 w-8 bg-white/20 skew-x-12 blur-md" />
                 </div>
                 <div className="h-2 bg-purple-900/60 rounded-full border border-purple-500/20" />
               </div>
             </div>
             <div className="absolute w-28 h-6 md:w-40 md:h-8 border-2 border-purple-500/40 rounded-full z-0 rotate-[15deg]" />
             <div className="absolute w-28 h-6 md:w-40 md:h-8 border-2 border-purple-500/40 rounded-full z-0 rotate-[-15deg]" />
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 md:w-48 md:h-48 border border-white/5 rounded-full flex items-center justify-center z-0">
               <div className="w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_10px_purple] absolute top-0 -translate-y-1/2" />
               <div className="w-4 h-4 rounded-full bg-purple-400 shadow-[0_0_10px_purple] absolute bottom-0 translate-y-1/2" />
             </motion.div>
          </Wrapper>
        );
    case 'warpgate':
        return (
          <Wrapper isHovered={isHovered}>
             <div className={`w-40 h-40 md:w-56 md:h-56 ${coreClass} !rounded-full bg-transparent border-4 border-blue-500/40 !from-transparent !to-transparent flex items-center justify-center p-2 relative`}>
               {noiseElement}
               <div className="w-full h-full rounded-full border-4 border-dashed border-cyan-400/30 relative flex items-center justify-center overflow-hidden">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,0.2),transparent,rgba(168,85,247,0.2),transparent)]" />
                 <div className="absolute inset-0 bg-black/60 shadow-inner" />
                 {/* Internal Swirl */}
                 <motion.div animate={{ rotate: -360, scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[120%] h-[120%] opacity-20" style={{ backgroundImage: 'radial-gradient(ellipse at center, transparent 30%, #3b82f6 70%)', backgroundSize: '100% 100%' }} />
                 <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-purple-600/40 to-blue-500/40 blur-2xl relative z-20" />
               </div>
               {/* Magnetic Shrouds */}
               {[0, 120, 240].map(angle => (
                 <div key={angle} className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-8 h-4 bg-zinc-800 border-2 border-zinc-600 rounded-lg shadow-xl" />
                 </div>
               ))}
             </div>
             <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20 pointer-events-none blur-[1px]" />
          </Wrapper>
        );
    default:
      return null;
  }
};

export const BoomableSpaceObject = ({ type, hideLabel = false }: { type: string, hideLabel?: boolean }) => {
  const [isBooming, setIsBooming] = useState(false);

  const handleBoom = () => {
    if (isBooming) return;
    setIsBooming(true);
    setTimeout(() => setIsBooming(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center gap-4 group">
      <motion.div
        onClick={handleBoom}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
      >
         {/* Visual Boom Effect */}
        <AnimatePresence>
          {isBooming && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[100px] h-[100px] rounded-full border-[10px] border-blue-400 shadow-[0_0_100px_rgba(59,130,246,0.8)]" />
            </motion.div>
          )}
        </AnimatePresence>

        <SpaceObjectRenderer type={type} />
      </motion.div>
      {!hideLabel && (
        <div className="text-sm font-mono text-blue-400/60 uppercase tracking-widest">{type}</div>
      )}
    </div>
  );
};
