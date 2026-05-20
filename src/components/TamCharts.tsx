import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';

const yearlyData = [
  { year: '2026', human: 3.8, agentic: 0.4 },
  { year: '2027', human: 3.6, agentic: 1.2 },
  { year: '2028', human: 3.2, agentic: 2.1 },
  { year: '2029', human: 2.8, agentic: 3.4 },
  { year: '2030', human: 2.2, agentic: 4.8 },
];

const pieData = [
  { name: 'Human (Creative/Strategic)', value: 31.4, color: '#f43f5e' },
  { name: 'Agentic (Execution/Operations)', value: 68.6, color: '#3b82f6' }
];

export const TamCharts = () => {
  return (
    <div className="w-full mt-24 mb-12">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Total Addressable Market Shift
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
          Forecasting the transition of enterprise value from human-executed manual tasks to AI-driven agentic workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Growth Area Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#050a15]/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-xl font-display font-bold text-white tracking-wide">TAM Growth Trajectory (Trillions)</h4>
          </div>
          
          <div className="flex-1 w-full h-[300px] min-h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAgentic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}T`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '14px' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}
                  formatter={(value: any) => [`$${value}T`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
                <Area type="monotone" name="Agentic Work TAM" dataKey="agentic" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAgentic)" />
                <Area type="monotone" name="Human Work TAM" dataKey="human" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorHuman)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-auto">
             <p className="text-sm font-light text-white/70 leading-relaxed text-justify">
               As businesses integrate agentic intelligence across operations, the addressable market for autonomous execution expands exponentially. Non-creative, repetitive human workflows are systematically absorbed, deflating their proportional TAM while accelerating the total economic output powered by multi-tasking AI architectures.
             </p>
          </div>
        </motion.div>

        {/* Distribution Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#050a15]/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
             <div className="p-2 bg-emerald-500/10 rounded-lg">
               <User className="w-5 h-5 text-emerald-400" />
             </div>
             <h4 className="text-xl font-display font-bold text-white tracking-wide">2030 Market Distribution</h4>
          </div>

          <div className="flex-1 w-full h-[300px] min-h-[300px] mb-6 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '14px', color: '#fff' }}
                  formatter={(value: any) => [`${value}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} layout="vertical" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
               <div className="text-center -mt-8">
                 <div className="text-2xl font-black text-white">$7.0T</div>
                 <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">Total Market</div>
               </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-auto grid grid-cols-2 gap-4">
             <div>
               <div className="text-3xl font-black text-blue-400 mb-1">68.6%</div>
               <div className="text-xs uppercase font-mono tracking-wide text-white/50 mb-2">Agentic Execution</div>
               <p className="text-[10px] text-white/40 font-light leading-snug">Handling vast networks of data ops, analytics, logistics, operations, and cross-platform integrations automatically.</p>
             </div>
             <div>
               <div className="text-3xl font-black text-rose-400 mb-1">31.4%</div>
               <div className="text-xs uppercase font-mono tracking-wide text-white/50 mb-2">Human Leadership</div>
               <p className="text-[10px] text-white/40 font-light leading-snug">Liberated fully to spearhead visionary strategies, human-to-human empathy scaling, and unconstrained creative problem-solving.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
