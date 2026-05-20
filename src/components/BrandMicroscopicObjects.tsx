import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';

const MicroAsset = ({ title, children, className = "", pure = false }: { title: string, children: React.ReactNode, className?: string, pure?: boolean }) => {
  if (pure) return <div className={`relative w-full h-full flex items-center justify-center ${className}`}>{children}</div>;
  return (
  <div className={`p-8 relative rounded-3xl border border-white/10 flex flex-col justify-center items-center overflow-hidden h-[300px] group ${className}`}>
    <div className="absolute inset-0 bg-[#00000a]" />
    <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
      {children}
    </div>
    <div className="absolute bottom-4 left-4 z-20 text-white/50 font-mono text-xs uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-md">
      {title}
    </div>
  </div>
  );
};

export const RotatingAtom = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="Carbon Atom" pure={pure}>
    <div className="relative w-20 h-20 flex items-center justify-center">
      <div className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] blur-[2px]" />
      <div className="absolute w-6 h-6 bg-red-500 rounded-full shadow-[0_0_20px_#ef4444] blur-[2px] translate-x-2" />
      <div className="absolute w-6 h-6 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981] blur-[2px] translate-y-2" />
      {[0, 60, 120].map((deg, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute top-1/2 left-1/2 w-48 h-16 border-2 border-white/10 rounded-[100%] -translate-x-1/2 -translate-y-1/2"
          style={{ rotate: deg }}
        >
          <motion.div 
            className="absolute top-[-5px] left-1/2 w-3 h-3 bg-yellow-300 rounded-full shadow-[0_0_12px_#fde047] -translate-x-1/2"
            animate={{ 
              rotate: [0, 360], 
              transformOrigin: '50% 32px' 
            }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ))}
    </div>
  </MicroAsset>
);

export const FloatingVirus = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="Pathogen Virion" pure={pure}>
    <motion.div
      className="w-32 h-32 rounded-full border-2 border-purple-500/80 shadow-[0_0_30px_rgba(168,85,247,0.6)] relative flex items-center justify-center bg-purple-900/20"
      animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-16 h-16 rounded-full bg-purple-500/30 blur-[5px]" />
      {[...Array(12)].map((_, j) => (
        <div 
          key={`spike-${j}`} 
          className="absolute w-1.5 h-6 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#e879f9]" 
          style={{ 
            transform: `rotate(${j * 30}deg) translateY(-18px)`,
            transformOrigin: '50% 34px'
          }}
        />
      ))}
    </motion.div>
  </MicroAsset>
);

export const DnaHelix = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="DNA Helix Sequence" pure={pure}>
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`base-pair-${i}`}
          className="absolute w-32 h-1 bg-white/20 flex justify-between items-center"
          style={{ top: '50%', marginTop: (i - 7) * 15 }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
        >
          <div className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] -ml-2" />
          <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] -mr-2" />
        </motion.div>
      ))}
    </div>
  </MicroAsset>
);

export const NeuralSynapse = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="Neural Synapse" pure={pure}>
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div 
        className="w-24 h-24 bg-cyan-900/40 rounded-[40%_60%_70%_30%] border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center"
        animate={{ 
          borderRadius: ['40% 60% 70% 30%', '60% 40% 30% 70%', '40% 60% 70% 30%'],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-8 rounded-full bg-cyan-400/80 blur-[2px]" />
      </motion.div>
      {[...Array(6)].map((_, i) => (
        <motion.div
           key={`dendrite-${i}`}
           className="absolute w-2 h-20 bg-gradient-to-t from-cyan-400/0 to-cyan-400/60 origin-bottom"
           style={{ transform: `rotate(${i * 60 + 30}deg) translateY(-40px)` }}
        >
           <motion.div 
             className="w-full h-4 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9]"
             animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
             transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
           />
        </motion.div>
      ))}
    </div>
  </MicroAsset>
);

export const WaterMolecule = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="H2O Molecule" pure={pure}>
    <div className="relative flex items-center justify-center h-full w-full">
      <motion.div 
        className="relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Oxygen */}
        <div className="w-20 h-20 bg-red-600 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),_0_0_20px_#ef4444] z-10" />
        {/* Hydrogen 1 */}
        <div className="absolute w-12 h-12 bg-white rounded-full shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3)] -top-6 -left-6" />
        <div className="absolute w-1 h-12 bg-white/30 -top-2 -left-2 rotate-45 transform origin-bottom-right" />
        {/* Hydrogen 2 */}
        <div className="absolute w-12 h-12 bg-white rounded-full shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3)] -top-6 -right-6" />
        <div className="absolute w-1 h-12 bg-white/30 -top-2 -right-2 -rotate-45 transform origin-bottom-left" />
      </motion.div>
    </div>
  </MicroAsset>
);

export const ElectronCloud = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="Electron Cloud" pure={pure}>
    <div className="relative w-full h-full flex items-center justify-center bg-[#050510]">
      <div className="w-10 h-10 bg-indigo-500 rounded-full shadow-[0_0_30px_#6366f1] blur-[2px]" />
      {[...Array(40)].map((_, i) => (
        <motion.div
           key={`electron-${i}`}
           className="absolute w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_8px_#93c5fd]"
           animate={{
             x: [(Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150],
             y: [(Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150],
             opacity: [0, 0.8, 0]
           }}
           transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "backInOut" }}
        />
      ))}
    </div>
  </MicroAsset>
);

export const ProbioticBacteria = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="Probiotic Bacillus" pure={pure}>
    <motion.div 
      className="relative w-40 h-16 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.4),_0_0_20px_#10b981] flex items-center justify-center overflow-hidden"
      animate={{ 
        rotate: [0, 5, -5, 0], 
        y: [0, -10, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }} />
      {/* Internal DNA strands */}
      <svg className="w-32 h-10 opacity-40">
         <motion.path 
           d="M 10 20 Q 30 10 50 20 T 90 20 T 130 20" 
           stroke="white" fill="none" strokeWidth="2"
           animate={{ d: ["M 10 20 Q 30 10 50 20 T 90 20 T 130 20", "M 10 20 Q 30 30 50 20 T 90 20 T 130 20"] }}
           transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
         />
      </svg>
    </motion.div>
  </MicroAsset>
);

export const RedBloodCell = ({ pure }: { pure?: boolean } = {}) => (
  <MicroAsset title="Erythrocyte" pure={pure}>
    <div className="relative w-full h-full flex items-center justify-center perspective-[800px]">
      <motion.div 
        className="w-32 h-32 bg-red-600 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8),_0_0_30px_rgba(220,38,38,0.6)]"
        animate={{ 
          rotateX: [0, 45, 0],
          rotateY: [0, 45, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-4 bg-red-700 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]" />
      </motion.div>
    </div>
  </MicroAsset>
);

export const MicroscopicGallery = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RotatingAtom />
      <FloatingVirus />
      <DnaHelix />
      <NeuralSynapse />
      <WaterMolecule />
      <ElectronCloud />
      <ProbioticBacteria />
      <RedBloodCell />
    </div>
  );
};
