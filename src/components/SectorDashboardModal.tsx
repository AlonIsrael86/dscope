import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTOR_AUTOMATIONS } from '../data/sectorAutomations';
import { SpaceTech2D } from './SpaceTech2D';
import { Search, Terminal, Cpu, ArrowRight, Share2, Workflow, Bot, Filter, Plus, User, Check, ChevronDown, ArrowLeft, X, Clock, DollarSign, Users, Briefcase, Building, CheckCircle2, Circle, Mic, Upload, Play, Phone, Mail, MapPin, Globe, Loader2, PlayCircle, XCircle, Hourglass, Database, Activity, AlertTriangle, TrendingUp, Rocket, Sparkles } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from "@google/genai";

const USERS = [
  { id: 'u1', name: 'Agent 01', role: 'Neural Architect' },
  { id: 'u2', name: 'Agent 02', role: 'Support Specialist' },
  { id: 'u3', name: 'Agent 03', role: 'Ops Lead' },
  { id: 'u4', name: 'Agent 04', role: 'Data Scientist' },
  { id: 'u5', name: 'Agent 05', role: 'System Auditor' },
];

declare global {
  interface Window {
    livePlaybackCtx?: AudioContext;
  }
}

const getRoleJobDescription = (role: string) => {
  const lowercaseRole = role.toLowerCase();
  
  if (lowercaseRole.includes('agent') || lowercaseRole.includes('representative') || lowercaseRole.includes('support') || lowercaseRole.includes('cashier')) {
    return 'Responsible for front-line interactions, query resolution, and processing standard requests. High volume of repetitive data entry and customer inquiry handling which can be significantly automated using conversational AI and smart OCR.';
  }
  if (lowercaseRole.includes('manager') || lowercaseRole.includes('supervisor') || lowercaseRole.includes('coordinator') || lowercaseRole.includes('planner')) {
    return 'Oversees team operations, resource allocation, and strategic execution. A significant portion of reporting, scheduling, tracking operations, and predictive analytics can be augmented by AI, allowing them to focus on high-impact leadership.';
  }
  if (lowercaseRole.includes('analyst') || lowercaseRole.includes('actuary') || lowercaseRole.includes('officer') || lowercaseRole.includes('auditor')) {
    return 'Focuses on rigorous data analysis, risk evaluation, and compliance monitoring. AI can automate the data gathering, cross-referencing, and initial pattern recognition layers of these tasks with near-perfect accuracy and high throughput.';
  }
  if (lowercaseRole.includes('doctor') || lowercaseRole.includes('nurse') || lowercaseRole.includes('lawyer') || lowercaseRole.includes('architect') || lowercaseRole.includes('scientist')) {
    return 'Highly specialized role focused on expert decision making and care/design. AI acts as a powerful co-pilot, automating exhaustive paperwork, deep-dive research, and preliminary diagnostics to free up time for core creative and critical thinking.';
  }
  if (lowercaseRole.includes('clerk') || lowercaseRole.includes('secretary') || lowercaseRole.includes('admin') || lowercaseRole.includes('adjuster') || lowercaseRole.includes('coder')) {
    return 'Handles structured administrative workflows, document management, and coordination. These roles have the highest potential for end-to-end automation of their core tasks, transforming from manual data-movers into exception-handlers.';
  }
  
  return 'Responsible for critical operational tasks within their department. AI can streamline their daily workflows by automating routine data processing, predictive modeling, and providing intelligent recommendations.';
};

const getFutureRoleName = (role: string) => {
  const lowercaseRole = role.toLowerCase();
  if (lowercaseRole.includes('agent') || lowercaseRole.includes('representative') || lowercaseRole.includes('support')) return 'AI-Augmented ' + role.replace(/Agent|Representative|Support/ig, 'Specialist');
  if (lowercaseRole.includes('admin') || lowercaseRole.includes('coordinator') || lowercaseRole.includes('planner') || lowercaseRole.includes('manager')) return 'Autonomous ' + role.replace(/Admin|Coordinator|Planner|Manager/ig, 'Orchestrator');
  if (lowercaseRole.includes('analyst') || lowercaseRole.includes('officer') || lowercaseRole.includes('auditor') || lowercaseRole.includes('actuary')) return 'Neural Data ' + role.replace(/Analyst|Officer|Auditor|Actuary/ig, 'Synthesizer');
  if (lowercaseRole.includes('clerk') || lowercaseRole.includes('secretary') || lowercaseRole.includes('cashier')) return 'Digital ' + role.replace(/Clerk|Secretary|Cashier/ig, 'Controller');
  if (lowercaseRole.includes('worker') || lowercaseRole.includes('operator')) return 'System ' + role.replace(/Worker|Operator/ig, 'Overseer');
  
  const words = role.split(' ');
  const lastWord = words.pop();
  return 'Agentic ' + role;
};

const getSectorRoles = (sectorName: string) => {
  const rolesMap: Record<string, { roles: string[], departments: string[] }> = {
    "Insurance": {
      roles: ['Insurance Agent', 'Underwriter', 'Claims Adjuster', 'Actuary', 'Customer Support', 'Investigations Officer', 'Policy Admin'],
      departments: ['Claims', 'Underwriting', 'Customer Service', 'Actuarial', 'Legal', 'Sales']
    },
    "Healthcare": {
      roles: ['Medical Secretary', 'Doctor', 'Nurse', 'Medical Coder', 'Hospital Admin', 'Lab Technician', 'Patient Coordinator'],
      departments: ['Administration', 'Clinical Operations', 'Billing', 'Emergency', 'Records', 'Laboratory']
    },
    "Legal Discovery": {
      roles: ['Lawyer', 'Paralegal', 'Legal Secretary', 'Compliance Officer', 'Legal Tech Admin', 'Contract Manager'],
      departments: ['Litigation', 'Corporate Law', 'Compliance', 'Contracts', 'IP', 'Discovery']
    },
    "Financial Ops": {
      roles: ['Financial Manager', 'Accountant', 'Compliance Officer', 'Risk Analyst', 'Auditor', 'Clerk', 'Investment Advisor'],
      departments: ['Accounting', 'Audit', 'Risk Management', 'Compliance', 'Wealth Management', 'Operations']
    },
    "Real Estate": {
      roles: ['Real Estate Agent', 'Property Manager', 'Appraiser', 'Leasing Consultant', 'Broker', 'Maintenance Coordinator'],
      departments: ['Sales', 'Property Management', 'Valuation', 'Marketing', 'Leasing']
    },
    "Retail & Commerce": {
      roles: ['Store Manager', 'Inventory Planner', 'Cashier', 'Customer Service Rep', 'Merchandiser', 'Supply Chain Coordinator'],
      departments: ['Sales', 'Inventory', 'Customer Service', 'Marketing', 'Logistics']
    },
    "Global Delivery": {
      roles: ['Dispatcher', 'Logistics Coordinator', 'Driver', 'Fleet Manager', 'Customs Analyst', 'Warehouse Manager'],
      departments: ['Logistics', 'Fleet Operations', 'Warehousing', 'Customs', 'Planning']
    },
    "Shipping & Freight": {
      roles: ['Freight Forwarder', 'Customs Broker', 'Port Manager', 'Logistics Analyst', 'Dock Worker Coordinator'],
      departments: ['Operations', 'Customs', 'Port Management', 'Logistics', 'Shipping']
    },
    "Factory Processes": {
      roles: ['Plant Manager', 'Production Supervisor', 'Quality Inspector', 'Maintenance Engineer', 'Machine Operator', 'Safety Officer'],
      departments: ['Production', 'Quality Control', 'Maintenance', 'Health & Safety', 'Engineering']
    },
    "Construction": {
      roles: ['Project Manager', 'Site Supervisor', 'Estimator', 'Architect', 'Safety Inspector', 'Equipment Manager'],
      departments: ['Project Management', 'Engineering', 'Safety', 'Procurement', 'Design']
    },
    "Pharma": {
      roles: ['Research Scientist', 'Clinical Trial Coordinator', 'Regulatory Affairs Manager', 'Lab Technician', 'Quality Assurance'],
      departments: ['R&D', 'Clinical Trials', 'Regulatory', 'Quality', 'Manufacturing']
    },
    "Automotive": {
      roles: ['Design Engineer', 'Assembly Line Supervisor', 'Quality Inspector', 'Supply Chain Analyst', 'Dealership Manager'],
      departments: ['Engineering', 'Manufacturing', 'Quality Assurance', 'Supply Chain', 'Sales']
    },
    "Cyber Security": {
      roles: ['Security Analyst', 'Penetration Tester', 'SOC Engineer', 'Compliance Manager', 'Incident Responder'],
      departments: ['Security Operations', 'Compliance', 'Threat Intelligence', 'Red Team', 'Incident Response']
    },
    "Public Sector": {
      roles: ['Case Worker', 'Public Administrator', 'Policy Advisor', 'City Planner', 'Clerk'],
      departments: ['Social Services', 'Administration', 'Policy', 'Urban Planning', 'Records']
    },
    "default": {
      roles: ['Operations Manager', 'Data Analyst', 'QA Specialist', 'Client Relations', 'Administrator', 'Department Head', 'Process Coordinator'],
      departments: ['Operations', 'Administration', 'Client Services', 'Quality Assurance', 'Strategy', 'Planning']
    }
  };

  return rolesMap[sectorName] || rolesMap["default"];
};

const InterviewAgentOverlay = ({ state, role, onClose, onStart }: { state: 'idle' | 'form' | 'active', role: any, onClose: () => void, onStart: () => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', state: '', region: '' });
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});
  
  const validateAndStart = () => {
    let newErrors: {name?: string, email?: string} = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Invalid name';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onStart();
  };

  const [agentNotes, setAgentNotes] = useState<string[]>([]);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const sessionRef = useRef<any>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // Buffer notes locally because closure captures state
  const notesRef = useRef<string[]>([]);

  useEffect(() => {
    let ai: any;
    try {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch(e) {
      console.warn("Could not initialize GoogleGenAI. Provide process.env.GEMINI_API_KEY", e);
    }

    if (state === 'active' && !sessionRef.current) {
      notesRef.current = [];
      setAgentNotes([]);
      let isDisconnecting = false;
      const initLiveConnect = async () => {
        try {
          if (!ai) return;
          
          let stream: MediaStream | null = null;
          try {
            // Request microphone FIRST to preserve user gesture and verify permissions
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
          } catch (micErr) {
            console.error("Microphone permission denied:", micErr);
            setAiMessage("Microphone permission denied. Please allow microphone access in your browser or open in a new tab.");
            return;
          }
          
          const recordNoteDeclaration = {
            name: "record_note",
            description: "Records a brief objective bullet point note of the candidate's skills, answers, and evaluations gathered.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                note: { type: Type.STRING }
              },
              required: ["note"]
            }
          };

          const sysPrompt = `You are a professional HR recruiter named Harmonics AI. You are interviewing the candidate for the role of ${role?.role}.
Your goal is to ask them about their industry experience and verify their knowledge based on standard requirements for this role.
Keep your spoken responses very brief, asking one specific question at a time. Act conversational. Introduce yourself in the first turn.
You MUST call the tool "record_note" whenever you learn a new detail about the candidate's experience or evaluate their answer.`;

          const sessionPromise = ai.live.connect({
            model: "gemini-3.1-flash-live-preview",
            callbacks: {
              onopen: () => {
                setAiMessage("Connected. Listening...");
                if (stream) {
                  startAudioCapture(sessionPromise, stream);
                }
              },
              onmessage: async (message: LiveServerMessage) => {
                if (message.serverContent?.interrupted) {
                  // user interrupted
                  if (audioContextRef.current) {
                     nextStartTimeRef.current = audioContextRef.current.currentTime;
                  }
                }
                
                // Handle tools
                const tools = message.serverContent?.modelTurn?.parts;
                if (tools) {
                  for (let i = 0; i < tools.length; i++) {
                    const c = tools[i];
                    if (c.functionCall && c.functionCall.name === 'record_note') {
                       const arg = (c.functionCall.args as any)?.note;
                       if (arg) {
                          notesRef.current = [...notesRef.current, arg];
                          setAgentNotes(notesRef.current);
                       }
                       // Respond to tool
                       sessionPromise.then((s: any) => s.sendToolResponse({
                          functionResponses: [{
                            id: c.functionCall.id,
                            name: c.functionCall.name,
                            response: { success: true }
                          }]
                       }));
                    }
                  }
                }

                // Handle text to show in UI
                if (message.serverContent?.modelTurn?.parts) {
                   const txt = message.serverContent?.modelTurn?.parts?.map(p => p.text).filter(Boolean).join('');
                   if (txt) {
                      setAiMessage(prev => {
                        // If we were just connecting or showing a placeholder, replace it.
                        // Otherwise, append the new chunk.
                        const isPlaceholder = prev.includes('Connecting...') || prev.includes('Connected. Listening...');
                        return isPlaceholder ? txt : prev + txt;
                      });
                   }
                }

                // Handle raw PCM audio
                const base64Audio = message.serverContent?.modelTurn?.parts?.find(p => p.inlineData)?.inlineData?.data;
                if (base64Audio) {
                  playPcmAudio(base64Audio);
                }
              },
              onerror: (e: any) => {
                console.error("Live API Error", e);
                setAiMessage("Connection error.");
              },
              onclose: () => {
                 setAiMessage("Session ended.");
                 stopAudioCapture();
              }
            },
            config: {
              systemInstruction: sysPrompt,
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } }
              },
              tools: [{ functionDeclarations: [recordNoteDeclaration] }]
            }
          });
          
          sessionRef.current = sessionPromise;
          setAiMessage("Connecting to Harmonics AI...");
          
        } catch (err) {
          console.error("Gemini Error:", err);
          setAiMessage("Error connecting to Gemini. Please check API key.");
        }
      };
      
      initLiveConnect();
    }
  }, [state]);

  const startAudioCapture = async (sessionPromise: any, stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        console.error("AudioContext not supported");
        return;
      }
      const audioContext = new AudioCtx({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      
      if (!processor) {
        console.error("Failed to create audio processor");
        return;
      }

      processor.onaudioprocess = (e) => {
        const pcmFloat = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(pcmFloat.length);
        for (let i = 0; i < pcmFloat.length; i++) {
            pcm16[i] = Math.max(-32768, Math.min(32767, pcmFloat[i] * 32768));
        }
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
        sessionPromise.then((session: any) => {
           // send Realtime input buffer to Gemini
           session.sendRealtimeInput({
             audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
           });
        });
      };
      source.connect(processor);
      processor.connect(audioContext.destination);
      audioProcessorRef.current = processor;
      setIsListening(true);
    } catch (e) {
      console.error("Error starting mic", e);
      setAiMessage("Error: Could not access microphone.");
    }
  };

  const stopAudioCapture = () => {
    if (audioProcessorRef.current) {
       audioProcessorRef.current.disconnect();
       audioProcessorRef.current = null;
    }
    if (mediaStreamRef.current) {
       mediaStreamRef.current.getTracks().forEach(track => track.stop());
       mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
       audioContextRef.current.close();
       audioContextRef.current = null;
    }
    setIsListening(false);
  };

  const playPcmAudio = (base64Data: string) => {
     if (!audioContextRef.current) return;
     const audioContext = audioContextRef.current; // 16kHz context is okay for playback too but it's better to match 24kHz. However we can use another context.
     // For simplicity we create a separate one for playback 24KHz
     if (!window.livePlaybackCtx) {
        window.livePlaybackCtx = new AudioContext({ sampleRate: 24000 });
     }
     const playCtx = window.livePlaybackCtx;
     
     const binary = atob(base64Data);
     const pcm16 = new Int16Array(binary.length / 2);
     for (let i = 0; i < pcm16.length; i++) {
        pcm16[i] = binary.charCodeAt(i*2) | (binary.charCodeAt(i*2+1) << 8);
        if (pcm16[i] > 32767) pcm16[i] -= 65536;
     }
     const float32 = new Float32Array(pcm16.length);
     for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768;
     }
     
     const buffer = playCtx.createBuffer(1, float32.length, 24000);
     buffer.getChannelData(0).set(float32);
     
     const source = playCtx.createBufferSource();
     source.buffer = buffer;
     source.connect(playCtx.destination);
     
     if (nextStartTimeRef.current < playCtx.currentTime) {
        nextStartTimeRef.current = playCtx.currentTime;
     }
     source.start(nextStartTimeRef.current);
     nextStartTimeRef.current += buffer.duration;
  };

  const handleClose = () => {
    stopAudioCapture();
    if (sessionRef.current) {
       sessionRef.current.then((s:any) => s.close());
    }
    sessionRef.current = null;
    onClose();
  }

  if (state === 'idle') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#050a15]/90 backdrop-blur-xl"
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[100px] rounded-full" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative z-10 w-full h-full bg-[#05060f] flex flex-col overflow-y-auto pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Harmonics Voice Agent</h3>
                <p className="text-white/40 text-xs flex items-center gap-1"><Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> Online • Interviewing for {role?.role}</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8">
            {state === 'form' ? (
              <div className="space-y-6 max-w-lg mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-display font-black text-white mb-3 tracking-tighter uppercase">Candidate Registration</h2>
                  <p className="text-white/50 text-sm font-mono uppercase tracking-widest">Initialization of Harmonics AI Recruiter Protocol</p>
                </div>

                <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-4">
                  <div className="flex flex-col gap-3">
                    <label className={`text-[10px] font-mono uppercase tracking-widest pl-2 ${errors.name ? 'text-red-400' : 'text-blue-400'}`} htmlFor="candidate-name">Full Name</label>
                    <input 
                      id="candidate-name"
                      type="text"
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 transition-all font-mono text-xs text-white`}
                      placeholder="ENTER ID..."
                      value={formData.name}
                      onChange={e => {
                        setFormData({...formData, name: e.target.value});
                        if (errors.name) setErrors({...errors, name: undefined});
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className={`text-[10px] font-mono uppercase tracking-widest pl-2 ${errors.email ? 'text-red-400' : 'text-blue-400'}`} htmlFor="candidate-email">Secure Email</label>
                    <input 
                      id="candidate-email"
                      type="email"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 transition-all font-mono text-xs text-white`}
                      placeholder="COMM-LINK..."
                      value={formData.email}
                      onChange={e => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: undefined});
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-mono uppercase text-blue-400 tracking-widest pl-2" htmlFor="candidate-phone">Contact Frequency</label>
                    <input 
                      id="candidate-phone"
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 transition-all font-mono text-xs text-white"
                      placeholder="CONTACT_PROTO_VAL..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-mono uppercase text-blue-400 tracking-widest pl-2" htmlFor="candidate-region">Tactical Region</label>
                    <input 
                      id="candidate-region"
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 transition-all font-mono text-xs text-white"
                      placeholder="GEO_LOCATION..."
                      value={formData.region}
                      onChange={e => setFormData({...formData, region: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-8 relative">
                  <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl text-center mb-8 group hover:bg-blue-500/15 transition-all duration-500">
                    <Mic className="w-10 h-10 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white font-bold mb-2">Voice Synthesis Required</h4>
                    <p className="text-xs text-blue-200/60 leading-relaxed uppercase tracking-tighter">Harmonics AI will process your vocal patterns for real-time interview evaluation. Ensure microphone access is permitted at the system level.</p>
                  </div>
                  
                  <motion.button 
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      validateAndStart();
                    }}
                    className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold text-white text-lg flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-400/30 group"
                  >
                    <PlayCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" /> 
                    <span className="uppercase tracking-[0.2em] text-sm">Initiate Voice Link</span>
                  </motion.button>
                </div>
              </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[400px] lg:min-h-[500px]">
              {/* Left side: Chat agent */}
              <div className="flex flex-col items-center justify-between text-center bg-[#070e1c] rounded-2xl p-8 border border-white/10 shadow-inner">
                  <div className="relative mt-4">
                    {/* Pulsing AI Circle */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping [animation-duration:2s]" />
                    <div className="absolute inset-[-20px] border border-blue-500/20 rounded-full" />
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                      <Bot className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  <div className="mt-12 max-w-sm w-full">
                    <h2 className="text-xl font-bold text-white mb-6">Live Voice Agent</h2>
                    <div className={`border rounded-xl p-5 relative text-left ${aiMessage.includes('denied') ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a1224] px-2 text-[10px] uppercase font-bold text-blue-400 tracking-wider">Harmonics AI Agent</div>
                      <p className={`italic ${aiMessage.includes('denied') ? 'text-red-400' : 'text-white/90'}`}>"{aiMessage || "Connecting..."}"</p>
                      
                      {aiMessage.includes('denied') && (
                        <div className="mt-4 pt-4 border-t border-red-500/30 space-y-3">
                          <p className="text-xs text-white/70">The microphone was blocked by your browser settings.</p>
                          <a href={window.location.href} target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-red-500/20 hover:bg-red-500/30 transition-colors rounded border border-red-500/50 text-white font-medium text-xs text-center">
                            Open App in New Tab to Allow
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-8 w-full">
                    <div className="flex items-center gap-4 justify-center">
                      <div className="w-12 h-1 rounded-full bg-blue-500/30 overflow-hidden relative">
                         {isListening && (
                           <motion.div 
                             className="absolute inset-y-0 left-0 bg-blue-500" 
                             animate={{ width: ['0%', '100%', '0%'] }} 
                             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                           />
                         )}
                      </div>
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isListening ? 'text-blue-400 opacity-60' : 'text-white/40'}`}>
                        {isListening ? 'Streaming Audio...' : 'Processing...'}
                      </span>
                      <div className="w-12 h-1 rounded-full bg-blue-500/30 overflow-hidden relative">
                         {isListening && (
                           <motion.div 
                             className="absolute inset-y-0 right-0 bg-blue-500" 
                             animate={{ width: ['0%', '100%', '0%'] }} 
                             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                           />
                         )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors text-sm font-bold w-full max-w-[150px] mx-auto block"
                    >
                      End Interview
                    </button>
                  </div>
                </div>

                {/* Right side: Notes */}
                <div className="flex flex-col bg-[#070e1c] rounded-2xl p-6 border border-white/10 shadow-inner">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Terminal className="w-5 h-5 text-emerald-400" />
                    </div>
                    Live Agent Notes
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {agentNotes.map((note, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm leading-relaxed">{note}</span>
                      </motion.div>
                    ))}
                    {agentNotes.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                          <Terminal className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-sm font-medium text-center px-4">Notes will be generated automatically via AI function calling...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AutomationTooltip = ({ autoId, automations }: { autoId: string | null, automations: any[] }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (autoId && typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('mousemove', updateMousePos);
      return () => window.removeEventListener('mousemove', updateMousePos);
    }
  }, [autoId]);

  return (
    <AnimatePresence>
      {autoId && (() => {
        const auto = automations.find((a:any) => a.id === autoId);
        if (!auto) return null;
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed z-[4000] pointer-events-none bg-[#0a1224]/95 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-2xl flex items-center gap-4"
            style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
          >
            <div className="flex flex-col">
              <span className="text-[9px] uppercase text-white/50 font-bold mb-0.5"><Cpu className="w-3 h-3 inline mr-1 -mt-0.5"/>CPU</span>
              <span className="text-xs text-white font-mono">{auto.metrics?.cpu}%</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase text-white/50 font-bold mb-0.5"><Database className="w-3 h-3 inline mr-1 -mt-0.5"/>MEM</span>
              <span className="text-xs text-white font-mono">{auto.metrics?.memory} MB</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase text-white/50 font-bold mb-0.5"><Activity className="w-3 h-3 inline mr-1 -mt-0.5"/>LAT</span>
              <span className="text-xs text-emerald-400 font-mono">{auto.metrics?.latency} ms</span>
            </div>
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};

const MultiSelect = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  icon: Icon 
}: { 
  label: string, 
  options: { label: string, value: string, icon?: any, color?: string }[], 
  selected: string[], 
  onChange: (values: string[]) => void,
  icon?: any
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all hover:bg-white/10 ${isOpen ? 'ring-1 ring-blue-500/50 border-blue-500/30' : ''}`}
      >
        {Icon && <Icon className="w-3 h-3 text-white/30" />}
        <span className={selected.length > 0 ? 'text-blue-400 font-bold' : 'text-white/50'}>
          {selected.length === 0 ? label : `${label} (${selected.length})`}
        </span>
        <ChevronDown className={`w-3 h-3 text-white/20 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-48 bg-[#0a1224] border border-white/10 rounded-xl shadow-2xl p-2 z-[100] backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto space-y-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleOption(opt.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[10px] font-mono tracking-wider transition-colors ${
                    selected.includes(opt.value) ? 'bg-blue-500/20 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {opt.icon && <opt.icon className={`w-3 h-3 ${opt.color || 'text-current'}`} />}
                    {opt.label}
                  </div>
                  {selected.includes(opt.value) && <Check className="w-3 h-3 text-blue-400" />}
                </button>
              ))}
            </div>
            {selected.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/5">
                <button 
                  onClick={() => onChange([])}
                  className="w-full py-1 text-[8px] font-mono text-white/20 hover:text-white/50 uppercase tracking-widest text-center"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SectorDashboardModal = ({ sector, onClose }: { sector: any, onClose: () => void }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'title' | 'savings' | 'status' | 'agent'>('priority');
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  const [interviewState, setInterviewState] = useState<'idle' | 'form' | 'active'>('idle');
  const [interviewRole, setInterviewRole] = useState<any>(null);

  // Generate automations securely if they don't exist
  const automations = useMemo(() => {
    if (!sector) return [];
    
    let baseAutomations = [];
    if (SECTOR_AUTOMATIONS[sector.name] && SECTOR_AUTOMATIONS[sector.name].length > 0) {
      baseAutomations = SECTOR_AUTOMATIONS[sector.name];
    } else {
      // Generate smaller fallback generic process examples
      const fallbackNodes = [
        { type: 'Agent', title: 'Data Ingestion', desc: 'Continuous stream capture of real-time sector metrics' },
        { type: 'API', title: 'Stream Processor', desc: 'Normalization and validation endpoints' },
        { type: 'Agent', title: 'Neural Analysis', desc: 'Predictive modeling applied to current state' },
        { type: 'Agent', title: 'Decision Engine', desc: 'Autonomous execution based on analysis outcomes' },
        { type: 'API', title: 'State Synchronizer', desc: 'Distributed state reconciliation process' },
        { type: 'Agent', title: 'Telemetry Monitor', desc: 'Watchdog service tracking overall system health' }
      ];
      
      fallbackNodes.forEach((node, i) => {
        baseAutomations.push({
          id: `auto-${i}`,
          ...node
        });
      });
    }
    
    const { roles, departments } = getSectorRoles(sector.name);

    // Inject status, metrics, and logs, plus enriched data
    return baseAutomations.map((a: any, index: number) => {
      const statusRoll = Math.random();
      const initialStatus = statusRoll > 0.85 ? 'failed' : statusRoll > 0.6 ? 'running' : 'success';
      
      const workerRole = roles[index % roles.length];
      const department = departments[index % departments.length];
      
      const hoursSaved = 1200 + Math.floor(Math.random() * 3000);
      const dollarPerHour = 35 + Math.floor(Math.random() * 45);
      const moneySaved = hoursSaved * dollarPerHour;
      const humansSaved = (hoursSaved / 2000).toFixed(1);
      const timeSavingsPercent = 25 + Math.floor(Math.random() * 55);
      
      const priorities = ['Low', 'Medium', 'High'];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];

      let milestones = [
        { title: "Identify Inefficiencies", status: "completed" },
        { title: "Deploy AI Worker", status: "completed" },
        { title: "Continuous Optimization", status: "in-progress" }
      ];

      if (a.title === 'Customer Onboarding') {
        milestones = [
          { title: "Document Verification", status: "completed" },
          { title: "Risk Classification", status: "failed" },
          { title: "Identity Validation", status: "in-progress" },
          { title: "Account Provisioning", status: "pending" }
        ];
      }

      const assignedAgent = USERS[index % USERS.length];

      return {
        ...a,
        initialStatus,
        workerRole,
        department,
        hoursSaved,
        dollarPerHour,
        moneySaved,
        humansSaved,
        timeSavingsPercent,
        milestones,
        assignedAgent,
        history: Array.from({ length: 10 }, (_, i) => ({
          time: i,
          cpu: Math.floor(Math.random() * 60 + 20),
          memory: Math.floor(Math.random() * 512 + 512),
          latency: Math.floor(Math.random() * 100 + 20),
        })),
        metrics: {
          cpu: Math.floor(Math.random() * 80 + 10),
          memory: Math.floor(Math.random() * 1024 + 128),
          latency: Math.floor(Math.random() * 200 + 10),
        },
        priority,
        logs: [
          `[${new Date().toISOString()}] Initializing node ${a.id}...`,
          `[${new Date().toISOString()}] Connecting to remote cluster...`,
          initialStatus === 'failed' ? `[${new Date().toISOString()}] ERROR: Handshake timeout or connection refused.` : `[${new Date().toISOString()}] Connection established, stream active.`,
        ]
      };
    });
  }, [sector]);

  const [localStatuses, setLocalStatuses] = useState<Record<string, string>>({});
  const [localLogs, setLocalLogs] = useState<Record<string, string[]>>({});
  const [localMilestoneStatuses, setLocalMilestoneStatuses] = useState<Record<string, Record<number, string>>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [animatingAvatars, setAnimatingAvatars] = useState<Record<string, boolean>>({});
  const [hoveredAutomation, setHoveredAutomation] = useState<string | null>(null);

  const roleGroups = useMemo(() => {
    const groups: Record<string, { role: string, futureRole: string, department: string, totalHoursSaved: number, totalMoneySaved: number, automations: any[], avgTimeSavingsPercent: number }> = {};
    
    automations.forEach((auto: any) => {
      if (!groups[auto.workerRole]) {
         groups[auto.workerRole] = {
           role: auto.workerRole,
           futureRole: getFutureRoleName(auto.workerRole),
           department: auto.department,
           totalHoursSaved: 0,
           totalMoneySaved: 0,
           automations: [],
           avgTimeSavingsPercent: 0
         };
      }
      groups[auto.workerRole].automations.push(auto);
      groups[auto.workerRole].totalHoursSaved += auto.hoursSaved;
      groups[auto.workerRole].totalMoneySaved += auto.moneySaved;
    });

    Object.values(groups).forEach(g => {
       const totalPct = g.automations.reduce((sum, a) => sum + (a.timeSavingsPercent || 0), 0);
       g.avgTimeSavingsPercent = Math.round(totalPct / g.automations.length);
    });

    return Object.values(groups);
  }, [automations, sector.color]);

  const handleRetry = (e: React.MouseEvent, id: string, existingLogs: string[]) => {
    e.stopPropagation();
    setLocalStatuses(prev => ({ ...prev, [id]: 'running' }));
    
    const newLogs = [
      ...existingLogs,
      `[${new Date().toISOString()}] WARN: Manual retry initiated by operator...`,
      `[${new Date().toISOString()}] Rebooting node configuration...`
    ];
    setLocalLogs(prev => ({ ...prev, [id]: newLogs }));

    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success on retry
      setLocalStatuses(prev => ({ ...prev, [id]: success ? 'success' : 'failed' }));
      setLocalLogs(prev => ({ 
        ...prev, 
        [id]: [
          ...newLogs,
          success ? `[${new Date().toISOString()}] Retry SUCCESS. Re-established neural link.` : `[${new Date().toISOString()}] Retry ERROR. Target host unreachable.`
        ] 
      }));
    }, 2500);
  };

  const handleToggleMilestone = (automationId: string, milestoneIdx: number, currentStatus: string) => {
    if (currentStatus === 'completed') return; // Stay completed for demo
    
    // Play a sound effect or trigger vibration if supported? Let's just do visual.
    setLocalMilestoneStatuses(prev => ({
      ...prev,
      [automationId]: {
        ...(prev[automationId] || {}),
        [milestoneIdx]: 'completed'
      }
    }));
  };

  const filteredAutomations = useMemo(() => {
    const list = automations.filter((a: any) => {
      const currentStatus = localStatuses[a.id] || a.initialStatus;
      const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = selectedTypes.length > 0 ? selectedTypes.includes(a.type) : true;
      const matchRole = selectedRole ? a.workerRole === selectedRole : true;
      const matchPriority = selectedPriorities.length > 0 ? selectedPriorities.includes(a.priority) : true;
      const matchStatus = selectedStatuses.length > 0 ? selectedStatuses.includes(currentStatus) : true;
      const matchAgent = selectedAgents.length > 0 ? selectedAgents.includes(a.assignedAgent.id) : true;
      return matchSearch && matchFilter && matchRole && matchPriority && matchStatus && matchAgent;
    }).map((a: any) => {
      const milestones = a.milestones.map((ms: any, mIdx: number) => ({
        ...ms,
        status: (localMilestoneStatuses[a.id] && localMilestoneStatuses[a.id][mIdx]) || ms.status
      }));

      return {
        ...a,
        status: localStatuses[a.id] || a.initialStatus,
        logs: localLogs[a.id] || a.logs || [],
        milestones
      };
    });

    if (sortBy === 'priority') {
      const pMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return [...list].sort((a, b) => (pMap[b.priority as keyof typeof pMap] || 0) - (pMap[a.priority as keyof typeof pMap] || 0));
    } else if (sortBy === 'title') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'savings') {
      return [...list].sort((a, b) => b.moneySaved - a.moneySaved);
    } else if (sortBy === 'status') {
      const sMap = { 'failed': 3, 'running': 2, 'success': 1 };
      return [...list].sort((a, b) => (sMap[b.status as keyof typeof sMap] || 0) - (sMap[a.status as keyof typeof sMap] || 0));
    } else if (sortBy === 'agent') {
      return [...list].sort((a, b) => a.assignedAgent.name.localeCompare(b.assignedAgent.name));
    }

    return list;
  }, [automations, searchQuery, selectedTypes, selectedRole, selectedPriorities, selectedStatuses, selectedAgents, localStatuses, localLogs, localMilestoneStatuses, sortBy]);

  useEffect(() => {
    // Hide main logo while modal is open
    const logo = document.querySelector('header[role="banner"]');
    if (logo) (logo as HTMLElement).style.display = 'none';
    
    return () => {
      // Restore main logo on close
      if (logo) (logo as HTMLElement).style.display = 'block';
    };
  }, [sector]);

  if (!sector) return null;

  const mcrAutomation = sector.automation || Math.floor(70 + Math.random() * 25);
  const mcrEfficiency = sector.efficiency || Math.floor(75 + Math.random() * 20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[2000] w-full h-full bg-[#00000a] flex flex-col overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
       <div className="relative w-full flex-grow pt-12 md:pt-24 pb-12 flex flex-col">
          {/* Header */}
          <div className="flex-none px-4 md:px-8 pb-8 border-b border-white/5 relative z-20">
            <div className="flex flex-col md:flex-row items-center justify-center mb-6 relative w-full pt-12 md:pt-0">
          {/* Sticky Left Back Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center gap-4 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full py-8 px-4 transition-all text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border-white/20 border border-white/5 bg-black/40 backdrop-blur-xl z-[2000] cursor-pointer pointer-events-auto group"
            aria-label="Back to previous page"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-y-2 transition-transform" />
            <div className="h-12 w-px bg-white/20 group-hover:bg-white/40 transition-colors" />
            <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-blue-400 transition-colors">
              Return
            </span>
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="md:hidden absolute left-4 top-4 flex items-center gap-2 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full px-4 py-2 transition-all text-white shrink-0 group font-mono text-xs tracking-widest uppercase border border-white/10 bg-black/40 backdrop-blur-md z-[2000] cursor-pointer pointer-events-auto"
            aria-label="Back to previous page"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

           <div className="text-center px-4 md:px-12 relative w-full mx-auto">
                 <div className="absolute -top-12 left-0 w-16 h-16 opacity-30 pointer-events-none">
                    <SpaceTech2D type="spaceship" color="#ffffff" />
                 </div>
                 <div className="absolute -top-12 right-0 w-16 h-16 opacity-30 pointer-events-none">
                    <SpaceTech2D type="satellite" color="#ffffff" />
                 </div>
                 <h1 className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-[0.5em] mb-2">Efficiency Dashboard</h1>
                 <h2 className="text-xl md:text-3xl font-display font-bold text-white tracking-tighter drop-shadow-md">{sector.name} Operational Matrix</h2>
                 <p className="text-xs text-white/40 font-mono uppercase tracking-widest">{sector.desc || `Autonomous coordination platform for ${sector.name}`}</p>
               </div>
             </div>
             
             {/* Explanation Text */}
             <div className="p-4 md:p-5 max-w-4xl opacity-80">
               <div className="flex items-start gap-3">
                 <Bot className="w-5 h-5 mt-0.5" style={{ color: sector.color }} />
                 <div>
                   <h3 className="text-sm font-semibold text-white mb-1">Architecture Overview</h3>
                   <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
                     This diagram visualizes the active autonomous neural pathways for the {sector.name} sector. 
                     The network utilizes AI Agents (nodes), high-throughput APIs, and Event Triggers working in seamless synchronization. 
                     Each node executes predictive tasks while adapting to real-time micro-fluctuations, ensuring optimal operational flow.
                   </p>
                 </div>
               </div>
             </div>

             <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="flex items-center gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <MultiSelect 
                      label="Type"
                      options={[
                        { label: 'Agent', value: 'Agent' },
                        { label: 'API', value: 'API' }
                      ]}
                      selected={selectedTypes}
                      onChange={setSelectedTypes}
                      icon={Workflow}
                    />

                    <MultiSelect 
                      label="Priority"
                      options={[
                        { label: 'High', value: 'High' },
                        { label: 'Medium', value: 'Medium' },
                        { label: 'Low', value: 'Low' }
                      ]}
                      selected={selectedPriorities}
                      onChange={setSelectedPriorities}
                      icon={AlertTriangle}
                    />

                    <MultiSelect 
                      label="Status"
                      options={[
                        { label: 'Success', value: 'success', icon: CheckCircle2, color: 'text-emerald-400' },
                        { label: 'Failed', value: 'failed', icon: AlertTriangle, color: 'text-red-400' },
                        { label: 'Running', value: 'running', icon: PlayCircle, color: 'text-blue-400' }
                      ]}
                      selected={selectedStatuses}
                      onChange={setSelectedStatuses}
                      icon={Activity}
                    />
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:max-w-xl">
                 <div className="relative flex-1 group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className={`h-4 w-4 transition-colors duration-300 ${searchQuery ? 'text-white' : 'text-white/40'} group-focus-within:text-white`} />
                   </div>
                   <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-2xl bg-white/5 text-white placeholder-white/20 text-sm transition-all duration-300 font-mono tracking-tight"
                     placeholder="ENTER QUERY PARAMETERS..." aria-label="Search nodes"
                   />
                 </div>

                 <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 shrink-0 hover:bg-white/10 transition-colors">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mr-1">Sort:</span>
                    <select 
                      value={sortBy} 
                      onChange={(e: any) => setSortBy(e.target.value)}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none cursor-pointer uppercase tracking-tighter"
                    >
                      <option value="priority" className="bg-[#050a15] text-white">Priority</option>
                      <option value="title" className="bg-[#050a15] text-white">Title</option>
                      <option value="savings" className="bg-[#050a15] text-white">Savings</option>
                      <option value="status" className="bg-[#050a15] text-white">Status</option>
                    </select>
                 </div>
               </div>
             </div>
           </div>

           <div className="flex-1 overflow-y-auto overflow-x-hidden bg-transparent custom-scrollbar relative">
               {/* Removed Big 3D Model Background as requested */}
               <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex justify-center items-center">
                 <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]">
                   <SpaceTech2D type="spacestation" color={sector.color} />
                 </div>
               </div>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-20 blur-[100px] pointer-events-none" style={{ backgroundColor: sector.color }} />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />

            {/* Schematic Network Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-500">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="glow-line-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  <linearGradient id="glow-line-active" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor={sector.color} />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                {filteredAutomations.map((auto: any, i: number) => {
                  const isHovered = hoveredAutomation === auto.id;
                  const x1 = 10 + (i * 15) % 80;
                  const y1 = 20 + (i * 25) % 60;
                  const x2 = 90 - (i * 10) % 80;
                  const y2 = 80 - (i * 20) % 60;
                  return (
                    <path 
                      key={`path-${auto.id}`}
                      d={`M ${x1}vw ${y1}vh Q 50vw 50vh ${x2}vw ${y2}vh`}
                      fill="transparent"
                      stroke={isHovered ? "url(#glow-line-active)" : "url(#glow-line-normal)"}
                      strokeWidth={isHovered ? 4 : 1}
                      className="transition-all duration-300"
                      style={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none' }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Hover Tooltip Overlay */}
            <AutomationTooltip autoId={hoveredAutomation} automations={filteredAutomations} />

            <div className="relative z-10 w-full px-0 md:px-8 lg:px-12 pb-20 flex flex-col">
              {/* Sector Intelligence Overview */}
              <div className="w-full max-w-7xl mx-auto pt-4 mb-16 px-4 md:px-0 order-1">
                <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl mb-8">
                  <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1 space-y-6">
                      <h3 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                        <span style={{ color: sector.color }}>{sector.name}</span> Automation Yield
                      </h3>
                      <p className="text-white/60 font-light leading-relaxed text-lg">
                        The transformation of {sector.name} represents a fundamental shift from human-executed repetitive tasks to autonomous agent-driven ecosystems. By 2030, this transition unlocks exponential value, enabling highly specialized future products inherently managed by non-human intelligence.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 p-6 bg-black/40 rounded-3xl border border-white/5">
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Projected TAM (2030)</div>
                          <div className="text-3xl font-black text-white flex items-center gap-2">
                             ${(mcrAutomation * 1.5).toFixed(1)}B <TrendingUp className="w-5 h-5 text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">AI Execution Dependency</div>
                          <div className="text-3xl font-black text-white flex items-center gap-2">
                             {mcrEfficiency}% <Rocket className="w-5 h-5 text-blue-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 w-full space-y-8">
                       <div className="space-y-4">
                         <h4 className="flex items-center gap-3 text-white font-medium uppercase tracking-widest text-xs border-b border-white/5 pb-2">
                           <Bot className="w-4 h-4 text-blue-400" /> Key Capabilities
                         </h4>
                         <ul className="space-y-3">
                           <li className="flex items-start gap-3">
                             <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                             <span className="text-sm text-white/70 font-light">Self-healing operational pipelines and error-routing without human oversight.</span>
                           </li>
                           <li className="flex items-start gap-3">
                             <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                             <span className="text-sm text-white/70 font-light">Predictive constraint modeling anticipating {sector.name} supply/demand shifts.</span>
                           </li>
                           <li className="flex items-start gap-3">
                             <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                             <span className="text-sm text-white/70 font-light">Continuous synchronization across isolated legacy mainframes.</span>
                           </li>
                         </ul>
                       </div>

                       <div className="space-y-4">
                         <h4 className="flex items-center gap-3 text-white font-medium uppercase tracking-widest text-xs border-b border-white/5 pb-2">
                           <Sparkles className="w-4 h-4 text-purple-400" /> Future Products
                         </h4>
                         <ul className="space-y-3">
                           <li className="flex items-start gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                             <span className="text-sm text-white/70 font-light">Autonomous compliance & regulatory adherence modules.</span>
                           </li>
                           <li className="flex items-start gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                             <span className="text-sm text-white/70 font-light">Agent-first {sector.name} customer resolution terminals.</span>
                           </li>
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

               {/* Worker Roles Overview */}
               <div className="w-full mx-auto pt-8 mb-12 order-3">
                 <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 px-4 md:px-0">
                    <Users className="w-8 h-8" style={{ color: sector.color }} />
                    Sector Worker Roles & Automation Potential
                 </h2>
                 <div className="flex flex-col gap-8 md:gap-12 max-w-3xl mx-auto w-full">
                   {roleGroups.map(group => (
                     <div 
                       key={group.role}
                       className={`p-8 md:p-12 cursor-pointer hover:-translate-y-2 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-white/[0.02] hover:bg-white/[0.05] border-y md:border-x border-white/5 hover:border-blue-500/30 md:rounded-[2.5rem]`}
                       onClick={() => setSelectedRole(selectedRole === group.role ? null : group.role)}
                       role="button"
                       tabIndex={0}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter' || e.key === ' ') {
                           e.preventDefault();
                           setSelectedRole(selectedRole === group.role ? null : group.role);
                         }
                       }}
                     >
                       <h3 className="text-center text-white font-black mb-4 text-3xl md:text-5xl pt-2 break-words leading-tight drop-shadow-md" title={group.futureRole}>{group.futureRole}</h3>
                       <p className="text-center text-blue-400 text-lg md:text-3xl uppercase font-bold tracking-wider mb-6 line-through italic" title={group.role}>{group.role}</p>
                       <p className="text-center text-white/50 text-sm md:text-lg mb-8 px-2 line-clamp-1">{group.department}</p>
                       <div className="bg-blue-500/10 rounded-2xl p-6 md:p-8 text-center border border-blue-500/20 mb-8">
                         <div className="text-5xl md:text-7xl font-black mb-2 drop-shadow-lg text-blue-400">{group.avgTimeSavingsPercent}%</div>
                         <div className="text-xs md:text-sm uppercase tracking-widest text-blue-400/60 font-bold">Time Synthesized</div>
                       </div>
                       
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           setInterviewRole(group);
                           setInterviewState('form');
                         }}
                         className="w-full py-4 md:py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold text-sm md:text-xl text-white flex items-center justify-center gap-3 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shadow-xl shadow-blue-600/20 uppercase tracking-widest"
                       >
                         <Mic className="w-6 h-6 md:w-8 md:h-8" /> <span>Interview Role</span>
                       </button>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Role Details & Harmonics Problems & Solutions */}
               <div className="w-full mx-auto pt-8 order-2">
                 {selectedRole ? (
                   <div className="mb-10 px-4 py-8 md:p-8 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 md:w-2 h-full" style={{ backgroundColor: sector.color }} />
                     <div className="flex flex-col md:flex-row gap-8">
                       <div className="flex-1">
                         <div className="flex items-center gap-4 mb-2">
                           <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white/5" style={{ borderColor: sector.color, color: sector.color }}>
                             <User className="w-6 h-6" />
                           </div>
                           <h2 className="text-2xl font-bold text-white">{selectedRole} Role Analysis</h2>
                         </div>
                         <div className="text-white/60 mb-6 flex items-center gap-2 text-sm uppercase tracking-wider font-bold">
                           <Building className="w-4 h-4" /> Department: {roleGroups.find(g => g.role === selectedRole)?.department}
                         </div>
                         <div className="prose prose-invert max-w-none">
                           <p className="text-white/80 leading-relaxed text-lg border-l-2 border-white/10 pl-4 py-1 italic">
                             {getRoleJobDescription(selectedRole)}
                           </p>
                           <p className="text-white/60 mt-4 leading-relaxed">
                             Below are the specific tasks and cases for a {selectedRole} that can be replaced or augmented by AI and automation, including the corresponding performance metrics and potential savings.
                           </p>
                         </div>
                       </div>
                       <div className="md:w-80 flex-shrink-0 bg-black/20 rounded-xl p-6 border border-white/5 h-fit">
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                           <Clock className="w-4 h-4" style={{ color: sector.color }} /> 
                           Total Automation Potential
                         </h3>
                         <div className="space-y-4">
                           <div>
                             <div className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-1">Time Reduction</div>
                             <div className="text-2xl font-bold text-emerald-400">{roleGroups.find(g => g.role === selectedRole)?.avgTimeSavingsPercent}% Avg</div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <div className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-1">Hours Saved</div>
                               <div className="text-white font-medium">{roleGroups.find(g => g.role === selectedRole)?.totalHoursSaved.toLocaleString()}h</div>
                             </div>
                             <div>
                               <div className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-1">Est. Savings</div>
                               <div className="text-white font-medium">${roleGroups.find(g => g.role === selectedRole)?.totalMoneySaved.toLocaleString()}</div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : null}

                 <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 px-4 xl:px-0">
                    <Workflow className="w-8 h-8" style={{ color: sector.color }} />
                    {selectedRole ? `${selectedRole} - Associated Sub-Processes` : 'Harmonics Problems & Automated Solutions'}
                 </h2>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredAutomations.map((auto: any, i: number) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: i * 0.05 }}
                          key={auto.id} 
                          className="overflow-hidden hover:bg-white/[0.02] transition-colors group relative flex flex-col min-h-[360px]"
                          onMouseEnter={() => setHoveredAutomation(auto.id)}
                          onMouseLeave={() => setHoveredAutomation(null)}
                        >
                            {/* Card Content (Visible by default) */}
                            <div className="p-6 pb-24 relative z-10 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': sector.color } as any}>
                                    {auto.title} Issue
                                  </h3>
                                  <div className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest border ${
                                    auto.priority === 'High' ? 'text-red-400 border-red-500/30 bg-red-500/10' : 
                                    auto.priority === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 
                                    'text-blue-400 border-blue-500/30 bg-blue-500/10'
                                  }`}>
                                    {auto.priority}
                                  </div>
                                </div>
                               <p className="text-white/60 text-sm leading-relaxed mb-6">
                                 High latency and manual processing by human workers causing costly operational bottlenecks. Requires AI intervention.
                               </p>
                                
                                <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 mb-1 text-white/40">
                                      <Building className="w-3.5 h-3.5" />
                                      <span className="text-[9px] uppercase tracking-wider font-bold">Department</span>
                                    </div>
                                    <span className="font-medium text-sm text-white line-clamp-1" title={auto.department}>{auto.department}</span>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-2 bg-black/20 p-3 rounded-lg border border-white/5">
                                    <div className="flex flex-col text-center">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Time Saved</span>
                                      <span className="font-bold text-xs text-emerald-400">{auto.hoursSaved.toLocaleString()}h</span>
                                    </div>
                                    <div className="flex flex-col text-center border-l border-white/10">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Reduction</span>
                                      <span className="font-bold text-xs text-emerald-400">{auto.timeSavingsPercent}%</span>
                                    </div>
                                    <div className="flex flex-col text-center border-l border-white/10">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Workers</span>
                                      <span className="font-bold text-xs text-emerald-400">-{auto.humansSaved}</span>
                                    </div>
                                    <div className="flex flex-col text-center border-t border-white/10 pt-2">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Rate</span>
                                      <span className="font-bold text-xs text-emerald-400">${auto.dollarPerHour}/hr</span>
                                    </div>
                                    <div className="flex flex-col text-center border-t border-l border-white/10 pt-2 col-span-2">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Est. Savings</span>
                                      <span className="font-bold text-xs text-emerald-400">${auto.moneySaved.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            
                            {/* Hover Solution Reveal - Fills the card fully when hovered */}
                            <div 
                              className="absolute inset-0 bg-[#0a1120] flex flex-col p-6 translate-y-[calc(100%-72px)] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 border-t-2 md:shadow-none" 
                              style={{ borderColor: sector.color }}
                            >
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--hover-color)] to-transparent" style={{ '--hover-color': sector.color } as any} />
                                
                                <div className="relative z-30 flex flex-col h-full">
                                  {/* Solution Header / Drag Handle Area */}
                                  <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                          <div className="p-2.5 rounded-xl shadow-lg border border-white/10" style={{ backgroundColor: `${sector.color}20`, color: sector.color }}>
                                             {auto.type === 'Agent' ? <Bot className="w-5 h-5 drop-shadow-md" /> : <Cpu className="w-5 h-5 drop-shadow-md" />}
                                          </div>
                                          <div>
                                            <span className="font-bold text-white text-md block leading-tight">{auto.type} Integration</span>
                                            <span className="text-[10px] uppercase font-mono text-white/60 tracking-wider">Solution Engaged</span>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-5">
                                    <p className="text-white/90 text-sm leading-relaxed border-l-2 pl-3" style={{ borderColor: `${sector.color}50` }}>{auto.desc}</p>
                                    
                                    {/* Action Milestones */}
                                    <div>
                                      <h4 className="text-[11px] uppercase tracking-widest font-bold text-white/40 mb-3 flex items-center gap-2">
                                        <Workflow className="w-3 h-3" /> Implementation Milestones
                                      </h4>
                                      <div className="space-y-3">
                                        {auto.milestones.map((ms: any, mIdx: number) => (
                                          <motion.div 
                                            key={mIdx} 
                                            className={`flex items-center gap-2.5 group/ms cursor-pointer p-1 -ml-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${ms.status !== 'completed' ? 'hover:bg-white/5' : ''}`}
                                            onClick={() => handleToggleMilestone(auto.id, mIdx, ms.status)}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleToggleMilestone(auto.id, mIdx, ms.status);
                                              }
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`Toggle ${ms.label}`}
                                          >
                                            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                                              <AnimatePresence mode="wait">
                                                {ms.status === 'completed' ? (
                                                  <motion.div
                                                    key="completed"
                                                    initial={{ scale: 0, opacity: 0, rotate: -20 }}
                                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                  >
                                                    <CheckCircle2 className="w-5 h-5" style={{ color: sector.color }} />
                                                  </motion.div>
                                                ) : ms.status === 'in-progress' || ms.status === 'processing' ? (
                                                  <motion.div
                                                    key="progress"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                  >
                                                    <Hourglass className="w-4 h-4 text-blue-400" />
                                                  </motion.div>
                                                ) : ms.status === 'failed' ? (
                                                  <motion.div
                                                    key="failed"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                  >
                                                    <XCircle className="w-4 h-4 text-red-400" />
                                                  </motion.div>
                                                ) : (
                                                  <motion.div
                                                    key="pending"
                                                    className="w-4 h-4 rounded-full border border-white/20 group-hover/ms:border-white/40 transition-colors"
                                                  />
                                                )}
                                              </AnimatePresence>
                                            </div>
                                            <span className={`text-sm transition-colors ${ms.status === 'completed' ? 'text-white/90 line-through decoration-white/20' : ms.status === 'in-progress' || ms.status === 'processing' ? 'text-blue-300' : ms.status === 'failed' ? 'text-red-300' : 'text-white/40 group-hover/ms:text-white/60'}`}>{ms.title}</span>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Annual Savings Metrics */}
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 grid grid-cols-2 gap-4">
                                      <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Time Saved</div>
                                        <div className="text-lg font-bold text-emerald-400">{auto.hoursSaved.toLocaleString()} hrs</div>
                                        <div className="text-[10px] text-white/40">per annum</div>
                                      </div>
                                      <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Cost Impact</div>
                                        <div className="text-lg font-bold text-emerald-400">${(auto.moneySaved / 1000).toFixed(1)}k</div>
                                        <div className="text-[10px] text-white/40">based on ${auto.dollarPerHour}/hr</div>
                                      </div>
                                      <div className="col-span-2 pt-3 mt-1 border-t border-white/10">
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><Users className="w-3 h-3" /> Manforce Equivalent</div>
                                        <div className="text-sm font-medium text-white/90">Automates {auto.humansSaved} full-time workers</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        <InterviewAgentOverlay 
          state={interviewState} 
          role={interviewRole} 
          onClose={() => {
            setInterviewState('idle');
            setInterviewRole(null);
          }} 
          onStart={() => setInterviewState('active')} 
        />
    </motion.div>
  );
};
