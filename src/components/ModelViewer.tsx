import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { X } from 'lucide-react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useInView } from "motion/react";
import { 
  SpaceshipModel, 
  SatelliteModel, 
  RocketModel, 
  UfoModel, 
  TelescopeModel, 
  SpaceStationModel, 
  InfinityModel, 
  DNAModel, 
  MicrochipModel,
  BoltModel,
  ConveyorBeltModel,
  ElectricButterflyModel,
  DigitalViolinModel,
  ElectricDragonflyModel,
  CyberButterflyModel,
  NeonButterflyModel,
  PhaseDragonflyModel,
  ElectricAntModel
} from './ServiceModels';
import { BrandLattice, BrandCrystalline, BrandOculus } from './BrandLattice';
import { BasaltSpires, XylemCore, AmethystCluster } from './NaturalModels';
import { SwallowtailV1, SwallowtailV2, SwallowtailV3, SwallowtailV4, SwallowtailV5, SwallowtailV6, SwallowtailV7, SwallowtailV8, SwallowtailV9, SwallowtailV10 } from './SwallowtailModels';

interface ModelViewerProps {
  type: string;
  isHovered?: boolean;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  scrollProgress?: number;
  name?: string;
  desc?: string;
}

const MODEL_MAP: Record<string, { component: React.ComponentType<any>, color: string }> = {
  spaceship: { component: SpaceshipModel, color: "#3b82f6" },
  satellite: { component: SatelliteModel, color: "#10b981" },
  rocket: { component: RocketModel, color: "#8b5cf6" },
  ufo: { component: UfoModel, color: "#3b82f6" },
  telescope: { component: TelescopeModel, color: "#10b981" },
  station: { component: SpaceStationModel, color: "#8b5cf6" },
  infinity: { component: InfinityModel, color: "#8b5cf6" },
  dna: { component: DNAModel, color: "#10b981" },
  microchip: { component: MicrochipModel, color: "#3b82f6" },
  bolt: { component: BoltModel, color: "#3b82f6" },
  conveyor: { component: ConveyorBeltModel, color: "#8b5cf6" },
  butterfly: { component: ElectricButterflyModel, color: "#8b5cf6" },
  violin: { component: DigitalViolinModel, color: "#3b82f6" },
  dragonfly: { component: ElectricDragonflyModel, color: "#10b981" },
  cyber_butterfly: { component: CyberButterflyModel, color: "#8b5cf6" },
  neon_butterfly: { component: NeonButterflyModel, color: "#10b981" },
  phase_dragonfly: { component: PhaseDragonflyModel, color: "#3b82f6" },
  electric_ant: { component: ElectricAntModel, color: "#3b82f6" },
  brand_lattice: { component: BrandLattice, color: "#3b82f6" },
  brand_crystal: { component: BrandCrystalline, color: "#a855f7" },
  brand_oculus: { component: BrandOculus, color: "#ec4899" },
  basalt_spires: { component: BasaltSpires, color: "#404040" },
  xylem_core: { component: XylemCore, color: "#84cc16" },
  amethyst_cluster: { component: AmethystCluster, color: "#a855f7" },
  swallowtail_v1: { component: SwallowtailV1, color: "#3b82f6" },
  swallowtail_v2: { component: SwallowtailV2, color: "#10b981" },
  swallowtail_v3: { component: SwallowtailV3, color: "#eab308" },
  swallowtail_v4: { component: SwallowtailV4, color: "#a855f7" },
  swallowtail_v5: { component: SwallowtailV5, color: "#f43f5e" },
  swallowtail_v6: { component: SwallowtailV6, color: "#06b6d4" },
  swallowtail_v7: { component: SwallowtailV7, color: "#f97316" },
  swallowtail_v8: { component: SwallowtailV8, color: "#ec4899" },
  swallowtail_v9: { component: SwallowtailV9, color: "#8b5cf6" },
  swallowtail_v10: { component: SwallowtailV10, color: "#14b8a6" },
};

export const ModelViewer: React.FC<ModelViewerProps> = ({ 
  type, 
  isHovered = false, 
  className = "", 
  cameraPosition = [0, 0, 3],
  fov = 50,
  scrollProgress: manualScrollProgress,
  name,
  desc
}) => {
  const { scrollYProgress } = useScroll();
  const [internalScrollProgress, setInternalScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "400px" });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setInternalScrollProgress(latest);
  });

  const scrollProgress = manualScrollProgress !== undefined ? manualScrollProgress : internalScrollProgress;
  const modelInfo = MODEL_MAP[type];

  if (!modelInfo) return null;

  const [isFocused, setIsFocused] = useState(false);
  const ActiveModel = modelInfo.component;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFocused(!isFocused);
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full cursor-pointer pointer-events-auto transition-all duration-500 ${isHovered && !isFocused ? 'scale-150' : 'scale-100'} ${isFocused ? 'scale-[2.2] z-[100]' : 'z-10'} ${className} relative group/model focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isFocused}
      aria-label={`Inspect ${name || type} 3D model`}
    >
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: -60 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            className="absolute inset-0 z-[200] flex items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/80 backdrop-blur-3xl border border-white/20 p-8 rounded-[2rem] max-w-[320px] shadow-[0_0_80px_rgba(255,255,255,0.1)] relative overflow-hidden group/popup">
              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/50 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-xl" />

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan" />
              
              <div className="flex flex-col gap-4 relative z-10 text-center">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />
                  </div>
                  <button 
                    onClick={() => setIsFocused(false)}
                    className="text-white/30 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-white font-display font-black uppercase tracking-tighter text-2xl leading-none">
                  {name || type}
                </h4>
                
                <div className="w-full h-px bg-white/10" />
                
                <p className="text-xs font-mono text-white/70 leading-relaxed uppercase tracking-wider">
                  {desc || "A sophisticated neural node interface calibrated for industrial-scale automation and multidimensional data synthesis."}
                </p>

                <div className="flex flex-col gap-3 mt-4">
                  <button 
                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-[0.3em] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => {
                        // In a real app this would trigger a deep dive modal
                        console.log("Deep dive initiated for", name);
                    }}
                  >
                    Initiate Deep Dive
                  </button>
                  
                  <div className="flex items-center justify-center gap-3 py-2">
                    <div className="flex -space-x-1">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full border border-black bg-blue-400/50" />
                        ))}
                    </div>
                    <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em] whitespace-nowrap">Core Sync Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isInView && (
        <Canvas performance={{ min: 0.5 }} dpr={[1, 1.5]} camera={{ position: cameraPosition, fov }} gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 15, 10]} angle={0.3} penumbra={0.8} intensity={2.5} color="#e0f2fe" castShadow />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />
          
          <ActiveModel color={modelInfo.color} isHovered={isHovered || isFocused} isClicked={isFocused} scrollProgress={scrollProgress} />
        </Canvas>
      )}
    </div>
  );
};
