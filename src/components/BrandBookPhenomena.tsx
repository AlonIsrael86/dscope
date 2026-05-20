import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Wind, Mountain, Rainbow, Flame, Droplets, Zap, ShieldAlert, Star, Sparkles, Target } from 'lucide-react';

const PHENOMENA = [
  { id: 'waves', name: 'Waves of Water', icon: Droplets, color: '#4facfe' },
  { id: 'rain', name: 'Rain & Wind', icon: CloudRain, color: '#a1c4fd' },
  { id: 'volcano', name: 'Volcanic Eruption', icon: Flame, color: '#ff4b1f' },
  { id: 'supernova', name: 'Supernova / Black Hole', icon: Target, color: '#c054ff' },
  { id: 'meteor', name: 'Meteor Shower', icon: Star, color: '#ffd194' }
];

export const BrandBookPhenomena = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const NoiseOverlay = ({ opacity = 0.2, blend = "mix-blend-overlay" }: { opacity?: number, blend?: string }) => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${blend}`} style={{ opacity }}>
      <filter id="zoneNoiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#zoneNoiseFilter)" />
    </svg>
  );

  // Fallback map since we don't have all icons from lucide imported cleanly, we'll map to existing ones 
  // Sparkles, Target not mapped above. (Oops! Will fix by inline importing or passing down)
  return (
    <section className="relative z-10 pt-16 border-t border-white/5 pb-20">
      <h2 className="text-3xl font-display font-bold mb-10 pb-4 border-b border-white/10 text-[#4facfe] drop-shadow-[0_0_15px_rgba(79,172,254,0.5)]">
        Natural Phenomena Zones
      </h2>
      <p className="text-white/60 mb-12 max-w-2xl text-lg">
        Interactive micro-environments showcasing real-time weather and astronomical events used in backgrounds.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PHENOMENA.map((zone, index) => {
          const Icon = zone.icon;
          
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onHoverStart={() => setActiveZone(zone.id)}
              onHoverEnd={() => setActiveZone(null)}
              className="relative rounded-3xl bg-black border border-white/10 overflow-hidden group aspect-[4/3] flex flex-col justify-end p-6 cursor-crosshair shadow-lg"
            >
              {/* Dynamic Zone Preview Box */}
              <div className="absolute inset-0 z-0 bg-[#050a15] overflow-hidden">
                <NoiseOverlay opacity={0.3} blend="mix-blend-soft-light" />
                <AnimatePresence>
                  {/* WAVES OF WATER */}
                  {activeZone === 'waves' && zone.id === 'waves' && (
                    <motion.div className="absolute inset-0" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                      <motion.div className="absolute inset-0 bg-[#14235e]" />
                      <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="w-[200%] h-[60%] absolute bottom-0 fill-[#4facfe]/30 -translate-x-1/4">
                        <motion.path 
                          d="M0 20 Q 15 5 30 20 T 60 20 T 90 20 T 120 20 V 40 H 0 Z"
                          animate={{ d: ["M0 20 Q 15 5 30 20 T 60 20 T 90 20 T 120 20 V 40 H 0 Z", "M0 20 Q 15 35 30 20 T 60 20 T 90 20 T 120 20 V 40 H 0 Z"], x: ["0%", "-50%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>
                      <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="w-[200%] h-[50%] absolute bottom-0 fill-[#00f2fe]/40">
                         <motion.path 
                          d="M0 20 Q 15 35 30 20 T 60 20 T 90 20 T 120 20 V 40 H 0 Z"
                          animate={{ d: ["M0 20 Q 15 35 30 20 T 60 20 T 90 20 T 120 20 V 40 H 0 Z", "M0 20 Q 15 5 30 20 T 60 20 T 90 20 T 120 20 V 40 H 0 Z"], x: ["-50%", "0%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>
                    </motion.div>
                  )}

                  {/* VOLCANO */}
                  {activeZone === 'volcano' && zone.id === 'volcano' && (
                    <motion.div className="absolute inset-0 bg-[#1c0803]" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                       <div className="absolute bottom-0 w-full h-[50%] bg-black" style={{ clipPath: 'polygon(20% 100%, 40% 20%, 60% 20%, 80% 100%)'}} />
                       <motion.div className="absolute bottom-[40%] w-8 h-8 left-1/2 -ml-4 bg-[#ff4500] blur-[10px]" animate={{ scale: [1, 1.5] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }} />
                       {[...Array(15)].map((_, i) => (
                         <motion.div key={i} className="absolute bg-[#ff8c00] w-2 h-2 rounded-full blur-[2px]" style={{left: '50%', bottom: '40%'}} animate={{ y: [0, -100-Math.random()*50], x: [(Math.random()-0.5)*100, (Math.random()-0.5)*150], opacity: [1,0] }} transition={{ duration: 1+Math.random(), repeat: Infinity }} />
                       ))}
                    </motion.div>
                  )}
                  
                  {/* SUPENOVA & BLACK HOLE */}
                  {activeZone === 'supernova' && zone.id === 'supernova' && (
                    <motion.div className="absolute inset-0 bg-black flex items-center justify-center" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                       {/* Accretion Disk */}
                       <motion.div className="absolute w-32 h-8 rounded-full border-4 border-[#c054ff] blur-[2px]" animate={{ rotateX: [70, 70], rotateZ: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                       <motion.div className="absolute w-32 h-8 rounded-full border-2 border-white/50 blur-[1px]" animate={{ rotateX: [70, 70], rotateZ: [0, -360] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
                       {/* Event Horizon */}
                       <div className="absolute w-12 h-12 bg-black rounded-full shadow-[0_0_20px_#c054ff]" />
                    </motion.div>
                  )}

                  {/* METEOR SHOWER */}
                  {activeZone === 'meteor' && zone.id === 'meteor' && (
                    <motion.div className="absolute inset-0 bg-[#0a0a1a]" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                       {[...Array(8)].map((_, i) => (
                         <motion.div 
                           key={`m-${i}`}
                           className="absolute h-px bg-gradient-to-r from-transparent via-[#ffd194] to-white"
                           style={{ width: `${Math.random()*60 + 40}px`, left: `${Math.random()*150}%`, top: `${Math.random()*50}%`, transform: 'rotate(210deg)' }}
                           animate={{ x: [0, -300], y: [0, 300], opacity: [0, 1, 0] }}
                           transition={{ duration: 0.5 + Math.random()*0.5, repeat: Infinity, delay: Math.random()*2, ease: "linear" }}
                         />
                       ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Default state */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 z-10" />
              </div>

              {/* Foreground content */}
              <div className="relative z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm" style={{ color: zone.color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg tracking-tight group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300" style={{ backgroundImage: `linear-gradient(to right, #fff, ${zone.color})`}}>
                    {zone.name}
                  </h3>
                </div>
                <div className="h-0 overflow-hidden group-hover:h-6 transition-all duration-500 text-xs text-white/50 flex items-center">
                   <CloudRain className="w-3 h-3 mr-1 inline" /> Hover to preview phenomenon
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
