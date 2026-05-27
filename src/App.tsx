import React, { useState, useEffect, useRef, useMemo, memo, Component, ErrorInfo, ReactNode, Suspense, lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContactPlaceholder } from './routes/Contact';
import { CaseStudies } from './routes/CaseStudies';
import { RealClientCases } from './routes/RealClientCases';
import { FpsMeter } from './components/FpsMeter';
import { InViewGate } from './components/InViewGate';
import { VoiceWidget } from './components/VoiceWidget';
import { NebulaBackground } from './components/NebulaBackground';
import { GalaxyAboutBackground } from './components/GalaxyAboutBackground';
import { CosmicIndustryIcon } from './components/CosmicIndustryIcon';
import { logger } from './lib/logger';
import { featureFlags } from './lib/featureFlags';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate, useSpring, useMotionValueEvent, useInView, useTime } from "motion/react";
import { Menu, X, Zap, RefreshCw, Download, Share2, Sparkles, Shield, Rocket, Cpu, Bot, Users, Smartphone, Keyboard, Monitor, Brain, ArrowRight, CheckCircle2, Search, Mail, Calendar, MessageSquare, Database, Clock, TrendingUp, AlertCircle, DollarSign, Activity, Satellite, Telescope, MapPin, Package, Home, Truck, Globe, Radio, Orbit, Eye, Landmark, HeartPulse, Factory, Scale, Target, GraduationCap, Coffee, Hammer, Building2, Tractor, ShoppingCart, Car, Film, RadioTower, FlaskConical, Lock, Gem, Moon, Sun, Server, BarChart3, ScanText, Infinity as InfinityIcon, Dna, Webhook, History, Heart, BookOpen, Layers, Box, ShieldCheck, Star, Headset, Mic, Volume2, User, Plane, Gamepad2, Droplets, Anchor, Palette, Train, HeartHandshake, Map, Compass, LayoutDashboard, Settings, Microscope, Coins, CloudSun, Recycle, BrainCircuit, Bed, Scissors, Atom, TrainFront, Languages, Sprout, ThermometerSnowflake, Wifi, HardHat, Weight, Music, Layout, PencilLine, ChevronDown, ChevronUp } from "lucide-react";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { SPACE_ANIMALS_3D } from './components/RealisticAnimals3D';
import { SPACE_TECH } from './data/spaceTechConstants';
import { INDUSTRY_TECH } from './data/industryTechConstants';
import { Sphere, MeshDistortMaterial, MeshTransmissionMaterial, Float, Stars, PerspectiveCamera, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { HammerModel, WrenchModel, ScrewdriverModel, GearModel } from './components/ToolModels';
import { ShieldModel, LandmarkModel, GlobeModel, TargetModel, ChartModel, LearningModel, FactoryModel, CoffeeModel, PackageModel, ConstructionModel, HeartPulseModel, BuildingModel, EnergyModel, AgricultureModel, RetailModel, AutomotiveModel, FilmModel, RadioModel, PharmaModel, AerospaceModel, SocialModel, SecurityModel, ScaleModel, GemModel, AlgorithmicNodeModel } from './components/SectorModels';
import { DataClusterBackground } from './components/DataClusterBackground';
import { BrandBookPhenomena } from './components/BrandBookPhenomena';
import { OceanGallery } from './components/BrandOceanCreatures';
import { BrandBookTypographyColors } from './components/BrandBookTypographyColors';
import { BrandBookSymbols, SYMBOLS } from './components/BrandBookSymbols';
import { BrandCharacters } from './components/BrandCharacters';
import { Pricing } from './components/Pricing';
import { TamCharts } from './components/TamCharts';
import { SPACE_OBJECT_TYPES } from './data/spaceObjectConstants';
import { MicroscopicGallery, RotatingAtom, FloatingVirus, DnaHelix, NeuralSynapse, WaterMolecule, ElectronCloud, ProbioticBacteria, RedBloodCell } from './components/BrandMicroscopicObjects';
import { GalaxyBackground } from './components/GalaxyBackground';
import { PLANETS_DATA } from './data/planetsConstants';
import { DashboardCaseView } from './components/DashboardCaseView';
import { CaseDashboardMockups } from './components/CaseDashboardMockups';
import {
  SpaceObjectRenderer,
  RealisticPlanet,
  RealisticAnimals3D,
  SpaceTech2D,
  IndustryTech2D,
  LionSculpture,
  ModelViewer,
  FlybyObject,
  OceanBackground,
  OceanHorizonBackground,
  MarsBackground,
  DeepOceanBackground,
  ScrollParticles,
  MoleculesBackground,
  MicrochipsBackground,
  BoomableSpaceObject,
  SectorDashboardModal,
} from './lazyComponents';

interface Service {
  name: string;
  id: string;
  tags: string[];
  desc: string;
  modelVariant: string;
  image: string;
  coreValues?: string[];
}

const SERVICES_DATA: Service[] = [
  { 
    name: 'Comprehensive Analysis', 
    id: '01',
    tags: ['Sectors', 'Products', 'Workers', 'SaaS'],
    desc: 'Studying the sectors, products, workers, and SaaS platforms (CRM, ERP, LMS...) to understand your unique ecosystem.',
    modelVariant: 'space-laboratory',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Observation & Insight', 'Zero-G Innovation']
  },
  { 
    name: 'Process Characterization', 
    id: '02',
    tags: ['Tasks', 'Case Studies', 'Workflow'],
    desc: 'Writing characterization including tasks and case studies that can be optimally replaced with AI, automations, and integrations.',
    modelVariant: 'robot',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Autonomous Efficiency', 'Mechanical Precision']
  },
  { 
    name: 'Strategic Implementation', 
    id: '03',
    tags: ['Deployment', 'Integration', 'Automation'],
    desc: 'Prioritizing and implementing the most relevant and high-impact cases directly into your operational pipelines.',
    modelVariant: 'spaceship',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Interstellar Reach', 'High-Velocity Data Transfer']
  },
  { 
    name: 'Refinement & Qualification', 
    id: '04',
    tags: ['Optimization', 'Continual Improvement'],
    desc: 'Continuously improving, qualifying, and refining the implemented systems to guarantee the absolute best results.',
    modelVariant: 'satellite',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Global Reach', 'Precision Targeting']
  },
  { 
    name: 'Custom Role Interfaces', 
    id: '05',
    tags: ['UI/UX', 'Dashboards', 'Role-Based Access'],
    desc: 'Creating custom, intuitive interfaces and tailored dashboards for every employee across every role in your organization.',
    modelVariant: 'mobile-phone',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Ubiquitous Connectivity', 'Interface Adaptability']
  },
  { 
    name: 'Team Engagement & Optimization', 
    id: '06',
    tags: ['Performance', 'DeltaScope', 'Adoption'],
    desc: 'Engaging actively with the team to ensure rapid adoption, achieving 90% of performance execution driven by DeltaScope.',
    modelVariant: 'water-waves',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Fluid Dynamics', 'Continuous Flow']
  },
  { 
    name: 'Fastening & Security protocols', 
    id: '07',
    tags: ['Hardware', 'Security', 'Encryption'],
    desc: 'Securing the physical and digital foundations of your infrastructure with unyielding fastening protocols.',
    modelVariant: 'meteorite',
    image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Impact Resilience', 'Atmospheric Shielding']
  },
  { 
    name: 'Logistics Orchestration', 
    id: '08',
    tags: ['Supply Chain', 'Optimization', 'Real-time'],
    desc: 'Streamlining complex logistics and supply chain movements through real-time automated conveyor logic.',
    modelVariant: 'starlink',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Constellation Networking', 'Low-Latency Operations']
  },
  {
    name: 'Screenshare Agent Interface',
    id: '11',
    tags: ['Agent', 'Screen Share', 'AI Helper'],
    desc: 'An AI online helper that sees your screen, talks, explains, and records sessions to assist you directly in real time. Provides instant technical coaching and operational guidance.',
    modelVariant: 'satellite',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Interactive Assistance', 'Real-time Vision']
  },
  {
    name: 'Sales & Marketing CRM',
    id: '12',
    tags: ['CRM', 'Sales', 'Marketing', 'AI'],
    desc: 'Intelligent CRM features for sales and marketing teams. Automated lead scoring, personalized outreach generation, and pipeline velocity optimization powered by AI.',
    modelVariant: 'spaceship',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Revenue Acceleration', 'Predictive Analytics']
  },
  {
    name: 'Human-Agent Synergy Desk',
    id: '13',
    tags: ['CRM', 'Ticketing', 'Support', 'Hybrid'],
    desc: 'CRM features for ticket management where humans and agents work together seamlessly. AI handles triage and routine fixes while humans focus on complex empathetic resolutions.',
    modelVariant: 'space-laboratory',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Collaborative Workflow', 'Empathetic Resolution']
  },
  { 
    name: 'Bio-Digital Synthesis', 
    id: '09',
    tags: ['Biotech', 'Evolution', 'AI-Genetic'],
    desc: 'Merging organic growth patterns with digital precision to create self-evolving business ecosystems.',
    modelVariant: 'astronaut',
    image: 'https://images.unsplash.com/photo-1490100667990-4fced8021649?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Human-Machine Synergy', 'Exploration & Evolution']
  },
  { 
    name: 'Harmonic Resonance Matrix', 
    id: '10',
    tags: ['Frequency', 'Communication', 'Signal'],
    desc: 'Tuning your organizational communications to the perfect frequency for maximum clarity and impact.',
    modelVariant: 'big-telescope',
    image: 'https://images.unsplash.com/photo-1465821185615-93442273d7b6?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Deep-Field Observation', 'Cosmic Clarity']
  },
  { 
    name: 'Cosmic Data Harvesting', 
    id: '14',
    tags: ['Big Data', 'Intelligence', 'Extraction'],
    desc: 'Extracting massive datasets from across the digital quadrant and processing them through sentient mining clusters.',
    modelVariant: 'meteorite',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    coreValues: ['Resource Extraction', 'Quantum Scalability']
  }
];

const Service3DIcon = ({ type, isHovered = false, name, desc }: { type: string, isHovered?: boolean, name?: string, desc?: string }) => {
  return (
    <div className="absolute inset-0 z-10 w-full h-full overflow-visible flex items-center justify-center p-8">
      <SpaceTech2D type={type} color="#3b82f6" />
    </div>
  );
};


const ThemeContext = React.createContext<{ theme: 'dark' | 'light', toggleTheme: () => void }>({ theme: 'dark', toggleTheme: () => {} });

export const useTheme = () => React.useContext(ThemeContext);

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}

const LOGO_PROMPTS = [
  "Extremely minimalist typographic logo for the word 'DeltaScope'. Ultra-thin futuristic digital font on a deep black background. In the center 'A', a mesmerizing, photorealistic Milky Way galaxy spiral. No other text or elements. High-tech, cinematic, elegant.",
  "Minimalist brand identity: the word 'DeltaScope'. Modern razor-thin font. The letter 'A' is replaced by a glowing, realistic Milky Way spiral galaxy. Deep space contrast, cinematic 8k, professional aesthetic. Only the word 'DeltaScope' is visible.",
  "Sleek typographic logo 'DeltaScope'. Thin futuristic lines. Pure minimalist design, dark void background, iridescent stardust particles. Just the word 'DeltaScope'.",
  "High-tech digital typography of 'DeltaScope'. Minimalist thin lines. Cosmic scale, cinematic lighting, 8k resolution. No external symbols, only the word 'DeltaScope'."
];

// Animated Typewriter Component for Titles
const DiscoveryTooltip = ({ 
  text, 
  isVisible, 
  className = "",
  position = "top"
}: { 
  text: string, 
  isVisible: boolean, 
  className?: string,
  position?: "top" | "bottom" | "left" | "right"
}) => {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
    left: "right-full top-1/2 -translate-y-1/2 mr-4",
    right: "left-full top-1/2 -translate-y-1/2 ml-4"
  };

  const arrowPositions = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l border-t",
    left: "left-full top-1/2 -translate-y-1/2 -ml-1 border-l border-b",
    right: "right-full top-1/2 -translate-y-1/2 -mr-1 border-r border-t"
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: position === "top" ? 10 : position === "bottom" ? -10 : 0, x: position === "left" ? 10 : position === "right" ? -10 : 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.8, y: position === "top" ? 10 : position === "bottom" ? -10 : 0, x: position === "left" ? 10 : position === "right" ? -10 : 0, filter: 'blur(10px)' }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`absolute ${positions[position]} z-[2000] pointer-events-none ${className}`}
        >
          <div className="px-4 py-2 bg-black/95 border border-blue-500/40 rounded-lg backdrop-blur-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)] relative overflow-hidden group">
            {/* Scanning line */}
            <motion.div 
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-[1px] bg-blue-400/30 blur-[1px] z-0"
            />
            
            <div className="relative z-10">
              <span className="scanline-text">
                {text}
              </span>
              <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 mt-1 opacity-50" />
            </div>

            <div className={`absolute w-2 h-2 bg-black/95 border-blue-500/40 rotate-45 ${arrowPositions[position]}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WritingTitle = ({ 
  text, 
  className = "", 
  progress,
  lightning = false,
  pulse = false
}: { 
  text: string, 
  className?: string, 
  progress?: any,
  lightning?: boolean,
  pulse?: boolean
}) => {
  const localRef = useRef(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: localRef,
    offset: ["start 0.95", "end 0.05"]
  });
  
  const scrollProgress = progress || localProgress;
  // Smoothed progress for reveal - using a slightly snappier spring for responsiveness
  const mappedProgress = useSpring(useTransform(scrollProgress, [0.05, 0.5], [0, 1]), {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001
  });

  return (
    <div ref={localRef} className="w-full">
      <ScrollRevealTitle 
        text={text} 
        progress={mappedProgress} 
        className={className} 
        lightning={lightning}
        pulse={pulse}
      />
    </div>
  );
};

const LightningEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 0.8, 0],
            scale: [1, 1.1, 1.1, 1.05, 1],
            filter: ["blur(0px)", "blur(10px)", "blur(10px)", "blur(5px)", "blur(0px)"]
          }}
          transition={{ 
            duration: 0.2, 
            repeat: Infinity, 
            repeatDelay: 5 + i * 2,
            delay: i * 2 
          }}
          className="absolute inset-0 bg-blue-400/[0.05]"
        />
      ))}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {[...Array(4)].map((_, i) => (
          <LightningBolt key={i} index={i} />
        ))}
      </svg>
    </div>
  );
};

const LightningBolt = ({ index }: { index: number }) => {
  const [points, setPoints] = useState("");
  
  useEffect(() => {
    const generateBolt = () => {
      const x = Math.random() * 100;
      let currentY = 0;
      let currentX = x;
      let newPoints = `M ${currentX} ${currentY}`;
      
      while (currentY < 100) {
        currentY += Math.random() * 10 + 5;
        currentX += (Math.random() - 0.5) * 15;
        newPoints += ` L ${currentX} ${currentY}`;
      }
      setPoints(newPoints);
    };

    const interval = setInterval(generateBolt, Math.random() * 3000 + 2000);
    generateBolt();
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.path
      d={points}
      fill="none"
      stroke="#60a5fa"
      strokeWidth="0.5"
      filter="url(#glow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1], 
        opacity: [0, 1, 0],
        strokeWidth: [0.5, 2, 0.5]
      }}
      transition={{ 
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 4,
        delay: index * 1.5
      }}
    />
  );
};

const HolographicText = ({ text, colorClass, sizeClass, progress, glowColor }: { text: string, colorClass: string, sizeClass: string, progress: any, glowColor?: string }) => {
  // Map the tailwind color to a raw color for the glow if not provided
  const glowColorMap: Record<string, string> = {
    'text-blue-400': '#60a5fa',
    'text-cyan-400': '#22d3ee',
    'text-emerald-400': '#34d399',
    'text-orange-400': '#fb923c',
    'text-indigo-400': '#818cf8',
    'text-teal-400': '#2dd4bf',
    'text-sky-400': '#38bdf8',
    'text-purple-400': '#c084fc',
    'text-blue-300': '#93c5fd',
    'text-red-400': '#f87171',
    'text-fuchsia-300': '#f5d0fe',
    'text-orange-500': '#f97316',
    'text-cyan-300': '#67e8f9',
    'text-yellow-400': '#facc15',
    'text-green-400': '#4ade80',
    'text-fuchsia-400': '#e879f9',
    'text-rose-400': '#fb7185',
    'text-violet-400': '#a78bfa',
    'text-amber-400': '#fbbf24',
    'text-pink-400': '#f472b6',
    'text-slate-400': '#94a3b8',
    'text-emerald-300': '#6ee7b7',
    'text-blue-200': '#bfdbfe',
    'text-cyan-200': '#a5f3fc',
    'text-emerald-200': '#a7f3d0',
    'text-orange-200': '#fed7aa',
    'text-indigo-200': '#c7d2fe',
    'text-teal-200': '#99f6e4',
    'text-sky-200': '#bae6fd',
    'text-purple-200': '#e9d5ff',
    'text-blue-100': '#dbeafe',
    'text-red-200': '#fecaca',
    'text-fuchsia-200': '#fbcfe8',
    'text-orange-300': '#fdba74',
    'text-cyan-100': '#cffafe',
    'text-yellow-200': '#fef08a',
    'text-green-200': '#bbf7d0',
    'text-rose-200': '#fecdd3',
    'text-violet-200': '#ddd6fe',
    'text-amber-200': '#fde68a',
    'text-pink-200': '#fbcfe8',
    'text-slate-200': '#e2e8f0',
  };

  const finalGlowColor = glowColor || glowColorMap[colorClass] || '#60a5fa';
  
  const [flicker] = useState(1);
  const [glitch] = useState(0);

  return (
    <div className="relative group/hologram">
      {/* Glitch layers */}
      <motion.span
        style={{ x: glitch + 1, opacity: 0.2 * flicker }}
        className={`absolute inset-0 blur-[1px] text-red-500/40 pointer-events-none select-none italic font-black uppercase tracking-[0.2em] ${sizeClass} block text-center whitespace-normal leading-tight mx-auto max-w-full`}
      >
        {text}
      </motion.span>
      <motion.span
        style={{ x: -glitch - 1, opacity: 0.2 * flicker }}
        className={`absolute inset-0 blur-[1px] text-cyan-500/40 pointer-events-none select-none italic font-black uppercase tracking-[0.2em] ${sizeClass} block text-center whitespace-normal leading-tight mx-auto max-w-full`}
      >
        {text}
      </motion.span>

      {/* Main text with enhanced shimmer */}
      <motion.span
        className={`relative font-display font-black uppercase italic tracking-[0.2em] leading-tight ${sizeClass} block text-center whitespace-normal mx-auto max-w-full`}
        style={{
          opacity: flicker,
          filter: `drop-shadow(0 0 10px ${finalGlowColor}BB)`,
          textShadow: `0 0 5px ${finalGlowColor}66`
        }}
      >
        {/* Shimmer overlay 1 - Silver/White */}
        <motion.span
          className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_100%] pointer-events-none z-10 mix-blend-overlay"
          style={{
            backgroundPositionX: useTransform(progress, [0, 1], ["-150%", "350%"])
          }}
        >
          {text}
        </motion.span>

        {/* Shimmer overlay 2 - Spectral/Ethereal */}
        <motion.span
          className={`absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-transparent via-${colorClass.replace('text-', '')}/40 to-transparent bg-[length:200%_100%] pointer-events-none z-10`}
          style={{
            backgroundPositionX: useTransform(progress, [0, 1], ["-200%", "300%"]),
            filter: 'blur(2px) brightness(2)'
          }}
        >
          {text}
        </motion.span>
        
        <span className={`${colorClass} transition-colors duration-500`}>{text}</span>
      </motion.span>
      
      {/* Background ethereal glow */}
      <motion.span
        className={`absolute inset-0 font-display font-black uppercase italic tracking-[0.2em] leading-none ${sizeClass} block text-center whitespace-nowrap ${colorClass} pointer-events-none select-none z-0`}
        style={{
          opacity: useTransform(progress, [0.3, 0.5, 0.7], [0.05, 0.2, 0.05]),
          scale: useTransform(progress, [0, 1], [0.98, 1.15]),
          filter: 'blur(12px) brightness(2.5)'
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};


const CosmicEntity = ({ position, color, speed, distort, progress, name, data, type = 'sphere' }: { position: [number, number, number], color: string, speed: number, distort: number, progress: any, name?: string, data?: string, type?: 'sphere' | 'box' | 'torus' | 'ico' }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Smooth normalized progress for Three.js
  const smoothProgress = useSpring(progress as any, { 
    stiffness: 40, 
    damping: 15,
    mass: 1.2
  });

  const currentDistort = useTransform(smoothProgress as any, [0, 1], [distort, distort * 3.5]);
  const currentSpeed = useTransform(smoothProgress as any, [0, 1], [speed, speed * 5]);
  const currentOpacity = useTransform(smoothProgress as any, [0, 1], [0.65, 0.9]);
  const currentScale = useTransform(smoothProgress as any, [0, 1], [1, 1.4]);
  const currentEmissive = useTransform(smoothProgress as any, [0, 1], [0.05, 8.0]);
  const currentInnerEmissive = useTransform(smoothProgress as any, [0, 1], [0.1, 20.0]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const s = currentSpeed.get() as number;
    const d = currentDistort.get() as number;
    const op = currentOpacity.get() as number;
    const baseScale = currentScale.get() as number;
    const time = state.clock.getElapsedTime();
    const scrollVal = smoothProgress.get() as any as number;
    
    const rotationFactor = 1 + scrollVal * 2;
    mesh.current.rotation.x += delta * s * (hovered ? 2.2 : 1) * rotationFactor;
    mesh.current.rotation.y += delta * s * (hovered ? 1.8 : 0.8) * rotationFactor;
    
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * s * 2 * rotationFactor;
      innerRef.current.rotation.z += delta * s * 1.5 * rotationFactor;
    }
    
    const targetScale = clicked ? baseScale * 1.5 : (hovered ? baseScale * 1.3 : baseScale);
    const pulseIntensity = (d * 0.15) + (scrollVal * 0.2);
    const scrollPulseTime = time * (2.5 + scrollVal * 4);
    const pulse = targetScale + Math.sin(hovered ? time * 6 : scrollPulseTime) * pulseIntensity;
    mesh.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
    
    const p = smoothProgress.get() as any as number;
    const baseColor = new THREE.Color(color);
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl);
    // Make it more vibrant and brighter as p approaches 1, and dimmer as p approaches 0
    const targetS = THREE.MathUtils.lerp(0.05, Math.min(1.0, hsl.s * 1.5 + 0.2), p);
    const targetL = THREE.MathUtils.lerp(0.02, Math.min(0.8, hsl.l * 1.2 + 0.4), p);
    const targetH = (hsl.h + (p * 0.1)) % 1.0;
    
    const scrollColor = baseColor.clone().setHSL(targetH, targetS, targetL);
    const finalTargetColor = hovered ? new THREE.Color("#ffffff") : scrollColor;
    const lerpSpeed = delta * 2.5;

    if (materialRef.current) {
      const e = currentEmissive.get() as number;
      
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, hovered ? d * 1.8 : d, lerpSpeed);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, hovered ? s * 1.2 : s, lerpSpeed);
      
      const opacityPulse = Math.sin(scrollPulseTime) * 0.15 * scrollVal;
      const targetOpacity = (hovered ? 1 : op) + opacityPulse;
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, lerpSpeed);
      
      const targetEmissive = clicked ? Math.max(e * 1.5, 12.0) : (hovered ? Math.max(e * 1.3, 10.0) : e);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, targetEmissive, lerpSpeed);

      materialRef.current.color.lerp(finalTargetColor, lerpSpeed);
      materialRef.current.emissive.lerp(finalTargetColor, lerpSpeed);
    }

    if (innerRef.current) {
      const mat = innerRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const innerE = currentInnerEmissive.get() as number;
        const targetInnerE = clicked ? Math.max(innerE * 1.5, 30.0) : (hovered ? Math.max(innerE * 1.3, 25.0) : innerE);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetInnerE, lerpSpeed);
        mat.emissive.lerp(finalTargetColor, lerpSpeed);
        mat.color.lerp(finalTargetColor, lerpSpeed);
      }
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2}>
      <group>
        <mesh 
          ref={mesh} 
          position={position} 
          onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; setClicked(false); }}
          onClick={(e) => { e.stopPropagation(); setClicked(!clicked); }}
        >
          {type === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
          {type === 'box' && <boxGeometry args={[1.2, 1.2, 1.2, 1, 1, 1]} />}
          {type === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
          {type === 'ico' && <icosahedronGeometry args={[1, 3]} />}
          
          <MeshTransmissionMaterial
            ref={materialRef}
            color={color}
            thickness={2.5}
            roughness={0}
            transmission={0.9}
            ior={1.4}
            chromaticAberration={0.8}
            anisotropy={0.5}
            distortion={distort}
            distortionScale={0.3}
            temporalDistortion={0.2}
            emissive={color}
            emissiveIntensity={1.2}
            samples={6} // Lower samples for performance
          />

          <mesh ref={innerRef}>
            <icosahedronGeometry args={[0.6, 1]} />
            <meshStandardMaterial 
              color="#fff" 
              emissive={color} 
              emissiveIntensity={15} 
              wireframe 
              transparent 
              opacity={0.4}
            />
          </mesh>

          {(hovered || clicked) && name && (
            <Html distanceFactor={10} center>
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`pointer-events-none px-6 py-5 rounded-[2rem] border backdrop-blur-3xl transition-all duration-700 shadow-[0_0_100px_rgba(0,0,0,0.8)] ${clicked ? 'bg-black/95 border-blue-500/60 scale-110' : 'bg-black/80 border-white/10'}`}
              >
                <div className="text-base font-display font-black text-white uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, color }} />
                  <HolographicText 
                    text={name} 
                    colorClass="text-white" 
                    sizeClass="text-base" 
                    progress={progress} 
                    glowColor={color} 
                  />
                </div>
                {clicked && data && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] font-mono text-white/50 mt-4 uppercase max-w-[220px] whitespace-pre-wrap leading-relaxed border-t border-white/10 pt-4 tracking-[0.15em]"
                  >
                    {data}
                  </motion.div>
                )}
              </motion.div>
            </Html>
          )}
        </mesh>
        
        {/* Holographic Containment Rings */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={position} rotation={[Math.PI / 2 + (i * 0.2), i * 0.5, 0]}>
            <torusGeometry args={[1.8 + i * 0.2, 0.005, 8, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.3 - i * 0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const DataWaves = ({ progress }: { progress: any }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 800 : 3000; // Increased base count
  
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  const shaderRef = useRef<any>(null);
  const [pulseAt, setPulseAt] = useState<number>(0);
  const [hovered, setHovered] = useState(false);
  
  const smoothProgress = useSpring(progress as any, { stiffness: 40, damping: 20 }) as any;
  const speedScale = useTransform(smoothProgress, [0, 1], [0.05, 1.2]) as any; // Increased speed scale
  const opacityValue = useTransform(smoothProgress, [0, 1], [0.2, 0.8]) as any;
  const sizeValue = useTransform(smoothProgress, [0, 1], [0.05, 0.25]) as any;
  const waveIntensity = useTransform(smoothProgress, [0, 1], [0.2, 5.0]) as any;

  useFrame((state) => {
    if (!pointsRef.current || !shaderRef.current) return;
    
    // Dynamically adjust density based on smooth progress
    const currentProgress = smoothProgress.get() as number;
    // Base density + progress-based density (density increases in latter half)
    const activeCount = Math.floor(count * (0.2 + currentProgress * 0.8));
    pointsRef.current.geometry.setDrawRange(0, activeCount);

    const time = state.clock.getElapsedTime();
    const s = (speedScale.get() as number) * (hovered ? 2 : 1);
    const w = waveIntensity.get() as number;

    pointsRef.current.rotation.y = time * s;
    pointsRef.current.rotation.x = time * (s * 0.4);

    // Update uniforms for vertex shader animation
    shaderRef.current.uniforms.uTime.value = time;
    shaderRef.current.uniforms.uWaveIntensity.value = w;

    const timeSincePulse = time - pulseAt;
    const pulseIntensity = pulseAt > 0 && timeSincePulse < 1.5 ? Math.max(0, 1.5 - timeSincePulse) : 0;
    
    shaderRef.current.uniforms.uOpacity.value = (opacityValue.get() as number) + pulseIntensity * 0.6;
    shaderRef.current.uniforms.uPointSize.value = (sizeValue.get() as number) + pulseIntensity * 0.4;
    
    if (pulseIntensity > 0) {
      shaderRef.current.uniforms.uColor.value.setHex(0x60a5fa);
    } else {
      const pColor = smoothProgress.get() as any as number;
      const colorShift = new THREE.Color(0x3b82f6).offsetHSL(pColor * 0.3, pColor * 0.1, pColor * 0.2);
      shaderRef.current.uniforms.uColor.value.lerp(colorShift, 0.1);
    }
  });

  const waveShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uWaveIntensity: { value: 1.0 },
      uPointSize: { value: 0.1 },
      uOpacity: { value: 0.4 },
      uColor: { value: new THREE.Color(0x3b82f6) },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uWaveIntensity;
      uniform float uPointSize;
      void main() {
        vec3 pos = position;
        float time08 = uTime * 0.8;
        float time04 = uTime * 0.4;
        pos.y += sin(time08 + pos.x * 0.15 + pos.z * 0.15) * uWaveIntensity * cos(time04 + pos.x * 0.05);
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = uPointSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        float strength = 1.0 - dist * 2.0;
        gl_FragColor = vec4(uColor, strength * uOpacity);
      }
    `,
  }), []);

  return (
    <points 
      ref={pointsRef}
      onClick={(e) => {
        e.stopPropagation();
        setPulseAt(state => state === 0 ? 0.01 : pointsRef.current?.visible ? (pointsRef.current as any).uuid && THREE.MathUtils.randFloat(0, 1000) : 0); // Trigger pulse handle
        // Better way: use state.clock directly if available, else Date.now() / 1000
        setPulseAt(performance.now() / 1000);
      }}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'crosshair'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial 
        ref={shaderRef}
        args={[waveShader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HolographicGrid = ({ progress }: { progress: any }) => {
  const gridRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2 - 1;
    }
  });

  return (
    <group position={[0, -10, -5]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper args={[100, 40, "#1e40af", "#020617"]} />
      <mesh ref={gridRef}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} wireframe />
      </mesh>
    </group>
  );
};

const InteractiveScene = ({ progress }: { progress: any }) => {
  const { camera, scene, gl } = useThree();
  const lightRef = useRef<THREE.PointLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const smoothProgress = useSpring(progress as any, { stiffness: 40, damping: 20 });
  
  useFrame((state) => {
    const p = (smoothProgress.get() as any) as number;
    const time = state.clock.getElapsedTime();

    // Living light pulse
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(time * 2) * 0.5;
    }
    
    // Dynamic spotlight highlighting interactions
    if (spotLightRef.current) {
      // Follow pointer smoothly
      spotLightRef.current.position.x = THREE.MathUtils.lerp(spotLightRef.current.position.x, state.pointer.x * 10, 0.05);
      spotLightRef.current.position.y = THREE.MathUtils.lerp(spotLightRef.current.position.y, 20 + state.pointer.y * 5, 0.05);
      // Adjust intensity and angle based on scroll
      spotLightRef.current.intensity = 1.5 + p * 2;
      spotLightRef.current.angle = 0.15 + p * 0.1;
    }
    
    // Enhanced dynamic camera drift based on scroll progress
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15 - p * 10, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, p * 5, 0.03);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(p * Math.PI * 0.8) * 5, 0.03);
    
    // Multi-axis rotation drift to create a sweeping cinematic effect
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, p * 0.15, 0.03);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -p * 0.1, 0.03);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, Math.cos(p * Math.PI * 0.5) * 0.1, 0.03);

    scene.background = new THREE.Color("#000000");
  });

  return (
    <>
      <OrbitControls 
        
        enablePan={false} 
        enableZoom={false} 
        enableRotate={true} 
        makeDefault 
        autoRotate={false}
        dampingFactor={0.05}
        rotateSpeed={0.3}
      />
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-15, -10, 5]} intensity={1.0} color="#a855f7" />
      <spotLight ref={spotLightRef} position={[0, 20, 0]} angle={0.15} penumbra={1} intensity={1.5} color="#e0f2fe" castShadow />
      
      <HolographicGrid progress={progress} />
      
      <CosmicEntity 
        position={[-6, 4, -5]} 
        color="#3b82f6" 
        speed={0.15} 
        distort={0.4} 
        progress={progress} 
        type="ico"
        name="Algorithmic Pulse" 
        data="Synthetic resonance frequency\nPulsation: Standard\nAlignment: Absolute\nState: Optimized" 
      />
      <CosmicEntity 
        position={[8, -5, -8]} 
        color="#ec4899" 
        speed={0.6} 
        distort={0.3} 
        progress={progress} 
        type="torus"
        name="Neural Web" 
        data="Synaptic connection density\nLatency: 0.1ms\nActive Neurons: 98B\nStatus: Synced" 
      />
      <CosmicEntity 
        position={[-2, -7, -12]} 
        color="#10b981" 
        speed={0.25} 
        distort={0.5} 
        progress={progress} 
        type="box"
        name="Data Vault" 
        data="Encrypted knowledge layers\nSecurity: Grade Alpha\nCapacity: Infinite\nProtocol: Delta-7" 
      />
      <CosmicEntity 
        position={[3, 6, -10]} 
        color="#8b5cf6" 
        speed={0.35} 
        distort={0.3} 
        progress={progress} 
        type="sphere"
        name="Core Singularity" 
        data="Recursive feedback loop\nEnergy: Critical\nStability: 99.98%\nOrigin: DeltaScope" 
      />
      
      <DataWaves progress={progress} />
      <Stars radius={100} depth={50} count={typeof window !== 'undefined' && window.innerWidth < 768 ? 1500 : 3000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

const AnimatedCelestialStars = ({ progress }: { progress: any }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const layers = [
    { count: 100, speed: 0.1, size: 'w-1 h-1', twinkleDuration: 3, opacity: 0.4 },
    { count: 50, speed: 0.3, size: 'w-1.5 h-1.5', twinkleDuration: 4, opacity: 0.6 },
    { count: 20, speed: 0.6, size: 'w-2 h-2', twinkleDuration: 2, opacity: 0.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-70">
      {layers.map((layer, i) => (
        <motion.div
          key={`star-layer-${i}`}
          className="absolute inset-[-10%]"
          style={{
            y: useTransform(progress, [0, 1], ['0%', `${layer.speed * 20}%`]),
            x: useTransform(mouseX, x => x * layer.speed),
            marginTop: useTransform(mouseY, y => y * layer.speed)
          }}
        >
          {Array.from({ length: layer.count }).map((_, j) => (
            <motion.div
              key={`star-${i}-${j}`}
              className={`absolute rounded-full bg-white ${layer.size}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: layer.opacity,
              }}
              animate={{
                opacity: [layer.opacity * 0.2, layer.opacity, layer.opacity * 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: layer.twinkleDuration + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const Cosmic3DVisualizer = ({ progress }: { progress: any }) => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none md:pointer-events-auto" aria-hidden="true" role="img" aria-label="Interactive 3D cosmic visualization of data waves and stars">
      <AnimatedCelestialStars progress={progress} />
      <Canvas 
        performance={{ min: 0.5 }} 
        dpr={[0.5, 1]} 
        gl={{ 
          powerPreference: "high-performance", 
          antialias: false, 
          alpha: true,
          stencil: false,
          depth: true,
          precision: "lowp"
        }}
        flat
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
        <InteractiveScene progress={progress} />
      </Canvas>
    </div>
  );
};

const SpaceshipIcon = ({ variant = 'scout', className = "" }: { variant?: 'scout' | 'interceptor' | 'carrier' | 'cruiser', className?: string }) => {
  const paths = {
    scout: "M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z",
    interceptor: "M12 2L2 22L12 18L22 22L12 2ZM12 5.17L18.83 19.32L12 16.58L5.17 19.32L12 5.17Z",
    carrier: "M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z",
    cruiser: "M12 2L1 21h22L12 2zm0 3.83L18.5 19H5.5L12 5.83z"
  };

  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current stroke-current`} fill="none" strokeWidth="1.5">
      <path d={paths[variant]} strokeLinecap="round" strokeLinejoin="round" />
      <motion.circle 
        cx="12" cy="12" r="2" 
        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="fill-blue-400/50"
      />
    </svg>
  );
};

const SatelliteDecorativeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7 9 3 5 7l4 4Z" />
    <path d="m17 11 4 4-4 4-4-4Z" />
    <path d="m4.5 15.5 2 2" />
    <path d="M12 12l.5.5" />
    <path d="m14 11 .5.5" />
    <path d="m20 7 2.5 2.5" />
    <path d="m3 21 6-6" />
    <path d="m11 20 2 2" />
    <path d="m16.5 14.5 2 2" />
  </svg>
);

const TelescopeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m10 10 3 3" />
    <path d="m16 4 5 5" />
    <path d="m3.5 20.5 5-5" />
    <path d="M15 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z" />
    <path d="M19 15.5h.5" />
    <path d="M13 6.5h.5" />
    <path d="m21 21-3-3" />
    <path d="M14.5 18.5 16 17" />
    <path d="m12 12-4 1" />
    <path d="m12 12-1 4" />
  </svg>
);

const MilkyWaySpiral = ({ className }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Central Pulsar Core */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 1, 0.6],
          boxShadow: [
            "0 0 20px rgba(147, 197, 253, 0.4)",
            "0 0 60px rgba(59, 130, 246, 0.8)",
            "0 0 20px rgba(147, 197, 253, 0.4)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-3 h-3 bg-white rounded-full z-10 blur-[1px]"
      />

      {/* Primary Spiral Layer with Intense Glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0%,_rgba(59,130,246,0.6)_15%,_rgba(147,197,253,0.8)_50%,_rgba(59,130,246,0.6)_85%,_transparent_100%)] rounded-full blur-[4px]"
      />

      {/* Secondary Counter-Spiral for Complexity */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 bg-[conic-gradient(from_180deg,_transparent_0%,_rgba(139,92,246,0.5)_20%,_rgba(216,180,254,0.6)_50%,_rgba(139,92,246,0.5)_80%,_transparent_100%)] rounded-full blur-[6px] mix-blend-screen opacity-70"
      />

      {/* Hyper-detailed Orbiting Stardust */}
      {[...Array(32)].map((_, i) => {
        const radius = 8 + Math.random() * 28;
        const initialRotate = (i * 11.25) + (Math.random() * 5);
        return (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              rotate: { duration: 4 + Math.random() * 12, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 1 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute w-[1px] h-[1px] bg-blue-50 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${initialRotate}deg) translateX(${radius}px)`,
            }}
          />
        );
      })}

      {/* Volumetric Nebula Aura */}
      <div className="absolute inset-[-8px] bg-blue-600/10 rounded-full blur-2xl" />
      <div className="absolute inset-[-2px] border border-white/10 rounded-full opacity-30" />
    </div>
  );
};

const CelestialBody = () => {
  const { scrollYProgress: rawScrollProgress } = useScroll();
  const scrollYProgress = useSpring(rawScrollProgress, { stiffness: 50, damping: 25, restDelta: 0.001 });
  const [pulse, setPulse] = useState(0);
  
  // Transitions for colors and properties
  // 0: Sun, 0.25: Moon, 0.5: Jupiter, 0.75: Earth, 1: Neptune
  const bodyColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "radial-gradient(circle_at_30%_30%, #fff 0%, #fbbf24 20%, #ea580c 50%, #7c2d12 80%)", // Sun
      "radial-gradient(circle_at_30%_30%, #fff 0%, #d1d5db 40%, #4b5563 80%, #1f2937 100%)", // Moon
      "radial-gradient(circle_at_30%_30%, #fde68a 0%, #d97706 30%, #7c2d12 60%, #451a03 90%)", // Jupiter
      "radial-gradient(circle_at_30%_30%, #3b82f6 0%, #10b981 40%, #1e3a8a 80%, #000 100%)", // Earth
      "radial-gradient(circle_at_30%_30%, #06b6d4 0%, #3b82f6 50%, #1e40af 80%, #1e3a8a 100%)", // Neptune
      "radial-gradient(circle_at_30%_30%, #fff 0%, #fbbf24 20%, #ea580c 50%, #7c2d12 80%)" // Cycle back to Sun
    ]
  );

  const shadowColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "rgba(234, 88, 12, 0.6)",
      "rgba(156, 163, 175, 0.2)",
      "rgba(217, 119, 6, 0.4)",
      "rgba(59, 130, 246, 0.3)",
      "rgba(6, 182, 212, 0.4)",
      "rgba(234, 88, 12, 0.6)"
    ]
  );

  const glowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.5, 0.2, 0.4, 0.3, 0.4]);
  const glowColorVal = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(251, 191, 36, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(217, 119, 6, 1)",
      "rgba(59, 130, 246, 1)",
      "rgba(6, 182, 212, 1)"
    ]
  );
  
  const outerShadow = useTransform(shadowColor, c => `0 0 150px ${c}`);
  const surfaceOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 0.3, 0]);

  // Movement on scroll
  const xMovement = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const yMovement = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  return (
    <motion.div 
      style={{ x: xMovement, y: yMovement, scale: scaleScroll }}
      whileHover={{ scale: 1.05 }}
      onTap={() => setPulse(p => p + 1)}
      className="absolute top-[18%] right-[12%] w-[35vw] aspect-square max-w-md pointer-events-auto cursor-pointer z-0 group"
    >
      <motion.div 
        style={{ backgroundColor: glowColorVal, opacity: glowOpacity }}
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        key={`pulse-${pulse}`}
        transition={{ 
          duration: pulse > 0 ? 0.8 : 18, 
          repeat: pulse > 0 ? 0 : Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 blur-[140px] rounded-full group-hover:opacity-100 group-hover:blur-[180px] transition-all duration-700"
      />
      
      <motion.div
        style={{ background: bodyColor }}
        className="absolute inset-[35%] rounded-full overflow-hidden group-hover:inset-[33%] transition-all duration-500"
      >
        {/* Dynamic Surface Pattern */}
        <motion.div 
          animate={{ x: [-30, 30], y: [-30, 30] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
          className="absolute inset-[-100%] opacity-20 bg-[radial-gradient(circle_at_center,#fff,transparent)] blur-2xl pointer-events-none"
        />
        
        {/* Planet Specific Features (Jupiter Bands) */}
        <motion.div 
          style={{ opacity: surfaceOpacity }}
          className="absolute inset-0 flex flex-col justify-around rotate-12"
          animate={{ rotate: [12, -12, 12] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-black/20 blur-md" />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Rapid Energy Pulse Overlay */}
      <AnimatePresence>
        {pulse > 0 && (
          <motion.div
            key={`pulse-fx-${pulse}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 2.5, opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 border-4 border-white/30 rounded-full blur-md"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SymbolIcon = ({ symbolId, color, size = 24, className = "" }: { symbolId: string, color?: string, size?: number, className?: string }) => {
  const symbol = SYMBOLS.find(s => s.id === symbolId);
  if (!symbol) return null;
  
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={`fill-none stroke-2 ${className}`} 
      style={{ stroke: color || symbol.color }}
    >
      <motion.path 
        d={symbol.path} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
};

const NAV_TABS = [
  { id: 'home', label: 'Home', symbolId: 'alpha' },
  { id: 'vision', label: 'our vision', symbolId: 'omega' },
  { id: 'command-hub', label: 'Platform', symbolId: 'gamma' },
  { id: 'dashboard', label: 'DASHBOARDS', symbolId: 'sigma' },
  { id: 'services', label: 'Services', symbolId: 'phi' },
  { id: 'industries', label: 'Industries', symbolId: 'theta' },
  { id: 'pricing', label: 'Pricing', symbolId: 'delta' },
  { id: 'about', label: 'About us', symbolId: 'figma' },
  { id: 'case-studies', label: 'Case Studies', symbolId: 'beta' },
  // Brand Book intentionally hidden from public nav. Source remains in repo;
  // route is also removed from URL_TO_TAB below so the page is unreachable from the site.
  { id: 'contact', label: 'Contact', symbolId: 'phi' },
];

const URL_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/vision': 'vision',
  '/platform': 'command-hub',
  '/dashboard': 'dashboard',
  '/services': 'services',
  '/industries': 'industries',
  '/pricing': 'pricing',
  '/company': 'about',
  '/case-studies': 'case-studies',
  '/contact': 'contact',
};

const TAB_TO_URL: Record<string, string> = Object.fromEntries(
  Object.entries(URL_TO_TAB).map(([url, tab]) => [tab, url])
);

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dscope - Enterprise AI Automation Platform',
  '/vision': 'Vision - Dscope',
  '/platform': 'Platform - Multi-Tasking AI Automation - Dscope',
  '/dashboard': 'Dashboards - Dscope',
  '/services': 'Services - Dscope',
  '/industries': 'Industries - Dscope',
  '/pricing': 'Pricing - Dscope',
  '/company': 'Company - Dscope',
  '/case-studies': 'Case Studies - Dscope',
  '/brand-book': 'Brand Book - Dscope',
  '/contact': 'Contact - Dscope',
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Dscope. Multi-tasking AI automation platform. Planetary-scale AI infrastructure architected for modern enterprises. Precision Target. Galactic Reach. Quantum Logic.',
  '/vision': 'The Dscope vision - an AI automation platform that unifies support, service, sales, and marketing into one orchestrated decagon of intelligence.',
  '/platform': 'The Dscope platform - a multi-tasking AI automation engine built on decagon architecture. Real-time agents, orbital relays, and a neural integration node.',
  '/dashboard': 'Live Dscope dashboards. Operational intelligence and analytics surfaces for enterprise AI deployments.',
  '/services': 'Dscope services - implementation, integration, and managed operations for enterprise AI automation.',
  '/industries': 'Dscope in the wild - travel, finance, education, real estate, government, and beyond. Industry-specific deployments at planetary scale.',
  '/pricing': 'Dscope decagon pricelist. Transparent enterprise pricing for the multi-tasking AI automation platform. Updating - final v2.1 pricing lands soon.',
  '/company': 'The Dscope company - mission, vision, and operating philosophy behind the AI automation platform.',
  '/case-studies': 'Dscope case studies. How enterprise teams ship AI automation faster with the decagon platform.',
  '/brand-book': 'The Dscope brand book - typography, color, symbols, motion, and the cosmic visual language.',
  '/contact': 'Talk to the Dscope team. Schedule a platform walk-through, request a pilot, or contact the founders directly.',
};

const RealisticComet = () => {
  return null;
};

const GalaxyNebula = ({ scrollYProgress: rawScrollProgress, mouseX, mouseY }: any) => {
  const scrollYProgress = useSpring(rawScrollProgress as any, { stiffness: 40, damping: 20 });
  const yTranslate = useTransform(scrollYProgress as any, [0, 1], [0, -100]);
  const driftX = useTransform(mouseX as any, (x: number) => x * 0.3);
  const driftY = useTransform(mouseY as any, (y: number) => y * 0.3);
  const combinedY = useTransform([yTranslate, driftY] as any[], ([yT, dY]: any) => (yT as number) + (dY as number));

  return (
    <motion.div
      animate={{
        rotate: [0, 360],
        backgroundColor: ["rgba(49, 46, 129, 0.1)", "rgba(88, 28, 135, 0.1)", "rgba(127, 29, 29, 0.1)", "rgba(49, 46, 129, 0.1)"]
      }}
      style={{ 
        y: combinedY as any,
        x: driftX as any
      }}
      transition={{ 
        rotate: { duration: 180, repeat: Infinity, ease: "linear" },
        backgroundColor: { duration: 30, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] rounded-full blur-[180px] pointer-events-none"
    />
  );
};

const StarLayer = ({ stars, layer, scrollYProgress: rawScrollProgress, mouseX, mouseY }: any) => {
  const scrollYProgress = useSpring(rawScrollProgress as any, { stiffness: 50, damping: 30 });
  // Speed adjustment: Deep layers move much more than top layers on scroll
  const yTranslate = useTransform(scrollYProgress as any, [0, 1], [0, -(layer + 2) * 150]);
  
  // Density adjustment: stars become more prominent/dense as you scroll deeper
  const layerOpacity = useTransform(scrollYProgress as any, [0, 0.5, 1], [0.3 + (layer * 0.1), 0.7 + (layer * 0.05), 1]);
  
  // Depth effect: stars feel like they are rushing past
  const scale = useTransform(scrollYProgress as any, [0, 1], [1, 1 + (layer * 0.1)]);
  
  return (
    <motion.div
      style={{ 
        y: yTranslate as any,
        opacity: layerOpacity as any,
        scale: scale as any,
        '--mouse-x': mouseX,
        '--mouse-y': mouseY
      } as any}
      className="absolute inset-0 pointer-events-none"
    >
    {stars.map((star: any) => (
      <motion.div
        key={star.id}
        animate={{
          opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: star.duration / 1.5, // Faster twinkling
          repeat: Infinity,
          delay: star.delay
        }}
        className="absolute rounded-full bg-white shadow-sm"
        style={{
          width: `${star.size}px`,
          height: `${star.size}px`,
          top: star.top,
          left: star.left,
          boxShadow: star.size > 2 ? `0 0 15px rgba(255,255,255,0.6)` : 'none',
          filter: `hue-rotate(${star.hue}deg)`,
          // Use CSS calc for individual parallax response
          transform: `translate(calc(var(--mouse-x) * ${star.driftFactor}px), calc(var(--mouse-y) * ${star.driftFactor}px))`,
        }}
      />
    ))}
    </motion.div>
  );
};


const AmbientEtherealParticles = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const particles = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      angle: Math.random() * Math.PI * 2,
      distanceBase: 5 + Math.random() * 45, // Base distance from center in % of viewport
      size: Math.random() * 8 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -30,
      color: Math.random() > 0.7 ? '#60a5fa' : (Math.random() > 0.4 ? '#818cf8' : (Math.random() > 0.2 ? '#c084fc' : '#ffffff')),
      speed: 0.5 + Math.random() * 1.5,
      orbitSpeed: (Math.random() - 0.5) * 0.02,
      blur: 2 + Math.random() * 10
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen bg-transparent">
      {particles.map((p) => {
        // Orbiting and radial expansion combined
        const x = useTransform(scrollYProgress, (prog: number) => {
          const orbitAngle = p.angle + (prog * p.orbitSpeed * 100);
          const currentDist = p.distanceBase * (1 + prog * 4.0 * p.speed);
          return `${Math.cos(orbitAngle) * currentDist}vw`;
        });
        
        const y = useTransform(scrollYProgress, (prog: number) => {
          const orbitAngle = p.angle + (prog * p.orbitSpeed * 100);
          const currentDist = p.distanceBase * (1 + prog * 4.0 * p.speed);
          return `${Math.sin(orbitAngle) * currentDist}vh`;
        });

        const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [p.opacity, p.opacity * 1.8, p.opacity * 0.4, 0]);
        const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);

        return (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: `blur(${p.blur}px)`,
              boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
              opacity,
              scale,
              x,
              y,
            }}
            animate={{
              opacity: [null, p.opacity * 1.5, p.opacity],
              scale: [null, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </div>
  );
};

const SpaceBackground = memo(() => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  
  const { scrollYProgress: rawScrollProgress } = useScroll();
  const scrollYProgress = useSpring(rawScrollProgress, { stiffness: 40, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Larger range for more subtle individual movement
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 80);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile, mouseX, mouseY]);

  const starLayers = useMemo(() => {
    return [0, 1, 2, 3, 4].map(layer => {
      const count = isMobile ? (40 - layer * 5) : (80 - layer * 10);
      return [...Array(count)].map((_, i) => ({
        id: `${layer}-${i}`,
        size: Math.random() * (1 + layer * 0.5) + 0.5,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0.15 + Math.random() * 0.85,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 5,
        hue: Math.random() * 360,
        // Individual drift factor based on layer and randomness for multi-planar effect
        driftFactor: (0.1 + layer * 0.15) * (0.8 + Math.random() * 0.4)
      }));
    });
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-[#000003]" aria-hidden="true">
      {/* Film Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }} />
      
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-black" />

      {/* Realistic Comets */}
      {[...Array(isMobile ? 12 : 6)].map((_, i) => (
        <RealisticComet key={`comet-${i}`} />
      ))}

      {/* Cycling Galaxy Nebulae */}
      <GalaxyNebula scrollYProgress={scrollYProgress} mouseX={smoothMouseX} mouseY={smoothMouseY} />

      {/* Ambient Ethereal Particles */}
      <AmbientEtherealParticles scrollYProgress={scrollYProgress} />

      {/* Parallax Stars */}
      <CelestialBody />
      <div className="absolute inset-[-10%] w-[120%] h-[120%]">
        {starLayers.map((stars, layer) => (
          <StarLayer 
            key={layer} 
            stars={stars} 
            layer={layer} 
            scrollYProgress={scrollYProgress} 
            mouseX={smoothMouseX}
            mouseY={smoothMouseY} 
          />
        ))}
      </div>

      {/* Speed Lines for Velocity Effect */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`velocity-${i}`}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "200%", opacity: [0, 0.2, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 15,
            delay: i * 5
          }}
          className="absolute w-[300px] h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[2px] top-1/4 rotate-45 pointer-events-none"
          style={{ top: `${10 + i * 25}%` }}
        />
      ))}
    </div>
  );
});


const RotatingDelta = ({ className = "" }: { className?: string }) => {
  const [step, setStep] = useState(0); // 0: Δ, 1: D, 2: Delta, 3: auto

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getLabel = () => {
    switch (step) {
      case 0: return "Δ";
      case 1: return "D";
      case 2: return "Delta";
      case 3: return "auto";
      default: return "Δ";
    }
  };

  return (
    <motion.span 
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className={`inline-block font-black text-emerald-400 ${className}`}
      aria-hidden="true"
    >
      {getLabel()}
    </motion.span>
  );
};

const LazyCosmicLoader = lazy(() => import('./components/CosmicLoader').then(m => ({ default: m.CosmicLoader })));
const CosmicLoader = (props: any) => <Suspense fallback={null}><LazyCosmicLoader {...props} /></Suspense>;
export const GlobalLoader = CosmicLoader;

// Cosmic Loader Cleaned

const DeltaHover = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0, rotate: 720 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -right-2 z-50 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-[0_0_10px_rgba(16,185,129,0.8)] border border-white/20"
          >
            Δ
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Logo = ({ className = "", cycling = false, ['aria-label']: ariaLabel = "DeltaScope Home" }: { className?: string, cycling?: boolean, ['aria-label']?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [logoState, setLogoState] = useState(0); // 0: Delta sym, 1: D, 2: Delta, 3: auto

  useEffect(() => {
    // Logo cycles its first symbol (Δ / D / Delta / auto) followed by the fixed
    // "Scope" wordmark. Opt-in via `cycling`. Header Logo passes cycling=true so
    // visitors see the brand transformation on every page.
    if (!cycling) return;
    // PERF: pause the cycle when the tab is hidden, restart when visible.
    let timer: ReturnType<typeof setInterval> | null = null;
    const startCycle = () => {
      if (timer) return;
      timer = setInterval(() => {
        setLogoState((prev) => (prev + 1) % 4);
      }, 3000);
    };
    const stopCycle = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const handleVisibility = () => {
      if (typeof document === 'undefined') return;
      if (document.hidden) stopCycle();
      else startCycle();
    };
    const delay = setTimeout(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      startCycle();
    }, 1500);
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibility);
    }
    return () => {
      clearTimeout(delay);
      stopCycle();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibility);
      }
    };
  }, [cycling]);

  const getAnimatedPart = () => {
    switch (logoState) {
      case 0: return "Δ";
      case 1: return "D";
      case 2: return "Delta";
      case 3: return "auto";
      default: return "Δ";
    }
  };

  // Cycle accent color in lockstep with the symbol: green → blue → pink → ...
  const LOGO_COLORS = ['text-emerald-400', 'text-blue-400', 'text-pink-400'];
  const currentLogoColor = LOGO_COLORS[logoState % LOGO_COLORS.length];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onKeyDown={(e) => { if (e.key === 'Enter') window.scrollTo({ top: 0, behavior: 'smooth' })}}
      className={`flex items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-2 -m-2 relative overflow-visible transition-all duration-500 ${className}`}
    >
      <div className="flex items-center font-display font-black tracking-tighter">
        <motion.span
          animate={{
            color: isHovered ? "#3b82f6" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
          className="text-white text-xl md:text-2xl uppercase flex items-center"
        >
          <motion.span
            layout
            transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
            className="inline-flex items-center overflow-hidden leading-none py-[0.05em]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={logoState}
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: '0%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className={`${currentLogoColor} inline-block leading-none transition-colors duration-700`}
              >
                {getAnimatedPart()}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <motion.span layout transition={{ layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }} className="ml-0.5">Scope</motion.span>
        </motion.span>
      </div>

      
      {/* Glimmer Animation Sweep */}
      <motion.div 
        initial={{ x: '-100%', skewX: -45, opacity: 1 }}
        animate={{ x: '200%', opacity: [1, 1, 0] }}
        transition={{ duration: 3, ease: "linear" }}
        className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.2 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap pointer-events-none hidden md:block"
          >
            <div className="flex flex-col gap-0.5 border-l border-blue-500/30 pl-3">
               <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-bold block">
                 Delta Scope Application
               </span>
               <span className="text-xs text-white/50 tracking-tight font-light italic">
                 Industry scale automation infrastructure
               </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const RealisticSatellite = ({ className = "", id }: { className?: string, id?: string }) => {
  return (
    <svg id={id} viewBox="0 0 24 24" className={`satellite-icon ${className} fill-none drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {/* Structural Central Body */}
      <rect x="9" y="8" width="6" height="8" rx="0.5" className="fill-zinc-800" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <rect x="10" y="9" width="4" height="6" className="fill-zinc-700/50" />
      <rect x="11.5" y="10.5" width="1" height="3" className="fill-blue-500/20" />
      
      {/* Professional Solar Arrays */}
      <g>
        <rect x="1" y="9" width="8" height="6" rx="0.2" className="fill-blue-900/40" stroke="#3b82f6" strokeWidth="0.3" />
        <path d="M1 10.5h8M1 12h8M1 13.5h8M3 9v6M6 9v6" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" />
      </g>
      <g>
        <rect x="15" y="9" width="8" height="6" rx="0.2" className="fill-blue-900/40" stroke="#3b82f6" strokeWidth="0.3" />
        <path d="M15 10.5h8M15 12h7M15 13.5h8M18 9v6M21 9v6" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" />
      </g>
      
      {/* Communication Dishes and Antennas */}
      <path d="M12 8 L12 5 M10 6 L14 6" stroke="#94a3b8" strokeWidth="0.5" />
      <circle cx="12" cy="5" r="0.5" className="fill-blue-400" />
      
      {/* Interaction Sensors */}
      <motion.circle 
        cx="12" cy="12" r="0.4" 
        animate={{ opacity: [0.3, 1, 0.3] }} 
        transition={{ duration: 1.5, repeat: Infinity }} 
        className="fill-red-500" 
      />
    </svg>
  );
};

const RealisticAstronaut = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      className={`${className} fill-none drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Backpack / Life Support */}
      <rect x="25" y="35" width="50" height="45" rx="4" className="fill-zinc-400 stroke-zinc-500" strokeWidth="1" />
      
      {/* Main Suit Body */}
      <rect x="30" y="30" width="40" height="50" rx="8" className="fill-zinc-100" />
      
      {/* Limbs with subtle movement */}
      <motion.g animate={{ rotate: [0, 5, 0] }} style={{ transformOrigin: "35px 40px" }}>
        <path d="M30 45 L15 55 L10 70" stroke="#d4d4d8" strokeWidth="8" strokeLinecap="round" />
      </motion.g>
      <motion.g animate={{ rotate: [0, -5, 0] }} style={{ transformOrigin: "65px 40px" }}>
        <path d="M70 45 L85 55 L90 70" stroke="#d4d4d8" strokeWidth="8" strokeLinecap="round" />
      </motion.g>
      
      {/* Helmet */}
      <circle cx="50" cy="25" r="18" className="fill-zinc-100" />
      <motion.path 
        d="M38 22 c0-8 6-12 12-12 s12 4 12 12 v6 c0 6-6 10-12 10 s-12-4-12-10 v-6 z" 
        className="fill-slate-900 stroke-blue-500/50" 
        strokeWidth="1"
        animate={{ fill: ["#0f172a", "#1e293b", "#0f172a"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Blinking visor lights */}
      <motion.circle 
        cx="42" cy="18" r="1.5" 
        className="fill-blue-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle 
        cx="58" cy="18" r="1.5" 
        className="fill-red-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      
      {/* Chest Control Panel */}
      <rect x="42" y="40" width="16" height="12" rx="1" className="fill-zinc-800" />
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
        <circle cx="46" cy="44" r="1" className="fill-emerald-500" />
        <circle cx="50" cy="44" r="1" className="fill-blue-500" />
        <circle cx="54" cy="44" r="1" className="fill-amber-500" />
      </motion.div>
    </motion.svg>
  );
};

const FloatingTether = ({ points }: { points: { x1: number, y1: number, x2: number, y2: number } }) => {
  // Use a cubic bezier curve to make the tether look flexible
  const cx1 = points.x1 + (points.x2 - points.x1) * 0.25;
  const cy1 = points.y1 + 40; // Slack factor
  const cx2 = points.x2 - (points.x2 - points.x1) * 0.25;
  const cy2 = points.y2 + 20;

  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 0 }}>
      <motion.path
        d={`M ${points.x1} ${points.y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${points.x2} ${points.y2}`}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  );
};

const UFOPlate = ({ className = "" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-none drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]`} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15c0 2 4 3 8 3s8-1 8-3" className="fill-zinc-800" stroke="rgba(255,255,255,0.2)" />
      <path d="M21 12c0 2-4 4-9 4s-9-2-9-4 4-4 9-4 9 2 9 4z" className="fill-zinc-700" stroke="#22c55e" />
      <path d="M16 10c0-2-2-4-4-4s-4 2-4 4" className="fill-sky-400/20" stroke="#0ea5e9" />
      <motion.circle 
        cx="12" cy="14" r="0.5" 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ duration: 0.5, repeat: Infinity }}
        className="fill-green-400" 
      />
      <circle cx="8" cy="13" r="0.3" fill="white" opacity="0.5" />
      <circle cx="16" cy="13" r="0.3" fill="white" opacity="0.5" />
    </svg>
  );
};

const RealisticStarship = ({ className = "" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-none drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l-2 4h4l-2-4z" className="fill-zinc-100" />
      <path d="M10 6h4v12h-4z" className="fill-zinc-200" />
      <path d="M8 18h8l-1-2h-6l-1 2z" className="fill-zinc-300" />
      <path d="M7 10l3 2v4l-3 2V10zM17 10l-3 2v4l3 2V10z" className="fill-zinc-400" />
      <motion.path 
        d="M10 20l2 2 2-2" 
        animate={{ stroke: ['#3b82f6', '#60a5fa', '#3b82f6'], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.2, repeat: Infinity }}
        strokeWidth="2"
      />
    </svg>
  );
};

const RealisticButterfly = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className} w-20 h-20`}>
      <ModelViewer type="butterfly" isHovered={true} />
    </div>
  );
};

const RealisticViolin = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className} w-20 h-20`}>
      <ModelViewer type="violin" isHovered={true} />
    </div>
  );
};

const RealisticDragonfly = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className} w-20 h-20`}>
      <ModelViewer type="dragonfly" isHovered={true} />
    </div>
  );
};

const RealisticCyberButterfly = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className} w-20 h-20`}>
      <ModelViewer type="cyber_butterfly" isHovered={true} />
    </div>
  );
};

const RealisticNeonButterfly = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className} w-20 h-20`}>
      <ModelViewer type="neon_butterfly" isHovered={true} />
    </div>
  );
};

const RealisticPhaseDragonfly = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className} w-20 h-20`}>
      <ModelViewer type="phase_dragonfly" isHovered={true} />
    </div>
  );
};

const FlyingSatellite = memo(({ hoveredTabId, isNavOpen, tabs }: { hoveredTabId: string | null, isNavOpen: boolean, tabs: typeof NAV_TABS }) => {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;

  const [flybyType, setFlybyType] = useState(0); // 0-9 types
  const [flybyIteration, setFlybyIteration] = useState(0);
  
  const randomizeFlyby = React.useCallback(() => {
    setFlybyType(Math.floor(Math.random() * 10));
    setFlybyIteration(prev => prev + 1);
  }, []);

  // Rotate flyby type when it's hidden to avoid AnimatePresence exit loops
  useEffect(() => {
    if (isNavOpen || hoveredTabId) {
      randomizeFlyby();
    }
  }, [isNavOpen, hoveredTabId, randomizeFlyby]);

  const springConfig = useMemo(() => ({ damping: 30, stiffness: 120, mass: 1 }), []);
  const satX = useSpring(0, springConfig);
  const satY = useSpring(0, springConfig);

  useEffect(() => {
    if (isNavOpen || hoveredTabId) {
      if (isNavOpen) {
        const targetX = isMobile ? width * 0.85 : width * 0.9;
        const targetY = isMobile ? height * 0.15 : height * 0.2;
        satX.set(targetX);
        satY.set(targetY);
      } else if (hoveredTabId) {
        const itemIdx = tabs.findIndex(t => t.id === hoveredTabId);
        const tabX = isMobile ? (32 + itemIdx * 54) : (width / 2 - (tabs.length * 100) / 2 + itemIdx * 100 + 50);
        const tabY = isMobile ? height - 48 : height - 110;
        satX.set(tabX);
        satY.set(tabY);
      }
    }
  }, [hoveredTabId, isNavOpen, width, height, isMobile]); // Removed satX, satY

  const renderCurrentObject = (type: number, sizeClass: string) => {
    const colors = ["#3b82f6", "#34d399", "#a855f7"];
    const color = colors[type % 3];
    switch(type) {
      case 1: return <SpaceTech2D type="astronaut" color={color} />;
      case 2: return <SpaceTech2D type="ufo" color={color} />;
      case 3: return <SpaceTech2D type="spaceship" color={color} />;
      case 4: return <SpaceTech2D type="robot" color={color} />;
      case 5: return <SpaceTech2D type="mobile-phone" color={color} />;
      case 6: return <SpaceTech2D type="space-laboratory" color={color} />;
      case 7: return <SpaceTech2D type="water-waves" color={color} />;
      case 8: return <SpaceTech2D type="big-telescope" color={color} />;
      case 9: return <SpaceTech2D type="telescope" color={color} />;
      default: return <SpaceTech2D type="satellite" color={color} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[1001]">
      <AnimatePresence>
        {(!isNavOpen && !hoveredTabId) ? (
          <FlybyObject
            key={`flyby-${flybyIteration}`}
            flybyType={flybyType}
            width={width}
            height={height}
            renderCurrentObject={renderCurrentObject}
            onComplete={randomizeFlyby}
          />
        ) : (
          <motion.div
            key="controlled-sat"
            style={{ x: satX, y: satY }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ rotate: [5, 10, 5], y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <RealisticSatellite id="flying-satellite-icon" className="w-14 h-14 md:w-20 md:h-20 text-blue-400 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const AstronautSecretary = ({ className = "" }: { className?: string }) => (
  <motion.div 
    animate={{ 
      y: [0, -8, 0],
      rotate: [-1, 1, -1],
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={`relative ${className}`}
  >
    <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-blue-400" strokeWidth="1">
      {/* Helmet Outer */}
      <circle cx="50" cy="40" r="35" className="stroke-white/20" />
      {/* Visor Area */}
      <path d="M25 40 Q50 15 75 40 Q50 65 25 40" className="fill-blue-500/20 stroke-blue-400" />
      {/* Interior Reflection */}
      <path d="M35 30 Q50 20 65 30" className="stroke-white/40" />
      
      {/* Torso/Suit */}
      <path d="M20 75 Q50 100 80 75 L85 110 H15 L20 75" className="stroke-white/10" />
      
      {/* Floating Holographic Tablet */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="60" y="55" width="25" height="18" rx="2" className="fill-blue-500/10 stroke-blue-400/50" />
        <line x1="65" y1="60" x2="80" y2="60" className="stroke-blue-400/30" strokeWidth="0.5" />
        <line x1="65" y1="64" x2="75" y2="64" className="stroke-blue-400/30" strokeWidth="0.5" />
        <line x1="65" y1="68" x2="80" y2="68" className="stroke-blue-400/30" strokeWidth="0.5" />
      </motion.g>

      {/* Robot Arm holding phone */}
      <motion.g
        animate={{ rotate: [0, 5, 0] }}
        style={{ transformOrigin: "15px 80px" }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M15 80 L5 70 L5 55" className="stroke-white/30" />
        <rect x="2" y="45" width="8" height="12" rx="1" className="fill-white/10 stroke-white/40" />
        <circle cx="6" cy="47" r="0.5" className="fill-white/40" />
      </motion.g>

      {/* Floating Sparkles for Magic/AI feel */}
      <FloatingSparkles />
    </svg>
  </motion.div>
);

const FloatingSparkles = () => {
   const sparkles = React.useMemo(() => [...Array(5)].map(() => ({
       cx: 20 + Math.random() * 60,
       cy: 20 + Math.random() * 80
   })), [])

   return sparkles.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r="0.5"
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.4 }}
          className="fill-blue-300"
        />
   ))
}

const AstronautFigure = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <motion.div
      initial={{ x: 60, y: -60, rotate: 15, opacity: 0 }}
      animate={isHovered ? {
        x: 0,
        y: 0,
        rotate: 0,
        opacity: 1,
        scale: 0.4
      } : {
        x: [60, 70, 60],
        y: [-60, -50, -60],
        rotate: [15, 20, 15],
        opacity: 1,
        scale: 0.6
      }}
      transition={{ 
        duration: isHovered ? 0.8 : 4, 
        repeat: isHovered ? 0 : Infinity, 
        ease: "easeInOut" 
      }}
      className="absolute pointer-events-none z-20"
    >
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Helmet */}
        <circle cx="30" cy="20" r="15" fill="#E5E7EB" />
        <path d="M18 18C18 12.4772 23.3726 8 30 8C36.6274 8 42 12.4772 42 18V22C42 27.5228 36.6274 32 30 32C23.3726 32 18 27.5228 18 22V18Z" fill="#1F2937" />
        <rect x="22" y="12" width="16" height="8" rx="2" fill="#60A5FA" fillOpacity="0.4" />
        
        {/* Body */}
        <rect x="15" y="32" width="30" height="35" rx="8" fill="#F3F4F6" />
        <rect x="20" y="38" width="20" height="15" rx="2" fill="#D1D5DB" />
        
        {/* Backpack */}
        <rect x="10" y="35" width="40" height="30" rx="4" fill="#9CA3AF" />
        
        {/* Arms */}
        <motion.path 
          animate={isHovered ? { d: "M15 45L5 55" } : { d: ["M15 45L5 50", "M15 45L5 55", "M15 45L5 50"] }}
          transition={{ duration: isHovered ? 0.3 : 4, repeat: Infinity, ease: "easeInOut" }}
          stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round" 
        />
        <motion.path 
          animate={isHovered 
            ? { d: ["M45 45L55 55", "M45 45L55 35", "M45 45L55 55"] } 
            : { d: ["M45 45L55 50", "M45 45L55 55", "M45 45L55 50"] }
          }
          transition={{ duration: isHovered ? 0.6 : 4, repeat: Infinity, ease: "easeInOut" }}
          stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round" 
        />
        
        {/* Legs */}
        <path d="M22 67V75" stroke="#F3F4F6" strokeWidth="10" strokeLinecap="round" />
        <path d="M38 67V75" stroke="#F3F4F6" strokeWidth="10" strokeLinecap="round" />
        
        {/* Glow */}
        <circle cx="30" cy="45" r="2" fill="#3B82F6" className="opacity-70" />
      </svg>
    </motion.div>
  );
};

const GlobalSatelliteHubIcon = ({ className = "", progress, onClick }: { className?: string, progress?: any, onClick?: () => void }) => {
  const { width } = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);
  
  // Snappier rotation with acceleration toward the end (warp prep)
  const rotation = useTransform(progress, [0, 0.7, 0.9, 1], [0, 180, 720, 1080]);
  const scale = useTransform(progress, [0, 0.85, 0.9, 0.98], [1, 1, 1.1, 0]);
  const opacity = useTransform(progress, [0.85, 0.95], [1, 0]);

  return (
    <motion.div 
      style={{ rotate: rotation, scale, opacity }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Trigger orbital dispatch boom"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full ${className}`}
    >
      {/* Dynamic Tether to Astronaut */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full z-10 overflow-visible">
        <motion.path
          d={`M ${width < 768 ? 96 : 160} ${width < 768 ? 96 : 160} Q ${width < 768 ? 120 : 190} ${width < 768 ? 80 : 130}, ${width < 768 ? 140 : 220} ${width < 768 ? 60 : 100}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
      </svg>

      <AstronautFigure isHovered={isHovered} />

      {/* Realistic Central Core */}
      <div className="absolute w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-blue-400/50 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E")` }} />
        {/* Inner Window */}
        <div className="w-10 h-10 md:w-14 md:h-14 bg-black/80 rounded-full border border-blue-500/30 flex items-center justify-center relative">
          <div className="w-4 h-4 bg-blue-500/40 rounded-full blur-sm" />
        </div>
        
        {/* Antennas */}
        <div className="absolute top-0 w-1 h-8 bg-blue-400/40 -translate-y-1/2" />
        <div className="absolute left-0 h-1 w-8 bg-blue-400/40 -translate-x-1/2" />
      </div>

      {/* High-Tech Solar Arrays */}
      <div className="absolute left-[-60px] md:left-[-100px] w-24 md:w-40 h-32 md:h-40 flex flex-col gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-1 bg-blue-900/60 border border-blue-400/40 rounded-md relative overflow-hidden group-hover:bg-blue-800/80 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-transparent to-blue-400/10" />
             <div className="absolute inset-y-0 left-0 w-1 bg-blue-400/50" />
          </div>
        ))}
      </div>
      <div className="absolute right-[-60px] md:right-[-100px] w-24 md:w-40 h-32 md:h-40 flex flex-col gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-1 bg-blue-900/60 border border-blue-400/40 rounded-md relative overflow-hidden group-hover:bg-blue-800/80 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-l from-blue-400/30 via-transparent to-blue-400/10" />
             <div className="absolute inset-y-0 right-0 w-1 bg-blue-400/50" />
          </div>
        ))}
      </div>

      {/* Communications Dish - No small icons here */}
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-40px] md:bottom-[-60px] w-20 md:w-32 h-20 md:h-32 rounded-full border-t border-blue-400/30 flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
        <div className="w-[1px] h-full bg-gradient-to-t from-blue-400/40 to-transparent" />
      </motion.div>

      {/* Digital Orbit Rings */}
      <svg className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="0.2" />
        <motion.circle 
          cx="50" cy="50" r="42" fill="none" 
          stroke="rgba(59,130,246,0.5)" strokeWidth="0.6" 
          strokeDasharray="2 98" 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};

const FlyingIntegrationIcon = ({ node, index, progress, isBooming }: { node: any, index: number, progress: any, isBooming: boolean }) => {
  // Special handling for the "beginning" icon (index 0)
  const isFirst = index === 0;
  // Batch 0 is the single first icon. Subsequent batches are 3 icons each.
  const batchIndex = isFirst ? 0 : Math.ceil(index / 3);
  
  // Timing configuration
  // Each batch takes about 0.2 units of scroll to fly away
  const duration = 0.2;
  const stagger = 0.08; // Overlap for more fluid flow
  const startAt = isFirst ? 0 : (batchIndex * stagger) + 0.1;
  const endAt = startAt + duration;

  // Directions: make them fly away radially
  // We use a pseudo-random angle based on index to keep it deterministic
  const startAngle = (index * 137.5) % 360; 
  const flyDistance = isBooming ? 1500 : 800; 

  // Transforms for spiraling out
  const flyDistanceRaw = useTransform(progress, [startAt, endAt], [0, flyDistance]);
  const currentAngle = useTransform(progress, [startAt, endAt], [startAngle, startAngle + 270]); 

  const scrollX = useTransform([flyDistanceRaw, currentAngle], ([dist, ang]) => {
     // @ts-ignore
     const a = (ang as number) * (Math.PI / 180);
     return Math.cos(a) * (dist as number);
  });
  
  const scrollY = useTransform([flyDistanceRaw, currentAngle], ([dist, ang]) => {
     // @ts-ignore
     const a = (ang as number) * (Math.PI / 180);
     return Math.sin(a) * (dist as number);
  });
  
  const rad = startAngle * (Math.PI / 180);
  const targetX = Math.cos(rad) * flyDistance;
  const targetY = Math.sin(rad) * flyDistance;
  
  // Opacity logic:
  // First icon starts visible (1) and fades as it flies away.
  // Others are 0 until their batch starts, then fade in-out during flight.
  const scrollOpacity = useTransform(
    progress, 
    isFirst 
      ? [0, endAt * 0.8, endAt] 
      : [startAt, startAt + 0.02, endAt - 0.08, endAt],
    isFirst
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );
  
  // Scale down and blur as they fly away into the void
  const scrollScale = useTransform(progress, [startAt, endAt], [1, 0.2]);
  const scrollFilter = useTransform(progress, [startAt, endAt], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.div 
      initial={false}
      animate={isBooming ? {
        x: targetX * 1.5,
        y: targetY * 1.5,
        opacity: 0,
        scale: 0,
        filter: "blur(20px)",
      } : {}}
      style={!isBooming ? { x: scrollX, y: scrollY, opacity: scrollOpacity, scale: scrollScale, filter: scrollFilter } : {}}
      transition={isBooming ? { duration: 0.8, ease: "easeOut", delay: index * 0.01 } : {}}
      className="absolute flex flex-col items-center justify-center gap-2 pointer-events-none"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center backdrop-blur-md">
        <node.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
      </div>
      <span className="text-[8px] md:text-[9px] font-mono text-blue-400 uppercase tracking-widest">{node.label}</span>
    </motion.div>
  );
};

const PlatformAnimatedTitle = () => {
  const [isOneActive, setIsOneActive] = useState(false);
  const [isReplacesHovered, setIsReplacesHovered] = useState(false);
  const [isConnectsHovered, setIsConnectsHovered] = useState(false);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black uppercase tracking-tighter mb-8 leading-[1.1] drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-wrap items-baseline justify-center gap-x-3 md:gap-x-4 gap-y-2">
       {/* One -> 1 (toggle on hover). `layout` makes neighbours reflow so
            the gap-x stays equal even though the swapped element's width
            differs (One is wider than 1). */}
       <motion.span
         layout
         onMouseEnter={() => setIsOneActive(true)}
         onMouseLeave={() => setIsOneActive(false)}
         className="text-blue-400 cursor-pointer inline-flex items-baseline"
       >
         <AnimatePresence mode="popLayout" initial={false}>
           {isOneActive ? (
             <motion.span key="num" layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
               1
             </motion.span>
           ) : (
             <motion.span key="word" layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
               One
             </motion.span>
           )}
         </AnimatePresence>
       </motion.span>

       <motion.span layout className="text-emerald-400 inline-block">Platform</motion.span>
       <motion.span layout className="text-purple-400 inline-block">That</motion.span>

       <motion.span
         layout
         onMouseEnter={() => setIsReplacesHovered(true)}
         onMouseLeave={() => setIsReplacesHovered(false)}
         animate={isReplacesHovered ? { scaleY: 0.8, scaleX: 1.1, borderRadius: "50%" } : { scaleY: 1, scaleX: 1, borderRadius: "0%" }}
         transition={{ type: "spring", stiffness: 300, damping: 15 }}
         style={{ display: "inline-block", originY: 0.5, originX: 0.5 }}
         className={`cursor-pointer inline-block transition-colors ${isReplacesHovered ? 'text-white bg-blue-500/20 px-4 rounded-full' : 'text-blue-400'}`}
       >
         Replaces
       </motion.span>

       <motion.span layout className="text-emerald-400 inline-block">or</motion.span>

       {/* Connects swap. The chain SVG is rendered inline (not absolute-
           overlayed) and has a smaller natural width than "Connects"; the
           `layout` props make every neighbour reflow so the gap-x stays
           uniform when the slot shrinks/grows. */}
       <motion.span
         layout
         onMouseEnter={() => setIsConnectsHovered(true)}
         onMouseLeave={() => setIsConnectsHovered(false)}
         className={`cursor-pointer relative inline-flex items-baseline transition-colors duration-300 ${isConnectsHovered ? 'text-white' : 'text-purple-400'}`}
       >
         <AnimatePresence mode="popLayout" initial={false}>
           {isConnectsHovered ? (
             <motion.span
               key="chain"
               layout
               initial={{ opacity: 0, scale: 0.6 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.6 }}
               transition={{ type: 'spring', stiffness: 300, damping: 18 }}
               className="inline-flex items-baseline"
               aria-label="Connector"
             >
               <svg
                 viewBox="0 0 120 40"
                 className="h-[0.7em] w-auto drop-shadow-[0_0_12px_rgba(79,172,254,0.55)]"
                 style={{ transform: 'translateY(0.05em)' }}
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="4"
                 strokeLinecap="round"
                 aria-hidden="true"
               >
                 <defs>
                   <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#4facfe" />
                     <stop offset="50%" stopColor="#34d399" />
                     <stop offset="100%" stopColor="#a78bfa" />
                   </linearGradient>
                 </defs>
                 <rect x="4" y="8" width="46" height="24" rx="12" ry="12" stroke="url(#chainGrad)" />
                 <rect x="37" y="8" width="46" height="24" rx="12" ry="12" stroke="url(#chainGrad)" />
                 <rect x="70" y="8" width="46" height="24" rx="12" ry="12" stroke="url(#chainGrad)" />
               </svg>
             </motion.span>
           ) : (
             <motion.span
               key="word"
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 0.25 }}
               className="inline-block"
             >
               Connects
             </motion.span>
           )}
         </AnimatePresence>
       </motion.span>

       <motion.span layout className="text-blue-400 inline-block">All</motion.span>
       <motion.span layout className="text-emerald-400 inline-block">SaaS</motion.span>
       <motion.span layout className="text-purple-400 inline-block">Platforms</motion.span>
    </h1>
  );
};

const StrategicVisionSection = () => {
  return (
    <section className="relative z-10 w-full py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tighter leading-tight"
            >
              The 2026-2030 <br/>
              <span className="text-emerald-400">Strategic Horizon</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-lg md:text-xl font-light text-white/70 leading-relaxed"
            >
              <p>
                Organizations entering the 2026-2030 era face a fundamental choice: absolute scale through autonomous intelligence or stagnation through legacy friction. Why is this transition critical now?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-3 font-sans">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Why It Matters
                  </h4>
                  <p className="text-sm">In a hyper-connected global market, human-only response times are no longer competitive. Autonomous agents operate at the speed of data, turning weeks of manual labor into seconds of precision execution.</p>
                </div>
                <div className="space-y-3 font-sans">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    What It Solves
                  </h4>
                  <p className="text-sm">We solve the "Talent-Scale Trap." Traditionally, scaling required linear hiring. With DeltaScope, your capabilities scale exponentially while your headcount remains focused on direction, creativity, and strategy.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-8">The Economic Impact</h3>

              <div className="space-y-8">
                {[
                  { label: "Operational Cost reduction", value: "65-80%", icon: TrendingUp, color: "text-blue-400" },
                  { label: "Deployment Velocity", value: "10x", icon: Rocket, color: "text-emerald-400" },
                  { label: "Compliance Risk reduction", value: "99.9%", icon: Shield, color: "text-purple-400" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                      <span className="text-white/60 font-medium group-hover:text-white transition-colors uppercase tracking-widest text-[10px] font-mono">{stat.label}</span>
                    </div>
                    <span className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 italic text-sm text-white/40 leading-relaxed font-sans">
                "Between 2026 and 2030, the cost of intelligence will approach zero, but the cost of inefficiency will become fatal. DeltaScope is the immunity system for the modern enterprise, mitigating risk while accelerating growth beyond human limits."
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlatformIntroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative z-10 w-full pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <PlatformAnimatedTitle />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-blue-400/80 font-light max-w-3xl mx-auto mb-8"
        >
          Solving future and existing problems through true <strong className="text-white">AI & Automation</strong>. Reduce costs, save employee time, dramatically increase accuracy, and let your team focus on high-value work for much greater results. 
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/50 font-light max-w-4xl mx-auto mb-16 leading-relaxed"
        >
          DeltaScope is engineered for organizations of every scale. Whether you are a multi-national corporation, an agile startup company, a big law office, a global tourism agency, an insurance company, or a network of medical services. Our platform equally empowers real estate agencies, financial institutions, logistics providers, accounting firms, educational institutions, construction companies, marketing agencies, government bodies, retail chains, telecommunications providers, pharmaceutical manufacturers, energy providers, automotive dealers, aviation companies, and e-commerce platforms to scale operations with autonomous intelligence.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">Feature List</h2>
          {/* Cosmic accent: three brand-color nodes pulsing on a thin
              tri-color gradient hairline — replaces the plain blue bar. */}
          <div className="relative w-56 h-3 mx-auto mt-6 flex items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/40 via-50% to-transparent" />
            <div className="absolute inset-x-1/4 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-blue-400/70 via-emerald-400/80 to-purple-400/70" />
            {[
              { pos: '10%', cls: 'bg-blue-400', glow: 'rgba(96,165,250,0.9)', delay: 0 },
              { pos: '50%', cls: 'bg-emerald-400', glow: 'rgba(52,211,153,0.9)', delay: 0.4 },
              { pos: '90%', cls: 'bg-purple-400', glow: 'rgba(192,132,252,0.9)', delay: 0.8 },
            ].map((n, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${n.cls}`}
                style={{ left: n.pos, transform: 'translateX(-50%)', boxShadow: `0 0 10px ${n.glow}, 0 0 18px ${n.glow}` }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: n.delay, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
          {[
            {
              model: 0,
              color: "blue",
              title: "Agentic CRM",
              desc: "Predictive sales platform that optimizes the entire buyer journey from initial lead to long-term retention.",
              functions: [
                "Lead Scoring & Intent Detection",
                "Automated Outreach Campaigns",
                "Predictive Revenue Analytics",
                "Social Selling Intelligence",
                "Customer Sentiment Mapping",
                "Competitor Interaction Tracking",
                "Dynamic Pricing Optimization",
                "Deal Flow Heatmapping"
              ]
            },
            {
              model: 1,
              color: "emerald",
              title: "Sales-Driven Tickets",
              desc: "Omnichannel support that identifies sales opportunities within support flows and resolves issues instantly.",
              functions: [
                "Intent-Based Ticket Routing",
                "Opportunity Extraction",
                "Auto-Resolution Suggestions",
                "Churn Prevention Hooks",
                "Multi-Language Auto-Translation",
                "Cross-Channel History Merging",
                "SLA Breach Prediction",
                "Automated FAQ Synthesis"
              ]
            },
            {
              model: 2,
              color: "purple",
              title: "Autonomous FinOps",
              desc: "Complete financial lifecycle management from automated billing to complex enterprise reconciliation.",
              functions: [
                "Auto-Invoice Processing",
                "Real-time Cash-flow Projection",
                "Anomaly & Fraud Detection",
                "Vendor Payment Optimization",
                "Tax Compliance Automation",
                "Multi-Currency Auto-Hedging",
                "Expense Audit Streamlining",
                "Automated P&L Reporting"
              ]
            },
            {
              model: 3,
              color: "blue",
              title: "Actionable UX",
              desc: "Intuitive command interface designed for mission-critical operations with zero learning curve.",
              functions: [
                "Context-Aware Workspaces",
                "Voice & Text Command Bar",
                "Dynamic Component Loading",
                "Cross-Platform Syncing",
                "Biometric Secure Access",
                "Collaborative Multi-User Editing",
                "Custom Theme Architectures",
                "Haptic Feedback Integrations"
              ]
            },
            {
              model: 4,
              color: "emerald",
              title: "Autonomous Builder",
              desc: "Clone your top performers' workflows into scalable AI agents using data-driven process mining.",
              functions: [
                "Multi-Modal Training Data",
                "Screen-Session Cloning",
                "Custom Logic Workbench",
                "Agent Performance Tracking",
                "Neural Network Fine-Tuning",
                "Automated Red-Teaming",
                "Version Control for Agents",
                "Cross-Silo Knowledge Sharing"
              ]
            },
            {
              model: 5,
              color: "purple",
              title: "AI Voice Switchboard",
              desc: "Natural intelligence switchboard that handles voice calls with the nuance of your best human agents.",
              functions: [
                "Low-Latency Neural Voice",
                "Real-time Sentiment Analysis",
                "Intelligent Human Escalation",
                "Post-Call Summarization",
                "Dynamic IVR Path Generation",
                "Caller Intent Classification",
                "Background Noise Suppression",
                "Automated Callback Scheduling"
              ]
            },
            {
              model: 6,
              color: "blue",
              title: "Compliance Shield",
              desc: "Continuous monitoring of operational data to ensure global regulatory adherence and internal policy alignment.",
              functions: [
                "Real-time Compliance Audits",
                "Data Privacy Guardrails",
                "Behavioral Risk Scoring",
                "Automated Policy Updates",
                "Global Regulatory Syncing",
                "Incident Response Triggers",
                "Zero-Knowledge Proof Auditing",
                "ESG Transformation Tracking"
              ]
            },
            {
              model: 7,
              color: "emerald",
              title: "Personal Coworkers",
              desc: "AI companions for every staff member that handle administrative friction and data retrieval.",
              functions: [
                "Intelligent Task Prioritization",
                "Knowledge Base Retrieval",
                "Workflow Macro Creation",
                "Daily Briefing Generation",
                "Email Sequence Drafting",
                "Meeting Minutes & Action Items",
                "Cognitive Load Management",
                "Skill Gap Identification"
              ]
            },
            {
              model: 8,
              color: "purple",
              title: "Enterprise ML Lab",
              desc: "Harness proprietary enterprise data to build custom predictive models and cognitive architectures.",
              functions: [
                "Knowledge Graph Synthesis",
                "Vector Search Integration",
                "Fine-Tuning Framework",
                "Dataset Management",
                "Distributed Training Support",
                "Explainable AI Reporting",
                "Edge Model Deployment",
                "Semantic Data Tagging"
              ]
            },
            {
              model: 9,
              color: "blue",
              title: "Predictive Dashboards",
              desc: "Visualize the future of your operations with KPI projections and real-time anomaly alerts.",
              functions: [
                "Natural Language Queries",
                "Automatic Chart Generation",
                "Cross-Silo Data Blending",
                "Threshold Alert Systems",
                "VR/AR Data Visualizations",
                "Scenario Impact Simulations",
                "Executive Summary Audio",
                "Historical Trend Extrapolation"
              ]
            },
            {
              model: 10,
              color: "emerald",
              title: "Self-Evolving Systems",
              desc: "Platforms that architecture themselves by observing legacy patterns and business goals.",
              functions: [
                "Legacy Code Refactoring",
                "Database Schema Optimization",
                "Process Bottleneck Detection",
                "Auto-Agile Transitioning",
                "Self-Healing Code Logic",
                "Automated Technical Debt Mapping",
                "Service Mesh Orchestration",
                "Continuous System Hardening"
              ]
            },
          ].map((feat, idx) => {
            const colorMap: Record<string, {bg: string, border: string, text: string, hex: string}> = {
              blue: { bg: "bg-blue-500/5", border: "border-blue-500/20", text: "text-blue-400", hex: "#60a5fa" },
              emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/20", text: "text-emerald-400", hex: "#34d399" },
              purple: { bg: "bg-purple-500/5", border: "border-purple-500/20", text: "text-purple-400", hex: "#c084fc" },
            };
            const c = colorMap[feat.color];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className={`p-6 md:p-8 rounded-3xl ${c.bg} border ${c.border} hover:bg-[#000010] transition-all duration-500 group relative overflow-hidden flex flex-col`}
              >
                <div className="absolute inset-0 bg-[#000010] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="h-24 md:h-32 mb-6 md:mb-8 relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 pointer-events-none opacity-80 group-hover:opacity-100 mix-blend-screen drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <SpaceTech2D typeIndex={feat.model} color={c.hex} />
                </div>
                <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${c.text}`}>{feat.title}</h3>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-6">{feat.desc}</p>

                {/* Function List */}
                <div className="mt-auto space-y-2 border-t border-white/5 pt-6">
                  {feat.functions.map((func, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 group/item">
                      <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${feat.color === 'blue' ? 'bg-blue-500' : feat.color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-500'} group-hover/item:scale-125 transition-transform`} />
                      <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-white/40 group-hover/item:text-white/80 transition-colors">{func}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
         <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">Step-by-Step Migration</h2>
          <p className="text-blue-300 mt-4 max-w-2xl mx-auto">Don't have a CRM or ERP yet? No problem. We provide an easy step-by-step migration process that we help you with, from data collection to connecting to an innovative way of working.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <div className="flex flex-col items-center text-center relative">
                <div className="hidden md:block absolute top-8 left-[50%] w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-400/30 relative z-10">
                    <span className="text-xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Discovery & Setup</h4>
                <p className="text-sm text-white/50">We analyze your existing workflows and help set up the foundational systems.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
                <div className="hidden md:block absolute top-8 left-[50%] w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-400/30 relative z-10">
                    <span className="text-xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Data Collection</h4>
                <p className="text-sm text-white/50">We help collect your scattered data from spreadsheets, chats, emails, and legacy tools natively.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
                <div className="hidden md:block absolute top-8 left-[50%] w-full h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-400/30 relative z-10">
                    <span className="text-xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Migration</h4>
                <p className="text-sm text-white/50">Our team migrates everything into the unified platform without disrupting your business.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-400/30 relative z-10">
                    <span className="text-xl font-bold text-white">4</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Connection</h4>
                <p className="text-sm text-white/50">Connect to an innovative way of work where AI handles the operational friction for you.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

const LunarCommandHub = () => {
  return (
    <PinnedScrollSection height="h-[250vh]">
      <LunarCommandHubContent />
    </PinnedScrollSection>
  );
};

const OrbitingSatellite = ({ 
  progress, 
  radius, 
  speed, 
  angleOffset, 
  depth, 
  driftIntensity,
  type = 'satellite',
  model: ModelComponent
}: { 
  progress: any, 
  radius: number, 
  speed: number, 
  angleOffset: number, 
  depth: number, 
  driftIntensity: number,
  type?: string,
  model?: React.ComponentType<{ pure?: boolean }>
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const responsiveRadius = isMobile ? radius * 0.45 : radius;

  // Moves closer as progress increases
  const dynamicRadius = useTransform(
    progress, 
    [0, 0.5, 0.9], 
    [responsiveRadius * 4, responsiveRadius * 2, responsiveRadius * 0.9]
  );

  // Movement primarily based on scroll progress, creating a parallax orbit effect
  
  // Derived rotation: much smoother continuous speed + scroll-based speed
  const rotation = useTransform(progress, (p) => {
     const rawProgress = typeof p === 'number' ? p : 0;
     const scrollRotation = rawProgress * 360 * (speed * 3); // Faster scroll rotation
     return scrollRotation + angleOffset;
  });
  
  const x = useTransform([rotation, dynamicRadius], ([r, dr]) => {
    // @ts-ignore
    const angle = (r as number) * (Math.PI / 180);
    return Math.cos(angle) * (dr as number);
  });
  
  const baseY = useTransform([rotation, dynamicRadius], ([r, dr]) => {
    // @ts-ignore
    const angle = (r as number) * (Math.PI / 180);
    return Math.sin(angle) * ((dr as number) * 0.3); // Elliptical tilt
  });

  const drift = useTransform(progress, (p) => {
    const rawProgress = typeof p === 'number' ? p : 0;
    return Math.sin(rawProgress * 10 * driftIntensity) * (10 * driftIntensity);
  });

  // Calculate composite Y
  const y = useMotionValue(0);
  useMotionValueEvent(progress, "change", () => {
    y.set(baseY.get() + drift.get());
  });

  // Scale down significantly, starts very small when far away, grows slightly as it comes closer
  const scale = useTransform([rotation, progress], ([r, p]) => {
    // @ts-ignore
    const angle = (r as number) * (Math.PI / 180);
    const z = Math.sin(angle); // -1 is "behind", 1 is "in front"
    const baseScale = (0.1 + (z + 1) * 0.1) * depth; // Considerably smaller base scale
    // @ts-ignore
    return baseScale * Math.min((p as number) * 1.5 + 0.1, 1);
  });

  // Fade in from background smoothly
  const orbitOpacity = useTransform(rotation, (r: number) => {
    const angle = r * (Math.PI / 180);
    const z = Math.sin(angle); 
    return 0.15 + (z + 1) * 0.35;
  });
  
  const fadeOpacity = useTransform(progress, [0, 0.4, 0.8], [0, 0.3, 0.9]);
  const opacity = useTransform([orbitOpacity, fadeOpacity], ([oO, fO]) => {
     return (oO as number) * (fO as number);
  });

  const zIndex = useTransform(rotation, (r: number) => {
    const angle = r * (Math.PI / 180);
    return Math.sin(angle) > 0 ? 15 : 0; 
  });

  const blur = useTransform([rotation, progress], ([r, p]) => {
    // @ts-ignore
    const angle = (r as number) * (Math.PI / 180);
    const z = Math.sin(angle);
    const orbitBlur = (1 - (z + 1) / 2) * 5; // Blurry when behind
    // @ts-ignore
    const distanceBlur = Math.max(0, (1 - (p as number)) * 8);
    return orbitBlur + distanceBlur;
  });

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="absolute pointer-events-none"
    >
      <div className="scale-[0.25] md:scale-50 relative origin-center text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.25)] flex items-center justify-center">
        {ModelComponent ? <ModelComponent pure={true} /> : <SpaceObjectRenderer type={type} />}
      </div>
    </motion.div>
  );
};

const LunarCommandHubContent = ({ progress }: { progress?: any }) => {
  const containerRef = useRef(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollYProgress = progress || localProgress;
  const [processedCount, setProcessedCount] = useState(0);
  const [isBooming, setIsBooming] = useState(false);

  const satelliteOrbits = [
    { radius: 280, speed: 1.1, angleOffset: 0, depth: 1, driftIntensity: 0.4, model: RotatingAtom },
    { radius: 360, speed: -0.7, angleOffset: 140, depth: 0.8, driftIntensity: 0.9, model: DnaHelix },
    { radius: 220, speed: 1.6, angleOffset: 240, depth: 1.2, driftIntensity: 0.2, model: FloatingVirus },
    { radius: 450, speed: 0.4, angleOffset: 60, depth: 0.7, driftIntensity: 1.2, model: NeuralSynapse },
    { radius: 300, speed: -1.3, angleOffset: 300, depth: 0.9, driftIntensity: 0.6, model: ElectronCloud },
  ];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const val = typeof latest === 'number' ? latest : 0;
    // Update count based on "dispatched" modules
    const count = Math.min(18, Math.floor(18 * (val / 0.7)));
    setProcessedCount((prev) => {
      if (prev !== count) return count;
      return prev;
    });
  });

  const handleBoom = () => {
    if (isBooming) return;
    setIsBooming(true);
    
    // Smooth scroll to testimonials after icons fly away
    setTimeout(() => {
      const section = document.getElementById('testimonials-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);

    // Reset booming state after a while so it doesn't stay broken if they scroll back
    setTimeout(() => setIsBooming(false), 5000);
  };

  const nodes = [
    // Comm batch
    { id: 'messengers', icon: MessageSquare, label: 'Messengers' },
    { id: 'cellular', icon: Radio, label: 'Cellular' },
    { id: 'mailing', icon: Mail, label: 'Mail' },
    { id: 'chat', icon: MessageSquare, label: 'Inbound' },
    { id: 'slack', icon: MessageSquare, label: 'Slack' },
    { id: 'voice', icon: Radio, label: 'Voice' },
    // Logistics batch
    { id: 'delivery', icon: Truck, label: 'DHL' },
    { id: 'products', icon: Package, label: 'Inventory' },
    { id: 'local', icon: Home, label: 'Local' },
    { id: 'payment', icon: DollarSign, label: 'Stripe' },
    { id: 'box', icon: Package, label: 'Units' },
    { id: 'cart', icon: Package, label: 'Cart' },
    // Intel batch
    { id: 'geo', icon: MapPin, label: 'Geo' },
    { id: 'global', icon: Globe, label: 'Cloud' },
    { id: 'monitoring', icon: Activity, label: 'Pulse' },
    { id: 'sec', icon: Shield, label: 'Vault' },
    { id: 'brain', icon: Brain, label: 'Neural' },
    { id: 'analytics', icon: TrendingUp, label: 'Stats' },
  ];

  return (
    <motion.div 
      ref={containerRef} 
      animate={isBooming ? {
        x: [0, -10, 10, -10, 10, 0],
        y: [0, 5, -5, 5, -5, 0],
      } : {}}
      transition={isBooming ? { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] } : {}}
      className="w-full h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden bg-transparent touch-pan-y sm:touch-auto"
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

      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        {/* Background Orbiting Satellites */}
        {satelliteOrbits.map((orb, i) => (
          <OrbitingSatellite 
            key={i} 
            progress={scrollYProgress} 
            {...orb} 
          />
        ))}

        {/* The Digital Satellite or Hub */}
        <div className="relative">
          <GlobalSatelliteHubIcon progress={scrollYProgress} onClick={handleBoom} />
          
          {/* Deployed Icons Layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {nodes.map((node, i) => (
              <FlyingIntegrationIcon 
                key={node.id} 
                node={node} 
                index={i} 
                progress={scrollYProgress}
                isBooming={isBooming}
              />
            ))}
          </div>

          {/* Central Status Indicator - Improves Hierarchy focal point */}
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.8], [0, 1, 0]),
              scale: useTransform(scrollYProgress, [0, 0.8], [0.8, 1.2])
            }}
            className="absolute top-[-40px] left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
               <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(96,165,250,0.5)]" />
               <span className="text-[8px] font-mono font-black text-blue-300 uppercase tracking-[0.3em] whitespace-nowrap">CORE_HUB_ACTIVE</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Data Shards */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
            className={`absolute w-px h-24 bg-gradient-to-t from-transparent via-blue-400/20 to-transparent`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
          />
        ))}
      </div>

      {/* Algorithm Metadata Sidebar */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.85, 0.95], [1, 1, 0]),
          x: useTransform(scrollYProgress, [0.85, 0.95], [0, 50])
        }}
        className="absolute right-6 top-8 hidden xl:flex flex-col gap-8 w-72 z-20"
      >
         {/* Telemetry Block */}
         <div className="p-6 border border-white/10 bg-black/80 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-blue-500/10 to-transparent h-20 animate-scan pointer-events-none" />
            <h4 className="text-[11px] font-serif italic text-blue-400 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 flex justify-between items-center">
              <span>Automation Telemetry</span>
              <Activity className="w-3 h-3 opacity-30" />
            </h4>
            <div className="space-y-4">
               {[
                 { label: 'Network State', value: 'ACTIVE_LINK', color: 'text-emerald-400' },
                 { label: 'Nodes Sync', value: `${processedCount}/18`, color: 'text-blue-400' },
                 { label: 'Packet Drift', value: '0.002ms', color: 'text-purple-400' }
               ].map((m, i) => (
                 <div key={i} className="flex justify-between items-end border-b border-white/[0.03] pb-2 group/item hover:border-white/10 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">{m.label}</span>
                      <span className={`text-sm font-display font-bold tracking-tighter ${m.color}`}>{m.value}</span>
                    </div>
                    <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden mb-1">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`h-full w-3/4 rounded-full ${m.color.replace('text-', 'bg-').replace('400', '500')}`} 
                      />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="p-8 border border-white/5 bg-white/[0.01] rounded-[2.5rem] backdrop-blur-xl">
           <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6">Neural Buffer</h4>
           <div className="font-mono text-[8px] text-white/20 space-y-1">
              <p>{">"} BUFFERING_MODULES...</p>
              <p>{">"} CONNECTION_STRENGTH_94%</p>
              <p className="text-blue-400">{">"} COMPRESSING_DIGITAL_NODES</p>
              <p>{">"} READY_FOR_DISPATCH</p>
           </div>
         </div>

         {/* Global Progress Dial - Large focal value for clarity */}
         <div className="px-6 py-5 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5 backdrop-blur-md flex items-center justify-between shadow-lg group hover:bg-blue-500/10 transition-colors">
            <div className="flex flex-col">
               <span className="text-[9px] font-mono text-blue-300/40 uppercase tracking-[0.4em]">Mission</span>
               <span className="text-[10px] font-serif italic text-blue-300/80 uppercase">Progress</span>
            </div>
            <div className="flex items-baseline gap-1">
              <motion.span 
                key={processedCount}
                initial={{ scale: 1.2, filter: "blur(4px)" }}
                animate={{ scale: 1, filter: "blur(0px)" }}
                className="text-3xl font-display font-black italic text-blue-400 tracking-tighter"
              >
                 {Math.round(scrollYProgress.get() * 100)}
              </motion.span>
              <span className="text-[10px] font-mono text-blue-400/40">%</span>
            </div>
         </div>
      </motion.div>
      
      <div className="absolute bottom-6 md:bottom-16 text-center w-full px-6 relative z-10 flex flex-col items-center">
         <p className="text-white/30 font-mono text-[9px] md:text-[10px] uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
           Scroll to initiate radial deployment of autonomous nodes into the industry sector.
         </p>
      </div>
    </motion.div>
  );
};

const IntegrationLine = ({ node, progress, i }: { node: any, progress: any, i: number }) => {
  const speed = 1 + (i % 3) * 0.5;
  const radiusOffset = (i % 5) * 2 - 5;
  
  const rotation = useTransform(progress, [0, 1], [0, 90 * speed]);

  const xVal = useTransform(rotation, (r: number) => {
    const rad = (r + Math.atan2(node.y, node.x) * (180 / Math.PI)) * (Math.PI / 180);
    const radius = Math.sqrt(node.x * node.x + node.y * node.y) + radiusOffset;
    return 50 + radius * Math.cos(rad);
  });
  const yVal = useTransform(rotation, (r: number) => {
    const rad = (r + Math.atan2(node.y, node.x) * (180 / Math.PI)) * (Math.PI / 180);
    const radius = Math.sqrt(node.x * node.x + node.y * node.y) + radiusOffset;
    return 50 + radius * Math.sin(rad);
  });

  return (
    <motion.line 
      x1="50" y1="50" x2={xVal} y2={yVal}
      stroke="#3b82f6" strokeWidth="0.1" strokeDasharray="1 1"
    />
  );
};

const OrbitingNode = ({ node, progress, i, activeNode, setActiveNode }: { node: any, progress: any, i: number, activeNode: any, setActiveNode: any }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const speed = 0.5 + (i % 3) * 0.25;
  const radiusOffset = (i % 5) * 2 - 5;
  
  // Mobile: Intensify rotation to 360 degrees for full orbital loop on scroll
  const rotation = useTransform(progress, [0, 1], [0, isMobile ? 360 * speed : 90 * speed]);

  const xVal = useTransform(rotation, (r: number) => {
    const rad = (r + Math.atan2(node.y, node.x) * (180 / Math.PI)) * (Math.PI / 180);
    const radius = Math.sqrt(node.x * node.x + node.y * node.y) + radiusOffset;
    return 50 + radius * Math.cos(rad);
  });
  const yVal = useTransform(rotation, (r: number) => {
    const rad = (r + Math.atan2(node.y, node.x) * (180 / Math.PI)) * (Math.PI / 180);
    const radius = Math.sqrt(node.x * node.x + node.y * node.y) + radiusOffset;
    return 50 + radius * Math.sin(rad);
  });

  const left = useTransform(xVal, v => `${v}%`);
  const top = useTransform(yVal, v => `${v}%`);

  const iconColors: Record<string, string> = {
    messengers: 'text-green-400',
    cellular: 'text-sky-400',
    mailing: 'text-emerald-400',
    chat: 'text-blue-500',
    slack: 'text-purple-400',
    voice: 'text-purple-400',
    delivery: 'text-emerald-500',
    products: 'text-blue-400',
    local: 'text-emerald-400',
    payment: 'text-blue-400',
    box: 'text-blue-400',
    cart: 'text-emerald-400',
  };

  const nodeColor = iconColors[node.id] || 'text-blue-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.3, zIndex: 50 }}
      whileTap={{ scale: 1.5, zIndex: 100 }}
      onMouseEnter={() => setActiveNode(node.id)}
      onMouseLeave={() => setActiveNode(null)}
      onFocus={() => setActiveNode(node.id)}
      onBlur={() => setActiveNode(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveNode(node.id === activeNode ? null : node.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Inspect ${node.label} node`}
      aria-pressed={activeNode === node.id}
      className="absolute cursor-pointer z-30 touch-none focus-visible:outline-none"
      style={{ 
        left, 
        top,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={`relative transition-all duration-500 drop-shadow-[0_0_15px_currentColor] ${activeNode === node.id ? 'ring-2 ring-white/20 rounded-full scale-125' : ''}`}>
        <div className="absolute inset-0 bg-current blur-lg opacity-20" />
        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-current ${activeNode === node.id ? 'brightness-150' : nodeColor}`} />
        <DiscoveryTooltip 
          text={`${node.label.toUpperCase()}_LINK`}
          isVisible={activeNode === node.id}
          className="mb-4"
        />
      </div>
    </motion.div>
  );
};
const AnimatedNumber = ({ value }: { value: string }) => {
  const parseValue = (valStr: string) => {
    const cleanStr = valStr.replace(/,/g, '');
    const match = cleanStr.match(/^([0-9.]+)(.*)$/);
    if (match) {
      const num = parseFloat(match[1]);
      const suffix = match[2] || '';
      return { num, suffix };
    }
    return { num: 0, suffix: valStr };
  };

  const getDecimalPlaces = (str: string) => {
    const cleanStr = str.replace(/,/g, '');
    const match = cleanStr.match(/^([0-9.]+)/);
    if (match) {
      const parts = match[1].split('.');
      return parts.length > 1 ? parts[1].length : 0;
    }
    return 0;
  };

  const { num, suffix } = parseValue(value);
  const decimals = getDecimalPlaces(value);
  const originalHadCommas = value.includes(',');

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 45, damping: 15, mass: 1 });

  useEffect(() => {
    const controls = animate(motionValue, num, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [num, motionValue]);

  const displayValue = useTransform(springValue, (latest) => {
    let formatted = "";
    if (decimals > 0) {
      formatted = latest.toFixed(decimals);
    } else if (originalHadCommas) {
      formatted = Math.round(latest).toLocaleString();
    } else {
      formatted = Math.round(latest).toString();
    }
    return `${formatted}${suffix}`;
  });

  return <motion.span>{displayValue}</motion.span>;
};

const AutomationDashboard = () => {
  const [selectedRole, setSelectedRole] = useState<'Sales' | 'Support' | 'Operations' | 'Executive' | 'Audience'>('Executive');
  const [secondsSaved, setSecondsSaved] = useState(12845000);
  const [hoveredStatIndex, setHoveredStatIndex] = useState<number | null>(null);
  const [expandedStats, setExpandedStats] = useState<Record<string, boolean>>({});
  
  const getSparklineData = (label: string, valueStr: string) => {
    const cleanStr = valueStr.replace(/,/g, '');
    const match = cleanStr.match(/^([0-9.]+)/);
    const baseValue = match ? parseFloat(match[1]) : 50;
    
    const decimalMatch = valueStr.replace(/,/g, '').match(/^([0-9.]+)/);
    const decimals = (decimalMatch && decimalMatch[1].includes('.')) ? decimalMatch[1].split('.')[1].length : 0;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return days.map((day, idx) => {
      let labelSum = 0;
      for (let charIdx = 0; charIdx < label.length; charIdx++) {
        labelSum += label.charCodeAt(charIdx);
      }
      
      const seed = labelSum + idx;
      const noise = ((seed % 24) - 12) / 100; // -12% to +12%
      const trend = 0.88 + (idx * 0.02); // 0.88 to 1.0 peak
      const value = baseValue * trend * (1 + noise);
      return {
        day,
        value: parseFloat(value.toFixed(decimals))
      };
    });
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsSaved(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles = {
    Executive: {
      title: "Strategic Executive Matrix",
      description: "Macro-level operational efficiency and capital optimization across all AI-driven departments.",
      color: "from-blue-400 via-indigo-500 to-purple-600",
      progress: 87,
      stats: [
        { label: 'Capital Optimized', value: '4.2M', icon: DollarSign, color: 'text-emerald-400', unit: 'USD' },
        { label: 'Global Efficiency', value: '87', icon: Activity, color: 'text-blue-400', unit: '%' },
        { label: 'Seconds Saved', value: secondsSaved.toLocaleString(), icon: Clock, color: 'text-white', unit: 'SEC' },
        { label: 'Hours Reclaimed', value: '165K', icon: Zap, color: 'text-emerald-400', unit: 'HRS' },
      ],
      chartData: [
        { name: 'Mon', value: 85, money: 2.1 },
        { name: 'Tue', value: 88, money: 2.4 },
        { name: 'Wed', value: 82, money: 2.8 },
        { name: 'Thu', value: 91, money: 3.2 },
        { name: 'Fri', value: 89, money: 3.8 },
        { name: 'Sat', value: 94, money: 4.1 },
        { name: 'Sun', value: 96, money: 4.4 },
      ],
      metrics: [
        { label: 'Strategic Alignment Score', value: 98, color: 'bg-blue-500' },
        { label: 'Capital Allocation Efficiency', value: 94, color: 'bg-purple-500' },
        { label: 'Departmental Synergy', value: 99, color: 'bg-emerald-500' },
        { label: 'Risk Mitigation Coverage', value: 92, color: 'bg-emerald-500' },
        { label: 'Growth Catalyst Index', value: 87, color: 'bg-purple-500' },
      ],
      insight: "AI-driven operational scaling has reduced overhead by 22% while increasing strategic output by 40%.",
      recommendation: "Focus Q3 expansion on agentic procurement to further optimize latent capital."
    },
    Sales: {
      title: "Revenue Generation Engine",
      description: "AI-assisted pipeline velocity, lead scoring, and automated deal closure optimization.",
      color: "from-emerald-400 via-teal-500 to-blue-600",
      progress: 64,
      stats: [
        { label: 'Lead Conversion', value: '32', icon: Target, color: 'text-blue-400', unit: '%' },
        { label: 'Pipeline Velocity', value: '2.4x', icon: TrendingUp, color: 'text-purple-400', unit: 'RATE' },
        { label: 'AI Deal Assist', value: '1,240', icon: Zap, color: 'text-emerald-400', unit: 'DEALS' },
        { label: 'Closed Revenue', value: '2.8M', icon: DollarSign, color: 'text-purple-400', unit: 'USD' },
      ],
      chartData: [
        { name: 'Mon', value: 45, money: 1.2 },
        { name: 'Tue', value: 52, money: 1.5 },
        { name: 'Wed', value: 58, money: 1.4 },
        { name: 'Thu', value: 64, money: 1.9 },
        { name: 'Fri', value: 72, money: 2.2 },
        { name: 'Sat', value: 78, money: 2.5 },
        { name: 'Sun', value: 85, money: 2.8 },
      ],
      metrics: [
        { label: 'Lead Scoring Accuracy', value: 96, color: 'bg-blue-500' },
        { label: 'Outreach Personalization', value: 92, color: 'bg-purple-500' },
        { label: 'Deal Closure Velocity', value: 95, color: 'bg-emerald-500' },
        { label: 'Churn Prediction Accuracy', value: 89, color: 'bg-emerald-500' },
        { label: 'Upsell Propensity Score', value: 84, color: 'bg-purple-500' },
      ],
      insight: "Automated personalization has improved cold outreach response rates by 12.5% this month.",
      recommendation: "Deploy AI negotiators to lower-tier segments to free up human focus for enterprise accounts."
    },
    Support: {
      title: "Service Excellence Matrix",
      description: "Customer satisfaction, automated triage, and high-velocity ticket resolution matrix.",
      color: "from-purple-400 via-pink-500 to-rose-600",
      progress: 92,
      stats: [
        { label: 'Resolution Rate', value: '94', icon: HeartPulse, color: 'text-emerald-400', unit: '%' },
        { label: 'Avg Triage Time', value: '1.2', icon: Clock, color: 'text-blue-400', unit: 'MIN' },
        { label: 'AI Solo Resolve', value: '8.4K', icon: Monitor, color: 'text-purple-400', unit: 'TICKETS' },
        { label: 'Customer CSAT', value: '4.9', icon: Star, color: 'text-emerald-400', unit: '/ 5.0' },
      ],
      chartData: [
        { name: 'Mon', value: 92, money: 0.8 },
        { name: 'Tue', value: 94, money: 0.9 },
        { name: 'Wed', value: 91, money: 1.1 },
        { name: 'Thu', value: 95, money: 1.2 },
        { name: 'Fri', value: 97, money: 1.4 },
        { name: 'Sat', value: 98, money: 1.5 },
        { name: 'Sun', value: 99, money: 1.7 },
      ],
      metrics: [
        { label: 'Auto-Triage Precision', value: 98, color: 'bg-blue-500' },
        { label: 'Knowledge Base ROI', value: 94, color: 'bg-purple-500' },
        { label: 'Sentiment Analysis Depth', value: 99, color: 'bg-emerald-500' },
        { label: 'Multi-Language Coverage', value: 100, color: 'bg-emerald-500' },
        { label: 'Deflection Efficiency', value: 91, color: 'bg-purple-500' },
      ],
      insight: "Neural deflection resolved 74% of Tier-1 issues without human intervention last week.",
      recommendation: "Feed historical sentiment data into the agentic personality engine for better rapport."
    },
    Operations: {
      title: "Workflow Orchestration Core",
      description: "System-wide process automation, resource allocation, and technical debt reduction.",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      progress: 82,
      stats: [
        { label: 'Workflow Auto %', value: '82', icon: Layers, color: 'text-emerald-400', unit: '%' },
        { label: 'Resource Load', value: '44', icon: Box, color: 'text-purple-400', unit: '%' },
        { label: 'Error Rate', value: '0.01', icon: ShieldCheck, color: 'text-emerald-400', unit: '%' },
        { label: 'Cycle Reduction', value: '65', icon: History, color: 'text-purple-400', unit: '%' },
      ],
      chartData: [
        { name: 'Mon', value: 72, money: 3.1 },
        { name: 'Tue', value: 75, money: 3.4 },
        { name: 'Wed', value: 78, money: 3.8 },
        { name: 'Thu', value: 81, money: 4.1 },
        { name: 'Fri', value: 84, money: 4.4 },
        { name: 'Sat', value: 85, money: 4.6 },
        { name: 'Sun', value: 88, money: 4.9 },
      ],
      metrics: [
        { label: 'Queue Depth Optimization', value: 99, color: 'bg-blue-500' },
        { label: 'Node Latency Control', value: 97, color: 'bg-purple-500' },
        { label: 'Security Shield Uptime', value: 100, color: 'bg-emerald-500' },
        { label: 'API Integration Sync', value: 96, color: 'bg-emerald-500' },
        { label: 'Legacy Data Migration', value: 92, color: 'bg-purple-500' },
      ],
      insight: "Automated queue rebalancing saved 400 hours of server compute time during Sunday's peak load.",
      recommendation: "Optimize legacy SQL queries in Sector 4 to further reduce I/O wait times by 15%."
    },
    Audience: {
      title: "Target Audience Neural Profile",
      description: "Machine learning creates repeatable Models. Holistic analysis of human interactants across psychological, financial, and demographic matrices.",
      color: "from-orange-400 via-rose-500 to-amber-600",
      progress: 75,
      stats: [
        { label: 'Churn Propensity', value: '12', icon: Activity, color: 'text-red-400', unit: '%' },
        { label: 'Buying Strength', value: '8.4', icon: DollarSign, color: 'text-blue-400', unit: '/ 10' },
        { label: 'Upsell Ability', value: '28', icon: TrendingUp, color: 'text-emerald-400', unit: '%' },
        { label: 'Network Reach', value: '12K', icon: Globe, color: 'text-purple-400', unit: 'NODES' },
      ],
      chartData: [
        { name: 'Mon', value: 42, money: 1.1 },
        { name: 'Tue', value: 45, money: 1.3 },
        { name: 'Wed', value: 48, money: 1.2 },
        { name: 'Thu', value: 52, money: 1.5 },
        { name: 'Fri', value: 58, money: 1.8 },
        { name: 'Sat', value: 65, money: 2.1 },
        { name: 'Sun', value: 72, money: 2.5 },
      ],
      metrics: [
        { label: 'Human Skills & Empathy', value: 88, color: 'bg-rose-500' },
        { label: 'Language Level / Literacy', value: 92, color: 'bg-blue-500' },
        { label: 'Networking & Social Ability', value: 78, color: 'bg-purple-500' },
        { label: 'Financial Fluidity Index', value: 85, color: 'bg-emerald-500' },
        { label: 'Working Area / Demographics', value: 64, color: 'bg-orange-500' },
        { label: 'Medical & Health Status', value: 94, color: 'bg-cyan-500' },
        { label: 'Gender / Persona Variance', value: 48, color: 'bg-pink-500' },
        { label: 'Age Bracket Consistency', value: 82, color: 'bg-amber-500' },
        { label: 'Educational Quality Score', value: 91, color: 'bg-indigo-500' },
        { label: 'Family Status Stability', value: 85, color: 'bg-purple-600' },
      ],
      insight: "Analysis indicates a high density of 'Family Status: Married' with 'Financial Status: Stable' in the primary working area.",
      recommendation: "Deploy age-gated upselling models focusing on 'Medical Status' reliability and long-term security."
    }
  };

  const currentData = roles[selectedRole];

  const monthlyData = [
    { month: 'Jan', aiTasks: 2100, workerTasks: 4200, aiSolved: 1800, workerSolved: 3900 },
    { month: 'Feb', aiTasks: 3500, workerTasks: 4100, aiSolved: 3100, workerSolved: 3800 },
    { month: 'Mar', aiTasks: 5800, workerTasks: 3800, aiSolved: 5400, workerSolved: 3600 },
    { month: 'Apr', aiTasks: 8200, workerTasks: 3500, aiSolved: 7900, workerSolved: 3300 },
    { month: 'May', aiTasks: 12500, workerTasks: 3200, aiSolved: 12100, workerSolved: 3000 },
    { month: 'Jun', aiTasks: 18200, workerTasks: 2900, aiSolved: 17800, workerSolved: 2800 },
    { month: 'Jul', aiTasks: 25400, workerTasks: 2600, aiSolved: 25000, workerSolved: 2500 },
    { month: 'Aug', aiTasks: 34000, workerTasks: 2400, aiSolved: 33500, workerSolved: 2300 },
  ];

  return (
    <div id="automation-dashboard" className="max-w-7xl mx-auto px-6 py-12 relative" role="region" aria-label="Automation Stats and Analytics">
      <div className="text-center mb-24 px-4">
        <WritingTitle 
          text="Custom Dashboards"
          className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter uppercase mb-6 justify-center"
        />
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "200px", opacity: 1 }}
          viewport={{ once: true }}
          className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-transparent mx-auto rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-white/60 font-mono text-sm max-w-2xl mx-auto"
        >
          Custom dashboards are crucial for organizational alignment. By tailoring metrics and visualization layouts, every role—from executive planning to operational execution—can view the insights most relevant to their responsibilities, driving faster and more informed decisions across the entire enterprise.
        </motion.p>
      </div>

      <div className="flex flex-col items-center text-center mb-12 relative z-10 transition-all duration-700">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.5em] mb-4 block">System Performance Matrix</span>
          <WritingTitle 
            text={currentData.title}
            key={selectedRole}
            className={`text-[clamp(1.5rem,5vw,4.5rem)] font-display font-black tracking-tighter uppercase mb-6 leading-none bg-clip-text text-transparent bg-gradient-to-r ${currentData.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] italic pb-2`}
          />
          <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed">{currentData.description}</p>
        </div>
        
        {/* Role Selection Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-full border border-white/10 mb-8" role="tablist" aria-label="Role Selection">
          {(Object.keys(roles) as Array<keyof typeof roles>).map((role) => (
            <button
              key={role}
              role="tab"
              aria-selected={selectedRole === role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 sm:px-6 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex-grow sm:flex-grow-0 ${
                selectedRole === role 
                ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="mt-4 p-6 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 w-full max-w-4xl justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center shrink-0">
              <Activity className="text-blue-400 w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Automation Tasks Status</p>
              <p className="text-xl font-display font-bold text-blue-400 uppercase">{currentData.progress}% Optimal</p>
            </div>
          </div>
          <div className="flex-1 w-full max-w-sm">
             <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
               <motion.div 
                 key={`${selectedRole}-progress`}
                 className={`absolute left-0 top-0 h-full bg-gradient-to-r ${currentData.color}`}
                 initial={{ width: 0 }}
                 animate={{ width: `${currentData.progress}%` }}
                 transition={{ duration: 1, ease: 'easeOut' }}
               />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {currentData.stats.map((stat, i) => {
          const key = `${selectedRole}-${i}`;
          const isExpanded = !!expandedStats[key];
          const sparkData = getSparklineData(stat.label, stat.value);
          const strokeColor = stat.color.includes('emerald') 
            ? '#10b981' 
            : stat.color.includes('blue') 
            ? '#3b82f6' 
            : stat.color.includes('purple') 
            ? '#a78bfa'
            : stat.color.includes('red')
            ? '#f87171'
            : '#a78bfa';

          return (
            <motion.div
              layout
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -6, scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.05)", transition: { duration: 0.2 } }}
              onMouseEnter={() => setHoveredStatIndex(i)}
              onMouseLeave={() => setHoveredStatIndex(null)}
              onFocus={() => setHoveredStatIndex(i)}
              onBlur={() => setHoveredStatIndex(null)}
              onClick={() => {
                setExpandedStats(prev => ({ ...prev, [key]: !prev[key] }));
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isExpanded}
              aria-label={`${stat.label}: ${stat.value} ${stat.unit}. Click to expand 7-day trend.`}
              className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 transition-all group overflow-hidden relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color} border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all relative`}>
                  <stat.icon className="w-6 h-6 drop-shadow-[0_0_8px_currentColor]" aria-hidden="true" />
                  <DiscoveryTooltip 
                    text={`V_METRIC: ${stat.label.toUpperCase()}`}
                    isVisible={hoveredStatIndex === i}
                    className="mb-10"
                  />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{stat.unit}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedStats(prev => ({ ...prev, [key]: !prev[key] }));
                    }}
                    className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 text-[8px] font-mono uppercase tracking-widest text-white/40 hover:text-blue-400 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                    {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  </button>
                </div>
              </div>
              <div className="relative z-10">
                <p className={`text-2xl font-display font-bold mb-1 tracking-tighter ${stat.color}`}>
                  <AnimatedNumber value={stat.value} />
                </p>
                <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{stat.label}</p>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-white/5 pt-4"
                  >
                    <div className="flex justify-between items-center mb-2 text-[8px] font-mono text-white/40 uppercase tracking-wider">
                      <span>7-Day History Trend</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                        <TrendingUp size={8}/> +12.4%
                      </span>
                    </div>
                    <div className="h-16 w-full relative">
                      <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={sparkData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                          <defs>
                            <linearGradient id={`sparkGrad-${selectedRole}-${i}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4}/>
                              <stop offset="100%" stopColor={strokeColor} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={strokeColor} 
                            strokeWidth={1.5}
                            fill={`url(#sparkGrad-${selectedRole}-${i})`}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                      
                      <div className="flex justify-between text-[8px] font-mono text-white/30 px-1 mt-1">
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                        <span>S</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-10 gap-4">
            <div>
              <WritingTitle 
                text="Performance Velocity"
                className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight"
              />
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mt-1">Resource allocation over 7 day cycle</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[8px] font-mono text-white/40 uppercase">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Efficiency
              </div>
              <div className="flex items-center gap-2 text-[8px] font-mono text-white/40 uppercase">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                Impact
              </div>
            </div>
          </div>
          
          <div className="h-[250px] md:h-[400px] w-full relative">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBarValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorBarMoney" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 4" stroke="rgba(59,130,246,0.1)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.1)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 300 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(59,130,246,0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#05050a]/90 backdrop-blur-xl border border-blue-500/20 p-4 rounded-xl shadow-2xl transition-all">
                          <p className="text-[10px] font-mono text-blue-400 mb-2 uppercase tracking-widest">{payload[0].payload.name} RAW_BLOCKS</p>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white flex items-center justify-between gap-4">
                              <span>Efficiency:</span>
                              <span className="text-blue-400">{payload[0].value}%</span>
                            </p>
                            <p className="text-sm font-bold text-white flex items-center justify-between gap-4">
                              <span>Impact:</span>
                              <span className="text-purple-400">{payload[1].value}M</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#colorBarValue)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="money" 
                  fill="url(#colorBarMoney)" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Abilities Success Matrix</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-8 md:mb-10">Role-specific automation competencies</p>
          
          <div className="flex-1 space-y-8">
            {currentData.metrics.map((item, i) => (
              <div key={`${selectedRole}-metric-${i}`} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-display font-bold text-white">{item.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(59,130,246,0.3)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center`}>
             <p className="text-[9px] font-mono text-blue-400 uppercase tracking-[0.2em] mb-2 font-bold">AI Generated Insight</p>
             <p className="text-xs text-white/60 italic font-light">"{currentData.insight}"</p>
          </div>
          
          <div className="mt-4 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
             <p className="text-[9px] font-mono text-purple-400 uppercase tracking-[0.2em] mb-2 font-bold">Strategic Recommendation</p>
             <p className="text-xs text-white/60 italic font-light">"{currentData.recommendation}"</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
        <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Automated Skill Tiers</h3>
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-8 md:mb-10">Distribution of AI-governed tasks for {selectedRole}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tier: "Primary Domain", skills: ["Neural Core Logic", "Agentic Oversight", "Context Retention", "Bias Filtering"], icon: Cpu, color: "text-blue-400" },
            { tier: "Execution Tier", skills: ["Batch Processing", "Real-time Sync", "Error Mitigation", "Endpoint Safety"], icon: Database, color: "text-purple-400" },
            { tier: "Interaction Tier", skills: ["Sentiment Mirroring", "Intent Recognition", "Adaptive Voice", "Active Listening"], icon: MessageSquare, color: "text-emerald-400" },
            { tier: "Safety Layer", skills: ["Compliance Shield", "PII Redaction", "Anonymization", "Threat Triage"], icon: Shield, color: "text-purple-400" },
          ].map((cluster, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)", transition: { duration: 0.3 } }}
              className="p-6 rounded-2xl border border-white/5 bg-white/5 transition-colors group cursor-default"
            >
              <div className="flex items-center gap-3 mb-6 relative">
                 <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform ${cluster.color}`}>
                   <cluster.icon className="w-5 h-5 drop-shadow-md" />
                 </div>
                 <h4 className="font-display font-bold text-white uppercase text-sm tracking-widest">{cluster.tier}</h4>
              </div>
              <ul className="space-y-3">
                {cluster.skills.map((skill, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs font-mono text-white/50 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 mt-0.5 opacity-50 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Automation Growth vs Admin Roles</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-8">Tasks made and tickets solved (Monthly)</p>
          <div className="h-[300px] min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" name="AI Solved Tasks" dataKey="aiSolved" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" name="AI Made Tasks" dataKey="aiTasks" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" name="Worker Solved" dataKey="workerSolved" stroke="#f43f5e" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Worker Tasks" dataKey="workerTasks" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-200">
              <span className="font-bold text-blue-400">Conclusion:</span> Exponential AI scaling directly correlates with a reduction in manual administrative tasks. AI intervention handles 10x more capacity while optimizing operational costs.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Automation Value Flow</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-8">Process trajectory mapping</p>
          
          <div className="flex-1 flex flex-col justify-between relative max-w-sm mx-auto w-full gap-4">
            <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 z-0" />
            
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 w-full p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-center backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-white/10 mx-auto mb-2 flex items-center justify-center">
                <Users className="w-4 h-4 text-white/60" />
              </div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Manual Workload</h4>
              <p className="text-[10px] text-white/50">High-volume repetitive administration</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative z-10 w-full p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg text-center backdrop-blur-md transform scale-105">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 mx-auto mb-2 flex items-center justify-center border border-blue-400/30">
                <Bot className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="font-bold text-sm text-blue-200 uppercase tracking-wider">Agentic Takeover</h4>
              <p className="text-[10px] text-blue-400/70">Neural classification & autonomous resolution</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative z-10 w-full p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-center backdrop-blur-md">
              <div className="w-8 h-8 rounded-full bg-white/10 mx-auto mb-2 flex items-center justify-center">
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Time & Cost Deflation</h4>
              <div className="mt-2 flex justify-center gap-4 text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> $4.2M Saved</span>
                <span className="text-emerald-400 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> 165K Hrs Saved</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Issue Automation by Channel</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">Distribution of auto-solved tickets</p>
          <div className="h-[250px] min-h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Web Widget', value: 110000, color: '#8b5cf6' },
                    { name: 'Email', value: 85000, color: '#ea4335' },
                    { name: 'WhatsApp', value: 45000, color: '#25D366' },
                    { name: 'Telegram', value: 28000, color: '#0088cc' },
                    { name: 'Phone Calls', value: 12000, color: '#3b82f6' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {[
                    { name: 'Web Widget', value: 110000, color: '#8b5cf6' },
                    { name: 'Email', value: 85000, color: '#ea4335' },
                    { name: 'WhatsApp', value: 45000, color: '#25D366' },
                    { name: 'Telegram', value: 28000, color: '#0088cc' },
                    { name: 'Phone Calls', value: 12000, color: '#3b82f6' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', color: '#fff' }}
                  formatter={(value) => [`${value} closed`, 'Tasks']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono uppercase tracking-wider text-white/50">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8b5cf6' }} /> Web Widget</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ea4335' }} /> Email</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#25D366' }} /> WhatsApp</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0088cc' }} /> Telegram</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} /> Phone AI</div>
          </div>
        </div>

        <div className="lg:col-span-2 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Automated Sales / Lead ROI</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">Pipeline volume vs automated qualification multiplier</p>
          <div className="h-[300px] min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                  { month: 'Jan', automatedLeads: 450, qualified: 120, roi: 2.1 },
                  { month: 'Feb', automatedLeads: 620, qualified: 180, roi: 2.5 },
                  { month: 'Mar', automatedLeads: 950, qualified: 310, roi: 3.2 },
                  { month: 'Apr', automatedLeads: 1400, qualified: 480, roi: 4.1 },
                  { month: 'May', automatedLeads: 2100, qualified: 750, roi: 5.4 },
                  { month: 'Jun', automatedLeads: 3500, qualified: 1200, roi: 7.2 },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAutoLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <Area yAxisId="left" type="monotone" dataKey="automatedLeads" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAutoLeads)" name="Engaged Leads" />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="ROI Multiplier (x)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Support Ticket Resolution: AI vs Human</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">Monthly resolution volume comparison</p>
          <div className="h-[300px] min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                  { month: 'Jan', ai: 145000, human: 42000 },
                  { month: 'Feb', ai: 162000, human: 38000 },
                  { month: 'Mar', ai: 195000, human: 35000 },
                  { month: 'Apr', ai: 240000, human: 31000 },
                  { month: 'May', ai: 310000, human: 28000 },
                  { month: 'Jun', ai: 420000, human: 24000 },
                ]} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="ai" name="AI Agents" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="human" name="Human Support" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight mb-2">Automated Revenue Generation</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-6">Direct sales closed by AI agents vs Operational cost</p>
          <div className="h-[300px] min-h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={[
                  { month: 'Jan', revenue: 1.2, cost: 0.8 },
                  { month: 'Feb', revenue: 1.8, cost: 0.85 },
                  { month: 'Mar', revenue: 2.9, cost: 0.9 },
                  { month: 'Apr', revenue: 4.5, cost: 1.0 },
                  { month: 'May', revenue: 7.2, cost: 1.1 },
                  { month: 'Jun', revenue: 11.4, cost: 1.15 },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                  formatter={(val) => [`$${val}M`, '']}
                />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="AI Generated Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="cost" name="AI Operating Cost" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity"><Clock className="w-12 h-12 text-blue-400" /></div>
          <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">Avg Resolution Time</p>
          <p className="text-4xl font-display font-bold text-white mb-2">1.8 <span className="text-xl text-white/40">mins</span></p>
          <p className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> 84% faster than human agent</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity"><DollarSign className="w-12 h-12 text-emerald-400" /></div>
          <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">Total Cost Saved (YTD)</p>
          <p className="text-4xl font-display font-bold text-white mb-2">$8.4<span className="text-xl text-white/40">M</span></p>
          <p className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Average $12 saved per ticket</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity"><MessageSquare className="w-12 h-12 text-purple-400" /></div>
          <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1">Chat Conversion Rate</p>
          <p className="text-4xl font-display font-bold text-white mb-2">34<span className="text-xl text-white/40">%</span></p>
          <p className="text-xs text-purple-400 flex items-center gap-1"><Bot className="w-3 h-3" /> 4x higher than standard web forms</p>
        </div>
      </div>

      <DashboardCaseView />
    </div>
  );
};

const SecretarialBlueprint = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodePriorities, setNodePriorities] = useState<Record<string, 'Low' | 'Medium' | 'High'>>({});

  const nodes = [
    { 
      id: 'core', label: 'SCHEMATIC_CORE_00', type: 'hub', x: 50, y: 50, size: 20, 
      substeps: ['KERNEL_BOOT', 'NEURAL_INIT', 'AUTH_LAYER_V4'],
      status: 'STABLE',
      metrics: { throughput: '1.2 PB/s', latency: '0.002ms', health: '99.9%' },
      logs: ['Neural core authenticated', 'Vector buffer initialized']
    },
    // Level 1: Primary Domains
    { 
      id: 'exec', label: 'SYS_EXEC_ADM', type: 'sector', x: 25, y: 30, size: 14,
      links: ['ops'],
      substeps: ['COORDINATION', 'PRIORITY_MAP', 'ESC_PROTOCOL'],
      status: 'ACTIVE',
      metrics: { throughput: '450 GB/s', latency: '0.04ms', health: '98.5%' },
      logs: ['Executing priority Alpha', 'Mapping command vectors']
    },
    { 
      id: 'ops', label: 'SYS_OPS_AUTO', type: 'sector', x: 75, y: 30, size: 14,
      links: ['data'],
      substeps: ['LOGISTICS', 'CRM_SYNC', 'ERROR_ROUTING'],
      status: 'OPTIMIZING',
      metrics: { throughput: '320 GB/s', latency: '0.12ms', health: '94.2%' },
      logs: ['Syncing CRM pulse', 'Routing logistics error']
    },
    { 
      id: 'data', label: 'SYS_NEURAL_DAT', type: 'sector', x: 50, y: 80, size: 14,
      links: ['exec'],
      substeps: ['INGESTION', 'ANALYSIS', 'SHR_VECTORS'],
      status: 'INDEXING',
      metrics: { throughput: '890 GB/s', latency: '0.08ms', health: '99.1%' },
      logs: ['Ingesting raw telemetry', 'Analyzing neural overlap']
    },
    // Level 2: Specific Modules
    { id: 'cal', label: 'ADM_CAL_SYNC', type: 'module', x: 15, y: 15, size: 10, parent: 'exec', substeps: ['FETCH', 'MERGE', 'PUSH'], status: 'SYNCED', metrics: { latency: '12ms' }, logs: ['Calendar state merged'] },
    { id: 'comm', label: 'ADM_MSG_BOT', type: 'module', x: 35, y: 15, size: 10, parent: 'exec', links: ['cal'], substeps: ['NLP_PARSING', 'DRAFTING'], status: 'FAILED', metrics: { latency: '450ms' }, logs: ['NLP parsing critical failure', 'Retry limit exceeded'] },
    { id: 'crm', label: 'OPS_CRM_PULSE', type: 'module', x: 85, y: 15, size: 10, parent: 'ops', substeps: ['QUERY', 'UPDT'], status: 'STANDBY', metrics: { latency: '8ms' }, logs: ['CRM connection detected'] },
    { id: 'supply', label: 'OPS_FLT_LOGIC', type: 'module', x: 65, y: 15, size: 10, parent: 'ops', links: ['crm'], substeps: ['PATH_OPT', 'DISPATCH'], status: 'ROUTING', metrics: { latency: '120ms' }, logs: ['Recalculating fleet path'] },
    { id: 'report', label: 'DAT_PLN_RPT', type: 'module', x: 30, y: 85, size: 10, parent: 'data', links: ['comm'], substeps: ['GENERATE', 'EXPORT'], status: 'READY', metrics: { latency: '5ms' }, logs: ['Report manifest generated'] },
    { id: 'security', label: 'DAT_SHD_PROT', type: 'module', x: 70, y: 85, size: 10, parent: 'data', links: ['supply'], substeps: ['ENCRYPT', 'VERIFY'], status: 'ENGAGED', metrics: { latency: '2ms' }, logs: ['Encryption shield active'] },
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const SchematicLine = ({ from, to, isHierarchy = false }: { from: any, to: any, isHierarchy?: boolean }) => {
    // Parent connection implies this line is conveying from parent to child, and one of them is hovered/selected
    const isParentConn = isHierarchy && (selectedNodeId === to.id || hoveredNodeId === to.id);
    const isChildConn = isHierarchy && (selectedNodeId === from.id || hoveredNodeId === from.id);
    
    // Check if the actual node of interest is selected to avoid cross-link selection bleed
    const isNodeSelected = selectedNodeId === from.id || selectedNodeId === to.id;
    const isNodeHovered = hoveredNodeId === from.id || hoveredNodeId === to.id;

    // "highlight its parent connection line and the connection line to its children"
    // We only highlight if it's the specific parent/child connection line.
    const isHighlighted = isParentConn || isChildConn;
    const isSelected = isHighlighted && (selectedNodeId === to.id || selectedNodeId === from.id);
    const isHovered = isHighlighted && (hoveredNodeId === to.id || hoveredNodeId === from.id);
    
    // Check for high-activity statuses
    const activeStatues = ['ACTIVE', 'OPTIMIZING', 'INDEXING', 'ROUTING', 'ENGAGED'];
    const isProcessing = activeStatues.includes(from.status) || activeStatues.includes(to.status);
    const isSyncing = from.status === 'SYNCED' || to.status === 'SYNCED' || from.status === 'READY' || to.status === 'READY';
    const isActive = isProcessing || isSyncing;

    // Dynamic visual properties
    const color = isSelected ? "#3b82f6" : (isHovered ? "#60a5fa" : (isHierarchy ? "#1e293b" : "#1e1e2e"));
    
    let flowColor = "#3b82f6";
    if (isSelected) flowColor = "#bfdbfe"; 
    else if (isHovered) flowColor = "#93c5fd";
    else if (isProcessing) flowColor = "#3b82f6";
    else if (isSyncing) flowColor = "#2563eb";

    let thickness = 0.1;
    if (isSelected) thickness = 1.0;
    else if (isHovered) thickness = 0.8;
    else if (isProcessing) thickness = 0.3;
    else if (isSyncing) thickness = 0.2;

    const dashArray = isHierarchy ? (isSelected ? "2 2" : "2 6") : (isSelected ? "4 4" : (isProcessing ? "4 4" : "1 8"));
    
    // Animation speed
    let duration = 5;
    if (isSelected) duration = 1.0;
    else if (isHovered) duration = 1.5;
    else if (isProcessing) duration = 3.0;
    else if (isActive) duration = 4.0;

    return (
      <g opacity={isHierarchy ? 1 : 0.4}>
        {/* Glow for highlighted parent/child lines */}
        {isHighlighted && (
          <path
            d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
            fill="none"
            stroke={flowColor}
            strokeWidth={thickness * 4}
            strokeOpacity={0.3}
            filter="blur(1.5px)"
          />
        )}
        {/* Background Trace (the "ghost" line) */}
        <path
          d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
          fill="none"
          stroke={color}
          strokeWidth={thickness * 2}
          strokeOpacity={isHighlighted ? 0.7 : 0.1}
        />
        
        {/* Animated Flow Layer */}
        <motion.path
          d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
          fill="none"
          stroke={flowColor}
          strokeWidth={thickness}
          strokeDasharray={dashArray}
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ 
            duration: duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            filter: isHighlighted ? 'url(#glowPath)' : (isProcessing ? 'blur(0.2px)' : 'none'),
            strokeLinecap: 'round'
          }}
        />

        {/* Pulse Packets (Data clusters moving along the line) */}
        {(isActive || isHighlighted) && (
          <motion.circle
            r={Math.max(thickness * 1.5, 0.4)}
            fill={flowColor}
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            style={{ offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')` }}
            transition={{
              duration: duration * 0.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0
            }}
          />
        )}
      </g>
    );
  };

  const BlueprintSymbol = ({ type, size, color = "currentColor", isHovered = false, isActive = false }: { type: string, size: number, color?: string, isHovered?: boolean, isActive?: boolean }) => {
    const strokeWidth = isActive ? 0.8 : 0.5;
    
    // Active pulsing effect
    const PulseElement = () => {
      if (!isActive && !isHovered) return null;
      
      const pulseScale = isActive ? [1, 1.4, 1] : [1, 1.1, 1];
      const pulseOpacity = isActive ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1];
      const duration = isActive ? 1.5 : 2.5;

      return (
        <motion.circle
          cx="0"
          cy="0"
          r={size * 0.8}
          animate={{ scale: pulseScale, opacity: pulseOpacity }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
          fill={color}
          className="pointer-events-none"
        />
      );
    };

    if (type === 'hub') {
      return (
        <g>
          <PulseElement />
          <rect x={-size/2} y={-size/2} width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} />
          <line x1={-size/2} y1={0} x2={size/2} y2={0} stroke={color} strokeWidth="0.2" strokeDasharray="1 1" />
          <line x1={0} y1={-size/2} x2={0} y2={size/2} stroke={color} strokeWidth="0.2" strokeDasharray="1 1" />
          <circle cx="0" cy="0" r={size/4} fill="none" stroke={color} strokeWidth={strokeWidth} />
          {(isHovered || isActive) && <rect x={-size/1.5} y={-size/1.5} width={size*1.3} height={size*1.3} fill="none" stroke={color} strokeWidth="0.1" strokeDasharray="0.5 0.5" opacity="0.5" />}
        </g>
      );
    }
    if (type === 'sector') {
      return (
        <g>
          <PulseElement />
          <circle cx="0" cy="0" r={size/2} fill="none" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="0" cy="0" r={size/3} fill="none" stroke={color} strokeWidth="0.3" strokeDasharray="0.5 0.5" />
          <line x1={-size/2} y1="0" x2={size/2} y2="0" stroke={color} strokeWidth="0.2" />
          {(isHovered || isActive) && <circle cx="0" cy="0" r={size/1.8} fill="none" stroke={color} strokeWidth="0.1" opacity="0.3" />}
        </g>
      );
    }
    return (
      <g>
        <PulseElement />
        <rect x={-size/2} y={-size/2} width={size} height={size} rx="1" fill="none" stroke={color} strokeWidth={strokeWidth} />
        <rect x={-size/4} y={-size/4} width={size/2} height={size/2} fill={color} opacity="0.1" />
        <path d={`M${-size/2} 0 L${-size/2+2} 0 M${size/2-2} 0 L${size/2} 0`} stroke={color} strokeWidth="0.2" />
      </g>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-blue-400 mb-4 block">Interactive schematic V.4</span>
        <WritingTitle 
            text="AI controlled support service"
            className="text-[7vw] md:text-6xl lg:text-7xl font-display font-black tracking-tighter uppercase text-center"
        />
        <p className="mt-4 text-white/40 max-w-2xl mx-auto font-mono text-[10px] uppercase tracking-tight italic">Hover over modules for real-time analytics. Click to lock subsystem and execute advanced algorithm actions.</p>
      </div>

      <div className="relative aspect-square md:aspect-video w-full max-w-6xl mx-auto border-2 border-blue-500/20 rounded-xl bg-[#030308] overflow-hidden group shadow-[inset_0_0_100px_rgba(59,130,246,0.1)] flex">
        {/* Main Schematic Area */}
        <div className="relative flex-grow h-full">
          {/* Technical Blueprint Grid Removed as requested */}
          
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 p-4" role="img">
            <title>Technical Schematic of Neural Infrastructure</title>
            <defs>
              <filter id="glowNode" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glowPath">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Schematics Connections */}
            {(() => {
              const hierarchyConns: any[] = [];
              const crossLinks: any[] = [];
              
              nodes.forEach(node => {
                if (node.id === 'core') return;
                const parent = node.parent ? nodes.find(n => n.id === node.parent) : nodes.find(n => n.id === 'core');
                if (parent) {
                  hierarchyConns.push({ from: parent, to: node, id: `hier-${node.id}` });
                }
                
                if (node.links) {
                  node.links.forEach((linkId: string) => {
                    const target = nodes.find(n => n.id === linkId);
                    if (target) {
                      crossLinks.push({ from: node, to: target, id: `cross-${node.id}-${linkId}` });
                    }
                  });
                }
              });

              return (
                <g>
                   {hierarchyConns.map(conn => (
                     <SchematicLine key={conn.id} from={conn.from} to={conn.to} isHierarchy={true} />
                   ))}
                   {crossLinks.map(conn => (
                     <SchematicLine key={conn.id} from={conn.from} to={conn.to} />
                   ))}
                </g>
              );
            })()}

            {/* Blueprint Nodes */}
            {nodes.map((node, i) => {
              const priority = nodePriorities[node.id];
              let nodeColor = "#3b82f6";
              let hoverColor = "#60a5fa";
              let activeColor = "#ffffff";
              
              const statusStr = node.status || '';
              if (['STABLE', 'ACTIVE', 'READY', 'SYNCED'].includes(statusStr)) {
                nodeColor = "#10b981"; hoverColor = "#34d399"; activeColor = "#a7f3d0";
              } else if (['WAITING', 'STANDBY'].includes(statusStr)) {
                nodeColor = "#f59e0b"; hoverColor = "#fbbf24"; activeColor = "#fcd34d";
              } else if (['FAILED', 'ERROR', 'WARN'].includes(statusStr)) {
                nodeColor = "#ef4444"; hoverColor = "#f87171"; activeColor = "#fca5a5";
              }

              if (priority === 'High') {
                nodeColor = "#ef4444"; hoverColor = "#f87171"; activeColor = "#fca5a5";
              } else if (priority === 'Medium') {
                nodeColor = "#f59e0b"; hoverColor = "#fbbf24"; activeColor = "#fcd34d";
              } else if (priority === 'Low') {
                // If it's already another color, keep it, or force blue if needed, but let's keep status color
                // unless previously we overrode it. Wait, previously 'Low' forced blue.
                // Let's not override status color just because priority is 'Low'.
              }

              return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <motion.g
                animate={{
                  scale: selectedNodeId === node.id ? 1.6 : (hoveredNodeId === node.id ? 1.4 : 1),
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
                onFocus={() => setHoveredNodeId(node.id)}
                onBlur={() => setHoveredNodeId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${node.label} neural node`}
                aria-pressed={selectedNodeId === node.id}
                className="cursor-pointer group focus-visible:outline-none"
                style={{
                  outline: 'none',
                  filter: selectedNodeId === node.id || hoveredNodeId === node.id ? 'url(#glowNode)' : 'none'
                }}
                transition={{
                  scale: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <BlueprintSymbol 
                  type={node.type} 
                  size={node.size} 
                  color={selectedNodeId === node.id ? activeColor : hoveredNodeId === node.id ? hoverColor : nodeColor} 
                  isHovered={hoveredNodeId === node.id}
                  isActive={selectedNodeId === node.id}
                />
                
                {/* Node Label */}
                <text
                  y={node.size/2 + 4}
                  textAnchor="middle"
                  className="font-mono uppercase tracking-[0.2em] pointer-events-none transition-all duration-300"
                  fill={selectedNodeId === node.id ? activeColor : (hoveredNodeId === node.id ? hoverColor : nodeColor)}
                  style={{ fontSize: selectedNodeId === node.id ? '1.5px' : (hoveredNodeId === node.id ? '1.2px' : '1px') }}
                >
                  {node.label}
                </text>

                {/* Status Indicator */}
                <g style={{ transform: `translate(0px, -${node.size / 2 + 3}px)` }}>
                  <rect 
                    x="-8" y="-1.5" width="16" height="3" rx="0.5" 
                    fill={nodeColor} opacity="0.15" stroke={nodeColor} strokeWidth="0.2" className="pointer-events-none"
                  />
                  <circle cx="-6.5" cy="0" r="0.8" fill={nodeColor} className="opacity-60" />
                  <text x="-4" y="0.8" fontSize="2" fill={nodeColor} className="font-mono font-bold tracking-widest pointer-events-none">
                    {node.status}
                  </text>
                </g>

                {/* Log Indicator */}
                {node.logs && node.logs.length > 0 && (
                  <g style={{ transform: `translate(${node.size / 2 + 2}px, -${node.size / 2}px)` }} className="pointer-events-none">
                    {/* Log Icon badge */}
                    <circle r="1.5" fill="#3b82f6" stroke="#030308" strokeWidth="0.5" />
                    <text x="0" y="0.5" fontSize="1.5" fill="#ffffff" textAnchor="middle" className="font-mono font-bold">i</text>
                    
                    {/* The expanded log box only shown on hover */}
                    <AnimatePresence>
                      {hoveredNodeId === node.id && (
                        <motion.g
                          initial={{ opacity: 0, x: -2 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -2 }}
                          // Transform origin left
                          style={{ originX: 0 }}
                        >
                          <rect x="2.5" y="-3" width={`${Math.min(node.logs[0].length * 1.2 + 4, 35)}`} height="6" rx="1" fill="#030308" stroke="#3b82f6" strokeWidth="0.2" opacity="0.9" />
                          <text x="4" y="0.8" fontSize="1.8" fill="#93c5fd" className="font-mono pointer-events-none">
                            {node.logs[0].length > 25 ? node.logs[0].substring(0, 25) + '...' : node.logs[0]}
                          </text>
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </g>
                )}
              </motion.g>
              </g>
            )})}
          </svg>

        </div>

        {/* Forensic Side Panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 w-full sm:w-80 h-full border-l border-blue-500/20 bg-blue-950/20 backdrop-blur-2xl z-30 flex flex-col p-6 overflow-y-auto"
              aria-label={`${selectedNode.label} forensic details`}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter italic">{selectedNode.label}</h3>
                  <p className="text-[10px] font-mono text-blue-400 tracking-[0.3em] font-bold mt-1">SUBSYSTEM_V4.02</p>
                </div>
                <button 
                  onClick={() => setSelectedNodeId(null)}
                  aria-label="Close forensic panel"
                  className="p-2 text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Execution Priority */}
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Execution Priority</h4>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map(p => {
                      const isActive = (nodePriorities[selectedNode.id] || 'Low') === p;
                      const colorClass = p === 'High' ? 'text-red-400 border-red-500/30 bg-red-500/10 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]' : p === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[inset_0_0_10px_rgba(245,158,11,0.2)]' : 'text-blue-400 border-blue-500/30 bg-blue-500/10 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]';
                      const inactiveClass = 'text-white/40 border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10';
                      return (
                        <button 
                          key={p}
                          aria-pressed={isActive}
                          onClick={() => setNodePriorities(prev => ({ ...prev, [selectedNode.id]: p as any }))}
                          className={`flex-1 py-2 rounded-lg border text-xs font-mono font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isActive ? colorClass : inactiveClass}`}
                        >
                          {p.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status Block */}
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Operational Status</h4>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xs font-mono text-white/60">MODE:</span>
                    <span className={`text-xs font-mono font-bold ${
                      ['STABLE', 'ACTIVE', 'READY', 'SYNCED'].includes(selectedNode.status) ? 'text-emerald-400' :
                      ['WAITING', 'STANDBY'].includes(selectedNode.status) ? 'text-amber-400' :
                      ['FAILED', 'ERROR', 'WARN'].includes(selectedNode.status) ? 'text-red-400' :
                      'text-blue-400'
                    }`}>
                      {selectedNode.status}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Live Telemetry</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedNode.metrics || {}).map(([key, val]) => (
                      <div key={key} className="p-3 bg-white/5 rounded-xl border border-white/10">
                         <p className="text-[8px] font-mono text-white/30 uppercase mb-1">{key}</p>
                         <p className="text-sm font-bold text-blue-400">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Steps */}
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Neural Trace Activity</h4>
                  <div className="space-y-2">
                    {selectedNode.substeps?.map((step, i) => (
                      <div key={i} className="flex items-center gap-3 text-[10px] font-mono text-white/60 p-2 bg-blue-500/5 rounded-lg border border-blue-500/10">
                         <span className="text-blue-500">{i + 1}.</span>
                         <span className="flex-grow">{step}</span>
                         <motion.div 
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full" 
                         />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Log Stream */}
                <div>
                  <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Log Stream</h4>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-[9px] text-white/40 leading-relaxed overflow-hidden h-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    <motion.div
                      animate={{ y: [0, -40] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      {selectedNode.logs?.map((log, i) => (
                        <p key={i} className="mb-2 italic">{`[${new Date().toLocaleTimeString()}] ${log}`}</p>
                      ))}
                      <p className="mb-2 italic">{`[${new Date().toLocaleTimeString()}] Buffer overflow check bypass...`}</p>
                      <p className="mb-2 italic">{`[${new Date().toLocaleTimeString()}] Establishing secure handshake...`}</p>
                      <p className="mb-2 italic">{`[${new Date().toLocaleTimeString()}] Handshake success.`}</p>
                    </motion.div>
                  </div>
                </div>

                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   aria-label={`Execute detailed neural trace for ${selectedNode.label}`}
                   className="w-full py-4 bg-blue-500 text-white rounded-xl font-display font-black uppercase text-sm italic tracking-tight shadow-[0_0_20px_rgba(59,130,246,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ring-offset-2 ring-offset-blue-600 transition-shadow"
                 >
                   Execute Neural Drill-Down
                 </motion.button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Close hint */}
        {!selectedNodeId && (
          <div className="absolute top-4 right-4 pointer-events-none" aria-hidden="true">
            <span className="text-[8px] font-mono text-blue-400/40 uppercase tracking-[0.2em] border border-blue-500/20 px-2 py-1 rounded">Forensic Mode: Ready</span>
          </div>
        )}
      </div>

      <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'VECTOR_EXEC', id: 'ADM-01', nodeId: 'exec' },
          { label: 'NODE_OPERATIONS', id: 'OPS-22', nodeId: 'ops' },
          { label: 'DATA_REGISTRY', id: 'DAT-77', nodeId: 'data' },
          { label: 'CORE_SCHEMATIC', id: 'SYN-09', nodeId: 'core' }
        ].map((item, i) => (
          <button 
            key={i} 
            className={`p-4 border font-mono relative cursor-pointer text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 w-full ${
              selectedNodeId === item.nodeId 
                ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                : 'border-blue-500/10 bg-blue-900/5 hover:bg-blue-900/10'
            }`}
            onClick={() => setSelectedNodeId(item.nodeId === selectedNodeId ? null : item.nodeId)}
            aria-label={`Select ${item.label} subsystem`}
            aria-pressed={selectedNodeId === item.nodeId}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-blue-400">{item.label}</span>
              <span className="text-[8px] text-blue-500/40">{item.id}</span>
            </div>
            <div className="h-1 w-full bg-blue-500/10 overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-blue-500/30"
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

const CollaborationDiorama = () => (
  <div className="w-full py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-blue-900/10 backdrop-blur-3xl relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-blue-400 mb-4">Inter-Species Synergy</span>
        <WritingTitle 
            text="Algorithms & Human Collaboration"
            className="text-3xl md:text-5xl font-display font-bold tracking-tighter justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        { [
          { icon1: Users, icon2: Bot, tool: Smartphone, label: "Neural Interface", desc: "Humans and bots synchronizing operation protocols via encrypted handheld arrays.", color: "blue" },
          { icon1: Bot, icon2: SpaceshipIcon, tool: Keyboard, label: "Platform Command", desc: "Automated AI algorithms receiving low-latency tasks from human support and sales operators.", color: "blue" },
          { icon1: Users, icon2: Brain, tool: Monitor, label: "Cognitive Sync", desc: "Collective decision making between executive human boards and high-core AI clusters.", color: "purple" },
          { icon1: Bot, icon2: Users, tool: Keyboard, label: "Global Maintenance", desc: "Digital agents and field service teams coordinating industry infrastructure repairs.", color: "blue" }
        ].map((scene, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Future expansion logic placeholder
              }
            }}
            tabIndex={0}
            role="article"
            aria-label={`${scene.label}: ${scene.desc}`}
            className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-700 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <div className="flex items-end gap-2 mb-8 h-12 relative">
              {/* Human / Primary Icon */}
              <div className="relative">
                <motion.div
                  animate={scene.icon1 === Users ? {
                    y: [0, -2, 0],
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <scene.icon1 className="w-8 h-8 text-white/40 group-hover:text-white transition-all group-hover:scale-110" />
                </motion.div>
                {scene.icon1 === Bot && (
                   <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1.5 }}
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]" 
                   />
                )}
              </div>

              <div className="w-4 h-[1px] bg-blue-500/30 mb-4" />

              {/* Secondary Icon (Bot / Spaceship / Etc) */}
              <div className="relative">
                {(() => {
                  const Icon2 = scene.icon2 as any;
                  const isSpaceship = scene.icon2 === SpaceshipIcon;
                  const isBot = scene.icon2 === Bot;
                  
                  return (
                    <motion.div
                      animate={isSpaceship ? {
                        x: [0, 1, -1, 0],
                        y: [0, -1, 1, 0]
                      } : isBot ? {
                        scale: [1, 1.02, 1]
                      } : {}}
                      transition={{ duration: 0.1, repeat: Infinity, repeatType: isSpaceship ? "mirror" : "reverse" }}
                    >
                      {isSpaceship ? (
                        <div className="relative">
                          <Icon2 variant="scout" className="w-8 h-8 text-blue-400/60" />
                          <motion.div 
                            animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [1, 1.5, 1] }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-blue-500/30 blur-md rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <Icon2 className="w-8 h-8 text-blue-400/60 transition-all group-hover:scale-110" />
                          {isBot && (
                            <motion.div 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 0.8 }}
                              className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]" 
                            />
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })()}
              </div>
            </div>
            
            <div className="relative mb-6">
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }} 
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                />
              </div>
              <motion.div 
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 right-0"
              >
                <scene.tool className="w-5 h-5 text-white/20 group-hover:text-blue-400 transition-all" />
              </motion.div>
            </div>

            <h4 className="text-lg font-display font-bold mb-3 tracking-tight">{scene.label}</h4>
            <p className="text-xs text-white/30 leading-relaxed font-light">{scene.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
    
    {/* Background Decorative Element */}
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />
  </div>
);

const coreValuesData = [
  { id: 'v1', title: 'CREATIVITY', color: 'text-blue-500', size: 'text-4xl md:text-[2rem]', animType: 0 },
  { id: 'v2', title: 'INTEGRITY', color: 'text-emerald-400', size: 'text-3xl md:text-[1.6rem]', animType: 1 },
  { id: 'v3', title: 'INTELLIGENCE', color: 'text-purple-500', size: 'text-4xl md:text-[2rem]', animType: 2 },
  { id: 'v4', title: 'SOPHISTICATION', color: 'text-blue-500', size: 'text-3xl md:text-[1.8rem]', animType: 3 },
  { id: 'v5', title: 'FAST IMPLEMENTATION', color: 'text-emerald-400', size: 'text-4xl md:text-[2.2rem]', animType: 4 },
  { id: 'v6', title: 'ADAPTATION', color: 'text-purple-500', size: 'text-3xl md:text-[1.6rem]', animType: 0 },
  { id: 'v7', title: 'INSPIRATION', color: 'text-blue-500', size: 'text-3xl md:text-[1.8rem]', animType: 1 },
  { id: 'v8', title: '100% GRIT', color: 'text-emerald-400', size: 'text-4xl md:text-[2.2rem]', animType: 2 },
  { id: 'v9', title: 'PERSISTENCE', color: 'text-purple-500', size: 'text-3xl md:text-[1.8rem]', animType: 3 },
  { id: 'v10', title: 'EXPERIENCE', color: 'text-blue-500', size: 'text-4xl md:text-[2rem]', animType: 4 },
  { id: 'v11', title: 'CYBER SAFETY', color: 'text-emerald-400', size: 'text-4xl md:text-[2.2rem]', animType: 0 },
  { id: 'v12', title: 'MOTIVATION', color: 'text-purple-500', size: 'text-4xl md:text-[2.4rem]', animType: 1 },
  { id: 'v13', title: 'CLARITY', color: 'text-blue-500', size: 'text-3xl md:text-[1.8rem]', animType: 2 },
  { id: 'v14', title: 'IMPACT', color: 'text-emerald-400', size: 'text-5xl md:text-[2.8rem]', animType: 3 },
];

const moreCoreValuesData: any[] = [];


const DigitalArtNode = ({ index, colorClass }: { index: number, colorClass: string }) => {
  const color = colorClass.includes('blue') ? '#3b82f6' : colorClass.includes('emerald') ? '#10b981' : '#a855f7';
  return (
    <div className="w-full h-full opacity-60 flex items-center justify-center p-4">
      <IndustryTech2D typeIndex={index} color={color} />
    </div>
  );
};

const DataClusterItem = ({ value, i, totalItems, scrollYProgress }: { value: any, i: number, totalItems: number, scrollYProgress: any }) => {
  const [isActivated, setIsActivated] = useState(false);
  const staggerOffset = (i / totalItems) * 0.2;
  const fadeInStart = 0.02 + staggerOffset;
  const fadeInEnd = 0.15 + staggerOffset;
  const fadeOutStart = 0.85 - staggerOffset;
  const fadeOutEnd = 0.98 - staggerOffset;
  
  const opacity = useTransform(
    scrollYProgress, 
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], 
    [0, 1, 1, 0]
  );
  
  const itemScale = useTransform(
    scrollYProgress, 
    [fadeInStart, fadeInEnd, 0.5, fadeOutStart, fadeOutEnd], 
    [0.4, 1, 1.15, 1, 0.4]
  );
  
  const rotate = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [i % 2 === 0 ? 15 : -15, 0, 0, i % 2 === 0 ? -15 : 15]
  );

  // Responsive offsets
  const xOffsetBase = [(i % 4 === 0 ? -120 : i % 4 === 1 ? 120 : -40), 0, (i % 4 === 2 ? 80 : i % 4 === 3 ? -120 : 60)];
  const yOffsetBase = [(i % 3 === 0 ? -300 : i % 3 === 1 ? 300 : -200), 0, (i % 3 === 0 ? 200 : i % 3 === 1 ? -400 : 250)];

  const xOffset = useTransform(scrollYProgress, [0, 0.5, 1], xOffsetBase);
  const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], yOffsetBase);

  // Apply a dynamic responsive scale to offsets
  const responsiveX = useTransform(xOffset, (v) => {
    if (typeof window === 'undefined') return v;
    const factor = window.innerWidth < 768 ? 0.25 : 0.8;
    return v * factor;
  });
  
  const responsiveY = useTransform(yOffset, (v) => {
    if (typeof window === 'undefined') return v;
    const factor = window.innerWidth < 768 ? 0.3 : 0.8;
    return v * factor;
  });

  const z = useTransform(
    scrollYProgress,
    [fadeInStart, 0.5, fadeOutEnd],
    [-200, 0, -200]
  );

  const blur = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    ["8px", "0px", "0px", "8px"]
  );

  const brightness = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, 0.5, fadeOutStart, fadeOutEnd],
    [0.5, 1, 1.3, 1, 0.5]
  );

  // Select brand book symbols for display
  const color = value.color.includes('blue') ? '#3b82f6' : value.color.includes('emerald') ? '#10b981' : '#a855f7';
  
  const renderAsset = () => {
    // Only use official brand book symbols
    const symbol = SYMBOLS[i % SYMBOLS.length];
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[3] transition-all duration-500" style={{ stroke: color }}>
        <motion.path 
          d={symbol.path}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <motion.div
      style={{
        opacity,
        scale: itemScale,
        rotate,
        x: responsiveX,
        y: responsiveY,
        z,
        filter: useTransform(blur, (v) => `blur(${v}) brightness(${brightness.get()})`),
        zIndex: isActivated ? 50 : 10 + (i % 5),
        willChange: "transform, opacity, filter"
      }}
      className="pointer-events-auto relative cursor-pointer"
      onMouseEnter={() => setIsActivated(true)}
      onMouseLeave={() => setIsActivated(false)}
      onClick={() => setIsActivated(!isActivated)}
    >
        <div className="relative flex flex-col items-center">
          {/* Subtle background art node - hide when activated for clarity */}
          {!isActivated && (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm scale-150">
              <DigitalArtNode index={value.animType} colorClass={value.color} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isActivated ? (
              <motion.div 
                key="text"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                className="relative px-6 md:px-10 py-3 md:py-5 bg-black/20 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 group overflow-hidden max-w-[90vw] md:max-w-none"
              >
                <div className={`font-display font-black tracking-tighter uppercase whitespace-normal text-center leading-[0.9] ${value.color} ${value.size}`}>
                  {value.title}
                </div>
                
                {/* HUD Decoration */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            ) : (
              <motion.div 
                key="brand-asset"
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1.2, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                className={`w-32 h-32 md:w-48 md:h-48 flex items-center justify-center ${value.color}`}
              >
                {renderAsset()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Micro labels */}
          <motion.div 
            style={{ opacity: useTransform(opacity, [0.8, 1], [0, 0.4]) }}
            className="mt-2 text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase"
          >
            VALUE_NODE_0{i} // {isActivated ? 'DECODED_SCHEMA' : 'STABLE'}
          </motion.div>
        </div>
    </motion.div>
  );
};


const DataClusterGallery = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother scroll spring for more fluid parallax response
  const scrollYProgress = useSpring(rawScrollProgress, { 
    stiffness: 30, 
    damping: 40, 
    restDelta: 0.0001 
  });
  
  const totalItems = coreValuesData.length + moreCoreValuesData.length;

  const satelliteOrbits = useMemo(() => [
    { radius: 280, speed: 1.1, angleOffset: 0, depth: 1, driftIntensity: 0.4 },
    { radius: 360, speed: -0.7, angleOffset: 140, depth: 0.8, driftIntensity: 0.9 },
    { radius: 220, speed: 1.6, angleOffset: 240, depth: 1.2, driftIntensity: 0.2 },
  ], []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative min-h-[320vh] flex flex-col justify-start overflow-hidden border-t border-white/5">
      
      {/* FIXED HEADER - More fluid transitions */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center z-30 pointer-events-none">
        
        {/* Ambient Orbitals */}
        <div className="absolute inset-0 overflow-hidden">
          {satelliteOrbits.map((orbit, idx) => (
            <motion.div
              key={`orbit-${idx}`}
              className="absolute left-1/2 top-1/2"
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]),
                rotate: useTransform(scrollYProgress, [0, 1], [0, orbit.speed * 360]),
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                marginLeft: -orbit.radius,
                marginTop: -orbit.radius,
                border: "1px dashed rgba(59, 130, 246, 0.1)",
                borderRadius: "50%",
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-blue-500/40 blur-[1px]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        <div className="relative flex flex-col items-center text-center">
          <motion.div 
            style={{ 
              scale: useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.95, 0.7]),
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 0.95], [1, 0.8, 0.4, 0]),
              y: useTransform(scrollYProgress, [0, 1], [100, -400]),
              rotateX: useTransform(scrollYProgress, [0, 1], [0, 20]),
              perspective: 1000,
              willChange: "transform, opacity"
            }}
            className="mb-8"
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0em", filter: 'blur(10px)' }}
              whileInView={{ opacity: 0.7, letterSpacing: "2.5em", filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] md:text-[14px] font-mono uppercase text-blue-400 mb-6 block"
            >
              Axiomatic Hub
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[14vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] leading-[0.8] sm:leading-[0.85] font-display font-black tracking-[-0.06em] uppercase italic bg-black/60 backdrop-blur-[40px] px-6 sm:px-16 md:px-32 py-10 md:py-16 rounded-[3rem] md:rounded-[5rem] border border-white/10 shadow-[0_0_150px_rgba(59,130,246,0.15)] ring-1 ring-white/10 relative group overflow-hidden w-full max-w-[98vw] md:w-auto text-center mx-auto flex flex-col justify-center items-center"
            >
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-white to-sky-400 saturate-[1.4] block drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                THE CORE VALUES
              </span>
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0" 
              />
            </motion.h3>
          </motion.div>
        </div>
      </div>
      
      {/* GRID ITEMS - Staggered Appearance & Parallax */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-start justify-center z-20 pointer-events-none lg:pointer-events-auto">
        <div className="max-w-7xl w-full flex flex-wrap justify-center items-center gap-4 md:gap-12 px-6 md:px-12 pt-[35vh] md:pt-[45dvh]">
          {[...coreValuesData, ...moreCoreValuesData].map((value: any, i: number) => {
            return (
              <DataClusterItem 
                key={`grid-item-${value.id}`}
                value={value}
                i={i}
                totalItems={totalItems}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>

    </section>
  );
};

const TeamMemberCard = ({ member, index }: { member: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollYProgress = useSpring(rawScrollProgress, { stiffness: 60, damping: 20 });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const [clicks, setClicks] = useState<{id: number, x: number, y: number, icon: any}[]>([]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const icons = [Cpu, Bot, Zap, Activity, Satellite];
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    setClicks(prev => [...prev.slice(-10), {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      icon: RandomIcon
    }]);
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ 
        delay: index * 0.05, 
        y: { type: "spring", stiffness: 400, damping: 30 },
        scale: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      viewport={{ once: true }}
      className="group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[2rem]"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e as any);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${member.name}, ${member.role}`}
    >
      <div className="aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md relative group/avatar transition-all duration-700 hover:shadow-[0_0_50px_rgba(59,130,246,0.25)] hover:border-blue-500/40">
        {/* Realistic Portrait */}
        <motion.img
          style={{ y: yParallax, scale: 1.1 }}
          src={member.img}
          alt={`${member.name}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover/avatar:scale-110 group-active/avatar:scale-110 contrast-[1.05] saturate-100"
        />
        
        {/* Overlay Darken on Hover - reduced so portraits remain visible */}
        <div className="absolute inset-0 bg-blue-900/5 group-hover/avatar:bg-blue-900/0 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent opacity-70 group-hover/avatar:opacity-40 transition-opacity" />

        {/* Click Animation Particles */}
        <AnimatePresence>
          {clicks.map(click => (
            <motion.div
              key={click.id}
              initial={{ opacity: 0, scale: 0, x: click.x, y: click.y }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0.5, 1.5, 0.8], 
                y: click.y - 150 - Math.random() * 50,
                x: click.x + (Math.random() - 0.5) * 100
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
            >
              <click.icon className="w-8 h-8 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-6 px-2 text-center absolute bottom-6 w-full z-10 transition-transform duration-500 group-hover:-translate-y-4 group-active:-translate-y-4">
        <h4 className="text-xl md:text-2xl font-display font-bold tracking-tight group-hover:text-blue-400 group-active:text-blue-400 transition-colors shadow-[0_0_10px_black] drop-shadow-md mb-1">{member.name}</h4>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em] shadow-[0_0_10px_black] drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] font-bold line-through opacity-80">{member.oldRole}</p>
          <p className="text-xs md:text-sm font-mono text-emerald-400 uppercase tracking-[0.1em] shadow-[0_0_10px_black] drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] font-bold">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  // Real team. Portraits for Alexei, Alon, Nir are pulled from pr.geoscale.ai
  // (the public GEO-PR / GeoScale brand site). Katia, Yoav, and Michael are
  // generic Freepik placeholders until real headshots are supplied.
  // Each member's "former" role is what they did before joining Dscope;
  // current role is their operational role inside the company.
  const team = [
    {
      name: "Alexei Kogan",
      role: "Founder & CEO",
      oldRole: "Serial Entrepreneur",
      img: "/team/alexei.jpg",
      agents: [
        { type: "Vision Agent", task: "Architecting Strategy", icon: Telescope, color: "bg-blue-500", position: "top-[20%] right-4" },
        { type: "Growth Bot", task: "Scaling Operations", icon: Rocket, color: "bg-purple-500", position: "bottom-[40%] left-4" }
      ]
    },
    {
      name: "Alon Soler",
      role: "Co-Founder & CTO",
      oldRole: "Automation Architect",
      img: "/team/alon.jpg",
      agents: [
        { type: "Build Agent", task: "Shipping Systems", icon: Cpu, color: "bg-blue-500", position: "top-[15%] left-4" },
        { type: "Workflow Bot", task: "Orchestrating Pipelines", icon: Webhook, color: "bg-emerald-500", position: "bottom-[30%] right-4" }
      ]
    },
    {
      name: "Kateryna Dlugach",
      role: "Chief Product Officer",
      oldRole: "Product Designer",
      img: "/team/katia.jpg",
      agents: [
        { type: "Design Agent", task: "Refining Surfaces", icon: Palette, color: "bg-purple-500", position: "top-[25%] right-4" },
        { type: "Quality Bot", task: "Auditing Experience", icon: Eye, color: "bg-emerald-500", position: "top-[40%] left-4" }
      ]
    },
    {
      name: "Nir Zari",
      role: "Head of Engineering",
      oldRole: "Senior Full-Stack Engineer",
      img: "/team/nir.jpg",
      agents: [
        { type: "Infra Agent", task: "Hardening Platform", icon: Server, color: "bg-blue-500", position: "top-[20%] left-4" },
        { type: "API Bot", task: "Wiring Integrations", icon: Database, color: "bg-emerald-500", position: "bottom-[40%] right-4" }
      ]
    },
    {
      name: "Yoav Yellin",
      role: "Head of Delivery",
      oldRole: "Solutions Engineer",
      img: "/team/yoav.jpg",
      agents: [
        { type: "Delivery Agent", task: "Tracking Milestones", icon: CheckCircle2, color: "bg-purple-500", position: "top-[18%] right-4" },
        { type: "Client Bot", task: "Aligning Stakeholders", icon: Users, color: "bg-blue-500", position: "bottom-[35%] left-4" }
      ]
    },
    {
      name: "Michael Pavlov",
      role: "Lead Platform Engineer",
      oldRole: "Software Engineer",
      img: "/team/michael.jpg",
      agents: [
        { type: "Code Agent", task: "Compiling Modules", icon: Layers, color: "bg-emerald-500", position: "top-[22%] left-4" },
        { type: "Deploy Bot", task: "Releasing Builds", icon: Rocket, color: "bg-blue-500", position: "bottom-[30%] right-4" }
      ]
    },
    {
      name: "Vitalina Rebalsky",
      role: "Customer Success Manager",
      oldRole: "Client Relations Specialist",
      img: "/team/vitalina.jpg",
      agents: [
        { type: "Loyalty Agent", task: "Nurturing Relationships", icon: HeartHandshake, color: "bg-purple-500", position: "top-[20%] right-4" },
        { type: "Pulse Bot", task: "Mapping Sentiment", icon: MessageSquare, color: "bg-emerald-500", position: "bottom-[35%] left-4" }
      ]
    },
    {
      name: "Darren Rozowsky",
      role: "Chairman",
      oldRole: "Board Member",
      img: "/team/darren.jpg",
      agents: [
        { type: "Compass Agent", task: "Plotting Direction", icon: Compass, color: "bg-blue-500", position: "top-[18%] left-4" },
        { type: "Governance Bot", task: "Anchoring Vision", icon: Landmark, color: "bg-purple-500", position: "bottom-[40%] right-4" }
      ]
    }
  ];

  return (
    <section id="team" className="py-20 md:py-32 border-t border-white/10 mt-10 md:mt-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24 flex flex-col items-center max-w-3xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-blue-400 mb-4 block">The Operators</span>
        <WritingTitle
            text="Our Team"
            className="text-4xl sm:text-[8vw] md:text-6xl font-display font-black tracking-tighter uppercase italic justify-center text-white"
        />
        <p className="mt-4 md:mt-6 text-white/70 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Founders, engineers, and operators who have shipped AI and automation at scale across travel, finance, education, real estate, and government. The team behind Dscope is the same team that ran the missions on the home page.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {team.map((member, i) => (
          <TeamMemberCard key={i} member={member} index={i} />
        ))}
      </div>
    </section>
  );
};

const ScrollingIcon = ({ iconIndex, isOpen, activeColor }: { iconIndex: number, isOpen: boolean, activeColor: string }) => {
  const symbolIds = ['alpha', 'omega', 'gamma', 'sigma', 'delta'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOpen ? "close" : `icon-${iconIndex}`}
        initial={{ opacity: 0, scale: 0.5, rotate: isOpen ? -90 : 90, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.5, rotate: isOpen ? 90 : -90, filter: 'blur(4px)' }}
        transition={{ 
          duration: 0.4, 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        className="flex items-center justify-center p-2"
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-8 md:h-8 drop-shadow-md" style={{ color: activeColor }} />
        ) : (
          <SymbolIcon symbolId={symbolIds[iconIndex]} size={36} color={activeColor} className="drop-shadow-[0_0_8px_currentColor]" />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const SatelliteNav = memo(({ 
  activeTab, 
  setActiveTab,
  hoveredTab,
  setHoveredTab,
  isOpen,
  setIsOpen,
  progress,
  tabs
}: { 
  activeTab: string, 
  setActiveTab: (t: string) => void,
  hoveredTab: string | null,
  setHoveredTab: (id: string | null) => void,
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  progress: any,
  tabs: typeof NAV_TABS
}) => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { 
    stiffness: 60, 
    damping: 30, 
    restDelta: 0.1 
  });
  const { width } = useWindowSize();
  const { theme, toggleTheme } = useTheme();
  const isMobile = width < 768;
  const menuThreshold = 200;
  
  const [focusedTabId, setFocusedTabId] = useState<string | null>(null);
  const [centeredTabId, setCenteredTabId] = useState<string | null>(activeTab);
  const [iconIndex, setIconIndex] = useState(0);
   
  useMotionValueEvent(progress, "change", (latest: number) => {
    const value = typeof latest === 'number' ? latest : 0;
    const index = Math.min(4, Math.floor(value * 5));
    setIconIndex(prev => {
      if (prev !== index) return index;
      return prev;
    });
  });

  const symbolIds = ['alpha', 'omega', 'gamma', 'sigma', 'delta'];
  const activeSymbolId = symbolIds[iconIndex];
  const activeSymbolObj = SYMBOLS.find(s => s.id === activeSymbolId) || SYMBOLS[0];
  const activeColor = activeSymbolObj.color;
  
  // Transform hex to rgba manually
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59,130,246';
  };
  const activeColorRgb = hexToRgb(activeColor);

  useEffect(() => {
    if (isOpen && isMobile) {
      setCenteredTabId(activeTab);
    }
  }, [isOpen, isMobile, activeTab]);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerCenter = scrollLeft + container.clientWidth / 2;

    let closest = tabs[0].id;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child) => {
      const el = child as HTMLElement;
      // Skip absolute/fixed non-tab children if any
      if (!el.getAttribute('data-tab-id')) return;
      
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(elCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closest = el.getAttribute('data-tab-id') || tabs[0].id;
      }
    });

    setCenteredTabId(closest);
  };

  
  // Transition variables
  const topNavOpacity = useTransform(smoothScrollY, [0, 50], [1, 0]);
  const topNavY = useTransform(smoothScrollY, [0, 50], [0, -10]);
  const mobileHamburgerOpacity = useTransform(smoothScrollY, [0, 100], [0.1, 1]);
  // Adjust opacity and scale to ignore scroll if menu is open
  const satelliteOpacity = useTransform(smoothScrollY, [0, 50], [0.4, 1]);
  const satelliteScale = useTransform(smoothScrollY, [menuThreshold/2, menuThreshold], [0.9, 1]);

  const finalOpacity = useMotionValue(0.4);
  const finalScale = useMotionValue(0.9);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isOpen) {
      finalOpacity.set(1);
      finalScale.set(1);
    } else {
      // Map scroll to opacity/scale
      const opacity = latest < 50 ? 0.4 : latest > menuThreshold ? 1 : 0.4 + (latest - 50) / (menuThreshold - 50) * 0.6;
      const scale = latest < 50 ? 0.9 : latest > menuThreshold ? 1 : 0.9 + (latest - 50) / (menuThreshold - 50) * 0.1;
      finalOpacity.set(opacity);
      finalScale.set(scale);
    }
  });

  // Existing useEffect for isOpen scaling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, setIsOpen]);

  // Existing update when isOpen changes
  useEffect(() => {
    if (isOpen) {
      finalOpacity.set(1);
      finalScale.set(1);
    } else {
      const latest = scrollY.get();
      const opacity = latest < 50 ? 0.4 : latest > menuThreshold ? 1 : 0.4 + (latest - 50) / (menuThreshold - 50) * 0.6;
      const scale = latest < 50 ? 0.9 : latest > menuThreshold ? 1 : 0.9 + (latest - 50) / (menuThreshold - 50) * 0.1;
      finalOpacity.set(opacity);
      finalScale.set(scale);
    }
  }, [isOpen]);

  const handleTabClick = (id: string) => {
    setIsOpen(false);
    
    // Clear hash so any selected sector is removed when changing tabs
    window.location.hash = '';

    // Dispatch event so sections know they were explicitly clicked in the menu
    window.dispatchEvent(new CustomEvent('nav_tab_click', { detail: id }));

    // Map tab IDs to section IDs for internal scrolling within 'home' OR view switching
    const sectionMap: Record<string, string> = {
      'home': 'page-top',
    };

    // If we are currently on 'home', we can just scroll to the section
    if (activeTab === 'home' && sectionMap[id] && id !== 'home') {
      const element = document.getElementById(sectionMap[id]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optional: wait a bit before switching tab state to avoid unmounting too early
        // Or just let it scroll if the content is there
        return;
      }
    }

    // Default behavior for other tabs or if section not found
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTabSymbolId = tabs.find(t => t.id === activeTab)?.symbolId || 'alpha';

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed inset-0 bg-[#00000a]/95 backdrop-blur-3xl z-[999] flex flex-col p-6 pt-16 md:p-12 overflow-hidden"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute top-6 right-6 md:top-12 md:right-12 z-[1002]">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 text-white/40 hover:text-white transition-all duration-300 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-2xl"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 md:w-8 md:h-8 transition-transform group-hover:rotate-90 duration-500" />
              </button>
            </div>

            <div 
              className="grid grid-cols-2 gap-x-2 sm:gap-x-8 md:gap-x-16 lg:gap-x-32 gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6 w-full max-w-5xl mx-auto h-full place-content-center px-2 sm:px-4 py-4 sm:py-6"
              onClick={(e) => e.stopPropagation()}
            >
              {tabs.map((tab, i) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onFocus={() => setFocusedTabId(tab.id)}
                  onBlur={() => setFocusedTabId(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 md:gap-6 lg:gap-8 group text-center sm:text-left outline-none py-1 sm:py-2 md:py-4"
                >
                  <div className="relative shrink-0 mb-2 sm:mb-0 flex items-center justify-center">
                    <div className={`absolute -inset-4 md:-inset-8 rounded-full blur-2xl transition-all duration-500 ${
                      activeTab === tab.id 
                        ? 'bg-blue-500/20 scale-100 opacity-100' 
                        : 'bg-blue-500/10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                    }`} />
                    <SymbolIcon
                      symbolId={(tab as any).symbolId}
                      size={isMobile ? 32 : 72}
                      className={`relative z-10 transition-transform duration-500 ${
                        activeTab === tab.id ? 'scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] text-blue-400' : 'group-hover:scale-110 group-hover:-rotate-3'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col items-center sm:items-start mt-1 sm:mt-0">
                    {/* Bumped per Katia 2026-05-27: «в меню треба збільшити
                        розмір сторінок». Was sm/xl/2xl/3xl → now base/2xl/4xl/5xl. */}
                    <h4 className={`text-base sm:text-2xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter uppercase transition-all duration-300 leading-none ${
                      activeTab === tab.id ? 'text-white' : 'text-white/40 group-hover:text-white'
                    }`}>
                      {tab.label}
                    </h4>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-6 flex flex-col items-center shrink-0">
               <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
               <div className="flex items-center gap-8 opacity-20">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-white">Encryption</span>
                    <span className="text-[10px] font-mono text-blue-400">ACTIVE-256</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/20" />
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-white">Signal</span>
                    <span className="text-[10px] font-mono text-emerald-400">STABLE-99%</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={false}
        animate={isOpen ? {
          top: isMobile ? "60px" : "80px",
          left: isMobile ? "calc(100% - 40px)" : "calc(100% - 60px)",
          x: "-50%",
          y: "-50%",
          opacity: 0,
          scale: 0.8
        } : {
          top: isMobile ? "60px" : "80px",
          left: isMobile ? "calc(100% - 40px)" : "calc(100% - 60px)",
          x: "-50%",
          y: "-50%",
          opacity: 1,
          scale: 1
        }}
        style={{ 
          opacity: finalOpacity, 
          scale: finalScale,
          position: 'fixed'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 180, 
          damping: 25,
          mass: 0.8
        }}
        className={`z-[1000] flex items-center justify-center ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
      >
        <div className="relative" id="satellite-nav-menu" role="navigation" aria-label="Main orbital navigation">
        {/* Central Satellite Core - Enhanced tap target for mobile */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => !isOpen && setHoveredTab('core')}
          onMouseLeave={() => setHoveredTab(null)}
          onFocus={() => !isOpen && setFocusedTabId('core')}
          onBlur={() => setFocusedTabId(null)}
          whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(59,130,246,0.4)" }}
          whileTap={{ scale: 0.85 }}
          aria-label={isOpen ? "Collapse navigation system" : "Expand navigation system"}
          aria-expanded={isOpen}
          aria-controls="satellite-nav-menu"
          animate={{
            boxShadow: isOpen ? `0 0 50px rgba(${activeColorRgb},0.6)` : `0 0 32px rgba(${activeColorRgb},0.5)`,
            borderColor: isOpen ? `rgba(${activeColorRgb},0.6)` : `rgba(${activeColorRgb},0.45)`
          }}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#050510] border-2 flex items-center justify-center z-[1001] transition-all duration-500 group overflow-hidden focus-visible:outline-none focus:ring-4 ring-offset-4 ring-offset-black cursor-pointer"
          style={{ 
            boxShadow: `inset 0 0 20px rgba(${activeColorRgb}, 0.3)`,
            // we'll update the border color dynamically via animate above
          }}
        >
          {/* Core spinning ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20 group-hover:opacity-40"
          >
            <div 
              className="absolute inset-0 border-t border-r rounded-full" 
              style={{ borderColor: `rgba(${activeColorRgb}, 0.4)` }}
            />
          </motion.div>

          <ScrollingIcon iconIndex={iconIndex} isOpen={isOpen} activeColor={activeColor} />
          
          {/* Discovery Tooltip for Core */}
          <DiscoveryTooltip 
            text={isOpen ? "Collapse" : "Menu"}
            isVisible={(hoveredTab === 'core' || focusedTabId === 'core') && !isOpen}
            className="mb-10"
          />
          
          {/* Pulse effect when closed */}
          {!isOpen && (
            <>
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-blue-400/30"
                style={{ borderColor: `rgba(${activeColorRgb}, 0.3)` }}
              />
            </>
          )}

          {/* Core interior detail */}
          <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
        </motion.button>
      </div>
    </motion.div>
  </>
  );
});


const RevealWord = ({ 
  word, 
  progress, 
  start, 
  end, 
  lightning 
}: { 
  word: string, 
  progress: any, 
  start: number, 
  end: number, 
  lightning?: boolean 
}) => {
  const letters = useMemo(() => word.split(""), [word]);

  return (
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: start * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        perspective: "1000px",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        translateZ: 0,
        WebkitFontSmoothing: "antialiased"
      } as any}
      className={`inline-block mr-[0.25em] will-change-transform ${lightning ? "lightning-font" : ""}`}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{
            y: [0, -2, 0],
          }}
          viewport={{ once: true }}
          transition={{ 
            opacity: { duration: 0.5, delay: (start * 0.1) + (index * 0.03) },
            y: { 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: (start * 0.1) + (index * 0.03) 
            }
          }}
          className="inline-block cursor-default relative group/letter"
        >
          {char}
          <motion.span 
            className="absolute inset-0 bg-blue-400/20 blur-sm rounded-full opacity-0 group-hover/letter:opacity-100 transition-opacity"
            initial={false}
          />
        </motion.span>
      ))}
    </motion.span>
  );
};

const ScrollRevealTitle = ({ 
  text, 
  progress, 
  className = "", 
  noItalic = false,
  lightning = false,
  pulse = false
}: { 
  text: string, 
  progress: any, 
  className?: string,
  noItalic?: boolean,
  lightning?: boolean,
  pulse?: boolean
}) => {
  const words = useMemo(() => text.split(" "), [text]);
  const total = words.length;
  const wordDuration = 0.4; // Each word animation spans 40% of the total progress range
  const stagger = total > 1 ? (1 - wordDuration) / (total - 1) : 0;

  return (
    <motion.h1 
      aria-label={text}
      animate={pulse ? {
        textShadow: [
          "0 0 0px rgba(59, 130, 246, 0)",
          "0 0 20px rgba(59, 130, 246, 0.5)",
          "0 0 0px rgba(59, 130, 246, 0)"
        ],
        opacity: [1, 0.8, 1]
      } : {}}
      transition={pulse ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
      className={`${className} ${noItalic ? "" : "italic"} tracking-tighter flex flex-wrap justify-center font-display overflow-visible`}
    >
      {words.map((word, i) => {
        const start = i * stagger;
        const end = start + wordDuration;
        return (
          <span key={`${word}-${i}`} aria-hidden="true">
            <RevealWord 
              word={word}
              progress={progress}
              start={start}
              end={end}
              lightning={lightning}
            />
            {i < total - 1 && "\u00A0"}
          </span>
        );
      })}
    </motion.h1>
  );
};

const PageScrollRevealTitle = ({ text, className, lightning = false, progress }: { text: string, className: string, lightning?: boolean, progress?: any }) => {
  const ref = useRef(null);
  const { scrollYProgress: rawInternalProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.3"]
  });
  const internalProgress = useSpring(rawInternalProgress, { stiffness: 80, damping: 25 });
  const scrollProgress = progress || internalProgress;
  return (
    <div ref={ref} className="w-full">
      <ScrollRevealTitle 
        text={text} 
        progress={scrollProgress} 
        className={className} 
        lightning={lightning}
      />
    </div>
  );
};

const PinnedScrollSection = ({ children, height = "h-[300vh]", innerClassName = "" }: { children: React.ReactNode, height?: string, innerClassName?: string }) => {
  const containerRef = useRef(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 45,
    damping: 22,
    mass: 1,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className={`relative ${height}`}>
      <div className={`sticky top-0 min-h-[100dvh] flex items-center overflow-x-hidden z-10 w-full ${innerClassName}`}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // @ts-ignore - Injecting progress into children
            return React.cloneElement(child, { progress: scrollYProgress });
          }
          return child;
        })}
      </div>
    </section>
  );
};

const IndustryAutomation = () => {
  return (
    <PinnedScrollSection height="h-[250vh]" innerClassName="flex flex-col justify-center max-w-7xl mx-auto px-6">
      <IndustryAutomationContent />
    </PinnedScrollSection>
  );
};

const OrbitalTurningTitle = ({ progress }: { progress: any }) => {
  const words = ["Planetary", "Scale", "Industry", "Solutions"];
  // More readable rotation UX - tighter arcs
  const rotationY = useTransform(progress, [0, 0.85], [-45, 45]);
  const rotationZ = useTransform(progress, [0, 0.85], [-10, 10]);
  const scale = useTransform(progress, [0, 0.1, 0.7, 0.85, 0.95], [0.8, 1, 1, 0.1, 0]);
  const opacity = useTransform(progress, [0, 0.85, 0.9], [1, 1, 0]);
  const z = useTransform(progress, [0, 0.5, 0.85, 0.95], [-300, 100, 100, -2000]);
  const yOffset = useTransform(progress, [0.8, 0.95], [0, -800]);
  
  const flashOpacity = useTransform(progress, [0.88, 0.9, 0.92], [0, 0, 0]);

  return (
    <div className="relative h-[600px] md:h-[800px] flex items-center justify-center perspective-[2000px] w-full">
      <motion.div 
        style={{ 
          rotateY: rotationY, 
          rotateZ: rotationZ,
          scale, 
          opacity,
          z,
          y: yOffset
        }}
        className="flex flex-col items-center justify-center w-full"
      >
        <motion.div 
          style={{ opacity: useTransform(progress, (p: any) => (p as number) > 0.86 ? 0 : 1) }}
          className="flex flex-col items-center gap-2 md:gap-4 w-full"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="text-[clamp(2.5rem,12vw,7rem)] font-display font-black tracking-tighter uppercase whitespace-normal break-words lightning-3d block leading-[0.9] md:leading-[0.8] mb-[-0.1em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Transition to Satellite escaping to background */}
        <motion.div 
          style={{ 
            opacity: useTransform(progress, (p: any) => (p as number) > 0.86 ? 1 : 0),
            scale: 12
          }}
          className="absolute flex items-center justify-center"
        >
          <div className="relative">
            <Orbit className="w-16 h-16 text-blue-400" />
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Supernova Flash Event */}
      <motion.div 
        style={{ opacity: flashOpacity }}
        className="fixed inset-0 bg-white z-[2000] pointer-events-none mix-blend-screen overflow-hidden"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,white,transparent_70%)]" />
      </motion.div>
    </div>
  );
};

const IndustryAutomationContent = ({ progress }: { progress?: any }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Reveal grid between 45% and 65%
  const contentOpacity = useTransform(progress || 0, [0.45, 0.65], [0, 1]);
  const contentY = useTransform(progress || 0, [0.45, 0.65], [30, 0]);
  
  const iconY = useTransform(progress || 0, [0, 1], [-30, 30]);
  const bgGridY = useTransform(progress || 0, [0, 1], [-15, 15]);

  const x1 = useTransform(progress || 0, [0.05, 0.15], [-200, 0]);
  const o1 = useTransform(progress || 0, [0.05, 0.15], [0, 1]);
  
  const x2 = useTransform(progress || 0, [0.10, 0.20], [200, 0]);
  const o2 = useTransform(progress || 0, [0.10, 0.20], [0, 1]);

  const x3 = useTransform(progress || 0, [0.15, 0.25], [-200, 0]);
  const o3 = useTransform(progress || 0, [0.15, 0.25], [0, 1]);

  const x4 = useTransform(progress || 0, [0.20, 0.30], [200, 0]);
  const o4 = useTransform(progress || 0, [0.20, 0.30], [0, 1]);

  const x5 = useTransform(progress || 0, [0.25, 0.35], [-200, 0]);
  const o5 = useTransform(progress || 0, [0.25, 0.35], [0, 1]);

  const x6 = useTransform(progress || 0, [0.30, 0.40], [200, 0]);
  const o6 = useTransform(progress || 0, [0.30, 0.40], [0, 1]);

  const x7 = useTransform(progress || 0, [0.35, 0.45], [-200, 0]);
  const o7 = useTransform(progress || 0, [0.35, 0.45], [0, 1]);

  return (
    <div className="flex flex-col min-h-screen justify-center py-20 items-center overflow-x-hidden">
      <div className="flex flex-col items-center text-center justify-center mb-12 md:mb-24 relative z-10 w-full px-6 overflow-hidden">
        <div className="w-full">
          <OrbitalTurningTitle progress={progress} />
        </div>
        <div className="mt-20 md:mt-32 max-w-5xl flex flex-col items-center gap-6">
          <p className="text-white font-medium leading-tight text-[clamp(1.5rem,4vw,3.5rem)] tracking-tight flex flex-col gap-2">
            <motion.span style={{ x: x1, opacity: o1 }} className="block">
              Our architecture supports
            </motion.span>
            <motion.span style={{ x: x2, opacity: o2 }} className="block text-blue-400">
              seamless autonomous orchestration
            </motion.span>
            <motion.span style={{ x: x3, opacity: o3 }} className="block">
              for specialized support
            </motion.span>
            <motion.span style={{ x: x4, opacity: o4 }} className="block">
               and <span className="text-emerald-400">service teams</span> across critical sectors.
            </motion.span>
          </p>
          <div className="text-white/60 text-[clamp(1.1rem,2vw,1.8rem)] leading-relaxed font-light mt-8 flex flex-col gap-2 relative">
            <motion.span style={{ x: x5, opacity: o5 }} className="block">
              Leveraging the <strong className="text-white font-normal">2026 technology jump</strong> of human and AI automated workflows,
            </motion.span>
            <motion.span style={{ x: x6, opacity: o6 }} className="block">
              we transform <span className="text-blue-300">support, sales, marketing, service</span>
            </motion.span>
            <motion.span style={{ x: x7, opacity: o7 }} className="block">
              and more areas with unparalleled efficiency.
            </motion.span>
          </div>
        </div>
      </div>

      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 relative z-10 w-full px-4 md:px-0"
      >
        {[].map((item: any, i) => (
          <div 
            key={i} 
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
            tabIndex={0}
            role="article"
            aria-label={`Industry Focus: ${item.sector}. ${item.desc}`}
            className="group p-10 rounded-[3rem] bg-transparent border border-white/5 hover:bg-white/[0.02] hover:border-blue-500/20 hover:scale-[1.01] transition-all duration-700 relative overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/50"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center justify-center transition-colors relative w-16 h-16">
                <motion.div style={{ y: iconY }} className="w-full h-full absolute flex items-center justify-center">
                  <SpaceTech2D type={item.type} color="#3b82f6" />
                </motion.div>
                <DiscoveryTooltip 
                  text={`${item.type.toUpperCase()}_PROTOCOL`}
                  isVisible={hoveredIndex === i}
                  className="mb-14"
                />
              </div>
            </div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">{item.focus}</h4>
            <WritingTitle 
              text={item.sector}
              className="text-xl md:text-2xl font-display font-bold mb-6 tracking-tight"
            />
            <p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AtmosphericNeuralGrid = ({ progress }: { progress: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const scrollShift = useTransform(progress, [0, 1], [0, -80]);
  const opacity = useTransform(progress, [0, 0.4], [1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div 
        style={{ y: scrollShift, opacity }}
        className="relative w-full h-[120%] flex flex-wrap gap-x-16 md:gap-x-24 gap-y-16 md:gap-y-24 p-10 md:p-32 justify-center will-change-transform"
      >
        {[...Array(isMobile() ? 20 : 35)].map((_, i) => (
          <NeuralNode key={i} mouseX={smoothMouseX} mouseY={smoothMouseY} />
        ))}
      </motion.div>
    </div>
  );
};

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const NeuralNode = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const { initialX, initialY, opacity, duration } = React.useMemo(() => ({
    initialX: Math.random() * 20 - 10,
    initialY: Math.random() * 20 - 10,
    opacity: 0.05 + Math.random() * 0.15,
    duration: 8 + Math.random() * 8
  }), []);
  
  const driftX = useTransform(mouseX, [ -50, 50 ], [ initialX - 25, initialX + 25 ]);
  const driftY = useTransform(mouseY, [ -50, 50 ], [ initialY - 25, initialY + 25 ]);

  return (
    <motion.div
      style={{ x: driftX, y: driftY, opacity }}
      animate={{ 
        opacity: [opacity, opacity * 1.5, opacity]
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-400/20 border border-blue-300/10 will-change-[transform,opacity]"
    />
  );
};

const FloatingAstronaut = ({ progress }: { progress: any }) => {
  const [isFlying, setIsFlying] = useState(false);
  const y = useTransform(progress, [0, 1], [0, -150]);
  const rotateValue = useTransform(progress, [0, 1], [0, 20]);
  const opacityValue = useTransform(progress, [0, 0.5, 0.8], [1, 0.8, 0]);
  
  return (
    <motion.div
      onClick={() => {
        // Smooth-scroll to the testimonials block before flying off,
        // so the click takes the visitor where the astronaut "points".
        const el = document.getElementById('home-testimonials');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsFlying(true);
      }}
      style={{
        y: isFlying ? undefined : y,
        rotate: isFlying ? undefined : rotateValue,
        opacity: isFlying ? undefined : opacityValue
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isFlying ? {
        top: "18%",
        right: "12%",
        scale: [1, 0.4, 0],
        opacity: [1, 0.8, 0],
        rotate: [0, 180, 360],
        x: [0, -100, -200],
        filter: ["blur(0px)", "blur(10px)", "blur(20px)"]
      } : {
        opacity: 1,
        scale: 1
      }}
      transition={isFlying ? {
        duration: 2.5,
        ease: "easeInOut"
      } : {
        duration: 2.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      // Pinned to the upper-right area so it never overlaps the
      // bottom-left VoiceWidget / Messengers chip.
      className="absolute top-[28%] right-[8%] w-40 h-56 md:w-64 md:h-80 z-[5] cursor-pointer pointer-events-auto hidden md:block"
    >
      <motion.div
        animate={isFlying ? {} : { 
          y: [-20, 20, -20],
          rotate: [-5, 5, -5],
          x: [-10, 10, -10]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full"
      >
        {/* Glowing Aura */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-150" />
        
        <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_40px_rgba(59,130,246,0.4)]">
          <defs>
            <linearGradient id="astroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="hudGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Backpack / Life Support */}
          <rect x="50" y="80" width="100" height="90" rx="15" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <rect x="60" y="90" width="80" height="20" rx="5" fill="#3b82f6" opacity="0.2" />
          
          {/* Main Body */}
          <rect x="65" y="90" width="70" height="110" rx="35" fill="url(#astroGradient)" />
          
          {/* Helmet */}
          <circle cx="100" cy="65" r="35" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="75" y="45" width="50" height="40" rx="20" fill="#0f172a" />
          
          {/* HUD Reflection / Display */}
          <path d="M 80 60 Q 100 55 120 60" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.6" filter="url(#hudGlow)" />
          <circle cx="85" cy="55" r="1.5" fill="#60a5fa" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Limbs */}
          {/* Right Arm */}
          <motion.rect 
            x="130" y="100" width="22" height="75" rx="11" fill="url(#astroGradient)" 
            style={{ originX: "11px", originY: "11px" }}
            animate={{ rotate: [15, 25, 15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Left Arm */}
          <motion.rect 
            x="48" y="100" width="22" height="75" rx="11" fill="url(#astroGradient)" 
            style={{ originX: "11px", originY: "11px" }}
            animate={{ rotate: [-15, -25, -15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Legs */}
          <rect x="70" y="185" width="28" height="85" rx="14" fill="url(#astroGradient)" transform="rotate(-5 70 185)" />
          <rect x="102" y="185" width="28" height="85" rx="14" fill="url(#astroGradient)" transform="rotate(5 102 185)" />
          
          {/* Detailings / Patches */}
          <rect x="85" y="110" width="30" height="20" rx="4" fill="#cbd5e1" opacity="0.5" />
          <circle cx="92" cy="118" r="3" fill="#ef4444" />
          <circle cx="102" cy="118" r="3" fill="#10b981" />
          <circle cx="112" cy="118" r="3" fill="#3b82f6" />
          
          {/* Data Line (Neural Connection) */}
          <motion.path 
            d="M 100 130 Q 160 160 280 220" 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="0.5" 
            strokeDasharray="5 5" 
            opacity="0.3"
            animate={{ strokeDashoffset: [0, -30] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const CLIENTS = [
  {
    name: "Lastminute",
    description: "Leading online travel agency offering vacation packages and flights.",
    color: "#E3007E"
  },
  {
    name: "Clarity",
    description: "Financial services and global investment management firm.",
    color: "#004c97"
  },
  {
    name: "Calcalist",
    description: "Israel's leading daily business newspaper and economic website.",
    color: "#FF0000"
  },
  {
    name: "Dani Levi Communication Ltd",
    description: "Top-tier public relations, crisis management, and strategic communications firm.",
    color: "#9ca3af"
  },
  {
    name: "Yeda",
    description: "The commercial arm of the Weizmann Institute of Science.",
    color: "#0D3B66"
  },
  {
    name: "Geoscale",
    description: "Advanced geospatial data and technology solutions provider.",
    color: "#2E8B57"
  },
  {
    name: "MalamTeam",
    description: "One of the largest IT services and systems integration groups in Israel.",
    color: "#E31837"
  },
  {
    name: "AllenCarr",
    description: "Israel's branch of the globally renowned Easyway smoking cessation clinic.",
    color: "#E52A2D"
  },
  {
    name: "FISCHER F|B|C|&Co",
    description: "One of Israel's premier and largest full-service corporate law firms.",
    color: "#003366"
  },
  {
    name: "Regba",
    description: "Israel's leading and most established brand for custom kitchens and home cabinetry.",
    color: "#8B0000"
  },
  {
    name: "Orin Shpalter",
    description: "The leading college in Israel for financial, pension, and insurance education.",
    color: "#F26522"
  }
];

// Brand-book palette — only these colours are allowed on client logos.
// (Electric Blue / Bio Emerald / Plasma Purple / Cyan / Pink / Amber)
const BRAND_PALETTE = ['#4facfe', '#34d399', '#a855f7', '#22d3ee', '#ec4899', '#fbbf24'];

const FloatingClientLogo = ({
  name, description, brandColor, lane, duration, delay,
}: { name: string; description: string; brandColor: string; lane: number; duration: number; delay: number }) => {
  // Two-div structure: OUTER does the L→R CSS translateX animation
  // (we use a CSS @keyframes rather than Framer Motion specifically so
  // that `animation-play-state: paused` cleanly freezes the logo on
  // hover without rewinding / reversing — Framer's `animate=undefined`
  // pause was the source of the "moves in opposite direction" bug).
  // INNER div is only touched by rAF (scale / opacity / colour) and
  // writes the CSS `scale` PROPERTY (separate from transform) so the
  // two layers don't fight.
  const innerRef = React.useRef<HTMLDivElement>(null);
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Mirror hover into the OUTER via inline style so the CSS animation
  // pauses cleanly. (React state alone would force a re-render of the
  // CSS-animated outer div, which CAN reset transform momentarily.)
  // Also bump z-index while hovered so the tooltip sits ABOVE every
  // other client logo flying past — per Katia: «це пояснення має бути
  // на першому плані, так щоб інші назви не перекривали його».
  React.useEffect(() => {
    const el = outerRef.current;
    if (el) {
      el.style.animationPlayState = isHovered ? 'paused' : 'running';
      el.style.zIndex = isHovered ? '100' : '1';
    }
  }, [isHovered]);

  // Flip tooltip to ABOVE the logo when the client is in the bottom
  // half of the band — otherwise the tooltip extends past the bottom
  // edge and gets clipped (per Katia, screenshot: REGBA tooltip cut
  // off at the bottom).
  const tooltipAbove = lane > 50;

  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = innerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const vcx = window.innerWidth / 2;
        const d = Math.abs(cx - vcx);
        const md = window.innerWidth / 2;
        const t = Math.min(d / md, 1);   // 0 at centre → 1 at edges
        const k = 1 - t;                 // closeness to centre
        const scale = 0.75 + k * 0.8;    // 0.75 → 1.55
        const opacity = 0.35 + k * 0.65; // 0.35 → 1.0
        let color: string;
        if (k > 0.7) {
          color = brandColor;
        } else if (k > 0.4) {
          const pct = Math.round(((k - 0.4) / 0.3) * 100);
          color = `color-mix(in srgb, ${brandColor} ${pct}%, white)`;
        } else {
          color = '#ffffff';
        }
        el.style.scale = String(scale);
        el.style.opacity = String(opacity);
        el.style.color = color;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [brandColor]);

  return (
    <div
      ref={outerRef}
      className="absolute will-change-transform"
      style={{
        top: `${lane}%`,
        animationName: 'clientFlow',
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      }}
    >
      <div
        ref={innerRef}
        className="whitespace-nowrap font-display font-bold uppercase tracking-tight text-xl md:text-3xl cursor-pointer pointer-events-auto relative"
        style={{ color: '#ffffff', transformOrigin: 'left center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
        {/* Tooltip — fixed-width card that sits below the logo. Marquee
            animation pauses while hovered via animationPlayState. The
            tooltip is `pointer-events-none` so moving the mouse from
            the logo into the tooltip area never re-fires onMouseLeave
            (which was the flicker source). Description text wraps
            inside the card (whitespace-normal overrides the outer
            whitespace-nowrap on the logo). */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: tooltipAbove ? -8 : 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: tooltipAbove ? -8 : 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`absolute left-1/2 -translate-x-1/2 w-72 md:w-80 z-50 pointer-events-none whitespace-normal ${
                tooltipAbove ? 'bottom-full mb-3' : 'top-full mt-3'
              }`}
            >
              <div
                className="rounded-2xl border bg-black/90 backdrop-blur-xl px-5 py-4 text-left shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                style={{ borderColor: `${brandColor}66`, boxShadow: `0 0 30px ${brandColor}33` }}
              >
                <div
                  className="font-display font-bold uppercase tracking-wider text-sm mb-1.5 break-words"
                  style={{ color: brandColor }}
                >
                  {name}
                </div>
                <div className="font-sans normal-case font-normal text-xs leading-relaxed tracking-normal text-white/75 break-words">
                  {description}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ClientMarquee = () => {
  // Pre-compute deterministic lane / duration / delay per client.
  //
  // LANES: evenly spread across the band so two clients are NEVER on
  // the same vertical line (was: `lane = 8 + ((i*37) % 80)` which could
  // collide). With 11 clients and 84% range (4%→88%), gap = ~8.4% of
  // band height = ~46px on desktop band height 560px — comfortably
  // larger than the rendered name height (~45px at full 1.55× scale),
  // so names always have visible breathing room.
  //
  // DURATIONS / DELAYS stay varied so the field still feels chaotic
  // and the per-row crossings happen at different times.
  const N = CLIENTS.length;
  const items = CLIENTS.map((c, i) => {
    const seed = (i * 31 + 7) % 100;
    // Spread lanes evenly across 4% → 88%.
    const lane = 4 + (i * (84 / Math.max(N - 1, 1)));
    const duration = 30 + ((seed * 0.27) % 18); // 30s → 48s, varied per client
    const delay = -((i * 4.2) % 35);            // negative delay → already spread at mount
    const brandColor = BRAND_PALETTE[i % BRAND_PALETTE.length];
    return { ...c, lane, duration, delay, brandColor };
  });

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 mt-24 z-20">
      <div className="flex flex-row items-center justify-center mb-10 px-6 relative z-30">
        <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-[0.05em] uppercase text-center drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
          Our Clients
        </h3>
      </div>

      {/* Floating field — each client on its own y-lane / speed,
          travelling LEFT → RIGHT. White + dim at the edges, picks up
          its brand colour + scales up as it crosses the viewport
          centre. Band is taller (560px) so each evenly-spread lane has
          room for the logo at full scale + tooltip below. */}
      {/* overflow-x-hidden (NOT overflow-hidden) so off-screen marquee
          is clipped horizontally but tooltips on the bottom lane can
          extend a bit below the band without being cut. */}
      <div className="relative w-full overflow-x-hidden h-[520px] md:h-[600px]">
        {items.map((it) => (
          <FloatingClientLogo
            key={it.name}
            name={it.name}
            description={it.description}
            brandColor={it.brandColor}
            lane={it.lane}
            duration={it.duration}
            delay={it.delay}
          />
        ))}
      </div>
    </div>
  );
};

const HeroContent = memo(({ progress }: { progress?: any }) => {
  const words = "Multi Tasking AI Automation Platform".split(" ");
  
  // Create a smoothed local progress for the hero section
  const localProgress = progress || useMotionValue(0);
  const smoothProgress = useSpring(localProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects for different elements
  const titleY = useTransform(smoothProgress as any, [0, 1], [0, -40]);
  const textY = useTransform(smoothProgress as any, [0, 1], [0, -20]);
  const bgScale = useTransform(smoothProgress as any, [0, 1], [1, 1.05]);
  const bgOpacity = useTransform(smoothProgress as any, [0, 0.8], [0.12, 0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4 md:px-6 text-center relative overflow-visible">
      {/* Dynamic Background Elements */}
      <AtmosphericNeuralGrid progress={smoothProgress} />

      {/* Background Ambient Glow that scales with scroll */}
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] w-full bg-blue-600/10 blur-[150px] pointer-events-none z-0" 
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: textY }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mb-8 md:mb-10 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[11px] font-mono uppercase tracking-[0.5em] text-blue-300 z-20"
      >
        Multi-Tasking AI Platform
      </motion.div>
      
      <motion.div 
        style={{ y: titleY }}
        className="relative mb-8 md:mb-12 z-20 flex flex-wrap justify-center items-center max-w-5xl mx-auto"
      >
        <h1 className="text-[9.5vw] sm:text-[8vw] md:text-[3.6rem] lg:text-[5.6rem] font-display font-bold tracking-tighter leading-[0.9] text-white italic flex flex-wrap justify-center gap-x-[0.1em]">
          {words.map((word, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className={`inline-block whitespace-normal break-words lightning-font ${i !== arr.length - 1 ? 'mr-[0.15em]' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {word}
              </motion.span>
          ))}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: textY }}
        transition={{ delay: 1.8, duration: 1 }}
        className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 z-20 font-light tracking-tight"
      >
        DeltaScope solves automation of support, service, sales, marketing, and more issues for each industry using our AI algorithms and automation abilities.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="w-full flex justify-center"
      >
        <ClientMarquee />
      </motion.div>
    </div>
  );
});

const ColorRevealLetter = ({ letter, progress, start, end, colorRange, glowColor }: { letter: string, progress: any, start: number, end: number, colorRange: string[], glowColor: string }) => {
  const color = useTransform(progress, [start, end], colorRange);
  const y = useTransform(progress, [start, start + Math.abs(end-start)/2, end], [50, -20, 0]);
  const rotateX = useTransform(progress, [start, start + Math.abs(end-start)/2, end], [90, -10, 0]);
  const opacity = useTransform(progress, [start, start + Math.abs(end-start)/2], [0, 1]);
  const textShadow = useTransform(progress, [start, end], ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 40px ${glowColor}`]);
  const scale = useTransform(progress, [start, start + Math.abs(end-start)/2, end], [0.5, 1.2, 1]);

  return (
    <motion.span 
      style={{ 
        color, 
        textShadow,
        scale,
        y,
        rotateX,
        opacity,
        display: "inline-block",
        transformOrigin: "bottom"
      }}
      className="will-change-transform font-black tracking-normal transition-colors"
    >
      {letter}
    </motion.span>
  );
};

const ColorRevealWord = ({ word, progress, start, end, colorRange, glowColor }: { word: string, progress: any, start: number, end: number, colorRange: string[], glowColor: string }) => {
  const letters = word.split("");
  const letterDuration = (end - start) / letters.length;
  
  return (
    <span className="mr-[0.22em] inline-block whitespace-nowrap">
      {letters.map((char, i) => (
        <ColorRevealLetter 
          key={i}
          letter={char}
          progress={progress}
          start={start + (i * letterDuration)}
          end={start + ((i + 1) * letterDuration)}
          colorRange={colorRange}
          glowColor={glowColor}
        />
      ))}
    </span>
  );
};

const ColorRevealTitle = ({ text, progress, className = "", startProgress = 0, endProgress = 0.95, colorRange = ["rgba(255, 255, 255, 0.1)", "rgba(56, 189, 248, 1)"], glowColor = "rgba(56,189,248,0.6)" }: { text: string, progress: any, className?: string, startProgress?: number, endProgress?: number, colorRange?: string[], glowColor?: string }) => {
  const words = useMemo(() => text.split(" "), [text]);
  const total = words.length;
  const wordDuration = (endProgress - startProgress) / total;
  
  return (
    <motion.h1 className={`flex flex-wrap justify-center ${className}`} aria-label={text}>
      {words.map((word, i) => {
        const start = startProgress + (i * wordDuration);
        const end = start + wordDuration;
        return (
          <span key={`${word}-${i}`} aria-hidden="true">
            <ColorRevealWord 
              word={word}
              progress={progress}
              start={start}
              end={end}
              colorRange={colorRange}
              glowColor={glowColor}
            />
          </span>
        );
      })}
    </motion.h1>
  );
};

const OrbitalTelescope = ({ progress, onClick, label = "Click to Synchronize Deep Space Nodes", id }: { progress?: any, onClick?: () => void, label?: string, id?: string }) => {
  const [isExploding, setIsExploding] = useState(false);
  const defaultProgress = useMotionValue(0);
  const rotate = useTransform(progress || defaultProgress, [0, 1], [0, 720]);
  
  const handleClick = () => {
    setIsExploding(true);
    if (onClick) {
      onClick();
    } else {
      setTimeout(() => {
        setIsExploding(false);
        const target = document.getElementById('service-01');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1000);
      return;
    }
    setTimeout(() => setIsExploding(false), 2000);
  };

  return (
    <div 
      className="relative w-full h-[300px] flex justify-center items-center mt-12 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="View System Architecture Details"
    >
      <motion.div style={{ rotate }} className="relative w-64 h-64 z-10 origin-center pointer-events-none">
        <svg viewBox="0 0 120 120" className="w-full h-full fill-none drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          <defs>
            <pattern id="gold-foil" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 0L10 10M10 0L0 10" stroke="#fbbf24" strokeWidth="0.5" opacity="0.3" />
              <rect width="10" height="10" fill="#f59e0b" fillOpacity="0.1" />
            </pattern>
            <linearGradient id="solar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          {/* Core Body - Multi-layered */}
          <rect x="45" y="45" width="30" height="30" rx="2" className="fill-zinc-800 stroke-zinc-600" strokeWidth="1" />
          <rect x="48" y="48" width="24" height="24" rx="1" fill="url(#gold-foil)" stroke="#fbbf24" strokeWidth="0.5" opacity="0.8" />
          
          {/* Main High-Gain Antenna (Large) */}
          <circle cx="60" cy="30" r="18" className="stroke-zinc-500 fill-zinc-900/40" strokeWidth="1" />
          <circle cx="60" cy="30" r="3" className="fill-blue-400" />
          <path d="M42 30 L78 30 M60 12 L60 48" className="stroke-zinc-700/50" strokeWidth="0.5" />
          
          {/* Secondary Instruments */}
          <rect x="55" y="75" width="10" height="15" className="fill-zinc-700 stroke-zinc-500" />
          <path d="M55 90 L65 90 M50 85 L70 85" className="stroke-zinc-400" strokeWidth="1" />
          
          {/* Detailed Solar Arrays */}
          {[0, 180].map((angle) => (
            <g key={`panel-${angle}`} transform={`rotate(${angle} 60 60)`}>
              <rect x="75" y="40" width="40" height="40" rx="1" fill="url(#solar-gradient)" className="stroke-blue-400" strokeWidth="0.8" />
              {/* Grid on panels */}
              {[1, 2, 3].map(i => (
                <path key={`h-${i}`} d={`M75 ${40 + i * 10} L115 ${40 + i * 10}`} stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
              ))}
              {[1, 2, 3].map(i => (
                <path key={`v-${i}`} d={`M${75 + i * 10} 40 L${75 + i * 10} 80`} stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
              ))}
              {/* Connector arms */}
              <path d="M75 60 L80 60" className="stroke-zinc-400" strokeWidth="2" />
            </g>
          ))}

          {/* Flashing Beacon */}
          <motion.circle 
            cx="60" cy="60" r="1.5" 
            className="fill-red-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </svg>
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
      
      {/* Interaction Hint */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-full text-center">
         <span className="text-sm font-mono text-blue-400 uppercase tracking-widest border border-blue-500/30 rounded-full px-6 py-2 bg-blue-500/10 backdrop-blur-md shadow-lg shadow-blue-500/20">{label}</span>
      </div>

      {/* Improved Boom Effect */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0.5, 5, 12], 
              opacity: [1, 0.8, 0],
              rotate: [0, 90, 180] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 origin-center z-[100] pointer-events-none"
          >
            {/* Shockwave Rings */}
            <div className="absolute inset-0 border-[2px] border-blue-500/50 rounded-full animate-ping" />
            <div className="absolute inset-[-20%] border-[1px] border-white/20 rounded-full" />
            
            {/* Plasma Core */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-indigo-600 to-transparent rounded-full blur-[30px] mix-blend-screen opacity-80" />
            <div className="absolute inset-4 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 border-2 border-white/50 rounded-full blur-[15px]" />
            <div className="absolute inset-10 bg-white rounded-full blur-[8px] shadow-[0_0_120px_#fff]" />
            
            {/* High-speed Debris Streaks */}
            {[...Array(24)].map((_, i) => {
              const rotate = i * 15;
              const delay = Math.random() * 0.2;
              return (
                <motion.div 
                  key={i} 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, delay, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-[2px] h-40 bg-gradient-to-t from-white via-blue-300 to-transparent rounded-full origin-bottom"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${rotate}deg) translateY(-30px)`,
                  }}
                />
              );
            })}

            {/* Particle Burst */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  x: Math.cos(i * 30) * 200, 
                  y: Math.sin(i * 30) * 200,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full blur-[2px]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LaserAndBoomEffect = ({ progress }: { progress: any }) => {
  const laserHeight = useTransform(progress, [0.7, 0.85], ["0%", "100%"]);
  const laserOpacity = useTransform(progress, [0.7, 0.72, 0.85, 0.88], [0, 1, 1, 0]);
  
  const boomScale = useTransform(progress, [0.85, 0.9, 0.95], [0, 2, 0]);
  const boomOpacity = useTransform(progress, [0.85, 0.9, 0.95], [0, 1, 0]);
  
  return (
    <div className="relative w-full h-[200px] flex justify-center items-start mt-12 mb-[-100px]">
      <motion.div 
        style={{ 
          height: laserHeight, 
          opacity: laserOpacity,
          boxShadow: '0 0 20px #38bdf8, 0 0 40px #38bdf8' 
        }}
        className="w-1.5 bg-blue-400 absolute top-0 left-1/2 -translate-x-1/2 origin-top rounded-b-full z-10"
      />
      
      <motion.div
        style={{
          scale: boomScale,
          opacity: boomOpacity,
          top: "100%", 
        }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 origin-center z-0"
      >
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[30px] opacity-50" />
        <div className="absolute inset-4 bg-emerald-400 border border-white rounded-full blur-[10px] opacity-80" />
        <div className="absolute inset-8 bg-white rounded-full blur-[5px] shadow-[0_0_50px_#fff]" />
        
        {/* Sparks */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="absolute top-1/2 left-1/2 w-1 h-12 bg-white rounded-full origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 60}deg) translateY(-20px)`,
              boxShadow: '0 0 10px #fff'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};


const INTEGRATION_CATEGORIES = [
  {
    title: 'CRM & SALES INTELLIGENCE',
    services: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'Copper', 'Fireberry', 'Zendesk Sell', 'Dynamics 365', 'Insightly', 'Capsule', 'Freshsales', 'Bitrix24', 'Keap']
  },
  {
    title: 'OPERATIONS & PRODUCTIVITY',
    services: ['Monday.com', 'Asana', 'Trello', 'ClickUp', 'Jira', 'Basecamp', 'Notion', 'Wrike', 'Smartsheet', 'Teamwork', 'Airtable', 'Miro', 'Todoist']
  },
  {
    title: 'COMMUNICATION & OMNICHANNEL',
    services: ['WhatsApp', 'Slack', 'Microsoft Teams', 'Discord', 'Telegram', 'Zoom', 'Intercom', 'Twilio', 'Freshdesk', 'Gorgias', 'Drift', 'Viber', 'Line']
  },
  {
    title: 'ERP & FINANCIAL ECOSYSTEMS',
    services: ['SAP', 'Oracle NetSuite', 'Sage', 'QuickBooks Online', 'Xero', 'FreshBooks', 'Stripe', 'PayPal', 'Square', 'Wave', 'Expensify', 'Gusto', 'ADP']
  },
  {
    title: 'AUTOMATION & PROTOCOLS',
    services: ['n8n', 'Make.com', 'Zapier', 'IFTTT', 'Pabbly Connect', 'Workato', 'Tray.io', 'MuleSoft', 'Celigo', 'REST API', 'GraphQL', 'Webhooks', 'gRPC']
  },
  {
    title: 'ECOMMERCE & TRAVEL SYSTEMS',
    services: ['Amadeus', 'Sabre', 'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Mailchimp', 'Klaviyo', 'ActiveCampaign', 'SendGrid', 'Kinsta', 'Cloudflare']
  },
  {
    title: 'DATA & ANALYTICS PLATFORMS',
    services: ['Tableau', 'Power BI', 'Looker', 'Snowflake', 'Databricks', 'BigQuery', 'Redshift', 'Fivetran', 'dbt', 'Segment', 'Mixpanel', 'Amplitude']
  },
  {
    title: 'DEVELOPER TOOLS & REPOS',
    services: ['GitHub', 'GitLab', 'Bitbucket', 'Jira Software', 'Confluence', 'Sentry', 'Postman', 'Docker', 'Kubernetes', 'Terraform', 'Vault', 'CircleCI']
  }
];

const IntegrationsShowcase = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] uppercase font-mono tracking-widest mb-6">
                        <Share2 className="w-3 h-3" />
                        Network Interconnectivity
                    </div>
                    <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tighter text-white mb-6 uppercase">
                        Global <span className="text-blue-400">Integrations</span>
                    </h2>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                        Seamlessly connected to over <span className="text-white/80 font-medium">80+ enterprise services</span>, communication channels, and advanced automation webhooks.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {INTEGRATION_CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-[2rem] bg-black/40 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                            
                            <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-400/80 mb-10 pb-4 border-b border-white/5 flex items-center justify-between">
                                {cat.title}
                                <div className="w-1 h-1 rounded-full bg-blue-500" />
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {cat.services.map(service => (
                                    <motion.span 
                                        key={service}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-mono whitespace-nowrap text-white/50 group-hover:text-white/80 hover:bg-white/[0.08] transition-all hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-default"
                                    >
                                        {service}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Protocol Section */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.98 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="mt-20 p-1 md:p-16 rounded-[4rem] bg-gradient-to-br from-blue-500/10 via-black to-purple-500/10 border border-white/10 text-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center py-10 md:py-0">
                        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-8 border border-blue-500/30 group-hover:scale-110 transition-transform">
                            <Webhook className="w-10 h-10 text-blue-400" />
                        </div>
                        <h4 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">Advanced Protocol Orchestration</h4>
                        <p className="text-lg text-white/40 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                            Beyond standard integrations, we deploy custom <span className="text-blue-400 font-medium">n8n nodes</span>, <span className="text-purple-400 font-medium">Make scenarios</span>, and <span className="text-emerald-400 font-medium">Zapier automation flows</span> directly into your DeltaScope neural network for absolute operational freedom.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            {['Custom Webhooks', 'REST API', 'GraphQL', 'gRPC', 'WebSockets', 'TCP/IP Nodes'].map(t => (
                                <div key={t} className="flex items-center gap-3 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ServiceItem = memo(({ service, i }: { service: any, i: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      id={`service-${service.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
        }
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.02, 
        borderColor: "rgba(255, 255, 255, 0.4)", 
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(59, 130, 246, 0.2)",
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
      }}
      className={`relative p-8 md:p-12 lg:p-16 transition-all duration-700 cursor-pointer overflow-hidden ${
        (service.id === '11' || service.id === '12' || service.id === '13') ? 'bg-transparent border-transparent' : 'rounded-[2.5rem] lg:rounded-[3rem] bg-black/60 lg:bg-white/[0.03] border border-white/10 group'
      }`}
    >
      
      {/* Dynamic Glow following mouse or just central */}
      <motion.div 
        className={`absolute inset-0 z-0 bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),_rgba(59,130,246,0.1)_0%,_transparent_50%)] transition-opacity duration-500 ${(service.id === '11' || service.id === '12' || service.id === '13') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        animate={{ filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Abstract Background Image with Clipping */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.5rem] lg:rounded-[3rem]">
        <img loading="lazy" src={service.image} alt="" className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-all duration-1000 ${(service.id === '11' || service.id === '12' || service.id === '13') ? 'opacity-30 grayscale-0 scale-100' : 'opacity-10 group-hover:opacity-40 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100'}`} referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 lg:bg-transparent" />
      </div>

      {/* Scanning Line Effect */}
      <motion.div 
        className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent z-10 ${(service.id === '11' || service.id === '12' || service.id === '13') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        animate={{ y: ["0%", "1000%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className={`relative z-20 flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-8 lg:gap-16 max-w-6xl mx-auto`}>
        <div className={`flex-1 w-full flex flex-col items-center ${i % 2 === 0 ? 'lg:items-start text-center lg:text-left' : 'lg:items-end text-center lg:text-right'}`}>
          <div className={`flex flex-wrap justify-center ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} gap-2 mb-6 md:mb-8`}>
            {service.tags.map((t: string) => (
              <span key={t} className="px-4 py-1.5 rounded-full border border-white/10 text-[9px] md:text-[10px] uppercase font-mono tracking-wider text-white/50 bg-white/5 backdrop-blur-sm">{t}</span>
            ))}
          </div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[clamp(1.75rem,5vw,3rem)] md:text-[clamp(2.5rem,6vw,4rem)] font-display font-black tracking-tighter uppercase whitespace-normal break-words flex flex-wrap gap-x-[0.3em] justify-center ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
          >
            {service.name.split(" ").map((word: string, idx: number) => {
              const colors = ["text-blue-400", "text-emerald-400", "text-purple-400", "text-blue-500"];
              return (
                <span key={idx} className={`${colors[idx % 4]} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                  {word}
                </span>
              );
            })}
          </motion.h3>
          <p className="text-base md:text-lg lg:text-xl text-white/50 max-w-2xl leading-relaxed font-light drop-shadow-md mt-4 md:mt-6">{service.desc}</p>
          
          {service.coreValues && (
            <div className={`mt-6 flex flex-col gap-3 ${i % 2 === 0 ? 'lg:items-start items-center' : 'lg:items-end items-center'}`}>
              <div className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Core Values</div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {service.coreValues.map((val: string, vIdx: number) => (
                  <div key={vIdx} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm font-medium text-white/80">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 shrink-0 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 hover:border-white/50 transition-all relative bg-black/60 lg:bg-transparent backdrop-blur-md">
           <motion.div
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
             className="w-full h-full absolute inset-0 z-10"
           >
             <Service3DIcon type={service.modelVariant} isHovered={isHovered} name={service.name} desc={service.desc} />
           </motion.div>
           
           {/* Interaction Hint */}
           <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full">
                <span className="text-[8px] font-mono text-blue-400 uppercase tracking-[0.2em]">Click to Focus</span>
              </div>
           </div>

           <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 bg-[conic-gradient(from_0deg,_transparent,_black,_transparent)] transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-0'}`}
           />
        </div>
      </div>

      {/* Dashboard Mockups for New Cases */}
      {(service.id === '11' || service.id === '12' || service.id === '13') && (
        <div className="mt-16 md:mt-24 relative z-30 max-w-6xl mx-auto w-full">
           <div className="text-center mb-8">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">Live Dashboard Example</span>
           </div>
           <CaseDashboardMockups id={service.id} />
        </div>
      )}
    </motion.div>
  );
});
ServiceItem.displayName = 'ServiceItem';

const DashboardHeader = ({ progress }: { progress?: any }) => {
  const headerOpacity = useTransform(progress || 0, [0, 0.05, 0.9, 1], [1, 1, 1, 0]);
  
  // Title zooming while keeping it readable and centered on the screen
  const mainTitleScale = useTransform(progress || 0, [0, 0.5, 1], [1, 1.3, 1.5]);
  const mainTitleY = useTransform(progress || 0, [0, 0.5, 1], [0, 10, -50]); // Move slightly up to stay readable
  const mainTitleRotate = useTransform(progress || 0, [0, 0.5, 1], [0, 1, 2]); // Very subtle tilt

  const headerScale = useTransform(progress || 0, [0.85, 0.98], [1, 1.1]);
  const headerY = useTransform(progress || 0, [0.85, 0.98], [0, -100]);

  const words = [
    { text: "what", color: "text-blue-400" },
    { text: "you", color: "text-emerald-400" },
    { text: "see", color: "text-purple-400" },
    { text: "is", color: "text-blue-400" },
    { text: "what", color: "text-emerald-400" },
    { text: "you", color: "text-purple-400" },
    { text: "get", color: "text-blue-400" }
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ opacity: headerOpacity, scale: headerScale, y: headerY }} 
      className="text-center flex flex-col items-center max-w-7xl mx-auto min-h-[50vh] justify-center relative z-10 py-12 md:py-16 px-4"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 mb-12 backdrop-blur-2xl"
      >
        <Dna className="w-6 h-6 text-blue-400" />
        <span className="text-base font-mono uppercase tracking-[0.4em] text-blue-300">Live Architecture</span>
      </motion.div>

      <motion.h1 
        style={{ scale: mainTitleScale, y: mainTitleY, rotate: mainTitleRotate }}
        className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-display font-black leading-[0.85] tracking-tighter uppercase relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] outline-none flex flex-wrap justify-center gap-x-[3vw] lg:gap-x-8"
      >
        {words.map((word, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className={`inline-block ${word.color} hover:text-white transition-colors duration-500 cursor-default`}
            style={{ 
              WebkitTextStroke: '2px rgba(255,255,255,0.1)',
              filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))'
            }}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h1>
      
      {/* Background glow — was `w-full h-[600px]` rectangle whose
          hard edges (even with blur-[100px]) showed as a visible
          rectangular "frame" around the heading and clipped the
          fly-in animation per Katia 2026-05-27: «видно рамку для
          текста і коли вилітає текст він обрізається через цю
          рамку». Switched to a circular blob — same colour palette,
          no rectangular silhouette, text can fly in without any
          visible bounding region. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 blur-[120px] -z-10 pointer-events-none mix-blend-screen" />
    </motion.header>
  );
};

const ServicesHeader = ({ progress }: { progress?: any }) => {
  const headerOpacity = useTransform(progress || 0, [0, 0.05, 0.9, 1], [1, 1, 1, 0]);
  
  // Title zooming while keeping it readable and centered on the screen
  const mainTitleScale = useTransform(progress || 0, [0, 0.5, 1], [1, 1.3, 1.5]);
  const mainTitleY = useTransform(progress || 0, [0, 0.5, 1], [0, 10, -50]); // Move slightly up to stay readable
  const mainTitleRotate = useTransform(progress || 0, [0, 0.5, 1], [0, 1, 2]); // Very subtle tilt

  
  const headerScale = useTransform(progress || 0, [0.85, 0.98], [1, 1.1]);
  const headerY = useTransform(progress || 0, [0.85, 0.98], [0, -100]);

  const words = [
    { text: "We", color: "text-blue-400" },
    { text: "migrate", color: "text-emerald-400" },
    { text: "your", color: "text-purple-400" },
    { text: "workflows", color: "text-purple-400" },
    { text: "to", color: "text-blue-400" },
    { text: "a", color: "text-emerald-400" },
    { text: "new", color: "text-purple-400" },
    { text: "era.", color: "text-purple-400" }
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ opacity: headerOpacity, scale: headerScale, y: headerY }} 
      className="text-center flex flex-col items-center max-w-7xl mx-auto min-h-screen justify-center relative z-10 py-20 px-4"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 mb-12 backdrop-blur-2xl"
      >
        <Dna className="w-6 h-6 text-blue-400" />
        <span className="text-base font-mono uppercase tracking-[0.4em] text-blue-300">Intelligent Workflows</span>
      </motion.div>
      
      <motion.h1 
        style={{ scale: mainTitleScale, y: mainTitleY, rotate: mainTitleRotate }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-8xl lg:text-[11rem] leading-[0.9] md:leading-[0.8] font-display font-black tracking-tighter text-center max-w-7xl mx-auto italic justify-center flex flex-wrap drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] pb-12 overflow-visible"
      >
        {words.map((w, i) => (
          <span key={i} className={`${w.color} mr-[0.3em] last:mr-0`}>{w.text}</span>
        ))}
      </motion.h1>
      
      <motion.div 
        className="mt-20 md:mt-40 w-full flex items-center justify-center relative z-10 mb-8"
        style={{ y: useTransform(progress || 0, [0, 1], [0, 100]), opacity: useTransform(progress || 0, [0, 0.4], [1, 0]) }}
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl sm:text-4xl md:text-7xl font-display text-white italic tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] font-light"
        >
          That's how we do it:
        </motion.h2>
      </motion.div>

      {progress && <OrbitalTelescope progress={progress} />}
    </motion.header>
  );
};

const RealisticMotherSatellite = ({ className = "" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 120 120" className={`${className} fill-none`}>
      {/* Heavy Central Structure */}
      <motion.path 
        d="M50 40 L70 40 L75 45 L75 75 L70 80 L50 80 L45 75 L45 45 Z" 
        className="fill-zinc-800 stroke-zinc-600" 
        strokeWidth="1"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Internal Reactor Core */}
      <motion.circle 
        cx="60" cy="60" r="8" 
        className="fill-blue-500/20 stroke-blue-400" 
        strokeWidth="0.5"
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Primary Solar Arrays (Large and Detailed) */}
      {[0, 180].map((angle) => (
        <g key={`array-h-${angle}`} transform={`rotate(${angle} 60 60)`}>
          <motion.g
            animate={{ rotateX: [0, 15, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <rect x="75" y="45" width="40" height="30" rx="1" className="fill-blue-900/60 stroke-blue-500" strokeWidth="0.8" />
            <path d="M75 50h40M75 55h40M75 60h40M75 65h40M75 70h40M85 45v30M95 45v30M105 45v30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" />
            <rect x="75" y="58" width="5" height="4" className="fill-zinc-700" />
          </motion.g>
        </g>
      ))}

      {/* Secondary Vertical Arrays */}
      {[90, 270].map((angle) => (
        <g key={`array-v-${angle}`} transform={`rotate(${angle} 60 60)`}>
          <motion.g
            animate={{ rotateY: [0, 20, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <rect x="75" y="52" width="25" height="16" rx="1" className="fill-emerald-900/40 stroke-emerald-500" strokeWidth="0.6" />
            <path d="M75 56h25M75 60h25M75 64h25M83 52v16M91 52v16" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
          </motion.g>
        </g>
      ))}

      {/* High-Gain Antenna Dishes */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: '60px 60px' }}
      >
        <path d="M55 35 Q60 25 65 35" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="60" cy="24" r="2" className="fill-blue-400 shadow-[0_0_10px_#60a5fa]" />
        <path d="M60 24 L60 30" stroke="#60a5fa" strokeWidth="0.5" />
      </motion.g>

      {/* Navigation Sensors (Flashing) */}
      <motion.circle cx="52" cy="48" r="1.2" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="fill-red-500" />
      <motion.circle cx="68" cy="72" r="1.2" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="fill-amber-500" />
    </svg>
  );
};





const CompanyOrbitalAnimation = ({ progress }: { progress: any }) => {
  // Add heavy inertia to the scroll progress for this specific section
  const smoothProgress = useSpring(progress as any, {
    stiffness: 40,
    damping: 20,
    mass: 2
  });

  // Smoother non-linear flight path with a more pronounced arc
  const x = useTransform(smoothProgress as any, [0, 0.5, 1], [-450, 0, 450]);
  const y = useTransform(smoothProgress as any, [0, 0.5, 1], [60, -40, 60]); 
  
  // Refined rotation for a more "drifting" space feel
  const rotateX = useTransform(smoothProgress as any, [0, 1], [20, -20]);
  const rotateY = useTransform(smoothProgress as any, [0, 1], [-30, 30]);
  const rotateZ = useTransform(smoothProgress as any, [0, 1], [-15, 15]);
  
  const scale = useTransform(smoothProgress as any, [0, 0.5, 1], [0.75, 1.25, 0.75]);
  
  // More vibrant and responsive glow effect
  const glow = useTransform(
    smoothProgress as any,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "drop-shadow(0 0 20px rgba(59,130,246,0.2))",
      "drop-shadow(0 0 50px rgba(6,182,212,0.4))",
      "drop-shadow(0 0 90px rgba(139,92,246,0.7))",
      "drop-shadow(0 0 50px rgba(6,182,212,0.4))",
      "drop-shadow(0 0 20px rgba(59,130,246,0.2))"
    ]
  );

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-visible select-none py-10 md:py-20">
      {/* Dynamic Back-Glow for depth - sync with smoothProgress */}
      <motion.div
        className="absolute z-10 w-64 h-64 rounded-full blur-[100px]"
        style={{
          x,
          y,
          background: useTransform(
            smoothProgress as any,
            [0, 0.5, 1],
            [
              "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)"
            ]
          ) as any,
          scale: useTransform(smoothProgress as any, [0, 0.5, 1], [0.8, 2.5, 0.8]) as any
        } as any}
      />

      {/* Central Mother Satellite */}
      <motion.div 
        className="absolute z-20 w-32 h-32 md:w-44 md:h-44 select-none"
        style={{
          x,
          y,
          rotateX,
          rotateY,
          rotateZ,
          scale,
          filter: glow as any,
          perspective: 1200
        } as any}
      >
        <RealisticMotherSatellite className="w-full h-full" />
        
        {/* Internal pulsing indicator lights - breathing rhythm */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2">
          <motion.div 
            className="absolute rounded-full bg-blue-400 blur-[3px]"
            animate={{ 
              scale: [1, 3, 1],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '6px', height: '6px' }}
          />
          <motion.div 
            className="absolute rounded-full bg-purple-400 blur-[2px]"
            animate={{ 
              scale: [1, 2, 1],
              opacity: [0, 0.6, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ width: '4px', height: '4px', left: '10px' }}
          />
        </div>
      </motion.div>
    </div>
  );
};






// Removed SECTOR_DATA as it was duplicated with 3D industry models


const SpaceCakeChart = () => {
  const data = [
    { name: 'Automation', value: 90, color: '#60a5fa' },
    { name: 'Remaining', value: 10, color: 'rgba(255,255,255,0.05)' }
  ];

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Decorative Outer Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-blue-500/10"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dotted border-purple-500/10"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <PieChart width={256} height={256}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            content={({ active, payload }: any) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded text-[10px] font-mono text-blue-400">
                    {payload[0].name}: {payload[0].value}%
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </div>

      {/* Center Label */}
      <div className="relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-display font-black text-white leading-none"
        >
          90%
        </motion.div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 mt-2">Saved</div>
      </div>

      {/* Orbiting Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div 
            className="absolute h-1.5 w-1.5 rounded-full bg-blue-400 blur-[1px]"
            style={{
              top: '50%',
              left: '92%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};


// Removed helpers that use SECTOR_DATA labels


// Removed SectorCard component


const DigitalCosmicIcon = ({ icon: Icon, color = "#3b82f6" }: { icon: any, color?: string }) => {
  return (
    <div className="relative group/icon inline-block">
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl blur-xl" 
        style={{ backgroundColor: color }}
      />
      <div className="relative w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden ring-1 ring-white/5 shadow-2xl">
        <motion.div 
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-px bg-blue-300/30 blur-[1px] z-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <Icon className="w-7 h-7 z-10 transition-transform duration-500 group-hover/icon:scale-110" style={{ color }} />
        
        {/* Digital corners */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/30" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/30" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/30" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/30" />
      </div>
    </div>
  );
};

const FloatingWord = ({ word, index, progress, isFirstHalf }: { word: string, index: number, progress: any, isFirstHalf: boolean }) => {
  const delayFactor = isFirstHalf ? index * 0.05 : (index + 10) * 0.05;
  
  return (
    <motion.span 
      initial={{ opacity: 0, y: 60, rotateZ: 5, filter: "blur(15px)" }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: delayFactor, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        display: "inline-block",
        backfaceVisibility: "hidden"
      }}
      className={isFirstHalf ? "mr-[0.25em]" : "ml-[0.25em]"}
    >
      {word}
    </motion.span>
  );
};


// Sector components removed as they were redundant with 3D industry models




const CosmicBackground = ({ progress }: { progress: any }) => {
  const cosmicData = React.useMemo(() => ({
    galaxies: [...Array(3)].map(() => ({
      scale: 0.5 + Math.random() * 1.5,
      rotate: Math.random() * 360,
      opacity: 0.1 + Math.random() * 0.3,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%'
    })),
    layer3: [...Array(200)].map(() => {
      const colors = ['rgba(30, 58, 138, 0.6)', 'rgba(76, 29, 149, 0.6)', 'rgba(236, 72, 153, 0.4)', 'rgba(252, 211, 77, 0.3)', 'rgba(59, 130, 246, 0.5)'];
      return {
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    }),
    layer2: [...Array(120)].map(() => ({
      width: Math.random() * 1.2 + 0.4 + 'px',
      height: Math.random() * 1.2 + 0.4 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.4 + 0.1
    })),
    layer1: [...Array(70)].map(() => ({
      width: Math.random() * 1.8 + 0.8 + 'px',
      height: Math.random() * 1.8 + 0.8 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      opacity: Math.random() * 0.6 + 0.2
    })),
    dyn1: [...Array(100)].map(() => ({
      width: Math.random() * 1.2 + 0.4 + 'px',
      height: Math.random() * 1.2 + 0.4 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%'
    })),
    dyn2: [...Array(80)].map(() => ({
      width: Math.random() * 1.8 + 0.8 + 'px',
      height: Math.random() * 1.8 + 0.8 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%'
    })),
    dyn3: [...Array(40)].map(() => ({
      width: Math.random() * 2.5 + 1 + 'px',
      height: Math.random() * 2.5 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%'
    }))
  }), []);

  // Use a weighted spring for all celestial movements
  const smoothProgress = useSpring(progress as any, {
    stiffness: 30,
    damping: 20,
    mass: 1.2
  });

  // Parallax layers for different sets of stars - refined speeds and added horizontal drift
  const layer1Y = useTransform(smoothProgress as any, [0, 1], ["0%", "-65%"]); 
  const layer1X = useTransform(smoothProgress as any, [0, 1], ["0%", "5%"]);
  
  const layer2Y = useTransform(smoothProgress as any, [0, 1], ["0%", "-35%"]); 
  const layer2X = useTransform(smoothProgress as any, [0, 1], ["0%", "-3%"]);
  
  const layer3Y = useTransform(smoothProgress as any, [0, 1], ["0%", "-20%"]); 
  const layer3X = useTransform(smoothProgress as any, [0, 1], ["0%", "2.5%"]);
  
  const layer4Y = useTransform(smoothProgress as any, [0, 1], ["0%", "-8%"]);
  const layer4X = useTransform(smoothProgress as any, [0, 1], ["0%", "-1.5%"]);
  
  // Subtle rotation parallax for depth perception
  const layer1Rotate = useTransform(smoothProgress as any, [0, 1], [0, 12]);
  const layer2Rotate = useTransform(smoothProgress as any, [0, 1], [0, -6]);

  // Dynamic density based on scroll progress
  const dynamicDensityOpacity1 = useTransform(smoothProgress as any, [0, 0.5, 1], [0, 0.4, 1]);
  const dynamicDensityOpacity2 = useTransform(smoothProgress as any, [0.2, 0.7, 1], [0, 0.5, 1]);
  const dynamicDensityOpacity3 = useTransform(smoothProgress as any, [0.5, 1], [0, 1]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#00000a]" />

      {/* Very Distant Nebula/Glow Layer (Static/Very Slow) */}
      <motion.div style={{ y: layer4Y, x: layer4X }} className="absolute inset-0 h-[110%] opacity-25">
         <div className="absolute top-[20%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/15 blur-[150px]" />
         <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-purple-900/15 blur-[150px]" />
      </motion.div>

      {/* Distant Galaxies - Using Layer 3 for slow movement */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`galaxy-${i}`}
          style={{ 
            y: layer3Y,
            x: layer3X,
            rotate: i * 45,
            opacity: 0.12,
            top: `${20 + i * 30}%`,
            left: `${10 + i * 40}%`
          }}
          className="absolute w-[35vw] h-[18vw] blur-[50px] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 shadow-[0_0_100px_rgba(139,92,246,0.1)]"
        />
      ))}

      {/* Star Layer 3 - Distant/Slow */}
      <motion.div style={{ y: layer3Y, x: layer3X }} className="absolute inset-0 h-[150%]">
        {cosmicData.layer3.map((s, i) => (
          <div 
            key={i} 
            className="absolute rounded-full"
            style={{
              width: '1px',
              height: '1px',
              top: s.top,
              left: s.left,
              backgroundColor: s.color,
              boxShadow: `0 0 4px ${s.color}`
            }}
          />
        ))}
      </motion.div>

      {/* Star Layer 2 - Medium */}
      <motion.div style={{ y: layer2Y, x: layer2X, rotate: layer2Rotate }} className="absolute inset-0 h-[150%]">
        {cosmicData.layer2.map((s, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-blue-200/40"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
              opacity: s.opacity
            }}
          />
        ))}
      </motion.div>

      {/* Star Layer 1 - Close/Fast */}
      <motion.div style={{ y: layer1Y, x: layer1X, rotate: layer1Rotate }} className="absolute inset-0 h-[180%]">
        {cosmicData.layer1.map((s, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white shadow-[0_0_3px_rgba(255,255,255,0.4)]"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
              opacity: s.opacity
            }}
          />
        ))}
      </motion.div>

      {/* Dynamic Star Density Layer 1 - Fades in on scroll */}
      <motion.div style={{ y: layer2Y, x: layer2X, opacity: dynamicDensityOpacity1 }} className="absolute inset-0 h-[150%]">
        {cosmicData.dyn1.map((s, i) => (
          <div 
            key={`dyn1-${i}`} 
            className="absolute rounded-full bg-blue-100/60"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
            }}
          />
        ))}
      </motion.div>

      {/* Dynamic Star Density Layer 2 - Fades in later */}
      <motion.div style={{ y: layer1Y, x: layer1X, opacity: dynamicDensityOpacity2 }} className="absolute inset-0 h-[180%]">
        {cosmicData.dyn2.map((s, i) => (
          <div 
            key={`dyn2-${i}`} 
            className="absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)]"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
            }}
          />
        ))}
      </motion.div>

      {/* Dynamic Star Density Layer 3 - Shoots of intense stars near bottom */}
      <motion.div style={{ y: layer1Y, x: layer1X, opacity: dynamicDensityOpacity3 }} className="absolute inset-0 h-[180%]">
        {cosmicData.dyn3.map((s, i) => (
          <div 
            key={`dyn3-${i}`} 
            className="absolute rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
            }}
          />
        ))}
      </motion.div>

      {/* Neural Planet - Industrial Focus */}
      <NeuralPlanet progress={progress} />
    </div>
  );
};

const NeuralPlanet = ({ progress }: { progress: any }) => {
  // Add weight and smoothness to the scroll input
  const smoothProgress = useSpring(progress as any, {
    stiffness: 40,
    damping: 15,
    mass: 1.5
  });

  const rotation = useTransform(smoothProgress as any, [0, 1], [0, 360 * 1.5]);
  const scale = useTransform(smoothProgress as any, [0, 0.4, 0.7, 1], [0.8, 1.25, 0.95, 0.6]);
  const opacity = useTransform(smoothProgress as any, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress as any, [0, 1], ["45%", "-45%"]);
  
  // Subtle wobble/distortion based on progress
  const skewX = useTransform(smoothProgress as any, [0, 0.5, 1], [0, 5, 0]);
  const glowIntensity = useTransform(smoothProgress as any, [0, 0.5, 1], [0.5, 1.5, 0.5]);
  // Dynamic surface node positioning based on progress
  const nodeOffset = useTransform(smoothProgress as any, [0, 0.5, 1], [38, 45, 38]);

  return (
    <motion.div 
      style={{ 
        scale, 
        opacity, 
        y, 
        rotateZ: rotation,
        skewX
      }}
      className="absolute top-1/2 left-1/2 md:left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
    >

      {/* Event Horizon / Glow Background */}
      <motion.div 
        style={{ scale: glowIntensity, opacity: glowIntensity }}
        className="absolute inset-[-25%] rounded-full bg-blue-500/10 blur-[80px]" 
      />
      
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/25 to-purple-600/15 border border-white/10 backdrop-blur-3xl shadow-[0_0_50px_rgba(59,130,246,0.2)]" />
      <div className="absolute inset-[10%] rounded-full border border-blue-400/20 group-hover:border-blue-400/40 transition-colors animate-spin-slow" />
      <div className="absolute inset-[25%] rounded-full border border-purple-500/20 animate-reverse-spin-slow" />
      
      {/* Planetary Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[15%] rounded-[100%] border-2 border-white/5 rotate-[25deg] shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[15%] rounded-[100%] border-2 border-blue-500/10 rotate-[25deg] blur-sm" />

      {/* Surface Detail Nodes */}
      {[...Array(8)].map((_, i) => {
        const angle = i * (Math.PI / 4);
        const x = useTransform(nodeOffset, (v: number) => `calc(50% + ${v * Math.cos(angle)}%)`);
        const y = useTransform(nodeOffset, (v: number) => `calc(50% + ${v * Math.sin(angle)}%)`);
        
        return (
          <motion.div 
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full glow-blue"
            style={{
              top: y as any,
              left: x as any,
              boxShadow: '0 0 15px #3b82f6',
              opacity: useTransform(glowIntensity, [0.5, 1.5], [0.3, 1])
            }}
          />
        );
      })}
    </motion.div>
  );
};



const ScrollEmitter = ({ progress, count = 20, color = "rgba(59, 130, 246, 0.5)", className = "" }: { progress: any, count?: number, color?: string, className?: string }) => {
  const particles = React.useMemo(() => {
    return [...Array(count)].map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 100 + Math.random() * 200;
      const xDir = Math.cos(angle) * radius;
      const yDir = Math.sin(angle) * radius;
      return { xDir, yDir };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {particles.map((p, i) => {
        // Use different ranges of progress to trigger different particle behavior
        const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0, 0.8, 0.8, 0]);
        const x = useTransform(progress, [0, 1], [0, p.xDir]);
        const y = useTransform(progress, [0, 1], [0, p.yDir]);
        const scale = useTransform(progress, [0, 0.5, 1], [0, 1.5, 0]);
        
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-[2px] w-[2px] rounded-full"
            style={{
              x,
              y,
              opacity,
              scale,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`,
              translateX: "-50%",
              translateY: "-50%"
            }}
          />
        );
      })}
    </div>
  );
};

const TypewriterChar = ({ char, progress, start, end }: { char: string, progress: any, start: number, end: number }) => {
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const y = useTransform(progress, [start, start + 0.05], [10, 0]);
  const blur = useTransform(progress, [start, start + 0.05], [10, 0]);
  const color = useTransform(progress, [start, start + 0.3], ["#60a5fa", "#c084fc"]); // blue-400 to purple-400
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span style={{ opacity, y, color, filter }} className="inline-block relative will-change-transform">
      {char}
    </motion.span>
  );
};

const TypewriterScrollTitle = ({ text, className, progress }: { text: string, className?: string, progress: any }) => {
  const words = useMemo(() => text.split(" "), [text]);
  const totalLetters = text.replace(/ /g, "").length;

  let currentLetterIndex = 0;

  return (
    <h1 aria-label={text} className={`${className} flex flex-wrap justify-center overflow-visible`}>
      {words.map((word, wIdx) => {
        const letters = word.split("");
        const wordSpan = (
          <span key={wIdx} className="inline-block mr-[0.25em] whitespace-nowrap">
            {letters.map((char, cIdx) => {
              const start = currentLetterIndex / totalLetters;
              const end = (currentLetterIndex + 1) / totalLetters;
              currentLetterIndex++;
              return (
                <TypewriterChar 
                  key={cIdx} 
                  char={char} 
                  progress={progress} 
                  start={start} 
                  end={end} 
                />
              );
            })}
          </span>
        );
        return wordSpan;
      })}
    </h1>
  );
};

const VisionHeader = ({ progress }: { progress?: any }) => {
  // Smoother entrance and more weighted title reveal - matched to WritingTitle physics
  // Added a disappearance phase (exit) mapped to later scroll stages
  const headerOpacity = useTransform(progress, [0, 0.04, 0.45, 0.55], [0, 1, 1, 0]);
  const headerY = useTransform(progress, [0.4, 0.6], [0, -100]); // Drift up on exit
  const headerScale = useTransform(progress, [0.4, 0.6], [1, 1.1]); // Scale up slightly on exit

  const titleProgressRaw = useTransform(progress, [0.05, 0.22], [0, 1], { clamp: true });
  const titleProgress = useSpring(titleProgressRaw, {
    stiffness: 90,
    damping: 25,
    mass: 1.2,
    restDelta: 0.001
  });
  
  const subProgress = useTransform(progress, [0.18, 0.32], [0, 1], { clamp: true });
  const subY = useTransform(subProgress, [0, 1], [30, 0]);
  const subScale = useTransform(subProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div style={{ opacity: headerOpacity, y: headerY, scale: headerScale }} className="flex flex-col items-center justify-center min-h-[30vh] md:min-h-[40vh] relative z-10 translate-y-10 md:translate-y-20">
      {/* Scroll-triggered particles emanating from Philosophy block */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20">
        <ScrollEmitter progress={progress} count={15} color="rgba(59, 130, 246, 0.3)" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        className="mb-6 md:mb-8 px-4 md:px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-10"
      >
        Core Philosophy
      </motion.div>

      <div className="relative">
        {/* Particles emanating from Title */}
        <ScrollEmitter progress={titleProgress} count={30} color="rgba(255, 255, 255, 0.2)" className="scale-150" />
        
        <TypewriterScrollTitle 
          text="Targeting the Singular Objective"
          className="text-[12vw] sm:text-[10vw] md:text-8xl lg:text-[9rem] font-display font-black tracking-tighter leading-[0.9] md:leading-[0.8] text-center max-w-6xl mx-auto italic justify-center text-white px-2 relative z-10"
          progress={titleProgress}
        />
      </div>

      <motion.div 
        style={{ opacity: subProgress, y: subY, scale: subScale }}
        className="mt-8 md:mt-12 max-w-3xl mx-auto text-center px-4"
      >
        <p className="text-lg md:text-2xl text-white/50 font-light italic leading-relaxed">
          Humans and agents working together as one team
        </p>
      </motion.div>
    </motion.div>
  );
};

const VisionPageComet = ({ scrollProgress }: { scrollProgress: any }) => {
  // Use a smoother spring for the scroll progress to give it weight
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 35,
    damping: 15,
    mass: 1.2,
    restDelta: 0.001
  });

  // Animation mapping: Wide arc that spirals into the distance (Z-axis simulation)
  const x = useTransform(smoothProgress as any, [0, 0.2, 0.4, 0.6, 0.8, 1], ["10%", "85%", "40%", "60%", "30%", "50%"]); 
  const y = useTransform(smoothProgress as any, [0, 0.2, 0.4, 0.6, 0.8, 1], ["20%", "40%", "70%", "30%", "20%", "50%"]); 
  const scale = useTransform(smoothProgress as any, [0, 0.2, 0.5, 0.8, 1], [1.2, 0.8, 0.4, 0.2, 0.02]); 
  const opacity = useTransform(smoothProgress as any, [0, 0.02, 0.9, 1], [0, 1, 0.8, 0]);
  const blur = useTransform(smoothProgress as any, [0, 0.6, 1], ["0px", "4px", "20px"]);
  
  // Dynamic rotation to face the direction of flight + slight wobble
  const rotation = useTransform(
    smoothProgress as any, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [5, 45, 160, 220, 310, 360]
  );
  
  const blurEffect = useTransform(blur as any, b => `blur(${b})`);

  const particles = React.useMemo(() => {
    return [...Array(32)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${(Math.random() - 0.5) * 40}px`,
      opacity: Math.random() * 0.8,
      filter: `blur(${Math.random() * 2}px)`,
      xOffset: -60 - Math.random() * 100,
      yStart: (Math.random() - 0.5) * 20,
      yEnd: (Math.random() - 0.5) * 40,
      rotate: Math.random() * 360,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 3
    }));
  }, []);

  return (
    <motion.div
      style={{ 
        position: 'absolute',
        top: y,
        left: x,
        scale,
        opacity,
        filter: blurEffect,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        zIndex: 5,
        perspective: "1000px"
      } as any}
      className="pointer-events-none select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Multi-layered Comet Core */}
        <div className="relative">
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
             transition={{ duration: 0.5, repeat: Infinity }}
             className="w-8 h-8 bg-white rounded-full blur-[2px] z-20 relative" 
          />
          <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full blur-[10px] scale-150 opacity-60" />
          <div className="absolute inset-0 w-8 h-8 bg-purple-500 rounded-full blur-[20px] scale-[2.5] opacity-40" />
        </div>
        
        {/* Tail - Realistic Gradient + Kinetic Energy */}
        <div className="absolute left-0 w-[800px] h-[4px] origin-left -translate-x-[99%]">
          {/* Intense Ion Tail (Blue/White) */}
          <div className="w-full h-full bg-gradient-to-l from-white via-blue-500/50 to-transparent opacity-90 blur-[2px]" />
          
          {/* Dust Tail (Wider, warmer/translucent) */}
          <div className="absolute inset-0 w-full h-24 -top-12 bg-gradient-to-l from-blue-300/10 via-purple-500/5 to-transparent blur-[40px] opacity-40 skew-x-[15deg]" />
          
          {/* Enhanced Particle System */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[2px] bg-white rounded-full"
              style={{
                left: p.left,
                top: p.top,
                opacity: p.opacity,
                filter: p.filter
              }}
              animate={{ 
                x: [0, p.xOffset], 
                y: [p.yStart, p.yEnd],
                opacity: [0, 1, 0],
                scale: [1, 0.3, 0],
                rotate: [0, p.rotate]
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay,
                ease: "circOut"
              }}
            />
          ))}
        </div>

        {/* Cinematic Flare Accents */}
        <div className="absolute w-[400px] h-[1px] bg-blue-300/30 blur-[20px] rotate-12 scale-x-150" />
        <div className="absolute w-[1px] h-[100px] bg-white/40 blur-[10px]" />
      </div>
    </motion.div>
  );
};

const AboutHeader = () => {
  const containerRef = useRef(null);
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  const words = "WE ALREADY SOLVED 90% OF OUR CASES AUTOMATICALLY".split(" ");

  return (
    <div ref={containerRef} className="mb-40 md:mb-60 text-center flex flex-col items-center max-w-7xl mx-auto relative z-10 pt-20">
      <div className="w-full h-[15vh] mb-12 relative flex items-center justify-center">
        {/* Animated Vertical Connector */}
        <div className="w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent relative">
           <motion.div 
             style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
             className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[2px]"
           />
        </div>
      </div>
      
      {/* Micro Label for context grounding */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-8 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-white/40"
      >
        <span className="w-8 h-px bg-white/20" />
        <span>Case study archive // 2019-2024</span>
        <span className="w-8 h-px bg-white/20" />
      </motion.div>
      
      <div className="font-display font-medium tracking-tighter mb-10 leading-[1.05] w-full flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-4">
        {words.map((word, i) => {
          
          if (word === "90%") {
             return (
               <motion.span 
                 key={i} 
                 initial={{ y: -200, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1, delay: i * 1, type: "spring", bounce: 0.4 }}
                 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic px-2 block w-full my-4 text-emerald-400"
               >
                 {word}
               </motion.span>
             );
          } else if (word === "AUTOMATICALLY" || word === "AUTOMATICLY") {
             return (
               <motion.span 
                 key={i} 
                 initial={{ scale: 0.5, y: -200, opacity: 0, filter: "blur(10px)" }}
                 whileInView={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 1.5, delay: i * 1, type: "spring", bounce: 0.6 }}
                 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic px-2 block w-full my-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500 tracking-normal sm:tracking-widest relative"
               >
                 {word}
                 <motion.div
                   className="absolute inset-0 bg-blue-500/20 blur-xl z-[-1]"
                   animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 />
               </motion.span>
             );
          }

          return (
            <motion.span 
              key={i} 
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: i * 0.1, type: "spring", bounce: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl text-white/40 font-light"
            >
              {word}
            </motion.span>
          );
        })}
      </div>

      <div className="mt-8 mb-16 w-full text-center">
        <ScrollRevealTitle 
          text="NOW ITS YOUR TURN" 
          progress={scrollYProgress} 
          className="text-4xl md:text-6xl lg:text-[7rem] leading-none uppercase font-black tracking-tighter text-blue-500" 
          lightning={true} 
        />
      </div>
      
      <div className="text-lg md:text-2xl text-white/60 leading-[1.2] max-w-4xl mx-auto px-4 mt-16 font-medium relative uppercase tracking-tighter text-center">
        <p>In five years, we've gone from code to consciousness. We don't just automate tasks; we elevate the biological experience through surgical-grade AI orchestration. Your teams don't work for us; we work for them, personally.</p>
      </div>
    </div>
  );
};

const LabHeader = ({ progress }: { progress?: any }) => (
  <div className="text-center mb-16">
    <span className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-400 mb-4 block">AI Automation Synthesis</span>
    <ScrollRevealTitle 
      text="Identity Lab"
      progress={progress}
      className="text-3xl font-display font-bold tracking-tighter justify-center text-center italic"
      lightning={true}
    />
  </div>
);

// Error Boundary Component
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Uncaught error captured by ErrorBoundary", { 
      error: error.message, 
      stack: error.stack, 
      componentStack: errorInfo.componentStack 
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000005] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 border border-red-500/30 bg-red-500/5 rounded-[2rem] backdrop-blur-xl">
            <h2 className="text-2xl font-display font-bold text-red-400 mb-4 uppercase tracking-tighter italic">System Failure</h2>
            <div className="mb-8 overflow-hidden">
              <p className="text-white/40 font-mono text-[10px] mb-2 uppercase tracking-widest">A critical runtime anomaly was detected:</p>
              <div className="p-4 bg-black/40 rounded-xl border border-red-500/20 text-red-300/80 font-mono text-[10px] text-left break-words">
                {this.state.error?.message || "Unknown Core Exception"}
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-xs uppercase tracking-widest hover:bg-red-600/40 transition-all rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Reboot Matrix
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const FeatureObjectCard = ({ feature, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const brandColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"]; // Blue, emerald, purple, amber
  const color = brandColors[index % brandColors.length];

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { type: "spring", stiffness: 100, damping: 20 } 
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-8 md:p-10 aspect-square flex flex-col items-center justify-center text-center bg-black/60 backdrop-blur-[40px] rounded-[2.5rem] shadow-[0_0_60px_rgba(59,130,246,0.10)] hover:shadow-[0_0_100px_rgba(59,130,246,0.20)] transition-all duration-500 relative overflow-hidden"
    >
      <div className="w-32 h-32 flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110">
         <SpaceTech2D type={feature.type} color={color} />
      </div>
      <WritingTitle 
        text={feature.title}
        className="text-2xl font-display font-bold mb-4 uppercase tracking-tighter"
      />
      <p className="text-white/40 leading-relaxed text-sm px-4">{feature.desc}</p>
    </motion.div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ErrorBoundary>
        {/* FpsMeter intentionally disabled for client-facing build.
            Toggle on for performance investigation in dev. */}
        {/* <FpsMeter /> */}
        <AppContent />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

const LazySectorModel = ({ model: Model, color, icon: Icon }: { model: any, color: string, icon: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "200px" });

  return (
    <div ref={ref} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      {isInView ? (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[50px] rounded-full opacity-20 pointer-events-none" style={{ backgroundColor: color }} />
          <div className="w-full h-full pb-8">
            <Canvas performance={{ min: 0.5 }} dpr={1} camera={{ position: [0, 0, 5], fov: 50 }} gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} color={color} intensity={2} />
              {Model ? <Model color={color} /> : null}
            </Canvas>
          </div>
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[50px] rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: color }} />
      )}
    </div>
  );
};

const SupernovaElement = () => (
  <div className="relative w-full min-h-[40vh] flex items-center justify-center my-10 overflow-hidden z-20">
    <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
      {/* Accretion Disk */}
      <motion.div 
        className="absolute w-64 md:w-96 h-16 md:h-24 rounded-full border-4 border-[#c054ff] blur-[2px]" 
        animate={{ rotateX: [70, 70], rotateZ: [0, 360] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
      />
      <motion.div 
        className="absolute w-64 md:w-96 h-16 md:h-24 rounded-full border-2 border-white/50 blur-[1px]" 
        animate={{ rotateX: [70, 70], rotateZ: [0, -360] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
      />
      {/* Event Horizon */}
      <div className="absolute w-24 md:w-32 h-24 md:h-32 bg-black rounded-full shadow-[0_0_40px_#c054ff]" />
    </div>
  </div>
);

const VisionSection = ({ smoothProgress, scrollYProgress }: { smoothProgress: any, scrollYProgress: any }) => {
  const [selectedSector, setSelectedSector] = useState<any>(null);

  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === 'vision') {
        setSelectedSector(null);
      }
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('nav_tab_click', handleNavClick);
      return () => window.removeEventListener('nav_tab_click', handleNavClick);
    }
  }, []);

  const handleSelectSector = (sector: any) => {
    setSelectedSector(sector);
  };

  const visionRef = useRef(null);
  const { scrollYProgress: localVisionProgress } = useScroll({
    target: visionRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const visionHeroY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const visionCardScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const visionCardRotate = useTransform(smoothProgress, [0, 0.5], [0, -4]);
  const visionCardOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [0.8, 1, 1]);
  const visionCardSkew = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const unleashingScale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const visionBgColor = useTransform(smoothProgress, [0, 0.5], ["rgba(255,255,255,0.02)", "rgba(59,130,246,0.05)"]);

  return (
    <motion.main
      key="vision"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 md:pt-48 pb-10 overflow-x-hidden relative bg-[#00000a] isolate"
    >
      
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        <motion.div 
          ref={visionRef}
          style={{
            y: visionHeroY,
            scale: visionCardScale,
            rotateZ: visionCardRotate,
            opacity: visionCardOpacity,
            skewX: visionCardSkew
          }}
          className="relative pt-4 pb-24 will-change-[transform,opacity]"
        >
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto py-32 border border-white/10 bg-white/[0.02] rounded-[4rem] backdrop-blur-xl relative z-10 overflow-visible group"
          >
            <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/20 opacity-50 group-hover:opacity-80 transition-opacity" aria-hidden="true" />

            <div className="relative z-10 px-6 md:px-20 overflow-visible">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                className="mb-12 inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <Sparkles className="w-5 h-5 text-blue-300 inline mr-2" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Core Philosophy</span>
              </motion.div>

              <div className="text-3xl md:text-6xl font-display font-light text-white italic leading-[1.1] tracking-tight flex flex-wrap justify-center overflow-visible">
                {"\"The future isn't about replacing humans—it's about ".split(" ").map((word, i) => (
                  <FloatingWord 
                    key={`first-${i}`} 
                    word={word} 
                    index={i} 
                    progress={localVisionProgress} 
                    isFirstHalf={true} 
                  />
                ))}
                <motion.span 
                  style={{ 
                    scale: unleashingScale
                  }}
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }} 
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.8, duration: 1.2, type: "spring", bounce: 0.4 }}
                  className="text-blue-400 font-normal drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] whitespace-normal px-2 relative z-20 will-change-transform"
                >
                  unleashing
                </motion.span>
                {" them by automating the 90% of work that doesn't require human creativity.\"".split(" ").map((word, i) => (
                  <FloatingWord 
                    key={`second-${i}`} 
                    word={word} 
                    index={i} 
                    progress={localVisionProgress} 
                    isFirstHalf={false} 
                  />
                ))}
              </div>
              
              <div className="mt-16 flex justify-center items-center gap-6 text-white/20">
                 <motion.div 
                  animate={{ width: [10, 80, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent to-white/40" 
                 />
                 <Globe className="w-6 h-6 text-blue-400/50 animate-[spin_8s_linear_infinite]" />
                 <motion.div 
                  animate={{ width: [10, 80, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="h-[1px] bg-gradient-to-l from-transparent to-white/40" 
                 />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-16 items-center text-center lg:text-left mx-auto max-w-4xl"
        >
          <div className="space-y-8 flex flex-col items-center">
            <div className="text-5xl lg:text-6xl font-display font-bold tracking-tight text-center [backface-visibility:hidden]">
              {"Fast Results, Zero Mistakes.".split(" ").map((word, i) => {
                const colors = ["text-blue-400", "text-purple-400", "text-emerald-400", "text-blue-500"];
                return (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className={`${colors[i % colors.length]} inline-block mr-[0.25em] relative z-20 [backface-visibility:hidden] [transform:translateZ(0)] will-change-[transform,opacity]`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl lg:text-2xl text-white/50 leading-relaxed font-light text-center relative z-20 [backface-visibility:hidden] [transform:translateZ(0)] will-change-[transform,opacity]"
            >
              Our platform algorithmically solves automation issues by utilizing multi-tasking AI across your support, service, sales, and marketing efforts. 
              Experience 10x faster execution cycles while maintaining 100% data integrity.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 text-blue-400 font-mono text-sm tracking-widest uppercase group"
            >
              <span>Analyze Automation Yield</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
          <div className="flex flex-col gap-8 w-full">
            <div className="relative p-1 bg-white/5 rounded-3xl group h-full">
               <div className="absolute inset-0 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all opacity-0 group-hover:opacity-100" />
               <div className="bg-black/80 backdrop-blur-3xl p-6 sm:p-16 rounded-3xl text-center relative overflow-hidden flex items-center justify-center min-h-[350px] h-full w-full">
                  <SpaceCakeChart />
               </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-left space-y-6 bg-white/[0.02] p-8 rounded-3xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-display font-medium tracking-tight text-white flex items-center gap-3">
                <Bot className="w-5 h-5 text-blue-400" /> Beyond Execution
              </h3>
              <p className="text-white/60 font-light leading-relaxed">
                As AI handles the vast majority of non-creative constraints, human potential is unbounded. In the near future, products and services will be served intrinsically by agents.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                The definition of work is shifting—people will adopt new professional titles and entirely different styles of working, focusing solely on creative tasks and vision without boundaries.
              </p>
              <p className="text-white/60 font-light leading-relaxed italic border-t border-white/10 pt-4">
                Between 2026 and 2030, the global Total Addressable Market (TAM) for autonomous workflows is projected to surge past $4.2 trillion, driven by the symbiotic integration of human creativity and agentic intelligence. Over 75% of enterprise services will evolve from static tools into proactive, thinking partners. This deep technological connection allows individuals to seamlessly orchestrate multi-agent swarms, effectively transforming single visionaries into enterprise-scale executors.
              </p>
            </motion.div>
            
            <TamCharts />
          </div>
        </motion.div>
      </div>
        
    </motion.main>
  );
};

const getPhaseForIndustry = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("insurance") || n.includes("legal") || n.includes("public") || n.includes("strategic") || n.includes("non-profit") || n.includes("governance") || n.includes("interior") || n.includes("planning") || n.includes("mural")) return 'legacy';
  if (n.includes("financial") || n.includes("learning") || n.includes("retail") || n.includes("marketing") || n.includes("ethnography") || n.includes("wellness") || n.includes("biometrics") || n.includes("music") || n.includes("audio")) return 'cognitive';
  if (n.includes("delivery") || n.includes("factory") || n.includes("food") || n.includes("shipping") || n.includes("construction") || n.includes("agriculture") || n.includes("aquaponics") || n.includes("cryogenic")) return 'collaborative';
  if (n.includes("security") || n.includes("telecomm") || n.includes("healthcare") || n.includes("real estate") || n.includes("bio") || n.includes("machining") || n.includes("transit")) return 'agentic';
  return 'autonomous';
};

const EvolutionaryRoadmap = ({ onSelectPhase, activePhase }: { onSelectPhase: (phase: string | null) => void, activePhase: string | null }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const stages = [
    {
      id: 'legacy',
      num: '01',
      title: 'Legacy State',
      era: 'Pre-2024 • System Silos',
      icon: History,
      color: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.4)',
      bgGradient: 'from-red-500/10 to-red-950/20',
      borderGlow: 'hover:border-red-500/40',
      activeBorder: 'border-red-500 shadow-[0_0_30px_rgba(239, 68, 68, 0.25)]',
      desc: 'Siloed database structures, legacy system barriers, heavy administrative oversight, and high human manual effort.',
      metric: '92% Manual Oversight',
      metricLabel: 'Processing bottlenecks',
      examples: ['Traditional Insurance', 'Legal Discovery', 'Standard Administrative Bureaucracy']
    },
    {
      id: 'cognitive',
      num: '02',
      title: 'Cognitive Integration',
      era: '2024 • Context-Aware Copilots',
      icon: Brain,
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.4)',
      bgGradient: 'from-orange-500/10 to-orange-950/20',
      borderGlow: 'hover:border-orange-500/40',
      activeBorder: 'border-orange-500 shadow-[0_0_30px_rgba(245, 158, 11, 0.25)]',
      desc: 'Consolidation of unstructured streams, optical OCR extractions, and contextual search helpers answering user requests.',
      metric: '3.5x Throughput Increase',
      metricLabel: 'Retrieval latency speedup',
      examples: ['Financial Ops', 'AI Scoring Agents', 'Retail Support Systems']
    },
    {
      id: 'collaborative',
      num: '03',
      title: 'Collaborative Automation',
      era: '2025 • Sequential Integrations',
      icon: Webhook,
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.4)',
      bgGradient: 'from-emerald-500/10 to-emerald-950/20',
      borderGlow: 'hover:border-emerald-500/40',
      activeBorder: 'border-emerald-500 shadow-[0_0_30px_rgba(16, 185, 129, 0.25)]',
      desc: 'Seamless multi-step automated pipelines. Systems self-route transactional records with high-performance automated handshakes.',
      metric: '80% Workload Reduction',
      metricLabel: 'Routine repetitive workflows',
      examples: ['Global Delivery Logistics', 'Processes Factory', 'Cryogenic Freight Systems']
    },
    {
      id: 'agentic',
      num: '04',
      title: 'Agentic Coordination',
      era: '2026 • Specialist Multi-Agent Swarms',
      icon: Bot,
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.4)',
      bgGradient: 'from-blue-500/10 to-blue-950/20',
      borderGlow: 'hover:border-blue-500/40',
      activeBorder: 'border-blue-500 shadow-[0_0_30px_rgba(59, 130, 246, 0.25)]',
      desc: 'Multi-agent frameworks carrying out complex jobs. Specialist nodes coordinate dynamically to achieve complex high-integrity targets.',
      metric: '<120ms Dynamic Re-route',
      metricLabel: 'Complex decision latency',
      examples: ['Cyber Threats Triage', 'Telecom Networks', 'Smart Real Estate Grids']
    },
    {
      id: 'autonomous',
      num: '05',
      title: 'Autonomous Orchestration',
      era: '2027+ • Self-Evolving Ecosystems',
      icon: Orbit,
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.4)',
      bgGradient: 'from-purple-500/10 to-purple-950/20',
      borderGlow: 'hover:border-purple-500/40',
      activeBorder: 'border-purple-500 shadow-[0_0_30px_rgba(139, 92, 246, 0.25)]',
      desc: 'Self-regulating cybernetic loops governing planetary-scale assets. Agents self-repair and optimize infrastructure in real-time.',
      metric: '99.999% Zero-Human Touch',
      metricLabel: 'End-to-end task automation',
      examples: ['Space Deep Exploration', 'Fusion Smart Grids', 'Quantum Computations Units']
    }
  ];

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto py-20 px-4 md:px-8">
      {/* Visual background gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-xs font-mono tracking-[0.4em] text-blue-400 uppercase block mb-3">evolutionary pathway</span>
        <h3 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight mb-4">The Evolution to Autonomy</h3>
        <p className="text-white/40 font-light text-base md:text-lg">
          Trace DeltaScope's transformative road mapping of critical sectors. 
          <span className="text-blue-400 font-semibold"> Tap any phase card</span> to isolatively filter compatible sectors in the grid below.
        </p>
      </div>

      <div className="relative">
        {/* Dynamic Connected Progress Line */}
        <div className="absolute top-[32px] bottom-[32px] left-6 md:left-1/2 w-0.5 bg-white/[0.03] -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleY: springProgress }}
            className="w-full h-full bg-gradient-to-b from-red-500 via-orange-500 via-emerald-500 via-blue-500 to-purple-500 origin-top rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 relative">
          {stages.map((stage, idx) => {
            const IconComponent = stage.icon;
            const isEven = idx % 2 === 0;
            const isSelected = activePhase === stage.id;
            const isDimmed = activePhase !== null && !isSelected;

            return (
              <motion.div
                key={stage.id}
                className={`flex flex-col md:flex-row items-stretch md:items-center relative ${
                  isEven ? 'md:flex-row-reverse' : ''
                } transition-all duration-500 ${isDimmed ? 'opacity-30 scale-[0.98] blur-[0.5px]' : 'opacity-100'}`}
              >
                {/* Timeline center bullet */}
                <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <motion.button
                    onClick={() => onSelectPhase(isSelected ? null : stage.id)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'border-transparent text-white scale-110 shadow-lg' 
                        : 'border-white/25 text-white/50 bg-[#06060c]'
                    }`}
                    style={{ 
                      backgroundColor: isSelected ? stage.color : undefined,
                      boxShadow: isSelected ? `0 0 20px ${stage.glow}` : undefined
                    }}
                  >
                    <IconComponent size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Content block */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <motion.div
                    onClick={() => onSelectPhase(isSelected ? null : stage.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 md:p-8 rounded-[2rem] bg-white/[0.01] border backdrop-blur-xl cursor-pointer transition-all duration-300 select-none ${
                      isSelected ? stage.activeBorder : 'border-white/5 ' + stage.borderGlow + ' hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-3 font-mono text-[10px] uppercase font-black tracking-widest ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <span style={{ color: stage.color }}>PHASE {stage.num}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/40">{stage.era}</span>
                    </div>

                    <h4 className="text-2xl font-display font-medium text-white mb-3 tracking-tight">
                      {stage.title}
                    </h4>

                    <p className={`text-sm text-white/50 font-light leading-relaxed mb-4 ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                      {stage.desc}
                    </p>

                    {/* Shifting industries preview */}
                    <div className="mb-4">
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest block mb-2 font-black">Shifting Sectors</span>
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {stage.examples.map((ex, ie) => {
                          const tech = getTechForSector(ex);
                          const hoverKey = `${stage.id}-${ex}`;
                          const isHovered = hoveredSector === hoverKey;
                          
                          return (
                            <div key={ie} className="relative">
                              <motion.span 
                                onMouseEnter={() => setHoveredSector(hoverKey)}
                                onMouseLeave={() => setHoveredSector(null)}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: stage.color }}
                                className="text-[10px] font-mono text-white/60 bg-white/5 border border-white/5 rounded-full px-2.5 py-1.5 cursor-pointer block transition-all duration-300 relative z-30"
                              >
                                {ex}
                              </motion.span>
                              
                              <AnimatePresence>
                                {isHovered && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.92, y: 8 }}
                                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 p-3.5 bg-[#070b19] border border-blue-500/30 backdrop-blur-xl rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-[100] pointer-events-none text-left"
                                    style={{ borderColor: `${stage.color}50` }}
                                  >
                                    <div className="text-[8px] font-mono tracking-widest uppercase mb-1.5 flex items-center gap-1 font-black" style={{ color: stage.color }}>
                                      <Zap size={10} strokeWidth={3} /> System Architecture
                                    </div>
                                    <div className="text-xs font-semibold text-white/90 mb-1 font-display">
                                      {tech.name}
                                    </div>
                                    <div className="text-[10px] text-white/45 font-mono leading-relaxed">
                                      {tech.desc}
                                    </div>
                                    
                                    {/* Tooltip Chevron Indicator */}
                                    <div 
                                      className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-[1px] border-6 border-transparent border-t-[#070b19] z-50 pointer-events-none"
                                    />
                                    <div 
                                      className="absolute top-full left-1/2 -translate-x-1/2 border-6 border-transparent border-t-blue-500/30 -z-10 pointer-events-none"
                                      style={{ borderTopColor: `${stage.color}50` }}
                                    />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stat / Impact callout */}
                    <div className={`flex items-center gap-3 pt-4 border-t border-white/5 ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}>
                      <div className={isEven ? 'text-right' : 'text-left'}>
                        <p className="text-lg font-display font-black text-white italic leading-none">{stage.metric}</p>
                        <p className="text-[9px] font-mono text-white/40 uppercase tracking-wide mt-1">{stage.metricLabel}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Symmetry element */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const getTechForSector = (sectorName: string) => {
  const normalized = sectorName.toLowerCase();
  let techId = "govt"; // default
  if (normalized.includes("insurance") || normalized.includes("security") || normalized.includes("defense")) techId = "defense";
  else if (normalized.includes("legal") || normalized.includes("finance") || normalized.includes("ops") || normalized.includes("trading") || normalized.includes("monetary") || normalized.includes("coin") || normalized.includes("venture")) techId = "finance";
  else if (normalized.includes("delivery") || normalized.includes("logistics") || normalized.includes("transit") || normalized.includes("supply")) techId = "logistics";
  else if (normalized.includes("learning") || normalized.includes("academic") || normalized.includes("research") || normalized.includes("ethnography") || normalized.includes("quantum")) techId = "academic";
  else if (normalized.includes("factory") || normalized.includes("process") || normalized.includes("machining") || normalized.includes("heavy")) techId = "factory";
  else if (normalized.includes("food") || normalized.includes("beverage") || normalized.includes("hospitality") || normalized.includes("leisure") || normalized.includes("non-profit")) techId = "hospitality";
  else if (normalized.includes("shipping") || normalized.includes("freight") || normalized.includes("tourism") || normalized.includes("oceanography")) techId = "shipping";
  else if (normalized.includes("construction") || normalized.includes("infrastructure") || normalized.includes("architecture") || normalized.includes("mining") || normalized.includes("res")) techId = "construction";
  else if (normalized.includes("health") || normalized.includes("medical") || normalized.includes("biometric") || normalized.includes("wellness")) techId = "healthcare";
  else if (normalized.includes("real estate") || normalized.includes("building") || normalized.includes("property") || normalized.includes("interior") || normalized.includes("design")) techId = "realestate";
  else if (normalized.includes("energy") || normalized.includes("grid") || normalized.includes("power") || normalized.includes("fusion")) techId = "energy";
  else if (normalized.includes("agriculture") || normalized.includes("farm") || normalized.includes("sprout") || normalized.includes("textile") || normalized.includes("aquaponic") || normalized.includes("circular")) techId = "agriculture";
  else if (normalized.includes("retail") || normalized.includes("commerce") || normalized.includes("shop")) techId = "retail";
  else if (normalized.includes("automotive") || normalized.includes("car") || normalized.includes("driving") || normalized.includes("rail")) techId = "automotive";
  else if (normalized.includes("entertainment") || normalized.includes("film") || normalized.includes("music") || normalized.includes("game") || normalized.includes("esport") || normalized.includes("art")) techId = "entertainment";
  else if (normalized.includes("telecomm") || normalized.includes("network") || normalized.includes("wifi") || normalized.includes("broadband") || normalized.includes("satellite")) techId = "telecomm";
  else if (normalized.includes("pharma") || normalized.includes("drug") || normalized.includes("bio-eng") || normalized.includes("chemical")) techId = "pharma";
  else if (normalized.includes("aerospace") || normalized.includes("aviation") || normalized.includes("rocket") || normalized.includes("space")) techId = "aerospace";
  else if (normalized.includes("marketing") || normalized.includes("advert") || normalized.includes("brand") || normalized.includes("social")) techId = "marketing";

  return INDUSTRY_TECH.find(t => t.id === techId) || INDUSTRY_TECH[0];
};

const IndustriesSection = ({ scrollYProgress }: { scrollYProgress?: any }) => {
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const handleSelectSector = (sector: any) => {
    setSelectedSector(sector);
  };

  const getEgyptIdForAreaName = (name: string): string => {
    const normalized = name.toLowerCase();
    if (normalized.includes("insurance") || normalized.includes("security") || normalized.includes("defense")) return "defense";
    if (normalized.includes("legal") || normalized.includes("finance") || normalized.includes("ops") || normalized.includes("trading") || normalized.includes("monetary") || normalized.includes("coin") || normalized.includes("venture")) return "finance";
    if (normalized.includes("delivery") || normalized.includes("logistics") || normalized.includes("transit") || normalized.includes("supply")) return "logistics";
    if (normalized.includes("learning") || normalized.includes("academic") || normalized.includes("research") || normalized.includes("ethnography") || normalized.includes("quantum")) return "academic";
    if (normalized.includes("factory") || normalized.includes("process") || normalized.includes("machining") || normalized.includes("heavy")) return "factory";
    if (normalized.includes("food") || normalized.includes("beverage") || normalized.includes("hospitality") || normalized.includes("leisure") || normalized.includes("non-profit")) return "hospitality";
    if (normalized.includes("shipping") || normalized.includes("freight") || normalized.includes("tourism") || normalized.includes("oceanography")) return "shipping";
    if (normalized.includes("construction") || normalized.includes("infrastructure") || normalized.includes("architecture") || normalized.includes("mining") || normalized.includes("res")) return "construction";
    if (normalized.includes("health") || normalized.includes("medical") || normalized.includes("biometric") || normalized.includes("wellness")) return "healthcare";
    if (normalized.includes("real estate") || normalized.includes("building") || normalized.includes("property") || normalized.includes("interior") || normalized.includes("design")) return "realestate";
    if (normalized.includes("energy") || normalized.includes("grid") || normalized.includes("power") || normalized.includes("fusion")) return "energy";
    if (normalized.includes("agriculture") || normalized.includes("farm") || normalized.includes("sprout") || normalized.includes("textile") || normalized.includes("aquaponic") || normalized.includes("circular")) return "agriculture";
    if (normalized.includes("retail") || normalized.includes("commerce") || normalized.includes("shop")) return "retail";
    if (normalized.includes("automotive") || normalized.includes("car") || normalized.includes("driving") || normalized.includes("rail")) return "automotive";
    if (normalized.includes("entertainment") || normalized.includes("film") || normalized.includes("music") || normalized.includes("game") || normalized.includes("esport") || normalized.includes("art")) return "entertainment";
    if (normalized.includes("telecomm") || normalized.includes("network") || normalized.includes("wifi") || normalized.includes("broadband") || normalized.includes("satellite")) return "telecomm";
    if (normalized.includes("pharma") || normalized.includes("drug") || normalized.includes("bio-eng") || normalized.includes("chemical")) return "pharma";
    if (normalized.includes("aerospace") || normalized.includes("aviation") || normalized.includes("rocket") || normalized.includes("space")) return "aerospace";
    if (normalized.includes("marketing") || normalized.includes("advert") || normalized.includes("brand") || normalized.includes("social")) return "marketing";
    return "govt";
  };
  
  const y = useTransform(scrollYProgress || useSpring(0), [0, 1], [0, -100]);

  return (
    <motion.main
      key="industries"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-10 overflow-x-hidden relative bg-transparent isolate min-h-screen"
    >
      <motion.div style={{ y }} className="mx-auto space-y-12">
        <div 
          className="py-24 text-center px-4 relative z-20"
        >
           <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white max-w-5xl mx-auto leading-tight tracking-tight">
             Legacy roles are obsolete. Empowered by <span className="text-blue-400 font-medium">AI creativity</span>, the future workforce will forge new identities built on multidimensional skills.
           </h3>
        </div>
        
        {/* Scroll-triggered Evolutionary Roadmap */}
        <EvolutionaryRoadmap activePhase={activePhase} onSelectPhase={setActivePhase} />
        
        {/* Industry Grid Section */}
        <div id="industries" className="relative py-32 px-4 md:px-8">
          <div className="text-center mb-10 max-w-4xl mx-auto flex flex-col items-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
              viewport={{ once: true }}
              className="text-xs font-mono uppercase text-blue-400 mb-4 text-center block"
            >
              The Automation Engine
            </motion.span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-center">Cross-Industry Automation</h2>
             <p className="text-white/40 mt-6 mb-8 font-light text-lg text-center max-w-2xl">DeltaScope handles multi-tasking AI applications to solve challenges in support, sales, marketing and more across diverse industries.</p>
             
             {/* Dynamic Filter Badges */}
             {activePhase && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-3 px-4 py-2 border border-blue-500/30 bg-blue-500/10 rounded-full font-mono text-[10px] tracking-wider uppercase text-blue-300 mb-6"
               >
                 <span>Showing ONLY: <span className="font-bold text-white">{activePhase.toUpperCase()} ERA</span> sectors</span>
                 <button 
                   onClick={() => setActivePhase(null)} 
                   className="text-white/50 hover:text-white bg-white/10 hover:bg-white/20 transition-all rounded-full p-1 leading-none inline-flex items-center justify-center cursor-pointer"
                   title="Clear Filter"
                 >
                   <X size={10} strokeWidth={3} />
                 </button>
               </motion.div>
             )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl w-full mx-auto px-4 md:px-0 relative z-10">
      {[
        { name: "Insurance", icon: Shield, color: "#3b82f6", model: ShieldModel },
        { name: "Global Delivery", icon: Globe, color: "#10b981", model: GlobeModel },
        { name: "Strategic Mgmt", icon: Target, color: "#f59e0b", model: TargetModel },
        { name: "Financial Ops", icon: LineChart, color: "#8b5cf6", model: ChartModel },
        { name: "Learning", icon: GraduationCap, color: "#ef4444", model: LearningModel },
        { name: "Factory Processes", icon: Factory, color: "#06b6d4", model: FactoryModel },
        { name: "Food & Beverage", icon: Coffee, color: "#f97316", model: CoffeeModel },
        { name: "Shipping & Freight", icon: Package, color: "#14b8a6", model: PackageModel },
        { name: "Construction", icon: Hammer, color: "#eab308", model: ConstructionModel },
        { name: "Healthcare", icon: Activity, color: "#ec4899", model: HeartPulseModel },
        { name: "Real Estate", icon: Building2, color: "#6366f1", model: BuildingModel },
        { name: "Energy Grid", icon: Zap, color: "#facc15", model: EnergyModel },
        { name: "Agriculture", icon: Tractor, color: "#84cc16", model: AgricultureModel },
        { name: "Retail & Commerce", icon: ShoppingCart, color: "#3b82f6", model: RetailModel },
        { name: "Automotive", icon: Car, color: "#f43f5e", model: AutomotiveModel },
        { name: "Entertainment", icon: Film, color: "#a855f7", model: FilmModel },
        { name: "Telecomm", icon: RadioTower, color: "#0ea5e9", model: RadioModel },
        { name: "Pharma", icon: FlaskConical, color: "#10b981", model: PharmaModel },
        { name: "Aerospace", icon: Rocket, color: "#a855f7", model: AerospaceModel },
        { name: "Social Management", icon: Users, color: "#3b82f6", model: SocialModel },
        { name: "Cyber Security", icon: Lock, color: "#ef4444", model: SecurityModel },
        { name: "Legal Discovery", icon: Scale, color: "#eab308", model: ScaleModel },
        { name: "Public Sector", icon: Landmark, color: "#6366f1", model: LandmarkModel },
        { name: "Mining & Resources", icon: Gem, color: "#14b8a6", model: GemModel },
        { name: "Tourism", icon: Plane, color: "#f97316", model: GlobeModel },
        { name: "E-Sports", icon: Gamepad2, color: "#a855f7", model: AlgorithmicNodeModel },
        { name: "Clean Water Logistics", icon: Droplets, color: "#0ea5e9", model: PackageModel },
        { name: "Space Exploration", icon: Telescope, color: "#8b5cf6", model: AerospaceModel },
        { name: "Oceanography", icon: Anchor, color: "#3b82f6", model: TargetModel },
        { name: "Bio-Engineering", icon: Dna, color: "#10b981", model: PharmaModel },
        { name: "Fine Arts & Media", icon: Palette, color: "#f43f5e", model: FilmModel },
        { name: "Precision Machining", icon: Cpu, color: "#6366f1", model: FactoryModel },
        { name: "Non-Profit Ops", icon: HeartHandshake, color: "#ec4899", model: SocialModel },
        { name: "High-Speed Transit", icon: Train, color: "#14b8a6", model: AutomotiveModel },
        { name: "Quantum Research", icon: Atom, color: "#8b5cf6", model: AlgorithmicNodeModel },
        { name: "Venture Finance", icon: Coins, color: "#f59e0b", model: ChartModel },
        { name: "Meteorological Forecasting", icon: CloudSun, color: "#0ea5e9", model: GlobeModel },
        { name: "Waste Circularity", icon: Recycle, color: "#10b981", model: GemModel },
        { name: "Neuro-Health Units", icon: BrainCircuit, color: "#ec4899", model: HeartPulseModel },
        { name: "Hospitality & Leisure", icon: Bed, color: "#f97316", model: BuildingModel },
        { name: "Sustainable Textiles", icon: Scissors, color: "#84cc16", model: FactoryModel },
        { name: "Renewable Fusion", icon: Zap, color: "#facc15", model: EnergyModel },
        { name: "E-Governance", icon: Landmark, color: "#6366f1", model: LandmarkModel },
        { name: "Autonomous Rail", icon: TrainFront, color: "#14b8a6", model: AutomotiveModel },
        { name: "Digital Ethnography", icon: Languages, color: "#a855f7", model: SocialModel },
        { name: "Urban Aquaponics", icon: Sprout, color: "#10b981", model: AgricultureModel },
        { name: "Cryogenic Logistics", icon: ThermometerSnowflake, color: "#0ea5e9", model: PackageModel },
        { name: "Satellite Connectivity", icon: Wifi, color: "#3b82f6", model: AerospaceModel },
        { name: "Heavy Industry", icon: HardHat, color: "#f43f5e", model: FactoryModel },
        { name: "Wellness & Mental Health", icon: Activity, color: "#ec4899", model: HeartPulseModel },
        { name: "Sports Biometrics", icon: Weight, color: "#14b8a6", model: AutomotiveModel },
        { name: "Music & Audio Gen", icon: Music, color: "#8b5cf6", model: FilmModel },
        { name: "Interior Design AI", icon: Layout, color: "#f97316", model: BuildingModel },
        { name: "Architecture & Planning", icon: PencilLine, color: "#6366f1", model: ConstructionModel }
      ].map((area, i) => {
        const isFilteredOut = activePhase && getPhaseForIndustry(area.name) !== activePhase;

        return (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={isFilteredOut ? {} : { 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "#fbbf2490",
              boxShadow: "0 0 32px rgba(251,191,36,0.18)",
              transition: { duration: 0.3 }
            }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              duration: 0.8, 
              delay: (i % 4) * 0.05, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            onTap={isFilteredOut ? undefined : () => handleSelectSector(area)}
            onKeyDown={(e) => {
              if (isFilteredOut) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectSector(area);
              }
            }}
            role="button"
            tabIndex={isFilteredOut ? -1 : 0}
            aria-label={`Select ${area.name} sector`}
            className={`group relative h-64 sm:h-80 flex flex-col justify-end p-6 md:p-8 rounded-3xl transition-all duration-500 overflow-hidden ${
              isFilteredOut
                ? 'opacity-[0.08] saturate-50 blur-[1px] scale-95 pointer-events-none'
                : 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-[#010610]/95 backdrop-blur-md border border-yellow-500/10 hover:border-yellow-500/30'
            }`}
          >
            {/* Industry symbol — same lucide glyph (semantic meaning kept) but
                re-imagined as a tiny cosmic system: orbits, satellites, halo,
                glow. Per Katia: "ті самі ідеї, але з космічним". */}
            <div className="absolute inset-x-0 top-0 h-3/5 pointer-events-auto flex items-start justify-center pt-[6%] opacity-90 group-hover:opacity-100 transition-all duration-700 scale-[0.72] group-hover:scale-[0.82]">
              <div className="relative w-3/4 h-full">
                <CosmicIndustryIcon icon={area.icon} color={area.color} variant={i} />
              </div>
            </div>
            
            {/* Content Block — fixed min-height so 1-line and 2-line titles
                yield rectangles of the same size; text is vertically centered
                inside (justify-center) */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full space-y-2 pointer-events-none bg-black/40 py-3 min-h-[6rem] backdrop-blur-sm rounded-xl border border-white/5 group-hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-display font-semibold text-white/90 group-hover:text-white transition-all tracking-tight leading-tight text-center px-4">{area.name}</h3>
              <div
                className="h-[2px] w-0 group-hover:w-16 rounded-full transition-all duration-500 delay-100 opacity-60"
                style={{ backgroundColor: "rgba(59,130,246,0.8)", boxShadow: `0 0 10px rgba(59,130,246,0.5)` }}
              />
            </div>

            {/* Glass Panel Effects */}
            <div className="absolute opacity-0 group-hover:opacity-100 inset-0 -z-10 rounded-3xl bg-blue-500/20 blur-2xl transition-opacity duration-500" />
          </motion.div>
        );
      })}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedSector && (
          <SectorDashboardModal sector={selectedSector} onClose={() => handleSelectSector(null)} />
        )}
      </AnimatePresence>
    </motion.main>
  );
};

const ToolCard = ({ item, i }: { item: any; i: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-colors p-8 flex flex-col"
    >
      <div className="h-48 md:h-64 mb-6 relative">
        <Canvas performance={{ min: 0.5 }} dpr={1} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ powerPreference: "high-performance", antialias: false, alpha: true }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, -10, -10]} intensity={0.5} color={item.color} />
          <item.Model hovered={hovered} color={item.color} />
        </Canvas>
        {/* Glow Behind Canvas */}
        <div 
          className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-[60px] -z-10 rounded-full transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: item.color, opacity: hovered ? 0.3 : 0 }} 
        />
      </div>
      <div className="text-center mt-auto">
        <h4 className="text-xl font-display font-bold text-white mb-2 transition-colors" style={{ color: hovered ? item.color : 'white' }}>{item.name}</h4>
        <p className="text-sm text-white/50">{item.desc}</p>
      </div>
    </motion.div>
  );
};

const HumanBodyHand = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-32 h-32 relative text-blue-400">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_currentColor]">
          {/* Back/Palm Glow */}
          <circle cx="50" cy="65" r="20" fill="currentColor" fillOpacity="0.05" />
          {/* Detailed Palm */}
          <path d="M 35 45 C 30 50, 25 80, 45 90 C 60 100, 80 80, 70 45 C 60 48, 50 48, 35 45 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Thumb (more prominent joint) */}
          <path d="M 30 65 C 10 65, 5 50, 15 40 L 30 55" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          {/* Thumb wrinkles */}
          <path d="M 18 45 L 22 50" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Index */}
          <path d="M 42 45 L 32 12" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M 35 25 L 40 28" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Middle */}
          <path d="M 52 45 L 48 8" fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M 50 22 L 55 25" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Ring */}
          <path d="M 62 45 L 62 14" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M 64 25 L 60 28" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Pinky */}
          <path d="M 70 48 L 75 24" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M 74 32 L 70 34" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Palm Lines (Life lines, heart lines) */}
          <path d="M 32 55 C 45 70, 55 80, 55 85" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8"/>
          <path d="M 35 65 C 50 65, 75 55, 75 55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8"/>
          <path d="M 45 48 C 55 55, 70 50, 70 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        </svg>
      </div>
      <div className="text-center font-mono text-xs uppercase tracking-widest text-white/50">
        Open Hand Biometric
      </div>
    </div>
  );
};

const HumanBodyHead = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-32 h-32 relative text-blue-400">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_currentColor]">
          {/* Detailed Profile Outline (facing left) */}
          <path d="M 50 10 
                   C 35 10, 25 15, 23 30 
                   C 23 33, 20 35, 23 37 
                   C 20 40, 10 46, 10 50 
                   L 15 52 
                   L 12 55 
                   L 16 56 
                   L 14 60 
                   L 20 63 
                   C 18 68, 20 72, 25 75 
                   C 30 80, 30 90, 30 100 
                   L 70 100 
                   L 65 70 
                   C 90 50, 75 12, 50 10 Z" 
                fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          
          {/* Eye */}
          <path d="M 22 38 Q 28 35, 30 38 Q 28 40, 22 38 Z" fill="currentColor" opacity="0.8" />
          {/* Ear */}
          <path d="M 52 48 C 60 45, 62 55, 56 60 C 50 62, 52 55, 52 48 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 54 50 C 58 50, 58 55, 55 58" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          
          {/* Connective neural paths from brain to eyes/ears */}
          <g opacity="0.3" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" fill="none">
            <path d="M 30 38 Q 40 38, 45 40" />
            <path d="M 52 50 Q 48 50, 45 45" />
          </g>

          {/* Brain inside */}
          <g opacity="0.6" className="text-blue-300">
             {/* Cerebrum */}
             <path d="M 30 25 C 25 35, 30 45, 45 45 C 55 45, 65 40, 65 30 C 65 15, 40 10, 30 25 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
             {/* Cerebellum */}
             <path d="M 50 45 C 50 52, 60 55, 65 45 C 65 40, 55 42, 50 45 Z" fill="none" stroke="currentColor" strokeWidth="1" />
             {/* Brain stem */}
             <path d="M 45 45 L 42 60 L 48 62 L 50 45 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
             {/* Brain folds (Gyri/Sulci) */}
             <path d="M 35 20 Q 40 25, 38 35" fill="none" stroke="currentColor" strokeWidth="0.75" />
             <path d="M 42 16 Q 48 25, 45 42" fill="none" stroke="currentColor" strokeWidth="0.75" />
             <path d="M 52 15 Q 55 25, 52 40" fill="none" stroke="currentColor" strokeWidth="0.75" />
             <path d="M 60 20 Q 58 30, 62 35" fill="none" stroke="currentColor" strokeWidth="0.75" />
             <path d="M 32 30 Q 38 32, 34 38" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
      <div className="text-center font-mono text-xs uppercase tracking-widest text-white/50">Neural Core Profile</div>
    </div>
  );
};

const HumanBodyEyes = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-40 h-24 relative text-blue-400 flex items-center justify-center">
        <svg viewBox="0 0 100 50" className="w-full h-auto drop-shadow-[0_0_15px_currentColor]">
           {/* Left Eye */}
           <path d="M 5 25 Q 25 12, 45 25 Q 25 38, 5 25 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
           <circle cx="25" cy="25" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
           <circle cx="25" cy="25" r="3" fill="currentColor" />
           <circle cx="23" cy="23" r="1" fill="#fff" />
           <path d="M 5 25 Q 25 8, 45 25" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
           
           {/* Right Eye */}
           <path d="M 55 25 Q 75 12, 95 25 Q 75 38, 55 25 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
           <circle cx="75" cy="25" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
           <circle cx="75" cy="25" r="3" fill="currentColor" />
           <circle cx="73" cy="23" r="1" fill="#fff" />
           <path d="M 55 25 Q 75 8, 95 25" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8"/>
        </svg>
      </div>
      <div className="text-center font-mono text-xs uppercase tracking-widest text-white/50">Human Iris Integration</div>
    </div>
  );
};

const BrandBook = ({ globalBg, setGlobalBg }: any) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-32">
      <div className="text-center pt-10">
         <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 relative z-10">Brand Identity</h1>
         <p className="text-xl text-white/50 max-w-2xl mx-auto relative z-10">The comprehensive visual language, typography, colors, animations, and structures of DeltaScope.</p>
      </div>
      
      {/* Logo & Animations */}
      <section className="relative z-10">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Primary Logo & Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 md:p-12 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center overflow-hidden gap-8">
              <div className="text-sm font-mono text-white/40 uppercase tracking-widest text-center">Interactive State</div>
              <div className="w-full max-w-[200px] md:max-w-[400px]">
                 <Logo className="w-full h-auto text-4xl md:text-8xl scale-125" cycling aria-label="DeltaScope Logo" />
              </div>
              <p className="text-white/40 font-mono text-xs text-center max-w-sm mt-4">Hover to trigger hover animation, text glow, and symbol transformation cycle.</p>
           </div>
           <div className="p-8 md:p-12 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center overflow-hidden gap-8">
              <div className="text-sm font-mono text-white/40 uppercase tracking-widest text-center">Delta Hover Element</div>
              <div className="w-32 h-32 flex items-center justify-center bg-black/50 border border-white/20 rounded-2xl">
                 <DeltaHover>
                    <div className="text-white font-mono uppercase tracking-widest text-sm p-4 cursor-pointer">Hover Me</div>
                 </DeltaHover>
              </div>
              <p className="text-white/40 font-mono text-xs text-center max-w-sm mt-4">Used on interactive structural elements, displaying a rotating Delta symbol.</p>
           </div>
        </div>
      </section>

      {/* Colors & Gradients */}
      <section className="relative z-10">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Color Palette & Gradients</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
           <div className="space-y-3">
             <div className="h-24 rounded-2xl bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10"></div>
             <div><div className="font-bold">Primary Blue</div><div className="text-white/50 text-sm">#3b82f6</div></div>
           </div>
           <div className="space-y-3">
             <div className="h-24 rounded-2xl bg-[#00000a] border border-white/20"></div>
             <div><div className="font-bold">Deep Space</div><div className="text-white/50 text-sm">#00000a</div></div>
           </div>
           <div className="space-y-3">
             <div className="h-24 rounded-2xl bg-emerald-400 border border-white/10"></div>
             <div><div className="font-bold">Accent Emerald</div><div className="text-white/50 text-sm">#34d399</div></div>
           </div>
           <div className="space-y-3">
             <div className="h-24 rounded-2xl bg-purple-500 border border-white/10"></div>
             <div><div className="font-bold">Accent Purple</div><div className="text-white/50 text-sm">#a855f7</div></div>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-gradient-to-br from-blue-500/20 via-black to-purple-500/20">
             <h3 className="text-xl font-bold mb-4">Command Gradient</h3>
             <p className="text-white/50 text-sm">bg-gradient-to-br from-blue-500/20 via-black to-purple-500/20</p>
           </div>
           <div className="p-8 rounded-2xl border border-blue-500/30 relative overflow-hidden bg-gradient-to-b from-blue-900/40 to-transparent">
             <h3 className="text-xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Text Gradient 1</h3>
             <p className="text-white/50 text-sm">bg-gradient-to-r from-blue-400 to-indigo-500</p>
           </div>
           <div className="p-8 rounded-2xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-transparent">
             <h3 className="text-xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Text Gradient 2</h3>
             <p className="text-white/50 text-sm">bg-gradient-to-r from-emerald-400 to-teal-500</p>
           </div>
           <div className="p-8 rounded-2xl border border-white/10 relative overflow-hidden">
             <h3 className="text-xl font-bold mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-indigo-500">Silver/Blue Foil</h3>
             <p className="text-white/50 text-sm">bg-gradient-to-br from-white via-blue-200 to-indigo-500</p>
           </div>
        </div>
      </section>

      {/* Industrial Assets */}
      <section className="relative z-10">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Flagship Orbital Hardware</h2>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)]" />
           <OrbitalTelescope progress={smoothProgress} label="Interactive Brand Flagship Hardware" />
        </div>
      </section>

      {/* 3D Brand Sculptures */}
      <section className="relative z-10 pt-16 border-t border-white/5">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Orbital Brand Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPACE_OBJECT_TYPES.map((obj) => (
             <div key={obj.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-8 relative overflow-hidden group">
                 <BoomableSpaceObject type={obj.id} />
             </div>
          ))}
        </div>
      </section>

      {/* Microscopic Assets */}
      <section className="relative z-10 pt-16 border-t border-white/5">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Microscopic Entities</h2>
        <p className="text-white/50 mb-8 max-w-3xl">Animated representations of molecular, atomic, and biological structures utilized in visualizations.</p>
        <MicroscopicGallery />
      </section>

      {/* Fonts */}
      <section className="relative z-10 pt-16 border-t border-white/5">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Typography & Text Treatments</h2>
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
             <div>
                <h3 className="text-xl font-bold text-white/50 mb-2">Display (Inter)</h3>
                <p className="text-sm text-white/40">Used for massive dimensional titles, primary headers, and high-impact messaging.</p>
             </div>
             <div className="md:col-span-2">
                <div className="font-display font-black text-4xl sm:text-5xl md:text-6xl break-words leading-none tracking-tighter uppercase">Massive Impact</div>
                <div className="font-display font-bold text-3xl sm:text-4xl mt-4 tracking-tighter italic">Dynamic Italics</div>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-8 border-t border-white/5">
             <div>
                <h3 className="text-xl font-bold text-white/50 mb-2">Sans (Inter)</h3>
                <p className="text-sm text-white/40">Used for body copy, paragraphs, and functional UI elements.</p>
             </div>
             <div className="md:col-span-2">
                <div className="font-sans font-normal text-xl sm:text-2xl leading-relaxed text-white/70">Elegant, readable paragraphs with plenty of line height for comfortable scanning. We use lowered opacity (text-white/70, text-white/50) instead of grey colors to adopt background hues.</div>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-8 border-t border-white/5">
             <div>
                <h3 className="text-xl font-bold text-white/50 mb-2">Mono (JetBrains Mono)</h3>
                <p className="text-sm text-white/40">Used for technical details, metadata, overline labels, and code.</p>
             </div>
             <div className="md:col-span-2 overflow-hidden">
                <div className="font-mono text-sm sm:text-base tracking-[0.2em] uppercase text-emerald-400 mb-4">Overline Technical Labels</div>
                <div className="font-mono text-lg sm:text-xl text-blue-400">{'<SystemConfig value="loaded" />'}</div>
             </div>
          </div>
        </div>
      </section>

      {/* Planets */}
      <section className="relative z-10">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Planetary Bodies</h2>
        <p className="text-white/50 mb-8 max-w-3xl">Realistic 2D planets used in the background and interactive elements.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
           {PLANETS_DATA.map(planet => (
             <div key={planet.id} className="flex flex-col items-center gap-6 group">
                <div className="relative flex items-center justify-center pointer-events-auto h-40">
                  <RealisticPlanet planet={planet} isHoverable={true} />
                </div>
                <div className="font-mono text-center">
                   <div className="text-white font-bold uppercase tracking-widest">{planet.name}</div>
                   <div className="text-[10px] uppercase tracking-wider text-blue-400 mt-1">{planet.coordinates}</div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Animations & Loaders */}
      <section className="relative z-10">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Animations & Loaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
           <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center gap-6 min-h-[300px]">
              <RotatingDelta className="text-4xl text-emerald-400" />
              <h3 className="text-xl font-bold font-display mt-auto">Rotating Delta</h3>
              <p className="text-sm font-mono text-white/40">Used for inline status indicators and small loading states.</p>
           </div>
           
           <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center gap-6 min-h-[300px]">
              <div className="flex items-center space-x-3 h-16">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                   <RefreshCw className="w-6 h-6 text-blue-400" />
                 </motion.div>
                 <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Syncing...</span>
              </div>
              <h3 className="text-xl font-bold font-display mt-auto">Infinite Sync</h3>
              <p className="text-sm font-mono text-white/40">Active data loading indicator found in infinite scroll lists.</p>
           </div>

           <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center gap-6 overflow-hidden relative min-h-[300px]">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/30"></div>
              <motion.div 
                 initial={{ x: "-100%" }} 
                 animate={{ x: "100%" }} 
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 w-1/3 h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399] -translate-y-1/2"
              />
              <div className="h-10"></div>
              <h3 className="text-xl font-bold font-display mt-auto relative z-10">Laser Scanner</h3>
              <p className="text-sm font-mono text-white/40 relative z-10">Used in dialogs and hover popups for scanning effects.</p>
           </div>

        </div>
      </section>

      {/* Effects & Backgrounds */}
      <section className="relative z-10 pb-20">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Effects, Backgrounds & Interactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
           <div className="p-12 relative rounded-3xl border border-white/10 flex flex-col justify-center items-center overflow-hidden min-h-[400px] group">
             <div className="absolute inset-0 bg-[#00000a]"></div>
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] rounded-full border border-white/5 opacity-50"
             />
             <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[500px] h-[500px] rounded-full border border-blue-500/10 opacity-50 border-dashed"
             />
             <div className="relative z-10 text-center mb-8">
                <h3 className="text-2xl font-display font-bold mb-2 text-white">Orbital Rings</h3>
                <p className="text-white/40 font-mono text-xs max-w-xs">Slow rotating geometric shapes creating cosmic depth.</p>
             </div>
             {/* Flyby representation inside the orbital ring */}
             <div className="h-32 mb-10 relative z-20">
                 <div className="absolute z-20 w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                   <FlybyObject 
                      duration={5} 
                      delay={0}
                      scale={1}
                      className="blur-[2px]"
                   >
                     <div className="w-16 h-16 flex items-center justify-center">
                       <SpaceTech2D type="satellite" />
                     </div>
                   </FlybyObject>
                 </div>
                 <div className="mt-20 font-mono text-xs text-blue-400">Hover inside view to active flyby...</div>
             </div>
           </div>

           <div className="p-12 relative rounded-3xl border border-white/10 flex flex-col justify-center items-center overflow-hidden min-h-[400px] group transition-all duration-700 hover:border-white/30 hover:bg-white/[0.03]">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-1000"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-1000 blur-[80px] rounded-full pointer-events-none"></div>
             
             <div className="relative z-10 text-center">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-blue-300 transition-colors">Tactile Surface Hover</h3>
                <p className="text-white/40 font-mono text-xs max-w-sm mx-auto group-hover:text-white/60 transition-colors">Carbon texture masking combined with diffuse colored shadows and border highlighting on element hover.</p>
             </div>
           </div>

           <div className="p-12 relative rounded-3xl border border-white/10 flex flex-col justify-center items-center overflow-hidden min-h-[300px]">
             <div className="text-center w-full">
                <h3 className="text-xl font-display font-bold mb-6 text-white text-left border-b border-white/10 pb-2">Scrolling Architectures</h3>
                <ul className="text-left space-y-4 font-mono text-sm text-white/50">
                  <li><strong className="text-blue-400">PinnedScrollSection:</strong> Keeps content vertically locked while internal scroll progress changes styling. Used in big text sections.</li>
                  <li><strong className="text-emerald-400">Cosmic3DVisualizer:</strong> High-performance WebGL environment driven by window scroll state acting as a background for the main page.</li>
                  <li><strong className="text-purple-400">Staggered Entrances:</strong> Grids sequence their children (e.g. 0.1s delay) when sliding into view via framer-motion's <code>whileInView</code>.</li>
                  <li><strong className="text-white">ColorRevealTitle:</strong> Gradually fills text with a glowing gradient block as the user scrolls.</li>
                </ul>
             </div>
           </div>

        </div>
      </section>

      {/* 3D Brand Architecture & Geometry */}
      <section className="relative z-10 py-16 -mx-6 px-6">
        <div className="relative z-20">
          <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Brand Architecture & 3D Geometry</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                 <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500/30"></div>
                 </div>
              </div>
              <div className="h-64 md:h-80 relative">
                 <ModelViewer 
                    type="brand_lattice" 
                    cameraPosition={[0, 0, 4]} 
                    name="Structural Core"
                    desc="A multi-dimensional lattice representing the interconnectivity of our neural networks and global operations."
                 />
              </div>
              <div>
                 <div className="font-mono text-sm text-blue-400 uppercase tracking-widest mb-2">Primary Structure</div>
                 <h3 className="text-2xl font-display font-black uppercase italic mb-4">The Neural Lattice</h3>
                 <p className="text-white/50 text-sm leading-relaxed">This geometry signifies the strength and complexity of our organizational framework. It uses a 12-node system connected by ethereal sync-lines, representing our core regions and their real-time data integration.</p>
              </div>
           </div>
           
           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                 <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                 </div>
              </div>
              <div className="h-64 md:h-80 relative">
                 <ModelViewer 
                    type="brand_crystal" 
                    cameraPosition={[0, 0, 3]} 
                    name="Clarity Prism"
                    desc="Pure geometric form representing the absolute transparency and analytical precision of our AI decision engines."
                 />
              </div>
              <div>
                 <div className="font-mono text-sm text-purple-400 uppercase tracking-widest mb-2">Secondary Form</div>
                 <h3 className="text-2xl font-display font-black uppercase italic mb-4">The Precision Prism</h3>
                 <p className="text-white/50 text-sm leading-relaxed">The icosahedron represents 'Clarity'. Its multifaceted surface reflects data from every angle, signifying our commitment to unbiased, comprehensive intelligence. The internal chromatic aberration effect represents high-frequency processing.</p>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col gap-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                 <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                 </div>
              </div>
              <div className="h-64 md:h-80 relative">
                 <ModelViewer 
                    type="brand_oculus" 
                    cameraPosition={[0, 0, 3]} 
                    name="Navigation Eye"
                    desc="Interactive focal point for visionary brand navigation and gaze-based data extraction."
                 />
              </div>
              <div>
                 <div className="font-mono text-sm text-pink-400 uppercase tracking-widest mb-2">Tertiary Form</div>
                 <h3 className="text-2xl font-display font-black uppercase italic mb-4">The Vision Oculus</h3>
                 <p className="text-white/50 text-sm leading-relaxed">Representing 'Foresight', the Oculus is a layered, sentient geometry that watches the data currents. Its rotating outer rings symbolize our adaptive strategies, while its pulsating core represents the heartbeat of our creative vision.</p>
              </div>
           </div>
        </div>
        </div>
      </section>


      <section className="relative z-10 pt-16 border-t border-white/5">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Geometric Blueprint 2D Technologies</h2>
        <p className="text-white/60 mb-8 max-w-3xl">Animated geometric blueprints of astronomical equipment and orbital phenomena.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           {SPACE_TECH.map((tech, i) => {
             const brandColors = ["#3b82f6", "#34d399", "#a855f7"];
             const color = brandColors[i % brandColors.length];
             return (
               <div key={i} className="flex flex-col gap-4">
                  <SpaceTech2D typeIndex={i} color={color} />
                  <div className="text-center">
                     <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">Tech {(i+1).toString().padStart(2, '0')}</div>
                     <h3 className="text-sm font-display font-bold uppercase">{tech.name}</h3>
                     <p className="text-[10px] text-white/40 mt-2 font-mono uppercase tracking-widest">{tech.desc}</p>
                  </div>
               </div>
             );
           })}
        </div>
      </section>



      <section className="relative z-10 pt-16 border-t border-white/5">
        <h2 className="text-3xl font-display font-bold mb-10 border-b border-white/10 pb-4">Geometric Blueprint 2D Technologies</h2>
        <p className="text-white/60 mb-8 max-w-3xl">Animated geometric blueprints of industry scale operations and infrastructure.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           {INDUSTRY_TECH.map((tech, i) => {
             const brandColors = ["#3b82f6", "#34d399", "#a855f7"];
             const color = brandColors[i % brandColors.length];
             return (
               <div key={i} className="flex flex-col gap-4">
                  <SpaceTech2D typeIndex={i % 5} color={color} />
                  <div className="text-center">
                     <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest mb-1">Ind {(i+1).toString().padStart(2, '0')}</div>
                     <h3 className="text-sm font-display font-bold uppercase">{tech.name}</h3>
                     <p className="text-[10px] text-white/40 mt-2 font-mono uppercase tracking-widest">{tech.desc}</p>
                  </div>
               </div>
             );
           })}
        </div>
      </section>

      {/* Imagery */}
      <section className="relative z-10 pt-16 border-t border-white/5 pb-20">
        <h2 className="text-3xl font-display font-bold mb-10 pb-4 border-b border-white/10">Photography & Imagery</h2>
        <p className="text-white/60 mb-8 max-w-2xl text-lg">We rely on dark, moody, conceptual photography representing futuristic operations, space-age tech, and minimalist, large-scale structures.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 group">
              <img loading="lazy" src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" alt="Space tech AI" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
           </div>
           <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 group">
              <img loading="lazy" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Global network" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
           </div>
           <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 group">
              <img loading="lazy" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team integration" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
           </div>
        </div>
      </section>

      {/* Environment Backgrounds Toggle */}
      <section className="relative z-10 pt-16 border-t border-white/5 pb-20">
        <h2 className="text-3xl font-display font-bold mb-10 pb-4 border-b border-white/10">Environment Backgrounds</h2>
        <p className="text-white/60 mb-8 max-w-2xl text-lg">Select a background to apply across the entire application viewport.</p>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 'galaxy', name: 'Cosmic Galaxy', desc: 'Original space background with dynamic starfields and drifting nebulas.' },
            { id: 'oceanHorizon', name: 'Ocean Horizon', desc: 'Sunset ocean horizon. Hover on elements to affect lighting.' },
            { id: 'mars', name: 'Night on Mars', desc: 'Red dust, distant mountains, and orbiting twin moons.' },
            { id: 'deepOcean', name: 'Deep Ocean', desc: 'Underwater depth with bioluminescent fish and organisms.' },
            { id: 'molecules', name: 'Molecules', desc: 'Atoms, protons, and electrons surrounding molecular structures.' },
            { id: 'microchips', name: 'Microchips', desc: 'Electricity signals traveling through neural paths.' }
          ].map(bg => (
            <div 
              key={bg.id}
              onClick={() => setGlobalBg(bg.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                globalBg === bg.id 
                  ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <h3 className="text-xl font-bold font-display mb-2">{bg.name}</h3>
              <p className="text-sm text-white/50">{bg.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newly added characters & phenomena sections */}
      <BrandBookTypographyColors />
      <BrandBookPhenomena />
      <OceanGallery />
      <BrandBookSymbols />
      <BrandCharacters />

    </div>
  );
};

const ServiceSupportSection = () => {
  const [activeCall, setActiveCall] = useState<any>(null);
  const [sentimentHistory, setSentimentHistory] = useState<number[]>([]);
  
  useEffect(() => {
    if (!activeCall) {
      setActiveCall({
        id: 'CALL_ID: ' + Math.random().toString(36).substring(7).toUpperCase(),
        customer: 'Global Enterprise A',
        agent: 'Neural_Agent_v4',
        duration: '02:45',
        sentiment: 0.85,
        transcript: [
          { role: 'Customer', text: 'I am experiencing some latency with the neural integration in Sector 7.' },
          { role: 'Agent', text: 'I understand. I am re-routing the vector buffers to avoid the congested relay node.' },
          { role: 'Customer', text: 'That seems to be helping, thank you for the quick response!' }
        ]
      });
    }
    
    const interval = setInterval(() => {
      setSentimentHistory(prev => {
        const next = [...prev, (Math.random() * 0.4 + 0.6)];
        if (next.length > 20) return next.slice(1);
        return next;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [activeCall]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          <Headset className="w-8 h-8 text-blue-400" />
        </motion.div>
        <WritingTitle 
          text="Service & Support Matrix"
          className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter uppercase mb-6 justify-center"
        />
        <p className="text-white/40 font-mono text-xs uppercase tracking-[0.5em] max-w-2xl mx-auto mb-12">
          Autonomous sentiment parsing and real-time satisfaction telemetry.
        </p>
      </div>

      <div className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 pt-2 snap-x snap-mandatory custom-scrollbar md:grid md:grid-cols-1 lg:grid-cols-3 lg:pt-0 lg:pb-0 lg:overflow-visible my-8 items-stretch">
         {/* Main Sentiment Analyzer */}
         <div className="flex-none w-[85vw] sm:w-[500px] snap-center lg:w-auto lg:col-span-2 lg:col-start-1 lg:row-start-1 h-full">
          <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden group h-full flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">Live Analysis Active</span>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
               <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 88}
                      animate={{ strokeDashoffset: (1 - 0.88) * (2 * Math.PI * 88) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-4xl font-display font-black text-white">88%</span>
                     <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">Satisfaction Index</span>
                  </div>
                  {/* Neural waves effect */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 border border-blue-500/10 rounded-full scale-125 pointer-events-none" 
                  />
               </div>

               <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold uppercase text-white mb-4">Neural Sentiment Engine</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                    Our AI cross-analyzes voice modulation and chat linguistics in real-time, matching patterns against 14 million previous interactions to identify latent churn risks and satisfaction peaks.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-blue-400 font-mono text-[10px] uppercase mb-1">Tone Analysis</div>
                        <div className="text-white font-bold text-lg">EMPATHETIC</div>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-emerald-400 font-mono text-[10px] uppercase mb-1">Stress Level</div>
                        <div className="text-white font-bold text-lg">MINIMAL</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="h-32 w-full flex items-end gap-1 px-2">
               {sentimentHistory.map((v, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${v * 100}%` }}
                    className="flex-1 bg-gradient-to-t from-blue-600/20 via-blue-500/40 to-blue-400 rounded-t-sm"
                  />
               ))}
            </div>
            <div className="text-center mt-4 pt-4 border-t border-white/5">
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Historical Sentiment Waves (Live Feed)</span>
            </div>
          </div>
         </div>

         {/* Real-time Interaction Log */}
         <div className="flex-none w-[85vw] sm:w-[500px] snap-center lg:w-auto lg:col-span-2 lg:col-start-1 lg:row-start-2 h-full">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#050510] border border-white/5 relative group h-full flex flex-col justify-between">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="p-2 rounded-lg bg-white/5">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                   </div>
                   <h4 className="font-display font-medium text-white uppercase tracking-widest text-sm">Active Neural Logs</h4>
                </div>
                <div className="flex gap-2">
                   <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-widest">{activeCall?.id}</div>
                </div>
             </div>

             <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {activeCall?.transcript.map((line: any, i: number) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.2 }}
                     className={`flex flex-col gap-1 ${line.role === 'Agent' ? 'items-end' : 'items-start'}`}
                   >
                      <span className={`text-[8px] font-mono uppercase tracking-[0.2em] mb-1 ${line.role === 'Agent' ? 'text-blue-400' : 'text-emerald-400'}`}>
                         {line.role}
                      </span>
                      <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                         line.role === 'Agent' 
                         ? 'bg-blue-500/10 border border-blue-500/20 text-blue-100 rounded-tr-none' 
                         : 'bg-white/5 border border-white/10 text-white/70 rounded-tl-none'
                      }`}>
                         {line.text}
                      </div>
                   </motion.div>
                ))}
             </div>
             <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                         <User className="w-4 h-4 text-white/30" />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center backdrop-blur-md">
                         <Bot className="w-4 h-4 text-blue-400" />
                      </div>
                   </div>
                   <div className="text-left">
                      <div className="text-[10px] font-mono text-white font-bold uppercase">{activeCall?.customer}</div>
                      <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Secured Interaction Layer 4.2</div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <Mic className="w-4 h-4 text-blue-400" />
                   <Volume2 className="w-4 h-4 text-white/20 hover:text-white transition-colors cursor-pointer" />
                </div>
             </div>
          </div>
         </div>

         {/* Analysis Explanation */}
         <div className="flex-none w-[85vw] sm:w-[400px] snap-center lg:w-auto lg:col-span-1 lg:col-start-3 lg:row-start-1 h-full">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 relative overflow-hidden group h-full flex flex-col">
             <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
                <Zap className="w-12 h-12 text-blue-400" />
             </div>
             <h4 className="text-lg font-display font-bold uppercase text-white mb-6 tracking-wide">How it works</h4>
             <ul className="space-y-6">
                <li className="flex gap-4">
                   <div className="p-2 rounded-lg bg-blue-500/20 h-fit">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                   </div>
                   <div>
                      <h5 className="text-[10px] font-mono font-black uppercase text-white tracking-widest mb-1">Acoustic Logic</h5>
                      <p className="text-[11px] text-white/50 leading-relaxed">Analyzes speech pitch, tempo, and resonance to identify frustration patterns before they manifest.</p>
                   </div>
                </li>
                <li className="flex gap-4">
                   <div className="p-2 rounded-lg bg-purple-500/20 h-fit">
                      <ScanText className="w-4 h-4 text-purple-400" />
                   </div>
                   <div>
                      <h5 className="text-[10px] font-mono font-black uppercase text-white tracking-widest mb-1">Linguistic Vectors</h5>
                      <p className="text-[11px] text-white/50 leading-relaxed">Cross-references transcript data with active intent graphs to predict customer churn probability.</p>
                   </div>
                </li>
                <li className="flex gap-4">
                   <div className="p-2 rounded-lg bg-emerald-500/20 h-fit">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                   </div>
                   <div>
                      <h5 className="text-[10px] font-mono font-black uppercase text-white tracking-widest mb-1">Risk Flagging</h5>
                      <p className="text-[11px] text-white/50 leading-relaxed">Automatic alerts sent to supervisors when sentiment drops below the 0.4 criticality threshold.</p>
                   </div>
                </li>
             </ul>
          </div>
         </div>

         {/* Pricing Suggestion */}
         <div className="flex-none w-[85vw] sm:w-[400px] snap-center lg:w-auto lg:col-span-1 lg:col-start-3 lg:row-start-2 h-full">
          <div className="p-8 rounded-[2.5rem] bg-indigo-950/20 border border-white/5 relative group h-full flex flex-col justify-between hover:border-blue-500/20 transition-colors">
             <div className="text-center mb-8">
                <div className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em] mb-2 font-bold italic">Neural Licensing</div>
                <h4 className="text-xl font-display font-black uppercase tracking-tighter text-white">Sentiment Core Pricing</h4>
             </div>
             <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group/p relative overflow-hidden">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Per Agent Seat</span>
                      <span className="text-lg font-display font-black text-blue-400 italic font-display">$85<span className="text-[10px] font-mono opacity-50 uppercase tracking-tighter">/mo</span></span>
                   </div>
                   <p className="text-[10px] text-white/40 leading-relaxed pr-8">Best for dedicated support teams requiring deep long-term relationship analysis.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors group/p relative overflow-hidden">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-widest">Per Interaction</span>
                      <span className="text-lg font-display font-black text-emerald-400 italic font-display">$0.12<span className="text-[10px] font-mono opacity-50 uppercase tracking-tighter">/hit</span></span>
                   </div>
                   <p className="text-[10px] text-white/40 leading-relaxed pr-8">Optimized for elastic scaling and volatile ticket volumes across multiple departments.</p>
                </div>
             </div>
             <button className="w-full mt-8 py-4 rounded-xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_15px_30px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] transition-all italic flex items-center justify-center gap-3">
                Request Protocol Access <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const { scrollYProgress } = useScroll();
  // PERF: looser restDelta + lower stiffness slightly reduces spring update
  // frequency without changing the perceived smoothness of scroll-linked
  // animations. restDelta:0.01 means the spring "settles" earlier and
  // stops emitting updates, killing dozens of micro re-renders per scroll.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 22, mass: 0.8, restDelta: 0.01 });

  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, _setActiveTab] = useState(() => URL_TO_TAB[location.pathname] || 'home');

  // Sync URL → activeTab + document.title + meta description + canonical + OG
  useEffect(() => {
    const path = location.pathname;
    const tab = URL_TO_TAB[path] || 'home';
    _setActiveTab(tab);
    const title = PAGE_TITLES[path] || PAGE_TITLES['/'];
    const desc = PAGE_DESCRIPTIONS[path] || PAGE_DESCRIPTIONS['/'];
    document.title = title;
    const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
      const el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (el) (el as any)[attr] = value;
    };
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('link[rel="canonical"]', 'href', `https://dscope.targetbob.ai${path === '/' ? '/' : path}`);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', `https://dscope.targetbob.ai${path === '/' ? '/' : path}`);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', desc);
  }, [location.pathname]);

  // Wrap setActiveTab to navigate (URL is the source of truth)
  const setActiveTab = React.useCallback((tab: string) => {
    const url = TAB_TO_URL[tab] || '/';
    navigate(url);
  }, [navigate]);
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [globalBg, setGlobalBg] = useState<'galaxy' | 'oceanHorizon' | 'mars' | 'deepOcean' | 'molecules' | 'microchips'>('galaxy');
  const [isLoaded, setIsLoaded] = useState(false);

  // Infinite Scroll State
  const [displayServices, setDisplayServices] = useState<Service[]>(SERVICES_DATA);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (isInfiniteLoading) return;
    setIsInfiniteLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const nextBatch = SERVICES_DATA.map(service => ({
        ...service,
        id: (parseInt(service.id) + displayServices.length).toString().padStart(2, '0')
      }));
      setDisplayServices(prev => [...prev, ...nextBatch]);
      setIsInfiniteLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && isLoaded && activeTab === 'home') {
        loadMore();
      }
    }, { threshold: 0.1 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded, activeTab, isInfiniteLoading, displayServices.length]);

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => setIsLoaded(true), 4000);

    // Global smooth scroll for internal links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        
        const targetElement = document.getElementById(href.slice(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      } else if (link.hash && link.origin === window.location.origin) {
        const targetElement = document.getElementById(link.hash.slice(1));
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', link.hash);
        }
      }
    };

    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('click', handleLinkClick);
    }

    // PERF: tag <body> with .is-hidden when the tab is in the background
    // so the CSS rule in index.css can pause every keyframes animation.
    // Avoids burning GPU on parallax/blink/pulse loops while the user is
    // on another tab.
    const handleVisibility = () => {
      if (typeof document === 'undefined') return;
      if (document.hidden) {
        document.body.classList.add('is-hidden');
      } else {
        document.body.classList.remove('is-hidden');
      }
    };
    handleVisibility();
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('visibilitychange', handleVisibility);
    }

    return () => {
      clearTimeout(timer);
      if (typeof document !== 'undefined' && document.removeEventListener) {
        document.removeEventListener('click', handleLinkClick);
        document.removeEventListener('visibilitychange', handleVisibility);
      }
    };
  }, []);

  useEffect(() => {
    logger.info("Application context initialized", { version: "1.0.0" });
    
    // Ensure activeTab is valid if feature flag changed
    if (activeTab === 'case-studies' && !featureFlags.isEnabled('CASE_STUDIES_ENABLED')) {
      setActiveTab('home');
    }
  }, []);

  useEffect(() => {
    logger.info("Active tab changed", { tab: activeTab });
  }, [activeTab]);

  const tabs = useMemo(() => {
    return NAV_TABS.filter(tab => {
      if (tab.id === 'case-studies') return featureFlags.isEnabled('CASE_STUDIES_ENABLED');
      return true;
    });
  }, []);

  return (
    <div id="page-top" className="min-h-screen text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatePresence>
        {!isLoaded && <GlobalLoader key="global-loader" progress={scrollYProgress} />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Accessibility Skip Link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] outline-none ring-2 ring-white ring-offset-2 ring-offset-blue-600"
        >
          Skip to main content
        </a>

        {/* Global Background */}
        {(globalBg === 'galaxy' && !['command-hub', 'about', 'case-studies', 'dashboard', 'vision', 'industries'].includes(activeTab)) && <GalaxyBackground />}
        {(globalBg === 'oceanHorizon' && !['command-hub', 'about', 'case-studies', 'dashboard', 'vision', 'industries'].includes(activeTab)) && <OceanHorizonBackground />}
        {activeTab === 'about' && <GalaxyAboutBackground />}
        {(globalBg === 'mars' && !['command-hub', 'about', 'case-studies', 'dashboard', 'vision', 'industries'].includes(activeTab)) && <MarsBackground />}
        {(globalBg === 'deepOcean' && !['command-hub', 'about', 'case-studies', 'dashboard', 'vision', 'industries'].includes(activeTab)) && <DeepOceanBackground />}
        {activeTab === 'dashboard' && <NebulaBackground />}
        {((globalBg === 'molecules' && !['command-hub', 'about', 'case-studies', 'dashboard', 'vision', 'industries'].includes(activeTab)) || activeTab === 'case-studies') && <MoleculesBackground />}
        {((globalBg === 'microchips' && !['command-hub', 'about', 'case-studies', 'dashboard', 'vision', 'industries'].includes(activeTab)) || activeTab === 'command-hub' || activeTab === 'industries') && <MicrochipsBackground />}

        {/* Background Decorative Element */}
        <SatelliteNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          hoveredTab={hoveredTabId}
          setHoveredTab={setHoveredTabId}
          isOpen={isNavOpen}
          setIsOpen={setIsNavOpen}
          progress={scrollYProgress}
          tabs={tabs}
        />

        <header className="fixed top-8 left-6 md:left-12 md:top-12 z-[1005]" role="banner">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Go to DeltaScope home"
            className="cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          >
            <Logo className="scale-100 origin-left" cycling aria-label="DeltaScope Corporate Home" />
          </button>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
          <motion.main
            key="home"
            role="main"
            id="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 md:pt-32 pb-10 md:pb-20 relative"
          >
            <PinnedScrollSection height="h-[150vh]" innerClassName="flex flex-col justify-center">
              <HeroContent />
            </PinnedScrollSection>

            <IndustryAutomation />
            
            {/* Seamless Gradient Transition to Schematic */}
            <div className="relative h-64 w-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
            
            <InViewGate minHeight="100vh">
              <SecretarialBlueprint />
            </InViewGate>

            <InViewGate minHeight="150vh">
              <div className="relative" id="orbital-dispatch">
                 {/* Translucent separator with gradient glow */}
                 <div className="h-40 w-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

                 {/* Background Glow for Contrast */}
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-blue-600/5 blur-[120px] pointer-events-none" aria-hidden="true" />
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" aria-hidden="true" />

                 <div className="relative z-10">
                   <WritingTitle
                       text="Neural Integration Node"
                       className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-blue-400 uppercase tracking-tighter mb-16 justify-center"
                       lightning={true}
                       pulse={true}
                   />
                   {/* Clicking the satellite hub scrolls to the Verified Signal
                       block below — same target as the floating astronaut. */}
                   <div
                     role="button"
                     tabIndex={0}
                     className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-2xl"
                     onClick={() => {
                       const el = document.getElementById('home-testimonials');
                       if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' || e.key === ' ') {
                         e.preventDefault();
                         const el = document.getElementById('home-testimonials');
                         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                       }
                     }}
                     aria-label="Scroll to Verified Signal client results"
                   >
                     <LunarCommandHub />
                   </div>
                 </div>
              </div>
            </InViewGate>
            {/* Verified Signal — the same 4-card real-client block used on
                /case-studies (per Katia). The scroll-to anchor lives on the
                OUTER wrapper so it's always in the DOM, even before
                InViewGate has lazily mounted the cards. */}
            <div id="home-testimonials">
              <InViewGate minHeight="80vh">
                <RealClientCases />
              </InViewGate>
            </div>
            <InViewGate minHeight="80vh">
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
                className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12"
              >
                {[
                  { title: 'Precision Target', desc: 'Identify operational inefficiencies with sub-millimeter data accuracy using our proprietary neural kernels.', type: 'robot' },
                  { title: 'Galactic Reach', desc: 'Seamlessly deploy automation clusters across multi-region cloud infrastructures without latency penalties.', type: 'spaceship' },
                  { title: 'Quantum Logic', desc: 'Our decision engines process multi-variate corporate structures in real-time, anticipating markets before they shift.', type: 'ufo' },
                ].map((feature, i) => (
                  <FeatureObjectCard key={i} index={i} feature={feature} />
                ))}
              </motion.section>
            </InViewGate>
          </motion.main>
        )}

        {activeTab === 'vision' && (
          <VisionSection smoothProgress={smoothProgress} scrollYProgress={scrollYProgress} />
        )}
        {activeTab === 'industries' && (
          <IndustriesSection scrollYProgress={scrollYProgress} />
        )}

        {activeTab === 'command-hub' && (
          <motion.main
            key="command-hub"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="pt-20 min-h-screen"
          >
            <PlatformIntroSection />
            <StrategicVisionSection />
          </motion.main>
        )}
        {activeTab === 'dashboard' && (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-20 pb-10 relative overflow-hidden"
          >
            <PinnedScrollSection height="h-[115vh]" innerClassName="max-w-7xl mx-auto px-6 flex flex-col justify-center">
              <DashboardHeader />
            </PinnedScrollSection>
            <AutomationDashboard />
          </motion.main>
        )}

        {activeTab === 'services' && (
          <motion.main
            key="services"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-32 pb-10 relative overflow-hidden"
          >
            <PinnedScrollSection height="h-[300vh]" innerClassName="max-w-7xl mx-auto px-6 flex flex-col justify-center">
              <ServicesHeader />
            </PinnedScrollSection>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-12"
            >
              {displayServices.map((service, i) => (
                <ServiceItem key={`${service.id}-${i}`} service={service} i={i} />
              ))}
            </motion.div>

            {/* Infinite Scroll Loader */}
            <div ref={loaderRef} className="py-20 flex flex-col items-center justify-center space-y-4">
              <AnimatePresence>
                {isInfiniteLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
                      Syncing next innovation packet...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              {!isInfiniteLoading && (
                <div className="flex items-center space-x-2 text-blue-400/30">
                  <div className="w-12 h-[1px] bg-blue-400/20" />
                  <span className="text-[10px] font-mono tracking-[0.2em]">END OF BUFFER - SCROLL TO INITIATE RELOAD</span>
                  <div className="w-12 h-[1px] bg-blue-400/20" />
                </div>
              )}
            </div>
            
            <InViewGate minHeight="80vh">
              <IntegrationsShowcase />
            </InViewGate>
          </motion.main>
        )}

        {activeTab === 'about' && (
          <motion.main
            key="about"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="pt-24 md:pt-32 pb-10"
          >
            <div className="max-w-5xl mx-auto px-4 md:px-6 text-center flex flex-col justify-center relative min-h-[50vh] py-20">
              <AboutHeader />
            </div>

            <TeamSection />

            <DataClusterGallery />
          </motion.main>
        )}

        {activeTab === 'service-support' && (
          <motion.main
            key="service-support"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="pt-32 pb-20"
          >
            <ServiceSupportSection />
          </motion.main>
        )}

        {activeTab === 'pricing' && (
          <motion.main
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Pricing />
          </motion.main>
        )}

        {activeTab === 'case-studies' && featureFlags.isEnabled('CASE_STUDIES_ENABLED') && (
          <CaseStudies />
        )}

        {activeTab === 'brand-book' && (
          <motion.main
            key="brand-book"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="pt-32 pb-20"
          >
            <BrandBook globalBg={globalBg} setGlobalBg={setGlobalBg} />
          </motion.main>
        )}

        {activeTab === 'contact' && (
          <motion.main
            key="contact"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="pt-16"
          >
            <ContactPlaceholder />
          </motion.main>
        )}
      </AnimatePresence>

      {activeTab === 'home' && (
        <InViewGate minHeight="80vh" rootMargin="600px 0px">
          <CollaborationDiorama />
        </InViewGate>
      )}
      <footer className="py-12 px-6 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-6 w-full md:w-auto items-center md:items-start">
            <Logo className="scale-110 md:scale-100" />
            <p className="text-white/60 max-w-xs font-mono text-xs uppercase tracking-widest leading-relaxed text-center md:text-left">
              Industry scale AI infrastructure. Architected for the future of enterprise.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-6">Contact</h5>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <a href="#" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline">Dossier Request</a>
                <a href="#" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline">Direct Link</a>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 mb-6">Legal</h5>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <a href="#" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline">Security Audit</a>
                <a href="#" className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:text-blue-400 focus-visible:underline">Protocol</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <VoiceWidget />
      </motion.div>
    </div>
  );
}
