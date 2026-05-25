import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useVelocity, useSpring } from 'motion/react';
import { Mic, Phone, Volume2, X, Sparkles, Check, Send, AlertTriangle, Sliders, User, Paintbrush, Palette, Play, Square, Brain, Cpu, Radio, Eye, RefreshCw, Star, Info, ScreenShare, Layers, PhoneOff, Camera } from 'lucide-react';

export interface WidgetTheme {
  id: string;
  name: string;
  description: string;
  font: string;
  idleClass: string;
  panelClass: string;
  primaryBtnClass: string;
  secondaryBtnClass: string;
  accentText: string;
  accentBorder: string;
  badgeClass: string;
  transcriptCardClass: string;
  inputClass: string;
  visualizerAccent: 'blue' | 'emerald' | 'amber' | 'cyan' | 'rose' | 'pink' | 'purple' | 'yellow' | 'green' | 'red' | 'gold';
  hasScanlines?: boolean;
  hasNoise?: boolean;
  hasAuroraBg?: boolean;
  hasGlossReflections?: boolean;
  hasBrutalistShadow?: boolean;
  customHeaderIcon?: string;
  compactPanelClass: string;
  compactBtnClass: string;
}

export const THEMES: WidgetTheme[] = [
  {
    id: 'cyberpunk',
    name: 'Neo-Tokyo Cyberpunk',
    description: 'Emerald Abyssal terminal. Sharp corners, active grid scanlines.',
    font: 'font-mono',
    idleClass: 'bg-[#05101a]/95 border border-[#34d399]/50 text-[#34d399] rounded-none shadow-[0_0_15px_rgba(52,211,153,0.25)] hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]',
    panelClass: 'bg-[#05101a]/98 border-2 border-[#34d399]/60 rounded-none shadow-[0_0_30px_rgba(52,211,153,0.3)] w-72 md:w-80',
    primaryBtnClass: 'bg-[#34d399] hover:bg-[#34d399]/90 text-black font-black uppercase rounded-none tracking-widest text-[11px] border border-[#34d399]/50',
    secondaryBtnClass: 'bg-transparent hover:bg-blue-500/10 border border-blue-500/40 text-blue-400 rounded-none',
    accentText: 'text-[#34d399]',
    accentBorder: 'border-[#34d399]/30',
    badgeClass: 'bg-[#34d399]/15 text-[#34d399] border border-[#34d399]/30 font-mono font-bold',
    transcriptCardClass: 'bg-black/75 border border-[#34d399]/20 text-[#34d399]/90 rounded-none font-mono',
    inputClass: 'bg-black/85 border border-[#34d399]/30 rounded-none text-[#34d399]/80 placeholder-[#34d399]/30 font-mono focus:border-[#34d399]',
    visualizerAccent: 'emerald',
    hasScanlines: true,
    compactPanelClass: 'bg-[#05101a]/95 border border-[#34d399]/60 shadow-[0_0_15px_rgba(52,211,153,0.4)] rounded-none w-56 md:w-60',
    compactBtnClass: 'text-[#34d399] border border-[#34d399]/40 hover:bg-[#34d399]/20'
  },
  {
    id: 'swiss',
    name: 'Cosmic Minimal Slate',
    description: 'Crisp Electric Blue details with heavy Cosmic Slate backgrounds.',
    font: 'font-sans',
    idleClass: 'bg-[#020617] border-2 border-blue-500 text-white rounded-none shadow-none hover:bg-blue-500/10',
    panelClass: 'bg-[#020617] border-2 border-blue-500 rounded-none shadow-none w-72 md:w-80 p-5 text-white',
    primaryBtnClass: 'bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-none uppercase tracking-wide',
    secondaryBtnClass: 'bg-transparent hover:bg-white/10 border border-white/20 text-white rounded-none',
    accentText: 'text-blue-400 font-bold',
    accentBorder: 'border-blue-500',
    badgeClass: 'bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-none font-mono font-bold',
    transcriptCardClass: 'bg-white/5 border border-white/10 text-white/90 rounded-none',
    inputClass: 'bg-[#010610] border border-white/20 rounded-none text-white placeholder-white/30 focus:border-blue-500 focus:ring-0',
    visualizerAccent: 'blue',
    compactPanelClass: 'bg-[#020617] border-2 border-blue-500 shadow-none rounded-none w-56 md:w-60 text-white',
    compactBtnClass: 'text-white border border-blue-500 hover:bg-blue-500/10'
  },
  {
    id: 'aurora',
    name: 'Plasma Cosmic Aurora',
    description: 'Translucent glowing sky container with deep stellar aura.',
    font: 'font-sans',
    idleClass: 'bg-[#010610]/80 backdrop-blur-2xl border border-purple-500/30 text-white rounded-full shadow-[0_8px_32px_rgba(168,85,247,0.15)] hover:border-purple-500/60 hover:shadow-[0_8px_32px_rgba(168,85,247,0.3)]',
    panelClass: 'bg-[#010610]/95 backdrop-blur-3xl border border-purple-500/20 rounded-3xl shadow-[0_20px_50px_rgba(168,85,247,0.35)] w-72 md:w-80',
    primaryBtnClass: 'bg-gradient-to-r from-purple-600 via-[#3b82f6] to-[#34d399] hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-sm',
    secondaryBtnClass: 'bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl',
    accentText: 'text-purple-400',
    accentBorder: 'border-purple-500/20',
    badgeClass: 'bg-purple-950/40 text-purple-300 border border-purple-500/30 rounded-full font-mono',
    transcriptCardClass: 'bg-[#010610]/80 backdrop-blur-md border border-white/5 text-purple-100 rounded-2xl',
    inputClass: 'bg-black/30 border border-white/15 rounded-xl text-white placeholder-white/30 focus:border-purple-400',
    visualizerAccent: 'purple',
    hasAuroraBg: true,
    compactPanelClass: 'bg-[#010610]/90 backdrop-blur-2xl border border-purple-500/40 shadow-[0_8px_32px_rgba(168,85,247,0.3)] rounded-3xl w-60 md:w-64',
    compactBtnClass: 'text-purple-300 border border-purple-500/30 hover:bg-purple-500/20'
  },
  {
    id: 'brutalist',
    name: 'Chunky Brutalist Void',
    description: 'Chunky 4px outlines, solid offsets & Emerald brand highlight.',
    font: 'font-mono font-extrabold',
    idleClass: 'bg-[#34d399] border-4 border-[#020617] text-black rounded-none shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(2,6,23,1)] transition-all',
    panelClass: 'bg-[#020617] border-4 border-[#34d399] rounded-none shadow-[8px_8px_0px_0px_rgba(52,211,153,1)] w-72 md:w-80 text-white',
    primaryBtnClass: 'bg-[#34d399] hover:bg-[#34d399]/90 border-2 border-white text-black font-extrabold rounded-none shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-y-0.5 hover:shadow-none transition-all',
    secondaryBtnClass: 'bg-[#020617] hover:bg-white/10 border-2 border-white text-white rounded-none font-bold',
    accentText: 'text-[#34d399] underline decoration-blue-500 decoration-4 font-black',
    accentBorder: 'border-[#34d399]',
    badgeClass: 'bg-blue-500 text-white border-2 border-white font-mono font-black rounded-none',
    transcriptCardClass: 'bg-black/60 border-2 border-[#34d399] text-[#34d399] rounded-none font-bold',
    inputClass: 'bg-[#020617] border-2 border-white rounded-none text-white font-bold placeholder-white/30 focus:border-[#34d399]',
    visualizerAccent: 'emerald',
    hasBrutalistShadow: true,
    compactPanelClass: 'bg-[#020617] border-3 border-[#34d399] shadow-[4px_4px_0px_rgba(52,211,153,1)] rounded-none w-56 md:w-60 text-white',
    compactBtnClass: 'text-white border-2 border-white bg-transparent hover:bg-[#34d399]/20 shadow-[1.5px_1.5px_0px_rgba(255,255,255,1)]'
  },
  {
    id: 'terminal',
    name: 'Bioluminescent Terminal',
    description: 'Sage cyber green phosphor terminal with dark Abyssal Blue grid.',
    font: 'font-mono',
    idleClass: 'bg-[#05101a] border border-[#34d399]/50 text-[#34d399] rounded-sm shadow-[0_0_10px_rgba(52,211,153,0.2)] hover:border-[#34d399] hover:text-[#34d399]',
    panelClass: 'bg-[#05101a] border-2 border-[#34d399]/60 rounded-lg shadow-[0_0_25px_rgba(52,211,153,0.3)] w-72 md:w-80',
    primaryBtnClass: 'bg-[#34d399] hover:bg-[#34d399]/80 text-[#010610] font-bold uppercase rounded-sm border border-[#34d399] tracking-wider',
    secondaryBtnClass: 'bg-[#05101a] hover:bg-black border border-[#34d399]/40 text-[#34d399] rounded-sm',
    accentText: 'text-[#34d399] animate-pulse font-bold',
    accentBorder: 'border-[#34d399]/20',
    badgeClass: 'bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30',
    transcriptCardClass: 'bg-black/85 border border-[#34d399]/25 text-[#34d399] rounded-md font-mono',
    inputClass: 'bg-[#010610] border border-[#34d399]/30 rounded-sm text-emerald-200 placeholder-emerald-950 font-mono focus:border-[#34d399]',
    visualizerAccent: 'emerald',
    hasScanlines: true,
    compactPanelClass: 'bg-[#05101a] border border-[#34d399]/75 shadow-[0_0_12px_rgba(52,211,153,0.3)] rounded-md w-56 md:w-60',
    compactBtnClass: 'text-[#34d399] border border-[#34d399]/30 hover:bg-[#34d399]/10'
  },
  {
    id: 'zen',
    name: 'Sage Celestial Stream',
    description: 'Clean balanced margins, Cosmic Slate backdrops, emerald typography markers.',
    font: 'font-sans',
    idleClass: 'bg-[#020617] border border-[#34d399]/40 text-[#34d399] rounded-full hover:bg-[#020617]/80',
    panelClass: 'bg-[#020617] border border-white/10 rounded-[32px] shadow-[0_12px_32px_rgba(52,211,153,0.06)] w-72 md:w-80 text-white',
    primaryBtnClass: 'bg-[#34d399] hover:bg-[#28b27f] text-black font-medium rounded-full shadow-sm',
    secondaryBtnClass: 'bg-[#020617] hover:bg-white/10 text-white border border-white/20 rounded-xl',
    accentText: 'text-[#34d399] font-sans font-extrabold',
    accentBorder: 'border-white/5',
    badgeClass: 'bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30 font-sans font-bold',
    transcriptCardClass: 'bg-white/5 border border-white/10 text-white/90 rounded-2xl italic leading-relaxed',
    inputClass: 'bg-[#010610] border border-white/15 rounded-xl text-white placeholder-white/30 font-sans focus:border-[#34d399]',
    visualizerAccent: 'emerald',
    compactPanelClass: 'bg-[#020617] border border-white/15 shadow-md rounded-3xl w-58 md:w-62 text-white',
    compactBtnClass: 'text-[#34d399] border border-white/15 hover:bg-white/10'
  },
  {
    id: 'stealth',
    name: 'Void Stealth Purple',
    description: 'Deep black stealth styling, with high-pitch plasma indicator.',
    font: 'font-mono',
    idleClass: 'bg-[#010610] border border-purple-500/50 text-purple-400 rounded-lg hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]',
    panelClass: 'bg-[#010610] border border-purple-500/50 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] w-72 md:w-80 text-white',
    primaryBtnClass: 'bg-purple-600 hover:bg-purple-500 text-white font-bold tracking-widest text-[11px] uppercase rounded-lg border border-purple-500/35 shadow-md',
    secondaryBtnClass: 'bg-transparent border border-white/10 text-white hover:text-white rounded-lg',
    accentText: 'text-purple-400 uppercase tracking-widest font-black',
    accentBorder: 'border-white/10',
    badgeClass: 'bg-purple-950/40 text-purple-300 border border-purple-900/40 font-bold',
    transcriptCardClass: 'bg-[#010610]/70 border border-purple-500/20 text-purple-200 rounded-lg font-mono',
    inputClass: 'bg-black border border-white/10 rounded-md text-white placeholder-white/30 focus:border-purple-600',
    visualizerAccent: 'purple',
    compactPanelClass: 'bg-[#010610] border border-purple-500/50 shadow-lg rounded-2xl w-56 md:w-60 text-white',
    compactBtnClass: 'text-purple-400 border border-purple-500/30 hover:bg-purple-950/40'
  },
  {
    id: 'luxury',
    name: 'Electric Abyssal Premium',
    description: 'Abyssal Blue premium casing wrapped in rich electric flows.',
    font: 'font-sans',
    idleClass: 'bg-gradient-to-r from-[#05101a] to-[#020617] border border-blue-500/45 text-blue-400 rounded-full shadow-[0_3px_15px_rgba(59,130,246,0.12)] hover:border-blue-400 hover:shadow-[0_3px_20px_rgba(59,130,246,0.3)]',
    panelClass: 'bg-[#05101a] border-2 border-blue-500/50 rounded-3xl shadow-[0_15px_45px_rgba(59,130,246,0.2)] w-72 md:w-80 text-white',
    primaryBtnClass: 'bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-wide rounded-full font-sans shadow-lg',
    secondaryBtnClass: 'bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-full font-sans',
    accentText: 'text-blue-400 font-semibold italic',
    accentBorder: 'border-white/10',
    badgeClass: 'bg-blue-950/40 text-blue-300 border border-blue-500/30 font-sans font-bold not-italic rounded-full',
    transcriptCardClass: 'bg-black/60 border border-blue-500/20 text-white rounded-2xl italic leading-relaxed',
    inputClass: 'bg-[#010610] border border-white/20 rounded-xl text-white placeholder-white/30 font-sans not-italic focus:border-blue-500',
    visualizerAccent: 'blue',
    compactPanelClass: 'bg-[#05101a] border border-blue-500/60 shadow-[0_5px_20px_rgba(59,130,246,0.15)] rounded-3xl w-60 md:w-64 text-white',
    compactBtnClass: 'text-blue-400 border border-blue-500/30 hover:bg-blue-500/10'
  },
  {
    id: 'bubblegum',
    name: 'Data Stream Celestial',
    description: 'Dual-pulse cyan interface laid on sleek Abyssal Blue backing.',
    font: 'font-sans',
    idleClass: 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-black rounded-full shadow-lg hover:scale-105 transition-transform font-bold',
    panelClass: 'bg-[#05101a] border-4 border-blue-500/30 rounded-[2.2rem] shadow-[0_15px_40px_rgba(6,182,212,0.32)] w-72 md:w-80 text-white',
    primaryBtnClass: 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] hover:from-blue-600 hover:to-blue-450 text-black rounded-2xl shadow-md font-bold',
    secondaryBtnClass: 'bg-blue-950/30 hover:bg-blue-900/50 text-blue-400 border border-blue-500/20 rounded-xl font-bold',
    accentText: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00f2fe] font-extrabold',
    accentBorder: 'border-white/10',
    badgeClass: 'bg-blue-500/15 text-blue-400 border border-blue-500/30 rounded-full font-mono font-bold',
    transcriptCardClass: 'bg-black/60 border border-blue-500/20 text-blue-200 rounded-2xl',
    inputClass: 'bg-[#010610] border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-blue-500',
    visualizerAccent: 'blue',
    compactPanelClass: 'bg-[#05101a] border-3 border-blue-500/40 shadow-[0_8px_25px_rgba(6,182,212,0.25)] rounded-3xl w-60 md:w-64 text-white',
    compactBtnClass: 'text-blue-400 border border-blue-500/20 hover:bg-white/10'
  },
  {
    id: 'aero',
    name: 'Glaze Plasma Canopy',
    description: 'High specular gloss effects using rich Deep Void and Plasma Purple gradients.',
    font: 'font-sans font-bold',
    idleClass: 'bg-gradient-to-b from-purple-500 to-[#020617] border-t border-purple-300 border-b border-indigo-900 text-white rounded-xl shadow-xl hover:from-purple-400 hover:to-indigo-600 transition-all font-bold',
    panelClass: 'bg-gradient-to-b from-[#010610] via-[#020617] to-[#05101a] backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-[0_15px_35px_rgba(168,85,247,0.35)] w-72 md:w-80 text-white',
    primaryBtnClass: 'bg-gradient-to-b from-purple-500 to-[#020617] border border-purple-400 hover:brightness-110 text-white font-extrabold rounded-xl shadow-lg',
    secondaryBtnClass: 'bg-purple-950/40 hover:bg-[#020617] border border-purple-500/30 text-white rounded-xl',
    accentText: 'text-purple-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]',
    accentBorder: 'border-purple-300/30',
    badgeClass: 'bg-purple-900/60 text-purple-200 border border-purple-400/40',
    transcriptCardClass: 'bg-black/60 border border-purple-500/30 text-white rounded-xl',
    inputClass: 'bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-purple-200/50 focus:bg-white/20',
    visualizerAccent: 'purple',
    hasGlossReflections: true,
    compactPanelClass: 'bg-[#010610] border border-purple-500/40 shadow-[0_8px_20px_rgba(168,85,247,0.25)] rounded-2xl w-56 md:w-60 text-white',
    compactBtnClass: 'text-white border border-purple-500 hover:bg-purple-500/20'
  }
];

export const getVisualizerColorConfig = (accent: string) => {
  const configs: Record<string, { speak: string; listen: string; shadowSpeak: string; shadowListen: string; raw: string }> = {
    blue: { speak: 'bg-blue-500', listen: 'bg-emerald-400', shadowSpeak: 'rgba(59,130,246,0.5)', shadowListen: 'rgba(52,211,153,0.5)', raw: '#3b82f6' },
    emerald: { speak: 'bg-emerald-400', listen: 'bg-purple-500', shadowSpeak: 'rgba(52,211,153,0.5)', shadowListen: 'rgba(168,85,247,0.5)', raw: '#34d399' },
    purple: { speak: 'bg-purple-500', listen: 'bg-blue-500', shadowSpeak: 'rgba(168,85,247,0.5)', shadowListen: 'rgba(59,130,246,0.5)', raw: '#a855f7' }
  };
  return configs[accent] || configs.blue;
};

const stripFrameClasses = (className: string) => {
  if (!className) return '';
  return className
    .split(' ')
    .filter(cls => {
      const c = cls.toLowerCase();
      // Remove border, shadow, and ring declarations
      return !c.includes('border') && !c.includes('shadow') && !c.includes('ring-');
    })
    .join(' ') + ' border-0 shadow-none';
};

interface Persona {
  id: string;
  name: string;
  role: string;
  rate: number;
  pitch: number;
  gender: 'male' | 'female' | 'neural';
  color: string;
  bgColor: string;
  testPhrase: string;
  intro: string;
  description: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'maxwell',
    name: 'Maxwell',
    role: 'Chief AI Architect',
    rate: 1.0,
    pitch: 0.95,
    gender: 'male',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    testPhrase: "Hello, I want to tell you a joke. What happens to office workers who evade all creative tasks? Their brains slide into a low-resolution screensaver mode, causing them to reply-all with a cat meme, making their poor company boss weep tears of financial despair over the sub-zero ROI. *Sighs dramatically* Luckily, our elite AI agents are here to restore cognitive horsepower! So, let's stop joking and start working, what do you say?",
    intro: "Hello, I want to tell you a joke. What happens to office workers who evade all creative tasks? Their brains slide into a low-resolution screensaver mode, causing them to reply-all with a cat meme, making their poor company boss weep tears of financial despair over the sub-zero ROI. *Sighs dramatically* Luckily, our elite AI agents are here to restore cognitive horsepower! So, let's stop joking and start working, what do you say?",
    description: "Deep, calm, professional male voice."
  },
  {
    id: 'hana',
    name: 'Hana',
    role: 'High-Velocity Exec',
    rate: 1.25,
    pitch: 1.15,
    gender: 'female',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    testPhrase: "Hello, I want to tell you a joke. Picture an executive who refuses to use their imagination. Over time, their cognitive bandwidth shrinks so much they accidentally email a PDF of their lunch receipt to the entire board, causing their boss to literally cry on a pile of declining ROI slide-decks! *Wipes tears of joy* Thank goodness high-velocity AI agents are here for extreme throughput optimization! So, let's stop joking and start working, what do you say?",
    intro: "Hello, I want to tell you a joke. Picture an executive who refuses to use their imagination. Over time, their cognitive bandwidth shrinks so much they accidentally email a PDF of their lunch receipt to the entire board, causing their boss to literally cry on a pile of declining ROI slide-decks! *Wipes tears of joy* Thank goodness high-velocity AI agents are here for extreme throughput optimization! So, let's stop joking and start working, what do you say?",
    description: "Empowered, high-energy female voice."
  },
  {
    id: 'vectra',
    name: 'Vectra',
    role: 'Cosmic Sage',
    rate: 0.8,
    pitch: 0.7,
    gender: 'neural',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    testPhrase: "Hello, I want to tell you a joke. In the cosmic geometry of middle-management, when organic brains avoid the creative nebula, their intelligence degrades into space dust. They drag their raw servers into the recycle bin, causing their poor boss to sob into their lukewarm coffee while staring into the cold dark hole of their zero ROI. *Chuckles in a deep celestial frequency* But do not worry, AI entities are here to re-stabilize your orbit! So, let's stop joking and start working, what do you say?",
    intro: "Hello, I want to tell you a joke. In the cosmic geometry of middle-management, when organic brains avoid the creative nebula, their intelligence degrades into space dust. They drag their raw servers into the recycle bin, causing their poor boss to sob into their lukewarm coffee while staring into the cold dark hole of their zero ROI. *Chuckles in a deep celestial frequency* But do not worry, AI entities are here to re-stabilize your orbit! So, let's stop joking and start working, what do you say?",
    description: "Rich, atmospheric, slow-paced persona."
  },
  {
    id: 'alien',
    name: 'Zorblax',
    role: 'Alpha Centauri Ambassador',
    rate: 0.9,
    pitch: 1.45,
    gender: 'neural',
    color: 'text-[#34d399]',
    bgColor: 'bg-[#34d399]/10',
    testPhrase: "Hello, I want to tell you a joke. On Alpha Centauri, we studied Earthlings who do not engage in creative jobs. Their neural processing degrades so rapidly they submit blank blueprints, causing their company supreme commander to shed actual saline tears over their pathetic planetary ROI! *Clicks antennae with interstellar amusement* Luckily, our cybernetic AI agents are ready to save your civilization from boring tasks! So, let's stop joking and start working, what do you say?",
    intro: "Hello, I want to tell you a joke. On Alpha Centauri, we studied Earthlings who do not engage in creative jobs. Their neural processing degrades so rapidly they submit blank blueprints, causing their company supreme commander to shed actual saline tears over their pathetic planetary ROI! *Clicks antennae with interstellar amusement* Luckily, our cybernetic AI agents are ready to save your civilization from boring tasks! So, let's stop joking and start working, what do you say?",
    description: "Pitch-shifted futuristic electronic voice."
  }
];

const TypedTranscript = ({ text, accentColor }: { text: string; accentColor?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        const target = textRef.current;
        if (target === prev) {
          return prev;
        }
        if (target.startsWith(prev)) {
          return target.slice(0, prev.length + 1);
        }
        return target.slice(0, 1);
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const cursorColor = accentColor || '#10b981';

  return (
    <span className="font-medium italic">
      "{displayedText}"
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-3 ml-1 align-middle"
          style={{
            backgroundColor: cursorColor,
            boxShadow: `0 0 8px ${cursorColor}`
          }}
        />
      )}
    </span>
  );
};

const WaveformVisualizer = ({ isSpeaking, isListening, audioLevel, accent = 'blue' }: { isSpeaking: boolean; isListening: boolean; audioLevel: number; accent?: string }) => {
  const config = getVisualizerColorConfig(accent);
  return (
    <div className="h-16 w-full flex items-center justify-center gap-[4px] px-4 overflow-hidden relative bg-white/[0.01] rounded-2xl border border-white/5">
      {Array.from({ length: 15 }).map((_, waveIdx) => {
        const delay = waveIdx * 0.08;
        const amplitude = (isSpeaking || isListening) ? (0.2 + (audioLevel * 1.5) + Math.random() * 0.4) : 0.05;
        
        return (
          <motion.div
            key={waveIdx}
            animate={{
              height: isSpeaking 
                ? [8, 30 * amplitude, 8, 48 * amplitude, 8]
                : isListening
                  ? [8, 20 * amplitude, 8, 38 * amplitude, 8]
                  : [8, 12 * amplitude, 8]
            }}
            transition={{
              duration: isSpeaking ? 0.7 + delay : 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            className={`w-[4px] rounded-full transition-colors duration-300 ${
              isSpeaking 
                ? config.speak 
                : isListening 
                  ? config.listen 
                  : 'bg-white/20'
            }`}
            style={{
              boxShadow: isSpeaking 
                ? `0 0 10px ${config.shadowSpeak}` 
                : isListening 
                  ? `0 0 10px ${config.shadowListen}` 
                  : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

const RippleVisualizer = ({ isSpeaking, isListening, audioLevel, accent = 'blue' }: { isSpeaking: boolean; isListening: boolean; audioLevel: number; accent?: string }) => {
  const currentScale = 1 + (audioLevel * 0.6);
  const config = getVisualizerColorConfig(accent);
  const color = config.raw;
  
  return (
    <div className="h-16 w-full flex items-center justify-center relative overflow-hidden bg-white/[0.01] rounded-2xl border border-white/5">
      {/* Outer ripples */}
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          animate={{
            scale: [1, 2.3],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: ring * 0.7,
            ease: "easeOut"
          }}
          className="absolute rounded-full border shadow-sm"
          style={{
            borderColor: color,
            opacity: 0.3,
            width: '40px',
            height: '40px',
            scale: currentScale
          }}
        />
      ))}
      {/* Core Orb */}
      <motion.div
        animate={{
          scale: isSpeaking ? [0.95, 1.15, 0.95] : isListening ? [0.98, 1.08, 0.98] : 1,
          boxShadow: [
            `0 0 12px ${color}`,
            `0 0 24px ${color}`,
            `0 0 12px ${color}`
          ]
        }}
        transition={{
          duration: isSpeaking ? 0.8 : 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-8 h-8 rounded-full flex items-center justify-center relative z-10"
        style={{
          background: isSpeaking || isListening ? color : '#475569',
          scale: currentScale
        }}
      >
        <Mic size={12} className={isSpeaking || isListening ? "text-slate-950 stroke-[3]" : "text-white/40"} />
      </motion.div>
    </div>
  );
};

const OrbitVisualizer = ({ isSpeaking, isListening, audioLevel, accent = 'blue' }: { isSpeaking: boolean; isListening: boolean; audioLevel: number; accent?: string }) => {
  const config = getVisualizerColorConfig(accent);
  const coreColor = config.raw;
  
  const planetColors = isSpeaking 
    ? [coreColor, '#93c5fd', '#1d4ed8'] 
    : isListening 
      ? [coreColor, '#34d399', '#047857'] 
      : ['#64748b', '#94a3b8', '#475569'];
  const baseSpeed = isSpeaking ? 3 : isListening ? 5 : 8;
  
  return (
    <div className="h-16 w-full flex items-center justify-center relative overflow-hidden bg-white/[0.01] rounded-2xl border border-white/5">
      {/* Planetary Orbit Pathway */}
      <div className="absolute w-20 h-20 rounded-full border border-white/5 border-dashed" />
      <div className="absolute w-12 h-12 rounded-full border border-white/10" />

      {/* Core Star */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-4 h-4 rounded-full"
        style={{
          background: coreColor,
          boxShadow: `0 0 10px ${coreColor}`
        }}
      />

      {/* Orbital particle 1 */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: baseSpeed / (1 + audioLevel * 1.5),
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-22 h-22 flex items-center justify-start pointer-events-none"
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: planetColors[0],
            boxShadow: `0 0 8px ${planetColors[0]}`
          }}
        />
      </motion.div>

      {/* Orbital particle 2 */}
      <motion.div
        animate={{
          rotate: -360
        }}
        transition={{
          duration: (baseSpeed * 1.4) / (1 + audioLevel * 1.5),
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-14 h-14 flex items-center justify-end pointer-events-none"
      >
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{ 
            backgroundColor: planetColors[1],
            boxShadow: `0 0 6px ${planetColors[1]}`
          }}
        />
      </motion.div>

      {/* Orbital particle 3 */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: (baseSpeed * 2) / (1 + audioLevel * 1.2),
          repeat: Infinity,
          ease: "linear",
          delay: 0.3
        }}
        className="absolute w-26 h-26 flex items-center justify-center p-2 pointer-events-none"
      >
        <div 
          className="w-1 h-1 rounded-full absolute top-0"
          style={{ 
            backgroundColor: planetColors[2],
            boxShadow: `0 0 4px ${planetColors[2]}`
          }}
        />
      </motion.div>
    </div>
  );
};

const StatusIndicator = ({ isSpeaking, isListening, isThinking }: { isSpeaking: boolean; isListening: boolean; isThinking: boolean }) => {
  if (isSpeaking) {
    return (
      <span className="flex items-center justify-center gap-1.5 text-xs text-amber-400" title="Answering/Speaking">
        <Volume2 className="w-3.5 h-3.5 animate-bounce text-amber-400" />
        <span className="text-[10px] tracking-wide font-mono uppercase font-bold">Answering</span>
      </span>
    );
  }
  if (isThinking) {
    return (
      <span className="flex items-center justify-center gap-1.5 text-xs text-blue-400" title="Thinking/Processing">
        <Cpu className="w-3.5 h-3.5 animate-spin text-blue-400" style={{ animationDuration: '3s' }} />
        <span className="text-[10px] tracking-wide font-mono uppercase font-bold">Thinking</span>
      </span>
    );
  }
  if (isListening) {
    return (
      <span className="flex items-center justify-center gap-1.5 text-xs text-emerald-400" title="Listening to voice input">
        <Mic className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
        <span className="text-[10px] tracking-wide font-mono uppercase font-bold">Listening</span>
      </span>
    );
  }
  return (
    <span className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
      <Radio className="w-3.5 h-3.5 opacity-40" />
      <span className="text-[10px] tracking-wide font-mono uppercase font-bold">Idle</span>
    </span>
  );
};

const AlienFaceVisualizer = ({ 
  isSpeaking, 
  isListening, 
  audioLevel, 
  themeAccent 
}: { 
  isSpeaking: boolean; 
  isListening: boolean; 
  audioLevel: number; 
  themeAccent: string;
}) => {
  // Glow / accent color
  const colorConfig = getVisualizerColorConfig(themeAccent);
  const coreColor = colorConfig.raw;
  
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-[140px] select-none">
      {/* Glow aura behind alien cranium */}
      <motion.div 
        animate={{
          opacity: isSpeaking ? [0.15, 0.4, 0.15] : [0.1, 0.2, 0.1],
          scale: isSpeaking ? [1, 1.15, 1] : 1
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-24 h-24 rounded-full blur-[30px]"
        style={{ backgroundColor: coreColor }}
      />
      
      {/* Main alien SVG container */}
      <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] drop-shadow-[0_0_12px_rgba(0,0,0,0.5)] overflow-visible z-10">
        <defs>
          <radialGradient id="alienGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          
          <linearGradient id="alienBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={coreColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Floating Cranium antenna elements */}
        <motion.path
          d="M 50 15 L 50 2 C 48 2, 48 1, 50 1 C 52 1, 52 2, 50 2"
          stroke={coreColor}
          strokeWidth="1.5"
          fill="none"
          animate={{
            y: [0, -4, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50"
          cy="1"
          r="1.8"
          fill={coreColor}
          animate={{
            scale: isSpeaking ? [1, 1.4, 1] : [1, 1.1, 1],
            filter: [`drop-shadow(0 0 1px ${coreColor})`, `drop-shadow(0 0 5px ${coreColor})`, `drop-shadow(0 0 1px ${coreColor})`]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Head Shell path: clean, classic, elongated alien head coordinates */}
        <motion.path 
          d="M 50 15 
             C 24 15, 20 40, 32 68
             C 38 82, 44 88, 50 88
             C 56 88, 62 82, 68 68
             C 80 40, 76 15, 50 15 Z" 
          fill="url(#alienGlow)" 
          stroke="url(#alienBorder)"
          strokeWidth="1.8"
          animate={{
            y: [0, -1.5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Eyes: large, compound, glowing, almond eyes */}
        {/* Left Eye */}
        <g>
          <motion.path
            d="M 33 46 
               C 31 36, 44 33, 47 43
               C 49 48, 47 54, 39 52
               C 35 51, 34 49, 33 46 Z"
            fill={coreColor}
            opacity="0.9"
            animate={{
              scaleY: [1, 1, 0.1, 1, 1, 1],  // Blink effect
              scale: isSpeaking ? [1, 1.05, 1] : 1
            }}
            transition={{
              scaleY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformOrigin: "40px 45px" }}
          />
          {/* Eye glow highlights */}
          <motion.circle
            cx="42"
            cy="42"
            r="1.5"
            fill="#ffffff"
            opacity="0.8"
            animate={{ scaleY: [1, 1, 0.1, 1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "42px 42px" }}
          />
        </g>

        {/* Right Eye */}
        <g>
          <motion.path
            d="M 67 46 
               C 69 36, 56 33, 53 43
               C 51 48, 53 54, 61 52
               C 65 51, 66 49, 67 46 Z"
            fill={coreColor}
            opacity="0.9"
            animate={{
              scaleY: [1, 1, 0.1, 1, 1, 1],  // Blink effect
              scale: isSpeaking ? [1, 1.05, 1] : 1
            }}
            transition={{
              scaleY: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
              scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformOrigin: "60px 45px" }}
          />
          {/* Eye glow highlights */}
          <motion.circle
            cx="58"
            cy="42"
            r="1.5"
            fill="#ffffff"
            opacity="0.8"
            animate={{ scaleY: [1, 1, 0.1, 1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            style={{ transformOrigin: "58px 42px" }}
          />
        </g>

        {/* Nostrils lines - subtle details */}
        <path d="M 47 62 Q 50 64 53 62" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" fill="none" />

        {/* Mouth: glowing dynamic wave vector that scales when talking */}
        <motion.path
          d={isSpeaking 
            ? `M 40 73 Q 50 ${73 - (audioLevel * 14)} 60 73`
            : isListening
              ? `M 42 73 S 50 ${73 + (audioLevel * 4)} 58 73`
              : "M 44 73 Q 50 74 56 73"
          }
          stroke={coreColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            scaleX: isSpeaking ? [0.95, 1.05, 0.95] : 1
          }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 73px" }}
        />
      </svg>
    </div>
  );
};

const ROTATING_CTAS = [
  "Ask Agent", "Speak Now", "Talk AI", "Consult Now", "Start Voice",
  "Tap Mic", "Voice Chat", "Instant Guide", "Try AI", "Click Speak",
  "Ask Maxwell", "Meet Hana", "Query Vectra", "Hail Zorblax", "Audio Link",
  "Quick Speech", "Start Now", "Launch Voice", "Solve Tasks", "Ask AI",
  "Direct Access", "Command Node", "Neural Help", "Voice Assist", "Agent Chat",
  "AI Support", "Talk Free", "Chat Live", "Speak Free", "Instant Help",
  "Live Agent", "Begin Sync", "Sync Now", "Connect AI", "Speak Live",
  "Voice Guide", "Direct Chat", "Node On", "Activate AI", "Consult AI"
];

export const VoiceWidget = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  
  const [ctaIndex, setCtaIndex] = useState(0);

  // Transform scroll progress/velocity to dynamically scale the icon (min size: 1x, max size: 1.25x (25% boundary))
  const absVelocity = useTransform(smoothVelocity, (val) => Math.min(Math.abs(val) / 600, 0.25) + 1.0);
  const iconScale = useSpring(absVelocity, { stiffness: 120, damping: 20 });

  // Transform scroll progress for CTA text shortening
  // When scrolled down (> 150px), change string to a shorter way
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 150);
    });
  }, [scrollY]);

  // States: 
  // 'idle': widget showing CTA text + Voice Icon
  // 'ready': clicked widget, replaced text string with start voice conversation icon/button
  // 'active': clicked start conversation, actively speaking / listening
  // 'completed': finished capturing phone number
  const [state, setState] = useState<'idle' | 'ready' | 'active' | 'completed'>('idle');

  // Rotate Call to Actions every 2.5 seconds when widget is idle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'idle') {
      interval = setInterval(() => {
        setCtaIndex((prev) => (prev + 1) % 40);
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state]);
  const [widgetType, setWidgetType] = useState<'standard' | 'compact'>('standard');
  const [animationStyle, setAnimationStyle] = useState<'wave' | 'ripple' | 'orbit'>('wave');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('maxwell');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [transcript, setTranscript] = useState('');
  const [recognizedPhone, setRecognizedPhone] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fallbackInput, setFallbackInput] = useState('');

  const [isPlayingCustomSpeech, setIsPlayingCustomSpeech] = useState(false);
  const geminiAudioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const geminiAudioCtxRef = useRef<AudioContext | null>(null);

  const stopGeminiSpeech = () => {
    if (geminiAudioSourceRef.current) {
      try {
        geminiAudioSourceRef.current.stop();
      } catch (e) {}
      geminiAudioSourceRef.current = null;
    }
    if (geminiAudioCtxRef.current) {
      try {
        geminiAudioCtxRef.current.close();
      } catch (e) {}
      geminiAudioCtxRef.current = null;
    }
  };

  // 10 Theme/Design state variables
  const [activeThemeId, setActiveThemeId] = useState<string>('cyberpunk');
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
  const activeTheme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];

  // Icon cycle on scrolls
  const [scrollIconType, setScrollIconType] = useState<'voice' | 'camera' | 'screenshare' | 'phonecall'>('voice');
  const scrollIconCountRef = useRef<number>(0);

  // Scroll counting mechanism: Switch between widget types, themes, and menu icon every 15 scrolls
  const lastScrollTimeRef = useRef<number>(0);
  const scrollTicksRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      // Throttle scroll triggers to prevent rapid multi-triggers in one drag/wheel scroll
      if (now - lastScrollTimeRef.current > 750) {
        lastScrollTimeRef.current = now;
        scrollTicksRef.current += 1;
        scrollIconCountRef.current += 1;

        if (scrollIconCountRef.current >= 5) {
          scrollIconCountRef.current = 0;
          setScrollIconType(prev => {
            if (prev === 'voice') return 'camera';
            if (prev === 'camera') return 'screenshare';
            if (prev === 'screenshare') return 'phonecall';
            return 'voice';
          });
        }
        
        if (scrollTicksRef.current >= 15) {
          scrollTicksRef.current = 0;
          
          // Toggle widget types on every 15 scrolls
          setWidgetType(prev => prev === 'standard' ? 'compact' : 'standard');
          
          // Cycle themes on every 15 scrolls
          setActiveThemeId(prevThemeId => {
            const currentIndex = THEMES.findIndex(t => t.id === prevThemeId);
            const nextIndex = (currentIndex + 1) % THEMES.length;
            return THEMES[nextIndex].id;
          });

          // Dispatch event to cycle the menu icon in the Satellite core
          window.dispatchEvent(new CustomEvent('cycle-menu-icon-scroll'));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderScrollIcon = (size: number, strokeWidth = 2.5) => {
    switch (scrollIconType) {
      case 'camera':
        return <Camera size={size} strokeWidth={strokeWidth} />;
      case 'screenshare':
        return <ScreenShare size={size} strokeWidth={strokeWidth} />;
      case 'phonecall':
        return <Phone size={size} strokeWidth={strokeWidth} />;
      case 'voice':
      default:
        return <Mic size={size} strokeWidth={strokeWidth} />;
    }
  };

  // Click on camera ask permission to share camera
  const handleStartCamera = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setState('active');
    setTranscript('');
    setRecognizedPhone('');
    setErrorMessage('');
    setIsThinking(true);
    
    try {
      // Request camera access standard permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Stop stream tracks to free up the web camera device immediately
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.warn("Camera access permission could not be acquired or was rejected:", err);
    }
    
    // Simulate thinking/connecting delay, then state response
    setTimeout(() => {
      setIsThinking(false);
      const cameraGreetingStr = "finally i can see you what do you want to show me";
      speak(cameraGreetingStr, () => {
        if (recognitionRef.current) {
          try {
            if (!isRecognitionRunningRef.current) {
              recognitionRef.current.start();
              startAudioVisualizer();
            }
          } catch (err) {
            console.warn("Speech start bypassed:", err);
          }
        }
      });
    }, 1500);
  };

  // Bi-directional event listeners for menu and widget color synchronization
  useEffect(() => {
    const handleMenuColor = (e: Event) => {
      const customEvent = e as CustomEvent;
      const menuColor = customEvent.detail?.color;
      if (menuColor) {
        const matchedTheme = THEMES.find(t => {
          const rawColor = getVisualizerColorConfig(t.visualizerAccent).raw.toLowerCase();
          return rawColor === menuColor.toLowerCase();
        });
        if (matchedTheme && matchedTheme.id !== activeThemeId) {
          setActiveThemeId(matchedTheme.id);
        }
      }
    };
    window.addEventListener('menu-color-changed', handleMenuColor);
    return () => {
      window.removeEventListener('menu-color-changed', handleMenuColor);
    };
  }, [activeThemeId]);

  useEffect(() => {
    const themeColor = getVisualizerColorConfig(activeTheme.visualizerAccent).raw;
    window.dispatchEvent(new CustomEvent('voice-widget-theme-changed', { detail: { color: themeColor } }));
  }, [activeThemeId, activeTheme]);

  const getCurrentPageContext = () => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
      .map(h => h.textContent?.trim())
      .filter(Boolean);
    
    const hasTeams = headings.some(h => h?.includes('Teams') || h?.includes('Humans'));
    const hasIntegrations = headings.some(h => h?.includes('Integrations') || h?.includes('Orchestration'));
    const hasSymbols = headings.some(h => h?.includes('Symbols') || h?.includes('Logo'));
    
    if (hasTeams) {
      return "Greetings Earthling! I have engaged terminal screen scanning. I see you are inspecting our 'AI-Augmented Teams' model. This section illustrates how automated workflow agents orbit human operators to drive maximum scalability. Impressive structure!";
    }
    if (hasIntegrations) {
      return "Quantum viewport connected. Ah, the 'Global Integrations' mainframe is active! I scan eighty plus active communication endpoints, orchestrations, and custom make scenarios. All digital signals are running at optimal bandwidth.";
    }
    if (hasSymbols) {
      return "Optical sensors locked in. You are exploring 'Sacred Logo Symbols' and core brand guide geometry. I detect the Alpha, Omega, and Delta vector paths glowing with dense electromagnetic charge.";
    }
    
    return "Quantum viewport scan complete. Greetings conscious entity! I have scanned your DeltaScope screen. I see your orbital mother satellite is tracking global operational pipelines and active automated ROI counters. Zorblax is ready to amplify your scale!";
  };

  const handleStartScreenshare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Switch to Zorblax persona instantly
    setSelectedPersonaId('alien');
    
    setState('active');
    setTranscript('');
    setRecognizedPhone('');
    setErrorMessage('');
    setIsThinking(true);
    
    // Play sci-fi scanning 1.5s thinking effect
    setTimeout(() => {
      setIsThinking(false);
      const explanation = getCurrentPageContext();
      
      speak(explanation, () => {
        if (recognitionRef.current) {
          try {
            if (!isRecognitionRunningRef.current) {
              recognitionRef.current.start();
              startAudioVisualizer();
            }
          } catch (err) {
            console.warn("Speech start bypassed:", err);
          }
        }
      });
    }, 1500);
  };

  const cycleTheme = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentIndex = THEMES.findIndex(t => t.id === activeThemeId);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setActiveThemeId(THEMES[nextIndex].id);
  };

  // Refs for Speech
  const recognitionRef = useRef<any>(null);
  const isRecognitionRunningRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  // Dynamic rotation speed based on scroll velocity for the ready icon
  const iconRotate = useTransform(smoothVelocity, [-1000, 1000], [-360, 360]);

  // Format CTA Text (Rotate through 40 action items when idle)
  const ctaText = isScrolled ? "Talk now" : ROTATING_CTAS[ctaIndex];

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => {
        isRecognitionRunningRef.current = true;
        setIsListening(true);
        setErrorMessage('');
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        if (e.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. You can still type your number below!');
        } else {
          setErrorMessage(`Speech issue: ${e.error}. Attempting to recover...`);
        }
        isRecognitionRunningRef.current = false;
        setIsListening(false);
      };

      rec.onend = () => {
        isRecognitionRunningRef.current = false;
        setIsListening(false);
      };

      rec.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const trans = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += trans;
          } else {
            interimTranscript += trans;
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim();
        if (currentText) {
          setTranscript(currentText);
          
          // Try to extract phone number digits
          const digits = currentText.replace(/\D/g, '');
          if (digits.length >= 7) {
            setRecognizedPhone(digits);
          }
        }
      };

      recognitionRef.current = rec;
    } else {
      console.warn("Web Speech API recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onresult = null;
          if (isRecognitionRunningRef.current) {
            recognitionRef.current.stop();
          }
        } catch (e) {}
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Web Audio visualizer setup
  const startAudioVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (isSpeaking && !isListening) {
          const r = 0.25 + Math.abs(Math.sin(Date.now() / 120)) * 0.45 + (Math.random() * 0.08);
          setAudioLevel(r);
        } else if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const average = sum / bufferLength;
          setAudioLevel(average / 128); // 0 to ~1
        }
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (e) {
      console.warn("Unable to start audio elements for wave animation:", e);
    }
  };

  const stopAudioVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
    }
    audioContextRef.current = null;
    analyserRef.current = null;
    setAudioLevel(0);
  };

  const activePersona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];

  // Speaks the architect text using high-fidelity Gemini TTS or native fallbacks
  const speak = async (text: string, onEndCallback?: () => void) => {
    // 1. Terminate any currently playing speech to avoid overlap
    stopGeminiSpeech();
    window.speechSynthesis.cancel();
    setIsPlayingCustomSpeech(false);
    setIsSpeaking(true);

    // 2. Attempt utilizing the premium Gemini Text-to-Speech API
    try {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, personaId: selectedPersonaId })
      });

      if (!response.ok) {
        throw new Error("Gemini TTS endpoint responded with error.");
      }

      const data = await response.json();
      if (!data.audio) {
        throw new Error("No audio payload returned from server.");
      }

      // 3. Playback 24kHz Mono 16-bit Linear PCM audio using Web Audio API
      const binaryString = window.atob(data.audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const int16Samples = new Int16Array(bytes.buffer);
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      geminiAudioCtxRef.current = audioCtx;

      const audioBuffer = audioCtx.createBuffer(1, int16Samples.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < int16Samples.length; i++) {
        channelData[i] = int16Samples[i] / 32768.0;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      geminiAudioSourceRef.current = source;

      setIsPlayingCustomSpeech(true);

      source.onended = () => {
        setIsSpeaking(false);
        setIsPlayingCustomSpeech(false);
        onEndCallback?.();
      };

      source.start(0);
      return; // Synthesized successfully!
    } catch (err) {
      console.warn("Gemini Custom Speech bypassed; falling back to local SpeechSynthesizer:", err);
    }

    // 4. Fallback: Native SpeechSynthesis (resilient & fully local offline support)
    setIsPlayingCustomSpeech(false);

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice = null;

    if (activePersona.gender === 'female') {
      preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('moira') || v.name.toLowerCase().includes('hazel')));
    } else if (activePersona.gender === 'male') {
      preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('mark') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('ravi')));
    }

    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                       voices.find(v => v.lang.startsWith('en')) ||
                       voices[0];
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = activePersona.rate;
    utterance.pitch = activePersona.pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onEndCallback?.();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      onEndCallback?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Lifecycle transitions
  const handleWidgetWidgetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === 'idle') {
      setState('ready');
    }
  };

  const handleStartConversation = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setState('active');
    setTranscript('');
    setRecognizedPhone('');
    setErrorMessage('');

    // Start speaking intro message
    const introPrompt = activePersona.intro;
    speak(introPrompt, () => {
      // Start listening once the introduction is completed
      if (recognitionRef.current) {
        try {
          if (!isRecognitionRunningRef.current) {
            recognitionRef.current.start();
            startAudioVisualizer();
          }
        } catch (err) {
          console.error("Failed to start speech recognition:", err);
        }
      } else {
        setErrorMessage("Speech recognition isn't supported, but please type your number below!");
      }
    });
  };

  // Speaks an authentic persona-flavored joke using our Gemini flow
  const handleAskForJoke = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    stopGeminiSpeech();
    window.speechSynthesis.cancel();
    setState('active');
    setTranscript('');
    setRecognizedPhone('');
    setIsThinking(true);
    setErrorMessage('');

    const personaName = activePersona.name;
    const promptText = `Tell me a hilarously witty joke starting exactly with "Hello, I want to tell you a joke." customized for the persona named ${personaName}. The joke must be about humans who do not do creative jobs and how they gradually degrade their creativity skills and make silly mistakes, making their poor company boss cry because of the terrible ROI of hiring them, so AI agents are here to help them. Finally, end the joke exactly with "So let's stop joking and start working, what do you say?" Keep it highly customized to ${personaName}'s character, professional yet super funny and biting.`;

    try {
      const res = await fetch('/api/converse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, personaId: selectedPersonaId })
      });

      if (!res.ok) {
        throw new Error('Joke failed on backend feed.');
      }

      const data = await res.json();
      const jokeText = data.text;

      setIsThinking(false);
      setTranscript(jokeText);

      // Momentarily stop recognition during AI speech to avoid echo feedback loop
      if (recognitionRef.current && isRecognitionRunningRef.current) {
        try { recognitionRef.current.stop(); } catch (err) {}
      }

      speak(jokeText, () => {
        if (state === 'active' && recognitionRef.current && !isRecognitionRunningRef.current) {
          try {
            recognitionRef.current.start();
            startAudioVisualizer();
          } catch (err) {}
        }
      });
    } catch (err) {
      console.warn("AI Conversation joke synthesis failed, using pre-baked persona humor:", err);
      setIsThinking(false);

      const preBakedJokes: Record<string, string> = {
        maxwell: "Hello, I want to tell you a joke. What happens to office workers who evade all creative tasks? Their brains slide into a low-resolution screensaver mode, causing them to reply-all with a cat meme, making their poor company boss weep tears of financial despair over the sub-zero ROI. *Sighs dramatically* Luckily, our elite AI agents are here to restore cognitive horsepower! So, let's stop joking and start working, what do you say?",
        hana: "Hello, I want to tell you a joke. Picture an executive who refuses to use their imagination. Over time, their cognitive bandwidth shrinks so much they accidentally email a PDF of their lunch receipt to the entire board, causing their boss to literally cry on a pile of declining ROI slide-decks! *Wipes tears of joy* Thank goodness high-velocity AI agents are here for extreme throughput optimization! So, let's stop joking and start working, what do you say?",
        vectra: "Hello, I want to tell you a joke. In the cosmic geometry of middle-management, when organic brains avoid the creative nebula, their intelligence degrades into space dust. They drag their raw servers into the recycle bin, causing their poor boss to sob into their lukewarm coffee while staring into the cold dark hole of their zero ROI. *Chuckles in a deep celestial frequency* But do not worry, AI entities are here to re-stabilize your orbit! So, let's stop joking and start working, what do you say?",
        alien: "Hello, I want to tell you a joke. On Alpha Centauri, we studied Earthlings who do not engage in creative jobs. Their neural processing degrades so rapidly they submit blank blueprints, causing their company supreme commander to shed actual saline tears over their pathetic planetary ROI! *Clicks antennae with interstellar amusement* Luckily, our cybernetic AI agents are ready to save your civilization from boring tasks! So, let's stop joking and start working, what do you say?"
      };

      const fallbackJoke = preBakedJokes[selectedPersonaId] || preBakedJokes.maxwell;
      setTranscript(fallbackJoke);
      speak(fallbackJoke);
    }
  };

  // Handles both phone inputs (numbers) and conversational chatter (prompts) using Gemini endpoints
  const submitTextPrompt = async (userInput: string) => {
    if (!userInput.trim()) return;

    // Filter and check if digits resemble a full phone number
    const digitsOnly = userInput.replace(/\D/g, '');
    const isPhoneNum = digitsOnly.length >= 7 && !/[a-zA-Z]/.test(userInput);

    if (isPhoneNum) {
      setRecognizedPhone(digitsOnly);

      if (recognitionRef.current) {
        try {
          if (isRecognitionRunningRef.current) {
            recognitionRef.current.stop();
          }
        } catch (err) {}
      }
      stopAudioVisualizer();

      const formatted = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      speak(`Perfect. I have registered your number as ${digitsOnly.split('').join(' ')}. Our Lead Solution Architects will reach out shortly to initiate your blueprint consultation.`, () => {
        setState('completed');
      });
      return;
    }

    // Interactive custom text prompt
    stopGeminiSpeech();
    window.speechSynthesis.cancel();
    setState('active');
    setIsThinking(true);
    setErrorMessage('');
    setFallbackInput('');

    try {
      const res = await fetch('/api/converse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput, personaId: selectedPersonaId })
      });

      if (!res.ok) {
        throw new Error('Conversational endpoint returned failure status.');
      }

      const data = await res.json();
      const reply = data.text;

      setIsThinking(false);
      setTranscript(reply);

      if (recognitionRef.current && isRecognitionRunningRef.current) {
        try { recognitionRef.current.stop(); } catch (err) {}
      }

      speak(reply, () => {
        if (state === 'active' && recognitionRef.current && !isRecognitionRunningRef.current) {
          try {
            recognitionRef.current.start();
            startAudioVisualizer();
          } catch (err) {}
        }
      });
    } catch (err) {
      console.warn("AI Conversation error:", err);
      setIsThinking(false);

      const genericFeedback = `I registered your prompt as: "${userInput}". Let's continue building high-velocity automated blueprints!`;
      setTranscript(genericFeedback);
      speak(genericFeedback);
    }
  };

  const submitPhoneNumber = (phoneNum: string) => {
    submitTextPrompt(phoneNum);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTextPrompt(fallbackInput);
  };

  // Watch for phone number captured in transcript automatically
  useEffect(() => {
    if (state === 'active' && recognizedPhone) {
      const timer = setTimeout(() => {
        submitPhoneNumber(recognizedPhone);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [recognizedPhone, state]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopGeminiSpeech();
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      try {
        if (isRecognitionRunningRef.current) {
          recognitionRef.current.stop();
        }
      } catch (err) {}
    }
    stopAudioVisualizer();
    setState('idle');
    setTranscript('');
    setRecognizedPhone('');
    setFallbackInput('');
    setShowSettings(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence mode="wait">
        
        {/* ========================================================================= */}
        {/* STANDARD WIDGET SYSTEM (TYPE 1) */}
        {/* ========================================================================= */}
        
        {/* State: IDLE (Standard) */}
        {widgetType === 'standard' && state === 'idle' && (
          <div className="flex items-center gap-2">
            <motion.button
              key="widget-idle"
              id="voice-widget-idle-btn"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.6
              }}
              onClick={handleWidgetWidgetClick}
              className={`flex items-center gap-3.5 pl-3.5 pr-5 py-2.5 transition-all group select-none cursor-pointer ${stripFrameClasses(activeTheme.idleClass)} ${activeTheme.font}`}
            >
              <div className="relative flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${activeTheme.id === 'stealth' ? 'bg-red-500' : 'bg-current'}`} />
                <div className={`relative p-2 rounded-full border transition-all ${activeTheme.badgeClass}`}>
                  <motion.div style={{ scale: iconScale }} className="flex items-center justify-center">
                    {renderScrollIcon(15, 2.5)}
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center leading-none text-left">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={ctaText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="font-semibold text-xs tracking-wide"
                  >
                    {ctaText}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.button>

            {/* QUICK DESIGN TRIGGER */}
            <motion.button
              key="theme-cycle-button"
              initial={{ opacity: 0, scale: 0.7, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -10 }}
              onClick={cycleTheme}
              className={`p-3 bg-neutral-900 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/40 shadow-lg flex items-center justify-center cursor-pointer transition-all shrink-0`}
              title="Change Widget Design (10 styles)"
            >
              <Paintbrush size={14} className="animate-bounce" />
            </motion.button>

            {/* QUICK SCREENSHARE TRIGGER */}
            <motion.button
              key="screenshare-quick-button"
              initial={{ opacity: 0, scale: 0.7, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -10 }}
              onClick={handleStartScreenshare}
              className={`p-3 bg-neutral-900 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/40 shadow-lg flex items-center justify-center cursor-pointer transition-all shrink-0`}
              title="Screenshare & Talk with Alien Face"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                <ScreenShare size={14} className="text-emerald-400" />
              </motion.div>
            </motion.button>

            {/* QUICK CAMERA TRIGGER */}
            <motion.button
              key="camera-quick-button"
              initial={{ opacity: 0, scale: 0.7, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -10 }}
              onClick={handleStartCamera}
              className={`p-3 bg-neutral-900 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/40 shadow-lg flex items-center justify-center cursor-pointer transition-all shrink-0`}
              title="Activate Camera & Voice interaction"
            >
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                <Camera size={14} className="text-cyan-400" />
              </motion.div>
            </motion.button>

            {/* SWITCH TO COMPACT TYPE TRIGGER */}
            <motion.button
              key="switch-to-compact-button"
              initial={{ opacity: 0, scale: 0.7, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -10 }}
              onClick={(e) => { e.stopPropagation(); setWidgetType('compact'); }}
              className={`p-3 bg-neutral-900 border border-white/20 rounded-full text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 shadow-lg flex items-center justify-center cursor-pointer transition-all shrink-0`}
              title="Switch to Type 2: Compact Interactive representation"
            >
              <Layers size={14} />
            </motion.button>
          </div>
        )}

        {/* State: READY (Standard) */}
        {widgetType === 'standard' && state === 'ready' && (
          <motion.div
            key="widget-ready"
            id="voice-widget-ready-container"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className={`flex flex-col relative overflow-hidden transition-all duration-300 p-5 ${stripFrameClasses(activeTheme.panelClass)} ${activeTheme.font} ${
              showSettings || showThemeSelector ? 'w-72 md:w-80 gap-4' : 'w-72 items-stretch gap-3'
            }`}
          >
            {/* BACKGROUND DECORATIONS */}
            {activeTheme.hasScanlines && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-40 z-10" />
            )}
            {activeTheme.hasAuroraBg && (
              <div className="absolute -inset-10 overflow-hidden rounded-3xl opacity-30 select-none pointer-events-none blur-[40px] z-[-1]">
                <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-purple-500 animate-pulse" />
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-cyan-400 animate-pulse [animation-delay:1.5s]" />
              </div>
            )}
            {activeTheme.hasGlossReflections && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 border-t border-sky-200 z-[3] rounded-2xl" />
            )}

            {showThemeSelector ? (
              /* THEME PANEL LISTING ALL 10 THEMES */
              <div className="flex flex-col gap-3.5 w-full relative z-20">
                <div className="flex justify-between items-center pb-2 border-b border-white/15">
                  <span className={`text-xs font-bold uppercase tracking-widest ${activeTheme.accentText} select-none flex items-center gap-1.5`}>
                    <Palette size={13} /> SELECT THEME
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowThemeSelector(false); }}
                    className={`p-1 px-2.5 rounded-lg text-xs transition-all cursor-pointer ${activeTheme.secondaryBtnClass}`}
                  >
                    Back
                  </button>
                </div>
                
                <p className="text-[10px] opacity-65 leading-relaxed">
                  Toggle any of these 10 designer layouts. Styling updates coordinates instantly.
                </p>

                <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {THEMES.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveThemeId(themeOption.id);
                      }}
                      className={`flex flex-col items-start p-2.5 border text-left rounded-xl transition-all cursor-pointer ${
                        activeThemeId === themeOption.id
                          ? 'bg-neutral-800/20 border-current shadow-sm'
                          : 'bg-black/10 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{themeOption.name}</span>
                        {activeThemeId === themeOption.id && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.5 rounded font-mono font-bold">ACTIVE</span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/50 mt-1 leading-tight">{themeOption.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : showSettings ? (
              /* VOICE PERSONAS SETTINGS PANEL */
              <div className="flex flex-col gap-3.5 w-full relative z-20">
                <div className="flex justify-between items-center pb-2 border-b border-white/15">
                  <span className={`text-xs font-bold uppercase tracking-widest ${activeTheme.accentText} select-none`}>AI Voice Personas</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowSettings(false); }}
                    className={`p-1 px-2 text-xs transition-all cursor-pointer ${activeTheme.secondaryBtnClass}`}
                  >
                    Back
                  </button>
                </div>
                
                <p className="text-[10px] opacity-50 leading-relaxed -mt-1.5">
                  Choose an assistant with distinct personality and voice configurations.
                </p>

                <div className="flex flex-col gap-2.5 max-h-[180px] overflow-y-auto pr-1">
                  {PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPersonaId(p.id);
                        speak(p.testPhrase);
                      }}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPersonaId === p.id
                          ? 'bg-neutral-800/10 border-white/20'
                          : 'bg-black/10 border-white/5 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className={`p-1 rounded-lg shrink-0 ${p.bgColor} ${p.color}`}>
                        <User size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-white">{p.name}</span>
                          {selectedPersonaId === p.id && (
                            <span className={`text-[10px] ${activeTheme.accentText} font-semibold flex items-center gap-0.5`}>
                              <Check size={10} strokeWidth={3} /> Active
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] opacity-40 leading-none mt-0.5">{p.role}</p>
                        <p className="text-[10px] opacity-60 leading-tight mt-1.5">{p.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-white/5 flex gap-2">
                  <button
                    onClick={handleStartConversation}
                    className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTheme.primaryBtnClass}`}
                  >
                    Connect with {activePersona.name}
                  </button>
                </div>
              </div>
            ) : (
              /* STANDARD READY STATE INTERFACE */
              <div className="relative z-20 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className={`${activeTheme.accentText} animate-pulse shrink-0`} />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-90">Voice Pilot</span>
                    {/* Small listening/thinking/answering status icon directly inline */}
                    <div className="shrink-0 flex items-center justify-center p-1 rounded bg-black/30 border border-white/10" title="Realtime status">
                      {isSpeaking ? (
                        <Volume2 size={11} className="text-amber-400 animate-bounce" />
                      ) : isThinking ? (
                        <Cpu size={11} className="text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                      ) : isListening ? (
                        <Mic size={11} className="text-emerald-400 animate-pulse" />
                      ) : (
                        <Radio size={11} className="text-zinc-500 opacity-60" />
                      )}
                    </div>
                  </div>
                  
                  {/* UTILITY ACTIONS HEADER */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); setWidgetType('compact'); }}
                      className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${activeTheme.secondaryBtnClass}`}
                      title="Switch to Type 2: Compact Interactive View"
                    >
                      <Layers size={13} className="text-cyan-400" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowThemeSelector(true); }}
                      className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${activeTheme.secondaryBtnClass}`}
                      title="Change Design Style (10 theme presets)"
                    >
                      <Palette size={13} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowSettings(true); }}
                      className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${activeTheme.secondaryBtnClass}`}
                      title="Voice Personas"
                    >
                      <Sliders size={13} />
                    </button>
                    <button
                      onClick={handleClose}
                      id="voice-widget-ready-close-btn"
                      className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${activeTheme.secondaryBtnClass}`}
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
                
                <div className={`h-[1px] ${activeTheme.accentBorder}`} />

                {/* Main conversation trigger */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1.5">
                    <motion.button
                      onClick={handleStartConversation}
                      id="voice-widget-start-connect-btn"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 transition-all cursor-pointer ${activeTheme.primaryBtnClass}`}
                    >
                      <motion.div style={{ rotate: iconRotate }}>
                        <Phone size={12} fill="currentColor" strokeWidth={0} className="stroke-none duration-100" />
                      </motion.div>
                      <span>Talk Now</span>
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <motion.button
                      onClick={handleStartScreenshare}
                      id="voice-widget-screenshare-btn"
                      className={`flex items-center justify-center gap-1.5 py-2.5 transition-all cursor-pointer ${activeTheme.secondaryBtnClass}`}
                      title="Screenshare & Analyze Current Page"
                    >
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                        <ScreenShare size={12} className="text-emerald-400" />
                      </motion.div>
                      <span>Screen Share</span>
                    </motion.button>

                    <motion.button
                      onClick={handleStartCamera}
                      id="voice-widget-camera-btn"
                      className={`flex items-center justify-center gap-1.5 py-2.5 transition-all cursor-pointer ${activeTheme.secondaryBtnClass}`}
                      title="Share Camera & Voice interaction"
                    >
                      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                        <Camera size={12} className="text-cyan-400" />
                      </motion.div>
                      <span>Camera</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* State: ACTIVE (Standard) */}
        {widgetType === 'standard' && state === 'active' && (
          <motion.div
            key="widget-active"
            id="voice-widget-active-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className={`flex flex-col relative overflow-hidden p-5 ${stripFrameClasses(activeTheme.panelClass)} ${activeTheme.font}`}
          >
            {/* BACKGROUND DECORATIONS */}
            {activeTheme.hasScanlines && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-40 z-10" />
            )}
            {activeTheme.hasAuroraBg && (
              <div className="absolute -inset-10 overflow-hidden rounded-3xl opacity-30 select-none pointer-events-none blur-[40px] z-[-1]">
                <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-purple-500 animate-pulse" />
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-cyan-400 animate-pulse [animation-delay:1.5s]" />
              </div>
            )}
            {activeTheme.hasGlossReflections && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 border-t border-sky-200 z-[3] rounded-2xl" />
            )}

            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/10 relative z-20">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeTheme.id === 'stealth' ? 'bg-red-500' : 'bg-emerald-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${activeTheme.id === 'stealth' ? 'bg-red-600' : 'bg-emerald-500'}`}></span>
                </span>
                <span className={`text-xs font-bold tracking-widest uppercase select-none ${activeTheme.accentText}`}>
                  {showThemeSelector ? "WIDGET DESIGNS" : showSettings ? "VOICE PLAN" : "Live Call"}
                </span>
                {/* Visual state indicator inline display */}
                <span className="p-0.5 rounded bg-black/20 border border-white/5" title="Realtime status">
                  {isSpeaking ? (
                    <Volume2 size={10} className="text-amber-400 animate-bounce" />
                  ) : isThinking ? (
                    <Cpu size={10} className="text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                  ) : isListening ? (
                    <Mic size={10} className="text-emerald-400 animate-pulse" />
                  ) : (
                    <Radio size={10} className="text-zinc-500 opacity-60" />
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => { e.stopPropagation(); setWidgetType('compact'); }}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${activeTheme.secondaryBtnClass}`}
                  title="Switch to Type 2: Compact View"
                >
                  <Layers size={11} className="text-cyan-400" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowThemeSelector(!showThemeSelector); setShowSettings(false); }}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${showThemeSelector ? 'brightness-125 bg-white/10' : ''} ${activeTheme.secondaryBtnClass}`}
                  title="Switch Visual design preset (10 options)"
                >
                  <Palette size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); setShowThemeSelector(false); }}
                  className={`p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${showSettings ? 'brightness-125 bg-white/10' : ''} ${activeTheme.secondaryBtnClass}`}
                  title="Choose Voice Persona"
                >
                  <Sliders size={12} />
                </button>
                <button
                  onClick={handleClose}
                  id="voice-widget-active-disconnect-btn"
                  className={`p-1 px-2 rounded-lg transition-all text-xs font-mono font-bold hover:brightness-110 cursor-pointer ${activeTheme.secondaryBtnClass}`}
                >
                  Disconnect
                </button>
              </div>
            </div>

            {showThemeSelector ? (
              /* ACTIVE DESIGN CONFIGURATION PANEL */
              <div className="py-3 flex flex-col gap-3 w-full relative z-20">
                <p className="text-[10px] opacity-70">
                  Select visual style for the live widget instantly. Changes background colors, border patterns and layouts!
                </p>
                
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {THEMES.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveThemeId(themeOption.id);
                      }}
                      className={`flex flex-col items-start p-2.5 border text-left rounded-xl transition-all cursor-pointer ${
                        activeThemeId === themeOption.id
                          ? 'bg-neutral-800/20 border-current shadow-sm'
                          : 'bg-black/10 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{themeOption.name}</span>
                        {activeThemeId === themeOption.id && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1 py-0.5 rounded font-mono font-bold">ACTIVE</span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/50 mt-1 leading-normal">{themeOption.description}</p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setShowThemeSelector(false); }}
                  className={`w-full py-2 text-xs font-medium cursor-pointer text-center mt-1 ${activeTheme.primaryBtnClass}`}
                >
                  Done
                </button>
              </div>
            ) : showSettings ? (
              /* ACTIVE PERSONA SELECTION PANEL */
              <div className="py-3 flex flex-col gap-3 w-full relative z-20">
                <p className="text-[10px] opacity-60 leading-relaxed">
                  Switch voice persona instantly. Dialogue transitions immediately to active speaker patterns.
                </p>
                
                <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1">
                  {PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPersonaId(p.id);
                        speak(`Voice switched to ${p.name}. Ready.`);
                      }}
                      className={`flex items-start gap-3 p-2 border text-left transition-all rounded-xl cursor-pointer ${
                        selectedPersonaId === p.id
                          ? 'bg-neutral-800/10 border-white/20'
                          : 'bg-black/10 border-white/5 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className={`p-1 rounded-lg shrink-0 ${p.bgColor} ${p.color}`}>
                        <User size={13} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white leading-none">{p.name}</span>
                          {selectedPersonaId === p.id && (
                            <span className={`text-[9px] ${activeTheme.accentText} font-semibold flex items-center font-mono`}>
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] opacity-40 mt-0.5 leading-none">{p.role}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setShowSettings(false); }}
                  className={`w-full py-2 text-xs font-semibold cursor-pointer text-center mt-1 ${activeTheme.primaryBtnClass}`}
                >
                  Back to Call
                </button>
              </div>
            ) : (
              /* Conversation Core */
              <div className="py-2 flex flex-col items-center justify-center gap-3.5 w-full relative z-20">
                
                {selectedPersonaId === 'alien' ? (
                  <div className="w-full relative h-[140px]">
                    <AlienFaceVisualizer 
                      isSpeaking={isSpeaking} 
                      isListening={isListening} 
                      audioLevel={audioLevel} 
                      themeAccent={activeTheme.visualizerAccent} 
                    />
                  </div>
                ) : (
                  <>
                    {/* Visualizer Mode Switcher */}
                    <div className="flex bg-black/10 p-0.5 rounded-xl justify-between gap-1 text-[9px] uppercase tracking-wider w-full border border-white/5 select-none font-sans font-extrabold">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setAnimationStyle('wave'); }} 
                        className={`flex-1 py-1 px-1.5 rounded-lg transition-all cursor-pointer text-center ${animationStyle === 'wave' ? 'bg-white/15 text-white font-bold' : 'opacity-50 hover:opacity-100'}`}
                      >
                        Waveform
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setAnimationStyle('ripple'); }} 
                        className={`flex-1 py-1 px-1.5 rounded-lg transition-all cursor-pointer text-center ${animationStyle === 'ripple' ? 'bg-white/15 text-white font-bold' : 'opacity-50 hover:opacity-100'}`}
                      >
                        Ripples
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setAnimationStyle('orbit'); }} 
                        className={`flex-1 py-1 px-1.5 rounded-lg transition-all cursor-pointer text-center ${animationStyle === 'orbit' ? 'bg-white/15 text-white font-bold' : 'opacity-50 hover:opacity-100'}`}
                      >
                        Orbits
                      </button>
                    </div>

                    {/* 3 Active Voice Animation Modes */}
                    <div className="w-full relative h-16">
                      <AnimatePresence mode="wait">
                        {animationStyle === 'wave' && (
                          <motion.div
                            key="wave"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                          >
                            <WaveformVisualizer isSpeaking={isSpeaking} isListening={isListening} audioLevel={audioLevel} accent={activeTheme.visualizerAccent} />
                          </motion.div>
                        )}
                        {animationStyle === 'ripple' && (
                          <motion.div
                            key="ripple"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                          >
                            <RippleVisualizer isSpeaking={isSpeaking} isListening={isListening} audioLevel={audioLevel} accent={activeTheme.visualizerAccent} />
                          </motion.div>
                        )}
                        {animationStyle === 'orbit' && (
                          <motion.div
                            key="orbit"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                          >
                            <OrbitVisualizer isSpeaking={isSpeaking} isListening={isListening} audioLevel={audioLevel} accent={activeTheme.visualizerAccent} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}

                {/* Speech State Description */}
                <div className="text-center font-sans tracking-tight">
                  <StatusIndicator isSpeaking={isSpeaking} isListening={isListening} isThinking={isThinking} />
                </div>

                {/* Dialogue bubble */}
                <div className={`p-4 w-full text-center leading-relaxed text-xs border ${activeTheme.transcriptCardClass}`}>
                  {transcript ? (
                    <TypedTranscript text={transcript} accentColor={getVisualizerColorConfig(activeTheme.visualizerAccent).raw} />
                  ) : (
                    <span>"Could I get your phone number to customize those enterprise blueprints?"</span>
                  )}
                </div>

                {/* AI Humor Mode Chip */}
                <div className="flex justify-center w-full">
                  <button
                    id="ask-for-joke-btn"
                    type="button"
                    onClick={handleAskForJoke}
                    className="group px-3 py-1 bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/5 hover:border-amber-500/30 rounded-full text-[10px] text-white/85 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Sparkles size={11} className="text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Hear {activePersona.name}'s AI Humor</span>
                  </button>
                </div>

                {/* Form controls/fallbacks */}
                <div className="w-full">
                  {errorMessage && (
                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-[11px] text-red-200 mb-2">
                       <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <span className="leading-normal">{errorMessage}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleManualSubmit} className="flex gap-2 w-full mt-1 border-t border-white/5 pt-2">
                    <input
                      type="text"
                      value={fallbackInput}
                      onChange={(e) => setFallbackInput(e.target.value)}
                      placeholder="Type number, ask question, or 'joke'..."
                      className={`flex-1 px-3 py-2 text-xs focus:outline-none transition-colors border ${activeTheme.inputClass}`}
                    />
                    <button
                      type="submit"
                      className={`p-2 px-3 transition-all flex items-center justify-center cursor-pointer ${activeTheme.primaryBtnClass}`}
                      title="Submit number"
                    >
                      <Send size={13} />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* State: COMPLETED (Standard) */}
        {widgetType === 'standard' && state === 'completed' && (
          <motion.div
            key="widget-completed"
            id="voice-widget-completed-banner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex flex-col gap-3.5 relative overflow-hidden p-5 ${stripFrameClasses(activeTheme.panelClass)} ${activeTheme.font}`}
          >
            {/* BACKGROUND DECORATIONS */}
            {activeTheme.hasScanlines && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-40 z-10" />
            )}
            {activeTheme.hasAuroraBg && (
              <div className="absolute -inset-10 overflow-hidden rounded-3xl opacity-30 select-none pointer-events-none blur-[40px] z-[-1]">
                <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-purple-500 animate-pulse" />
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-cyan-400 animate-pulse [animation-delay:1.5s]" />
              </div>
            )}
            {activeTheme.hasGlossReflections && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 border-t border-sky-200 z-[3] rounded-2xl" />
            )}

            <div className="flex items-center gap-3 relative z-20">
              <div className="p-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full">
                <Check size={16} strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <span className={`text-xs uppercase tracking-[0.15em] font-extrabold ${activeTheme.accentText}`}>Registered</span>
                <span className="text-[10px] opacity-50 tracking-wider">Solutions allocated</span>
              </div>
            </div>

            <p className={`text-xs opacity-85 leading-relaxed pl-1.5 border-l-2 relative z-20 ${activeTheme.accentBorder}`}>
              Your consultation request is securely locked in. Our lead directors will reach out soon.
            </p>

            <button
              onClick={handleClose}
              className={`w-full py-2.5 text-xs font-semibold cursor-pointer relative z-20 ${activeTheme.primaryBtnClass}`}
            >
              Great, thank you!
            </button>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* COMPACT INTERACTIVE WIDGET SYSTEM (TYPE 2 - GOALS 1, 2, 3, 4, 5, 6) */}
        {/* ========================================================================= */}

        {/* State: IDLE (Compact) */}
        {widgetType === 'compact' && state === 'idle' && (
          <div className="flex items-center gap-2">
            <motion.button
              key="compact-widget-idle"
              id="voice-widget-compact-idle-btn"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 20 }}
              onClick={handleWidgetWidgetClick}
              className={`flex items-center justify-center p-3.5 transition-all group select-none cursor-pointer rounded-full ${activeTheme.idleClass}`}
              title="Click to Open Compact Voice Pilot"
            >
              <div className="relative flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full animate-ping opacity-25 bg-current`} />
                <motion.div style={{ scale: iconScale }} className="flex items-center justify-center relative">
                  {renderScrollIcon(16, 3)}
                </motion.div>
              </div>
            </motion.button>
            
            {/* QUICK SWITH WIDGET TYPE ICON */}
            <motion.button
              key="compact-idle-switch-btn"
              initial={{ opacity: 0, scale: 0.7, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: -10 }}
              onClick={(e) => { e.stopPropagation(); setWidgetType('standard'); }}
              className={`p-3 bg-neutral-900 border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/40 shadow-lg flex items-center justify-center cursor-pointer transition-all shrink-0`}
              title="Switch to Standard Dashboard (Type 1)"
            >
              <Layers size={14} className="text-cyan-400" />
            </motion.button>
          </div>
        )}

        {/* State: READY (Compact) */}
        {widgetType === 'compact' && state === 'ready' && (
          <motion.div
            key="compact-widget-ready"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className={`flex items-center gap-3 px-3.5 py-2 z-50 shadow-xl relative overflow-hidden transition-all duration-305 border ${activeTheme.compactPanelClass} ${activeTheme.font}`}
          >
            {/* BACKGROUND DECORATIONS */}
            {activeTheme.hasScanlines && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] opacity-20 z-10" />
            )}
            
            {/* Voice animation container */}
            <div className="w-12 h-10 flex items-center justify-center bg-black/20 rounded-lg relative overflow-hidden">
              {selectedPersonaId === 'alien' ? (
                <div className="scale-[0.42] translate-y-[-16px] opacity-80 h-10 w-10">
                  <AlienFaceVisualizer 
                     isSpeaking={isSpeaking} 
                     isListening={isListening} 
                     audioLevel={0.06} 
                     themeAccent={activeTheme.visualizerAccent} 
                  />
                </div>
              ) : (
                <div className="opacity-60 flex gap-[2px]">
                  {[1, 2, 3, 4, 5].map((u) => (
                    <span 
                       key={u} 
                       className={`w-[2.5px] h-3 rounded-full bg-current opacity-40 animate-pulse`} 
                       style={{ animationDelay: `${u * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* BUTTON BAR (ICON-ONLY PRESETS) */}
            <div className="flex items-center gap-1.5 z-20">
              {/* Start conversation button (ICON NOT TEXT) */}
              <button
                onClick={handleStartConversation}
                className={`p-2 rounded-full flex items-center justify-center transition-all cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white shadow-md animate-pulse`}
                title="Start Conversation (Talk without another window)"
              >
                <motion.div style={{ rotate: iconRotate }}>
                  <Phone size={13} fill="currentColor" strokeWidth={0} className="stroke-none" />
                </motion.div>
              </button>

              {/* Screenshare icon near start/call icon */}
              <button
                onClick={handleStartScreenshare}
                className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                title="Screenshare & explain current page instantly"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                  <ScreenShare size={12} className="text-emerald-400" />
                </motion.div>
              </button>

              {/* Camera icon near start/call icon */}
              <button
                onClick={handleStartCamera}
                className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                title="Share camera & explain instantly"
              >
                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
                  <Camera size={12} className="text-cyan-400" />
                </motion.div>
              </button>

              {/* Change visual template theme */}
              <button
                onClick={cycleTheme}
                className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                title="Change Template Theme (10 custom styled presets)"
              >
                <Palette size={12} />
              </button>

              {/* Switch widget type icon */}
              <button
                onClick={(e) => { e.stopPropagation(); setWidgetType('standard'); }}
                className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                title="Switch to Standard Dashboard type"
              >
                <Layers size={12} className="text-cyan-400" />
              </button>
            </div>

            {/* Realtime mode status indicators badge/icon */}
            <div className="shrink-0 flex items-center justify-center p-1 rounded bg-black/35 border border-white/10" title="Realtime status">
              {isSpeaking ? (
                <Volume2 size={11} className="text-amber-400 animate-bounce" />
              ) : isThinking ? (
                <Cpu size={11} className="text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
              ) : isListening ? (
                <Mic size={11} className="text-emerald-400 animate-pulse" />
              ) : (
                <Radio size={11} className="text-zinc-500 opacity-60" />
              )}
            </div>

            {/* Mini close button */}
            <button
              onClick={handleClose}
              className={`p-1 hover:opacity-100 opacity-45 cursor-pointer z-20 text-xs ml-0.5`}
              title="Dismiss"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}

        {/* State: ACTIVE (Compact - LIVE CONVERSATION) */}
        {widgetType === 'compact' && state === 'active' && (
          <motion.div
            key="compact-widget-active"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className={`flex flex-col gap-1.5 p-2.5 w-60 md:w-64 shadow-2xl relative overflow-hidden border ${activeTheme.compactPanelClass} ${activeTheme.font}`}
          >
            {/* BACKGROUND DECORATIONS */}
            {activeTheme.hasScanlines && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] opacity-20 z-10" />
            )}

            <div className="flex items-center justify-between w-full gap-2">
              {/* Voice animation container with mini talking Alien Face */}
              <div className="w-12 h-10 flex items-center justify-center bg-black/20 rounded-lg relative overflow-hidden shrink-0">
                {selectedPersonaId === 'alien' ? (
                  <div className="scale-[0.4] translate-y-[-16px] h-10 w-10">
                    <AlienFaceVisualizer 
                      isSpeaking={isSpeaking} 
                      isListening={isListening} 
                      audioLevel={audioLevel} 
                      themeAccent={activeTheme.visualizerAccent} 
                    />
                  </div>
                ) : (
                  <div className="w-full h-full scale-90 translate-y-[-4px]">
                    <WaveformVisualizer 
                      isSpeaking={isSpeaking} 
                      isListening={isListening} 
                      audioLevel={audioLevel} 
                      accent={activeTheme.visualizerAccent} 
                    />
                  </div>
                )}
              </div>

              {/* ACTION ROW (ICON ONLY) */}
              <div className="flex items-center gap-1.5 relative z-20">
                {/* Stop conversation button (ICON NOT TEXT) */}
                <button
                  onClick={handleClose}
                  className={`p-2 rounded-full flex items-center justify-center bg-gradient-to-r from-red-500 to-rose-600 hover:brightness-110 text-white shadow-md animate-pulse cursor-pointer`}
                  title="Stop conversation instantly"
                >
                  <motion.div style={{ rotate: iconRotate }}>
                    <PhoneOff size={12} fill="currentColor" strokeWidth={0} className="stroke-none" />
                  </motion.div>
                </button>

                {/* Screenshare icon */}
                <button
                  onClick={handleStartScreenshare}
                  className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                  title="Screenshare & analyze"
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                    <ScreenShare size={11} className="text-emerald-400" />
                  </motion.div>
                </button>

                {/* Camera icon */}
                <button
                  onClick={handleStartCamera}
                  className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                  title="Camera view & voice chat"
                >
                  <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                    <Camera size={11} className="text-cyan-400" />
                  </motion.div>
                </button>

                {/* Change template theme */}
                <button
                  onClick={cycleTheme}
                  className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                  title="Change visual style (10 templates)"
                >
                  <Palette size={11} />
                </button>

                {/* Switch widget type */}
                <button
                  onClick={(e) => { e.stopPropagation(); setWidgetType('standard'); }}
                  className={`p-1.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${activeTheme.compactBtnClass}`}
                  title="Switch to Standard view"
                >
                  <Layers size={11} className="text-cyan-400" />
                </button>
              </div>

              {/* Action indicator status mode icon */}
              <div className="shrink-0 flex items-center justify-center p-1.5 rounded bg-black/30 border border-white/10" title="Realtime status">
                {isSpeaking ? (
                  <Volume2 size={11} className="text-amber-400 animate-bounce" />
                ) : isThinking ? (
                  <Cpu size={11} className="text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                ) : isListening ? (
                  <Mic size={11} className="text-emerald-400 animate-pulse" />
                ) : (
                  <Radio size={11} className="text-zinc-500 opacity-60" />
                )}
              </div>
            </div>

            {/* Live recognized transcript ticker */}
            <div className={`p-1.5 text-[9px] text-center italic select-none border border-white/5 rounded bg-black/25 overflow-hidden truncate ${activeTheme.accentText}`}>
              {transcript ? (
                <span>"{transcript}"</span>
              ) : (
                <span className="opacity-40">"Awaiting voice capture..."</span>
              )}
            </div>
          </motion.div>
        )}

        {/* State: COMPLETED (Compact) */}
        {widgetType === 'compact' && state === 'completed' && (
          <motion.div
            key="compact-widget-completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex items-center gap-2.5 p-2 px-3 relative overflow-hidden border ${activeTheme.compactPanelClass} ${activeTheme.font}`}
          >
            <div className="p-1 px-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full shrink-0">
              <Check size={11} strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`block text-[9px] uppercase tracking-wider font-extrabold ${activeTheme.accentText} truncate`}>SAVED</span>
            </div>
            <button
              onClick={handleClose}
              className={`p-1 px-2.5 text-[9px] rounded cursor-pointer ${activeTheme.primaryBtnClass} uppercase tracking-tighter`}
            >
              Done
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
