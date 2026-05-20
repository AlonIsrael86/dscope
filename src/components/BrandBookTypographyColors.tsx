import React from 'react';
import { motion } from 'framer-motion';

export const BrandBookTypographyColors = () => {
  return (
    <section className="relative z-10 pt-16 border-t border-white/5 pb-20">
      <h2 className="text-3xl font-display font-bold mb-10 pb-4 border-b border-white/10 text-[#4facfe] drop-shadow-[0_0_15px_rgba(79,172,254,0.5)]">
        Design System
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Colors */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-6 text-white">Color Palette</h3>
          <p className="text-white/60 mb-8">
            Our color palette is inspired by deep space, bioluminescence, and futuristic interfaces. 
            We rely on high-contrast neon accents against pitch-black backgrounds.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Dark Backgrounds */}
            <div className="flex flex-col gap-2">
              <div className="w-full h-24 rounded-2xl bg-[#010610] border border-white/10 shadow-lg"></div>
              <div className="font-mono text-xs uppercase text-white/50">Deep Void</div>
              <div className="font-mono text-[10px] text-white/30">#010610</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full h-24 rounded-2xl bg-[#020617] border border-white/10 shadow-lg"></div>
              <div className="font-mono text-xs uppercase text-white/50">Cosmic Slate</div>
              <div className="font-mono text-[10px] text-white/30">#020617</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full h-24 rounded-2xl bg-[#05101a] border border-white/10 shadow-lg"></div>
              <div className="font-mono text-xs uppercase text-white/50">Abyssal Blue</div>
              <div className="font-mono text-[10px] text-white/30">#05101a</div>
            </div>
            
            {/* Primary Accents */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="w-full h-24 rounded-2xl bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]"></div>
              <div className="font-mono text-xs uppercase text-blue-400">Electric Blue</div>
              <div className="font-mono text-[10px] text-blue-400/50">#3B82F6</div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="w-full h-24 rounded-2xl bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]"></div>
              <div className="font-mono text-xs uppercase text-emerald-400">Bio Emerald</div>
              <div className="font-mono text-[10px] text-emerald-400/50">#34D399</div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="w-full h-24 rounded-2xl bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
              <div className="font-mono text-xs uppercase text-purple-400">Plasma Purple</div>
              <div className="font-mono text-[10px] text-purple-400/50">#A855F7</div>
            </div>
            
            {/* Secondary Gradients */}
            <div className="flex flex-col gap-2 mt-4 col-span-2 sm:col-span-3">
              <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#4facfe] to-[#00f2fe] border border-white/10"></div>
              <div className="font-mono text-xs uppercase text-white/50">Data Stream Gradient</div>
              <div className="font-mono text-[10px] text-white/30">from-[#4facfe] to-[#00f2fe]</div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-6 text-white">Typography Treatments</h3>
          <p className="text-white/60 mb-8">
            Our typography combines bold, high-contrast display fonts for impact with structured, 
            monospaced fonts for data and technical realism.
          </p>

          <div className="space-y-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
              <div className="font-mono text-[10px] uppercase tracking-widest text-blue-400 mb-4">Display Heads - Space Grotesk / Inter</div>
              <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase italic leading-none text-white">
                DeltaScope
              </h1>
              <p className="mt-4 text-sm text-white/50">Used for hero sections, massive numbers, and intense visual breaks. Black, uppercase, tight tracking.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
              <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 mb-4">Section Headers - Inter</div>
              <h2 className="text-3xl font-display font-bold text-white drop-shadow-md">
                Orchestrating the Future
              </h2>
              <p className="mt-4 text-sm text-white/50">Used for section boundaries and content grouping. Bold, legible, slight drop shadows for depth.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
               <div className="font-mono text-[10px] uppercase tracking-widest text-purple-400 mb-4">Functional & Technical - Mono</div>
               <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/80 p-4 bg-black/50 rounded-xl border border-white/5 inline-block">
                 SYS.INIT_SEQUENCE [OK]
               </div>
               <p className="mt-4 text-sm text-white/50">Used for metadata, small labels, UI functional elements, and code traces. Wide letter-spacing, uppercase.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
