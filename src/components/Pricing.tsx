import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYMBOLS } from './BrandBookSymbols';
import { Zap, CheckCircle2, Activity, Building2, Ticket, Headphones, Hexagon } from 'lucide-react';
import { Suspense, lazy } from 'react';

const DeepOceanBackground = lazy(() => import('./Backgrounds').then(m => ({ default: m.DeepOceanBackground })));
const RealisticPlanet = lazy(() => import('./Planets').then(m => ({ default: m.RealisticPlanet })));
const BoomableSpaceObject = lazy(() => import('./BrandSpaceObjects').then(m => ({ default: m.BoomableSpaceObject })));
import { PLANETS_DATA } from '../data/planetsConstants';

const FEATURES = [
  'Deep Ocean Subsystem Access',
  'Automated Sentiment Triage',
  'Neural Voice Telephony',
  'Global Real-time Processing',
  'Abyssal Video Streaming',
  'Dedicated Architect Node',
  'Quantum Data Encryption',
  'Multi-cluster Syncing'
];

const INDUSTRIES = [
  { id: 'technology', label: 'Technology / SaaS' },
  { id: 'finance', label: 'Financial Services' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'retail', label: 'E-commerce & Retail' }
];

const DecagonShape = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] ${className}`} preserveAspectRatio="none">
    {/* A generic decagon path */}
    <polygon 
      points="50,2 81,12 98,40 98,70 81,98 50,98 19,88 2,60 2,30 19,12" 
      fill="rgb(255 255 255 / 0.02)" 
      stroke="url(#decagonGradient)" 
      strokeWidth="0.5" 
      vectorEffect="non-scaling-stroke"
    />
    <defs>
      <linearGradient id="decagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
);

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Calculator state
  const [opMode, setOpMode] = useState<'service' | 'sales'>('service');
  const [industry, setIndustry] = useState('technology');
  const [ticketVolume, setTicketVolume] = useState(5000);
  const [voiceMinutes, setVoiceMinutes] = useState(10000);

  // Mapping symbols to plans
  const plans = [
    { 
      id: 'alpha', 
      symbol: SYMBOLS.find(s => s.id === 'alpha'), 
      planet: PLANETS_DATA.find(p => p.id === 'neptune'),
      name: 'Alpha Node', 
      desc: 'Starter capabilities for orbital reconnaissance.',
      price: 0, 
      features: 3 
    },
    { 
      id: 'delta', 
      symbol: SYMBOLS.find(s => s.id === 'delta'), 
      planet: PLANETS_DATA.find(p => p.id === 'saturn'),
      name: 'Delta Core', 
      desc: 'Advanced telemetry and high-capacity processing.',
      price: 500, 
      features: 5,
      highlight: true
    },
    { 
      id: 'omega', 
      symbol: SYMBOLS.find(s => s.id === 'omega'), 
      planet: PLANETS_DATA.find(p => p.id === 'jupiter'),
      name: 'Omega Sector', 
      desc: 'Full-spectrum enterprise data capabilities.',
      price: 2000, 
      features: 8
    }
  ];

  const calculateDynamicCost = () => {
    let base = opMode === 'service' ? 100 : 150;
    let industryMultipliers: Record<string, number> = {
      technology: 1,
      finance: 1.5,
      healthcare: 1.3,
      retail: 0.8
    };
    
    let multiplier = industryMultipliers[industry] || 1;
    let ticketCost = ticketVolume * 0.05;
    let voiceCost = voiceMinutes * 0.02;
    
    let total = (base + ticketCost + voiceCost) * multiplier;
    if (isAnnual) total *= 0.8;
    return Math.round(total);
  };

  return (
    <section className="relative pt-40 pb-56 min-h-screen bg-[#010610] text-white overflow-hidden font-sans">
      <DeepOceanBackground />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center gap-6"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#4facfe] p-3 border border-[#4facfe]/20 rounded-full bg-[#4facfe]/5 flex items-center gap-3">
              <Hexagon className="w-4 h-4" /> DECAGON PRICELIST [V2.1]
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-[0.9] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ wordSpacing: '0.15em' }}>
              <span className="inline-block mr-[0.25em]">Sector</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">Pricing</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/50 font-mono tracking-wide mt-4">
              Transparent telemetry constraints.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-300/30 bg-amber-300/[0.04] text-amber-200/90 font-mono text-[10px] uppercase tracking-[0.35em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
              </span>
              Updating — Final v2.1 Pricing Lands Soon
            </div>
          </motion.div>
        </div>

        {/* Pricing Toggle */}
        <div className="flex items-center justify-center gap-8 mb-32 relative z-30">
          <span className={`font-mono text-xs font-bold uppercase tracking-[0.4em] ${!isAnnual ? 'text-[#4facfe]' : 'text-white/30'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-20 h-10 rounded-full border-2 border-white/10 p-1 flex items-center bg-[#05101a] hover:border-[#4facfe]/50 transition-colors shadow-inner"
          >
            <motion.div 
              animate={{ x: isAnnual ? 40 : 0 }}
              className="w-7 h-7 rounded-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] shadow-[0_0_20px_rgba(79,172,254,0.6)]"
            />
          </button>
          <div className="flex items-center gap-4">
            <span className={`font-mono text-xs font-bold uppercase tracking-[0.4em] ${isAnnual ? 'text-[#4facfe]' : 'text-white/30'}`}>Annual</span>
            <span className="px-3 py-1 bg-emerald-400/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase border border-emerald-400/20 rounded border-dashed animate-pulse">Save 20%</span>
          </div>
        </div>

        {/* Decagon Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 max-w-[1200px] mx-auto mb-40 relative z-20">
          <AnimatePresence mode="popLayout">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`flex flex-col relative group ${plan.highlight ? 'z-10 scale-105' : 'z-0'}`}
              >
                {/* Geometrical Background Layer */}
                <div className="absolute inset-0 top-[180px] bottom-0 pointer-events-none">
                   <DecagonShape className={plan.highlight ? "opacity-100" : "opacity-30 group-hover:opacity-70 transition-opacity duration-500"} />
                </div>

                {/* Planet Header */}
                <div className="relative h-[220px] flex items-center justify-center mb-8 pointer-events-none z-10 p-8">
                   {plan.planet && (
                      <RealisticPlanet 
                        planet={plan.planet} 
                        isHoverable={false}
                        className={`transition-all duration-1000 ease-out saturate-[1.2] ${plan.highlight ? 'scale-[1.8] drop-shadow-[0_0_80px_rgba(79,172,254,0.6)]' : 'scale-[1.4] opacity-70 group-hover:opacity-100 group-hover:scale-[1.5] drop-shadow-[0_0_40px_rgba(79,172,254,0.3)]'}`}
                      />
                   )}
                </div>

                <div className="relative z-10 px-10 pb-16 flex-1 flex flex-col items-center">
                  
                  {/* Symbol Component */}
                  {plan.symbol && (
                    <div className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none drop-shadow-[0_0_10px_currentColor]" style={{ color: plan.symbol.color }}>
                      <svg viewBox="0 0 100 100" className="w-10 h-10 fill-none stroke-2" style={{ stroke: 'currentColor' }}>
                        <path d={plan.symbol.path} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  <h3 className="text-3xl font-display font-black tracking-widest uppercase mb-2 text-white">
                    {plan.name}
                  </h3>
                  
                  <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.2em] text-center max-w-[200px] h-12">
                    {plan.desc}
                  </p>

                  {/* Pricing */}
                  <div className="my-10 flex items-baseline gap-2 relative">
                    <span className="text-2xl font-mono text-[#4facfe]/50">$</span>
                    <span className={`text-7xl font-display font-black italic tracking-tighter ${plan.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe] drop-shadow-[0_0_20px_rgba(79,172,254,0.6)]' : 'text-white'}`}>
                      {plan.price === 0 ? '0' : Math.round(isAnnual ? plan.price * 0.8 : plan.price)}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/30 ml-2">/ MO</span>
                  </div>

                  <button className={`w-full py-4 text-[10px] font-mono font-black uppercase tracking-[0.4em] transition-all duration-300 relative overflow-hidden group/btn ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#010610] hover:shadow-[0_0_30px_rgba(79,172,254,0.6)]' 
                      : 'bg-[#020617] border border-white/20 text-white hover:border-[#4facfe] hover:shadow-[0_0_20px_rgba(79,172,254,0.3)]'
                  }`}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Initialize <Hexagon className="w-3 h-3" />
                    </span>
                  </button>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

                  {/* Features Column */}
                  <div className="w-full space-y-6 flex-1">
                    {FEATURES.map((feat, fIndex) => (
                      <div key={fIndex} className={`flex items-start gap-4 transition-all duration-500 ${fIndex < plan.features ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                        {fIndex < plan.features ? (
                           <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-[#4facfe]' : 'text-white/60'}`} />
                        ) : (
                           <div className="w-4 h-4 shrink-0 border border-white/20 rounded flex items-center justify-center" />
                        )}
                        <span className="font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Resource Calculator */}
        <div className="max-w-[1200px] mx-auto mb-40 relative z-20">
           <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] uppercase text-[#4facfe] mb-6 bg-[#4facfe]/10 px-4 py-2 rounded-sm border border-[#4facfe]/20">
                <Activity className="w-4 h-4" /> Operations Matrix Component
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                Dynamic Matrix Calibrator
              </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
             
             {/* Controls */}
             <div className="lg:col-span-8 p-8 md:p-12 border border-white/10 bg-[#020617]/80 backdrop-blur-md rounded-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                
                {/* Op Mode Tabs */}
                <div className="flex gap-4 mb-12">
                   <button 
                     onClick={() => setOpMode('service')}
                     className={`flex-1 py-4 border-b-2 font-mono text-xs uppercase tracking-widest transition-all ${
                       opMode === 'service' 
                        ? 'border-[#4facfe] text-[#4facfe]' 
                        : 'border-white/10 text-white/40 hover:text-white'
                     }`}
                   >
                     Service Ops
                   </button>
                   <button 
                     onClick={() => setOpMode('sales')}
                     className={`flex-1 py-4 border-b-2 font-mono text-xs uppercase tracking-widest transition-all ${
                       opMode === 'sales' 
                        ? 'border-emerald-400 text-emerald-400' 
                        : 'border-white/10 text-white/40 hover:text-white'
                     }`}
                   >
                     Sales Ops
                   </button>
                </div>

                <div className="space-y-12">
                  
                  {/* Industry Selection */}
                  <div>
                    <h4 className="flex items-center gap-3 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] mb-4">
                      <Building2 className="w-4 h-4" /> Select Industry Protocol
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {INDUSTRIES.map(ind => (
                        <button
                          key={ind.id}
                          onClick={() => setIndustry(ind.id)}
                          className={`p-4 border rounded font-mono text-[9px] uppercase tracking-wider text-center transition-all ${
                            industry === ind.id 
                             ? 'border-[#4facfe] bg-[#4facfe]/10 text-[#4facfe] shadow-[0_0_15px_rgba(79,172,254,0.2)]' 
                             : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ticket Volume Slider */}
                  <div>
                     <div className="flex justify-between items-end mb-4">
                        <h4 className="flex items-center gap-3 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                          <Ticket className="w-4 h-4" /> Base Tickets / Month
                        </h4>
                        <span className="font-display text-2xl font-black text-[#4facfe] tracking-widest drop-shadow-[0_0_10px_rgba(79,172,254,0.5)]">
                          {ticketVolume.toLocaleString()}
                        </span>
                     </div>
                     <input 
                       type="range" 
                       min="100" 
                       max="50000" 
                       step="100"
                       value={ticketVolume}
                       onChange={(e) => setTicketVolume(parseInt(e.target.value))}
                       className="w-full appearance-none h-1 bg-white/10 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#4facfe] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(79,172,254,1)] cursor-pointer"
                     />
                     <div className="flex justify-between mt-2 font-mono text-[8px] text-white/20 uppercase tracking-widest">
                       <span>100</span>
                       <span>50,000+</span>
                     </div>
                  </div>

                  {/* Voice Minutes Slider */}
                  <div>
                     <div className="flex justify-between items-end mb-4">
                        <h4 className="flex items-center gap-3 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
                          <Headphones className="w-4 h-4" /> Voice Telemetry / Min
                        </h4>
                        <span className="font-display text-2xl font-black text-[#4facfe] tracking-widest drop-shadow-[0_0_10px_rgba(79,172,254,0.5)]">
                          {voiceMinutes.toLocaleString()}
                        </span>
                     </div>
                     <input 
                       type="range" 
                       min="500" 
                       max="100000" 
                       step="500"
                       value={voiceMinutes}
                       onChange={(e) => setVoiceMinutes(parseInt(e.target.value))}
                       className="w-full appearance-none h-1 bg-white/10 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#4facfe] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(79,172,254,1)] cursor-pointer"
                     />
                     <div className="flex justify-between mt-2 font-mono text-[8px] text-white/20 uppercase tracking-widest">
                       <span>500</span>
                       <span>100,000+</span>
                     </div>
                  </div>

                </div>
             </div>

             {/* Dynamic Cost Display */}
             <div className="lg:col-span-4 p-8 md:p-12 border border-[#4facfe]/30 bg-gradient-to-b from-[#05101a] to-[#010610] rounded-2xl h-full flex flex-col justify-center relative shadow-[0_0_40px_rgba(79,172,254,0.15)] overflow-hidden">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4facfe]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4facfe]" />
                
                <div className="font-mono text-[10px] uppercase tracking-widest text-center text-[#4facfe] mb-6 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded bg-[#4facfe] animate-pulse shadow-[0_0_10px_rgba(79,172,254,0.8)]" />
                  Live Provisioning Cost
                </div>
                
                <div className="flex items-baseline justify-center gap-2 mb-8">
                   <span className="text-3xl font-mono text-[#4facfe]/50">$</span>
                   <motion.span 
                      key={calculateDynamicCost()}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-7xl font-display font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                   >
                     {calculateDynamicCost().toLocaleString()}
                   </motion.span>
                   <span className="text-[10px] uppercase font-mono text-white/30 ml-2">/ MO</span>
                </div>

                <div className="space-y-4 mb-12">
                   <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase border-b border-white/10 pb-4">
                     <span className="text-white/40">Division</span>
                     <span className="text-white">{opMode === 'service' ? 'Service Ops' : 'Sales Ops'}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase border-b border-white/10 pb-4">
                     <span className="text-white/40">Protocol</span>
                     <span className="text-white">{INDUSTRIES.find(i => i.id === industry)?.label}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase">
                     <span className="text-white/40">Billing Cycle</span>
                     <span className="text-[#4facfe]">{isAnnual ? 'Annual (-20%)' : 'Monthly'}</span>
                   </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#010610] font-mono font-black uppercase text-[10px] tracking-[0.4em] hover:shadow-[0_0_30px_rgba(79,172,254,0.6)] transition-all">
                  Generate Contract
                </button>
             </div>

           </div>
        </div>

        {/* Brand Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center relative z-20">
            <div className="space-y-8">
              <div className="font-mono text-blue-400 text-xs tracking-[0.4em] uppercase font-bold flex items-center gap-4">
                <div className="w-2 h-2 bg-[#4facfe] animate-pulse shadow-[0_0_10px_rgba(79,172,254,0.8)]" />
                System Integration
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter" style={{ wordSpacing: '0.15em' }}>
                Deploy Advanced Brand Identity
              </h2>
              <p className="font-sans text-white/60 text-lg leading-relaxed">
                DeltaScope operates purely through geometric symbols and abstract concepts. Engage your users with frameless architecture, decagon frameworks, and interactive 3D assets that transcend typical analytics dashboards.
              </p>
              
              <div className="flex gap-4">
                 <button className="px-8 py-4 bg-[#05101a] border border-[#4facfe]/30 text-white font-mono uppercase text-[10px] tracking-widest transition-all hover:border-[#4facfe] flex items-center gap-3 hover:shadow-[0_0_20px_rgba(79,172,254,0.4)]">
                   <Zap className="w-4 h-4 text-[#4facfe]" /> Consult Architect
                 </button>
              </div>
            </div>

            <div className="relative h-[400px] flex items-center justify-center bg-[#020617] border border-white/10 rounded overflow-hidden group">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400 opacity-50" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400 opacity-50" />
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,172,254,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-duration-700" />
               <BoomableSpaceObject type="relay" hideLabel />
               <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.4em] text-white/50 bg-black/50 px-2 py-1 backdrop-blur-md">
                 Fig. 1: Orbital Relay Object
               </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;

