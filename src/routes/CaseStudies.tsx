// Route: /case-studies (feature-flagged via CASE_STUDIES_ENABLED).
// Full Alexei version (442 lines, "Biological Laboratory" theme with detailed
// metrics + charts) — replaces previous shorter Alon version per Katia decision.
// RealClientCases (Verified Signal carousel) mounted at the bottom so the
// real-client section that Katia explicitly asked to keep stays visible.
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Headset, ShieldCheck, TrendingUp, Target, ArrowRight, Monitor } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RealClientCases } from './RealClientCases';

const AlexeiCaseStudies = () => {
  const [filter, setFilter] = useState<'all' | 'support' | 'sales'>('all');
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const cases = [
    {
      id: 1,
      type: "support",
      title: "Enterprise L1/L2 Support Automation Desk",
      client: "GlobalTech Solutions",
      impact: "60% Agentic Resolution Rate",
      description: "Deployed custom agentic, integration, and automation solutions across global service touchpoints, migrating standard repetitive workflows into autonomous queues.",
      color: "from-blue-500 to-cyan-400",
      subColor: "text-blue-400",
      accentBg: "bg-blue-500/10 border-blue-500/20",
      icon: Headset,
      
      // Strict Monthly Metrics based on 60%
      metrics: {
        timeSaved: "3,200 hours / month saved",
        moneySaved: "$210,000 / month saved",
        ticketsSolvedAuto: "18,000 tickets / month (60%)",
        ticketsSolvedHuman: "12,000 tickets / month (40%)",
        percentageDiff: "+150% automation efficiency shift ratio",
        employeesSaved: "18 FTE roles saved / reallocated",
        churnReduction: "Customer churn rate fell by 23%",
        agentScreenshareExplanation: "Screenshare Agent Supervision: DeltaScope recorded and audited real support advisor screen sessions, mapping interactive clicks & software steps to write flawless autonomous resolution routes.",
        roiText: "340% Monthly Investment Return"
      },
      chartData: [
        { month: "Jan", "Automated (60%)": 4000, "Human Solved": 26000, "Monthly ROI %": 110 },
        { month: "Feb", "Automated (60%)": 8000, "Human Solved": 22000, "Monthly ROI %": 180 },
        { month: "Mar", "Automated (60%)": 12000, "Human Solved": 18000, "Monthly ROI %": 240 },
        { month: "Apr", "Automated (60%)": 15000, "Human Solved": 15000, "Monthly ROI %": 290 },
        { month: "May", "Automated (60%)": 18000, "Human Solved": 12000, "Monthly ROI %": 340 }
      ]
    },
    {
      id: 2,
      type: "support",
      title: "Automated Sovereign Customer Care",
      client: "Nebula Communications",
      impact: "23% Customer Churn Reduction",
      description: "Integrated secure API database pipelines and low-latency voice agents directly into subscriber account panels, automating billing & provision workflows.",
      color: "from-emerald-500 to-teal-400",
      subColor: "text-emerald-400",
      accentBg: "bg-emerald-500/10 border-emerald-500/20",
      icon: ShieldCheck,
      
      // Strict Monthly Metrics based on 60%
      metrics: {
        timeSaved: "4,800 hours / month saved",
        moneySaved: "$315,000 / month saved",
        ticketsSolvedAuto: "33,000 tickets / month (60%)",
        ticketsSolvedHuman: "22,000 tickets / month (40%)",
        percentageDiff: "60% autonomous vs 40% manual ratio",
        employeesSaved: "26 FTE roles saved / reallocated",
        churnReduction: "Subscriber churn falls by 23%",
        agentScreenshareExplanation: "Screenshare Agent Supervision: Deployed DeltaScope visual step-extraction trackers on 15 core agents, automatically translating complex refund exceptions into standalone API tasks.",
        roiText: "420% Monthly Investment Return"
      },
      chartData: [
        { month: "Jan", "Automated (60%)": 6000, "Human Solved": 49000, "Monthly ROI %": 120 },
        { month: "Feb", "Automated (60%)": 14000, "Human Solved": 41000, "Monthly ROI %": 210 },
        { month: "Mar", "Automated (60%)": 21000, "Human Solved": 34000, "Monthly ROI %": 290 },
        { month: "Apr", "Automated (60%)": 28000, "Human Solved": 27000, "Monthly ROI %": 370 },
        { month: "May", "Automated (60%)": 33000, "Human Solved": 22000, "Monthly ROI %": 420 }
      ]
    },
    {
      id: 3,
      type: "sales",
      title: "Conversational Sales & Widget Pipeline",
      client: "Frontier Retail & SaaS Ltd",
      impact: "+30% Human Sales Boost",
      description: "Deployed custom interactive qualifying web widgets and outbound phone/chat agent automation scripts to amplify high-intent lead flow.",
      color: "from-purple-500 to-pink-500",
      subColor: "text-purple-400",
      accentBg: "bg-purple-500/10 border-purple-500/20",
      icon: TrendingUp,
      
      // Strict Sales metrics
      metrics: {
        ppcBefore: "400 PPC leads / month",
        ppcAfter: "560 PPC leads / month (40% growth with widgets)",
        adsBudget: "$15,000 / month ads budget cost",
        seoRoi: "+320% SEO ROI growth",
        organicLeads: "+40% website organic leads growth using DeltaScope widgets",
        humanCallsChats: "1,200 human calls and chats / month",
        meetingsCreatedByAgents: "340 meetings created by autonomous agents for human closers",
        phoneAgentCalls: "8,400 conversational phone calls / month initiated by AI agents",
        agentChatsMails: "12,500 active AI agent chats & mails handled",
        agentScreenshareSales: "Screenshare Sales Analysis: Mapped interactive steps of the company's elite closers to model custom lead capture widgets and objection-handling prompts.",
        humanSalesBefore: "100% Sales Volume Base",
        humanSalesAfter: "130% Sales Volume (growth from 100% to 130% with help of DeltaScope platforms)"
      },
      chartData: [
        { month: "Baseline", "Human Sales Volume (%)": 100, "PPC Leads": 400 },
        { month: "Month 1", "Human Sales Volume (%)": 106, "PPC Leads": 430 },
        { month: "Month 2", "Human Sales Volume (%)": 114, "PPC Leads": 470 },
        { month: "Month 3", "Human Sales Volume (%)": 121, "PPC Leads": 510 },
        { month: "Month 4", "Human Sales Volume (%)": 130, "PPC Leads": 560 }
      ]
    },
    {
      id: 4,
      type: "sales",
      title: "Omni-Channel Lead Pipeline Engine",
      client: "Vertex Enterprise Group",
      impact: "Sales Volume Escalation to 130%",
      description: "Connecting custom digital acquisition widgets with voice agent intelligence to pre-qualify and close inbound opportunities.",
      color: "from-amber-400 to-orange-500",
      subColor: "text-amber-400",
      accentBg: "bg-amber-500/10 border-amber-500/20",
      icon: Target,
      
      // Strict Sales metrics
      metrics: {
        ppcBefore: "600 PPC leads / month",
        ppcAfter: "840 PPC leads / month (40% growth with widgets)",
        adsBudget: "$25,000 / month ads budget cost",
        seoRoi: "+380% SEO ROI growth",
        organicLeads: "+40% website organic leads growth via DeltaScope widgets",
        humanCallsChats: "2,100 human calls and chats / month",
        meetingsCreatedByAgents: "580 meetings created by autonomous agents for human closers",
        phoneAgentCalls: "11,200 conversational phone calls / month initiated by AI agents",
        agentChatsMails: "18,400 active AI agent chats & mails handled",
        agentScreenshareSales: "Screenshare Sales Analysis: Recorded live client consultations, creating a unified knowledge model that automatically logs CRM deal events during conversations.",
        humanSalesBefore: "100% Sales Volume Base",
        humanSalesAfter: "130% Sales Volume (growth from 100% to 130% with help of DeltaScope platforms)"
      },
      chartData: [
        { month: "Baseline", "Human Sales Volume (%)": 100, "PPC Leads": 600 },
        { month: "Month 1", "Human Sales Volume (%)": 107, "PPC Leads": 660 },
        { month: "Month 2", "Human Sales Volume (%)": 115, "PPC Leads": 720 },
        { month: "Month 3", "Human Sales Volume (%)": 123, "PPC Leads": 780 },
        { month: "Month 4", "Human Sales Volume (%)": 130, "PPC Leads": 840 }
      ]
    }
  ];

  const filteredCases = filter === 'all' ? cases : cases.filter(c => c.type === filter);

  return (
    <motion.main
      key="case-studies"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="pt-32 pb-20 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-blue-300">DeltaScope Laboratory Case System</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white uppercase">
            Biological <span className="text-blue-400">Laboratory</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl font-light">
            Workflows are like a biological laboratory. You need DeltaScope to study them, extract their behavioral structures, and recreate them with dynamic agentic automation models.
          </p>
        </div>

        {/* Custom Tab Filter Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            id="case-btn-all"
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${filter === 'all' ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            All Laboratory Cases ({cases.length})
          </button>
          <button 
            id="case-btn-support"
            onClick={() => setFilter('support')}
            className={`px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${filter === 'support' ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            Support & Service (60% Automation)
          </button>
          <button 
            id="case-btn-sales"
            onClick={() => setFilter('sales')}
            className={`px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${filter === 'sales' ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            Sales Growth (100% to 130%)
          </button>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((cs) => {
              const IconComponent = cs.icon;
              const isExpanded = expandedCase === cs.id;

              return (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 25 }}
                  transition={{
                    layout: { type: "spring", stiffness: 350, damping: 30 },
                    opacity: { duration: 0.2 },
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    scale: { duration: 0.2 }
                  }}
                  className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-300 hover:bg-white/[0.03] hover:border-white/10 flex flex-col justify-between"
                >
                {/* Visual Gradient Spotlights */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${cs.color} opacity-[0.02] blur-[90px] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500`} />

                {/* Top Label Layer */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${cs.subColor}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{cs.client}</span>
                      <span className={`text-base font-black uppercase tracking-tight ${cs.subColor}`}>
                        {cs.impact}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight mb-4">
                    {cs.title}
                  </h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                    {cs.description}
                  </p>

                  {/* HIGH-FIDELITY KPI METRICS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {cs.type === "support" ? (
                      <>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Time Saved (Monthly)</p>
                          <p className="text-lg font-bold text-white uppercase">{cs.metrics.timeSaved}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Money Saved (Monthly)</p>
                          <p className="text-lg font-bold text-emerald-400 uppercase">{cs.metrics.moneySaved}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Solved Automatically</p>
                          <p className="text-lg font-bold text-blue-400 uppercase">{cs.metrics.ticketsSolvedAuto}</p>
                          <p className="text-[9px] font-mono text-white/20 uppercase mt-1">60% Agentic Automation Solutions</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Solved By Human</p>
                          <p className="text-lg font-bold text-yellow-500 uppercase">{cs.metrics.ticketsSolvedHuman}</p>
                          <p className="text-[9px] font-mono text-white/20 uppercase mt-1">40% Human Fallback</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Difference Shift Ratio</p>
                          <p className="text-sm font-bold text-white font-mono uppercase">{cs.metrics.percentageDiff}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">FTE Reallocated</p>
                          <p className="text-lg font-bold text-purple-400 uppercase">{cs.metrics.employeesSaved}</p>
                        </div>
                        <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                          <p className="text-[9px] font-mono text-rose-400 uppercase tracking-widest mb-1">Churn Rate Reduction</p>
                          <p className="text-lg font-bold text-rose-400 uppercase">{cs.metrics.churnReduction}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">PPC Leads Before</p>
                          <p className="text-lg font-bold text-white/40 uppercase font-mono line-through">{cs.metrics.ppcBefore}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">PPC Leads After</p>
                          <p className="text-lg font-bold text-emerald-400 uppercase">{cs.metrics.ppcAfter}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Organic Leads Growth</p>
                          <p className="text-sm font-bold text-purple-400 uppercase">{cs.metrics.organicLeads}</p>
                          <p className="text-[9px] font-mono text-white/30 mt-1">40% Growth via custom widgets</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Monthly Ads Cost / SEO ROI</p>
                          <p className="text-lg font-bold text-amber-500 uppercase">{cs.metrics.adsBudget}</p>
                          <p className="text-[10px] font-bold text-emerald-400/90 font-mono uppercase mt-1">SEO ROI: {cs.metrics.seoRoi}</p>
                        </div>
                        <div className="col-span-1 sm:col-span-2 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                          <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest mb-2">Human Sales Growth Assistance</p>
                          <div className="flex items-center justify-between gap-4">
                            <div className="text-center bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                              <span className="block text-[8px] font-mono text-white/30 uppercase">Before</span>
                              <span className="text-xs font-bold font-mono text-white/50">100% Base</span>
                            </div>
                            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: "100%" }} />
                              <div className="absolute top-0 right-0 h-full bg-emerald-300 animate-pulse" style={{ width: "30%" }} />
                            </div>
                            <div className="text-center bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                              <span className="block text-[8px] font-mono text-emerald-400 uppercase">After</span>
                              <span className="text-sm font-bold font-mono text-emerald-400">130% Volume</span>
                            </div>
                          </div>
                          <p className="text-[9px] text-emerald-300/80 mt-2 font-mono leading-relaxed">{cs.metrics.humanSalesAfter}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">AI meetings booked for humans</p>
                          <p className="text-lg font-bold text-pink-400 uppercase">{cs.metrics.meetingsCreatedByAgents} / month</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Human Calls & Chats</p>
                          <p className="text-lg font-bold text-blue-400 uppercase">{cs.metrics.humanCallsChats}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">Phone Agent outreach</p>
                          <p className="text-lg font-bold text-amber-500 uppercase">{cs.metrics.phoneAgentCalls}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">AI Chats & Email triggers</p>
                          <p className="text-lg font-bold text-purple-400 uppercase">{cs.metrics.agentChatsMails}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* DEEP INTUITIVE SCREENSHARE SUPERVISION EXPLANATION */}
                  <div className="mb-8 p-5 rounded-3xl bg-blue-950/20 border border-blue-500/20 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="w-4 h-4 text-blue-400" />
                      <h4 className="text-[10px] font-mono text-blue-300 uppercase tracking-wider font-bold">DeltaScope Screenshare Extraction</h4>
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed font-light">
                      {cs.type === "support" ? cs.metrics.agentScreenshareExplanation : cs.metrics.agentScreenshareSales}
                    </p>
                  </div>
                </div>

                {/* INTERACTIVE CHART CONTAINER */}
                <div className="mb-8 p-5 rounded-3xl bg-black/40 border border-white/5">
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span>Performance telemetry over 5 months</span>
                    <span className="text-emerald-400 active-pulse">● LIVE METRICS</span>
                  </h4>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {cs.type === "support" ? (
                        <AreaChart data={cs.chartData as any}>
                          <defs>
                            <linearGradient id={`gradAutomated-${cs.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id={`gradHuman-${cs.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#0b0b14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                            labelStyle={{ color: "#fff", fontFamily: "monospace" }}
                          />
                          <Area type="monotone" dataKey="Automated (60%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill={`url(#gradAutomated-${cs.id})`} />
                          <Area type="monotone" dataKey="Human Solved" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" fillOpacity={1} fill={`url(#gradHuman-${cs.id})`} />
                        </AreaChart>
                      ) : (
                        <LineChart data={cs.chartData as any}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#0b0b14", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                            labelStyle={{ color: "#fff", fontFamily: "monospace" }}
                          />
                          <Line type="monotone" dataKey="Human Sales Volume (%)" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="PPC Leads" stroke="#10b981" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Footer Read Report Actions */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <motion.button 
                    whileHover={{ x: 5 }}
                    onClick={() => setExpandedCase(isExpanded ? null : cs.id)}
                    className="flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-widest group/btn cursor-pointer"
                  >
                    <span>{isExpanded ? "Close Report" : "Read Full Case Analysis"}</span>
                    <ArrowRight className={`w-3 h-3 group-hover/btn:translate-x-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </motion.button>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-wider">REF_ID: DELTA-CS0{cs.id}</span>
                </div>

                {/* Expanded Modular Summary Analysis */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-6 bg-white/[0.01] rounded-3xl border border-white/5 p-5 text-left"
                    >
                      <h5 className="text-xs font-mono uppercase tracking-widest text-blue-300 mb-3">Enterprise Deep Audit Summary</h5>
                      <p className="text-white/70 text-xs font-light leading-relaxed mb-4">
                        DeltaScope platform engineered an immutable, transparent workflow synchronization. By examining agent interactions at scale, our client realized immense financial savings and workflow acceleration:
                      </p>
                      <ul className="space-y-2 text-xs text-white/60">
                        {cs.type === "support" ? (
                          <>
                            <li className="flex items-center gap-2">✔ Autonomous Resolution baseline set at 60% of absolute traffic.</li>
                            <li className="flex items-center gap-2">✔ Reduced MTTR from 45 minutes to sub-second responses.</li>
                            <li className="flex items-center gap-2">✔ Reallocated administrative staff to complex, high-affinity cases.</li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-center gap-2">✔ Accelerated lead pipeline through responsive interface widgets by 40%.</li>
                            <li className="flex items-center gap-2">✔ Scaled outbound capabilities with full screen session tracking logs.</li>
                            <li className="flex items-center gap-2">✔ Human sales grew from 100% to 130% from intelligent handoffs.</li>
                          </>
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
};

// Public export — App.tsx imports `CaseStudies` and renders it inside
// {activeTab === 'case-studies' && <CaseStudies />}. We wrap Alexei's
// "Biological Laboratory" grid with <RealClientCases /> beneath, so the
// Verified Signal real-client carousel (commit 1fe68f7) that Katia
// explicitly asked to keep stays visible.
export const CaseStudies = () => (
  <>
    <AlexeiCaseStudies />
    <RealClientCases />
  </>
);
