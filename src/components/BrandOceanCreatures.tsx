import { motion } from 'framer-motion';
import React from 'react';

const OceanAsset = ({ title, children, className = "", pure }: { title: string, children: React.ReactNode, className?: string, pure?: boolean }) => {
  if (pure) {
    return <>{children}</>;
  }
  return (
    <div className={`p-8 relative rounded-3xl border border-white/10 flex flex-col justify-center items-center overflow-hidden h-[300px] group ${className}`}>
      <div className="absolute inset-0 bg-[#001021]" />
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        {children}
      </div>
      <div className="absolute bottom-4 left-4 z-20 text-blue-300/70 font-mono text-xs uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-md">
        {title}
      </div>
    </div>
  );
};

export const Medusa = ({ pure }: { pure?: boolean } = {}) => (
  <OceanAsset title="Medusa (Jellyfish)" pure={pure}>
    <motion.div
      animate={{ y: [-15, 15, -15], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex flex-col items-center"
    >
      {/* Bell */}
      <div className="w-24 h-24 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,255,0.4),_transparent)] rounded-t-full border border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,255,0.4)] relative overflow-hidden backdrop-blur-sm">
         <motion.div 
           className="absolute inset-0 border-b-2 border-cyan-400/80 rounded-full"
           animate={{ scaleX: [1, 1.1, 1], y: [0, -5, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
      </div>
      {/* Tentacles */}
      <div className="flex gap-2 relative -mt-4">
        {[...Array(6)].map((_, i) => (
          <motion.svg key={`tentacle-${i}`} width="10" height="100" className="opacity-70">
            <motion.path
               d={`M5,0 Q${Math.random() * 20 - 5},20 5,40 T5,80 T5,100`}
               fill="none"
               stroke="rgba(0, 255, 255, 0.6)"
               strokeWidth="2"
               animate={{ d: [
                 `M5,0 Q${Math.random() * 20 - 5},20 5,40 T5,80 T5,100`,
                 `M5,0 Q${Math.random() * -10},30 5,60 T5,90 T5,100`,
                 `M5,0 Q${Math.random() * 20 - 5},20 5,40 T5,80 T5,100`
               ]}}
               transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        ))}
      </div>
    </motion.div>
  </OceanAsset>
);

export const Dolphin = ({ pure }: { pure?: boolean } = {}) => (
  <OceanAsset title="Dolphin" pure={pure}>
    <motion.div
      animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-32 h-16 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
    >
      <svg viewBox="0 0 100 50" className="w-full h-full fill-blue-500/80 stroke-blue-300">
         <path d="M10,30 Q30,10 60,20 Q80,25 90,40 Q75,30 60,35 Q40,40 10,30 Z" />
         <path d="M40,15 L45,5 L50,18 Z" className="fill-blue-600/80" />
         <path d="M10,30 Q5,25 0,35 L10,38 Z" className="fill-blue-600/80" />
      </svg>
    </motion.div>
  </OceanAsset>
);

export const Octopus = ({ pure }: { pure?: boolean } = {}) => (
  <OceanAsset title="Octopus" pure={pure}>
    <motion.div
      animate={{ y: [-5, 5, -5], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className="w-20 h-20 bg-[radial-gradient(circle,_rgba(255,0,128,0.4),_transparent)] rounded-full border border-pink-500/50 shadow-[0_0_30px_rgba(255,0,128,0.4)] backdrop-blur-sm self-center justify-self-center mx-auto relative z-10" />
      <div className="flex gap-1 justify-center -mt-6">
        {[...Array(8)].map((_, i) => (
          <motion.div
             key={`arm-${i}`}
             className="w-2 h-20 bg-pink-500/60 rounded-full origin-top relative"
             style={{ transformOrigin: 'top center' }}
             animate={{ rotate: [i % 2 === 0 ? -20 : 20, i % 2 === 0 ? 20 : -20, i % 2 === 0 ? -20 : 20], scaleY: [1, 1.2, 1] }}
             transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  </OceanAsset>
);

export const HardCoral = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Hard Coral" pure={pure}>
      <div className="relative bottom-[-20px] drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">
        <svg viewBox="0 0 100 100" className="w-32 h-32 fill-orange-500/80 stroke-orange-300">
           <path d="M50,100 L50,60 M50,60 L30,40 M30,40 L20,30 M30,40 L40,20 M50,60 L70,35 M70,35 L85,25 M70,35 L60,15 M50,75 L20,60 M50,85 L80,70" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </OceanAsset>
);

export const SoftCoral = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Soft Coral" pure={pure}>
        <div className="relative bottom-[-20px]">
          <div className="flex gap-2 items-end justify-center h-32">
              {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-3 bg-gradient-to-t from-purple-800 to-purple-400 rounded-t-full origin-bottom"
                    style={{ height: 40 + Math.random() * 60 }}
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 3 + Math.random()*2, repeat: Infinity, ease: "easeInOut" }}
                  />
              ))}
          </div>
        </div>
    </OceanAsset>
);

export const Crab = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Crab" pure={pure}>
      <motion.div
        animate={{ x: [-10, 10, -10], rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-24 h-16 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
      >
        <svg viewBox="0 0 100 60" className="w-full h-full fill-red-500/90 stroke-red-300">
           <ellipse cx="50" cy="30" rx="30" ry="20" />
           {/* Claws */}
           <path d="M25,25 Q10,10 20,5 Q30,15 25,25" />
           <path d="M75,25 Q90,10 80,5 Q70,15 75,25" />
           {/* Legs */}
           <path d="M25,40 Q10,50 15,60" fill="none" strokeWidth="3" />
           <path d="M35,45 Q20,60 25,70" fill="none" strokeWidth="3" />
           <path d="M75,40 Q90,50 85,60" fill="none" strokeWidth="3" />
           <path d="M65,45 Q80,60 75,70" fill="none" strokeWidth="3" />
           {/* Eyes */}
           <circle cx="40" cy="15" r="3" fill="#fff" />
           <circle cx="60" cy="15" r="3" fill="#fff" />
        </svg>
      </motion.div>
    </OceanAsset>
);

export const Seahorse = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Seahorse" pure={pure}>
       <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-16 h-32 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
      >
        <svg viewBox="0 0 50 100" className="w-full h-full fill-yellow-400/80 stroke-yellow-200">
           <path d="M35,20 Q40,10 30,5 Q20,10 20,20 Q15,30 25,40 Q10,60 20,80 Q25,90 10,95 Q35,105 35,80 Q35,60 40,50 Q45,35 35,20" />
           {/* Eye */}
           <circle cx="28" cy="12" r="2" fill="#000" />
        </svg>
      </motion.div>
    </OceanAsset>
);

export const Shark = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Shark" pure={pure}>
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-40 h-20 drop-shadow-[0_0_15px_rgba(156,163,175,0.5)]"
      >
         <svg viewBox="0 0 120 60" className="w-full h-full fill-gray-400 stroke-gray-200">
             <path d="M10,40 Q30,20 70,30 Q100,35 110,45 Q90,40 70,45 Q30,50 10,40 Z" />
             <path d="M50,26 L60,5 L65,28 Z" className="fill-gray-500" />
             <path d="M10,40 Q0,30 5,20 L15,35 Z" className="fill-gray-500" />
             <path d="M10,40 Q0,50 5,60 L15,45 Z" className="fill-gray-500" />
         </svg>
      </motion.div>
    </OceanAsset>
);

export const BioluminescentFish = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Fish" pure={pure}>
        <motion.div
            animate={{ x: [-15, 15, -15], y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-20 h-12"
        >
            <svg viewBox="0 0 60 40" className="w-full h-full fill-emerald-400/80 stroke-emerald-200 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">
                <path d="M10,20 Q30,10 50,20 Q30,30 10,20 Z" />
                <path d="M10,20 L0,10 L5,20 L0,30 Z" className="fill-emerald-600/80" />
                <circle cx="40" cy="18" r="2" fill="#fff" />
            </svg>
        </motion.div>
    </OceanAsset>
);

export const Mollusc = ({ pure }: { pure?: boolean } = {}) => (
    <OceanAsset title="Mollusc (Shell)" pure={pure}>
        <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 drop-shadow-[0_0_15px_rgba(216,180,229,0.6)]"
        >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-fuchsia-300/80 stroke-fuchsia-100">
                <path d="M50,90 Q10,70 20,40 Q30,10 50,20 Q70,10 80,40 Q90,70 50,90" />
                <path d="M50,90 L20,40 M50,90 L35,25 M50,90 L65,25 M50,90 L80,40" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            </svg>
        </motion.div>
    </OceanAsset>
);

export const OceanGallery = () => {
  return (
    <section className="relative z-10 pt-16 border-t border-white/5">
      <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Deep Ocean Ecosystem</h2>
      <p className="text-white/60 mb-8 max-w-3xl">Animated bioluminescent marine life and ocean formations used in aquatic themes.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <Medusa />
        <Dolphin />
        <Octopus />
        <HardCoral />
        <SoftCoral />
        <Crab />
        <Seahorse />
        <Shark />
        <BioluminescentFish />
        <Mollusc />
      </div>
    </section>
  );
};
