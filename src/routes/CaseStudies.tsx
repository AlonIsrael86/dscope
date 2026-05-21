// Route: /case-studies (feature-flagged via CASE_STUDIES_ENABLED).
// Extracted from App.tsx (Etap 2 — split monolith). No behavior change.
import { motion } from 'motion/react';
import { Truck, ScanText, ShieldCheck, DollarSign, BookOpen, ArrowRight } from 'lucide-react';
import { RealClientCases } from './RealClientCases';

export const CaseStudies = () => {
  const cases = [
    {
      title: "Global Supply Optimization",
      client: "OmniLogistics Corp",
      impact: "42% Reduction in Latency",
      description: "Implemented a multi-agentic orchestration layer across 14 global distribution centers, synchronizing inventory flow with real-time demand signals.",
      color: "from-blue-500 to-cyan-400",
      icon: Truck,
      stats: [
        { label: "Opex Saved", value: "$2.4M" },
        { label: "AI Decision Speed", value: "0.4s" }
      ]
    },
    {
      title: "Neural Content Engine",
      client: "Aether Dynamics",
      impact: "12x Production Velocity",
      description: "Deployed a customized LLM-orchestration pipeline for automated technical documentation and regional verification at scale.",
      color: "from-purple-500 to-pink-500",
      icon: ScanText,
      stats: [
        { label: "Accuracy", value: "99.8%" },
        { label: "Roles Reclaimed", value: "450" }
      ]
    },
    {
      title: "Autonomous IT Triage",
      client: "Horizon Systems",
      impact: "94% Auto-Resolution",
      description: "Self-healing infrastructure monitoring that predicts outages 4 hours before occurrence and initiates autonomous repair protocols.",
      color: "from-emerald-500 to-teal-400",
      icon: ShieldCheck,
      stats: [
        { label: "Uptime", value: "99.999%" },
        { label: "MTTR reduction", value: "88%" }
      ]
    },
    {
      title: "Strategic Capital Allocation",
      client: "Venture Core",
      impact: "1.8x ROI Variance",
      description: "AI-driven risk modeling and portfolio rebalancing across high-frequency volatile markets using proprietary Harmonics Logic.",
      color: "from-amber-400 to-orange-600",
      icon: DollarSign,
      stats: [
        { label: "Risk Mitigation", value: "MAX" },
        { label: "Cycle Speed", value: "DAILY" }
      ]
    }
  ];

  return (
    <motion.main
      key="case-studies"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-blue-300">DeltaScope Laboratory</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            Biological <span className="text-blue-400">Laboratory</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl font-light">
            Workflows are like a biological laboratory, you need DeltaScope to study them and their behavior and recreate them with AI/automation. This way the ecosystem will work with better vibes, more speed, and will be more creative than before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.04]"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${cs.color} opacity-[0.03] blur-[80px] pointer-events-none group-hover:opacity-10 transition-opacity`} />

              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${cs.color.split(' ')[0].replace('from-', 'text-')}`}>
                  <cs.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{cs.client}</span>
                  <span className={`text-sm font-bold uppercase ${cs.color.split(' ')[0].replace('from-', 'text-')}`}>{cs.impact}</span>
                </div>
              </div>

              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-4">{cs.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8 flex-1">{cs.description}</p>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                {cs.stats.map((stat, j) => (
                  <div key={j}>
                    <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-display font-bold text-white italic">{stat.value}</p>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="mt-10 flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-widest group/btn"
              >
                <span>Read Full Report</span>
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Real client testimonials — added under the main case studies grid */}
      <RealClientCases />
    </motion.main>
  );
};
