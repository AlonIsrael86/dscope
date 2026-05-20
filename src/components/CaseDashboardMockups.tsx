import React from 'react';
import { 
  Monitor, Video, Mic, Target, TrendingUp, Activity, Bot
} from 'lucide-react';

export const CaseDashboardMockups = ({ id }: { id: string }) => {
  if (id === '11') {
    // Screenshare Agent Interface Dashboard - Compact for mobile
    return (
      <div className="w-full">
          <div className="p-3 flex items-center justify-between border-b border-white/5 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
            </div>
            <div className="text-white/20 text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-0.5">Agent Delta-9</div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="flex items-center gap-1 text-[8px] text-red-500/30 font-mono tracking-widest uppercase mb-0.5">REC</span>
            <span className="text-white/10 text-[8px] font-mono">04:22</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row h-full md:h-[300px]">
          <div className="flex-1 relative bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center min-h-[160px]">
            <div className="absolute inset-0 bg-[#00000a]/70 backdrop-blur-[1px]" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="p-1.5 text-white/20"><Mic className="w-3 h-3" /></div>
                <div className="p-1.5 text-white/20"><Video className="w-3 h-3" /></div>
                <div className="p-1.5 text-blue-400/60 flex items-center gap-2 text-[8px] px-3 font-black uppercase tracking-[0.2em] border border-white/5 rounded-full">
                  <Monitor className="w-3 h-3" /> Streaming
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 flex flex-col md:border-l border-white/5">
            <div className="p-3 border-b border-white/5 flex items-center gap-2">
               <Bot className="w-3.5 h-3.5 text-blue-400/20" />
               <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em]">Live Transcript</span>
            </div>
            <div className="flex-1 p-4 space-y-4 max-h-[120px] md:max-h-none overflow-y-auto">
               <div className="text-[10px] text-blue-100/30 whitespace-normal leading-relaxed">
                 <span className="text-blue-400/40 font-black mr-2 uppercase tracking-tight">SYSTEM:</span> Detected syntax error on L42. Missing closing bracket.
               </div>
               <div className="text-[10px] text-white/20 whitespace-normal leading-relaxed">
                 <span className="text-white/10 font-black mr-2 uppercase tracking-tight">USER:</span> Verified. Applying fix.
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === '12') {
    // Sales & Marketing CRM - Compact
    return (
      <div className="w-full">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-8">
          <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
            <Target className="w-4 h-4 text-purple-500/30" /> Pipeline Matrix
          </h4>
          <span className="px-3 py-1 bg-purple-500/5 text-purple-400/40 text-[8px] font-mono border border-purple-500/10 rounded-full font-black uppercase tracking-widest">
            AI Active
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Leads', val: '1,248', color: 'text-blue-400/40' },
            { label: 'Qual', val: '842', color: 'text-purple-400/40' },
            { label: 'Meet', val: '156', color: 'text-emerald-400/40' },
            { label: 'Value', val: '$2.4M', color: 'text-white/40' },
          ].map((s, i) => (
             <div key={i} className="flex flex-col items-start">
               <div className="text-white/10 text-[8px] uppercase tracking-[0.4em] mb-2 font-black">{s.label}</div>
               <div className={`text-2xl md:text-3xl font-black tracking-tight ${s.color}`}>{s.val}</div>
             </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
             <div className="text-white/10 text-[8px] tracking-[0.4em] uppercase mb-6 font-black">Priority CRM</div>
             <div className="space-y-4">
               {[
                 { name: 'Acme Corp', score: 98 },
                 { name: 'Globex Inc', score: 94 },
               ].map((l, i) => (
                 <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                    <div className="text-white/30 text-[11px] font-black uppercase tracking-widest">{l.name}</div>
                    <div className="text-emerald-500/30 font-mono text-[10px] font-black tracking-tight">AI {l.score}</div>
                 </div>
               ))}
             </div>
          </div>
          <div className="flex md:w-48 items-center justify-center">
             <div className="text-center">
               <TrendingUp className="w-8 h-8 text-purple-500/10 mx-auto mb-4" />
               <div className="text-5xl md:text-7xl font-display font-black text-white/20 tracking-tight leading-none mb-2">82%</div>
               <div className="text-white/10 text-[8px] tracking-[0.5em] uppercase font-black">CONVERSION</div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === '13') {
    // Human-Agent Synergy Desk - Compact
    return (
      <div className="w-full">
        <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-8">
          <h4 className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
            <Activity className="w-4 h-4 text-emerald-500/30" /> Triage Control
          </h4>
          <div className="px-3 py-1 bg-emerald-500/5 text-emerald-400/40 text-[8px] font-mono border border-emerald-500/10 rounded-full font-black uppercase tracking-widest">
            OPTIMAL
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-4">
               {[
                 { id: 'T-891', subject: 'Server Config', status: 'Review', color: 'text-red-400/30' },
                 { id: 'T-892', subject: 'Auth Hub', status: 'OK', color: 'text-emerald-400/30' },
               ].map((t, i) => (
                 <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                   <div className="flex items-center gap-4">
                     <span className={`text-[9px] font-mono font-black ${t.color}`}>{t.id}</span>
                     <div className="text-white/30 text-[11px] font-black uppercase tracking-widest leading-none">{t.subject}</div>
                   </div>
                   <span className="text-[9px] px-2 py-0.5 border border-white/10 text-white/10 uppercase font-black rounded-md">{t.status}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="md:col-span-4 flex flex-row md:flex-col gap-8 justify-center">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-display font-black text-white/20 tracking-tight leading-none">74%</div>
              <div className="text-white/10 text-[8px] tracking-[0.5em] uppercase font-black mt-2 whitespace-nowrap">AI RESOLVED</div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-white/10 text-[8px] font-black uppercase tracking-[0.3em] leading-none">DELAY</span>
                <span className="text-emerald-500/30 font-mono text-[9px] font-bold leading-none">0.4m</span>
              </div>
              <div className="w-full bg-white/5 h-0.5"><div className="bg-emerald-500/10 h-0.5 w-[15%]" /></div>
              
              <div className="flex justify-between items-center">
                <span className="text-white/10 text-[8px] font-black uppercase tracking-[0.3em] leading-none">CSAT</span>
                <span className="text-blue-400/30 font-mono text-[9px] font-bold leading-none">4.9</span>
              </div>
              <div className="w-full bg-white/5 h-0.5"><div className="bg-blue-400/10 h-0.5 w-[95%]" /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
