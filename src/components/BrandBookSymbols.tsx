import React, { useState } from 'react';
import { motion } from 'motion/react';

export const SYMBOLS = [
  { id: 'alpha', name: 'Alpha', path: 'M 50 10 L 10 90 L 90 90 Z M 50 40 L 75 90 L 25 90 Z', color: '#3b82f6' },
  { id: 'gamma', name: 'Gamma', path: 'M 20 10 L 80 10 L 80 30 L 50 30 L 50 90 L 30 90 L 30 30 L 20 30 Z', color: '#a855f7' },
  { id: 'figma', name: 'Figma', path: 'M 30 10 C 20 10 20 30 30 30 L 50 30 L 50 10 Z M 50 30 L 70 30 C 80 30 80 10 70 10 L 50 10 Z M 30 50 C 20 50 20 30 30 30 L 50 30 L 50 50 Z M 70 50 C 80 50 80 30 70 30 L 50 30 L 50 50 Z M 30 70 C 20 70 20 50 30 50 L 50 50 L 50 70 Z M 50 90 C 40 90 30 80 30 70 L 50 70 L 50 90 Z', color: '#ff7262' },
  { id: 'sigma', name: 'Sigma', path: 'M 20 10 L 80 10 L 80 25 L 45 50 L 80 75 L 80 90 L 20 90 L 20 75 L 50 50 L 20 25 Z', color: '#ef4444' },
  { id: 'delta', name: 'Delta', path: 'M 50 10 L 90 80 L 10 80 Z', color: '#4facfe' },
  { id: 'omega', name: 'Omega', path: 'M 30 80 C 10 80 10 20 50 20 C 90 20 90 80 70 80 L 90 80 L 90 95 L 70 95 C 60 95 60 80 60 80 C 60 60 40 60 40 80 C 40 80 40 95 30 95 L 10 95 L 10 80 Z', color: '#f59e0b' },
  { id: 'phi', name: 'Phi', path: 'M 50 10 L 50 90 M 30 50 A 20 25 0 1 1 70 50 A 20 25 0 1 1 30 50', color: '#ec4899' },
  { id: 'beta', name: 'Beta', path: 'M 30 10 H 60 C 75 10 75 45 60 45 H 30 M 30 45 H 65 C 80 45 80 90 65 90 H 30 M 30 10 V 90', color: '#06b6d4' },
  { id: 'theta', name: 'Theta', path: 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 M 20 50 H 80', color: '#10b981' },
  { id: 'psi', name: 'Psi', path: 'M 50 10 L 50 90 M 20 30 C 20 80 80 80 80 30', color: '#fb7185' },
  { id: 'phoenix', name: 'Phoenix', path: 'M 50 40 L 50 15 L 43 22 M 50 15 L 57 22 M 50 45 Q 25 20 15 10 Q 30 40 50 50 Q 75 40 85 10 Q 75 20 50 45 M 50 53 Q 30 38 22 30 Q 32 52 50 58 Q 68 52 78 30 Q 70 38 50 53 M 45 60 L 50 95 L 55 60 M 40 57 L 50 90 L 60 57', color: '#ff6b3d' }
];

export const BrandBookSymbols = () => {
  const [clickedSymbols, setClickedSymbols] = useState<Record<string, boolean>>({});

  const toggleSymbol = (id: string) => {
    setClickedSymbols(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative z-10 pt-16 border-t border-white/5 pb-20">
      <h2 className="text-3xl font-display font-bold mb-10 pb-4 border-b border-white/10 text-white">
        Logo Style Symbols
      </h2>
      <p className="text-white/60 mb-12 max-w-2xl text-lg">
        Abstract geometric symbols derived from Greek characters, optimized for high-contrast logo applications. Click on any icon below to hide its text and frame, showcasing only the glowing core vector path.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {SYMBOLS.map((symbol, index) => {
          const isHidden = !!clickedSymbols[symbol.id];
          return (
            <motion.div
              key={symbol.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
              onClick={() => toggleSymbol(symbol.id)}
            >
              <div 
                className={`relative w-32 h-32 flex items-center justify-center rounded-2xl transition-all duration-500 scale-100 active:scale-95 ${
                  isHidden 
                    ? 'bg-transparent border border-transparent shadow-none' 
                    : 'bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20'
                }`}
              >
                <svg viewBox="0 0 100 100" className="w-16 h-16 fill-none stroke-2 transition-all duration-500 select-none" style={{ stroke: symbol.color }}>
                  <motion.path 
                    d={symbol.path}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Glow effect */}
                <div 
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from),transparent_70%)] transition-opacity duration-500 ${
                    isHidden 
                      ? 'opacity-30 pointer-events-none' 
                      : 'opacity-0 group-hover:opacity-25'
                  }`} 
                  style={{ '--tw-gradient-from': symbol.color } as any} 
                />
              </div>
              <div className={`text-center transition-all duration-500 select-none ${
                isHidden ? 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden' : 'opacity-100 scale-100'
              }`}>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">SYM-{(index+1).toString().padStart(2, '0')}</span>
                <h3 className="text-sm font-display font-bold uppercase tracking-tighter transition-colors group-hover:text-white text-white/70">{symbol.name}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
