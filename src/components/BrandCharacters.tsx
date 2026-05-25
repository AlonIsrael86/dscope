import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Zap, Palette, Rocket, Image as ImageIcon } from 'lucide-react';

const ALIEN_STYLES = [
  {
    id: 'cinematic',
    name: 'Cinematic Realism',
    desc: 'High-fidelity 3D render with volumetric lighting, film grain, and realistic textures. Feels like a blockbuster sci-fi movie.',
    color: '#38bdf8', // Light Blue
    image: 'https://images.unsplash.com/photo-1614729939124-03290b55c9ce?auto=format&fit=crop&w=800&q=80',
    tags: ['Cinematic', 'Realistic', '3D']
  },
  {
    id: 'deep-space',
    name: 'Deep Space EVA',
    desc: 'Hyper-realistic astronaut suit detailing, harsh directional sunlight, and dark space shadows.',
    color: '#f8fafc', // White
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=800&q=80',
    tags: ['EVA Suit', 'Harsh Lighting', 'Detail']
  },
  {
    id: 'holographic',
    name: 'Holographic Projection',
    desc: 'Realistic particle systems and light scattering, creating a life-like volumetric hologram of the alien.',
    color: '#10b981', // Emerald
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tags: ['Hologram', 'Particles', 'VFX']
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Realism',
    desc: 'Gritty, highly detailed textures with neon rim lighting, subsurface scattering on alien skin.',
    color: '#f43f5e', // Rose
    image: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Cyber', 'Neon Rim', 'Textured']
  },
  {
    id: 'photoreal',
    name: 'Photorealistic Studio',
    desc: 'Studio lighting setup, ultra-high resolution rendering with perfect depth of field and lens bokeh.',
    color: '#fbbf24', // Amber
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    tags: ['Studio', 'Bokeh', '8K']
  }
];

export const BrandCharacters = () => {
  const [activeTab, setActiveTab] = useState<'aliens' | 'dog'>('aliens');
  const [hoveredAlien, setHoveredAlien] = useState<string | null>(null);

  return (
    <section className="relative z-10 pt-16 border-t border-white/5 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight uppercase flex items-center gap-3">
             <Star className="text-amber-400 w-8 h-8" />
             Brand Mascots & Characters
          </h2>
          <p className="text-white/60 mt-2 max-w-2xl text-base">
            Exploring DeltaScope's friendly faces: The Happy Alien in multiple art styles and the adventurous Astronaut Dog mascot.
          </p>
        </div>
        
        {/* Toggle Nav */}
        <div className="flex bg-white/5 border border-white/10 rounded-full p-1 mt-6 md:mt-0">
           <button 
              onClick={() => setActiveTab('aliens')}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === 'aliens' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'text-white/50 hover:text-white'}`}
           >
              Happy Aliens
           </button>
           <button 
              onClick={() => setActiveTab('dog')}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${activeTab === 'dog' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-white/50 hover:text-white'}`}
           >
              Astronaut Dog
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'aliens' ? (
           <motion.div 
             key="aliens"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
           >
             {ALIEN_STYLES.map((style, i) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredAlien(style.id)}
                  onMouseLeave={() => setHoveredAlien(null)}
                  className={`bg-black/40 border border-white/5 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                  style={{ 
                    borderColor: hoveredAlien === style.id ? style.color : 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#050510]">
                     {/* Placeholder Image for the generated alien */}
                     <img 
                       loading="lazy" 
                       src={style.image} 
                       alt={style.name} 
                       className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                     
                     <div className="absolute bottom-0 left-0 w-full p-5">
                       <div className="flex gap-2 mb-3">
                         {style.tags.map(tag => (
                           <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 border border-white/20">
                             {tag}
                           </span>
                         ))}
                       </div>
                       <h3 className="text-xl font-display font-bold text-white mb-2" style={{ color: hoveredAlien === style.id ? style.color : '#fff' }}>
                         {style.name}
                       </h3>
                       <p className="text-xs text-white/50 leading-relaxed font-sans">{style.desc}</p>
                     </div>
                  </div>
                </motion.div>
             ))}
           </motion.div>
         ) : (
           <motion.div 
             key="dog"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
             className="w-full"
           >
             <div className="bg-gradient-to-br from-[#0c0c1a] to-[#04040a] border border-amber-500/20 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(245,158,11,0.05)]">
               
               <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden group">
                 {/* Placeholder for Astronaut Dog */}
                 <img 
                   loading="lazy"
                   src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=1200&q=80" 
                   alt="Astronaut Golden Retriever" 
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,_#000_100%)] pointer-events-none opacity-80" />
                 
                 {/* UI Overlays */}
                 <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                   <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Canine Unit Active</span>
                 </div>
               </div>

               <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                 <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-8">
                   <Rocket className="w-8 h-8 text-amber-400" />
                 </div>
                 
                 <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white mb-6">
                   Cosmo The <br/> <span className="text-amber-400">Astronaut Dog</span>
                 </h3>
                 
                 <p className="text-white/60 text-lg leading-relaxed mb-8">
                   A high-quality 3D rendered Golden Retriever floating seamlessly in zero gravity. Wearing a customized EVA space suit with DeltaScope insignia, Cosmo represents curiosity, loyalty, and the adventurous spirit of our brand.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                   <div>
                     <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Style Specs</div>
                     <div className="font-sans font-bold text-white text-sm">Cinematic 3D Render</div>
                   </div>
                   <div>
                     <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Core Trait</div>
                     <div className="font-sans font-bold text-white text-sm">Loyal Explorer</div>
                   </div>
                   <div>
                     <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Lighting</div>
                     <div className="font-sans font-bold text-white text-sm">Volumetric / Studio</div>
                   </div>
                 </div>
               </div>
               
             </div>
           </motion.div>
         )}
      </AnimatePresence>
    </section>
  );
};
