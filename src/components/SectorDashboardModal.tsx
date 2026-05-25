import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTOR_AUTOMATIONS } from '../data/sectorAutomations';
import { SpaceTech2D } from './SpaceTech2D';
import { Zap, Search, Terminal, Cpu, ArrowRight, Share2, Workflow, Bot, Filter, Plus, User, BadgeDollarSign, Check, ChevronDown, ArrowLeft, X, Clock, DollarSign, Users, Briefcase, Building, CheckCircle2, Circle, Mic, Upload, Play, Phone, Mail, MapPin, Globe, Loader2, PlayCircle, XCircle, Hourglass, Database, Activity, AlertTriangle, TrendingUp, Rocket, Sparkles, MessageSquare, Ticket } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from "@google/genai";
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, YAxis, BarChart, Bar, ComposedChart, XAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

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

const generateUniqueCaseExplanation = (auto: any, sectorName: string, index: number) => {
  const variations = [
    {
      case: `When a new request for ${auto.title} arises within the ${sectorName} organization, it is traditionally queued for a ${auto.workerRole} in ${auto.department}. Here, the AI takes immediate operational ownership.`,
      workflow: `Through seamless ${auto.type === 'Agent' ? 'conversational AI and agentic coordination' : 'API-driven data synthesis'}, the system performs ${auto.desc?.toLowerCase()}. The entire cycle concludes without manual intervention, finalizing the record securely.`
    },
    {
      case: `Consider a scenario requiring ${auto.title}. Previously, this would bottleneck at the ${auto.department} desk. Now, an intelligent routing protocol intercepts the issue instantly instead of relying on a human ${auto.workerRole}.`,
      workflow: `The operational flow triggers autonomous systems to handle ${auto.desc?.toLowerCase()}. Utilizing ${auto.type === 'Agent' ? 'multi-modal agents' : 'backend integrations'}, it resolves the intent autonomously end-to-end, logging a fully closed ticket.`
    },
    {
      case: `A typical external or internal trigger initiates a ${auto.title} process. Instead of tying up a ${auto.workerRole}, our digital workforce acknowledges the request in milliseconds for the ${auto.department} team.`,
      workflow: `Executing a specialized protocol for ${auto.desc?.toLowerCase()}, the AI bypasses legacy UI constraints using direct ${auto.type === 'Agent' ? 'agentic reasoning' : 'API hooks'}. The issue is settled completely before a human would even read the notification.`
    },
    {
      case: `In the context of ${sectorName}, addressing ${auto.title} demands absolute precision. The legacy approach relied heavily on a ${auto.workerRole}, creating delays for the entire team.`,
      workflow: `Today, this requirement is fully automated: the core engine evaluates the parameters and performs ${auto.desc?.toLowerCase()}. Powered by robust ${auto.type === 'Agent' ? 'reasoning agents' : 'API networks'}, the ticket achieves a 100% resolution state seamlessly.`
    },
    {
       case: `Whenever a demand for ${auto.title} occurs, the legacy friction of assigning a ${auto.workerRole} is eliminated. The case is digitized and claimed by a specialized autonomous unit.`,
       workflow: `By systematically executing ${auto.desc?.toLowerCase()}, the digital counterpart uses ${auto.type === 'Agent' ? 'natural language understanding' : 'data orchestration'} to navigate the ${auto.department} infrastructure, providing a finalized solution instantly.`
    }
  ];

  const hash = (auto.title?.length || 0) + index;
  return variations[hash % variations.length];
};

const generateTicketDefinition = (auto: any, index: number) => {
   const variations = [
     `Here, a single ticket is defined as the full autonomy cycle covering ${auto.title}. It spans from the exact moment of request interception to the final, verified system update in ${auto.department}, executed entirely by ${auto.type === 'Agent' ? 'AI agents' : 'API orchestrators'}.`,
     `One ticket corresponds to the total end-to-end resolution of a ${auto.title} case. It means the AI successfully completed every sub-task—specifically ${auto.desc?.toLowerCase()}—without falling back to human agents.`,
     `A ticket in this context represents a 100% finished job for ${auto.title}. Whether it involves ${auto.type === 'Agent' ? 'analyzing intent and chatting' : 'routing data and calling endpoints'}, the ticket is only counted when the ${auto.department} operational burden is completely relieved.`,
     `Counting one ticket means the ${auto.title} process was finalized from start to finish. Our AI bypasses the ${auto.workerRole}, ingests the context, applies ${auto.desc?.toLowerCase()}, and delivers a closed case.`,
     `This ticket metric applies only when the ${auto.title} workflow reaches total completion. It inherently includes the intelligent handling of ${auto.desc?.toLowerCase()} via ${auto.type === 'Agent' ? 'specialized virtual workers' : 'integrated data conduits'}, achieving the goal autonomously.`
   ];
   return variations[((auto.title?.length || 0) + index * 3) % variations.length];
};

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
    "Tourism": {
      roles: ['Travel Consultant', 'Tour Coordinator', 'Booking Agent', 'Concierge', 'Guest Relations'],
      departments: ['Customer Service', 'Operations', 'Marketing', 'Hospitality']
    },
    "E-Sports": {
      roles: ['Tournament Director', 'Stream Coordinator', 'Team Analyst', 'Pro-Player Scout', 'Broadcast Engineer'],
      departments: ['Events', 'Production', 'Talent', 'Analytics']
    },
    "Space Exploration": {
      roles: ['Mission Controller', 'Astrionics Engineer', 'Orbital Analyst', 'Remote Operator', 'Payload Specialist'],
      departments: ['Flight Ops', 'Engineering', 'Science', 'Logistics']
    },
    "Quantum Research": {
      roles: ['Quantum Physicist', 'Cryogenic Engineer', 'Error Correction Researcher', 'Qubit Architect'],
      departments: ['Research', 'Hard Engineering', 'Mathematics', 'Theory']
    },
    "Venture Finance": {
      roles: ['Investment Associate', 'Deal Flow Analyst', 'Portfolio Manager', 'Due Diligence Officer'],
      departments: ['Investment', 'Strategy', 'Compliance', 'Relations']
    },
    "Hospitality & Leisure": {
      roles: ['Hotel Manager', 'Front Desk Lead', 'Event Coordinator', 'Guest Experience Mgr'],
      departments: ['Operations', 'Guest Services', 'Events', 'Food & Beverage']
    },
    "Autonomous Rail": {
      roles: ['Fleet Superintendent', 'Track Maintenance Lead', 'Commuter Flow Analyst', 'System Operator'],
      departments: ['Logistics', 'Engineering', 'Planning', 'Safety']
    },
    "Heavy Industry": {
      roles: ['Smelter Supervisor', 'Crane Lead', 'Energy Manager', 'Structural Inspector'],
      departments: ['Manufacturing', 'Safety', 'Engineering', 'Operations']
    },
    "Wellness & Mental Health": {
      roles: ['Therapy Coordinator', 'Wellness Coach', 'Patient Intake Specialist', 'Behavioral Analyst'],
      departments: ['Clinical', 'Counseling', 'Outreach', 'Admin']
    },
    "Music & Audio Gen": {
      roles: ['Audio Engineer', 'Sound Designer', 'Composition Assistant', 'Licensing Specialist'],
      departments: ['Production', 'Creative', 'Legal', 'Tech']
    },
    "Architecture & Planning": {
      roles: ['Lead Architect', 'Urban Designer', 'Drafting Specialist', 'Sustainability Consultant'],
      departments: ['Design', 'Urban Planning', 'Technical', 'Compliance']
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
              <div className="space-y-6 max-w-lg mx-auto relative">
                {/* Desktop Left-Side Back button */}
                <button 
                  onClick={handleClose} 
                  className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center gap-4 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full py-8 px-4 transition-all text-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border-white/20 border border-white/5 bg-black/40 backdrop-blur-xl z-[200] cursor-pointer pointer-events-auto group"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="h-12 w-px bg-white/20 group-hover:bg-white/40 transition-colors" />
                  <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-blue-400 transition-colors">Return</span>
                </button>

                {/* Mobile Left-aligned Back button inside the form area */}
                <button 
                  onClick={handleClose} 
                  className="md:hidden flex items-center gap-2 mb-6 text-white/60 hover:text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all select-none active:scale-95 w-fit"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="text-center mb-10">
                  <h2 className="text-3xl font-display font-black text-white mb-3 tracking-tighter uppercase">Candidate Registration</h2>
                  <p className="text-white/50 text-sm font-mono uppercase tracking-widest">Initialization of Harmonics AI Recruiter Protocol</p>
                </div>

                <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-4">
                  <div className="flex flex-col gap-3">
                    <label 
                      id="label-candidate-name"
                      className={`text-[10px] font-mono uppercase tracking-widest pl-2 ${errors.name ? 'text-red-400' : 'text-blue-400'}`} 
                      htmlFor="candidate-name"
                    >
                      Full Name
                    </label>
                    <input 
                      id="candidate-name"
                      type="text"
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "error-candidate-name" : undefined}
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 transition-all font-mono text-xs text-white`}
                      placeholder="ENTER ID..."
                      value={formData.name}
                      onChange={e => {
                        setFormData({...formData, name: e.target.value});
                        if (errors.name) setErrors({...errors, name: undefined});
                      }}
                    />
                    {errors.name && (
                      <span id="error-candidate-name" className="text-[9px] font-mono text-red-400 pl-2 uppercase">{errors.name}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label 
                      id="label-candidate-email"
                      className={`text-[10px] font-mono uppercase tracking-widest pl-2 ${errors.email ? 'text-red-400' : 'text-blue-400'}`} 
                      htmlFor="candidate-email"
                    >
                      Secure Email
                    </label>
                    <input 
                      id="candidate-email"
                      type="email"
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "error-candidate-email" : undefined}
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 transition-all font-mono text-xs text-white`}
                      placeholder="COMM-LINK..."
                      value={formData.email}
                      onChange={e => {
                        setFormData({...formData, email: e.target.value});
                        if (errors.email) setErrors({...errors, email: undefined});
                      }}
                    />
                    {errors.email && (
                      <span id="error-candidate-email" className="text-[9px] font-mono text-red-400 pl-2 uppercase">{errors.email}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label id="label-candidate-phone" className="text-[10px] font-mono uppercase text-blue-400 tracking-widest pl-2" htmlFor="candidate-phone">Contact Frequency</label>
                    <input 
                      id="candidate-phone"
                      type="tel"
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 transition-all font-mono text-xs text-white"
                      placeholder="CONTACT_PROTO_VAL..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label id="label-candidate-region" className="text-[10px] font-mono uppercase text-blue-400 tracking-widest pl-2" htmlFor="candidate-region">Tactical Region</label>
                    <input 
                      id="candidate-region"
                      type="text"
                      aria-required="true"
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
            className="fixed z-[4000] pointer-events-none bg-[#0a1224]/95 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-2xl flex flex-col gap-3 min-w-[320px]"
            style={{ left: mousePos.x + 20, top: mousePos.y + 20 }}
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[10px] uppercase text-white/50 font-bold tracking-wider"><Zap className="w-3 h-3 inline mr-1 -mt-0.5"/>Agentic Yield Matrix</span>
              <span className={`text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20`}>Active</span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-white/40 font-bold mb-0.5">Baseline</span>
                <span className="text-xs text-white font-mono flex items-center gap-1.5"><User className="w-3 h-3 text-blue-400"/> 1 Employ (180h/mo)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-white/40 font-bold mb-0.5">Labor Cost</span>
                <span className="text-xs text-white font-mono flex items-center gap-1.5"><BadgeDollarSign className="w-3 h-3 text-red-400"/> ${auto.dollarPerHour}/hr Medium</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-white/40 font-bold mb-0.5">Worker Autonomy</span>
                <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5"><Cpu className="w-3 h-3"/> {auto.timeSavingsPercent}% Agentic</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-white/40 font-bold mb-0.5">Work Multiplier</span>
                <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5"><TrendingUp className="w-3 h-3"/> {Math.round(100 / (1 - (auto.timeSavingsPercent / 100)))}% Output</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 mt-1 bg-gradient-to-r from-emerald-500/10 to-transparent p-2 rounded -mx-1">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] uppercase text-white/60 font-bold tracking-wider">Capacity Growth</span>
                 <span className="text-sm font-bold text-white font-mono">+{Math.round((auto.timeSavingsPercent / (100 - auto.timeSavingsPercent)) * 100)}%</span>
               </div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] uppercase text-white/60 font-bold tracking-wider">Org Savings/Worker</span>
                 <span className="text-sm font-bold text-emerald-400 font-mono">{auto.timeSavingsPercent}% Monthly</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] uppercase text-emerald-400/80 font-bold tracking-wider">Emp. Growth ROI</span>
                 <span className="text-sm font-black text-emerald-400 font-mono drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{Math.round(((auto.moneySaved * 12) / (180 * 12 * 8)) * 100)}%</span>
               </div>
            </div>
            
          </motion.div>
        );
      })()}
    </AnimatePresence>
  );
};

const AgenticYieldMatrixModal = ({ 
  autoId, 
  automations, 
  sector, 
  onClose 
}: { 
  autoId: string | null, 
  automations: any[], 
  sector: any, 
  onClose: () => void 
}) => {
  useEffect(() => {
    if (autoId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [autoId]);

  const auto = useMemo(() => {
    if (!autoId) return null;
    return automations.find((a: any) => a.id === autoId) || null;
  }, [autoId, automations]);

  const monthlySavings = auto ? auto.moneySaved : 0;

  const savingsChartData = useMemo(() => {
    if (!auto) return [];
    
    const historyMonths = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const base = monthlySavings;
    const list = historyMonths.map((m, idx) => {
      // Stable pseudorandom variation using key and month idx
      const seed = (base * (idx + 1)) % 100;
      const offsetPercent = (((seed % 15) - 7)) / 100; // -7% to +7%
      const savings = Math.round(base * (1 + offsetPercent));
      return {
        name: m,
        "Actual Savings": savings,
        "Projected Savings": null as number | null,
        movingAverage: savings,
      };
    });

    // Retrospective trend line (3-month moving average)
    for (let i = 0; i < list.length; i++) {
      const windowSlice = list.slice(Math.max(0, i - 2), i + 1);
      const sum = windowSlice.reduce((sum, item) => sum + (item["Actual Savings"] || 0), 0);
      list[i].movingAverage = Math.round(sum / windowSlice.length);
    }

    // 3 months of projection (next 3 months: Jun, Jul, Aug)
    const projMonths = ['Jun', 'Jul', 'Aug'];
    projMonths.forEach((m) => {
      const last3 = list.slice(-3);
      const sumVal = last3.reduce((sum, item) => {
        const v = item["Actual Savings"] !== null ? item["Actual Savings"] : item["Projected Savings"];
        return sum + (v || 0);
      }, 0);
      const movingAvg = Math.round(sumVal / 3);

      list.push({
        name: m,
        "Actual Savings": null,
        "Projected Savings": movingAvg,
        movingAverage: movingAvg,
      });
    });

    return list;
  }, [auto, monthlySavings]);

  if (!autoId) return null;
  if (!auto) return null;

  const baselineHours = 180;
  const percentageSaved = auto.timeSavingsPercent;
  const monthlyHoursSaved = auto.hoursSaved; 
  const hourlyRate = auto.dollarPerHour;
  const annualSavings = monthlySavings * 12;

  const efficiencyMultiplier = Math.round(100 / (1 - (percentageSaved / 100)));
  const capacityGrowth = Math.round((percentageSaved / (100 - percentageSaved)) * 100);
  const employeeROI = Math.round((annualSavings / (180 * 12 * 8)) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-lg bg-[#070e1c] border rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10"
          style={{ borderColor: `${sector.color}40`, boxShadow: `0 0 40px ${sector.color}15` }}
        >
          {/* Subtle design matrix background lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.2px, transparent 1.2px)', backgroundSize: '16px 16px' }} />
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20 bg-gradient-to-bl from-[var(--sector-color)] to-transparent pointer-events-none rounded-full blur-3xl" style={{ '--sector-color': sector.color } as any} />

          {/* Header */}
          <div className="p-6 md:p-8 pb-4 border-b border-white/5 flex items-center justify-between relative z-10 w-full">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-display font-medium text-lg md:text-xl tracking-tight leading-none">Agentic Yield Matrix</h3>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/80 mt-1 block">
                  Only Per One Employee Improvements with AI
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors border border-white/10"
              aria-label="Close matrix"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive stats and data */}
          <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[70vh] styled-scrollbars z-10">
            {/* General Description */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-1">
              <div className="text-[9px] uppercase font-mono text-white/30 tracking-wider font-sans">Target Node & Sub-process</div>
              <div className="text-white font-bold font-display text-md">{auto.title} Issue</div>
              <div className="text-white/60 text-xs mt-1 leading-relaxed">
                Repetitive manual labor in <span className="text-white">{auto.workerRole}</span> within the <span className="text-white">{auto.department}</span> department is re-engineered by non-human intelligent agents.
              </div>
            </div>

            {/* Matrix Data Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Baseline stats */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="text-[9px] uppercase font-mono text-white/40 tracking-wider mb-2 font-sans">Employee Baseline</div>
                  <div className="text-xl font-bold text-white font-mono flex items-baseline gap-1">
                    180<span className="text-xs text-white/50 font-sans"> h/mo</span>
                  </div>
                </div>
                <div className="text-[10px] text-white/30 font-sans mt-3">
                  Standard single worker hours limit per month.
                </div>
              </div>

              {/* Time Saved (30%-70%) */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col justify-between" style={{ borderColor: `${sector.color}20` }}>
                <div>
                  <div className="text-[9px] uppercase font-mono text-white/40 tracking-wider mb-2 font-sans">Time Saved / AI Autonomy</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono flex items-baseline gap-1">
                    {percentageSaved}%
                  </div>
                </div>
                <div className="text-[10px] text-emerald-400/60 font-sans mt-3">
                  Sector-role specific agentic autonomy calibration.
                </div>
              </div>

              {/* Saved hours per single worker */}
              <div className="p-4 bg-[#050b14] border border-emerald-500/10 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="text-[9px] uppercase font-mono text-emerald-400/80 tracking-wider mb-2 font-sans">Worker Hours Saved</div>
                  <div className="text-xl font-black text-emerald-400 font-mono flex items-baseline gap-1">
                    {monthlyHoursSaved}<span className="text-xs text-emerald-400/60 font-sans"> h/mo</span>
                  </div>
                </div>
                <div className="text-[10px] text-white/40 font-sans mt-3 font-mono">
                  {monthlyHoursSaved * 12} hours saved annually per FTE.
                </div>
              </div>

              {/* Labour rates and costs */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="text-[9px] uppercase font-mono text-white/40 tracking-wider mb-2 font-sans">Labour Rate (FTE)</div>
                  <div className="text-xl font-bold text-white font-mono">
                    ${hourlyRate}<span className="text-xs text-white/50 font-sans"> /hr</span>
                  </div>
                </div>
                <div className="text-[10px] text-white/30 font-sans mt-3">
                  Sourced role salary value.
                </div>
              </div>
            </div>

            {/* Cost Reductions & ROI Summary */}
            <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/60">
              <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] uppercase font-mono text-white/50 tracking-widest font-bold font-sans">Estimated Cost Reductions</span>
                <span className="text-[9px] font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-widest font-black">ROI ACTIVE</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Monthly Cost Reduced</span>
                  <span className="font-mono text-sm font-bold text-white">${monthlySavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Annual Cost Salvaged</span>
                  <span className="font-mono text-md font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">${annualSavings.toLocaleString()}</span>
                </div>
                <div className="h-px bg-white/5 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/60">Digital Worker ROI Value</span>
                  <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">+{employeeROI}%</span>
                </div>

                <div className="h-px bg-white/5 my-2" />
                
                {/* 3-Month Automated Savings Projection Chart */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> 3-Month Savings Projection
                    </span>
                    <span className="text-[9px] font-mono text-white/40 tracking-wider">
                      3-MO MOVING AVERAGE FORMULA
                    </span>
                  </div>
                  
                  <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={savingsChartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="actualSavingsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="projectedSavingsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={9} 
                          tickLine={false} 
                          axisLine={false} 
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.3)" 
                          fontSize={9} 
                          tickLine={false} 
                          axisLine={false} 
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          width={35}
                        />
                        <RechartsTooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(5, 10, 24, 0.95)', 
                            borderColor: 'rgba(255,255,255,0.1)', 
                            borderRadius: '12px',
                            boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                          }}
                          itemStyle={{ fontSize: '11px', color: '#fff' }}
                          labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontFamily: 'monospace', marginBottom: '4px' }}
                          formatter={(value: any, name: string) => {
                            if (value === null || value === undefined) return null;
                            return [`$${value.toLocaleString()}`, name];
                          }}
                        />
                        <Bar 
                          name="Actual Savings" 
                          dataKey="Actual Savings" 
                          fill="url(#actualSavingsGrad)" 
                          stroke="#10b981" 
                          strokeWidth={1}
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          name="Projected Savings" 
                          dataKey="Projected Savings" 
                          fill="url(#projectedSavingsGrad)" 
                          stroke="#3b82f6" 
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          radius={[4, 4, 0, 0]} 
                        />
                        <Line 
                          type="monotone" 
                          name="Moving Avg Trend" 
                          dataKey="movingAverage" 
                          stroke="#fbbf24" 
                          strokeWidth={2} 
                          dot={{ r: 2, fill: '#fbbf24', strokeWidth: 0 }} 
                          activeDot={{ r: 4 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/40 mt-2 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> Actual Month
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] border border-dashed border-[#3b82f6]" /> Next 3-Mo Projection
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-4 h-0.5 bg-[#fbbf24]" /> 3-Month Moving Average
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Neural Capabilities Multipliers */}
            <div className="p-5 bg-gradient-to-r from-blue-500/[0.07] to-purple-500/[0.07] border border-blue-500/20 rounded-2xl space-y-4">
              <div className="text-[10px] uppercase font-mono text-blue-400/80 tracking-widest font-black flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" /> Neural Multipliers per Worker
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 mb-0.5 font-sans">Worker Autonomy</span>
                  <span className="text-sm font-bold text-white font-mono flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" /> {percentageSaved}% Agentic
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 mb-0.5 font-sans">Capacity Extension</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> +{capacityGrowth}% Output
                  </span>
                </div>
              </div>

              <p className="text-[10.5px] text-white/50 leading-relaxed font-sans border-t border-white/5 pt-3">
                By deploying machine automation overlay, 1 single employee has their operational capacity expanded from <span className="text-white">180 hours/mo</span> up to <span className="text-emerald-300 font-bold">{(180 * (1 + capacityGrowth/100)).toFixed(0)} equivalent active standard labor-hours</span>. No additional headcount needed.
              </p>
            </div>
          </div>

          <div className="p-6 bg-black/60 border-t border-white/5 flex justify-end relative z-10">
            <button 
              onClick={onClose} 
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-white/20"
            >
              Close Ledger
            </button>
          </div>
        </motion.div>
      </div>
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
        id={`multiselect-btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`multiselect-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
        className={`flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all hover:bg-white/10 ${isOpen ? 'ring-1 ring-blue-500/50 border-blue-500/30' : ''}`}
      >
        {Icon && <Icon className="w-3 h-3 text-white/30" />}
        <span id={`multiselect-label-${label.toLowerCase().replace(/\s+/g, '-')}`} className={selected.length > 0 ? 'text-blue-400 font-bold' : 'text-white/50'}>
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
            role="listbox"
            aria-multiselectable="true"
            aria-labelledby={`multiselect-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="max-h-60 overflow-y-auto space-y-1">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleOption(opt.value)}
                  role="option"
                  aria-selected={selected.includes(opt.value)}
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

const getHourlyRate = (sector: string, role: string): number => {
  let hash = 0;
  const combined = (sector || "") + (role || "");
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  const min = 15;
  const max = 60;
  return min + Math.abs(hash % (max - min + 1));
};

const getSavingsPercent = (sectorName: string, roleName: string): number => {
  let hash = 0;
  const combined = (sectorName || "") + (roleName || "");
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 30 + Math.abs(hash % 41); // 30% to 70%
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
      
      const timeSavingsPercent = getSavingsPercent(sector.name, workerRole);
      const dollarPerHour = getHourlyRate(sector.name, workerRole);
      const hoursSavedMonthly = Math.round(180 * (timeSavingsPercent / 100));
      const hoursSaved = hoursSavedMonthly;
      const moneySaved = hoursSaved * dollarPerHour;
      const humansSaved = (hoursSavedMonthly / 180).toFixed(2);
      
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
  const [expandedAgentProfile, setExpandedAgentProfile] = useState<string | null>(null);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const [selectedMatrixAutomationId, setSelectedMatrixAutomationId] = useState<string | null>(null);

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

  // Operational Cost Synthesis Calculations
  const { humanDrivenAnnualCost, aiAgenticAnnualCost, avgRate, avgSavings } = useMemo(() => {
    if (roleGroups.length === 0) {
      return { humanDrivenAnnualCost: 9720000, aiAgenticAnnualCost: 4860000, avgRate: 45, avgSavings: 50 };
    }
    
    const sumRate = roleGroups.reduce((sum, g) => {
      const rate = g.automations[0]?.dollarPerHour || 45;
      return sum + rate;
    }, 0);
    const avgR = Math.round(sumRate / roleGroups.length);
    
    const sumSavings = roleGroups.reduce((sum, g) => sum + g.avgTimeSavingsPercent, 0);
    const avgS = Math.round(sumSavings / roleGroups.length);
    
    const hCost = avgR * 180 * 12 * 100; // 100 FTE baseline scale
    const aCost = Math.round(hCost * (1 - (avgS / 100) * 0.88)); // Agentic cost with platform subscription/compute token overhead
    
    return {
      humanDrivenAnnualCost: hCost,
      aiAgenticAnnualCost: aCost,
      avgRate: avgR,
      avgSavings: avgS
    };
  }, [roleGroups]);

  const totalNetSavings = humanDrivenAnnualCost - aiAgenticAnnualCost;
  const percentCostReduced = Math.round((totalNetSavings / humanDrivenAnnualCost) * 100);

  const costComparisonTimeline = useMemo(() => {
    const timelineLabels = ['Phase 0: Base', 'Phase 1: Ingest', 'Phase 2: Analyze', 'Phase 3: Execute', 'Phase 4: Sync', 'Phase 5: Optimize'];
    const monthlyHuman = Math.round(humanDrivenAnnualCost / 12);
    const monthlyAgenticSteady = Math.round(aiAgenticAnnualCost / 12);
    
    return timelineLabels.map((phase, idx) => {
      const progress = idx / (timelineLabels.length - 1); // 0.0 to 1.0
      const currentAgentic = Math.round(monthlyHuman - (monthlyHuman - monthlyAgenticSteady) * progress);
      return {
        name: phase,
        "Human-Driven Cost": monthlyHuman,
        "AI-Agentic Cost": currentAgentic,
        "Net Monthly Savings": monthlyHuman - currentAgentic
      };
    });
  }, [humanDrivenAnnualCost, aiAgenticAnnualCost]);

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
      className="fixed inset-0 z-[2000] w-full h-full bg-[#00000a] flex flex-col overflow-y-auto overflow-x-hidden pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
       <div className="relative w-full min-h-full top-0 left-0 pt-12 md:pt-24 pb-12 flex flex-col">
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
                 <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-1"
                  >
                    <Bot size={20} strokeWidth={2} style={{ color: sector.color }} />
                  </motion.div>
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
                     placeholder="ENTER QUERY PARAMETERS..." id="sector-search-input"
                   />
                 </div>

                 <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 shrink-0 hover:bg-white/10 transition-colors">
                    <label htmlFor="sector-sort-select" className="text-[10px] font-mono text-white/40 uppercase tracking-widest mr-1">Sort:</label>
                    <select 
                      id="sector-sort-select"
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

           <div className="w-full relative bg-transparent">
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
                  const isFailed = auto.status === 'failed';
                  return (
                    <g key={`network-node-group-${auto.id}`}>
                      {/* Connection Pathway */}
                      <path 
                        key={`path-${auto.id}`}
                        d={`M ${x1}vw ${y1}vh Q 50vw 50vh ${x2}vw ${y2}vh`}
                        fill="transparent"
                        stroke={isFailed ? "rgba(239, 68, 68, 0.45)" : isHovered ? "url(#glow-line-active)" : "url(#glow-line-normal)"}
                        strokeWidth={isFailed ? 2.5 : isHovered ? 4 : 1}
                        className="transition-all duration-300"
                        style={{ filter: isFailed ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))' : isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'none' }}
                      />
                      
                      {/* Node 1 - Source */}
                      {isFailed ? (
                        <g key={`failed-ripple-source-${auto.id}`}>
                          <circle 
                            cx={`${x1}vw`} 
                            cy={`${y1}vh`} 
                            r="5" 
                            fill="none" 
                            stroke="rgba(239, 68, 68, 0.8)" 
                            strokeWidth="1.5"
                          >
                            <animate attributeName="r" values="5;20" dur="1.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" />
                          </circle>
                          <circle 
                            cx={`${x1}vw`} 
                            cy={`${y1}vh`} 
                            r="5" 
                            fill="none" 
                            stroke="rgba(239, 68, 68, 0.5)" 
                            strokeWidth="1"
                          >
                            <animate attributeName="r" values="5;14" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                          </circle>
                          <circle 
                            cx={`${x1}vw`} 
                            cy={`${y1}vh`} 
                            r="5" 
                            fill="rgb(239, 68, 68)"
                            stroke="#0a1224"
                            strokeWidth="1.5"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.9))' }}
                          />
                        </g>
                      ) : (
                        <circle 
                          key={`normal-node-source-${auto.id}`}
                          cx={`${x1}vw`} 
                          cy={`${y1}vh`} 
                          r={isHovered ? 6 : 4} 
                          fill={isHovered ? sector.color : "rgba(255, 255, 255, 0.35)"}
                          stroke="#0a1224"
                          strokeWidth="1"
                          style={{ filter: isHovered ? `drop-shadow(0 0 6px ${sector.color})` : 'none' }}
                          className="transition-all duration-300"
                        />
                      )}

                      {/* Node 2 - Target */}
                      {isFailed ? (
                        <g key={`failed-ripple-target-${auto.id}`}>
                          <circle 
                            cx={`${x2}vw`} 
                            cy={`${y2}vh`} 
                            r="5" 
                            fill="none" 
                            stroke="rgba(239, 68, 68, 0.8)" 
                            strokeWidth="1.5"
                          >
                            <animate attributeName="r" values="5;20" dur="1.8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" />
                          </circle>
                          <circle 
                            cx={`${x2}vw`} 
                            cy={`${y2}vh`} 
                            r="5" 
                            fill="none" 
                            stroke="rgba(239, 68, 68, 0.5)" 
                            strokeWidth="1"
                          >
                            <animate attributeName="r" values="5;14" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                          </circle>
                          <circle 
                            cx={`${x2}vw`} 
                            cy={`${y2}vh`} 
                            r="5" 
                            fill="rgb(239, 68, 68)"
                            stroke="#0a1224"
                            strokeWidth="1.5"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.9))' }}
                          />
                        </g>
                      ) : (
                        <circle 
                          key={`normal-node-target-${auto.id}`}
                          cx={`${x2}vw`} 
                          cy={`${y2}vh`} 
                          r={isHovered ? 6 : 4} 
                          fill={isHovered ? sector.color : "rgba(255, 255, 255, 0.35)"}
                          stroke="#0a1224"
                          strokeWidth="1"
                          style={{ filter: isHovered ? `drop-shadow(0 0 6px ${sector.color})` : 'none' }}
                          className="transition-all duration-300"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hover Tooltip Overlay Removed */}

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

                   {/* Cost Synthesis & Agentic ROI Comparison */}
                  </div>
                   <div className="pt-8 mt-10 border-t border-white/5 w-full relative z-10">
                     <div className="flex items-center gap-2.5 mb-6">
                       <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                         <DollarSign className="w-4.5 h-4.5" />
                       </div>
                       <div>
                         <h4 className="text-sm font-bold uppercase tracking-wider text-white">Cost Synthesis Comparison</h4>
                         <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest mt-0.5 font-sans">Comparative projection modeling: human-driven spend vs agentic agency</p>
                       </div>
                     </div>
                     
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                       {/* Left: Interactive Cost Bento Grid & Overview */}
                       <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                         <div className="space-y-3">
                           <p className="text-xs text-white/50 leading-relaxed font-sans">
                             By restructuring standard operational work teams in the <strong style={{ color: sector.color }}>{sector.name}</strong> sector into autonomous event pipelines, organizations bypass repetitive manual latency, integration gaps, and baseline idle-worker payroll overhead.
                           </p>
                           <div className="p-3.5 bg-blue-500/5 rounded-2xl border border-blue-500/15 flex items-start gap-2.5">
                             <Bot className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 animate-pulse" />
                             <span className="text-[10px] text-white/60 font-mono leading-relaxed">
                               Comparison normalized for a mid-tier enterprise sector footprint of <strong>100 FTE</strong> operating units. AI cost overhead tracks standard LLM invocation tokens & orchestration subscriptions.
                             </span>
                           </div>
                         </div>

                         <div className="grid grid-cols-2 gap-3.5">
                           <div className="p-4 bg-red-950/15 border border-red-500/10 rounded-2xl">
                             <span className="text-[9px] uppercase font-mono text-white/40 font-bold tracking-widest block mb-1 font-sans">Human-Driven Cost</span>
                             <div className="text-xl md:text-2xl font-black text-white font-mono leading-none">
                               ${(humanDrivenAnnualCost / 1000000).toFixed(2)}<span className="text-xs text-white/40">M/yr</span>
                             </div>
                             <span className="text-[8px] font-mono text-white/30 uppercase mt-2 block">100% fixed payroll expense</span>
                           </div>

                           <div className="p-4 bg-emerald-950/15 border border-emerald-500/10 rounded-2xl animate-pulse">
                             <span className="text-[9px] uppercase font-mono text-emerald-400/80 font-bold tracking-widest block mb-1 font-sans">AI-Agentic Cost</span>
                             <div className="text-xl md:text-2xl font-black text-emerald-400 font-mono leading-none">
                               ${(aiAgenticAnnualCost / 1000000).toFixed(2)}<span className="text-xs text-emerald-400/40">M/yr</span>
                             </div>
                             <span className="text-[8px] font-mono text-emerald-400/30 uppercase mt-2 block">Token compute & licenses</span>
                           </div>

                           <div className="p-4 bg-blue-950/15 border border-blue-500/10 rounded-2xl">
                             <span className="text-[9px] uppercase font-mono text-blue-400/80 font-bold tracking-widest block mb-1 font-sans">Net Cash Salvaged</span>
                             <div className="text-xl md:text-2xl font-black text-white font-mono leading-none">
                               +${(totalNetSavings / 1000000).toFixed(2)}<span className="text-xs text-white/40">M/yr</span>
                             </div>
                             <span className="text-[8px] font-mono text-white/30 uppercase mt-2 block">EBITDA margin return</span>
                           </div>

                           <div className="p-4 bg-purple-950/15 border border-purple-500/10 rounded-2xl">
                             <span className="text-[9px] uppercase font-mono text-purple-400/80 font-bold tracking-widest block mb-1 font-sans">Efficiency Delta</span>
                             <div className="text-xl md:text-2xl font-black text-purple-400 font-mono leading-none">
                               +{percentCostReduced}%
                             </div>
                             <span className="text-[8px] font-mono text-white/30 uppercase mt-2 block">Operating cost reduction</span>
                           </div>
                         </div>
                       </div>

                       {/* Right: Chronological Convergence Area Chart */}
                       <div className="lg:col-span-7 p-6 bg-black/40 border border-white/5 rounded-3xl flex flex-col justify-between">
                         <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] uppercase font-mono text-white/50 font-bold flex items-center gap-1.5">
                             <Activity className="w-3.5 h-3.5 text-blue-400" /> Operational Overlap & Transition
                           </span>
                           <span className="text-[9px] font-mono text-white/40 tracking-wider">
                             EST. 6-MONTH ROLLOUT TIMELINE
                           </span>
                         </div>

                         <div className="h-[210px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={costComparisonTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                               <defs>
                                 <linearGradient id="humanCostGrad" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#f87171" stopOpacity={0.15}/>
                                   <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="agenticCostGrad" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                                   <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                 </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                               <XAxis 
                                 dataKey="name" 
                                 stroke="rgba(255,255,255,0.3)" 
                                 fontSize={9} 
                                 tickLine={false} 
                                 axisLine={false} 
                               />
                               <YAxis 
                                 stroke="rgba(255,255,255,0.3)" 
                                 fontSize={9} 
                                 tickLine={false} 
                                 axisLine={false} 
                                 tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                                 width={40}
                               />
                               <RechartsTooltip 
                                 contentStyle={{ 
                                   backgroundColor: 'rgba(5, 10, 24, 0.95)', 
                                   borderColor: 'rgba(255,255,255,0.1)', 
                                   borderRadius: '12px',
                                   boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                                 }}
                                 itemStyle={{ fontSize: '11px', color: '#fff' }}
                                 labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontFamily: 'monospace', marginBottom: '4px' }}
                                 formatter={(value: any, name: string) => {
                                   if (value === null || value === undefined) return null;
                                   return [`$${value.toLocaleString()}/mo`, name];
                                 }}
                               />
                               <Area 
                                 type="monotone" 
                                 name="Human-Driven Cost" 
                                 dataKey="Human-Driven Cost" 
                                 stroke="#f87171" 
                                 strokeWidth={2}
                                 strokeDasharray="4 4" 
                                 fill="url(#humanCostGrad)" 
                               />
                               <Area 
                                 type="monotone" 
                                 name="AI-Agentic Cost" 
                                 dataKey="AI-Agentic Cost" 
                                 stroke="#10b981" 
                                 strokeWidth={2} 
                                 fill="url(#agenticCostGrad)" 
                               />
                             </AreaChart>
                           </ResponsiveContainer>
                         </div>

                         <div className="flex flex-wrap justify-between items-center text-[9px] font-mono text-white/40 mt-3 pt-3 border-t border-white/5">
                           <span className="flex items-center gap-1.5 flex-nowrap">
                             <span className="w-2 h-2 rounded bg-[#f87171]" /> Human Workforce spend
                           </span>
                           <span className="flex items-center gap-1.5 flex-nowrap">
                             <span className="w-2 h-2 rounded bg-[#10b981]" /> AI Autonomous agency cost
                           </span>
                           <span className="flex items-center gap-1">
                             <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                             Accelerating profit margin
                           </span>
                         </div>
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
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Workflow size={32} strokeWidth={2} style={{ color: sector.color }} />
                    </motion.div>
                    {selectedRole ? `${selectedRole} - Associated Sub-Processes` : 'Automation Ticket Examples & Issue Resolution Flows'}
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
                          className={`overflow-hidden rounded-3xl transition-all duration-300 group relative grid min-h-[450px] border cursor-pointer ${
                            auto.status === 'failed' 
                              ? 'border-red-500/30 bg-red-950/[0.04] shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-red-500/50' 
                              : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02]'
                          }`}
                          onMouseEnter={() => setHoveredAutomation(auto.id)}
                          onMouseLeave={() => setHoveredAutomation(null)}
                          onClick={() => setRevealedCardId(revealedCardId === auto.id ? null : auto.id)}
                        >
                            {/* Card Content (Visible by default) */}
                            <div className="col-start-1 row-start-1 p-6 pb-24 relative z-10 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': sector.color } as any}>
                                    Ticket Case: {auto.title}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                    {auto.status === 'failed' ? (
                                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/20 animate-pulse">
                                        <span className="relative flex h-1.5 w-1.5">
                                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                        </span>
                                        Failed
                                      </span>
                                    ) : auto.status === 'success' ? (
                                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                        <span className="relative flex h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                                        Success
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-500/20">
                                        <span className="relative flex h-1.5 w-1.5 bg-blue-500 rounded-full animate-spin border-t-transparent border-white/50" />
                                        Running
                                      </span>
                                    )}
                                    <div className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest border ${
                                      auto.priority === 'High' ? 'text-red-400 border-red-500/30 bg-red-500/10' : 
                                      auto.priority === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 
                                      'text-blue-400 border-blue-500/30 bg-blue-500/10'
                                    }`}>
                                      {auto.priority}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-white/60 text-sm leading-relaxed mb-6 space-y-3">
                                  {(() => {
                                      const exp = generateUniqueCaseExplanation(auto, sector.name, i);
                                      return (
                                        <>
                                          <p className="bg-black/20 p-3 rounded border border-white/5 text-xs sm:text-sm">
                                            <strong className="text-white/90">Real-World Case ({sector.name}):</strong> {exp.case}
                                          </p>
                                          <p className="text-xs sm:text-sm">
                                            <strong className="text-white/90">Agentic Workflow:</strong> {exp.workflow}
                                          </p>
                                        </>
                                      );
                                  })()}
                                </div>
                                
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
                                      <span className="font-bold text-xs text-emerald-400">{auto.hoursSaved.toLocaleString()}h/mo</span>
                                    </div>
                                    <div className="flex flex-col text-center border-l border-white/10">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Reduction</span>
                                      <span className="font-bold text-xs text-emerald-400">{auto.timeSavingsPercent}%</span>
                                    </div>
                                    <div className="flex flex-col text-center border-l border-white/10">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">FTE Saves</span>
                                      <span className="font-bold text-xs text-emerald-400">-{auto.humansSaved}</span>
                                    </div>
                                    <div className="flex flex-col text-center border-t border-white/10 pt-2">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Rate</span>
                                      <span className="font-bold text-xs text-emerald-400">${auto.dollarPerHour}/hr</span>
                                    </div>
                                    <div className="flex flex-col text-center border-t border-l border-white/10 pt-2 col-span-2">
                                      <span className="text-[9px] uppercase tracking-wider font-bold text-white/40 mb-0.5">Est. Savings</span>
                                      <span className="font-bold text-xs text-emerald-400">${auto.moneySaved.toLocaleString()}/mo</span>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            
                            {/* Hover Solution Reveal - Fills the card fully when hovered */}
                            <div 
                              className={`col-start-1 row-start-1 h-full bg-[#0a1120] flex flex-col p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 border-t-2 md:shadow-none cursor-pointer ${
                                revealedCardId === auto.id ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'
                              }`}
                              style={{ borderColor: sector.color }}
                            >
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[var(--hover-color)] to-transparent" style={{ '--hover-color': sector.color } as any} />
                                
                                <div className="relative z-30 flex flex-col h-full">
                                  {/* Solution Header / Click to open Agentic Yield Matrix */}
                                  <div 
                                    className="flex items-center justify-between mb-4 border-b border-white/5 pb-3 cursor-pointer select-none group/se"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedMatrixAutomationId(auto.id);
                                    }}
                                  >
                                      <div className="flex items-center gap-3">
                                          <motion.div 
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            className="p-2.5 rounded-xl shadow-lg border border-white/10" 
                                            style={{ backgroundColor: `${sector.color}20`, color: sector.color }}
                                          >
                                             {auto.type === 'Agent' ? <Bot size={20} strokeWidth={2} className="drop-shadow-md" /> : <Cpu size={20} strokeWidth={2} className="drop-shadow-md" />}
                                          </motion.div>
                                          <div>
                                            <span className="font-bold text-white text-md block leading-tight group-hover/se:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': sector.color } as any}>{auto.type} Integration</span>
                                            <span className="text-[10px] uppercase font-mono text-white/50 tracking-widest flex items-center gap-1 group-hover/se:text-emerald-400 transition-colors mt-0.5">
                                              Solution Engaged <Zap size={10} className="text-emerald-400 animate-pulse ml-0.5" />
                                            </span>
                                          </div>
                                      </div>
                                      
                                      <div 
                                        className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_8px_rgba(16,185,129,0.1)] flex items-center gap-1 group-hover/se:scale-105"
                                      >
                                        <Zap size={10} className="text-emerald-400 animate-pulse" />
                                        Matrix
                                      </div>
                                  </div>

                                  <div className="flex-1 space-y-5 overflow-visible">
                                    <p className="text-white/90 text-sm leading-relaxed border-l-2 pl-3" style={{ borderColor: `${sector.color}50` }}>{auto.desc}</p>
                                    
                                    {/* Action Milestones */}
                                    <div>
                                      <h4 className="text-[11px] uppercase tracking-widest font-bold text-white/40 mb-3 flex items-center gap-2">
                                        <Workflow size={14} strokeWidth={2} className="text-emerald-400/70" /> Implementation Milestones
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
                                                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                                    className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)] relative group-hover/ms:bg-emerald-500/30 transition-colors"
                                                  >
                                                    <motion.div 
                                                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }} 
                                                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                      className="absolute inset-0 rounded-full bg-emerald-400/20 blur-sm"
                                                    />
                                                    <Check className="w-3.5 h-3.5 text-emerald-400 relative z-10 drop-shadow-[0_0_3px_rgba(16,185,129,0.8)]" strokeWidth={3} />
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
                                                    animate={{ scale: [1, 1.15, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                                    className="relative flex items-center justify-center h-4 w-4"
                                                  >
                                                    <XCircle className="w-4 h-4 text-red-400 relative z-10 animate-pulse" />
                                                    <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
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

                                    {/* Automation Ticket Explanation */}
                                    <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-3.5 rounded-xl border-l-2 border-blue-400 mt-2 mb-4">
                                       <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-blue-300 mb-2">
                                          <Ticket className="w-3.5 h-3.5" /> What equals 1 Ticket here?
                                       </h4>
                                       <p className="text-white/70 text-[11px] leading-relaxed">
                                         {generateTicketDefinition(auto, i)}
                                       </p>
                                    </div>

                                    {/* Yield Matrix Button CTA */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMatrixAutomationId(auto.id);
                                      }}
                                      className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 hover:from-emerald-500/35 hover:to-blue-500/35 text-xs text-emerald-300 font-mono font-bold uppercase tracking-wider border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.1)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                      <Zap size={14} className="text-emerald-400 animate-pulse" />
                                      Analyze Agentic Yield Matrix
                                    </button>

                                    {/* Agent Profile Enhancement */}
                                    <div 
                                      className="bg-[#050b14] rounded-xl p-4 border border-blue-500/20 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)] cursor-pointer hover:border-blue-500/40 transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedAgentProfile(expandedAgentProfile === auto.id ? null : auto.id);
                                      }}
                                    >
                                      <div className={`flex items-center justify-between ${expandedAgentProfile === auto.id ? 'mb-3 border-b border-white/5 pb-3' : ''}`}>
                                        <div className="flex items-center gap-3">
                                          <div className="relative">
                                            <div className="w-10 h-10 rounded-full border border-blue-500/40 bg-blue-500/10 flex items-center justify-center">
                                              <Bot className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#050b14] animate-pulse" />
                                          </div>
                                          <div>
                                            <h4 className="text-white font-bold text-sm tracking-wide">{auto.assignedAgent?.name || 'Assigned Agent'}</h4>
                                            <span className="text-[10px] uppercase font-mono text-blue-400 tracking-wider">Role: {auto.assignedAgent?.role || 'Neural Coordinator'}</span>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setInterviewRole({ role: auto.assignedAgent?.role || 'Assigned Agent' });
                                              setInterviewState('form');
                                            }}
                                            className="px-3 py-1.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] uppercase tracking-widest font-bold font-mono transition-colors border border-blue-500/30 flex items-center gap-2"
                                          >
                                            <MessageSquare className="w-3 h-3" /> COMM Channel
                                          </button>
                                          <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${expandedAgentProfile === auto.id ? 'rotate-180' : ''}`} />
                                        </div>
                                      </div>
                                      
                                      <AnimatePresence>
                                        {expandedAgentProfile === auto.id && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden space-y-4 mt-4"
                                          >
                                            <div className="text-[10px] uppercase font-mono font-bold text-white/50 border-b border-white/5 pb-2 flex justify-between items-center">
                                              <span>Performance Metrics</span>
                                              <span className="text-emerald-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Live Sync</span>
                                            </div>
                                            <div className="font-mono text-[10px] uppercase tracking-wider text-white/50 flex flex-col gap-2">
                                              <div className="flex justify-between items-center">
                                                <span>Current Task:</span>
                                                <span className="text-white/80 line-clamp-1 flex-1 text-right ml-4">Supervising {auto.title}</span>
                                              </div>
                                              <div className="flex justify-between items-center text-blue-400 mt-1 bg-blue-500/10 p-2 rounded">
                                                 <span className="flex items-center gap-1"><Terminal className="w-3 h-3"/> Last Action</span>
                                                 <span className="truncate max-w-[200px] text-right">{auto.logs && auto.logs.length > 0 ? auto.logs[auto.logs.length - 1] : 'Awaiting instructions...'}</span>
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                              <div className="bg-white/5 rounded p-2 border border-white/5">
                                                <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-wider text-emerald-400 mb-2">
                                                  <span>Task Completion</span>
                                                  <span className="font-bold">{(Math.random() * (99.9 - 95.0) + 95.0).toFixed(1)}%</span>
                                                </div>
                                                <div className="h-8">
                                                  <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={auto.history}>
                                                      <Bar dataKey="cpu" fill="#34d399" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                                                    </BarChart>
                                                  </ResponsiveContainer>
                                                </div>
                                              </div>
                                              <div className="bg-white/5 rounded p-2 border border-white/5">
                                                <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-wider text-blue-400 mb-2">
                                                  <span>Avg Resp Time</span>
                                                  <span className="font-bold">{auto.metrics.latency}ms</span>
                                                </div>
                                                <div className="h-8">
                                                  <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={auto.history}>
                                                      <Line type="monotone" dataKey="latency" stroke="#60a5fa" strokeWidth={1} dot={false} isAnimationActive={false} />
                                                    </LineChart>
                                                  </ResponsiveContainer>
                                                </div>
                                              </div>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>

                                    {/* Annual Savings Metrics */}
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 grid grid-cols-2 gap-4">
                                      <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Time Saved</div>
                                        <div className="text-lg font-bold text-emerald-400">{auto.hoursSaved.toLocaleString()} hrs/mo</div>
                                        <div className="text-[10px] text-white/40">({Math.round(auto.hoursSaved * 12).toLocaleString()} hrs/yr)</div>
                                      </div>
                                      <div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Cost Reduced</div>
                                        <div className="text-lg font-bold text-emerald-400">${auto.moneySaved.toLocaleString()}/mo</div>
                                        <div className="text-[10px] text-white/40">(${Math.round(auto.moneySaved * 12).toLocaleString()}/yr)</div>
                                      </div>
                                      <div className="col-span-2 pt-3 mt-1 border-t border-white/10">
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5"><Users className="w-3 h-3" /> Single Employee Impact</div>
                                        <div className="text-sm font-medium text-white/90">Automates {auto.timeSavingsPercent}% of a single 180h/mo worker (saves {auto.humansSaved} FTE)</div>
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

        <AgenticYieldMatrixModal 
          autoId={selectedMatrixAutomationId} 
          automations={filteredAutomations} 
          sector={sector} 
          onClose={() => setSelectedMatrixAutomationId(null)} 
        />
    </motion.div>
  );
};
