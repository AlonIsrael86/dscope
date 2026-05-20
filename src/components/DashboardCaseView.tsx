import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronDown, User, Clock, AlertTriangle, CheckCircle2, PlayCircle, ArrowUpDown, Building, Briefcase, Check, X, Activity, Terminal, Database, Cpu, Layers, ShieldCheck, Share2, Download, Zap, Trash2, ArrowLeft } from 'lucide-react';

const PRIORITIES = ['High', 'Medium', 'Low'];
const STATUSES = ['Success', 'Failed', 'Running'];
const AGENTS = [
  { id: 'u1', name: 'Smith.A', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Sarah.K', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Mike.R', avatar: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', name: 'Elena.V', avatar: 'https://i.pravatar.cc/150?u=u4' },
  { id: 'u5', name: 'Neural.Auditor', avatar: '' },
];

interface Milestone {
  id: string;
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
}

interface Case {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  agentId: string;
  department: string;
  timestamp: string;
  createdAt: number;
  milestones?: Milestone[];
  metrics?: {
    accuracy: number;
    latency: number;
    processingSpeed: string;
    tokensPerSecond: number;
    dataVolume: string;
    errorRate: number;
  };
  forensics?: {
    modelUsed: string;
    decisionTree: { step: string; result: string; timestamp: string }[];
    memorySnapshot: string;
    securityClearance: string;
  };
  logs?: { id: string; msg: string; time: string; type: 'info' | 'warn' | 'error' | 'success' }[];
}

const MOCK_CASES: Case[] = [
  { 
    id: 'C-1001', 
    title: 'Data Pipeline Handshake', 
    description: 'Neural sync failure in Sector 7 during high load.', 
    priority: 'High', 
    status: 'Failed', 
    agentId: 'u1', 
    department: 'Operations', 
    timestamp: '2 mins ago',
    createdAt: Date.now() - 120000,
    milestones: [
      { id: 'm1', title: 'Neural Core Initialization', status: 'Completed' },
      { id: 'm2', title: 'Sector 7 Handshake Protocol', status: 'Completed' },
      { id: 'm3', title: 'Data Parity Synchronization', status: 'In Progress' },
      { id: 'm4', title: 'Final Secure Handshake', status: 'Pending' }
    ],
    metrics: { accuracy: 84.5, latency: 450, processingSpeed: '0.8x', tokensPerSecond: 120, dataVolume: '4.2GB', errorRate: 15.2 },
    forensics: {
      modelUsed: 'Harmonics-XL-Core',
      decisionTree: [
        { step: 'Ingress Point Verification', result: 'Success', timestamp: '14:20:01' },
        { step: 'Parity Calculation', result: 'Mismatch detected (CRC-32)', timestamp: '14:20:05' },
        { step: 'Automatic Retry Sequence', result: 'Failure - Packet Loss > 20%', timestamp: '14:20:08' },
        { step: 'Failover Protocol', result: 'Aborted - Sector Lockout', timestamp: '14:20:12' }
      ],
      memorySnapshot: '0x7FFFFFFF FA CB DE AD BE EF 00 11 22 33',
      securityClearance: 'Level 4 / OPEX'
    },
    logs: [
      { id: 'l1', msg: 'Initiating neural handshake...', time: '14:20:01', type: 'info' },
      { id: 'l2', msg: 'Data packet parity mismatch detected.', time: '14:20:05', type: 'warn' },
      { id: 'l3', msg: 'Retrying sync on node 0x7A...', time: '14:20:08', type: 'info' },
      { id: 'l4', msg: 'CRITICAL: Sync timeout exceeded.', time: '14:20:12', type: 'error' },
      { id: 'l5', msg: 'Sector 7 telemetry link severed.', time: '14:20:15', type: 'error' },
    ]
  },
  { 
    id: 'C-1002', 
    title: 'Inventory Rebalancing', 
    description: 'Autonomous SKU adjustment for retail partners.', 
    priority: 'Medium', 
    status: 'Running', 
    agentId: 'u2', 
    department: 'Logistics', 
    timestamp: '15 mins ago',
    createdAt: Date.now() - 900000,
    milestones: [
      { id: 'm1', title: 'Inventory Batch Scanning', status: 'Completed' },
      { id: 'm2', title: 'SKU Demand Forecasting', status: 'Completed' },
      { id: 'm3', title: 'Warehouse Route Allocation', status: 'In Progress' }
    ],
    metrics: { accuracy: 99.2, latency: 120, processingSpeed: '2.4x', tokensPerSecond: 450, dataVolume: '1.8GB', errorRate: 0.1 },
    forensics: {
      modelUsed: 'Logistic-Neural-V3',
      decisionTree: [
        { step: 'Warehouse Latency Check', result: 'Nominal', timestamp: '14:05:01' },
        { step: 'Demand Spike Detection', result: 'Confirmed (+15%)', timestamp: '14:05:05' },
        { step: 'Route Optimization', result: 'Calculating best paths...', timestamp: '14:05:15' }
      ],
      memorySnapshot: '0x00A1B2C3 D4 E5 F6 78 90 AB CD EF 01 23',
      securityClearance: 'Level 2 / Supply'
    },
    logs: [
      { id: 'l1', msg: 'Scanning warehouse 41-B metrics...', time: '14:05:01', type: 'info' },
      { id: 'l2', msg: 'Optimizing distribution weights.', time: '14:05:10', type: 'success' },
      { id: 'l3', msg: 'Executing SKU redistribution...', time: '14:05:15', type: 'info' },
    ]
  },
  { 
    id: 'C-1003', 
    title: 'Claims Triage AI', 
    description: 'Automated policy validation for new claims.', 
    priority: 'Low', 
    status: 'Success', 
    agentId: 'u3', 
    department: 'Support', 
    timestamp: '1 hour ago',
    createdAt: Date.now() - 3600000,
    milestones: [
      { id: 'm1', title: 'Claim Document Extraction', status: 'Completed' },
      { id: 'm2', title: 'Policy Compliance Validation', status: 'Completed' },
      { id: 'm3', title: 'Fraud Pattern Analysis', status: 'Completed' },
      { id: 'm4', title: 'Approval Grant Issued', status: 'Completed' }
    ],
    metrics: { accuracy: 97.4, latency: 85, processingSpeed: '3.1x', tokensPerSecond: 620, dataVolume: '250MB', errorRate: 0.02 },
    forensics: {
      modelUsed: 'Audit-Stream-Z',
      decisionTree: [
        { step: 'Policy Ingestion', result: 'Verified', timestamp: '13:15:02' },
        { step: 'Fraud Pattern Match', result: 'No matches found', timestamp: '13:15:08' },
        { step: 'Final Verification', result: 'Approved', timestamp: '13:15:10' }
      ],
      memorySnapshot: '0xDEADBEEF 12 34 56 78 9A BC DE F0 11 22',
      securityClearance: 'Level 3 / CS'
    },
    logs: [
      { id: 'l1', msg: 'Claim ID #7728-X received.', time: '13:15:02', type: 'info' },
      { id: 'l2', msg: 'Validating policy coverage.', time: '13:15:05', type: 'info' },
      { id: 'l3', msg: 'Fraud assessment score: 0.02', time: '13:15:08', type: 'success' },
      { id: 'l4', msg: 'Policy automatically approved.', time: '13:15:10', type: 'success' },
    ]
  },
  { id: 'C-1004', title: 'Sentiment Response', description: 'Customer escalations handled via agentic empathy engine.', priority: 'High', status: 'Success', agentId: 'u4', department: 'Sales', timestamp: '3 hours ago', createdAt: Date.now() - 10800000, milestones: [{ id: 'm1', title: 'Contextual Analysis', status: 'Completed' }, { id: 'm2', title: 'Empathy Engine Tuning', status: 'Completed' }], metrics: { accuracy: 96.1, latency: 210, processingSpeed: '1.2x', tokensPerSecond: 280, dataVolume: '500MB', errorRate: 0.5 }, logs: [{id:'1', msg: 'Sentiment analyzed: Positive', time: '11:00', type: 'success'}] },
  { id: 'C-1005', title: 'Network Shield Triage', description: 'Security threat mitigation in distributed nodes.', priority: 'High', status: 'Running', agentId: 'u1', department: 'Ops', timestamp: '4 hours ago', createdAt: Date.now() - 14400000, milestones: [{ id: 'm1', title: 'Intrusion Detection Scan', status: 'Completed' }, { id: 'm2', title: 'Threat Actor Identification', status: 'In Progress' }], metrics: { accuracy: 89.2, latency: 55, processingSpeed: '4.5x', tokensPerSecond: 890, dataVolume: '15GB', errorRate: 2.1 }, logs: [{id:'1', msg: 'Scanning for port intrusions...', time: '10:00', type: 'info'}] },
  { id: 'C-1006', title: 'Lead Scoring Synthesis', description: 'AI-driven deal closure probability mapping.', priority: 'Medium', status: 'Success', agentId: 'u2', department: 'Sales', timestamp: '6 hours ago', createdAt: Date.now() - 21600000, milestones: [{ id: 'm1', title: 'Lead Normalization', status: 'Completed' }], metrics: { accuracy: 92.5, latency: 150, processingSpeed: '1.5x', tokensPerSecond: 310, dataVolume: '1.2GB', errorRate: 1.2 }, logs: [] },
  { id: 'C-1007', title: 'Compliance Audit Scan', description: 'Annual regulatory check automated by Neural Auditor.', priority: 'Low', status: 'Failed', agentId: 'u5', department: 'Legal', timestamp: '12 hours ago', createdAt: Date.now() - 43200000, milestones: [{ id: 'm1', title: 'Data Lake Audit', status: 'Failed' }], metrics: { accuracy: 100, latency: 3200, processingSpeed: '0.1x', tokensPerSecond: 45, dataVolume: '45GB', errorRate: 8.5 }, logs: [] },
];

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
        className={`flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all hover:bg-white/10 ${isOpen ? 'ring-1 ring-blue-500/50 border-blue-500/30' : ''}`}
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
            className="absolute top-full left-0 mt-2 w-48 bg-[#0a0a15] border border-white/10 rounded-xl shadow-2xl p-2 z-[100] backdrop-blur-xl"
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

const ForensicOverlay = ({ caseItem, onClose, onUpdateMilestone, onRemoveMilestone }: { caseItem: Case, onClose: () => void, onUpdateMilestone: (caseId: string, milestoneId: string) => void, onRemoveMilestone: (caseId: string, milestoneId: string) => void }) => {
  const agent = AGENTS.find(u => u.id === caseItem.agentId) || { name: 'Unknown Agent', avatar: '' };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex pointer-events-auto bg-[#05060f] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      {/* Sticky Back Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 left-4 md:left-8 z-[1010] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-xl group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full min-h-full flex flex-col pt-24 md:pt-12 px-4 md:pl-28 md:pr-8"
      >
        
        {/* Header (Non-sticky) */}
        <div className="pb-8 mb-8 border-b border-white/5 relative">
           <div className="w-full flex flex-col gap-6">
              <div className="flex items-start md:items-center gap-6">
                 <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center border ${
                   caseItem.status === 'Success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                   caseItem.status === 'Failed' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                   'bg-blue-500/10 border-blue-500/30 text-blue-400'
                 }`}>
                    {caseItem.status === 'Success' && <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />}
                    {caseItem.status === 'Failed' && <AlertTriangle className="w-6 h-6 md:w-8 md:h-8" />}
                    {caseItem.status === 'Running' && <Activity className="w-6 h-6 md:w-8 md:h-8 opacity-60" />}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                       <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-black uppercase tracking-[0.2em]">Forensic Audit</div>
                       <span className="text-white/20 font-mono text-xs tracking-widest break-all">{caseItem.id}</span>
                       <div className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                          caseItem.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' :
                          caseItem.status === 'Failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                       }`}>
                          {caseItem.status}
                       </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-2 truncate whitespace-normal">{caseItem.title}</h2>
                    <p className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">{caseItem.department} Sector Subsystem</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-12 w-full">
           <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              
              {/* Left Column: Forensic Data */}
              <div className="lg:col-span-2 space-y-12">
                 
                 {/* Summary Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative group overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                          <Activity className="w-20 h-20 text-blue-400" />
                       </div>
                       <h4 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4 font-bold">Model Engine</h4>
                       <div className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">{caseItem.forensics?.modelUsed}</div>
                       <div className="mt-6 flex items-center gap-4">
                          <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/30 uppercase">Security clearance</span>
                             <span className="text-xs font-mono text-blue-400 font-bold">{caseItem.forensics?.securityClearance}</span>
                          </div>
                          <div className="w-px h-8 bg-white/10" />
                          <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/30 uppercase">Uptime Ratio</span>
                             <span className="text-xs font-mono text-emerald-400 font-bold">0.9998</span>
                          </div>
                       </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 relative group overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                          <Database className="w-20 h-20 text-purple-400" />
                       </div>
                       <h4 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4 font-bold">Data Manifest</h4>
                       <div className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">{caseItem.metrics?.dataVolume} Processed</div>
                       <div className="mt-6 flex items-center gap-4">
                          <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/30 uppercase">Error Rate</span>
                             <span className="text-xs font-mono text-red-400 font-bold">{caseItem.metrics?.errorRate}% Variance</span>
                          </div>
                          <div className="w-px h-8 bg-white/10" />
                          <div className="flex flex-col">
                             <span className="text-[8px] font-mono text-white/30 uppercase">Sync Speed</span>
                             <span className="text-xs font-mono text-purple-400 font-bold">{caseItem.metrics?.tokensPerSecond} T/S</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Decision Roadmap */}
                 <div>
                    <h3 className="text-sm font-mono text-blue-400 uppercase tracking-[0.4em] mb-8 font-bold flex items-center gap-3 italic">
                       <Layers className="w-4 h-4" /> Neural Decision Pathway
                    </h3>
                    <div className="space-y-4 relative">
                       <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5" />
                       {caseItem.forensics?.decisionTree.map((step, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative flex items-center gap-8 pl-14 group"
                          >
                             <div className={`absolute left-4 w-4 h-4 rounded-full border-4 border-[#05060f] transition-all group-hover:scale-125 ${
                                step.result.includes('Success') || step.result.includes('Verified') ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 
                                step.result.includes('Mismatch') || step.result.includes('Failure') ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                                'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                             }`} />
                             <div className="flex-1 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all">
                                <div className="flex items-center justify-between mb-2">
                                   <span className="text-[10px] font-bold text-white uppercase tracking-widest">{step.step}</span>
                                   <span className="text-[8px] font-mono text-white/20">{step.timestamp}</span>
                                </div>
                                <div className={`text-xs font-mono lowercase tracking-tighter ${
                                   step.result.includes('Success') || step.result.includes('Verified') ? 'text-emerald-400' : 
                                   step.result.includes('Mismatch') || step.result.includes('Failure') ? 'text-red-400' :
                                   'text-blue-400'
                                }`}>
                                   {'> '} {step.result}
                                </div>
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </div>

                 {/* Memory Dump */}
                 <div>
                    <h3 className="text-sm font-mono text-white/20 uppercase tracking-[0.4em] mb-6 font-bold flex items-center gap-3 italic">
                       <Database className="w-4 h-4" /> Hex Memory Snapshot
                    </h3>
                    <div className="p-8 rounded-[2rem] bg-black/60 border border-white/5 font-mono text-[10px] text-blue-400/60 leading-relaxed overflow-hidden relative">
                       <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-sm" />
                       <div className="relative">
                          {Array.from({ length: 4 }).map((_, i) => (
                             <div key={i} className="mb-1 opacity-80">
                                <span className="text-white/20 mr-4">0x00A{i}B2:</span>
                                {caseItem.forensics?.memorySnapshot} {caseItem.forensics?.memorySnapshot}
                             </div>
                          ))}
                          <div className="mt-4 text-blue-400 text-[8px] tracking-widest uppercase italic">... End of register dump ...</div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Column: Meta & Logs */}
              <div className="space-y-12">
                 
                 {/* Milestones Section */}
                 <div>
                    <h3 className="text-sm font-mono text-emerald-400/60 uppercase tracking-[0.4em] mb-6 font-bold flex items-center gap-3 italic">
                       <ShieldCheck className="w-4 h-4" /> Neural Roadmap
                    </h3>
                    <div className="space-y-3">
                       <AnimatePresence mode="popLayout">
                       {caseItem.milestones?.map((m, idx) => (
                          <motion.div
                             key={m.id}
                             layout
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: -20, scale: 0.95 }}
                             transition={{ delay: idx * 0.05 }}
                             className={`group/task w-full flex items-center gap-4 p-5 rounded-2xl border transition-all ${
                                m.status === 'Completed' 
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400/80' 
                                : m.status === 'In Progress' 
                                ? 'bg-blue-500/5 border-blue-500/20 text-blue-400/80' 
                                : m.status === 'Failed'
                                ? 'bg-red-500/5 border-red-500/20 text-red-400/80'
                                : 'bg-white/5 border-white/10 text-white/40'
                             }`}
                          >
                             <button 
                                onClick={() => onUpdateMilestone(caseItem.id, m.id)}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                                   m.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 
                                   m.status === 'Failed' ? 'bg-red-500 border-red-500' :
                                   'border-white/20 hover:border-white/40'
                                }`}
                             >
                                <AnimatePresence mode="wait">
                                  {m.status === 'Completed' ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key="check">
                                      <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />
                                    </motion.div>
                                  ) : m.status === 'Failed' ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key="x">
                                      <X className="w-3.5 h-3.5 text-black stroke-[3px]" />
                                    </motion.div>
                                  ) : null}
                                </AnimatePresence>
                             </button>
                             <div className="flex-1 text-left">
                                <span className={`text-xs font-mono font-black uppercase tracking-widest block transition-all ${m.status === 'Completed' ? 'line-through opacity-40' : ''}`}>
                                   {m.title}
                                </span>
                                <span className="text-[10px] font-mono uppercase opacity-30 mt-1 block">{m.status}</span>
                             </div>
                             
                             <div className="flex items-center gap-2">
                               {m.status === 'In Progress' && (
                                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                    <Activity className="w-3.5 h-3.5 text-blue-400/30" />
                                  </motion.div>
                               )}
                               <button 
                                 onClick={() => onRemoveMilestone(caseItem.id, m.id)}
                                 className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/20 hover:text-red-400/60 hover:bg-red-400/10 hover:border-red-500/20 transition-all opacity-0 group-hover/task:opacity-100"
                               >
                                 <Trash2 className="w-3.5 h-3.5" />
                               </button>
                             </div>
                          </motion.div>
                       ))}
                       </AnimatePresence>
                    </div>
                    <p className="mt-6 text-[10px] font-mono text-white/10 uppercase tracking-widest text-center">
                       Tap icons to toggle status • Hover for deletion
                    </p>
                 </div>
                 
                 {/* Agent Info */}
                 <div className="p-8 rounded-[2.5rem] bg-blue-500/10 border border-blue-500/20 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl" />
                    <div className="relative z-10">
                       <div className="w-24 h-24 rounded-full mx-auto p-2 border border-blue-500/30 bg-white/5 mb-6 overflow-hidden">
                          {agent.avatar ? (
null
                          ) : (
                             <User className="w-12 h-12 text-white/20 mx-auto mt-4" />
                          )}
                       </div>
                       <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.4em] mb-2 font-bold italic">Primary Handler</h4>
                       <div className="text-2xl font-display font-black text-white uppercase italic tracking-tighter mb-1">{agent.name}</div>
                       <div className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Neural Ops Specialist</div>
                       
                       <div className="mt-8 flex justify-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Active Insight</span>
                       </div>
                    </div>
                 </div>

                 {/* Console Logs */}
                 <div className="flex-1 flex flex-col min-h-[400px]">
                    <h3 className="text-sm font-mono text-red-400 uppercase tracking-[0.4em] mb-6 font-bold flex items-center gap-3 italic">
                       <Terminal className="w-4 h-4" /> System Telemetry Stream
                    </h3>
                    <div className="flex-1 bg-black/60 rounded-[2.5rem] border border-white/5 p-8 font-mono text-[11px] space-y-4 overflow-y-auto overflow-x-hidden backdrop-blur-xl relative group">
                       <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-5">
                          <Zap className="w-32 h-32 text-blue-500" />
                       </div>
                       {caseItem.logs?.map((log, idx) => (
                          <div key={log.id} className="flex gap-4 relative">
                             <span className="text-white/10 shrink-0 select-none">{(idx + 1).toString().padStart(3, '0')}</span>
                             <div className="flex-1">
                                <span className="text-white/30 mr-2">[{log.time}]</span>
                                <span className={
                                   log.type === 'error' ? 'text-red-400' :
                                   log.type === 'warn' ? 'text-amber-400' :
                                   log.type === 'success' ? 'text-emerald-400' :
                                   'text-blue-300'
                                }>
                                   {log.type === 'error' ? 'ERR!' : log.type === 'warn' ? 'WARN' : log.type === 'success' ? 'DONE' : 'INFO'}: {log.msg}
                                </span>
                             </div>
                          </div>
                       ))}
                       <div className="pt-4 flex items-center gap-2">
                          <div className="w-1.5 h-3 bg-blue-400 animate-[pulse_0.8s_infinite]" />
                          <span className="text-[10px] text-white/20 italic tracking-widest uppercase">Awaiting neural input...</span>
                       </div>
                    </div>
                 </div>

                 {/* Security Footer */}
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-500/40" />
                    <p className="text-[9px] text-white/30 font-mono italic uppercase tracking-widest leading-relaxed">
                       This forensic record is cryptographically signed and immutable via the Harmonics Distributed Ledger.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const DashboardCaseView = () => {
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [search, setSearch] = useState('');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'priority' | 'status' | 'timestamp' | 'agent'>('timestamp');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const [forensicCaseId, setForensicCaseId] = useState<string | null>(null);

  const forensicCase = useMemo(() => cases.find(c => c.id === forensicCaseId), [forensicCaseId, cases]);

  const toggleMilestone = (caseId: string, milestoneId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const milestone = c.milestones?.find(m => m.id === milestoneId);
        if (!milestone) return c;
        
        const newStatus = milestone.status === 'Completed' ? 'Pending' : 'Completed';
        
        return {
          ...c,
          milestones: c.milestones?.map(m => {
            if (m.id === milestoneId) {
              return { ...m, status: newStatus as any };
            }
            return m;
          })
        };
      }
      return c;
    }));
  };

  const removeMilestone = (caseId: string, milestoneId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          milestones: c.milestones?.filter(m => m.id !== milestoneId)
        };
      }
      return c;
    }));
  };

  const filteredCases = useMemo(() => {
    let list = cases.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      const matchPriority = selectedPriorities.length > 0 ? selectedPriorities.includes(c.priority) : true;
      const matchStatus = selectedStatuses.length > 0 ? selectedStatuses.includes(c.status) : true;
      const matchAgent = selectedAgents.length > 0 ? selectedAgents.includes(c.agentId) : true;
      return matchSearch && matchPriority && matchStatus && matchAgent;
    });

    if (sortBy === 'priority') {
      const pMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
      list = [...list].sort((a, b) => (pMap[b.priority as keyof typeof pMap] || 0) - (pMap[a.priority as keyof typeof pMap] || 0));
    } else if (sortBy === 'status') {
      const sMap = { 'Failed': 3, 'Running': 2, 'Success': 1 };
      list = [...list].sort((a, b) => (sMap[b.status as keyof typeof sMap] || 0) - (sMap[a.status as keyof typeof sMap] || 0));
    } else if (sortBy === 'agent') {
      list = [...list].sort((a, b) => {
        const agentA = AGENTS.find(u => u.id === a.agentId)?.name || '';
        const agentB = AGENTS.find(u => u.id === b.agentId)?.name || '';
        return agentA.localeCompare(agentB);
      });
    } else if (sortBy === 'timestamp') {
      list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    }

    return list;
  }, [search, selectedPriorities, selectedStatuses, selectedAgents, sortBy]);

  return (
    <div className="mt-12 w-[100vw] relative left-1/2 -translate-x-1/2 pointer-events-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 px-4 md:px-8">
        <div>
          <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-tight text-white mb-2 italic">Active Case Monitor</h3>
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Neural Pathway Verification Unit</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text"
              placeholder="SEARCH CASES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder:text-white/20 transition-all w-full md:w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <MultiSelect 
              label="Priority"
              options={[
                { label: 'High', value: 'High', icon: AlertTriangle, color: 'text-red-400' },
                { label: 'Medium', value: 'Medium', icon: Clock, color: 'text-amber-400' },
                { label: 'Low', value: 'Low', icon: ShieldCheck, color: 'text-blue-400' }
              ]}
              selected={selectedPriorities}
              onChange={setSelectedPriorities}
              icon={AlertTriangle}
            />

            <MultiSelect 
              label="Status"
              options={[
                { label: 'Success', value: 'Success', icon: CheckCircle2, color: 'text-emerald-400' },
                { label: 'Failed', value: 'Failed', icon: AlertTriangle, color: 'text-red-400' },
                { label: 'Running', value: 'Running', icon: PlayCircle, color: 'text-blue-400' }
              ]}
              selected={selectedStatuses}
              onChange={setSelectedStatuses}
              icon={Activity}
            />

            <MultiSelect 
              label="Agent"
              options={AGENTS.map(u => ({ label: u.name, value: u.id, icon: User, color: 'text-white/40' }))}
              selected={selectedAgents}
              onChange={setSelectedAgents}
              icon={User}
            />

            <div className="h-4 w-px bg-white/10 mx-1 hidden md:block" />

            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl shrink-0">
              <span className="text-[10px] font-mono text-white/20 uppercase">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent text-[10px] font-mono text-white/60 focus:outline-none cursor-pointer uppercase font-bold"
              >
                <option value="timestamp" className="bg-[#05050a]">Time</option>
                <option value="priority" className="bg-[#05050a]">Priority</option>
                <option value="status" className="bg-[#05050a]">Status</option>
                <option value="agent" className="bg-[#05050a]">Agent</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredCases.map((c, i) => {
            const agent = AGENTS.find(u => u.id === c.agentId) || { name: 'Unknown Agent', avatar: '' };
            return (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`group p-5 md:rounded-2xl bg-white/[0.03] border-y md:border border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-pointer flex flex-col gap-6 relative overflow-hidden ${forensicCaseId === c.id ? 'ring-1 ring-blue-500/30 bg-white/[0.07] border-white/10' : ''}`}
                onClick={() => setForensicCaseId(c.id)}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-blue-400/60 font-bold">{c.id}</span>
                      <h4 className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors uppercase italic">{c.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        c.priority === 'High' ? 'text-red-400 border-red-500/20 bg-red-500/10' :
                        c.priority === 'Medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' :
                        'text-blue-400 border-blue-500/20 bg-blue-500/10'
                      }`}>
                        {c.priority}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 ${
                        c.status === 'Success' ? 'text-emerald-400' :
                        c.status === 'Failed' ? 'text-red-400' :
                        'text-blue-400'
                      }`}>
                        {c.status === 'Success' && <CheckCircle2 className="w-3 h-3" />}
                        {c.status === 'Failed' && <AlertTriangle className="w-3 h-3" />}
                        {c.status === 'Running' && <PlayCircle className="w-3 h-3 animate-spin" />}
                        {c.status}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCaseId(expandedCaseId === c.id ? null : c.id);
                        }}
                        className="p-1 text-white/20 hover:text-white/40 transition-colors mr-2"
                        title="Toggle Inline Details"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedCaseId === c.id ? 'rotate-180' : ''}`} />
                      </button>
                      <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg group-hover:shadow-blue-500/40 group/btn">
                        <Zap className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">{c.description}</p>
                  
                  <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <Building className="w-4 h-4 text-white/30" />
                       <span className="text-xs text-white/60 font-mono uppercase">{c.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-white/30" />
                       <span className="text-xs text-white/60 font-mono uppercase">{c.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-3 ml-auto px-4 py-1.5 rounded-xl bg-black/20 border border-white/5 group-hover:bg-black/40 transition-colors">
                       <div className="flex flex-col items-end">
                         <span className="text-[8px] font-mono text-white/20 uppercase">Assigned Agent</span>
                         <span className="text-[10px] font-bold text-white/60 tracking-wider font-mono">{agent.name}</span>
                       </div>
                       <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-1 overflow-hidden">
                          {agent.avatar ? (
null
                          ) : (
                            <User className="w-4 h-4 text-white/20" />
                          )}
                       </div>
                    </div>
                  </div>

                  {/* Expanded Neural Inspection Dashboard */}
                  <AnimatePresence>
                    {expandedCaseId === c.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/5 space-y-8">
                           {/* Inline Milestones */}
                           <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                              <h5 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold mb-6 flex items-center gap-2 italic">
                                 <ShieldCheck className="w-3 h-3" /> Neural Roadmap Progress
                              </h5>
                              <div className="flex flex-col gap-2">
                                 <AnimatePresence mode="popLayout">
                                 {c.milestones?.map((m, idx) => (
                                    <motion.div
                                       key={m.id}
                                       layout
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       exit={{ opacity: 0, scale: 0.95 }}
                                       transition={{ delay: idx * 0.05 }}
                                       className={`group/task w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                          m.status === 'Completed' 
                                          ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400/80' 
                                          : m.status === 'In Progress'
                                          ? 'bg-blue-500/5 border-blue-500/20 text-blue-400/80'
                                          : m.status === 'Failed'
                                          ? 'bg-red-500/5 border-red-500/20 text-red-400/80'
                                          : 'bg-white/5 border-white/10 text-white/20'
                                       }`}
                                    >
                                       <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMilestone(c.id, m.id);
                                          }}
                                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                                            m.status === 'Completed' ? 'bg-emerald-500 border-emerald-500' : 
                                            m.status === 'Failed' ? 'bg-red-500 border-red-500' :
                                            'border-white/20 hover:border-white/40'
                                          }`}
                                       >
                                          <AnimatePresence mode="wait">
                                            {m.status === 'Completed' ? (
                                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key="check">
                                                <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />
                                              </motion.div>
                                            ) : m.status === 'Failed' ? (
                                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key="x">
                                                <X className="w-3.5 h-3.5 text-black stroke-[3px]" />
                                              </motion.div>
                                            ) : null}
                                          </AnimatePresence>
                                       </button>
                                       <div className="flex-1 text-left">
                                          <span className={`text-[11px] font-mono font-bold uppercase tracking-widest block transition-all ${m.status === 'Completed' ? 'line-through opacity-40' : ''}`}>
                                             {m.title}
                                          </span>
                                       </div>
                                       <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeMilestone(c.id, m.id);
                                          }}
                                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/20 hover:text-red-400/60 hover:bg-red-400/10 hover:border-red-500/20 transition-all opacity-0 group-hover/task:opacity-100"
                                       >
                                          <Trash2 className="w-3 h-3" />
                                       </button>
                                    </motion.div>
                                 ))}
                                 </AnimatePresence>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Telemetry Metrics */}
                           <div className="space-y-4">
                              <h5 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Neural Telemetry</h5>
                              <div className="grid grid-cols-2 gap-3">
                                 <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="text-[8px] font-mono text-white/20 uppercase mb-1">Decision Accuracy</div>
                                    <div className="text-xl font-bold text-white font-mono">{c.metrics?.accuracy}%</div>
                                    <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: `${c.metrics?.accuracy}%` }}
                                         className="h-full bg-blue-500"
                                       />
                                    </div>
                                 </div>
                                 <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="text-[8px] font-mono text-white/20 uppercase mb-1">System Latency</div>
                                    <div className="text-xl font-bold text-white font-mono">{c.metrics?.latency}ms</div>
                                    <div className="text-[8px] font-mono text-emerald-400/50 uppercase mt-1">Normal Range</div>
                                 </div>
                                 <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="text-[8px] font-mono text-white/20 uppercase mb-1">Processing Speed</div>
                                    <div className="text-xl font-bold text-white font-mono">{c.metrics?.processingSpeed}</div>
                                 </div>
                                 <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <div className="text-[8px] font-mono text-white/20 uppercase mb-1">Token Throughput</div>
                                    <div className="text-xl font-bold text-white font-mono">{c.metrics?.tokensPerSecond} <span className="text-[10px] opacity-30">T/S</span></div>
                                 </div>
                              </div>
                           </div>

                           {/* Autonomous Decsion Logs */}
                           <div className="space-y-4">
                              <h5 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Decision Pathway Logs</h5>
                              <div className="bg-black/40 border border-white/5 rounded-xl p-4 h-[180px] overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-thin scrollbar-thumb-white/10">
                                 {c.logs?.map(log => (
                                    <div key={log.id} className="flex gap-3">
                                       <span className="text-white/20 shrink-0">[{log.time}]</span>
                                       <span className={
                                          log.type === 'error' ? 'text-red-400' :
                                          log.type === 'warn' ? 'text-amber-400' :
                                          log.type === 'success' ? 'text-emerald-400' :
                                          'text-white/50'
                                       }>
                                          {log.msg}
                                       </span>
                                    </div>
                                 ))}
                                 <div className="pt-2 text-white/10 uppercase tracking-widest text-[8px]">
                                    {c.status === 'Running' ? '> System monitoring active...' : '> Stream closed.'}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {filteredCases.length === 0 && (
          <div className="py-20 text-center bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
            <Search className="w-10 h-10 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 font-mono text-xs uppercase tracking-widest">No matching neural pathways found...</p>
          </div>
        )}
      </div>

      {/* Forensic Modal Portal */}
      <AnimatePresence>
        {forensicCase && (
          <ForensicOverlay 
            caseItem={forensicCase} 
            onClose={() => setForensicCaseId(null)} 
            onUpdateMilestone={toggleMilestone}
            onRemoveMilestone={removeMilestone}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
